// ==========================================================================
// SPEAKING PART 2 — SOLUTION DISCUSSION
// - Khung dàn ý 3 phần dùng chung cho cả Level B1 & Level B2
// - Các cụm mở rộng (This is because, For example, Because of this, In other words,
//   Moreover, This can...) chỉ là gợi ý linh hoạt, không bắt buộc dùng hết.
// - Level B1: ngắn gọn, dễ nhớ (mỗi lý do 1 câu luận điểm + 1–2 câu mở rộng).
// - Level B2: diễn đạt tự nhiên, giàu collocation & cấu trúc linh hoạt.
// ==========================================================================

window.SPEAKING_PART2_OUTLINE = {
  title: "General Outline · Speaking Part 2",
  subtitle: "Khung dàn ý 3 phần dùng chung cho cả B1 & B2 · Các cụm mở rộng chỉ là gợi ý linh hoạt, không bắt buộc dùng hết",
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
        promptSentences: [
          {
            enHtml: "Your younger sister has just finished high school and is planning to study at a university.",
            vi: "Em gái bạn vừa tốt nghiệp cấp 3 và đang dự định học đại học."
          },
          {
            enHtml: "She wants to choose a university that provides high-quality education.",
            vi: "Em ấy muốn chọn một trường đại học có chất lượng giáo dục cao."
          },
          {
            enHtml:
              "There are three factors she should consider: <strong>the university’s ranking</strong>, <strong>the distance from her home</strong>, and <strong>the tuition fees</strong>.",
            vi: "Có ba yếu tố em ấy nên cân nhắc: thứ hạng của trường đại học, khoảng cách từ nhà và học phí."
          },
          {
            enHtml: "Which one do you think is the best choice for her?",
            vi: "Bạn nghĩ yếu tố nào là lựa chọn tốt nhất cho em ấy?"
          }
        ],
        promptVi:
          "Em gái bạn vừa tốt nghiệp cấp 3 và đang dự định học đại học. Em ấy muốn chọn một trường có chất lượng giáo dục cao. Có ba yếu tố để cân nhắc: thứ hạng của trường đại học, khoảng cách từ nhà và học phí. Theo bạn yếu tố nào là lựa chọn tốt nhất cho em ấy?",
        optionGuide: {
          easiestOptions: [
            {
              option: "The university’s ranking (Thứ hạng trường)",
              reasons: [
                "Top universities usually have experienced teachers, useful lessons, and modern facilities like big libraries.",
                "A degree from a reputable university helps her find a good job more easily after graduation.",
                "Studying with motivated classmates creates a better learning environment."
              ]
            },
            {
              option: "The tuition fees (Học phí)",
              reasons: [
                "Reasonable tuition reduces money pressure on her parents during four years of university.",
                "She can focus on studying instead of working exhausting part-time hours.",
                "The family can save money for living expenses like rent, food, and books."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "The distance from her home (Khoảng cách từ nhà)",
              whyNot: "It is not the most important factor because even if the campus is far away, she can live in a dormitory or commute by bus."
            },
            {
              option: "The tuition fees (Học phí)",
              whyNot: "Tuition matters, but she can apply for scholarships or work part-time, and quality education always pays off in the long run."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 yếu tố: university's ranking / distance from her home / tuition fees).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Bám khung 3 phần, chọn lọc từ nối tự nhiên.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Chỉ nói mỗi lý do chọn mà quên giải thích tại sao không chọn 2 yếu tố còn lại (khoảng cách & học phí).",
          "Chọn yếu tố không ăn khớp với mục tiêu đề bài ('high-quality education'): nói về ranking sẽ thuyết phục và dễ liên hệ giáo viên, cơ sở vật chất, việc làm nhất.",
          "Lặp đi lặp lại cụm 'very good' cho cả giáo viên, phòng học lẫn việc làm; nên thay bằng useful lessons, modern library, good job."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "The university’s ranking (Thứ hạng trường)",
                  reasons: [
                    "Top universities have good teachers, modern classrooms, and big libraries for useful lessons.",
                    "Companies trust famous schools, so she can get a good job easily after graduation."
                  ]
                },
                {
                  option: "The tuition fees (Học phí)",
                  reasons: [
                    "Low fees reduce money pressure on her parents for four years.",
                    "She can focus on studying instead of working too many part-time hours.",
                    "Her family can save money for rent, food, and books."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "The distance from her home (Khoảng cách từ nhà)",
                  whyNot: "Even if the school is far away, she can live in a dormitory or take the bus."
                },
                {
                  option: "The tuition fees (Học phí)",
                  whyNot: "She can apply for scholarships to save money."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my younger sister wants to choose a good university. If I were her, I think I would choose the university's ranking."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Trường thứ hạng cao có thầy cô giỏi, phòng học hiện đại -> học ở thư viện lớn, học hiệu quả hơn. Lý do 2 (1 câu luận điểm + 2 câu mở rộng): Dễ tìm việc tốt sau tốt nghiệp vì công ty tin tưởng sinh viên trường nổi tiếng. Phản biện ngắn: Distance (ở ký túc xá / đi xe buýt được); Tuition fees (xin học bổng để tiết kiệm tiền)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe the university's ranking is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister wants to choose a good university. <strong>If I were her, I think I would</strong> choose <strong>the university's ranking</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a top university has good teachers and <strong>modern classrooms</strong>. She can study in a big library and learn <strong>useful lessons</strong>. <strong>Because of this,</strong> she can <strong>study effectively</strong>.<br><br><strong>Another reason is that</strong> a good ranking brings better jobs <strong>after graduation</strong>. Companies trust students from famous schools and believe they have strong skills. <strong>This can help</strong> her get a good job easily.<br><br><strong>Regarding the other two options, although</strong> <strong>the distance from her home</strong> <strong>is a good option</strong>, she can live in a <strong>dormitory</strong> or take the bus. <strong>As for</strong> <strong>the tuition fees</strong>, <strong>I don't think it's a good idea because</strong> she can <strong>apply for scholarships</strong> to <strong>save money</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>the university's ranking</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "She can live in a <strong>dormitory</strong> or take the bus."
              },
              {
                word: "useful lessons",
                ipa: "/ˈjuːsfl ˈlesnz/",
                pos: "n. phr.",
                meaning: "những bài học hữu ích",
                example: "She can study in a big library and learn <strong>useful lessons</strong>."
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
                example: "Scholarships help students <strong>save money</strong>."
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
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Giảng viên giàu kinh nghiệm (experienced lecturers) và chương trình bài bản (well-structured curriculum) giúp rèn kỹ năng thực tế và tự tin hơn. Lý do 2: Trường uy tín (reputable university) mở rộng cơ hội nghề nghiệp (career opportunities), kết nối doanh nghiệp để dễ có việc ý nghĩa (meaningful job). Phản biện: Distance (ở ký túc xá / commute by bus); Tuition fees (xin học bổng, giáo dục tốt luôn pays off in the long run)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe the university's ranking is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister is looking for a university that provides high-quality education. <strong>If I were her, I think I would</strong> <strong>prioritize</strong> <strong>the university's ranking</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a high-ranking university guarantees much better teaching quality. Top schools usually have <strong>experienced lecturers</strong> and a <strong>well-structured curriculum</strong>, <strong>which</strong> helps students build practical skills. Studying with modern facilities also boosts her academic performance and confidence in her major.<br><br><strong>Another reason is that</strong> graduating from a <strong>reputable</strong> university opens up wider <strong>career opportunities</strong>. Employers strongly value graduates from well-known schools, and top universities often connect students directly with major companies. This gives her a real advantage when looking for a <strong>meaningful</strong> job right after graduation.<br><br><strong>Regarding the other two options, although</strong> <strong>the distance from her home</strong> <strong>is worth considering</strong>, she can easily stay in a dormitory or <strong>commute</strong> by bus. <strong>As for</strong> <strong>the tuition fees</strong>, <strong>I don't think it's a good idea because</strong> she can apply for scholarships, and quality education always <strong>pays off in the long run</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>the university's ranking</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "Graduating from a <strong>reputable</strong> university opens up wider career opportunities."
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
                example: "This gives her an advantage when looking for a <strong>meaningful</strong> job."
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
        promptSentences: [
          {
            enHtml: "Your cousin is about to enter university and is confused about choosing the right one.",
            vi: "Anh/em họ của bạn sắp vào đại học và đang bối rối chưa biết chọn trường nào phù hợp."
          },
          {
            enHtml:
              "There are three criteria for him or her to consider: <strong>affordable fees</strong>, <strong>student support</strong>, and <strong>campus facilities</strong>.",
            vi: "Có ba tiêu chí để bạn ấy cân nhắc: học phí vừa phải, hỗ trợ sinh viên và cơ sở vật chất của trường."
          },
          {
            enHtml: "Which factor do you think is the most important?",
            vi: "Bạn nghĩ yếu tố nào là quan trọng nhất?"
          }
        ],
        promptVi:
          "Anh/em họ của bạn sắp vào đại học và đang bối rối chưa biết chọn trường nào phù hợp. Có ba tiêu chí để cân nhắc: học phí vừa phải, hỗ trợ sinh viên và cơ sở vật chất trong khuôn viên trường. Theo bạn yếu tố nào quan trọng nhất?",
        optionGuide: {
          easiestOptions: [
            {
              option: "Affordable fees (Học phí vừa phải)",
              reasons: [
                "It eases the financial burden on his parents over four years of living expenses.",
                "He can focus on studying and final exams instead of taking exhausting part-time jobs.",
                "Manageable tuition gives the whole family greater peace of mind."
              ]
            },
            {
              option: "Campus facilities (Cơ sở vật chất)",
              reasons: [
                "Air-conditioned classrooms, modern libraries, and computer labs make studying much more comfortable.",
                "Good sports fields and study spaces help students stay active and reduce stress.",
                "A clean, modern campus makes students feel excited to go to school every day."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "Campus facilities (Cơ sở vật chất)",
              whyNot: "Modern buildings are nice to have, but students can still learn effectively using online materials and public libraries."
            },
            {
              option: "Student support (Hỗ trợ sinh viên)",
              whyNot: "It is mainly useful during the first week of orientation, while teachers and close friends can help with daily problems."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 tiêu chí: affordable fees / student support / campus facilities).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were him, I think I would...'). Bám khung 3 phần, triển khai tự nhiên.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Nhầm nghĩa từ 'affordable fees' thành 'rẻ nhất' (cheap); đúng phải là 'vừa túi tiền, hợp khả năng chi trả'.",
          "Quên nhắc đến việc ngoài học phí, sinh viên đại học còn phải tốn tiền trọ, ăn uống và sách vở suốt 4 năm.",
          "Khi phản biện 'campus facilities' hay 'student support', tránh chê vô lý (nói 'không cần chút nào'); hãy công nhận mặt tốt rồi nêu lý do chưa cấp bách bằng học phí."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "Affordable fees (Học phí vừa phải)",
                  reasons: [
                    "Lower fees reduce money pressure on his parents, who also pay for rent, food, and books.",
                    "He can focus on studying and final exams instead of working too many part-time hours."
                  ]
                },
                {
                  option: "Campus facilities (Cơ sở vật chất)",
                  reasons: [
                    "Modern classrooms, libraries, and computer rooms make studying comfortable.",
                    "Good sports areas help students stay active and reduce stress.",
                    "A clean and nice school makes him happy to go to class every day."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "Campus facilities (Cơ sở vật chất)",
                  whyNot: "Students can still learn well at public libraries or online."
                },
                {
                  option: "Student support (Hỗ trợ sinh viên)",
                  whyNot: "Teachers and close friends can help him every day."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my cousin is about to enter university and feels confused. If I were him, I think I would choose affordable fees."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Giảm áp lực tiền bạc cho bố mẹ vì 4 năm học còn phải trả tiền trọ, ăn uống và sách vở -> cả nhà bớt căng thẳng. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Tập trung học tập hơn vì không cần làm thêm quá nhiều giờ, có đủ sức cho kỳ thi cuối kỳ. Phản biện ngắn: Campus facilities (vẫn học tốt ở thư viện công cộng); Student support (thầy cô và bạn thân có thể giúp hằng ngày)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe affordable fees is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin is entering university and feels confused about choosing a school. <strong>If I were him, I think I would</strong> choose <strong>affordable fees</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> lower fees reduce <strong>money pressure</strong> on his parents. University takes four years, and he also has to <strong>pay for</strong> rent, food, and books. <strong>Because of this,</strong> his whole family feels less stressed.<br><br><strong>Another reason is that</strong> lower fees let him <strong>focus on</strong> studying. He does not need to work too many <strong>part-time hours</strong>, so he has enough energy for his <strong>final exams</strong>.<br><br><strong>Regarding the other two options, although</strong> <strong>campus facilities</strong> <strong>is a good option</strong>, students can still learn well at <strong>public libraries</strong>. <strong>As for</strong> <strong>student support</strong>, <strong>I don't think it's a good idea because</strong> teachers and <strong>close friends</strong> can help him every day.<br><br><strong>In conclusion, I believe</strong> <strong>affordable fees</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "Lower fees help reduce <strong>money pressure</strong> on parents."
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
                example: "He has enough energy for his <strong>final exams</strong>."
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
                example: "Students can still learn well at <strong>public libraries</strong>."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "bạn thân",
                example: "Teachers and <strong>close friends</strong> can help him every day."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my cousin is about to enter university and feels confused about choosing the right one. If I were him, I think I would go for affordable fees."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Giảm gánh nặng tài chính (ease the financial burden) suốt 4 năm chi phí sinh hoạt (living expenses), giúp cả nhà thấy an tâm (peace of mind). Lý do 2: Giữ tập trung học tập thay vì làm thêm kiệt sức (exhausting shifts), tránh uể oải (feel sluggish) và giữ điểm cao. Phản biện: Campus facilities (không quá thiết yếu - essential - khi có tài liệu online); Student support (chủ yếu hữu ích dịp freshman orientation, hằng ngày có giảng viên và bạn bè hướng dẫn - daily guidance)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe affordable fees is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin is about to enter university and feels confused about choosing the right one. <strong>If I were him, I think I would</strong> go for <strong>affordable fees</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> reasonable tuition helps ease the <strong>financial burden</strong> on his family. University involves four continuous years of <strong>living expenses</strong> like rent, meals, and textbooks, <strong>which</strong> add up very quickly. Having manageable fees gives both him and his parents much greater <strong>peace of mind</strong>.<br><br><strong>Another reason is that</strong> affordable tuition protects his focus on studying. Instead of taking <strong>exhausting</strong> part-time shifts just to cover school fees, he can save his energy for lectures and final exams. <strong>As a result,</strong> he won't <strong>feel sluggish</strong> in class and can keep his grades consistently high.<br><br><strong>Regarding the other two options, although</strong> <strong>campus facilities</strong> <strong>is worth considering</strong>, fancy buildings are not <strong>essential</strong> when students can study through online resources. <strong>As for</strong> <strong>student support</strong>, <strong>I don't think it's a good idea because</strong> it is mainly needed during <strong>freshman orientation</strong>, while lecturers and classmates provide enough <strong>daily guidance</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>affordable fees</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "University involves four continuous years of <strong>living expenses</strong>."
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
                example: "Working late at night makes students <strong>feel sluggish</strong> in class."
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
                example: "Student support is mainly needed during <strong>freshman orientation</strong>."
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
        promptSentences: [
          {
            enHtml: "You are a recruiter and you are going to hire a new employee.",
            vi: "Bạn là nhà tuyển dụng và sắp tuyển một nhân viên mới."
          },
          {
            enHtml:
              "There are three qualities for you to consider: <strong>communication skills</strong>, <strong>honesty</strong>, and <strong>professional skills</strong>.",
            vi: "Có ba phẩm chất để bạn cân nhắc: kỹ năng giao tiếp, sự trung thực và kỹ năng chuyên môn."
          },
          {
            enHtml: "Which quality do you think is the most important?",
            vi: "Bạn nghĩ phẩm chất nào là quan trọng nhất?"
          }
        ],
        promptVi:
          "Bạn là một nhà tuyển dụng và sắp tuyển một nhân viên mới. Có ba phẩm chất để bạn cân nhắc: kỹ năng giao tiếp, sự trung thực và kỹ năng chuyên môn. Bạn nghĩ phẩm chất nào là quan trọng nhất?",
        optionGuide: {
          easiestOptions: [
            {
              option: "Honesty (Sự trung thực)",
              reasons: [
                "It builds strong trust, so managers feel safe assigning budgets, important projects, or sensitive client data.",
                "Honest employees admit mistakes early instead of hiding them, helping the team fix problems on time.",
                "Job skills can be trained step by step, whereas poor character is very hard to change."
              ]
            },
            {
              option: "Professional skills (Kỹ năng chuyên môn)",
              reasons: [
                "A skilled employee can start working right away without needing long, costly training.",
                "They complete tasks quickly and accurately, which boosts the whole team's productivity.",
                "They can also support coworkers when difficult technical issues come up."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "Professional skills (Kỹ năng chuyên môn)",
              whyNot: "Technical skills are important, but a new employee can easily learn them on the job through training."
            },
            {
              option: "Communication skills (Kỹ năng giao tiếp)",
              whyNot: "Speaking smoothly is helpful, yet sweet talk without honesty can quickly damage trust with clients and coworkers."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 phẩm chất: communication skills / honesty / professional skills).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were in this situation, I think I would...'). Đóng vai nhà tuyển dụng, triển khai tự nhiên.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Phát âm nhầm âm /h/ câm trong từ 'honesty' (/ˈɑːnəsti/) và 'honest' (/ˈɑːnɪst/) — KHÔNG đọc chữ 'h' đầu từ!",
          "Nói chung chung 'honesty is good' mà thiếu ví dụ công việc thực tế (giữ tiền, bảo mật khách hàng, nhận lỗi sớm để cả nhóm sửa).",
          "Quên thừa nhận vai trò của professional skills trước khi giải thích lý do chưa chọn (kỹ năng có thể đào tạo dần còn tính cách rất khó sửa)."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "Honesty (Sự trung thực)",
                  reasons: [
                    "It builds strong trust, so managers feel safe giving them money or important projects.",
                    "Honest workers tell the truth early when they make a mistake, helping the team fix problems fast."
                  ]
                },
                {
                  option: "Professional skills (Kỹ năng chuyên môn)",
                  reasons: [
                    "A skilled worker can start working right away without long training.",
                    "They finish tasks quickly and carefully.",
                    "They can also help coworkers with hard tasks."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "Professional skills (Kỹ năng chuyên môn)",
                  whyNot: "A new worker can learn job skills step by step."
                },
                {
                  option: "Communication skills (Kỹ năng giao tiếp)",
                  whyNot: "Sweet words without honesty can hurt customers' trust."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that I am a recruiter looking for a new employee. If I were in this situation, I think I would choose honesty."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Xây dựng niềm tin ở công ty -> sếp yên tâm giao tiền hay dự án quan trọng, đỡ lo gian lận. Lý do 2 (1 câu luận điểm + 2 câu mở rộng): Giúp nhóm sửa lỗi nhanh vì dám nói sự thật sớm khi mắc sai lầm -> xong việc đúng hạn. Phản biện ngắn: Professional skills (học từng bước sau khi vào làm); Communication skills (lời ngon ngọt thiếu trung thực làm mất lòng khách)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe honesty is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> I am a recruiter and need to hire a new employee. <strong>If I were in this situation, I think I would</strong> choose <strong>honesty</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> honesty builds <strong>strong trust</strong> at work. Managers can <strong>feel safe</strong> giving an honest worker money or <strong>important projects</strong>. <strong>Because of this,</strong> there is less worry about cheating.<br><br><strong>Another reason is that</strong> honest workers help a team fix problems fast. When they <strong>make a mistake</strong>, they <strong>tell the truth</strong> early. This helps everyone finish tasks on time.<br><br><strong>Regarding the other two options, although</strong> <strong>professional skills</strong> <strong>is a good option</strong>, a new worker can learn job skills <strong>step by step</strong>. <strong>As for</strong> <strong>communication skills</strong>, <strong>I don't think it's a good idea because</strong> <strong>sweet words</strong> without honesty can hurt customers' trust.<br><br><strong>In conclusion, I believe</strong> <strong>honesty</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "An honest worker builds <strong>strong trust</strong> at work."
              },
              {
                word: "feel safe",
                ipa: "/fiːl seɪf/",
                pos: "v. phr.",
                meaning: "cảm thấy an tâm, tin cậy",
                example: "Managers can <strong>feel safe</strong> giving them money or projects."
              },
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɑːdʒekts/",
                pos: "n. phr.",
                meaning: "những dự án quan trọng",
                example: "Managers trust honest workers with <strong>important projects</strong>."
              },
              {
                word: "make a mistake",
                ipa: "/meɪk ə mɪˈsteɪk/",
                pos: "v. phr.",
                meaning: "mắc sai lầm",
                example: "When they <strong>make a mistake</strong>, they tell the truth early."
              },
              {
                word: "tell the truth",
                ipa: "/tel ðə truːθ/",
                pos: "v. phr.",
                meaning: "nói sự thật",
                example: "Good employees always <strong>tell the truth</strong> early."
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
                example: "<strong>Sweet words</strong> without honesty can hurt customers' trust."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that I am recruiting a new employee and need to pick the most important quality. If I were in this situation, I think I would prioritize honesty."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Nền tảng niềm tin trong công ty — yên tâm giao ngân sách, dữ liệu khách hàng nhạy cảm (sensitive client data), đem lại sự an tâm (peace of mind). Lý do 2: Tạo môi trường làm việc lành mạnh — dám thừa nhận sai sót (admit mistakes) sớm để cả nhóm xử lý kịp hạn chót (tight deadlines). Phản biện: Professional skills (có thể trained on the job, còn character khó sửa); Communication skills (smooth talk thiếu trung thực dễ damage trust)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe honesty is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> I am recruiting a new employee and need to pick the most important quality. <strong>If I were in this situation, I think I would</strong> prioritize <strong>honesty</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> honesty is the foundation of real trust in any company. Managers need dependable staff to protect the business, so they can safely trust an honest employee with budgets or <strong>sensitive</strong> <strong>client data</strong>. Having trustworthy people on board gives leaders true <strong>peace of mind</strong>.<br><br><strong>Another reason is that</strong> honest workers build a healthy and productive team environment. When issues happen, they <strong>admit mistakes</strong> openly instead of covering them up, <strong>which</strong> allows coworkers to step in and solve problems before <strong>tight deadlines</strong> are missed.<br><br><strong>Regarding the other two options, although</strong> <strong>professional skills</strong> <strong>is worth considering</strong>, technical skills can easily be <strong>trained on the job</strong>, whereas poor <strong>character</strong> is very hard to change. <strong>As for</strong> <strong>communication skills</strong>, <strong>I don't think it's a good idea because</strong> <strong>smooth talk</strong> without honesty can seriously <strong>damage trust</strong> with clients.<br><br><strong>In conclusion, I believe</strong> <strong>honesty</strong> <strong>is the most suitable option in this situation.</strong>",
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
    title: "Choosing a Type",
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
        promptSentences: [
          {
            enHtml: "Your friend wants to read a book to improve her imagination.",
            vi: "Bạn của bạn muốn đọc một cuốn sách để cải thiện trí tưởng tượng."
          },
          {
            enHtml:
              "She is considering three options: <strong>a mystery novel</strong>, <strong>a romance novel</strong>, and <strong>an action fiction book</strong>.",
            vi: "Cô ấy đang cân nhắc ba lựa chọn: tiểu thuyết trinh thám, tiểu thuyết lãng mạn và sách hành động viễn tưởng."
          },
          {
            enHtml: "Which one would you recommend?",
            vi: "Bạn sẽ giới thiệu cuốn nào?"
          }
        ],
        promptVi:
          "Bạn của bạn muốn đọc một cuốn sách để cải thiện trí tưởng tượng. Cô ấy đang cân nhắc ba thể loại: tiểu thuyết trinh thám, tiểu thuyết lãng mạn và sách hành động viễn tưởng. Bạn sẽ gợi ý loại nào?",
        optionGuide: {
          easiestOptions: [
            {
              option: "A mystery novel (Tiểu thuyết trinh thám)",
              reasons: [
                "It is packed with clues and unexpected twists that make readers picture scenes and guess the ending.",
                "The suspense keeps her curious from start to finish, so she stays hooked and finishes the whole book.",
                "Connecting details like a detective actively develops both imagination and creative thinking."
              ]
            },
            {
              option: "An action fiction book (Sách hành động viễn tưởng)",
              reasons: [
                "Fast-paced adventures and imaginary worlds make the reading experience very exciting.",
                "Detailed descriptions of characters and settings help readers create vivid images in their minds.",
                "It is a great way to unwind and enjoy reading after a busy day."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "A romance novel (Tiểu thuyết lãng mạn)",
              whyNot: "Love stories are often quite predictable and focus mostly on everyday feelings rather than creative imagination."
            },
            {
              option: "An action fiction book (Sách hành động viễn tưởng)",
              whyNot: "It focuses too heavily on non-stop fights and chases, leaving little room for deep reflection and imagination."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 thể loại sách: mystery novel / romance novel / action fiction book).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Bám sát từ khóa 'improve her imagination'.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Chỉ nói cuốn sách hay mà quên giải thích nó kích thích trí tưởng tượng (picture scenes, guess clues) như thế nào.",
          "Phát âm thiếu âm cuối /s/ trong 'clues', 'twists', 'stories', 'scenes' (đây đều là âm cuối quan trọng của từ).",
          "Nhầm cấu trúc 'recommend + Noun / V-ing' — nói đúng là 'I recommend a mystery novel', không nói 'recommend her a mystery novel' thiếu giới từ."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "A mystery novel (Tiểu thuyết trinh thám)",
                  reasons: [
                    "It is full of clues, so she can picture the places and guess the ending.",
                    "Every chapter brings a new surprise, so she will not feel bored from start to finish."
                  ]
                },
                {
                  option: "An action fiction book (Sách hành động viễn tưởng)",
                  reasons: [
                    "Fast adventures and new worlds make reading very exciting.",
                    "Clear stories about characters and places help her picture scenes in her head.",
                    "It is a fun way to relax after a busy day."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "A romance novel (Tiểu thuyết lãng mạn)",
                  whyNot: "Love stories are often easy to guess."
                },
                {
                  option: "An action fiction book (Sách hành động viễn tưởng)",
                  whyNot: "It focuses too much on fights instead of creative thinking."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn thể loại)",
                text: "The situation here is that my friend wants to read a book to improve her imagination. If I were her, I think I would choose a mystery novel."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 thể loại còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Sách trinh thám giúp người đọc suy nghĩ tích cực nhờ nhiều manh mối (clues), tự hình dung bối cảnh và đoán kết thúc -> trí tưởng tượng mạnh hơn. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Hồi hộp từ đầu đến cuối vì mỗi chương có bất ngờ mới nên không chán. Phản biện ngắn: Romance novel (dễ đoán); Action fiction (tập trung đánh nhau thay vì tư duy sáng tạo)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a mystery novel is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend wants to read a book to improve her imagination. <strong>If I were her, I think I would</strong> choose <strong>a mystery novel</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> mystery books make readers think actively. They are full of <strong>clues</strong>, so my friend can <strong>picture the places</strong> and <strong>guess the ending</strong>. <strong>Because of this,</strong> her imagination grows stronger.<br><br><strong>Another reason is that</strong> mystery stories are exciting <strong>from start to finish</strong>. Every chapter brings a new surprise, so she will not <strong>feel bored</strong> and will finish the whole book.<br><br><strong>Regarding the other two options, although</strong> <strong>a romance novel</strong> <strong>is a good option</strong>, love stories are often <strong>easy to guess</strong>. <strong>As for</strong> <strong>an action fiction book</strong>, <strong>I don't think it's a good idea because</strong> it focuses too much on fights instead of <strong>creative thinking</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a mystery novel</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "Mystery books are full of <strong>clues</strong> and secrets."
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
                example: "Mystery stories are exciting <strong>from start to finish</strong>."
              },
              {
                word: "feel bored",
                ipa: "/fiːl bɔːrd/",
                pos: "v. phr.",
                meaning: "cảm thấy chán",
                example: "With new surprises, she will not <strong>feel bored</strong>."
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
                example: "Mystery books encourage <strong>creative thinking</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn thể loại)",
                text: "The situation here is that my friend is looking for a book that can sharpen her imagination. If I were her, I think I would go for a mystery novel."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 thể loại kia)",
                text: "Lý do 1: Đầy manh mối và cú bẻ lái bất ngờ (unexpected twists), buộc người đọc xâu chuỗi chi tiết (connect details) như thám tử và kích thích hình ảnh tâm trí (mental imagery). Lý do 2: Khơi gợi sự tò mò (curiosity) ngay từ chương đầu giúp cuốn hút đọc hết quyển (stay hooked). Phản biện: Romance novel (khá dễ đoán - predictable); Action fiction (gay cấn - thrilling - nhưng ít chỗ suy ngẫm sâu - deep reflection)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a mystery novel is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend is looking for a book that can sharpen her imagination. <strong>If I were her, I think I would</strong> go for <strong>a mystery novel</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> mystery stories push the reader's mind to work creatively. Packed with hidden clues and <strong>unexpected twists</strong>, they make her picture scenes and <strong>connect details</strong> like a detective, <strong>which</strong> actively stimulates her <strong>mental imagery</strong>.<br><br><strong>Another reason is that</strong> a clever mystery builds strong <strong>curiosity</strong> from the very first chapter. Because she always wants to discover what happens next, the suspense keeps her engaged rather than putting the book down halfway. This allows her to <strong>stay hooked</strong> and enjoy the entire reading experience.<br><br><strong>Regarding the other two options, although</strong> <strong>a romance novel</strong> <strong>is worth considering</strong>, love stories are often quite <strong>predictable</strong> and focus mostly on everyday emotions. <strong>As for</strong> <strong>an action fiction book</strong>, <strong>I don't think it's a good idea because</strong> fast chases feel <strong>thrilling</strong>, yet non-stop fighting leaves little room for <strong>deep reflection</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a mystery novel</strong> <strong>is the most suitable option in this situation.</strong>",
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
        promptSentences: [
          {
            enHtml: "A couple is choosing a primary school for their child.",
            vi: "Một cặp vợ chồng đang chọn trường tiểu học cho con của họ."
          },
          {
            enHtml:
              "What kind of school would you recommend: <strong>a public school near her home</strong>, <strong>an international school</strong>, or <strong>a private school</strong>?",
            vi: "Bạn sẽ gợi ý loại hình trường nào: một trường công lập gần nhà, một trường quốc tế hay một trường tư thục?"
          }
        ],
        promptVi:
          "Một cặp vợ chồng đang chọn trường tiểu học cho con gái của họ. Bạn sẽ gợi ý loại hình trường nào: một trường công lập gần nhà, một trường quốc tế hay một trường tư thục?",
        optionGuide: {
          easiestOptions: [
            {
              option: "A public school near her home (Trường công lập gần nhà)",
              reasons: [
                "The daily commute is safe and convenient, so the child gets enough sleep instead of sitting in heavy traffic.",
                "Affordable tuition helps the family save money while still giving her a solid foundation in core subjects.",
                "She can easily make close friends right in her own neighborhood."
              ]
            },
            {
              option: "A private school (Trường tư thục)",
              reasons: [
                "Smaller class sizes allow teachers to pay closer attention to each young student.",
                "Better facilities and extracurricular clubs help children build confidence and soft skills.",
                "The fees are much more manageable compared to an international school."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "An international school (Trường quốc tế)",
              whyNot: "The tuition fees are far too expensive for most families, and studying mostly in English too early may weaken her Vietnamese skills."
            },
            {
              option: "A private school (Trường tư thục)",
              whyNot: "It is usually farther away and charges high extra fees for school buses and meals compared to a nearby public school."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 loại trường: public school near her home / international school / private school).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were in this situation, I think I would...'). Liên hệ thực tế Việt Nam.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Lẫn lộn đại từ nhân xưng ('her' là cô con gái nhỏ trong đề, còn bố mẹ là 'they / the parents').",
          "Quên nhắc tới yếu tố 'near her home' trong tên lựa chọn — đây là điểm mạnh thực tế nhất cho trẻ 6–10 tuổi (đỡ dậy sớm, đỡ kẹt xe).",
          "Chỉ trích trường quốc tế thiếu thực tế; nên giải thích hợp lý là học phí quá cao với đa số gia đình và trẻ nhỏ cần vững tiếng Việt trước."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "A public school near her home (Trường công lập gần nhà)",
                  reasons: [
                    "It is safe and easy for daily travel, so the child gets enough sleep instead of sitting in heavy traffic.",
                    "Low fees help parents save money, while she learns basic subjects and makes friends in her neighborhood."
                  ]
                },
                {
                  option: "A private school (Trường tư thục)",
                  reasons: [
                    "Small classes help teachers take good care of each student.",
                    "Nice classrooms and school clubs help children feel more confident.",
                    "The fees are lower than an international school."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "An international school (Trường quốc tế)",
                  whyNot: "It is too expensive for most families."
                },
                {
                  option: "A private school (Trường tư thục)",
                  whyNot: "It is often far away and costs a lot of extra money."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn loại trường)",
                text: "The situation here is that a couple is choosing a primary school for their daughter. If I were in this situation, I think I would choose a public school near her home."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 loại trường còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Trường gần nhà an toàn, đi lại dễ -> bé ngủ đủ giấc thay vì kẹt xe sáng sớm, đi học vui vẻ. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Trường công học phí thấp giúp tiết kiệm tiền, mà bé vẫn học tốt các môn cơ bản và kết bạn quanh khu phố. Phản biện ngắn: International school (quá đắt); Private school (thường xa và nhiều tiền phụ phí)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a public school near her home is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> a couple is choosing a primary school for their daughter. <strong>If I were in this situation, I think I would</strong> choose <strong>a public school near her home</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a nearby school is safe and easy for daily travel. The little girl can <strong>get enough sleep</strong> instead of sitting in <strong>heavy traffic</strong> every morning. <strong>Because of this,</strong> she goes to class feeling happy.<br><br><strong>Another reason is that</strong> a <strong>public school</strong> has low tuition fees. Parents can save money, while their daughter still learns <strong>basic subjects</strong> well and makes friends in her <strong>neighborhood</strong>.<br><br><strong>Regarding the other two options, although</strong> an <strong>international school</strong> <strong>is a good option</strong>, it is too expensive for most families. <strong>As for</strong> a <strong>private school</strong>, <strong>I don't think it's a good idea because</strong> it is often far away and costs a lot of <strong>extra money</strong>.<br><br><strong>In conclusion, I believe</strong> <strong>a public school near her home</strong> <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "public school",
                ipa: "/ˈpʌblɪk skuːl/",
                pos: "n. phr.",
                meaning: "trường công lập",
                example: "I would choose a <strong>public school</strong> near her home."
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
                example: "Public schools teach <strong>basic subjects</strong> like Math and Vietnamese well."
              },
              {
                word: "neighborhood",
                ipa: "/ˈneɪbərhʊd/",
                pos: "n.",
                meaning: "khu phố, hàng xóm xung quanh",
                example: "She can make friends right in her <strong>neighborhood</strong>."
              },
              {
                word: "international school",
                ipa: "/ˌɪntərˈnæʃnəl skuːl/",
                pos: "n. phr.",
                meaning: "trường quốc tế",
                example: "An <strong>international school</strong> is too expensive for most families."
              },
              {
                word: "private school",
                ipa: "/ˈpraɪvət skuːl/",
                pos: "n. phr.",
                meaning: "trường tư thục",
                example: "A <strong>private school</strong> usually charges higher monthly fees."
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
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 loại trường kia)",
                text: "Lý do 1: Rất thuận tiện (convenient) và an toàn cho việc đưa đón hằng ngày (daily commute), bố mẹ dễ đón đúng giờ (pick her up) giúp con nghỉ ngơi đủ thay vì kẹt xe. Lý do 2: Học phí phải chăng (affordable) giảm gánh nặng tài chính mà vẫn xây nền tảng vững chắc (solid foundation) ở các môn chính (core subjects) và có bạn quanh nhà. Phản biện: International school (far too expensive, dễ weaken tiếng Việt); Private school (xa hơn và nhiều phụ phí)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a public school near her home is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> a couple wants to find the right primary school for their daughter. <strong>If I were in this situation, I think I would</strong> go for <strong>a public school near her home</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> a nearby school makes the <strong>daily commute</strong> much more <strong>convenient</strong> and safer for a young child. Her parents can easily <strong>pick her up</strong> right on time, <strong>which</strong> lets her get enough rest instead of sitting in heavy traffic during rush hour. <strong>As a result,</strong> she stays energetic and healthy every school day.<br><br><strong>Another reason is that</strong> public schools offer very <strong>affordable</strong> tuition. The family can avoid unnecessary financial burden while their daughter still builds a <strong>solid foundation</strong> in <strong>core subjects</strong> and makes close friends right in her own neighborhood.<br><br><strong>Regarding the other two options, although</strong> <strong>an international school</strong> <strong>is worth considering</strong>, the fees are <strong>far too expensive</strong> and studying mostly in English too early may <strong>weaken</strong> her Vietnamese skills. <strong>As for</strong> <strong>a private school</strong>, <strong>I don't think it's a good idea because</strong> it is usually farther away and charges high extra fees for buses and meals.<br><br><strong>In conclusion, I believe</strong> <strong>a public school near her home</strong> <strong>is the most suitable option in this situation.</strong>",
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
                example: "Studying mostly in English too early may <strong>weaken</strong> her Vietnamese skills."
              },
              {
                word: "pick her up",
                ipa: "/pɪk hɜːr ʌp/",
                pos: "v. phr.",
                meaning: "đón con tan học",
                example: "Parents can easily <strong>pick her up</strong> right on time."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // DẠNG 3: CHỌN NGHỀ NGHIỆP PHÙ HỢP (CHOOSING A CAREER) — 4 TÌNH HUỐNG
  // ==========================================================================
  {
    part: "part2",
    id: "part2-career",
    number: "03",
    title: "Choosing a Career",
    titleVi: "Chọn nghề nghiệp phù hợp",
    description:
      "Luyện 4 tình huống lựa chọn nghề nghiệp: việc ổn định lương cao, cân bằng cuộc sống, nghề sáng tạo, và môi trường giảng dạy phù hợp.",
    questionsCount: 4,
    questions: [
      {
        part: "part2",
        id: "p2_career_q1",
        num: 1,
        situationTitle: "Choosing a stable and well-paid job (government, foreign company, own business)",
        prompt:
          "Your younger sister wants a stable and well-paid job after graduation. She is considering three options: working for the government, working for a foreign company, or starting her own business. Which one would you suggest?",
        promptHtml:
          "Your younger sister wants a stable and well-paid job after graduation. She is considering three options: <strong>working for the government</strong>, <strong>working for a foreign company</strong>, or <strong>starting her own business</strong>. Which one would you suggest?",
        promptSentences: [
          {
            enHtml: "Your younger sister wants a stable and well-paid job after graduation.",
            vi: "Em gái bạn muốn một công việc ổn định và lương cao sau khi tốt nghiệp."
          },
          {
            enHtml:
              "She is considering three options: <strong>working for the government</strong>, <strong>working for a foreign company</strong>, or <strong>starting her own business</strong>.",
            vi: "Em ấy đang cân nhắc ba lựa chọn: làm việc cho cơ quan nhà nước, làm cho công ty nước ngoài, hoặc tự mở kinh doanh riêng."
          },
          {
            enHtml: "Which one would you suggest?",
            vi: "Bạn sẽ gợi ý lựa chọn nào?"
          }
        ],
        promptVi:
          "Em gái bạn muốn một công việc ổn định và lương cao sau khi tốt nghiệp. Em ấy đang cân nhắc ba lựa chọn: làm việc cho cơ quan nhà nước, làm cho công ty nước ngoài, hoặc tự mở kinh doanh riêng. Bạn sẽ gợi ý lựa chọn nào?",
        optionGuide: {
          easiestOptions: [
            {
              option: "Working for a foreign company (Làm công ty nước ngoài)",
              reasons: [
                "It offers competitive salaries and attractive benefits like health insurance and paid holidays.",
                "She can improve her English every day by working with international colleagues and experienced managers.",
                "This work experience boosts her self-confidence and opens up more career opportunities."
              ]
            },
            {
              option: "Working for the government (Làm cơ quan nhà nước)",
              reasons: [
                "It provides strong job security, so she does not have to worry much about losing her job.",
                "Fixed office hours make it easier to maintain a healthy work-life balance.",
                "Stable social insurance and pension benefits offer long-term peace of mind."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "Working for the government (Làm cơ quan nhà nước)",
              whyNot: "Although it offers good job security, the salary is usually not high enough or very satisfying for a new graduate."
            },
            {
              option: "Starting her own business (Tự kinh doanh riêng)",
              whyNot: "It requires significant investment and practical experience, which makes it too risky right after graduation."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 hướng nghề nghiệp: government / foreign company / own business).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Triển khai theo khung 3 phần tự nhiên.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Quên giữ dạng V-ing cho cả 3 lựa chọn ('working for...', 'starting her own business') khi dùng làm chủ ngữ.",
          "Phát âm thiếu âm cuối trong các từ khóa quan trọng như 'benefits', 'expenses', 'colleagues', 'experience'.",
          "Chỉ khen công ty nước ngoài mà quên giải thích ngắn gọn lý do chưa chọn làm nhà nước (lương chưa cao) và tự kinh doanh (cần nhiều vốn & kinh nghiệm)."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "Working for a foreign company (Làm công ty nước ngoài)",
                  reasons: [
                    "It offers good salaries and benefits, so she can support herself, save money, and enjoy a better quality of life.",
                    "She can improve her English, learn new skills, become more confident, and gain useful work experience."
                  ]
                },
                {
                  option: "Working for the government (Làm cơ quan nhà nước)",
                  reasons: [
                    "It is a very stable job, so she does not worry about losing work.",
                    "Fixed office hours give her time for family and rest.",
                    "Good insurance helps her feel safe for the future."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "Working for the government (Làm cơ quan nhà nước)",
                  whyNot: "It is a good option, but the salary is not high enough."
                },
                {
                  option: "Starting her own business (Tự kinh doanh riêng)",
                  whyNot: "It needs a lot of money and experience."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my younger sister wants a stable and well-paid job. If I were her, I think I would work for a foreign company."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Công ty nước ngoài trả lương và phúc lợi tốt -> tự lo cuộc sống, tiết kiệm và có chất lượng sống tốt hơn. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Cải thiện tiếng Anh, học kỹ năng mới khi làm với người nước ngoài -> tự tin hơn và có kinh nghiệm làm việc. Phản biện ngắn: Làm nhà nước (lương chưa đủ cao); Tự kinh doanh (cần nhiều tiền và kinh nghiệm)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe working for a foreign company is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister wants a <strong>stable and well-paid</strong> job. <strong>If I were her, I think I would</strong> work for a <strong>foreign company</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> foreign companies offer good <strong>salaries and benefits</strong>. She can earn enough money to <strong>support herself</strong> and save for the future. <strong>Because of this,</strong> she can enjoy a better <strong>quality of life</strong>.<br><br><strong>Another reason is that</strong> she can improve her English and learn new skills with foreign coworkers. This helps her become <strong>more confident</strong> and gain useful <strong>work experience</strong>.<br><br><strong>Regarding the other two options, although</strong> working for the government <strong>is a good option</strong>, the salary is not high enough. <strong>As for</strong> <strong>starting her own business</strong>, <strong>I don't think it's a good idea because</strong> it needs a lot of money and experience.<br><br><strong>In conclusion, I believe</strong> working for a foreign company <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "stable and well-paid",
                ipa: "/ˈsteɪbl ænd wel peɪd/",
                pos: "adj. phr.",
                meaning: "ổn định và lương cao",
                example: "My younger sister wants a <strong>stable and well-paid</strong> job."
              },
              {
                word: "foreign company",
                ipa: "/ˈfɔːrən ˈkʌmpəni/",
                pos: "n. phr.",
                meaning: "công ty nước ngoài",
                example: "I think I would work for a <strong>foreign company</strong>."
              },
              {
                word: "salaries and benefits",
                ipa: "/ˈsæləriz ænd ˈbenɪfɪts/",
                pos: "n. phr.",
                meaning: "lương thưởng và phúc lợi",
                example: "Foreign companies offer good <strong>salaries and benefits</strong>."
              },
              {
                word: "support herself",
                ipa: "/səˈpɔːrt hɜːrˈself/",
                pos: "v. phr.",
                meaning: "tự trang trải cuộc sống cho bản thân",
                example: "She can earn enough money to <strong>support herself</strong>."
              },
              {
                word: "quality of life",
                ipa: "/ˈkwɑːləti əv laɪf/",
                pos: "n. phr.",
                meaning: "chất lượng cuộc sống",
                example: "Because of this, she can enjoy a better <strong>quality of life</strong>."
              },
              {
                word: "more confident",
                ipa: "/mɔːr ˈkɑːnfɪdənt/",
                pos: "adj. phr.",
                meaning: "tự tin hơn",
                example: "This helps her become <strong>more confident</strong> at work."
              },
              {
                word: "work experience",
                ipa: "/wɜːrk ɪkˈspɪriəns/",
                pos: "n. phr.",
                meaning: "kinh nghiệm làm việc",
                example: "She can gain useful <strong>work experience</strong>."
              },
              {
                word: "starting her own business",
                ipa: "/ˈstɑːrtɪŋ hɜːr oʊn ˈbɪznəs/",
                pos: "v. phr.",
                meaning: "tự mở kinh doanh riêng",
                example: "<strong>Starting her own business</strong> needs a lot of money and experience."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my younger sister wants to find a stable and well-paid job after graduation. If I were her, I think I would choose to work for a foreign company."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Mức lương cạnh tranh (competitive salaries) và phúc lợi hấp dẫn (attractive benefits: health insurance, paid holidays) giúp trang trải chi phí sinh hoạt (cover her living expenses) và tiết kiệm. Lý do 2: Cải thiện tiếng Anh với đồng nghiệp quốc tế (international colleagues) và học từ quản lý kinh nghiệm -> nâng cao sự tự tin (boost her self-confidence) và mở rộng cơ hội nghề nghiệp. Phản biện: Làm nhà nước có job security nhưng lương chưa thỏa đáng; tự khởi nghiệp cần vốn đầu tư lớn (significant investment) và kinh nghiệm thực tế."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe working for a foreign company is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my younger sister wants to find a stable and well-paid job after graduation. <strong>If I were her, I think I would</strong> choose to work for a foreign company. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> foreign companies usually offer <strong>competitive salaries</strong> and <strong>attractive benefits</strong>. <strong>For example,</strong> many provide <strong>health insurance</strong> and <strong>paid holidays</strong>, <strong>which</strong> allows her to <strong>cover her living expenses</strong> and save money for her future.<br><br><strong>Another reason is that</strong> she can improve her English and develop professional skills. Working with <strong>international colleagues</strong> and learning from experienced managers will <strong>boost her self-confidence</strong> and open up more <strong>career opportunities</strong> later on.<br><br><strong>Regarding the other two options, although</strong> working for the government <strong>is worth considering</strong> because it offers <strong>job security</strong>, the salary is not very satisfying. <strong>As for</strong> starting her own business, <strong>I don't think it's a good idea because</strong> it requires <strong>significant investment</strong> and practical experience.<br><br><strong>In conclusion, I believe</strong> working for a foreign company <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "competitive salaries",
                ipa: "/kəmˈpetətɪv ˈsæləriz/",
                pos: "n. phr.",
                meaning: "mức lương cạnh tranh",
                example: "Foreign companies usually offer <strong>competitive salaries</strong> and attractive benefits."
              },
              {
                word: "attractive benefits",
                ipa: "/əˈtræktɪv ˈbenɪfɪts/",
                pos: "n. phr.",
                meaning: "chế độ phúc lợi hấp dẫn",
                example: "Many graduates look for jobs with <strong>attractive benefits</strong>."
              },
              {
                word: "health insurance",
                ipa: "/helθ ɪnˈʃʊrəns/",
                pos: "n. phr.",
                meaning: "bảo hiểm sức khỏe",
                example: "Many companies provide <strong>health insurance</strong> and paid holidays."
              },
              {
                word: "paid holidays",
                ipa: "/peɪd ˈhɑːlədeɪz/",
                pos: "n. phr.",
                meaning: "ngày nghỉ phép có hưởng lương",
                example: "Employees enjoy <strong>paid holidays</strong> every year."
              },
              {
                word: "cover her living expenses",
                ipa: "/ˈkʌvər hɜːr ˈlɪvɪŋ ɪkˈspensɪz/",
                pos: "v. phr.",
                meaning: "trang trải chi phí sinh hoạt",
                example: "It allows her to <strong>cover her living expenses</strong> and save money."
              },
              {
                word: "international colleagues",
                ipa: "/ˌɪntərˈnæʃnəl ˈkɑːliːɡz/",
                pos: "n. phr.",
                meaning: "đồng nghiệp quốc tế",
                example: "Working with <strong>international colleagues</strong> helps improve English."
              },
              {
                word: "boost her self-confidence",
                ipa: "/buːst hɜːr self ˈkɑːnfɪdəns/",
                pos: "v. phr.",
                meaning: "nâng cao sự tự tin của bản thân",
                example: "These experiences will <strong>boost her self-confidence</strong>."
              },
              {
                word: "job security",
                ipa: "/dʒɑːb sɪˈkjʊrəti/",
                pos: "n. phr.",
                meaning: "sự ổn định, an toàn trong công việc",
                example: "Working for the government offers strong <strong>job security</strong>."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_career_q2",
        num: 2,
        situationTitle: "Choosing a job with a good work-life balance (office, freelancer, small business)",
        prompt:
          "Your close friend wants to choose a job that offers a good work-life balance. He is considering working in an office, becoming a freelancer, or running a small business. Which option do you think is the most suitable?",
        promptHtml:
          "Your close friend wants to choose a job that offers a good work-life balance. He is considering <strong>working in an office</strong>, <strong>becoming a freelancer</strong>, or <strong>running a small business</strong>. Which option do you think is the most suitable?",
        promptSentences: [
          {
            enHtml: "Your close friend wants to choose a job that offers a good work-life balance.",
            vi: "Bạn thân của bạn muốn chọn một công việc có sự cân bằng tốt giữa công việc và cuộc sống."
          },
          {
            enHtml:
              "He is considering <strong>working in an office</strong>, <strong>becoming a freelancer</strong>, or <strong>running a small business</strong>.",
            vi: "Bạn ấy đang cân nhắc làm việc văn phòng, trở thành người làm việc tự do, hoặc điều hành một doanh nghiệp nhỏ."
          },
          {
            enHtml: "Which option do you think is the most suitable?",
            vi: "Bạn nghĩ lựa chọn nào là phù hợp nhất?"
          }
        ],
        promptVi:
          "Bạn thân của bạn muốn chọn một công việc có sự cân bằng tốt giữa công việc và cuộc sống. Bạn ấy đang cân nhắc làm việc văn phòng, trở thành người làm việc tự do, hoặc điều hành một doanh nghiệp nhỏ. Bạn nghĩ lựa chọn nào là phù hợp nhất?",
        optionGuide: {
          easiestOptions: [
            {
              option: "Becoming a freelancer (Làm việc tự do)",
              reasons: [
                "He has flexible working hours and can decide when to start and finish without following a fixed schedule.",
                "He can work in the morning and spend the rest of the day doing his favorite activities or being with his family.",
                "He can work from almost anywhere—at home, at a coffee shop, or at the library—saving time, reducing stress, and enjoying a comfortable and relaxing lifestyle."
              ]
            },
            {
              option: "Working in an office (Làm việc văn phòng)",
              reasons: [
                "It offers a stable monthly salary, so he does not have much financial pressure.",
                "Fixed working hours from 7 a.m. to 5 p.m. allow him to spend the evenings with his family or doing his favorite activities.",
                "He does not have to worry about finding customers, so he feels less stressed and has better mental health than people who start their own business."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "Working in an office (Làm việc văn phòng)",
              whyNot: "Although it offers a stable monthly salary and predictable hours, the fixed schedule is not flexible and commuting daily limits his personal freedom."
            },
            {
              option: "Running a small business (Kinh doanh nhỏ)",
              whyNot: "Managing everything and finding customers takes too much time and effort, which causes high stress and harms his mental health."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 hướng: working in an office / becoming a freelancer / running a small business).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were him, I think I would...'). Bám sát từ khóa 'work-life balance'.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Phát âm thiếu âm cuối /s/ trong 'freelancer' (/ˈfriːlænsər/), 'hours' (/ˈaʊərz/), 'activities', 'stress'.",
          "Quên gắn lý do với mục tiêu 'work-life balance' (có thêm thời gian cho bản thân, gia đình, giảm căng thẳng).",
          "Không giải thích rõ tại sao 'running a small business' khó giữ cân bằng cuộc sống (tốn nhiều thời gian, áp lực tìm khách hàng)."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "Becoming a freelancer (Làm việc tự do)",
                  reasons: [
                    "He has flexible working hours without a fixed schedule, so he can spend the rest of the day with family or hobbies.",
                    "He can work from home or a coffee shop, saving time, reducing stress, and enjoying a comfortable lifestyle."
                  ]
                },
                {
                  option: "Working in an office (Làm việc văn phòng)",
                  reasons: [
                    "It gives a stable monthly salary with less money worry.",
                    "Fixed hours from 7 a.m. to 5 p.m. leave his evenings free for family and hobbies.",
                    "He does not have to find customers, so he feels less stressed."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "Working in an office (Làm việc văn phòng)",
                  whyNot: "It has a stable monthly salary, but the fixed hours are not flexible."
                },
                {
                  option: "Running a small business (Kinh doanh nhỏ)",
                  whyNot: "It is stressful and takes too much time."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my close friend wants a job with a good work-life balance. If I were him, I think I would choose becoming a freelancer."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 1 câu mở rộng): Giờ làm linh hoạt, không theo lịch cố định -> làm buổi sáng rồi dành phần còn lại trong ngày cho gia đình và sở thích. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Làm việc ở bất kỳ đâu (nhà, quán cà phê), không phải đi văn phòng mỗi ngày -> tiết kiệm thời gian, giảm căng thẳng, sống thoải mái. Phản biện ngắn: Văn phòng (lương ổn định nhưng giờ cứng nhắc); Kinh doanh nhỏ (áp lực, tốn quá nhiều thời gian)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe becoming a freelancer is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my close friend wants a job with a good <strong>work-life balance</strong>. <strong>If I were him, I think I would</strong> choose becoming a <strong>freelancer</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> freelancers have <strong>flexible working hours</strong> without a <strong>fixed schedule</strong>. <strong>For example,</strong> he can work in the morning and spend <strong>the rest of the day</strong> with his family or hobbies.<br><br><strong>Another reason is that</strong> he can work from anywhere, like at home or at a coffee shop. He doesn't have to travel to the office every day, so he can save time, <strong>reduce stress</strong>, and enjoy a <strong>comfortable lifestyle</strong>.<br><br><strong>Regarding the other two options, although</strong> working in an office <strong>is a good option</strong> for its <strong>stable monthly salary</strong>, the fixed hours are not flexible. <strong>As for</strong> running a small business, <strong>I don't think it's a good idea because</strong> it is stressful and takes too much time.<br><br><strong>In conclusion, I believe</strong> becoming a freelancer <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "work-life balance",
                ipa: "/ˌwɜːrk laɪf ˈbæləns/",
                pos: "n. phr.",
                meaning: "sự cân bằng giữa công việc và cuộc sống",
                example: "My close friend wants a job with a good <strong>work-life balance</strong>."
              },
              {
                word: "freelancer",
                ipa: "/ˈfriːlænsər/",
                pos: "n.",
                meaning: "người làm việc tự do",
                example: "If I were him, I think I would choose becoming a <strong>freelancer</strong>."
              },
              {
                word: "flexible working hours",
                ipa: "/ˈfleksəbl ˈwɜːrkɪŋ ˈaʊərz/",
                pos: "n. phr.",
                meaning: "giờ làm việc linh hoạt",
                example: "Freelancers have <strong>flexible working hours</strong>."
              },
              {
                word: "fixed schedule",
                ipa: "/fɪkst ˈskedʒuːl/",
                pos: "n. phr.",
                meaning: "lịch làm việc cố định",
                example: "He can work without following a <strong>fixed schedule</strong>."
              },
              {
                word: "the rest of the day",
                ipa: "/ðə rest əv ðə deɪ/",
                pos: "n. phr.",
                meaning: "phần thời gian còn lại trong ngày",
                example: "He can spend <strong>the rest of the day</strong> with his family."
              },
              {
                word: "reduce stress",
                ipa: "/rɪˈduːs stres/",
                pos: "v. phr.",
                meaning: "giảm căng thẳng",
                example: "Working from home helps him save time and <strong>reduce stress</strong>."
              },
              {
                word: "comfortable lifestyle",
                ipa: "/ˈkʌmftəbl ˈlaɪfstaɪl/",
                pos: "n. phr.",
                meaning: "lối sống thoải mái",
                example: "He can save time and enjoy a <strong>comfortable lifestyle</strong>."
              },
              {
                word: "stable monthly salary",
                ipa: "/ˈsteɪbl ˈmʌnθli ˈsæləri/",
                pos: "n. phr.",
                meaning: "mức lương hằng tháng ổn định",
                example: "Working in an office offers a <strong>stable monthly salary</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my close friend is looking for a job that offers a good work-life balance. If I were him, I think I would choose becoming a freelancer."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Giờ làm linh hoạt hoàn toàn (flexible working hours) thay vì lịch cố định -> làm buổi sáng rồi dành phần còn lại cho sở thích và thời gian chất lượng (quality time) bên gia đình. Lý do 2: Làm việc ở bất kỳ đâu (nhà, quán cà phê, thư viện), không phải đi lại giữa giờ cao điểm (commute to the office) -> tiết kiệm thời gian, giảm căng thẳng, tận hưởng lối sống thư thái (relaxing lifestyle). Phản biện: Làm văn phòng tuy lương ổn định và giờ đều đặn (predictable hours) nhưng hạn chế tự do cá nhân (personal freedom); tự kinh doanh tốn nhiều công sức và ảnh hưởng sức khỏe tinh thần (mental health)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe becoming a freelancer is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my close friend is looking for a job that offers a good <strong>work-life balance</strong>. <strong>If I were him, I think I would</strong> choose becoming a freelancer. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> becoming a freelancer gives him truly <strong>flexible working hours</strong> instead of following a fixed schedule. <strong>For example,</strong> he can focus on his tasks in the morning and spend the rest of the day on his favorite activities, <strong>which</strong> leaves much more <strong>quality time</strong> for himself and his family.<br><br><strong>Another reason is that</strong> he can work from almost anywhere he feels comfortable, whether at home, at a quiet coffee shop, or at the library. Since he doesn't have to <strong>commute to the office</strong> through heavy traffic every day, he can save time, reduce stress, and enjoy a <strong>relaxing lifestyle</strong>.<br><br><strong>Regarding the other two options, although</strong> working in an office <strong>is worth considering</strong> because it provides a stable monthly salary and <strong>predictable hours</strong>, daily commuting still limits his <strong>personal freedom</strong>. <strong>As for</strong> running a small business, <strong>I don't think it's a good idea because</strong> managing everything and finding customers takes huge effort and can harm his <strong>mental health</strong>.<br><br><strong>In conclusion, I believe</strong> becoming a freelancer <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "work-life balance",
                ipa: "/ˌwɜːrk laɪf ˈbæləns/",
                pos: "n. phr.",
                meaning: "sự cân bằng giữa công việc và cuộc sống",
                example: "My close friend is looking for a job that offers a good <strong>work-life balance</strong>."
              },
              {
                word: "flexible working hours",
                ipa: "/ˈfleksəbl ˈwɜːrkɪŋ ˈaʊərz/",
                pos: "n. phr.",
                meaning: "giờ làm việc linh hoạt",
                example: "Becoming a freelancer gives him truly <strong>flexible working hours</strong>."
              },
              {
                word: "quality time",
                ipa: "/ˈkwɑːləti taɪm/",
                pos: "n. phr.",
                meaning: "khoảng thời gian chất lượng, ý nghĩa",
                example: "It leaves much more <strong>quality time</strong> for himself and his family."
              },
              {
                word: "commute to the office",
                ipa: "/kəˈmjuːt tuː ði ˈɔːfɪs/",
                pos: "v. phr.",
                meaning: "đi làm tới văn phòng hằng ngày",
                example: "He doesn't have to <strong>commute to the office</strong> through heavy traffic every day."
              },
              {
                word: "relaxing lifestyle",
                ipa: "/rɪˈlæksɪŋ ˈlaɪfstaɪl/",
                pos: "n. phr.",
                meaning: "lối sống thư thái, nhẹ nhàng",
                example: "He can save time, reduce stress, and enjoy a <strong>relaxing lifestyle</strong>."
              },
              {
                word: "predictable hours",
                ipa: "/prɪˈdɪktəbl ˈaʊərz/",
                pos: "n. phr.",
                meaning: "khung giờ làm việc cố định, dễ đoán trước",
                example: "Working in an office provides a stable salary and <strong>predictable hours</strong>."
              },
              {
                word: "personal freedom",
                ipa: "/ˈpɜːrsənl ˈfriːdəm/",
                pos: "n. phr.",
                meaning: "sự tự do cá nhân",
                example: "Daily commuting still limits his <strong>personal freedom</strong>."
              },
              {
                word: "mental health",
                ipa: "/ˈmentl helθ/",
                pos: "n. phr.",
                meaning: "sức khỏe tinh thần",
                example: "Managing a small business takes huge effort and can harm his <strong>mental health</strong>."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_career_q3",
        num: 3,
        situationTitle: "Choosing a creative career (graphic designer, interior decorator, fashion designer)",
        prompt:
          "Your cousin is passionate about art and creativity. She is thinking of pursuing a career. Three options are considered: a graphic designer, an interior decorator, and a fashion designer. Which one would you recommend?",
        promptHtml:
          "Your cousin is passionate about art and creativity. She is thinking of pursuing a career. Three options are considered: <strong>a graphic designer</strong>, <strong>an interior decorator</strong>, and <strong>a fashion designer</strong>. Which one would you recommend?",
        promptSentences: [
          {
            enHtml: "Your cousin is passionate about art and creativity.",
            vi: "Anh/chị/em họ của bạn rất đam mê nghệ thuật và sự sáng tạo."
          },
          {
            enHtml: "She is thinking of pursuing a career.",
            vi: "Bạn ấy đang nghĩ đến việc theo đuổi một sự nghiệp."
          },
          {
            enHtml:
              "Three options are considered: <strong>a graphic designer</strong>, <strong>an interior decorator</strong>, and <strong>a fashion designer</strong>.",
            vi: "Ba lựa chọn được cân nhắc là: nhà thiết kế đồ họa, người trang trí nội thất và nhà thiết kế thời trang."
          },
          {
            enHtml: "Which one would you recommend?",
            vi: "Bạn sẽ gợi ý lựa chọn nào?"
          }
        ],
        promptVi:
          "Em/chị họ của bạn rất đam mê nghệ thuật và sự sáng tạo. Bạn ấy đang cân nhắc theo đuổi một trong ba nghề: nhà thiết kế đồ họa, người trang trí nội thất, hoặc nhà thiết kế thời trang. Bạn sẽ gợi ý lựa chọn nào?",
        optionGuide: {
          easiestOptions: [
            {
              option: "A graphic designer (Nhà thiết kế đồ họa)",
              reasons: [
                "She can use her creativity every day to create different designs like logos, posters, and advertisements.",
                "She can express her ideas freely, make full use of her talent, and satisfy her passion for art.",
                "She can work in many different fields—advertising companies, fashion brands, or even as a freelancer—which gives her more career opportunities and chances to increase her income."
              ]
            },
            {
              option: "A fashion designer (Nhà thiết kế thời trang)",
              reasons: [
                "She can create her own clothing designs and express her personal style.",
                "She can follow her passion for fashion every day.",
                "She may become famous if her designs are successful and even start her own fashion brand in the future."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "A fashion designer (Nhà thiết kế thời trang)",
              whyNot: "Although she can create her own clothing designs and express her personal style, the fashion industry is highly competitive and requires a lot of money to build a brand."
            },
            {
              option: "An interior decorator (Người trang trí nội thất)",
              whyNot: "She often has to follow clients' budgets and space limits, which restricts her creative freedom compared to graphic design."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 nghề sáng tạo: graphic designer / interior decorator / fashion designer).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were her, I think I would...'). Bám sát đam mê nghệ thuật & cơ hội việc làm.",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Phát âm nhầm trọng âm từ 'creativity' (/ˌkriːeɪˈtɪvəti/ — trọng âm rơi vào âm thứ 3) và 'advertisements' (/ˌædvərˈtaɪzmənts/).",
          "Chỉ khen 'graphic designer is creative' chung chung mà quên nêu ví dụ sản phẩm cụ thể (logos, posters, advertisements) và môi trường làm việc đa dạng (advertising companies, fashion brands, freelancer).",
          "Quên nhắc lý do chưa chọn 2 nghề còn lại (fashion designer cạnh tranh rất cao & tốn vốn; interior decorator hay bị giới hạn bởi ngân sách và không gian của khách)."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "A graphic designer (Nhà thiết kế đồ họa)",
                  reasons: [
                    "She can use her creativity every day to make logos, posters, and advertisements, and share her ideas freely.",
                    "She can work in many different fields like advertising companies, fashion brands, or as a freelancer to get more job chances and earn more money."
                  ]
                },
                {
                  option: "A fashion designer (Nhà thiết kế thời trang)",
                  reasons: [
                    "She can make her own clothes designs and show her personal style.",
                    "She can follow her love for fashion every day.",
                    "She may become famous if people like her designs and start her own fashion brand in the future."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "A fashion designer (Nhà thiết kế thời trang)",
                  whyNot: "It is a good option, but it is very competitive and hard to succeed."
                },
                {
                  option: "An interior decorator (Người trang trí nội thất)",
                  whyNot: "She has to follow customers' ideas instead of her own."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn nghề)",
                text: "The situation here is that my cousin loves art and wants to choose a career. If I were her, I think I would become a graphic designer."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 nghề còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 1–2 câu mở rộng): Dùng sự sáng tạo mỗi ngày để thiết kế logo, áp phích, quảng cáo -> tự do thể hiện ý tưởng và thỏa đam mê. Lý do 2 (1 câu luận điểm + 2 câu mở rộng): Làm việc ở nhiều lĩnh vực (công ty quảng cáo, nhãn hàng thời trang, freelancer) -> nhiều cơ hội việc làm và kiếm thêm thu nhập. Phản biện ngắn: Fashion designer (cạnh tranh cao, khó thành công); Interior decorator (phải làm theo ý khách thay vì ý mình)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe a graphic designer is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin loves art and wants to choose a career. <strong>If I were her, I think I would</strong> become <strong>a graphic designer</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> she can <strong>use her creativity</strong> every day to make logos, posters, and <strong>advertisements</strong>. This helps her share her ideas freely and follow her <strong>passion for art</strong>.<br><br><strong>Another reason is that</strong> she can work in <strong>many different fields</strong>. <strong>For example,</strong> she can join <strong>advertising companies</strong>, <strong>fashion brands</strong>, or become a freelancer. <strong>Because of this,</strong> she gets more job chances and can <strong>earn more money</strong>.<br><br><strong>Regarding the other two options, although</strong> a <strong>fashion designer</strong> <strong>is a good option</strong>, it is very competitive and hard to succeed. <strong>As for</strong> an interior decorator, <strong>I don't think it's a good idea because</strong> she has to follow customers' ideas instead of her own.<br><br><strong>In conclusion, I believe</strong> a graphic designer <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "graphic designer",
                ipa: "/ˈɡræfɪk dɪˈzaɪnər/",
                pos: "n. phr.",
                meaning: "nhà thiết kế đồ họa",
                example: "If I were her, I think I would become a <strong>graphic designer</strong>."
              },
              {
                word: "use her creativity",
                ipa: "/juːz hɜːr ˌkriːeɪˈtɪvəti/",
                pos: "v. phr.",
                meaning: "vận dụng sự sáng tạo của mình",
                example: "As a designer, she can <strong>use her creativity</strong> every day."
              },
              {
                word: "advertisements",
                ipa: "/ˌædvərˈtaɪzmənts/",
                pos: "n.",
                meaning: "các mẫu quảng cáo",
                example: "Graphic designers create logos, posters, and <strong>advertisements</strong>."
              },
              {
                word: "passion for art",
                ipa: "/ˈpæʃn fɔːr ɑːrt/",
                pos: "n. phr.",
                meaning: "niềm đam mê nghệ thuật",
                example: "This career helps her follow her <strong>passion for art</strong>."
              },
              {
                word: "many different fields",
                ipa: "/ˈmeni ˈdɪfrənt fiːldz/",
                pos: "n. phr.",
                meaning: "nhiều lĩnh vực khác nhau",
                example: "Graphic designers can work in <strong>many different fields</strong>."
              },
              {
                word: "advertising companies",
                ipa: "/ˈædvərtaɪzɪŋ ˈkʌmpəniz/",
                pos: "n. phr.",
                meaning: "các công ty quảng cáo",
                example: "She can work for <strong>advertising companies</strong> or fashion brands."
              },
              {
                word: "fashion brands",
                ipa: "/ˈfæʃn brændz/",
                pos: "n. phr.",
                meaning: "các thương hiệu thời trang",
                example: "Many designers create visuals for popular <strong>fashion brands</strong>."
              },
              {
                word: "earn more money",
                ipa: "/ɜːrn mɔːr ˈmʌni/",
                pos: "v. phr.",
                meaning: "kiếm được nhiều tiền hơn",
                example: "Having more job chances helps her <strong>earn more money</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn nghề)",
                text: "The situation here is that my cousin is passionate about art and creativity, and she is thinking of choosing a career. If I were her, I think I would recommend becoming a graphic designer."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 nghề còn lại)",
                text: "Lý do 1: Vận dụng sự sáng tạo mỗi ngày qua các thiết kế đa dạng (logos, posters, advertisements) -> tự do thể hiện ý tưởng (express her ideas freely), phát huy tối đa tài năng (make full use of her talent) và thỏa mãn đam mê (satisfy her passion). Lý do 2: Làm việc trong nhiều lĩnh vực (advertising companies, fashion brands, hoặc become a freelancer) -> mở rộng cơ hội nghề nghiệp (career opportunities) và tăng thu nhập (increase her income). Phản biện: Fashion designer (dù thể hiện được personal style nhưng highly competitive và cần nhiều vốn); Interior decorator (phụ thuộc ngân sách và không gian khách hàng, hạn chế creative freedom)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe becoming a graphic designer is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my cousin is passionate about art and creativity, and she is thinking of pursuing a career. <strong>If I were her, I think I would</strong> choose to become <strong>a graphic designer</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> this job lets her use her creativity every single day. She can create different <strong>visual designs</strong> like logos, posters, and advertisements, <strong>which</strong> lets her <strong>express her ideas freely</strong>. Doing this daily will help her <strong>make full use of her talent</strong> and truly <strong>satisfy her passion</strong>.<br><br><strong>Another reason is that</strong> graphic designers can work across <strong>many different fields</strong>. <strong>For example,</strong> she can work for advertising companies, join fashion brands, or even become a freelancer. This flexibility brings wider <strong>career opportunities</strong> and gives her more chances to <strong>increase her income</strong>.<br><br><strong>Regarding the other two options, although</strong> becoming a fashion designer <strong>is worth considering</strong> since she could express her <strong>personal style</strong>, the industry is <strong>highly competitive</strong> and takes huge capital to succeed. <strong>As for</strong> an interior decorator, <strong>I don't think it's a good idea because</strong> clients' budgets and spaces often limit her <strong>creative freedom</strong>.<br><br><strong>In conclusion, I believe</strong> becoming a graphic designer <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "visual designs",
                ipa: "/ˈvɪʒuəl dɪˈzaɪnz/",
                pos: "n. phr.",
                meaning: "các thiết kế trực quan / hình ảnh",
                example: "She can create different <strong>visual designs</strong> like logos and posters."
              },
              {
                word: "express her ideas freely",
                ipa: "/ɪkˈspres hɜːr aɪˈdɪəz ˈfriːli/",
                pos: "v. phr.",
                meaning: "tự do thể hiện các ý tưởng của mình",
                example: "Graphic design lets her <strong>express her ideas freely</strong>."
              },
              {
                word: "make full use of her talent",
                ipa: "/meɪk fʊl juːs əv hɜːr ˈtælənt/",
                pos: "v. phr.",
                meaning: "phát huy tối đa tài năng của bản thân",
                example: "This career helps her <strong>make full use of her talent</strong>."
              },
              {
                word: "satisfy her passion",
                ipa: "/ˈsætɪsfaɪ hɜːr ˈpæʃn/",
                pos: "v. phr.",
                meaning: "thỏa mãn niềm đam mê",
                example: "Working in a creative field will truly <strong>satisfy her passion</strong>."
              },
              {
                word: "increase her income",
                ipa: "/ɪnˈkriːs hɜːr ˈɪnkʌm/",
                pos: "v. phr.",
                meaning: "gia tăng thu nhập",
                example: "Freelance projects give her more chances to <strong>increase her income</strong>."
              },
              {
                word: "personal style",
                ipa: "/ˈpɜːrsənl staɪl/",
                pos: "n. phr.",
                meaning: "phong cách cá nhân",
                example: "Fashion designers love expressing their <strong>personal style</strong>."
              },
              {
                word: "highly competitive",
                ipa: "/ˈhaɪli kəmˈpetətɪv/",
                pos: "adj. phr.",
                meaning: "có tính cạnh tranh rất cao",
                example: "The fashion industry is <strong>highly competitive</strong> for beginners."
              },
              {
                word: "creative freedom",
                ipa: "/kriˈeɪtɪv ˈfriːdəm/",
                pos: "n. phr.",
                meaning: "sự tự do sáng tạo",
                example: "Strict client budgets can sometimes limit a decorator's <strong>creative freedom</strong>."
              }
            ]
          }
        }
      },
      {
        part: "part2",
        id: "p2_career_q4",
        num: 4,
        situationTitle: "Choosing a teaching job (rural school, big city school, international school)",
        prompt:
          "Your friend has just graduated and is looking for a teaching job. There are three options: teaching in a rural school, teaching in a big city school, or teaching in an international school. Which one is most suitable for him?",
        promptHtml:
          "Your friend has just graduated and is looking for a teaching job. There are three options: <strong>teaching in a rural school</strong>, <strong>teaching in a big city school</strong>, or <strong>teaching in an international school</strong>. Which one is most suitable for him?",
        promptSentences: [
          {
            enHtml: "Your friend has just graduated and is looking for a teaching job.",
            vi: "Bạn của bạn vừa tốt nghiệp và đang tìm một công việc giảng dạy."
          },
          {
            enHtml:
              "There are three options: <strong>teaching in a rural school</strong>, <strong>teaching in a big city school</strong>, or <strong>teaching in an international school</strong>.",
            vi: "Có ba lựa chọn: dạy ở trường nông thôn, dạy ở trường thành phố lớn, hoặc dạy ở trường quốc tế."
          },
          {
            enHtml: "Which one is most suitable for him?",
            vi: "Lựa chọn nào là phù hợp nhất với bạn ấy?"
          }
        ],
        promptVi:
          "Bạn của bạn vừa tốt nghiệp và đang tìm một công việc giảng dạy. Có ba lựa chọn: dạy ở trường nông thôn, dạy ở trường thành phố lớn, hoặc dạy ở trường quốc tế. Lựa chọn nào là phù hợp nhất với bạn ấy?",
        optionGuide: {
          easiestOptions: [
            {
              option: "Teaching in a big city school (Dạy ở trường thành phố lớn)",
              reasons: [
                "Big city schools offer better salaries than rural schools, so he can cover his daily expenses (food, rent, transportation), save for the future, invest in himself through higher education, and become financially independent.",
                "He can gain valuable teaching experience by working with experienced teachers, modern facilities, and rich teaching resources.",
                "This helps him learn effective teaching techniques, discover new ways to make his lessons more engaging, and develop his teaching career."
              ]
            },
            {
              option: "Teaching in an international school (Dạy ở trường quốc tế)",
              reasons: [
                "International working environment: he can work with foreign teachers, develop English communication skills, and build international connections.",
                "Competitive salary and attractive benefits: he can earn a higher salary, receive health insurance and other benefits, enjoy a better standard of living, and become financially independent.",
                "Smaller class sizes: with fewer students in each class, he can understand each student's needs better and give students more individual attention."
              ]
            }
          ],
          rejectReasons: [
            {
              option: "Teaching in an international school (Dạy ở trường quốc tế)",
              whyNot: "Although it offers a competitive salary and an international environment, it usually requires high qualifications, strong English skills, and years of experience, which is difficult for a new graduate."
            },
            {
              option: "Teaching in a rural school (Dạy ở trường nông thôn)",
              whyNot: "The salary is usually lower, and rural schools often lack modern facilities and teaching resources to help him develop his career."
            }
          ]
        },
        analysis: {
          questionType: "Speaking Part 2 — Thảo luận giải pháp (Chọn 1 trong 3 nơi dạy học: rural school / big city school / international school).",
          tense: "Hiện tại đơn và câu điều kiện loại 2 ('If I were him, I think I would...'). Chú ý bối cảnh 'has just graduated' (vừa tốt nghiệp).",
          length: "B1: ~150–170 từ (60–75s) · B2: ~175–215 từ (80–95s)."
        },
        pitfalls: [
          "Quên chi tiết quan trọng 'has just graduated' (vừa mới tốt nghiệp) — đây là điểm phản biện rất thuyết phục để giải thích vì sao chưa dễ vào ngay trường quốc tế.",
          "Dùng sai cấu trúc 'ways to making' — đúng phải là 'ways to make his lessons more engaging' hoặc 'ways of making...'.",
          "Phát âm nhầm từ 'rural' (/ˈrʊrəl/) và thiếu âm cuối /s/ trong 'salaries', 'expenses', 'resources', 'techniques'."
        ],
        levels: {
          b1: {
            optionGuide: {
              easiestOptions: [
                {
                  option: "Teaching in a big city school (Dạy ở trường thành phố lớn)",
                  reasons: [
                    "City schools pay a better salary than rural schools, so he can pay for food, rent, and travel, save money, and live on his own.",
                    "He can get good teaching experience from experienced teachers and modern facilities to make his lessons fun."
                  ]
                },
                {
                  option: "Teaching in an international school (Dạy ở trường quốc tế)",
                  reasons: [
                    "He can work with foreign teachers, practice English every day, and make international friends.",
                    "It offers a high salary and good benefits like health insurance, so he can live well on his own.",
                    "Small classes help him know each student better and give them more care."
                  ]
                }
              ],
              rejectReasons: [
                {
                  option: "Teaching in an international school (Dạy ở trường quốc tế)",
                  whyNot: "It pays well, but it is hard for a new graduate to get in without experience."
                },
                {
                  option: "Teaching in a rural school (Dạy ở trường nông thôn)",
                  whyNot: "The pay is lower, and rural schools often do not have modern facilities."
                }
              ]
            },
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my friend just finished university and is looking for a teaching job. If I were him, I think I would choose teaching in a big city school."
              },
              {
                label: "2. Thân bài (2 lý do ngắn gọn & Phản biện 2 phương án còn lại)",
                text: "Lý do 1 (1 câu luận điểm + 2 câu mở rộng): Trường thành phố trả lương tốt hơn nông thôn -> đủ trả tiền ăn ở, đi lại, tiết kiệm tiền và tự lập. Lý do 2 (1 câu luận điểm + 1 câu mở rộng): Tích lũy kinh nghiệm dạy học tốt nhờ thầy cô giàu kinh nghiệm và cơ sở vật chất hiện đại -> bài giảng thú vị hơn. Phản biện ngắn: Trường quốc tế (khó xin với sinh viên mới ra trường chưa có kinh nghiệm); Trường nông thôn (lương thấp và thiếu cơ sở vật chất)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe teaching in a big city school is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend just finished university and is looking for a <strong>teaching job</strong>. <strong>If I were him, I think I would</strong> choose <strong>teaching in a big city school</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> city schools offer a <strong>better salary</strong> than rural schools. He can easily <strong>pay for</strong> food, rent, and travel, and <strong>save money</strong> for the future. <strong>Because of this,</strong> he can live well <strong>on his own</strong>.<br><br><strong>Another reason is that</strong> he can get good <strong>teaching experience</strong>. City schools have experienced teachers and <strong>modern facilities</strong>, so he can learn useful skills and make his lessons fun.<br><br><strong>Regarding the other two options, although</strong> teaching in an international school <strong>is a good option</strong>, it is hard for a <strong>new graduate</strong> to get in without experience. <strong>As for</strong> teaching in a rural school, <strong>I don't think it's a good idea because</strong> the pay is lower and it lacks modern facilities.<br><br><strong>In conclusion, I believe</strong> teaching in a big city school <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "teaching job",
                ipa: "/ˈtiːtʃɪŋ dʒɑːb/",
                pos: "n. phr.",
                meaning: "công việc giảng dạy",
                example: "My friend just finished university and is looking for a <strong>teaching job</strong>."
              },
              {
                word: "better salary",
                ipa: "/ˈbetər ˈsæləri/",
                pos: "n. phr.",
                meaning: "mức lương tốt hơn",
                example: "City schools offer a <strong>better salary</strong> than rural schools."
              },
              {
                word: "pay for",
                ipa: "/peɪ fɔːr/",
                pos: "v. phr.",
                meaning: "trả tiền cho",
                example: "He can easily <strong>pay for</strong> food, rent, and travel."
              },
              {
                word: "save money",
                ipa: "/seɪv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm tiền",
                example: "With a good salary, he can <strong>save money</strong> for the future."
              },
              {
                word: "on his own",
                ipa: "/ɑːn hɪz oʊn/",
                pos: "prep. phr.",
                meaning: "tự lập, tự lo cho bản thân",
                example: "Because of this, he can live well <strong>on his own</strong>."
              },
              {
                word: "teaching experience",
                ipa: "/ˈtiːtʃɪŋ ɪkˈspɪriəns/",
                pos: "n. phr.",
                meaning: "kinh nghiệm giảng dạy",
                example: "He can get good <strong>teaching experience</strong> in a city school."
              },
              {
                word: "modern facilities",
                ipa: "/ˈmɑːdərn fəˈsɪlətiz/",
                pos: "n. phr.",
                meaning: "cơ sở vật chất hiện đại",
                example: "City schools have experienced teachers and <strong>modern facilities</strong>."
              },
              {
                word: "new graduate",
                ipa: "/nuː ˈɡrædʒuət/",
                pos: "n. phr.",
                meaning: "sinh viên mới tốt nghiệp",
                example: "It is hard for a <strong>new graduate</strong> to enter an international school."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "1. Mở bài (Dẫn nhập & Chọn phương án)",
                text: "The situation here is that my friend has just graduated and is looking for a suitable teaching job. If I were him, I think I would choose teaching in a big city school."
              },
              {
                label: "2. Thân bài (2 lý do tự nhiên, nâng cấp từ vựng + Phản biện 2 phương án kia)",
                text: "Lý do 1: Lương cao hơn trường nông thôn -> dễ trang trải chi phí hằng ngày (cover his daily expenses: food, rent, transportation), tiết kiệm để đầu tư cho bản thân (invest in himself) qua học lên cao (higher education) và sớm độc lập tài chính (financially independent). Lý do 2: Tích lũy kinh nghiệm giảng dạy quý giá (valuable teaching experience) nhờ đồng nghiệp giàu kinh nghiệm, cơ sở vật chất hiện đại và nhiều tài liệu giảng dạy (teaching resources) -> học kỹ thuật dạy hiệu quả (effective teaching techniques), làm bài học cuốn hút (engaging) và phát triển sự nghiệp. Phản biện: Trường quốc tế (lương tốt nhưng đòi hỏi kinh nghiệm & bằng cấp cao với sinh viên mới ra trường); Trường nông thôn (lương thấp hơn và thiếu cơ sở vật chất hiện đại)."
              },
              {
                label: "3. Kết bài (Khẳng định lại lựa chọn)",
                text: "In conclusion, I believe teaching in a big city school is the most suitable option in this situation."
              }
            ],
            modelAnswer:
              "<strong>The situation here is that</strong> my friend has just graduated and is looking for a suitable teaching job. <strong>If I were him, I think I would</strong> choose <strong>teaching in a big city school</strong>. <strong>I believe it's the best option because of the following reasons.</strong><br><br><strong>First of all,</strong> big city schools offer much better salaries than rural ones. He can easily <strong>cover his daily expenses</strong> like food, rent, and transportation, while still saving money to <strong>invest in himself</strong> through <strong>higher education</strong>. Having a solid income also helps him become <strong>financially independent</strong> early on.<br><br><strong>Another reason is that</strong> he can gain <strong>valuable teaching experience</strong> in a dynamic environment. City schools have experienced teachers, modern facilities, and plenty of <strong>teaching resources</strong>, <strong>which</strong> helps him learn <strong>effective teaching techniques</strong> and make his lessons more <strong>engaging</strong>. This is a great way to develop his teaching career.<br><br><strong>Regarding the other two options, although</strong> teaching in an international school <strong>is worth considering</strong> for its competitive salary, it usually requires years of experience and high qualifications for a new graduate. <strong>As for</strong> teaching in a rural school, <strong>I don't think it's a good idea because</strong> the pay is lower and it often lacks modern facilities.<br><br><strong>In conclusion, I believe</strong> teaching in a big city school <strong>is the most suitable option in this situation.</strong>",
            vocab: [
              {
                word: "cover his daily expenses",
                ipa: "/ˈkʌvər hɪz ˈdeɪli ɪkˈspensɪz/",
                pos: "v. phr.",
                meaning: "trang trải các chi phí hằng ngày",
                example: "He can easily <strong>cover his daily expenses</strong> like food, rent, and transportation."
              },
              {
                word: "invest in himself",
                ipa: "/ɪnˈvest ɪn hɪmˈself/",
                pos: "v. phr.",
                meaning: "đầu tư cho bản thân",
                example: "He can save money to <strong>invest in himself</strong> by learning new skills."
              },
              {
                word: "higher education",
                ipa: "/ˈhaɪər ˌedʒuˈkeɪʃn/",
                pos: "n. phr.",
                meaning: "giáo dục bậc cao (cao học, thạc sĩ...)",
                example: "Saving money allows him to pursue <strong>higher education</strong> later."
              },
              {
                word: "financially independent",
                ipa: "/faɪˈnænʃəli ˌɪndɪˈpendənt/",
                pos: "adj. phr.",
                meaning: "độc lập về tài chính",
                example: "A solid income helps him become <strong>financially independent</strong> early on."
              },
              {
                word: "valuable teaching experience",
                ipa: "/ˈvæljuəbl ˈtiːtʃɪŋ ɪkˈspɪriəns/",
                pos: "n. phr.",
                meaning: "kinh nghiệm giảng dạy quý giá",
                example: "He can gain <strong>valuable teaching experience</strong> in a city school."
              },
              {
                word: "teaching resources",
                ipa: "/ˈtiːtʃɪŋ ˈriːsɔːrsɪz/",
                pos: "n. phr.",
                meaning: "nguồn tài liệu, học liệu giảng dạy",
                example: "City schools provide access to plenty of <strong>teaching resources</strong>."
              },
              {
                word: "effective teaching techniques",
                ipa: "/ɪˈfektɪv ˈtiːtʃɪŋ tekˈniːks/",
                pos: "n. phr.",
                meaning: "các kỹ thuật giảng dạy hiệu quả",
                example: "He can learn <strong>effective teaching techniques</strong> from experienced teachers."
              },
              {
                word: "engaging",
                ipa: "/ɪnˈɡeɪdʒɪŋ/",
                pos: "adj.",
                meaning: "cuốn hút, hấp dẫn, lôi cuốn",
                example: "Good techniques help him make his lessons more <strong>engaging</strong>."
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
