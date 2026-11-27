// ============================================================================
// SUPABASE EDGE FUNCTION: grade-speaking
// Chấm & sửa bài nói VSTEP Speaking Part 1 bằng Gemini Multimodal (nghe trực tiếp
// file ghi âm + đối chiếu transcript) theo mục tiêu B1 / B2:
// - Phát âm có dễ nghe không & có ngữ điệu lên xuống tự nhiên không
// - Ngữ pháp & chia thì theo câu hỏi
// - Dùng từ tự nhiên & phát hiện các chỗ hơi bị "Vietlish" cần diễn đạt lại
// - Sắp xếp các ý có logic, dễ theo dõi không
// - Ý tưởng hơi "cụt" -> hướng dẫn diễn đạt lại & mở rộng tự nhiên
// - Hẹn trả bài sửa cho học viên sau 6 tiếng + hỗ trợ hàng đợi tự chấm lại (pg_cron)
//
// Triển khai trên Supabase Dashboard (dùng chung dự án với vstep-viet-thu):
// 1. Vào Edge Functions -> Secrets (nếu đã cài cho grade-writing thì dùng lại được ngay):
//    - GEMINI_API_KEY = <API key từ https://aistudio.google.com/apikey>
//    - CRON_SECRET    = <chuỗi bí mật dùng cho pg_cron>
// 2. Vào Edge Functions -> Create a new function -> đặt tên: grade-speaking
//    -> Dán toàn bộ nội dung file này vào index.ts -> Deploy.
// 3. Tắt "Verify JWT with legacy secret" trong tab Settings / Details của grade-speaking.
// ============================================================================

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const AUDIO_BUCKET = "speaking-recordings";
const RELEASE_DELAY_HOURS = 6;
const MAX_STUDENT_GRADES_PER_QUESTION = 5;
const MAX_AUTO_RETRIES = 20;
const STALE_GRADING_MS = 3 * 60 * 1000;
const MAX_INLINE_AUDIO_BYTES = 14 * 1024 * 1024;
const GEMINI_TRANSCRIBE_TIMEOUT_MS = 60 * 1000;
const GEMINI_GRADE_TIMEOUT_MS = 50 * 1000;
const STORAGE_DOWNLOAD_TIMEOUT_MS = 15 * 1000;
const QUEUE_TIME_BUDGET_MS = 115 * 1000;

function getRetryCooldownMs(retryCount: number): number {
  if (retryCount <= 2) return 60 * 1000;
  if (retryCount <= 5) return 180 * 1000;
  return 600 * 1000;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function promiseWithTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timeout (${Math.round(timeoutMs / 1000)}s)`)), timeoutMs);
      })
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" }
  });
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x4000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function repairInterleavedWebmBytes(u8: Uint8Array, ebmlOff: number): Uint8Array | null {
  if (!u8 || ebmlOff < 0 || ebmlOff >= u8.length - 16) return null;
  const clusterOffsets: number[] = [];
  for (let i = ebmlOff; i <= u8.length - 12; i++) {
    if (u8[i] === 0x1f && u8[i + 1] === 0x43 && u8[i + 2] === 0xb6 && u8[i + 3] === 0x75) {
      clusterOffsets.push(i);
    }
  }
  if (clusterOffsets.length < 2) {
    return ebmlOff > 0 ? u8.slice(ebmlOff) : null;
  }

  const parseCluster = (start: number, end: number) => {
    let p = start + 4;
    const sb = u8[p];
    let sLen = 1;
    for (let bit = 0x80; bit > 0 && !(sb & bit); bit >>= 1) sLen++;
    p += sLen;
    if (p >= end || u8[p] !== 0xe7) return null;
    const tcLen = u8[p + 1] & 0x7f;
    if (tcLen === 0 || tcLen > 6 || p + 2 + tcLen > end) return null;
    let tc = 0;
    for (let k = 0; k < tcLen; k++) tc = tc * 256 + u8[p + 2 + k];
    const headerEnd = p + 2 + tcLen;
    const headerBytes = u8.slice(start, headerEnd);
    const blocks: Array<{ relTc: number; bytes: Uint8Array }> = [];
    let q = headerEnd;
    while (q < end) {
      if (u8[q] !== 0xa3) break;
      const b0 = u8[q + 1];
      let vLen = 1;
      let bSize = 0;
      if (b0 & 0x80) {
        vLen = 1;
        bSize = b0 & 0x7f;
      } else if (b0 & 0x40) {
        vLen = 2;
        bSize = ((b0 & 0x3f) << 8) | u8[q + 2];
      } else if (b0 & 0x20) {
        vLen = 3;
        bSize = ((b0 & 0x1f) << 16) | (u8[q + 2] << 8) | u8[q + 3];
      } else {
        break;
      }
      const dataStart = q + 1 + vLen;
      const blockEnd = dataStart + bSize;
      if (blockEnd > end || bSize < 4) break;
      const relTcRaw = (u8[dataStart + 1] << 8) | u8[dataStart + 2];
      const relTc = relTcRaw >= 0x8000 ? relTcRaw - 0x10000 : relTcRaw;
      blocks.push({ relTc, bytes: u8.slice(q, blockEnd) });
      q = blockEnd;
    }
    const lastRel = blocks.length > 0 ? Math.max(0, blocks[blocks.length - 1].relTc) : 0;
    return { start, tc, endTc: tc + lastRel, headerBytes, blocks };
  };

  const clusters: Array<{
    start: number;
    tc: number;
    endTc: number;
    headerBytes: Uint8Array;
    blocks: Array<{ relTc: number; bytes: Uint8Array }>;
  }> = [];
  for (let i = 0; i < clusterOffsets.length; i++) {
    const end = i + 1 < clusterOffsets.length ? clusterOffsets[i + 1] : u8.length;
    const c = parseCluster(clusterOffsets[i], end);
    if (c) clusters.push(c);
  }
  if (clusters.length < 2) {
    return ebmlOff > 0 ? u8.slice(ebmlOff) : null;
  }

  let hasInterleaving = false;
  for (let i = 1; i < clusters.length; i++) {
    const prev = clusters[i - 1];
    const curr = clusters[i];
    if (curr.tc < prev.tc || curr.tc < prev.endTc - 500 || curr.tc - prev.endTc > 10000) {
      hasInterleaving = true;
      break;
    }
  }
  if (!hasInterleaving) {
    return ebmlOff > 0 ? u8.slice(ebmlOff) : null;
  }

  const outParts: Uint8Array[] = [u8.slice(ebmlOff, clusters[0].start)];
  let expectedMinTc = clusters[0].tc;
  let expectedEndTc = clusters[0].tc;
  for (let i = 0; i < clusters.length; i++) {
    const c = clusters[i];
    const isSequential =
      i === 0 || (c.tc >= expectedMinTc && c.tc >= expectedEndTc - 500 && c.tc - expectedEndTc <= 10000);
    if (isSequential) {
      outParts.push(c.headerBytes);
      let lastRel = -1;
      for (const blk of c.blocks) {
        if (blk.relTc > lastRel) {
          outParts.push(blk.bytes);
          lastRel = blk.relTc;
        } else {
          break;
        }
      }
      if (i + 1 < clusters.length) {
        const nextC = clusters[i + 1];
        const nextIsForeign =
          nextC.tc < c.tc || nextC.tc < c.endTc - 500 || nextC.tc - c.endTc > 10000;
        if (nextIsForeign && nextC.blocks.length > 0) {
          for (const fBlk of nextC.blocks) {
            if (fBlk.relTc >= lastRel + 40 && fBlk.relTc <= lastRel + 90) {
              outParts.push(fBlk.bytes);
              lastRel = fBlk.relTc;
            }
          }
        }
      }
      expectedMinTc = c.tc + 1;
      expectedEndTc = c.tc + Math.max(0, lastRel);
    }
  }

  const totalLen = outParts.reduce((s, p) => s + p.length, 0);
  const out = new Uint8Array(totalLen);
  let pos = 0;
  for (const p of outParts) {
    out.set(p, pos);
    pos += p.length;
  }
  return out;
}

function toExactArrayBuffer(u8: Uint8Array): ArrayBuffer {
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength) as ArrayBuffer;
}

function trimCorruptedAudioPrefix(buffer: ArrayBuffer, fallbackMime: string): { buffer: ArrayBuffer; mimeType: string } {
  const u8 = new Uint8Array(buffer);
  if (u8.length < 16) return { buffer, mimeType: fallbackMime };
  if (u8[0] === 0x1a && u8[1] === 0x45 && u8[2] === 0xdf && u8[3] === 0xa3) {
    const deinterleaved = repairInterleavedWebmBytes(u8, 0);
    return { buffer: deinterleaved ? toExactArrayBuffer(deinterleaved) : buffer, mimeType: "audio/webm" };
  }
  if (u8[4] === 0x66 && u8[5] === 0x74 && u8[6] === 0x79 && u8[7] === 0x70) {
    return { buffer, mimeType: "audio/mp4" };
  }
  const scanMax = Math.min(u8.length - 8, 262144);
  for (let i = 1; i <= scanMax; i++) {
    if (u8[i] === 0x1a && u8[i + 1] === 0x45 && u8[i + 2] === 0xdf && u8[i + 3] === 0xa3) {
      const deinterleaved = repairInterleavedWebmBytes(u8, i);
      return { buffer: deinterleaved ? toExactArrayBuffer(deinterleaved) : buffer.slice(i), mimeType: "audio/webm" };
    }
  }
  for (let i = 4; i <= scanMax; i++) {
    if (
      u8[i] === 0x66 &&
      u8[i + 1] === 0x74 &&
      u8[i + 2] === 0x79 &&
      u8[i + 3] === 0x70 &&
      u8[i - 4] === 0x00 &&
      u8[i - 3] === 0x00
    ) {
      return { buffer: buffer.slice(i - 4), mimeType: "audio/mp4" };
    }
  }
  return { buffer, mimeType: fallbackMime };
}

function resolveCleanAudioMimeType(audioPath: string, blobType?: string): string {
  const lowerType = String(blobType || "").toLowerCase().split(";")[0].trim();
  const lowerPath = String(audioPath || "").toLowerCase();
  if (lowerType.includes("mp4") || lowerType.includes("m4a") || lowerPath.endsWith(".mp4") || lowerPath.endsWith(".m4a")) {
    return "audio/mp4";
  }
  if (lowerType.includes("ogg") || lowerPath.endsWith(".ogg")) {
    return "audio/ogg";
  }
  if (lowerType.includes("wav") || lowerPath.endsWith(".wav")) {
    return "audio/wav";
  }
  if (lowerType.includes("mpeg") || lowerType.includes("mp3") || lowerPath.endsWith(".mp3")) {
    return "audio/mp3";
  }
  return "audio/webm";
}

interface Stage1AudioAnalysis {
  attempt_id?: string;
  recognized_transcript: string;
  has_english_speech: boolean;
  pronunciation_notes_vi: string;
  fluency_notes_vi: string;
  pronunciation_band_estimate: number | null;
  fluency_band_estimate: number | null;
  pronunciation_fixes: Array<{ word: string; ipa: string; issue_vi: string }>;
}

function buildAudioTranscribePrompt(params: {
  topicTitle: string;
  promptText: string;
  durationSec: number;
}) {
  return `Bạn là chuyên gia phiên âm (Verbatim ASR) và giám khảo nghe Phát âm / Độ trôi chảy cho bài thi VSTEP Speaking của học viên Việt Nam.

NGỮ CẢNH THAM KHẢO (CHỈ dùng để viết đúng chính tả từ khóa nếu học viên thực sự nói, TUYỆT ĐỐI KHÔNG chép lại hay tự bịa nội dung từ đề bài):
- Chủ đề: ${params.topicTitle || "Speaking"}
- Đề bài: "${params.promptText || "(Không có đề bài)"}"
- Thời lượng ghi âm: ~${params.durationSec || 0} giây

NHIỆM VỤ BẮT BUỘC — CHỈ NGHE FILE ÂM THANH ĐÍNH KÈM:
1. "recognized_transcript": Chép NGUYÊN VĂN 100% (VERBATIM) từng từ tiếng Anh học viên thực sự nói từ giây đầu tiên đến giây cuối cùng của file ghi âm.
   - TUYỆT ĐỐI KHÔNG sửa lỗi ngữ pháp, KHÔNG viết lại câu cho mượt, KHÔNG tóm tắt, KHÔNG bỏ sót bất kỳ ý/câu/đoạn nào (kể cả phần giữa và phần kết luận).
   - Giữ nguyên lỗi nói thật và chỗ tự sửa; chỉ ghi "[inaudible]" ở đoạn thực sự mất tiếng/không thể nghe ra.
   - Nếu toàn bộ file im lặng, chỉ có tiếng ồn hoặc hoàn toàn không có tiếng Anh thì đặt "recognized_transcript": "" và "has_english_speech": false.
2. "pronunciation_notes_vi": 2–3 câu tiếng Việt mô tả trực tiếp những gì nghe được về độ rõ chữ, độ dễ hiểu, trọng âm từ/câu, ngữ điệu lên xuống tự nhiên (lưu ý: giọng có âm sắc Việt nhẹ nhưng rõ ràng, dễ hiểu vẫn đánh giá tích cực; BỎ QUA hoàn toàn đuôi chia động từ "-s", "-es", "-ed").
3. "fluency_notes_vi": 2–3 câu tiếng Việt mô tả tốc độ nói, nhịp điệu, mức độ ngập ngừng/lặp từ/tự sửa lỗi nghe thấy thực tế.
4. "pronunciation_band_estimate" và "fluency_band_estimate": điểm ước lượng thang 0.0–10.0 (bước 0.5) theo VSTEP Speaking Scoring Guide (đặt 0 nếu không có tiếng Anh).
5. "pronunciation_fixes": tối đa 6 từ thực sự phát âm sai hoặc nuốt mất final sound CỐ HỮU của từ gốc (như nice, house, place, price, stress, relax...) nghe được trong audio. BỎ QUA lỗi thiếu đuôi chia động từ "-s/-es/-ed". Mỗi từ chỉ ghi 1 lần. Nếu nghe rõ dễ hiểu hết thì trả [].

TRẢ VỀ DUY NHẤT 1 JSON HỢP LỆ (không bọc markdown):
{
  "has_english_speech": true,
  "recognized_transcript": "Chép nguyên văn toàn bộ lời nói tiếng Anh từ đầu đến cuối file âm thanh",
  "pronunciation_notes_vi": "Nhận xét ngắn gọn về phát âm, trọng âm, ngữ điệu nghe thực tế",
  "fluency_notes_vi": "Nhận xét ngắn gọn về độ trôi chảy, tốc độ, ngập ngừng nghe thực tế",
  "pronunciation_band_estimate": 6.5,
  "fluency_band_estimate": 6.5,
  "pronunciation_fixes": [
    {
      "word": "từ phát âm chưa chuẩn",
      "ipa": "/US IPA/",
      "issue_vi": "Mô tả ngắn lỗi phát âm và mẹo đọc chuẩn"
    }
  ]
}`;
}

function buildSpeakingGradingPrompt(params: {
  topicId: string;
  questionId: string;
  topicTitle: string;
  promptText: string;
  spokenTranscript: string;
  durationSec: number;
  targetLevel: string;
  hasAudio: boolean;
  audioAnalysis?: Stage1AudioAnalysis | null;
  correctionOnly?: boolean;
}) {
  const practiceTabLevel = String(params.targetLevel || "B1").toUpperCase() === "B2" ? "B2" : "B1";
  const isCorrectionOnly = Boolean(params.correctionOnly);
  const isPart2 =
    /^part2[-_]/i.test(params.topicId || "") || /^p2_/i.test(params.questionId || "");

  const partLabel = isPart2
    ? "VSTEP Speaking Part 2 (Solution Discussion — chọn 1 trong 3 phương án, nêu lý do thuyết phục, đối chiếu/so sánh với các phương án còn lại và kết luận rõ ràng)"
    : "VSTEP Speaking Part 1 (Social Interaction — trả lời tự nhiên, rõ ý, có giải thích và ví dụ/cảm xúc ngắn gọn)";

  const partCalibration = isPart2
    ? `CHUẨN ĐÁNH GIÁ THEO PART 2 (Solution Discussion):
- Bài nói tốt thường dài khoảng 1.5–3 phút (~120–240+ từ): nêu rõ lựa chọn trong 3 phương án, phát triển các lý do thuyết phục kèm ví dụ/giải thích cụ thể, có đề cập hợp lý đến 2 phương án còn lại và kết luận tự nhiên.
- KHÔNG chấm rập khuôn theo một mẫu câu cố định nào: miễn là học viên lựa chọn rõ ràng, lập luận mạch lạc và phát triển ý tự nhiên bằng BẤT KỲ cách diễn đạt tiếng Anh chuẩn nào thì đều đánh giá đúng theo năng lực thực tế (B1, B2 hoặc C1).`
    : `CHUẨN ĐÁNH GIÁ THEO PART 1 (Social Interaction):
- Trong đề thi VSTEP Part 1, câu trả lời tự nhiên thường dài khoảng 20–45 giây (~30–80 từ). KHÔNG trừ điểm chỉ vì bài Part 1 ngắn gọn theo đúng định dạng phỏng vấn: một câu trả lời ~35–70 từ nhưng phát âm tự nhiên, trôi chảy, từ vựng chính xác/linh hoạt, có mệnh đề phức và ví dụ/giải thích rõ ràng HOÀN TOÀN có thể đạt B2 (6.0–8.5) hoặc C1 (9.0–10.0).
- KHÔNG ép dùng từ C1/C2 sách vở cứng nhắc; văn nói tự nhiên, lưu loát, đúng ngữ cảnh luôn được đánh giá cao.`;

  const audioObs = params.audioAnalysis;
  const audioContextNote =
    params.hasAudio && audioObs
      ? `BƯỚC 1 ĐÃ NGHE TRỰC TIẾP FILE GHI ÂM THẬT CỦA HỌC VIÊN (~${params.durationSec || 0} giây) VÀ GHI NHẬN:
- Phát âm nghe thực tế: ${audioObs.pronunciation_notes_vi || "(Không có ghi chú riêng)"} ${audioObs.pronunciation_band_estimate !== null ? `(ước lượng ~${audioObs.pronunciation_band_estimate}/10)` : ""}
- Độ trôi chảy nghe thực tế: ${audioObs.fluency_notes_vi || "(Không có ghi chú riêng)"} ${audioObs.fluency_band_estimate !== null ? `(ước lượng ~${audioObs.fluency_band_estimate}/10)` : ""}
- Các từ phát âm chưa chuẩn nghe thấy: ${
          audioObs.pronunciation_fixes.length > 0
            ? audioObs.pronunciation_fixes.map(p => `${p.word} (${p.ipa || ""}): ${p.issue_vi}`).join(" | ")
            : "Không phát hiện từ phát âm sai gây khó hiểu."
        }
- HÃY DỰA VÀO ĐÚNG GHI NHẬN NGHE THỰC TẾ NÀY cho tiêu chí Pronunciation & Fluency (không tự bịa thêm lỗi phát âm không có trong ghi nhận).`
      : `CẢNH BÁO: Không đọc được file âm thanh gốc, hệ thống chỉ có transcript văn bản sơ bộ từ trình duyệt (~${params.durationSec || 0} giây):
- Dựa vào transcript văn bản và thời lượng nói để đánh giá công bằng độ trôi chảy (tốc độ/độ dài diễn đạt) và lưu ý phát âm/ngữ điệu những từ khóa quan trọng nếu cần.`;

  return `Bạn là giám khảo chấm thi VSTEP Speaking chính thức và là giáo viên hướng dẫn tận tâm, công tâm, giàu tính xây dựng (constructive) dành cho học viên Việt Nam.

THÔNG TIN BÀI NÓI:
- Phần thi: ${partLabel}
- Chủ đề: ${params.topicTitle || (isPart2 ? "Speaking Part 2" : "Speaking Part 1")}
- Câu hỏi / Tình huống của giám khảo: "${params.promptText || "(Không có câu hỏi)"}"
- Tab bài luyện học viên đang mở: Level ${practiceTabLevel} (CHỈ LÀ NGỮ CẢNH THAM KHẢO — TUYỆT ĐỐI KHÔNG DÙNG ĐỂ KHỐNG CHẾ HAY ÉP ĐIỂM)
- Thời lượng ghi âm: ${params.durationSec || 0} giây
- Lời nói nguyên văn của học viên (VERBATIM TRANSCRIPT — TUYỆT ĐỐI KHÔNG THAY ĐỔI, KHÔNG THÊM BỚT):
"""
${params.spokenTranscript || ""}
"""
- Ghi nhận âm thanh: ${audioContextNote}

${
  isCorrectionOnly
    ? `CHẾ ĐỘ CHỈ SỬA LỖI & GÓP Ý CHUYÊN SÂU (DÀNH RIÊNG CHO HỌC VIÊN LỚP C1):
- Học viên này thuộc lớp C1 và CHỈ CẦN SỬA LỖI + NÂNG CẤP DIỄN ĐẠT, KHÔNG chấm band hay xếp loại B1/B2/C1 và KHÔNG chấm điểm số.
- TUYỆT ĐỐI KHÔNG nhắc tới nhãn trình độ ("B1", "B2", "C1", "Đạt B1/B2/C1", "Xấp xỉ...") hoặc bất kỳ con số điểm nào trong "overall_comment", "next_level_tip", hay bất kỳ trường nào trong "criteria".
- Đặt "estimated_band": "", "level_assessment": "", "suggested_level": "", "internal_score": null, "criterion_scores": null.
- Tập trung hoàn toàn vào: (1) chỉ ra lỗi phát âm/trọng âm/ngữ điệu thực tế, (2) sửa lỗi ngữ pháp & chỗ diễn đạt còn gượng/Vietlish, (3) gợi ý collocations, cách nói tự nhiên/sắc nét hơn, và (4) viết lại phiên bản hoàn chỉnh mượt mà, giữ nguyên ý của học viên.`
    : `NGUYÊN TẮC CHỐNG THIÊN LỆCH TRÌNH ĐỘ (CỰC KỲ QUAN TRỌNG):
- Tab "Level ${practiceTabLevel}" CHỈ là thẻ luyện tập học viên bấm vào khi ghi âm, KHÔNG PHẢI trình độ thật của học viên.
- Nếu học viên chọn nhầm tab B1 nhưng nói lưu loát, tự nhiên, giàu từ vựng và cấu trúc câu ở mức B2 hoặc C1, BẠN PHẢI CHẤM ĐÚNG MỨC B2 HOẶC C1 THỰC TẾ CỦA HỌ — TUYỆT ĐỐI KHÔNG kéo điểm xuống hoặc giữ ở ngưỡng B1.
- Ngược lại, đánh giá hoàn toàn khách quan theo năng lực thể hiện thực tế trong bài nói qua thang 7 mức: Chưa đạt B1 | Xấp xỉ B1 | Đạt B1 | Xấp xỉ B2 | Đạt B2 | Xấp xỉ C1 | Đạt C1.
- Theo VSTEP Speaking Scoring Guide chính thức, người nói đạt Band 6–8 (B2) và Band 9 (C1) VẪN ĐƯỢC PHÉP có một vài lỗi nhỏ không mang tính hệ thống (non-systematic errors) hoặc tự sửa (self-correction) miễn không gây hiểu nhầm. KHÔNG hạ một bài nói B2/C1 xuống B1 chỉ vì 1–3 lỗi nhỏ hoặc vì không dùng đúng câu chữ trong bài mẫu.`
}

${partCalibration}

BẢNG MÔ TẢ CHUẨN VSTEP SPEAKING SCORING GUIDE (5 TIÊU CHÍ ĐỒNG TRỌNG SỐ, THANG 0–10):
Hãy chấm điểm từng tiêu chí theo bước 0.5 (ví dụ: 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5):

1. GRAMMAR (Ngữ pháp - 20%):
   - Band 2–3 (Chưa đạt B1): Chỉ kiểm soát hạn chế vài mẫu câu đơn giản hoặc dùng câu đơn còn sai lỗi cơ bản mang tính hệ thống.
   - Band 4–5 (B1): Dùng tương đối chính xác các cấu trúc đơn giản quen thuộc; có vài lỗi nhưng vẫn dễ hiểu; ở Band 5 có cố gắng dùng câu phức nhưng còn nhiều lỗi.
   - Band 6–8 (B2): Dùng linh hoạt, chính xác cấu trúc đơn và thể hiện khả năng kiểm soát câu phức (Band 6: kiểm soát một số câu phức; Band 7: kiểm soát tốt câu phức; Band 8: dùng linh hoạt, chính xác nhiều cấu trúc phức tạp). Lỗi không mang tính hệ thống đôi khi vẫn xuất hiện (hoặc có tự sửa lỗi ở Band 8) nhưng KHÔNG gây hiểu nhầm.
   - Band 9–10 (C1): Dùng linh hoạt và chính xác đa dạng cấu trúc ngữ pháp; Band 9 thỉnh thoảng có lỗi nhỏ không hệ thống; Band 10 hầu như không mắc lỗi.

2. VOCABULARY (Từ vựng - 20%):
   - Band 2–3 (Chưa đạt B1): Vốn từ cơ bản/hẹp, chỉ đủ xử lý tình huống quen thuộc hoặc từ rời rạc.
   - Band 4–5 (B1): Đủ/khá đa dạng từ vựng cho chủ đề quen thuộc nhưng đôi khi lặp từ; còn lúng túng và mắc lỗi dùng từ ở chủ đề lạ.
   - Band 6–8 (B2): Có vốn từ tốt cho hầu hết chủ đề và nỗ lực tránh lặp từ; độ chính xác từ vựng khá cao/cao dù thỉnh thoảng vẫn có nhầm lẫn nhỏ hoặc chọn từ chưa tối ưu; Band 8 chủ động dùng một số từ ít phổ biến và cụm diễn đạt tự nhiên/idiomatic.
   - Band 9–10 (C1): Làm chủ vốn từ rộng, bao gồm từ ít phổ biến, thành ngữ (idiomatic expressions) và cách nói tự nhiên (colloquialisms); có thể tìm cách diễn đạt thay thế khi cần; hầu như không có lỗi từ vựng đáng kể (Band 9 có thể có sơ suất nhỏ).

3. PRONUNCIATION (Phát âm - 20%):
   - Band 2–3 (Chưa đạt B1): Khó hiểu hoặc chỉ phát âm được từ/cụm đơn giản, người nghe đôi khi phải hỏi lại.
   - Band 4–5 (B1): Nhìn chung dễ hiểu, phát âm khá rõ nhưng thỉnh thoảng sai âm đơn lẻ; có cố gắng nhấn trọng âm từ dù còn phát âm sai một số từ.
   - Band 6–8 (B2): Dễ hiểu, phát âm khá rõ và tự nhiên (Band 8 rất rõ và tự nhiên); phát âm rõ hầu hết âm đơn lẻ; đặt trọng âm từ nhìn chung đúng; có nỗ lực với trọng âm câu và ngữ điệu (Band 6 chưa rõ trọng âm câu, Band 7 có cố gắng rõ hơn, Band 8 thể hiện tốt ngữ điệu và trọng âm từ/câu).
   - Band 9–10 (C1): Dễ hiểu, phát âm rõ ràng các âm, đặt chính xác cả trọng âm từ và trọng âm câu, ngữ điệu phù hợp và linh hoạt để truyền tải sắc thái ý nghĩa.

4. FLUENCY (Độ trôi chảy - 20%):
   - Band 2–3 (Chưa đạt B1): Chỉ nói được từ/cụm ngắn, ngập ngừng rõ rệt, nhiều lần bắt đầu lại hoặc lặp lại.
   - Band 4–5 (B1): Giữ được mạch nói dễ hiểu ở chủ đề quen thuộc, nói được câu trả lời có độ dài nhất định nhưng vẫn còn ngập ngừng rõ/một chút để tìm ngữ pháp và từ vựng, có dấu hiệu tự sửa lỗi.
   - Band 6–8 (B2): Xử lý chủ đề quen thuộc và lạ tương đối thoải mái/dễ dàng với độ trôi chảy tốt và tốc độ khá đều; ngập ngừng tìm từ/ngữ pháp ít gây chú ý (Band 6: chưa quá lộ; Band 7: thỉnh thoảng mới thấy; Band 8: hiếm khi thấy); nói được đoạn dài mạch lạc với ít lần lặp lại hoặc tự sửa lỗi.
   - Band 9–10 (C1): Thường xuyên nói các đoạn dài với rất ít ngập ngừng, duy trì dòng chảy tự nhiên, dễ dàng, hiếm khi lặp hay sửa lỗi; nếu có dừng lại chủ yếu là để tìm ý cho khái niệm khó.

5. DISCOURSE MANAGEMENT (Tổ chức & Phát triển ý - 20%):
   - Band 2–3 (Chưa đạt B1): Hầu như chưa phát triển được ý hoặc liên quan hạn chế, dựa vào lặp lại đề bài, nối ý bằng từ cơ bản (and, but, because, then).
   - Band 4–5 (B1): Trả lời đúng trọng tâm, phát triển ý theo dạng liệt kê đơn giản; có cố gắng mở rộng (chi tiết/ví dụ) nhưng còn mơ hồ hoặc lặp ý; dùng từ nối đơn giản khá linh hoạt (Band 5).
   - Band 6–8 (B2): Phát triển ý đúng trọng tâm tương đối thoải mái/dễ dàng, mở rộng bằng chi tiết và ví dụ phù hợp; Band 6 dùng từ nối phức tạp hơn (đôi khi đánh dấu quan hệ ý chưa thật sắc); Band 7–8 dùng đa dạng từ nối hiệu quả để thể hiện rõ ràng mối quan hệ giữa các ý.
   - Band 9–10 (C1): Phát triển ý mạch lạc, sâu sắc với chi tiết và ví dụ phong phú, biết kết/chốt ý gọn gàng; lời nói trôi chảy, cấu trúc chặt chẽ, sử dụng nhuần nhuyễn các mô hình tổ chức ý và phương tiện liên kết (cohesive devices).

QUY TẮC ĐẶC BIỆT BẮT BUỘC PHẢI TUÂN THỦ:
- QUY TẮC 1 (BỎ QUA ĐUÔI CHIA ĐỘNG TỪ "-s", "-es", "-ed" — CHỈ BẮT FINAL SOUND CỐ HỮU CỦA TỪ):
  + BỎ QUA HOÀN TOÀN lỗi thiếu hoặc phát âm thiếu đuôi "-s", "-es", "-ed" khi chia động từ (bao gồm quên thêm "-s/-es" ở động từ ngôi thứ 3 số ít hiện tại đơn như "it help", "he like", "my mother cook", "weather affect" VÀ phát âm thiếu âm cuối "-s/-es/-ed" của động từ chia thì như "worked", "played", "visited", "watched", "helped", "makes"...). TUYỆT ĐỐI không trừ điểm, không bắt lỗi trong phần ngữ pháp hay phát âm, không đưa vào "language_corrections" hay "pronunciation_fixes".
  + NHƯNG vẫn lưu ý nhẹ nhàng, mang tính xây dựng nếu học viên nuốt mất final sound CỐ HỮU của từ gốc gây khó phân biệt nghĩa (ví dụ: nice /naɪs/, house /haʊs/, place /pleɪs/, price /praɪs/, office /ˈɔːfɪs/, because /bɪˈkɔːz/, always /ˈɔːlweɪz/, relax /rɪˈlæks/, stress /stres/, bus /bʌs/, class /klæs/, famous /ˈfeɪməs/...).
- QUY TẮC 2 (TÍNH THEO DẠNG LỖI — KHÔNG CỘNG DỒN LẶP LỖI):
  + Nếu cùng 1 từ bị phát âm chưa chuẩn hoặc cùng 1 dạng lỗi ngữ pháp/Vietlish lặp lại nhiều lần trong bài thì chỉ tính là 1 DẠNG LỖI DUY NHẤT, không trừ điểm lặp lại và chỉ liệt kê 1 lần.
- QUY TẮC 3 (TÍNH ĐIỂM 5 TIÊU CHÍ & QUY ĐỔI MỨC — KHÔNG HIỆN CON SỐ ĐIỂM CHO HỌC VIÊN):
  + Chấm 5 điểm thành phần (0.0 – 10.0, bước 0.5) vào "criterion_scores": grammar, vocabulary, pronunciation, fluency, discourse_management.
  + "internal_score" phải đúng bằng trung bình cộng 5 tiêu chí trên và làm tròn theo bước 0.25 (0.00, 0.25, 0.50, 0.75, ..., 10.00).
  + Quy đổi "internal_score" sang "estimated_band":
    * 0.00 – 3.50 : "Chưa đạt B1"
    * 3.75        : "Xấp xỉ B1"
    * 4.00 – 5.50 : "Đạt B1"
    * 5.75        : "Xấp xỉ B2"
    * 6.00 – 8.50 : "Đạt B2"
    * 8.75        : "Xấp xỉ C1"
    * 9.00 – 10.00: "Đạt C1"
  + TUYỆT ĐỐI KHÔNG viết con số điểm (ví dụ 5.5/10, 6.25 điểm, band 7.5...) trong "overall_comment", "level_assessment", "next_level_tip" hay bất kỳ trường nào trong "criteria" vì học viên chỉ xem mức trình độ (B1/B2/C1) và nhận xét chữ.

PHONG CÁCH NHẬN XÉT MANG TÍNH XÂY DỰNG (CONSTRUCTIVE COACHING):
- Luôn ghi nhận rõ điểm làm tốt trước tiên (từ phát âm, sự tự tin, từ vựng hay, cấu trúc câu đẹp, đến cách triển khai ý), rồi mới chỉ ra 1–2 điểm ưu tiên cải thiện để tiến lên band tiếp theo (hoặc duy trì phong độ C1).
- Ở cả 5 mục trong "criteria", mỗi mục viết 2–3 câu rõ ràng: (1) Đánh giá công tâm điểm mạnh đạt được theo chuẩn VSTEP Band Descriptor + (2) Gợi ý cụ thể, tích cực để nâng cấp hơn nữa (nếu đã rất tốt ở mức B2/C1 thì khen ngợi và gợi mở tinh tế chứ không bới móc lỗi vặt).
- "next_level_tip": Đưa ra 1 lời khuyên hành động thực tế nhất (actionable tip) giúp học viên bước lên trình độ cao hơn (ví dụ: từ B1 lên B2 hoặc từ B2 lên C1).
- "language_corrections": Tối đa 8 mục thực sự giá trị. Chỉ điền "category" là 1 trong 4 nhãn: "Ngữ pháp", "Vietlish", "Từ vựng tự nhiên", hoặc "Nâng cấp diễn đạt".
  + BẮT BUỘC rà soát kỹ từng câu trong VERBATIM TRANSCRIPT: nếu có lỗi sai rõ ràng về cấu trúc câu (thiếu chủ ngữ/động từ, sai động từ khuyết thiếu như "can makes", sai giới từ như "affect to", sai bị động như "get flood", lặp/rối câu...) hoặc lỗi dùng từ/Vietlish (chọn nhầm từ sai nghĩa/không tự nhiên) thì PHẢI liệt kê đầy đủ các lỗi quan trọng nhất, TUYỆT ĐỐI không bỏ sót hay trả về [] khi bài còn lỗi rõ ràng.
  + Với bài nói đã sạch lỗi ở mức B2/C1, KHÔNG tự bịa lỗi sai; có thể chọn 1–2 cụm câu hay của học viên để gợi ý "Nâng cấp diễn đạt" mượt hơn/idiomatic hơn nếu hữu ích, hoặc trả về [] nếu thực sự hoàn hảo.
  + "original" BẮT BUỘC phải COPY CHÍNH XÁC NGUYÊN VĂN TỪNG KÝ TỰ (2–10 từ, giữ đúng chính tả/lỗi sai gốc) từ đoạn "VERBATIM TRANSCRIPT" ở trên để hệ thống gạch đỏ/sửa xanh trực tiếp trên văn bản. "corrected" phải phù hợp với trình độ thực tế của học viên (TUYỆT ĐỐI không sửa câu B2/C1 thành câu đơn giản cấp B1).
- "idea_expansions": Tối đa 2 gợi ý mang tính mở rộng chiều sâu (chi tiết, ví dụ, so sánh hoặc kết nối ý) nếu ý còn hơi mỏng; nếu bài nói đã phát triển ý đầy đủ, mạch lạc ở mức hiện tại thì trả về [].
- "natural_spoken_version" & "suggested_level": Đặt "suggested_level" là "B1", "B2" hoặc "C1" tương ứng với năng lực thực tế của bài nói (hoặc nhỉnh hơn 1 nấc nhẹ để học viên học hỏi), rồi viết lại phiên bản hoàn chỉnh dựa trên CHÍNH Ý TƯỞNG CỦA HỌC VIÊN ở đúng "suggested_level" đó — giữ nguyên phong thái tự nhiên, KHÔNG hạ cấp câu B2/C1 xuống B1.

NẾU FILE GHI ÂM IM LẶNG, CHỈ CÓ TIẾNG ỒN, HOẶC KHÔNG CÓ TIẾNG ANH:
- TUYỆT ĐỐI KHÔNG tự nghĩ ra hay bịa đặt nội dung bài nói trong "recognized_transcript" — hãy đặt "recognized_transcript": "".
- Trả về JSON hợp lệ với các điểm "criterion_scores" = 0, "internal_score": 0, "estimated_band": "Chưa đạt B1", nhắc nhẹ nhàng để học viên kiểm tra micro và ghi âm lại, kèm gợi ý trong "idea_expansions" và "natural_spoken_version".

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ (không bọc markdown ngoài JSON) theo đúng cấu trúc sau:
{
  "criterion_scores": {
    "grammar": "<số 0.0-10.0 bước 0.5>",
    "vocabulary": "<số 0.0-10.0 bước 0.5>",
    "pronunciation": "<số 0.0-10.0 bước 0.5>",
    "fluency": "<số 0.0-10.0 bước 0.5>",
    "discourse_management": "<số 0.0-10.0 bước 0.5>"
  },
  "internal_score": "<trung bình cộng 5 tiêu chí trên, làm tròn bước 0.25>",
  "level_assessment": "Nhận xét ngắn gọn 1 cụm về năng lực thực tế (TUYỆT ĐỐI không ghi điểm số)",
  "estimated_band": "Chưa đạt B1 | Xấp xỉ B1 | Đạt B1 | Xấp xỉ B2 | Đạt B2 | Xấp xỉ C1 | Đạt C1",
  "suggested_level": "B1 | B2 | C1",
  "overall_comment": "2-3 câu nhận xét tổng quan mang tính khích lệ và xây dựng bằng tiếng Việt (TUYỆT ĐỐI không ghi con số điểm): khen rõ điểm nổi bật trước, rồi nêu định hướng cải thiện trọng tâm.",
  "next_level_tip": "1-2 câu gợi ý bước đi cụ thể nhất để nâng cấp bài nói lên mức tiếp theo (TUYỆT ĐỐI không ghi con số điểm).",
  "criteria": {
    "grammar": "Nhận xét mang tính xây dựng về độ đa dạng và độ chính xác cấu trúc câu theo VSTEP Band Descriptor (bỏ qua đuôi -s/-es/-ed chia động từ).",
    "vocabulary": "Nhận xét về vốn từ, độ tự nhiên, collocations/idioms và các chỗ Vietlish (nếu có).",
    "pronunciation": "Nhận xét về độ rõ chữ, dễ hiểu, âm cuối gốc của từ, trọng âm và ngữ điệu.",
    "fluency": "Nhận xét về độ trôi chảy, tốc độ, nhịp nói, ngập ngừng và khả năng tự sửa lỗi.",
    "discourse_management": "Nhận xét về độ bám sát đề, cách sắp xếp mạch ý, phát triển chi tiết/ví dụ và từ nối."
  },
  "pronunciation_fixes": [
    {
      "word": "từ phát âm chưa chuẩn hoặc mất final sound gốc",
      "ipa": "/phiên âm US IPA/",
      "issue_vi": "Mô tả nhẹ nhàng, dễ hiểu lỗi phát âm/trọng âm và mẹo đọc chuẩn"
    }
  ],
  "language_corrections": [
    {
      "id": 1,
      "original": "cụm từ gốc trong bài nói",
      "corrected": "cách diễn đạt chuẩn xác, tự nhiên hơn phù hợp năng lực học viên",
      "category": "Ngữ pháp | Vietlish | Từ vựng tự nhiên | Nâng cấp diễn đạt",
      "explanation_vi": "Giải thích ngắn gọn, tích cực lý do và hiệu quả của cách diễn đạt mới"
    }
  ],
  "idea_expansions": [
    {
      "where_vi": "Phần có thể đào sâu thêm",
      "issue_vi": "Gợi ý mở rộng thêm chi tiết, ví dụ hoặc góc nhìn để bài nói thuyết phục hơn",
      "suggested_en": "1-2 câu tiếng Anh mẫu tự nhiên",
      "meaning_vi": "Nghĩa tiếng Việt tương ứng"
    }
  ],
  "natural_spoken_version": "Phiên bản bài nói hoàn chỉnh, tự nhiên, giữ nguyên ý tưởng của học viên ở đúng mức suggested_level"
}`;
}

function roundQuarterStep(score: number): number {
  if (!Number.isFinite(score)) return 0;
  const clamped = Math.max(0, Math.min(10, score));
  return Math.round(clamped * 4) / 4;
}

function scoreToBandLabel(score: number): string {
  const r = roundQuarterStep(score);
  if (r >= 9.0) return "Đạt C1";
  if (r >= 8.75) return "Xấp xỉ C1";
  if (r >= 6.0) return "Đạt B2";
  if (r >= 5.75) return "Xấp xỉ B2";
  if (r >= 4.0) return "Đạt B1";
  if (r >= 3.75) return "Xấp xỉ B1";
  return "Chưa đạt B1";
}

function stripNumericScores(text: string): string {
  return String(text || "")
    .replace(/[·\-–—]?\s*\(?\s*\d+([.,]\d+)?\s*\/\s*10\s*\)?/gi, "")
    .replace(/\(\s*\d+([.,]\d+)?\s*(?:điểm|đ|pts?)\s*\)/gi, "")
    .replace(/\b(?:band|mức điểm|số điểm)\s*\d+([.,]\d+)?\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeLevelBandLabel(rawBand: string, rawAssess: string): string {
  const combined = `${rawBand || ""} ${rawAssess || ""}`.toLowerCase();
  if (/xấp xỉ\s*c1|gần\s*(đạt\s*)?(mức\s*)?c1|c1-/.test(combined)) return "Xấp xỉ C1";
  if (/đạt\s*(mức\s*)?c1|\bc1\b/.test(combined)) return "Đạt C1";
  if (/xấp xỉ\s*b2|gần\s*(đạt\s*)?(mức\s*)?b2|b1\+|b2-/.test(combined)) return "Xấp xỉ B2";
  if (/đạt\s*(mức\s*)?b2|\bb2\b/.test(combined)) return "Đạt B2";
  if (/chưa\s*đạt\s*(mức\s*)?b1|dưới\s*b1|\ba1\b|\ba2\b/.test(combined)) return "Chưa đạt B1";
  if (/xấp xỉ\s*b1|gần\s*(đạt\s*)?(mức\s*)?b1|b1-/.test(combined)) return "Xấp xỉ B1";
  if (/đạt\s*(mức\s*)?b1|\bb1\b/.test(combined)) return "Đạt B1";
  return "Xấp xỉ B1";
}

const PLURAL_DETERMINERS = new Set([
  "many", "two", "three", "four", "five", "some", "several", "few", "both",
  "these", "those", "all", "other", "different", "various", "lots", "lot"
]);

function isIgnoredVerbInflectionPronFix(word: string, issueVi: string): boolean {
  const wLower = String(word || "").trim().toLowerCase().replace(/[^a-z']/g, "");
  const issueLower = String(issueVi || "").toLowerCase();
  const mentionsVerbInflection =
    /(?:đuôi|âm cuối|phát âm thiếu|nuốt âm|quên)\s*(?:chữ\s*)?["']?-?(?:ed|es|s)["']?/.test(issueLower) &&
    /(?:chia động từ|động từ|quá khứ|ngôi thứ 3|chủ ngữ số ít|đuôi\s*["']?-?ed["']?|âm\s*["']?-?ed["']?)/.test(issueLower);
  if (mentionsVerbInflection) return true;
  if (
    wLower.endsWith("ed") &&
    /(?:đuôi\s*["']?-?ed["']?|thiếu\s*["']?-?ed["']?|âm\s*\/?[tdɪd]+\/?\s*cuối|chia\s*quá\s*khứ)/.test(issueLower)
  ) {
    return true;
  }
  return false;
}

function isIgnoredVerbInflectionFix(original: string, corrected: string, category: string, explanation: string): boolean {
  const expLower = String(explanation || "").toLowerCase();
  if (
    (expLower.includes("chia động từ") || expLower.includes("ngôi thứ 3") || expLower.includes("chủ ngữ số ít")) &&
    /(?:thêm|thiếu|quên|đuôi)\s*["']?-?(?:s|es|ed)["']?/.test(expLower)
  ) {
    return true;
  }
  if (!String(category || "").toLowerCase().includes("ngữ pháp")) return false;

  const cleanTokens = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9'\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  const origWords = cleanTokens(original);
  const corrWords = cleanTokens(corrected);
  if (origWords.length === 0 || origWords.length !== corrWords.length) return false;

  let diffIdx = -1;
  for (let i = 0; i < origWords.length; i++) {
    if (origWords[i] !== corrWords[i]) {
      if (diffIdx !== -1) return false;
      diffIdx = i;
    }
  }
  if (diffIdx === -1) return false;

  const wOrig = origWords[diffIdx];
  const wCorr = corrWords[diffIdx];
  const isAddingVerbS =
    wCorr === wOrig + "s" ||
    wCorr === wOrig + "es" ||
    (wOrig.endsWith("y") && wCorr === wOrig.slice(0, -1) + "ies");
  const isAddingVerbEd =
    wCorr === wOrig + "ed" ||
    wCorr === wOrig + "d" ||
    (wOrig.endsWith("y") && wCorr === wOrig.slice(0, -1) + "ied");

  if (isAddingVerbEd && /(?:phát âm|đuôi\s*["']?-?ed["']?|chia động từ)/.test(expLower)) {
    return true;
  }

  if (!isAddingVerbS) return false;

  const prevWord = diffIdx > 0 ? origWords[diffIdx - 1] : "";
  if (PLURAL_DETERMINERS.has(prevWord)) return false;

  const singularSubjects = new Set([
    "he", "she", "it", "this", "that", "which", "who", "everyone", "everybody",
    "someone", "somebody", "nobody", "nothing", "everything", "weather", "mother",
    "father", "mom", "dad", "friend", "brother", "sister", "teacher", "music", "travel", "travelling"
  ]);
  return singularSubjects.has(prevWord);
}

function parseHalfStepScore(val: unknown): number | null {
  if (val === null || val === undefined || val === "") return null;
  const n = Number(val);
  if (!Number.isFinite(n)) return null;
  const clamped = Math.max(0, Math.min(10, n));
  return Math.round(clamped * 2) / 2;
}

function extractRawJsonObject(rawText: string): Record<string, unknown> {
  const trimmed = String(rawText || "").trim();
  const unfenced = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const tryParse = (str: string): unknown => {
    try {
      return JSON.parse(str);
    } catch (_e) {
      return JSON.parse(str.replace(/,\s*([}\]])/g, "$1"));
    }
  };

  let parsed: unknown;
  try {
    parsed = tryParse(unfenced);
  } catch (_e) {
    const firstBrace = unfenced.indexOf("{");
    const lastBrace = unfenced.lastIndexOf("}");
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      parsed = tryParse(unfenced.slice(firstBrace, lastBrace + 1));
    } else {
      throw _e;
    }
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Phản hồi AI không phải JSON object hợp lệ");
  }
  return parsed as Record<string, unknown>;
}

function normalizePronFixesList(rawList: unknown, limit = 6): Array<{ word: string; ipa: string; issue_vi: string }> {
  if (!Array.isArray(rawList)) return [];
  const seen = new Set<string>();
  const out: Array<{ word: string; ipa: string; issue_vi: string }> = [];
  for (const rawItem of rawList) {
    const p = (rawItem && typeof rawItem === "object" ? rawItem : {}) as Record<string, unknown>;
    const word = String(p.word || "").trim();
    const ipa = String(p.ipa || "").trim();
    const issue_vi = String(p.issue_vi || "").trim();
    if (!word || !issue_vi) continue;
    if (isIgnoredVerbInflectionPronFix(word, issue_vi)) continue;
    const normKey = word.toLowerCase().replace(/[^a-z0-9']/g, "");
    if (!normKey || seen.has(normKey)) continue;
    seen.add(normKey);
    out.push({ word, ipa, issue_vi });
    if (out.length >= limit) break;
  }
  return out;
}

function parseStage1AudioJson(rawText: string): Stage1AudioAnalysis {
  const obj = extractRawJsonObject(rawText);
  if (typeof obj.recognized_transcript !== "string") {
    throw new Error("Bước 1 thiếu trường recognized_transcript hợp lệ");
  }
  const transcript = obj.recognized_transcript.trim();
  const hasSpeech =
    typeof obj.has_english_speech === "boolean" ? obj.has_english_speech && transcript.length > 0 : transcript.length > 0;
  return {
    recognized_transcript: hasSpeech ? transcript : "",
    has_english_speech: hasSpeech,
    pronunciation_notes_vi: stripNumericScores(String(obj.pronunciation_notes_vi || "")),
    fluency_notes_vi: stripNumericScores(String(obj.fluency_notes_vi || "")),
    pronunciation_band_estimate: parseHalfStepScore(obj.pronunciation_band_estimate),
    fluency_band_estimate: parseHalfStepScore(obj.fluency_band_estimate),
    pronunciation_fixes: normalizePronFixesList(obj.pronunciation_fixes, 6)
  };
}

function extractGeminiCandidateText(geminiJson: Record<string, unknown>): string {
  const candidates = Array.isArray(geminiJson?.candidates) ? geminiJson.candidates : [];
  const firstCand = (candidates[0] && typeof candidates[0] === "object" ? candidates[0] : {}) as Record<string, unknown>;
  const finishReason = String(firstCand?.finishReason || "");
  const content = (firstCand?.content && typeof firstCand.content === "object" ? firstCand.content : {}) as Record<string, unknown>;
  const candParts = Array.isArray(content?.parts) ? content.parts : [];
  const nonThoughtText = candParts
    .filter((p: Record<string, unknown>) => !p?.thought && typeof p?.text === "string")
    .map((p: Record<string, unknown>) => String(p.text))
    .join("");
  const rawCandidate = nonThoughtText || String((candParts[0] as Record<string, unknown> | undefined)?.text || "");
  if (!String(rawCandidate).trim()) {
    throw new Error(`Phản hồi rỗng từ Gemini${finishReason ? ` (finishReason: ${finishReason})` : ""}`);
  }
  return rawCandidate;
}

function buildGeminiGenerationConfig(
  modelName: string,
  opts: { temperature: number; maxOutputTokens: number; thinkingBudget: number; includeThinkingConfig?: boolean }
): Record<string, unknown> {
  const cfg: Record<string, unknown> = {
    temperature: opts.temperature,
    maxOutputTokens: opts.maxOutputTokens,
    responseMimeType: "application/json"
  };
  if (opts.includeThinkingConfig !== false) {
    const lower = String(modelName || "").toLowerCase();
    const supportsThinking =
      lower.includes("2.5") ||
      lower.includes("flash-latest") ||
      lower.includes("flash-lite-latest") ||
      lower.includes("gemini-3");
    if (supportsThinking) {
      const isPro = lower.includes("-pro");
      cfg.thinkingConfig = {
        thinkingBudget: isPro ? Math.max(128, opts.thinkingBudget) : Math.max(0, opts.thinkingBudget)
      };
    }
  }
  return cfg;
}

function parseModelJson(rawText: string): Record<string, unknown> {
  const obj = extractRawJsonObject(rawText);
  const critObj =
    obj.criteria && typeof obj.criteria === "object" && !Array.isArray(obj.criteria)
      ? (obj.criteria as Record<string, unknown>)
      : null;
  const critScoresObj =
    obj.criterion_scores && typeof obj.criterion_scores === "object" && !Array.isArray(obj.criterion_scores)
      ? (obj.criterion_scores as Record<string, unknown>)
      : null;
  const hasRealContent =
    (typeof obj.overall_comment === "string" && obj.overall_comment.trim().length > 0) ||
    (typeof obj.estimated_band === "string" && obj.estimated_band.trim().length > 0) ||
    (typeof obj.natural_spoken_version === "string" && obj.natural_spoken_version.trim().length > 0) ||
    Boolean(critObj && Object.values(critObj).some(v => typeof v === "string" && v.trim().length > 0)) ||
    Boolean(critScoresObj && Object.values(critScoresObj).some(v => typeof v === "number" && Number.isFinite(v)));
  if (!hasRealContent) {
    throw new Error("Phản hồi AI thiếu nội dung chấm bài hợp lệ");
  }
  return obj;
}

interface AttemptRow {
  id: string;
  user_id: string;
  topic_id: string;
  topic_title?: string;
  question_id: string;
  prompt_text?: string;
  target_level?: string;
  take_number?: number;
  duration_sec?: number;
  transcript?: string;
  audio_path?: string;
  is_submitted?: boolean;
  submitted_at?: string;
  ai_status?: string;
  ai_release_at?: string;
  created_at?: string;
}

interface ReviewRow {
  id: string;
  attempt_id: string;
  user_id?: string;
  question_id?: string;
  grade_count?: number;
  retry_count?: number;
  release_at?: string;
  status?: string;
  review_json?: Record<string, unknown> | null;
  updated_at?: string;
}

async function claimGradingLock(
  admin: SupabaseClient,
  att: AttemptRow,
  existingReview: ReviewRow | null,
  forceTeacher: boolean
): Promise<boolean> {
  const staleSec = Math.floor(STALE_GRADING_MS / 1000);
  try {
    const { data: rpcData, error: rpcErr } = await admin.rpc("claim_speaking_attempt_lock", {
      p_attempt_id: att.id,
      p_stale_seconds: staleSec,
      p_force: Boolean(forceTeacher)
    });
    if (!rpcErr && typeof rpcData === "boolean") {
      return rpcData;
    }
    const errMsg = String(rpcErr?.message || "");
    const errCode = String(rpcErr?.code || "");
    const isMissingRpc =
      errCode === "PGRST202" ||
      errCode === "42883" ||
      /claim_speaking_attempt_lock|schema cache|does not exist/i.test(errMsg);
    if (!isMissingRpc && rpcErr) {
      return false;
    }
  } catch (_e) {
    // Fallback to conditional PostgREST update below
  }

  if (forceTeacher) {
    await admin.from("speaking_attempts").update({ ai_status: "grading" }).eq("id", att.id);
    return true;
  }

  if (att.ai_status !== "grading") {
    const { data: claimedRows, error: claimErr } = await admin
      .from("speaking_attempts")
      .update({ ai_status: "grading" })
      .eq("id", att.id)
      .neq("ai_status", "grading")
      .select("id");
    if (claimErr) return false;
    return Array.isArray(claimedRows) && claimedRows.length > 0;
  }

  if (isGradingLockActive(att, existingReview, Date.now())) {
    return false;
  }

  // Reclaim stale lock atomically via updated_at CAS on existingReview if available
  if (existingReview && existingReview.id && existingReview.updated_at) {
    const { data: reclaimed } = await admin
      .from("speaking_ai_reviews")
      .update({ status: "grading", updated_at: new Date().toISOString() })
      .eq("id", existingReview.id)
      .eq("updated_at", existingReview.updated_at)
      .select("id");
    if (!Array.isArray(reclaimed) || reclaimed.length === 0) {
      return false;
    }
  }
  await admin.from("speaking_attempts").update({ ai_status: "grading" }).eq("id", att.id);
  return true;
}

async function isAttemptSuperseded(admin: SupabaseClient, att: AttemptRow): Promise<boolean> {
  try {
    const { data: latestSub } = await admin
      .from("speaking_attempts")
      .select("id, submitted_at, created_at")
      .eq("user_id", att.user_id)
      .eq("question_id", att.question_id)
      .eq("is_submitted", true)
      .order("submitted_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (!latestSub || latestSub.id === att.id) return false;
    const latestMs = new Date(latestSub.submitted_at || latestSub.created_at || 0).getTime();
    const attMs = new Date(att.submitted_at || att.created_at || 0).getTime();
    return latestMs >= attMs;
  } catch (_e) {
    return false;
  }
}

function isGradingLockActive(att: AttemptRow, rev: ReviewRow | null, nowMs: number): boolean {
  const isAttGrading = att.ai_status === "grading";
  const isRevGrading = Boolean(rev && rev.attempt_id === att.id && rev.status === "grading");
  if (!isAttGrading && !isRevGrading) return false;
  const refIso = (rev && rev.attempt_id === att.id && rev.updated_at) || att.submitted_at || att.created_at;
  if (!refIso) return false;
  const refMs = new Date(refIso).getTime();
  return !isNaN(refMs) && nowMs - refMs < STALE_GRADING_MS;
}

async function gradeSingleAttempt(
  admin: SupabaseClient,
  geminiApiKey: string,
  geminiModel: string,
  att: AttemptRow,
  existingReview: ReviewRow | null,
  options: {
    isTeacherOrCron: boolean;
    forceTeacher?: boolean;
    releaseNow: boolean;
    timeBudgetMs?: number;
    transcribeModel?: string;
    gradeModel?: string;
    overridePromptText?: string;
    overrideTopicTitle?: string;
    overrideTargetLevel?: string;
  }
) {
  const reviewId = existingReview?.id || `${att.user_id}__${att.question_id}`;
  const nowMs = Date.now();
  const hasExistingReadyReview = Boolean(
    existingReview && existingReview.attempt_id === att.id && existingReview.status === "ready"
  );

  // Deduplication: if this exact attempt is already graded, return cached review unless teacher forced re-grade
  if (hasExistingReadyReview && !options.forceTeacher) {
    const cachedReleaseAt = existingReview?.release_at || att.ai_release_at || new Date(nowMs).toISOString();
    const isAlreadyRel = new Date(cachedReleaseAt).getTime() <= nowMs;
    return {
      ok: true,
      status: 200,
      ai_status: isAlreadyRel ? "ready" : "scheduled",
      release_at: cachedReleaseAt,
      transcript_source: String((existingReview?.review_json as Record<string, unknown>)?.transcript_source || "audio"),
      recognized_transcript: String(
        (existingReview?.review_json as Record<string, unknown>)?.recognized_transcript ?? att.transcript ?? ""
      ).trim(),
      review_json: existingReview?.review_json || undefined
    };
  }

  const prevCount = existingReview?.grade_count || 0;
  const prevRetry = existingReview?.retry_count || 0;

  if (!options.isTeacherOrCron && prevCount >= MAX_STUDENT_GRADES_PER_QUESTION) {
    return {
      ok: false,
      status: 429,
      error: `Bạn đã dùng hết ${MAX_STUDENT_GRADES_PER_QUESTION} lượt chấm AI cho câu hỏi này.`
    };
  }

  // Fast-path concurrency guard before atomic lock claim
  if (!options.forceTeacher && isGradingLockActive(att, existingReview, nowMs)) {
    return {
      ok: true,
      status: 200,
      ai_status: "grading",
      release_at: existingReview?.release_at || att.ai_release_at || new Date(nowMs + RELEASE_DELAY_HOURS * 3600 * 1000).toISOString(),
      recognized_transcript: String(att.transcript || "").trim()
    };
  }

  // Claim atomic row lock BEFORE downloading audio or calling Gemini
  const lockAcquired = await claimGradingLock(admin, att, existingReview, Boolean(options.forceTeacher));
  if (!lockAcquired) {
    return {
      ok: true,
      status: 200,
      ai_status: "grading",
      release_at: existingReview?.release_at || att.ai_release_at || new Date(nowMs + RELEASE_DELAY_HOURS * 3600 * 1000).toISOString(),
      recognized_transcript: String(att.transcript || "").trim()
    };
  }

  const browserTranscript = String(att.transcript || "").trim();
  const wordCount = browserTranscript.split(/\s+/).filter(Boolean).length;
  const targetLevel =
    String(options.overrideTargetLevel || att.target_level || "B1").toUpperCase() === "B2"
      ? "B2"
      : "B1";
  const topicTitle = String(options.overrideTopicTitle || att.topic_title || att.topic_id || "Speaking Part 1").trim();
  const promptText = String(options.overridePromptText || att.prompt_text || att.question_id || "").trim();

  let isCorrectionOnlyClass = false;
  try {
    const { data: profData } = await admin
      .from("profiles")
      .select("full_name")
      .eq("id", att.user_id)
      .maybeSingle();
    isCorrectionOnlyClass = /^\[C1\]\s*/i.test(String(profData?.full_name || "").trim());
  } catch (_e) {
    isCorrectionOnlyClass = false;
  }

  const lockNowMs = Date.now();
  const lockNowIso = new Date(lockNowMs).toISOString();
  const submittedMs = new Date(att.submitted_at || att.created_at || lockNowMs).getTime();
  const baseSubmitMs = isNaN(submittedMs) ? lockNowMs : submittedMs;

  let releaseAtIso = new Date(baseSubmitMs + RELEASE_DELAY_HOURS * 60 * 60 * 1000).toISOString();
  if (options.isTeacherOrCron && options.releaseNow) {
    releaseAtIso = lockNowIso;
  } else if (existingReview && existingReview.attempt_id === att.id && existingReview.release_at) {
    releaseAtIso = existingReview.release_at;
  } else if (att.ai_release_at) {
    releaseAtIso = att.ai_release_at;
  }

  const restoreAttemptOnPreservedReady = async () => {
    const existingRelIso = existingReview?.release_at || releaseAtIso;
    const isAlreadyRel = new Date(existingRelIso).getTime() <= Date.now();
    await admin
      .from("speaking_attempts")
      .update({ ai_status: isAlreadyRel ? "ready" : "scheduled", ai_release_at: existingRelIso })
      .eq("id", att.id);
  };

  try {
    await admin
      .from("speaking_attempts")
      .update({
        ai_status: "grading",
        ai_release_at: releaseAtIso,
        target_level: targetLevel,
        topic_title: topicTitle,
        prompt_text: promptText
      })
      .eq("id", att.id);

    if (!hasExistingReadyReview) {
      await admin.from("speaking_ai_reviews").upsert(
        {
          id: reviewId,
          attempt_id: att.id,
          user_id: att.user_id,
          topic_id: att.topic_id || "",
          topic_title: topicTitle,
          question_id: att.question_id,
          prompt_text: promptText,
          target_level: targetLevel,
          status: "grading",
          release_at: releaseAtIso,
          error_message: "",
          grade_count: prevCount,
          retry_count: prevRetry,
          updated_at: new Date().toISOString()
        },
        { onConflict: "id" }
      );
    }

    // Kiểm tra checkpoint Bước 1 (audio đã được nghe & chép lời sẵn từ lần chạy trước cùng attempt_id)
    const rawCachedStage1 =
      !options.forceTeacher &&
      existingReview &&
      existingReview.attempt_id === att.id &&
      existingReview.review_json &&
      typeof existingReview.review_json === "object"
        ? ((existingReview.review_json as Record<string, unknown>).stage1_cache as Record<string, unknown> | undefined)
        : undefined;

    let stage1Result: Stage1AudioAnalysis | null =
      rawCachedStage1 &&
      rawCachedStage1.attempt_id === att.id &&
      typeof rawCachedStage1.recognized_transcript === "string"
        ? {
            attempt_id: att.id,
            recognized_transcript: String(rawCachedStage1.recognized_transcript || "").trim(),
            has_english_speech: Boolean(rawCachedStage1.has_english_speech),
            pronunciation_notes_vi: String(rawCachedStage1.pronunciation_notes_vi || "").trim(),
            fluency_notes_vi: String(rawCachedStage1.fluency_notes_vi || "").trim(),
            pronunciation_band_estimate: parseHalfStepScore(rawCachedStage1.pronunciation_band_estimate),
            fluency_band_estimate: parseHalfStepScore(rawCachedStage1.fluency_band_estimate),
            pronunciation_fixes: normalizePronFixesList(rawCachedStage1.pronunciation_fixes, 6)
          }
        : null;

    let audioBase64 = "";
    let audioMimeType = "audio/webm";
    let audioTooLarge = false;
    let audioDownloadErrorMsg = "";

    if (!stage1Result && att.audio_path) {
      for (let dlTry = 0; dlTry < 2; dlTry++) {
        try {
          const { data: audioBlob, error: dlErr } = await promiseWithTimeout(
            admin.storage.from(AUDIO_BUCKET).download(att.audio_path),
            STORAGE_DOWNLOAD_TIMEOUT_MS,
            "Storage download"
          );
          if (!dlErr && audioBlob && audioBlob.size > 0) {
            if (audioBlob.size > MAX_INLINE_AUDIO_BYTES) {
              audioTooLarge = true;
              break;
            }
            const rawAb = await audioBlob.arrayBuffer();
            if (rawAb.byteLength > MAX_INLINE_AUDIO_BYTES) {
              audioTooLarge = true;
              break;
            }
            const rawMime = resolveCleanAudioMimeType(att.audio_path, audioBlob.type);
            const cleaned = trimCorruptedAudioPrefix(rawAb, rawMime);
            if (cleaned.buffer.byteLength > MAX_INLINE_AUDIO_BYTES) {
              audioTooLarge = true;
              break;
            }
            audioBase64 = arrayBufferToBase64(cleaned.buffer);
            audioMimeType = cleaned.mimeType;
            break;
          }
          if (dlErr) {
            audioDownloadErrorMsg = dlErr.message || "Storage download error";
          }
        } catch (dlCatchErr) {
          audioDownloadErrorMsg = dlCatchErr instanceof Error ? dlCatchErr.message : "Storage download timeout";
          if (dlTry === 0) {
            await new Promise(r => setTimeout(r, 600));
          }
        }
      }
    }

    let usedAudio = Boolean(stage1Result || audioBase64);
    let audioFallbackReason = "";
    if (!usedAudio) {
      if (audioTooLarge) {
        audioFallbackReason = "File ghi âm quá lớn (> 14 MB) nên AI chấm tạm theo transcript trình duyệt.";
      } else if (att.audio_path) {
        audioFallbackReason = audioDownloadErrorMsg
          ? `Không tải được file ghi âm (${audioDownloadErrorMsg.slice(0, 80)}) nên AI chấm tạm theo transcript trình duyệt.`
          : "File ghi âm rỗng hoặc không đọc được nên AI chấm tạm theo transcript trình duyệt.";
      } else {
        audioFallbackReason = "Bài nộp không có tệp ghi âm nên AI chấm theo transcript trình duyệt.";
      }
    }

    if (!stage1Result && !audioBase64 && audioTooLarge && wordCount < 3) {
      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
      } else {
        await admin
          .from("speaking_attempts")
          .update({ ai_status: "no_audio" })
          .eq("id", att.id);
      }
      return {
        ok: false,
        status: 400,
        error: "File ghi âm quá lớn (> 14 MB) và không có transcript văn bản để chấm thay thế."
      };
    }

    if (!stage1Result && !audioBase64 && wordCount < 2) {
      const noAudioMsg =
        "Bản nộp không có tệp âm thanh và không có transcript văn bản để chấm (thường do học viên chưa cấp quyền micro hoặc dùng trình duyệt trong Zalo/Facebook). Học viên cần ghi âm lại và nộp lại.";
      const nowIsoNoAudio = new Date().toISOString();
      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
      } else if (!options.forceTeacher && (await isAttemptSuperseded(admin, att))) {
        await admin.from("speaking_attempts").update({ ai_status: "no_audio" }).eq("id", att.id);
      } else {
        await admin.from("speaking_ai_reviews").upsert(
          {
            id: reviewId,
            attempt_id: att.id,
            user_id: att.user_id,
            topic_id: att.topic_id || "",
            topic_title: topicTitle,
            question_id: att.question_id,
            prompt_text: promptText,
            target_level: targetLevel,
            status: "no_audio",
            release_at: att.ai_release_at || nowIsoNoAudio,
            error_message: noAudioMsg,
            grade_count: existingReview?.grade_count || 0,
            retry_count: MAX_AUTO_RETRIES,
            updated_at: nowIsoNoAudio
          },
          { onConflict: "id" }
        );
        await admin
          .from("speaking_attempts")
          .update({ ai_status: "no_audio" })
          .eq("id", att.id);
      }

      return {
        ok: false,
        status: 400,
        error: noAudioMsg
      };
    }

    const RETIRED_MODELS = new Set(["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash-exp"]);
    const buildModelChain = (primaryOverride?: string): string[] =>
      Array.from(
        new Set([
          primaryOverride || "",
          geminiModel,
          "gemini-2.5-flash",
          "gemini-flash-latest",
          "gemini-2.5-flash-lite",
          "gemini-flash-lite-latest"
        ])
      ).filter(m => Boolean(m) && !RETIRED_MODELS.has(m));

    const transcribeModels = buildModelChain(options.transcribeModel);
    const gradeModels = buildModelChain(options.gradeModel);

    const extractGeminiErrorMessage = (rawText: string): string => {
      const trimmed = String(rawText || "").trim();
      if (!trimmed) return "";
      try {
        const parsed = JSON.parse(trimmed);
        const msg = parsed?.error?.message || parsed?.message;
        if (msg) return String(msg).replace(/\s+/g, " ").trim();
      } catch (_e) {
        // keep raw text fallback
      }
      return trimmed.replace(/\s+/g, " ").trim();
    };

    const attemptDeadlineMs = Date.now() + (options.timeBudgetMs || 115_000);

    const callGeminiStage = async (cfg: {
      models: string[];
      parts: Array<Record<string, unknown>>;
      temperature: number;
      maxOutputTokens: number;
      thinkingBudget: number;
      perReqTimeoutMs: number;
    }) => {
      let okRes: Response | null = null;
      let usedModel = "";
      const errors: Array<{ model: string; status: number; detail: string }> = [];

      for (const modelName of cfg.models) {
        const remainingBeforeModel = attemptDeadlineMs - Date.now();
        if (remainingBeforeModel < 8000) break;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
        let modelStatus = 500;
        let modelErrText = "";
        let includeThinkingConfig = true;

        for (let attempt = 0; attempt < 2; attempt++) {
          const remainingMs = attemptDeadlineMs - Date.now();
          if (remainingMs < 8000) break;
          const reqTimeoutMs = Math.min(cfg.perReqTimeoutMs, remainingMs);
          try {
            const res = await fetchWithTimeout(
              endpoint,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ role: "user", parts: cfg.parts }],
                  generationConfig: buildGeminiGenerationConfig(modelName, {
                    temperature: cfg.temperature,
                    maxOutputTokens: cfg.maxOutputTokens,
                    thinkingBudget: cfg.thinkingBudget,
                    includeThinkingConfig
                  })
                })
              },
              reqTimeoutMs
            );
            if (res.ok) {
              okRes = res;
              usedModel = modelName;
              break;
            }
            modelStatus = res.status;
            modelErrText = await res.text().catch(() => "");
            // Nếu model không hỗ trợ thinkingConfig (HTTP 400), tự thử lại ngay không kèm thinkingConfig
            if (
              res.status === 400 &&
              includeThinkingConfig &&
              /thinking/i.test(modelErrText)
            ) {
              includeThinkingConfig = false;
              continue;
            }
            // 429: chuyển ngay sang model dự phòng có quota riêng
            if (res.status === 429) {
              break;
            }
            if (
              (res.status === 503 || res.status === 500 || res.status === 502 || res.status === 504) &&
              attempt === 0 &&
              attemptDeadlineMs - Date.now() >= 18000
            ) {
              await new Promise(r => setTimeout(r, 800 + Math.floor(Math.random() * 900)));
              continue;
            }
            break;
          } catch (fetchErr) {
            const isAbort = fetchErr instanceof Error && fetchErr.name === "AbortError";
            modelStatus = isAbort ? 504 : 503;
            modelErrText = isAbort
              ? `Gemini timeout (${Math.round(reqTimeoutMs / 1000)}s)`
              : fetchErr instanceof Error
                ? fetchErr.message
                : "Network error";
            if (attempt === 0 && attemptDeadlineMs - Date.now() >= 20000) {
              await new Promise(r => setTimeout(r, 800 + Math.floor(Math.random() * 900)));
              continue;
            }
            break;
          }
        }
        if (okRes) break;
        errors.push({
          model: modelName,
          status: modelStatus,
          detail: extractGeminiErrorMessage(modelErrText)
        });
        // Lỗi xác thực / payload sai (400/401/403) sẽ giống nhau trên mọi model, dừng sớm khỏi thử thêm
        if (modelStatus === 400 || modelStatus === 401 || modelStatus === 403) {
          break;
        }
      }
      return { okRes, usedModel, errors };
    };

    const failWithRetryOrPreserve = async (
      stageLabel: string,
      lastStatus: number,
      conciseDetail: string,
      isPermanentBadAudio = false
    ) => {
      const reasonLabel =
        lastStatus === 504
          ? `AI xử lý quá thời gian chờ ở ${stageLabel}`
          : lastStatus === 429
            ? `AI tạm chạm giới hạn lượt gọi ở ${stageLabel}`
            : `AI tạm gặp lỗi ở ${stageLabel}`;

      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
        return {
          ok: false,
          status: 502,
          rateLimited: lastStatus === 429,
          error: `${reasonLabel} (${lastStatus}) — đã giữ nguyên bài sửa cũ.`
        };
      }

      if (!options.forceTeacher && (await isAttemptSuperseded(admin, att))) {
        await admin.from("speaking_attempts").update({ ai_status: "" }).eq("id", att.id);
        return {
          ok: false,
          status: 409,
          error: "Đã có bản nộp mới hơn cho câu hỏi này."
        };
      }

      const rawNextRetry = prevRetry + 1;
      const nextRetry = isPermanentBadAudio && rawNextRetry >= 2 ? MAX_AUTO_RETRIES : rawNextRetry;
      const errNowIso = new Date().toISOString();
      const errPayload: Record<string, unknown> = {
        id: reviewId,
        attempt_id: att.id,
        user_id: att.user_id,
        topic_id: att.topic_id || "",
        topic_title: topicTitle,
        question_id: att.question_id,
        prompt_text: promptText,
        target_level: targetLevel,
        status: "error",
        release_at: releaseAtIso,
        error_message: `Gemini ${stageLabel} lỗi (${lastStatus}): ${conciseDetail.slice(0, 210)}`,
        grade_count: prevCount,
        retry_count: nextRetry,
        updated_at: errNowIso
      };
      // Nếu Bước 1 đã nghe xong, giữ nguyên stage1_cache để lần tự chấm lại sau nhảy thẳng vào Bước 2!
      if (stage1Result) {
        errPayload.review_json = {
          stage1_cache: { ...stage1Result, attempt_id: att.id }
        };
      }

      await admin.from("speaking_ai_reviews").upsert(errPayload, { onConflict: "id" });
      await admin
        .from("speaking_attempts")
        .update({ ai_status: "pending_retry", ai_release_at: releaseAtIso })
        .eq("id", att.id);

      return {
        ok: false,
        status: 502,
        rateLimited: lastStatus === 429,
        error: `${reasonLabel} (${lastStatus}) — đã xếp hàng đợi tự chấm lại (lần ${nextRetry}/${MAX_AUTO_RETRIES}).`
      };
    };

    // ========================================================================
    // BƯỚC 1: CHỈ NGHE AUDIO & CHÉP NGUYÊN VĂN + GHI NHẬN PHÁT ÂM / TRÔI CHẢY
    // (temperature = 0.0, thinkingBudget = 0 -> cực nhanh & chính xác cho bài dài)
    // ========================================================================
    let stage1ModelUsed = "";
    if (!stage1Result && audioBase64) {
      const stage1Prompt = buildAudioTranscribePrompt({
        topicTitle,
        promptText,
        durationSec: Number(att.duration_sec) || 0
      });
      const stage1Parts: Array<Record<string, unknown>> = [
        { inlineData: { mimeType: audioMimeType, data: audioBase64 } },
        { text: stage1Prompt }
      ];

      const s1Call = await callGeminiStage({
        models: transcribeModels,
        parts: stage1Parts,
        temperature: 0.0,
        maxOutputTokens: 4096,
        thinkingBudget: 0,
        perReqTimeoutMs: GEMINI_TRANSCRIBE_TIMEOUT_MS
      });

      if (!s1Call.okRes) {
        const hitAudioBadRequest = wordCount >= 3 && s1Call.errors.some(e => e.status === 400);
        if (hitAudioBadRequest) {
          usedAudio = false;
          audioFallbackReason = "File ghi âm bị lỗi cấu trúc/định dạng nên AI chấm tạm theo transcript trình duyệt.";
        } else {
          const pErr =
            s1Call.errors.find(e => e.status !== 404) || s1Call.errors[0] || { model: geminiModel, status: 500, detail: "" };
          const tried = s1Call.errors.map(e => `${e.model}:${e.status}`).join(", ");
          const detail = pErr.detail ? `${pErr.detail.slice(0, 150)} [${tried}]` : tried;
          return await failWithRetryOrPreserve("Bước 1 (nghe audio)", pErr.status, detail, pErr.status === 400 && wordCount < 3);
        }
      } else {
        stage1ModelUsed = s1Call.usedModel;
        try {
          const s1Json = (await s1Call.okRes.json()) as Record<string, unknown>;
          const s1RawText = extractGeminiCandidateText(s1Json);
          stage1Result = {
            ...parseStage1AudioJson(s1RawText),
            attempt_id: att.id
          };
          usedAudio = true;

          // Lưu checkpoint ngay sau Bước 1: cập nhật transcript chuẩn & cache phân tích âm thanh
          try {
            await admin
              .from("speaking_attempts")
              .update({ transcript: stage1Result.recognized_transcript })
              .eq("id", att.id);
            if (!hasExistingReadyReview) {
              await admin.from("speaking_ai_reviews").upsert(
                {
                  id: reviewId,
                  attempt_id: att.id,
                  user_id: att.user_id,
                  topic_id: att.topic_id || "",
                  topic_title: topicTitle,
                  question_id: att.question_id,
                  prompt_text: promptText,
                  target_level: targetLevel,
                  status: "grading",
                  release_at: releaseAtIso,
                  review_json: { stage1_cache: { ...stage1Result, attempt_id: att.id } },
                  error_message: "",
                  grade_count: prevCount,
                  retry_count: prevRetry,
                  updated_at: new Date().toISOString()
                },
                { onConflict: "id" }
              );
            }
          } catch (_ckptErr) {}
        } catch (s1ParseErr) {
          const parseMsg = s1ParseErr instanceof Error ? s1ParseErr.message : "JSON Bước 1 không hợp lệ";
          return await failWithRetryOrPreserve("Bước 1 (đọc transcript)", 502, parseMsg);
        }
      }
    }

    // ========================================================================
    // BƯỚC 2: CHẤM & SỬA BÀI THEO CHUẨN VSTEP (TEXT-ONLY — SIÊU NHANH & ỔN ĐỊNH)
    // ========================================================================
    const lockedTranscript =
      usedAudio && stage1Result ? stage1Result.recognized_transcript : browserTranscript;

    const stage2Prompt = buildSpeakingGradingPrompt({
      topicId: att.topic_id || "",
      questionId: att.question_id || "",
      topicTitle,
      promptText,
      spokenTranscript: lockedTranscript,
      durationSec: Number(att.duration_sec) || 0,
      targetLevel,
      hasAudio: Boolean(usedAudio && stage1Result),
      audioAnalysis: usedAudio ? stage1Result : null,
      correctionOnly: isCorrectionOnlyClass
    });

    const s2Call = await callGeminiStage({
      models: gradeModels,
      parts: [{ text: stage2Prompt }],
      temperature: 0.25,
      maxOutputTokens: 8192,
      thinkingBudget: 1024,
      perReqTimeoutMs: GEMINI_GRADE_TIMEOUT_MS
    });

    if (!s2Call.okRes) {
      const pErr =
        s2Call.errors.find(e => e.status !== 404) || s2Call.errors[0] || { model: geminiModel, status: 500, detail: "" };
      const tried = s2Call.errors.map(e => `${e.model}:${e.status}`).join(", ");
      const detail = pErr.detail ? `${pErr.detail.slice(0, 150)} [${tried}]` : tried;
      return await failWithRetryOrPreserve("Bước 2 (chấm điểm)", pErr.status, detail);
    }

    let parsedReview: Record<string, unknown> | null = null;
    try {
      const geminiJson = (await s2Call.okRes.json()) as Record<string, unknown>;
      const rawCandidate = extractGeminiCandidateText(geminiJson);
      parsedReview = parseModelJson(rawCandidate);
    } catch (parseErr) {
      const parseMsg = parseErr instanceof Error ? parseErr.message : "JSON Bước 2 không hợp lệ";
      return await failWithRetryOrPreserve("Bước 2 (đọc kết quả)", 502, parseMsg);
    }

    // Khóa chặt recognized_transcript đúng theo Bước 1 (Bước 2 không bao giờ được sửa/bịa transcript)
    const recognizedTranscript = lockedTranscript;

    const rawCritScores = (
      parsedReview?.criterion_scores &&
      typeof parsedReview.criterion_scores === "object" &&
      !Array.isArray(parsedReview.criterion_scores)
        ? parsedReview.criterion_scores
        : {}
    ) as Record<string, unknown>;

    const criterionScores = {
      grammar: parseHalfStepScore(rawCritScores.grammar),
      vocabulary: parseHalfStepScore(rawCritScores.vocabulary),
      pronunciation: parseHalfStepScore(rawCritScores.pronunciation),
      fluency: parseHalfStepScore(rawCritScores.fluency),
      discourse_management: parseHalfStepScore(rawCritScores.discourse_management)
    };

    const critScoreValues = [
      criterionScores.grammar,
      criterionScores.vocabulary,
      criterionScores.pronunciation,
      criterionScores.fluency,
      criterionScores.discourse_management
    ];
    const hasAllFiveCriterionScores = critScoreValues.every((v): v is number => v !== null);

    const rawInternalScore = Number(parsedReview?.internal_score);
    const hasValidScore =
      Number.isFinite(rawInternalScore) &&
      parsedReview?.internal_score !== "" &&
      parsedReview?.internal_score !== null &&
      parsedReview?.internal_score !== undefined;

    const roundedScore = hasAllFiveCriterionScores
      ? roundQuarterStep(critScoreValues.reduce((sum, v) => sum + v, 0) / 5)
      : hasValidScore
        ? roundQuarterStep(rawInternalScore)
        : null;

    const cleanBandLabel =
      roundedScore !== null
        ? scoreToBandLabel(roundedScore)
        : normalizeLevelBandLabel(
            String(parsedReview?.estimated_band || ""),
            String(parsedReview?.level_assessment || "")
          );

    // Ưu tiên lỗi phát âm nghe trực tiếp từ Bước 1 (audio) + bổ sung từ Bước 2 nếu còn chỗ (tối đa 6 từ)
    const rawCombinedPron = [
      ...(usedAudio && stage1Result ? stage1Result.pronunciation_fixes : []),
      ...(Array.isArray(parsedReview?.pronunciation_fixes) ? parsedReview.pronunciation_fixes : [])
    ];
    const dedupedPronFixes = normalizePronFixesList(rawCombinedPron, 6);

    // Deduplicate language corrections by (category + normalized original)
    const normalizeLangCategory = (rawCat: string): string => {
      const low = String(rawCat || "").toLowerCase();
      if (low.includes("vietlish") || low.includes("việt")) return "Vietlish";
      if (low.includes("nâng cấp") || low.includes("upgrade")) return "Nâng cấp diễn đạt";
      if (low.includes("ngữ pháp") || low.includes("grammar")) return "Ngữ pháp";
      return "Từ vựng tự nhiên";
    };

    const seenLangKeys = new Set<string>();
    const dedupedLangCorrections = Array.isArray(parsedReview?.language_corrections)
      ? parsedReview.language_corrections
          .map((rawItem: unknown) => {
            const c = (rawItem && typeof rawItem === "object" ? rawItem : {}) as Record<string, unknown>;
            return {
              original: String(c.original || "").trim(),
              corrected: String(c.corrected || "").trim(),
              category: normalizeLangCategory(String(c.category || "Từ vựng tự nhiên")),
              explanation_vi: String(c.explanation_vi || "").trim()
            };
          })
          .filter((c: { original: string; corrected: string; category: string; explanation_vi: string }) => {
            if (!c.original || !c.corrected) return false;
            if (c.original.toLowerCase() === c.corrected.toLowerCase()) return false;
            if (isIgnoredVerbInflectionFix(c.original, c.corrected, c.category, c.explanation_vi)) return false;
            const normKey = `${c.category.toLowerCase()}__${c.original.toLowerCase().replace(/[^a-z0-9\s']/g, "").trim()}`;
            if (seenLangKeys.has(normKey)) return false;
            seenLangKeys.add(normKey);
            return true;
          })
          .map((c: { original: string; corrected: string; category: string; explanation_vi: string }, idx: number) => ({
            id: idx + 1,
            ...c
          }))
      : [];

    const rawCriteria = (
      parsedReview?.criteria && typeof parsedReview.criteria === "object" && !Array.isArray(parsedReview.criteria)
        ? parsedReview.criteria
        : {}
    ) as Record<string, unknown>;

    const rawSuggestedLevel = String(parsedReview?.suggested_level || "").trim().toUpperCase();
    const cleanSuggestedLevel =
      rawSuggestedLevel === "C1" || rawSuggestedLevel === "B2" || rawSuggestedLevel === "B1"
        ? rawSuggestedLevel
        : cleanBandLabel.includes("C1")
          ? "C1"
          : cleanBandLabel.includes("B2")
            ? "B2"
            : "B1";

    const normalizedReview = {
      recognized_transcript: recognizedTranscript,
      grading_pipeline: "two_stage_v2",
      transcribe_model: stage1ModelUsed || (stage1Result ? "cached_stage1" : ""),
      grade_model: s2Call.usedModel || "",
      transcript_source: usedAudio ? "audio" : "browser_fallback",
      audio_fallback_reason: usedAudio ? "" : audioFallbackReason,
      correction_only: isCorrectionOnlyClass,
      criterion_scores: isCorrectionOnlyClass ? null : criterionScores,
      internal_score: isCorrectionOnlyClass ? null : roundedScore,
      level_assessment: isCorrectionOnlyClass
        ? ""
        : stripNumericScores(String(parsedReview?.level_assessment || "")),
      estimated_band: isCorrectionOnlyClass ? "" : cleanBandLabel,
      suggested_level: isCorrectionOnlyClass ? "" : cleanSuggestedLevel,
      overall_comment: stripNumericScores(String(parsedReview?.overall_comment || "")),
      next_level_tip: stripNumericScores(String(parsedReview?.next_level_tip || "")),
      criteria: {
        grammar: stripNumericScores(String(rawCriteria.grammar || "")),
        vocabulary: stripNumericScores(String(rawCriteria.vocabulary || rawCriteria.vocabulary_vietlish || "")),
        pronunciation: stripNumericScores(String(rawCriteria.pronunciation || rawCriteria.pronunciation_intonation || "")),
        fluency: stripNumericScores(String(rawCriteria.fluency || "")),
        discourse_management: stripNumericScores(String(rawCriteria.discourse_management || rawCriteria.coherence_logic || ""))
      },
      pronunciation_fixes: dedupedPronFixes,
      language_corrections: dedupedLangCorrections,
      idea_expansions: Array.isArray(parsedReview?.idea_expansions)
        ? parsedReview.idea_expansions
            .map((rawItem: unknown) => {
              const it = (rawItem && typeof rawItem === "object" ? rawItem : {}) as Record<string, unknown>;
              return {
                where_vi: String(it.where_vi || "").trim(),
                issue_vi: String(it.issue_vi || "").trim(),
                suggested_en: String(it.suggested_en || "").trim(),
                meaning_vi: String(it.meaning_vi || "").trim()
              };
            })
            .filter((it: { suggested_en: string; issue_vi: string }) => Boolean(it.suggested_en || it.issue_vi))
        : [],
      natural_spoken_version: String(parsedReview?.natural_spoken_version || "").trim()
    };

    if (!options.forceTeacher && (await isAttemptSuperseded(admin, att))) {
      await admin.from("speaking_attempts").update({ ai_status: "" }).eq("id", att.id);
      return {
        ok: false,
        status: 409,
        error: "Đã có bản nộp mới hơn cho câu hỏi này."
      };
    }

    const nextCount = options.isTeacherOrCron ? Math.max(1, prevCount) : prevCount + 1;
    const isAlreadyReleased = new Date(releaseAtIso).getTime() <= Date.now();
    const readyNowIso = new Date().toISOString();

    const { error: upsertRevErr } = await admin.from("speaking_ai_reviews").upsert(
      {
        id: reviewId,
        attempt_id: att.id,
        user_id: att.user_id,
        topic_id: att.topic_id || "",
        topic_title: topicTitle,
        question_id: att.question_id,
        prompt_text: promptText,
        target_level: targetLevel,
        status: "ready",
        release_at: releaseAtIso,
        review_json: normalizedReview,
        error_message: "",
        grade_count: nextCount,
        retry_count: 0,
        student_seen_at: null,
        updated_at: readyNowIso
      },
      { onConflict: "id" }
    );

    if (upsertRevErr) {
      return {
        ok: false,
        status: 500,
        error: `Lỗi lưu bài sửa vào speaking_ai_reviews: ${upsertRevErr.message}`
      };
    }

    const attemptUpdatePayload: Record<string, unknown> = {
      ai_status: isAlreadyReleased ? "ready" : "scheduled",
      ai_release_at: releaseAtIso
    };
    if (usedAudio && stage1Result) {
      attemptUpdatePayload.transcript = recognizedTranscript;
    } else if (recognizedTranscript && recognizedTranscript.length > browserTranscript.length) {
      attemptUpdatePayload.transcript = recognizedTranscript;
    }

    const { error: updAttErr } = await admin
      .from("speaking_attempts")
      .update(attemptUpdatePayload)
      .eq("id", att.id);

    if (updAttErr) {
      return {
        ok: false,
        status: 500,
        error: `Lỗi cập nhật trạng thái speaking_attempts: ${updAttErr.message}`
      };
    }

    return {
      ok: true,
      status: 200,
      ai_status: isAlreadyReleased ? "ready" : "scheduled",
      release_at: releaseAtIso,
      transcript_source: usedAudio ? "audio" : "browser_fallback",
      audio_fallback_reason: usedAudio ? "" : audioFallbackReason,
      recognized_transcript: recognizedTranscript,
      review_json: normalizedReview
    };
  } catch (unexpectedErr) {
    const errMsg = unexpectedErr instanceof Error ? unexpectedErr.message : "Lỗi ngoài ý muốn khi chấm bài";
    try {
      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
      } else if (!options.forceTeacher && (await isAttemptSuperseded(admin, att))) {
        await admin.from("speaking_attempts").update({ ai_status: "" }).eq("id", att.id);
      } else {
        const catchNowIso = new Date().toISOString();
        await admin.from("speaking_ai_reviews").upsert(
          {
            id: reviewId,
            attempt_id: att.id,
            user_id: att.user_id,
            topic_id: att.topic_id || "",
            topic_title: topicTitle,
            question_id: att.question_id,
            prompt_text: promptText,
            target_level: targetLevel,
            status: "error",
            release_at: releaseAtIso,
            error_message: `Lỗi hệ thống: ${errMsg.slice(0, 180)}`,
            grade_count: prevCount,
            retry_count: prevRetry + 1,
            updated_at: catchNowIso
          },
          { onConflict: "id" }
        );
        await admin
          .from("speaking_attempts")
          .update({ ai_status: "pending_retry", ai_release_at: releaseAtIso })
          .eq("id", att.id);
      }
    } catch (_releaseErr) {}
    return {
      ok: false,
      status: 500,
      error: errMsg
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY") || "";
    const geminiModel = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
    const geminiTranscribeModel = Deno.env.get("GEMINI_TRANSCRIBE_MODEL") || "";
    const geminiGradeModel = Deno.env.get("GEMINI_GRADE_MODEL") || "";
    const cronSecretEnv = Deno.env.get("CRON_SECRET") || "";

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return jsonResponse({ ok: false, error: "Thiếu cấu hình Supabase trên Edge Function." }, 500);
    }
    if (!geminiApiKey) {
      return jsonResponse({ ok: false, error: "Chưa cấu hình GEMINI_API_KEY trong Supabase Edge Functions Secrets." }, 500);
    }

    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const body = await req.json().catch(() => ({}));
    const mode = String(body?.mode || "single").trim();

    const incomingCronSecret = req.headers.get("x-cron-secret") || "";
    const isCronCall = Boolean(cronSecretEnv && incomingCronSecret && incomingCronSecret === cronSecretEnv);

    let callerId = "";
    let callerEmail = "";
    let isTeacher = false;

    if (!isCronCall) {
      const authHeader = req.headers.get("Authorization") || "";
      if (!authHeader.startsWith("Bearer ")) {
        return jsonResponse({ ok: false, error: "Chưa đăng nhập." }, 401);
      }
      const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
      const { data: authData, error: authErr } = await admin.auth.getUser(jwt);
      if (authErr || !authData?.user) {
        return jsonResponse({ ok: false, error: "Phiên đăng nhập không hợp lệ: " + (authErr?.message || "") }, 401);
      }
      callerId = authData.user.id;
      callerEmail = String(authData.user.email || "").trim().toLowerCase();
      const { data: teacherRow } = await admin
        .from("teachers")
        .select("email")
        .ilike("email", callerEmail)
        .maybeSingle();
      isTeacher = Boolean(teacherRow) || callerEmail === "mtung0208@gmail.com";
    }

    // ========================================================================
    // MODE 1: HÀNG ĐỢI TỰ ĐỘNG CHẤM LẠI (pg_cron mỗi 2 phút hoặc Giáo viên bấm)
    // ========================================================================
    if (mode === "process_queue") {
      if (!isCronCall && !isTeacher) {
        return jsonResponse({ ok: false, error: "Chỉ hệ thống hoặc Giáo viên được chạy hàng đợi chấm bài." }, 403);
      }

      const queueStartMs = Date.now();
      const batchSize = Math.max(1, Math.min(15, Number(body?.batch_size) || 8));

      const [{ data: pendingAttemptsRaw, error: attErr }, { data: retryReviewsRaw }] = await Promise.all([
        admin
          .from("speaking_attempts")
          .select("*")
          .eq("is_submitted", true)
          .or("ai_status.is.null,ai_status.eq.,ai_status.eq.pending,ai_status.eq.pending_retry,ai_status.eq.grading")
          .order("submitted_at", { ascending: true })
          .limit(500),
        admin
          .from("speaking_ai_reviews")
          .select("id, attempt_id, user_id, question_id, status, retry_count, grade_count, release_at, review_json, updated_at")
          .in("status", ["pending", "error", "grading"])
          .lt("retry_count", MAX_AUTO_RETRIES)
          .order("updated_at", { ascending: true })
          .limit(150)
      ]);

      if (attErr) {
        return jsonResponse({ ok: false, error: "Lỗi đọc danh sách bài nói chờ chấm: " + attErr.message }, 500);
      }

      const attemptPool: AttemptRow[] = Array.isArray(pendingAttemptsRaw) ? [...pendingAttemptsRaw] : [];
      const seenAttemptIds = new Set(attemptPool.map(a => a.id));

      // Bắt thêm các review pending/error bị lệch trạng thái với speaking_attempts
      const missingAttemptIds = (retryReviewsRaw || [])
        .map((r: ReviewRow) => r.attempt_id)
        .filter((id): id is string => Boolean(id) && !seenAttemptIds.has(id));

      if (missingAttemptIds.length > 0) {
        for (let i = 0; i < missingAttemptIds.length; i += 100) {
          const { data: extraAttempts } = await admin
            .from("speaking_attempts")
            .select("*")
            .in("id", missingAttemptIds.slice(i, i + 100))
            .eq("is_submitted", true);
          (extraAttempts || []).forEach((att: AttemptRow) => {
            if (!seenAttemptIds.has(att.id)) {
              seenAttemptIds.add(att.id);
              attemptPool.push(att);
            }
          });
        }
      }

      // Mỗi (user_id, question_id) chỉ lấy bản nộp mới nhất
      const latestByKey: Record<string, AttemptRow> = {};
      attemptPool.forEach((att: AttemptRow) => {
        const key = `${att.user_id}__${att.question_id}`;
        const prev = latestByKey[key];
        if (!prev) {
          latestByKey[key] = att;
          return;
        }
        const tPrev = new Date(prev.submitted_at || prev.created_at || 0).getTime();
        const tCurr = new Date(att.submitted_at || att.created_at || 0).getTime();
        if (tCurr >= tPrev) {
          latestByKey[key] = att;
        }
      });

      const reviewByKey: Record<string, ReviewRow> = {};
      (retryReviewsRaw || []).forEach((r: ReviewRow) => {
        if (!r) return;
        const k = r.user_id && r.question_id ? `${r.user_id}__${r.question_id}` : r.id;
        if (k) reviewByKey[k] = r;
      });

      const missingUsers = Array.from(
        new Set(
          Object.entries(latestByKey)
            .filter(([k]) => !reviewByKey[k])
            .map(([, att]) => att.user_id)
            .filter(Boolean)
        )
      );
      for (let i = 0; i < missingUsers.length; i += 50) {
        const chunkUsers = missingUsers.slice(i, i + 50);
        const { data: matchedRevs } = await admin
          .from("speaking_ai_reviews")
          .select("id, attempt_id, user_id, question_id, status, retry_count, grade_count, release_at, review_json, updated_at")
          .in("user_id", chunkUsers);
        (matchedRevs || []).forEach((r: ReviewRow) => {
          if (!r) return;
          const k = r.user_id && r.question_id ? `${r.user_id}__${r.question_id}` : r.id;
          if (k) reviewByKey[k] = r;
        });
      }

      const nowMs = Date.now();
      const emptyNoAudioAttempts: AttemptRow[] = [];
      const pendingList = Object.values(latestByKey)
        .filter((att: AttemptRow) => {
          const key = `${att.user_id}__${att.question_id}`;
          const rev = reviewByKey[key] || null;
          if (rev && rev.attempt_id === att.id && (rev.status === "ready" || rev.status === "no_audio")) return false;
          if (att.ai_status === "no_audio") return false;
          if (isGradingLockActive(att, rev, nowMs)) return false;
          if (!isTeacher && rev && rev.attempt_id === att.id && (rev.retry_count || 0) >= MAX_AUTO_RETRIES) return false;
          const wc = String(att.transcript || "").trim().split(/\s+/).filter(Boolean).length;
          if (!att.audio_path && wc < 2) {
            emptyNoAudioAttempts.push(att);
            return false;
          }
          // CHỈ áp dụng cooldown khi bài đã từng lỗi (status === "error" & retry_count > 0), không chặn bài mới nộp!
          if (
            !isTeacher &&
            rev &&
            rev.attempt_id === att.id &&
            rev.status === "error" &&
            (rev.retry_count || 0) > 0 &&
            rev.updated_at
          ) {
            const lastTryMs = new Date(rev.updated_at).getTime();
            const cooldownMs = getRetryCooldownMs(rev.retry_count || 0);
            if (!isNaN(lastTryMs) && nowMs - lastTryMs < cooldownMs) return false;
          }
          return true;
        })
        .sort((a, b) => {
          const keyA = `${a.user_id}__${a.question_id}`;
          const keyB = `${b.user_id}__${b.question_id}`;
          const revA = reviewByKey[keyA];
          const revB = reviewByKey[keyB];
          const isErrA = Boolean(revA && revA.attempt_id === a.id && revA.status === "error" && (revA.retry_count || 0) > 0);
          const isErrB = Boolean(revB && revB.attempt_id === b.id && revB.status === "error" && (revB.retry_count || 0) > 0);
          if (isErrA !== isErrB) return isErrA ? 1 : -1;
          if (isErrA && isErrB) {
            const retryDiff = (revA?.retry_count || 0) - (revB?.retry_count || 0);
            if (retryDiff !== 0) return retryDiff;
            const ua = new Date(revA?.updated_at || 0).getTime();
            const ub = new Date(revB?.updated_at || 0).getTime();
            if (ua !== ub) return ua - ub;
          }
          const ta = new Date(a.submitted_at || a.created_at || 0).getTime();
          const tb = new Date(b.submitted_at || b.created_at || 0).getTime();
          return ta - tb;
        });

      // Đánh dấu ngay các bài nộp rỗng (thiếu audio + transcript) là no_audio để không bao giờ kẹt hàng đợi
      if (emptyNoAudioAttempts.length > 0) {
        const nowIsoSkip = new Date().toISOString();
        const noAudioMsg =
          "Bản nộp không có tệp âm thanh và không có transcript văn bản để chấm. Học viên cần kiểm tra micro và ghi âm nộp lại.";
        for (const emptyAtt of emptyNoAudioAttempts.slice(0, 20)) {
          const emptyKey = `${emptyAtt.user_id}__${emptyAtt.question_id}`;
          const emptyRevId = reviewByKey[emptyKey]?.id || emptyKey;
          await admin.from("speaking_ai_reviews").upsert(
            {
              id: emptyRevId,
              attempt_id: emptyAtt.id,
              user_id: emptyAtt.user_id,
              topic_id: emptyAtt.topic_id || "",
              topic_title: String(emptyAtt.topic_title || emptyAtt.topic_id || "Speaking Part 1").trim(),
              question_id: emptyAtt.question_id,
              prompt_text: String(emptyAtt.prompt_text || emptyAtt.question_id || "").trim(),
              target_level: String(emptyAtt.target_level || "B1").toUpperCase() === "B2" ? "B2" : "B1",
              status: "no_audio",
              release_at: emptyAtt.ai_release_at || nowIsoSkip,
              error_message: noAudioMsg,
              grade_count: reviewByKey[emptyKey]?.grade_count || 0,
              retry_count: MAX_AUTO_RETRIES,
              updated_at: nowIsoSkip
            },
            { onConflict: "id" }
          );
          await admin.from("speaking_attempts").update({ ai_status: "no_audio" }).eq("id", emptyAtt.id);
        }
      }

      const slice = pendingList.slice(0, batchSize);
      const results: Array<{ id: string; ok: boolean; error?: string }> = [];
      let nextIdx = 0;
      let sharedRateLimited = false;
      const workerCount = Math.min(3, slice.length);

      const runWorker = async (workerIdx: number) => {
        while (nextIdx < slice.length) {
          if (Date.now() - queueStartMs >= QUEUE_TIME_BUDGET_MS - 15_000) break;
          if (sharedRateLimited && workerIdx > 0) break;
          const myIdx = nextIdx++;
          const att = slice[myIdx];
          const key = `${att.user_id}__${att.question_id}`;
          const res = await gradeSingleAttempt(
            admin,
            geminiApiKey,
            geminiModel,
            att,
            reviewByKey[key] || null,
            {
              isTeacherOrCron: true,
              releaseNow: false,
              timeBudgetMs: 65_000,
              transcribeModel: geminiTranscribeModel,
              gradeModel: geminiGradeModel
            }
          );
          results.push({ id: att.id, ok: res.ok, error: res.ok ? undefined : res.error });
          if ((res as { rateLimited?: boolean }).rateLimited) {
            sharedRateLimited = true;
            if (workerIdx > 0) break;
            await new Promise(r => setTimeout(r, 1500));
          } else if (nextIdx < slice.length) {
            await new Promise(r => setTimeout(r, sharedRateLimited ? 900 : 300));
          }
        }
      };

      await Promise.all(Array.from({ length: workerCount }, (_v, idx) => runWorker(idx)));

      return jsonResponse({
        ok: true,
        mode: "process_queue",
        pending_total: pendingList.length,
        processed: results.length,
        succeeded: results.filter(r => r.ok).length,
        failed: results.filter(r => !r.ok).length,
        results
      });
    }

    // ========================================================================
    // MODE 2: CHẤM 1 BẢN GHI ÂM CỤ THỂ (Học viên vừa nộp hoặc Giáo viên bấm chấm)
    // ========================================================================
    const attemptId = String(body?.attempt_id || "").trim();
    const releaseNow = Boolean(body?.release_now);
    const forceTeacher = Boolean(body?.force_teacher) && isTeacher;

    if (!attemptId) {
      return jsonResponse({ ok: false, error: "Thiếu attempt_id." }, 400);
    }

    const { data: att, error: attErr } = await admin
      .from("speaking_attempts")
      .select("*")
      .eq("id", attemptId)
      .maybeSingle();

    if (attErr) {
      return jsonResponse(
        { ok: false, error: `Lỗi đọc speaking_attempts (${attErr.code || "DB"}): ${attErr.message}` },
        500
      );
    }
    if (!att) {
      return jsonResponse({ ok: false, error: `Không tìm thấy bản ghi âm trên hệ thống (id: ${attemptId}).` }, 404);
    }
    if (att.user_id !== callerId && !isTeacher) {
      return jsonResponse({ ok: false, error: "Bạn không có quyền chấm bản ghi âm này." }, 403);
    }

    const { data: existingReview } = await admin
      .from("speaking_ai_reviews")
      .select("id, attempt_id, user_id, question_id, grade_count, retry_count, release_at, status, review_json, updated_at")
      .eq("user_id", att.user_id)
      .eq("question_id", att.question_id)
      .maybeSingle();

    const gradeRes = await gradeSingleAttempt(admin, geminiApiKey, geminiModel, att, existingReview || null, {
      isTeacherOrCron: isTeacher,
      forceTeacher,
      releaseNow,
      timeBudgetMs: 115_000,
      transcribeModel: geminiTranscribeModel,
      gradeModel: geminiGradeModel,
      overridePromptText: body?.prompt_text ? String(body.prompt_text) : undefined,
      overrideTopicTitle: body?.topic_title ? String(body.topic_title) : undefined,
      overrideTargetLevel: body?.target_level ? String(body.target_level) : undefined
    });

    if (!gradeRes.ok) {
      return jsonResponse({ ok: false, error: gradeRes.error }, gradeRes.status || 500);
    }

    return jsonResponse({
      ok: true,
      status: gradeRes.ai_status,
      release_at: gradeRes.release_at,
      transcript_source: (gradeRes as { transcript_source?: string }).transcript_source || "audio",
      audio_fallback_reason: (gradeRes as { audio_fallback_reason?: string }).audio_fallback_reason || "",
      recognized_transcript: gradeRes.recognized_transcript,
      review_json: isTeacher ? gradeRes.review_json : undefined
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Lỗi không xác định khi chấm bài nói.";
    return jsonResponse({ ok: false, error: msg }, 500);
  }
});
