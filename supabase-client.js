// ============================================================================
// SPEAKING PART 1 — SHARED SUPABASE CLOUD CLIENT & UI UTILITIES
// ============================================================================

(function () {
  const AUDIO_BUCKET = "speaking-recordings";
  const CLASS_LIST = ["ONB204", "CB221"];
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

  window.SpeakingCloud = {
    CLASS_LIST,
    getClient,
    getRedirectUrl,
    signInWithGoogle,
    escapeHtml,
    formatDuration,
    formatDateTime,
    parseFullNameAndClass,
    formatStoredFullName,
    renderGoogleIconSvg,
    uploadRecording,
    deleteRecording,
    deleteRecordings,
    getSignedAudioUrls
  };
})();
