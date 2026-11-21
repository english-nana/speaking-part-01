// ==========================================================================
// SPEAKING PART 1 — STUDENT APPLICATION ENGINE (index.html)
// Clean student-only interface:
// - Student Login / Register (no visibility into other accounts or teacher portal)
// - Personal Vocabulary Bank ("Kho từ vựng của tôi") across all topics
// - Click-to-Hear Vocabulary with IPA in Section V
// - Idea Notes ("Ghi chú ý tưởng") per question
// - Multi-Take Audio Recording + Live Speech-to-Text + Choose Take to Submit
// ==========================================================================

(function () {
  const LS_KEY = "speaking_part1_student_ls_v4";
  const SESSION_KEY = "speaking_part1_current_user_v4";
  const IDB_NAME = "speaking_part1_permanent_idb";
  const IDB_STORE = "app_database";
  const TOPICS = window.SPEAKING_TOPICS || [];
  const CLOUD = window.SpeakingCloud || { isEnabled: () => false };

  const defaultVocabDeck = [
    {
      word: "prefer",
      ipa: "/prɪˈfɜːr/",
      pos: "v.",
      meaning: "thích hơn",
      example: "I prefer traveling with my friends because it is very fun and safe.",
      topic: "Travelling"
    },
    {
      word: "local food",
      ipa: "/ˈloʊkl fuːd/",
      pos: "n. phr.",
      meaning: "đồ ăn địa phương",
      example: "We can also try local food at the market.",
      topic: "Travelling"
    }
  ];

  let db = {
    accounts: {}
  };

  let state = {
    view: "home", // "home" | "practice" | "auth"
    authMode: "login", // "login" | "register"
    authError: "",
    authInfo: "",
    authLoading: false,
    cloudSyncStatus: "",
    googleModalOpen: false,
    googleModalError: "",
    currentUserEmail: "",
    currentUserId: "",
    isTeacher: false,
    currentTopicId: TOPICS[0] ? TOPICS[0].id : "topic-travelling",
    currentQuestionIndex: 0,
    selectedLevel: "b1", // "b1" | "b2"
    // Recording runtime state
    isRecording: false,
    recordingSeconds: 0,
    liveTranscript: "",
    submitSuccessMsg: "",
    // Student Vocabulary Modal
    vocabModalOpen: false,
    vocabSearchQuery: ""
  };

  let mediaRecorder = null;
  let audioChunks = [];
  let recordingTimer = null;
  let speechRecognizer = null;
  let finalTranscriptBuffer = "";
  let interimTranscriptBuffer = "";
  let noteSaveDebounceTimer = null;

  // ==========================================================================
  // SUPABASE CLOUD SYNC LAYER (ACTIVE WHEN supabase-config.js IS CONFIGURED)
  // ==========================================================================
  function isCloudMode() {
    return Boolean(CLOUD && CLOUD.isEnabled && CLOUD.isEnabled());
  }

  function getTopicIdForQuestion(qId) {
    for (const t of TOPICS) {
      if ((t.questions || []).some(q => q.id === qId)) return t.id;
    }
    return state.currentTopicId || "topic-travelling";
  }

  async function loadCloudStudentData(sessionUser) {
    const client = CLOUD.getClient();
    if (!client || !sessionUser) return;

    const uid = sessionUser.id;
    const email = String(sessionUser.email || "").trim().toLowerCase();
    const meta = sessionUser.user_metadata || {};
    const appMeta = sessionUser.app_metadata || {};
    const displayName =
      String(meta.full_name || meta.name || "").trim() ||
      email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    const avatarUrl = meta.avatar_url || meta.picture || "";
    const provider = appMeta.provider || "email";

    state.cloudSyncStatus = "Đang đồng bộ dữ liệu đám mây...";
    renderApp();

    // 1. Ensure profile exists and refresh last_active_at
    try {
      await client.from("profiles").upsert(
        {
          id: uid,
          email: email,
          full_name: displayName,
          avatar_url: avatarUrl,
          auth_provider: provider,
          last_active_at: new Date().toISOString()
        },
        { onConflict: "id" }
      );
    } catch (e) {}

    // 2. Fetch vocab, idea notes, attempts, and server-side teacher role in parallel
    const [vocabRes, notesRes, attemptsRes, teacherRes] = await Promise.all([
      client.from("student_vocab").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      client.from("question_notes").select("*").eq("user_id", uid),
      client.from("speaking_attempts").select("*").eq("user_id", uid).order("created_at", { ascending: true }),
      client.rpc("is_teacher")
    ]);
    state.isTeacher = Boolean(teacherRes && !teacherRes.error && teacherRes.data === true);

    const savedVocab = Array.isArray(vocabRes.data)
      ? vocabRes.data.map(row => ({
          word: row.word,
          ipa: row.ipa || "",
          pos: row.pos || "",
          meaning: row.meaning || "",
          example: row.example || "",
          topic: row.topic || ""
        }))
      : [];

    const questionsData = {};

    if (Array.isArray(notesRes.data)) {
      notesRes.data.forEach(row => {
        if (!questionsData[row.question_id]) {
          questionsData[row.question_id] = {
            ideaNote: "",
            selectedTakeId: null,
            submittedTakeId: null,
            submittedAt: null,
            attempts: []
          };
        }
        questionsData[row.question_id].ideaNote = row.idea_note || "";
      });
    }

    const attemptRows = Array.isArray(attemptsRes.data) ? attemptsRes.data : [];
    const audioPaths = attemptRows.map(r => r.audio_path).filter(Boolean);
    const signedUrlMap = await CLOUD.getSignedAudioUrls(audioPaths);

    attemptRows.forEach(row => {
      const qId = row.question_id;
      if (!questionsData[qId]) {
        questionsData[qId] = {
          ideaNote: "",
          selectedTakeId: null,
          submittedTakeId: null,
          submittedAt: null,
          attempts: []
        };
      }
      const qd = questionsData[qId];
      const attObj = {
        id: row.id,
        num: row.take_number || qd.attempts.length + 1,
        createdAt: CLOUD.formatDateTime(row.created_at),
        durationSec: row.duration_sec || 0,
        audioDataUrl: row.audio_path && signedUrlMap[row.audio_path] ? signedUrlMap[row.audio_path] : null,
        audioPath: row.audio_path || "",
        transcript: row.transcript || "",
        teacherFeedback: row.teacher_feedback || "",
        teacherScore: row.teacher_score || ""
      };
      qd.attempts.push(attObj);
      if (row.is_submitted) {
        qd.submittedTakeId = row.id;
        qd.submittedAt = CLOUD.formatDateTime(row.submitted_at || row.created_at);
        qd.selectedTakeId = row.id;
      }
    });

    Object.values(questionsData).forEach(qd => {
      if (!qd.selectedTakeId && qd.attempts.length > 0) {
        qd.selectedTakeId = qd.attempts[qd.attempts.length - 1].id;
      }
    });

    db.accounts[email] = {
      id: uid,
      name: displayName,
      email: email,
      authProvider: provider,
      picture: avatarUrl,
      createdAt: CLOUD.formatDateTime(sessionUser.created_at),
      savedVocab: savedVocab,
      questionsData: questionsData
    };

    state.currentUserEmail = email;
    state.currentUserId = uid;
    state.authError = "";
    state.authInfo = "";
    state.authLoading = false;
    state.cloudSyncStatus = "";
    if (state.view === "auth") state.view = "home";
    renderApp();
  }

  async function cloudSaveIdeaNote(qId, noteText) {
    if (!isCloudMode() || !state.currentUserId) return;
    const client = CLOUD.getClient();
    try {
      await client.from("question_notes").upsert(
        {
          user_id: state.currentUserId,
          question_id: qId,
          idea_note: noteText,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id,question_id" }
      );
    } catch (e) {}
  }

  async function cloudAddVocab(item) {
    if (!isCloudMode() || !state.currentUserId) return;
    const client = CLOUD.getClient();
    try {
      await client.from("student_vocab").upsert(
        {
          user_id: state.currentUserId,
          word: item.word,
          ipa: item.ipa || "",
          pos: item.pos || "",
          meaning: item.meaning || "",
          example: item.example || "",
          topic: item.topic || ""
        },
        { onConflict: "user_id,word_lower" }
      );
    } catch (e) {}
  }

  async function cloudRemoveVocab(word) {
    if (!isCloudMode() || !state.currentUserId) return;
    const client = CLOUD.getClient();
    try {
      await client
        .from("student_vocab")
        .delete()
        .eq("user_id", state.currentUserId)
        .eq("word_lower", String(word || "").trim().toLowerCase());
    } catch (e) {}
  }

  async function cloudCreateAttempt(qId, takeObj, audioBlob) {
    if (!isCloudMode() || !state.currentUserId) return;
    const client = CLOUD.getClient();
    state.cloudSyncStatus = "☁️ Đang lưu bản ghi âm lên đám mây...";
    renderApp();

    let audioPath = "";
    if (audioBlob && audioBlob.size > 0) {
      const upRes = await CLOUD.uploadRecording(state.currentUserId, qId, takeObj.id, audioBlob);
      if (!upRes.error && upRes.path) {
        audioPath = upRes.path;
        takeObj.audioPath = audioPath;
      }
    }

    try {
      await client.from("speaking_attempts").insert({
        id: takeObj.id,
        user_id: state.currentUserId,
        topic_id: getTopicIdForQuestion(qId),
        question_id: qId,
        take_number: takeObj.num,
        duration_sec: takeObj.durationSec,
        transcript: takeObj.transcript || "",
        audio_path: audioPath,
        is_submitted: false
      });
      await client
        .from("profiles")
        .update({ last_active_at: new Date().toISOString() })
        .eq("id", state.currentUserId);
      state.cloudSyncStatus = "";
    } catch (e) {
      state.cloudSyncStatus = "⚠️ Lỗi đồng bộ bản ghi âm. Vui lòng thử lại.";
    }
    renderApp();
  }

  async function cloudDeleteAttempt(takeObj) {
    if (!isCloudMode() || !state.currentUserId || !takeObj) return;
    const client = CLOUD.getClient();
    try {
      await client.from("speaking_attempts").delete().eq("id", takeObj.id).eq("user_id", state.currentUserId);
      if (takeObj.audioPath) {
        await CLOUD.deleteRecording(takeObj.audioPath);
      }
    } catch (e) {}
  }

  async function cloudSubmitAttempt(qId, chosenTakeId) {
    if (!isCloudMode() || !state.currentUserId) return;
    const client = CLOUD.getClient();
    const nowIso = new Date().toISOString();
    try {
      await client
        .from("speaking_attempts")
        .update({ is_submitted: false, submitted_at: null })
        .eq("user_id", state.currentUserId)
        .eq("question_id", qId);

      await client
        .from("speaking_attempts")
        .update({ is_submitted: true, submitted_at: nowIso })
        .eq("id", chosenTakeId)
        .eq("user_id", state.currentUserId);

      await client
        .from("profiles")
        .update({ last_active_at: nowIso })
        .eq("id", state.currentUserId);
    } catch (e) {}
  }

  // ==========================================================================
  // PERMANENT STORAGE (LOCALSTORAGE + INDEXEDDB + /api/db SERVER DISK)
  // ==========================================================================
  function mergeAccounts(targetAccounts, incomingAccounts) {
    if (!incomingAccounts || typeof incomingAccounts !== "object") return;
    Object.keys(incomingAccounts).forEach(email => {
      const inc = incomingAccounts[email];
      if (!targetAccounts[email]) {
        targetAccounts[email] = inc;
      } else {
        const cur = targetAccounts[email];
        const vocabMap = new Map();
        (cur.savedVocab || []).concat(inc.savedVocab || []).forEach(v => {
          if (v && v.word) vocabMap.set(v.word.toLowerCase(), v);
        });
        cur.savedVocab = Array.from(vocabMap.values());

        cur.questionsData = cur.questionsData || {};
        const incQD = inc.questionsData || {};
        Object.keys(incQD).forEach(qId => {
          if (!cur.questionsData[qId]) {
            cur.questionsData[qId] = incQD[qId];
          } else {
            const cq = cur.questionsData[qId];
            const iq = incQD[qId];
            if (!cq.ideaNote && iq.ideaNote) cq.ideaNote = iq.ideaNote;
            if (!cq.submittedTakeId && iq.submittedTakeId) {
              cq.submittedTakeId = iq.submittedTakeId;
              cq.submittedAt = iq.submittedAt;
            }
            const attMap = new Map();
            (cq.attempts || []).concat(iq.attempts || []).forEach(a => {
              if (a && a.id) attMap.set(a.id, a);
            });
            cq.attempts = Array.from(attMap.values());
            if (!cq.selectedTakeId && cq.attempts.length > 0) {
              cq.selectedTakeId = cq.attempts[cq.attempts.length - 1].id;
            }
          }
        });
      }
    });
  }

  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.accounts) {
          mergeAccounts(db.accounts, parsed.accounts);
        }
      }
      const savedUser = localStorage.getItem(SESSION_KEY);
      if (savedUser && savedUser !== "__LOGGED_OUT__" && db.accounts[savedUser]) {
        state.currentUserEmail = savedUser;
      } else if (savedUser === "__LOGGED_OUT__") {
        state.currentUserEmail = "";
        state.view = "auth";
      }
    } catch (e) {}
  }

  function openIndexedDB() {
    return new Promise(resolve => {
      if (!("indexedDB" in window)) return resolve(null);
      try {
        const req = window.indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = e => {
          const idb = e.target.result;
          if (!idb.objectStoreNames.contains(IDB_STORE)) {
            idb.createObjectStore(IDB_STORE);
          }
        };
        req.onsuccess = e => resolve(e.target.result);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  async function loadFromIndexedDB() {
    const idb = await openIndexedDB();
    if (!idb) return;
    return new Promise(resolve => {
      try {
        const tx = idb.transaction(IDB_STORE, "readonly");
        const store = tx.objectStore(IDB_STORE);
        const req = store.get("main_db");
        req.onsuccess = () => {
          if (req.result && req.result.accounts) {
            mergeAccounts(db.accounts, req.result.accounts);
          }
          resolve();
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  async function saveToIndexedDB() {
    const idb = await openIndexedDB();
    if (!idb) return;
    try {
      const tx = idb.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      store.put(db, "main_db");
    } catch (e) {}
  }

  async function syncAccountToServerDisk() {
    const acc = getCurrentAccount();
    if (!acc) return;
    try {
      await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accounts: {
            [acc.email]: acc
          }
        })
      });
    } catch (e) {}
  }

  async function verifyLoginOnServer(email, password) {
    try {
      const res = await fetch("/api/student-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && data.account) {
          mergeAccounts(db.accounts, { [email]: data.account });
          return { ok: true, account: db.accounts[email] };
        }
        return { ok: false, error: data.error || "" };
      }
    } catch (e) {}
    return null;
  }

  async function completeGoogleSignIn(googleEmail, googleName, googlePicture) {
    let email = String(googleEmail || "").trim().toLowerCase();
    if (!email) return;
    if (!email.includes("@")) {
      email = email + "@gmail.com";
    }
    const displayName =
      String(googleName || "").trim() ||
      email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    // 1. Sync with backend /api/google-login if running on local server
    try {
      const res = await fetch("/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: displayName,
          picture: googlePicture || "",
          createdAt: getNowTimestamp(),
          defaultVocab: defaultVocabDeck
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && data.account) {
          mergeAccounts(db.accounts, { [email]: data.account });
        }
      }
    } catch (e) {}

    // 2. Ensure account exists in local db as well
    if (!db.accounts[email]) {
      db.accounts[email] = {
        name: displayName,
        email: email,
        password: "",
        authProvider: "google",
        picture: googlePicture || "",
        createdAt: getNowTimestamp(),
        savedVocab: JSON.parse(JSON.stringify(defaultVocabDeck)),
        questionsData: {}
      };
    } else {
      db.accounts[email].authProvider = "google";
      if (googleName && googleName.trim()) {
        db.accounts[email].name = googleName.trim();
      }
    }

    state.currentUserEmail = email;
    state.authError = "";
    state.googleModalOpen = false;
    state.googleModalError = "";
    state.view = "home";
    persistAllData();
    renderApp();
  }

  function decodeGoogleJwt(jwtToken) {
    try {
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  async function triggerGoogleLoginFlow() {
    // 1. Real Supabase Google OAuth (Production GitHub Pages mode)
    if (isCloudMode()) {
      state.authError = "";
      state.authInfo = "";
      state.authLoading = true;
      renderApp();
      const { error } = await CLOUD.signInWithGoogle();
      if (error) {
        state.authLoading = false;
        state.authError = "Không thể mở đăng nhập Google: " + (error.message || "Lỗi kết nối");
        renderApp();
      }
      return;
    }

    // 2. Standalone GIS OAuth if configured manually
    const clientId = window.GOOGLE_OAUTH_CLIENT_ID || "";
    if (clientId && window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: response => {
            const payload = decodeGoogleJwt(response.credential);
            if (payload && payload.email) {
              completeGoogleSignIn(payload.email, payload.name, payload.picture);
            }
          }
        });
        window.google.accounts.id.prompt();
        return;
      } catch (e) {}
    }

    // 3. Built-in Google Sign-In Dialog (Local mode)
    state.googleModalOpen = true;
    state.googleModalError = "";
    renderApp();
    setTimeout(() => {
      const inp = document.getElementById("inp-google-email");
      if (inp) inp.focus();
    }, 30);
  }

  function persistAllData() {
    if (isCloudMode()) {
      // Cloud mode persists directly via Supabase APIs
      return;
    }
    try {
      localStorage.setItem(SESSION_KEY, state.currentUserEmail || "__LOGGED_OUT__");
      localStorage.setItem(LS_KEY, JSON.stringify(db));
    } catch (e) {
      try {
        const lightDb = JSON.parse(JSON.stringify(db));
        Object.values(lightDb.accounts || {}).forEach(acc => {
          Object.values(acc.questionsData || {}).forEach(qd => {
            (qd.attempts || []).forEach(att => {
              if (att.savedAudioFile) delete att.audioDataUrl;
            });
          });
        });
        localStorage.setItem(LS_KEY, JSON.stringify(lightDb));
      } catch (err) {}
    }

    saveToIndexedDB();
    syncAccountToServerDisk();
  }

  // ==========================================================================
  // HELPERS & ACCOUNT ACCESSORS
  // ==========================================================================
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDuration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function getNowTimestamp() {
    const d = new Date();
    const pad = n => (n < 10 ? "0" + n : "" + n);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function getInitials(name) {
    const parts = String(name || "HV")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "HV";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getCurrentAccount() {
    if (state.currentUserEmail && db.accounts[state.currentUserEmail]) {
      return db.accounts[state.currentUserEmail];
    }
    return null;
  }

  function getQuestionData(qId) {
    const acc = getCurrentAccount();
    if (!acc) return { ideaNote: "", selectedTakeId: null, submittedTakeId: null, attempts: [] };
    if (!acc.questionsData) acc.questionsData = {};
    if (!acc.questionsData[qId]) {
      acc.questionsData[qId] = {
        ideaNote: "",
        selectedTakeId: null,
        submittedTakeId: null,
        submittedAt: null,
        attempts: []
      };
    }
    return acc.questionsData[qId];
  }

  function getCurrentTopic() {
    return TOPICS.find(t => t.id === state.currentTopicId) || TOPICS[0];
  }

  function getCurrentQuestion() {
    const topic = getCurrentTopic();
    const idx = Math.max(0, Math.min(topic.questions.length - 1, state.currentQuestionIndex));
    state.currentQuestionIndex = idx;
    return topic.questions[idx];
  }

  // ==========================================================================
  // TEXT-TO-SPEECH (FOR VOCABULARY WORDS & MODEL ANSWERS)
  // ==========================================================================
  window.speakEnglishText = function (rawText) {
    const cleanText = String(rawText || "").replace(/<[^>]*>?/gm, "").trim();
    if (!cleanText) return;

    if (window.currentTtsAudio) {
      try {
        window.currentTtsAudio.pause();
      } catch (e) {}
    }

    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = "en-US";
        utter.rate = 0.92;
        window.speechSynthesis.speak(utter);
        return;
      } catch (e) {}
    }

    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en-US&client=tw-ob`;
      const audio = new Audio(url);
      window.currentTtsAudio = audio;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  // ==========================================================================
  // MULTI-TAKE AUDIO RECORDING + SPEECH-TO-TEXT + PERMANENT BASE64 ENCODING
  // ==========================================================================
  function blobToBase64(blob) {
    return new Promise(resolve => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result || null);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      } catch (e) {
        resolve(null);
      }
    });
  }

  function startRecording(qId) {
    if (state.isRecording) {
      stopRecording(qId);
      return;
    }

    state.isRecording = true;
    state.recordingSeconds = 0;
    state.liveTranscript = "";
    state.submitSuccessMsg = "";
    finalTranscriptBuffer = "";
    interimTranscriptBuffer = "";
    audioChunks = [];

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        speechRecognizer = new SpeechRec();
        speechRecognizer.lang = "en-US";
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;

        speechRecognizer.onresult = event => {
          interimTranscriptBuffer = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const piece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscriptBuffer += piece + " ";
            } else {
              interimTranscriptBuffer += piece;
            }
          }
          state.liveTranscript = (finalTranscriptBuffer + interimTranscriptBuffer).trim();
          const liveEl = document.getElementById("live-transcript-preview");
          if (liveEl) {
            liveEl.textContent =
              state.liveTranscript || "Đang lắng nghe giọng nói tiếng Anh của bạn...";
            liveEl.classList.toggle("placeholder", !state.liveTranscript);
          }
        };

        speechRecognizer.onerror = () => {};
        speechRecognizer.onend = () => {
          if (state.isRecording && speechRecognizer) {
            try {
              speechRecognizer.start();
            } catch (e) {}
          }
        };
        speechRecognizer.start();
      } catch (e) {
        speechRecognizer = null;
      }
    }

    if (recordingTimer) clearInterval(recordingTimer);
    recordingTimer = setInterval(() => {
      state.recordingSeconds++;
      const timerEl = document.getElementById("rec-timer-text");
      if (timerEl) {
        timerEl.textContent = `${formatDuration(state.recordingSeconds)} / 0:45`;
      }
      if (state.recordingSeconds >= 45) {
        stopRecording(qId);
      }
    }, 1000);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          if (!state.isRecording) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) audioChunks.push(e.data);
          };
          mediaRecorder.onstop = async () => {
            stream.getTracks().forEach(t => t.stop());
            const mimeType = mediaRecorder.mimeType || "audio/webm";
            const blob = new Blob(audioChunks, { type: mimeType });
            if (isCloudMode()) {
              const previewUrl = URL.createObjectURL(blob);
              finalizeNewTake(qId, previewUrl, blob);
            } else {
              const base64Url = await blobToBase64(blob);
              finalizeNewTake(qId, base64Url, blob);
            }
          };
          mediaRecorder.start();
          renderApp();
        })
        .catch(() => {
          mediaRecorder = null;
          renderApp();
        });
    } else {
      mediaRecorder = null;
      renderApp();
    }
  }

  function stopRecording(qId) {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
    state.isRecording = false;

    if (speechRecognizer) {
      try {
        speechRecognizer.onend = null;
        speechRecognizer.stop();
      } catch (e) {}
      speechRecognizer = null;
    }

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      try {
        mediaRecorder.stop();
        return;
      } catch (e) {}
    }

    finalizeNewTake(qId, null);
  }

  function finalizeNewTake(qId, audioUrl, rawBlob) {
    const dur = Math.max(1, state.recordingSeconds);
    const recognizedText = (state.liveTranscript || finalTranscriptBuffer || "").trim();
    const qData = getQuestionData(qId);
    const nextNum = qData.attempts.length + 1;
    const takeId = "take_" + Date.now() + "_" + nextNum;

    const newTake = {
      id: takeId,
      num: nextNum,
      createdAt: getNowTimestamp(),
      durationSec: dur,
      audioDataUrl: audioUrl,
      audioPath: "",
      transcript: recognizedText,
      teacherFeedback: "",
      teacherScore: ""
    };

    qData.attempts.push(newTake);
    qData.selectedTakeId = takeId;

    if (isCloudMode()) {
      renderApp();
      cloudCreateAttempt(qId, newTake, rawBlob || null);
    } else {
      persistAllData();
      renderApp();
    }
  }

  // ==========================================================================
  // VIEW 1: STUDENT ACCOUNT LOGIN / REGISTER (PRIVATE, NO OTHER ACCOUNTS SHOWN)
  // ==========================================================================
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

  function renderAuthView() {
    const isReg = state.authMode === "register";

    return `
      <div class="auth-wrapper">
        <div class="auth-card-box">
          <div style="margin-bottom:10px;">
            <span style="font-family:var(--font-mono);font-size:11.5px;font-weight:800;background:var(--accent-yellow);padding:3px 9px;border:1.5px solid #18181B;">
              SPEAKING PART 1 · TÀI KHOẢN HỌC VIÊN
            </span>
          </div>

          <h1 style="font-size:22px;font-weight:900;color:#18181B;margin-bottom:6px;">
            ${isReg ? "Tạo tài khoản học viên" : "Đăng nhập học tập"}
          </h1>
          <p style="font-size:13.5px;color:#52525B;line-height:1.5;margin-bottom:16px;">
            ${
              isReg
                ? "Đăng nhập nhanh bằng Google hoặc tạo tài khoản để lưu kho từ vựng của riêng bạn và nộp bài ghi âm."
                : "Đăng nhập bằng tài khoản Google hoặc email của bạn để tiếp tục học và xây dựng kho từ vựng cá nhân."
            }
          </p>

          <!-- GOOGLE SIGN-IN BUTTON -->
          <button type="button" class="google-auth-btn" id="btn-google-login" ${state.authLoading ? "disabled" : ""}>
            ${renderGoogleIconSvg(19)}
            <span>${state.authLoading ? "Đang kết nối tới Google..." : "Tiếp tục với Google"}</span>
          </button>

          <div class="auth-or-divider">
            <span>Hoặc dùng tài khoản Email</span>
          </div>

          <div class="auth-tabs-row">
            <button type="button" class="auth-tab ${!isReg ? "active" : ""}" id="btn-tab-login">Đăng nhập</button>
            <button type="button" class="auth-tab ${isReg ? "active" : ""}" id="btn-tab-register">Tạo tài khoản mới</button>
          </div>

          ${
            state.authError
              ? `<div style="padding:8px 12px;border:1.5px solid #DC2626;background:#FEF2F2;color:#B91C1C;font-size:12.5px;font-weight:700;margin-bottom:12px;">⚠️ ${escapeHtml(state.authError)}</div>`
              : ""
          }
          ${
            state.authInfo
              ? `<div style="padding:8px 12px;border:1.5px solid #16A34A;background:#F0FDF4;color:#166534;font-size:12.5px;font-weight:700;margin-bottom:12px;">✓ ${escapeHtml(state.authInfo)}</div>`
              : ""
          }

          <form id="auth-form" onsubmit="return false;">
            ${
              isReg
                ? `
              <div class="form-field">
                <label class="form-label" for="inp-auth-name">Họ và tên của bạn</label>
                <input type="text" id="inp-auth-name" class="form-input" placeholder="Ví dụ: Nguyễn Minh Tùng" required />
              </div>
            `
                : ""
            }

            <div class="form-field">
              <label class="form-label" for="inp-auth-email">Email hoặc Tên đăng nhập</label>
              <input type="text" id="inp-auth-email" class="form-input" placeholder="Nhập email hoặc tên đăng nhập..." required />
            </div>

            <div class="form-field">
              <label class="form-label" for="inp-auth-pass">Mật khẩu</label>
              <input type="password" id="inp-auth-pass" class="form-input" placeholder="Nhập mật khẩu..." required />
            </div>

            <button type="submit" class="form-submit-btn">
              ${isReg ? "Tạo tài khoản & Vào học →" : "Đăng nhập →"}
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 2: HOME VIEW — 4 STANDALONE TOPIC CARDS (STUDENT ONLY)
  // ==========================================================================
  function renderHomeView() {
    const acc = getCurrentAccount();
    if (!acc) return renderAuthView();

    const vocabCount = (acc.savedVocab || []).length;

    return `
      <div class="home-shell">
        <header class="home-topbar">
          <div class="home-brand-title" id="btn-home-title">SPEAKING PART 1</div>

          <div class="topbar-actions">
            ${
              state.isTeacher
                ? `<a href="./teacher.html" class="top-pill-btn" style="background:#DCFCE7;color:#166534;text-decoration:none;">👨‍🏫 Quản lý &amp; Xem bài học viên</a>`
                : ""
            }
            <button type="button" class="top-pill-btn yellow" id="btn-open-vocab-bank">
              <span>📚 Kho từ vựng của tôi (${vocabCount})</span>
            </button>

            <button type="button" class="user-account-pill" id="btn-logout-account" title="Đăng xuất tài khoản">
              <span class="user-initials">${escapeHtml(getInitials(acc.name))}</span>
              <span>${escapeHtml(acc.name)}</span>
              <span style="font-size:11px;color:#71717A;">· Đăng xuất</span>
            </button>
          </div>
        </header>

        <main class="home-container">
          <div class="home-header-block">
            <div>
              <div class="home-eyebrow">SPEAKING PART 1 · PRACTICE TOPICS</div>
              <h1 class="home-h1">DANH SÁCH ĐỀ LUYỆN SPEAKING PART 1</h1>
              <p class="home-desc">
                Chọn một thẻ chủ đề bên dưới để bắt đầu luyện nói. Bạn có thể ghi chú ý tưởng, ghi âm nhiều lần để chọn bản tốt nhất nộp bài, và lưu từ vựng vào kho từ vựng của riêng mình.
              </p>
            </div>
          </div>

          <div class="topics-grid">
            ${TOPICS.map(topic => {
              const submittedCount = topic.questions.filter(q => {
                const qd = acc.questionsData && acc.questionsData[q.id];
                return qd && qd.submittedTakeId;
              }).length;
              const isAllDone = submittedCount === topic.questions.length;

              return `
                <article class="topic-card" data-open-topic="${topic.id}">
                  <div class="topic-card-top">
                    <div class="topic-num-badge">${topic.number}</div>
                    <span class="topic-progress-tag ${isAllDone ? "done" : ""}">
                      ${isAllDone ? "Đã hoàn thành 3/3 câu ✓" : `Đã nộp ${submittedCount}/${topic.questions.length} câu`}
                    </span>
                  </div>

                  <h2 class="topic-card-title">${escapeHtml(topic.title)}</h2>
                  <div class="topic-card-vi">${escapeHtml(topic.titleVi)}</div>
                  <p class="topic-card-desc">${escapeHtml(topic.description)}</p>

                  <ul class="topic-questions-preview">
                    ${topic.questions
                      .map(
                        (q, idx) => `
                        <li>
                          <span class="preview-q-num">Q${idx + 1}.</span>
                          <span>${escapeHtml(q.prompt)}</span>
                        </li>
                      `
                      )
                      .join("")}
                  </ul>

                  <div class="topic-card-footer">
                    <span>${topic.questions.length} câu hỏi · Level B1 & B2</span>
                    <span>Vào luyện đề →</span>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </main>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 3: PRACTICE ROOM — 50/50 SPLIT-SCREEN (STUDENT ONLY)
  // ==========================================================================
  function renderPracticeView() {
    const acc = getCurrentAccount();
    if (!acc) return renderAuthView();

    const topic = getCurrentTopic();
    const question = getCurrentQuestion();
    const qId = question.id;
    const qIdx = state.currentQuestionIndex;
    const totalQ = topic.questions.length;
    const lvl = state.selectedLevel;
    const levelData = question.levels[lvl] || question.levels.b1;

    const qData = getQuestionData(qId);
    const attempts = qData.attempts || [];
    const selectedTakeId =
      qData.selectedTakeId || (attempts.length > 0 ? attempts[attempts.length - 1].id : null);
    const submittedTakeId = qData.submittedTakeId || null;
    const selectedTakeObj = attempts.find(a => a.id === selectedTakeId) || null;
    const submittedTakeObj = attempts.find(a => a.id === submittedTakeId) || null;

    const submittedInTopicCount = topic.questions.filter(q => {
      const qd = acc.questionsData && acc.questionsData[q.id];
      return qd && qd.submittedTakeId;
    }).length;

    const vocabCount = (acc.savedVocab || []).length;

    return `
      <div class="practice-shell">
        <!-- TOP HEADER -->
        <header class="practice-header">
          <div class="practice-header-left">
            <button type="button" class="back-topics-btn" id="btn-back-home">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <span>Danh sách chủ đề</span>
            </button>
            <h1 class="header-topic-name">${escapeHtml(topic.title)}</h1>
            <span class="header-part-badge">Speaking Part 1</span>
          </div>

          <div class="topbar-actions">
            ${
              state.isTeacher
                ? `<a href="./teacher.html" class="top-pill-btn" style="background:#DCFCE7;color:#166534;text-decoration:none;">👨‍🏫 Trang Giáo viên</a>`
                : ""
            }
            <button type="button" class="top-pill-btn yellow" id="btn-open-vocab-bank">
              <span>📚 Kho từ vựng của tôi (${vocabCount})</span>
            </button>

            <button type="button" class="user-account-pill" id="btn-logout-account" title="Đăng xuất tài khoản">
              <span class="user-initials">${escapeHtml(getInitials(acc.name))}</span>
              <span>${escapeHtml(acc.name)}</span>
            </button>
          </div>
        </header>

        <!-- MAIN 50/50 SPLIT WORKSPACE -->
        <main class="practice-workspace">
          <!-- LEFT PANE: QUESTION + IDEA NOTES + MULTI-TAKE RECORDER & SUBMIT -->
          <section class="left-pane" aria-label="Câu hỏi và ghi âm">
            <div class="left-pane-inner">
              <div class="question-step-tag">
                SPEAKING PART 1 · QUESTION ${qIdx + 1} OF ${totalQ}
              </div>

              <div class="question-topic-heading">${escapeHtml(topic.title)}</div>
              <p class="examiner-instruction">
                The examiner will ask you some questions about yourself and this topic. Answer each question in two or three sentences.
              </p>

              <!-- 1. QUESTION PROMPT CARD -->
              <div class="question-prompt-card">
                <p class="question-prompt-text">${escapeHtml(question.prompt)}</p>
              </div>

              <!-- 2. IDEA NOTES BOX ("GHI CHÚ Ý TƯỞNG CỦA HỌC VIÊN") -->
              <div class="idea-notes-card">
                <div class="idea-notes-header">
                  <label class="idea-notes-title" for="idea-note-input">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    <span>Ghi chú ý tưởng / Từ khóa trước khi nói</span>
                  </label>
                  <span class="idea-notes-saved-badge" id="idea-saved-indicator">
                    ${qData.ideaNote ? "✓ Đã lưu ghi chú" : "Tự động lưu"}
                  </span>
                </div>
                <textarea
                  id="idea-note-input"
                  class="idea-notes-textarea"
                  placeholder="Ghi nhanh các từ khóa hoặc ý tưởng của bạn trước khi bấm ghi âm..."
                >${escapeHtml(qData.ideaNote || "")}</textarea>
              </div>

              <!-- 3. MULTI-TAKE AUDIO RECORDER & SUBMISSION SELECTION CARD -->
              <div class="recorder-box-card">
                <div class="recorder-controls-row">
                  <button
                    type="button"
                    class="record-btn ${state.isRecording ? "recording" : ""}"
                    id="btn-record-toggle"
                  >
                    ${
                      state.isRecording
                        ? `
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                      <span>Dừng ghi âm</span>
                    `
                        : `
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                      <span>${
                        attempts.length > 0
                          ? `Ghi âm thêm lần mới (Lần #${attempts.length + 1})`
                          : "Bắt đầu ghi âm"
                      }</span>
                    `
                    }
                  </button>

                  ${
                    state.isRecording
                      ? `
                    <div class="rec-timer-badge">
                      <span class="rec-blink-dot"></span>
                      <span id="rec-timer-text">${formatDuration(state.recordingSeconds)} / 0:45</span>
                    </div>
                  `
                      : ""
                  }
                </div>

                <p class="recorder-helper-note">
                  Nói tối đa 0:45; bấm Dừng khi trả lời xong. Bạn có thể ghi âm nhiều lần và chọn bản ưng ý nhất để bấm <strong>Nộp bài</strong>.
                </p>

                <!-- LIVE TRANSCRIPT WHILE RECORDING -->
                ${
                  state.isRecording
                    ? `
                  <div class="takes-list-section">
                    <div class="transcript-result-box">
                      <div class="transcript-box-header">
                        <span class="transcript-box-label">Đang nhận diện giọng nói (Transcript)...</span>
                      </div>
                      <p id="live-transcript-preview" class="transcript-text-content ${state.liveTranscript ? "" : "placeholder"}">
                        ${escapeHtml(state.liveTranscript || "Đang lắng nghe giọng nói tiếng Anh của bạn...")}
                      </p>
                    </div>
                  </div>
                `
                    : ""
                }

                <!-- LIST OF RECORDED TAKES FOR THIS QUESTION -->
                ${
                  !state.isRecording && attempts.length > 0
                    ? `
                  <div class="takes-list-section">
                    <div class="takes-list-heading">
                      <span>Danh sách bản ghi âm của bạn (${attempts.length} lần ghi)</span>
                      <span style="font-size:11.5px;color:#52525B;font-weight:500;">Tích chọn 1 bản để nộp bài</span>
                    </div>

                    ${attempts
                      .map((att, idx) => {
                        const isSelected = att.id === selectedTakeId;
                        const isSubmitted = att.id === submittedTakeId;
                        return `
                          <div class="take-item-card ${isSelected ? "selected-take" : ""} ${isSubmitted ? "submitted-take" : ""}">
                            <div class="take-item-top">
                              <label class="take-select-label">
                                <input
                                  type="radio"
                                  name="select_take_${qId}"
                                  value="${att.id}"
                                  ${isSelected ? "checked" : ""}
                                  data-select-take="${att.id}"
                                />
                                <span>Bản ghi âm #${idx + 1} (${formatDuration(att.durationSec)})</span>
                                <span class="take-meta-time">· ${escapeHtml(att.createdAt || "")}</span>
                              </label>

                              <div style="display:flex;align-items:center;gap:6px;">
                                ${isSubmitted ? `<span class="submitted-badge">✓ Bản đã nộp</span>` : ""}
                                <button
                                  type="button"
                                  class="take-delete-btn"
                                  data-delete-take="${att.id}"
                                  title="Xóa bản ghi âm này"
                                >Xóa</button>
                              </div>
                            </div>

                            ${
                              att.audioDataUrl
                                ? `<audio controls src="${att.audioDataUrl}" class="student-audio-player"></audio>`
                                : att.savedAudioFile
                                  ? `<audio controls src="${att.savedAudioFile}" class="student-audio-player"></audio>`
                                  : ""
                            }

                            <div class="transcript-result-box">
                              <div class="transcript-box-header">
                                <span class="transcript-box-label">Transcript câu trả lời (Bản #${idx + 1})</span>
                              </div>
                              ${
                                att.transcript
                                  ? `<p class="transcript-text-content">“${escapeHtml(att.transcript)}”</p>`
                                  : `<p class="transcript-text-content placeholder">Chưa nhận diện được lời nói tiếng Anh trong lượt ghi âm này.</p>`
                              }
                            </div>

                            ${
                              att.teacherFeedback || att.teacherScore
                                ? `
                              <div style="margin-top:8px;padding:9px 12px;background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:6px;font-size:13px;color:#14532D;">
                                <div style="font-weight:800;margin-bottom:2px;">
                                  👨‍🏫 Nhận xét của Giáo viên ${att.teacherScore ? `· <span style="background:#16A34A;color:#FFF;padding:1px 7px;border-radius:4px;font-size:11.5px;">${escapeHtml(att.teacherScore)}</span>` : ""}
                                </div>
                                ${att.teacherFeedback ? `<div>${escapeHtml(att.teacherFeedback)}</div>` : ""}
                              </div>
                            `
                                : ""
                            }
                          </div>
                        `;
                      })
                      .join("")}

                    <!-- SUBMIT SELECTED RECORDING BUTTON BAR -->
                    <div class="submit-take-bar">
                      <div>
                        ${
                          submittedTakeObj
                            ? `<div class="submit-confirm-note">✓ Đã nộp bài: <strong>Bản ghi âm #${attempts.indexOf(submittedTakeObj) + 1}</strong> (Lúc ${escapeHtml(qData.submittedAt || "")})</div>`
                            : `<div style="font-size:12.5px;color:#52525B;">Đang chọn <strong>Bản ghi âm #${selectedTakeObj ? attempts.indexOf(selectedTakeObj) + 1 : 1}</strong> để nộp.</div>`
                        }
                        ${
                          state.cloudSyncStatus
                            ? `<div style="font-size:12px;color:#1D4ED8;font-weight:700;margin-top:2px;">${escapeHtml(state.cloudSyncStatus)}</div>`
                            : ""
                        }
                        ${
                          state.submitSuccessMsg
                            ? `<div style="font-size:12px;color:#15803D;font-weight:700;margin-top:2px;">${escapeHtml(state.submitSuccessMsg)}</div>`
                            : ""
                        }
                      </div>

                      <button
                        type="button"
                        class="submit-take-btn"
                        id="btn-submit-selected-take"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>
                          ${
                            submittedTakeId === selectedTakeId && submittedTakeId
                              ? `Đã nộp Bản ghi #${attempts.indexOf(selectedTakeObj) + 1}`
                              : `Nộp bài (Bản ghi âm #${selectedTakeObj ? attempts.indexOf(selectedTakeObj) + 1 : 1})`
                          }
                        </span>
                      </button>
                    </div>
                  </div>
                `
                    : ""
                }
              </div>

              <!-- INLINE STEPPER -->
              <div class="stepper-row">
                <button
                  type="button"
                  class="btn-prev-q"
                  id="btn-prev-q"
                  ${qIdx === 0 ? "disabled" : ""}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  <span>Câu trước</span>
                </button>

                <button
                  type="button"
                  class="btn-next-q"
                  id="btn-next-q"
                >
                  <span>${qIdx < totalQ - 1 ? "Câu tiếp" : "Về danh sách chủ đề"}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </section>

          <!-- RIGHT PANE: GỢI Ý DÀN BÀI (5 SECTIONS + CLICK-TO-HEAR VOCAB WITH IPA) -->
          <aside class="right-pane" aria-label="Gợi ý dàn bài">
            <div class="right-pane-inner">
              <div class="guide-top-bar">
                <div class="guide-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                  <span>Gợi ý dàn bài</span>
                </div>

                <div class="level-switch-group" role="group" aria-label="Chọn Level B1 hoặc B2">
                  <button
                    type="button"
                    class="level-switch-btn ${lvl === "b1" ? "active" : ""}"
                    data-level="b1"
                  >Level B1</button>
                  <button
                    type="button"
                    class="level-switch-btn ${lvl === "b2" ? "active" : ""}"
                    data-level="b2"
                  >Level B2</button>
                </div>
              </div>

              <!-- I. PHÂN TÍCH CÂU HỎI -->
              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">I. Phân tích câu hỏi</h2>
                </div>
                <ul class="guide-bullets">
                  <li><strong>Loại câu hỏi:</strong> ${escapeHtml(question.analysis.questionType)}</li>
                  <li><strong>Thì & Cấu trúc câu:</strong> ${escapeHtml(question.analysis.tense)}</li>
                  <li><strong>Độ dài:</strong> ${escapeHtml(question.analysis.length)}</li>
                </ul>
              </section>

              <!-- II. CÁCH TRẢ LỜI -->
              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">II. Cách trả lời</h2>
                </div>
                <ol class="guide-numbered">
                  ${levelData.strategy
                    .map(
                      item => `
                      <li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.text)}</li>
                    `
                    )
                    .join("")}
                </ol>
              </section>

              <!-- III. CÂU TRẢ LỜI MẪU -->
              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">III. Câu trả lời mẫu</h2>
                  <button
                    type="button"
                    class="listen-sample-btn"
                    id="btn-listen-sample"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <span>Nghe câu trả lời mẫu</span>
                  </button>
                </div>
                <blockquote class="sample-answer-blockquote">
                  “${levelData.modelAnswer}”
                </blockquote>
              </section>

              <!-- IV. LỖI CẦN TRÁNH -->
              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">IV. Lỗi cần tránh</h2>
                </div>
                <ol class="guide-numbered">
                  ${question.pitfalls.map(p => `<li>${escapeHtml(p)}</li>`).join("")}
                </ol>
              </section>

              <!-- V. TỪ VỰNG NÊN DÙNG (CÓ IPA + BẤM VÀO TỪ ĐỂ NGHE + LƯU VÀO KHO TỪ VỰNG) -->
              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">V. Từ vựng nên dùng</h2>
                  <span style="font-size:11.5px;color:#71717A;">Bấm vào từ để nghe phát âm · Bấm +Lưu từ vào kho</span>
                </div>
                <div class="vocab-table-wrap">
                  <table class="vocab-table">
                    <thead>
                      <tr>
                        <th>Từ / cụm từ</th>
                        <th>Loại từ</th>
                        <th>Nghĩa</th>
                        <th>Ví dụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${levelData.vocab
                        .map(row => {
                          const isSaved = (acc.savedVocab || []).some(
                            v => v.word.toLowerCase() === row.word.toLowerCase()
                          );
                          return `
                            <tr>
                              <td class="td-word">
                                <button
                                  type="button"
                                  class="vocab-word-click-btn"
                                  data-speak-word="${escapeHtml(row.word)}"
                                  title="Bấm để nghe phát âm: ${escapeHtml(row.word)}"
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                                  <span>${escapeHtml(row.word)}</span>
                                </button>
                                ${
                                  row.ipa
                                    ? `<span class="vocab-ipa-line" data-speak-word="${escapeHtml(row.word)}" title="Bấm để nghe phát âm">${escapeHtml(row.ipa)}</span>`
                                    : ""
                                }
                                <button
                                  type="button"
                                  class="vocab-save-mini-btn ${isSaved ? "saved" : ""}"
                                  data-toggle-save-vocab="${escapeHtml(row.word)}"
                                  data-vocab-ipa="${escapeHtml(row.ipa || "")}"
                                  data-vocab-pos="${escapeHtml(row.pos || "")}"
                                  data-vocab-meaning="${escapeHtml(row.meaning || "")}"
                                  data-vocab-example="${escapeHtml((row.example || "").replace(/<[^>]*>?/gm, ""))}"
                                  data-vocab-topic="${escapeHtml(topic.title)}"
                                >
                                  <span>${isSaved ? "✓ Đã lưu vào kho" : "+ Lưu vào kho từ"}</span>
                                </button>
                              </td>
                              <td class="td-pos">${escapeHtml(row.pos)}</td>
                              <td class="td-meaning">${escapeHtml(row.meaning)}</td>
                              <td class="td-example">${row.example}</td>
                            </tr>
                          `;
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </aside>
        </main>

        <!-- BOTTOM QUESTION NAVIGATION BAR -->
        <nav class="practice-bottom-nav" aria-label="Danh sách câu hỏi">
          <div class="bottom-q-pills">
            <span class="bottom-part-text">Part 1</span>
            ${topic.questions
              .map((qItem, idx) => {
                const isActive = idx === qIdx;
                const qd = acc.questionsData && acc.questionsData[qItem.id];
                const isSubmitted = !!(qd && qd.submittedTakeId);
                return `
                  <button
                    type="button"
                    class="q-pill-btn ${isActive ? "active" : ""} ${isSubmitted ? "done" : ""}"
                    data-jump-q="${idx}"
                    title="Câu ${idx + 1}${isSubmitted ? " (Đã nộp bài)" : ""}"
                  >${idx + 1}</button>
                `;
              })
              .join("")}
            <span class="bottom-q-counter">Đã nộp ${submittedInTopicCount}/${totalQ}</span>
          </div>
        </nav>
      </div>
    `;
  }

  // ==========================================================================
  // STUDENT VOCABULARY BANK MODAL ("KHO TỪ VỰNG CỦA TÔI")
  // ==========================================================================
  function renderModals() {
    let html = "";
    const acc = getCurrentAccount();

    if (state.googleModalOpen) {
      html += `
        <div class="modal-backdrop" id="google-modal-backdrop">
          <div class="google-modal-card" onclick="event.stopPropagation()">
            <div class="google-modal-header">
              ${renderGoogleIconSvg(34)}
              <h2 class="google-modal-title">Đăng nhập bằng Google</h2>
              <p class="google-modal-sub">Tiếp tục tới <strong>Luyện Speaking Part 1</strong></p>
            </div>

            ${
              state.googleModalError
                ? `<div style="padding:8px 12px;border:1px solid #DC2626;background:#FEF2F2;color:#B91C1C;border-radius:6px;font-size:12.5px;font-weight:600;margin-bottom:12px;">${escapeHtml(state.googleModalError)}</div>`
                : ""
            }

            <form id="google-signin-form" onsubmit="return false;">
              <div style="margin-bottom:14px;">
                <label style="display:block;font-size:12px;font-weight:600;color:#5F6368;margin-bottom:5px;" for="inp-google-email">
                  Email tài khoản Google (@gmail.com) *
                </label>
                <input
                  type="email"
                  id="inp-google-email"
                  class="google-input-field"
                  placeholder="vidu@gmail.com"
                  required
                />
              </div>

              <div style="margin-bottom:18px;">
                <label style="display:block;font-size:12px;font-weight:600;color:#5F6368;margin-bottom:5px;" for="inp-google-name">
                  Họ và tên hiển thị của bạn
                </label>
                <input
                  type="text"
                  id="inp-google-name"
                  class="google-input-field"
                  placeholder="Ví dụ: Nguyễn Minh Tùng"
                />
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:6px;">
                <button type="button" class="google-cancel-btn" id="btn-google-cancel">Hủy</button>
                <button type="submit" class="google-continue-btn">Tiếp tục →</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    if (state.vocabModalOpen && acc) {
      const allWords = acc.savedVocab || [];
      const q = state.vocabSearchQuery.trim().toLowerCase();
      const filtered = q
        ? allWords.filter(
            v =>
              v.word.toLowerCase().includes(q) ||
              (v.meaning && v.meaning.toLowerCase().includes(q)) ||
              (v.topic && v.topic.toLowerCase().includes(q))
          )
        : allWords;

      html += `
        <div class="modal-backdrop" id="vocab-modal-backdrop">
          <div class="modal-panel" onclick="event.stopPropagation()">
            <div class="modal-header" style="background:#FFFBEB;">
              <div>
                <h2 style="font-size:17px;font-weight:900;color:#18181B;">
                  📚 Kho từ vựng của tôi (${allWords.length} từ)
                </h2>
                <p style="font-size:12.5px;color:#52525B;margin-top:2px;">
                  Bấm vào bất kỳ từ vựng nào để nghe phát âm. Từ vựng được lưu riêng trong tài khoản của bạn qua từng chủ đề.
                </p>
              </div>
              <button type="button" class="close-modal-btn" id="btn-close-vocab-modal">✕</button>
            </div>

            <div class="modal-body">
              <form id="add-custom-vocab-form" onsubmit="return false;" style="background:#FAFAFA;border:1.5px solid #E4E4E7;border-radius:8px;padding:12px 14px;margin-bottom:16px;">
                <div style="font-size:12px;font-weight:800;color:#18181B;text-transform:uppercase;margin-bottom:8px;">
                  + Tự thêm từ vựng mới vào kho của bạn
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;">
                  <input type="text" id="custom-vocab-word" class="form-input" style="height:34px;font-size:13px;" placeholder="Từ / cụm từ (VD: itinerary)" required />
                  <input type="text" id="custom-vocab-ipa" class="form-input" style="height:34px;font-size:13px;" placeholder="IPA (VD: /aɪˈtɪnəreri/)" />
                  <input type="text" id="custom-vocab-pos" class="form-input" style="height:34px;font-size:13px;" placeholder="Loại từ (n., v., adj.)" />
                  <input type="text" id="custom-vocab-meaning" class="form-input" style="height:34px;font-size:13px;" placeholder="Nghĩa tiếng Việt *" required />
                </div>
                <div style="display:flex;gap:8px;margin-top:8px;">
                  <input type="text" id="custom-vocab-example" class="form-input" style="height:34px;font-size:13px;flex:1;" placeholder="Câu ví dụ (tùy chọn)..." />
                  <button type="submit" class="top-pill-btn dark" style="height:34px;">+ Lưu từ mới</button>
                </div>
              </form>

              <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <input
                  type="text"
                  id="vocab-search-input"
                  class="form-input"
                  style="height:36px;max-width:340px;font-size:13px;"
                  placeholder="Tìm từ vựng theo tiếng Anh, nghĩa hoặc chủ đề..."
                  value="${escapeHtml(state.vocabSearchQuery)}"
                />
                <span style="font-size:12px;color:#71717A;font-weight:600;">Hiển thị ${filtered.length}/${allWords.length} từ</span>
              </div>

              ${
                filtered.length === 0
                  ? `<p style="font-size:14px;color:#71717A;padding:20px 0;">Chưa có từ vựng nào khớp. Hãy bấm nút <strong>+ Lưu vào kho từ</strong> ở bảng Từ vựng nên dùng khi học từng đề!</p>`
                  : `
                  <div class="vocab-table-wrap">
                    <table class="vocab-table">
                      <thead>
                        <tr>
                          <th>Từ / cụm từ (Bấm để nghe)</th>
                          <th>Loại từ</th>
                          <th>Nghĩa</th>
                          <th>Ví dụ & Chủ đề</th>
                          <th style="width:50px;">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${filtered
                          .map(item => `
                            <tr>
                              <td class="td-word">
                                <button
                                  type="button"
                                  class="vocab-word-click-btn"
                                  data-speak-word="${escapeHtml(item.word)}"
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                                  <span>${escapeHtml(item.word)}</span>
                                </button>
                                ${
                                  item.ipa
                                    ? `<span class="vocab-ipa-line" data-speak-word="${escapeHtml(item.word)}">${escapeHtml(item.ipa)}</span>`
                                    : ""
                                }
                              </td>
                              <td class="td-pos">${escapeHtml(item.pos || "")}</td>
                              <td class="td-meaning"><strong>${escapeHtml(item.meaning || "")}</strong></td>
                              <td class="td-example">
                                <div>${escapeHtml(item.example || "")}</div>
                                ${
                                  item.topic
                                    ? `<span style="display:inline-block;margin-top:4px;font-size:11px;padding:1px 6px;background:#F4F4F5;border-radius:4px;color:#52525B;">Đề: ${escapeHtml(item.topic)}</span>`
                                    : ""
                                }
                              </td>
                              <td>
                                <button
                                  type="button"
                                  class="take-delete-btn"
                                  data-remove-saved-vocab="${escapeHtml(item.word)}"
                                >Xóa</button>
                              </td>
                            </tr>
                          `)
                          .join("")}
                      </tbody>
                    </table>
                  </div>
                `
              }
            </div>
          </div>
        </div>
      `;
    }

    return html;
  }

  // ==========================================================================
  // MAIN RENDER & EVENT BINDING
  // ==========================================================================
  function renderApp() {
    const root = document.getElementById("app");
    if (!root) return;

    const leftPane = document.querySelector(".left-pane");
    const rightPane = document.querySelector(".right-pane");
    const savedLeftScroll = leftPane ? leftPane.scrollTop : 0;
    const savedRightScroll = rightPane ? rightPane.scrollTop : 0;

    let mainHtml = "";
    if (state.view === "auth" || !getCurrentAccount()) {
      mainHtml = renderAuthView();
    } else if (state.view === "home") {
      mainHtml = renderHomeView();
    } else {
      mainHtml = renderPracticeView();
    }

    root.innerHTML = mainHtml + renderModals();

    const nextLeftPane = document.querySelector(".left-pane");
    const nextRightPane = document.querySelector(".right-pane");
    if (nextLeftPane) nextLeftPane.scrollTop = savedLeftScroll;
    if (nextRightPane) nextRightPane.scrollTop = savedRightScroll;

    bindEvents();
  }

  function openTopic(topicId) {
    if (state.isRecording) {
      stopRecording(getCurrentQuestion().id);
    }
    state.currentTopicId = topicId;
    state.currentQuestionIndex = 0;
    state.submitSuccessMsg = "";
    state.view = "practice";
    renderApp();
  }

  function switchQuestion(newIndex) {
    const topic = getCurrentTopic();
    if (newIndex < 0 || newIndex >= topic.questions.length) return;
    if (state.isRecording) {
      stopRecording(getCurrentQuestion().id);
    }
    state.currentQuestionIndex = newIndex;
    state.submitSuccessMsg = "";
    renderApp();
    const lp = document.querySelector(".left-pane");
    const rp = document.querySelector(".right-pane");
    if (lp) lp.scrollTop = 0;
    if (rp) rp.scrollTop = 0;
  }

  function bindEvents() {
    // 1. Auth View Events
    const btnTabLogin = document.getElementById("btn-tab-login");
    if (btnTabLogin) {
      btnTabLogin.onclick = () => {
        state.authMode = "login";
        state.authError = "";
        renderApp();
      };
    }
    const btnTabReg = document.getElementById("btn-tab-register");
    if (btnTabReg) {
      btnTabReg.onclick = () => {
        state.authMode = "register";
        state.authError = "";
        renderApp();
      };
    }

    // Google Sign-In Button & Modal Events
    const btnGoogleLogin = document.getElementById("btn-google-login");
    if (btnGoogleLogin) {
      btnGoogleLogin.onclick = () => {
        triggerGoogleLoginFlow();
      };
    }

    ["google-modal-backdrop", "btn-google-cancel"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.onclick = () => {
          state.googleModalOpen = false;
          state.googleModalError = "";
          renderApp();
        };
      }
    });

    const googleForm = document.getElementById("google-signin-form");
    if (googleForm) {
      googleForm.onsubmit = async e => {
        e.preventDefault();
        const emailEl = document.getElementById("inp-google-email");
        const nameEl = document.getElementById("inp-google-name");
        const gEmail = (emailEl ? emailEl.value : "").trim().toLowerCase();
        const gName = (nameEl ? nameEl.value : "").trim();
        if (!gEmail) {
          state.googleModalError = "Vui lòng nhập địa chỉ email Google của bạn.";
          renderApp();
          return;
        }
        await completeGoogleSignIn(gEmail, gName, "");
      };
    }

    const authForm = document.getElementById("auth-form");
    if (authForm) {
      authForm.onsubmit = async e => {
        e.preventDefault();
        const nameEl = document.getElementById("inp-auth-name");
        const emailEl = document.getElementById("inp-auth-email");
        const passEl = document.getElementById("inp-auth-pass");
        const name = (nameEl ? nameEl.value : "").trim();
        const email = (emailEl ? emailEl.value : "").trim().toLowerCase();
        const password = (passEl ? passEl.value : "").trim();

        if (!email || !password) {
          state.authError = "Vui lòng nhập đầy đủ Email và Mật khẩu.";
          state.authInfo = "";
          renderApp();
          return;
        }

        // === SUPABASE CLOUD AUTH MODE ===
        if (isCloudMode()) {
          const client = CLOUD.getClient();
          state.authLoading = true;
          state.authError = "";
          state.authInfo = "";
          renderApp();

          if (state.authMode === "register") {
            if (!name) {
              state.authLoading = false;
              state.authError = "Vui lòng nhập họ và tên của bạn.";
              renderApp();
              return;
            }
            if (password.length < 6) {
              state.authLoading = false;
              state.authError = "Mật khẩu cần tối thiểu 6 ký tự.";
              renderApp();
              return;
            }
            const { data, error } = await client.auth.signUp({
              email: email,
              password: password,
              options: {
                data: { full_name: name },
                emailRedirectTo: CLOUD.getRedirectUrl()
              }
            });
            state.authLoading = false;
            if (error) {
              state.authError = error.message || "Không thể tạo tài khoản. Vui lòng thử lại.";
              renderApp();
              return;
            }
            if (data && data.session && data.user) {
              await loadCloudStudentData(data.user);
            } else {
              state.authInfo =
                "Đăng ký thành công! Vui lòng mở hộp thư Email để xác nhận tài khoản, hoặc bấm 'Tiếp tục với Google' để vào học ngay.";
              state.authMode = "login";
              renderApp();
            }
          } else {
            const { data, error } = await client.auth.signInWithPassword({
              email: email,
              password: password
            });
            state.authLoading = false;
            if (error) {
              state.authError = "Email hoặc mật khẩu chưa đúng (hoặc tài khoản chưa xác nhận email).";
              renderApp();
              return;
            }
            if (data && data.user) {
              await loadCloudStudentData(data.user);
            }
          }
          return;
        }

        // === LOCAL FALLBACK MODE ===
        if (state.authMode === "register") {
          if (!name) {
            state.authError = "Vui lòng nhập họ và tên của bạn.";
            renderApp();
            return;
          }
          if (db.accounts[email]) {
            state.authError = "Tài khoản này đã tồn tại. Vui lòng chuyển sang tab Đăng nhập.";
            renderApp();
            return;
          }
          db.accounts[email] = {
            name: name,
            email: email,
            password: password,
            createdAt: getNowTimestamp(),
            savedVocab: JSON.parse(JSON.stringify(defaultVocabDeck)),
            questionsData: {}
          };
          state.currentUserEmail = email;
          state.authError = "";
          state.view = "home";
          persistAllData();
          renderApp();
        } else {
          // Check server disk first if available, else local db
          const srv = await verifyLoginOnServer(email, password);
          if (srv && srv.ok) {
            state.currentUserEmail = email;
            state.authError = "";
            state.view = "home";
            persistAllData();
            renderApp();
            return;
          }

          const acc = db.accounts[email];
          if (!acc) {
            state.authError =
              (srv && srv.error) ||
              "Chưa tìm thấy tài khoản này. Bạn hãy bấm sang tab 'Tạo tài khoản mới' nhé!";
            renderApp();
            return;
          }
          if (acc.password && acc.password !== password) {
            state.authError = "Mật khẩu chưa chính xác. Vui lòng thử lại.";
            renderApp();
            return;
          }
          state.currentUserEmail = email;
          state.authError = "";
          state.view = "home";
          persistAllData();
          renderApp();
        }
      };
    }

    // 2. Topbar Utility Actions
    const btnLogout = document.getElementById("btn-logout-account");
    if (btnLogout) {
      btnLogout.onclick = async () => {
        if (state.isRecording) stopRecording(getCurrentQuestion().id);
        if (isCloudMode()) {
          const client = CLOUD.getClient();
          try {
            await client.auth.signOut();
          } catch (e) {}
        }
        state.currentUserEmail = "";
        state.currentUserId = "";
        state.isTeacher = false;
        state.view = "auth";
        state.authMode = "login";
        state.authError = "";
        state.authInfo = "";
        try {
          localStorage.setItem(SESSION_KEY, "__LOGGED_OUT__");
        } catch (e) {}
        renderApp();
      };
    }

    const btnOpenVocab = document.getElementById("btn-open-vocab-bank");
    if (btnOpenVocab) {
      btnOpenVocab.onclick = () => {
        state.vocabModalOpen = true;
        renderApp();
      };
    }

    // 3. Home View Topic Cards
    document.querySelectorAll("[data-open-topic]").forEach(card => {
      card.onclick = () => {
        openTopic(card.getAttribute("data-open-topic"));
      };
    });

    const btnBackHome = document.getElementById("btn-back-home");
    if (btnBackHome) {
      btnBackHome.onclick = () => {
        if (state.isRecording) stopRecording(getCurrentQuestion().id);
        state.view = "home";
        renderApp();
      };
    }

    // 4. Practice View Events
    if (state.view === "practice") {
      const topic = getCurrentTopic();
      const question = getCurrentQuestion();
      const qData = getQuestionData(question.id);
      const levelData = question.levels[state.selectedLevel] || question.levels.b1;

      const ideaInput = document.getElementById("idea-note-input");
      if (ideaInput) {
        ideaInput.oninput = e => {
          qData.ideaNote = e.target.value;
          const badge = document.getElementById("idea-saved-indicator");
          if (badge) badge.textContent = isCloudMode() ? "☁️ Đang lưu..." : "✓ Đã lưu ghi chú";
          if (isCloudMode()) {
            if (noteSaveDebounceTimer) clearTimeout(noteSaveDebounceTimer);
            const qIdSnap = question.id;
            const valSnap = qData.ideaNote;
            noteSaveDebounceTimer = setTimeout(async () => {
              await cloudSaveIdeaNote(qIdSnap, valSnap);
              const b = document.getElementById("idea-saved-indicator");
              if (b) b.textContent = "✓ Đã lưu ghi chú";
            }, 600);
          } else {
            persistAllData();
          }
        };
      }

      const btnRec = document.getElementById("btn-record-toggle");
      if (btnRec) {
        btnRec.onclick = () => {
          startRecording(question.id);
        };
      }

      document.querySelectorAll("[data-select-take]").forEach(radio => {
        radio.onchange = () => {
          qData.selectedTakeId = radio.getAttribute("data-select-take");
          state.submitSuccessMsg = "";
          persistAllData();
          renderApp();
        };
      });

      document.querySelectorAll("[data-delete-take]").forEach(btn => {
        btn.onclick = async () => {
          const delId = btn.getAttribute("data-delete-take");
          const delObj = (qData.attempts || []).find(a => a.id === delId);
          qData.attempts = (qData.attempts || []).filter(a => a.id !== delId);
          if (qData.selectedTakeId === delId) {
            qData.selectedTakeId =
              qData.attempts.length > 0 ? qData.attempts[qData.attempts.length - 1].id : null;
          }
          if (qData.submittedTakeId === delId) {
            qData.submittedTakeId = null;
            qData.submittedAt = null;
          }
          if (isCloudMode()) {
            renderApp();
            await cloudDeleteAttempt(delObj);
          } else {
            persistAllData();
            renderApp();
          }
        };
      });

      const btnSubmitTake = document.getElementById("btn-submit-selected-take");
      if (btnSubmitTake) {
        btnSubmitTake.onclick = async () => {
          const attempts = qData.attempts || [];
          const chosenId =
            qData.selectedTakeId || (attempts.length > 0 ? attempts[attempts.length - 1].id : null);
          if (!chosenId) return;
          qData.selectedTakeId = chosenId;
          qData.submittedTakeId = chosenId;
          qData.submittedAt = getNowTimestamp();
          const chosenIdx = attempts.findIndex(a => a.id === chosenId) + 1;
          state.submitSuccessMsg = isCloudMode()
            ? `✓ Đã nộp Bản ghi âm #${chosenIdx} lên hệ thống cho Giáo viên!`
            : `✓ Đã nộp Bản ghi âm #${chosenIdx} thành công!`;
          if (isCloudMode()) {
            renderApp();
            await cloudSubmitAttempt(question.id, chosenId);
          } else {
            persistAllData();
            renderApp();
          }
        };
      }

      const btnPrevQ = document.getElementById("btn-prev-q");
      if (btnPrevQ) {
        btnPrevQ.onclick = () => {
          if (state.currentQuestionIndex > 0) {
            switchQuestion(state.currentQuestionIndex - 1);
          }
        };
      }

      const btnNextQ = document.getElementById("btn-next-q");
      if (btnNextQ) {
        btnNextQ.onclick = () => {
          if (state.currentQuestionIndex < topic.questions.length - 1) {
            switchQuestion(state.currentQuestionIndex + 1);
          } else {
            if (state.isRecording) stopRecording(question.id);
            state.view = "home";
            renderApp();
          }
        };
      }

      document.querySelectorAll("[data-jump-q]").forEach(btn => {
        btn.onclick = () => {
          switchQuestion(parseInt(btn.getAttribute("data-jump-q"), 10));
        };
      });

      document.querySelectorAll("[data-level]").forEach(btn => {
        btn.onclick = () => {
          state.selectedLevel = btn.getAttribute("data-level");
          renderApp();
        };
      });

      const btnListenSample = document.getElementById("btn-listen-sample");
      if (btnListenSample) {
        btnListenSample.onclick = () => {
          window.speakEnglishText(levelData.modelAnswer);
        };
      }
    }

    // 5. Click-to-Hear Vocabulary Words
    document.querySelectorAll("[data-speak-word]").forEach(el => {
      el.onclick = e => {
        e.stopPropagation();
        window.speakEnglishText(el.getAttribute("data-speak-word"));
      };
    });

    document.querySelectorAll("[data-toggle-save-vocab]").forEach(btn => {
      btn.onclick = async e => {
        e.stopPropagation();
        const acc = getCurrentAccount();
        if (!acc) return;
        acc.savedVocab = acc.savedVocab || [];
        const word = btn.getAttribute("data-toggle-save-vocab");
        const existingIdx = acc.savedVocab.findIndex(
          v => v.word.toLowerCase() === word.toLowerCase()
        );
        if (existingIdx >= 0) {
          acc.savedVocab.splice(existingIdx, 1);
          if (isCloudMode()) cloudRemoveVocab(word);
        } else {
          const newItem = {
            word: word,
            ipa: btn.getAttribute("data-vocab-ipa") || "",
            pos: btn.getAttribute("data-vocab-pos") || "",
            meaning: btn.getAttribute("data-vocab-meaning") || "",
            example: btn.getAttribute("data-vocab-example") || "",
            topic: btn.getAttribute("data-vocab-topic") || ""
          };
          acc.savedVocab.unshift(newItem);
          if (isCloudMode()) cloudAddVocab(newItem);
        }
        persistAllData();
        renderApp();
      };
    });

    // 6. Vocabulary Bank Modal Events
    ["vocab-modal-backdrop", "btn-close-vocab-modal"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.onclick = () => {
          state.vocabModalOpen = false;
          renderApp();
        };
      }
    });

    const vocabSearchInp = document.getElementById("vocab-search-input");
    if (vocabSearchInp) {
      vocabSearchInp.oninput = e => {
        state.vocabSearchQuery = e.target.value;
        const pos = e.target.selectionStart;
        renderApp();
        const nextInp = document.getElementById("vocab-search-input");
        if (nextInp) {
          nextInp.focus();
          nextInp.setSelectionRange(pos, pos);
        }
      };
    }

    const addCustomVocabForm = document.getElementById("add-custom-vocab-form");
    if (addCustomVocabForm) {
      addCustomVocabForm.onsubmit = e => {
        e.preventDefault();
        const acc = getCurrentAccount();
        if (!acc) return;
        const w = (document.getElementById("custom-vocab-word").value || "").trim();
        const ipa = (document.getElementById("custom-vocab-ipa").value || "").trim();
        const pos = (document.getElementById("custom-vocab-pos").value || "").trim();
        const meaning = (document.getElementById("custom-vocab-meaning").value || "").trim();
        const example = (document.getElementById("custom-vocab-example").value || "").trim();
        if (!w || !meaning) return;

        acc.savedVocab = acc.savedVocab || [];
        const newItem = {
          word: w,
          ipa: ipa || `/${w.toLowerCase()}/`,
          pos: pos || "vocab",
          meaning: meaning,
          example: example,
          topic: "Tự thêm"
        };
        acc.savedVocab = acc.savedVocab.filter(v => v.word.toLowerCase() !== w.toLowerCase());
        acc.savedVocab.unshift(newItem);
        if (isCloudMode()) cloudAddVocab(newItem);
        persistAllData();
        renderApp();
      };
    }

    document.querySelectorAll("[data-remove-saved-vocab]").forEach(btn => {
      btn.onclick = () => {
        const acc = getCurrentAccount();
        if (!acc || !acc.savedVocab) return;
        const word = btn.getAttribute("data-remove-saved-vocab");
        acc.savedVocab = acc.savedVocab.filter(
          v => v.word.toLowerCase() !== word.toLowerCase()
        );
        if (isCloudMode()) cloudRemoveVocab(word);
        persistAllData();
        renderApp();
      };
    });
  }

  window.addEventListener("DOMContentLoaded", async () => {
    if (isCloudMode()) {
      const client = CLOUD.getClient();
      state.view = "auth";
      renderApp();

      const { data } = await client.auth.getSession();
      if (data && data.session && data.session.user) {
        await loadCloudStudentData(data.session.user);
      } else {
        renderApp();
      }

      client.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session && session.user) {
          if (state.currentUserId !== session.user.id) {
            await loadCloudStudentData(session.user);
          }
        } else if (event === "SIGNED_OUT") {
          state.currentUserEmail = "";
          state.currentUserId = "";
          state.view = "auth";
          renderApp();
        }
      });
      return;
    }

    // Local fallback mode
    loadFromLocalStorage();
    await loadFromIndexedDB();
    renderApp();
  });
})();
