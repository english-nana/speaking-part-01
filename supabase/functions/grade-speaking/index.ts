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
const RETRY_COOLDOWN_MS = 90 * 1000;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json; charset=utf-8" }
  });
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
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
  topicTitle: string;
  promptText: string;
  browserTranscript: string;
  durationSec: number;
  targetLevel: string;
  hasAudio: boolean;
}) {
  const level = String(params.targetLevel || "B1").toUpperCase() === "B2" ? "B2" : "B1";

  const levelGuidance =
    level === "B2"
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
- Phần thi: VSTEP Speaking Part 1 (Social Interaction - trả lời ngắn gọn, tự nhiên trong 2-3 câu)
- Chủ đề: ${params.topicTitle || "Speaking Part 1"}
- Câu hỏi của giám khảo: "${params.promptText || "(Không có câu hỏi)"}"
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
   - Nhận xét xem câu trả lời có đi thẳng vào câu hỏi không, thứ tự các ý có logic, mạch lạc, dễ theo dõi không (mạch chuẩn Part 1: Trả lời trực tiếp + Lý do -> Ví dụ thực tế -> Cảm xúc/Kết quả), và đã có từ nối tự nhiên trong văn nói chưa.

5. Ý TƯỞNG HƠI "CỤT" — CẦN DIỄN ĐẠT LẠI & MỞ RỘNG NHƯ THẾ NÀO ("idea_expansions"):
   - Kiểm tra xem bài nói có bị quá ngắn hoặc có ý nào nói ra rồi bỏ lửng, hơi "cụt" (chỉ trả lời 1 câu ngắn, thiếu lý do cụ thể, thiếu ví dụ đời sống gần gũi hoặc kết thúc đột ngột).
   - Trong mảng "idea_expansions" (tối đa 3 mục): chỉ rõ chỗ nào bị "cụt" ("where_vi"), giải thích hướng diễn đạt lại & mở rộng sao cho tự nhiên, logic ("issue_vi"), đưa ra 1-2 câu tiếng Anh mẫu đúng chuẩn Level ${level} ("suggested_en") và dịch nghĩa tiếng Việt ("meaning_vi"). Nếu bài nói đã đầy đủ, tròn trịa 3 câu chuẩn mức ${level}, trả về [].

6. ${levelGuidance}

7. PHIÊN BẢN BÀI NÓI HOÀN CHỈNH TỰ NHIÊN ("natural_spoken_version"):
   - Dựa trên CHÍNH Ý TƯỞNG GỐC của học viên, hãy viết lại thành 1 câu trả lời nói hoàn chỉnh gồm 3 câu tự nhiên, trôi chảy, sạch lỗi Vietlish/ngữ pháp, sắp xếp logic và mở rộng vừa vặn ở đúng Level ${level} để học viên nghe và luyện nói theo.

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
  "natural_spoken_version": "Bài nói 3 câu hoàn chỉnh, tự nhiên, giữ nguyên ý học viên ở mức Level ${level}"
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

function parseModelJson(rawText: string) {
  const trimmed = String(rawText || "").trim();
  const unfenced = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(unfenced);
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
  ai_release_at?: string;
  created_at?: string;
}

interface ReviewRow {
  id: string;
  attempt_id: string;
  grade_count?: number;
  retry_count?: number;
  release_at?: string;
  status?: string;
  updated_at?: string;
}

async function gradeSingleAttempt(
  admin: SupabaseClient,
  geminiApiKey: string,
  geminiModel: string,
  att: AttemptRow,
  existingReview: ReviewRow | null,
  options: {
    isTeacherOrCron: boolean;
    releaseNow: boolean;
    overridePromptText?: string;
    overrideTopicTitle?: string;
    overrideTargetLevel?: string;
  }
) {
  const reviewId = `${att.user_id}__${att.question_id}`;
  const browserTranscript = String(att.transcript || "").trim();
  const wordCount = browserTranscript.split(/\s+/).filter(Boolean).length;

  let audioBase64 = "";
  let audioMimeType = "audio/webm";

  if (att.audio_path) {
    try {
      const { data: audioBlob, error: dlErr } = await admin.storage
        .from(AUDIO_BUCKET)
        .download(att.audio_path);
      if (!dlErr && audioBlob && audioBlob.size > 0) {
        const ab = await audioBlob.arrayBuffer();
        audioBase64 = arrayBufferToBase64(ab);
        audioMimeType = resolveCleanAudioMimeType(att.audio_path, audioBlob.type);
      }
    } catch (_e) {
      // Fallback to transcript if storage download fails
    }
  }

  if (!audioBase64 && wordCount < 2) {
    return {
      ok: false,
      status: 400,
      error: "Bản ghi âm chưa có dữ liệu âm thanh hoặc lời nói tiếng Anh để chấm điểm."
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

  const targetLevel =
    String(options.overrideTargetLevel || att.target_level || "B1").toUpperCase() === "B2"
      ? "B2"
      : "B1";
  const topicTitle = String(options.overrideTopicTitle || att.topic_title || att.topic_id || "Speaking Part 1").trim();
  const promptText = String(options.overridePromptText || att.prompt_text || att.question_id || "").trim();

  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const submittedMs = new Date(att.submitted_at || att.created_at || nowMs).getTime();
  const baseSubmitMs = isNaN(submittedMs) ? nowMs : submittedMs;

  let releaseAtIso = new Date(baseSubmitMs + RELEASE_DELAY_HOURS * 60 * 60 * 1000).toISOString();
  if (options.isTeacherOrCron && options.releaseNow) {
    releaseAtIso = nowIso;
  } else if (existingReview && existingReview.attempt_id === att.id && existingReview.release_at) {
    releaseAtIso = existingReview.release_at;
  } else if (att.ai_release_at) {
    releaseAtIso = att.ai_release_at;
  }

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

  const prompt = buildSpeakingGradingPrompt({
    topicTitle,
    promptText,
    browserTranscript,
    durationSec: Number(att.duration_sec) || 0,
    targetLevel,
    hasAudio: Boolean(audioBase64)
  });

  const userParts: Array<Record<string, unknown>> = [];
  if (audioBase64) {
    userParts.push({
      inlineData: {
        mimeType: audioMimeType,
        data: audioBase64
      }
    });
  }
  userParts.push({ text: prompt });

  const fallbackModels = Array.from(
    new Set([geminiModel, "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"])
  );

  let geminiRes: Response | null = null;
  let lastStatus = 500;
  let lastErrText = "";

  for (const modelName of fallbackModels) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: userParts }],
          generationConfig: {
            temperature: 0.25,
            responseMimeType: "application/json"
          }
        })
      });
      if (res.ok) {
        geminiRes = res;
        break;
      }
      lastStatus = res.status;
      lastErrText = await res.text().catch(() => "");
      if ((res.status === 503 || res.status === 429 || res.status === 500) && attempt === 0) {
        await new Promise(r => setTimeout(r, 1200));
        continue;
      }
      break;
    }
    if (geminiRes) break;
  }

  if (!geminiRes) {
    const nextRetry = prevRetry + 1;
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
        error_message: `Gemini API lỗi (${lastStatus}): ${lastErrText.slice(0, 220)}`,
        grade_count: prevCount,
        retry_count: nextRetry,
        updated_at: nowIso
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
      error: `AI tạm quá tải (${lastStatus}) — đã xếp hàng đợi tự chấm lại (lần ${nextRetry}/${MAX_AUTO_RETRIES}).`
    };
  }

  const geminiJson = await geminiRes.json();
  const rawCandidate = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const parsedReview = parseModelJson(rawCandidate);

  const recognizedTranscript = String(parsedReview?.recognized_transcript || browserTranscript || "").trim();

  const rawInternalScore = Number(parsedReview?.internal_score);
  const hasValidScore = Number.isFinite(rawInternalScore) && parsedReview?.internal_score !== "" && parsedReview?.internal_score !== null && parsedReview?.internal_score !== undefined;
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
        .map((p: Record<string, unknown>) => ({
          word: String(p?.word || "").trim(),
          ipa: String(p?.ipa || "").trim(),
          issue_vi: String(p?.issue_vi || "").trim()
        }))
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
        .map((c: Record<string, unknown>) => ({
          original: String(c?.original || "").trim(),
          corrected: String(c?.corrected || "").trim(),
          category: String(c?.category || "Từ vựng tự nhiên").trim(),
          explanation_vi: String(c?.explanation_vi || "").trim()
        }))
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

  const normalizedReview = {
    recognized_transcript: recognizedTranscript,
    internal_score: roundedScore,
    level_assessment: stripNumericScores(String(parsedReview?.level_assessment || "")),
    estimated_band: cleanBandLabel,
    overall_comment: stripNumericScores(String(parsedReview?.overall_comment || "")),
    criteria: {
      pronunciation_intonation: stripNumericScores(String(parsedReview?.criteria?.pronunciation_intonation || "")),
      grammar: stripNumericScores(String(parsedReview?.criteria?.grammar || "")),
      vocabulary_vietlish: stripNumericScores(String(parsedReview?.criteria?.vocabulary_vietlish || "")),
      coherence_logic: stripNumericScores(String(parsedReview?.criteria?.coherence_logic || ""))
    },
    pronunciation_fixes: dedupedPronFixes,
    language_corrections: dedupedLangCorrections,
    idea_expansions: Array.isArray(parsedReview?.idea_expansions)
      ? parsedReview.idea_expansions
          .map((it: Record<string, unknown>) => ({
            where_vi: String(it?.where_vi || "").trim(),
            issue_vi: String(it?.issue_vi || "").trim(),
            suggested_en: String(it?.suggested_en || "").trim(),
            meaning_vi: String(it?.meaning_vi || "").trim()
          }))
          .filter((it: { suggested_en: string; issue_vi: string }) => it.suggested_en || it.issue_vi)
      : [],
    natural_spoken_version: String(parsedReview?.natural_spoken_version || "").trim()
  };

  const nextCount = options.isTeacherOrCron ? Math.max(1, prevCount) : prevCount + 1;
  const isAlreadyReleased = new Date(releaseAtIso).getTime() <= Date.now();

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
      updated_at: nowIso
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
    // MODE 1: HÀNG ĐỢI TỰ ĐỘNG CHẤM LẠI (pg_cron mỗi 5 phút hoặc Giáo viên bấm)
    // ========================================================================
    if (mode === "process_queue") {
      if (!isCronCall && !isTeacher) {
        return jsonResponse({ ok: false, error: "Chỉ hệ thống hoặc Giáo viên được chạy hàng đợi chấm bài." }, 403);
      }

      const batchSize = Math.max(1, Math.min(5, Number(body?.batch_size) || 3));

      const [{ data: submittedAttempts, error: attErr }, { data: allReviews }] = await Promise.all([
        admin
          .from("speaking_attempts")
          .select("*")
          .eq("is_submitted", true)
          .order("submitted_at", { ascending: false })
          .limit(150),
        admin
          .from("speaking_ai_reviews")
          .select("id, attempt_id, status, retry_count, grade_count, release_at, updated_at")
      ]);

      if (attErr) {
        return jsonResponse({ ok: false, error: "Lỗi đọc danh sách bài nói chờ chấm: " + attErr.message }, 500);
      }

      // Mỗi (user_id, question_id) chỉ lấy bản nộp mới nhất
      const latestByKey: Record<string, AttemptRow> = {};
      (submittedAttempts || []).forEach((att: AttemptRow) => {
        const key = `${att.user_id}__${att.question_id}`;
        if (!latestByKey[key]) {
          latestByKey[key] = att;
        }
      });

      const reviewById: Record<string, ReviewRow> = {};
      (allReviews || []).forEach((r: ReviewRow) => {
        if (r && r.id) reviewById[r.id] = r;
      });

      const nowMs = Date.now();
      const pendingList = Object.values(latestByKey)
        .sort((a, b) => {
          const ta = new Date(a.submitted_at || a.created_at || 0).getTime();
          const tb = new Date(b.submitted_at || b.created_at || 0).getTime();
          return ta - tb;
        })
        .filter((att: AttemptRow) => {
          const key = `${att.user_id}__${att.question_id}`;
          const rev = reviewById[key];
          if (rev && rev.attempt_id === att.id && rev.status === "ready") return false;
          if (rev && rev.attempt_id === att.id && (rev.retry_count || 0) >= MAX_AUTO_RETRIES) return false;
          if (rev && rev.attempt_id === att.id && rev.updated_at && !isTeacher) {
            const lastTryMs = new Date(rev.updated_at).getTime();
            if (!isNaN(lastTryMs) && nowMs - lastTryMs < RETRY_COOLDOWN_MS) return false;
          }
          return true;
        });

      const slice = pendingList.slice(0, batchSize);
      const results: Array<{ id: string; ok: boolean; error?: string }> = [];

      for (let i = 0; i < slice.length; i++) {
        const att = slice[i];
        const key = `${att.user_id}__${att.question_id}`;
        const res = await gradeSingleAttempt(
          admin,
          geminiApiKey,
          geminiModel,
          att,
          reviewById[key] || null,
          { isTeacherOrCron: true, releaseNow: false }
        );
        results.push({ id: att.id, ok: res.ok, error: res.ok ? undefined : res.error });
        if (i < slice.length - 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }

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

    const reviewId = `${att.user_id}__${att.question_id}`;
    const { data: existingReview } = await admin
      .from("speaking_ai_reviews")
      .select("id, attempt_id, grade_count, retry_count, release_at, status, updated_at")
      .eq("id", reviewId)
      .maybeSingle();

    const gradeRes = await gradeSingleAttempt(admin, geminiApiKey, geminiModel, att, existingReview || null, {
      isTeacherOrCron: isTeacher,
      releaseNow,
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
