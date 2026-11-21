// ==========================================================================
// SPEAKING PART 1 — 5 STANDALONE TOPICS (TRAVELLING, TRIPS, TRAVEL PLANS, SEASONS, WEATHER)
// Áp dụng công thức A-R-E (Answer + Reason -> Example -> Feeling/Result)
// Thiết kế ngắn gọn, dễ đọc cho học sinh yếu (B1: ~29–36 từ | B2: ~34–40 từ)
// Mục V: 8 từ/cụm từ mở rộng có đầy đủ IPA & ví dụ cho mỗi Level
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
              },
              {
                word: "travel alone",
                ipa: "/ˈtrævl əˈloʊn/",
                pos: "v. phr.",
                meaning: "đi du lịch một mình",
                example: "Some people like to <strong>travel alone</strong> to be free."
              },
              {
                word: "travel with family",
                ipa: "/ˈtrævl wɪð ˈfæməli/",
                pos: "v. phr.",
                meaning: "đi du lịch cùng gia đình",
                example: "I also enjoy <strong>traveling with family</strong> on holidays."
              },
              {
                word: "save money",
                ipa: "/seɪv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm tiền",
                example: "Going in a group helps us <strong>save money</strong> on hotels."
              },
              {
                word: "share good memories",
                ipa: "/ʃer ɡʊd ˈmeməriz/",
                pos: "v. phr.",
                meaning: "chia sẻ những kỷ niệm đẹp",
                example: "Traveling together helps us <strong>share good memories</strong>."
              },
              {
                word: "talk together",
                ipa: "/tɔːk təˈɡeðər/",
                pos: "v. phr.",
                meaning: "trò chuyện cùng nhau",
                example: "During a trip, we can <strong>talk together</strong> all night."
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
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "I love traveling with <strong>close friends</strong> who share my hobbies."
              },
              {
                word: "traveling solo",
                ipa: "/ˈtrævəlɪŋ ˈsoʊloʊ/",
                pos: "n. phr.",
                meaning: "việc đi du lịch một mình",
                example: "<strong>Traveling solo</strong> gives me freedom, but it can feel lonely."
              },
              {
                word: "companionship",
                ipa: "/kəmˈpænjənʃɪp/",
                pos: "n.",
                meaning: "sự đồng hành, bầu bạn",
                example: "Good <strong>companionship</strong> makes a long trip much nicer."
              },
              {
                word: "share expenses",
                ipa: "/ʃer ɪkˈspensɪz/",
                pos: "v. phr.",
                meaning: "chia sẻ chi phí chuyến đi",
                example: "Friends can <strong>share expenses</strong> for rooms and taxis."
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
              },
              {
                word: "book a room",
                ipa: "/bʊk ə ruːm/",
                pos: "v. phr.",
                meaning: "đặt phòng trước",
                example: "I always <strong>book a room</strong> before I leave."
              },
              {
                word: "bring money",
                ipa: "/brɪŋ ˈmʌni/",
                pos: "v. phr.",
                meaning: "mang theo tiền",
                example: "I always <strong>bring money</strong> for food and tickets."
              },
              {
                word: "walking shoes",
                ipa: "/ˈwɔːkɪŋ ʃuːz/",
                pos: "n. phr.",
                meaning: "giày đi bộ thoải mái",
                example: "I pack a pair of <strong>walking shoes</strong> for long walks."
              },
              {
                word: "bottle of water",
                ipa: "/ˈbɒtl əv ˈwɔːtər/",
                pos: "n. phr.",
                meaning: "chai nước uống",
                example: "I put a <strong>bottle of water</strong> in my small bag."
              },
              {
                word: "feel ready",
                ipa: "/fiːl ˈredi/",
                pos: "v. phr.",
                meaning: "cảm thấy sẵn sàng",
                example: "Packing early helps me <strong>feel ready</strong>."
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
              },
              {
                word: "short checklist",
                ipa: "/ʃɔːrt ˈtʃeklɪst/",
                pos: "n. phr.",
                meaning: "danh sách kiểm tra đồ ngắn gọn",
                example: "I always make a <strong>short checklist</strong> before packing."
              },
              {
                word: "essential items",
                ipa: "/ɪˈsenʃl ˈaɪtəmz/",
                pos: "n. phr.",
                meaning: "các vật dụng thiết yếu",
                example: "I put my <strong>essential items</strong> inside a small pouch."
              },
              {
                word: "basic medicine",
                ipa: "/ˈbeɪsɪk ˈmedɪsn/",
                pos: "n. phr.",
                meaning: "thuốc men cơ bản",
                example: "I carry <strong>basic medicine</strong> for headaches or colds."
              },
              {
                word: "portable charger",
                ipa: "/ˈpɔːrtəbl ˈtʃɑːrdʒər/",
                pos: "n. phr.",
                meaning: "sạc dự phòng cầm tay",
                example: "A <strong>portable charger</strong> is useful for taking lots of photos."
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
              },
              {
                word: "the rainy season",
                ipa: "/ðə ˈreɪni ˈsiːzn/",
                pos: "n. phr.",
                meaning: "mùa mưa",
                example: "It is hard to travel outside in <strong>the rainy season</strong>."
              },
              {
                word: "clear sky",
                ipa: "/klɪər skaɪ/",
                pos: "n. phr.",
                meaning: "bầu trời quang đãng",
                example: "There is a <strong>clear sky</strong> almost every morning."
              },
              {
                word: "go sightseeing",
                ipa: "/ɡoʊ ˈsaɪtsiːɪŋ/",
                pos: "v. phr.",
                meaning: "đi ngắm cảnh",
                example: "Tourists can <strong>go sightseeing</strong> around the town."
              },
              {
                word: "friendly people",
                ipa: "/ˈfrendli ˈpiːpl/",
                pos: "n. phr.",
                meaning: "người dân thân thiện",
                example: "Visitors also meet many <strong>friendly people</strong> here."
              },
              {
                word: "take a boat trip",
                ipa: "/teɪk ə boʊt trɪp/",
                pos: "v. phr.",
                meaning: "đi thuyền tham quan",
                example: "Guests can <strong>take a boat trip</strong> on the river."
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
              },
              {
                word: "ideal time",
                ipa: "/aɪˈdiːəl taɪm/",
                pos: "n. phr.",
                meaning: "thời điểm lý tưởng",
                example: "Spring is an <strong>ideal time</strong> to visit my hometown."
              },
              {
                word: "local dishes",
                ipa: "/ˈloʊkl ˈdɪʃɪz/",
                pos: "n. phr.",
                meaning: "các món ăn đặc sản địa phương",
                example: "Visitors always enjoy fresh <strong>local dishes</strong> here."
              },
              {
                word: "sudden showers",
                ipa: "/ˈsʌdn ˈʃaʊərz/",
                pos: "n. phr.",
                meaning: "những cơn mưa rào bất chợt",
                example: "There are very few <strong>sudden showers</strong> in winter."
              },
              {
                word: "explore the city",
                ipa: "/ɪkˈsplɔːr ðə ˈsɪti/",
                pos: "v. phr.",
                meaning: "khám phá thành phố",
                example: "Tourists can easily <strong>explore the city</strong> on foot."
              },
              {
                word: "outdoor markets",
                ipa: "/ˈaʊtdɔːr ˈmɑːrkɪts/",
                pos: "n. phr.",
                meaning: "các khu chợ ngoài trời",
                example: "Many <strong>outdoor markets</strong> stay lively at night."
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
              },
              {
                word: "visit new places",
                ipa: "/ˈvɪzɪt nuː ˈpleɪsɪz/",
                pos: "v. phr.",
                meaning: "thăm những địa điểm mới",
                example: "I love to <strong>visit new places</strong> on holidays."
              },
              {
                word: "try local food",
                ipa: "/traɪ ˈloʊkl fuːd/",
                pos: "v. phr.",
                meaning: "thử đồ ăn địa phương",
                example: "I always <strong>try local food</strong> when I travel."
              },
              {
                word: "spend time with family",
                ipa: "/spend taɪm wɪð ˈfæməli/",
                pos: "v. phr.",
                meaning: "dành thời gian cho gia đình",
                example: "Trips let me <strong>spend time with family</strong>."
              },
              {
                word: "forget about school",
                ipa: "/fərˈɡet əˈbaʊt skuːl/",
                pos: "v. phr.",
                meaning: "quên đi áp lực bài vở",
                example: "Going out helps me <strong>forget about school</strong> for a day."
              },
              {
                word: "have a good time",
                ipa: "/hæv ə ɡʊd taɪm/",
                pos: "v. phr.",
                meaning: "có khoảng thời gian vui vẻ",
                example: "We always <strong>have a good time</strong> together."
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
              },
              {
                word: "take a break",
                ipa: "/teɪk ə breɪk/",
                pos: "v. phr.",
                meaning: "nghỉ xả hơi một chút",
                example: "Going away helps me <strong>take a break</strong> from work."
              },
              {
                word: "short weekend trip",
                ipa: "/ʃɔːrt ˈwiːkend trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi ngắn ngày cuối tuần",
                example: "I enjoy a <strong>short weekend trip</strong> near the sea."
              },
              {
                word: "recharge my battery",
                ipa: "/ˌriːˈtʃɑːrdʒ maɪ ˈbætəri/",
                pos: "v. phr.",
                meaning: "nạp lại năng lượng",
                example: "Traveling helps me <strong>recharge my battery</strong> quickly."
              },
              {
                word: "fresh atmosphere",
                ipa: "/freʃ ˈætməsfɪr/",
                pos: "n. phr.",
                meaning: "bầu không khí trong lành, mới mẻ",
                example: "I love the <strong>fresh atmosphere</strong> of coastal towns."
              },
              {
                word: "broaden my horizons",
                ipa: "/ˈbrɔːdn maɪ həˈraɪznz/",
                pos: "v. phr.",
                meaning: "mở mang tầm mắt",
                example: "Visiting new cities helps <strong>broaden my horizons</strong>."
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
              },
              {
                word: "next holiday",
                ipa: "/nekst ˈhɒlədeɪ/",
                pos: "n. phr.",
                meaning: "kỳ nghỉ tiếp theo",
                example: "I will travel during my <strong>next holiday</strong>."
              },
              {
                word: "save enough money",
                ipa: "/seɪv ɪˈnʌf ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm đủ tiền",
                example: "I need to <strong>save enough money</strong> for my trip."
              },
              {
                word: "go with friends",
                ipa: "/ɡoʊ wɪð frendz/",
                pos: "v. phr.",
                meaning: "đi cùng bạn bè",
                example: "I want to <strong>go with friends</strong> after exams."
              },
              {
                word: "stay for two days",
                ipa: "/steɪ fɔːr tuː deɪz/",
                pos: "v. phr.",
                meaning: "ở lại hai ngày",
                example: "We plan to <strong>stay for two days</strong> in a hotel."
              },
              {
                word: "book bus tickets",
                ipa: "/bʊk bʌs ˈtɪkɪts/",
                pos: "v. phr.",
                meaning: "đặt vé xe khách",
                example: "Later, I will <strong>book bus tickets</strong> online."
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
              },
              {
                word: "tight deadlines",
                ipa: "/taɪt ˈdedlaɪnz/",
                pos: "n. phr.",
                meaning: "những hạn chót công việc gấp",
                example: "I have <strong>tight deadlines</strong> at work this month."
              },
              {
                word: "coastal city",
                ipa: "/ˈkoʊstl ˈsɪti/",
                pos: "n. phr.",
                meaning: "thành phố biển",
                example: "Da Nang is a clean and lively <strong>coastal city</strong>."
              },
              {
                word: "take a short getaway",
                ipa: "/teɪk ə ʃɔːrt ˈɡetəweɪ/",
                pos: "v. phr.",
                meaning: "làm chuyến đi nghỉ ngắn ngày",
                example: "I want to <strong>take a short getaway</strong> next month."
              },
              {
                word: "as soon as",
                ipa: "/æz suːn æz/",
                pos: "conj.",
                meaning: "ngay sau khi",
                example: "I will travel <strong>as soon as</strong> my exams finish."
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
              },
              {
                word: "beach trip",
                ipa: "/biːtʃ trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi biển",
                example: "A <strong>beach trip</strong> is great in hot weather."
              },
              {
                word: "mountain trip",
                ipa: "/ˈmaʊntɪn trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi lên núi",
                example: "I also like a <strong>mountain trip</strong> for cool air."
              },
              {
                word: "food tour",
                ipa: "/fuːd tʊr/",
                pos: "n. phr.",
                meaning: "chuyến đi khám phá ẩm thực",
                example: "My friends love doing a local <strong>food tour</strong>."
              },
              {
                word: "family trip",
                ipa: "/ˈfæməli trɪp/",
                pos: "n. phr.",
                meaning: "chuyến du lịch gia đình",
                example: "We go on a <strong>family trip</strong> once a year."
              },
              {
                word: "cheap and easy",
                ipa: "/tʃiːp ænd ˈiːzi/",
                pos: "adj. phr.",
                meaning: "rẻ và dễ chuẩn bị",
                example: "Going near home is <strong>cheap and easy</strong>."
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
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "giá cả phải chăng",
                example: "Weekend getaways are very <strong>affordable</strong> for students."
              },
              {
                word: "day trip",
                ipa: "/deɪ trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi trong ngày",
                example: "Sometimes a <strong>day trip</strong> is enough to relax."
              },
              {
                word: "cultural trip",
                ipa: "/ˈkʌltʃərəl trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi tìm hiểu văn hóa",
                example: "Visiting old museums makes a nice <strong>cultural trip</strong>."
              },
              {
                word: "get back to nature",
                ipa: "/ɡet bæk tuː ˈneɪtʃər/",
                pos: "v. phr.",
                meaning: "hòa mình về với thiên nhiên",
                example: "I go camping to <strong>get back to nature</strong>."
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
              },
              {
                word: "next month",
                ipa: "/nekst mʌnθ/",
                pos: "n. phr.",
                meaning: "tháng tới",
                example: "I am quite busy <strong>next month</strong>."
              },
              {
                word: "not sure yet",
                ipa: "/nɒt ʃʊr jet/",
                pos: "phr.",
                meaning: "vẫn chưa chắc chắn",
                example: "I am <strong>not sure yet</strong> about my weekend plan."
              },
              {
                word: "have free time",
                ipa: "/hæv friː taɪm/",
                pos: "v. phr.",
                meaning: "có thời gian rảnh",
                example: "When I <strong>have free time</strong>, I will visit Vung Tau."
              },
              {
                word: "busy with work",
                ipa: "/ˈbɪzi wɪð wɜːrk/",
                pos: "adj. phr.",
                meaning: "bận rộn với công việc",
                example: "My parents are very <strong>busy with work</strong>."
              },
              {
                word: "travel by bus",
                ipa: "/ˈtrævl baɪ bʌs/",
                pos: "v. phr.",
                meaning: "đi du lịch bằng xe buýt/xe khách",
                example: "If I go, I will <strong>travel by bus</strong>."
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
              },
              {
                word: "finish a project",
                ipa: "/ˈfɪnɪʃ ə ˈprɒdʒekt/",
                pos: "v. phr.",
                meaning: "hoàn thành một dự án",
                example: "I have to <strong>finish a project</strong> before going away."
              },
              {
                word: "spontaneous trip",
                ipa: "/spɒnˈteɪniəs trɪp/",
                pos: "n. phr.",
                meaning: "chuyến đi ngẫu hứng không hẹn trước",
                example: "I might take a <strong>spontaneous trip</strong> if I have time."
              },
              {
                word: "check my schedule",
                ipa: "/tʃek maɪ ˈskedʒuːl/",
                pos: "v. phr.",
                meaning: "kiểm tra lại lịch trình",
                example: "I need to <strong>check my schedule</strong> first."
              },
              {
                word: "take a few days off",
                ipa: "/teɪk ə fjuː deɪz ɒf/",
                pos: "v. phr.",
                meaning: "xin nghỉ vài ngày",
                example: "Next month I hope to <strong>take a few days off</strong>."
              },
              {
                word: "look forward to",
                ipa: "/lʊk ˈfɔːrwərd tuː/",
                pos: "phr. v.",
                meaning: "mong chờ (+ V-ing)",
                example: "I really <strong>look forward to</strong> visiting Da Lat."
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
              },
              {
                word: "fresh air",
                ipa: "/freʃ er/",
                pos: "n. phr.",
                meaning: "không khí trong lành",
                example: "I love the <strong>fresh air</strong> in the mountains."
              },
              {
                word: "flower gardens",
                ipa: "/ˈflaʊər ˈɡɑːrdnz/",
                pos: "n. phr.",
                meaning: "những vườn hoa",
                example: "Tourists take many photos in <strong>flower gardens</strong>."
              },
              {
                word: "beautiful beaches",
                ipa: "/ˈbjuːtɪfl ˈbiːtʃɪz/",
                pos: "n. phr.",
                meaning: "những bãi biển đẹp",
                example: "Phu Quoc has very <strong>beautiful beaches</strong>."
              },
              {
                word: "clean streets",
                ipa: "/kliːn striːts/",
                pos: "n. phr.",
                meaning: "những con đường sạch đẹp",
                example: "That city is famous for its <strong>clean streets</strong>."
              },
              {
                word: "tasty food",
                ipa: "/ˈteɪsti fuːd/",
                pos: "n. phr.",
                meaning: "đồ ăn ngon",
                example: "I also want to enjoy <strong>tasty food</strong> at night."
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
              },
              {
                word: "get away from",
                ipa: "/ɡet əˈweɪ frɒm/",
                pos: "phr. v.",
                meaning: "tạm rời xa (ồn ào, khói bụi)",
                example: "I go there to <strong>get away from</strong> city noise."
              },
              {
                word: "cool climate",
                ipa: "/kuːl ˈklaɪmət/",
                pos: "n. phr.",
                meaning: "khí hậu mát mẻ",
                example: "Its <strong>cool climate</strong> is great all year round."
              },
              {
                word: "scenic views",
                ipa: "/ˈsiːnɪk vjuːz/",
                pos: "n. phr.",
                meaning: "phong cảnh hữu tình",
                example: "The hills offer amazing <strong>scenic views</strong>."
              },
              {
                word: "breathtaking scenery",
                ipa: "/ˈbreθteɪkɪŋ ˈsiːnəri/",
                pos: "n. phr.",
                meaning: "cảnh đẹp ngoạn mục",
                example: "Ha Long Bay has <strong>breathtaking scenery</strong>."
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
              },
              {
                word: "cash and bank card",
                ipa: "/kæʃ ænd bæŋk kɑːrd/",
                pos: "n. phr.",
                meaning: "tiền mặt và thẻ ngân hàng",
                example: "I carry both <strong>cash and a bank card</strong>."
              },
              {
                word: "bus ticket",
                ipa: "/bʌs ˈtɪkɪt/",
                pos: "n. phr.",
                meaning: "vé xe khách",
                example: "I check my <strong>bus ticket</strong> on my phone."
              },
              {
                word: "raincoat",
                ipa: "/ˈreɪnkoʊt/",
                pos: "n.",
                meaning: "áo mưa",
                example: "I bring a light <strong>raincoat</strong> in my backpack."
              },
              {
                word: "sunglasses",
                ipa: "/ˈsʌnɡlæsɪz/",
                pos: "n.",
                meaning: "kính râm",
                example: "Do not forget <strong>sunglasses</strong> on sunny trips."
              },
              {
                word: "small backpack",
                ipa: "/smɔːl ˈbækpæk/",
                pos: "n. phr.",
                meaning: "ba lô nhỏ gọn",
                example: "I put my things in a <strong>small backpack</strong>."
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
              },
              {
                word: "book accommodation",
                ipa: "/bʊk əˌkɒməˈdeɪʃn/",
                pos: "v. phr.",
                meaning: "đặt chỗ ở / khách sạn",
                example: "It is safer to <strong>book accommodation</strong> early."
              },
              {
                word: "travel itinerary",
                ipa: "/ˈtrævl aɪˈtɪnəreri/",
                pos: "n. phr.",
                meaning: "lịch trình chuyến đi",
                example: "I write down a simple <strong>travel itinerary</strong>."
              },
              {
                word: "pack light",
                ipa: "/pæk laɪt/",
                pos: "v. phr.",
                meaning: "đóng gói hành lý gọn nhẹ",
                example: "I prefer to <strong>pack light</strong> so moving is easier."
              },
              {
                word: "first-aid kit",
                ipa: "/fɜːrst eɪd kɪt/",
                pos: "n. phr.",
                meaning: "bộ dụng cụ sơ cứu nhỏ",
                example: "A small <strong>first-aid kit</strong> is useful for long trips."
              },
              {
                word: "check travel reviews",
                ipa: "/tʃek ˈtrævl rɪˈvjuːz/",
                pos: "v. phr.",
                meaning: "xem đánh giá du lịch",
                example: "I always <strong>check travel reviews</strong> before booking."
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
              },
              {
                word: "four seasons",
                ipa: "/fɔːr ˈsiːznz/",
                pos: "n. phr.",
                meaning: "bốn mùa (ở miền Bắc)",
                example: "Northern Vietnam has <strong>four seasons</strong> in a year."
              },
              {
                word: "spring",
                ipa: "/sprɪŋ/",
                pos: "n.",
                meaning: "mùa xuân",
                example: "Flowers bloom everywhere in <strong>spring</strong>."
              },
              {
                word: "summer",
                ipa: "/ˈsʌmər/",
                pos: "n.",
                meaning: "mùa hè",
                example: "<strong>Summer</strong> is quite hot and sunny."
              },
              {
                word: "autumn",
                ipa: "/ˈɔːtəm/",
                pos: "n.",
                meaning: "mùa thu",
                example: "<strong>Autumn</strong> feels cool and nice."
              },
              {
                word: "winter",
                ipa: "/ˈwɪntər/",
                pos: "n.",
                meaning: "mùa đông",
                example: "<strong>Winter</strong> is cold in the north."
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
              },
              {
                word: "tropical climate",
                ipa: "/ˈtrɒpɪkl ˈklaɪmət/",
                pos: "n. phr.",
                meaning: "khí hậu nhiệt đới",
                example: "My country has a warm <strong>tropical climate</strong>."
              },
              {
                word: "northern region",
                ipa: "/ˈnɔːrðərn ˈriːdʒən/",
                pos: "n. phr.",
                meaning: "khu vực miền Bắc",
                example: "The <strong>northern region</strong> experiences four distinct seasons."
              },
              {
                word: "heavy downpours",
                ipa: "/ˈhevi ˈdaʊnpɔːrz/",
                pos: "n. phr.",
                meaning: "những trận mưa như trút nước",
                example: "We often get <strong>heavy downpours</strong> in August."
              },
              {
                word: "mild temperature",
                ipa: "/maɪld ˈtemprətʃər/",
                pos: "n. phr.",
                meaning: "nhiệt độ ôn hòa, dễ chịu",
                example: "December brings a <strong>mild temperature</strong> at night."
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
              },
              {
                word: "cool breeze",
                ipa: "/kuːl briːz/",
                pos: "n. phr.",
                meaning: "làn gió mát",
                example: "I enjoy the <strong>cool breeze</strong> in the evening."
              },
              {
                word: "wear nice clothes",
                ipa: "/wer naɪs kloʊðz/",
                pos: "v. phr.",
                meaning: "mặc quần áo đẹp",
                example: "In cool weather, I can <strong>wear nice clothes</strong>."
              },
              {
                word: "play sports",
                ipa: "/pleɪ spɔːrts/",
                pos: "v. phr.",
                meaning: "chơi thể thao",
                example: "My friends and I <strong>play sports</strong> on Sunday."
              },
              {
                word: "bright sunshine",
                ipa: "/braɪt ˈsʌnʃaɪn/",
                pos: "n. phr.",
                meaning: "ánh nắng tươi sáng",
                example: "I love the <strong>bright sunshine</strong> in the morning."
              },
              {
                word: "sleep well",
                ipa: "/sliːp wel/",
                pos: "v. phr.",
                meaning: "ngủ ngon giấc",
                example: "When it is cool at night, I <strong>sleep well</strong>."
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
              },
              {
                word: "refreshing air",
                ipa: "/rɪˈfreʃɪŋ er/",
                pos: "n. phr.",
                meaning: "bầu không khí sảng khoái",
                example: "Early morning walks offer <strong>refreshing air</strong>."
              },
              {
                word: "rarely rains",
                ipa: "/ˈrerli reɪnz/",
                pos: "v. phr.",
                meaning: "hiếm khi mưa",
                example: "It <strong>rarely rains</strong> from December to March."
              },
              {
                word: "outdoor dining",
                ipa: "/ˈaʊtdɔːr ˈdaɪnɪŋ/",
                pos: "n. phr.",
                meaning: "ăn uống ngoài trời",
                example: "Dry evenings are great for <strong>outdoor dining</strong>."
              },
              {
                word: "mild weather",
                ipa: "/maɪld ˈweðər/",
                pos: "n. phr.",
                meaning: "thời tiết ôn hòa, dịu nhẹ",
                example: "Everyone enjoys <strong>mild weather</strong> after summer."
              },
              {
                word: "enjoyable atmosphere",
                ipa: "/ɪnˈdʒɔɪəbl ˈætməsfɪr/",
                pos: "n. phr.",
                meaning: "không khí dễ chịu, vui vẻ",
                example: "The city has a very <strong>enjoyable atmosphere</strong> then."
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
              },
              {
                word: "sunny weather",
                ipa: "/ˈsʌni ˈweðər/",
                pos: "n. phr.",
                meaning: "thời tiết nắng đẹp",
                example: "Tourists love <strong>sunny weather</strong> when visiting Vietnam."
              },
              {
                word: "swim in the sea",
                ipa: "/swɪm ɪn ðə siː/",
                pos: "v. phr.",
                meaning: "bơi lội ở biển",
                example: "Guests can <strong>swim in the sea</strong> every morning."
              },
              {
                word: "visit local markets",
                ipa: "/ˈvɪzɪt ˈloʊkl ˈmɑːrkɪts/",
                pos: "v. phr.",
                meaning: "thăm các khu chợ địa phương",
                example: "They like to <strong>visit local markets</strong> for souvenirs."
              },
              {
                word: "festivals",
                ipa: "/ˈfestɪvlz/",
                pos: "n.",
                meaning: "các lễ hội truyền thống",
                example: "Spring has many colorful <strong>festivals</strong>."
              },
              {
                word: "warm climate",
                ipa: "/wɔːrm ˈklaɪmət/",
                pos: "n. phr.",
                meaning: "khí hậu ấm áp",
                example: "Visitors come for the <strong>warm climate</strong> in winter."
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
              },
              {
                word: "ideal weather",
                ipa: "/aɪˈdiːəl ˈweðər/",
                pos: "n. phr.",
                meaning: "thời tiết lý tưởng",
                example: "Spring offers <strong>ideal weather</strong> for sightseeing."
              },
              {
                word: "water sports",
                ipa: "/ˈwɔːtər spɔːrts/",
                pos: "n. phr.",
                meaning: "các môn thể thao dưới nước",
                example: "Visitors can try fun <strong>water sports</strong> on the coast."
              },
              {
                word: "local specialties",
                ipa: "/ˈloʊkl ˈspeʃəltiz/",
                pos: "n. phr.",
                meaning: "đặc sản địa phương",
                example: "Don't miss tasting <strong>local specialties</strong> at night."
              },
              {
                word: "vibrant nightlife",
                ipa: "/ˈvaɪbrənt ˈnaɪtlaɪf/",
                pos: "n. phr.",
                meaning: "cuộc sống về đêm sôi động",
                example: "Big cities have a very <strong>vibrant nightlife</strong>."
              },
              {
                word: "crowded beaches",
                ipa: "/ˈkraʊdɪd ˈbiːtʃɪz/",
                pos: "n. phr.",
                meaning: "các bãi biển đông đúc",
                example: "Be ready for <strong>crowded beaches</strong> during holidays."
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
              },
              {
                word: "warm at noon",
                ipa: "/wɔːrm æt nuːn/",
                pos: "phr.",
                meaning: "ấm / nóng vào buổi trưa",
                example: "It is quite <strong>warm at noon</strong> in summer."
              },
              {
                word: "windy",
                ipa: "/ˈwɪndi/",
                pos: "adj.",
                meaning: "có nhiều gió",
                example: "By the river, it is often <strong>windy</strong>."
              },
              {
                word: "cloudy",
                ipa: "/ˈklaʊdi/",
                pos: "adj.",
                meaning: "nhiều mây, âm u",
                example: "Before it rains, the sky looks very <strong>cloudy</strong>."
              },
              {
                word: "light rain",
                ipa: "/laɪt reɪn/",
                pos: "n. phr.",
                meaning: "mưa nhẹ, mưa phùn",
                example: "Sometimes we get a <strong>light rain</strong> in the afternoon."
              },
              {
                word: "cold in winter",
                ipa: "/koʊld ɪn ˈwɪntər/",
                pos: "phr.",
                meaning: "lạnh vào mùa đông",
                example: "Northern towns get very <strong>cold in winter</strong>."
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
              },
              {
                word: "unpredictable",
                ipa: "/ˌʌnprɪˈdɪktəbl/",
                pos: "adj.",
                meaning: "khó đoán, thay đổi thất thường",
                example: "Rainy season weather can be quite <strong>unpredictable</strong>."
              },
              {
                word: "scorching hot",
                ipa: "/ˈskɔːrtʃɪŋ hɒt/",
                pos: "adj. phr.",
                meaning: "nóng như đổ lửa",
                example: "In April, the sun is <strong>scorching hot</strong> at midday."
              },
              {
                word: "chilly at night",
                ipa: "/ˈtʃɪli æt naɪt/",
                pos: "phr.",
                meaning: "se lạnh vào ban đêm",
                example: "Mountain towns get a bit <strong>chilly at night</strong>."
              },
              {
                word: "gentle breeze",
                ipa: "/ˈdʒentl briːz/",
                pos: "n. phr.",
                meaning: "cơn gió nhẹ dịu mát",
                example: "A <strong>gentle breeze</strong> makes evening walks enjoyable."
              },
              {
                word: "tropical weather",
                ipa: "/ˈtrɒpɪkl ˈweðər/",
                pos: "n. phr.",
                meaning: "thời tiết nhiệt đới",
                example: "My hometown has warm <strong>tropical weather</strong> all year."
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
              },
              {
                word: "cool wind",
                ipa: "/kuːl wɪnd/",
                pos: "n. phr.",
                meaning: "gió mát",
                example: "I love walking when there is a <strong>cool wind</strong>."
              },
              {
                word: "cold days",
                ipa: "/koʊld deɪz/",
                pos: "n. phr.",
                meaning: "những ngày trời lạnh",
                example: "On <strong>cold days</strong>, I like eating hot soup."
              },
              {
                word: "ride a motorbike",
                ipa: "/raɪd ə ˈmoʊtərbaɪk/",
                pos: "v. phr.",
                meaning: "chạy xe máy",
                example: "It is nice to <strong>ride a motorbike</strong> without rain."
              },
              {
                word: "not too hot",
                ipa: "/nɒt tuː hɒt/",
                pos: "phr.",
                meaning: "không quá nóng bức",
                example: "I love days that are <strong>not too hot</strong>."
              },
              {
                word: "eat hot pot",
                ipa: "/iːt hɒt pɒt/",
                pos: "v. phr.",
                meaning: "ăn lẩu",
                example: "Friends love to <strong>eat hot pot</strong> in cool weather."
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
              },
              {
                word: "mild temperature",
                ipa: "/maɪld ˈtemprətʃər/",
                pos: "n. phr.",
                meaning: "nhiệt độ dịu mát, vừa phải",
                example: "I really prefer a <strong>mild temperature</strong> around 22 degrees."
              },
              {
                word: "refreshing breeze",
                ipa: "/rɪˈfreʃɪŋ briːz/",
                pos: "n. phr.",
                meaning: "làn gió mát sảng khoái",
                example: "A <strong>refreshing breeze</strong> helps me forget the heat."
              },
              {
                word: "comfortable atmosphere",
                ipa: "/ˈkʌmftəbl ˈætməsfɪr/",
                pos: "n. phr.",
                meaning: "bầu không khí dễ chịu",
                example: "Autumn creates a <strong>comfortable atmosphere</strong> outdoors."
              },
              {
                word: "stay active",
                ipa: "/steɪ ˈæktɪv/",
                pos: "v. phr.",
                meaning: "duy trì vận động năng nổ",
                example: "Nice weather helps me <strong>stay active</strong> after school."
              },
              {
                word: "boost my energy",
                ipa: "/buːst maɪ ˈenərdʒi/",
                pos: "v. phr.",
                meaning: "tăng cường năng lượng",
                example: "Morning sunlight always <strong>boosts my energy</strong>."
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
              },
              {
                word: "rainy days",
                ipa: "/ˈreɪni deɪz/",
                pos: "n. phr.",
                meaning: "những ngày trời mưa",
                example: "On <strong>rainy days</strong>, I prefer to sleep longer."
              },
              {
                word: "feel lazy",
                ipa: "/fiːl ˈleɪzi/",
                pos: "v. phr.",
                meaning: "cảm thấy lười biếng, uể oải",
                example: "Cold rain makes me <strong>feel lazy</strong> at home."
              },
              {
                word: "feel active",
                ipa: "/fiːl ˈæktɪv/",
                pos: "v. phr.",
                meaning: "cảm thấy năng động, hào hứng",
                example: "Bright mornings help me <strong>feel active</strong>."
              },
              {
                word: "cancel plans",
                ipa: "/ˈkænsl plænz/",
                pos: "v. phr.",
                meaning: "hủy bỏ kế hoạch",
                example: "Sometimes heavy rain makes me <strong>cancel plans</strong>."
              },
              {
                word: "traffic jam",
                ipa: "/ˈtræfɪk dʒæm/",
                pos: "n. phr.",
                meaning: "kẹt xe, tắc đường",
                example: "Rain often causes a bad <strong>traffic jam</strong>."
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
              },
              {
                word: "daily routine",
                ipa: "/ˈdeɪli ruːˈtiːn/",
                pos: "n. phr.",
                meaning: "thói quen sinh hoạt hằng ngày",
                example: "Sudden storms easily change my <strong>daily routine</strong>."
              },
              {
                word: "boost my productivity",
                ipa: "/buːst maɪ ˌprɒdʌkˈtɪvəti/",
                pos: "v. phr.",
                meaning: "nâng cao hiệu suất học tập/làm việc",
                example: "Cool sunny mornings <strong>boost my productivity</strong>."
              },
              {
                word: "feel sluggish",
                ipa: "/fiːl ˈslʌɡɪʃ/",
                pos: "v. phr.",
                meaning: "cảm thấy uể oải, chậm chạp",
                example: "Extreme heat often makes me <strong>feel sluggish</strong>."
              },
              {
                word: "ruin my plans",
                ipa: "/ˈruːɪn maɪ plænz/",
                pos: "v. phr.",
                meaning: "làm hỏng kế hoạch của tôi",
                example: "Heavy showers can <strong>ruin my plans</strong> for the weekend."
              },
              {
                word: "stay indoors",
                ipa: "/steɪ ˌɪnˈdɔːrz/",
                pos: "v. phr.",
                meaning: "ở trong nhà",
                example: "I prefer to <strong>stay indoors</strong> and read when it storms."
              }
            ]
          }
        }
      }
    ]
  }
];
