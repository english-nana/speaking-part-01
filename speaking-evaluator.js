// ============================================================================
// SPEAKING PART 1 — AUTO ERROR CORRECTION & VSTEP REFERENCE SCORING (THANG 10)
// - 4.0 - 5.5: Đạt mức B1
// - 6.0 - 8.5: Đạt mức B2
// - < 4.0    : Chưa đạt B1
// ============================================================================

(function () {
  const STOP_WORDS = new Set([
    "do", "you", "your", "the", "a", "an", "is", "are", "was", "were", "am", "be",
    "in", "on", "at", "to", "for", "of", "with", "about", "from", "by", "what",
    "which", "where", "when", "how", "many", "there", "this", "that", "these",
    "those", "it", "they", "we", "i", "me", "my", "our", "or", "and", "prefer",
    "like", "usually", "most", "any", "have", "has", "would", "can", "could", "will"
  ]);

  const TOPIC_DOMAIN_WORDS = [
    "travel", "traveling", "travelling", "trip", "trips", "journey", "vacation", "holiday",
    "friend", "friends", "family", "alone", "solo", "group", "prepare", "pack", "packing",
    "clothes", "passport", "ticket", "tickets", "money", "cash", "card", "hotel", "booking",
    "book", "resort", "plan", "plans", "planning", "visit", "explore", "place", "places",
    "destination", "beach", "mountain", "mountains", "city", "country", "hometown", "sea",
    "season", "seasons", "spring", "summer", "autumn", "fall", "winter", "rainy", "dry",
    "weather", "climate", "temperature", "cool", "warm", "hot", "cold", "sunny", "windy",
    "food", "photos", "pictures", "memories", "relax", "relaxing", "experience", "budget",
    "affordable", "itinerary", "luggage", "suitcase", "camera", "charger", "flight", "bus",
    "train", "festival", "scenery", "sightseeing", "memorable", "unforgettable", "north",
    "south", "region", "countryside", "nature", "air", "fresh", "sunscreen", "medicine"
  ];

  const COMPOUND_MARKERS = ["and", "but", "so", "or"];
  const COMPLEX_MARKERS = [
    "because", "since", "although", "though", "even though", "while", "when",
    "whenever", "if", "unless", "so that", "before", "after", "until", "as soon as", "in case"
  ];
  const RELATIVE_MARKERS = ["which", "who", "where"];
  const B2_DISCOURSE_MARKERS = [
    "honestly", "personally", "actually", "moreover", "furthermore",
    "in addition", "especially", "particularly", "for example", "for instance",
    "on the other hand", "as a result", "therefore", "overall", "definitely",
    "first of all", "secondly", "however", "in particular"
  ];
  const B2_LEXIS_PHRASES = [
    "memorable", "unforgettable", "affordable", "convenient", "flexible", "destination",
    "destinations", "atmosphere", "breathtaking", "refreshing", "recharge", "unwind",
    "cuisine", "itinerary", "accommodation", "essential items", "essentials",
    "companionship", "bond", "crowded", "humid", "chilly", "enjoyable", "relaxation",
    "spectacular", "unexpected", "in advance", "get away from", "pace of life",
    "close friends", "save a lot of money", "detailed plan", "as soon as", "fresh sea air",
    "require much preparation", "ideal place", "depends on", "clear my mind",
    "outdoor activities", "sudden showers", "inconvenient", "heavy luggage",
    "hang out with", "cool and pleasant", "pleasant", "important projects", "short weekend trips",
    "peaceful town", "pack suitable clothes", "meaningful",
    "in case", "although", "whereas", "instead of"
  ];

  function tokenize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9'\s-]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  function hasWholeWordOrPhrase(textLower, phrase) {
    const clean = String(phrase || "")
      .replace(/<[^>]*>?/gm, "")
      .replace(/\(.*?\)/g, "")
      .replace(/\.\.\./g, "")
      .trim()
      .toLowerCase();
    if (!clean || clean.length < 2) return false;
    const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try {
      return new RegExp(`\\b${escaped}\\b`, "i").test(textLower);
    } catch (e) {
      return false;
    }
  }

  function collectQuestionKeywords(question) {
    const words = new Set();
    if (!question) return words;

    tokenize(question.prompt || "").forEach(w => {
      if (!STOP_WORDS.has(w) && w.length >= 3) words.add(w);
    });

    ["b1", "b2"].forEach(lvl => {
      const vocab = question.levels && question.levels[lvl] && question.levels[lvl].vocab;
      (vocab || []).forEach(v => {
        tokenize(v.word || "").forEach(w => {
          if (!STOP_WORDS.has(w) && w.length >= 3) words.add(w);
        });
      });
      const sample = question.levels && question.levels[lvl] && question.levels[lvl].modelAnswer;
      tokenize(String(sample || "").replace(/<[^>]*>?/gm, " ")).forEach(w => {
        if (!STOP_WORDS.has(w) && w.length >= 4) words.add(w);
      });
    });

    return words;
  }

  function detectMainErrors(transcript, question) {
    const raw = String(transcript || "").trim();
    const lower = raw.toLowerCase();
    const issues = [];
    const seenKeys = new Set();

    function addIssue(key, wrong, fix, reason) {
      if (seenKeys.has(key) || issues.length >= 3) return;
      seenKeys.add(key);
      issues.push({ wrong, fix, reason });
    }

    // 1. Lỗi mạo từ "a" trước danh từ số nhiều "photos" / nghe nhầm "take me a nice photos"
    const photoMatch = raw.match(/\b(take\s+(?:me\s+)?a(?:\s+\w+)?\s+photos?)\b/i);
    if (photoMatch) {
      const hasMe = /\bme\b/i.test(photoMatch[1]);
      addIssue(
        "take_photos_a",
        photoMatch[1],
        hasMe ? "take many nice photos" : "take a lot of nice photos / take nice photos",
        'Không dùng mạo từ "a" trước danh từ số nhiều "photos"; hãy phát âm rõ "many" hoặc "a lot of".'
      );
    }

    // 2. Lỗi nhận diện phát âm từ quen thuộc trong chủ đề Travel
    if (/\blocal\s+foot\b/i.test(lower)) {
      addIssue("local_foot", "local foot", "local food", 'Phát âm rõ âm cuối /d/ của từ "food" (/fuːd/) để tránh nhầm thành "foot".');
    }
    if (/\bshare\s+the\s+cause\b/i.test(lower)) {
      addIssue("share_cause", "share the cause", "share the cost", 'Chú ý phân biệt âm cuối /st/ của từ "cost" (/kɔːst/).');
    }
    if (/\bpack\s+(?:my\s+)?close\b/i.test(lower)) {
      addIssue("pack_close", "pack close", "pack clothes", 'Danh từ "quần áo" là "clothes" (/kloʊðz/), không phải "close".');
    }

    // 3. Lỗi "a / an" đi với danh từ số nhiều hoặc không đếm được
    const aPluralRegex = /\b(an?\s+(?:[a-z]+\s+)?(friends|photos|pictures|places|clothes|things|trips|seasons|hotels|memories|dishes|plans|tickets|bags|items|mountains|beaches|luggage|baggage|information|advice|equipment|weather|money|food|scenery|accommodation|music|time))\b/gi;
    let m;
    while ((m = aPluralRegex.exec(raw)) !== null) {
      if (!seenKeys.has("take_photos_a") || !/photos?/i.test(m[1])) {
        const noun = m[2].toLowerCase();
        const phraseNoArticle = m[1].replace(/^an?\s+/i, "");
        addIssue(
          "a_plural_" + noun,
          m[1],
          `${phraseNoArticle} / some ${phraseNoArticle}`,
          `Không dùng "a/an" trước danh từ số nhiều hoặc không đếm được ("${noun}").`
        );
      }
    }

    // 4. Lỗi chia động từ sau prefer / enjoy / avoid / suggest
    const gerundMatch = raw.match(/\b(prefer|enjoy|avoid|finish|suggest|mind)\s+(travel|go|visit|stay|eat|try|take|explore|pack|swim|camp|walk|fly)\b/i);
    if (gerundMatch) {
      const verbMap = {
        travel: "traveling", go: "going", visit: "visiting", stay: "staying",
        eat: "eating", try: "trying", take: "taking", explore: "exploring",
        pack: "packing", swim: "swimming", camp: "camping", walk: "walking", fly: "flying"
      };
      const fixedV = verbMap[gerundMatch[2].toLowerCase()] || gerundMatch[2] + "ing";
      addIssue(
        "gerund_after_" + gerundMatch[1].toLowerCase(),
        gerundMatch[0],
        `${gerundMatch[1]} ${fixedV}`,
        `Sau động từ "${gerundMatch[1].toLowerCase()}" cần dùng danh động từ (V-ing) thay vì động từ nguyên mẫu.`
      );
    }

    // 5. Lỗi thừa to be trước động từ thường ("I am like / I am prefer / I am go")
    const extraBeMatch = raw.match(/\b(i\s+am|we\s+are|they\s+are|he\s+is|she\s+is)\s+(usually\s+|often\s+|always\s+)?(like|prefer|love|enjoy|want|need|go|travel|prepare|visit|stay|live)\b/i);
    if (extraBeMatch) {
      const fixedSubj = extraBeMatch[1].replace(/\s+(am|is|are)$/i, "");
      const adv = extraBeMatch[2] ? extraBeMatch[2].trim() + " " : "";
      addIssue(
        "extra_be",
        extraBeMatch[0],
        `${fixedSubj} ${adv}${extraBeMatch[3].toLowerCase()}`,
        'Không dùng "am/is/are" trước động từ thường ở thì Hiện tại đơn.'
      );
    }

    // 6. Lỗi thiếu động từ to be trước tính từ ("it very fun", ngoại trừ cụm "make/keep/find it very + adj")
    const missingBeRegex = /\b(it|this|that|they|we|weather|summer|winter|spring|autumn|traveling|trip)\s+(very|really|so|quite|too)\s+(fun|safe|good|nice|great|hot|cold|cool|warm|cheap|expensive|interesting|convenient|comfortable|beautiful|relaxing|important|necessary|amazing)\b/gi;
    let bm;
    while ((bm = missingBeRegex.exec(raw)) !== null) {
      const beforeChunk = raw.slice(Math.max(0, bm.index - 18), bm.index).toLowerCase();
      if (/\b(make|makes|made|keep|keeps|kept|find|found|feel|feels|consider|call)\s+$/.test(beforeChunk)) {
        continue;
      }
      const subj = bm[1].toLowerCase();
      const beWord = subj === "they" || subj === "we" ? "are" : "is";
      addIssue(
        "missing_be",
        bm[0],
        `${bm[1]} ${beWord} ${bm[2]} ${bm[3]}`,
        `Thiếu động từ to be ("${beWord}") đứng trước tính từ "${bm[3]}".`
      );
      break;
    }

    // 7. Lỗi giới từ thường gặp ("go to travel", "go to home", "by foot", "in the beach")
    const prepErr = raw.match(/\b(go|going|went)\s+to\s+(travel|traveling|travelling|camping|swimming|shopping|sightseeing|home|abroad)\b/i);
    if (prepErr) {
      addIssue(
        "go_to_err",
        prepErr[0],
        `${prepErr[1]} ${prepErr[2].toLowerCase()}`,
        `Không dùng giới từ "to" trong cụm "${prepErr[1].toLowerCase()} ${prepErr[2].toLowerCase()}".`
      );
    }
    if (/\bby\s+foot\b/i.test(lower)) {
      addIssue("by_foot", "by foot", "on foot", 'Đi bộ phải dùng cụm cố định "on foot" (không dùng "by foot").');
    }
    if (/\bin\s+the\s+beach\b/i.test(lower)) {
      addIssue("in_beach", "in the beach", "on the beach / at the beach", 'Với bãi biển hãy dùng "on the beach" hoặc "at the beach".');
    }

    // 8. Lỗi many / several + danh từ đếm được số ít
    const manySingMatch = raw.match(/\b(many|several|two|three|four|five)\s+(friend|photo|picture|place|hotel|trip|season|thing|day|city|country|month)\b/i);
    if (manySingMatch) {
      const nounLow = manySingMatch[2].toLowerCase();
      const pluralNoun = nounLow === "city" ? "cities" : nounLow === "country" ? "countries" : nounLow + "s";
      addIssue(
        "many_singular",
        manySingMatch[0],
        `${manySingMatch[1]} ${pluralNoun}`,
        `Sau "${manySingMatch[1].toLowerCase()}" cần chia danh từ ở dạng số nhiều ("${pluralNoun}").`
      );
    }

    // 9. Lỗi chia động từ ngôi thứ 3 số ít ("it help", "it make", "which help")
    const thirdSgMatch = raw.match(/\b(it|this|that|which)\s+(help|make|give|bring|take|need|cost|have)\b/i);
    if (thirdSgMatch) {
      const vLow = thirdSgMatch[2].toLowerCase();
      const fixed3 = vLow === "have" ? "has" : vLow + "s";
      addIssue(
        "third_sg",
        thirdSgMatch[0],
        `${thirdSgMatch[1]} ${fixed3}`,
        `Chủ ngữ số ít "${thirdSgMatch[1]}" cần thêm "-s" vào động từ ("${fixed3}").`
      );
    }

    // 10. Lỗi "because of + mệnh đề"
    const becClause = raw.match(/\bbecause\s+of\s+(i|we|they|it|you)\s+(can|like|love|have|want|need|is|are|am)\b/i);
    if (becClause) {
      addIssue(
        "because_of_clause",
        becClause[0],
        `because ${becClause[1]} ${becClause[2]}`,
        '"because of" chỉ đi với danh từ/V-ing; trước một mệnh đề đầy đủ (S + V) dùng "because".'
      );
    }

    // 11. Kiểm tra thì theo câu hỏi kế hoạch / dự định tương lai (plans_q1, plans_q2, trips_q2)
    const isFuturePrompt =
      question &&
      (question.id === "plans_q1" ||
        question.id === "plans_q2" ||
        question.id === "trips_q2" ||
        /would like|next trip|next month|plans/i.test(question.prompt || ""));
    if (
      isFuturePrompt &&
      raw.split(/\s+/).length >= 12 &&
      !/\b(plan|plans|planning|going to|will|would like|would love|'d like|'d love|love to|want to|hope to|wish to|intend|thinking of|next)\b/i.test(lower)
    ) {
      addIssue(
        "future_tense_miss",
        "dùng toàn thì Hiện tại đơn",
        "I plan to... / I am going to... / I would like to...",
        "Câu hỏi hỏi về kế hoạch/dự định sắp tới — nên mở đầu bằng mẫu câu dự định tương lai để đúng yêu cầu đề."
      );
    }

    // 12. Lỗi lặp cấu trúc đơn quá nhiều trong bài nói ("we can" >= 4 lần)
    const weCanCount = (lower.match(/\bwe can\b/g) || []).length;
    const iCanCount = (lower.match(/\bi can\b/g) || []).length;
    if ((weCanCount >= 4 || iCanCount >= 4) && issues.length < 3) {
      const repeated = weCanCount >= 4 ? "we can" : "I can";
      addIssue(
        "repetitive_can",
        `Lặp cụm "${repeated}" quá nhiều (${Math.max(weCanCount, iCanCount)} lần)`,
        'Thay bớt bằng "Also, ...", "Moreover, ...", hoặc ", which helps us..."',
        "Đa dạng hóa từ nối và cấu trúc câu giúp bài nói tự nhiên hơn và nâng điểm từ B1 lên B2."
      );
    }

    return issues;
  }

  function roundHalfStep(score) {
    return Math.round(score * 2) / 2;
  }

  function evaluate(question, takeObj) {
    const transcript = String((takeObj && takeObj.transcript) || "").trim();
    const durationSec = Math.max(0, Number((takeObj && takeObj.durationSec) || 0));
    const tokens = tokenize(transcript);
    const wordCount = tokens.length;

    if (!transcript || wordCount < 4) {
      return {
        hasTranscript: false,
        score: null,
        levelLabel: "Chưa đủ dữ liệu chấm tự động",
        badgeTone: "neutral",
        wordCount,
        durationSec,
        summary:
          "Trình duyệt chưa thu được lời nói tiếng Anh rõ ràng thành văn bản cho bản ghi âm này nên hệ thống chưa thể chấm điểm tự động. Giáo viên vẫn có thể nghe trực tiếp file ghi âm của bạn để chấm.",
        goodPoints: [],
        errors: [],
        tip: "Khi ghi âm trên Chrome/Edge, hãy bật quyền micro, nói rõ tiếng Anh gần micro hơn trong khoảng 20–35 giây."
      };
    }

    const lower = transcript.toLowerCase();
    const promptTokens = new Set(tokenize((question && question.prompt) || ""));
    const questionKeywords = collectQuestionKeywords(question);
    const matchedDomainCount = tokens.filter(w => TOPIC_DOMAIN_WORDS.includes(w) || questionKeywords.has(w)).length;
    const uniqueDomainWords = Array.from(
      new Set(tokens.filter(w => TOPIC_DOMAIN_WORDS.includes(w) || questionKeywords.has(w)))
    );

    const b1SampleHits = [];
    const b1VocabSet = new Set();
    if (question && question.levels && question.levels.b1 && question.levels.b1.vocab) {
      question.levels.b1.vocab.forEach(v => {
        const cleanW = String(v.word || "").replace(/<[^>]*>?/gm, "").trim();
        if (cleanW) b1VocabSet.add(cleanW.toLowerCase());
        if (hasWholeWordOrPhrase(lower, cleanW)) b1SampleHits.push(cleanW);
      });
    }

    const b2SampleHits = [];
    if (question && question.levels && question.levels.b2 && question.levels.b2.vocab) {
      question.levels.b2.vocab.forEach(v => {
        const cleanW = String(v.word || "").replace(/<[^>]*>?/gm, "").trim();
        // Chỉ tính là từ vựng B2 nếu không nằm trong danh sách từ vựng B1 của câu này
        if (!b1VocabSet.has(cleanW.toLowerCase()) && hasWholeWordOrPhrase(lower, cleanW)) {
          b2SampleHits.push(cleanW);
        }
      });
    }

    // Từ/cụm từ vựng mức B2 ngoài câu hỏi
    const b2LexisHits = B2_LEXIS_PHRASES.filter(
      p => !promptTokens.has(p) && !b1VocabSet.has(p) && hasWholeWordOrPhrase(lower, p)
    );
    const allB2Lexis = Array.from(new Set([...b2SampleHits, ...b2LexisHits]));

    const usedDiscourse = B2_DISCOURSE_MARKERS.filter(m => hasWholeWordOrPhrase(lower, m));
    const usedComplex = COMPLEX_MARKERS.filter(m => hasWholeWordOrPhrase(lower, m));
    const usedRelative = RELATIVE_MARKERS.filter(m => hasWholeWordOrPhrase(lower, m));
    const usedCompound = COMPOUND_MARKERS.filter(m => hasWholeWordOrPhrase(lower, m));

    const errors = detectMainErrors(transcript, question);

    // ------------------------------------------------------------------
    // CHẤM ĐIỂM THANG 10 CHUẨN VSTEP SPEAKING PART 1
    // (4.0 - 5.5: B1 | 6.0 - 8.5: B2 | < 4.0: Chưa đạt B1)
    // ------------------------------------------------------------------
    // 1. Task Development & Length (0 - 2.3 pts)
    let devPts = 0.6;
    if (wordCount >= 60) devPts = 2.3;
    else if (wordCount >= 48) devPts = 1.95;
    else if (wordCount >= 34) devPts = 1.6;
    else if (wordCount >= 22) devPts = 1.35;
    else if (wordCount >= 14) devPts = 1.05;

    // 2. Vocabulary & Topic Lexical Resource (0 - 2.5 pts)
    let vocabPts = 0.7 + Math.min(0.45, uniqueDomainWords.length * 0.08);
    if (b1SampleHits.length > 0) vocabPts += Math.min(0.3, b1SampleHits.length * 0.1);
    vocabPts += Math.min(1.05, allB2Lexis.length * 0.28);
    vocabPts = Math.min(2.5, vocabPts);

    // 3. Grammar Range & Accuracy (0 - 2.5 pts)
    let gramPts = 1.05;
    if (usedCompound.length > 0) gramPts += 0.2;
    if (usedComplex.length > 0) gramPts += 0.3;
    if (usedRelative.length > 0) gramPts += 0.45;
    if (usedDiscourse.length >= 1) gramPts += 0.25;
    if (usedDiscourse.length >= 2) gramPts += 0.15;
    gramPts -= Math.min(1.0, errors.length * 0.35);
    gramPts = Math.max(0.4, Math.min(2.5, gramPts));

    // 4. Fluency & Delivery Pacing (0 - 1.2 pts)
    let fluPts = 0.6;
    if (durationSec >= 24 && wordCount >= 44) fluPts = 1.0;
    else if (durationSec >= 15 && wordCount >= 25) fluPts = 0.85;
    else if (wordCount < 14) fluPts = 0.35;
    if (usedDiscourse.length >= 1 && wordCount >= 45) fluPts = Math.min(1.2, fluPts + 0.15);

    let rawScore = devPts + vocabPts + gramPts + fluPts;

    // Phân định rạch ròi B1 (4.0-5.5) vs B2 (6.0-8.5) theo chuẩn chấm VSTEP thật:
    // B2 đòi hỏi đồng thời: triển khai đủ dài (>= 35 từ) + từ vựng mức B2 + ngữ pháp/từ nối B2
    const hasB2Lexis = allB2Lexis.length >= 3 || (allB2Lexis.length >= 2 && (usedRelative.length > 0 || usedDiscourse.length > 0));
    const hasB2Grammar = usedRelative.length > 0 || usedDiscourse.length > 0;

    if (matchedDomainCount === 0 && b1SampleHits.length === 0 && allB2Lexis.length === 0) {
      rawScore = Math.min(rawScore, 3.0);
    } else if (wordCount < 12) {
      rawScore = Math.min(rawScore, 3.5);
    } else if (wordCount < 22) {
      rawScore = Math.min(rawScore, 4.5);
    } else if (!hasB2Lexis || wordCount < 35 || (errors.length >= 2 && !hasB2Grammar)) {
      // Thuộc khung B1 (tối đa 5.5) nếu từ vựng chưa đạt mức B2 hoặc bài chưa phát triển đủ ý B2
      rawScore = Math.min(rawScore, 5.5);
    } else {
      // Đủ điều kiện từ vựng & phát triển ý để bước vào khung B2 (tối thiểu 6.0 nếu ít lỗi)
      if (errors.length === 0) {
        rawScore = Math.max(rawScore, hasB2Grammar ? 6.5 : 6.0);
      } else {
        rawScore = Math.min(rawScore, 6.5);
      }
      if (wordCount < 60 && allB2Lexis.length < 4) {
        rawScore = Math.min(rawScore, 7.5);
      }
    }

    let finalScore = roundHalfStep(Math.max(1.5, Math.min(8.5, rawScore)));

    let levelLabel = "Chưa đạt B1";
    let badgeTone = "below";
    if (finalScore >= 6.0) {
      levelLabel = "Đạt mức B2";
      badgeTone = "b2";
    } else if (finalScore >= 4.0) {
      levelLabel = "Đạt mức B1";
      badgeTone = "b1";
    }

    const goodPoints = [];
    if (matchedDomainCount > 0) {
      goodPoints.push(`Trả lời đúng trọng tâm câu hỏi (${wordCount} từ${durationSec ? ` trong ${durationSec} giây` : ""}).`);
    }
    const usedVocabDisplay = Array.from(new Set([...b2SampleHits, ...allB2Lexis, ...b1SampleHits])).slice(0, 5);
    if (usedVocabDisplay.length > 0) {
      goodPoints.push(`Dùng được từ/cụm từ vựng chủ đề tốt: ${usedVocabDisplay.join(", ")}.`);
    }
    if (usedComplex.length > 0 || usedRelative.length > 0) {
      const structures = [...usedComplex, ...usedRelative].slice(0, 3).join(", ");
      goodPoints.push(`Biết mở rộng câu bằng từ nối phức/mệnh đề quan hệ (${structures}).`);
    }

    let summary = "";
    if (badgeTone === "b2") {
      summary = `Bài nói trôi chảy (${wordCount} từ), triển khai ý đầy đủ và có sử dụng từ vựng/cấu trúc mức B2.`;
    } else if (badgeTone === "b1") {
      summary = `Bài nói trả lời đúng trọng tâm câu hỏi ở mức B1 (${wordCount} từ), truyền đạt được ý chính cho người nghe.`;
    } else if (matchedDomainCount === 0) {
      summary = "Nội dung câu trả lời hiện chưa bám sát từ khóa trọng tâm của câu hỏi đề bài.";
    } else {
      summary = `Câu trả lời còn khá ngắn (${wordCount} từ), cần bổ sung thêm 1–2 câu giải thích lý do hoặc ví dụ thực tế để đạt mức B1.`;
    }

    let tip = "";
    if (badgeTone === "below") {
      tip = "Gợi ý nâng điểm: Hãy nói ít nhất 2–3 câu hoàn chỉnh (~25–40 từ): Câu 1 trả lời thẳng + Câu 2 nêu lý do (because...) + Câu 3 thêm ví dụ ngắn.";
    } else if (badgeTone === "b1") {
      tip = "Để vươn lên mức B2 (6.0+): Hãy thêm 1 từ nối chuyển ý (Moreover / Especially), 1 mệnh đề quan hệ (, which helps me...) và thay các từ đơn giản bằng từ vựng B2 ở bảng Mục V.";
    } else if (errors.length > 0) {
      tip = "Bạn đã đạt khung B2; hãy sửa gọn các lỗi nhỏ ở trên để câu nói mượt và chắc chắn điểm 7.0–7.5+ hơn nữa.";
    } else {
      tip = "Bài nói mạch lạc, tự nhiên và ít lỗi. Hãy tiếp tục duy trì tốc độ nói ổn định và ngữ điệu nhấn trọng âm từ khóa.";
    }

    return {
      hasTranscript: true,
      score: finalScore,
      scoreText: finalScore.toFixed(1),
      levelLabel,
      badgeTone,
      wordCount,
      durationSec,
      summary,
      goodPoints,
      errors,
      tip
    };
  }

  function renderFeedbackCardHtml(res, escFn) {
    if (!res) return "";
    const esc = escFn || (s => String(s || ""));
    const scorePill =
      res.hasTranscript && res.score !== null
        ? `<span class="ai-eval-score-pill tone-${esc(res.badgeTone)}">${esc(res.scoreText)} / 10 · ${esc(res.levelLabel)}</span>`
        : `<span class="ai-eval-score-pill tone-neutral">${esc(res.levelLabel)}</span>`;

    return `
      <div class="ai-eval-card">
        <div class="ai-eval-header">
          <div class="ai-eval-title-wrap">
            <span class="ai-eval-title">🎯 Đánh giá &amp; Sửa lỗi bài nói (Thang điểm VSTEP 10)</span>
            <span class="ai-eval-band-note">Thang tham khảo: 4.0–5.5 Đạt B1 · 6.0–8.5 Đạt B2</span>
          </div>
          ${scorePill}
        </div>

        <p class="ai-eval-summary">${esc(res.summary)}</p>

        ${
          res.goodPoints && res.goodPoints.length > 0
            ? `
          <ul class="ai-eval-good-list">
            ${res.goodPoints.map(pt => `<li>✓ ${esc(pt)}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          res.errors && res.errors.length > 0
            ? `
          <div class="ai-eval-errors-wrap">
            <div class="ai-eval-section-heading">Các lỗi chính cần sửa (${res.errors.length} lỗi):</div>
            <div class="ai-eval-errors-list">
              ${res.errors
                .map(
                  err => `
                <div class="ai-eval-error-item">
                  <div class="ai-eval-fix-line">
                    <span class="ai-err-wrong">❌ “${esc(err.wrong)}”</span>
                    <span style="color:#71717A;font-weight:700;">→</span>
                    <span class="ai-err-fix">✅ “${esc(err.fix)}”</span>
                  </div>
                  <div class="ai-err-reason">${esc(err.reason)}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : res.hasTranscript
              ? `<div style="font-size:12.5px;font-weight:700;color:#15803D;margin-top:6px;">✓ Không phát hiện lỗi ngữ pháp/cấu trúc câu nghiêm trọng trong transcript.</div>`
              : ""
        }

        ${res.tip ? `<div class="ai-eval-tip">💡 ${esc(res.tip)}</div>` : ""}
      </div>
    `;
  }

  window.SpeakingEvaluator = {
    evaluate,
    renderFeedbackCardHtml
  };
})();
