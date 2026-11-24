// ==========================================================================
// SPEAKING PART 2 — SOLUTION DISCUSSION (CHỌN YẾU TỐ TỐT NHẤT & CHỌN THỂ LOẠI)
// - Khung dàn ý 3 phần dùng chung cho tất cả các dạng đề Part 2 (B1 & B2)
// - Chỉ lấy đề từ bộ câu hỏi gốc; toàn bộ dàn ý, bài mẫu B1/B2 và từ vựng được
//   biên soạn mới theo văn nói giao tiếp tự nhiên, gần gũi đời thực.
// ==========================================================================

window.SPEAKING_PART2_OUTLINE = {
  title: "Khung dàn ý chung Speaking Part 2 (Áp dụng cho mọi đề)",
  subtitle:
    "Cấu trúc 3 phần rõ ràng, dễ thuộc, ghép linh hoạt vào cả 9 dạng tình huống (chọn quà, hoạt động, địa điểm, phương tiện, giải pháp, hình thức, nghề nghiệp, thể loại, yếu tố tốt nhất).",
  timingNote: "Thời gian thi thật: 1 phút chuẩn bị + 2–3 phút nói (tại đây ghi âm tối đa 3:00).",
  levels: {
    b1: {
      badge: "Khung sườn B1 (Tự nhiên · Dễ nhớ)",
      wordTarget: "~115–138 từ (55–70 giây nói trôi chảy)",
      parts: [
        {
          step: "1. Mở bài",
          goal: "Dẫn nhập vào tình huống & đưa ra lựa chọn",
          templateHtml:
            "“<strong>Well,</strong> [nhắc lại ngắn gọn tình huống bằng 1 câu đơn]. <strong>Among the three options, I think</strong> [Phương án chọn] <strong>is the best choice</strong> (for me / her / him / them).”",
          note: "Không cần chép lại dài dòng cả đề bài. Chỉ cần nêu gọn bối cảnh + chốt ngay lựa chọn."
        },
        {
          step: "2. Thân bài",
          goal: "Nêu 2 lý do chọn + giải thích tại sao không chọn 2 phương án còn lại",
          templateHtml:
            "“<strong>First,</strong> [lý do thực tế 1]. <strong>For example,</strong> [ví dụ gần gũi].<br/><strong>Second,</strong> [lý do thực tế 2]. <strong>So,</strong> [lợi ích dễ thấy].<br/><strong>On the other hand, I don't choose</strong> [Phương án B] <strong>because</strong> [lý do ngắn gọn]. <strong>Also,</strong> [Phương án C] <strong>is not suitable because</strong> [lý do ngắn gọn].”",
          note: "Mỗi ý đi kèm 1 ví dụ hoặc kết quả đời thường (tiết kiệm tiền, đỡ áp lực, tiện đi lại, vui hơn...)."
        },
        {
          step: "3. Kết bài",
          goal: "Khẳng định lại lựa chọn lần nữa",
          templateHtml:
            "“<strong>For these reasons, I believe</strong> [Phương án chọn] <strong>is the best option in this situation.</strong>”",
          note: "Ngắn gọn, dứt khoát để kết thúc bài nói trọn vẹn."
        }
      ]
    },
    b2: {
      badge: "Khung sườn B2 (Mạch lạc · Từ vựng nâng cấp)",
      wordTarget: "~155–190 từ (75–95 giây nói tự nhiên)",
      parts: [
        {
          step: "1. Mở bài",
          goal: "Dẫn nhập tự nhiên & chốt phương án ưu tiên",
          templateHtml:
            "“<strong>Well, considering the situation where</strong> [dẫn nhập tình huống tự nhiên], <strong>I'd definitely go for</strong> [Phương án chọn] <strong>out of the three options.</strong>”",
          note: "Giữ giọng điệu tự nhiên như đang khuyên bạn bè hoặc đồng nghiệp."
        },
        {
          step: "2. Thân bài",
          goal: "Phát triển 2 lý do chọn + phản biện khéo 2 phương án còn lại",
          templateHtml:
            "“<strong>The main reason is that</strong> [ý chính 1 với cụm B2 tự nhiên]. <strong>For instance,</strong> [ví dụ đời thực], <strong>which</strong> [lợi ích trực tiếp].<br/><strong>On top of that,</strong> [ý chính 2 nâng cấp từ vựng]. <strong>As a result,</strong> [tác động thiết thực].<br/><strong>Regarding the other two options, I wouldn't pick</strong> [Phương án B] <strong>because</strong> [lý do hợp lý]. <strong>As for</strong> [Phương án C], <strong>although</strong> [ghi nhận ngắn mặt tốt], [lý do chưa phù hợp bằng].”",
          note: "Giữ nguyên ý thực tế như B1 nhưng dùng cụm từ nối (which, although, on top of that, as a result) và collocation tự nhiên."
        },
        {
          step: "3. Kết bài",
          goal: "Khẳng định lại lựa chọn một cách thuyết phục",
          templateHtml:
            "“<strong>All in all,</strong> [Phương án chọn] <strong>is definitely the most practical and suitable choice here.</strong>”",
          note: "Chốt lại tính thực tế và phù hợp của phương án bạn chọn."
        }
      ]
    }
  }
};

window.SPEAKING_PART2_TOPICS = [
  // ==========================================================================
  // DẠNG 1: CHỌN YẾU TỐ TỐT NHẤT (BEST FACTOR) — 3 TÌNH HUỐNG
  // ==========================================================================
  {
    part: "part2",
    id: "part2-best-factor",
    number: "01",
    title: "Choosing the Best Factor",
    titleVi: "Chọn yếu tố / phẩm chất tốt nhất",
    description:
      "Luyện 3 tình huống chọn yếu tố quan trọng nhất khi chọn trường đại học và phẩm chất quan trọng nhất khi tuyển nhân viên mới.",
    questionsCount: 3,
    questions: [
      {
        part: "part2",
        id: "p2_factor_q1",
        num: 1,
        situationTitle: "Choosing a university (ranking, distance, tuition fees)",
        prompt:
          "Your younger sister has just finished high school and is planning to study at a university. She wants to choose a university that provides high-quality education. There are three factors she should consider: the university’s ranking, the distance from her home, and the tuition fees. Which one do you think is the best choice for her?",
        promptHtml:
          "Your younger sister has just finished high school and is planning to study at a university. She wants to choose a university that provides high-quality education. There are three factors she should consider: <strong>the university’s ranking</strong>, <strong>the distance from her home</strong>, and <strong>the tuition fees</strong>. Which one do you think is the best choice for her?",
        promptVi:
          "Em gái bạn vừa tốt nghiệp cấp 3 và đang dự định học đại học. Em ấy muốn chọn một trường có chất lượng giáo dục cao. Có ba yếu tố để cân nhắc: thứ hạng của trường đại học, khoảng cách từ nhà và học phí. Theo bạn yếu tố nào là lựa chọn tốt nhất cho em ấy?",
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 yếu tố: university's ranking / distance from her home / tuition fees).",
          tense: "Hiện tại đơn và động từ khuyết thiếu (can / would / should) để đưa lời khuyên. Triển khai theo khung 3 phần: Mở bài → Thân bài (2 lý do chọn + lý do bỏ 2 phương án còn lại) → Kết bài.",
          length: "B1: ~115–138 từ (55–70s) · B2: ~155–185 từ (75–90s)."
        },
        pitfalls: [
          "Chỉ nói mỗi lý do chọn mà quên giải thích tại sao không chọn 2 yếu tố còn lại (khoảng cách & học phí).",
          "Chọn yếu tố không ăn khớp với mục tiêu đề bài ('high-quality education'): nói về ranking sẽ thuyết phục và dễ liên hệ giáo viên, cơ sở vật chất, việc làm nhất.",
          "Lặp đi lặp lại cụm 'very good' cho cả giáo viên, phòng học lẫn việc làm; nên thay bằng useful lessons, modern library, good job."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "Giới thiệu ngắn tình huống em gái sắp vào đại học và chốt chọn 'the university's ranking'."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Loại 2 phương án còn lại)",
                text: "Lý do 1: Trường thứ hạng cao có thầy cô giỏi, thư viện hiện đại giúp học tốt. Lý do 2: Dễ tìm việc tốt sau tốt nghiệp vì công ty tin tưởng bằng cấp. Bỏ distance (có thể ở ký túc xá / thuê phòng gần trường và đi xe buýt) và bỏ tuition fees (học phí quan trọng nhưng giáo dục tốt rất xứng đáng, có thể xin học bổng)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt lại bằng câu khẳng định 'the university's ranking' là lựa chọn tốt nhất."
              }
            ],
            modelAnswer:
              "<strong>Well,</strong> my younger sister just finished high school and wants to find a good university. <strong>Among the three options, I think</strong> <strong>the university's ranking</strong> <strong>is the best choice</strong> for her.<br><br><strong>First,</strong> a top university usually has good teachers and modern classrooms. <strong>For example,</strong> my sister can study in a big library and learn useful lessons, so she can study effectively. <strong>Second,</strong> a good ranking helps her find a good job after graduation. Many companies trust students from famous schools because they have strong skills. <strong>On the other hand, I don't choose</strong> <strong>the distance from her home</strong> <strong>because</strong> she can stay in a dormitory or rent a room nearby and take the bus. <strong>Also,</strong> <strong>the tuition fees</strong> <strong>are not suitable as</strong> the main factor because she can apply for scholarships to save money.<br><br><strong>For these reasons, I believe</strong> <strong>the university's ranking</strong> <strong>is the best option in this situation.</strong>",
            vocab: [
              {
                word: "university's ranking",
                ipa: "/ˌjuːnɪˈvɜːrsətiz ˈræŋkɪŋ/",
                pos: "n. phr.",
                meaning: "thứ hạng của trường đại học",
                example: "Among the three options, I think the <strong>university's ranking</strong> is the best choice."
              },
              {
                word: "modern classrooms",
                ipa: "/ˈmɑːdərn ˈklæsruːmz/",
                pos: "n. phr.",
                meaning: "phòng học hiện đại",
                example: "A top university usually has good teachers and <strong>modern classrooms</strong>."
              },
              {
                word: "study effectively",
                ipa: "/ˈstʌdi ɪˈfektɪvli/",
                pos: "v. phr.",
                meaning: "học tập hiệu quả",
                example: "She can learn useful lessons, so she can <strong>study effectively</strong>."
              },
              {
                word: "after graduation",
                ipa: "/ˈæftər ˌɡrædʒuˈeɪʃn/",
                pos: "prep. phr.",
                meaning: "sau khi tốt nghiệp",
                example: "A good ranking helps her find a good job <strong>after graduation</strong>."
              },
              {
                word: "dormitory",
                ipa: "/ˈdɔːrmətɔːri/",
                pos: "n.",
                meaning: "ký túc xá",
                example: "She can stay in a <strong>dormitory</strong> or rent a room nearby."
              },
              {
                word: "rent a room",
                ipa: "/rent ə ruːm/",
                pos: "v. phr.",
                meaning: "thuê phòng trọ",
                example: "Students often <strong>rent a room</strong> near their university."
              },
              {
                word: "apply for scholarships",
                ipa: "/əˈplaɪ fɔːr ˈskɑːlərʃɪps/",
                pos: "v. phr.",
                meaning: "nộp đơn xin học bổng",
                example: "She can <strong>apply for scholarships</strong> to save money."
              },
              {
                word: "save money",
                ipa: "/seɪv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm tiền",
                example: "Scholarships and part-time jobs help students <strong>save money</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập tự nhiên & Chọn phương án)",
                text: "Mở bài bằng 'Well, considering the situation where my younger sister...' và chọn 'the university's ranking' bằng 'I'd definitely go for'."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp từ vựng + Phản biện 2 lựa chọn kia)",
                text: "Lý do 1: Thứ hạng cao đi kèm giảng viên giàu kinh nghiệm (experienced lecturers) và chương trình bài bản (well-structured curriculum), giúp phát triển kỹ năng thực tế (which helps...). Lý do 2: Trường danh tiếng (reputable university) mở rộng cơ hội nghề nghiệp (career opportunities). Bỏ distance (có thể ở ký túc xá hoặc đi buýt) và bỏ tuition fees (tuy học phí quan trọng nhưng nền giáo dục tốt rất đáng đầu tư lâu dài)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt lại bằng 'All in all, the university's ranking is definitely the most practical and suitable choice here.'"
              }
            ],
            modelAnswer:
              "<strong>Well, considering the situation where</strong> my younger sister wants a university with high-quality education, <strong>I'd definitely go for</strong> <strong>the university's ranking</strong> <strong>out of the three options.</strong><br><br><strong>The main reason is that</strong> a high-ranking university usually offers experienced lecturers and a <strong>well-structured curriculum</strong>. <strong>For instance,</strong> she can study with modern facilities and learn practical skills, <strong>which</strong> boosts her academic performance. <strong>On top of that,</strong> graduating from a <strong>reputable</strong> university brings better career opportunities. <strong>As a result,</strong> employers are more willing to hire her and offer meaningful work right after graduation. <strong>Regarding the other two options, I wouldn't pick</strong> <strong>the distance from her home</strong> <strong>because</strong> even if the campus is far away, she can live in a dormitory or commute by bus. <strong>As for</strong> <strong>the tuition fees</strong>, <strong>although</strong> money matters a lot, she can apply for scholarships or work part-time, and quality education pays off in the long run.<br><br><strong>All in all,</strong> <strong>the university's ranking</strong> <strong>is definitely the most practical and suitable choice here.</strong>",
            vocab: [
              {
                word: "go for",
                ipa: "/ɡoʊ fɔːr/",
                pos: "v. phr.",
                meaning: "chọn, ưu tiên lựa chọn",
                example: "I'd definitely <strong>go for</strong> the university's ranking out of the three options."
              },
              {
                word: "experienced lecturers",
                ipa: "/ɪkˈspɪriənst ˈlektʃərərz/",
                pos: "n. phr.",
                meaning: "giảng viên giàu kinh nghiệm",
                example: "A top university usually offers <strong>experienced lecturers</strong>."
              },
              {
                word: "well-structured curriculum",
                ipa: "/wel ˈstrʌktʃərd kəˈrɪkjələm/",
                pos: "n. phr.",
                meaning: "chương trình học được thiết kế bài bản",
                example: "Students benefit from a <strong>well-structured curriculum</strong> and modern facilities."
              },
              {
                word: "reputable",
                ipa: "/ˈrepjətəbl/",
                pos: "adj.",
                meaning: "có danh tiếng tốt, uy tín",
                example: "Graduating from a <strong>reputable</strong> university brings better career opportunities."
              },
              {
                word: "career opportunities",
                ipa: "/kəˈrɪr ˌɑːpərˈtuːnətiz/",
                pos: "n. phr.",
                meaning: "cơ hội nghề nghiệp",
                example: "Good skills open up more <strong>career opportunities</strong> after graduation."
              },
              {
                word: "meaningful",
                ipa: "/ˈmiːnɪŋfl/",
                pos: "adj.",
                meaning: "ý nghĩa, giá trị",
                example: "Employers offer <strong>meaningful</strong> work to well-trained graduates."
              },
              {
                word: "commute",
                ipa: "/kəˈmjuːt/",
                pos: "v.",
                meaning: "đi lại hằng ngày (tới trường/nơi làm)",
                example: "She can stay in a dormitory or <strong>commute</strong> by bus."
              },
              {
                word: "pays off in the long run",
                ipa: "/peɪz ɔːf ɪn ðə lɔːŋ rʌn/",
                pos: "idiom",
                meaning: "mang lại trái ngọt về lâu dài",
                example: "Investing in quality education always <strong>pays off in the long run</strong>."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_factor_q2",
        num: 2,
        situationTitle: "Choosing the right university (fees, support, facilities)",
        prompt:
          "Your cousin is about to enter university and is confused about choosing the right one. There are three criteria for him or her to consider: affordable fees, student support, and campus facilities. Which factor do you think is the most important?",
        promptHtml:
          "Your cousin is about to enter university and is confused about choosing the right one. There are three criteria for him or her to consider: <strong>affordable fees</strong>, <strong>student support</strong>, and <strong>campus facilities</strong>. Which factor do you think is the most important?",
        promptVi:
          "Anh/em họ của bạn sắp vào đại học và đang bối rối chưa biết chọn trường nào phù hợp. Có ba tiêu chí để cân nhắc: học phí vừa phải, hỗ trợ sinh viên và cơ sở vật chất trong khuôn viên trường. Theo bạn yếu tố nào quan trọng nhất?",
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 tiêu chí: affordable fees / student support / campus facilities).",
          tense: "Hiện tại đơn và động từ khuyết thiếu (can / would). Đề này xoay quanh sinh viên Việt Nam nên lý do về giảm áp lực cho bố mẹ và tập trung thi cử rất dễ nói.",
          length: "B1: ~118–138 từ · B2: ~158–185 từ."
        },
        pitfalls: [
          "Nhầm nghĩa từ 'affordable fees' thành 'rẻ nhất' (cheap); đúng phải là 'vừa túi tiền, hợp khả năng chi trả'.",
          "Quên nhắc đến việc ngoài học phí, sinh viên đại học còn phải tốn tiền trọ, ăn uống và sách vở suốt 4 năm.",
          "Khi phản biện 'campus facilities' hay 'student support', tránh chê vô lý (nói 'không cần chút nào'); hãy công nhận mặt tốt nhưng giải thích tại sao không cấp bách bằng học phí."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "Giới thiệu người em họ sắp vào đại học đang phân vân chọn trường và chốt chọn 'affordable fees'."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Loại 2 phương án còn lại)",
                text: "Lý do 1: Giảm áp lực tiền bạc cho gia đình suốt 4 năm (vì còn tiền phòng trọ, ăn uống, sách vở). Lý do 2: Em ấy yên tâm tập trung học hành, thi cuối kỳ (final exams) thay vì đi làm thêm quá nhiều. Không chọn campus facilities (có thể học qua tài liệu online & thư viện công cộng) và không chọn student support (chỉ cần lúc mới nhập học, bình thường có thể hỏi thầy cô, bạn thân)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Khẳng định lại 'affordable fees' là lựa chọn phù hợp nhất."
              }
            ],
            modelAnswer:
              "<strong>Well,</strong> my cousin is going to enter university soon and feels confused about choosing a school. <strong>Among the three options, I think</strong> <strong>affordable fees</strong> <strong>is the best choice</strong> for him.<br><br><strong>First,</strong> reasonable fees help reduce money pressure on his parents during four years. <strong>For example,</strong> besides tuition, a student has to pay for food, rent, and books every month. <strong>Second,</strong> my cousin can focus better on studying and <strong>final exams</strong>. <strong>So,</strong> he does not need to work too many part-time hours just to pay for school. <strong>On the other hand, I don't choose</strong> <strong>campus facilities</strong> <strong>because</strong> students can easily study with online materials and public libraries. <strong>Also,</strong> <strong>student support</strong> <strong>is not suitable as</strong> the top factor because he mainly needs it in the first week, and teachers or <strong>close friends</strong> can help him daily.<br><br><strong>For these reasons, I believe</strong> <strong>affordable fees</strong> <strong>is the best option in this situation.</strong>",
            vocab: [
              {
                word: "affordable fees",
                ipa: "/əˈfɔːrdəbl fiːz/",
                pos: "n. phr.",
                meaning: "học phí phải chăng, vừa túi tiền",
                example: "I think <strong>affordable fees</strong> is the best choice for my cousin."
              },
              {
                word: "money pressure",
                ipa: "/ˈmʌni ˈpreʃər/",
                pos: "n. phr.",
                meaning: "áp lực tiền bạc",
                example: "Reasonable tuition helps reduce <strong>money pressure</strong> on parents."
              },
              {
                word: "pay for",
                ipa: "/peɪ fɔːr/",
                pos: "v. phr.",
                meaning: "trả tiền cho",
                example: "A university student has to <strong>pay for</strong> food, rent, and books."
              },
              {
                word: "focus on",
                ipa: "/ˈfoʊkəs ɑːn/",
                pos: "v. phr.",
                meaning: "tập trung vào",
                example: "He can <strong>focus on</strong> studying instead of worrying about money."
              },
              {
                word: "final exams",
                ipa: "/ˈfaɪnl ɪɡˈzæmz/",
                pos: "n. phr.",
                meaning: "các kỳ thi cuối kỳ",
                example: "With enough time, he can prepare well for his <strong>final exams</strong>."
              },
              {
                word: "part-time hours",
                ipa: "/ˈpɑːrt taɪm ˈaʊərz/",
                pos: "n. phr.",
                meaning: "giờ làm thêm",
                example: "He does not need to work too many <strong>part-time hours</strong>."
              },
              {
                word: "public libraries",
                ipa: "/ˈpʌblɪk ˈlaɪbreriz/",
                pos: "n. phr.",
                meaning: "thư viện công cộng",
                example: "Students can still study with online tools and <strong>public libraries</strong>."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "bạn thân",
                example: "Teachers and <strong>close friends</strong> can help him in daily university life."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập tự nhiên & Chọn phương án)",
                text: "Mở bằng 'Well, considering the situation where my cousin...' và chốt 'affordable fees'."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 phương án còn lại)",
                text: "Lý do 1: Giảm gánh nặng tài chính (ease the financial burden) vì ngoài học phí còn chi phí sinh hoạt (living expenses), giúp cả nhà thấy nhẹ nhõm (peace of mind). Lý do 2: Giúp tập trung tối đa cho việc học mà không bị kiệt sức vì làm thêm (As a result, ... feel sluggish). Bỏ campus facilities (dùng tài liệu online vẫn học tốt) và bỏ student support (chủ yếu cần lúc định hướng tân sinh viên - freshman orientation)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt bằng 'All in all, affordable fees is definitely the most practical and suitable choice here.'"
              }
            ],
            modelAnswer:
              "<strong>Well, considering the situation where</strong> my cousin is struggling to choose a suitable university, <strong>I'd definitely go for</strong> <strong>affordable fees</strong> <strong>out of the three options.</strong><br><br><strong>The main reason is that</strong> reasonable tuition helps ease the <strong>financial burden</strong> on his family. <strong>For instance,</strong> university life requires four years of <strong>living expenses</strong> like rent, food, and textbooks, <strong>which</strong> gives everyone greater <strong>peace of mind</strong> when fees are manageable. <strong>On top of that,</strong> lower fees allow him to focus on his coursework instead of working exhausting part-time shifts. <strong>As a result,</strong> he won't <strong>feel sluggish</strong> in class and can keep his grades high. <strong>Regarding the other two options, I wouldn't pick</strong> <strong>campus facilities</strong> <strong>because</strong> fancy buildings are not essential when students can learn well through online resources and public libraries. <strong>As for</strong> <strong>student support</strong>, <strong>although</strong> it is helpful during <strong>freshman orientation</strong>, classmates and lecturers usually provide enough daily guidance.<br><br><strong>All in all,</strong> <strong>affordable fees</strong> <strong>is definitely the most practical and suitable choice here.</strong>",
            vocab: [
              {
                word: "financial burden",
                ipa: "/faɪˈnænʃl ˈbɜːrdn/",
                pos: "n. phr.",
                meaning: "gánh nặng tài chính",
                example: "Reasonable tuition helps ease the <strong>financial burden</strong> on his family."
              },
              {
                word: "living expenses",
                ipa: "/ˈlɪvɪŋ ɪkˈspensɪz/",
                pos: "n. phr.",
                meaning: "chi phí sinh hoạt",
                example: "Students already have to pay four years of <strong>living expenses</strong>."
              },
              {
                word: "peace of mind",
                ipa: "/piːs əv maɪnd/",
                pos: "n. phr.",
                meaning: "sự an tâm, nhẹ nhõm đầu óc",
                example: "Manageable fees give the whole family greater <strong>peace of mind</strong>."
              },
              {
                word: "exhausting",
                ipa: "/ɪɡˈzɔːstɪŋ/",
                pos: "adj.",
                meaning: "gây kiệt sức, mệt nhoài",
                example: "He won't have to work <strong>exhausting</strong> part-time shifts."
              },
              {
                word: "feel sluggish",
                ipa: "/fiːl ˈslʌɡɪʃ/",
                pos: "v. phr.",
                meaning: "cảm thấy uể oải, thiếu năng lượng",
                example: "Working too late at night makes students <strong>feel sluggish</strong> in class."
              },
              {
                word: "essential",
                ipa: "/ɪˈsenʃl/",
                pos: "adj.",
                meaning: "thiết yếu, bắt buộc phải có",
                example: "Fancy buildings are not <strong>essential</strong> for studying well."
              },
              {
                word: "freshman orientation",
                ipa: "/ˈfreʃmən ˌɔːriənˈteɪʃn/",
                pos: "n. phr.",
                meaning: "tuần định hướng tân sinh viên",
                example: "Student support offices are mainly helpful during <strong>freshman orientation</strong>."
              },
              {
                word: "daily guidance",
                ipa: "/ˈdeɪli ˈɡaɪdns/",
                pos: "n. phr.",
                meaning: "sự hướng dẫn hằng ngày",
                example: "Lecturers and classmates usually provide enough <strong>daily guidance</strong>."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_factor_q3",
        num: 3,
        situationTitle: "Hiring a new employee (communication, honesty, skills)",
        prompt:
          "You are a recruiter and you are going to hire a new employee. There are three qualities for you to consider: communication skills, honesty, and professional skills. Which quality do you think is the most important?",
        promptHtml:
          "You are a recruiter and you are going to hire a new employee. There are three qualities for you to consider: <strong>communication skills</strong>, <strong>honesty</strong>, and <strong>professional skills</strong>. Which quality do you think is the most important?",
        promptVi:
          "Bạn là một nhà tuyển dụng và sắp tuyển một nhân viên mới. Có ba phẩm chất để bạn cân nhắc: kỹ năng giao tiếp, sự trung thực và kỹ năng chuyên môn. Bạn nghĩ phẩm chất nào là quan trọng nhất?",
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 phẩm chất: communication skills / honesty / professional skills).",
          tense: "Hiện tại đơn kết hợp câu điều kiện loại 1/2 (if an employee is honest, managers can...). Đóng vai nhà tuyển dụng (I / the company / our team).",
          length: "B1: ~115–138 từ · B2: ~155–185 từ."
        },
        pitfalls: [
          "Phát âm nhầm âm /h/ câm trong từ 'honesty' (/ˈɑːnəsti/) và 'honest' (/ˈɑːnɪst/) — KHÔNG đọc chữ 'h' đầu từ!",
          "Nói chung chung 'honesty is good' mà thiếu ví dụ công việc thực tế (giữ tiền, bảo mật khách hàng, nhận lỗi sớm để cả nhóm sửa).",
          "Quên thừa nhận vai trò của professional skills trước khi giải thích lý do chưa chọn (vì kỹ năng có thể đào tạo được còn tính cách thì rất khó sửa)."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "Đóng vai nhà tuyển dụng sắp tuyển nhân viên mới và chốt chọn 'honesty'."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Loại 2 phương án còn lại)",
                text: "Lý do 1: Xây dựng niềm tin — sếp yên tâm giao dự án quan trọng, tiền bạc hay dữ liệu khách hàng. Lý do 2: Nhân viên trung thực dám nhận lỗi sớm để cả nhóm sửa kịp thời, làm việc an toàn hơn. Bỏ professional skills (nhân viên mới có thể được đào tạo dần trong công việc) và bỏ communication skills (nói khéo mà thiếu trung thực thì khách hàng và đồng nghiệp không thể tin tưởng)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Khẳng định lại 'honesty' là phẩm chất phù hợp nhất."
              }
            ],
            modelAnswer:
              "<strong>Well,</strong> I am a recruiter looking for a new employee for my company. <strong>Among the three options, I think</strong> <strong>honesty</strong> <strong>is the best choice</strong> for this role.<br><br><strong>First,</strong> an honest worker builds strong trust at the workplace. <strong>For example,</strong> managers can <strong>feel safe</strong> giving them money or <strong>important projects</strong> without worrying about cheating. <strong>Second,</strong> honesty helps a team solve problems quickly. When an employee makes a mistake, they will tell the truth early, <strong>so</strong> everyone can fix it together on time. <strong>On the other hand, I don't choose</strong> <strong>professional skills</strong> <strong>because</strong> a new worker can learn job skills step by step after training. <strong>Also,</strong> <strong>communication skills</strong> <strong>are not suitable as</strong> the top quality because sweet words without honesty can hurt customers' trust.<br><br><strong>For these reasons, I believe</strong> <strong>honesty</strong> <strong>is the best option in this situation.</strong>",
            vocab: [
              {
                word: "honesty",
                ipa: "/ˈɑːnəsti/",
                pos: "n.",
                meaning: "sự trung thực (lưu ý âm /h/ câm)",
                example: "I think <strong>honesty</strong> is the best choice for this role."
              },
              {
                word: "strong trust",
                ipa: "/strɔːŋ trʌst/",
                pos: "n. phr.",
                meaning: "niềm tin vững chắc",
                example: "An honest worker builds <strong>strong trust</strong> at the workplace."
              },
              {
                word: "feel safe",
                ipa: "/fiːl seɪf/",
                pos: "v. phr.",
                meaning: "cảm thấy an tâm, tin cậy",
                example: "Managers can <strong>feel safe</strong> giving them money or data."
              },
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɑːdʒekts/",
                pos: "n. phr.",
                meaning: "những dự án quan trọng",
                example: "Leaders trust honest staff with <strong>important projects</strong>."
              },
              {
                word: "make a mistake",
                ipa: "/meɪk ə mɪˈsteɪk/",
                pos: "v. phr.",
                meaning: "mắc sai lầm",
                example: "When an employee <strong>makes a mistake</strong>, they tell the truth early."
              },
              {
                word: "tell the truth",
                ipa: "/tel ðə truːθ/",
                pos: "v. phr.",
                meaning: "nói sự thật",
                example: "Good employees always <strong>tell the truth</strong> instead of hiding errors."
              },
              {
                word: "step by step",
                ipa: "/step baɪ step/",
                pos: "adv. phr.",
                meaning: "từng bước một",
                example: "A new worker can learn job skills <strong>step by step</strong>."
              },
              {
                word: "sweet words",
                ipa: "/swiːt wɜːrdz/",
                pos: "n. phr.",
                meaning: "lời nói khéo léo, ngon ngọt",
                example: "<strong>Sweet words</strong> without honesty cannot keep customers' trust."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập tự nhiên & Chọn phương án)",
                text: "Dẫn nhập tình huống tuyển dụng và chọn 'honesty' bằng 'I'd definitely go for'."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 phương án còn lại)",
                text: "Lý do 1: Nền tảng của niềm tin trong công ty — yên tâm giao dữ liệu khách hàng (client data) hay tài chính mà mang lại sự an tâm (peace of mind). Lý do 2: Xây dựng môi trường làm việc lành mạnh — nhân viên dám nhận lỗi sớm (admit mistakes) để xử lý kịp hạn chót (tight deadlines). Bỏ professional skills (có thể đào tạo tại chỗ - trained on the job, còn tính cách khó đổi) và bỏ communication skills (nói hay nhưng thiếu trung thực sẽ làm hỏng uy tín)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt lại tính thực tế và giá trị lâu dài của 'honesty'."
              }
            ],
            modelAnswer:
              "<strong>Well, considering the situation where</strong> I am recruiting a new member for our company, <strong>I'd definitely go for</strong> <strong>honesty</strong> <strong>out of the three options.</strong><br><br><strong>The main reason is that</strong> honesty builds real trust across the whole organization. <strong>For instance,</strong> managers can safely trust an honest employee with budgets or sensitive <strong>client data</strong>, <strong>which</strong> gives the company true <strong>peace of mind</strong>. <strong>On top of that,</strong> honest workers create a healthy and productive team environment. <strong>As a result,</strong> whenever they <strong>admit mistakes</strong> early, the team can fix problems quickly before <strong>tight deadlines</strong> are missed. <strong>Regarding the other two options, I wouldn't pick</strong> <strong>professional skills</strong> <strong>because</strong> technical skills can easily be <strong>trained on the job</strong>, whereas bad character is very hard to change. <strong>As for</strong> <strong>communication skills</strong>, <strong>although</strong> speaking well helps at work, smooth talk without honesty can actually damage trust with clients.<br><br><strong>All in all,</strong> <strong>honesty</strong> <strong>is definitely the most practical and suitable choice here.</strong>",
            vocab: [
              {
                word: "client data",
                ipa: "/ˈklaɪənt ˈdeɪtə/",
                pos: "n. phr.",
                meaning: "dữ liệu khách hàng",
                example: "Managers can safely trust honest staff with sensitive <strong>client data</strong>."
              },
              {
                word: "sensitive",
                ipa: "/ˈsensətɪv/",
                pos: "adj.",
                meaning: "nhạy cảm, cần bảo mật",
                example: "Companies must protect <strong>sensitive</strong> financial information."
              },
              {
                word: "admit mistakes",
                ipa: "/ədˈmɪt mɪˈsteɪks/",
                pos: "v. phr.",
                meaning: "thừa nhận sai sót",
                example: "Honest employees <strong>admit mistakes</strong> early instead of hiding them."
              },
              {
                word: "tight deadlines",
                ipa: "/taɪt ˈdedlaɪnz/",
                pos: "n. phr.",
                meaning: "hạn chót gấp rút",
                example: "The team can fix problems before <strong>tight deadlines</strong> are missed."
              },
              {
                word: "trained on the job",
                ipa: "/treɪnd ɑːn ðə dʒɑːb/",
                pos: "v. phr.",
                meaning: "được đào tạo thực tế trong công việc",
                example: "Technical skills can easily be <strong>trained on the job</strong>."
              },
              {
                word: "character",
                ipa: "/ˈkærəktər/",
                pos: "n.",
                meaning: "tính cách, phẩm chất",
                example: "Technical skills are learnable, whereas bad <strong>character</strong> is hard to change."
              },
              {
                word: "smooth talk",
                ipa: "/smuːð tɔːk/",
                pos: "n. phr.",
                meaning: "lời nói trơn tru, khéo miệng",
                example: "<strong>Smooth talk</strong> without honesty quickly breaks trust."
              },
              {
                word: "damage trust",
                ipa: "/ˈdæmɪdʒ trʌst/",
                pos: "v. phr.",
                meaning: "làm tổn hại niềm tin",
                example: "One dishonest act can <strong>damage trust</strong> with long-term clients."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // DẠNG 2: CHỌN THỂ LOẠI (GENRE / TYPE) — 2 TÌNH HUỐNG
  // ==========================================================================
  {
    part: "part2",
    id: "part2-genre",
    number: "02",
    title: "Choosing a Type or Genre",
    titleVi: "Chọn thể loại / loại hình phù hợp",
    description:
      "Luyện 2 tình huống chọn thể loại sách giúp phát triển trí tưởng tượng và chọn loại hình trường tiểu học phù hợp cho trẻ.",
    questionsCount: 2,
    questions: [
      {
        part: "part2",
        id: "p2_genre_q1",
        num: 1,
        situationTitle: "Reading a book to improve imagination (mystery, romance, action)",
        prompt:
          "Your friend wants to read a book to improve her imagination. She is considering three options: a mystery novel, a romance novel, and an action fiction book. Which one would you recommend?",
        promptHtml:
          "Your friend wants to read a book to improve her imagination. She is considering three options: <strong>a mystery novel</strong>, <strong>a romance novel</strong>, and <strong>an action fiction book</strong>. Which one would you recommend?",
        promptVi:
          "Bạn của bạn muốn đọc một cuốn sách để cải thiện trí tưởng tượng. Cô ấy đang cân nhắc ba thể loại: tiểu thuyết trinh thám, tiểu thuyết lãng mạn và sách hành động viễn tưởng. Bạn sẽ gợi ý loại nào?",
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 thể loại sách: mystery novel / romance novel / action fiction book).",
          tense: "Hiện tại đơn và 'would recommend / should'. Tập trung gắn lý do vào từ khóa đề bài: 'improve her imagination'.",
          length: "B1: ~115–138 từ · B2: ~155–185 từ."
        },
        pitfalls: [
          "Chỉ nói cuốn sách hay mà quên giải thích nó kích thích trí tưởng tượng (picture scenes, guess clues) như thế nào.",
          "Phát âm thiếu âm cuối /s/ trong 'clues', 'twists', 'stories', 'scenes' (đây đều là âm cuối quan trọng của danh từ số nhiều/từ vựng).",
          "Nhầm cấu trúc 'recommend + V-ing / Noun' — nói đúng là 'I recommend a mystery novel', không nói 'recommend her a mystery novel' thiếu giới từ."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn thể loại)",
                text: "Giới thiệu người bạn muốn cải thiện trí tưởng tượng và chốt gợi ý 'a mystery novel'."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Loại 2 thể loại còn lại)",
                text: "Lý do 1: Nhiều manh mối (clues) và bí mật buộc bạn phải tự hình dung bối cảnh, đoán kết quả trong đầu -> rèn trí tưởng tượng trực tiếp. Lý do 2: Cốt truyện hồi hộp, thú vị từ đầu đến cuối nên bạn đọc hết cả quyển mà không chán. Bỏ romance novel (chuyện tình cảm thường dễ đoán, xoay quanh cảm xúc thường ngày) và bỏ action fiction book (tập trung quá nhiều vào đánh nhau, rượt đuổi nhanh nên ít chỗ suy nghĩ sâu)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt lại 'a mystery novel' là lựa chọn phù hợp nhất."
              }
            ],
            modelAnswer:
              "<strong>Well,</strong> my friend wants to read a book to improve her imagination. <strong>Among the three options, I think</strong> <strong>a mystery novel</strong> <strong>is the best choice</strong> for her.<br><br><strong>First,</strong> mystery books have many clues and secrets, so readers have to think actively. <strong>For example,</strong> my friend can picture the places and guess the ending in her head, which helps her imagination grow. <strong>Second,</strong> this kind of book is very exciting from start to finish. <strong>So,</strong> she will not feel bored and will want to finish the whole story. <strong>On the other hand, I don't choose</strong> <strong>a romance novel</strong> <strong>because</strong> love stories are often easy to guess and focus mostly on daily feelings. <strong>Also,</strong> <strong>an action fiction book</strong> <strong>is not suitable because</strong> it focuses too much on fast fights instead of creative thinking.<br><br><strong>For these reasons, I believe</strong> <strong>a mystery novel</strong> <strong>is the best option in this situation.</strong>",
            vocab: [
              {
                word: "mystery novel",
                ipa: "/ˈmɪstəri ˈnɑːvl/",
                pos: "n. phr.",
                meaning: "tiểu thuyết trinh thám, bí ẩn",
                example: "I think <strong>a mystery novel</strong> is the best choice to improve imagination."
              },
              {
                word: "clues",
                ipa: "/kluːz/",
                pos: "n.",
                meaning: "manh mối, gợi ý",
                example: "Mystery books have many <strong>clues</strong> and secrets for readers to solve."
              },
              {
                word: "picture the places",
                ipa: "/ˈpɪktʃər ðə ˈpleɪsɪz/",
                pos: "v. phr.",
                meaning: "hình dung ra các địa điểm trong đầu",
                example: "She can <strong>picture the places</strong> and characters in her head."
              },
              {
                word: "guess the ending",
                ipa: "/ɡes ðə ˈendɪŋ/",
                pos: "v. phr.",
                meaning: "đoán đoạn kết",
                example: "Readers try to <strong>guess the ending</strong> while reading."
              },
              {
                word: "from start to finish",
                ipa: "/frʌm stɑːrt tuː ˈfɪnɪʃ/",
                pos: "prep. phr.",
                meaning: "từ đầu đến cuối",
                example: "Good mystery stories are exciting <strong>from start to finish</strong>."
              },
              {
                word: "feel bored",
                ipa: "/fiːl bɔːrd/",
                pos: "v. phr.",
                meaning: "cảm thấy chán",
                example: "With unexpected clues, she will not <strong>feel bored</strong>."
              },
              {
                word: "easy to guess",
                ipa: "/ˈiːzi tuː ɡes/",
                pos: "adj. phr.",
                meaning: "dễ đoán trước",
                example: "Many romance stories are <strong>easy to guess</strong>."
              },
              {
                word: "creative thinking",
                ipa: "/kriˈeɪtɪv ˈθɪŋkɪŋ/",
                pos: "n. phr.",
                meaning: "tư duy sáng tạo",
                example: "Solving puzzles in books develops <strong>creative thinking</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập tự nhiên & Chọn thể loại)",
                text: "Mở bài bằng 'Well, considering the situation where my friend...' và chọn 'a mystery novel'."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 thể loại còn lại)",
                text: "Lý do 1: Đầy manh mối và cú bẻ lái bất ngờ (unexpected twists), kích thích người đọc tự dựng hình ảnh trong tâm trí (mental imagery), giúp phát triển tư duy sáng tạo (which naturally...). Lý do 2: Giữ được sự tò mò cuốn hút (stay hooked), đọc liền mạch thay vì bỏ dở. Bỏ romance novel (cốt truyện thường dễ đoán - predictable) và bỏ action fiction book (nhiều cảnh đánh đấm, rượt đuổi nhanh nhưng thiếu chiều sâu suy luận)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt bằng 'All in all, a mystery novel is definitely the most practical and suitable choice here.'"
              }
            ],
            modelAnswer:
              "<strong>Well, considering the situation where</strong> my friend wants a book that sharpens her imagination, <strong>I'd definitely go for</strong> <strong>a mystery novel</strong> <strong>out of the three options.</strong><br><br><strong>The main reason is that</strong> mystery stories are packed with hidden clues and <strong>unexpected twists</strong>. <strong>For instance,</strong> she has to picture different scenes and connect details to solve the puzzle, <strong>which</strong> actively stimulates her <strong>mental imagery</strong>. <strong>On top of that,</strong> a clever mystery builds strong curiosity from the very first page. <strong>As a result,</strong> she will <strong>stay hooked</strong> and finish the entire book instead of putting it down halfway. <strong>Regarding the other two options, I wouldn't pick</strong> <strong>a romance novel</strong> <strong>because</strong> love stories are often quite <strong>predictable</strong> and focus more on everyday emotions than creative thinking. <strong>As for</strong> <strong>an action fiction book</strong>, <strong>although</strong> fast chases feel thrilling, non-stop fighting leaves less room for deep reflection.<br><br><strong>All in all,</strong> <strong>a mystery novel</strong> <strong>is definitely the most practical and suitable choice here.</strong>",
            vocab: [
              {
                word: "unexpected twists",
                ipa: "/ˌʌnɪkˈspektɪd twɪsts/",
                pos: "n. phr.",
                meaning: "những tình tiết bẻ lái bất ngờ",
                example: "Mystery novels are packed with hidden clues and <strong>unexpected twists</strong>."
              },
              {
                word: "mental imagery",
                ipa: "/ˈmentl ˈɪmɪdʒəri/",
                pos: "n. phr.",
                meaning: "hình ảnh tưởng tượng trong tâm trí",
                example: "Picturing scenes actively stimulates her <strong>mental imagery</strong>."
              },
              {
                word: "curiosity",
                ipa: "/ˌkjʊriˈɑːsəti/",
                pos: "n.",
                meaning: "sự tò mò, háo hức khám phá",
                example: "A well-written mystery builds strong <strong>curiosity</strong>."
              },
              {
                word: "stay hooked",
                ipa: "/steɪ hʊkt/",
                pos: "v. phr.",
                meaning: "bị cuốn hút không rời mắt",
                example: "When the plot is exciting, readers <strong>stay hooked</strong> until the end."
              },
              {
                word: "predictable",
                ipa: "/prɪˈdɪktəbl/",
                pos: "adj.",
                meaning: "dễ đoán trước",
                example: "Romance plots can sometimes feel too <strong>predictable</strong>."
              },
              {
                word: "thrilling",
                ipa: "/ˈθrɪlɪŋ/",
                pos: "adj.",
                meaning: "gay cấn, hồi hộp",
                example: "Fast action scenes are <strong>thrilling</strong>, yet they offer less deep thinking."
              },
              {
                word: "deep reflection",
                ipa: "/diːp rɪˈflekʃn/",
                pos: "n. phr.",
                meaning: "sự suy ngẫm sâu sắc",
                example: "Non-stop fighting leaves little room for <strong>deep reflection</strong>."
              },
              {
                word: "connect details",
                ipa: "/kəˈnekt ˈdiːteɪlz/",
                pos: "v. phr.",
                meaning: "xâu chuỗi các chi tiết",
                example: "Mystery readers enjoy trying to <strong>connect details</strong> like a detective."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_genre_q2",
        num: 2,
        situationTitle: "Choosing a primary school (public, international, private)",
        prompt:
          "A couple is choosing a primary school for their child. What kind of school would you recommend: a public school near her home, an international school, or a private school?",
        promptHtml:
          "A couple is choosing a primary school for their child. What kind of school would you recommend: <strong>a public school near her home</strong>, <strong>an international school</strong>, or <strong>a private school</strong>?",
        promptVi:
          "Một cặp vợ chồng đang chọn trường tiểu học cho con gái của họ. Bạn sẽ gợi ý loại hình trường nào: một trường công lập gần nhà, một trường quốc tế hay một trường tư thục?",
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 loại trường: public school near her home / international school / private school).",
          tense: "Hiện tại đơn, dùng 'for their daughter / for the parents / for a young child'. Liên hệ thực tế Việt Nam (đưa đón đi học, kẹt xe, học phí, bạn hàng xóm, nền tảng tiếng Việt).",
          length: "B1: ~115–138 từ · B2: ~155–185 từ."
        },
        pitfalls: [
          "Lẫn lộn đại từ nhân xưng ('her' là cô con gái nhỏ trong đề, còn bố mẹ là 'they / the parents').",
          "Quên nhắc tới yếu tố 'near her home' trong tên lựa chọn — đây là điểm mạnh thực tế nhất cho trẻ 6–10 tuổi (đỡ dậy sớm, đỡ kẹt xe).",
          "Chỉ trích trường quốc tế thiếu thực tế; nên giải thích hợp lý là học phí quá cao với đa số gia đình và trẻ nhỏ cần vững tiếng Việt trước."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn loại trường)",
                text: "Giới thiệu cặp vợ chồng đang chọn trường tiểu học cho con gái và chốt chọn 'a public school near her home'."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Loại 2 loại trường còn lại)",
                text: "Lý do 1: Rất tiện và an toàn để bố mẹ đưa đón mỗi sáng, con được ngủ đủ giấc thay vì kẹt xe xa nhà. Lý do 2: Học phí hợp lý giúp gia đình tiết kiệm tiền, mà bé vẫn học kiến thức cơ bản tốt và kết bạn ngay khu phố quanh nhà. Bỏ international school (học phí quá đắt với nhiều gia đình, lại học quá ít tiếng Việt khi còn nhỏ) và bỏ private school (thường xa nhà và tốn nhiều phí xe đưa đón, ăn trưa)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Khẳng định lại 'a public school near her home' là lựa chọn phù hợp nhất."
              }
            ],
            modelAnswer:
              "<strong>Well,</strong> a couple is looking for a primary school for their young daughter. <strong>Among the three options, I think</strong> <strong>a public school near her home</strong> <strong>is the best choice</strong> for their family.<br><br><strong>First,</strong> it is very easy and safe for parents to take their child to school every morning. <strong>For example,</strong> the little girl can get enough sleep instead of sitting in heavy traffic on long roads. <strong>Second,</strong> a public school has low fees, so the parents can <strong>save money</strong>. The girl can still learn basic subjects well and make friends in her neighborhood. <strong>On the other hand, I don't choose</strong> <strong>an international school</strong> <strong>because</strong> the tuition is too expensive, and a young child needs strong Vietnamese skills first. <strong>Also,</strong> <strong>a private school</strong> <strong>is not suitable as</strong> it is often far away and costs a lot of extra money.<br><br><strong>For these reasons, I believe</strong> <strong>a public school near her home</strong> <strong>is the best option in this situation.</strong>",
            vocab: [
              {
                word: "public school",
                ipa: "/ˈpʌblɪk skuːl/",
                pos: "n. phr.",
                meaning: "trường công lập",
                example: "I think a <strong>public school</strong> near her home is the best choice."
              },
              {
                word: "get enough sleep",
                ipa: "/ɡet ɪˈnʌf sliːp/",
                pos: "v. phr.",
                meaning: "ngủ đủ giấc",
                example: "When the school is nearby, the child can <strong>get enough sleep</strong>."
              },
              {
                word: "heavy traffic",
                ipa: "/ˈhevi ˈtræfɪk/",
                pos: "n. phr.",
                meaning: "giao thông đông đúc, kẹt xe",
                example: "She avoids sitting in <strong>heavy traffic</strong> every morning."
              },
              {
                word: "basic subjects",
                ipa: "/ˈbeɪsɪk ˈsʌbdʒekts/",
                pos: "n. phr.",
                meaning: "các môn học cơ bản",
                example: "Public schools teach <strong>basic subjects</strong> like Math and Vietnamese very well."
              },
              {
                word: "neighborhood",
                ipa: "/ˈneɪbərhʊd/",
                pos: "n.",
                meaning: "khu phố, hàng xóm xung quanh",
                example: "She can easily make friends right in her <strong>neighborhood</strong>."
              },
              {
                word: "international school",
                ipa: "/ˌɪntərˈnæʃnəl skuːl/",
                pos: "n. phr.",
                meaning: "trường quốc tế",
                example: "An <strong>international school</strong> is often too expensive for average families."
              },
              {
                word: "private school",
                ipa: "/ˈpraɪvət skuːl/",
                pos: "n. phr.",
                meaning: "trường tư thục",
                example: "A <strong>private school</strong> usually charges much higher monthly fees."
              },
              {
                word: "extra money",
                ipa: "/ˈekstrə ˈmʌni/",
                pos: "n. phr.",
                meaning: "tiền phụ phí phát sinh thêm",
                example: "Private schools often cost <strong>extra money</strong> for buses and meals."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập tự nhiên & Chọn loại trường)",
                text: "Mở bài bằng 'Well, considering the situation where a couple...' và chọn 'a public school near her home'."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 loại trường còn lại)",
                text: "Lý do 1: Rất thuận tiện (convenient) và an toàn cho việc đưa đón hằng ngày (daily commute), giúp bé giữ nếp sinh hoạt khỏe mạnh thay vì mệt mỏi vì tắc đường (which protects...). Lý do 2: Chi phí phải chăng (affordable) giúp gia đình giảm áp lực tài chính mà vẫn xây dựng nền tảng kiến thức vững chắc (solid foundation) và tình bạn gần nhà. Bỏ international school (quá đắt đỏ - far too expensive - và học hoàn toàn tiếng Anh quá sớm dễ làm yếu nền tảng tiếng Việt) và bỏ private school (xa hơn và phát sinh nhiều phụ phí xe/ăn uống)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "Chốt bằng 'All in all, a public school near her home is definitely the most practical and suitable choice here.'"
              }
            ],
            modelAnswer:
              "<strong>Well, considering the situation where</strong> a couple needs a suitable primary school for their daughter, <strong>I'd definitely go for</strong> <strong>a public school near her home</strong> <strong>out of the three options.</strong><br><br><strong>The main reason is that</strong> a nearby school makes the <strong>daily commute</strong> much more <strong>convenient</strong> and safer for a young child. <strong>For instance,</strong> her parents can pick her up right on time, <strong>which</strong> helps the girl get enough rest instead of feeling tired in heavy traffic. <strong>On top of that,</strong> public schools have very <strong>affordable</strong> tuition while still providing a <strong>solid foundation</strong> in core subjects. <strong>As a result,</strong> the family avoids unnecessary <strong>financial burden</strong>, and the child can grow up playing with friends in her own neighborhood. <strong>Regarding the other two options, I wouldn't pick</strong> <strong>an international school</strong> <strong>because</strong> the tuition is <strong>far too expensive</strong>, and studying mostly in English too early may weaken her Vietnamese skills. <strong>As for</strong> <strong>a private school</strong>, <strong>although</strong> it has small classes, it is usually farther away and charges high extra fees for buses and meals.<br><br><strong>All in all,</strong> <strong>a public school near her home</strong> <strong>is definitely the most practical and suitable choice here.</strong>",
            vocab: [
              {
                word: "daily commute",
                ipa: "/ˈdeɪli kəˈmjuːt/",
                pos: "n. phr.",
                meaning: "việc đi lại hằng ngày",
                example: "A nearby school makes the <strong>daily commute</strong> safer for a young child."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện, tiện lợi",
                example: "Dropping off kids near home is much more <strong>convenient</strong> for working parents."
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "giá cả phải chăng",
                example: "Public schools keep education <strong>affordable</strong> for most families."
              },
              {
                word: "solid foundation",
                ipa: "/ˈsɑːlɪd faʊnˈdeɪʃn/",
                pos: "n. phr.",
                meaning: "nền tảng vững chắc",
                example: "Primary school should give children a <strong>solid foundation</strong> in core subjects."
              },
              {
                word: "core subjects",
                ipa: "/kɔːr ˈsʌbdʒekts/",
                pos: "n. phr.",
                meaning: "các môn học nền tảng / chính",
                example: "Teachers focus carefully on <strong>core subjects</strong> like reading and math."
              },
              {
                word: "far too expensive",
                ipa: "/fɑːr tuː ɪkˈspensɪv/",
                pos: "adj. phr.",
                meaning: "đắt đỏ quá mức",
                example: "International school fees are <strong>far too expensive</strong> for ordinary families."
              },
              {
                word: "weaken",
                ipa: "/ˈwiːkən/",
                pos: "v.",
                meaning: "làm suy yếu, giảm bớt",
                example: "Using too little Vietnamese early on may <strong>weaken</strong> her mother tongue."
              },
              {
                word: "pick her up",
                ipa: "/pɪk hɜːr ʌp/",
                pos: "v. phr.",
                meaning: "đón con tan học",
                example: "Parents can easily <strong>pick her up</strong> right after work."
              }
            ]
          }
        }
      }
    ]
  }
];

if (Array.isArray(window.SPEAKING_TOPICS)) {
  window.SPEAKING_TOPICS = window.SPEAKING_TOPICS.concat(window.SPEAKING_PART2_TOPICS);
} else {
  window.SPEAKING_TOPICS = window.SPEAKING_PART2_TOPICS.slice();
}
