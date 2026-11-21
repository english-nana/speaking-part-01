# Workspace Rules — Speaking Part 1 Practice App

## Standing Content Rules for New Speaking Part 1 Questions

Whenever new Speaking Part 1 topics or questions are added and model answers are created, follow all of these rules:

1. **Relatable, Real-Life Ideas**:
   - Ground answers in everyday situations familiar to Vietnamese learners and students (e.g., school/exams, hanging out at cafes, Zalo/Messenger, TikTok/YouTube, online shopping discounts, riding a motorbike, family and close friends).
   - Avoid abstract, overly technical, or unrealistic scenarios.

2. **Natural Spoken English**:
   - Write the way real speakers actually talk in a friendly Part 1 interview — natural phrasing, smooth contractions where appropriate (e.g., `I'd say`, `I'm`), and conversational flow.
   - Avoid stiff, robotic, or overly academic essay sentences.

3. **Reuse Vocabulary from Previous Topics**:
   - Actively recycle natural chunks and vocabulary already introduced in earlier topics in `travel-data.js` whenever they fit naturally (without forcing them):
     - **Core B1 chunks**: `prefer`, `busy with school`, `busy with work`, `study hard`, `final exams`, `save money`, `reduce stress`, `have free time`, `stay home`, `go outside`, `ride a motorbike`, `check the weather`, `take nice photos`, `talk together`, `tasty food`, `cool and nice`, `easy and fun`, `feel happy`, `feel very happy`, `feel relaxed`, `feel ready`, `feel safe`, `feel lazy`.
     - **Core B2 chunks**: `Honestly`, `Actually`, `To be honest`, `Definitely`, `I'd say`, `Well`, `Yes, I really do`, `I tend to`, `I usually go for`, `go-to`, `convenient`, `inconvenient`, `affordable`, `enjoyable`, `meaningful`, `essential items`, `in advance`, `portable charger`, `stay organized`, `check my schedule`, `tight deadlines`, `important projects`, `close friends`, `hang out`, `daily routine`, `peace of mind`, `feel at ease`, `unwind`, `clear my mind`, `cheer me up`, `a little reward`, `take a break`, `boost my productivity`, `feel sluggish`, `ruin my plans`.

## Technical Rules When Adding Topics to the App

1. **A-R-E Structure & Word-Count Bands**:
   - Use 3 short sentences following **A-R-E** (`Answer + Reason → Example → Feeling/Result`):
     - **Level B1**: ~29–36 words, clear everyday vocabulary, 0 B2 discourse markers (`honestly`, `actually`, `definitely`, `well`, `especially`, `overall`, `tend to`, `go-to`) and 0 relative clauses (`which`/`who`/`where`) so B1 stays cleanly within the B1 band (4.0–5.5).
     - **Level B2**: ~34–41 words, includes natural B2 discourse openers/markers, B2 collocations, and typically a relative clause (`which`/`who`/`where`) or contrast (`whereas`/`while`) to score reliably in the B2 band (6.0–8.5).

2. **Schema Completeness in `travel-data.js`**:
   - Each topic object needs `id`, `number` (`"06"`, `"07"`, ...), `title`, `titleVi`, `description`, `questionsCount`, and `questions`.
   - Each question needs `id`, `num`, `prompt`, `analysis` (`questionType`, `tense`, `length`), `pitfalls` (3 learner-specific warnings in Vietnamese), and `levels.b1` + `levels.b2`.
   - Each level needs `strategy` (3 steps), `modelAnswer` (highlighting key chunks with `<strong>...</strong>`), and **8 `vocab` items** (`word`, US `ipa`, `pos`, Vietnamese `meaning`, `example` containing `<strong>...</strong>`).

3. **Evaluator & Cache-Busting Sync**:
   - Update `speaking-evaluator.js` (`TOPIC_DOMAIN_WORDS`, `B2_LEXIS_PHRASES`, and `isPastPrompt`/`isFuturePrompt` if new past/future questions are added).
   - Bump `?v=...` query versions on all local CSS/JS `<link>`/`<script>` tags in `index.html` and `teacher.html`.
   - Verify with Node.js that all B1 models score `Đạt mức B1` (0 errors) and all B2 models score `Đạt mức B2` (0 errors).
