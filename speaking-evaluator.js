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
    "south", "region", "countryside", "nature", "air", "fresh", "sunscreen", "medicine",
    "mood", "affect", "affects", "daily", "activity", "activities", "rain", "rains", "noon", "evening", "outdoors"
  ];

  const COMPOUND_MARKERS = ["and", "but", "so", "or"];
  const COMPLEX_MARKERS = [
    "because", "since", "although", "though", "even though", "while", "when",
    "whenever", "if", "unless", "so that", "before", "after", "until", "as soon as", "in case"
  ];
  const RELATIVE_MARKERS = ["which", "who", "where"];
  const B2_DISCOURSE_MARKERS = [
    "honestly", "personally", "actually", "moreover", "furthermore",
    "in addition", "especially", "particularly", "for instance",
    "on the other hand", "as a result", "therefore", "overall", "definitely",
    "first of all", "secondly", "however", "in particular",
    "to be honest", "i'd say", "i would say", "well", "what's more",
    "on top of that", "that said", "i'm planning to",
    "i usually go for", "my go-to", "i tend to", "yes, i really do"
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
    "in case", "although", "whereas", "instead of",
    "go-to", "usually go for", "go for", "tend to", "peace of mind",
    "feel at ease", "at ease", "cheer me up", "cheers me up",
    "calm and recharged", "a little reward", "seafood"
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

  const VERB_ING_MAP = {
    travel: "traveling",
    traveling: "traveling",
    travelling: "travelling",
    go: "going",
    going: "going",
    visit: "visiting",
    visiting: "visiting",
    stay: "staying",
    staying: "staying",
    eat: "eating",
    eating: "eating",
    try: "trying",
    trying: "trying",
    take: "taking",
    taking: "taking",
    explore: "exploring",
    exploring: "exploring",
    pack: "packing",
    packing: "packing",
    swim: "swimming",
    swimming: "swimming",
    camp: "camping",
    camping: "camping",
    walk: "walking",
    walking: "walking",
    fly: "flying",
    flying: "flying",
    talk: "talking",
    talking: "talking",
    share: "sharing",
    sharing: "sharing",
    spend: "spending",
    spending: "spending",
    plan: "planning",
    planning: "planning",
    book: "booking",
    booking: "booking",
    wait: "waiting",
    waiting: "waiting",
    cook: "cooking",
    cooking: "cooking",
    shop: "shopping",
    shopping: "shopping",
    prepare: "preparing",
    preparing: "preparing",
    relax: "relaxing",
    relaxing: "relaxing",
    leave: "leaving",
    leaving: "leaving"
  };

  const ING_TO_BASE_MAP = {
    traveling: "travel",
    travelling: "travel",
    going: "go",
    visiting: "visit",
    staying: "stay",
    eating: "eat",
    trying: "try",
    taking: "take",
    exploring: "explore",
    packing: "pack",
    swimming: "swim",
    camping: "camp",
    walking: "walk",
    flying: "fly",
    talking: "talk",
    sharing: "share",
    spending: "spend",
    saving: "save",
    booking: "book",
    preparing: "prepare",
    affecting: "affect",
    studying: "study",
    relaxing: "relax"
  };

  function toIng(word) {
    const low = String(word || "").toLowerCase();
    return VERB_ING_MAP[low] || (low.endsWith("e") ? low.slice(0, -1) + "ing" : low + "ing");
  }

  function toThirdSg(verb) {
    const vLow = String(verb || "").toLowerCase();
    if (vLow === "have") return "has";
    if (vLow === "go") return "goes";
    if (vLow === "do") return "does";
    if (/(?:s|sh|ch|x|z|o)$/.test(vLow)) return vLow + "es";
    return vLow + "s";
  }

  function detectMainErrors(transcript, question) {
    const raw = String(transcript || "").trim();
    const lower = raw.toLowerCase();
    const issues = [];
    const seenKeys = new Set();

    const promptText = (question && question.prompt) || "";
    const isPastPrompt = Boolean(
      question &&
        (question.id === "trips_q1" ||
          question.id === "trips_q3" ||
          /\blast\s+trip|\blast\s+vacation|\blast\s+time|\bhave\s+you\s+(?:ever\s+)?had|\bmemorable\s+trip|\bdid\s+you\b/i.test(promptText))
    );
    const hasPastCue =
      isPastPrompt ||
      /\b(yesterday|last\s+(?:year|summer|month|week|trip)|two\s+years?\s+ago|\d+\s+years?\s+ago|was|were|went|visited|stayed|had\s+a\s+great\s+time)\b/i.test(lower);

    function addIssue(key, wrong, fix, reason, replaceTarget, rewriteText) {
      if (seenKeys.has(key) || issues.length >= 6) return;
      seenKeys.add(key);
      issues.push({
        wrong,
        fix,
        reason,
        replaceTarget: replaceTarget || null,
        rewriteText: rewriteText || null
      });
    }

    // 1. Lỗi phát âm / STT nghe nhầm ("I lie travel", "because it happened", "local foot", "share the cause", "pack close")
    const lieLikeMatch = raw.match(/\b(i|we|they|you)\s+((?:really|usually|often|also)\s+)?(lie|light|live|life)\s+(travel|traveling|travelling|go|going|visit|visiting|stay|staying|eat|eating|try|trying|take|taking|explore|exploring|swim|swimming|camp|camping|shop|shopping)\b/i);
    if (lieLikeMatch) {
      const adv = lieLikeMatch[2] ? lieLikeMatch[2].trim() + " " : "";
      const vIng = toIng(lieLikeMatch[4]);
      const fixedPhrase = `${lieLikeMatch[1]} ${adv}like ${vIng}`;
      addIssue(
        "stt_lie_like",
        lieLikeMatch[0],
        fixedPhrase,
        `Phát âm thiếu âm cuối /k/ hoặc nhầm nguyên âm khiến "${lieLikeMatch[3]}" sai nghĩa thay cho "like"; sau "like" dùng V-ing ("like ${vIng}").`,
        lieLikeMatch[0],
        fixedPhrase
      );
    }

    const becHappenedMatch = raw.match(/\bbecause\s+(?:it\s+)?(happened|happen)\b/i);
    if (becHappenedMatch && (!hasPastCue || /\bwe\s+(talk|share|eat|go|play|take|can)\b/i.test(lower))) {
      addIssue(
        "stt_because_happened",
        becHappenedMatch[0],
        "because it is very fun",
        'Sai thì hoặc phát âm nhầm ("because it happened" không hợp ở câu hỏi sở thích hiện tại); hãy nêu lý do rõ ràng như "because it is very fun".',
        becHappenedMatch[0],
        "because it is very fun"
      );
    }

    const becFanMatch = raw.match(/\bbecause\s+it\s+(fan|fine|fun|have\s+fun|has\s+fun)\b/i);
    if (becFanMatch) {
      addIssue(
        "stt_because_fun",
        becFanMatch[0],
        "because it is fun",
        'Thiếu động từ to be ("is") hoặc nhầm phát âm từ "fun" (/fʌn/) sau "because it".',
        becFanMatch[0],
        "because it is fun"
      );
    }

    const photoMatch = raw.match(/\b(take\s+(?:me\s+)?a(?:\s+\w+)?\s+photos?)\b/i);
    if (photoMatch) {
      const hasMe = /\bme\b/i.test(photoMatch[1]);
      const rewrite = hasMe ? "take many nice photos" : "take nice photos";
      addIssue(
        "take_photos_a",
        photoMatch[1],
        hasMe ? "take many nice photos" : "take a lot of nice photos / take nice photos",
        'Không dùng mạo từ "a" trước danh từ số nhiều "photos"; hãy phát âm rõ "many" hoặc "a lot of".',
        photoMatch[1],
        rewrite
      );
    }

    const localFootMatch = raw.match(/\blocal\s+foot\b/i);
    if (localFootMatch) {
      addIssue("local_foot", localFootMatch[0], "local food", 'Phát âm rõ âm cuối /d/ của từ "food" (/fuːd/) để tránh nhầm thành "foot".', localFootMatch[0], "local food");
    }
    const shareCauseMatch = raw.match(/\bshare\s+the\s+cause\b/i);
    if (shareCauseMatch) {
      addIssue("share_cause", shareCauseMatch[0], "share the cost", 'Chú ý phân biệt âm cuối /st/ của từ "cost" (/kɔːst/).', shareCauseMatch[0], "share the cost");
    }
    const packCloseMatch = raw.match(/\bpack\s+(my\s+)?close\b/i);
    if (packCloseMatch) {
      const myPart = packCloseMatch[1] || "";
      addIssue("pack_close", packCloseMatch[0], `pack ${myPart}clothes`, 'Danh từ "quần áo" là "clothes" (/kloʊðz/), không phải "close".', packCloseMatch[0], `pack ${myPart}clothes`);
    }

    // 2. Lỗi danh từ số ít thiếu số nhiều hoặc thiếu mạo từ ("with my friend", "go on trip", "there is + số nhiều")
    const withBareFriend = raw.match(/\bwith\s+friend\b/i);
    if (withBareFriend) {
      addIssue(
        "with_bare_friend",
        withBareFriend[0],
        "with my friends",
        'Danh từ đếm được số ít "friend" không đứng một mình; hãy dùng "with my friends" (hoặc "with a friend").',
        withBareFriend[0],
        "with my friends"
      );
    } else {
      const withMyFriend = raw.match(/\bwith\s+my\s+friend\b/i);
      if (withMyFriend && !hasPastCue && !/\b(named|called|best\s+friend\s+is)\b/i.test(lower)) {
        addIssue(
          "with_my_friend_sg",
          withMyFriend[0],
          "with my friends",
          'Khi nói sở thích hoặc thói quen chung, hãy chia số nhiều "with my friends" (trừ khi kể về một người bạn cụ thể).',
          withMyFriend[0],
          "with my friends"
        );
      }
    }

    const missingArtMatch = raw.match(/\b(go\s+on|going\s+on|went\s+on|prepare\s+for|preparing\s+for|have|had|take|taking|took|make|making|made|need|book|booking)\s+(trip|vacation|holiday|journey|flight|plan|itinerary|hotel|ticket|suitcase|camera|passport|budget)\b/i);
    if (missingArtMatch) {
      const noun = missingArtMatch[2].toLowerCase();
      const art = /^i/.test(noun) ? "an" : "a";
      const fixedArt = `${missingArtMatch[1]} ${art} ${noun}`;
      addIssue(
        "missing_article_" + noun,
        missingArtMatch[0],
        fixedArt,
        `Danh từ đếm được số ít "${noun}" cần có mạo từ "${art}" đứng trước ("${fixedArt}").`,
        missingArtMatch[0],
        fixedArt
      );
    }

    const thereIsPlural = raw.match(/\bthere\s+(is|was)\s+((?:(?:many|several|a\s+lot\s+of|lots\s+of|some|two|three|four|five|various|numerous)\s+)?(?:(?:delicious|nice|beautiful|good|famous|interesting|new|great)\s+)?)(friends|photos|pictures|places|clothes|things|trips|seasons|hotels|dishes|activities|attractions|destinations|options|reasons|beaches|mountains|restaurants)\b/i);
    if (thereIsPlural) {
      const beFix = thereIsPlural[1].toLowerCase() === "was" ? "were" : "are";
      const mid = thereIsPlural[2] || "";
      const plural = thereIsPlural[3].toLowerCase();
      const fixedThere = `there ${beFix} ${mid}${plural}`;
      addIssue(
        "there_is_plural",
        thereIsPlural[0],
        fixedThere,
        `Trước danh từ số nhiều "${plural}" phải dùng "there ${beFix}".`,
        thereIsPlural[0],
        fixedThere
      );
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
          `Không dùng "a/an" trước danh từ số nhiều hoặc không đếm được ("${noun}").`,
          m[1],
          phraseNoArticle
        );
      }
    }

    // 4. Lỗi chia động từ & cấu trúc động từ ("very like", "makes me to feel", "is help", "no like", modal + V-ing/to V)
    const veryVerbMatch = raw.match(/\b(i|we|they|you)\s+very\s+(like|love|enjoy|prefer|want)\b/i);
    if (veryVerbMatch) {
      const fixedVery = `${veryVerbMatch[1]} really ${veryVerbMatch[2].toLowerCase()}`;
      addIssue(
        "very_verb",
        veryVerbMatch[0],
        fixedVery,
        `Không dùng "very" đứng trước động từ thường; hãy dùng "really ${veryVerbMatch[2].toLowerCase()}" hoặc "... very much".`,
        veryVerbMatch[0],
        fixedVery
      );
    }

    const makeHelpObjRegex = /\b(make|makes|made|help|helps|helped)\s+(me|us|him|her|them|you|people|tourists)\s+(?:to\s+(feel|relax|unwind|enjoy|save|stay|work|focus|travel|go|forget|clear)|(feeling))\b/gi;
    let mh;
    while ((mh = makeHelpObjRegex.exec(raw)) !== null) {
      const verbFix = mh[4] ? "feel" : mh[3].toLowerCase();
      const fixedMakeHelp = `${mh[1]} ${mh[2]} ${verbFix}`;
      addIssue(
        "make_help_obj_" + mh[1].toLowerCase(),
        mh[0],
        fixedMakeHelp,
        `Sau cấu trúc "${mh[1]} + tân ngữ" dùng động từ nguyên mẫu không "to" và không "-ing" ("${fixedMakeHelp}").`,
        mh[0],
        fixedMakeHelp
      );
    }

    const isLikeWeatherMatch = raw.match(/\b(is)\s+like\s+(hot|cold|cool|warm|sunny|rainy|humid|windy|wet|dry|nice|good|bad|pleasant|beautiful|terrible|cloudy)\b/i);
    if (isLikeWeatherMatch) {
      const fixedWeatherLike = `${isLikeWeatherMatch[1]} ${isLikeWeatherMatch[2].toLowerCase()}`;
      addIssue(
        "weather_is_like_adj",
        isLikeWeatherMatch[0],
        fixedWeatherLike,
        `Khi trả lời về thời tiết không dùng "like" trước tính từ; hãy nói "${fixedWeatherLike}".`,
        isLikeWeatherMatch[0],
        fixedWeatherLike
      );
    }

    const isBaseVerbMatch = raw.match(/\b(it|this|that|the\s+weather|my\s+hometown|my\s+city|traveling)\s+is\s+(help|rain|affect|make|feel|depend|cheer|get|give|keep|bring|cost|need)\b/i);
    if (isBaseVerbMatch) {
      const fixedIsVerb = `${isBaseVerbMatch[1]} ${toThirdSg(isBaseVerbMatch[2])}`;
      addIssue(
        "is_before_base_verb",
        isBaseVerbMatch[0],
        fixedIsVerb,
        `Không dùng "is" trước động từ thường ở Hiện tại đơn; bỏ "is" và chia "-s" thành "${fixedIsVerb}".`,
        isBaseVerbMatch[0],
        fixedIsVerb
      );
    }

    const noVerbMatch = raw.match(/\b(i|we|they|you|he|she|it)\s+no\s+(like|prefer|love|enjoy|want|need|have|know|go|travel|stay|feel|get|rain|affect)\b/i);
    if (noVerbMatch) {
      const auxNeg = /^(he|she|it)$/i.test(noVerbMatch[1]) ? "doesn't" : "don't";
      const fixedNoVerb = `${noVerbMatch[1]} ${auxNeg} ${noVerbMatch[2].toLowerCase()}`;
      addIssue(
        "no_before_verb",
        noVerbMatch[0],
        fixedNoVerb,
        `Phủ định với động từ thường phải dùng "${auxNeg} + V nguyên mẫu" ("${fixedNoVerb}"), không dùng "no + V".`,
        noVerbMatch[0],
        fixedNoVerb
      );
    }

    const gerundRegex = /\b(prefer|enjoy|avoid|finish|suggest|mind|like|love|hate|keep)\s+(travel|go|visit|stay|eat|try|take|explore|pack|swim|camp|walk|fly|talk|share|spend|plan|book|wait|cook|shop)\b/gi;
    let gm;
    while ((gm = gerundRegex.exec(raw)) !== null) {
      const v1Low = gm[1].toLowerCase();
      const beforeChunk = raw.slice(Math.max(0, gm.index - 12), gm.index).toLowerCase();
      if ((v1Low === "like" || v1Low === "love") && /\b(would|'d)\s+$/.test(beforeChunk)) {
        continue;
      }
      const fixedV = toIng(gm[2]);
      const fixedPhrase = `${gm[1]} ${fixedV}`;
      addIssue(
        "gerund_after_" + v1Low,
        gm[0],
        fixedPhrase,
        `Sau động từ "${v1Low}" cần dùng danh động từ V-ing ("${v1Low} ${fixedV}") thay vì nguyên mẫu.`,
        gm[0],
        fixedPhrase
      );
      break;
    }

    const toInfMatch = raw.match(/\b(would\s+like|'d\s+like|would\s+love|'d\s+love|wants?|wanted|plans?|planned|hopes?|hoped|needs?|needed|decides?|decided)\s+(travel|go|visit|stay|eat|try|take|explore|pack|swim|camp|walk|fly|book|save|spend|relax|experience|join|prepare|talk|share)\b/i);
    if (toInfMatch) {
      const fixedToInf = `${toInfMatch[1]} to ${toInfMatch[2].toLowerCase()}`;
      addIssue(
        "to_inf_" + toInfMatch[1].toLowerCase().replace(/\s+/g, "_"),
        toInfMatch[0],
        fixedToInf,
        `Sau "${toInfMatch[1]}" cần dùng "to + V nguyên mẫu" ("${fixedToInf}").`,
        toInfMatch[0],
        fixedToInf
      );
    }

    const modalErrMatch = raw.match(/\b(can't|cannot|couldn't|won't|wouldn't|shouldn't|don't|doesn't|didn't|can|could|will|would|should|must|may|might)\s+(?:to\s+(travel|go|visit|stay|eat|try|take|explore|pack|swim|camp|walk|fly|relax|share|talk|save|book|prepare|spend|affect|study)|(traveling|travelling|going|visiting|staying|eating|trying|taking|exploring|packing|swimming|camping|walking|flying|relaxing|sharing|talking|saving|booking|preparing|spending|affecting|studying))\b/i);
    if (modalErrMatch) {
      const modal = modalErrMatch[1];
      const baseV = (modalErrMatch[2] || ING_TO_BASE_MAP[modalErrMatch[3].toLowerCase()] || modalErrMatch[3]).toLowerCase();
      const fixedModal = `${modal} ${baseV}`;
      addIssue(
        "modal_form",
        modalErrMatch[0],
        fixedModal,
        `Sau trợ động từ / khuyết thiếu "${modal.toLowerCase()}" chỉ dùng động từ nguyên mẫu ("${fixedModal}").`,
        modalErrMatch[0],
        fixedModal
      );
    }

    const prepGerundMatch =
      raw.match(/\b(before|after|without)\s+(travel|go|visit|stay|eat|try|take|explore|pack|swim|camp|walk|fly|book|prepare|talk|share|relax|spend|leave)\b/i) ||
      raw.match(/\b(for|about)\s+(go|visit|stay|eat|try|take|explore|pack|swim|camp|fly|book|prepare|talk|share|relax|spend|leave)\b/i);
    if (prepGerundMatch) {
      const prep = prepGerundMatch[1];
      const fixedPrep = `${prep} ${toIng(prepGerundMatch[2])}`;
      addIssue(
        "prep_gerund",
        prepGerundMatch[0],
        fixedPrep,
        `Sau giới từ "${prep.toLowerCase()}" cần dùng danh động từ V-ing ("${fixedPrep}").`,
        prepGerundMatch[0],
        fixedPrep
      );
    }

    // 5. Lỗi tách câu / liên từ kép ("because...so", "although...but") / mệnh đề cụt và thiếu to be
    const althButMatch = raw.match(/\b(although|though|even\s+though)\b([^.,!?]{3,48}?)\bbut\s+(i|we|they|you|it|he|she|there|the|my|our|many|people|tourists|visitors)\b/i);
    if (althButMatch && !/\b(for\s+example|however)\b/i.test(althButMatch[2])) {
      const clauseMid = althButMatch[2].replace(/\s+$/, "");
      const fixedAlth = `${althButMatch[1]}${clauseMid}, ${althButMatch[3]}`;
      addIssue(
        "double_conj_although_but",
        althButMatch[0],
        fixedAlth,
        `Trong tiếng Anh không dùng cả "${althButMatch[1].toLowerCase()} ... but ..." trong cùng một câu; hãy bỏ "but".`,
        althButMatch[0],
        fixedAlth
      );
    }

    const becSoMatch = raw.match(/\b(because|since)\b([^.,!?]{3,48}?)\bso\s+(i|we|they|you|it|he|she|there|the|my|our|many|people|tourists|visitors)\b/i);
    if (becSoMatch && !/\b(for\s+example|however|then)\b/i.test(becSoMatch[2])) {
      const beforeBec = raw.slice(0, becSoMatch.index).trim().toLowerCase();
      if (!beforeBec || /(?:^|\.\s*|^(?:well|honestly|actually)\s*,?\s*|\bthink)$/.test(beforeBec)) {
        const clauseMid = becSoMatch[2].replace(/\s+$/, "");
        const fixedBecSo = `${becSoMatch[1]}${clauseMid}, ${becSoMatch[3]}`;
        addIssue(
          "double_conj_because_so",
          becSoMatch[0],
          fixedBecSo,
          `Không dùng cả "${becSoMatch[1].toLowerCase()} ... so ..." trong cùng một câu; chỉ giữ "${becSoMatch[1].toLowerCase()}" hoặc chỉ giữ "so".`,
          becSoMatch[0],
          fixedBecSo
        );
      }
    }

    const inTripMatch = raw.match(/\bin\s+the\s+(trip|vacation|holiday)\b/i);
    if (inTripMatch) {
      const fixedPrepTrip = `during the ${inTripMatch[1].toLowerCase()}`;
      addIssue("in_the_trip", inTripMatch[0], fixedPrepTrip, `Không dùng "in the ${inTripMatch[1].toLowerCase()}"; hãy dùng "during the ..." hoặc "on the ...".`, inTripMatch[0], fixedPrepTrip);
    }

    const fragmentMatch = raw.match(/\b((?:during|on)\s+the\s+(?:trip|vacation|holiday))\s+(we|I|you|they)\s+(talk|eat|visit|take|share|play|go|stay|relax)(\s+together)?\b/i);
    if (fragmentMatch && !hasPastCue) {
      const beforeFrag = raw.slice(0, fragmentMatch.index).trim().toLowerCase();
      const hasCoordBefore = /\b(and|or|so|but|because|when|while)$/.test(beforeFrag);
      const timePhrase = fragmentMatch[1].charAt(0).toUpperCase() + fragmentMatch[1].slice(1).toLowerCase();
      const subj = fragmentMatch[2] === "i" ? "I" : fragmentMatch[2].toLowerCase();
      const verb = fragmentMatch[3].toLowerCase();
      const tog = fragmentMatch[4] || "";
      const displayFix = `${timePhrase}, ${subj} can ${verb}${tog}`;
      const rewriteFrag = fragmentMatch.index > 0 && !hasCoordBefore ? `. ${displayFix}` : `${displayFix.charAt(0).toLowerCase() + displayFix.slice(1)}`;
      addIssue(
        "runon_fragment",
        fragmentMatch[0],
        displayFix,
        `Nên tách câu rõ ràng và thêm "can" để diễn tả hoạt động có thể làm (${displayFix}...).`,
        fragmentMatch[0],
        fragmentMatch.index > 0 && !hasCoordBefore ? `. ${displayFix}` : rewriteFrag
      );
    }

    const becNoSubjMatch = raw.match(/\bbecause\s+(?:(very|really|so|quite|too)\s+)?(fun|safe|good|nice|great|hot|cold|cool|warm|cheap|expensive|interesting|convenient|comfortable|beautiful|relaxing|important|necessary|amazing|boring|crowded|humid)\b/i);
    if (becNoSubjMatch) {
      const adv = becNoSubjMatch[1] ? becNoSubjMatch[1].toLowerCase() + " " : "";
      const adj = becNoSubjMatch[2].toLowerCase();
      const fixedBec = `because it is ${adv}${adj}`;
      addIssue(
        "because_missing_subj",
        becNoSubjMatch[0],
        fixedBec,
        'Sau "because" phải là một mệnh đề đầy đủ (S + V); thiếu chủ ngữ và to be ("it is").',
        becNoSubjMatch[0],
        fixedBec
      );
    }

    // 6. Lỗi thừa to be trước động từ thường ("I am like / I am feel / I am go")
    const extraBeMatch = raw.match(/\b(i\s+am|we\s+are|they\s+are|he\s+is|she\s+is|it\s+is)\s+(usually\s+|often\s+|always\s+)?(like|prefer|love|enjoy|want|need|go|travel|prepare|visit|stay|live|feel)\b/i);
    if (extraBeMatch) {
      const fixedSubj = extraBeMatch[1].replace(/\s+(am|is|are)$/i, "");
      const adv = extraBeMatch[2] ? extraBeMatch[2].trim() + " " : "";
      const fixedExtraBe = `${fixedSubj} ${adv}${extraBeMatch[3].toLowerCase()}`;
      addIssue(
        "extra_be",
        extraBeMatch[0],
        fixedExtraBe,
        'Không dùng "am/is/are" trước động từ thường ở thì Hiện tại đơn.',
        extraBeMatch[0],
        fixedExtraBe
      );
    }

    // 6b. Lỗi chia sai to be / trợ động từ ("I is", "the weather are", "it don't", "in my hometown have...")
    const wrongBeAgreement =
      raw.match(/\b(i)\s+(is|are)\b/i) ||
      raw.match(/\b(he|she|it|the\s+weather|my\s+hometown|my\s+city|my\s+country)\s+(are|am)\b/i) ||
      raw.match(/\b(we|they|you|tourists|visitors|friends)\s+(is|am)\b/i);
    if (wrongBeAgreement) {
      const beforeBe = raw.slice(Math.max(0, wrongBeAgreement.index - 8), wrongBeAgreement.index).toLowerCase();
      if (!/\band\s+$/.test(beforeBe)) {
        const subjLow = wrongBeAgreement[1].toLowerCase();
        const rightBe = subjLow === "i" ? "am" : /^(we|they|you|tourists|visitors|friends)$/.test(subjLow) ? "are" : "is";
        const subjDisplay = subjLow === "i" ? "I" : wrongBeAgreement[1];
        const fixedBeAgr = `${subjDisplay} ${rightBe}`;
        addIssue(
          "sv_be_agreement",
          wrongBeAgreement[0],
          fixedBeAgr,
          `Chủ ngữ "${subjDisplay}" phải đi với to be "${rightBe}" ("${fixedBeAgr}").`,
          wrongBeAgreement[0],
          fixedBeAgr
        );
      }
    }

    const wrongDoAgreement =
      raw.match(/\b(it|he|she|the\s+weather|my\s+hometown|my\s+city)\s+don't\b/i) ||
      raw.match(/\b(i|we|they|you|tourists|visitors|friends)\s+doesn't\b/i);
    if (wrongDoAgreement) {
      const subjLow = wrongDoAgreement[1].toLowerCase();
      const rightDo = /^(it|he|she|the\s+weather|my\s+hometown|my\s+city)$/.test(subjLow) ? "doesn't" : "don't";
      const subjDisplay = subjLow === "i" ? "I" : wrongDoAgreement[1];
      const fixedDoAgr = `${subjDisplay} ${rightDo}`;
      addIssue(
        "sv_do_agreement",
        wrongDoAgreement[0],
        fixedDoAgr,
        `Chủ ngữ "${subjDisplay}" phải dùng trợ động từ "${rightDo}" ("${fixedDoAgr}").`,
        wrongDoAgreement[0],
        fixedDoAgr
      );
    }

    const hometownHaveMatch =
      raw.match(/\b(in\s+(?:my\s+)?(?:hometown|city|country|area|region|vietnam))\s+(have|has)\s+(two|three|four|five|many|several|some|two\s+main)\b/i) ||
      raw.match(/(?:^|[.,!?]\s*)(have|has)\s+(two|three|four|five|two\s+main|four\s+main)\s+(seasons?)\b/i);
    if (hometownHaveMatch) {
      if (hometownHaveMatch.length >= 4 && /^in\s+/i.test(hometownHaveMatch[1])) {
        const fixedThereHT = `${hometownHaveMatch[1]}, there are ${hometownHaveMatch[3].toLowerCase()}`;
        addIssue(
          "hometown_have_there_are",
          hometownHaveMatch[0],
          fixedThereHT,
          `Khi nói "Ở nơi nào đó có...", dùng cấu trúc "there are ..." thay vì "in ... have/has".`,
          hometownHaveMatch[0],
          fixedThereHT
        );
      } else {
        const fixedThereBare = `there are ${hometownHaveMatch[2].toLowerCase()} ${hometownHaveMatch[3].toLowerCase()}`;
        addIssue(
          "bare_have_there_are",
          `${hometownHaveMatch[1]} ${hometownHaveMatch[2]} ${hometownHaveMatch[3]}`,
          fixedThereBare,
          `Mở đầu giới thiệu số mùa bằng "there are ${hometownHaveMatch[2].toLowerCase()} ..." thay vì "${hometownHaveMatch[1].toLowerCase()} ...".`,
          `${hometownHaveMatch[1]} ${hometownHaveMatch[2]} ${hometownHaveMatch[3]}`,
          fixedThereBare
        );
      }
    }

    // 7. Lỗi thiếu động từ to be trước tính từ ("it very fun" / "I very happy" / "the weather hot", ngoại trừ cụm "make/keep/find it very + adj")
    const missingBeRegex = /\b(i|it|this|that|they|we|the\s+weather|weather|my\s+hometown|my\s+city|my\s+country|summer|winter|spring|autumn|traveling|trip)\s+(very|really|so|quite|too)\s+(fun|safe|good|nice|great|hot|cold|cool|warm|cheap|expensive|interesting|convenient|comfortable|beautiful|relaxing|important|necessary|amazing|happy|tired|busy|humid)\b/gi;
    let bm;
    while ((bm = missingBeRegex.exec(raw)) !== null) {
      const beforeChunk = raw.slice(Math.max(0, bm.index - 18), bm.index).toLowerCase();
      if (/\b(make|makes|made|keep|keeps|kept|find|found|feel|feels|consider|call|look|looks|sound|sounds|seem|seems|get|gets|become|becomes)\s+$/.test(beforeChunk)) {
        continue;
      }
      const subj = bm[1].toLowerCase();
      const beWord = subj === "i" ? "am" : subj === "they" || subj === "we" ? "are" : "is";
      const subjOut = subj === "i" ? "I" : bm[1];
      const fixedMissingBe = `${subjOut} ${beWord} ${bm[2]} ${bm[3]}`;
      addIssue(
        "missing_be",
        bm[0],
        fixedMissingBe,
        `Thiếu động từ to be ("${beWord}") đứng trước tính từ "${bm[3]}".`,
        bm[0],
        fixedMissingBe
      );
      break;
    }

    const missingBeShortRegex = /\b(i|it|they|we|the\s+weather|my\s+hometown|my\s+city|my\s+country)\s+(fun|safe|good|nice|great|hot|cold|cool|warm|cheap|expensive|interesting|convenient|comfortable|beautiful|relaxing|amazing|boring|crowded|humid|happy|tired|busy)\b/gi;
    let bms;
    while ((bms = missingBeShortRegex.exec(raw)) !== null) {
      const beforeChunk = raw.slice(Math.max(0, bms.index - 18), bms.index).toLowerCase();
      if (/\b(make|makes|made|keep|keeps|kept|find|found|feel|feels|consider|call|sound|sounds|seem|seems|look|looks|get|gets)\s+$/.test(beforeChunk)) {
        continue;
      }
      const subj = bms[1].toLowerCase();
      const beWord = subj === "i" ? "am" : subj === "they" || subj === "we" ? "are" : "is";
      const subjOut = subj === "i" ? "I" : bms[1];
      const fixedShortBe = `${subjOut} ${beWord} ${bms[2]}`;
      addIssue(
        "missing_be_short_" + subj.replace(/\s+/g, "_"),
        bms[0],
        fixedShortBe,
        `Thiếu động từ to be ("${beWord}") trước tính từ "${bms[2]}".`,
        bms[0],
        fixedShortBe
      );
      break;
    }

    // 8. Lỗi giới từ, lượng từ và chọn từ sai ("visit to Da Lat", "go to a trip", "busy for", "in sunny days", "fewer rain", "effect")
    const visitToMatch = raw.match(/\b(visit|visiting|visited)\s+to\s+((?:my|our|the|a|an)\s+[a-z]+|(?:da\s+lat|da\s+nang|ha\s+noi|hanoi|ho\s+chi\s+minh\s+city|ho\s+chi\s+minh|saigon|nha\s+trang|phu\s+quoc|sapa|hue|vietnam|thailand|japan|korea|new\s+places|famous\s+places|night\s+markets|local\s+markets))\b/i);
    if (visitToMatch) {
      const beforeVisit = raw.slice(Math.max(0, visitToMatch.index - 10), visitToMatch.index).toLowerCase();
      if (!/\b(a|the|my|our|this|that)\s+$/.test(beforeVisit)) {
        const fixedVisit = `${visitToMatch[1]} ${visitToMatch[2]}`;
        addIssue(
          "visit_to_place",
          visitToMatch[0],
          fixedVisit,
          `Sau động từ "${visitToMatch[1].toLowerCase()}" không dùng giới từ "to" ("${fixedVisit}").`,
          visitToMatch[0],
          fixedVisit
        );
      }
    }

    const goToTripMatch = raw.match(/\b(go|going|went)\s+to\s+(a\s+)?(trips?)\b/i);
    if (goToTripMatch) {
      const nounTrip = goToTripMatch[3].toLowerCase();
      const art = goToTripMatch[2] || (nounTrip === "trip" ? "a " : "");
      const fixedGoTrip = `${goToTripMatch[1]} on ${art}${nounTrip}`;
      addIssue(
        "go_on_trip_prep",
        goToTripMatch[0],
        fixedGoTrip,
        `Phải dùng giới từ "on" với "trip" ("${fixedGoTrip}"), không dùng "to".`,
        goToTripMatch[0],
        fixedGoTrip
      );
    }

    const busyPrepMatch = raw.match(/\b(busy)\s+(for|in|about)\s+(school|my\s+studies|studies|work|my\s+work|exams|projects|homework)\b/i);
    if (busyPrepMatch) {
      const fixedBusy = `${busyPrepMatch[1]} with ${busyPrepMatch[3]}`;
      addIssue(
        "busy_prep",
        busyPrepMatch[0],
        fixedBusy,
        `Tính từ "busy" đi với giới từ "with" ("${fixedBusy}"), không dùng "${busyPrepMatch[2].toLowerCase()}".`,
        busyPrepMatch[0],
        fixedBusy
      );
    }

    const suitableWithMatch = raw.match(/\bsuitable\s+with\b/i);
    if (suitableWithMatch) {
      addIssue("suitable_prep", suitableWithMatch[0], "suitable for", 'Tính từ "suitable" phải đi với giới từ "for" ("suitable for...").', suitableWithMatch[0], "suitable for");
    }

    const inDayMatch = raw.match(/\bin\s+(sunny|rainy|hot|cold|cool|warm|busy|nice|good|bad|weekend)\s+(days?|mornings?|afternoons?|evenings?)\b/i);
    if (inDayMatch) {
      const fixedOnDay = `on ${inDayMatch[1]} ${inDayMatch[2]}`;
      addIssue(
        "in_adj_day",
        inDayMatch[0],
        fixedOnDay,
        `Trước "${inDayMatch[1]} ${inDayMatch[2]}" cần dùng giới từ "on" ("${fixedOnDay}"), không dùng "in".`,
        inDayMatch[0],
        fixedOnDay
      );
    }

    const inWeekendsMatch = raw.match(/\bin\s+(the\s+)?(weekends?)\b/i);
    if (inWeekendsMatch) {
      const fixedWeekend = `on ${inWeekendsMatch[1] || ""}${inWeekendsMatch[2].toLowerCase()}`;
      addIssue("in_weekend", inWeekendsMatch[0], fixedWeekend, `Với cuối tuần hãy dùng giới từ "on" ("${fixedWeekend}").`, inWeekendsMatch[0], fixedWeekend);
    }

    const onPartDayMatch = raw.match(/\bon\s+the\s+(morning|afternoon|evening)\b/i);
    if (onPartDayMatch) {
      const fixedPartDay = `in the ${onPartDayMatch[1].toLowerCase()}`;
      addIssue("on_the_part_day", onPartDayMatch[0], fixedPartDay, `Với buổi trong ngày hãy dùng cụm "in the ${onPartDayMatch[1].toLowerCase()}".`, onPartDayMatch[0], fixedPartDay);
    }

    const fewerUncountMatch = raw.match(/\bfewer\s+(rain|money|time|luggage|baggage|food|water|traffic|sunscreen|information)\b/i);
    if (fewerUncountMatch) {
      const fixedLess = `less ${fewerUncountMatch[1].toLowerCase()}`;
      addIssue(
        "fewer_uncountable",
        fewerUncountMatch[0],
        fixedLess,
        `Danh từ không đếm được "${fewerUncountMatch[1].toLowerCase()}" phải đi với "less", không dùng "fewer".`,
        fewerUncountMatch[0],
        fixedLess
      );
    }

    const effectVerbMatch = raw.match(/\b(the\s+weather|weather|it|this|that|rain|climate)\s+effect(s?)\b/i);
    if (effectVerbMatch) {
      const sfx = effectVerbMatch[2] || (/^(the\s+weather|weather|it|this|that|rain|climate)$/i.test(effectVerbMatch[1]) ? "s" : "");
      const fixedAffect = `${effectVerbMatch[1]} affect${sfx}`;
      addIssue(
        "effect_vs_affect",
        effectVerbMatch[0],
        fixedAffect,
        `"effect" là danh từ; khi cần động từ "ảnh hưởng đến" hãy dùng "affect" ("${fixedAffect}").`,
        effectVerbMatch[0],
        fixedAffect
      );
    }

    const prepErr = raw.match(/\b(go|going|went)\s+to\s+(travel|traveling|travelling|camping|swimming|shopping|sightseeing|home|abroad)\b/i);
    if (prepErr) {
      const fixedGo = `${prepErr[1]} ${prepErr[2].toLowerCase()}`;
      addIssue(
        "go_to_err",
        prepErr[0],
        fixedGo,
        `Không dùng giới từ "to" trong cụm "${fixedGo}".`,
        prepErr[0],
        fixedGo
      );
    }
    const byFootMatch = raw.match(/\bby\s+foot\b/i);
    if (byFootMatch) {
      addIssue("by_foot", byFootMatch[0], "on foot", 'Đi bộ phải dùng cụm cố định "on foot" (không dùng "by foot").', byFootMatch[0], "on foot");
    }
    const inBeachMatch = raw.match(/\bin\s+the\s+beach\b/i);
    if (inBeachMatch) {
      addIssue("in_beach", inBeachMatch[0], "on the beach / at the beach", 'Với bãi biển hãy dùng "on the beach" hoặc "at the beach".', inBeachMatch[0], "on the beach");
    }

    // 9. Lỗi many / several + danh từ đếm được số ít ("four season", "many friend")
    const manySingMatch = raw.match(/\b(many|several|two|three|four|five)\s+(friend|photo|picture|place|hotel|trip|season|thing|day|city|country|month)\b/i);
    if (manySingMatch) {
      const nounLow = manySingMatch[2].toLowerCase();
      const pluralNoun = nounLow === "city" ? "cities" : nounLow === "country" ? "countries" : nounLow + "s";
      const fixedMany = `${manySingMatch[1]} ${pluralNoun}`;
      addIssue(
        "many_singular",
        manySingMatch[0],
        fixedMany,
        `Sau "${manySingMatch[1].toLowerCase()}" cần chia danh từ ở dạng số nhiều ("${pluralNoun}").`,
        manySingMatch[0],
        fixedMany
      );
    }

    // 10. Lỗi chia động từ ngôi thứ 3 số ít ("it help", "the weather affect", "my hometown have")
    const thirdSgRegex = /\b(the\s+weather|my\s+hometown|my\s+city|my\s+country|my\s+family|it|this|that|which|he|she)\s+(help|make|give|bring|take|need|cost|have|affect|rain|get|feel|keep|cheer|depend|like|love|want|go|do)\b/gi;
    let tsg;
    while ((tsg = thirdSgRegex.exec(raw)) !== null) {
      const beforeTsg = raw.slice(Math.max(0, tsg.index - 24), tsg.index).toLowerCase();
      if (/\b(can|could|will|would|should|must|may|might|does|doesn't|do|don't|did|didn't|to|make|makes|made|help|helps|helped|let|lets)\s+$/.test(beforeTsg)) {
        continue;
      }
      if (tsg[1].toLowerCase() === "which" && /\b[a-z]+s\s+$/.test(beforeTsg)) {
        continue;
      }
      if (seenKeys.has("bare_have_there_are") || seenKeys.has("hometown_have_there_are")) {
        continue;
      }
      const fixed3 = toThirdSg(tsg[2]);
      const fixed3Sg = `${tsg[1]} ${fixed3}`;
      addIssue(
        "third_sg",
        tsg[0],
        fixed3Sg,
        `Chủ ngữ số ít "${tsg[1]}" cần chia động từ thêm "-s/-es" ("${fixed3Sg}").`,
        tsg[0],
        fixed3Sg
      );
      break;
    }

    // 11. Lỗi "because of + mệnh đề"
    const becClause = raw.match(/\bbecause\s+of\s+(i|we|they|it|you)\s+(can|like|love|have|want|need|is|are|am)\b/i);
    if (becClause) {
      const fixedBecClause = `because ${becClause[1]} ${becClause[2]}`;
      addIssue(
        "because_of_clause",
        becClause[0],
        fixedBecClause,
        '"because of" chỉ đi với danh từ/V-ing; trước một mệnh đề đầy đủ (S + V) dùng "because".',
        becClause[0],
        fixedBecClause
      );
    }

    // 12. Kiểm tra thì theo câu hỏi kế hoạch / dự định tương lai (plans_q1, plans_q2, trips_q2)
    const isFuturePrompt =
      question &&
      (question.id === "plans_q1" ||
        question.id === "plans_q2" ||
        question.id === "trips_q2" ||
        /would like|next trip|next month|plans/i.test(promptText));
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

    // 13. Lỗi lặp cấu trúc đơn quá nhiều trong bài nói ("we can" / "I can" >= 4 lần)
    const weCanCount = (lower.match(/\bwe can\b/g) || []).length;
    const iCanCount = (lower.match(/\bi can\b/g) || []).length;
    if (weCanCount >= 4 || iCanCount >= 4) {
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

  function buildCorrectedTranscript(transcript, issues) {
    let rewritten = String(transcript || "").trim();
    if (!rewritten || !issues || issues.length === 0) return "";

    let didRewrite = false;
    const patches = issues
      .filter(err => err.replaceTarget && err.rewriteText)
      .slice()
      .sort((a, b) => b.replaceTarget.length - a.replaceTarget.length);

    patches.forEach(err => {
      const escaped = err.replaceTarget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`\\b${escaped}\\b`, "i");
      if (re.test(rewritten)) {
        rewritten = rewritten.replace(re, err.rewriteText);
        didRewrite = true;
      }
    });

    if (!didRewrite) return "";

    rewritten = rewritten
      .replace(/\s+/g, " ")
      .replace(/\s+([.,!?])/g, "$1")
      .replace(/,\s*\./g, ".")
      .replace(/\.{2,}/g, ".")
      .replace(/\bi\b/g, "I")
      .replace(/\.\s+([a-z])/g, (_, ch) => `. ${ch.toUpperCase()}`)
      .trim();

    if (rewritten.length > 0) {
      rewritten = rewritten.charAt(0).toUpperCase() + rewritten.slice(1);
      if (!/[.!?]$/.test(rewritten)) rewritten += ".";
    }
    return rewritten;
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
    const correctedSentence = buildCorrectedTranscript(transcript, errors);

    // ------------------------------------------------------------------
    // CHẤM ĐIỂM THANG 10 CHUẨN VSTEP SPEAKING PART 1 (NGHIÊM TÚC & SÁT THỰC TẾ)
    // - < 4.0     : Chưa đạt B1
    // - 4.0 - 5.5 : Đạt mức B1 (tối thiểu >= 22 từ, đúng trọng tâm, <= 2 lỗi)
    // - 6.0 - 8.5 : Đạt mức B2 (>= 34 từ, đủ từ vựng & ngữ pháp B2, <= 1 lỗi)
    // ------------------------------------------------------------------
    // 1. Task Development & Length (0.3 - 2.5 pts)
    let devPts = 0.3;
    if (wordCount >= 45) devPts = 2.5;
    else if (wordCount >= 34) devPts = 2.15;
    else if (wordCount >= 28) devPts = 1.8;
    else if (wordCount >= 22) devPts = 1.5;
    else if (wordCount >= 15) devPts = 1.0;
    else if (wordCount >= 10) devPts = 0.65;

    // 2. Vocabulary & Topic Lexical Resource (0.4 - 2.5 pts)
    let vocabPts = matchedDomainCount === 0 ? 0.4 : 0.85 + Math.min(0.45, uniqueDomainWords.length * 0.08);
    if (b1SampleHits.length > 0) vocabPts += Math.min(0.25, b1SampleHits.length * 0.09);
    vocabPts += Math.min(1.0, allB2Lexis.length * 0.28);
    vocabPts = Math.min(2.5, vocabPts);

    // 3. Grammar Range (0.8 - 2.35 pts; lỗi trừ trực tiếp bên dưới)
    let gramPts = wordCount >= 22 ? 1.05 : 0.8;
    if (usedCompound.length > 0) gramPts += 0.15;
    if (usedComplex.length > 0 && wordCount >= 20) gramPts += 0.25;
    if (usedRelative.length > 0) gramPts += 0.45;
    if (usedDiscourse.length >= 1) gramPts += 0.25;
    if (usedDiscourse.length >= 2) gramPts += 0.15;

    // 4. Fluency & Delivery Pacing (0.25 - 1.2 pts)
    let fluPts = 0.35;
    if (wordCount >= 34) fluPts = 1.05;
    else if (wordCount >= 22) fluPts = 0.85;
    else if (wordCount >= 15) fluPts = 0.55;
    if (usedDiscourse.length >= 1 && wordCount >= 36) fluPts = Math.min(1.2, fluPts + 0.15);
    if (durationSec >= 12 && wordCount / durationSec < 0.75) {
      fluPts = Math.max(0.25, fluPts - 0.2);
    }

    // Trừ trực tiếp 0.55 điểm cho mỗi lỗi phát hiện được
    let rawScore = devPts + vocabPts + gramPts + fluPts - errors.length * 0.55;

    const isOffTopic = matchedDomainCount === 0 && b1SampleHits.length === 0 && allB2Lexis.length === 0;
    const hasB2Lexis = allB2Lexis.length >= 3 || (allB2Lexis.length >= 2 && (usedRelative.length > 0 || usedDiscourse.length > 0));
    const hasB2Grammar = usedRelative.length > 0 || usedDiscourse.length > 0;

    if (isOffTopic) {
      rawScore = Math.min(rawScore, 2.5);
    } else if (wordCount < 15) {
      rawScore = Math.min(rawScore, 2.5);
    } else if (wordCount < 22) {
      rawScore = Math.min(rawScore, errors.length >= 2 ? 2.5 : 3.5);
    } else if (errors.length >= 3) {
      rawScore = Math.min(rawScore, 3.5);
    } else if (errors.length >= 2 || wordCount < 34 || !hasB2Lexis || !hasB2Grammar || matchedDomainCount < 2) {
      // Khung B1 tối đa 5.5 (bài ngắn 22-27 từ tối đa 4.5)
      rawScore = Math.min(rawScore, wordCount < 28 ? 4.5 : 5.5);
    } else {
      // Đủ chuẩn vào khung B2 (6.0 - 8.5)
      if (errors.length === 0) {
        rawScore = Math.max(rawScore, 6.5);
      } else {
        rawScore = Math.min(rawScore, 6.5);
      }
      if (wordCount < 45 && allB2Lexis.length < 4) {
        rawScore = Math.min(rawScore, 7.5);
      }
    }

    const finalScore = roundHalfStep(Math.max(1.5, Math.min(8.5, rawScore)));

    let levelLabel = "Chưa đạt B1";
    let badgeTone = "below";
    if (finalScore >= 6.0) {
      levelLabel = "Đạt mức B2";
      badgeTone = "b2";
    } else if (finalScore >= 4.0) {
      levelLabel = "Đạt mức B1";
      badgeTone = "b1";
    }

    const timeNote = durationSec ? ` / ${durationSec} giây` : "";
    const notes = [];
    if (errors.length === 0) {
      notes.push(`Không phát hiện lỗi ngữ pháp/từ vựng đáng kể (${wordCount} từ${timeNote}).`);
    }

    if (isOffTopic) {
      notes.push("Nội dung chưa bám sát từ khóa câu hỏi; cần trả lời trực tiếp vào trọng tâm đề bài.");
    } else if (wordCount < 22) {
      notes.push(`Độ dài còn quá ngắn (${wordCount} từ${timeNote}). Cần nói ít nhất 22–35 từ (3 câu ngắn gọn theo công thức A-R-E: Trả lời + Lý do → Ví dụ → Cảm xúc) để đạt mức B1 (4.0+).`);
    } else if (badgeTone === "below") {
      notes.push(`Bài nói còn ${errors.length} lỗi ảnh hưởng đến độ chính xác (${wordCount} từ${timeNote}); cần sửa các lỗi trên để đạt mức B1 (4.0+).`);
    } else if (badgeTone === "b1") {
      if (wordCount < 34) {
        notes.push(`Đạt mức B1 (${wordCount} từ${timeNote}). Để lên B2 (6.0+), hãy giữ 3 câu theo A-R-E khoảng 35+ từ, thêm cụm từ vựng tự nhiên ở Mục V và từ nối/mệnh đề quan hệ.`);
      } else if (errors.length > 0) {
        notes.push(`Đạt mức B1 (${wordCount} từ${timeNote}). Hãy sửa lỗi trên và dùng thêm từ nối/cụm tự nhiên B2 để hướng tới mức 6.0+.`);
      } else {
        notes.push(`Đạt mức B1 (${wordCount} từ${timeNote}). Để lên B2 (6.0+), hãy dùng thêm các cụm tự nhiên ở Mục V (Honestly / tend to / unwind / , which...).`);
      }
    } else if (errors.length > 0) {
      notes.push(`Đạt mức B2 (${wordCount} từ${timeNote}). Khắc phục lỗi nhỏ bên trên để giữ chắc mức 7.0–8.0.`);
    } else {
      notes.push(`Đạt mức B2 (${wordCount} từ${timeNote}), triển khai tự nhiên đúng cấu trúc A-R-E và dùng được cụm từ nâng cao.`);
    }

    return {
      hasTranscript: true,
      score: finalScore,
      scoreText: finalScore.toFixed(1),
      levelLabel,
      badgeTone,
      wordCount,
      durationSec,
      errors,
      correctedSentence,
      notes
    };
  }

  function renderFeedbackCardHtml(res, escFn) {
    if (!res) return "";
    const esc = escFn || (s => String(s || ""));
    const scorePill =
      res.hasTranscript && res.score !== null
        ? `<span class="ai-eval-score-pill tone-${esc(res.badgeTone)}">${esc(res.scoreText)} / 10 · ${esc(res.levelLabel)}</span>`
        : `<span class="ai-eval-score-pill tone-neutral">${esc(res.levelLabel)}</span>`;

    if (!res.hasTranscript) {
      const fallbackItems = [];
      if (res.summary) fallbackItems.push(res.summary);
      if (res.tip) fallbackItems.push(res.tip);
      return `
        <div class="ai-eval-card">
          <div class="ai-eval-header">
            <div class="ai-eval-title-wrap">
              <span class="ai-eval-title">Nhận xét &amp; Sửa lỗi bài nói (Thang VSTEP 10)</span>
              <span class="ai-eval-band-note">4.0–5.5: Đạt B1 · 6.0–8.5: Đạt B2</span>
            </div>
            ${scorePill}
          </div>
          <ul class="ai-eval-list">
            ${fallbackItems.map(text => `<li>${esc(text)}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    const errorsHtml =
      res.errors && res.errors.length > 0
        ? `
          <div class="ai-eval-errors-list">
            ${res.errors
              .map(
                err => `
              <div class="ai-eval-error-item">
                <div class="ai-eval-fix-line">
                  <span class="ai-err-wrong">“${esc(err.wrong)}”</span>
                  <span>→</span>
                  <span class="ai-err-fix">“${esc(err.fix)}”</span>
                </div>
                <div class="ai-err-reason">${esc(err.reason)}</div>
              </div>
            `
              )
              .join("")}
          </div>
        `
        : "";

    const rewriteHtml = res.correctedSentence
      ? `
        <div class="ai-eval-rewrite">
          <div class="ai-eval-rewrite-label">Gợi ý diễn đạt lại đúng theo ý của bạn:</div>
          <div class="ai-eval-rewrite-text">“${esc(res.correctedSentence)}”</div>
        </div>
      `
      : "";

    const notesHtml =
      res.notes && res.notes.length > 0
        ? `
          <ul class="ai-eval-list">
            ${res.notes.map(text => `<li>${esc(text)}</li>`).join("")}
          </ul>
        `
        : "";

    return `
      <div class="ai-eval-card">
        <div class="ai-eval-header">
          <div class="ai-eval-title-wrap">
            <span class="ai-eval-title">Nhận xét &amp; Sửa lỗi bài nói (Thang VSTEP 10)</span>
            <span class="ai-eval-band-note">4.0–5.5: Đạt B1 · 6.0–8.5: Đạt B2</span>
          </div>
          ${scorePill}
        </div>
        ${errorsHtml}
        ${rewriteHtml}
        ${notesHtml}
      </div>
    `;
  }

  window.SpeakingEvaluator = {
    evaluate,
    renderFeedbackCardHtml
  };
})();
