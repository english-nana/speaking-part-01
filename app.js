// ==========================================================================
// SPEAKING PART 1 — STUDENT APPLICATION ENGINE (SUPABASE CLOUD)
// ==========================================================================

(function () {
  const TOPICS = window.SPEAKING_TOPICS || [];
  const CLOUD = window.SpeakingCloud;
  const escapeHtml = CLOUD.escapeHtml;
  const formatDuration = CLOUD.formatDuration;

  let currentAccount = null;

  const state = {
    view: "auth", // "auth" | "home" | "practice"
    authMode: "login", // "login" | "register"
    authError: "",
    authInfo: "",
    authLoading: false,
    isTeacher: false,
    needsProfileSetup: false,
    profileFormName: "",
    profileFormClass: CLOUD.CLASS_LIST[0],
    profileFormError: "",
    profileSaving: false,
    regSelectedClass: CLOUD.CLASS_LIST[0],
    currentTopicId: TOPICS[0] ? TOPICS[0].id : "topic-travelling",
    currentQuestionIndex: 0,
    selectedLevel: "b1", // "b1" | "b2"
    isRecording: false,
    recordingSeconds: 0,
    liveTranscript: "",
    isSubmitting: false,
    submitErrorMsg: "",
    vocabModalOpen: false,
    vocabSearchQuery: ""
  };

  let mediaRecorder = null;
  let audioChunks = [];
  let recordingTimer = null;
  let speechRecognizer = null;
  let finalTranscriptBuffer = "";
  let noteSaveDebounceTimer = null;

  // ==========================================================================
  // SUPABASE CLOUD SYNC LAYER
  // ==========================================================================
  function getTopicIdForQuestion(qId) {
    const found = TOPICS.find(t => (t.questions || []).some(q => q.id === qId));
    return found ? found.id : state.currentTopicId || "topic-travelling";
  }

  function ensureQuestionData(questionsData, qId) {
    if (!questionsData[qId]) {
      questionsData[qId] = {
        ideaNote: "",
        selectedTakeId: null,
        submittedTakeId: null,
        submittedAt: null,
        attempts: []
      };
    }
    return questionsData[qId];
  }

  async function loadCloudStudentData(sessionUser) {
    const client = CLOUD.getClient();
    if (!client || !sessionUser) return;

    const uid = sessionUser.id;
    const email = String(sessionUser.email || "").trim().toLowerCase();
    const meta = sessionUser.user_metadata || {};
    const appMeta = sessionUser.app_metadata || {};
    const fallbackName =
      String(meta.full_name || meta.name || "").trim() ||
      email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    const avatarUrl = meta.avatar_url || meta.picture || "";
    const provider = appMeta.provider || "email";

    renderApp();

    const [profileRes, vocabRes, notesRes, attemptsRes, teacherRes] = await Promise.all([
      client.from("profiles").select("*").eq("id", uid).maybeSingle(),
      client.from("student_vocab").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      client.from("question_notes").select("*").eq("user_id", uid),
      client.from("speaking_attempts").select("*").eq("user_id", uid).order("created_at", { ascending: true }),
      client.rpc("is_teacher")
    ]);

    state.isTeacher = Boolean(teacherRes && !teacherRes.error && teacherRes.data === true);

    // Prefer existing full_name in profiles table so Google login metadata never overwrites student edits
    const rawStoredName =
      profileRes && profileRes.data && profileRes.data.full_name
        ? profileRes.data.full_name
        : fallbackName;
    const parsed = CLOUD.parseFullNameAndClass(rawStoredName);
    const metaClass = String(meta.class_name || "").trim().toUpperCase();
    const resolvedClass = parsed.className || (CLOUD.CLASS_LIST.includes(metaClass) ? metaClass : "");
    const resolvedName = parsed.fullName || fallbackName;
    const storedFullName = CLOUD.formatStoredFullName(resolvedName, resolvedClass);

    try {
      await client.from("profiles").upsert(
        {
          id: uid,
          email: email,
          full_name: storedFullName,
          avatar_url: avatarUrl,
          auth_provider: provider,
          last_active_at: new Date().toISOString()
        },
        { onConflict: "id" }
      );
    } catch (e) {}

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
        ensureQuestionData(questionsData, row.question_id).ideaNote = row.idea_note || "";
      });
    }

    const attemptRows = Array.isArray(attemptsRes.data) ? attemptsRes.data : [];
    const signedUrlMap = await CLOUD.getSignedAudioUrls(attemptRows.map(r => r.audio_path).filter(Boolean));

    attemptRows.forEach(row => {
      const qd = ensureQuestionData(questionsData, row.question_id);
      qd.attempts.push({
        id: row.id,
        num: row.take_number || qd.attempts.length + 1,
        createdAt: CLOUD.formatDateTime(row.created_at),
        durationSec: row.duration_sec || 0,
        audioDataUrl: row.audio_path && signedUrlMap[row.audio_path] ? signedUrlMap[row.audio_path] : null,
        audioPath: row.audio_path || "",
        transcript: row.transcript || "",
        teacherFeedback: row.teacher_feedback || "",
        teacherScore: row.teacher_score || ""
      });
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

    currentAccount = {
      id: uid,
      name: resolvedName,
      className: resolvedClass,
      email: email,
      savedVocab: savedVocab,
      questionsData: questionsData
    };

    state.needsProfileSetup = !resolvedClass;
    state.profileFormName = resolvedName;
    state.profileFormClass = resolvedClass || CLOUD.CLASS_LIST[0];
    state.profileFormError = "";
    state.authError = "";
    state.authInfo = "";
    state.authLoading = false;
    if (state.view === "auth") state.view = "home";
    renderApp();
  }

  async function cloudSaveIdeaNote(qId, noteText) {
    const client = CLOUD.getClient();
    if (!client || !currentAccount) return;
    try {
      await client.from("question_notes").upsert(
        {
          user_id: currentAccount.id,
          question_id: qId,
          idea_note: noteText,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id,question_id" }
      );
    } catch (e) {}
  }

  async function cloudAddVocab(item) {
    const client = CLOUD.getClient();
    if (!client || !currentAccount) return;
    try {
      await client.from("student_vocab").upsert(
        {
          user_id: currentAccount.id,
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
    const client = CLOUD.getClient();
    if (!client || !currentAccount) return;
    try {
      await client
        .from("student_vocab")
        .delete()
        .eq("user_id", currentAccount.id)
        .eq("word_lower", String(word || "").trim().toLowerCase());
    } catch (e) {}
  }

  async function cloudCreateAttempt(qId, takeObj, audioBlob) {
    const client = CLOUD.getClient();
    if (!client || !currentAccount) return;

    let audioPath = takeObj.audioPath || "";
    if (!audioPath && audioBlob && audioBlob.size > 0) {
      const upRes = await CLOUD.uploadRecording(currentAccount.id, qId, takeObj.id, audioBlob);
      if (upRes.error) {
        state.submitErrorMsg = "Chưa tải được file âm thanh: " + (upRes.error.message || "Lỗi quyền Storage");
        renderApp();
        return;
      }
      if (upRes.path) {
        audioPath = upRes.path;
        takeObj.audioPath = audioPath;
      }
    }

    const { error } = await client.from("speaking_attempts").upsert(
      {
        id: takeObj.id,
        user_id: currentAccount.id,
        topic_id: getTopicIdForQuestion(qId),
        question_id: qId,
        take_number: takeObj.num,
        duration_sec: takeObj.durationSec,
        transcript: takeObj.transcript || "",
        audio_path: audioPath,
        is_submitted: false
      },
      { onConflict: "id" }
    );

    if (error) {
      state.submitErrorMsg = "Lỗi lưu bản ghi vào cơ sở dữ liệu: " + error.message;
      renderApp();
      return;
    }

    await client
      .from("profiles")
      .update({ last_active_at: new Date().toISOString() })
      .eq("id", currentAccount.id);

    renderApp();
  }

  async function cloudDeleteAttempt(takeObj) {
    const client = CLOUD.getClient();
    if (!client || !currentAccount || !takeObj) return;
    try {
      await client.from("speaking_attempts").delete().eq("id", takeObj.id).eq("user_id", currentAccount.id);
      if (takeObj.audioPath) {
        await CLOUD.deleteRecording(takeObj.audioPath);
      }
    } catch (e) {}
  }

  async function cloudSubmitAttempt(qId, takeObj) {
    const client = CLOUD.getClient();
    if (!client || !currentAccount || !takeObj) {
      return { ok: false, error: "Chưa kết nối tới hệ thống." };
    }

    // Ensure audio file is uploaded before submitting if rawBlob is still in memory
    if (!takeObj.audioPath && takeObj.rawBlob && takeObj.rawBlob.size > 0) {
      const upRes = await CLOUD.uploadRecording(currentAccount.id, qId, takeObj.id, takeObj.rawBlob);
      if (upRes.error) {
        return { ok: false, error: "Lỗi tải file âm thanh: " + (upRes.error.message || "Không xác định") };
      }
      if (upRes.path) {
        takeObj.audioPath = upRes.path;
      }
    }

    const nowIso = new Date().toISOString();
    const { error: resetErr } = await client
      .from("speaking_attempts")
      .update({ is_submitted: false, submitted_at: null })
      .eq("user_id", currentAccount.id)
      .eq("question_id", qId);

    if (resetErr) {
      return { ok: false, error: resetErr.message };
    }

    const { error: upsertErr } = await client.from("speaking_attempts").upsert(
      {
        id: takeObj.id,
        user_id: currentAccount.id,
        topic_id: getTopicIdForQuestion(qId),
        question_id: qId,
        take_number: takeObj.num,
        duration_sec: takeObj.durationSec,
        transcript: takeObj.transcript || "",
        audio_path: takeObj.audioPath || "",
        is_submitted: true,
        submitted_at: nowIso
      },
      { onConflict: "id" }
    );

    if (upsertErr) {
      return { ok: false, error: upsertErr.message };
    }

    await client
      .from("profiles")
      .update({ last_active_at: nowIso })
      .eq("id", currentAccount.id);

    return { ok: true };
  }

  // ==========================================================================
  // HELPERS & STATE ACCESSORS
  // ==========================================================================
  function getInitials(name) {
    const parts = String(name || "HV")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (parts.length === 0) return "HV";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getQuestionData(qId) {
    if (!currentAccount) {
      return { ideaNote: "", selectedTakeId: null, submittedTakeId: null, attempts: [] };
    }
    if (!currentAccount.questionsData) currentAccount.questionsData = {};
    return ensureQuestionData(currentAccount.questionsData, qId);
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
  // TEXT-TO-SPEECH (VOCABULARY PRONUNCIATION & MODEL ANSWERS)
  // ==========================================================================
  function speakEnglishText(rawText) {
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
  }

  // ==========================================================================
  // MULTI-TAKE AUDIO RECORDING + LIVE SPEECH-TO-TEXT
  // ==========================================================================
  function startRecording(qId) {
    if (state.isRecording) {
      stopRecording(qId);
      return;
    }

    state.isRecording = true;
    state.recordingSeconds = 0;
    state.liveTranscript = "";
    state.submitErrorMsg = "";
    finalTranscriptBuffer = "";
    audioChunks = [];

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        speechRecognizer = new SpeechRec();
        speechRecognizer.lang = "en-US";
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;

        speechRecognizer.onresult = event => {
          let interim = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const piece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscriptBuffer += piece + " ";
            } else {
              interim += piece;
            }
          }
          state.liveTranscript = (finalTranscriptBuffer + interim).trim();
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
          mediaRecorder.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            const mimeType = mediaRecorder.mimeType || "audio/webm";
            const blob = new Blob(audioChunks, { type: mimeType });
            const previewUrl = URL.createObjectURL(blob);
            finalizeNewTake(qId, previewUrl, blob);
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

    finalizeNewTake(qId, null, null);
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
      createdAt: CLOUD.formatDateTime(new Date().toISOString()),
      durationSec: dur,
      audioDataUrl: audioUrl,
      audioPath: "",
      rawBlob: rawBlob || null,
      transcript: recognizedText,
      teacherFeedback: "",
      teacherScore: ""
    };

    qData.attempts.push(newTake);
    qData.selectedTakeId = takeId;

    renderApp();
    cloudCreateAttempt(qId, newTake, rawBlob || null);
  }

  // ==========================================================================
  // VIEW 1: STUDENT ACCOUNT LOGIN / REGISTER
  // ==========================================================================
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

          <button type="button" class="google-auth-btn" id="btn-google-login" ${state.authLoading ? "disabled" : ""}>
            ${CLOUD.renderGoogleIconSvg(19)}
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
                <label class="form-label" for="inp-auth-name">Họ và tên đầy đủ</label>
                <input type="text" id="inp-auth-name" class="form-input" placeholder="Ví dụ: Nguyễn Minh Tùng" required />
              </div>

              <div class="form-field">
                <label class="form-label">Chọn lớp học của bạn *</label>
                <div class="class-select-grid">
                  ${CLOUD.CLASS_LIST.map(
                    cls => `
                    <button
                      type="button"
                      class="class-option-btn ${state.regSelectedClass === cls ? "active" : ""}"
                      data-reg-class="${cls}"
                    >Lớp ${cls}</button>
                  `
                  ).join("")}
                </div>
              </div>
            `
                : ""
            }

            <div class="form-field">
              <label class="form-label" for="inp-auth-email">Email</label>
              <input type="email" id="inp-auth-email" class="form-input" placeholder="Nhập email của bạn..." required />
            </div>

            <div class="form-field">
              <label class="form-label" for="inp-auth-pass">Mật khẩu</label>
              <input type="password" id="inp-auth-pass" class="form-input" placeholder="Nhập mật khẩu..." required />
            </div>

            <button type="submit" class="form-submit-btn" ${state.authLoading ? "disabled" : ""}>
              ${isReg ? "Tạo tài khoản & Vào học →" : "Đăng nhập →"}
            </button>
          </form>
        </div>
      </div>
    `;
  }

  function renderProfileSetupView() {
    return `
      <div class="auth-wrapper">
        <div class="auth-card-box">
          <div style="margin-bottom:10px;">
            <span style="font-family:var(--font-mono);font-size:11.5px;font-weight:800;background:var(--accent-yellow);padding:3px 9px;border:1.5px solid #18181B;">
              THÔNG TIN HỌC VIÊN · BẮT BUỘC
            </span>
          </div>

          <h1 style="font-size:21px;font-weight:900;color:#18181B;margin-bottom:6px;">
            Hoàn tất thông tin học viên
          </h1>
          <p style="font-size:13.5px;color:#52525B;line-height:1.5;margin-bottom:16px;">
            Vui lòng nhập đầy đủ <strong>Họ và tên</strong> và chọn đúng <strong>Lớp</strong> của bạn để Giáo viên nhận diện và chấm bài ghi âm chính xác.
          </p>

          ${
            state.isTeacher
              ? `
            <div style="margin-bottom:14px;">
              <a href="./teacher.html" class="top-pill-btn teacher-nav-pill" style="width:100%;justify-content:center;height:38px;">
                👨‍🏫 Vào thẳng Trang Giáo viên →
              </a>
            </div>
          `
              : ""
          }

          ${
            state.profileFormError
              ? `<div style="padding:8px 12px;border:1.5px solid #DC2626;background:#FEF2F2;color:#B91C1C;font-size:12.5px;font-weight:700;margin-bottom:12px;">⚠️ ${escapeHtml(state.profileFormError)}</div>`
              : ""
          }

          <form id="profile-setup-form" onsubmit="return false;">
            <div class="form-field">
              <label class="form-label" for="inp-setup-fullname">Họ và tên đầy đủ *</label>
              <input
                type="text"
                id="inp-setup-fullname"
                class="form-input"
                placeholder="Ví dụ: Nguyễn Văn An"
                value="${escapeHtml(state.profileFormName)}"
                required
              />
            </div>

            <div class="form-field" style="margin-bottom:16px;">
              <label class="form-label">Chọn lớp của bạn *</label>
              <div class="class-select-grid">
                ${CLOUD.CLASS_LIST.map(
                  cls => `
                  <button
                    type="button"
                    class="class-option-btn ${state.profileFormClass === cls ? "active" : ""}"
                    data-setup-class="${cls}"
                  >Lớp ${cls}</button>
                `
                ).join("")}
              </div>
            </div>

            <button type="submit" class="form-submit-btn" ${state.profileSaving ? "disabled" : ""}>
              ${state.profileSaving ? "Đang lưu thông tin..." : "Lưu thông tin & Vào học →"}
            </button>

            <button
              type="button"
              id="btn-logout-account"
              style="width:100%;height:36px;margin-top:8px;border:none;background:transparent;color:#71717A;font-weight:600;font-size:12.5px;cursor:pointer;"
            >
              Đăng xuất tài khoản khác
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 2: HOME VIEW — 4 STANDALONE TOPIC CARDS
  // ==========================================================================
  function renderHomeView() {
    if (!currentAccount) return renderAuthView();

    const vocabCount = (currentAccount.savedVocab || []).length;

    return `
      <div class="home-shell">
        <header class="home-topbar">
          <div class="home-brand-title">SPEAKING PART 1</div>

          <div class="topbar-actions">
            ${
              state.isTeacher
                ? `<a href="./teacher.html" class="top-pill-btn teacher-nav-pill">👨‍🏫 Quản lý &amp; Xem bài học viên</a>`
                : ""
            }
            <button type="button" class="top-pill-btn yellow" id="btn-open-vocab-bank">
              <span>📚 Kho từ vựng của tôi (${vocabCount})</span>
            </button>

            <button type="button" class="user-account-pill" id="btn-logout-account" title="Đăng xuất tài khoản">
              <span class="user-initials">${escapeHtml(getInitials(currentAccount.name))}</span>
              <span>${escapeHtml(currentAccount.name)}</span>
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
                const qd = currentAccount.questionsData && currentAccount.questionsData[q.id];
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
  // VIEW 3: PRACTICE ROOM — 50/50 SPLIT-SCREEN
  // ==========================================================================
  function renderPracticeView() {
    if (!currentAccount) return renderAuthView();

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
      const qd = currentAccount.questionsData && currentAccount.questionsData[q.id];
      return qd && qd.submittedTakeId;
    }).length;

    const vocabCount = (currentAccount.savedVocab || []).length;

    return `
      <div class="practice-shell">
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
                ? `<a href="./teacher.html" class="top-pill-btn teacher-nav-pill">👨‍🏫 Trang Giáo viên</a>`
                : ""
            }
            <button type="button" class="top-pill-btn yellow" id="btn-open-vocab-bank">
              <span>📚 Kho từ vựng của tôi (${vocabCount})</span>
            </button>

            <button type="button" class="user-account-pill" id="btn-logout-account" title="Đăng xuất tài khoản">
              <span class="user-initials">${escapeHtml(getInitials(currentAccount.name))}</span>
              <span>${escapeHtml(currentAccount.name)}</span>
            </button>
          </div>
        </header>

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

              <div class="question-prompt-card">
                <p class="question-prompt-text">${escapeHtml(question.prompt)}</p>
              </div>

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

                            ${att.audioDataUrl ? `<audio controls src="${att.audioDataUrl}" class="student-audio-player"></audio>` : ""}

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
                              isSubmitted && window.SpeakingEvaluator
                                ? window.SpeakingEvaluator.renderFeedbackCardHtml(
                                    window.SpeakingEvaluator.evaluate(question, att),
                                    escapeHtml
                                  )
                                : ""
                            }

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

                    ${(() => {
                      const selectedTakeNum = selectedTakeObj
                        ? attempts.indexOf(selectedTakeObj) + 1
                        : 1;
                      const submittedTakeNum = submittedTakeObj
                        ? attempts.indexOf(submittedTakeObj) + 1
                        : 0;
                      const isCurrentTakeSubmitted = Boolean(
                        submittedTakeId && submittedTakeId === selectedTakeId
                      );
                      return `
                        <div class="submit-take-bar">
                          ${
                            state.submitErrorMsg
                              ? `<div style="font-size:12.5px;color:#B91C1C;font-weight:600;margin-right:auto;">⚠️ ${escapeHtml(state.submitErrorMsg)}</div>`
                              : ""
                          }

                          <button
                            type="button"
                            class="submit-take-btn ${isCurrentTakeSubmitted ? "is-submitted" : ""}"
                            id="btn-submit-selected-take"
                            ${isCurrentTakeSubmitted || state.isSubmitting ? "disabled" : ""}
                          >
                            ${
                              state.isSubmitting
                                ? `<span>⏳ Đang gửi bài nộp...</span>`
                                : isCurrentTakeSubmitted
                                  ? `<span>✓ Đã nộp Bản ghi âm #${submittedTakeNum}</span>`
                                  : `
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                <span>Bấm để nộp bài (Bản ghi âm #${selectedTakeNum}) →</span>
                              `
                            }
                          </button>
                        </div>
                      `;
                    })()}
                  </div>
                `
                    : ""
                }
              </div>

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
                  <button type="button" class="level-switch-btn ${lvl === "b1" ? "active" : ""}" data-level="b1">Level B1</button>
                  <button type="button" class="level-switch-btn ${lvl === "b2" ? "active" : ""}" data-level="b2">Level B2</button>
                </div>
              </div>

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

              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">II. Cách trả lời</h2>
                </div>
                <ol class="guide-numbered">
                  ${levelData.strategy
                    .map(item => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.text)}</li>`)
                    .join("")}
                </ol>
              </section>

              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">III. Câu trả lời mẫu</h2>
                  <button type="button" class="listen-sample-btn" id="btn-listen-sample">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <span>Nghe câu trả lời mẫu</span>
                  </button>
                </div>
                <blockquote class="sample-answer-blockquote">
                  “${levelData.modelAnswer}”
                </blockquote>
              </section>

              <section class="guide-section">
                <div class="guide-section-header">
                  <h2 class="guide-section-title">IV. Lỗi cần tránh</h2>
                </div>
                <ol class="guide-numbered">
                  ${question.pitfalls.map(p => `<li>${escapeHtml(p)}</li>`).join("")}
                </ol>
              </section>

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
                          const isSaved = (currentAccount.savedVocab || []).some(
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

        <nav class="practice-bottom-nav" aria-label="Danh sách câu hỏi">
          <div class="bottom-q-pills">
            <span class="bottom-part-text">Part 1</span>
            ${topic.questions
              .map((qItem, idx) => {
                const isActive = idx === qIdx;
                const qd = currentAccount.questionsData && currentAccount.questionsData[qItem.id];
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
    if (!state.vocabModalOpen || !currentAccount) return "";

    const allWords = currentAccount.savedVocab || [];
    const q = state.vocabSearchQuery.trim().toLowerCase();
    const filtered = q
      ? allWords.filter(
          v =>
            v.word.toLowerCase().includes(q) ||
            (v.meaning && v.meaning.toLowerCase().includes(q)) ||
            (v.topic && v.topic.toLowerCase().includes(q))
        )
      : allWords;

    return `
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
    if (state.view === "auth" || !currentAccount) {
      mainHtml = renderAuthView();
    } else if (state.needsProfileSetup) {
      mainHtml = renderProfileSetupView();
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
    if (state.isRecording) stopRecording(getCurrentQuestion().id);
    state.currentTopicId = topicId;
    state.currentQuestionIndex = 0;
    state.submitErrorMsg = "";
    state.view = "practice";
    renderApp();
  }

  function switchQuestion(newIndex) {
    const topic = getCurrentTopic();
    if (newIndex < 0 || newIndex >= topic.questions.length) return;
    if (state.isRecording) stopRecording(getCurrentQuestion().id);
    state.currentQuestionIndex = newIndex;
    state.submitErrorMsg = "";
    renderApp();
    const lp = document.querySelector(".left-pane");
    const rp = document.querySelector(".right-pane");
    if (lp) lp.scrollTop = 0;
    if (rp) rp.scrollTop = 0;
  }

  function bindEvents() {
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

    const btnGoogleLogin = document.getElementById("btn-google-login");
    if (btnGoogleLogin) {
      btnGoogleLogin.onclick = async () => {
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
      };
    }

    document.querySelectorAll("[data-reg-class]").forEach(btn => {
      btn.onclick = () => {
        state.regSelectedClass = btn.getAttribute("data-reg-class");
        document.querySelectorAll("[data-reg-class]").forEach(b => {
          b.classList.toggle("active", b === btn);
        });
      };
    });

    document.querySelectorAll("[data-setup-class]").forEach(btn => {
      btn.onclick = () => {
        state.profileFormClass = btn.getAttribute("data-setup-class");
        document.querySelectorAll("[data-setup-class]").forEach(b => {
          b.classList.toggle("active", b === btn);
        });
      };
    });

    const profileSetupForm = document.getElementById("profile-setup-form");
    if (profileSetupForm) {
      profileSetupForm.onsubmit = async e => {
        e.preventDefault();
        const client = CLOUD.getClient();
        if (!client || !currentAccount) return;

        const nameInp = document.getElementById("inp-setup-fullname");
        const cleanName = (nameInp ? nameInp.value : state.profileFormName).trim();
        const chosenClass = String(state.profileFormClass || "").trim().toUpperCase();

        state.profileFormName = cleanName;
        if (!cleanName) {
          state.profileFormError = "Vui lòng nhập đầy đủ họ và tên của bạn.";
          renderApp();
          return;
        }
        if (!CLOUD.CLASS_LIST.includes(chosenClass)) {
          state.profileFormError = "Vui lòng chọn lớp của bạn (ONB204 hoặc CB221).";
          renderApp();
          return;
        }

        const storedFullName = CLOUD.formatStoredFullName(cleanName, chosenClass);
        state.profileSaving = true;
        state.profileFormError = "";
        renderApp();

        const { error: profErr } = await client.from("profiles").upsert(
          {
            id: currentAccount.id,
            email: currentAccount.email,
            full_name: storedFullName,
            last_active_at: new Date().toISOString()
          },
          { onConflict: "id" }
        );

        state.profileSaving = false;
        if (profErr) {
          state.profileFormError = "Không lưu được thông tin: " + profErr.message;
          renderApp();
          return;
        }

        try {
          await client.auth.updateUser({
            data: { full_name: storedFullName, class_name: chosenClass }
          });
        } catch (err) {}

        currentAccount.name = cleanName;
        currentAccount.className = chosenClass;
        state.needsProfileSetup = false;
        if (state.view === "auth") state.view = "home";
        renderApp();
      };
    }

    const authForm = document.getElementById("auth-form");
    if (authForm) {
      authForm.onsubmit = async e => {
        e.preventDefault();
        const client = CLOUD.getClient();
        if (!client) {
          state.authError = "Chưa cấu hình kết nối Supabase.";
          renderApp();
          return;
        }
        const nameEl = document.getElementById("inp-auth-name");
        const emailEl = document.getElementById("inp-auth-email");
        const passEl = document.getElementById("inp-auth-pass");
        const name = (nameEl ? nameEl.value : "").trim();
        const email = (emailEl ? emailEl.value : "").trim().toLowerCase();
        const password = (passEl ? passEl.value : "").trim();
        const chosenClass = state.regSelectedClass || CLOUD.CLASS_LIST[0];

        if (!email || !password) {
          state.authError = "Vui lòng nhập đầy đủ Email và Mật khẩu.";
          state.authInfo = "";
          renderApp();
          return;
        }

        state.authLoading = true;
        state.authError = "";
        state.authInfo = "";
        renderApp();

        if (state.authMode === "register") {
          if (!name) {
            state.authLoading = false;
            state.authError = "Vui lòng nhập đầy đủ họ và tên của bạn.";
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
              data: {
                full_name: CLOUD.formatStoredFullName(name, chosenClass),
                class_name: chosenClass
              },
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
          const { data, error } = await client.auth.signInWithPassword({ email, password });
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
      };
    }

    const btnLogout = document.getElementById("btn-logout-account");
    if (btnLogout) {
      btnLogout.onclick = async () => {
        if (state.isRecording) stopRecording(getCurrentQuestion().id);
        const client = CLOUD.getClient();
        if (client) {
          try {
            await client.auth.signOut();
          } catch (e) {}
        }
        currentAccount = null;
        state.isTeacher = false;
        state.needsProfileSetup = false;
        state.view = "auth";
        state.authMode = "login";
        state.authError = "";
        state.authInfo = "";
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

    document.querySelectorAll("[data-open-topic]").forEach(card => {
      card.onclick = () => openTopic(card.getAttribute("data-open-topic"));
    });

    const btnBackHome = document.getElementById("btn-back-home");
    if (btnBackHome) {
      btnBackHome.onclick = () => {
        if (state.isRecording) stopRecording(getCurrentQuestion().id);
        state.view = "home";
        renderApp();
      };
    }

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
          if (badge) badge.textContent = "☁️ Đang lưu...";
          if (noteSaveDebounceTimer) clearTimeout(noteSaveDebounceTimer);
          const qIdSnap = question.id;
          const valSnap = qData.ideaNote;
          noteSaveDebounceTimer = setTimeout(async () => {
            await cloudSaveIdeaNote(qIdSnap, valSnap);
            const b = document.getElementById("idea-saved-indicator");
            if (b) b.textContent = "✓ Đã lưu ghi chú";
          }, 600);
        };
      }

      const btnRec = document.getElementById("btn-record-toggle");
      if (btnRec) {
        btnRec.onclick = () => startRecording(question.id);
      }

      document.querySelectorAll("[data-select-take]").forEach(radio => {
        radio.onchange = () => {
          qData.selectedTakeId = radio.getAttribute("data-select-take");
          state.submitErrorMsg = "";
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
          renderApp();
          await cloudDeleteAttempt(delObj);
        };
      });

      const btnSubmitTake = document.getElementById("btn-submit-selected-take");
      if (btnSubmitTake) {
        btnSubmitTake.onclick = async () => {
          const attempts = qData.attempts || [];
          const chosenId =
            qData.selectedTakeId || (attempts.length > 0 ? attempts[attempts.length - 1].id : null);
          const chosenObj = attempts.find(a => a.id === chosenId);
          if (!chosenObj || state.isSubmitting) return;

          state.isSubmitting = true;
          state.submitErrorMsg = "";
          renderApp();

          const res = await cloudSubmitAttempt(question.id, chosenObj);
          state.isSubmitting = false;

          if (!res.ok) {
            state.submitErrorMsg = "Không nộp được bài: " + (res.error || "Lỗi máy chủ");
            renderApp();
            return;
          }

          qData.selectedTakeId = chosenObj.id;
          qData.submittedTakeId = chosenObj.id;
          qData.submittedAt = CLOUD.formatDateTime(new Date().toISOString());
          renderApp();
        };
      }

      const btnPrevQ = document.getElementById("btn-prev-q");
      if (btnPrevQ) {
        btnPrevQ.onclick = () => {
          if (state.currentQuestionIndex > 0) switchQuestion(state.currentQuestionIndex - 1);
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
        btn.onclick = () => switchQuestion(parseInt(btn.getAttribute("data-jump-q"), 10));
      });

      document.querySelectorAll("[data-level]").forEach(btn => {
        btn.onclick = () => {
          state.selectedLevel = btn.getAttribute("data-level");
          renderApp();
        };
      });

      const btnListenSample = document.getElementById("btn-listen-sample");
      if (btnListenSample) {
        btnListenSample.onclick = () => speakEnglishText(levelData.modelAnswer);
      }
    }

    document.querySelectorAll("[data-speak-word]").forEach(el => {
      el.onclick = e => {
        e.stopPropagation();
        speakEnglishText(el.getAttribute("data-speak-word"));
      };
    });

    document.querySelectorAll("[data-toggle-save-vocab]").forEach(btn => {
      btn.onclick = e => {
        e.stopPropagation();
        if (!currentAccount) return;
        currentAccount.savedVocab = currentAccount.savedVocab || [];
        const word = btn.getAttribute("data-toggle-save-vocab");
        const existingIdx = currentAccount.savedVocab.findIndex(
          v => v.word.toLowerCase() === word.toLowerCase()
        );
        if (existingIdx >= 0) {
          currentAccount.savedVocab.splice(existingIdx, 1);
          cloudRemoveVocab(word);
        } else {
          const newItem = {
            word: word,
            ipa: btn.getAttribute("data-vocab-ipa") || "",
            pos: btn.getAttribute("data-vocab-pos") || "",
            meaning: btn.getAttribute("data-vocab-meaning") || "",
            example: btn.getAttribute("data-vocab-example") || "",
            topic: btn.getAttribute("data-vocab-topic") || ""
          };
          currentAccount.savedVocab.unshift(newItem);
          cloudAddVocab(newItem);
        }
        renderApp();
      };
    });

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
        if (!currentAccount) return;
        const w = (document.getElementById("custom-vocab-word").value || "").trim();
        const ipa = (document.getElementById("custom-vocab-ipa").value || "").trim();
        const pos = (document.getElementById("custom-vocab-pos").value || "").trim();
        const meaning = (document.getElementById("custom-vocab-meaning").value || "").trim();
        const example = (document.getElementById("custom-vocab-example").value || "").trim();
        if (!w || !meaning) return;

        currentAccount.savedVocab = currentAccount.savedVocab || [];
        const newItem = {
          word: w,
          ipa: ipa || `/${w.toLowerCase()}/`,
          pos: pos || "vocab",
          meaning: meaning,
          example: example,
          topic: "Tự thêm"
        };
        currentAccount.savedVocab = currentAccount.savedVocab.filter(
          v => v.word.toLowerCase() !== w.toLowerCase()
        );
        currentAccount.savedVocab.unshift(newItem);
        cloudAddVocab(newItem);
        renderApp();
      };
    }

    document.querySelectorAll("[data-remove-saved-vocab]").forEach(btn => {
      btn.onclick = () => {
        if (!currentAccount || !currentAccount.savedVocab) return;
        const word = btn.getAttribute("data-remove-saved-vocab");
        currentAccount.savedVocab = currentAccount.savedVocab.filter(
          v => v.word.toLowerCase() !== word.toLowerCase()
        );
        cloudRemoveVocab(word);
        renderApp();
      };
    });
  }

  window.addEventListener("DOMContentLoaded", async () => {
    const client = CLOUD.getClient();
    if (!client) {
      state.authError = "Chưa cấu hình kết nối Supabase.";
      renderApp();
      return;
    }

    renderApp();
    const { data } = await client.auth.getSession();
    if (data && data.session && data.session.user) {
      await loadCloudStudentData(data.session.user);
    }

    client.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session && session.user) {
        if (!currentAccount || currentAccount.id !== session.user.id) {
          await loadCloudStudentData(session.user);
        }
      } else if (event === "SIGNED_OUT") {
        currentAccount = null;
        state.isTeacher = false;
        state.needsProfileSetup = false;
        state.view = "auth";
        renderApp();
      }
    });
  });
})();
