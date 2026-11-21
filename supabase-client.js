// ============================================================================
// SPEAKING PART 1 — SHARED SUPABASE CLOUD CLIENT HELPER
// Used by both index.html (Student App) and teacher.html (Teacher Portal)
// ============================================================================

(function () {
  const AUDIO_BUCKET = "speaking-recordings";
  let cachedClient = null;

  function getConfig() {
    const cfg = window.SUPABASE_CONFIG || {};
    return {
      url: String(cfg.url || "").trim().replace(/\/+$/, ""),
      anonKey: String(cfg.anonKey || "").trim()
    };
  }

  function isEnabled() {
    const cfg = getConfig();
    return Boolean(cfg.url && cfg.anonKey && window.supabase && typeof window.supabase.createClient === "function");
  }

  function getClient() {
    if (!isEnabled()) return null;
    if (!cachedClient) {
      const cfg = getConfig();
      cachedClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    }
    return cachedClient;
  }

  function getRedirectUrl() {
    // Works reliably on both root domains and GitHub Pages subpaths (e.g. /speaking-part-1/)
    return window.location.origin + window.location.pathname;
  }

  async function signInWithGoogle() {
    const client = getClient();
    if (!client) return { error: new Error("Chưa cấu hình Supabase.") };
    return client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getRedirectUrl(),
        queryParams: {
          prompt: "select_account"
        }
      }
    });
  }

  function formatDateTime(isoOrText) {
    if (!isoOrText) return "";
    const d = new Date(isoOrText);
    if (isNaN(d.getTime())) return String(isoOrText);
    const pad = n => (n < 10 ? "0" + n : "" + n);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
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
    const ext = pickAudioExtension(mimeType);
    const path = `${userId}/${questionId}/${takeId}.${ext}`;
    const { error } = await client.storage.from(AUDIO_BUCKET).upload(path, blob, {
      contentType: mimeType,
      upsert: true
    });
    if (error) {
      return { path: "", error };
    }
    return { path, error: null };
  }

  async function deleteRecording(audioPath) {
    const client = getClient();
    if (!client || !audioPath) return;
    try {
      await client.storage.from(AUDIO_BUCKET).remove([audioPath]);
    } catch (e) {}
  }

  async function getSignedAudioUrls(paths) {
    const client = getClient();
    const map = {};
    if (!client || !Array.isArray(paths)) return map;
    const uniquePaths = Array.from(new Set(paths.filter(Boolean)));
    if (uniquePaths.length === 0) return map;

    // Fetch signed URLs in batches of 50 (valid for 2 hours)
    const BATCH = 50;
    for (let i = 0; i < uniquePaths.length; i += BATCH) {
      const slice = uniquePaths.slice(i, i + BATCH);
      try {
        const { data, error } = await client.storage
          .from(AUDIO_BUCKET)
          .createSignedUrls(slice, 7200);
        if (!error && Array.isArray(data)) {
          data.forEach(item => {
            if (item && item.path && item.signedUrl) {
              map[item.path] = item.signedUrl;
            }
          });
        }
      } catch (e) {}
    }
    return map;
  }

  window.SpeakingCloud = {
    AUDIO_BUCKET,
    isEnabled,
    getClient,
    getRedirectUrl,
    signInWithGoogle,
    formatDateTime,
    uploadRecording,
    deleteRecording,
    getSignedAudioUrls
  };
})();
