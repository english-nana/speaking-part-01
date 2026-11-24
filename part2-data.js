// ==========================================================================
// SPEAKING PART 2 — SOLUTION DISCUSSION (CHỌN YẾU TỐ TỐT NHẤT & CHỌN THỂ LOẠI)
// - Khung dàn ý 3 phần dùng chung cho cả Level B1 & Level B2
// - Chỉ lấy đề từ bộ câu hỏi gốc; toàn bộ dàn ý, bài mẫu B1/B2 và từ vựng được
//   biên soạn mới theo văn nói giao tiếp tự nhiên, gần gũi đời thực.
// ==========================================================================

window.SPEAKING_PART2_OUTLINE = {
  title: "General Outline · Speaking Part 2",
  subtitle: "Khung dàn ý 3 phần dùng chung cho cả Level B1 & Level B2 · Bấm vào cụm chữ đỏ có gạch chân để đổi cách diễn đạt",
  swapOptions: {
    situation: ["in this situation", "him", "her"],
    option2Verb: ["is a good option", "is worth considering"],
    helpVerb: ["help", "allow"]
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
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Bám đúng khung 3 phần chung: Mở bài → Thân bài (First of all + Another reason + Phản biện 2 phương án) → Kết bài.",
          length: "B1: ~140–160 từ (60–75s) · B2: ~175–205 từ (80–95s)."
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
                text: "The situation here is that my younger sister wants to choose a good university. If I were her, I think I would choose the university's ranking."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (First of all): Trường thứ hạng cao có thầy cô giỏi, thư viện hiện đại giúp học tốt hơn. Lý do 2 (Another reason): Dễ tìm việc tốt sau tốt nghiệp vì công ty tin tưởng bằng cấp. Phản biện: Không chọn distance (ở ký túc xá / đi xe buýt được) và không chọn tuition fees (có thể xin học bổng để tiết kiệm tiền)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe the university's ranking is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister just finished high school and wants to choose a good university. <strong>If I were her, I think I would</strong> choose <strong>the university's ranking</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a top university has good teachers and modern classrooms. <strong>This is because</strong> high-ranking schools focus a lot on teaching quality. <strong>For example,</strong> my sister can study in a big library and learn useful lessons. <strong>Because of this,</strong> she can <strong>study effectively</strong>. <strong>Another reason is that</strong> a good ranking brings better jobs <strong>after graduation</strong>. <strong>In other words,</strong> companies trust students from famous schools. <strong>Moreover,</strong> they believe these students have strong skills. <strong>This can help</strong> my sister <strong>to</strong> get a good job easily. <strong>Regarding the other two options, although</strong> <strong>the distance from her home</strong> <strong>is a good option</strong>, she can still live in a <strong>dormitory</strong> or take the bus. <strong>As for</strong> <strong>the tuition fees</strong>, <strong>I don't think it's a good idea because</strong> she can <strong>apply for scholarships</strong> to <strong>save money</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>the university's ranking</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "university's ranking",
                ipa: "/ˌjuːnɪˈvɜːrsətiz ˈræŋkɪŋ/",
                pos: "n. phr.",
                meaning: "thứ hạng của trường đại học",
                example: "If I were her, I think I would choose the <strong>university's ranking</strong>."
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
                example: "Because of this, she can <strong>study effectively</strong>."
              },
              {
                word: "after graduation",
                ipa: "/ˈæftər ˌɡrædʒuˈeɪʃn/",
                pos: "prep. phr.",
                meaning: "sau khi tốt nghiệp",
                example: "A good ranking brings better jobs <strong>after graduation</strong>."
              },
              {
                word: "dormitory",
                ipa: "/ˈdɔːrmətɔːri/",
                pos: "n.",
                meaning: "ký túc xá",
                example: "She can still live in a <strong>dormitory</strong> or take the bus."
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
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my younger sister is looking for a university with high-quality education. If I were her, I think I would prioritize the university's ranking."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp từ vựng + Phản biện 2 lựa chọn kia)",
                text: "Lý do 1 (First of all): Giảng viên giàu kinh nghiệm (experienced lecturers) và chương trình bài bản (well-structured curriculum), giúp phát triển kỹ năng thực tế. Lý do 2 (Another reason): Bằng cấp trường uy tín (reputable university) mở rộng cơ hội nghề nghiệp (career opportunities). Phản biện: Although the distance from her home is worth considering (có thể ở ký túc xá / đi buýt); As for the tuition fees (học phí có thể bù bằng học bổng và đầu tư giáo dục xứng đáng về lâu dài)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe the university's ranking is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister is looking for a university that provides high-quality education. <strong>If I were her, I think I would</strong> prioritize <strong>the university's ranking</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a high-ranking university guarantees better teaching quality. <strong>This is because</strong> top schools usually have <strong>experienced lecturers</strong> and a <strong>well-structured curriculum</strong>. <strong>For example,</strong> she can study with modern facilities and practice real-life skills, <strong>which</strong> boosts her academic performance. <strong>Because of this,</strong> she will build strong confidence in her major. <strong>Another reason is that</strong> graduating from a <strong>reputable</strong> university brings wider <strong>career opportunities</strong>. <strong>In other words,</strong> employers strongly value graduates from well-known institutions. <strong>Moreover,</strong> top schools often connect students directly with major companies. <strong>This can allow</strong> her <strong>to</strong> land a <strong>meaningful</strong> job right after graduation. <strong>Regarding the other two options, although</strong> <strong>the distance from her home</strong> <strong>is worth considering</strong>, she can stay in a dormitory or <strong>commute</strong> by bus. <strong>As for</strong> <strong>the tuition fees</strong>, <strong>I don't think it's a good idea because</strong> she can apply for scholarships, and quality education <strong>pays off in the long run</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>the university's ranking</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "prioritize",
                ipa: "/praɪˈɔːrətaɪz/",
                pos: "v.",
                meaning: "ưu tiên hàng đầu",
                example: "If I were her, I think I would <strong>prioritize</strong> the university's ranking."
              },
              {
                word: "experienced lecturers",
                ipa: "/ɪkˈspɪriənst ˈlektʃərərz/",
                pos: "n. phr.",
                meaning: "giảng viên giàu kinh nghiệm",
                example: "Top schools usually have <strong>experienced lecturers</strong>."
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
                example: "Graduating from a <strong>reputable</strong> university brings wider career opportunities."
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
                example: "This can allow her to land a <strong>meaningful</strong> job right after graduation."
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
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were him, I think I would...'). Triển khai theo đúng khung dàn ý 3 phần chung.",
          length: "B1: ~140–160 từ · B2: ~175–205 từ."
        },
        pitfalls: [
          "Nhầm nghĩa từ 'affordable fees' thành 'rẻ nhất' (cheap); đúng phải là 'vừa túi tiền, hợp khả năng chi trả'.",
          "Quên nhắc đến việc ngoài học phí, sinh viên đại học còn phải tốn tiền trọ, ăn uống và sách vở suốt 4 năm.",
          "Khi phản biện 'campus facilities' hay 'student support', tránh chê vô lý (nói 'không cần chút nào'); hãy công nhận mặt tốt rồi nêu lý do chưa cấp bách bằng học phí."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my cousin is about to enter university and feels confused. If I were him, I think I would choose affordable fees."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (First of all): Giảm áp lực tiền bạc cho gia đình suốt 4 năm (vì còn tiền phòng, ăn uống, sách vở). Lý do 2 (Another reason): Tập trung tốt hơn cho việc học và kỳ thi cuối kỳ thay vì làm thêm quá sức. Phản biện: Không chọn campus facilities (có thể học qua tài liệu online & thư viện công cộng) và không chọn student support (chủ yếu cần tuần đầu, hằng ngày có thầy cô và bạn bè hỗ trợ)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe affordable fees is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin is about to enter university and feels confused about choosing a school. <strong>If I were him, I think I would</strong> choose <strong>affordable fees</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> reasonable fees reduce <strong>money pressure</strong> on his parents. <strong>This is because</strong> university takes four long years to finish. <strong>For example,</strong> besides tuition, he has to <strong>pay for</strong> rent, food, and books every month. <strong>Because of this,</strong> his whole family feels much less stressed. <strong>Another reason is that</strong> lower fees let him <strong>focus on</strong> studying. <strong>In other words,</strong> he does not need to work too many <strong>part-time hours</strong>. <strong>Moreover,</strong> he has enough energy to prepare well for <strong>final exams</strong>. <strong>This can help</strong> him <strong>to</strong> get good grades. <strong>Regarding the other two options, although</strong> <strong>campus facilities</strong> <strong>is a good option</strong>, students can still learn well using online materials and <strong>public libraries</strong>. <strong>As for</strong> <strong>student support</strong>, <strong>I don't think it's a good idea because</strong> he mainly needs it in the first week, and teachers or <strong>close friends</strong> can help him daily.<br><br><strong>In conclusion, I believe</strong> <strong>affordable fees</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "affordable fees",
                ipa: "/əˈfɔːrdəbl fiːz/",
                pos: "n. phr.",
                meaning: "học phí phải chăng, vừa túi tiền",
                example: "If I were him, I think I would choose <strong>affordable fees</strong>."
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
                example: "Lower fees let him <strong>focus on</strong> studying."
              },
              {
                word: "final exams",
                ipa: "/ˈfaɪnl ɪɡˈzæmz/",
                pos: "n. phr.",
                meaning: "các kỳ thi cuối kỳ",
                example: "With enough energy, he can prepare well for his <strong>final exams</strong>."
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
                example: "Students can still study with online materials and <strong>public libraries</strong>."
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
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my cousin is struggling to pick a suitable university. If I were him, I think I would go for affordable fees."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (First of all): Giảm gánh nặng tài chính (ease the financial burden) vì ngoài học phí còn 4 năm chi phí sinh hoạt (living expenses), giúp cả nhà thấy an tâm (peace of mind). Lý do 2 (Another reason): Toàn tâm cho việc học thay vì làm thêm kiệt sức (exhausting shifts, feel sluggish). Phản biện: Although campus facilities is worth considering (học tốt qua tài liệu online); As for student support (chủ yếu hữu ích lúc freshman orientation)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe affordable fees is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin is about to enter university and feels confused about choosing the right one. <strong>If I were him, I think I would</strong> go for <strong>affordable fees</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> reasonable tuition helps ease the <strong>financial burden</strong> on his family. <strong>This is because</strong> university life involves four continuous years of <strong>living expenses</strong>. <strong>For example,</strong> his parents already have to cover rent, meals, and textbooks every month, <strong>which</strong> adds up quickly. <strong>Because of this,</strong> manageable fees give everyone much greater <strong>peace of mind</strong>. <strong>Another reason is that</strong> affordable tuition protects his study focus. <strong>In other words,</strong> he will not have to take <strong>exhausting</strong> part-time shifts just to pay tuition. <strong>Moreover,</strong> he won't <strong>feel sluggish</strong> during lectures or before final exams. <strong>This can allow</strong> him <strong>to</strong> keep his grades consistently high. <strong>Regarding the other two options, although</strong> <strong>campus facilities</strong> <strong>is worth considering</strong>, fancy buildings are not <strong>essential</strong> when students can study through online resources. <strong>As for</strong> <strong>student support</strong>, <strong>I don't think it's a good idea because</strong> it is mainly needed during <strong>freshman orientation</strong>, while lecturers and classmates provide enough <strong>daily guidance</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>affordable fees</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "University life involves four continuous years of <strong>living expenses</strong>."
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
                example: "He won't have to take <strong>exhausting</strong> part-time shifts."
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
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were in this situation, I think I would...'). Đóng vai nhà tuyển dụng theo khung 3 phần chung.",
          length: "B1: ~140–160 từ · B2: ~175–205 từ."
        },
        pitfalls: [
          "Phát âm nhầm âm /h/ câm trong từ 'honesty' (/ˈɑːnəsti/) và 'honest' (/ˈɑːnɪst/) — KHÔNG đọc chữ 'h' đầu từ!",
          "Nói chung chung 'honesty is good' mà thiếu ví dụ công việc thực tế (giữ tiền, bảo mật khách hàng, nhận lỗi sớm để cả nhóm sửa).",
          "Quên thừa nhận vai trò của professional skills trước khi giải thích lý do chưa chọn (kỹ năng có thể đào tạo dần còn tính cách rất khó sửa)."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that I am a recruiter looking for a new employee. If I were in this situation, I think I would choose honesty."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (First of all): Xây dựng niềm tin ở công ty — sếp yên tâm giao tiền hay dự án quan trọng. Lý do 2 (Another reason): Giúp cả nhóm giải quyết vấn đề sớm vì nhân viên trung thực dám nói sự thật khi mắc lỗi. Phản biện: Không chọn professional skills (có thể học từng bước qua đào tạo) và không chọn communication skills (lời nói khéo léo mà thiếu trung thực sẽ làm mất niềm tin khách hàng)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe honesty is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> I am a recruiter and I need to hire a new employee for my company. <strong>If I were in this situation, I think I would</strong> choose <strong>honesty</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> honesty builds <strong>strong trust</strong> at work. <strong>This is because</strong> every company needs people they can rely on. <strong>For example,</strong> managers can <strong>feel safe</strong> giving an honest worker money or <strong>important projects</strong>. <strong>Because of this,</strong> there is less worry about cheating. <strong>Another reason is that</strong> honest workers help a team fix problems fast. <strong>In other words,</strong> when they <strong>make a mistake</strong>, they <strong>tell the truth</strong> early. <strong>Moreover,</strong> everyone can work together calmly instead of hiding errors. <strong>This can help</strong> the whole team <strong>to</strong> finish tasks on time. <strong>Regarding the other two options, although</strong> <strong>professional skills</strong> <strong>is a good option</strong>, a new worker can learn job skills <strong>step by step</strong> after training. <strong>As for</strong> <strong>communication skills</strong>, <strong>I don't think it's a good idea because</strong> <strong>sweet words</strong> without honesty can hurt customers' trust.<br><br><strong>In conclusion, I believe</strong> <strong>honesty</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "honesty",
                ipa: "/ˈɑːnəsti/",
                pos: "n.",
                meaning: "sự trung thực (lưu ý âm /h/ câm)",
                example: "If I were in this situation, I think I would choose <strong>honesty</strong>."
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
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that I am recruiting a new member for our company. If I were in this situation, I think I would prioritize honesty."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (First of all): Nền tảng niềm tin trong tổ chức — yên tâm giao dữ liệu khách hàng nhạy cảm (sensitive client data), mang lại sự an tâm (peace of mind). Lý do 2 (Another reason): Xây dựng môi trường làm việc lành mạnh — dám thừa nhận sai sót (admit mistakes) sớm để xử lý kịp hạn chót (tight deadlines). Phản biện: Although professional skills is worth considering (được đào tạo thực tế - trained on the job, còn character rất khó sửa); As for communication skills (smooth talk thiếu trung thực dễ làm hỏng niềm tin - damage trust)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe honesty is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> I am recruiting a new employee and need to pick the most important quality. <strong>If I were in this situation, I think I would</strong> prioritize <strong>honesty</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> honesty is the foundation of real trust in any organization. <strong>This is because</strong> companies rely heavily on dependable staff to protect their reputation. <strong>For example,</strong> managers can safely trust an honest employee with budgets or <strong>sensitive</strong> <strong>client data</strong>, <strong>which</strong> prevents costly mistakes. <strong>Because of this,</strong> the company enjoys true <strong>peace of mind</strong>. <strong>Another reason is that</strong> honest workers build a healthy and productive team environment. <strong>In other words,</strong> they <strong>admit mistakes</strong> openly instead of covering them up. <strong>Moreover,</strong> coworkers can jump in and solve issues before <strong>tight deadlines</strong> are missed. <strong>This can allow</strong> the whole team <strong>to</strong> work smoothly together. <strong>Regarding the other two options, although</strong> <strong>professional skills</strong> <strong>is worth considering</strong>, technical skills can easily be <strong>trained on the job</strong>, whereas poor <strong>character</strong> is very hard to change. <strong>As for</strong> <strong>communication skills</strong>, <strong>I don't think it's a good idea because</strong> <strong>smooth talk</strong> without honesty can seriously <strong>damage trust</strong> with clients.<br><br><strong>In conclusion, I believe</strong> <strong>honesty</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "Honest employees <strong>admit mistakes</strong> openly instead of hiding them."
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
                example: "Technical skills are learnable, whereas poor <strong>character</strong> is hard to change."
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
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Bám sát từ khóa đề bài 'improve her imagination' theo khung 3 phần chung.",
          length: "B1: ~140–160 từ · B2: ~175–205 từ."
        },
        pitfalls: [
          "Chỉ nói cuốn sách hay mà quên giải thích nó kích thích trí tưởng tượng (picture scenes, guess clues) như thế nào.",
          "Phát âm thiếu âm cuối /s/ trong 'clues', 'twists', 'stories', 'scenes' (đây đều là âm cuối quan trọng của từ).",
          "Nhầm cấu trúc 'recommend + Noun / V-ing' — nói đúng là 'I recommend a mystery novel', không nói 'recommend her a mystery novel' thiếu giới từ."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn thể loại)",
                text: "The situation here is that my friend wants to read a book to improve her imagination. If I were her, I think I would choose a mystery novel."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Phản biện 2 thể loại còn lại)",
                text: "Lý do 1 (First of all): Có nhiều manh mối (clues) và bí mật giúp người đọc tự hình dung bối cảnh và đoán kết quả -> rèn trí tưởng tượng. Lý do 2 (Another reason): Rất hồi hộp, cuốn hút từ đầu đến cuối nên không thấy chán và đọc hết sách. Phản biện: Không chọn romance novel (cốt truyện dễ đoán, chỉ nói về cảm xúc thường ngày) và không chọn action fiction book (quá tập trung vào đánh nhau nhanh, ít chỗ cho tư duy sáng tạo)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a mystery novel is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend wants to read a book to improve her imagination. <strong>If I were her, I think I would</strong> choose <strong>a mystery novel</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> mystery books make readers think actively. <strong>This is because</strong> they are full of <strong>clues</strong> and hidden secrets. <strong>For example,</strong> my friend can <strong>picture the places</strong> and <strong>guess the ending</strong> in her head. <strong>Because of this,</strong> her imagination grows much stronger. <strong>Another reason is that</strong> this kind of book is very exciting <strong>from start to finish</strong>. <strong>In other words,</strong> every chapter brings a new surprise. <strong>Moreover,</strong> she will not <strong>feel bored</strong> while reading. <strong>This can help</strong> her <strong>to</strong> finish the whole story happily. <strong>Regarding the other two options, although</strong> <strong>a romance novel</strong> <strong>is a good option</strong>, love stories are often <strong>easy to guess</strong> and focus mostly on daily feelings. <strong>As for</strong> <strong>an action fiction book</strong>, <strong>I don't think it's a good idea because</strong> it focuses too much on fast fights instead of <strong>creative thinking</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a mystery novel</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "mystery novel",
                ipa: "/ˈmɪstəri ˈnɑːvl/",
                pos: "n. phr.",
                meaning: "tiểu thuyết trinh thám, bí ẩn",
                example: "If I were her, I think I would choose a <strong>mystery novel</strong>."
              },
              {
                word: "clues",
                ipa: "/kluːz/",
                pos: "n.",
                meaning: "manh mối, gợi ý",
                example: "Mystery books are full of <strong>clues</strong> and hidden secrets."
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
                label: "1. Mở bài (Dẫn nhập & Chọn thể loại)",
                text: "The situation here is that my friend wants to pick a book that sharpens her imagination. If I were her, I think I would go for a mystery novel."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 thể loại còn lại)",
                text: "Lý do 1 (First of all): Đầy manh mối và cú bẻ lái bất ngờ (unexpected twists), buộc người đọc xâu chuỗi chi tiết (connect details) và tự dựng hình ảnh trong tâm trí (mental imagery). Lý do 2 (Another reason): Gợi sự tò mò (curiosity) cực mạnh để cuốn hút đọc hết quyển (stay hooked). Phản biện: Although a romance novel is worth considering (khá dễ đoán - predictable); As for an action fiction book (gay cấn - thrilling - nhưng ít khoảng lặng để suy ngẫm sâu - deep reflection)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a mystery novel is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend is looking for a book that can sharpen her imagination. <strong>If I were her, I think I would</strong> go for <strong>a mystery novel</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> mystery stories push the reader's mind to work creatively. <strong>This is because</strong> they are packed with hidden clues and <strong>unexpected twists</strong>. <strong>For example,</strong> she has to picture scenes and <strong>connect details</strong> like a detective, <strong>which</strong> actively stimulates her <strong>mental imagery</strong>. <strong>Because of this,</strong> her imagination gets a real workout. <strong>Another reason is that</strong> a clever mystery builds strong <strong>curiosity</strong> from the very first chapter. <strong>In other words,</strong> readers always want to discover what happens next. <strong>Moreover,</strong> the suspense keeps her engaged rather than putting the book down halfway. <strong>This can allow</strong> her <strong>to</strong> <strong>stay hooked</strong> and enjoy the entire reading experience. <strong>Regarding the other two options, although</strong> <strong>a romance novel</strong> <strong>is worth considering</strong>, love stories are often quite <strong>predictable</strong> and focus mostly on everyday emotions. <strong>As for</strong> <strong>an action fiction book</strong>, <strong>I don't think it's a good idea because</strong> fast chases feel <strong>thrilling</strong>, yet non-stop fighting leaves little room for <strong>deep reflection</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a mystery novel</strong> <strong>is the most suitable option in this situation.</strong>",
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
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were in this situation, I think I would...'). Liên hệ thực tế Việt Nam theo đúng khung dàn ý 3 phần chung.",
          length: "B1: ~140–160 từ · B2: ~175–205 từ."
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
                text: "The situation here is that a couple is choosing a primary school for their young daughter. If I were in this situation, I think I would choose a public school near her home."
              },
              {
                label: "2. Thân bài (2 lý do chọn & Phản biện 2 loại trường còn lại)",
                text: "Lý do 1 (First of all): Rất tiện và an toàn để bố mẹ đưa đón hằng ngày, bé được ngủ đủ giấc thay vì kẹt xe. Lý do 2 (Another reason): Học phí hợp lý giúp tiết kiệm tiền, mà bé vẫn học tốt các môn cơ bản và kết bạn quanh khu phố. Phản biện: Không chọn international school (học phí quá đắt, trẻ nhỏ cần vững tiếng Việt trước) và không chọn private school (thường xa nhà và tốn nhiều tiền phụ phí)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a public school near her home is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> a couple is choosing a primary school for their young daughter. <strong>If I were in this situation, I think I would</strong> choose <strong>a public school near her home</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a nearby school is very safe and easy for daily travel. <strong>This is because</strong> parents do not need to spend much time on the road. <strong>For example,</strong> the little girl can <strong>get enough sleep</strong> instead of sitting in <strong>heavy traffic</strong> every morning. <strong>Because of this,</strong> she goes to class feeling fresh and happy. <strong>Another reason is that</strong> a <strong>public school</strong> has low tuition fees. <strong>In other words,</strong> the parents can <strong>save money</strong> for other family needs. <strong>Moreover,</strong> their daughter still learns <strong>basic subjects</strong> well and makes friends right in her <strong>neighborhood</strong>. <strong>This can help</strong> her <strong>to</strong> grow up happily near home. <strong>Regarding the other two options, although</strong> <strong>an international school</strong> <strong>is a good option</strong>, it is too expensive and young children need strong Vietnamese skills first. <strong>As for</strong> <strong>a private school</strong>, <strong>I don't think it's a good idea because</strong> it is often far away and costs a lot of <strong>extra money</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a public school near her home</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "public school",
                ipa: "/ˈpʌblɪk skuːl/",
                pos: "n. phr.",
                meaning: "trường công lập",
                example: "If I were in this situation, I think I would choose a <strong>public school</strong> near her home."
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
                label: "1. Mở bài (Dẫn nhập & Chọn loại trường)",
                text: "The situation here is that a couple wants to find the right primary school for their daughter. If I were in this situation, I think I would go for a public school near her home."
              },
              {
                label: "2. Thân bài (2 lý do nâng cấp + Phản biện 2 loại trường còn lại)",
                text: "Lý do 1 (First of all): Rất thuận tiện (convenient) và an toàn cho việc đưa đón hằng ngày (daily commute), giúp con nghỉ ngơi đủ thay vì mệt vì kẹt xe. Lý do 2 (Another reason): Học phí phải chăng (affordable) giảm gánh nặng tài chính (financial burden) mà vẫn có nền tảng vững chắc (solid foundation) ở các môn chính (core subjects) và bạn bè gần nhà. Phản biện: Although an international school is worth considering (quá đắt đỏ - far too expensive - dễ làm yếu tiếng Việt - weaken); As for a private school (xa hơn và nhiều phụ phí xe/ăn uống)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a public school near her home is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> a couple wants to find the right primary school for their daughter. <strong>If I were in this situation, I think I would</strong> go for <strong>a public school near her home</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a nearby school makes the <strong>daily commute</strong> much more <strong>convenient</strong> and safer for a young child. <strong>This is because</strong> long trips in rush hour are exhausting for primary students. <strong>For example,</strong> her parents can easily <strong>pick her up</strong> right on time, <strong>which</strong> lets her get enough rest instead of sitting in heavy traffic. <strong>Because of this,</strong> she stays energetic and healthy every school day. <strong>Another reason is that</strong> public schools offer very <strong>affordable</strong> tuition. <strong>In other words,</strong> the family avoids unnecessary <strong>financial burden</strong> while still getting a <strong>solid foundation</strong> in <strong>core subjects</strong>. <strong>Moreover,</strong> the girl can make close friends right in her own neighborhood. <strong>This can allow</strong> her <strong>to</strong> feel comfortable and happy at school. <strong>Regarding the other two options, although</strong> <strong>an international school</strong> <strong>is worth considering</strong>, the fees are <strong>far too expensive</strong> and studying mostly in English too early may <strong>weaken</strong> her Vietnamese skills. <strong>As for</strong> <strong>a private school</strong>, <strong>I don't think it's a good idea because</strong> it is usually farther away and charges high extra fees for buses and meals.<br><br><strong>In conclusion, I believe</strong> <strong>a public school near her home</strong> <strong>is the most suitable option in this situation.</strong>",
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
