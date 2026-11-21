// ==========================================================================
// SPEAKING PART 1 — 4 STANDALONE TOPICS (TRAVELLING, TRIPS, TRAVEL PLANS, SEASONS)
// Easy-to-speak B1 & B2 model answers built from "kien-thuc-co-ban"
// (Câu đơn, Câu ghép, Câu phức, Mệnh đề quan hệ) + Full IPA in Vocabulary Table
// ==========================================================================

window.SPEAKING_TOPICS = [
  // ==========================================================================
  // ĐỀ 01: TRAVELLING
  // ==========================================================================
  {
    id: "topic-travelling",
    number: "01",
    title: "Travelling",
    titleVi: "Đi du lịch & Chuẩn bị chuyến đi",
    description:
      "Luyện 3 câu hỏi về sở thích đi du lịch cùng bạn bè hay đi một mình, những thứ thường chuẩn bị trước chuyến đi và mùa du lịch đẹp nhất ở quê hương.",
    questionsCount: 3,
    questions: [
      {
        id: "travelling_q1",
        num: 1,
        prompt: "Do you prefer traveling with friends or traveling alone?",
        analysis: {
          questionType: "Câu hỏi lựa chọn (Choice question với 'or') xoay quanh chủ đề Travelling.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức chỉ lý do (because) kết hợp Câu ghép (, and / , so) hoặc Mệnh đề quan hệ (, which helps us...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Trả lời cộc lốc 1 câu đơn mà không nối thêm lý do bằng 'because'.",
          "Quên chia V-ing sau động từ 'prefer' (phải nói 'prefer traveling', không nói 'prefer travel').",
          "Mắc lỗi nối 2 câu đơn chỉ bằng dấu phẩy mà thiếu từ nối ', and' hoặc ', so' (lỗi Comma Splice trong bài Câu ghép)."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Chọn đi cùng bạn bè vì vui và an toàn hơn đi một mình."
              },
              {
                label: "Lý do (Câu đơn mở rộng mục đích)",
                text: "Có thể trò chuyện với nhau và chụp nhiều ảnh đẹp."
              },
              {
                label: "Chi tiết thực tế (Câu ghép - , and)",
                text: "Có thể thử nhiều món ăn địa phương, và cùng chia tiền phòng với nhau."
              }
            ],
            modelAnswer:
              "I prefer <strong>traveling with my friends</strong> because it is very fun and safe. During the trip, we can talk together and <strong>take many nice photos</strong>. We can also try <strong>local food</strong>, and we can <strong>share the cost</strong> of the hotel.",
            vocab: [
              {
                word: "prefer",
                ipa: "/prɪˈfɜːr/",
                pos: "v.",
                meaning: "thích hơn",
                example: "I <strong>prefer</strong> traveling with my friends because it is very fun and safe."
              },
              {
                word: "take many nice photos",
                ipa: "/teɪk ˈmeni naɪs ˈfoʊtoʊz/",
                pos: "v. phr.",
                meaning: "chụp nhiều bức ảnh đẹp",
                example: "During the trip, we can talk together and <strong>take many nice photos</strong>."
              },
              {
                word: "local food",
                ipa: "/ˈloʊkl fuːd/",
                pos: "n. phr.",
                meaning: "đồ ăn địa phương",
                example: "We can also try <strong>local food</strong> at the market."
              },
              {
                word: "share the cost",
                ipa: "/ʃer ðə kɒst/",
                pos: "v. phr.",
                meaning: "chia sẻ chi phí",
                example: "We can try local food, and we can <strong>share the cost</strong> of the hotel."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Thích đi du lịch cùng nhóm bạn thân vì chuyến đi sẽ vui vẻ và đáng nhớ hơn."
              },
              {
                label: "Lý do (Mệnh đề quan hệ - who)",
                text: "Luôn có những người bạn hợp gu để cùng trò chuyện và khám phá những địa điểm mới."
              },
              {
                label: "Chi tiết thực tế (Mệnh đề quan hệ - , which helps us...)",
                text: "Cùng chia tiền khách sạn và đồ ăn, điều này giúp cả nhóm tiết kiệm được rất nhiều tiền."
              }
            ],
            modelAnswer:
              "I prefer <strong>traveling with my close friends</strong> because it makes the trip much more <strong>enjoyable</strong>. I love going with friends who enjoy <strong>exploring new places</strong> and trying local food with me. Also, we can share the hotel room and transport, <strong>which helps us save a lot of money</strong>.",
            vocab: [
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "I prefer traveling with my <strong>close friends</strong> because it makes the trip much more enjoyable."
              },
              {
                word: "enjoyable",
                ipa: "/ɪnˈdʒɔɪəbl/",
                pos: "adj.",
                meaning: "thú vị, vui vẻ",
                example: "It makes the trip much more <strong>enjoyable</strong>."
              },
              {
                word: "explore new places",
                ipa: "/ɪkˈsplɔːr nuː ˈpleɪsɪz/",
                pos: "v. phr.",
                meaning: "khám phá những địa điểm mới",
                example: "I love going with friends who enjoy <strong>exploring new places</strong>."
              },
              {
                word: "save a lot of money",
                ipa: "/seɪv ə lɒt əv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm rất nhiều tiền",
                example: "We can share the hotel room, which helps us <strong>save a lot of money</strong>."
              }
            ]
          }
        }
      },
      {
        id: "travelling_q2",
        num: 2,
        prompt: "What do you usually prepare before going on a trip?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('What do you usually...') hỏi về thói quen chuẩn bị trước chuyến đi.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu đơn chỉ mục đích (to + Vo), Câu ghép (, so) và Câu phức thời gian (Before I go on a trip, ...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Quên dấu phẩy sau mệnh đề thời gian đứng đầu câu ('Before I go on a trip, I always...').",
          "Quên âm cuối số nhiều /-s/ ở các danh từ đếm được như 'clothes', 'shoes', 'items'.",
          "Dùng mạo từ 'a' trước danh từ không đếm được như 'sunscreen' hoặc 'medicine'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu đơn + to Vo)",
                text: "Thường xem dự báo thời tiết trước để chuẩn bị quần áo phù hợp."
              },
              {
                label: "Chi tiết trang phục (Câu đơn)",
                text: "Mang theo quần áo mỏng nhẹ và một đôi giày đi bộ thoải mái."
              },
              {
                label: "Vật dụng cần thiết (Câu ghép - , and)",
                text: "Luôn bỏ sạc dự phòng vào ba lô, và mang theo một ít thuốc cơ bản."
              }
            ],
            modelAnswer:
              "Before a trip, I usually <strong>check the weather</strong> to prepare the right clothes. I always bring <strong>light clothes</strong> and a pair of <strong>comfortable walking shoes</strong>. Besides, I put a <strong>power bank</strong> in my backpack, and I also bring some basic medicine.",
            vocab: [
              {
                word: "check the weather",
                ipa: "/tʃek ðə ˈweðər/",
                pos: "v. phr.",
                meaning: "kiểm tra thời tiết",
                example: "Before a trip, I usually <strong>check the weather</strong> to prepare the right clothes."
              },
              {
                word: "light clothes",
                ipa: "/laɪt kloʊðz/",
                pos: "n. phr.",
                meaning: "quần áo mỏng nhẹ",
                example: "I always bring <strong>light clothes</strong> and a pair of comfortable walking shoes."
              },
              {
                word: "comfortable walking shoes",
                ipa: "/ˈkʌmftəbl ˈwɔːkɪŋ ʃuːz/",
                pos: "n. phr.",
                meaning: "giày đi bộ thoải mái",
                example: "I always bring light clothes and a pair of <strong>comfortable walking shoes</strong>."
              },
              {
                word: "power bank",
                ipa: "/ˈpaʊər bæŋk/",
                pos: "n.",
                meaning: "sạc dự phòng",
                example: "I put a <strong>power bank</strong> in my backpack, and I also bring some basic medicine."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - Before + S + V)",
                text: "Trước khi đi du lịch, luôn xem trước thời tiết để chọn trang phục phù hợp."
              },
              {
                label: "Lý do (Câu ghép - , so)",
                text: "Thích đi bộ khám phá và chụp ảnh, nên luôn mang đồ thoải mái và một đôi giày tốt."
              },
              {
                label: "Ví dụ vật dụng (Mệnh đề quan hệ - that I might need)",
                text: "Ngoài ra còn chuẩn bị một túi nhỏ đựng các đồ thiết yếu như kem chống nắng, sạc dự phòng và thuốc cơ bản."
              }
            ],
            modelAnswer:
              "Before I go on a trip, I always check the weather forecast so that I can <strong>pack suitable clothes</strong>. I love walking around to take photos, so I usually bring comfortable outfits and a good pair of shoes. Moreover, I prepare some <strong>essential items</strong> that I might need, such as <strong>sunscreen</strong>, a power bank, and <strong>basic medicine</strong>.",
            vocab: [
              {
                word: "pack suitable clothes",
                ipa: "/pæk ˈsuːtəbl kloʊðz/",
                pos: "v. phr.",
                meaning: "xếp quần áo phù hợp",
                example: "I always check the weather forecast so that I can <strong>pack suitable clothes</strong>."
              },
              {
                word: "essential items",
                ipa: "/ɪˈsenʃl ˈaɪtəmz/",
                pos: "n. phr.",
                meaning: "các vật dụng thiết yếu",
                example: "Moreover, I prepare some <strong>essential items</strong> that I might need."
              },
              {
                word: "sunscreen",
                ipa: "/ˈsʌnskriːn/",
                pos: "n.",
                meaning: "kem chống nắng",
                example: "I prepare some essential items, such as <strong>sunscreen</strong> and a power bank."
              },
              {
                word: "basic medicine",
                ipa: "/ˈbeɪsɪk ˈmedɪsn/",
                pos: "n. phr.",
                meaning: "thuốc cơ bản",
                example: "I always bring sunscreen, a power bank, and <strong>basic medicine</strong>."
              }
            ]
          }
        }
      },
      {
        id: "travelling_q3",
        num: 3,
        prompt: "Which season is the best for traveling in your hometown?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('Which season is the best...') hỏi về mùa đẹp nhất để du lịch ở quê hương.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức chỉ lý do (because / since), Câu ghép (, so) và Mệnh đề quan hệ (, which makes it easy...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Thiếu mạo từ 'the' trước tên mùa đặc trưng ('the dry season', 'the rainy season').",
          "Dùng cả 'Because ... so ...' trong cùng một câu (lỗi kinh điển trong bài Câu phức).",
          "Chỉ nói về thời tiết mà không nêu hoạt động du khách có thể làm ở quê hương."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mùa đẹp nhất ở quê mình là mùa khô vì bầu trời trong xanh và nắng đẹp."
              },
              {
                label: "Lý do thuận lợi (Câu ghép - , so)",
                text: "Trời rất ít mưa, nên du khách có thể đi lại rất dễ dàng."
              },
              {
                label: "Hoạt động gợi ý (Câu đơn)",
                text: "Họ có thể tham quan các điểm nổi tiếng và thưởng thức nhiều món ăn đường phố ngon miệng."
              }
            ],
            modelAnswer:
              "The best season for traveling in my hometown is <strong>the dry season</strong> because the sky is clear and sunny. It rarely rains during this time, so tourists can <strong>travel around</strong> very easily. They can visit <strong>famous attractions</strong> and enjoy delicious <strong>street food</strong> at the night market.",
            vocab: [
              {
                word: "the dry season",
                ipa: "/ðə draɪ ˈsiːzn/",
                pos: "n. phr.",
                meaning: "mùa khô",
                example: "The best season for traveling in my hometown is <strong>the dry season</strong>."
              },
              {
                word: "travel around",
                ipa: "/ˈtrævl əˈraʊnd/",
                pos: "v. phr.",
                meaning: "đi lại, dạo quanh",
                example: "It rarely rains during this time, so tourists can <strong>travel around</strong> very easily."
              },
              {
                word: "famous attractions",
                ipa: "/ˈfeɪməs əˈtrækʃnz/",
                pos: "n. phr.",
                meaning: "các điểm tham quan nổi tiếng",
                example: "They can visit <strong>famous attractions</strong> and enjoy delicious street food."
              },
              {
                word: "street food",
                ipa: "/striːt fuːd/",
                pos: "n. phr.",
                meaning: "đồ ăn đường phố",
                example: "They can enjoy delicious <strong>street food</strong> at the night market."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Thời điểm lý tưởng nhất để thăm quê mình là mùa khô vì thời tiết rất mát mẻ và dễ chịu."
              },
              {
                label: "Lý do (Mệnh đề quan hệ - , which makes it...)",
                text: "Trời hầu như không mưa, điều này giúp du khách rất thuận tiện đi khám phá thành phố."
              },
              {
                label: "Ví dụ hoạt động (Câu đơn mở rộng)",
                text: "Họ có thể đi dạo chợ đêm, chụp ảnh ngoài trời và thử nhiều món đặc sản địa phương hợp túi tiền."
              }
            ],
            modelAnswer:
              "I think the best time to visit my hometown is <strong>the dry season</strong> because the weather is very <strong>cool and pleasant</strong>. There is almost no rain, <strong>which makes it very convenient</strong> for tourists to explore the city. For example, they can walk around the <strong>night market</strong> and try many <strong>affordable</strong> local dishes.",
            vocab: [
              {
                word: "cool and pleasant",
                ipa: "/kuːl ænd ˈpleznt/",
                pos: "adj. phr.",
                meaning: "mát mẻ và dễ chịu",
                example: "The best time to visit my hometown is the dry season because the weather is very <strong>cool and pleasant</strong>."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện, tiện lợi",
                example: "There is almost no rain, which makes it very <strong>convenient</strong> for tourists."
              },
              {
                word: "night market",
                ipa: "/naɪt ˈmɑːrkɪt/",
                pos: "n. phr.",
                meaning: "chợ đêm",
                example: "For example, they can walk around the <strong>night market</strong>."
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "hợp túi tiền, giá phải chăng",
                example: "They can try many <strong>affordable</strong> local dishes."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 02: TRIPS
  // ==========================================================================
  {
    id: "topic-trips",
    number: "02",
    title: "Trips",
    titleVi: "Những chuyến đi & Kỳ nghỉ ngắn ngày",
    description:
      "Luyện 3 câu hỏi xoay quanh sở thích đi chơi xa để thư giãn, dự định cho chuyến đi sắp tới và loại hình chuyến đi phù hợp nhất với bản thân.",
    questionsCount: 3,
    questions: [
      {
        id: "trips_q1",
        num: 1,
        prompt: "Do you like going on trips?",
        analysis: {
          questionType: "Câu hỏi Yes/No ('Do you like...') hỏi về sở thích đi du lịch.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức thời gian (Whenever I feel stressed...) và Mệnh đề quan hệ (a great activity that helps me...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Dùng sai giới từ 'go to a trip' thay vì cụm từ đúng là 'go on a trip' / 'go on trips'.",
          "Chỉ trả lời 'Yes, I do' mà không mở rộng lợi ích đối với tinh thần và sức khỏe.",
          "Quên thêm '-s' vào động từ 'helps' trong mệnh đề quan hệ 'an activity that helps me...'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Trả lời có, mình rất thích đi du lịch vì nó giúp mình thư giãn sau những ngày học và làm việc bận rộn."
              },
              {
                label: "Lý do (Câu đơn)",
                text: "Đi đến một nơi mới giúp mình giảm căng thẳng và quên đi áp lực."
              },
              {
                label: "Chi tiết (Câu ghép - , so)",
                text: "Mình rất thích ngắm cảnh đẹp, nên mỗi chuyến đi đều làm mình thấy rất vui."
              }
            ],
            modelAnswer:
              "Yes, I really like <strong>going on trips</strong> because it helps me relax after busy days at school. Visiting a new place is a great way to <strong>reduce stress</strong> and forget about work. I love seeing <strong>beautiful scenery</strong>, so every trip makes me feel very happy.",
            vocab: [
              {
                word: "go on trips",
                ipa: "/ɡoʊ ɒn trɪps/",
                pos: "v. phr.",
                meaning: "đi du lịch, đi chơi xa",
                example: "Yes, I really like <strong>going on trips</strong> because it helps me relax."
              },
              {
                word: "reduce stress",
                ipa: "/rɪˈduːs stres/",
                pos: "v. phr.",
                meaning: "giảm căng thẳng",
                example: "Visiting a new place is a great way to <strong>reduce stress</strong>."
              },
              {
                word: "beautiful scenery",
                ipa: "/ˈbjuːtɪfl ˈsiːnəri/",
                pos: "n. phr.",
                meaning: "phong cảnh đẹp",
                example: "I love seeing <strong>beautiful scenery</strong>, so every trip makes me feel very happy."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Mệnh đề quan hệ - that helps me...)",
                text: "Chắc chắn có, đi du lịch là một hoạt động tuyệt vời giúp mình giảm căng thẳng và nạp lại năng lượng."
              },
              {
                label: "Lý do (Câu phức thời gian - Whenever + S + V)",
                text: "Mỗi khi cảm thấy mệt mỏi sau giờ học hoặc giờ làm, mình thường muốn đi chơi xa vài ngày để thư thái đầu óc."
              },
              {
                label: "Kết quả (Mệnh đề quan hệ - , which makes me...)",
                text: "Mình có thể tận hưởng không khí trong lành và đồ ăn ngon, điều này giúp mình cảm thấy vui vẻ và làm việc hiệu quả hơn."
              }
            ],
            modelAnswer:
              "Yes, definitely. Going on trips is a wonderful activity <strong>that helps me reduce stress</strong> and <strong>recharge my energy</strong>. <strong>Whenever</strong> I feel tired after work or school, I want to take a short trip to <strong>clear my mind</strong>. I can enjoy fresh air and good food, <strong>which makes me feel very happy</strong>.",
            vocab: [
              {
                word: "recharge my energy",
                ipa: "/ˌriːˈtʃɑːrdʒ maɪ ˈenərdʒi/",
                pos: "v. phr.",
                meaning: "nạp lại năng lượng",
                example: "Going on trips is a wonderful activity that helps me <strong>recharge my energy</strong>."
              },
              {
                word: "whenever",
                ipa: "/wenˈevər/",
                pos: "conj.",
                meaning: "mỗi khi, bất cứ khi nào",
                example: "<strong>Whenever</strong> I feel tired after work, I want to take a short trip."
              },
              {
                word: "clear my mind",
                ipa: "/klɪər maɪ maɪnd/",
                pos: "v. phr.",
                meaning: "làm đầu óc thư thái, nhẹ nhõm",
                example: "I want to take a short trip to <strong>clear my mind</strong>."
              }
            ]
          }
        }
      },
      {
        id: "trips_q2",
        num: 2,
        prompt: "Do you have any plans for your next trip?",
        analysis: {
          questionType: "Câu hỏi Yes/No ('Do you have any plans...') hỏi về kế hoạch chuyến đi sắp tới.",
          tense: "Hiện tại đơn kết hợp Tương lai (will / plan to). Áp dụng Câu ghép (, but / , so) và Câu phức thời gian (As soon as / Once...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Dùng 'will' ngay bên trong mệnh đề 'As soon as' hoặc 'When' (lỗi Lưu ý 03 trong bài Câu phức: phải nói 'As soon as I finish...', không nói 'As soon as I will finish...').",
          "Dùng sai giới từ 'busy for' thay vì 'busy with my studies / work'.",
          "Trả lời quá ngắn khi chưa có kế hoạch thật."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Hiện tại mình chưa có kế hoạch cụ thể vì đang rất bận học / làm việc."
              },
              {
                label: "Lý do (Câu ghép - , so)",
                text: "Tháng tới mình có nhiều bài thi quan trọng, nên mình phải tập trung học trước."
              },
              {
                label: "Dự định sắp tới (Câu đơn - plan to + Vo)",
                text: "Sau kỳ thi, mình dự định đi Đà Lạt vài ngày cùng nhóm bạn thân."
              }
            ],
            modelAnswer:
              "Not right now, because I am very <strong>busy with my studies</strong> at the moment. Next month I have some important exams, so I need to <strong>focus on</strong> my schoolwork first. However, after the exams, I <strong>plan to travel</strong> to Da Lat with my close friends.",
            vocab: [
              {
                word: "busy with my studies",
                ipa: "/ˈbɪzi wɪð maɪ ˈstʌdiz/",
                pos: "adj. phr.",
                meaning: "bận rộn với việc học",
                example: "I am very <strong>busy with my studies</strong> at the moment."
              },
              {
                word: "focus on",
                ipa: "/ˈfoʊkəs ɒn/",
                pos: "phr. v.",
                meaning: "tập trung vào",
                example: "Next month I have some important exams, so I need to <strong>focus on</strong> my schoolwork first."
              },
              {
                word: "plan to travel",
                ipa: "/plæn tuː ˈtrævl/",
                pos: "v. phr.",
                meaning: "dự định đi du lịch",
                example: "After the exams, I <strong>plan to travel</strong> to Da Lat with my close friends."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu ghép - , but)",
                text: "Mình rất muốn đi chơi xa, nhưng hiện tại mình chưa có kế hoạch chi tiết nào."
              },
              {
                label: "Lý do (Câu phức - Since + S + V)",
                text: "Vì tháng tới có nhiều hạn chót công việc và bài thi nên mình phải ưu tiên hoàn thành trước."
              },
              {
                label: "Dự định (Câu phức thời gian - As soon as + S + V)",
                text: "Ngay khi hoàn thành xong mọi việc, mình sẽ đi nghỉ ngắn ngày ở Đà Nẵng để tận hưởng không khí biển."
              }
            ],
            modelAnswer:
              "I really want to go on a trip, but I do not have a <strong>detailed plan</strong> right now. <strong>Since</strong> I have many exams and deadlines next month, I have to finish my work first. However, <strong>as soon as</strong> I finish everything, I will go to Da Nang with my friends to <strong>enjoy the fresh sea air</strong>.",
            vocab: [
              {
                word: "detailed plan",
                ipa: "/ˈdiːteɪld plæn/",
                pos: "n. phr.",
                meaning: "kế hoạch chi tiết",
                example: "I really want to go on a trip, but I do not have a <strong>detailed plan</strong> right now."
              },
              {
                word: "as soon as",
                ipa: "/æz suːn æz/",
                pos: "conj.",
                meaning: "ngay khi",
                example: "<strong>As soon as</strong> I finish everything, I will go to Da Nang with my friends."
              },
              {
                word: "enjoy the fresh sea air",
                ipa: "/ɪnˈdʒɔɪ ðə freʃ siː er/",
                pos: "v. phr.",
                meaning: "tận hưởng không khí biển trong lành",
                example: "I will go to Da Nang with my friends to <strong>enjoy the fresh sea air</strong>."
              }
            ]
          }
        }
      },
      {
        id: "trips_q3",
        num: 3,
        prompt: "What kind of trips do you enjoy the most?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('What kind of trips...') hỏi về loại chuyến đi yêu thích nhất.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức chỉ lý do (because / since), Câu ghép (, so) và Mệnh đề quan hệ (, which is very affordable).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Nói 'suitable with me' thay vì đúng giới từ là 'suitable for me'.",
          "Dùng cả 'Although ... but ...' trong một câu khi muốn nói 'Mặc dù bận nhưng mình vẫn thích đi chuyến ngắn'.",
          "Quên chia danh từ số nhiều 'short trips' sau 'I enjoy ...'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mình thích những chuyến đi ngắn ngày nhất vì mình thường khá bận vào các ngày trong tuần."
              },
              {
                label: "Lý do (Câu ghép - , so)",
                text: "Mình không có nhiều thời gian rảnh, nên một chuyến đi 2 ngày dịp cuối tuần là rất phù hợp với mình."
              },
              {
                label: "Chi tiết (Câu đơn)",
                text: "Những chuyến đi ngắn cũng rất dễ chuẩn bị và hợp túi tiền."
              }
            ],
            modelAnswer:
              "I enjoy <strong>short trips</strong> the most because I am usually quite busy on weekdays. I do not have much free time, so a two-day trip <strong>on weekends</strong> is very <strong>suitable for me</strong>. Also, short trips are easy to prepare and very <strong>affordable</strong>.",
            vocab: [
              {
                word: "short trips",
                ipa: "/ʃɔːrt trɪps/",
                pos: "n. phr.",
                meaning: "những chuyến đi ngắn ngày",
                example: "I enjoy <strong>short trips</strong> the most because I am usually quite busy on weekdays."
              },
              {
                word: "on weekends",
                ipa: "/ɒn ˈwiːkendz/",
                pos: "prep. phr.",
                meaning: "vào dịp cuối tuần",
                example: "A two-day trip <strong>on weekends</strong> is very suitable for me."
              },
              {
                word: "suitable for me",
                ipa: "/ˈsuːtəbl fɔːr miː/",
                pos: "adj. phr.",
                meaning: "phù hợp với mình",
                example: "A two-day trip on weekends is very <strong>suitable for me</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - Since + S + V)",
                text: "Vì lịch học và làm việc khá bận rộn nên mình thích nhất các chuyến đi ngắn dịp cuối tuần."
              },
              {
                label: "Lý do (Mệnh đề quan hệ - where I can...)",
                text: "Mình thích đến một thị trấn yên bình gần thành phố nơi mình có thể hít thở không khí trong lành và thư giãn."
              },
              {
                label: "Ưu điểm (Mệnh đề quan hệ - , which helps me...)",
                text: "Chuyến đi 2 ngày không tốn nhiều thời gian chuẩn bị, điều này giúp mình nghỉ ngơi thoải mái mà không thấy mệt."
              }
            ],
            modelAnswer:
              "<strong>Since</strong> my schedule is quite busy on weekdays, I enjoy <strong>short weekend trips</strong> the most. I love visiting a peaceful town near my city <strong>where I can enjoy fresh air</strong> and relax at a quiet coffee shop. A two-day trip does not require much preparation, <strong>which helps me</strong> rest comfortably without feeling tired.",
            vocab: [
              {
                word: "short weekend trips",
                ipa: "/ʃɔːrt ˈwiːkend trɪps/",
                pos: "n. phr.",
                meaning: "các chuyến đi ngắn cuối tuần",
                example: "Since my schedule is quite busy, I enjoy <strong>short weekend trips</strong> the most."
              },
              {
                word: "peaceful town",
                ipa: "/ˈpiːsfl taʊn/",
                pos: "n. phr.",
                meaning: "thị trấn yên bình",
                example: "I love visiting a <strong>peaceful town</strong> near my city where I can enjoy fresh air."
              },
              {
                word: "require much preparation",
                ipa: "/rɪˈkwaɪər mʌtʃ ˌprepəˈreɪʃn/",
                pos: "v. phr.",
                meaning: "đòi hỏi nhiều sự chuẩn bị",
                example: "A two-day trip does not <strong>require much preparation</strong>."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 03: TRAVEL PLANS
  // ==========================================================================
  {
    id: "topic-travel-plans",
    number: "03",
    title: "Travel plans",
    titleVi: "Kế hoạch du lịch & Điểm đến yêu thích",
    description:
      "Luyện 3 câu hỏi về kế hoạch đi du lịch trong tháng tới, địa điểm bạn mong muốn ghé thăm nhất (Đà Lạt / Đà Nẵng) và cách bạn chuẩn bị hành lý.",
    questionsCount: 3,
    questions: [
      {
        id: "plans_q1",
        num: 1,
        prompt: "Do you have any plans for a trip next month?",
        analysis: {
          questionType: "Câu hỏi Yes/No ('Do you have any plans...') hỏi cụ thể về kế hoạch đi chơi vào tháng tới.",
          tense: "Hiện tại đơn kết hợp Tương lai gần (be going to / will). Áp dụng Câu phức nhượng bộ (Although) hoặc điều kiện (If).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Trả lời 'No, I don't' rồi dừng lại ngay.",
          "Dùng cả 'Although ... but ...' hoặc 'Because ... so ...' trong cùng một câu phức.",
          "Quên dùng giới từ 'on' trong cụm 'go on a short trip'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Tháng tới mình chưa có kế hoạch đi du lịch vì mình khá bận việc học ở trường."
              },
              {
                label: "Lý do (Câu ghép - , so)",
                text: "Mình sắp có kỳ thi cuối kỳ, nên mình cần ở nhà ôn bài."
              },
              {
                label: "Mở rộng (Câu phức điều kiện - If)",
                text: "Nếu thi xong sớm, mình sẽ đi chơi xa một chuyến ngắn ngày với bạn bè."
              }
            ],
            modelAnswer:
              "No, I do not have any plans for a trip next month because I am quite busy at school. I have my <strong>final exams</strong> soon, so I need to stay at home to <strong>review my lessons</strong>. <strong>If</strong> I finish my exams early, I will go on a short trip with my friends.",
            vocab: [
              {
                word: "final exams",
                ipa: "/ˈfaɪnl ɪɡˈzæmz/",
                pos: "n. phr.",
                meaning: "các bài thi cuối kỳ",
                example: "I have my <strong>final exams</strong> soon, so I need to stay at home."
              },
              {
                word: "review my lessons",
                ipa: "/rɪˈvjuː maɪ ˈlesnz/",
                pos: "v. phr.",
                meaning: "ôn tập bài vở",
                example: "I need to stay at home to <strong>review my lessons</strong>."
              },
              {
                word: "go on a short trip",
                ipa: "/ɡoʊ ɒn ə ʃɔːrt trɪp/",
                pos: "v. phr.",
                meaning: "đi một chuyến du lịch ngắn",
                example: "If I finish my exams early, I will <strong>go on a short trip</strong> with my friends."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức nhượng bộ - Although)",
                text: "Mặc dù rất thích đi du lịch, nhưng tháng tới mình chưa có kế hoạch cho chuyến đi nào."
              },
              {
                label: "Lý do (Câu phức lý do - because)",
                text: "Mình phải hoàn thành một số bài kiểm tra và dự án quan trọng ở trường / công ty."
              },
              {
                label: "Dự định (Câu phức thời gian - Once + S + V)",
                text: "Ngay khi kỳ thi kết thúc, mình sẽ cùng bạn thân đi Đà Lạt vài ngày để xả hơi."
              }
            ],
            modelAnswer:
              "<strong>Although</strong> I really love traveling, I do not have any plans for a trip next month. I have to stay home because I need to finish several <strong>important projects</strong> and exams. However, <strong>once</strong> my exams are over, my close friends and I will travel to Da Lat for a few days to <strong>relax and unwind</strong>.",
            vocab: [
              {
                word: "although",
                ipa: "/ɔːlˈðoʊ/",
                pos: "conj.",
                meaning: "mặc dù (không dùng chung với 'but')",
                example: "<strong>Although</strong> I really love traveling, I do not have any plans for a trip next month."
              },
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɒdʒekts/",
                pos: "n. phr.",
                meaning: "các dự án quan trọng",
                example: "I need to finish several <strong>important projects</strong> and exams."
              },
              {
                word: "relax and unwind",
                ipa: "/rɪˈlæks ænd ˌʌnˈwaɪnd/",
                pos: "v. phr.",
                meaning: "thư giãn và xả hơi",
                example: "We will travel to Da Lat for a few days to <strong>relax and unwind</strong>."
              }
            ]
          }
        }
      },
      {
        id: "plans_q2",
        num: 2,
        prompt: "Where would you like to go?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('Where would you like to go?') hỏi về địa điểm du lịch mong muốn.",
          tense: "Cấu trúc mong muốn 'I would like to visit / go to...' kết hợp Hiện tại đơn. Áp dụng Câu ghép (, and) và Mệnh đề quan hệ nơi chốn (where...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Dùng thừa giới từ 'to' sau động từ 'visit' (phải nói 'visit Da Lat', tuyệt đối không nói 'visit to Da Lat').",
          "Nói 'I like go to Da Lat' thay vì cấu trúc đúng 'I would like to go to Da Lat'.",
          "Quên miêu tả đặc điểm nổi bật của địa điểm đó (phong cảnh, thời tiết, đồ ăn)."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mình rất muốn đi Đà Lạt vì đó là một thành phố rất yên bình và xinh đẹp."
              },
              {
                label: "Đặc điểm yêu thích (Câu ghép - , and)",
                text: "Đà Lạt có phong cảnh thiên nhiên tuyệt đẹp, và thời tiết ở đó mát mẻ quanh năm."
              },
              {
                label: "Hoạt động muốn làm (Câu đơn)",
                text: "Mình muốn hít thở không khí trong lành, ngồi quán cà phê ấm cúng và đi dạo chợ đêm."
              }
            ],
            modelAnswer:
              "If I have free time, I would really like to visit <strong>Da Lat</strong> because it is a very peaceful city. Da Lat has <strong>beautiful natural scenery</strong>, and the weather there is <strong>cool all year round</strong>. I want to enjoy the fresh air, sit at a <strong>cozy coffee shop</strong>, and walk around the night market.",
            vocab: [
              {
                word: "beautiful natural scenery",
                ipa: "/ˈbjuːtɪfl ˈnætʃrəl ˈsiːnəri/",
                pos: "n. phr.",
                meaning: "phong cảnh thiên nhiên tuyệt đẹp",
                example: "Da Lat has <strong>beautiful natural scenery</strong>, and the weather there is cool."
              },
              {
                word: "cool all year round",
                ipa: "/kuːl ɔːl jɪər raʊnd/",
                pos: "adj. phr.",
                meaning: "mát mẻ quanh năm",
                example: "The weather there is <strong>cool all year round</strong>."
              },
              {
                word: "cozy coffee shop",
                ipa: "/ˈkoʊzi ˈkɒfi ʃɒp/",
                pos: "n. phr.",
                meaning: "quán cà phê ấm cúng",
                example: "I want to enjoy the fresh air and sit at a <strong>cozy coffee shop</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Mệnh đề quan hệ nơi chốn - where...)",
                text: "Mình rất muốn đến Đà Lạt — địa điểm lý tưởng nơi mình luôn muốn tìm đến mỗi khi cần tránh cái nóng và sự ồn ào ở thành phố."
              },
              {
                label: "Lý do (Câu ghép - , and)",
                text: "Không khí trên đó luôn trong lành, mát lạnh, và nhịp sống cũng rất nhẹ nhàng."
              },
              {
                label: "Hoạt động (Mệnh đề quan hệ - , which makes me...)",
                text: "Mình có thể uống cà phê nóng buổi sáng và ngắm rừng thông, điều này giúp mình cảm thấy vô cùng thư thái."
              }
            ],
            modelAnswer:
              "I would love to visit Da Lat, which is the <strong>ideal place where</strong> I can <strong>get away from</strong> the heat and noise of my city. The air there is always fresh and cool, and the <strong>pace of life</strong> is very peaceful. I can drink hot coffee in the morning and enjoy the nature, <strong>which makes me feel completely relaxed</strong>.",
            vocab: [
              {
                word: "ideal place",
                ipa: "/aɪˈdiːəl pleɪs/",
                pos: "n. phr.",
                meaning: "địa điểm lý tưởng",
                example: "Da Lat is the <strong>ideal place</strong> where I can get away from the noise of my city."
              },
              {
                word: "get away from",
                ipa: "/ɡet əˈweɪ frɒm/",
                pos: "phr. v.",
                meaning: "tạm rời xa, thoát khỏi",
                example: "I can <strong>get away from</strong> the heat and noise of my city."
              },
              {
                word: "pace of life",
                ipa: "/peɪs əv laɪf/",
                pos: "n. phr.",
                meaning: "nhịp sống",
                example: "The air there is always fresh and cool, and the <strong>pace of life</strong> is very peaceful."
              }
            ]
          }
        }
      },
      {
        id: "plans_q3",
        num: 3,
        prompt: "What do you usually prepare before going on a trip?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('What do you usually prepare...') gắn liền với chủ đề lên kế hoạch chuyến đi.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu đơn chỉ mục đích (to + Vo), Câu ghép (, and) và Mệnh đề quan hệ (, which helps me...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Lặp lại từ 'prepare' nhiều lần thay vì dùng 'pack', 'bring', 'book'.",
          "Phát âm sai từ 'clothes' (/kloʊðz/ — chỉ có 1 âm tiết).",
          "Quên từ nối chuyển ý như 'First,', 'Besides,', 'Moreover,' khiến các câu bị rời rạc."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu đơn)",
                text: "Đầu tiên, mình thường xếp nhiều loại quần áo như áo thun, quần jeans và áo khoác để chụp ảnh đẹp."
              },
              {
                label: "Đồ cá nhân (Câu ghép - , and)",
                text: "Mình cũng mang theo giấy tờ tùy thân, và chuẩn bị một cục sạc dự phòng cho điện thoại."
              },
              {
                label: "Đồ bảo vệ sức khỏe (Câu đơn)",
                text: "Ngoài ra, mình luôn mang kem chống nắng và một ít thuốc cơ bản."
              }
            ],
            modelAnswer:
              "First, I usually <strong>pack different clothes</strong> like T-shirts, jeans, and jackets to take nice photos. I also bring my <strong>ID card</strong>, and I always prepare a <strong>power bank</strong> for my phone. Besides, I never forget to bring <strong>sunscreen</strong> and some basic medicine.",
            vocab: [
              {
                word: "pack different clothes",
                ipa: "/pæk ˈdɪfrənt kloʊðz/",
                pos: "v. phr.",
                meaning: "xếp nhiều loại quần áo",
                example: "First, I usually <strong>pack different clothes</strong> like T-shirts, jeans, and jackets."
              },
              {
                word: "ID card",
                ipa: "/ˌaɪˈdiː kɑːrd/",
                pos: "n. phr.",
                meaning: "thẻ căn cước / giấy tờ tùy thân",
                example: "I also bring my <strong>ID card</strong>, and I always prepare a power bank."
              },
              {
                word: "sunscreen",
                ipa: "/ˈsʌnskriːn/",
                pos: "n.",
                meaning: "kem chống nắng",
                example: "Besides, I never forget to bring <strong>sunscreen</strong> and some basic medicine."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - Before + S + V)",
                text: "Trước khi lên đường, mình luôn đặt trước phòng khách sạn và xem dự báo thời tiết."
              },
              {
                label: "Xếp hành lý (Mệnh đề quan hệ - , which helps me...)",
                text: "Mình chỉ chọn những bộ trang phục gọn nhẹ và dễ phối, điều này giúp mình không phải mang hành lý quá nặng."
              },
              {
                label: "Vật dụng thiết yếu (Câu phức - in case + S + V)",
                text: "Cuối cùng, mình luôn mang theo kem chống nắng, sạc dự phòng và thuốc cơ bản phòng khi cần dùng trên đường."
              }
            ],
            modelAnswer:
              "Before I go on a trip, I always <strong>book my hotel in advance</strong> and check the weather forecast. I only pack light and comfortable clothes, <strong>which helps me avoid carrying heavy luggage</strong>. Finally, I bring some <strong>essential items</strong> like sunscreen, a power bank, and basic medicine <strong>in case</strong> I need them.",
            vocab: [
              {
                word: "book my hotel in advance",
                ipa: "/bʊk maɪ hoʊˈtel ɪn ədˈvæns/",
                pos: "v. phr.",
                meaning: "đặt phòng khách sạn trước",
                example: "Before I go on a trip, I always <strong>book my hotel in advance</strong>."
              },
              {
                word: "heavy luggage",
                ipa: "/ˈhevi ˈlʌɡɪdʒ/",
                pos: "n. phr.",
                meaning: "hành lý nặng nề (luggage không đếm được)",
                example: "I only pack light clothes, which helps me avoid carrying <strong>heavy luggage</strong>."
              },
              {
                word: "in case",
                ipa: "/ɪn keɪs/",
                pos: "conj.",
                meaning: "phòng khi, trong trường hợp",
                example: "I bring sunscreen, a power bank, and basic medicine <strong>in case</strong> I need them."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 04: THE SEASONS IN YOUR COUNTRY
  // ==========================================================================
  {
    id: "topic-seasons",
    number: "04",
    title: "The seasons in your country",
    titleVi: "Các mùa trong năm & Thời tiết địa phương",
    description:
      "Luyện 3 câu hỏi về các mùa ở khu vực bạn sống, mùa bạn yêu thích nhất và thời điểm lý tưởng nhất để du khách ghé thăm đất nước bạn.",
    questionsCount: 3,
    questions: [
      {
        id: "seasons_q1",
        num: 1,
        prompt: "How many seasons are there in your country?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('How many seasons are there...') hỏi về đặc điểm các mùa ở đất nước bạn.",
          tense: "Hiện tại đơn (present simple). Áp dụng cấu trúc 'There are...', Câu ghép (, so / , but) và Mệnh đề quan hệ (, which makes me feel...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Nói 'Have two seasons' thay vì cấu trúc chuẩn 'There are two main seasons'.",
          "Quên thêm '-s' vào động từ 'rains' khi đi với chủ ngữ số ít 'it' ('it rains a lot').",
          "Chỉ nêu tên 2 mùa mà không miêu tả ngắn gọn thời tiết mỗi mùa ra sao."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Cấu trúc There are...)",
                text: "Ở khu vực miền Nam nơi mình sống có 2 mùa chính: mùa khô và mùa mưa."
              },
              {
                label: "Miêu tả mùa khô (Câu ghép - , so)",
                text: "Vào mùa khô, trời rất nắng và nóng, nên mình thường cảm thấy hơi mệt."
              },
              {
                label: "Miêu tả mùa mưa (Câu ghép - , so)",
                text: "Ngược lại, vào mùa mưa thì trời mưa gần như mỗi ngày, nên việc đi ra ngoài khá bất tiện."
              }
            ],
            modelAnswer:
              "In the region where I live, there are <strong>two main seasons</strong>: the dry season and the rainy season. In <strong>the dry season</strong>, the weather is very hot and sunny, so I often feel a bit tired. However, in <strong>the rainy season</strong>, it rains almost every day, so going outside is quite <strong>inconvenient</strong>.",
            vocab: [
              {
                word: "two main seasons",
                ipa: "/tuː meɪn ˈsiːznz/",
                pos: "n. phr.",
                meaning: "hai mùa chính",
                example: "In the region where I live, there are <strong>two main seasons</strong>."
              },
              {
                word: "the rainy season",
                ipa: "/ðə ˈreɪni ˈsiːzn/",
                pos: "n. phr.",
                meaning: "mùa mưa",
                example: "In <strong>the rainy season</strong>, it rains almost every day."
              },
              {
                word: "inconvenient",
                ipa: "/ˌɪnkənˈviːniənt/",
                pos: "adj.",
                meaning: "bất tiện",
                example: "It rains almost every day, so going outside is quite <strong>inconvenient</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu ghép - , but)",
                text: "Khí hậu tùy thuộc vào từng vùng miền, nhưng ở Đồng bằng sông Cửu Long nơi mình sống chỉ có 2 mùa chính là mùa khô và mùa mưa."
              },
              {
                label: "Miêu tả mùa khô (Mệnh đề quan hệ - , which makes me...)",
                text: "Trong mùa khô, thời tiết thường rất nóng và oi bức vào buổi trưa, điều này khiến mình cảm thấy khá mệt mỏi."
              },
              {
                label: "Miêu tả mùa mưa (Câu phức - while + S + V)",
                text: "Trong khi đó, mùa mưa lại có mưa lớn thường xuyên khiến đường sá dễ ngập và đi lại khó khăn."
              }
            ],
            modelAnswer:
              "It <strong>depends on the region</strong>, but in the Mekong Delta where I live, there are two main seasons: the dry season and the rainy season. During the dry season, the weather is extremely <strong>hot and humid</strong>, <strong>which makes me feel</strong> quite tired. Meanwhile, it rains heavily in the rainy season, so <strong>traveling on the roads</strong> is a bit difficult.",
            vocab: [
              {
                word: "depends on the region",
                ipa: "/dɪˈpendz ɒn ðə ˈriːdʒən/",
                pos: "v. phr.",
                meaning: "tùy thuộc vào vùng miền",
                example: "It <strong>depends on the region</strong>, but in the Mekong Delta where I live, there are two main seasons."
              },
              {
                word: "hot and humid",
                ipa: "/hɒt ænd ˈhjuːmɪd/",
                pos: "adj. phr.",
                meaning: "nóng và oi bức",
                example: "During the dry season, the weather is extremely <strong>hot and humid</strong>."
              },
              {
                word: "traveling on the roads",
                ipa: "/ˈtrævəlɪŋ ɒn ðə roʊdz/",
                pos: "n. phr.",
                meaning: "việc đi lại trên đường",
                example: "It rains heavily in the rainy season, so <strong>traveling on the roads</strong> is a bit difficult."
              }
            ]
          }
        }
      },
      {
        id: "seasons_q2",
        num: 2,
        prompt: "What is your favorite season?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('What is your favorite season?') hỏi về mùa yêu thích nhất của bản thân.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức chỉ lý do (because / since) và Câu ghép (, so / , or).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Dùng cả 'Since ... so ...' hoặc 'Because ... so ...' trong cùng một câu.",
          "Quên chia động từ V-ing sau giới từ 'without worrying about getting wet'.",
          "Không đưa ra ví dụ hoạt động cụ thể mình thích làm vào mùa đó."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mùa yêu thích nhất của mình là mùa khô vì bầu trời luôn trong xanh và đẹp."
              },
              {
                label: "Lý do thuận tiện (Câu ghép - , so)",
                text: "Trời không mưa nhiều, nên mình có thể đi ra ngoài dễ dàng mà không sợ bị ướt."
              },
              {
                label: "Hoạt động yêu thích (Câu ghép - , or)",
                text: "Vào cuối tuần, mình thường đi dạo ở công viên, hoặc đi uống cà phê với bạn thân."
              }
            ],
            modelAnswer:
              "My favorite season is <strong>the dry season</strong> because the sky is always <strong>clear and beautiful</strong>. It does not rain much, so I can go out easily without <strong>getting wet</strong>. On weekends, I usually <strong>go for a walk</strong> in the park, or I go to a coffee shop with my close friends.",
            vocab: [
              {
                word: "clear and beautiful",
                ipa: "/klɪər ænd ˈbjuːtɪfl/",
                pos: "adj. phr.",
                meaning: "trong xanh và tuyệt đẹp",
                example: "My favorite season is the dry season because the sky is always <strong>clear and beautiful</strong>."
              },
              {
                word: "getting wet",
                ipa: "/ˈɡetɪŋ wet/",
                pos: "v. phr.",
                meaning: "bị ướt mưa",
                example: "I can go out easily without <strong>getting wet</strong>."
              },
              {
                word: "go for a walk",
                ipa: "/ɡoʊ fɔːr ə wɔːk/",
                pos: "v. phr.",
                meaning: "đi dạo bộ",
                example: "On weekends, I usually <strong>go for a walk</strong> in the park."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mình thích mùa khô nhất, đặc biệt là vào dịp cuối năm vì thời tiết lúc đó khá dịu mát và dễ chịu."
              },
              {
                label: "Lý do (Câu phức - Since + S + V)",
                text: "Vì trời hiếm khi mưa nên mình có thể thoải mái đi học, đi làm mà không cần mang theo áo mưa."
              },
              {
                label: "Ví dụ hoạt động (Mệnh đề quan hệ - , which helps me...)",
                text: "Buổi tối mình thường đi dạo công viên hoặc ngồi cà phê ngoài trời với bạn bè, điều này giúp mình thư giãn rất tốt."
              }
            ],
            modelAnswer:
              "I like <strong>the dry season</strong> the most, especially at the end of the year, because the weather is very <strong>pleasant</strong>. <strong>Since</strong> it rarely rains, I can go out comfortably without worrying about getting wet. In the evening, I often <strong>hang out with my friends</strong> at outdoor coffee shops, <strong>which helps me relax</strong> after a long day.",
            vocab: [
              {
                word: "pleasant",
                ipa: "/ˈpleznt/",
                pos: "adj.",
                meaning: "dễ chịu, ôn hòa",
                example: "I like the dry season the most because the weather is very <strong>pleasant</strong>."
              },
              {
                word: "rarely",
                ipa: "/ˈrerli/",
                pos: "adv.",
                meaning: "hiếm khi",
                example: "Since it <strong>rarely</strong> rains, I can go out comfortably."
              },
              {
                word: "hang out with my friends",
                ipa: "/hæŋ aʊt wɪð maɪ frendz/",
                pos: "v. phr.",
                meaning: "đi chơi / tụ tập cùng bạn bè",
                example: "In the evening, I often <strong>hang out with my friends</strong> at outdoor coffee shops."
              }
            ]
          }
        }
      },
      {
        id: "seasons_q3",
        num: 3,
        prompt: "What is the best season to visit your country?",
        analysis: {
          questionType: "Câu hỏi Wh-Question ('What is the best season to visit...') hỏi về mùa đẹp nhất cho du khách đến thăm đất nước bạn.",
          tense: "Hiện tại đơn (present simple). Áp dụng Câu phức chỉ lý do (because), Câu ghép (, so) và Mệnh đề quan hệ (outdoor activities that...).",
          length: "3 câu ngắn gọn, khoảng 20–25 giây."
        },
        pitfalls: [
          "Dùng 'fewer rain' thay vì đúng lượng từ cho danh từ không đếm được là 'less rain'.",
          "Quên nhắc đến góc nhìn của du khách (tourists / visitors can...).",
          "Thiếu các ví dụ thực tế như đi biển, thăm chợ địa phương, ăn đồ ăn đường phố."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Mùa tốt nhất để đến thăm đất nước mình là mùa khô vì thời tiết nắng đẹp và bầu trời quang đãng."
              },
              {
                label: "Lý do thuận lợi (Câu ghép - , so)",
                text: "Trời ít mưa hơn, nên du khách có thể đi tham quan các thành phố rất thoải mái."
              },
              {
                label: "Ví dụ hoạt động (Câu đơn)",
                text: "Họ có thể tắm biển, thăm các khu chợ địa phương và thử nhiều món ăn truyền thống."
              }
            ],
            modelAnswer:
              "The best season to visit my country is <strong>the dry season</strong> because the weather is sunny and the sky is clear. There is <strong>less rain</strong>, so tourists can explore different cities in a <strong>comfortable</strong> way. They can relax on beautiful beaches, <strong>visit local markets</strong>, and try delicious traditional food.",
            vocab: [
              {
                word: "less rain",
                ipa: "/les reɪn/",
                pos: "n. phr.",
                meaning: "ít mưa hơn",
                example: "There is <strong>less rain</strong>, so tourists can explore different cities."
              },
              {
                word: "comfortable",
                ipa: "/ˈkʌmftəbl/",
                pos: "adj.",
                meaning: "thoải mái, dễ chịu",
                example: "Tourists can explore different cities in a <strong>comfortable</strong> way."
              },
              {
                word: "visit local markets",
                ipa: "/ˈvɪzɪt ˈloʊkl ˈmɑːrkɪts/",
                pos: "v. phr.",
                meaning: "thăm các khu chợ địa phương",
                example: "They can relax on beautiful beaches and <strong>visit local markets</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "Trả lời thẳng (Câu phức - because)",
                text: "Thời điểm lý tưởng nhất để đến thăm Việt Nam là mùa khô vì thời tiết dễ chịu và bầu trời trong xanh."
              },
              {
                label: "Lý do (Câu ghép - , so)",
                text: "Trời ít mưa hơn, nên du khách có thể khám phá thành phố mà không lo những cơn mưa rào bất chợt."
              },
              {
                label: "Ví dụ hoạt động (Mệnh đề quan hệ - where they can...)",
                text: "Họ có thể tham gia nhiều hoạt động ngoài trời và ghé các khu chợ địa phương nơi có rất nhiều món ăn đường phố ngon và rẻ."
              }
            ],
            modelAnswer:
              "I would say the best time to visit my country is <strong>the dry season</strong> because the weather is usually pleasant and the sky is clear. There is less rain, so tourists can explore the city without worrying about <strong>sudden showers</strong>. Moreover, they can enjoy <strong>outdoor activities</strong> and visit local markets <strong>where they can try</strong> delicious street food.",
            vocab: [
              {
                word: "sudden showers",
                ipa: "/ˈsʌdn ˈʃaʊərz/",
                pos: "n. phr.",
                meaning: "những cơn mưa rào bất chợt",
                example: "Tourists can explore the city without worrying about <strong>sudden showers</strong>."
              },
              {
                word: "outdoor activities",
                ipa: "/ˈaʊtdɔːr ækˈtɪvətiz/",
                pos: "n. phr.",
                meaning: "các hoạt động ngoài trời",
                example: "Moreover, they can enjoy <strong>outdoor activities</strong> and visit local markets."
              },
              {
                word: "delicious street food",
                ipa: "/dɪˈlɪʃəs striːt fuːd/",
                pos: "n. phr.",
                meaning: "thức ăn đường phố ngon miệng",
                example: "They can visit local markets where they can try <strong>delicious street food</strong>."
              }
            ]
          }
        }
      }
    ]
  }
];
