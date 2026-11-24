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
      ? `Mục tiêu của học viên là trình độ B2 (tương đương 6.0 - 8.0/10 VSTEP Speaking):
- Đánh giá và hướng dẫn cách nói tự nhiên ở chuẩn B2 giao tiếp thực tế (khoảng 3 câu mạch lạc ~35-48 từ theo hướng: Trả lời trực tiếp kèm discourse marker tự nhiên như "Honestly,", "I'd say", "Actually," + Lý do -> Ví dụ đời thực -> Cảm xúc/Kết quả).
- Chỉ ra các chỗ diễn đạt còn đơn điệu hoặc bị "Vietlish", gợi ý collocations văn nói tự nhiên (như "hang out with close friends", "unwind", "clear my mind", "affordable", "convenient", "in advance", "boost my productivity", mệnh đề "which...") nhưng KHÔNG ép dùng từ C1/C2 sách vở cứng nhắc.`
      : `Mục tiêu của học viên là trình độ B1 (tương đương 4.0 - 5.5/10 VSTEP Speaking):
- Chỉ cần bài nói rõ ý, phát âm dễ nghe, đúng ngữ pháp cơ bản, dùng từ tự nhiên gần gũi đời sống (~28-38 từ, khoảng 2-3 câu ngắn gọn theo mạch: Trả lời + Lý do -> Ví dụ cụ thể -> Cảm xúc).
- KHÔNG ép học viên dùng từ vựng phức tạp hay cấu trúc B2/C1. Nếu câu học viên nói đơn giản nhưng tự nhiên, đúng ngữ pháp ở mức B1 thì khen ngợi và GIỮ NGUYÊN.
- Khi sửa lỗi "Vietlish" hoặc mở rộng ý bị "cụt", hãy gợi ý các câu tiếng Anh giao tiếp đời thường, dễ nhớ, dễ nói đối với học viên B1 Việt Nam.`;

  const audioContextNote = params.hasAudio
    ? `ĐÃ ĐÍNH KÈM FILE GHI ÂM THẬT CỦA HỌC VIÊN (thời lượng ~${params.durationSec || 0} giây).
- Hãy NGHE KỸ file ghi âm đính kèm làm nguồn chính để:
  1) Ghi lại chính xác những gì học viên thực sự nói vào trường "recognized_transcript" (transcript trình duyệt bên dưới chỉ để tham khảo vì đôi khi nhận diện nhầm).
  2) Chấm trực tiếp PHÁT ÂM (có rõ chữ, dễ nghe không; có nuốt âm đuôi /s/, /z/, /t/, /d/, /ed/, sai trọng âm từ hay nhầm nguyên âm/phụ âm không) và NGỮ ĐIỆU (có nhấn nhá từ khóa, lên xuống giọng tự nhiên không, hay đang nói đều đều một tông / đọc chữ / ngập ngừng đứt quãng).`
    : `Không tải được file âm thanh gốc, chỉ có transcript văn bản (~${params.durationSec || 0} giây):
- Dựa vào transcript và thời lượng nói để nhận xét tốc độ/độ trôi chảy và lưu ý phát âm/ngữ điệu những từ dễ sai trong câu trả lời.`;

  return `Bạn là giám khảo và giáo viên hướng dẫn VSTEP Speaking tận tâm, giàu kinh nghiệm dạy học viên Việt Nam.

THÔNG TIN CÂU HỎI & BÀI NÓI:
- Phần thi: VSTEP Speaking Part 1 (Social Interaction - trả lời ngắn gọn, tự nhiên trong 2-3 câu)
- Chủ đề: ${params.topicTitle || "Speaking Part 1"}
- Câu hỏi của giám khảo: "${params.promptText || "(Không có câu hỏi)"}"
- Trình độ mục tiêu học viên chọn: Level ${level}
- Thời lượng ghi âm: ${params.durationSec || 0} giây
- Transcript nhận diện sơ bộ từ trình duyệt: "${params.browserTranscript || "(Trình duyệt chưa nhận diện được văn bản - hãy nghe trực tiếp file âm thanh)"}"
- Tình trạng âm thanh: ${audioContextNote}

YÊU CẦU CHẤM & SỬA CHI TIẾT (BẮT BUỘC ĐẦY ĐỦ CÁC KHÍA CẠNH SAU):
1. PHÁT ÂM CÓ DỄ NGHE KHÔNG & CÓ NGỮ ĐIỆU KHÔNG ("criteria.pronunciation_intonation" + "pronunciation_fixes"):
   - Nhận xét thẳng thắn, dễ hiểu xem người nghe có dễ nghe, dễ nắm bắt lời học viên nói không.
   - Nhận xét rõ về NGỮ ĐIỆU (intonation) & nhịp nói: giọng nói có sự lên xuống tự nhiên, biết nhấn vào từ mang nội dung (content words) và ngắt cụm hợp lý không, hay đang nói đều đều một tông (monotone như đọc bài viết), ngập ngừng hoặc nói quá nhanh/quá rời rạc?
   - Liệt kê tối đa 4 từ cụ thể trong bài nói mà học viên phát âm chưa chuẩn hoặc dễ nhấn sai trọng âm vào mảng "pronunciation_fixes" (kèm phiên âm chuẩn US IPA và chỉ dẫn cách đọc đúng bằng tiếng Việt). Nếu phát âm mọi từ đều tốt, trả về mảng rỗng [].

2. NGỮ PHÁP ("criteria.grammar" + "language_corrections"):
   - Kiểm tra thì của động từ có khớp với câu hỏi không (hiện tại đơn cho thói quen, quá khứ đơn cho trải nghiệm đã qua, tương lai cho kế hoạch), chia động từ, số ít/số nhiều, giới từ, cấu trúc câu.
   - Lưu ý đây là VĂN NÓI nên không bắt lỗi dấu câu/viết hoa; chỉ bắt lỗi ngữ pháp thực sự khi nói.

3. DÙNG TỪ TỰ NHIÊN & PHÁT HIỆN LỖI "VIETLISH" ("criteria.vocabulary_vietlish" + "language_corrections"):
   - Đánh giá cách dùng từ đã tự nhiên như giao tiếp đời thực chưa.
   - ĐẶC BIỆT tìm các cụm từ bị "Vietlish" (dịch từng chữ từ tiếng Việt sang tiếng Anh hoặc ghép từ thiếu tự nhiên mà người Việt hay mắc, ví dụ: "very like" -> "really like", "go play with friends" -> "hang out with my friends", "eat many delicious foods" -> "try lots of tasty food", "traffic is very crowded" -> "the streets are really crowded / traffic is heavy"...).
   - Trong mảng "language_corrections":
     + "original": trích NGUYÊN VĂN cụm từ trong "recognized_transcript" của học viên (2-10 từ) để hệ thống gạch chân/đối chiếu trực tiếp.
     + "corrected": cách nói lại tự nhiên, chuẩn xác ở mức ${level}.
     + "category": chỉ điền đúng 1 trong 3 nhãn: "Vietlish", "Từ vựng tự nhiên", hoặc "Ngữ pháp".
     + "explanation_vi": giải thích ngắn gọn tại sao cách nói cũ bị sai ngữ pháp hoặc hơi "Vietlish", và cách nói mới tự nhiên hơn thế nào.

4. SẮP XẾP CÁC Ý CÓ LOGIC, DỄ THEO DÕI KHÔNG ("criteria.coherence_logic"):
   - Nhận xét xem câu trả lời có đi thẳng vào câu hỏi không, thứ tự các ý có logic, mạch lạc, dễ theo dõi không (mạch chuẩn Part 1: Trả lời trực tiếp + Lý do -> Ví dụ thực tế -> Cảm xúc/Kết quả), và đã có từ nối tự nhiên trong văn nói ("because", "for example", "so" hoặc "Honestly", "Actually", "which...") chưa, hay các ý đang bị nhảy cóc, liệt kê rời rạc, lặp ý.

5. Ý TƯỞNG HƠI "CỤT" — CẦN DIỄN ĐẠT LẠI & MỞ RỘNG NHƯ THẾ NÀO ("idea_expansions"):
   - Kiểm tra xem bài nói có bị quá ngắn hoặc có ý nào nói ra rồi bỏ lửng, hơi "cụt" (chỉ trả lời Yes/No hoặc 1 câu ngắn, nêu ý chung chung mà thiếu lý do cụ thể, thiếu ví dụ gần gũi đời sống như chuyện học hành, bạn bè, gia đình, đi cà phê, dùng điện thoại..., hoặc kết thúc đột ngột).
   - Trong mảng "idea_expansions" (tối đa 3 mục): chỉ rõ chỗ nào bị "cụt" ("where_vi"), giải thích hướng diễn đạt lại & mở rộng sao cho tự nhiên, logic ("issue_vi"), đưa ra 1-2 câu tiếng Anh mẫu đúng chuẩn Level ${level} ("suggested_en") và dịch nghĩa tiếng Việt ("meaning_vi"). Nếu bài nói đã đầy đủ, tròn trịa 3 câu chuẩn mức ${level}, trả về [].

6. ${levelGuidance}

7. PHIÊN BẢN BÀI NÓI HOÀN CHỈNH TỰ NHIÊN ("natural_spoken_version"):
   - Dựa trên CHÍNH Ý TƯỞNG GỐC của học viên (nếu bài ghi âm quá ngắn/trống thì gợi ý câu trả lời gần gũi nhất với câu hỏi), hãy viết lại thành 1 câu trả lời nói hoàn chỉnh gồm 3 câu tự nhiên, trôi chảy, sạch lỗi Vietlish/ngữ pháp, sắp xếp logic và mở rộng vừa vặn ở đúng Level ${level} để học viên nghe và luyện nói theo.

8. NẾU FILE GHI ÂM IM LẶNG HOẶC CHỈ CÓ TIẾNG ỒN / KHÔNG CÓ TIẾNG ANH:
   - Vẫn trả về JSON hợp lệ, đặt "estimated_band": "Chưa đủ dữ liệu chấm", nhắc nhẹ nhàng trong "overall_comment" để học viên kiểm tra micro và ghi âm lại rõ hơn, đồng thời gợi ý cách trả lời trong "idea_expansions" và "natural_spoken_version".

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ (không bọc markdown ngoài JSON) theo đúng cấu trúc sau:
{
  "recognized_transcript": "Lời nói tiếng Anh thực tế của học viên nghe được từ file âm thanh",
  "level_assessment": "Đánh giá ngắn gọn so với mục tiêu Level ${level} (VD: Đạt mức B1 / Gần đạt mức B2 - cần tự nhiên hơn và mở rộng ý)",
  "estimated_band": "Ước lượng mức (VD: B1 · 5.0/10 hoặc B2 · 6.5/10)",
  "overall_comment": "2-3 câu nhận xét tổng quan bằng tiếng Việt: khen điểm tốt trước, sau đó chỉ rõ trọng tâm cần cải thiện.",
  "criteria": {
    "pronunciation_intonation": "Nhận xét chi tiết về độ dễ nghe khi phát âm và ngữ điệu/nhịp nói",
    "grammar": "Nhận xét ngắn gọn, rõ ràng về ngữ pháp & chia thì",
    "vocabulary_vietlish": "Nhận xét về cách dùng từ tự nhiên và các chỗ hơi bị Vietlish (nếu có)",
    "coherence_logic": "Nhận xét về cách sắp xếp các ý có logic, mạch lạc, dễ theo dõi không"
  },
  "pronunciation_fixes": [
    {
      "word": "từ phát âm chưa chuẩn",
      "ipa": "/phiên âm US IPA/",
      "issue_vi": "Mô tả lỗi phát âm/trọng âm nghe được và mẹo đọc đúng"
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

  const normalizedReview = {
    recognized_transcript: recognizedTranscript,
    level_assessment: String(parsedReview?.level_assessment || ""),
    estimated_band: String(parsedReview?.estimated_band || ""),
    overall_comment: String(parsedReview?.overall_comment || ""),
    criteria: {
      pronunciation_intonation: String(parsedReview?.criteria?.pronunciation_intonation || ""),
      grammar: String(parsedReview?.criteria?.grammar || ""),
      vocabulary_vietlish: String(parsedReview?.criteria?.vocabulary_vietlish || ""),
      coherence_logic: String(parsedReview?.criteria?.coherence_logic || "")
    },
    pronunciation_fixes: Array.isArray(parsedReview?.pronunciation_fixes)
      ? parsedReview.pronunciation_fixes
          .map((p: Record<string, unknown>) => ({
            word: String(p?.word || "").trim(),
            ipa: String(p?.ipa || "").trim(),
            issue_vi: String(p?.issue_vi || "").trim()
          }))
          .filter((p: { word: string; issue_vi: string }) => p.word && p.issue_vi)
      : [],
    language_corrections: Array.isArray(parsedReview?.language_corrections)
      ? parsedReview.language_corrections
          .map((c: Record<string, unknown>, idx: number) => ({
            id: Number(c?.id) || idx + 1,
            original: String(c?.original || "").trim(),
            corrected: String(c?.corrected || "").trim(),
            category: String(c?.category || "Từ vựng tự nhiên").trim(),
            explanation_vi: String(c?.explanation_vi || "").trim()
          }))
          .filter(
            (c: { original: string; corrected: string }) =>
              c.original && c.corrected && c.original.toLowerCase() !== c.corrected.toLowerCase()
          )
      : [],
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
  if (!browserTranscript && recognizedTranscript) {
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
