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
const GEMINI_TIMEOUT_MS = 45 * 1000;
const STORAGE_DOWNLOAD_TIMEOUT_MS = 15 * 1000;
const QUEUE_TIME_BUDGET_MS = 95 * 1000;

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
    return { tc, headerBytes, blocks };
  };

  const clusters: Array<{ tc: number; headerBytes: Uint8Array; blocks: Array<{ relTc: number; bytes: Uint8Array }> }> = [];
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
    const diff = clusters[i].tc - clusters[i - 1].tc;
    if (diff < 0 || diff > 10000) {
      hasInterleaving = true;
      break;
    }
  }
  if (!hasInterleaving) {
    return ebmlOff > 0 ? u8.slice(ebmlOff) : null;
  }

  const outParts: Uint8Array[] = [u8.slice(ebmlOff, clusterOffsets[0])];
  let expectedTc = clusters[0].tc;
  for (let i = 0; i < clusters.length; i++) {
    const c = clusters[i];
    if (c.tc >= expectedTc && c.tc - expectedTc <= 5000) {
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
        const nextIsForeign = nextC.tc < c.tc || nextC.tc - c.tc > 10000;
        if (nextIsForeign && nextC.blocks.length > 0) {
          for (const fBlk of nextC.blocks) {
            if (fBlk.relTc >= lastRel + 40 && fBlk.relTc <= lastRel + 90) {
              outParts.push(fBlk.bytes);
              lastRel = fBlk.relTc;
            }
          }
        }
      }
      expectedTc = c.tc + 1;
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

function buildSpeakingGradingPrompt(params: {
  topicId: string;
  questionId: string;
  topicTitle: string;
  promptText: string;
  browserTranscript: string;
  durationSec: number;
  targetLevel: string;
  hasAudio: boolean;
}) {
  const level = String(params.targetLevel || "B1").toUpperCase() === "B2" ? "B2" : "B1";
  const isPart2 =
    /^part2[-_]/i.test(params.topicId || "") || /^p2_/i.test(params.questionId || "");

  const partLabel = isPart2
    ? "VSTEP Speaking Part 2 (Solution Discussion — chọn 1 trong 3 phương án theo bố cục 3 phần: Mở bài dẫn nhập & chọn phương án -> Thân bài nêu 2 lý do chọn & lý do không chọn 2 phương án còn lại -> Kết bài khẳng định lại lựa chọn)"
    : "VSTEP Speaking Part 1 (Social Interaction — trả lời ngắn gọn, tự nhiên trong 2-3 câu)";

  const levelGuidance = isPart2
    ? level === "B2"
      ? `Mục tiêu của học viên là trình độ B2 (Speaking Part 2):
- Đánh giá theo bố cục 3 phần dùng chung (~170-210 từ): Mở bài ("The situation here is that... If I were in this situation/him/her, I think I would... I believe it's the best option because of the following reasons.") -> Thân bài ("First of all,... This is because... For example,... Because of this,... Another reason is that... In other words,... Moreover,... This can help/allow... Regarding the other two options, although... is worth considering,... As for..., I don't think it's a good idea because...") -> Kết bài ("In conclusion, I believe... is the most suitable option in this situation.").
- Chỉ ra các chỗ bị "Vietlish" hoặc lập luận chưa chặt, gợi ý diễn đạt tự nhiên mức B2 chứ KHÔNG ép từ C1/C2 cứng nhắc.`
      : `Mục tiêu của học viên là trình độ B1 (Speaking Part 2):
- Chỉ cần bài nói đủ 3 phần (~130-165 từ) theo đúng khung dàn ý chung: Mở bài ("The situation here is that... If I were in this situation/him/her, I think I would...") -> Thân bài nêu 2 lý do đời thường (First of all... This is because... For example... Because of this... / Another reason is that... In other words... Moreover... This can help...) và phản biện 2 phương án còn lại (Regarding the other two options, although... is a good option,... As for..., I don't think it's a good idea because...) -> Kết bài ("In conclusion, I believe... is the most suitable option in this situation.").
- KHÔNG ép học viên dùng từ vựng phức tạp. Nếu nói rõ ý, tự nhiên ở mức B1 thì khen ngợi và giữ nguyên.`
    : level === "B2"
      ? `Mục tiêu của học viên là trình độ B2:
- Đánh giá và hướng dẫn cách nói tự nhiên ở chuẩn B2 giao tiếp thực tế (khoảng 3 câu mạch lạc ~35-48 từ theo hướng: Trả lời trực tiếp kèm discourse marker tự nhiên như "Honestly,", "I'd say", "Actually," + Lý do -> Ví dụ đời thực -> Cảm xúc/Kết quả).
- Chỉ ra các chỗ diễn đạt còn đơn điệu hoặc bị "Vietlish", gợi ý collocations văn nói tự nhiên (như "hang out with close friends", "unwind", "clear my mind", "affordable", "convenient", "in advance", "boost my productivity", mệnh đề "which...") nhưng KHÔNG ép dùng từ C1/C2 sách vở cứng nhắc.`
      : `Mục tiêu của học viên là trình độ B1:
- Chỉ cần bài nói rõ ý, phát âm dễ nghe, đúng ngữ pháp cơ bản, dùng từ tự nhiên gần gũi đời sống (~28-38 từ, khoảng 2-3 câu ngắn gọn theo mạch: Trả lời + Lý do -> Ví dụ cụ thể -> Cảm xúc).
- KHÔNG ép học viên dùng từ vựng phức tạp hay cấu trúc B2/C1. Nếu câu học viên nói đơn giản nhưng tự nhiên, đúng ngữ pháp ở mức B1 thì khen ngợi và GIỮ NGUYÊN.
- Khi sửa lỗi "Vietlish" hoặc mở rộng ý bị "cụt", hãy gợi ý các câu tiếng Anh giao tiếp đời thường, dễ nhớ, dễ nói đối với học viên B1 Việt Nam.`;

  const audioContextNote = params.hasAudio
    ? `ĐÃ ĐÍNH KÈM FILE GHI ÂM THẬT CỦA HỌC VIÊN (thời lượng ~${params.durationSec || 0} giây).
- Hãy NGHE KỸ file ghi âm đính kèm làm nguồn chính để:
  1) Ghi lại ĐẦY ĐỦ, chính xác những gì học viên thực sự nói vào trường "recognized_transcript" (transcript trình duyệt bên dưới chỉ để tham khảo vì đôi khi bị thiếu hoặc nhận diện nhầm).
  2) Chấm trực tiếp PHÁT ÂM (có rõ chữ, dễ nghe không; đặc biệt bắt lỗi mất final sound /s/, /z/ khi đó là âm cuối gốc của từ như nice, house, place, office, because, always, relax, stress, bus, class, famous...; âm cuối /t/, /d/; trọng âm từ) và NGỮ ĐIỆU (có nhấn nhá từ khóa, lên xuống giọng tự nhiên không, hay đang nói đều đều một tông / đọc chữ / ngập ngừng).`
    : `Không tải được file âm thanh gốc, chỉ có transcript văn bản (~${params.durationSec || 0} giây):
- Dựa vào transcript và thời lượng nói để nhận xét tốc độ/độ trôi chảy và lưu ý phát âm/ngữ điệu những từ có final sound dễ sai trong câu trả lời.`;

  return `Bạn là giám khảo và giáo viên hướng dẫn VSTEP Speaking tận tâm, giàu kinh nghiệm dạy học viên Việt Nam.

THÔNG TIN CÂU HỎI & BÀI NÓI:
- Phần thi: ${partLabel}
- Chủ đề: ${params.topicTitle || (isPart2 ? "Speaking Part 2" : "Speaking Part 1")}
- Câu hỏi / Tình huống của giám khảo: "${params.promptText || "(Không có câu hỏi)"}"
- Trình độ mục tiêu học viên chọn: Level ${level}
- Thời lượng ghi âm: ${params.durationSec || 0} giây
- Transcript nhận diện sơ bộ từ trình duyệt: "${params.browserTranscript || "(Trình duyệt chưa nhận diện được văn bản - hãy nghe trực tiếp file âm thanh)"}"
- Tình trạng âm thanh: ${audioContextNote}

QUY TẮC ĐẶC BIỆT BẮT BUỘC PHẢI TUÂN THỦ:
- QUY TẮC 1 (BỎ QUA ĐUÔI CHIA ĐỘNG TỪ "-s", "-es", "-ed" — CHỈ BẮT FINAL SOUND CỐ HỮU CỦA TỪ):
  + BỎ QUA HOÀN TOÀN lỗi thiếu hoặc phát âm thiếu đuôi "-s", "-es", "-ed" khi chia động từ (bao gồm quên thêm "-s/-es" ở động từ ngôi thứ 3 số ít hiện tại đơn như "it help", "he like", "my mother cook", "weather affect" VÀ phát âm thiếu âm cuối "-s/-es/-ed" của động từ chia thì như "worked", "played", "visited", "watched", "helped", "makes"...). TUYỆT ĐỐI không trừ điểm, không bắt lỗi trong phần ngữ pháp hay phát âm, không đưa vào "language_corrections" hay "pronunciation_fixes".
  + NHƯNG VẪN PHẢI BẮT KỸ lỗi quên phát âm âm "s" (/s/, /z/, /ɪz/) khi đó là FINAL SOUND CỐ HỮU CỦA TỪ GỐC (ví dụ: nice /naɪs/, house /haʊs/, place /pleɪs/, price /praɪs/, office /ˈɔːfɪs/, because /bɪˈkɔːz/, always /ˈɔːlweɪz/, sometimes /ˈsʌmtaɪmz/, relax /rɪˈlæks/, stress /stres/, bus /bʌs/, class /klæs/, famous /ˈfeɪməs/, delicious /dɪˈlɪʃəs/... hoặc danh từ số nhiều cần thiết như friends). Nếu học viên nuốt mất final sound gốc này trong file ghi âm thì chỉ rõ trong "criteria.pronunciation_intonation" và "pronunciation_fixes".
- QUY TẮC 2 (TÍNH THEO DẠNG LỖI — KHÔNG TÍNH TỔNG SỐ LẦN LẶP LỖI):
  + KHÔNG cộng dồn tổng số lần lặp lại của cùng một lỗi khi trừ điểm.
  + Ví dụ: nếu trong bài nói học viên phát âm sai cùng 1 từ 3 lần (ví dụ đọc sai từ "because" hoặc "comfortable" 3 lần) thì VẪN CHỈ TÍNH LÀ 1 LỖI DUY NHẤT và chỉ liệt kê 1 lần trong "pronunciation_fixes".
  + Tương tự, nếu bài nói lặp cùng 1 dạng lỗi ngữ pháp hoặc cùng 1 dạng diễn đạt Vietlish nhiều lần thì chỉ tính là 1 dạng lỗi khi tính điểm, không trừ điểm lặp lại nhiều lần cho cùng 1 dạng lỗi.
- QUY TẮC 3 (TÍNH ĐIỂM NỘI BỘ LÀM TRÒN 0.25 & QUY ĐỔI MỨC — KHÔNG HIỆN SỐ CHO HỌC VIÊN):
  + Tính điểm tổng nội bộ trên thang 10 và làm tròn theo bước 0.25 (0.00, 0.25, 0.50, 0.75, ..., 10.00) vào trường số "internal_score" dựa trên chất lượng tổng thể (phát âm/ngữ điệu, ngữ pháp, từ vựng/Vietlish, độ mạch lạc/mở rộng ý) và số DẠNG LỖI khác nhau.
  + Quy đổi "internal_score" sang "estimated_band" theo đúng thang sau:
    * 0.00 – 3.50 : "Chưa đạt B1"
    * 3.75        : "Xấp xỉ B1"
    * 4.00 – 5.50 : "Đạt B1"
    * 5.75        : "Xấp xỉ B2"
    * 6.00 – 8.50 : "Đạt B2"
    * 8.75        : "Xấp xỉ C1"
    * 9.00 – 10.00: "Đạt C1"
  + TUYỆT ĐỐI KHÔNG viết con số điểm (ví dụ 5.5/10, 6.25 điểm, 7.0...) trong "overall_comment", "level_assessment", hay "criteria" vì học viên chỉ được xem kết quả theo mức.

YÊU CẦU CHẤM & SỬA CHI TIẾT:
1. PHÁT ÂM CÓ DỄ NGHE KHÔNG & CÓ NGỮ ĐIỆU KHÔNG ("criteria.pronunciation_intonation" + "pronunciation_fixes"):
   - Nhận xét thẳng thắn, dễ hiểu xem người nghe có dễ nghe, dễ nắm bắt lời học viên nói không; chú ý các từ bị mất final sound gốc (đặc biệt là final sound /s/, /z/ của từ như nice, house, place, because, relax...).
   - Nhận xét rõ về NGỮ ĐIỆU (intonation) & nhịp nói: giọng nói có sự lên xuống tự nhiên, biết nhấn vào từ mang nội dung (content words) và ngắt cụm hợp lý không, hay đang nói đều đều một tông (monotone), ngập ngừng?
   - Liệt kê tối đa 4 TỪ KHÁC NHAU trong bài nói mà học viên phát âm chưa chuẩn (sai nguyên âm/phụ âm, sai trọng âm, hoặc mất final sound gốc của từ — KHÔNG liệt kê lỗi thiếu đuôi -s/-es/-ed chia động từ; mỗi từ chỉ liệt kê đúng 1 lần dù bị sai nhiều lần trong bài) vào mảng "pronunciation_fixes" kèm US IPA và mẹo sửa. Nếu phát âm tốt, trả về [].

2. NGỮ PHÁP ("criteria.grammar" + "language_corrections"):
   - Kiểm tra thì của động từ theo câu hỏi (quá khứ, tương lai, hiện tại), cấu trúc câu, giới từ, dạng từ (V-ing / to V).
   - Nhắc lại: BỎ QUA lỗi thiếu đuôi "-s", "-es", "-ed" khi chia động từ (cả phát âm lẫn ngữ pháp); không bắt lỗi dấu câu/viết hoa; mỗi dạng lỗi lặp lại nhiều lần chỉ tính 1 dạng lỗi khi đánh giá.

3. DÙNG TỪ TỰ NHIÊN & PHÁT HIỆN LỖI "VIETLISH" ("criteria.vocabulary_vietlish" + "language_corrections"):
   - Đánh giá cách dùng từ đã tự nhiên như giao tiếp đời thực chưa.
   - ĐẶC BIỆT tìm các cụm từ bị "Vietlish" (dịch từng chữ từ tiếng Việt sang tiếng Anh hoặc ghép từ thiếu tự nhiên mà người Việt hay mắc, ví dụ: "very like" -> "really like", "go play with friends" -> "hang out with my friends", "eat many delicious foods" -> "try lots of tasty food", "traffic is very crowded" -> "the streets are really crowded / traffic is heavy"...).
   - Trong mảng "language_corrections":
     + "original": trích NGUYÊN VĂN cụm từ trong "recognized_transcript" của học viên (2-10 từ) để hệ thống gạch chân/đối chiếu trực tiếp.
     + "corrected": cách nói lại tự nhiên, chuẩn xác ở mức ${level}.
     + "category": chỉ điền đúng 1 trong 3 nhãn: "Vietlish", "Từ vựng tự nhiên", hoặc "Ngữ pháp".
     + "explanation_vi": giải thích ngắn gọn tại sao cách nói cũ bị sai ngữ pháp hoặc hơi "Vietlish", và cách nói mới tự nhiên hơn thế nào.

4. SẮP XẾP CÁC Ý CÓ LOGIC, DỄ THEO DÕI KHÔNG ("criteria.coherence_logic"):
   - Nhận xét xem bài nói có đi thẳng vào tình huống/câu hỏi không, thứ tự các ý có logic, mạch lạc, dễ theo dõi không (${isPart2 ? "mạch chuẩn Part 2: Mở bài dẫn nhập & chọn phương án -> Thân bài nêu 2 lý do chọn + giải thích tại sao không chọn 2 phương án còn lại -> Kết bài khẳng định lại lựa chọn" : "mạch chuẩn Part 1: Trả lời trực tiếp + Lý do -> Ví dụ thực tế -> Cảm xúc/Kết quả"}), và đã có từ nối tự nhiên trong văn nói chưa.

5. Ý TƯỞNG HƠI "CỤT" — CẦN DIỄN ĐẠT LẠI & MỞ RỘNG NHƯ THẾ NÀO ("idea_expansions"):
   - Kiểm tra xem bài nói có bị quá ngắn hoặc thiếu phần nào (chẳng hạn ở Part 2 bị thiếu lý do giải thích tại sao không chọn 2 phương án còn lại, thiếu Mở/Kết bài, hoặc ý đưa ra còn chung chung chưa có ví dụ).
   - Trong mảng "idea_expansions" (tối đa 3 mục): chỉ rõ chỗ nào bị "cụt" ("where_vi"), giải thích hướng diễn đạt lại & mở rộng sao cho tự nhiên, logic ("issue_vi"), đưa ra 1-2 câu tiếng Anh mẫu đúng chuẩn Level ${level} ("suggested_en") và dịch nghĩa tiếng Việt ("meaning_vi"). Nếu bài nói đã đầy đủ, tròn trịa chuẩn mức ${level}, trả về [].

6. ${levelGuidance}

7. PHIÊN BẢN BÀI NÓI HOÀN CHỈNH TỰ NHIÊN ("natural_spoken_version"):
   - Dựa trên CHÍNH Ý TƯỞNG GỐC của học viên, hãy viết lại thành 1 bài nói hoàn chỉnh tự nhiên, trôi chảy, sạch lỗi Vietlish/ngữ pháp, ${isPart2 ? "đủ 3 phần Mở bài – Thân bài (2 lý do chọn + lý do bỏ 2 phương án kia) – Kết bài" : "gồm 3 câu gọn gàng"} ở đúng Level ${level} để học viên nghe và luyện nói theo.

8. NẾU FILE GHI ÂM IM LẶNG HOẶC CHỈ CÓ TIẾNG ỒN / KHÔNG CÓ TIẾNG ANH:
   - Vẫn trả về JSON hợp lệ, đặt "internal_score": 0, "estimated_band": "Chưa đạt B1", nhắc nhẹ nhàng trong "overall_comment" để học viên kiểm tra micro và ghi âm lại rõ hơn, đồng thời gợi ý cách trả lời trong "idea_expansions" và "natural_spoken_version".

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ (không bọc markdown ngoài JSON) theo đúng cấu trúc sau:
{
  "recognized_transcript": "Lời nói tiếng Anh thực tế của học viên nghe được từ file âm thanh",
  "internal_score": 5.5,
  "level_assessment": "Nhận xét ngắn gọn 1 cụm về mức độ đáp ứng (TUYỆT ĐỐI không ghi điểm số)",
  "estimated_band": "Quy đổi từ internal_score (0-3.5: Chưa đạt B1 | 3.75: Xấp xỉ B1 | 4.0-5.5: Đạt B1 | 5.75: Xấp xỉ B2 | 6.0-8.5: Đạt B2 | 8.75: Xấp xỉ C1 | 9.0-10: Đạt C1)",
  "overall_comment": "2-3 câu nhận xét tổng quan bằng tiếng Việt (TUYỆT ĐỐI không ghi con số điểm): khen điểm tốt trước, sau đó chỉ rõ trọng tâm cần cải thiện.",
  "criteria": {
    "pronunciation_intonation": "Nhận xét chi tiết về độ dễ nghe, final sound của từ và ngữ điệu/nhịp nói",
    "grammar": "Nhận xét ngắn gọn, rõ ràng về ngữ pháp & chia thì (bỏ qua lỗi quên s khi chia động từ)",
    "vocabulary_vietlish": "Nhận xét về cách dùng từ tự nhiên và các chỗ hơi bị Vietlish (nếu có)",
    "coherence_logic": "Nhận xét về cách sắp xếp các ý có logic, mạch lạc, dễ theo dõi không"
  },
  "pronunciation_fixes": [
    {
      "word": "từ phát âm chưa chuẩn hoặc mất final sound gốc",
      "ipa": "/phiên âm US IPA/",
      "issue_vi": "Mô tả lỗi phát âm/final sound/trọng âm nghe được và mẹo đọc đúng"
    }
  ],
  "language_corrections": [
    {
      "id": 1,
      "original": "cụm từ gốc trong bài nói",
      "corrected": "cách diễn đạt lại tự nhiên chuẩn Level ${level}",
      "category": "Vietlish",
      "explanation_vi": "Giải thích tại sao cách nói cũ bị Vietlish/chưa tự nhiên hoặc sai ngữ pháp"
    }
  ],
  "idea_expansions": [
    {
      "where_vi": "Chỗ ý tưởng đang hơi cụt",
      "issue_vi": "Cần diễn đạt lại và mở rộng thêm lý do / ví dụ / cảm xúc như thế nào",
      "suggested_en": "1-2 câu tiếng Anh nói tự nhiên chuẩn Level ${level}",
      "meaning_vi": "Nghĩa tiếng Việt tương ứng"
    }
  ],
  "natural_spoken_version": "${isPart2 ? "Bài nói hoàn chỉnh đủ 3 phần (Mở bài – Thân bài – Kết bài), tự nhiên, giữ nguyên ý học viên" : "Bài nói 3 câu hoàn chỉnh, tự nhiên, giữ nguyên ý học viên"} ở mức Level ${level}"
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

function parseModelJson(rawText: string): Record<string, unknown> {
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
  const obj = parsed as Record<string, unknown>;
  const critObj =
    obj.criteria && typeof obj.criteria === "object" && !Array.isArray(obj.criteria)
      ? (obj.criteria as Record<string, unknown>)
      : null;
  const hasRealContent =
    (typeof obj.overall_comment === "string" && obj.overall_comment.trim().length > 0) ||
    (typeof obj.estimated_band === "string" && obj.estimated_band.trim().length > 0) ||
    (typeof obj.natural_spoken_version === "string" && obj.natural_spoken_version.trim().length > 0) ||
    Boolean(critObj && Object.values(critObj).some(v => typeof v === "string" && v.trim().length > 0));
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
      recognized_transcript: String((existingReview?.review_json as Record<string, unknown>)?.recognized_transcript || att.transcript || "").trim(),
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

    let audioBase64 = "";
    let audioMimeType = "audio/webm";
    let audioTooLarge = false;

    if (att.audio_path) {
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
        } catch (_e) {
          if (dlTry === 0) {
            await new Promise(r => setTimeout(r, 600));
          }
        }
      }
    }

    if (!audioBase64 && audioTooLarge && wordCount < 3) {
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

    if (!audioBase64 && wordCount < 2) {
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

    const promptWithAudio = buildSpeakingGradingPrompt({
      topicId: att.topic_id || "",
      questionId: att.question_id || "",
      topicTitle,
      promptText,
      browserTranscript,
      durationSec: Number(att.duration_sec) || 0,
      targetLevel,
      hasAudio: Boolean(audioBase64)
    });

    const buildUserParts = (includeAudio: boolean): Array<Record<string, unknown>> => {
      const parts: Array<Record<string, unknown>> = [];
      if (includeAudio && audioBase64) {
        parts.push({
          inlineData: {
            mimeType: audioMimeType,
            data: audioBase64
          }
        });
        parts.push({ text: promptWithAudio });
      } else {
        const textOnlyPrompt = audioBase64
          ? buildSpeakingGradingPrompt({
              topicId: att.topic_id || "",
              questionId: att.question_id || "",
              topicTitle,
              promptText,
              browserTranscript,
              durationSec: Number(att.duration_sec) || 0,
              targetLevel,
              hasAudio: false
            })
          : promptWithAudio;
        parts.push({ text: textOnlyPrompt });
      }
      return parts;
    };

    const RETIRED_MODELS = new Set(["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash-exp"]);
    const fallbackModels = Array.from(
      new Set([
        geminiModel,
        "gemini-flash-latest",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-flash-lite-latest"
      ])
    ).filter(m => Boolean(m) && !RETIRED_MODELS.has(m));

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

    const attemptDeadlineMs = Date.now() + (options.timeBudgetMs || 55_000);

    const callGeminiWithParts = async (parts: Array<Record<string, unknown>>) => {
      let okRes: Response | null = null;
      const errors: Array<{ model: string; status: number; detail: string }> = [];

      for (const modelName of fallbackModels) {
        const remainingBeforeModel = attemptDeadlineMs - Date.now();
        if (remainingBeforeModel < 8000) break;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
        let modelStatus = 500;
        let modelErrText = "";
        for (let attempt = 0; attempt < 2; attempt++) {
          const remainingMs = attemptDeadlineMs - Date.now();
          if (remainingMs < 8000) break;
          const reqTimeoutMs = Math.min(GEMINI_TIMEOUT_MS, remainingMs);
          try {
            const res = await fetchWithTimeout(
              endpoint,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ role: "user", parts }],
                  generationConfig: {
                    temperature: 0.25,
                    maxOutputTokens: 8192,
                    responseMimeType: "application/json"
                  }
                })
              },
              reqTimeoutMs
            );
            if (res.ok) {
              okRes = res;
              break;
            }
            modelStatus = res.status;
            modelErrText = await res.text().catch(() => "");
            // 429: chuyển ngay sang model dự phòng có quota riêng thay vì ngủ chờ trên cùng model
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
            if (attempt === 0 && attemptDeadlineMs - Date.now() >= 18000) {
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
      return { okRes, errors };
    };

    let { okRes: geminiRes, errors: modelErrors } = await callGeminiWithParts(buildUserParts(Boolean(audioBase64)));

    // Nếu file ghi âm bị lỗi định dạng / rỗng khiến Gemini báo 400 nhưng vẫn có transcript trình duyệt,
    // tự động chấm tiếp bằng transcript để không bị kẹt 20/20 lần thử.
    const hitAudioBadRequest =
      !geminiRes && Boolean(audioBase64) && wordCount >= 3 && modelErrors.some(e => e.status === 400);
    if (hitAudioBadRequest && attemptDeadlineMs - Date.now() >= 10000) {
      const retryTextOnly = await callGeminiWithParts(buildUserParts(false));
      if (retryTextOnly.okRes) {
        geminiRes = retryTextOnly.okRes;
      } else if (retryTextOnly.errors.length > 0) {
        modelErrors = retryTextOnly.errors;
      }
    }

    const primaryError =
      modelErrors.find(e => e.status !== 404) || modelErrors[0] || { model: geminiModel, status: 500, detail: "" };
    const lastStatus = primaryError.status;
    const triedSummary = modelErrors.map(e => `${e.model}:${e.status}`).join(", ");
    const conciseErrDetail = primaryError.detail
      ? `${primaryError.detail.slice(0, 160)} [${triedSummary}]`
      : triedSummary;

    if (!geminiRes) {
      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
        return {
          ok: false,
          status: 502,
          rateLimited: lastStatus === 429,
          error: `AI tạm quá tải khi chấm lại (${lastStatus}) — đã giữ nguyên bài sửa cũ.`
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

      const isPermanentBadAudio = lastStatus === 400 && wordCount < 3;
      const rawNextRetry = prevRetry + 1;
      const nextRetry = isPermanentBadAudio && rawNextRetry >= 2 ? MAX_AUTO_RETRIES : rawNextRetry;
      const errNowIso = new Date().toISOString();

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
          error_message: `Gemini API lỗi (${lastStatus}): ${conciseErrDetail.slice(0, 220)}`,
          grade_count: prevCount,
          retry_count: nextRetry,
          updated_at: errNowIso
        },
        { onConflict: "id" }
      );
      await admin
        .from("speaking_attempts")
        .update({ ai_status: "pending_retry", ai_release_at: releaseAtIso })
        .eq("id", att.id);

      return {
        ok: false,
        status: 502,
        rateLimited: lastStatus === 429,
        error: `AI tạm quá tải (${lastStatus}) — đã xếp hàng đợi tự chấm lại (lần ${nextRetry}/${MAX_AUTO_RETRIES}).`
      };
    }

    let parsedReview: Record<string, unknown> | null = null;
    try {
      const geminiJson = await geminiRes.json();
      const firstCand = geminiJson?.candidates?.[0];
      const finishReason = String(firstCand?.finishReason || "");
      const candParts = Array.isArray(firstCand?.content?.parts) ? firstCand.content.parts : [];
      const nonThoughtText = candParts
        .filter((p: Record<string, unknown>) => !p?.thought && typeof p?.text === "string")
        .map((p: Record<string, unknown>) => String(p.text))
        .join("");
      const rawCandidate = nonThoughtText || String(candParts[0]?.text || "");
      if (!String(rawCandidate).trim()) {
        throw new Error(`Phản hồi rỗng từ Gemini${finishReason ? ` (finishReason: ${finishReason})` : ""}`);
      }
      parsedReview = parseModelJson(rawCandidate);
    } catch (parseErr) {
      const parseMsg = parseErr instanceof Error ? parseErr.message : "JSON không hợp lệ";
      if (hasExistingReadyReview) {
        await restoreAttemptOnPreservedReady();
        return {
          ok: false,
          status: 502,
          error: `AI trả về dữ liệu chưa chuẩn khi chấm lại (${parseMsg.slice(0, 120)}) — đã giữ nguyên bài sửa cũ.`
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

      const nextRetry = prevRetry + 1;
      const parseNowIso = new Date().toISOString();
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
          error_message: `Lỗi đọc kết quả Gemini (${parseMsg.slice(0, 180)})`,
          grade_count: prevCount,
          retry_count: nextRetry,
          updated_at: parseNowIso
        },
        { onConflict: "id" }
      );
      await admin
        .from("speaking_attempts")
        .update({ ai_status: "pending_retry", ai_release_at: releaseAtIso })
        .eq("id", att.id);

      return {
        ok: false,
        status: 502,
        error: `AI trả về dữ liệu chưa chuẩn (${parseMsg.slice(0, 120)}) — đã xếp hàng đợi tự chấm lại (lần ${nextRetry}/${MAX_AUTO_RETRIES}).`
      };
    }

    const recognizedTranscript = String(parsedReview?.recognized_transcript || browserTranscript || "").trim();

    const rawInternalScore = Number(parsedReview?.internal_score);
    const hasValidScore =
      Number.isFinite(rawInternalScore) &&
      parsedReview?.internal_score !== "" &&
      parsedReview?.internal_score !== null &&
      parsedReview?.internal_score !== undefined;
    const roundedScore = hasValidScore ? roundQuarterStep(rawInternalScore) : null;

    const cleanBandLabel =
      roundedScore !== null
        ? scoreToBandLabel(roundedScore)
        : normalizeLevelBandLabel(
            String(parsedReview?.estimated_band || ""),
            String(parsedReview?.level_assessment || "")
          );

    // Deduplicate pronunciation fixes by unique word (sai 1 từ 3 lần vẫn chỉ tính 1 lỗi)
    // và loại bỏ các mục phát âm thiếu đuôi -s/-es/-ed chia động từ
    const seenPronWords = new Set<string>();
    const dedupedPronFixes = Array.isArray(parsedReview?.pronunciation_fixes)
      ? parsedReview.pronunciation_fixes
          .map((rawItem: unknown) => {
            const p = (rawItem && typeof rawItem === "object" ? rawItem : {}) as Record<string, unknown>;
            return {
              word: String(p.word || "").trim(),
              ipa: String(p.ipa || "").trim(),
              issue_vi: String(p.issue_vi || "").trim()
            };
          })
          .filter((p: { word: string; issue_vi: string }) => {
            if (!p.word || !p.issue_vi) return false;
            if (isIgnoredVerbInflectionPronFix(p.word, p.issue_vi)) return false;
            const normKey = p.word.toLowerCase().replace(/[^a-z0-9']/g, "");
            if (!normKey || seenPronWords.has(normKey)) return false;
            seenPronWords.add(normKey);
            return true;
          })
      : [];

    // Deduplicate language corrections by (category + normalized original)
    const seenLangKeys = new Set<string>();
    const dedupedLangCorrections = Array.isArray(parsedReview?.language_corrections)
      ? parsedReview.language_corrections
          .map((rawItem: unknown) => {
            const c = (rawItem && typeof rawItem === "object" ? rawItem : {}) as Record<string, unknown>;
            return {
              original: String(c.original || "").trim(),
              corrected: String(c.corrected || "").trim(),
              category: String(c.category || "Từ vựng tự nhiên").trim(),
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

    const normalizedReview = {
      recognized_transcript: recognizedTranscript,
      internal_score: roundedScore,
      level_assessment: stripNumericScores(String(parsedReview?.level_assessment || "")),
      estimated_band: cleanBandLabel,
      overall_comment: stripNumericScores(String(parsedReview?.overall_comment || "")),
      criteria: {
        pronunciation_intonation: stripNumericScores(String(rawCriteria.pronunciation_intonation || "")),
        grammar: stripNumericScores(String(rawCriteria.grammar || "")),
        vocabulary_vietlish: stripNumericScores(String(rawCriteria.vocabulary_vietlish || "")),
        coherence_logic: stripNumericScores(String(rawCriteria.coherence_logic || ""))
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
    if (recognizedTranscript && recognizedTranscript.length > browserTranscript.length) {
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
    const geminiModel = Deno.env.get("GEMINI_MODEL") || "gemini-flash-latest";
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
          .select("id, attempt_id, user_id, question_id, status, retry_count, grade_count, release_at, updated_at")
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
          .select("id, attempt_id, user_id, question_id, status, retry_count, grade_count, release_at, updated_at")
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
            { isTeacherOrCron: true, releaseNow: false, timeBudgetMs: 45_000 }
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
      timeBudgetMs: 55_000,
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
      recognized_transcript: gradeRes.recognized_transcript,
      review_json: isTeacher ? gradeRes.review_json : undefined
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Lỗi không xác định khi chấm bài nói.";
    return jsonResponse({ ok: false, error: msg }, 500);
  }
});
