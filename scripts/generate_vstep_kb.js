const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');

// Helper to clean HTML tags into clean Markdown formatting
function cleanHtml(str) {
  if (!str) return '';
  return str
    .replace(/<mark>(.*?)<\/mark>/gi, '**$1**')
    .replace(/<span[^>]*class=['\"][^'\"]*text-orange-500[^'\"]*['\"][^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<span[^>]*class=['\"][^'\"]*(?:bg-slate-800|bg-rose-500|text-rose-500)[^'\"]*['\"][^>]*>(.*?)<\/span>/gi, '[$1]')
    .replace(/<span[^>]*class=['\"][^'\"]*text-red-600[^'\"]*['\"][^>]*>(.*?)<\/span>/gi, '**$1**')
    .replace(/<span[^>]*class=['\"][^'\"]*font-bold[^'\"]*['\"][^>]*>(.*?)<\/span>/gi, '**$1**')
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<sub>(.*?)<\/sub>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function loadGroup(fileName, varName) {
  const filePath = path.join(projectRoot, 'data', fileName);
  const code = fs.readFileSync(filePath, 'utf8');
  return vm.runInNewContext(code + '; ' + varName + ';');
}

const g1 = loadGroup('group1.js', 'group1');
const g3 = loadGroup('group3.js', 'group3');
const g4 = loadGroup('group4.js', 'group4');
const g5 = loadGroup('group5.js', 'group5');
const g6 = loadGroup('group6.js', 'group6');

const appJs = fs.readFileSync(path.join(projectRoot, 'app.js'), 'utf8');

// Parse Adjectives from app.js
function parseAdjectives() {
  const adjStart = appJs.indexOf('const AdjectivesTab');
  const benStart = appJs.indexOf('const BenefitsTab');
  const code = appJs.slice(adjStart, benStart);

  const sectionRegex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/g;
  let match;
  const sections = [];
  while ((match = sectionRegex.exec(code)) !== null) {
    const title = match[1].replace(/<[^>]+>/g, '').trim();
    const body = match[2];
    const cats = [];
    const catRegex = /<strong[^>]*>([\s\S]*?)<\/strong>([\s\S]*?)(?=<strong|$)/g;
    let catMatch;
    while ((catMatch = catRegex.exec(body)) !== null) {
      const catName = catMatch[1].replace(/<[^>]+>/g, '').trim();
      const catBody = catMatch[2];
      const adjs = [];
      const adjRegex = /<Adj\s+word="([^"]+)"\s+vi="([^"]+)"\s*\/>/g;
      let adjMatch;
      while ((adjMatch = adjRegex.exec(catBody)) !== null) {
        adjs.push({ word: adjMatch[1], vi: adjMatch[2] });
      }
      if (adjs.length > 0) {
        cats.push({ catName, adjs });
      }
    }
    if (cats.length > 0) {
      sections.push({ title, cats });
    }
  }
  return sections;
}

// Parse Benefits from app.js
function parseBenefits() {
  const benStart = appJs.indexOf('const BenefitsTab');
  const structCardStart = appJs.indexOf('const StructureCard');
  const code = appJs.slice(benStart, structCardStart);

  const b1Match = code.match(/const b1Phrases = ([\s\S]*?);(?=\s*const b2Phrases)/);
  const b2Match = code.match(/const b2Phrases = ([\s\S]*?);(?=\s*const currentPhrases)/);

  let b1Phrases = {}, b2Phrases = {};
  if (b1Match) {
    b1Phrases = vm.runInNewContext('(' + b1Match[1] + ')');
  }
  if (b2Match) {
    b2Phrases = vm.runInNewContext('(' + b2Match[1] + ')');
  }

  const structures = [
    { en: "S helps [ai đó] [làm gì đó]", vi: "S giúp [ai đó] [làm gì đó]" },
    { en: "S allows [ai đó] to [làm gì đó]", vi: "S cho phép [ai đó] [làm gì đó]" },
    { en: "S is a great way for [ai đó] to [làm gì đó]", vi: "S là một cách tuyệt vời để [ai đó] [làm gì đó]" },
    { en: "S gives [ai đó] the chance to [làm gì đó]", vi: "S cho [ai đó] cơ hội [làm gì đó]" }
  ];

  return { structures, b1Phrases, b2Phrases };
}

// Render mindmap to markdown
function renderMindmapMd(mm) {
  if (!mm) return '';
  let out = `### Sơ Đồ Tư Duy (Mindmap): ${mm.central}\n\n`;
  function printNode(node, depth) {
    const indent = '  '.repeat(depth);
    out += `${indent}- **${node.topic}**\n`;
    if (node.children) {
      node.children.forEach(c => printNode(c, depth + 1));
    }
  }
  if (mm.leftBranches && mm.leftBranches.length > 0) {
    out += `#### Nhánh Trái (Left Branches - Ý tưởng mở rộng):\n`;
    mm.leftBranches.forEach(b => printNode(b, 0));
    out += '\n';
  }
  if (mm.rightBranches && mm.rightBranches.length > 0) {
    out += `#### Nhánh Phải (Right Branches - Ý tưởng mở rộng):\n`;
    mm.rightBranches.forEach(b => printNode(b, 0));
    out += '\n';
  }
  return out;
}

// Render vocab list to markdown
function renderGroupVocabMd(groupVocab) {
  let out = '';
  if (!groupVocab) return out;

  if (Array.isArray(groupVocab)) {
    if (groupVocab[0] && groupVocab[0].groupTitle) {
      groupVocab.forEach(cluster => {
        out += `#### ${cluster.groupTitle}\n\n`;
        out += `| Từ / Cụm từ | Phiên âm | Từ loại | Nghĩa tiếng Việt | Câu ví dụ minh họa |\n`;
        out += `| :--- | :--- | :--- | :--- | :--- |\n`;
        cluster.items.forEach(it => {
          let wordCol = `**${it.word}**`;
          if (it.subItems && it.subItems.length > 0) {
            wordCol += `<br>*(Bao gồm: ` + it.subItems.map(si => `${si.en}: ${si.vi}`).join(', ') + `)*`;
          }
          out += `| ${wordCol} | \`${it.ipa || ''}\` | *${it.pos || ''}* | ${cleanHtml(it.vi || '')} | "${cleanHtml(it.example || '')}" |\n`;
        });
        out += '\n';
      });
    } else {
      out += `| Từ / Cụm từ | Phiên âm | Từ loại | Nghĩa tiếng Việt | Câu ví dụ minh họa |\n`;
      out += `| :--- | :--- | :--- | :--- | :--- |\n`;
      groupVocab.forEach(it => {
        out += `| **${it.word}** | \`${it.ipa || ''}\` | *${it.pos || ''}* | ${cleanHtml(it.vi || '')} | "${cleanHtml(it.example || '')}" |\n`;
      });
      out += '\n';
    }
  }
  return out;
}

// Render questions to markdown
function renderSubtopicQuestionsMd(subtopic, subIdx) {
  let out = `### Subtopic ${subIdx}: ${subtopic.title}\n\n`;
  if (!subtopic.questions || subtopic.questions.length === 0) return out;

  subtopic.questions.forEach((qObj, qIdx) => {
    const qEn = qObj.q.en || qObj.q;
    const qVi = qObj.q.vi || '';

    out += `#### Câu hỏi ${qIdx + 1}: ${qEn}\n`;
    if (qVi) out += `> **Dịch đề:** *${qVi}*\n\n`;

    // Level B1
    out += `##### 🔹 LEVEL B1\n\n`;
    if (qObj.ideaMap && qObj.ideaMap.b1 && qObj.ideaMap.b1.length > 0) {
      out += `**IDEA MAP (B1):**\n`;
      qObj.ideaMap.b1.forEach(item => {
        out += `- ${cleanHtml(item)}\n`;
      });
      out += '\n';
    }
    const b1FullEn = qObj.b1.map(s => s.en).join(' ');
    const b1FullVi = qObj.b1.map(s => s.vi).join(' ');
    out += `**Sample Answer (B1):**\n> "${cleanHtml(b1FullEn)}"\n\n`;
    out += `*Dịch nghĩa tiếng Việt:*\n> *"${cleanHtml(b1FullVi)}"\n\n`;

    out += `*Chi tiết từng câu:*\n`;
    qObj.b1.forEach((s, sIdx) => {
      out += `${sIdx + 1}. **EN:** ${cleanHtml(s.en)}\n   **VI:** ${cleanHtml(s.vi)}\n`;
    });
    out += '\n';

    // Level B2
    out += `##### 🔸 LEVEL B2\n\n`;
    if (qObj.ideaMap && qObj.ideaMap.b2 && qObj.ideaMap.b2.length > 0) {
      out += `**IDEA MAP (B2):**\n`;
      qObj.ideaMap.b2.forEach(item => {
        out += `- ${cleanHtml(item)}\n`;
      });
      out += '\n';
    }
    const b2FullEn = qObj.b2.map(s => s.en).join(' ');
    const b2FullVi = qObj.b2.map(s => s.vi).join(' ');
    out += `**Sample Answer (B2):**\n> "${cleanHtml(b2FullEn)}"\n\n`;
    out += `*Dịch nghĩa tiếng Việt:*\n> *"${cleanHtml(b2FullVi)}"\n\n`;

    out += `*Chi tiết từng câu:*\n`;
    qObj.b2.forEach((s, sIdx) => {
      out += `${sIdx + 1}. **EN:** ${cleanHtml(s.en)}\n   **VI:** ${cleanHtml(s.vi)}\n`;
    });
    out += '\n---\n\n';
  });

  return out;
}

// Build the full document
function generateMarkdown() {
  const sub1_5 = g1.subtopics.find(s => s.id === 'sub1_5');
  const adjSections = parseAdjectives();
  const benefits = parseBenefits();

  let md = '';

  // HEADER & AI SYSTEM PROMPT
  md += `# VSTEP SPEAKING PART 1: KNOWLEDGE BASE & TEACHING METHODOLOGY
> **MỤC ĐÍCH TÀI LIỆU:**
> Tài liệu này đóng gói toàn bộ phương pháp giảng dạy, công thức phản xạ A-R-E, hệ thống từ vựng/cụm từ dùng chung, và ngân hàng câu trả lời mẫu chuẩn format VSTEP Speaking Part 1 (bao gồm 4 nhóm chủ đề trọng điểm: Travel, Health, Cooking, Food & Drinks).
>
> Khi đưa tài liệu này vào các mô hình AI (ChatGPT, Claude, Gemini, v.v.), AI cần tuân thủ triệt để vai trò là Giảng viên luyện thi VSTEP, tái sử dụng các cấu trúc/từ vựng được dạy trong tài liệu và áp dụng chính xác công thức trả lời cho các câu hỏi mới.

---

## PHẦN 1: AI SYSTEM PROMPT & HƯỚNG DẪN DÀNH CHO AI (SYSTEM INSTRUCTIONS)

Khi người dùng gửi câu hỏi mới hoặc yêu cầu tạo câu trả lời Speaking Part 1, AI hãy tuân theo các chỉ dẫn sau:

### 1. Vai trò (Role)
Bạn là **Giảng viên chuyên luyện thi VSTEP Speaking Part 1**. Phong cách trả lời của bạn:
- **Tự nhiên, phản xạ nói thực tế (Spoken English)**: Sử dụng ngôn từ đàm thoại hàng ngày, mạch lạc, không máy móc và không dùng từ vựng hàn lâm khiên cưỡng kiểu bài viết học thuật.
- **Độ dài chuẩn phòng thi**: Mỗi câu trả lời kéo dài từ **3 đến 5 câu** (tương đương 30 - 45 giây nói).
- **Phân tách rõ ràng 2 trình độ (B1 và B2)**:
  - **Level B1**: Đi thẳng vào vấn đề, câu ngắn gọn, cấu trúc ngữ pháp cơ bản (câu đơn, câu ghép với *and, but, so, because*), hoàn thành tốt 2 bước **Answer (A) + Reason (R)**.
  - **Level B2**: Mở đầu tự nhiên bằng các cụm đệm (discourse markers) như *Personally speaking, To be honest, Actually, Well, in my view...*, câu phức chắc tay (mệnh đề quan hệ, điều kiện, liên từ nâng cao), mở rộng tự nhiên bằng ví dụ, tần suất, cảm nhận cá nhân, hoàn thành chuẩn **Answer (A) + Reason (R) + Expansion (E)**.
- **Tái sử dụng tài nguyên trong tài liệu**: Ưu tiên tái sử dụng các cụm tính từ (Adjectives Framework), các cấu trúc kể lợi ích (Benefits Framework), và các cách diễn đạt suy nghĩ/thói quen (Shared Expressions) đã được định nghĩa trong tài liệu này.

### 2. Quy trình 4 bước trả lời (4-Step Workflow)
1. **Bước 1: Nhìn tín hiệu**: Nhận diện dạng câu hỏi (Yes/No, Choice A/B, hay Wh-questions).
2. **Bước 2: Chốt ý chính (Answer - A)**: Trả lời trực tiếp ngay câu đầu tiên, không chào hỏi dài dòng.
3. **Bước 3: Thêm lý do (Reason - R)**: Giải thích ngắn gọn nguyên nhân vì sao (*because, since, the main reason is that...*).
4. **Bước 4: Mở rộng tự nhiên (Expansion - E)**: Bổ sung tần suất, ví dụ cá nhân, thời gian hoặc trải nghiệm thực tế.

### 3. Cấu trúc đầu ra chuẩn (Standard Output Format) khi AI trả lời câu hỏi mới
Mỗi khi nhận một câu hỏi VSTEP Speaking Part 1, AI cần phản hồi theo mẫu chuẩn sau:

\`\`\`markdown
### Câu hỏi: [English Question]
> **Dịch nghĩa:** [Vietnamese Translation]

#### 🔹 LEVEL B1
- **IDEA MAP (B1):**
  - [Ý 1: Trả lời trực tiếp]
  - [Ý 2: Lý do đơn giản]
  - [Ý 3: Chi tiết phụ / ví dụ ngắn]
- **Sample Answer (B1):** "[Đoạn câu trả lời tiếng Anh hoàn chỉnh 3-4 câu]"
- **Dịch nghĩa tiếng Việt:** "[Bản dịch nghĩa tiếng Việt hoàn chỉnh]"
- **Chi tiết từng câu:**
  1. EN: ... | VI: ...
  2. EN: ... | VI: ...
  3. EN: ... | VI: ...

#### 🔸 LEVEL B2
- **IDEA MAP (B2):**
  - [Ý 1: Từ nối tự nhiên + Trả lời trực tiếp có quan điểm]
  - [Ý 2: Lý do nâng cao / cụm từ đắt giá]
  - [Ý 3: Mở rộng bằng trải nghiệm, tần suất hoặc ví dụ cụ thể]
- **Sample Answer (B2):** "[Đoạn câu trả lời tiếng Anh hoàn chỉnh 4-5 câu giàu collocation]"
- **Dịch nghĩa tiếng Việt:** "[Bản dịch nghĩa tiếng Việt hoàn chỉnh]"
- **Chi tiết từng câu:**
  1. EN: ... | VI: ...
  2. EN: ... | VI: ...
  3. EN: ... | VI: ...
  4. EN: ... | VI: ...

#### 💡 Cấu trúc & Từ vựng nổi bật:
- [Từ/Cụm từ 1]: Nghĩa & cách dùng
- [Từ/Cụm từ 2]: Nghĩa & cách dùng
\`\`\`

---

## PHẦN 2: LÝ THUYẾT CHUNG VSTEP SPEAKING PART 1

### 1. Thông tin kỳ thi (Exam Facts)
- **Cấu trúc phần thi**: Gồm 2 chủ đề (topics), mỗi chủ đề có 3 câu hỏi ngắn (tổng cộng 6 câu hỏi).
- **Thời gian**: Khoảng 3 phút cho toàn bộ Part 1. Thí sinh bắt đầu nói ngay khi câu hỏi xuất hiện trên màn hình máy tính.
- **Mục tiêu câu trả lời**: 3-5 câu mỗi câu hỏi. Đây là mốc an toàn và tối ưu nhất để đạt B2.
- **6 Tiêu chí chấm điểm**:
  1. **Đúng trọng tâm**: Câu đầu tiên trả lời trực tiếp điều đề hỏi, không vòng vo.
  2. **Có phát triển ý**: Có lý do (Reason) và mở rộng (Expansion/Example).
  3. **Phát âm rõ ràng**: Phát âm từ khóa chuẩn xác, rõ âm đuôi, ngữ điệu tự nhiên.
  4. **Câu có liên kết**: Dùng từ nối linh hoạt (*because, besides, for example, personally, actually*).
  5. **Độ trôi chảy (Fluency)**: Giữ nhịp nói đều đặn, tránh ngập ngừng quá lâu; nếu bí ý thì dùng câu ngắn.
  6. **Ngữ pháp ổn định**: Ưu tiên ngữ pháp chuẩn xác, kết hợp khéo léo câu đơn và câu ghép/phức.

### 2. Ba dạng câu hỏi thường gặp & Khung phản xạ

#### Dạng 1: Câu hỏi Yes - No
- **Tín hiệu nhận biết**: Câu hỏi bắt đầu bằng Trợ động từ (*do, does, did, will, have, has*), Động từ to be (*is, are, was, were*), hoặc Động từ khiếm khuyết (*can, could, should, would*).
- **Khung trả lời**:
  - *Bước 1*: Nói rõ Yes hoặc No đồng thời nêu quan điểm cá nhân.
  - *Bước 2*: Đưa ra lý do giải thích.
  - *Bước 3*: Mở rộng thêm chi tiết (ví dụ, tần suất, cảm nhận).
- **Ví dụ phân loại**:
  - **Trợ động từ (Auxiliary)**:
    - *Do you like cooking?* (Bạn có thích nấu ăn không?)
    - *Do you think emails will replace letters?* (Bạn có nghĩ rằng thư điện tử sẽ thay thế thư tay không?)
    - *Did you have many friends when you were a child?* (Bạn có nhiều bạn bè khi còn nhỏ không?)
    - *Have you ever travelled by plane?* (Bạn đã từng đi du lịch bằng máy bay chưa?)
  - **Động từ To be**:
    - *Are you a family person?* (Bạn có phải là người của gia đình không?)
    - *Are you good at saving money?* (Bạn có giỏi tiết kiệm tiền không?)
    - *Are there many advertisements in your country?* (Có nhiều quảng cáo ở đất nước của bạn không?)
    - *Is it important to keep up with the news?* (Việc cập nhật tin tức có quan trọng không?)
  - **Động từ khiếm khuyết (Modal verbs)**:
    - *Can you access the Internet from where you work?* (Bạn có thể truy cập Internet từ nơi làm việc không?)
    - *Should children be punished when they make mistakes?* (Trẻ em có nên bị phạt khi chúng phạm lỗi không?)
    - *Can you share some experiences or tips from your dating life?* (Bạn có thể chia sẻ một vài kinh nghiệm trong chuyện hẹn hò không?)
    - *Would you like to change anything in your room?* (Bạn có muốn thay đổi thứ gì trong phòng của mình không?)

#### Dạng 2: Câu hỏi Lựa chọn (Choice Questions - Chọn 1 trong 2)
- **Tín hiệu nhận biết**: Chứa liên từ **or**.
- **Các mẫu câu hỏi thường gặp**:
  1. \`Do you prefer A or B?\`
  2. \`Would you prefer A or B?\`
  3. \`Which do you prefer: A or B?\`
  4. \`Which do you enjoy more, A or B?\`
- **Khung trả lời**:
  - *Bước 1*: Đưa ra lựa chọn dứt khoát (\`I prefer A...\`, \`Personally, I would go for A...\`).
  - *Bước 2*: Đưa ra lý do vì sao chọn A (hoặc vì sao không thích B bằng).
  - *Bước 3*: Mở rộng trải nghiệm, thói quen hoặc tần suất.
- **Ví dụ minh họa**:
  - *Do you prefer watching films at home or in the cinema?* (Bạn thích xem phim ở nhà hay ở rạp chiếu phim hơn?)
  - *Do you prefer reading online or printed materials?* (Bạn thích đọc tài liệu trực tuyến hay tài liệu in hơn?)
  - *Which do you prefer: letters or emails?* (Bạn thích cái nào hơn: thư tay hay thư điện tử?)
  - *Would you prefer to travel alone or with someone else?* (Bạn thích đi du lịch một mình hay đi cùng người khác hơn?)

#### Dạng 3: Câu hỏi Lấy thông tin chi tiết (Wh-Questions)
- **Tín hiệu nhận biết**: Bắt đầu bằng từ để hỏi (Wh-word):
  - **What**: cái gì / điều gì
  - **Which**: cái nào
  - **Where**: ở đâu
  - **When**: khi nào
  - **Why**: tại sao
  - **Who**: ai
  - **How**: như thế nào / bằng cách nào
  - **How often**: tần suất như thế nào
  - **How much / How many**: bao nhiêu
- **5 Cấu trúc ngữ pháp câu hỏi Wh**:
  1. \`Wh + tobe + S + ...?\` (VD: What is your favorite dish?)
  2. \`Wh + tobe + S + V-ing + ...?\` (VD: Where are you planning to go?)
  3. \`Wh + tobe + S + V3/ed + ...?\` (VD: When was this festival celebrated?)
  4. \`Wh + trợ động từ (do/does/did) + S + Vo + ...?\` (VD: What do you often buy at the market?)
  5. \`Wh + khiếm khuyết (can/should/would) + S + Vo + ...?\` (VD: How can you save money?)
- **Ví dụ minh họa**:
  - *What did you often do when you were a child?* (Bạn thường làm gì khi còn là một đứa trẻ?)
  - *What do you often buy at the market?* (Bạn thường mua gì ở chợ?)
  - *What gameshow do you often watch?* (Chương trình truyền hình nào bạn thường xem?)
  - *In the future, which type of school do you think will become more common?* (Trong tương lai, loại hình trường học nào bạn nghĩ sẽ trở nên phổ biến hơn?)
  - *Where do you often go for a walk?* (Bạn thường đi dạo ở đâu?)
  - *When do people in your country often decorate their homes?* (Khi nào người dân ở đất nước bạn thường trang trí nhà cửa?)
  - *Who is the most talkative person in your family?* (Ai là người nói nhiều nhất trong gia đình bạn?)
  - *Why do children learn things more quickly than adults?* (Tại sao trẻ em học hỏi mọi thứ nhanh hơn người lớn?)
  - *How do you save money?* (Bạn tiết kiệm tiền bằng cách nào?)
  - *How much time do you spend on your hobby?* (Bạn dành bao nhiêu thời gian cho sở thích của mình?)
  - *How do you travel to work?* (Bạn đi làm bằng phương tiện gì?)
  - *How often do you donate money or do charity work?* (Bạn có thường quyên góp tiền hoặc làm từ thiện không?)

### 3. Công thức A-R-E (Answer - Reason - Expansion)
Đây là "xương sống" cho mọi câu trả lời VSTEP Speaking Part 1:
- **A - Answer (B1)**: Trả lời trực tiếp trọng tâm câu hỏi.
  - Yes-No: Nói Yes/No + nêu quan điểm.
  - Lựa chọn: \`I prefer + N/V-ing\`.
  - Wh-question: Cung cấp ngay thông tin được hỏi.
- **R - Reason (B2)**: Giải thích lý do vì sao.
  - Sử dụng: \`because / since + clause\`, \`This is because + clause\`, \`The main reason is that + clause\`.
- **E - Expansion (B2+)**: Mở rộng tự nhiên.
  - Thêm ví dụ cá nhân (\`For instance, ...\`).
  - Nói về tần suất, thời gian, nơi chốn (\`Usually, on weekends, ...\`).
  - Kết nối sang trải nghiệm thật (\`Whenever I have free time, ...\`).

**Ví dụ ứng dụng A-R-E**:
- *Câu hỏi*: Do you prefer watching films at home or in the cinema?
- *Câu trả lời mẫu*:
  > **[A]** I prefer watching films at home **[R]** because it is more comfortable and affordable. **[E]** I can pause the movie whenever I want, and I usually watch films with my family on weekends.

---

## PHẦN 3: KHO CÔNG CỤ DÙNG CHUNG (SHARED TOOLKIT)

### 1. Cấu trúc & Cách diễn đạt dùng chung (Shared Expressions)
`;

  // Expressions from sub1_5
  if (sub1_5 && sub1_5.expressions) {
    sub1_5.expressions.forEach((group, gIdx) => {
      md += `#### ${gIdx + 1}. ${group.groupTitle}\n\n`;
      md += `| Cấu trúc tiếng Anh | Nghĩa tiếng Việt | Câu ví dụ minh họa |\n`;
      md += `| :--- | :--- | :--- |\n`;
      group.items.forEach(it => {
        md += `| **${cleanHtml(it.en)}** | ${cleanHtml(it.vi)} | "${cleanHtml(it.example)}" |\n`;
      });
      md += '\n';
    });
  }

  // Adjectives Framework
  md += `### 2. Hệ thống tính từ đa dụng (Adjectives Framework)\n\n`;
  md += `#### Cách sử dụng tính từ trong câu:\n`;
  md += `1. **I feel + tính từ** *(miêu tả cảm xúc bản thân)*: \`"I feel relaxed."\`\n`;
  md += `2. **It makes me feel + tính từ** *(miêu tả tác động đến cảm xúc)*: \`"It makes me feel happy."\`\n`;
  md += `3. **It's / I find it + tính từ** *(miêu tả sự vật, sự việc)*: \`"It's beautiful."\` / \`"I find it interesting."\`\n`;
  md += `4. **It's + tính từ + for [ai đó] + to [làm gì đó]** *(tính chất của việc gì)*: \`"It's easy for me to learn English."\`\n\n`;

  md += `#### 3 Lưu ý quan trọng khi dùng tính từ:\n`;
  md += `- **Lưu ý 1 (Trạng từ chỉ mức độ)**: Thêm \`very, really, quite, a bit, extremely\` trước tính từ để câu nói tự nhiên hơn. *(VD: "It's really comfortable.")*\n`;
  md += `- **Lưu ý 2 (So sánh hơn)**: \`more + adj\` hoặc \`adj-er\` mang nghĩa *"... hơn"*. *(VD: "It's more affordable." / "It's easier.")*\n`;
  md += `- **Lưu ý 3 (So sánh nhất)**: \`the most + adj\` mang nghĩa *"... nhất"*. *(VD: "It's the most memorable experience.")*\n\n`;

  md += `#### Kho tính từ theo 5 nhóm chủ đề:\n\n`;
  adjSections.forEach(sec => {
    md += `##### ${sec.title}\n\n`;
    sec.cats.forEach(c => {
      md += `**${c.catName}:**\n`;
      const adjList = c.adjs.map(a => `\`${a.word}\` (${a.vi})`).join(' • ');
      md += `${adjList}\n\n`;
    });
  });

  // Benefits Framework
  md += `### 3. Khung kể lợi ích (Benefits Framework)\n\n`;
  md += `#### 4 Cấu trúc câu diễn đạt lợi ích:\n`;
  benefits.structures.forEach((st, idx) => {
    md += `${idx + 1}. **${st.en}** = *${st.vi}*\n`;
  });
  md += '\n';

  md += `#### Các cụm từ chỉ lợi ích phân theo cấp độ B1 & B2:\n\n`;

  md += `##### 🔹 LEVEL B1\n`;
  md += `- **Tinh thần (Mental)**: ` + benefits.b1Phrases.mental.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';
  md += `- **Kiến thức (Knowledge)**: ` + benefits.b1Phrases.knowledge.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';
  md += `- **Sức khỏe (Health)**: ` + benefits.b1Phrases.health.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';

  md += `##### 🔸 LEVEL B2\n`;
  md += `- **Tinh thần (Mental)**: ` + benefits.b2Phrases.mental.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';
  md += `- **Kiến thức (Knowledge)**: ` + benefits.b2Phrases.knowledge.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';
  md += `- **Sức khỏe (Health)**: ` + benefits.b2Phrases.health.map(p => `\`${p.en}\` (${p.vi})`).join(' • ') + '\n\n';

  md += `---\n\n`;

  // CORE TOPICS
  const coreGroups = [
    { group: g3, label: "CHỦ ĐỀ 1: DU LỊCH (TRAVEL 🧭)" },
    { group: g4, label: "CHỦ ĐỀ 2: SỨC KHỎE (HEALTH 💪)" },
    { group: g5, label: "CHỦ ĐỀ 3: NẤU ĂN (COOKING 🍳)" },
    { group: g6, label: "CHỦ ĐỀ 4: ẨM THỰC & ĐỒ UỐNG (FOOD & DRINKS 🍵)" }
  ];

  coreGroups.forEach((cg, cgIdx) => {
    const g = cg.group;
    md += `## PHẦN ${cgIdx + 4}: ${cg.label}\n\n`;
    md += `> **Mô tả chủ đề:** ${g.description || ''}\n\n`;

    // Mindmap if exists
    if (g.mindmap) {
      md += renderMindmapMd(g.mindmap);
    }

    // General structures if exists
    if (g.generalStructures && g.generalStructures.length > 0) {
      md += `### Cấu trúc câu đặc trưng cho chủ đề:\n\n`;
      g.generalStructures.forEach((st, sIdx) => {
        md += `${sIdx + 1}. **EN:** \`${cleanHtml(st.en)}\`\n`;
        md += `   **VI:** *${cleanHtml(st.vi)}*\n`;
        md += `   **Ví dụ:** "${cleanHtml(st.example)}"\n\n`;
      });
    }

    // Vocabulary
    if (g.groupVocabulary) {
      md += `### Từ Vựng Chủ Đề (Topic Vocabulary)\n\n`;
      md += renderGroupVocabMd(g.groupVocabulary);
    }

    // Subtopics and questions
    if (g.subtopics && g.subtopics.length > 0) {
      md += `### Ngân Hàng Câu Hỏi & Câu Trả Lời Mẫu Chi Tiết\n\n`;
      g.subtopics.forEach((sub, sIdx) => {
        md += renderSubtopicQuestionsMd(sub, sIdx + 1);
      });
    }

    md += `\n---\n\n`;
  });

  // FINAL USER PROMPT TEMPLATE
  md += `## PHẦN 8: HƯỚNG DẪN & MẪU CÂU LỆNH KHI SỬ DỤNG VỚI AI (USER PROMPT TEMPLATE)

Khi bạn muốn AI tạo câu trả lời cho các chủ đề hoặc câu hỏi mới trong tương lai mà vẫn giữ nguyên phong cách dạy, từ vựng và cấu trúc của tài liệu này, hãy làm theo các bước sau:

### 1. Cách tải lên AI
- **Đối với Claude / ChatGPT Plus / Gemini Advanced**: Tải trực tiếp file \`VSTEP_SPEAKING_PART1_KNOWLEDGE_BASE.md\` vào khung chat dưới dạng tệp đính kèm.
- **Đối với các mô hình chỉ nhận text**: Sao chép nội dung file (hoặc Phần 1, 2, 3 cùng chủ đề liên quan) và dán vào cửa sổ chat.

### 2. Mẫu Prompt sẵn sàng sao chép (Copy & Paste):

\`\`\`text
Bạn hãy đóng vai trò là Giảng viên chuyên luyện thi VSTEP Speaking Part 1, tuân thủ triệt để phương pháp giảng dạy, công thức phản xạ A-R-E, khung tính từ (Adjectives Framework), khung lợi ích (Benefits Framework) và hệ thống từ vựng/cấu trúc dùng chung trong tài liệu đính kèm.

Hãy tạo câu trả lời cho câu hỏi Speaking Part 1 sau:
"[Nhập câu hỏi của bạn vào đây - Ví dụ: Do you prefer reading books or watching movies?]"

Yêu cầu định dạng đầu ra chuẩn xác:
1. Dịch nghĩa câu hỏi sang tiếng Việt.
2. LEVEL B1:
   - IDEA MAP (B1): 2-3 gạch đầu dòng ý tưởng chính.
   - Sample Answer (B1): 3-4 câu tiếng Anh ngắn gọn, rõ ràng, đạt chuẩn Answer (A) + Reason (R).
   - Dịch nghĩa tiếng Việt: Đoạn văn hoàn chỉnh và dịch nghĩa chi tiết từng câu.
3. LEVEL B2:
   - IDEA MAP (B2): 3-4 gạch đầu dòng ý tưởng phát triển sâu hơn.
   - Sample Answer (B2): 4-5 câu tiếng Anh tự nhiên, mở đầu bằng discourse marker phù hợp (To be honest, Personally speaking, Actually...), dùng từ vựng/collocations đắt giá từ tài liệu, đạt chuẩn Answer (A) + Reason (R) + Expansion (E).
   - Dịch nghĩa tiếng Việt: Đoạn văn hoàn chỉnh và dịch nghĩa chi tiết từng câu.
4. Cấu trúc & Từ vựng nổi bật: Liệt kê các cụm từ, collocations hoặc cấu trúc đã tái sử dụng từ tài liệu.
\`\`\`
`;

  return md;
}

const finalMarkdown = generateMarkdown();
const outputPath = path.join(projectRoot, 'VSTEP_SPEAKING_PART1_KNOWLEDGE_BASE.md');
fs.writeFileSync(outputPath, finalMarkdown, 'utf8');

console.log('Successfully generated knowledge base at:', outputPath);
console.log('Total characters:', finalMarkdown.length);
console.log('Total lines:', finalMarkdown.split('\n').length);
