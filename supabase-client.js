// ============================================================================
// SPEAKING PART 1 — SHARED SUPABASE CLOUD CLIENT, AI GRADING & UI UTILITIES
// ============================================================================

(function () {
  const AUDIO_BUCKET = "speaking-recordings";
  const CLASS_LIST = ["ONB204", "CB221"];
  const RELEASE_DELAY_HOURS = 6;
  let cachedClient = null;

  function getClient() {
    if (cachedClient) return cachedClient;
    const cfg = window.SUPABASE_CONFIG || {};
    const url = String(cfg.url || "").trim().replace(/\/+$/, "");
    const anonKey = String(cfg.anonKey || "").trim();
    if (!url || !anonKey || !window.supabase || typeof window.supabase.createClient !== "function") {
      return null;
    }
    cachedClient = window.supabase.createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return cachedClient;
  }

  function getRedirectUrl() {
    return window.location.origin + window.location.pathname;
  }

  async function signInWithGoogle() {
    const client = getClient();
    if (!client) return { error: new Error("Chưa cấu hình Supabase.") };
    return client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getRedirectUrl(),
        queryParams: { prompt: "select_account" }
      }
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDuration(sec) {
    const total = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function formatDateTime(isoOrText) {
    if (!isoOrText) return "";
    const d = new Date(isoOrText);
    if (isNaN(d.getTime())) return String(isoOrText);
    const pad = n => (n < 10 ? "0" + n : "" + n);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function formatRemainingTime(isoReleaseAt) {
    if (!isoReleaseAt) return "";
    const targetMs = new Date(isoReleaseAt).getTime();
    if (isNaN(targetMs)) return "";
    const diffMs = targetMs - Date.now();
    if (diffMs <= 0) return "";
    const totalMins = Math.ceil(diffMs / 60000);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    if (hours > 0 && mins > 0) return `${hours} giờ ${mins} phút`;
    if (hours > 0) return `${hours} giờ`;
    return `${Math.max(1, mins)} phút`;
  }

  function getInitials(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "HV";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function parseFullNameAndClass(rawFullName) {
    const raw = String(rawFullName || "").trim();
    const match = raw.match(/^\[([A-Za-z0-9_-]+)\]\s*(.*)$/);
    if (match) {
      const candidateClass = match[1].toUpperCase();
      if (CLASS_LIST.includes(candidateClass)) {
        return {
          className: candidateClass,
          fullName: match[2].trim()
        };
      }
    }
    return {
      className: "",
      fullName: raw
    };
  }

  function formatStoredFullName(fullName, className) {
    const cleanName = String(fullName || "").trim();
    const upperClass = String(className || "").trim().toUpperCase();
    return upperClass && CLASS_LIST.includes(upperClass)
      ? `[${upperClass}] ${cleanName}`
      : cleanName;
  }

  function renderGoogleIconSvg(size) {
    const s = size || 18;
    return `
      <svg width="${s}" height="${s}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    `;
  }

  function pickAudioExtension(mimeType) {
    const m = String(mimeType || "").toLowerCase();
    if (m.includes("mp4") || m.includes("m4a")) return "mp4";
    if (m.includes("ogg")) return "ogg";
    if (m.includes("wav")) return "wav";
    return "webm";
  }

  async function uploadRecording(userId, questionId, takeId, blob) {
    const client = getClient();
    if (!client || !blob) return { path: "", error: null };
    const mimeType = blob.type || "audio/webm";
    const path = `${userId}/${questionId}/${takeId}.${pickAudioExtension(mimeType)}`;
    const { error } = await client.storage.from(AUDIO_BUCKET).upload(path, blob, {
      contentType: mimeType,
      upsert: true
    });
    return error ? { path: "", error } : { path, error: null };
  }

  async function deleteRecording(audioPath) {
    const client = getClient();
    if (!client || !audioPath) return;
    try {
      await client.storage.from(AUDIO_BUCKET).remove([audioPath]);
    } catch (e) {}
  }

  async function deleteRecordings(audioPaths) {
    const client = getClient();
    if (!client || !Array.isArray(audioPaths)) return;
    const unique = Array.from(new Set(audioPaths.filter(Boolean)));
    const BATCH = 100;
    for (let i = 0; i < unique.length; i += BATCH) {
      try {
        await client.storage.from(AUDIO_BUCKET).remove(unique.slice(i, i + BATCH));
      } catch (e) {}
    }
  }

  async function getSignedAudioUrls(paths) {
    const client = getClient();
    const map = {};
    if (!client || !Array.isArray(paths)) return map;
    const uniquePaths = Array.from(new Set(paths.filter(Boolean)));
    const BATCH = 50;
    for (let i = 0; i < uniquePaths.length; i += BATCH) {
      try {
        const { data, error } = await client.storage
          .from(AUDIO_BUCKET)
          .createSignedUrls(uniquePaths.slice(i, i + BATCH), 7200);
        if (!error && Array.isArray(data)) {
          data.forEach(item => {
            if (item && item.path && item.signedUrl) map[item.path] = item.signedUrl;
          });
        }
      } catch (e) {}
    }
    return map;
  }

  // ==========================================================================
  // AI SPEAKING GRADING INVOCATION (6-HOUR SCHEDULED RELEASE + RETRY QUEUE)
  // ==========================================================================
  async function invokeGradeSpeaking(attemptId, options) {
    const client = getClient();
    const cfg = window.SUPABASE_CONFIG || {};
    const baseUrl = String(cfg.url || "").trim().replace(/\/+$/, "");
    const anonKey = String(cfg.anonKey || "").trim();
    if (!client || !baseUrl || !anonKey || !attemptId) {
      return { ok: false, error: "Chưa kết nối Supabase." };
    }
    const opts = options || {};
    try {
      const { data: sessionData } = await client.auth.getSession();
      const accessToken = sessionData && sessionData.session ? sessionData.session.access_token : "";
      if (!accessToken) {
        return { ok: false, error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." };
      }

      const res = await fetch(`${baseUrl}/functions/v1/grade-speaking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          attempt_id: attemptId,
          prompt_text: opts.promptText || "",
          topic_title: opts.topicTitle || "",
          target_level: opts.targetLevel || "B1",
          force_teacher: Boolean(opts.forceTeacher),
          release_now: Boolean(opts.releaseNow)
        })
      });

      const rawText = await res.text().catch(() => "");
      let parsed = null;
      try {
        parsed = rawText ? JSON.parse(rawText) : null;
      } catch (e) {}

      if (!res.ok || !parsed || parsed.ok !== true) {
        const detail =
          (parsed && (parsed.error || parsed.message || parsed.msg)) ||
          (rawText ? rawText.slice(0, 220) : `HTTP ${res.status}`);
        return {
          ok: false,
          error: `[HTTP ${res.status}] ${detail}`
        };
      }
      return parsed;
    } catch (err) {
      return { ok: false, error: err && err.message ? err.message : "Lỗi kết nối hệ thống chấm bài AI." };
    }
  }

  async function invokeProcessSpeakingQueue(batchSize) {
    const client = getClient();
    const cfg = window.SUPABASE_CONFIG || {};
    const baseUrl = String(cfg.url || "").trim().replace(/\/+$/, "");
    const anonKey = String(cfg.anonKey || "").trim();
    if (!client || !baseUrl || !anonKey) {
      return { ok: false, error: "Chưa kết nối Supabase." };
    }
    try {
      const { data: sessionData } = await client.auth.getSession();
      const accessToken = sessionData && sessionData.session ? sessionData.session.access_token : "";
      if (!accessToken) {
        return { ok: false, error: "Phiên đăng nhập đã hết hạn." };
      }
      const res = await fetch(`${baseUrl}/functions/v1/grade-speaking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          mode: "process_queue",
          batch_size: batchSize || 5
        })
      });
      const rawText = await res.text().catch(() => "");
      let parsed = null;
      try {
        parsed = rawText ? JSON.parse(rawText) : null;
      } catch (e) {}
      if (!res.ok || !parsed || parsed.ok !== true) {
        const detail = (parsed && (parsed.error || parsed.message)) || rawText.slice(0, 200) || `HTTP ${res.status}`;
        return { ok: false, error: `[HTTP ${res.status}] ${detail}` };
      }
      return parsed;
    } catch (err) {
      return { ok: false, error: err && err.message ? err.message : "Lỗi chạy hàng đợi chấm bài." };
    }
  }

  function getSpeakingCategoryBadgeClass(cat) {
    const lower = String(cat || "").toLowerCase();
    if (lower.includes("vietlish") || lower.includes("việt")) return "cat-vietlish";
    if (lower.includes("từ vựng") || lower.includes("tự nhiên") || lower.includes("vocab")) return "cat-vocab";
    return "cat-grammar";
  }

  function buildInlineHighlightedTranscript(originalText, corrections) {
    const text = String(originalText || "").trim();
    const list = Array.isArray(corrections) ? corrections : [];
    if (!text) {
      return `<span style="color:#71717A;font-style:italic;">(Không nhận diện được lời nói tiếng Anh rõ ràng trong file ghi âm)</span>`;
    }
    if (list.length === 0) return `“${escapeHtml(text)}”`;

    const lowerText = text.toLowerCase();
    const occupied = [];
    const matches = [];

    const overlaps = (start, end) =>
      occupied.some(r => start < r.end && end > r.start);

    list.forEach((c, idx) => {
      const needle = String(c.original || "").trim();
      if (!needle) return;
      const num = c.id || idx + 1;
      let searchFrom = 0;

      while (searchFrom < text.length) {
        let pos = text.indexOf(needle, searchFrom);
        if (pos === -1) {
          pos = lowerText.indexOf(needle.toLowerCase(), searchFrom);
        }
        if (pos === -1) break;
        const endPos = pos + needle.length;
        if (!overlaps(pos, endPos)) {
          occupied.push({ start: pos, end: endPos });
          matches.push({
            start: pos,
            end: endPos,
            num,
            original: text.slice(pos, endPos),
            corrected: String(c.corrected || ""),
            explanation: String(c.explanation_vi || "")
          });
          break;
        }
        searchFrom = pos + 1;
      }
    });

    if (matches.length === 0) return `“${escapeHtml(text)}”`;
    matches.sort((a, b) => a.start - b.start);

    let out = "“";
    let cursor = 0;
    matches.forEach(m => {
      if (m.start > cursor) {
        out += escapeHtml(text.slice(cursor, m.start));
      }
      out += `<span class="ai-inline-fix" title="${escapeHtml(`#${m.num}: ${m.explanation}`)}"><del class="ai-del">${escapeHtml(m.original)}</del><ins class="ai-ins">${escapeHtml(m.corrected)}</ins><sup class="ai-sup">[${m.num}]</sup></span>`;
      cursor = m.end;
    });
    if (cursor < text.length) {
      out += escapeHtml(text.slice(cursor));
    }
    out += "”";
    return out;
  }

  function renderSpeakerMiniBtn(textToSpeak, label) {
    const clean = String(textToSpeak || "").trim();
    if (!clean) return "";
    return `
      <button
        type="button"
        class="ai-listen-inline-btn"
        data-speak-word="${escapeHtml(clean)}"
        title="Bấm để nghe phát âm mẫu"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span>${escapeHtml(label || "Nghe")}</span>
      </button>
    `;
  }

  function renderSpeakingReviewHtml(originalTranscript, reviewJson, meta) {
    if (!reviewJson || typeof reviewJson !== "object") return "";
    const info = meta || {};
    const targetLevel = String(info.targetLevel || "B1").toUpperCase();
    const spokenText = String(reviewJson.recognized_transcript || originalTranscript || "").trim();
    const pronFixes = Array.isArray(reviewJson.pronunciation_fixes) ? reviewJson.pronunciation_fixes : [];
    const corrections = Array.isArray(reviewJson.language_corrections)
      ? reviewJson.language_corrections
      : Array.isArray(reviewJson.corrections)
        ? reviewJson.corrections
        : [];
    const ideaExpansions = Array.isArray(reviewJson.idea_expansions)
      ? reviewJson.idea_expansions
      : Array.isArray(reviewJson.idea_additions)
        ? reviewJson.idea_additions
        : [];
    const criteria = reviewJson.criteria || {};
    const naturalVersion = String(reviewJson.natural_spoken_version || reviewJson.revised_version || "").trim();

    const criteriaItems = [
      { key: "pronunciation_intonation", label: "🎙️ Phát âm & Ngữ điệu" },
      { key: "grammar", label: "📐 Ngữ pháp & Chia thì" },
      { key: "vocabulary_vietlish", label: "💬 Dùng từ tự nhiên & Lỗi Vietlish" },
      { key: "coherence_logic", label: "🧭 Sắp xếp ý logic & Dễ theo dõi" }
    ].filter(item => criteria[item.key]);

    return `
      <div class="ai-review-panel">
        <div class="ai-review-summary">
          <div class="ai-review-badges">
            <span class="ai-level-badge">Mục tiêu Level ${escapeHtml(targetLevel)}</span>
            ${reviewJson.estimated_band ? `<span class="ai-band-badge">${escapeHtml(reviewJson.estimated_band)}</span>` : ""}
            ${reviewJson.level_assessment ? `<span class="ai-assess-text">${escapeHtml(reviewJson.level_assessment)}</span>` : ""}
          </div>
          ${reviewJson.overall_comment ? `<p class="ai-overall-comment">${escapeHtml(reviewJson.overall_comment)}</p>` : ""}

          ${
            criteriaItems.length > 0
              ? `
              <div class="ai-criteria-grid">
                ${criteriaItems
                  .map(
                    item => `
                    <div class="ai-criteria-item">
                      <div class="ai-criteria-label">${escapeHtml(item.label)}</div>
                      <div class="ai-criteria-text">${escapeHtml(criteria[item.key])}</div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            `
              : ""
          }
        </div>

        <div class="ai-review-block">
          <div class="ai-block-title">1. Lời nói nhận diện từ bản ghi âm &amp; đánh dấu chỗ cần chỉnh</div>
          <div class="ai-inline-essay">${buildInlineHighlightedTranscript(spokenText, corrections)}</div>
        </div>

        <div class="ai-review-block">
          <div class="ai-block-title">2. Chỉnh phát âm &amp; trọng âm từ cụ thể (${pronFixes.length} từ)</div>
          ${
            pronFixes.length === 0
              ? `<p class="ai-clean-note">✓ Các từ trong bài nói của bạn đều nghe rõ chữ, không có từ nào phát âm sai gây khó hiểu.</p>`
              : `
              <div class="ai-pron-grid">
                ${pronFixes
                  .map(
                    p => `
                    <div class="ai-pron-card">
                      <div class="ai-pron-top">
                        <button
                          type="button"
                          class="vocab-word-click-btn"
                          data-speak-word="${escapeHtml(p.word)}"
                          title="Bấm để nghe phát âm chuẩn: ${escapeHtml(p.word)}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                          <span>${escapeHtml(p.word)}</span>
                        </button>
                        ${p.ipa ? `<span class="ai-pron-ipa">${escapeHtml(p.ipa)}</span>` : ""}
                      </div>
                      <p class="ai-pron-issue">${escapeHtml(p.issue_vi)}</p>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            `
          }
        </div>

        <div class="ai-review-block">
          <div class="ai-block-title">3. Sửa Ngữ pháp, Dùng từ tự nhiên &amp; Chữa diễn đạt "Vietlish" (${corrections.length} mục)</div>
          ${
            corrections.length === 0
              ? `<p class="ai-clean-note">✓ Câu trả lời dùng từ tự nhiên, đúng ngữ pháp ở mức Level ${escapeHtml(targetLevel)} và không bị dịch từng chữ (Vietlish).</p>`
              : `
              <div class="ai-corr-table-wrap">
                <table class="ai-corr-table">
                  <thead>
                    <tr>
                      <th style="width:36px;">#</th>
                      <th style="width:36%;">Cách nói cũ → Tự nhiên hơn</th>
                      <th style="width:120px;">Nhóm lỗi</th>
                      <th>Giải thích &amp; Cách diễn đạt tự nhiên</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${corrections
                      .map((c, idx) => {
                        const num = c.id || idx + 1;
                        return `
                          <tr>
                            <td class="ai-col-num">${num}</td>
                            <td class="ai-col-diff">
                              <div class="ai-diff-orig">${escapeHtml(c.original)}</div>
                              <div class="ai-diff-fix-row">
                                <span class="ai-diff-fix">→ ${escapeHtml(c.corrected)}</span>
                                ${renderSpeakerMiniBtn(c.corrected, "Nghe")}
                              </div>
                            </td>
                            <td>
                              <span class="ai-cat-pill ${getSpeakingCategoryBadgeClass(c.category)}">${escapeHtml(c.category || "Ngữ pháp")}</span>
                            </td>
                            <td class="ai-col-why">${escapeHtml(c.explanation_vi || "")}</td>
                          </tr>
                        `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
            `
          }
        </div>

        ${
          ideaExpansions.length > 0
            ? `
            <div class="ai-review-block">
              <div class="ai-block-title">4. Ý tưởng hơi "cụt" — Cách diễn đạt lại &amp; Mở rộng cho mạch lạc (chuẩn Level ${escapeHtml(targetLevel)})</div>
              <div class="ai-ideas-list">
                ${ideaExpansions
                  .map(it => {
                    const enText = it.suggested_en || it.suggested_sentences_en || "";
                    return `
                      <div class="ai-idea-card">
                        <div class="ai-idea-head-row">
                          ${it.where_vi ? `<div class="ai-idea-where">${escapeHtml(it.where_vi)}</div>` : "<div></div>"}
                          ${enText ? renderSpeakerMiniBtn(enText, "Nghe câu gợi ý") : ""}
                        </div>
                        ${it.issue_vi ? `<p class="ai-idea-issue">${escapeHtml(it.issue_vi)}</p>` : ""}
                        ${enText ? `<div class="ai-idea-en">“${escapeHtml(enText)}”</div>` : ""}
                        ${it.meaning_vi ? `<div class="ai-idea-vi">${escapeHtml(it.meaning_vi)}</div>` : ""}
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          `
            : ""
        }

        ${
          naturalVersion
            ? `
            <details class="ai-revised-details" open>
              <summary class="ai-revised-summary">
                <span>✨ Bài nói 3 câu hoàn chỉnh, tự nhiên (giữ nguyên ý của bạn · Level ${escapeHtml(targetLevel)})</span>
              </summary>
              <div class="ai-revised-body">
                <div style="margin-bottom:8px;">“${escapeHtml(naturalVersion)}”</div>
                <div>${renderSpeakerMiniBtn(naturalVersion, "Nghe mẫu cả câu trả lời để luyện ngữ điệu")}</div>
              </div>
            </details>
          `
            : ""
        }
      </div>
    `;
  }

  window.SpeakingCloud = {
    CLASS_LIST,
    RELEASE_DELAY_HOURS,
    getClient,
    getRedirectUrl,
    signInWithGoogle,
    escapeHtml,
    formatDuration,
    formatDateTime,
    formatRemainingTime,
    getInitials,
    parseFullNameAndClass,
    formatStoredFullName,
    renderGoogleIconSvg,
    uploadRecording,
    deleteRecording,
    deleteRecordings,
    getSignedAudioUrls,
    invokeGradeSpeaking,
    invokeProcessSpeakingQueue,
    renderSpeakingReviewHtml
  };
})();
