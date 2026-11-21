// ==========================================================================
// SPEAKING PART 1 — 4 STANDALONE TOPICS (TRAVELLING, TRIPS, TRAVEL PLANS, SEASONS)
// Áp dụng công thức A-R-E (Answer + Reason -> Example -> Feeling/Result)
// Thiết kế ngắn gọn, dễ đọc cho học sinh yếu (B1: ~28–36 từ | B2: ~35–43 từ)
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
          questionType: "Câu hỏi lựa chọn ('Do you prefer... or...'). Áp dụng công thức A-R-E (Answer + Reason → Example → Feeling).",
          tense: "Hiện tại đơn. Mở đầu thẳng bằng 'I prefer + V-ing... because...' hoặc 'Honestly, I tend to...'.",
          length: "3 câu ngắn gọn (~30–38 từ), dễ đọc một mạch trong 15–20 giây."
        },
        pitfalls: [
          "Trả lời cộc lốc ('With friends.') mà thiếu lý do 'because...' và ví dụ.",
          "Quên thêm V-ing sau 'prefer' (phải nói 'prefer traveling', không nói 'prefer travel').",
          "Nói thiếu âm cuối của 'like', 'friends', 'food', 'photos' làm câu bị cụt."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Chọn đi cùng bạn bè vì rất vui: I prefer traveling with friends because it is very fun."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Ví dụ hoạt động cùng nhau: For example, we can talk, eat good food, and take nice photos together."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "Chốt cảm xúc ngắn gọn: It makes me feel very happy."
              }
            ],
            modelAnswer:
              "I prefer <strong>traveling with friends</strong> because it is very fun. For example, we can talk, eat good food, and <strong>take nice photos</strong> together. It makes me <strong>feel very happy</strong>.",
            vocab: [
              {
                word: "prefer",
                ipa: "/prɪˈfɜːr/",
                pos: "v.",
                meaning: "thích hơn (+ V-ing)",
                example: "I <strong>prefer</strong> traveling with friends because it is very fun."
              },
              {
                word: "take nice photos",
                ipa: "/teɪk naɪs ˈfoʊtoʊz/",
                pos: "v. phr.",
                meaning: "chụp những bức ảnh đẹp",
                example: "For example, we can talk, eat good food, and <strong>take nice photos</strong> together."
              },
              {
                word: "feel very happy",
                ipa: "/fiːl ˈveri ˈhæpi/",
                pos: "v. phr.",
                meaning: "cảm thấy rất vui",
                example: "It makes me <strong>feel very happy</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Honestly)",
                text: "Dùng 'Honestly, I tend to...' để mở đầu tự nhiên và nêu lý do vui vẻ, thoải mái hơn."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Chia tiền khách sạn và cùng thưởng thức món ăn đường phố với bạn thân."
              },
              {
                label: "Cảm xúc (Chốt bằng cụm B2 + , which)",
                text: "Cảm thấy thoải mái (feel at ease) và thực sự xả hơi (unwind)."
              }
            ],
            modelAnswer:
              "<strong>Honestly, I tend to</strong> travel with <strong>close friends</strong> because it is much more <strong>enjoyable</strong>. For example, we share hotel costs and try street food together. This makes me <strong>feel at ease</strong>, which helps me really <strong>unwind</strong>.",
            vocab: [
              {
                word: "tend to",
                ipa: "/tend tuː/",
                pos: "v. phr.",
                meaning: "có xu hướng, thường hay",
                example: "Honestly, I <strong>tend to</strong> travel with close friends."
              },
              {
                word: "enjoyable",
                ipa: "/ɪnˈdʒɔɪəbl/",
                pos: "adj.",
                meaning: "thú vị, đáng nhớ",
                example: "It is much more <strong>enjoyable</strong> when we go together."
              },
              {
                word: "feel at ease",
                ipa: "/fiːl æt iːz/",
                pos: "v. phr.",
                meaning: "cảm thấy thoải mái, nhẹ nhõm",
                example: "This makes me <strong>feel at ease</strong> during the whole trip."
              },
              {
                word: "unwind",
                ipa: "/ˌʌnˈwaɪnd/",
                pos: "v.",
                meaning: "thư giãn, xả hơi",
                example: "Going with friends helps me really <strong>unwind</strong>."
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
          questionType: "Câu hỏi thói quen ('What do you usually...'). Áp dụng công thức Dạng 2 + A-R-E (Habit + Reason → Example → Feeling).",
          tense: "Hiện tại đơn ('I usually...' hoặc 'Actually, I tend to...').",
          length: "3 câu ngắn gọn (~30–38 từ), dùng các vật dụng quen thuộc hằng ngày."
        },
        pitfalls: [
          "Lặp lại mỗi câu 'I prepare...' thay vì nói cụ thể 'check the weather', 'pack clothes'.",
          "Quên mạo từ 'a' trước danh từ số ít ('a power bank', 'a short checklist').",
          "Đọc nhầm từ 'clothes' (/kloʊðz/ — 1 âm tiết) thành 'close'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Thói quen + Lý do)",
                text: "Xem thời tiết trước để mang đúng quần áo: I usually check the weather first because I want to bring the right clothes."
              },
              {
                label: "E (Ví dụ đồ dùng - For example)",
                text: "Kể 2 món quen thuộc: For example, I always pack light clothes and a power bank."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "Chốt cảm giác yên tâm: This helps me feel ready."
              }
            ],
            modelAnswer:
              "I usually <strong>check the weather</strong> first because I want to bring the right clothes. For example, I always <strong>pack light clothes</strong> and a <strong>power bank</strong>. This helps me <strong>feel ready</strong>.",
            vocab: [
              {
                word: "check the weather",
                ipa: "/tʃek ðə ˈweðər/",
                pos: "v. phr.",
                meaning: "xem dự báo thời tiết",
                example: "I usually <strong>check the weather</strong> first before a trip."
              },
              {
                word: "pack light clothes",
                ipa: "/pæk laɪt kloʊðz/",
                pos: "v. phr.",
                meaning: "xếp quần áo gọn nhẹ",
                example: "For example, I always <strong>pack light clothes</strong> and a power bank."
              },
              {
                word: "power bank",
                ipa: "/ˈpaʊər bæŋk/",
                pos: "n.",
                meaning: "sạc dự phòng",
                example: "I bring a <strong>power bank</strong> so my phone stays full."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Actually)",
                text: "Dùng 'Actually, I tend to make a short checklist...' vì giúp mình gọn gàng, không bỏ sót."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Xếp quần áo phù hợp, kem chống nắng và sạc dự phòng cho điện thoại."
              },
              {
                label: "Cảm xúc (Chốt cụm hay)",
                text: "Chốt bằng cụm 'peace of mind' (sự an tâm)."
              }
            ],
            modelAnswer:
              "<strong>Actually, I tend to</strong> make a short checklist because it keeps me organized. For example, I pack <strong>suitable clothes</strong>, <strong>sunscreen</strong>, and a power bank for my phone. Having everything ready gives me real <strong>peace of mind</strong>.",
            vocab: [
              {
                word: "stay organized",
                ipa: "/steɪ ˈɔːrɡənaɪzd/",
                pos: "v. phr.",
                meaning: "giữ mọi thứ ngăn nắp, gọn gàng",
                example: "Making a checklist keeps me <strong>organized</strong> before traveling."
              },
              {
                word: "suitable clothes",
                ipa: "/ˈsuːtəbl kloʊðz/",
                pos: "n. phr.",
                meaning: "quần áo phù hợp",
                example: "For example, I pack <strong>suitable clothes</strong> and a power bank."
              },
              {
                word: "sunscreen",
                ipa: "/ˈsʌnskriːn/",
                pos: "n.",
                meaning: "kem chống nắng",
                example: "I never forget <strong>sunscreen</strong> on sunny days."
              },
              {
                word: "peace of mind",
                ipa: "/piːs əv maɪnd/",
                pos: "n. phr.",
                meaning: "cảm giác yên tâm",
                example: "Having everything ready gives me real <strong>peace of mind</strong>."
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
          questionType: "Câu hỏi lựa chọn mùa đẹp nhất ('Which season is the best...'). Áp dụng A-R-E (Answer + Reason → Example → Result/Feeling).",
          tense: "Hiện tại đơn ('I think the dry season is...' hoặc 'I'd say...').",
          length: "3 câu ngắn gọn (~32–38 từ), nêu tên mùa, thời tiết, ví dụ hoạt động và cảm nhận."
        },
        pitfalls: [
          "Quên mạo từ 'the' trước 'dry season' hoặc 'rainy season'.",
          "Dùng cả 'Because... so...' trong cùng một câu.",
          "Chỉ nói mỗi 'sunny' mà không đưa ra ví dụ du khách làm gì."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Chọn mùa + Lý do)",
                text: "Chọn mùa khô vì trời nắng trong xanh: I think the dry season is the best because the sky is sunny and clear."
              },
              {
                label: "E (Ví dụ hoạt động - For example)",
                text: "Du khách dễ đi chợ đêm và ăn đồ ăn đường phố: For example, tourists can easily visit night markets and eat street food."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "Chốt cảm giác vui vẻ: It makes the trip fun."
              }
            ],
            modelAnswer:
              "I think <strong>the dry season</strong> is the best because the sky is sunny and clear. For example, tourists can easily visit <strong>night markets</strong> and eat <strong>street food</strong>. It makes the trip fun.",
            vocab: [
              {
                word: "the dry season",
                ipa: "/ðə draɪ ˈsiːzn/",
                pos: "n. phr.",
                meaning: "mùa khô",
                example: "I think <strong>the dry season</strong> is the best time to visit."
              },
              {
                word: "night markets",
                ipa: "/naɪt ˈmɑːrkɪts/",
                pos: "n. phr.",
                meaning: "chợ đêm",
                example: "Tourists can easily visit <strong>night markets</strong> at night."
              },
              {
                word: "street food",
                ipa: "/striːt fuːd/",
                pos: "n. phr.",
                meaning: "đồ ăn đường phố",
                example: "Visitors love trying local <strong>street food</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - I'd say)",
                text: "Dùng 'I'd say...' chọn mùa khô vì thời tiết mát mẻ, dễ chịu (cool and pleasant)."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Du khách dạo chợ đêm và thử đồ ăn giá phải chăng (affordable)."
              },
              {
                label: "Kết quả (, which makes...)",
                text: "Không có mưa lớn nên đi lại rất thuận tiện (convenient)."
              }
            ],
            modelAnswer:
              "<strong>I'd say</strong> the dry season is ideal because the weather is <strong>cool and pleasant</strong>. For example, tourists can explore local markets and try <strong>affordable</strong> street food. There is no heavy rain, <strong>which makes traveling very convenient</strong>.",
            vocab: [
              {
                word: "cool and pleasant",
                ipa: "/kuːl ænd ˈpleznt/",
                pos: "adj. phr.",
                meaning: "mát mẻ và dễ chịu",
                example: "The weather is <strong>cool and pleasant</strong> in the dry season."
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "hợp túi tiền, giá phải chăng",
                example: "Tourists can try <strong>affordable</strong> street food at local markets."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện, dễ dàng",
                example: "No heavy rain makes traveling very <strong>convenient</strong>."
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
          questionType: "Câu hỏi Yes/No ('Do you like...'). Áp dụng công thức Dạng 1 + A-R-E (Yes, I do → Reason → Example → Feeling).",
          tense: "Hiện tại đơn. Trả lời thẳng 'Yes, I do' (B1) hoặc 'Yes, I really do' (B2).",
          length: "3 câu ngắn gọn (~31–37 từ), rất dễ nhớ và trôi chảy."
        },
        pitfalls: [
          "Chỉ nói 'Yes, I do.' rồi dừng lại ngay — mất điểm vì trả lời quá cụt.",
          "Dùng sai cụm 'go to trips' thay vì đúng là 'go on trips'.",
          "Quên chia '-s' ở động từ 'helps' hoặc 'makes' sau chủ ngữ 'it'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Yes, I do. I like going on trips because it helps me reduce stress after school."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "For example, I love visiting the beach with my family."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "It makes me feel relaxed."
              }
            ],
            modelAnswer:
              "Yes, I do. I like <strong>going on trips</strong> because it helps me <strong>reduce stress</strong> after school. For example, I love visiting the beach with my family. It makes me <strong>feel relaxed</strong>.",
            vocab: [
              {
                word: "go on trips",
                ipa: "/ɡoʊ ɒn trɪps/",
                pos: "v. phr.",
                meaning: "đi du lịch, đi chơi xa",
                example: "I really like <strong>going on trips</strong> with my family."
              },
              {
                word: "reduce stress",
                ipa: "/rɪˈduːs stres/",
                pos: "v. phr.",
                meaning: "giảm căng thẳng",
                example: "Traveling helps me <strong>reduce stress</strong> after school."
              },
              {
                word: "feel relaxed",
                ipa: "/fiːl rɪˈlækst/",
                pos: "v. phr.",
                meaning: "cảm thấy thư giãn",
                example: "Every short trip makes me <strong>feel relaxed</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 1 - Yes, I really do)",
                text: "Dùng 'Yes, I really do. Honestly, it always cheers me up after a busy week.'"
              },
              {
                label: "E (Ví dụ ngắn - For example)",
                text: "Đi chơi biển cuối tuần cùng bạn thân: taking a short weekend trip to the beach."
              },
              {
                label: "Cảm xúc (Cụm B2 tự nhiên)",
                text: "Chốt bằng cụm 'a little reward' (phần thưởng nhỏ) và 'unwind'."
              }
            ],
            modelAnswer:
              "<strong>Yes, I really do. Honestly,</strong> it always <strong>cheers me up</strong> after a busy week. For example, I love taking a short weekend trip to the beach. It feels like <strong>a little reward</strong> and helps me <strong>unwind</strong>.",
            vocab: [
              {
                word: "cheer me up",
                ipa: "/tʃɪr miː ʌp/",
                pos: "phr. v.",
                meaning: "làm tôi vui lên, phấn chấn lên",
                example: "A short trip always <strong>cheers me up</strong> after a busy week."
              },
              {
                word: "a little reward",
                ipa: "/ə ˈlɪtl rɪˈwɔːrd/",
                pos: "n. phr.",
                meaning: "một phần thưởng nhỏ cho bản thân",
                example: "Every weekend trip feels like <strong>a little reward</strong>."
              },
              {
                word: "unwind",
                ipa: "/ˌʌnˈwaɪnd/",
                pos: "v.",
                meaning: "thư giãn, giải tỏa áp lực",
                example: "Going to the beach really helps me <strong>unwind</strong>."
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
          questionType: "Câu hỏi dự định tương lai ('Do you have any plans...'). Áp dụng A-R-E + mở đầu tự nhiên 'Not right now' / 'Not really, to be honest'.",
          tense: "Hiện tại đơn nêu lý do bận rộn + 'plan to' / 'I'm planning to' nói về dự định sắp tới.",
          length: "3 câu ngắn gọn (~30–38 từ), rất tự nhiên khi chưa có lịch đi cụ thể."
        },
        pitfalls: [
          "Trả lời toàn thì Hiện tại đơn mà quên dùng cụm dự định tương lai ('plan to', 'going to', 'will').",
          "Dùng sai giới từ 'busy for school' thay vì đúng là 'busy with school'.",
          "Nói 'No, I don't' rồi im lặng."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Chưa có ngay vì đang bận học: Not right now, because I am busy with school."
              },
              {
                label: "E (Ví dụ lý do - For example)",
                text: "Tháng tới có nhiều kỳ thi nên cần học chăm: For example, I have many exams next month, so I must study hard first."
              },
              {
                label: "Dự định (Chốt câu tương lai)",
                text: "Chốt dự định đơn giản: Later, I plan to visit Da Lat."
              }
            ],
            modelAnswer:
              "Not right now, because I am <strong>busy with school</strong>. For example, I have many exams next month, so I must <strong>study hard</strong> first. Later, I <strong>plan to visit</strong> Da Lat.",
            vocab: [
              {
                word: "busy with school",
                ipa: "/ˈbɪzi wɪð skuːl/",
                pos: "adj. phr.",
                meaning: "bận rộn với việc học",
                example: "Not right now, because I am <strong>busy with school</strong>."
              },
              {
                word: "study hard",
                ipa: "/ˈstʌdi hɑːrd/",
                pos: "v. phr.",
                meaning: "học tập chăm chỉ",
                example: "I have many exams next month, so I must <strong>study hard</strong> first."
              },
              {
                word: "plan to visit",
                ipa: "/plæn tuː ˈvɪzɪt/",
                pos: "v. phr.",
                meaning: "dự định đi thăm",
                example: "Later, I <strong>plan to visit</strong> Da Lat with my friends."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - to be honest)",
                text: "Not really, to be honest, since I have tight deadlines this month."
              },
              {
                label: "Dự định tương lai (I'm planning to...)",
                text: "Once my exams finish, I'm planning to go to Da Nang."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "Chốt lợi ích bằng 'fresh sea air' và 'clear my mind'."
              }
            ],
            modelAnswer:
              "<strong>Not really, to be honest,</strong> since I have tight deadlines this month. Once my exams finish, <strong>I'm planning to</strong> go to Da Nang. Enjoying the <strong>fresh sea air</strong> will help me <strong>clear my mind</strong>.",
            vocab: [
              {
                word: "to be honest",
                ipa: "/tuː biː ˈɒnɪst/",
                pos: "phr.",
                meaning: "thành thật mà nói",
                example: "Not really, <strong>to be honest</strong>, because I am quite busy."
              },
              {
                word: "I'm planning to",
                ipa: "/aɪm ˈplænɪŋ tuː/",
                pos: "phr.",
                meaning: "tôi đang dự định sẽ...",
                example: "Once my exams finish, <strong>I'm planning to</strong> go to Da Nang."
              },
              {
                word: "fresh sea air",
                ipa: "/freʃ siː er/",
                pos: "n. phr.",
                meaning: "không khí biển trong lành",
                example: "Enjoying the <strong>fresh sea air</strong> makes me feel great."
              },
              {
                word: "clear my mind",
                ipa: "/klɪər maɪ maɪnd/",
                pos: "v. phr.",
                meaning: "giúp đầu óc nhẹ nhõm, thư thái",
                example: "A beach trip will help me <strong>clear my mind</strong>."
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
          questionType: "Câu hỏi sở thích cụ thể (Dạng 3: 'What kind of...'). Áp dụng mở đầu 'I like...' (B1) / 'I usually go for...' (B2) + A-R-E.",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~31–39 từ)."
        },
        pitfalls: [
          "Nói thiếu '-s' ở danh từ đếm được số nhiều ('short trips', 'on weekends').",
          "Dùng 'I like go' hoặc 'I prefer go' thiếu '-ing' hoặc 'to'.",
          "Chỉ nêu tên loại chuyến đi mà quên nói ví dụ đi đâu."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Loại chuyến đi + Lý do)",
                text: "I like short trips because I am quite busy on weekdays."
              },
              {
                label: "E (Ví dụ - For example)",
                text: "For example, I often visit a quiet town near my home."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "It is cheap and makes me feel relaxed."
              }
            ],
            modelAnswer:
              "I like <strong>short trips</strong> because I am quite <strong>busy on weekdays</strong>. For example, I often visit a <strong>quiet town</strong> near my home. It is cheap and makes me feel relaxed.",
            vocab: [
              {
                word: "short trips",
                ipa: "/ʃɔːrt trɪps/",
                pos: "n. phr.",
                meaning: "những chuyến đi ngắn ngày",
                example: "I like <strong>short trips</strong> on Saturday and Sunday."
              },
              {
                word: "busy on weekdays",
                ipa: "/ˈbɪzi ɒn ˈwiːkdeɪz/",
                pos: "adj. phr.",
                meaning: "bận rộn vào các ngày trong tuần",
                example: "I am quite <strong>busy on weekdays</strong> at school."
              },
              {
                word: "quiet town",
                ipa: "/ˈkwaɪət taʊn/",
                pos: "n. phr.",
                meaning: "thị trấn yên tĩnh",
                example: "For example, I often visit a <strong>quiet town</strong> near my home."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 3 - I usually go for...)",
                text: "I usually go for short weekend trips because my schedule is quite busy."
              },
              {
                label: "E (Ví dụ + Mệnh đề quan hệ where)",
                text: "Thăm thị trấn yên bình (peaceful town) nơi có thể uống cà phê và chụp ảnh."
              },
              {
                label: "Cảm xúc (Cụm B2 tự nhiên)",
                text: "Chốt bằng 'affordable' và 'calm and recharged'."
              }
            ],
            modelAnswer:
              "<strong>I usually go for</strong> <strong>short weekend trips</strong> because my schedule is quite busy. For example, I love visiting a <strong>peaceful town</strong> where I can drink coffee and take photos. They are <strong>affordable</strong> and leave me feeling <strong>calm and recharged</strong>.",
            vocab: [
              {
                word: "usually go for",
                ipa: "/ˈjuːʒuəli ɡoʊ fɔːr/",
                pos: "v. phr.",
                meaning: "thường hay chọn",
                example: "<strong>I usually go for</strong> short weekend trips."
              },
              {
                word: "short weekend trips",
                ipa: "/ʃɔːrt ˈwiːkend trɪps/",
                pos: "n. phr.",
                meaning: "những chuyến đi ngắn cuối tuần",
                example: "I enjoy <strong>short weekend trips</strong> with close friends."
              },
              {
                word: "peaceful town",
                ipa: "/ˈpiːsfl taʊn/",
                pos: "n. phr.",
                meaning: "thị trấn yên bình",
                example: "I love visiting a <strong>peaceful town</strong> near the city."
              },
              {
                word: "calm and recharged",
                ipa: "/kɑːm ænd ˌriːˈtʃɑːrdʒd/",
                pos: "adj. phr.",
                meaning: "bình yên và tràn đầy năng lượng trở lại",
                example: "Short trips leave me feeling <strong>calm and recharged</strong>."
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
      "Luyện 3 câu hỏi về kế hoạch đi du lịch trong tháng tới, địa điểm bạn mong muốn ghé thăm nhất và cách chuẩn bị hành lý.",
    questionsCount: 3,
    questions: [
      {
        id: "plans_q1",
        num: 1,
        prompt: "Do you have any plans for a trip next month?",
        analysis: {
          questionType: "Câu hỏi kế hoạch tháng tới ('Do you have any plans... next month?'). Áp dụng công thức A-R-E kết hợp tương lai.",
          tense: "Hiện tại đơn nói lý do + Tương lai ('will', 'I'm planning to').",
          length: "3 câu ngắn gọn (~32–36 từ), dễ nhớ và dễ phát âm."
        },
        pitfalls: [
          "Chỉ nói 'No' mà không nêu lý do và kế hoạch bù sau khi rảnh.",
          "Dùng 'stay at home' thì được, hoặc 'stay home' (tuyệt đối không nói 'go to home').",
          "Quên dấu hiệu thì tương lai cho câu hỏi về tháng tới."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Chưa có vì có bài thi cuối kỳ: Not yet, because I have my final exams next month."
              },
              {
                label: "E (Ví dụ việc phải làm - For example)",
                text: "Ở nhà ôn bài mỗi ngày: For example, I need to stay home and study hard every day."
              },
              {
                label: "Dự định tương lai (If + will)",
                text: "Nếu xong sớm sẽ đi chơi ngắn ngày: If I finish early, I will go on a short trip."
              }
            ],
            modelAnswer:
              "Not yet, because I have my <strong>final exams</strong> next month. For example, I need to <strong>stay home</strong> and study hard every day. If I finish early, I will <strong>go on a short trip</strong>.",
            vocab: [
              {
                word: "final exams",
                ipa: "/ˈfaɪnl ɪɡˈzæmz/",
                pos: "n. phr.",
                meaning: "các bài thi cuối kỳ",
                example: "I have my <strong>final exams</strong> next month."
              },
              {
                word: "stay home",
                ipa: "/steɪ hoʊm/",
                pos: "v. phr.",
                meaning: "ở nhà (không dùng 'to home')",
                example: "I need to <strong>stay home</strong> and study hard."
              },
              {
                word: "go on a short trip",
                ipa: "/ɡoʊ ɒn ə ʃɔːrt trɪp/",
                pos: "v. phr.",
                meaning: "đi một chuyến du lịch ngắn",
                example: "If I finish early, I will <strong>go on a short trip</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - to be honest)",
                text: "Not really, to be honest, because I have some important projects next month."
              },
              {
                label: "Dự định tương lai (I'm planning to...)",
                text: "Sau khi xong hết việc, dự định đi Đà Lạt với bạn thân."
              },
              {
                label: "Kết quả / Cảm xúc (recharge)",
                text: "Nghỉ ngơi một chút sẽ giúp nạp lại năng lượng."
              }
            ],
            modelAnswer:
              "<strong>Not really, to be honest,</strong> because I have some <strong>important projects</strong> next month. However, once everything is done, <strong>I'm planning to</strong> visit Da Lat with <strong>close friends</strong>. Taking a break then will help me <strong>recharge</strong>.",
            vocab: [
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɒdʒekts/",
                pos: "n. phr.",
                meaning: "các dự án quan trọng",
                example: "I have some <strong>important projects</strong> next month."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "I am planning to visit Da Lat with <strong>close friends</strong>."
              },
              {
                word: "recharge",
                ipa: "/ˌriːˈtʃɑːrdʒ/",
                pos: "v.",
                meaning: "nạp lại năng lượng",
                example: "Taking a short break will help me <strong>recharge</strong>."
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
          questionType: "Câu hỏi địa điểm mong muốn ('Where would you like to go?'). Áp dụng mẫu Dạng 1 'My go-to destination is...' hoặc 'I would like to visit...' + A-R-E.",
          tense: "'I would like to...' / 'I would love to...' + Hiện tại đơn miêu tả.",
          length: "3 câu ngắn gọn (~33–39 từ)."
        },
        pitfalls: [
          "Dùng thừa giới từ 'to' sau 'visit' (sai: 'visit to Da Lat'; đúng: 'visit Da Lat').",
          "Nói 'I would like visit' mà quên 'to' trước động từ nguyên mẫu.",
          "Quên miêu tả điểm nổi bật (thời tiết, hoạt động) và cảm xúc."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Địa điểm + Lý do)",
                text: "I would like to visit Da Lat because the weather is cool and nice."
              },
              {
                label: "E (Ví dụ hoạt động - For example)",
                text: "For example, I want to see the flowers and sit in a nice cafe."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "It makes me feel peaceful."
              }
            ],
            modelAnswer:
              "I <strong>would like to visit</strong> Da Lat because the weather is <strong>cool and nice</strong>. For example, I want to see the flowers and sit in a nice cafe. It makes me <strong>feel peaceful</strong>.",
            vocab: [
              {
                word: "would like to visit",
                ipa: "/wʊd laɪk tuː ˈvɪzɪt/",
                pos: "v. phr.",
                meaning: "muốn đi thăm (không có 'to' sau visit)",
                example: "I <strong>would like to visit</strong> Da Lat this year."
              },
              {
                word: "cool and nice",
                ipa: "/kuːl ænd naɪs/",
                pos: "adj. phr.",
                meaning: "mát mẻ và dễ chịu",
                example: "The weather in Da Lat is <strong>cool and nice</strong>."
              },
              {
                word: "feel peaceful",
                ipa: "/fiːl ˈpiːsfl/",
                pos: "v. phr.",
                meaning: "cảm thấy yên bình",
                example: "Sitting in a nice cafe makes me <strong>feel peaceful</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 1 - My go-to destination is...)",
                text: "My go-to destination is Da Lat because its pace of life is slow and peaceful."
              },
              {
                label: "E (Ví dụ + Mệnh đề quan hệ , which helps...)",
                text: "Uống cà phê nóng ở đó giúp đầu óc thư thái (clear my mind)."
              },
              {
                label: "Chốt cảm xúc (ideal place + unwind)",
                text: "Thật sự là nơi lý tưởng để thư giãn."
              }
            ],
            modelAnswer:
              "My <strong>go-to</strong> <strong>destination</strong> is Da Lat because its <strong>pace of life</strong> is slow and peaceful. For example, I would love to drink hot coffee there, <strong>which helps me clear my mind</strong>. It is truly an <strong>ideal place</strong> to unwind.",
            vocab: [
              {
                word: "go-to",
                ipa: "/ˈɡoʊ tuː/",
                pos: "adj.",
                meaning: "lựa chọn yêu thích hàng đầu",
                example: "My <strong>go-to</strong> destination is always Da Lat."
              },
              {
                word: "destination",
                ipa: "/ˌdestɪˈneɪʃn/",
                pos: "n.",
                meaning: "điểm đến du lịch",
                example: "Da Lat is a popular <strong>destination</strong> in Vietnam."
              },
              {
                word: "pace of life",
                ipa: "/peɪs əv laɪf/",
                pos: "n. phr.",
                meaning: "nhịp sống",
                example: "Its <strong>pace of life</strong> is slow and relaxing."
              },
              {
                word: "ideal place",
                ipa: "/aɪˈdiːəl pleɪs/",
                pos: "n. phr.",
                meaning: "nơi lý tưởng",
                example: "Da Lat is an <strong>ideal place</strong> to unwind."
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
          questionType: "Câu hỏi thói quen chuẩn bị ('What do you usually prepare...'). Áp dụng công thức Dạng 2 + A-R-E.",
          tense: "Hiện tại đơn ('I usually...' hoặc 'Actually, I tend to...').",
          length: "3 câu ngắn gọn (~34–36 từ), dễ thuộc các cụm đồ dùng."
        },
        pitfalls: [
          "Đếm sai danh từ không đếm được 'money' và 'luggage' (không thêm 'a' hay '-s').",
          "Quên 'to' sau 'want' ('want to forget').",
          "Đọc nhầm từ 'clothes' thành 'close'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Thói quen + Lý do)",
                text: "I usually pack my clothes early because I do not want to forget anything."
              },
              {
                label: "E (Ví dụ đồ dùng - For example)",
                text: "For example, I bring my ID card, money, and a phone charger."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "It makes me feel safe."
              }
            ],
            modelAnswer:
              "I usually <strong>pack my clothes</strong> early because I do not want to forget anything. For example, I bring my <strong>ID card</strong>, money, and a <strong>phone charger</strong>. It makes me feel safe.",
            vocab: [
              {
                word: "pack my clothes",
                ipa: "/pæk maɪ kloʊðz/",
                pos: "v. phr.",
                meaning: "xếp quần áo vào hành lý",
                example: "I usually <strong>pack my clothes</strong> the night before."
              },
              {
                word: "ID card",
                ipa: "/ˌaɪˈdiː kɑːrd/",
                pos: "n. phr.",
                meaning: "thẻ căn cước / giấy tờ tùy thân",
                example: "I always bring my <strong>ID card</strong> and phone charger."
              },
              {
                word: "phone charger",
                ipa: "/foʊn ˈtʃɑːrdʒər/",
                pos: "n. phr.",
                meaning: "cục sạc điện thoại",
                example: "Do not forget your <strong>phone charger</strong> before a trip."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Actually, I tend to...)",
                text: "Đặt phòng khách sạn trước (book in advance) vì giá đặt sát ngày khá cao."
              },
              {
                label: "E (Ví dụ - For example)",
                text: "Mang quần áo nhẹ và đồ thiết yếu (essential items) để tránh hành lý nặng (heavy luggage)."
              },
              {
                label: "Kết quả / Cảm xúc",
                text: "Chuẩn bị sớm giúp mình thấy thoải mái suốt chuyến đi."
              }
            ],
            modelAnswer:
              "<strong>Actually, I tend to</strong> book my hotel <strong>in advance</strong> because last-minute prices are quite high. For example, I also pack light clothes and <strong>essential items</strong> like sunscreen to avoid <strong>heavy luggage</strong>. Preparing early keeps me comfortable.",
            vocab: [
              {
                word: "in advance",
                ipa: "/ɪn ədˈvæns/",
                pos: "adv. phr.",
                meaning: "trước (về thời gian)",
                example: "I tend to book my hotel <strong>in advance</strong>."
              },
              {
                word: "essential items",
                ipa: "/ɪˈsenʃl ˈaɪtəmz/",
                pos: "n. phr.",
                meaning: "các món đồ thiết yếu",
                example: "I pack light clothes and <strong>essential items</strong> like sunscreen."
              },
              {
                word: "heavy luggage",
                ipa: "/ˈhevi ˈlʌɡɪdʒ/",
                pos: "n. phr.",
                meaning: "hành lý nặng (luggage không đếm được)",
                example: "Packing smartly helps me avoid <strong>heavy luggage</strong>."
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
      "Luyện 3 câu hỏi về các mùa ở khu vực bạn sống, mùa bạn yêu thích nhất và thời điểm đẹp nhất cho du khách ghé thăm.",
    questionsCount: 3,
    questions: [
      {
        id: "seasons_q1",
        num: 1,
        prompt: "How many seasons are there in your country?",
        analysis: {
          questionType: "Câu hỏi mô tả số lượng ('How many seasons are there...'). Áp dụng 'There are...' + A-R-E (Answer → Example → Result).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~33–38 từ), mô tả rõ 2 mùa và ảnh hưởng thực tế."
        },
        pitfalls: [
          "Nói 'Have two seasons' hoặc 'There is two seasons' (đúng: 'There are two main seasons').",
          "Quên '-s' trong 'two seasons' hoặc 'rains' khi đi với 'it'.",
          "Chỉ nêu tên mùa mà không miêu tả thời tiết mùa đó thế nào."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Trả lời thẳng - There are...)",
                text: "In my city, there are two main seasons: dry and rainy."
              },
              {
                label: "E (Ví dụ thời tiết 2 mùa - For example)",
                text: "For example, it is very sunny in the dry months, and it rains a lot in the rainy months."
              },
              {
                label: "Kết quả thực tế",
                text: "Wet streets make riding hard."
              }
            ],
            modelAnswer:
              "In my city, there are <strong>two main seasons</strong>: dry and rainy. For example, it is very sunny in the <strong>dry months</strong>, and it <strong>rains a lot</strong> in the rainy months. Wet streets make riding hard.",
            vocab: [
              {
                word: "two main seasons",
                ipa: "/tuː meɪn ˈsiːznz/",
                pos: "n. phr.",
                meaning: "hai mùa chính",
                example: "In my city, there are <strong>two main seasons</strong>: dry and rainy."
              },
              {
                word: "dry months",
                ipa: "/draɪ mʌnθs/",
                pos: "n. phr.",
                meaning: "những tháng mùa khô",
                example: "It is very sunny in the <strong>dry months</strong>."
              },
              {
                word: "rains a lot",
                ipa: "/reɪnz ə lɒt/",
                pos: "v. phr.",
                meaning: "mưa rất nhiều",
                example: "It <strong>rains a lot</strong> in the rainy months."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu linh hoạt - It depends on the region)",
                text: "Tùy vùng miền (honestly), nhưng ở miền Nam nơi mình sống có 2 mùa chính."
              },
              {
                label: "E (Ví dụ miêu tả - For example)",
                text: "Mùa khô thì nóng và oi bức (hot and humid), còn mùa mưa có mưa lớn."
              },
              {
                label: "Kết quả thực tế",
                text: "Việc đi lại trên đường (traveling on the roads) khá bất tiện (inconvenient)."
              }
            ],
            modelAnswer:
              "It <strong>depends on the region</strong>, honestly. In southern Vietnam where I live, there are two main seasons: dry and rainy. For example, dry days feel <strong>hot and humid</strong>, while heavy rain makes <strong>traveling on the roads</strong> quite <strong>inconvenient</strong>.",
            vocab: [
              {
                word: "depends on the region",
                ipa: "/dɪˈpendz ɒn ðə ˈriːdʒən/",
                pos: "v. phr.",
                meaning: "tùy thuộc vào từng vùng",
                example: "It <strong>depends on the region</strong>, honestly."
              },
              {
                word: "hot and humid",
                ipa: "/hɒt ænd ˈhjuːmɪd/",
                pos: "adj. phr.",
                meaning: "nóng và ẩm/oi bức",
                example: "Dry days often feel <strong>hot and humid</strong>."
              },
              {
                word: "traveling on the roads",
                ipa: "/ˈtrævəlɪŋ ɒn ðə roʊdz/",
                pos: "n. phr.",
                meaning: "việc đi lại trên đường",
                example: "Heavy rain makes <strong>traveling on the roads</strong> difficult."
              },
              {
                word: "inconvenient",
                ipa: "/ˌɪnkənˈviːniənt/",
                pos: "adj.",
                meaning: "bất tiện",
                example: "Wet streets are quite <strong>inconvenient</strong> for riders."
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
          questionType: "Câu hỏi sở thích mùa yêu thích (Dạng 1: 'What is your favorite...'). Áp dụng mẫu 'My favorite season is...' (B1) / 'Honestly, my go-to season is...' (B2) + A-R-E.",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~33–37 từ)."
        },
        pitfalls: [
          "Quên đưa ví dụ cụ thể mình thường làm gì vào mùa đó.",
          "Quên dùng mạo từ 'a' trong cụm 'go for a walk'.",
          "Lặp lại từ 'very good, very nice' thay vì nói cảm xúc cụ thể hơn."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Mùa yêu thích + Lý do)",
                text: "My favorite season is the dry season because the sky is bright and clean."
              },
              {
                label: "E (Ví dụ hoạt động - For example)",
                text: "For example, I can easily go for a walk in the park with friends."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "It makes me feel happy."
              }
            ],
            modelAnswer:
              "My <strong>favorite season</strong> is the dry season because the sky is bright and clean. For example, I can easily <strong>go for a walk</strong> in the park with friends. It makes me <strong>feel happy</strong>.",
            vocab: [
              {
                word: "favorite season",
                ipa: "/ˈfeɪvərɪt ˈsiːzn/",
                pos: "n. phr.",
                meaning: "mùa yêu thích nhất",
                example: "My <strong>favorite season</strong> is the dry season."
              },
              {
                word: "go for a walk",
                ipa: "/ɡoʊ fɔːr ə wɔːk/",
                pos: "v. phr.",
                meaning: "đi dạo bộ",
                example: "I can easily <strong>go for a walk</strong> in the park."
              },
              {
                word: "feel happy",
                ipa: "/fiːl ˈhæpi/",
                pos: "v. phr.",
                meaning: "cảm thấy vui vẻ",
                example: "Walking with friends makes me <strong>feel happy</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 1 - Honestly, my go-to...)",
                text: "Honestly, my go-to season is the dry season because the air is very pleasant."
              },
              {
                label: "E (Ví dụ - For example)",
                text: "Tụ tập bạn bè (hang out with my friends) ngoài trời mà không lo mưa."
              },
              {
                label: "Cảm xúc (calm and recharged)",
                text: "Chốt cảm giác thư thái, nạp năng lượng."
              }
            ],
            modelAnswer:
              "<strong>Honestly, my go-to</strong> season is the dry season because the air is very <strong>pleasant</strong>. For example, I can <strong>hang out with my friends</strong> outdoors without worrying about rain. It leaves me feeling <strong>calm and recharged</strong>.",
            vocab: [
              {
                word: "pleasant",
                ipa: "/ˈpleznt/",
                pos: "adj.",
                meaning: "dễ chịu, ôn hòa",
                example: "The air in the dry season is very <strong>pleasant</strong>."
              },
              {
                word: "hang out with my friends",
                ipa: "/hæŋ aʊt wɪð maɪ frendz/",
                pos: "v. phr.",
                meaning: "đi chơi cùng bạn bè",
                example: "I can <strong>hang out with my friends</strong> outdoors."
              },
              {
                word: "calm and recharged",
                ipa: "/kɑːm ænd ˌriːˈtʃɑːrdʒd/",
                pos: "adj. phr.",
                meaning: "bình yên và tràn đầy năng lượng",
                example: "It leaves me feeling <strong>calm and recharged</strong>."
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
          questionType: "Câu hỏi gợi ý thời điểm du lịch ('What is the best season to visit...'). Áp dụng A-R-E (Answer + Reason → Example → Feeling/Result).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~34–38 từ), nêu lý do ít mưa và ví dụ hoạt động của du khách."
        },
        pitfalls: [
          "Dùng nhầm 'fewer rain' thay vì đúng lượng từ 'less rain' (vì rain không đếm được).",
          "Quên nhắc tới trải nghiệm của du khách ('visitors', 'tourists').",
          "Dùng 'in the beach' thay vì 'on the beach' hoặc 'go to the beach'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Mùa đẹp nhất + Lý do)",
                text: "The dry season is the best time because it is sunny and there is less rain."
              },
              {
                label: "E (Ví dụ cho du khách - For example)",
                text: "For example, visitors can go to the beach and eat street food."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "Every trip feels easy and fun."
              }
            ],
            modelAnswer:
              "<strong>The dry season</strong> is the best time because it is sunny and there is <strong>less rain</strong>. For example, visitors can <strong>go to the beach</strong> and eat street food. Every trip feels easy and fun.",
            vocab: [
              {
                word: "less rain",
                ipa: "/les reɪn/",
                pos: "n. phr.",
                meaning: "ít mưa hơn",
                example: "It is sunny and there is <strong>less rain</strong>."
              },
              {
                word: "go to the beach",
                ipa: "/ɡoʊ tuː ðə biːtʃ/",
                pos: "v. phr.",
                meaning: "đi biển",
                example: "Visitors can <strong>go to the beach</strong> and swim."
              },
              {
                word: "street food",
                ipa: "/striːt fuːd/",
                pos: "n. phr.",
                meaning: "ẩm thực đường phố",
                example: "They can eat delicious <strong>street food</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - I'd say)",
                text: "I'd say the best time is the dry season because the weather is warm and pleasant."
              },
              {
                label: "E (Ví dụ + Mệnh đề quan hệ where)",
                text: "Tham gia hoạt động ngoài trời (outdoor activities) hoặc ghé chợ ăn hải sản (seafood)."
              },
              {
                label: "Kết quả (sudden showers)",
                text: "Không có những cơn mưa rào bất chợt nên việc ngắm cảnh rất thư giãn."
              }
            ],
            modelAnswer:
              "<strong>I'd say</strong> the best time is the dry season because the weather is warm and <strong>pleasant</strong>. For example, tourists can enjoy <strong>outdoor activities</strong> or visit markets where they can try fresh <strong>seafood</strong>. Without <strong>sudden showers</strong>, sightseeing feels relaxing.",
            vocab: [
              {
                word: "outdoor activities",
                ipa: "/ˈaʊtdɔːr ækˈtɪvətiz/",
                pos: "n. phr.",
                meaning: "các hoạt động ngoài trời",
                example: "Tourists can enjoy <strong>outdoor activities</strong> all day."
              },
              {
                word: "seafood",
                ipa: "/ˈsiːfuːd/",
                pos: "n.",
                meaning: "hải sản",
                example: "They visit markets where they can try fresh <strong>seafood</strong>."
              },
              {
                word: "sudden showers",
                ipa: "/ˈsʌdn ˈʃaʊərz/",
                pos: "n. phr.",
                meaning: "những cơn mưa rào bất chợt",
                example: "Without <strong>sudden showers</strong>, sightseeing feels relaxing."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 05: WEATHER
  // ==========================================================================
  {
    id: "topic-weather",
    number: "05",
    title: "Weather",
    titleVi: "Thời tiết & Ảnh hưởng đến tâm trạng, sinh hoạt",
    description:
      "Luyện 3 câu hỏi về thời tiết ở quê hương, kiểu thời tiết bạn thích nhất và tác động của thời tiết tới tâm trạng cũng như sinh hoạt hằng ngày.",
    questionsCount: 3,
    questions: [
      {
        id: "weather_q1",
        num: 1,
        prompt: "What is the weather like in your hometown?",
        analysis: {
          questionType: "Câu hỏi mô tả thời tiết ('What is the weather like...'). Áp dụng công thức A-R-E (Answer → Example → Feeling).",
          tense: "Hiện tại đơn ('The weather in my hometown is...' / 'Well, the weather...').",
          length: "3 câu ngắn gọn (~33–39 từ), dùng các tính từ thời tiết quen thuộc."
        },
        pitfalls: [
          "Dùng nhầm động từ 'like' trong 'What is the weather like?' thành 'The weather is like hot' (đúng: 'The weather is hot').",
          "Quên chủ ngữ 'it' khi miêu tả trời nóng/mưa (sai: 'Is sunny'; đúng: 'It is sunny').",
          "Không nối thêm chi tiết ví dụ giữa ban ngày và buổi tối hoặc giữa các mùa."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Trả lời thẳng đặc trưng thời tiết)",
                text: "The weather in my hometown is usually hot and sunny."
              },
              {
                label: "E (Ví dụ sáng/trưa và tối - For example)",
                text: "For example, it is very warm at noon, and it gets cooler in the evening."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "The cool air at night makes me feel good."
              }
            ],
            modelAnswer:
              "The weather in my hometown is usually <strong>hot and sunny</strong>. For example, it is very warm at noon, and it gets <strong>cooler in the evening</strong>. The cool air at night makes me <strong>feel good</strong>.",
            vocab: [
              {
                word: "hot and sunny",
                ipa: "/hɒt ænd ˈsʌni/",
                pos: "adj. phr.",
                meaning: "nóng và nhiều nắng",
                example: "The weather in my hometown is usually <strong>hot and sunny</strong>."
              },
              {
                word: "cooler in the evening",
                ipa: "/ˈkuːlər ɪn ði ˈiːvnɪŋ/",
                pos: "phr.",
                meaning: "mát mẻ hơn vào buổi tối",
                example: "It is warm at noon, and it gets <strong>cooler in the evening</strong>."
              },
              {
                word: "feel good",
                ipa: "/fiːl ɡʊd/",
                pos: "v. phr.",
                meaning: "cảm thấy dễ chịu, thoải mái",
                example: "The cool air at night makes me <strong>feel good</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu tự nhiên - Well)",
                text: "Well, the weather in my hometown is mostly hot and humid all year round."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Buổi chiều nhiều nắng và có mưa rào bất chợt (sudden showers) vào mùa mưa."
              },
              {
                label: "Cảm xúc (Mệnh đề when + cool and pleasant)",
                text: "Yêu thích buổi tối khi không khí mát mẻ và dễ chịu."
              }
            ],
            modelAnswer:
              "<strong>Well</strong>, the weather in my hometown is mostly <strong>hot and humid</strong> all year round. For example, afternoons are quite sunny, and we often get <strong>sudden showers</strong> in the rainy months. I love evenings when the air feels <strong>cool and pleasant</strong>.",
            vocab: [
              {
                word: "hot and humid",
                ipa: "/hɒt ænd ˈhjuːmɪd/",
                pos: "adj. phr.",
                meaning: "nóng và ẩm",
                example: "The weather in my hometown is mostly <strong>hot and humid</strong>."
              },
              {
                word: "sudden showers",
                ipa: "/ˈsʌdn ˈʃaʊərz/",
                pos: "n. phr.",
                meaning: "những cơn mưa rào bất chợt",
                example: "We often get <strong>sudden showers</strong> in the rainy months."
              },
              {
                word: "cool and pleasant",
                ipa: "/kuːl ænd ˈpleznt/",
                pos: "adj. phr.",
                meaning: "mát mẻ và dễ chịu",
                example: "Evenings feel really <strong>cool and pleasant</strong>."
              }
            ]
          }
        }
      },
      {
        id: "weather_q2",
        num: 2,
        prompt: "What kind of weather do you like most? Why?",
        analysis: {
          questionType: "Câu hỏi sở thích kèm lý do (Dạng 3: 'What kind of... Why?'). Áp dụng 'I like... because...' (B1) hoặc 'Honestly, I usually go for...' (B2) + A-R-E.",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~34–38 từ), trả lời thẳng kiểu thời tiết, lý do, ví dụ và cảm xúc."
        },
        pitfalls: [
          "Quên trả lời phần 'Why?' ngay trong câu đầu bằng 'because...'.",
          "Lặp lại nhiều lần từ 'very good' hoặc 'very nice'.",
          "Quên giới từ hoặc mạo từ trong cụm 'in the park', 'at outdoor cafes'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Thời tiết thích nhất + Lý do)",
                text: "I like cool and sunny weather the most because it is easy to go outside."
              },
              {
                label: "E (Ví dụ hoạt động - For example)",
                text: "For example, I can walk in the park or drink coffee with my friends."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "It always makes me feel very happy."
              }
            ],
            modelAnswer:
              "I like <strong>cool and sunny weather</strong> the most because it is easy to <strong>go outside</strong>. For example, I can walk in the park or drink coffee with my friends. It always makes me <strong>feel very happy</strong>.",
            vocab: [
              {
                word: "cool and sunny weather",
                ipa: "/kuːl ænd ˈsʌni ˈweðər/",
                pos: "n. phr.",
                meaning: "thời tiết mát mẻ và có nắng",
                example: "I like <strong>cool and sunny weather</strong> the most."
              },
              {
                word: "go outside",
                ipa: "/ɡoʊ ˈaʊtsaɪd/",
                pos: "v. phr.",
                meaning: "đi ra ngoài trời",
                example: "It is very easy to <strong>go outside</strong> when the sky is cool."
              },
              {
                word: "feel very happy",
                ipa: "/fiːl ˈveri ˈhæpi/",
                pos: "v. phr.",
                meaning: "cảm thấy rất vui vẻ",
                example: "Nice weather always makes me <strong>feel very happy</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 3 - Honestly, I usually go for...)",
                text: "Chọn thời tiết mát mẻ vì rất hợp với các hoạt động ngoài trời (outdoor activities)."
              },
              {
                label: "E (Ví dụ - For example)",
                text: "Tụ tập với bạn bè (hang out with my friends) ở quán cà phê ngoài trời mà không thấy mệt."
              },
              {
                label: "Cảm xúc (feel at ease + unwind)",
                text: "Cảm thấy nhẹ nhõm, thoải mái và dễ thư giãn."
              }
            ],
            modelAnswer:
              "<strong>Honestly, I usually go for</strong> cool weather because it is perfect for <strong>outdoor activities</strong>. For example, I often <strong>hang out with my friends</strong> at outdoor cafes without feeling tired. It always makes me <strong>feel at ease</strong> and helps me <strong>unwind</strong>.",
            vocab: [
              {
                word: "outdoor activities",
                ipa: "/ˈaʊtdɔːr ækˈtɪvətiz/",
                pos: "n. phr.",
                meaning: "các hoạt động ngoài trời",
                example: "Cool weather is perfect for <strong>outdoor activities</strong>."
              },
              {
                word: "hang out with my friends",
                ipa: "/hæŋ aʊt wɪð maɪ frendz/",
                pos: "v. phr.",
                meaning: "đi chơi, tụ tập cùng bạn bè",
                example: "I often <strong>hang out with my friends</strong> at outdoor cafes."
              },
              {
                word: "feel at ease",
                ipa: "/fiːl æt iːz/",
                pos: "v. phr.",
                meaning: "cảm thấy thoải mái, dễ chịu",
                example: "It always makes me <strong>feel at ease</strong> and helps me unwind."
              }
            ]
          }
        }
      },
      {
        id: "weather_q3",
        num: 3,
        prompt: "Does the weather affect your mood or your daily activities?",
        analysis: {
          questionType: "Câu hỏi Yes/No về sự ảnh hưởng ('Does the weather affect...'). Áp dụng A-R-E (Yes → Contrast Example → Feeling/Result).",
          tense: "Hiện tại đơn. Chú ý chia '-s' ở động từ 'affects' khi chủ ngữ là 'the weather'.",
          length: "3 câu ngắn gọn (~33–38 từ), nêu rõ ảnh hưởng ở cả tâm trạng và hoạt động."
        },
        pitfalls: [
          "Quên thêm '-s' sau chủ ngữ số ít 'the weather' (đúng: 'the weather affects my mood').",
          "Dùng nhầm giới từ 'on sunny days' / 'on rainy days' (không dùng 'in sunny days').",
          "Chỉ trả lời 'Yes, it does' mà không nói rõ nắng thì làm gì, mưa thì làm gì."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Trả lời thẳng mức độ ảnh hưởng)",
                text: "Yes, it does. The weather affects my mood a lot."
              },
              {
                label: "E (Ví dụ so sánh ngày nắng - ngày mưa)",
                text: "For example, on sunny days I go out with friends, but on rainy days I just stay home."
              },
              {
                label: "Cảm xúc (Chốt câu)",
                text: "Sunny weather makes me feel happy."
              }
            ],
            modelAnswer:
              "Yes, it does. The weather <strong>affects my mood</strong> a lot. For example, on <strong>sunny days</strong> I go out with friends, but on rainy days I just <strong>stay home</strong>. Sunny weather makes me feel happy.",
            vocab: [
              {
                word: "affect my mood",
                ipa: "/əˈfekt maɪ muːd/",
                pos: "v. phr.",
                meaning: "ảnh hưởng đến tâm trạng của tôi",
                example: "The weather <strong>affects my mood</strong> and plans a lot."
              },
              {
                word: "sunny days",
                ipa: "/ˈsʌni deɪz/",
                pos: "n. phr.",
                meaning: "những ngày nắng đẹp",
                example: "On <strong>sunny days</strong>, I go out with my friends."
              },
              {
                word: "stay home",
                ipa: "/steɪ hoʊm/",
                pos: "v. phr.",
                meaning: "ở nhà",
                example: "On rainy days, I just <strong>stay home</strong> and rest."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu khẳng định - Definitely)",
                text: "Definitely, the weather affects both my mood and my daily plans."
              },
              {
                label: "E (Ví dụ đối lập: cheers me up vs inconvenient)",
                text: "Ngày nắng đẹp làm phấn chấn lên (cheers me up), còn mưa lớn làm việc đi lại bất tiện (inconvenient)."
              },
              {
                label: "Kết quả / Cảm xúc (clear my mind)",
                text: "Thời tiết đẹp giúp đầu óc minh mẫn và làm việc tốt hơn."
              }
            ],
            modelAnswer:
              "<strong>Definitely</strong>, the weather affects both my mood and my daily plans. For example, a bright sunny day always <strong>cheers me up</strong>, while heavy rain makes going out quite <strong>inconvenient</strong>. Nice weather really helps me <strong>clear my mind</strong> and work better.",
            vocab: [
              {
                word: "cheers me up",
                ipa: "/tʃɪrz miː ʌp/",
                pos: "phr. v.",
                meaning: "làm tôi vui vẻ, phấn chấn hơn",
                example: "A bright sunny day always <strong>cheers me up</strong>."
              },
              {
                word: "inconvenient",
                ipa: "/ˌɪnkənˈviːniənt/",
                pos: "adj.",
                meaning: "bất tiện, gây trở ngại",
                example: "Heavy rain makes going out quite <strong>inconvenient</strong>."
              },
              {
                word: "clear my mind",
                ipa: "/klɪər maɪ maɪnd/",
                pos: "v. phr.",
                meaning: "giúp đầu óc nhẹ nhõm, tỉnh táo",
                example: "Nice weather helps me <strong>clear my mind</strong> and focus better."
              }
            ]
          }
        }
      }
    ]
  }
];
