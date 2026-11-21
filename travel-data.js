// ==========================================================================
// SPEAKING PART 1 — 10 STANDALONE TOPICS (TRAVELLING, TRIPS, TRAVEL PLANS, SEASONS, WEATHER, AI TOOLS, MOBILE PHONES, EMAIL, ADVERTISING, YOUR BIGGEST ACHIEVEMENT)
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
  },

  // ==========================================================================
  // ĐỀ 06: AI TOOLS
  // ==========================================================================
  {
    id: "topic-ai-tools",
    number: "06",
    title: "AI tools",
    titleVi: "Công cụ AI & Ứng dụng trí tuệ nhân tạo",
    description:
      "Luyện 3 câu hỏi về việc sử dụng các ứng dụng AI trong học tập và công việc, lý do bạn dùng chúng và mức độ phổ biến của AI ở Việt Nam.",
    questionsCount: 3,
    questions: [
      {
        id: "ai_q1",
        num: 1,
        prompt: "Do you use any AI applications?",
        analysis: {
          questionType: "Câu hỏi Yes/No về thói quen sử dụng ('Do you use any...'). Áp dụng công thức A-R-E (Yes → Specific app + Reason → Example → Feeling).",
          tense: "Hiện tại đơn ('Yes, I do. I use...' hoặc 'Yes, I really do. Actually,...').",
          length: "3 câu ngắn gọn (~33–39 từ), dùng tình huống học tiếng Anh thực tế."
        },
        pitfalls: [
          "Chỉ nói 'Yes, I do.' rồi dừng lại mà không nêu tên ứng dụng cụ thể (như ChatGPT) và ví dụ cách dùng.",
          "Quên chia '-s' ở động từ khi chủ ngữ là 'it' ('it helps me', 'which really boosts...').",
          "Quên 'to' trong cấu trúc 'ask + somebody/it + to V' (đúng: 'ask it to check')."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Khẳng định có dùng ChatGPT mỗi ngày để học tốt hơn: Yes, I do. I use ChatGPT almost every day because it helps me study better."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Nhờ kiểm tra bài viết tiếng Anh và giải thích bài khó: For example, I ask it to check my English writing and explain hard lessons."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'feel ready')",
                text: "Chốt cảm giác tự tin vào lớp: It makes me feel ready for class."
              }
            ],
            modelAnswer:
              "Yes, I do. I use ChatGPT almost every day because it helps me <strong>study better</strong>. For example, I ask it to check my English writing and explain hard lessons. It makes me <strong>feel ready</strong> for class.",
            vocab: [
              {
                word: "study better",
                ipa: "/ˈstʌdi ˈbetər/",
                pos: "v. phr.",
                meaning: "học tập hiệu quả hơn",
                example: "I use ChatGPT every day because it helps me <strong>study better</strong>."
              },
              {
                word: "feel ready",
                ipa: "/fiːl ˈredi/",
                pos: "v. phr.",
                meaning: "cảm thấy sẵn sàng",
                example: "Reviewing lessons with AI makes me <strong>feel ready</strong> for class."
              },
              {
                word: "AI applications",
                ipa: "/ˌeɪˈaɪ ˌæplɪˈkeɪʃnz/",
                pos: "n. phr.",
                meaning: "các ứng dụng trí tuệ nhân tạo",
                example: "Many students use <strong>AI applications</strong> on their phones."
              },
              {
                word: "check grammar",
                ipa: "/tʃek ˈɡræmər/",
                pos: "v. phr.",
                meaning: "kiểm tra lỗi ngữ pháp",
                example: "I ask it to <strong>check grammar</strong> in my homework."
              },
              {
                word: "explain hard lessons",
                ipa: "/ɪkˈspleɪn hɑːrd ˈlesnz/",
                pos: "v. phr.",
                meaning: "giải thích những bài học khó",
                example: "This app can <strong>explain hard lessons</strong> in simple words."
              },
              {
                word: "translate new words",
                ipa: "/trænzˈleɪt nuː wɜːrdz/",
                pos: "v. phr.",
                meaning: "dịch từ vựng mới",
                example: "I often use AI tools to <strong>translate new words</strong>."
              },
              {
                word: "easy to use",
                ipa: "/ˈiːzi tuː juːz/",
                pos: "adj. phr.",
                meaning: "dễ sử dụng",
                example: "ChatGPT is free and very <strong>easy to use</strong>."
              },
              {
                word: "save time",
                ipa: "/seɪv taɪm/",
                pos: "v. phr.",
                meaning: "tiết kiệm thời gian",
                example: "Smart apps help me <strong>save time</strong> every evening."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Yes, I really do + go-to)",
                text: "Dùng 'Actually, ChatGPT is my go-to AI app' và nêu tính tiện lợi cho lịch sinh hoạt hằng ngày (daily routine)."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Lên ý tưởng (brainstorm ideas) và kiểm tra ngữ pháp trước khi nộp bài."
              },
              {
                label: "Kết quả (, which really boosts...)",
                text: "Chốt bằng mệnh đề quan hệ ', which really boosts my productivity' (nâng cao hiệu suất)."
              }
            ],
            modelAnswer:
              "<strong>Yes, I really do.</strong> <strong>Actually,</strong> ChatGPT is my <strong>go-to</strong> AI app because it is super <strong>convenient</strong> for my <strong>daily routine</strong>. For example, I use it to <strong>brainstorm ideas</strong> and check my grammar, <strong>which really boosts my productivity</strong>.",
            vocab: [
              {
                word: "go-to",
                ipa: "/ˈɡoʊ tuː/",
                pos: "adj.",
                meaning: "lựa chọn quen thuộc, ưu tiên hàng đầu",
                example: "ChatGPT is my <strong>go-to</strong> AI app for studying."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện, tiện lợi",
                example: "AI tools are super <strong>convenient</strong> for my daily routine."
              },
              {
                word: "daily routine",
                ipa: "/ˈdeɪli ruːˈtiːn/",
                pos: "n. phr.",
                meaning: "thói quen sinh hoạt hằng ngày",
                example: "Checking my tasks with AI is part of my <strong>daily routine</strong>."
              },
              {
                word: "brainstorm ideas",
                ipa: "/ˈbreɪnstɔːrm aɪˈdiːəz/",
                pos: "v. phr.",
                meaning: "tìm và phát triển ý tưởng",
                example: "I use ChatGPT to <strong>brainstorm ideas</strong> for speaking topics."
              },
              {
                word: "boosts my productivity",
                ipa: "/buːsts maɪ ˌprɒdʌkˈtɪvəti/",
                pos: "v. phr.",
                meaning: "tăng năng suất học tập / làm việc",
                example: "Using AI smartly really <strong>boosts my productivity</strong>."
              },
              {
                word: "voice assistant",
                ipa: "/vɔɪs əˈsɪstənt/",
                pos: "n. phr.",
                meaning: "trợ lý giọng nói",
                example: "Sometimes I ask a <strong>voice assistant</strong> on my phone."
              },
              {
                word: "user-friendly",
                ipa: "/ˌjuːzər ˈfrendli/",
                pos: "adj.",
                meaning: "thân thiện với người dùng",
                example: "Modern AI apps have a very <strong>user-friendly</strong> design."
              },
              {
                word: "save hours of work",
                ipa: "/seɪv ˈaʊərz əv wɜːrk/",
                pos: "v. phr.",
                meaning: "tiết kiệm hàng giờ làm việc",
                example: "Smart tools can <strong>save hours of work</strong> on reports."
              }
            ]
          }
        }
      },
      {
        id: "ai_q2",
        num: 2,
        prompt: "Why do you use them?",
        analysis: {
          questionType: "Câu hỏi lý do ('Why do you use them?'). Áp dụng A-R-E (Direct Reason → Example → Feeling/Result).",
          tense: "Hiện tại đơn ('I use AI tools because...' hoặc 'Honestly, I tend to...').",
          length: "3 câu ngắn gọn (~34–38 từ), gắn với việc học, thi cử và hạn chót bài tập."
        },
        pitfalls: [
          "Chỉ nói mỗi 'Because it is good' hoặc 'Because it helps me' mà thiếu ví dụ cụ thể.",
          "Dùng nhầm 'busy for school' thay vì 'busy with school'.",
          "Nói 'explain me' thiếu giới từ 'to' (đúng: 'explain new words to me' hoặc 'explain new words in a simple way')."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Lý do chính - tiết kiệm thời gian)",
                text: "I use AI tools because they save a lot of time when I am busy with school."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Giải thích từ mới dễ hiểu: For example, they explain new words in a simple way."
              },
              {
                label: "Cảm xúc / Kết quả (Tái sử dụng 'reduce stress', 'final exams')",
                text: "Giúp giảm căng thẳng trước kỳ thi cuối kỳ: This helps me reduce stress before my final exams."
              }
            ],
            modelAnswer:
              "I use AI tools because they <strong>save a lot of time</strong> when I am <strong>busy with school</strong>. For example, they explain new words in a simple way. This helps me <strong>reduce stress</strong> before my <strong>final exams</strong>.",
            vocab: [
              {
                word: "save a lot of time",
                ipa: "/seɪv ə lɒt əv taɪm/",
                pos: "v. phr.",
                meaning: "tiết kiệm rất nhiều thời gian",
                example: "AI tools <strong>save a lot of time</strong> when I review lessons."
              },
              {
                word: "busy with school",
                ipa: "/ˈbɪzi wɪð skuːl/",
                pos: "adj. phr.",
                meaning: "bận rộn với việc học",
                example: "They are helpful when I am <strong>busy with school</strong>."
              },
              {
                word: "reduce stress",
                ipa: "/rɪˈduːs stres/",
                pos: "v. phr.",
                meaning: "giảm căng thẳng",
                example: "Preparing early helps me <strong>reduce stress</strong>."
              },
              {
                word: "final exams",
                ipa: "/ˈfaɪnl ɪɡˈzæmz/",
                pos: "n. phr.",
                meaning: "các kỳ thi cuối kỳ",
                example: "AI apps help me review before my <strong>final exams</strong>."
              },
              {
                word: "in a simple way",
                ipa: "/ɪn ə ˈsɪmpl weɪ/",
                pos: "adv. phr.",
                meaning: "theo cách đơn giản, dễ hiểu",
                example: "They explain grammar rules <strong>in a simple way</strong>."
              },
              {
                word: "learn faster",
                ipa: "/lɜːrn ˈfæstər/",
                pos: "v. phr.",
                meaning: "học nhanh hơn",
                example: "Good examples help me <strong>learn faster</strong>."
              },
              {
                word: "do homework",
                ipa: "/duː ˈhoʊmwɜːrk/",
                pos: "v. phr.",
                meaning: "làm bài tập về nhà",
                example: "I use AI to check ideas when I <strong>do homework</strong>."
              },
              {
                word: "get quick answers",
                ipa: "/ɡet kwɪk ˈænsərz/",
                pos: "v. phr.",
                meaning: "nhận được câu trả lời nhanh",
                example: "Students like AI because they can <strong>get quick answers</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Honestly, I tend to rely on...)",
                text: "Nêu lý do giúp làm việc ngăn nắp (stay organized) khi có hạn chót gấp (tight deadlines)."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Tóm tắt bài viết dài (summarize long articles) chỉ trong vài giây."
              },
              {
                label: "Kết quả (, which... + peace of mind)",
                text: "Tiết kiệm hàng giờ đồng hồ và mang lại sự an tâm (peace of mind)."
              }
            ],
            modelAnswer:
              "<strong>Honestly, I tend to</strong> <strong>rely on</strong> AI apps because they help me <strong>stay organized</strong> when I have <strong>tight deadlines</strong>. For example, they can <strong>summarize long articles</strong> in seconds, <strong>which</strong> saves me hours and gives me real <strong>peace of mind</strong>.",
            vocab: [
              {
                word: "rely on",
                ipa: "/rɪˈlaɪ ɒn/",
                pos: "phr. v.",
                meaning: "dựa vào, tin dùng",
                example: "I often <strong>rely on</strong> AI apps during busy weeks."
              },
              {
                word: "stay organized",
                ipa: "/steɪ ˈɔːrɡənaɪzd/",
                pos: "v. phr.",
                meaning: "duy trì sự gọn gàng, ngăn nắp",
                example: "Smart checklists help me <strong>stay organized</strong>."
              },
              {
                word: "tight deadlines",
                ipa: "/taɪt ˈdedlaɪnz/",
                pos: "n. phr.",
                meaning: "hạn chót gấp gáp",
                example: "AI is a lifesaver when I have <strong>tight deadlines</strong>."
              },
              {
                word: "summarize long articles",
                ipa: "/ˈsʌməraɪz lɔːŋ ˈɑːrtɪklz/",
                pos: "v. phr.",
                meaning: "tóm tắt các bài viết dài",
                example: "ChatGPT can <strong>summarize long articles</strong> in seconds."
              },
              {
                word: "peace of mind",
                ipa: "/piːs əv maɪnd/",
                pos: "n. phr.",
                meaning: "cảm giác yên tâm",
                example: "Checking my work twice gives me real <strong>peace of mind</strong>."
              },
              {
                word: "double-check",
                ipa: "/ˌdʌbl ˈtʃek/",
                pos: "v.",
                meaning: "kiểm tra lại lần nữa cho chắc",
                example: "I always <strong>double-check</strong> important emails with AI."
              },
              {
                word: "workload",
                ipa: "/ˈwɜːrkloʊd/",
                pos: "n.",
                meaning: "khối lượng công việc / bài vở",
                example: "AI tools make my heavy <strong>workload</strong> easier to manage."
              },
              {
                word: "instant feedback",
                ipa: "/ˈɪnstənt ˈfiːdbæk/",
                pos: "n. phr.",
                meaning: "phản hồi tức thì",
                example: "Learners enjoy getting <strong>instant feedback</strong> on writing."
              }
            ]
          }
        }
      },
      {
        id: "ai_q3",
        num: 3,
        prompt: "Is AI popular in your country?",
        analysis: {
          questionType: "Câu hỏi Yes/No về mức độ phổ biến ('Is AI popular...'). Áp dụng A-R-E (Yes + Extent → Example across groups → Result).",
          tense: "Hiện tại đơn ('Yes, it is very popular...' hoặc 'Definitely, AI has become...').",
          length: "3 câu ngắn gọn (~35–40 từ), nêu ví dụ thực tế của sinh viên và nhân viên văn phòng."
        },
        pitfalls: [
          "Quên thêm '-s' vào danh từ số nhiều ('many students', 'office workers', 'businesses').",
          "Dùng 'busy for work' thay vì đúng là 'busy with work'.",
          "Trả lời 'Yes, very popular' nhưng thiếu chủ ngữ và động từ 'it is'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Khẳng định mức độ phổ biến)",
                text: "Yes, it is very popular in Vietnam now."
              },
              {
                label: "E (Ví dụ sinh viên và người đi làm - For example)",
                text: "Sinh viên dùng để luyện tiếng Anh, nhân viên dùng khi bận việc: For example, many students use AI apps to practice English, and office workers use them when they are busy with work."
              },
              {
                label: "Kết quả / Cảm nhận",
                text: "Everyone likes how fast it is."
              }
            ],
            modelAnswer:
              "Yes, it is very popular in Vietnam now. For example, many <strong>students</strong> use AI apps to <strong>practice English</strong>, and office workers use them when they are <strong>busy with work</strong>. Everyone likes how fast it is.",
            vocab: [
              {
                word: "students",
                ipa: "/ˈstuːdnts/",
                pos: "n.",
                meaning: "học sinh, sinh viên",
                example: "Many <strong>students</strong> use AI tools for schoolwork."
              },
              {
                word: "practice English",
                ipa: "/ˈpræktɪs ˈɪŋɡlɪʃ/",
                pos: "v. phr.",
                meaning: "luyện tập tiếng Anh",
                example: "Young people use AI apps to <strong>practice English</strong>."
              },
              {
                word: "busy with work",
                ipa: "/ˈbɪzi wɪð wɜːrk/",
                pos: "adj. phr.",
                meaning: "bận rộn với công việc",
                example: "Office staff use AI when they are <strong>busy with work</strong>."
              },
              {
                word: "office workers",
                ipa: "/ˈɔːfɪs ˈwɜːrkərz/",
                pos: "n. phr.",
                meaning: "nhân viên văn phòng",
                example: "Many <strong>office workers</strong> write emails faster with AI."
              },
              {
                word: "young people",
                ipa: "/jʌŋ ˈpiːpl/",
                pos: "n. phr.",
                meaning: "giới trẻ",
                example: "<strong>Young people</strong> learn new apps very quickly."
              },
              {
                word: "everywhere",
                ipa: "/ˈevriwer/",
                pos: "adv.",
                meaning: "khắp mọi nơi",
                example: "Smart technology is almost <strong>everywhere</strong> today."
              },
              {
                word: "write emails",
                ipa: "/raɪt ˈiːmeɪlz/",
                pos: "v. phr.",
                meaning: "viết thư điện tử",
                example: "Some people use AI to <strong>write emails</strong> at the office."
              },
              {
                word: "helpful tool",
                ipa: "/ˈhelpfl tuːl/",
                pos: "n. phr.",
                meaning: "công cụ hữu ích",
                example: "AI has become a <strong>helpful tool</strong> for everyone."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu khẳng định - Definitely)",
                text: "AI đã trở nên phổ biến rộng rãi (widely used) ở Việt Nam vì nhiều công cụ miễn phí hoặc giá phải chăng (affordable)."
              },
              {
                label: "E (Ví dụ đối lập với 'while')",
                text: "Sinh viên dùng cho các dự án quan trọng (important projects), còn doanh nghiệp dùng để trả lời khách hàng nhanh hơn."
              },
              {
                label: "Kết quả (Overall + daily routine + convenient)",
                text: "Nhìn chung, nó làm nhịp sinh hoạt hằng ngày thuận tiện hơn nhiều."
              }
            ],
            modelAnswer:
              "<strong>Definitely</strong>, AI has become <strong>widely used</strong> in Vietnam because many tools are free or <strong>affordable</strong>. For example, students use AI for <strong>important projects</strong>, while businesses use it to answer customers faster. Overall, it makes our <strong>daily routine</strong> much more <strong>convenient</strong>.",
            vocab: [
              {
                word: "widely used",
                ipa: "/ˈwaɪdli juːzd/",
                pos: "adj. phr.",
                meaning: "được sử dụng rộng rãi",
                example: "AI tools are now <strong>widely used</strong> in big cities."
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "giá cả phải chăng",
                example: "Many AI apps are free or very <strong>affordable</strong>."
              },
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɒdʒekts/",
                pos: "n. phr.",
                meaning: "các dự án quan trọng",
                example: "Students often use AI for <strong>important projects</strong>."
              },
              {
                word: "daily routine",
                ipa: "/ˈdeɪli ruːˈtiːn/",
                pos: "n. phr.",
                meaning: "sinh hoạt hằng ngày",
                example: "Technology makes our <strong>daily routine</strong> much smoother."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện, tiện ích",
                example: "Online services feel much more <strong>convenient</strong> now."
              },
              {
                word: "customer service",
                ipa: "/ˈkʌstəmər ˈsɜːrvɪs/",
                pos: "n. phr.",
                meaning: "dịch vụ chăm sóc khách hàng",
                example: "Local shops use AI chatbots for <strong>customer service</strong>."
              },
              {
                word: "tech-savvy",
                ipa: "/tek ˈsævi/",
                pos: "adj.",
                meaning: "am hiểu công nghệ",
                example: "Vietnamese youth are very <strong>tech-savvy</strong>."
              },
              {
                word: "catch on quickly",
                ipa: "/kætʃ ɒn ˈkwɪkli/",
                pos: "v. phr.",
                meaning: "trở nên thịnh hành nhanh chóng",
                example: "New AI apps <strong>catch on quickly</strong> in Vietnam."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 07: MOBILE PHONES
  // ==========================================================================
  {
    id: "topic-mobile-phones",
    number: "07",
    title: "Mobile phones",
    titleVi: "Điện thoại di động & Thói quen sử dụng",
    description:
      "Luyện 3 câu hỏi về lý do sử dụng điện thoại di động, những việc bạn làm nhiều nhất trên điện thoại và quan điểm về việc dùng điện thoại quá nhiều.",
    questionsCount: 3,
    questions: [
      {
        id: "phone_q1",
        num: 1,
        prompt: "Do you use a mobile phone? Why?",
        analysis: {
          questionType: "Câu hỏi Yes/No kèm lý do ('Do you use... Why?'). Áp dụng A-R-E (Yes + Reason → Practical example → Feeling).",
          tense: "Hiện tại đơn ('Yes, I do. I use my phone...' hoặc 'Yes, I really do. To be honest,...').",
          length: "3 câu ngắn gọn (~33–38 từ), dùng tình huống liên lạc gia đình, xem thời tiết hoặc đặt vé."
        },
        pitfalls: [
          "Trả lời 'Yes, I do' mà quên trả lời phần 'Why?' bằng 'because...'.",
          "Quên giới từ 'with' trong cụm 'keep in touch with my family'.",
          "Quên thêm '-s' trong 'helps me' hoặc 'makes me'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do giữ liên lạc)",
                text: "Yes, I do. I use my phone every day because it helps me keep in touch with my family."
              },
              {
                label: "E (Ví dụ quen thuộc - tái sử dụng 'check the weather')",
                text: "For example, I can text my friends and check the weather quickly."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'feel safe')",
                text: "It makes me feel safe."
              }
            ],
            modelAnswer:
              "Yes, I do. I use my phone every day because it helps me <strong>keep in touch</strong> with my family. For example, I can text my friends and <strong>check the weather</strong> quickly. It makes me <strong>feel safe</strong>.",
            vocab: [
              {
                word: "keep in touch",
                ipa: "/kiːp ɪn tʌtʃ/",
                pos: "v. phr.",
                meaning: "giữ liên lạc",
                example: "My phone helps me <strong>keep in touch</strong> with my family."
              },
              {
                word: "check the weather",
                ipa: "/tʃek ðə ˈweðər/",
                pos: "v. phr.",
                meaning: "xem dự báo thời tiết",
                example: "I use my phone to <strong>check the weather</strong> before going out."
              },
              {
                word: "feel safe",
                ipa: "/fiːl seɪf/",
                pos: "v. phr.",
                meaning: "cảm thấy an toàn",
                example: "Carrying a phone at night makes me <strong>feel safe</strong>."
              },
              {
                word: "text my friends",
                ipa: "/tekst maɪ frendz/",
                pos: "v. phr.",
                meaning: "nhắn tin cho bạn bè",
                example: "I can <strong>text my friends</strong> in just a second."
              },
              {
                word: "make a phone call",
                ipa: "/meɪk ə foʊn kɔːl/",
                pos: "v. phr.",
                meaning: "gọi điện thoại",
                example: "It is easy to <strong>make a phone call</strong> anytime."
              },
              {
                word: "find directions",
                ipa: "/faɪnd dəˈrekʃnz/",
                pos: "v. phr.",
                meaning: "tìm đường đi",
                example: "I use maps on my phone to <strong>find directions</strong>."
              },
              {
                word: "every day",
                ipa: "/ˈevri deɪ/",
                pos: "adv. phr.",
                meaning: "mỗi ngày",
                example: "I carry my smartphone with me <strong>every day</strong>."
              },
              {
                word: "important tool",
                ipa: "/ɪmˈpɔːrtnt tuːl/",
                pos: "n. phr.",
                meaning: "công cụ quan trọng",
                example: "A mobile phone is an <strong>important tool</strong> nowadays."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Yes, I really do + To be honest)",
                text: "Gọi điện thoại là món đồ thiết yếu (essential item) giúp giữ kết nối mọi lúc mọi nơi."
              },
              {
                label: "E (Ví dụ tái sử dụng 'check my schedule', 'in advance')",
                text: "Kiểm tra lịch trình và đặt vé trước (book tickets in advance)."
              },
              {
                label: "Kết quả (, which... + convenient)",
                text: "Chốt bằng mệnh đề quan hệ ', which makes my life super convenient'."
              }
            ],
            modelAnswer:
              "<strong>Yes, I really do.</strong> <strong>To be honest,</strong> my phone is an <strong>essential item</strong> because it keeps me connected wherever I go. For example, I use it to <strong>check my schedule</strong> and book tickets <strong>in advance</strong>, <strong>which</strong> makes my life super <strong>convenient</strong>.",
            vocab: [
              {
                word: "essential item",
                ipa: "/ɪˈsenʃl ˈaɪtəm/",
                pos: "n. phr.",
                meaning: "vật dụng thiết yếu",
                example: "My phone is an <strong>essential item</strong> when I leave home."
              },
              {
                word: "check my schedule",
                ipa: "/tʃek maɪ ˈskedʒuːl/",
                pos: "v. phr.",
                meaning: "kiểm tra lịch trình cá nhân",
                example: "I use my phone to <strong>check my schedule</strong> every morning."
              },
              {
                word: "in advance",
                ipa: "/ɪn ədˈvæns/",
                pos: "adv. phr.",
                meaning: "trước (về thời gian)",
                example: "I can book movie or bus tickets <strong>in advance</strong>."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "thuận tiện",
                example: "Mobile apps make daily life super <strong>convenient</strong>."
              },
              {
                word: "stay connected",
                ipa: "/steɪ kəˈnektɪd/",
                pos: "v. phr.",
                meaning: "giữ kết nối",
                example: "Smartphones help us <strong>stay connected</strong> with loved ones."
              },
              {
                word: "online payment",
                ipa: "/ˈɒnlaɪn ˈpeɪmənt/",
                pos: "n. phr.",
                meaning: "thanh toán trực tuyến",
                example: "I use my phone for quick <strong>online payment</strong> at cafes."
              },
              {
                word: "cannot live without",
                ipa: "/ˈkænɒt lɪv wɪˈðaʊt/",
                pos: "v. phr.",
                meaning: "không thể thiếu",
                example: "Most people feel they <strong>cannot live without</strong> their phones."
              },
              {
                word: "portable charger",
                ipa: "/ˈpɔːrtəbl ˈtʃɑːrdʒər/",
                pos: "n. phr.",
                meaning: "sạc dự phòng cầm tay",
                example: "I bring a <strong>portable charger</strong> so my phone never dies."
              }
            ]
          }
        }
      },
      {
        id: "phone_q2",
        num: 2,
        prompt: "What do you use your mobile phone for most?",
        analysis: {
          questionType: "Câu hỏi thói quen chính ('What do you use... for most?'). Áp dụng 'I mostly use... to...' (B1) / 'Honestly, I tend to...' (B2) + A-R-E.",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~34–38 từ), nêu hoạt động giải trí và liên lạc gần gũi."
        },
        pitfalls: [
          "Dùng sai dạng động từ trong 'use something for + V-ing' vs 'use something to + V' (không nói 'use my phone to chatting').",
          "Quên âm cuối '-s' trong 'friends', 'videos', 'photos'.",
          "Chỉ kể 1 từ ('for games') mà không nêu ngữ cảnh và cảm xúc."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Mục đích chính + Thời điểm)",
                text: "I mostly use my phone to chat with friends and watch short videos when I have free time."
              },
              {
                label: "E (Ví dụ thêm - tái sử dụng 'take nice photos')",
                text: "For example, I often listen to music and take nice photos with it."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'feel relaxed')",
                text: "It helps me feel relaxed."
              }
            ],
            modelAnswer:
              "I mostly use my phone to <strong>chat with friends</strong> and watch short videos when I <strong>have free time</strong>. For example, I often listen to music and <strong>take nice photos</strong> with it. It helps me <strong>feel relaxed</strong>.",
            vocab: [
              {
                word: "chat with friends",
                ipa: "/tʃæt wɪð frendz/",
                pos: "v. phr.",
                meaning: "trò chuyện với bạn bè",
                example: "I mostly use my phone to <strong>chat with friends</strong>."
              },
              {
                word: "have free time",
                ipa: "/hæv friː taɪm/",
                pos: "v. phr.",
                meaning: "có thời gian rảnh",
                example: "I watch funny clips when I <strong>have free time</strong>."
              },
              {
                word: "take nice photos",
                ipa: "/teɪk naɪs ˈfoʊtoʊz/",
                pos: "v. phr.",
                meaning: "chụp những bức ảnh đẹp",
                example: "I use my phone camera to <strong>take nice photos</strong>."
              },
              {
                word: "feel relaxed",
                ipa: "/fiːl rɪˈlækst/",
                pos: "v. phr.",
                meaning: "cảm thấy thư giãn",
                example: "Listening to music helps me <strong>feel relaxed</strong>."
              },
              {
                word: "watch short videos",
                ipa: "/wɒtʃ ʃɔːrt ˈvɪdioʊz/",
                pos: "v. phr.",
                meaning: "xem video ngắn",
                example: "Many students <strong>watch short videos</strong> after dinner."
              },
              {
                word: "listen to music",
                ipa: "/ˈlɪsn tuː ˈmjuːzɪk/",
                pos: "v. phr.",
                meaning: "nghe nhạc",
                example: "I always <strong>listen to music</strong> on the bus."
              },
              {
                word: "surf the internet",
                ipa: "/sɜːrf ði ˈɪntərnet/",
                pos: "v. phr.",
                meaning: "lướt mạng",
                example: "People use smartphones to <strong>surf the internet</strong>."
              },
              {
                word: "order food",
                ipa: "/ˈɔːrdər fuːd/",
                pos: "v. phr.",
                meaning: "đặt đồ ăn qua mạng",
                example: "I also use food apps to <strong>order food</strong> on rainy days."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Honestly, I tend to + unwind)",
                text: "Dùng nhiều nhất cho ứng dụng nhắn tin (messaging apps) và xem video để xả hơi (unwind) sau ngày dài."
              },
              {
                label: "E (Ví dụ + tái sử dụng 'take a break')",
                text: "Lướt mạng xã hội (social media) để nghỉ xả hơi một chút sau giờ học."
              },
              {
                label: "Cảm xúc (, which... + cheers me up)",
                text: "Điều này giúp mình nhanh chóng vui vẻ trở lại (cheers me up)."
              }
            ],
            modelAnswer:
              "<strong>Honestly, I tend to</strong> use my phone most for <strong>messaging apps</strong> and watching videos to <strong>unwind</strong> after a long day. For example, I scroll through <strong>social media</strong> to <strong>take a break</strong> from studying, <strong>which</strong> quickly <strong>cheers me up</strong>.",
            vocab: [
              {
                word: "messaging apps",
                ipa: "/ˈmesɪdʒɪŋ æps/",
                pos: "n. phr.",
                meaning: "các ứng dụng nhắn tin (Zalo, Messenger)",
                example: "I use <strong>messaging apps</strong> to talk with classmates."
              },
              {
                word: "unwind",
                ipa: "/ˌʌnˈwaɪnd/",
                pos: "v.",
                meaning: "thư giãn, xả hơi",
                example: "Watching videos at night helps me <strong>unwind</strong>."
              },
              {
                word: "social media",
                ipa: "/ˈsoʊʃl ˈmiːdiə/",
                pos: "n. phr.",
                meaning: "mạng xã hội",
                example: "I scroll through <strong>social media</strong> for funny clips."
              },
              {
                word: "take a break",
                ipa: "/teɪk ə breɪk/",
                pos: "v. phr.",
                meaning: "nghỉ giải lao, xả hơi",
                example: "I listen to music to <strong>take a break</strong> from studying."
              },
              {
                word: "cheers me up",
                ipa: "/tʃɪrz miː ʌp/",
                pos: "phr. v.",
                meaning: "làm tôi vui lên, phấn chấn lên",
                example: "Chatting with close friends always <strong>cheers me up</strong>."
              },
              {
                word: "scroll through",
                ipa: "/skroʊl θruː/",
                pos: "phr. v.",
                meaning: "lướt xem (trên màn hình)",
                example: "Many people <strong>scroll through</strong> news feeds every morning."
              },
              {
                word: "video calls",
                ipa: "/ˈvɪdioʊ kɔːlz/",
                pos: "n. phr.",
                meaning: "cuộc gọi video",
                example: "I make <strong>video calls</strong> to my parents on weekends."
              },
              {
                word: "entertaining",
                ipa: "/ˌentərˈteɪnɪŋ/",
                pos: "adj.",
                meaning: "mang tính giải trí, thú vị",
                example: "Short travel vlogs are very <strong>entertaining</strong>."
              }
            ]
          }
        }
      },
      {
        id: "phone_q3",
        num: 3,
        prompt: "Do you think people spend too much time on their mobile phones?",
        analysis: {
          questionType: "Câu hỏi quan điểm Yes/No ('Do you think...'). Áp dụng A-R-E (Opinion + Reason → Everyday example → Effect/Advice).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~34–38 từ), nêu cảnh quen thuộc ngoài quán cà phê hoặc thức khuya lướt điện thoại."
        },
        pitfalls: [
          "Dùng nhầm 'too many time' (đúng: 'too much time' vì 'time' nghĩa là thời gian không đếm được).",
          "Quên động từ 'to be' trước tính từ ('is bad', 'are glued to') hoặc quên '-s' ở 'affects'.",
          "Dùng 'spend time to look at' thay vì 'spend time looking at' hoặc 'look at... all day'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Quan điểm + Lý do)",
                text: "Yes, I think so, because many people look at their screens all day."
              },
              {
                label: "E (Ví dụ thực tế ở quán cà phê - tái sử dụng 'talk together')",
                text: "For example, friends meet at a cafe, but they still check their phones and rarely talk together."
              },
              {
                label: "Hậu quả (Tái sử dụng 'feel lazy')",
                text: "It also makes them feel lazy."
              }
            ],
            modelAnswer:
              "Yes, I think so, because many people look at their <strong>screens</strong> all day. For example, friends meet at a cafe, but they still check their phones and rarely <strong>talk together</strong>. It also makes them <strong>feel lazy</strong>.",
            vocab: [
              {
                word: "screens",
                ipa: "/skriːnz/",
                pos: "n.",
                meaning: "màn hình (điện thoại, máy tính)",
                example: "Many people look at their phone <strong>screens</strong> all day."
              },
              {
                word: "talk together",
                ipa: "/tɔːk təˈɡeðər/",
                pos: "v. phr.",
                meaning: "nói chuyện cùng nhau",
                example: "Friends meet at a cafe, but they rarely <strong>talk together</strong>."
              },
              {
                word: "feel lazy",
                ipa: "/fiːl ˈleɪzi/",
                pos: "v. phr.",
                meaning: "cảm thấy lười biếng, uể oải",
                example: "Using a phone in bed makes me <strong>feel lazy</strong>."
              },
              {
                word: "too much time",
                ipa: "/tuː mʌtʃ taɪm/",
                pos: "n. phr.",
                meaning: "quá nhiều thời gian",
                example: "Young people spend <strong>too much time</strong> online."
              },
              {
                word: "bad for our eyes",
                ipa: "/bæd fɔːr ˈaʊər aɪz/",
                pos: "adj. phr.",
                meaning: "có hại cho mắt",
                example: "Looking at a bright screen at night is <strong>bad for our eyes</strong>."
              },
              {
                word: "face to face",
                ipa: "/feɪs tuː feɪs/",
                pos: "adv. phr.",
                meaning: "trực tiếp, mặt đối mặt",
                example: "People should talk <strong>face to face</strong> more often."
              },
              {
                word: "stay up late",
                ipa: "/steɪ ʌp leɪt/",
                pos: "v. phr.",
                meaning: "thức khuya",
                example: "Many students <strong>stay up late</strong> watching videos."
              },
              {
                word: "waste time",
                ipa: "/weɪst taɪm/",
                pos: "v. phr.",
                meaning: "lãng phí thời gian",
                example: "Checking apps every five minutes can <strong>waste time</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu khẳng định - Definitely + glued to their screens)",
                text: "Nhiều người dán mắt vào màn hình (glued to their screens), điều này ảnh hưởng xấu đến nhịp sinh hoạt (daily routine)."
              },
              {
                label: "E (Ví dụ + tái sử dụng 'feel sluggish')",
                text: "Lướt video khuya làm hỏng giấc ngủ (ruin their sleep) và khiến họ uể oải (feel sluggish) sáng hôm sau."
              },
              {
                label: "Lời khuyên kết câu (Tái sử dụng 'take a break')",
                text: "Mọi người nên tạm nghỉ dùng điện thoại một chút."
              }
            ],
            modelAnswer:
              "<strong>Definitely</strong>, many people are <strong>glued to their screens</strong>, <strong>which</strong> badly affects their <strong>daily routine</strong>. For example, scrolling through videos late at night can <strong>ruin their sleep</strong> and make them <strong>feel sluggish</strong> the next morning. Everyone should <strong>take a break</strong> from phones.",
            vocab: [
              {
                word: "glued to their screens",
                ipa: "/ɡluːd tuː ðer skriːnz/",
                pos: "adj. phr.",
                meaning: "dán mắt vào màn hình",
                example: "Many people sit on the bus <strong>glued to their screens</strong>."
              },
              {
                word: "daily routine",
                ipa: "/ˈdeɪli ruːˈtiːn/",
                pos: "n. phr.",
                meaning: "thói quen sinh hoạt hằng ngày",
                example: "Too much screen time badly affects our <strong>daily routine</strong>."
              },
              {
                word: "ruin their sleep",
                ipa: "/ˈruːɪn ðer sliːp/",
                pos: "v. phr.",
                meaning: "làm hỏng giấc ngủ của họ",
                example: "Checking phones in bed can <strong>ruin their sleep</strong>."
              },
              {
                word: "feel sluggish",
                ipa: "/fiːl ˈslʌɡɪʃ/",
                pos: "v. phr.",
                meaning: "cảm thấy uể oải, chậm chạp",
                example: "Sleeping late makes me <strong>feel sluggish</strong> the next morning."
              },
              {
                word: "take a break",
                ipa: "/teɪk ə breɪk/",
                pos: "v. phr.",
                meaning: "tạm nghỉ, ngưng một lát",
                example: "Everyone should <strong>take a break</strong> from screens at dinner."
              },
              {
                word: "screen addiction",
                ipa: "/skriːn əˈdɪkʃn/",
                pos: "n. phr.",
                meaning: "chứng nghiện màn hình / điện thoại",
                example: "<strong>Screen addiction</strong> is becoming common among teenagers."
              },
              {
                word: "real-life interaction",
                ipa: "/ˈriːəl laɪf ˌɪntərˈækʃn/",
                pos: "n. phr.",
                meaning: "sự tương tác ngoài đời thực",
                example: "Phones reduce <strong>real-life interaction</strong> at family meals."
              },
              {
                word: "limit screen time",
                ipa: "/ˈlɪmɪt skriːn taɪm/",
                pos: "v. phr.",
                meaning: "hạn chế thời gian dùng màn hình",
                example: "I try to <strong>limit screen time</strong> before going to bed."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 08: EMAIL
  // ==========================================================================
  {
    id: "topic-email",
    number: "08",
    title: "Email",
    titleVi: "Thư điện tử & Giao tiếp trực tuyến",
    description:
      "Luyện 3 câu hỏi về tần suất kiểm tra email, lựa chọn giữa email và ứng dụng nhắn tin, cùng các loại email bạn thường nhận nhất.",
    questionsCount: 3,
    questions: [
      {
        id: "email_q1",
        num: 1,
        prompt: "How often do you check your email?",
        analysis: {
          questionType: "Câu hỏi tần suất ('How often...'). Áp dụng công thức A-R-E (Frequency + Reason → Example → Feeling/Result).",
          tense: "Hiện tại đơn ('I usually check...' hoặc 'Actually, I tend to...').",
          length: "3 câu ngắn gọn (~34–38 từ), dùng tình huống nhận bài tập và thông báo thi từ giáo viên."
        },
        pitfalls: [
          "Quên cụm tần suất rõ ràng như 'once a day', 'twice a day', 'every evening'.",
          "Dùng 'see my email' thay vì cụm tự nhiên 'check my email' / 'check my inbox'.",
          "Quên 'to' trong 'want to miss' hoặc quên '-s' trong 'gives me'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Tần suất + Lý do)",
                text: "I usually check my email once a day because I do not want to miss important news."
              },
              {
                label: "E (Ví dụ thực tế ở trường - For example)",
                text: "For example, my teachers send homework and exam dates by email."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'feel ready')",
                text: "Checking it every evening helps me feel ready."
              }
            ],
            modelAnswer:
              "I usually <strong>check my email</strong> once a day because I do not want to <strong>miss important news</strong>. For example, my teachers send homework and <strong>exam dates</strong> by email. Checking it every evening helps me <strong>feel ready</strong>.",
            vocab: [
              {
                word: "check my email",
                ipa: "/tʃek maɪ ˈiːmeɪl/",
                pos: "v. phr.",
                meaning: "kiểm tra thư điện tử",
                example: "I usually <strong>check my email</strong> once a day after dinner."
              },
              {
                word: "miss important news",
                ipa: "/mɪs ɪmˈpɔːrtnt nuːz/",
                pos: "v. phr.",
                meaning: "bỏ lỡ tin tức quan trọng",
                example: "I check my phone so I do not <strong>miss important news</strong>."
              },
              {
                word: "exam dates",
                ipa: "/ɪɡˈzæm deɪts/",
                pos: "n. phr.",
                meaning: "ngày thi, lịch thi",
                example: "My teachers send homework and <strong>exam dates</strong> by email."
              },
              {
                word: "feel ready",
                ipa: "/fiːl ˈredi/",
                pos: "v. phr.",
                meaning: "cảm thấy sẵn sàng",
                example: "Reading class updates helps me <strong>feel ready</strong>."
              },
              {
                word: "once a day",
                ipa: "/wʌns ə deɪ/",
                pos: "adv. phr.",
                meaning: "một lần một ngày",
                example: "I open my email app <strong>once a day</strong>."
              },
              {
                word: "twice a day",
                ipa: "/twaɪs ə deɪ/",
                pos: "adv. phr.",
                meaning: "hai lần một ngày",
                example: "During exam week, I check my mail <strong>twice a day</strong>."
              },
              {
                word: "reply quickly",
                ipa: "/rɪˈplaɪ ˈkwɪkli/",
                pos: "v. phr.",
                meaning: "trả lời nhanh chóng",
                example: "I try to <strong>reply quickly</strong> when my teacher emails me."
              },
              {
                word: "school updates",
                ipa: "/skuːl ˈʌpdeɪts/",
                pos: "n. phr.",
                meaning: "các thông báo mới của trường",
                example: "Checking email keeps me up to date with <strong>school updates</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Actually, I tend to... + stay organized)",
                text: "Kiểm tra hộp thư đến (inbox) hai lần mỗi ngày để làm việc gọn gàng, ngăn nắp (stay organized)."
              },
              {
                label: "E (Ví dụ tái sử dụng 'tight deadlines')",
                text: "Xem qua vào buổi sáng để không bỏ lỡ hạn chót gấp (tight deadlines) hoặc thông báo lớp học."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'peace of mind')",
                text: "Cập nhật kịp thời mang lại sự yên tâm thực sự (peace of mind)."
              }
            ],
            modelAnswer:
              "<strong>Actually, I tend to</strong> check my <strong>inbox</strong> twice a day to <strong>stay organized</strong>. For example, I always look through it in the morning so I never miss <strong>tight deadlines</strong> or class notices. Staying updated gives me real <strong>peace of mind</strong>.",
            vocab: [
              {
                word: "inbox",
                ipa: "/ˈɪnbɒks/",
                pos: "n.",
                meaning: "hộp thư đến",
                example: "I check my <strong>inbox</strong> every morning and evening."
              },
              {
                word: "stay organized",
                ipa: "/steɪ ˈɔːrɡənaɪzd/",
                pos: "v. phr.",
                meaning: "giữ mọi thứ ngăn nắp, có kế hoạch",
                example: "Checking mail twice a day helps me <strong>stay organized</strong>."
              },
              {
                word: "tight deadlines",
                ipa: "/taɪt ˈdedlaɪnz/",
                pos: "n. phr.",
                meaning: "những hạn chót công việc gấp",
                example: "I check email early so I never miss <strong>tight deadlines</strong>."
              },
              {
                word: "peace of mind",
                ipa: "/piːs əv maɪnd/",
                pos: "n. phr.",
                meaning: "cảm giác an tâm",
                example: "Clearing unread messages gives me real <strong>peace of mind</strong>."
              },
              {
                word: "class notices",
                ipa: "/klæs ˈnoʊtɪsɪz/",
                pos: "n. phr.",
                meaning: "thông báo của lớp học",
                example: "Important <strong>class notices</strong> always arrive by email."
              },
              {
                word: "stay updated",
                ipa: "/steɪ ˌʌpˈdeɪtɪd/",
                pos: "v. phr.",
                meaning: "luôn cập nhật thông tin mới",
                example: "Checking messages daily helps me <strong>stay updated</strong>."
              },
              {
                word: "turn on notifications",
                ipa: "/tɜːrn ɒn ˌnoʊtɪfɪˈkeɪʃnz/",
                pos: "v. phr.",
                meaning: "bật thông báo",
                example: "I <strong>turn on notifications</strong> for my school email."
              },
              {
                word: "look through",
                ipa: "/lʊk θruː/",
                pos: "phr. v.",
                meaning: "xem lướt qua, kiểm tra qua",
                example: "I <strong>look through</strong> new emails during breakfast."
              }
            ]
          }
        }
      },
      {
        id: "email_q2",
        num: 2,
        prompt: "Do you prefer email or messaging apps? Why?",
        analysis: {
          questionType: "Câu hỏi lựa chọn ('Do you prefer... or... Why?'). Áp dụng A-R-E (Choice + Reason → Example → Feeling/Contrast).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~33–39 từ), so sánh Zalo/Messenger với email."
        },
        pitfalls: [
          "Quên dùng so sánh hơn đúng dạng ('faster than', 'more convenient', không nói 'more fast').",
          "Lặp lại câu 'I prefer messaging apps' mà thiếu giải thích 'Why?' và ví dụ cụ thể.",
          "Quên '-s' trong 'messaging apps', 'friends', 'photos'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Chọn ứng dụng nhắn tin + Lý do nhanh hơn)",
                text: "I prefer messaging apps like Zalo because they are much faster than email."
              },
              {
                label: "E (Ví dụ quen thuộc - For example)",
                text: "Nhắn tin và gửi ảnh trong vài giây: For example, I can quickly text my friends and send photos in seconds."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'easy and fun')",
                text: "They make chatting with people easy and fun."
              }
            ],
            modelAnswer:
              "I <strong>prefer</strong> <strong>messaging apps</strong> like Zalo because they are much faster than email. For example, I can quickly text my friends and send photos in seconds. They make chatting with people <strong>easy and fun</strong>.",
            vocab: [
              {
                word: "prefer",
                ipa: "/prɪˈfɜːr/",
                pos: "v.",
                meaning: "thích hơn",
                example: "I <strong>prefer</strong> messaging apps like Zalo for daily chats."
              },
              {
                word: "messaging apps",
                ipa: "/ˈmesɪdʒɪŋ æps/",
                pos: "n. phr.",
                meaning: "các ứng dụng nhắn tin",
                example: "<strong>Messaging apps</strong> are much faster than email."
              },
              {
                word: "easy and fun",
                ipa: "/ˈiːzi ænd fʌn/",
                pos: "adj. phr.",
                meaning: "dễ dàng và vui vẻ",
                example: "Stickers make chatting with friends <strong>easy and fun</strong>."
              },
              {
                word: "faster than",
                ipa: "/ˈfæstər ðæn/",
                pos: "phr.",
                meaning: "nhanh hơn",
                example: "Sending a quick message is <strong>faster than</strong> writing an email."
              },
              {
                word: "send photos",
                ipa: "/send ˈfoʊtoʊz/",
                pos: "v. phr.",
                meaning: "gửi hình ảnh",
                example: "We can <strong>send photos</strong> and videos in seconds."
              },
              {
                word: "in seconds",
                ipa: "/ɪn ˈsekəndz/",
                pos: "adv. phr.",
                meaning: "chỉ trong vài giây",
                example: "Friends usually reply to my texts <strong>in seconds</strong>."
              },
              {
                word: "group chat",
                ipa: "/ɡruːp tʃæt/",
                pos: "n. phr.",
                meaning: "nhóm chat",
                example: "Our class has a <strong>group chat</strong> on Zalo."
              },
              {
                word: "voice message",
                ipa: "/vɔɪs ˈmesɪdʒ/",
                pos: "n. phr.",
                meaning: "tin nhắn thoại",
                example: "When I am busy, I send a short <strong>voice message</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu Dạng 3 - Honestly, I usually go for... + convenient)",
                text: "Chọn ứng dụng nhắn tin vì thuận tiện hơn nhiều cho các cuộc trò chuyện nhanh."
              },
              {
                label: "E (Ví dụ tái sử dụng 'close friends', 'hang out')",
                text: "Dùng Zalo nhắn bạn thân hẹn đi chơi, trong khi ('whereas') email hợp hơn cho các dự án quan trọng (important projects)."
              },
              {
                label: "Lưu ý cấu trúc tương phản",
                text: "Dùng mệnh đề tương phản ', whereas email feels better...' để ghi điểm ngữ pháp B2."
              }
            ],
            modelAnswer:
              "<strong>Honestly, I usually go for</strong> <strong>messaging apps</strong> because they are much more <strong>convenient</strong> for quick chats. For example, I use Zalo to reach <strong>close friends</strong> and arrange plans to <strong>hang out</strong>, <strong>whereas</strong> email feels better for <strong>important projects</strong> at school.",
            vocab: [
              {
                word: "usually go for",
                ipa: "/ˈjuːʒuəli ɡoʊ fɔːr/",
                pos: "v. phr.",
                meaning: "thường chọn",
                example: "<strong>I usually go for</strong> messaging apps for everyday chats."
              },
              {
                word: "convenient",
                ipa: "/kənˈviːniənt/",
                pos: "adj.",
                meaning: "tiện lợi, thuận tiện",
                example: "Chat apps are much more <strong>convenient</strong> on the go."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "I message my <strong>close friends</strong> on Zalo every evening."
              },
              {
                word: "hang out",
                ipa: "/hæŋ aʊt/",
                pos: "phr. v.",
                meaning: "đi chơi, tụ tập",
                example: "We quickly arrange plans to <strong>hang out</strong> on weekends."
              },
              {
                word: "whereas",
                ipa: "/ˌwerˈæz/",
                pos: "conj.",
                meaning: "trong khi đó (dùng để so sánh đối lập)",
                example: "Zalo is casual, <strong>whereas</strong> email is more formal."
              },
              {
                word: "important projects",
                ipa: "/ɪmˈpɔːrtnt ˈprɒdʒekts/",
                pos: "n. phr.",
                meaning: "các dự án quan trọng",
                example: "Email feels better for <strong>important projects</strong> at school."
              },
              {
                word: "formal communication",
                ipa: "/ˈfɔːrml kəˌmjuːnɪˈkeɪʃn/",
                pos: "n. phr.",
                meaning: "giao tiếp trang trọng",
                example: "Email is still the best choice for <strong>formal communication</strong>."
              },
              {
                word: "instant reply",
                ipa: "/ˈɪnstənt rɪˈplaɪ/",
                pos: "n. phr.",
                meaning: "câu trả lời ngay lập tức",
                example: "Messaging apps are great when you need an <strong>instant reply</strong>."
              }
            ]
          }
        }
      },
      {
        id: "email_q3",
        num: 3,
        prompt: "What kind of emails do you receive most?",
        analysis: {
          questionType: "Câu hỏi liệt kê loại hình ('What kind of emails...'). Áp dụng A-R-E (Main types → Specific examples → Reaction/Result).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~33–38 từ), gắn với email trường học và thư quảng cáo giảm giá."
        },
        pitfalls: [
          "Dùng sai dạng 'emails' đếm được số nhiều (quên '-s' trong 'school emails', 'promotional emails').",
          "Dùng nhầm 'receives' khi chủ ngữ là 'I' (đúng: 'I mostly receive...').",
          "Chỉ nêu tên 1 loại email mà không có ví dụ nội dung bên trong."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (2 loại email nhận nhiều nhất)",
                text: "I mostly receive school emails and store ads every week."
              },
              {
                label: "E (Ví dụ thực tế - tái sử dụng 'save money')",
                text: "Giáo viên gửi tài liệu học và các shop gửi mã giảm giá: For example, my teachers send study files, and online shops send discount codes to help me save money."
              },
              {
                label: "Kết quả / Thói quen chốt câu",
                text: "I only read the useful ones."
              }
            ],
            modelAnswer:
              "I mostly receive <strong>school emails</strong> and <strong>store ads</strong> every week. For example, my teachers send study files, and online shops send <strong>discount codes</strong> to help me <strong>save money</strong>. I only read the useful ones.",
            vocab: [
              {
                word: "school emails",
                ipa: "/skuːl ˈiːmeɪlz/",
                pos: "n. phr.",
                meaning: "email từ trường học",
                example: "I mostly receive <strong>school emails</strong> on weekdays."
              },
              {
                word: "store ads",
                ipa: "/stɔːr ædz/",
                pos: "n. phr.",
                meaning: "thư quảng cáo từ cửa hàng",
                example: "My inbox gets a lot of <strong>store ads</strong> every week."
              },
              {
                word: "discount codes",
                ipa: "/ˈdɪskaʊnt koʊdz/",
                pos: "n. phr.",
                meaning: "mã giảm giá",
                example: "Online shops send <strong>discount codes</strong> by email."
              },
              {
                word: "save money",
                ipa: "/seɪv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm tiền",
                example: "Using a voucher helps me <strong>save money</strong> on clothes."
              },
              {
                word: "study files",
                ipa: "/ˈstʌdi faɪlz/",
                pos: "n. phr.",
                meaning: "tài liệu học tập",
                example: "Teachers often send <strong>study files</strong> before class."
              },
              {
                word: "online shops",
                ipa: "/ˈɒnlaɪn ʃɒps/",
                pos: "n. phr.",
                meaning: "các cửa hàng trực tuyến",
                example: "Many <strong>online shops</strong> send sales news every weekend."
              },
              {
                word: "delete spam",
                ipa: "/dɪˈliːt spæm/",
                pos: "v. phr.",
                meaning: "xóa thư rác",
                example: "I always <strong>delete spam</strong> so my inbox stays clean."
              },
              {
                word: "useful messages",
                ipa: "/ˈjuːsfl ˈmesɪdʒɪz/",
                pos: "n. phr.",
                meaning: "những tin nhắn hữu ích",
                example: "I keep all <strong>useful messages</strong> in a special folder."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu tự nhiên - To be honest + inbox + promotional emails)",
                text: "Thú thật là hộp thư đến (inbox) chủ yếu toàn email khuyến mãi (promotional emails) và thông báo của trường."
              },
              {
                label: "E (Ví dụ cụ thể - For example)",
                text: "Các ứng dụng mua sắm liên tục gửi thông báo giảm giá (discount alerts)."
              },
              {
                label: "Kết quả (, which... + inconvenient)",
                text: "Điều này khá bất tiện (inconvenient) khi cần tìm tin quan trọng từ giáo viên."
              }
            ],
            modelAnswer:
              "<strong>To be honest,</strong> my <strong>inbox</strong> is mostly full of <strong>promotional emails</strong> and school notices. For example, shopping apps send constant <strong>discount alerts</strong>, <strong>which</strong> is quite <strong>inconvenient</strong> when I need to find an important message from my teacher.",
            vocab: [
              {
                word: "inbox",
                ipa: "/ˈɪnbɒks/",
                pos: "n.",
                meaning: "hộp thư đến",
                example: "My <strong>inbox</strong> gets crowded with ads every weekend."
              },
              {
                word: "promotional emails",
                ipa: "/prəˈmoʊʃənl ˈiːmeɪlz/",
                pos: "n. phr.",
                meaning: "email quảng cáo, tiếp thị",
                example: "I delete dozens of <strong>promotional emails</strong> every week."
              },
              {
                word: "discount alerts",
                ipa: "/ˈdɪskaʊnt əˈlɜːrts/",
                pos: "n. phr.",
                meaning: "thông báo giảm giá",
                example: "Shopping apps send constant <strong>discount alerts</strong>."
              },
              {
                word: "inconvenient",
                ipa: "/ˌɪnkənˈviːniənt/",
                pos: "adj.",
                meaning: "bất tiện, gây phiền",
                example: "Too much junk mail is really <strong>inconvenient</strong>."
              },
              {
                word: "junk mail",
                ipa: "/dʒʌŋk meɪl/",
                pos: "n. phr.",
                meaning: "thư rác",
                example: "I move annoying ads to the <strong>junk mail</strong> folder."
              },
              {
                word: "unsubscribe from",
                ipa: "/ˌʌnsəbˈskraɪb frɒm/",
                pos: "v. phr.",
                meaning: "hủy đăng ký nhận tin từ...",
                example: "Sometimes I <strong>unsubscribe from</strong> stores I never visit."
              },
              {
                word: "newsletters",
                ipa: "/ˈnuːzletərz/",
                pos: "n.",
                meaning: "bản tin định kỳ qua email",
                example: "I only keep English learning <strong>newsletters</strong>."
              },
              {
                word: "attachments",
                ipa: "/əˈtætʃmənts/",
                pos: "n.",
                meaning: "tệp đính kèm",
                example: "Class emails usually include PDF <strong>attachments</strong>."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 09: ADVERTISING
  // ==========================================================================
  {
    id: "topic-advertising",
    number: "09",
    title: "Advertising",
    titleVi: "Quảng cáo & Thói quen mua sắm",
    description:
      "Luyện 3 câu hỏi về việc chú ý đến quảng cáo xung quanh, nơi bạn thường thấy quảng cáo và trải nghiệm mua đồ vì bị thu hút bởi quảng cáo.",
    questionsCount: 3,
    questions: [
      {
        id: "ads_q1",
        num: 1,
        prompt: "Do you often notice advertisements around you?",
        analysis: {
          questionType: "Câu hỏi Yes/No về nhận thức hằng ngày ('Do you often notice...'). Áp dụng A-R-E (Yes + Reason → Street/Phone example → Reaction).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~33–38 từ), gắn với cảnh chạy xe máy đi học hoặc lướt mạng xã hội."
        },
        pitfalls: [
          "Dùng nhầm 'advertisement' số ít không mạo từ khi nói chung (đúng: 'advertisements are everywhere').",
          "Quên 'a' trong cụm 'ride a motorbike'.",
          "Đọc nhầm từ 'advertisements' (trọng âm 2: /ədˈvɜːrtɪsmənts/ hoặc ngắn gọn 'ads' /ædz/)."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Trả lời + Lý do)",
                text: "Yes, I do, because advertisements are everywhere in my city."
              },
              {
                label: "E (Ví dụ thực tế - tái sử dụng 'ride a motorbike')",
                text: "For example, I see big signs on the street when I ride a motorbike to school."
              },
              {
                label: "Kết quả / Cảm nhận",
                text: "Some funny ads always catch my eye."
              }
            ],
            modelAnswer:
              "Yes, I do, because <strong>advertisements</strong> are everywhere in my city. For example, I see big signs on the street when I <strong>ride a motorbike</strong> to school. Some funny ads always <strong>catch my eye</strong>.",
            vocab: [
              {
                word: "advertisements",
                ipa: "/ədˈvɜːrtɪsmənts/",
                pos: "n.",
                meaning: "các mẩu quảng cáo",
                example: "Colorful <strong>advertisements</strong> are everywhere in my city."
              },
              {
                word: "ride a motorbike",
                ipa: "/raɪd ə ˈmoʊtərbaɪk/",
                pos: "v. phr.",
                meaning: "chạy xe máy",
                example: "I see huge signs when I <strong>ride a motorbike</strong> to school."
              },
              {
                word: "catch my eye",
                ipa: "/kætʃ maɪ aɪ/",
                pos: "v. phr.",
                meaning: "thu hút ánh nhìn của tôi",
                example: "Funny posters always <strong>catch my eye</strong> at traffic lights."
              },
              {
                word: "big signs",
                ipa: "/bɪɡ saɪnz/",
                pos: "n. phr.",
                meaning: "những tấm biển lớn",
                example: "There are <strong>big signs</strong> above many shops downtown."
              },
              {
                word: "on the street",
                ipa: "/ɒn ðə striːt/",
                pos: "adv. phr.",
                meaning: "trên đường phố",
                example: "You can see coffee ads <strong>on the street</strong> every morning."
              },
              {
                word: "funny ads",
                ipa: "/ˈfʌni ædz/",
                pos: "n. phr.",
                meaning: "những quảng cáo hài hước",
                example: "People love sharing <strong>funny ads</strong> with their friends."
              },
              {
                word: "bright colors",
                ipa: "/braɪt ˈkʌlərz/",
                pos: "n. phr.",
                meaning: "màu sắc tươi sáng, nổi bật",
                example: "Good posters use <strong>bright colors</strong> to get attention."
              },
              {
                word: "new products",
                ipa: "/nuː ˈprɒdʌkts/",
                pos: "n. phr.",
                meaning: "các sản phẩm mới",
                example: "Ads help us learn about <strong>new products</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu khẳng định - Definitely + daily routine)",
                text: "Chắc chắn rồi, gần như không thể phớt lờ quảng cáo trong nhịp sinh hoạt hằng ngày (daily routine)."
              },
              {
                label: "E (Ví dụ kết hợp social media & đường phố)",
                text: "Khi lướt mạng xã hội (social media) hoặc đi dạo trung tâm, áp phích bắt mắt (eye-catching) hiện ra khắp nơi (pop up)."
              },
              {
                label: "Cảm nhận (Honestly + enjoyable)",
                text: "Thú thật một số quảng cáo sáng tạo xem cũng khá thú vị (enjoyable)."
              }
            ],
            modelAnswer:
              "<strong>Definitely</strong>, it is almost impossible to ignore ads in our <strong>daily routine</strong>. For example, whenever I scroll through <strong>social media</strong> or walk downtown, <strong>eye-catching</strong> posters <strong>pop up</strong> everywhere. Honestly, some creative ones are quite <strong>enjoyable</strong> to watch.",
            vocab: [
              {
                word: "daily routine",
                ipa: "/ˈdeɪli ruːˈtiːn/",
                pos: "n. phr.",
                meaning: "nhịp sinh hoạt hằng ngày",
                example: "We bump into ads everywhere in our <strong>daily routine</strong>."
              },
              {
                word: "social media",
                ipa: "/ˈsoʊʃl ˈmiːdiə/",
                pos: "n. phr.",
                meaning: "mạng xã hội",
                example: "Brands put short ads all over <strong>social media</strong>."
              },
              {
                word: "eye-catching",
                ipa: "/ˈaɪ kætʃɪŋ/",
                pos: "adj.",
                meaning: "bắt mắt, thu hút ánh nhìn",
                example: "Companies design <strong>eye-catching</strong> posters near malls."
              },
              {
                word: "pop up",
                ipa: "/pɒp ʌp/",
                pos: "phr. v.",
                meaning: "bất ngờ hiện ra, xuất hiện",
                example: "Banner ads <strong>pop up</strong> whenever I open an app."
              },
              {
                word: "enjoyable",
                ipa: "/ɪnˈdʒɔɪəbl/",
                pos: "adj.",
                meaning: "thú vị, dễ chịu",
                example: "Creative holiday commercials are actually quite <strong>enjoyable</strong>."
              },
              {
                word: "impossible to ignore",
                ipa: "/ɪmˈpɒsəbl tuː ɪɡˈnɔːr/",
                pos: "adj. phr.",
                meaning: "không thể ngó lơ / bỏ qua",
                example: "Bright screens at traffic stops are <strong>impossible to ignore</strong>."
              },
              {
                word: "catchy music",
                ipa: "/ˈkætʃi ˈmjuːzɪk/",
                pos: "n. phr.",
                meaning: "nhạc quảng cáo bắt tai",
                example: "Many drink ads use <strong>catchy music</strong>."
              },
              {
                word: "target young people",
                ipa: "/ˈtɑːrɡɪt jʌŋ ˈpiːpl/",
                pos: "v. phr.",
                meaning: "nhắm tới giới trẻ",
                example: "Most snack commercials <strong>target young people</strong>."
              }
            ]
          }
        }
      },
      {
        id: "ads_q2",
        num: 2,
        prompt: "Where do you usually see or hear advertisements?",
        analysis: {
          questionType: "Câu hỏi nơi chốn & thói quen ('Where do you usually...'). Áp dụng A-R-E (Main places + Reason → Specific example → Extra place/Feeling).",
          tense: "Hiện tại đơn.",
          length: "3 câu ngắn gọn (~35–39 từ), nhắc cả kênh online (TikTok/YouTube) lẫn ngoài đời (biển quảng cáo, radio trên taxi)."
        },
        pitfalls: [
          "Dùng sai giới từ với nền tảng mạng xã hội (đúng: 'on TikTok and YouTube', 'on online platforms', không dùng 'in YouTube').",
          "Quên trả lời cả vế 'or hear' (có thể nhắc nhạc/giọng nói video hoặc radio trên taxi).",
          "Quên '-s' trong 'billboards', 'platforms', 'ads'."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + R (Nơi thấy nhiều nhất + Lý do)",
                text: "I usually see ads on TikTok and YouTube because I use my phone every day."
              },
              {
                label: "E (Ví dụ quen thuộc - For example)",
                text: "Quảng cáo ngắn chạy trước video nhạc: For example, short ads often play before my music videos."
              },
              {
                label: "Mở rộng ngoài trời (Tái sử dụng 'go outside')",
                text: "Thấy thêm biển quảng cáo lớn khi ra ngoài: I also see big billboards when I go outside."
              }
            ],
            modelAnswer:
              "I usually see ads on <strong>TikTok and YouTube</strong> because I use my phone every day. For example, short ads often play before my music videos. I also see big <strong>billboards</strong> when I <strong>go outside</strong>.",
            vocab: [
              {
                word: "TikTok and YouTube",
                ipa: "/ˈtɪktɒk ænd ˈjuːtuːb/",
                pos: "n. phr.",
                meaning: "nền tảng TikTok và YouTube",
                example: "I usually see video ads on <strong>TikTok and YouTube</strong>."
              },
              {
                word: "billboards",
                ipa: "/ˈbɪlbɔːrdz/",
                pos: "n.",
                meaning: "biển quảng cáo cỡ lớn ngoài trời",
                example: "There are tall <strong>billboards</strong> along main streets."
              },
              {
                word: "go outside",
                ipa: "/ɡoʊ ˈaʊtsaɪd/",
                pos: "v. phr.",
                meaning: "đi ra ngoài",
                example: "I see posters at bus stops when I <strong>go outside</strong>."
              },
              {
                word: "music videos",
                ipa: "/ˈmjuːzɪk ˈvɪdioʊz/",
                pos: "n. phr.",
                meaning: "các video ca nhạc",
                example: "Short ads always play before my <strong>music videos</strong>."
              },
              {
                word: "on TV",
                ipa: "/ɒn ˌtiːˈviː/",
                pos: "adv. phr.",
                meaning: "trên truyền hình",
                example: "My parents still see many commercials <strong>on TV</strong>."
              },
              {
                word: "on the radio",
                ipa: "/ɒn ðə ˈreɪdioʊ/",
                pos: "adv. phr.",
                meaning: "trên đài phát thanh",
                example: "Drivers often hear local ads <strong>on the radio</strong>."
              },
              {
                word: "shopping malls",
                ipa: "/ˈʃɒpɪŋ mɔːlz/",
                pos: "n. phr.",
                meaning: "các trung tâm thương mại",
                example: "Big <strong>shopping malls</strong> play video ads on huge screens."
              },
              {
                word: "skip the ad",
                ipa: "/skɪp ði æd/",
                pos: "v. phr.",
                meaning: "bỏ qua quảng cáo",
                example: "I usually wait five seconds to <strong>skip the ad</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + R (Mở đầu tự nhiên - Well, I tend to...)",
                text: "Thường thấy nhất trên các nền tảng trực tuyến (online platforms) như YouTube, TikTok vì hay dành thời gian rảnh ở đó."
              },
              {
                label: "E (Ví dụ + tái sử dụng 'inconvenient')",
                text: "Quảng cáo video bất ngờ chen giữa video (pop up mid-video), điều đó khá bất tiện (inconvenient)."
              },
              {
                label: "Bổ sung vế 'hear'",
                text: "Thỉnh thoảng còn nghe quảng cáo radio khi đi taxi."
              }
            ],
            modelAnswer:
              "<strong>Well, I tend to</strong> see ads most on <strong>online platforms</strong> like YouTube and TikTok because I spend my free time there. For example, video ads often <strong>pop up</strong> mid-video, <strong>which</strong> feels quite <strong>inconvenient</strong>. Sometimes I also hear radio ads in taxis.",
            vocab: [
              {
                word: "online platforms",
                ipa: "/ˈɒnlaɪn ˈplætfɔːrmz/",
                pos: "n. phr.",
                meaning: "các nền tảng trực tuyến",
                example: "Brands spend a lot on <strong>online platforms</strong> like TikTok."
              },
              {
                word: "pop up",
                ipa: "/pɒp ʌp/",
                pos: "phr. v.",
                meaning: "bật lên, chen ngang bất ngờ",
                example: "Video ads often <strong>pop up</strong> right in the middle of a song."
              },
              {
                word: "inconvenient",
                ipa: "/ˌɪnkənˈviːniənt/",
                pos: "adj.",
                meaning: "bất tiện, gây gián đoạn",
                example: "Long ads before a short clip feel really <strong>inconvenient</strong>."
              },
              {
                word: "radio ads",
                ipa: "/ˈreɪdioʊ ædz/",
                pos: "n. phr.",
                meaning: "quảng cáo trên đài phát thanh",
                example: "Passengers often hear <strong>radio ads</strong> inside taxis."
              },
              {
                word: "sponsored posts",
                ipa: "/ˈspɒnsərd poʊsts/",
                pos: "n. phr.",
                meaning: "bài đăng được tài trợ (quảng cáo)",
                example: "My feed shows many <strong>sponsored posts</strong> every day."
              },
              {
                word: "livestream sales",
                ipa: "/ˈlaɪvstriːm seɪlz/",
                pos: "n. phr.",
                meaning: "buổi phát trực tiếp bán hàng",
                example: "<strong>Livestream sales</strong> are a huge trend in Vietnam."
              },
              {
                word: "interrupt",
                ipa: "/ˌɪntəˈrʌpt/",
                pos: "v.",
                meaning: "làm gián đoạn",
                example: "Too many commercials <strong>interrupt</strong> my favorite shows."
              },
              {
                word: "outdoor billboards",
                ipa: "/ˈaʊtdɔːr ˈbɪlbɔːrdz/",
                pos: "n. phr.",
                meaning: "biển quảng cáo ngoài trời",
                example: "Huge <strong>outdoor billboards</strong> light up city streets at night."
              }
            ]
          }
        }
      },
      {
        id: "ads_q3",
        num: 3,
        prompt: "Have you ever bought something because of an advertisement?",
        analysis: {
          questionType: "Câu hỏi trải nghiệm quá khứ ('Have you ever bought...'). Áp dụng A-R-E kể lại 1 lần mua đồ gần đây.",
          tense: "Hiện tại hoàn thành mở đầu ('Yes, I have.') + Quá khứ đơn kể chuyện ('bought', 'had', 'arrived', 'felt', 'turned out').",
          length: "3 câu ngắn gọn (~33–38 từ), dùng món đồ quen thuộc như ốp điện thoại hoặc sạc dự phòng."
        },
        pitfalls: [
          "Quên chuyển sang Quá khứ đơn khi kể thời điểm cụ thể ('Last month, I buy...' → sai; đúng: 'Last month, I bought...').",
          "Quên mạo từ 'a' trước danh từ đếm được số ít ('a phone case', 'a big discount', 'a portable charger').",
          "Chia sai quá khứ của 'feel' thành 'feeled' (đúng: 'felt')."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A + E (Trả lời thẳng + Món đồ đã mua tháng trước)",
                text: "Yes, I have. Last month, I bought a phone case after seeing a fun ad on TikTok."
              },
              {
                label: "R (Lý do mua - tái sử dụng 'save money')",
                text: "Có giảm giá lớn nên tiết kiệm được tiền: It had a big discount, so I could save money."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'feel very happy' ở quá khứ)",
                text: "When it arrived, I felt very happy."
              }
            ],
            modelAnswer:
              "Yes, I have. Last month, I bought a <strong>phone case</strong> after seeing a fun ad on TikTok. It had a <strong>big discount</strong>, so I could <strong>save money</strong>. When it arrived, I <strong>felt very happy</strong>.",
            vocab: [
              {
                word: "phone case",
                ipa: "/foʊn keɪs/",
                pos: "n. phr.",
                meaning: "ốp lưng điện thoại",
                example: "Last month, I bought a cute <strong>phone case</strong> online."
              },
              {
                word: "big discount",
                ipa: "/bɪɡ ˈdɪskaʊnt/",
                pos: "n. phr.",
                meaning: "mức giảm giá lớn",
                example: "The shop offered a <strong>big discount</strong> on weekends."
              },
              {
                word: "save money",
                ipa: "/seɪv ˈmʌni/",
                pos: "v. phr.",
                meaning: "tiết kiệm tiền",
                example: "Buying during a sale helped me <strong>save money</strong>."
              },
              {
                word: "felt very happy",
                ipa: "/felt ˈveri ˈhæpi/",
                pos: "v. phr.",
                meaning: "đã cảm thấy rất vui",
                example: "When the box arrived, I <strong>felt very happy</strong>."
              },
              {
                word: "buy online",
                ipa: "/baɪ ˈɒnlaɪn/",
                pos: "v. phr.",
                meaning: "mua hàng trực tuyến",
                example: "Young people often <strong>buy online</strong> after seeing videos."
              },
              {
                word: "free shipping",
                ipa: "/friː ˈʃɪpɪŋ/",
                pos: "n. phr.",
                meaning: "miễn phí vận chuyển",
                example: "The store gave me a <strong>free shipping</strong> ticket."
              },
              {
                word: "good quality",
                ipa: "/ɡʊd ˈkwɒləti/",
                pos: "n. phr.",
                meaning: "chất lượng tốt",
                example: "The product looked nice and had <strong>good quality</strong>."
              },
              {
                word: "special sale",
                ipa: "/ˈspeʃl seɪl/",
                pos: "n. phr.",
                meaning: "đợt giảm giá đặc biệt",
                example: "I ordered new shoes during a <strong>special sale</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A + E (Mở đầu tự nhiên - Yes, I have, actually + tái sử dụng 'portable charger')",
                text: "Tháng trước mình chốt mua (ended up buying) một cục sạc dự phòng sau khi xem quảng cáo TikTok rất thuyết phục (convincing)."
              },
              {
                label: "R (Lý do - tái sử dụng 'affordable')",
                text: "Giá rất phải chăng (affordable) khi dùng voucher."
              },
              {
                label: "Kết quả (, which... + a little reward)",
                text: "Cảm giác như một phần thưởng nhỏ (a little reward) và hóa ra (turned out) cực kỳ hữu ích."
              }
            ],
            modelAnswer:
              "<strong>Yes, I have, actually.</strong> Last month, I <strong>ended up buying</strong> a <strong>portable charger</strong> after seeing a <strong>convincing</strong> TikTok ad. It was really <strong>affordable</strong> with a voucher, <strong>which</strong> felt like <strong>a little reward</strong> and <strong>turned out</strong> super useful.",
            vocab: [
              {
                word: "ended up buying",
                ipa: "/ˈendɪd ʌp ˈbaɪɪŋ/",
                pos: "v. phr.",
                meaning: "cuối cùng đã quyết định mua",
                example: "I <strong>ended up buying</strong> a backpack after watching a review."
              },
              {
                word: "portable charger",
                ipa: "/ˈpɔːrtəbl ˈtʃɑːrdʒər/",
                pos: "n. phr.",
                meaning: "sạc dự phòng cầm tay",
                example: "I ordered a slim <strong>portable charger</strong> for my trips."
              },
              {
                word: "convincing",
                ipa: "/kənˈvɪnsɪŋ/",
                pos: "adj.",
                meaning: "có sức thuyết phục",
                example: "The short demo video looked very <strong>convincing</strong>."
              },
              {
                word: "affordable",
                ipa: "/əˈfɔːrdəbl/",
                pos: "adj.",
                meaning: "hợp túi tiền, giá phải chăng",
                example: "It was very <strong>affordable</strong> for students with a voucher."
              },
              {
                word: "a little reward",
                ipa: "/ə ˈlɪtl rɪˈwɔːrd/",
                pos: "n. phr.",
                meaning: "một phần thưởng nhỏ cho bản thân",
                example: "Buying something nice after exams feels like <strong>a little reward</strong>."
              },
              {
                word: "turned out",
                ipa: "/tɜːrnd aʊt/",
                pos: "phr. v.",
                meaning: "hóa ra, kết quả là",
                example: "The product <strong>turned out</strong> to be really durable."
              },
              {
                word: "impulse buy",
                ipa: "/ˈɪmpʌls baɪ/",
                pos: "n. phr.",
                meaning: "món đồ mua ngẫu hứng nhất thời",
                example: "Flash sales often lead to an <strong>impulse buy</strong>."
              },
              {
                word: "worth every penny",
                ipa: "/wɜːrθ ˈevri ˈpeni/",
                pos: "adj. phr.",
                meaning: "đáng đồng tiền bát gạo",
                example: "Luckily, the headphones were <strong>worth every penny</strong>."
              }
            ]
          }
        }
      }
    ]
  },

  // ==========================================================================
  // ĐỀ 10: YOUR BIGGEST ACHIEVEMENT
  // ==========================================================================
  {
    id: "topic-biggest-achievement",
    number: "10",
    title: "Your biggest achievement",
    titleVi: "Thành tựu lớn nhất của bản thân",
    description:
      "Luyện 3 câu hỏi về thành tựu lớn nhất bạn từng đạt được, cảm xúc khi đạt được điều đó và người hoặc yếu tố đã giúp bạn thành công.",
    questionsCount: 3,
    questions: [
      {
        id: "achievement_q1",
        num: 1,
        prompt: "What is the biggest achievement you have made so far?",
        analysis: {
          questionType: "Câu hỏi chia sẻ thành tựu cá nhân ('What is the biggest achievement...'). Áp dụng A-R-E (Achievement → Past effort example → Result/Feeling).",
          tense: "Hiện tại đơn giới thiệu thành tựu + Quá khứ đơn kể quá trình cố gắng ('had to study', 'changed').",
          length: "3 câu ngắn gọn (~36–39 từ), dùng mốc quen thuộc là thi đỗ đại học."
        },
        pitfalls: [
          "Dùng thiếu V-ing sau 'is' khi nói thành tựu là một việc làm ('My biggest achievement is pass' → sai; đúng: 'is passing...').",
          "Dùng nhầm 'go to outside' hoặc 'stay at home/stay home' sai giới từ.",
          "Quên chia quá khứ động từ khi kể lại nỗ lực trước kỳ thi ('had to...', 'changed')."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Thành tựu lớn nhất - thi đỗ đại học)",
                text: "My biggest achievement so far is passing my university entrance exam."
              },
              {
                label: "E (Ví dụ sự cố gắng - tái sử dụng 'study hard', 'stay home')",
                text: "I had to study hard every day and stay home on weekends to review."
              },
              {
                label: "Kết quả / Cảm xúc (Tái sử dụng 'feel very happy')",
                text: "Getting into my dream school made my parents feel very happy."
              }
            ],
            modelAnswer:
              "My <strong>biggest achievement</strong> so far is <strong>passing my university entrance exam</strong>. I had to <strong>study hard</strong> every day and <strong>stay home</strong> on weekends to review. Getting into my dream school made my parents <strong>feel very happy</strong>.",
            vocab: [
              {
                word: "biggest achievement",
                ipa: "/ˈbɪɡɪst əˈtʃiːvmənt/",
                pos: "n. phr.",
                meaning: "thành tựu lớn nhất",
                example: "My <strong>biggest achievement</strong> so far is passing a big exam."
              },
              {
                word: "passing my university entrance exam",
                ipa: "/ˈpæsɪŋ maɪ ˌjuːnɪˈvɜːrsəti ˈentrəns ɪɡˈzæm/",
                pos: "n. phr.",
                meaning: "thi đỗ kỳ thi tuyển sinh đại học",
                example: "<strong>Passing my university entrance exam</strong> made me proud."
              },
              {
                word: "study hard",
                ipa: "/ˈstʌdi hɑːrd/",
                pos: "v. phr.",
                meaning: "học tập chăm chỉ",
                example: "I had to <strong>study hard</strong> for many months."
              },
              {
                word: "stay home",
                ipa: "/steɪ hoʊm/",
                pos: "v. phr.",
                meaning: "ở nhà",
                example: "I chose to <strong>stay home</strong> on weekends to review lessons."
              },
              {
                word: "feel very happy",
                ipa: "/fiːl ˈveri ˈhæpi/",
                pos: "v. phr.",
                meaning: "cảm thấy rất vui",
                example: "Good news made my parents <strong>feel very happy</strong>."
              },
              {
                word: "dream school",
                ipa: "/driːm skuːl/",
                pos: "n. phr.",
                meaning: "ngôi trường mơ ước",
                example: "I worked hard to get into my <strong>dream school</strong>."
              },
              {
                word: "so far",
                ipa: "/soʊ fɑːr/",
                pos: "adv. phr.",
                meaning: "cho đến bây giờ",
                example: "That is the best result I have got <strong>so far</strong>."
              },
              {
                word: "get a certificate",
                ipa: "/ɡet ə sərˈtɪfɪkət/",
                pos: "v. phr.",
                meaning: "đạt được một chứng chỉ",
                example: "My next goal is to <strong>get a certificate</strong> in English."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu tự nhiên - I'd say + proudest achievement)",
                text: "I'd say my proudest achievement so far is getting into my dream university."
              },
              {
                label: "E (Ví dụ sự hy sinh - tái sử dụng 'tight deadlines', 'close friends')",
                text: "Phải xoay xở với hạn chót gấp và tạm gác việc đi chơi với bạn thân suốt nhiều tháng."
              },
              {
                label: "Kết quả / Ý nghĩa (Tái sử dụng 'meaningful')",
                text: "Đỗ kỳ thi đó thực sự ý nghĩa (meaningful) và thay đổi cuộc sống của mình."
              }
            ],
            modelAnswer:
              "<strong>I'd say</strong> my <strong>proudest achievement</strong> so far is <strong>getting into my dream university</strong>. I had to handle <strong>tight deadlines</strong> and give up going out with <strong>close friends</strong> for months. Passing that exam was truly <strong>meaningful</strong> and changed my life.",
            vocab: [
              {
                word: "proudest achievement",
                ipa: "/ˈpraʊdɪst əˈtʃiːvmənt/",
                pos: "n. phr.",
                meaning: "thành tựu đáng tự hào nhất",
                example: "Graduating with honors is my <strong>proudest achievement</strong>."
              },
              {
                word: "getting into my dream university",
                ipa: "/ˈɡetɪŋ ˈɪntuː maɪ driːm ˌjuːnɪˈvɜːrsəti/",
                pos: "n. phr.",
                meaning: "trúng tuyển vào trường đại học mơ ước",
                example: "<strong>Getting into my dream university</strong> took real effort."
              },
              {
                word: "tight deadlines",
                ipa: "/taɪt ˈdedlaɪnz/",
                pos: "n. phr.",
                meaning: "những hạn chót gấp gáp",
                example: "Students often handle <strong>tight deadlines</strong> before exams."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "I had less time to hang out with <strong>close friends</strong>."
              },
              {
                word: "meaningful",
                ipa: "/ˈmiːnɪŋfl/",
                pos: "adj.",
                meaning: "đầy ý nghĩa",
                example: "Receiving that scholarship was a <strong>meaningful</strong> moment."
              },
              {
                word: "pay off",
                ipa: "/peɪ ɒf/",
                pos: "phr. v.",
                meaning: "được đền đáp xứng đáng",
                example: "All my late nights finally <strong>paid off</strong>."
              },
              {
                word: "overcome challenges",
                ipa: "/ˌoʊvərˈkʌm ˈtʃælɪndʒɪz/",
                pos: "v. phr.",
                meaning: "vượt qua các thử thách",
                example: "Working hard taught me how to <strong>overcome challenges</strong>."
              },
              {
                word: "turning point",
                ipa: "/ˈtɜːrnɪŋ pɔɪnt/",
                pos: "n. phr.",
                meaning: "bước ngoặt quan trọng",
                example: "Entering university was a big <strong>turning point</strong> for me."
              }
            ]
          }
        }
      },
      {
        id: "achievement_q2",
        num: 2,
        prompt: "How did you feel when you achieved it?",
        analysis: {
          questionType: "Câu hỏi cảm xúc trong quá khứ ('How did you feel...'). Áp dụng A-R-E (Immediate feeling → Celebration example → Lasting result).",
          tense: "Quá khứ đơn xuyên suốt ('saw', 'felt', 'called', 'had', 'disappeared', 'gave').",
          length: "3 câu ngắn gọn (~35–39 từ), dùng cảm xúc tự nhiên và bữa ăn mừng cùng gia đình."
        },
        pitfalls: [
          "Lẫn lộn thì Hiện tại đơn và Quá khứ đơn ('When I see my score, I feel...' → sai; phải là 'saw... felt...').",
          "Nhầm danh từ 'pride' và tính từ 'proud' (đúng: 'felt really proud').",
          "Dùng 'celebrate a party' (đúng: 'celebrate' đi thẳng hoặc 'had tasty food together to celebrate')."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Cảm xúc đầu tiên khi xem điểm)",
                text: "When I saw my score, I felt really proud and excited."
              },
              {
                label: "E (Ví dụ ăn mừng - tái sử dụng 'tasty food')",
                text: "Gọi điện cho bố mẹ và cùng ăn món ngon: I called my parents right away, and we had tasty food together to celebrate."
              },
              {
                label: "Kết quả cảm xúc (Tái sử dụng 'feel relaxed' ở quá khứ)",
                text: "Lo lắng tan biến và cuối cùng thấy nhẹ nhõm: All my worry disappeared, and I finally felt relaxed."
              }
            ],
            modelAnswer:
              "When I saw my score, I felt <strong>really proud</strong> and excited. I called my parents right away, and we had <strong>tasty food</strong> together to celebrate. All my worry disappeared, and I finally <strong>felt relaxed</strong>.",
            vocab: [
              {
                word: "really proud",
                ipa: "/ˈriːəli praʊd/",
                pos: "adj. phr.",
                meaning: "thực sự tự hào",
                example: "When I saw my exam score, I felt <strong>really proud</strong>."
              },
              {
                word: "tasty food",
                ipa: "/ˈteɪsti fuːd/",
                pos: "n. phr.",
                meaning: "đồ ăn ngon",
                example: "My family had <strong>tasty food</strong> together to celebrate."
              },
              {
                word: "felt relaxed",
                ipa: "/felt rɪˈlækst/",
                pos: "v. phr.",
                meaning: "đã cảm thấy thư giãn, nhẹ nhõm",
                example: "After the exam ended, I finally <strong>felt relaxed</strong>."
              },
              {
                word: "excited",
                ipa: "/ɪkˈsaɪtɪd/",
                pos: "adj.",
                meaning: "phấn khích, hào hứng",
                example: "My classmates were super <strong>excited</strong> about the results."
              },
              {
                word: "right away",
                ipa: "/raɪt əˈweɪ/",
                pos: "adv. phr.",
                meaning: "ngay lập tức",
                example: "I texted my best friend <strong>right away</strong>."
              },
              {
                word: "celebrate",
                ipa: "/ˈselɪbreɪt/",
                pos: "v.",
                meaning: "ăn mừng, kỷ niệm",
                example: "We went out for dinner to <strong>celebrate</strong>."
              },
              {
                word: "good score",
                ipa: "/ɡʊd skɔːr/",
                pos: "n. phr.",
                meaning: "điểm số cao / tốt",
                example: "Studying every evening brought me a <strong>good score</strong>."
              },
              {
                word: "smile a lot",
                ipa: "/smaɪl ə lɒt/",
                pos: "v. phr.",
                meaning: "cười rất nhiều",
                example: "My mom started to <strong>smile a lot</strong> when I told her."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu tự nhiên - Honestly + over the moon + deeply relieved)",
                text: "Cảm thấy sung sướng tột độ (over the moon) và nhẹ nhõm sâu sắc (deeply relieved) khi có kết quả."
              },
              {
                label: "E (Ví dụ ăn mừng - tái sử dụng 'a little reward')",
                text: "Sau nhiều tháng áp lực, ăn mừng cùng gia đình giống như một phần thưởng nhỏ (a little reward)."
              },
              {
                label: "Kết quả (Tái sử dụng 'peace of mind' + boosted my confidence)",
                text: "Mang lại sự an tâm thực sự và tăng thêm tự tin (boosted my confidence)."
              }
            ],
            modelAnswer:
              "<strong>Honestly,</strong> I felt <strong>over the moon</strong> and deeply <strong>relieved</strong> when the result came out. After months of pressure, celebrating with my family felt like <strong>a little reward</strong>. It gave me real <strong>peace of mind</strong> and <strong>boosted my confidence</strong>.",
            vocab: [
              {
                word: "over the moon",
                ipa: "/ˈoʊvər ðə muːn/",
                pos: "idiom",
                meaning: "vui sướng tột độ",
                example: "I was <strong>over the moon</strong> when I saw my acceptance letter."
              },
              {
                word: "relieved",
                ipa: "/rɪˈliːvd/",
                pos: "adj.",
                meaning: "nhẹ nhõm, trút bỏ được lo âu",
                example: "Everyone felt deeply <strong>relieved</strong> after the final score came out."
              },
              {
                word: "a little reward",
                ipa: "/ə ˈlɪtl rɪˈwɔːrd/",
                pos: "n. phr.",
                meaning: "một phần thưởng nhỏ xứng đáng",
                example: "A cozy family dinner felt like <strong>a little reward</strong>."
              },
              {
                word: "peace of mind",
                ipa: "/piːs əv maɪnd/",
                pos: "n. phr.",
                meaning: "sự bình yên, nhẹ nhõm trong tâm trí",
                example: "Knowing I passed gave me real <strong>peace of mind</strong>."
              },
              {
                word: "boosted my confidence",
                ipa: "/ˈbuːstɪd maɪ ˈkɒnfɪdəns/",
                pos: "v. phr.",
                meaning: "làm tăng sự tự tin của tôi",
                example: "Reaching that goal <strong>boosted my confidence</strong> a lot."
              },
              {
                word: "months of pressure",
                ipa: "/mʌnθs əv ˈpreʃər/",
                pos: "n. phr.",
                meaning: "nhiều tháng chịu áp lực",
                example: "After <strong>months of pressure</strong>, I could finally rest."
              },
              {
                word: "unforgettable moment",
                ipa: "/ˌʌnfərˈɡetəbl ˈmoʊmənt/",
                pos: "n. phr.",
                meaning: "khoảnh khắc khó quên",
                example: "Hearing my mom cheer was an <strong>unforgettable moment</strong>."
              },
              {
                word: "worth the effort",
                ipa: "/wɜːrθ ði ˈefərt/",
                pos: "adj. phr.",
                meaning: "xứng đáng với công sức bỏ ra",
                example: "Seeing the good result made everything <strong>worth the effort</strong>."
              }
            ]
          }
        }
      },
      {
        id: "achievement_q3",
        num: 3,
        prompt: "Who or what helped you to reach that achievement?",
        analysis: {
          questionType: "Câu hỏi về người/yếu tố hỗ trợ trong quá khứ ('Who or what helped you...'). Áp dụng A-R-E (Key people → Specific actions example → Feeling/Result).",
          tense: "Quá khứ đơn ('helped', 'cooked', 'studied', 'made', 'guided', 'cheered').",
          length: "3 câu ngắn gọn (~34–39 từ), nhắc đến cha mẹ, thầy cô và bạn thân."
        },
        pitfalls: [
          "Quên 'to' hoặc V nguyên mẫu sau 'helped me' (đúng: 'helped me to reach' hoặc 'helped me reach').",
          "Chia sai quá khứ của 'study' (đúng: 'studied') hoặc 'make' (đúng: 'made').",
          "Chỉ nêu mỗi tên người ('My parents') mà thiếu ví dụ cụ thể họ đã làm gì."
        ],
        levels: {
          b1: {
            strategy: [
              {
                label: "A (Người giúp đỡ nhiều nhất)",
                text: "My parents and teachers helped me the most to reach my goal."
              },
              {
                label: "E (Ví dụ cụ thể của mẹ và bạn bè - For example)",
                text: "Mẹ nấu ăn ngon mỗi ngày, bạn bè cùng ôn bài trước kỳ thi: For example, my mom cooked healthy meals every day, and my friends studied with me before the exam."
              },
              {
                label: "Cảm xúc / Kết quả",
                text: "Sự ủng hộ của họ giúp mình tự tin: Their support made me feel confident."
              }
            ],
            modelAnswer:
              "My <strong>parents and teachers</strong> helped me the most to <strong>reach my goal</strong>. For example, my mom cooked healthy meals every day, and my friends studied with me before the exam. Their <strong>support</strong> made me feel confident.",
            vocab: [
              {
                word: "parents and teachers",
                ipa: "/ˈperənts ænd ˈtiːtʃərz/",
                pos: "n. phr.",
                meaning: "cha mẹ và thầy cô giáo",
                example: "My <strong>parents and teachers</strong> always believed in me."
              },
              {
                word: "reach my goal",
                ipa: "/riːtʃ maɪ ɡoʊl/",
                pos: "v. phr.",
                meaning: "đạt được mục tiêu của tôi",
                example: "Good advice helped me <strong>reach my goal</strong>."
              },
              {
                word: "support",
                ipa: "/səˈpɔːrt/",
                pos: "n.",
                meaning: "sự ủng hộ, hỗ trợ",
                example: "Their warm <strong>support</strong> made me feel confident."
              },
              {
                word: "healthy meals",
                ipa: "/ˈhelθi miːlz/",
                pos: "n. phr.",
                meaning: "những bữa ăn lành mạnh, đủ chất",
                example: "My mom cooked <strong>healthy meals</strong> for me every evening."
              },
              {
                word: "study together",
                ipa: "/ˈstʌdi təˈɡeðər/",
                pos: "v. phr.",
                meaning: "học bài cùng nhau",
                example: "My friends and I used to <strong>study together</strong> at school."
              },
              {
                word: "feel confident",
                ipa: "/fiːl ˈkɒnfɪdənt/",
                pos: "v. phr.",
                meaning: "cảm thấy tự tin",
                example: "Practicing with a teacher helped me <strong>feel confident</strong>."
              },
              {
                word: "kind words",
                ipa: "/kaɪnd wɜːrdz/",
                pos: "n. phr.",
                meaning: "những lời động viên tử tế",
                example: "A few <strong>kind words</strong> from family meant a lot to me."
              },
              {
                word: "never give up",
                ipa: "/ˈnevər ɡɪv ʌp/",
                pos: "v. phr.",
                meaning: "không bao giờ bỏ cuộc",
                example: "My father always told me to <strong>never give up</strong>."
              }
            ]
          },
          b2: {
            strategy: [
              {
                label: "A (Mở đầu tự nhiên - To be honest + owe it to + close friends)",
                text: "Thú thật mình có được thành công đó nhờ (owe it to) cha mẹ và những người bạn thân (close friends)."
              },
              {
                label: "E (Ví dụ song song với 'while' - tái sử dụng 'feel at ease')",
                text: "Mẹ luôn giúp mình thấy nhẹ nhõm (feel at ease), trong khi thầy cô hướng dẫn từng bước (guided me step by step)."
              },
              {
                label: "Cảm xúc (Tái sử dụng 'cheered me up')",
                text: "Sự động viên (encouragement) của họ luôn làm mình phấn chấn (cheered me up) vào những ngày khó khăn."
              }
            ],
            modelAnswer:
              "<strong>To be honest,</strong> I <strong>owe it to</strong> my parents and <strong>close friends</strong>. My mom always made me <strong>feel at ease</strong>, <strong>while</strong> my teachers <strong>guided me step by step</strong>. Their <strong>encouragement</strong> always <strong>cheered me up</strong> on tough days.",
            vocab: [
              {
                word: "owe it to",
                ipa: "/oʊ ɪt tuː/",
                pos: "v. phr.",
                meaning: "có được điều gì là nhờ vào ai",
                example: "I <strong>owe it to</strong> my family for supporting me every day."
              },
              {
                word: "close friends",
                ipa: "/kloʊs frendz/",
                pos: "n. phr.",
                meaning: "những người bạn thân",
                example: "My <strong>close friends</strong> reviewed practice tests with me."
              },
              {
                word: "feel at ease",
                ipa: "/fiːl æt iːz/",
                pos: "v. phr.",
                meaning: "cảm thấy thoải mái, bớt lo âu",
                example: "My mom always made me <strong>feel at ease</strong> before exams."
              },
              {
                word: "step by step",
                ipa: "/step baɪ step/",
                pos: "adv. phr.",
                meaning: "từng bước một",
                example: "My teachers guided me <strong>step by step</strong> through hard topics."
              },
              {
                word: "encouragement",
                ipa: "/ɪnˈkɜːrɪdʒmənt/",
                pos: "n.",
                meaning: "sự động viên, khích lệ",
                example: "Their <strong>encouragement</strong> gave me strength to keep trying."
              },
              {
                word: "cheered me up",
                ipa: "/tʃɪrd miː ʌp/",
                pos: "phr. v.",
                meaning: "đã làm tôi vui lên, phấn chấn hơn",
                example: "Funny jokes from friends <strong>cheered me up</strong> on tough days."
              },
              {
                word: "tough days",
                ipa: "/tʌf deɪz/",
                pos: "n. phr.",
                meaning: "những ngày khó khăn, mệt mỏi",
                example: "Good study partners help you get through <strong>tough days</strong>."
              },
              {
                word: "stay motivated",
                ipa: "/steɪ ˈmoʊtɪveɪtɪd/",
                pos: "v. phr.",
                meaning: "giữ vững động lực",
                example: "Having clear study habits helped me <strong>stay motivated</strong>."
              }
            ]
          }
        }
      }
    ]
  }
];
