// Ghi chú: File này chứa mã React của ứng dụng.
// Để mở trực tiếp bằng cách click đúp index.html (giao thức file://) mà không bị lỗi CORS của trình duyệt,
// mã này được đồng bộ vào index.html qua lệnh: node scripts/build.js

const { useState, useEffect, useRef } = React;

 // TỔNG HỢP DANH SÁCH
 const vstepGroupsData = [group1, group2, group3, group4, group5, group6, group7, group8];
 const customOrder = ['group3', 'group4', 'group5', 'group6', 'group2', 'group1', 'group7', 'group8'];
 const sortedVstepGroups = [...vstepGroupsData].sort((a, b) => customOrder.indexOf(a.id) - customOrder.indexOf(b.id));

 const POSITIONS = {
  n: { label: 'n', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  v: { label: 'v', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  adj: { label: 'adj', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  adv: { label: 'adv', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  phrase: { label: 'cụm từ', color: 'bg-rose-50 text-rose-600 border-rose-200' }
  };

  // --- HỆ THỐNG ICONS ---
 const iconRenderers = {
 Volume2: (props) => <svg {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
 ChevronRight: (props) => <svg {...props}><path d="m9 18 6-6-6-6"/></svg>,
 ChevronDown: (props) => <svg {...props}><path d="m6 9 6 6 6-6"/></svg>,
 BookOpen: (props) => <svg {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
 List: (props) => <svg {...props}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
 Info: (props) => <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
 ArrowRight: (props) => <svg {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
 Lightbulb: (props) => <svg {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
 Mic: (props) => <svg {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
 Menu: (props) => <svg {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
 X: (props) => <svg {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
 Play: (props) => <svg {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
 Pause: (props) => <svg {...props}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
 Clock: (props) => <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
 Award: (props) => <svg {...props}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
 HelpCircle: (props) => <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
 FileText: (props) => <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
 Activity: (props) => <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
 RotateCcw: (props) => <svg {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
 Sparkles: (props) => <svg {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>,
 LinkIcon: (props) => <svg {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
 CheckCircle2: (props) => <svg {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
 };
 const Icon = ({ name, size = 24, className = "" }) => {
  const svgProps = { xmlns:"http://www.w3.org/2000/svg", width: size, height: size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className };
  return iconRenderers[name]?.(svgProps) || null;
 };

 const Volume2 = (props) => <Icon name="Volume2" {...props} />;
 const ChevronRight = (props) => <Icon name="ChevronRight" {...props} />;
 const ChevronDown = (props) => <Icon name="ChevronDown" {...props} />;
 const BookOpen = (props) => <Icon name="BookOpen" {...props} />;
 const List = (props) => <Icon name="List" {...props} />;
 const Info = (props) => <Icon name="Info" {...props} />;
 const ArrowRight = (props) => <Icon name="ArrowRight" {...props} />;
 const Lightbulb = (props) => <Icon name="Lightbulb" {...props} />;
 const Mic = (props) => <Icon name="Mic" {...props} />;
 const Menu = (props) => <Icon name="Menu" {...props} />;
 const X = (props) => <Icon name="X" {...props} />;
 const Play = (props) => <Icon name="Play" {...props} />;
 const Pause = (props) => <Icon name="Pause" {...props} />;
 const Clock = (props) => <Icon name="Clock" {...props} />;
 const Award = (props) => <Icon name="Award" {...props} />;
 const HelpCircle = (props) => <Icon name="HelpCircle" {...props} />;
 const FileText = (props) => <Icon name="FileText" {...props} />;
 const Activity = (props) => <Icon name="Activity" {...props} />;
 const RotateCcw = (props) => <Icon name="RotateCcw" {...props} />;
 const Sparkles = (props) => <Icon name="Sparkles" {...props} />;
 const LinkIcon = (props) => <Icon name="LinkIcon" {...props} />;
 const CheckCircle2 = (props) => <Icon name="CheckCircle2" {...props} />;

 // --- HỆ THỐNG ĐỌC GIỌNG NÓI ---
 const speakText = (text) => {
 if (window.currentAudio) {
  window.currentAudio.pause();
 }
 if ('speechSynthesis' in window) window.speechSynthesis.cancel();
 const url =`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en-US&client=tw-ob`;
 const audio = new Audio(url);
 window.currentAudio = audio;
 audio.play().catch(error => {
 console.warn("Mạng lỗi hoặc Google chặn, chuyển sang giọng mặc định của máy...", error);
 fallbackSpeakText(text);
 });
 };

 const fallbackSpeakText = (text) => {
 if (!('speechSynthesis' in window)) return;
 window.speechSynthesis.cancel();
 const utterance = new SpeechSynthesisUtterance(text);
 utterance.lang = 'en-US';
 utterance.rate = 0.85;
 window.speechSynthesis.speak(utterance);
 };

 // --- CÁC COMPONENT GIAO DIỆN ---
 const VocabCard = React.memo(({ word, ipa, pos, vi, example, subItems }) => {
 const [activeSubItem, setActiveSubItem] = useState(null);
 const displayPos = POSITIONS[pos] || { label: pos, color: 'bg-slate-50 text-slate-600 border-slate-200' };

 return (
 <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
 <div className="flex justify-between items-start mb-2 gap-2">
 <div className="flex-1 min-w-0">
 <h4 className="text-lg font-bold text-slate-800 flex items-center flex-wrap gap-2">
 <span dangerouslySetInnerHTML={{ __html: word }}></span>
 {pos !== 'phrase' && (
 <span className={`text-[13px] font-semibold px-2.5 py-0.5 rounded-md border whitespace-nowrap flex-shrink-0 ${displayPos.color}`}>
 {displayPos.label}
 </span>
 )}
 {vi && <span className="text-indigo-600 font-bold text-base ml-2">{vi}</span>}
 </h4>
 <p className="text-slate-500 text-sm font-mono mt-1 break-words">{ipa}</p>
 </div>
 <button 
 onClick={(e) => { e.stopPropagation(); speakText(word); }}
 className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex-shrink-0 mb-3"
 title="Nghe phát âm từ vựng"
 >
 <Volume2 size={20} />
 </button>
 </div>
 <div className="bg-slate-50 p-3.5 rounded-lg flex items-start gap-3">
 <button 
 onClick={(e) => { e.stopPropagation(); speakText(example.replace(/<[^>]*>?/gm, '')); }}
 className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
 title="Nghe phát âm câu ví dụ"
 >
 <Volume2 size={16} />
 </button>
 <p className="text-slate-700 text-sm italic leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: `"${example}"` }}></p>
 </div>
 {subItems && subItems.length > 0 && (
 <div className="mt-3 flex flex-wrap gap-2">
 {subItems.map((item, idx) => (
 <button 
 key={idx}
 onClick={() => setActiveSubItem(activeSubItem === idx ? null : idx)}
 className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${activeSubItem === idx ? 'bg-indigo-100 text-indigo-700 border-indigo-200 ' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 '}`}
 >
 {item.en}
 {activeSubItem === idx && <span className="ml-2 text-red-500 font-light">{item.vi}</span>}
 </button>
 ))}
 </div>
 )}
 </div>
 );
 });

 const QuestionBlock = React.memo(({ question, idx }) => {
 const [activeTab, setActiveTab] = useState('b1');
 const [translatedSentence, setTranslatedSentence] = useState(null);
 const [showQuestionVi, setShowQuestionVi] = useState(false);
 const [fontSize, setFontSize] = useState(16);
 
 // Logic xử lý âm thanh mẫu
 const audioRef = React.useRef(null);
 const [isPlaying, setIsPlaying] = useState(false);

 // Nếu tab đang chọn (ví dụ C1) không tồn tại trong câu hỏi này thì fallback về 'b1'
 const effectiveTab = (question && question[activeTab] && Array.isArray(question[activeTab])) ? activeTab : 'b1';

 // Tự động dừng âm thanh khi chuyển Tab (B1/B2/C1)
 useEffect(() => {
 if (audioRef.current) {
 audioRef.current.pause();
 setIsPlaying(false);
 }
 }, [effectiveTab]);

 useEffect(() => {
 if (!question || !question[activeTab] || !Array.isArray(question[activeTab])) {
 setActiveTab('b1');
 }
 }, [question, activeTab]);

 const handlePlayAudio = () => {
 const audioUrl = question && question.audioFiles ? question.audioFiles[effectiveTab] : null;
 if (!audioUrl) return;

 if (isPlaying) {
 audioRef.current.pause();
 setIsPlaying(false);
 } else {
 if (!audioRef.current || audioRef.current.src !== new URL(audioUrl, document.baseURI).href) {
 audioRef.current = new Audio(audioUrl);
 audioRef.current.onended = () => setIsPlaying(false);
 }
 const playPromise = audioRef.current.play();
 if (playPromise?.catch) {
  playPromise.catch(() => setIsPlaying(false));
 }
 setIsPlaying(true);
 }
 };

 const handleSentenceClick = (item) => {
 if (translatedSentence && translatedSentence.en === item.en) {
 setTranslatedSentence(null);
 } else {
 setTranslatedSentence(item);
 }
 };

 const currentAnswer = (question && question[effectiveTab]) || (question && question.b1) || [];

 const currentIdeaMap = React.useMemo(() => {
 if (question && question.ideaMap && question.ideaMap[effectiveTab]) {
 return question.ideaMap[effectiveTab];
 }
 return [];
 }, [question, effectiveTab]);

 return (
 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
 <div 
 className="bg-indigo-50 p-4 sm:p-5 border-b border-indigo-100 cursor-pointer hover:bg-indigo-100/80 transition-colors"
 onClick={() => setShowQuestionVi(!showQuestionVi)}
 title="Nhấn để xem/ẩn nghĩa tiếng Việt"
 >
 <div className="flex gap-3">
 <span className="bg-indigo-600 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm sm:text-base">
 {idx + 1}
 </span>
 <div>
 <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">{question.q.en}</h3>
 {showQuestionVi && (
 <p className="text-indigo-600 text-base sm:text-lg font-light mt-1 animate-fade-in">{question.q.vi}</p>
 )}
 </div>
 </div>
 </div>

 {currentIdeaMap && currentIdeaMap.length > 0 && (
 <div className="px-4 sm:px-5 py-4 border-b border-slate-100 bg-slate-50 ">
 <h4 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2 flex items-center gap-1">
 <List size={14} className="text-violet-500" /> IDEA MAP <span className={effectiveTab === 'b1' ? 'text-blue-600' : effectiveTab === 'b2' ? 'text-green-600' : 'text-purple-600'}>({effectiveTab.toUpperCase()})</span>
 </h4>
 <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
 {currentIdeaMap.map((idea, i) => (
 <React.Fragment key={i}>
 <span className="bg-white border border-slate-200 text-slate-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-light shadow-sm">
 {idea}
 </span>
 {i < currentIdeaMap.length - 1 && <ArrowRight size={12} className="text-slate-400 sm:w-3.5 sm:h-3.5" />}
 </React.Fragment>
 ))}
 </div>
 </div>
 )}

 <div className="p-4 sm:p-5">
 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-slate-200 mb-4 gap-3">
 <div className="flex items-end gap-2 sm:gap-4 overflow-x-auto">
 <div className="flex border-r border-slate-200 pr-2">
 <button
 className={`pb-2 px-3 font-bold text-sm relative whitespace-nowrap flex-shrink-0 ${effectiveTab === 'b1' ? 'text-blue-600 ' : 'text-slate-400'}`}
 onClick={() => setActiveTab('b1')}
 >
 Level B1 {effectiveTab === 'b1' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-md"></span>}
 </button>
 <button
 className={`pb-2 px-3 font-bold text-sm relative whitespace-nowrap flex-shrink-0 ${effectiveTab === 'b2' ? 'text-green-600' : 'text-slate-400'}`}
 onClick={() => setActiveTab('b2')}
 >
 Level B2 {effectiveTab === 'b2' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-md"></span>}
 </button>
 {question && question.c1 && (
 <button
 className={`pb-2 px-3 font-bold text-sm relative whitespace-nowrap flex-shrink-0 ${effectiveTab === 'c1' ? 'text-purple-600' : 'text-slate-400'}`}
 onClick={() => setActiveTab('c1')}
 >
 Level C1 {effectiveTab === 'c1' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-md"></span>}
 </button>
 )}
 </div>

 {/* Cỡ chữ */}
 <div className="flex border-r border-slate-200 pr-2 pl-1 flex-shrink-0">
 <button onClick={() => setFontSize(prev => Math.max(14, prev - 2))} className="pb-2 px-1.5 font-bold text-sm relative whitespace-nowrap flex-shrink-0 text-slate-400 hover:text-slate-700 transition-colors" title="Giảm cỡ chữ">-</button>
 <button onClick={() => setFontSize(16)} className="pb-2 px-1.5 font-bold text-sm relative whitespace-nowrap flex-shrink-0 text-slate-400 hover:text-slate-700 transition-colors" title="Cỡ chữ mặc định">Mặc định</button>
 <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className="pb-2 px-1.5 font-bold text-sm relative whitespace-nowrap flex-shrink-0 text-slate-400 hover:text-slate-700 transition-colors" title="Tăng cỡ chữ">+</button>
 </div>

 {/* Nút nghe file MP3 thực tế */}
 {question && question.audioFiles && question.audioFiles[effectiveTab] && (
 <button
 onClick={handlePlayAudio}
 className={`flex items-center gap-2 px-3 py-1 mb-2 rounded-full text-xs font-bold transition-all shadow-sm whitespace-nowrap flex-shrink-0 ${
 isPlaying 
 ? 'bg-rose-500 text-white animate-pulse' 
 : 'bg-indigo-600 text-white hover:bg-indigo-700'
 }`}
 >
 {isPlaying ? <><span className="block w-2 h-2 bg-white rounded-full"></span> ĐANG NGHE...</> : <><Volume2 size={14} /> NGHE BÀI MẪU</>}
 </button>
 )}
 </div>
 <p className="text-slate-400 text-[11px] pb-2 hidden sm:flex items-center gap-1">
 <Info size={12} /> Bấm vào câu để xem nghĩa
 </p>
 </div>

 <div className="text-slate-700 leading-relaxed text-justify transition-all font-light" style={{ fontSize: `${fontSize}px` }}>
 {Array.isArray(currentAnswer) && currentAnswer.map((sentence, i) => {
 const isSelected = translatedSentence?.en === sentence.en;
 return (
 <span key={i} className="inline">
 <span 
 onClick={() => handleSentenceClick(sentence)}
 className={`cursor-pointer transition-colors ${isSelected ? '' : 'hover:bg-slate-50 '}`}
 >
 {sentence.en}
 </span>
 {isSelected && (
 <span className="inline animate-fade-in font-light text-amber-700 ml-1.5 mr-0.5">
 {sentence.vi}
 </span>
 )}
 {" "}
 </span>
 );
 })}
 </div>
 </div>
 </div>
 );
 });

 
  // --- VIDEO MINH HOẠ CHUYỂN ĐỘNG MỞ RỘNG Ý (ANIMATED MOTION VIDEO) ---
  const VisualAnswerFlow = () => {
    const [activeMode, setActiveMode] = useState('chain'); // 'chain' | 'dual'
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // 0 đến 18.0s
    const [autoSpeak, setAutoSpeak] = useState(false);
    const spokenScenesRef = useRef({});

    const totalDuration = 18.0;

    // Quản lý đồng hồ thời gian video
    useEffect(() => {
      let interval = null;
      if (isPlaying) {
        interval = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= totalDuration) {
              setIsPlaying(false);
              return totalDuration;
            }
            return parseFloat((prev + 0.1).toFixed(1));
          });
        }, 100);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isPlaying, totalDuration]);

    // Tự động đọc giọng nói nếu bật autoSpeak
    useEffect(() => {
      if (!autoSpeak || !isPlaying) return;

      if (activeMode === 'chain') {
        if (currentTime >= 0.4 && currentTime < 0.7 && !spokenScenesRef.current['chain_1']) {
          spokenScenesRef.current['chain_1'] = true;
          speakText("I prefer watching films at home");
        }
        if (currentTime >= 3.5 && currentTime < 3.8 && !spokenScenesRef.current['chain_2']) {
          spokenScenesRef.current['chain_2'] = true;
          speakText("because it is more comfortable.");
        }
        if (currentTime >= 8.0 && currentTime < 8.3 && !spokenScenesRef.current['chain_3']) {
          spokenScenesRef.current['chain_3'] = true;
          speakText("I mean, I can pause the movie whenever I want.");
        }
        if (currentTime >= 13.0 && currentTime < 13.3 && !spokenScenesRef.current['chain_4']) {
          spokenScenesRef.current['chain_4'] = true;
          speakText("And I usually watch films with my family on weekends.");
        }
      } else {
        if (currentTime >= 0.4 && currentTime < 0.7 && !spokenScenesRef.current['dual_1']) {
          spokenScenesRef.current['dual_1'] = true;
          speakText("I prefer watching films at home because it is affordable. It helps me save money.");
        }
        if (currentTime >= 6.0 && currentTime < 6.3 && !spokenScenesRef.current['dual_2']) {
          spokenScenesRef.current['dual_2'] = true;
          speakText("Besides, it gives me complete freedom and privacy.");
        }
        if (currentTime >= 11.0 && currentTime < 11.3 && !spokenScenesRef.current['dual_3']) {
          spokenScenesRef.current['dual_3'] = true;
          speakText("I can wear my pajamas and lie comfortably on the couch.");
        }
      }
    }, [currentTime, autoSpeak, isPlaying, activeMode]);

    const handlePlayPause = () => {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
        spokenScenesRef.current = {};
        setIsPlaying(true);
      } else {
        setIsPlaying(!isPlaying);
      }
    };

    const handleReplay = () => {
      setCurrentTime(0);
      spokenScenesRef.current = {};
      setIsPlaying(true);
    };

    const handleSeek = (time) => {
      setCurrentTime(time);
      if (time === 0) spokenScenesRef.current = {};
    };

    const handleModeSwitch = (mode) => {
      setActiveMode(mode);
      setCurrentTime(0);
      spokenScenesRef.current = {};
      setIsPlaying(false);
    };

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Điều kiện hiển thị theo thời gian (Mode 1: Chuỗi Móc Xích)
    const showChain1 = currentTime >= 0.2;
    const showChain2 = currentTime >= 3.5;
    const hook1Active = currentTime >= 6.5; // Bốc từ khóa "comfortable"
    const showChain3 = currentTime >= 8.0;
    const hook2Active = currentTime >= 11.5; // Bốc từ khóa "pause the movie"
    const showChain4 = currentTime >= 13.0;
    const showChainComplete = currentTime >= 16.5;

    // Điều kiện hiển thị (Mode 2: Hai Luồng Ý Tưởng)
    const showDual1 = currentTime >= 0.2;
    const showDualBridge = currentTime >= 5.5; // Cầu nối chuyển ý
    const showDual2 = currentTime >= 9.0;
    const showDualExpand = currentTime >= 12.0;
    const showDualComplete = currentTime >= 16.0;

    return (
      <section className="space-y-4 mt-8">
        {/* TIÊU ĐỀ SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
              <Play size={22} className="ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-600">Video minh họa chuyển động</span>
                <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">18 Giây</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Cơ Chế Bốc Từ Khóa Mở Rộng Ý
              </h3>
            </div>
          </div>

          {/* CHỌN MÔ HÌNH: MÓC XÍCH vs 2 IDEAS */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => handleModeSwitch('chain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeMode === 'chain'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon size={14} />
              <span>Mô hình 1: Chuỗi Móc Xích</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('dual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeMode === 'dual'
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles size={14} />
              <span>Mô hình 2: Hai Ý Tưởng (2 Ideas)</span>
            </button>
          </div>
        </div>

        {/* KHUNG VIDEO ANIMATION PLAYER */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800">
          {/* HEADER TRONG KHUNG VIDEO */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </span>
              <span className="text-slate-300 font-light ml-2 hidden sm:inline">
                Câu hỏi: "Do you prefer watching films at home or in the cinema?"
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                autoSpeak ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Tự động đọc giọng nói khi chạy video"
            >
              <Volume2 size={13} />
              <span>Âm thanh đọc: {autoSpeak ? 'Bật' : 'Tắt'}</span>
            </button>
          </div>

          {/* SÂN KHẤU DIỄN HOẠT (STAGE) */}
          <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-center">
            {activeMode === 'chain' ? (
              <div className="space-y-4">
                {/* CÂU 1: TRẢ LỜI TRỰC TIẾP */}
                <div className={`transition-all duration-500 ${showChain1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      Câu 1 • Trả lời trực tiếp
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-white mt-1.5 leading-snug">
                    "I prefer watching films at home..."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 Tôi thích xem phim ở nhà hơn...
                  </p>
                </div>

                {/* CÂU 2: LÝ DO */}
                <div className={`transition-all duration-500 ${showChain2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold">
                      Câu 2 • Giải thích lý do
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-slate-100 mt-1.5 leading-snug">
                    "...because it is more{' '}
                    <span
                      className={`transition-all duration-300 ${
                        hook1Active
                          ? 'inline-block bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-lg shadow-lg shadow-amber-400/50 scale-110 ring-4 ring-amber-300 animate-pulse'
                          : 'text-amber-300 font-medium underline'
                      }`}
                    >
                      comfortable
                    </span>
                    ."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 ...bởi vì nó thoải mái hơn rất nhiều.
                  </p>
                </div>

                {/* BỐC CHI TIẾT 1 TỪ "COMFORTABLE" */}
                {hook1Active && (
                  <div className="pl-4 sm:pl-6 my-1 animate-fade-in flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-purple-400 rounded-full animate-pulse"></div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
                      <span className="flex items-center gap-1">
                        <LinkIcon size={13} className="text-amber-400" />
                        Bốc từ khóa <strong>"comfortable"</strong>
                      </span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-slate-200">Não tự hỏi: <em>Thoải mái ở điểm gì?</em></span>
                    </div>
                  </div>
                )}

                {/* CÂU 3: MỞ RỘNG TỪ "COMFORTABLE" */}
                <div className={`transition-all duration-500 ${showChain3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold">
                      Câu 3 • Mở rộng từ "comfortable"
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-purple-100 mt-1.5 leading-snug">
                    "I mean, I can{' '}
                    <span
                      className={`transition-all duration-300 ${
                        hook2Active
                          ? 'inline-block bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-lg shadow-lg shadow-amber-400/50 scale-110 ring-4 ring-amber-300 animate-pulse'
                          : 'text-amber-300 font-medium underline'
                      }`}
                    >
                      pause the movie
                    </span>{' '}
                    whenever I want."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 Ý tôi là, tôi có thể tạm dừng phim bất cứ lúc nào tôi muốn.
                  </p>
                </div>

                {/* BỐC CHI TIẾT 2 TỪ "PAUSE THE MOVIE" */}
                {hook2Active && (
                  <div className="pl-4 sm:pl-6 my-1 animate-fade-in flex items-center gap-3">
                    <div className="w-1.5 h-7 bg-gradient-to-b from-purple-400 to-rose-400 rounded-full animate-pulse"></div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-300 text-xs sm:text-sm font-bold shadow-sm">
                      <span className="flex items-center gap-1">
                        <LinkIcon size={13} className="text-purple-400" />
                        Bốc chi tiết <strong>"pause the movie"</strong>
                      </span>
                      <span className="text-slate-500">➔</span>
                      <span className="text-slate-200">Não tự hỏi: <em>Thường xem với ai, lúc nào?</em></span>
                    </div>
                  </div>
                )}

                {/* CÂU 4: MỞ RỘNG TIẾP SANG ĐỜI THỰC */}
                <div className={`transition-all duration-500 ${showChain4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                      Câu 4 • Mở rộng tiếp sang đời thực
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-rose-100 mt-1.5 leading-snug">
                    "And I usually watch films with my family on weekends."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 Và tôi thường xem cùng gia đình vào dịp cuối tuần.
                  </p>
                </div>

                {/* HOÀN THÀNH */}
                {showChainComplete && (
                  <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 animate-fade-in flex items-center justify-between">
                    <div className="text-xs sm:text-sm text-emerald-300 font-bold flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                      <span>Hoàn thành bài nói 4 câu: Mỗi câu sau đều sinh ra từ từ khóa của câu trước!</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors flex items-center gap-1 flex-shrink-0 shadow-sm"
                    >
                      <RotateCcw size={13} /> Xem lại
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* MODE 2: HAI LUỒNG Ý TƯỞNG (DUAL IDEAS) */
              <div className="space-y-4">
                {/* Ý TƯỞNG 1 */}
                <div className={`transition-all duration-500 ${showDual1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-bold">
                      Ý tưởng 1 • Tiết kiệm (Affordable)
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-white mt-1.5 leading-snug">
                    "I prefer watching films at home because it is{' '}
                    <span className="text-amber-300 underline font-medium">affordable</span>; staying home helps me save money."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 Tôi thích xem ở nhà vì tiết kiệm; ở nhà giúp tôi tiết kiệm tiền vé.
                  </p>
                </div>

                {/* CẦU NỐI CHUYỂN Ý */}
                {showDualBridge && (
                  <div className="my-2 animate-fade-in">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold shadow-sm">
                      <Sparkles size={16} className="text-amber-400 animate-pulse" />
                      <span>⚡ Cầu nối chuyển ý: Dùng liên từ <strong>"Besides, ..."</strong> để đổi kênh sang Ý 2 mượt mà!</span>
                    </div>
                  </div>
                )}

                {/* Ý TƯỞNG 2 */}
                <div className={`transition-all duration-500 ${showDual2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                      Ý tưởng 2 • Tự do & Riêng tư (Freedom)
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl font-light text-indigo-100 mt-1.5 leading-snug">
                    "Besides, it gives me complete{' '}
                    <span className="text-amber-300 underline font-medium">freedom and privacy</span>."
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                    👉 Ngoài ra, nó còn cho tôi sự tự do và riêng tư tuyệt đối.
                  </p>
                </div>

                {/* MỞ RỘNG Ý TƯỞNG 2 */}
                {showDualExpand && (
                  <div className="animate-fade-in pl-4 sm:pl-6 border-l-2 border-indigo-500/40">
                    <p className="text-base sm:text-xl font-light text-slate-200 leading-snug">
                      "I can simply wear my pajamas, lie on the couch, and watch peacefully."
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                      👉 Tôi có thể mặc đồ ngủ, nằm ườn trên sofa và xem phim bình yên.
                    </p>
                  </div>
                )}

                {/* HOÀN THÀNH DUAL */}
                {showDualComplete && (
                  <div className="mt-3 p-3.5 rounded-xl bg-teal-500/15 border border-teal-500/40 animate-fade-in flex items-center justify-between">
                    <div className="text-xs sm:text-sm text-teal-300 font-bold flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-teal-400 flex-shrink-0" />
                      <span>Hoàn thành mô hình 2 Ideas: Rõ ràng, đa chiều, giàu liên từ chuẩn B2 - C1!</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors flex items-center gap-1 flex-shrink-0 shadow-sm"
                    >
                      <RotateCcw size={13} /> Xem lại
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* THANH ĐIỀU KHIỂN VIDEO (CONTROLS BAR) */}
          <div className="px-5 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            {/* NÚT PLAY / PAUSE VÀ REPLAY */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayPause}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-md active:scale-95"
                title={isPlaying ? 'Tạm dừng' : 'Phát video'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={handleReplay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                title="Xem lại từ đầu"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {/* SEEKBAR TIẾN TRÌNH */}
            <div className="flex-1 w-full flex items-center gap-3">
              <div
                className="relative flex-1 h-2 bg-slate-800 rounded-full cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  handleSeek(parseFloat((ratio * totalDuration).toFixed(1)));
                }}
              >
                {/* THANH TIẾN TRÌNH ĐÃ CHẠY */}
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full relative transition-all duration-100"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>

                {/* CÁC ĐIỂM MỐC CHAPTER TRÊN THANH */}
                <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 self-center" title="Câu 1"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 self-center" title="Câu 2"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 self-center" title="Bốc từ khóa 1"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 self-center" title="Bốc từ khóa 2"></span>
                </div>
              </div>

              {/* ĐỒNG HỒ THỜI GIAN */}
              <span className="text-xs font-mono font-bold text-slate-400 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>
          </div>
        </div>

        {/* HỘP GHI CHÚ TỐI GIẢN (1 DÒNG ĐẮT GIÁ) */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-light text-amber-950">
          <Lightbulb size={18} className="text-amber-600 flex-shrink-0" />
          <span>
            <strong>Bí quyết thực chiến:</strong> Đừng cố nghĩ một chủ đề mới toanh làm não bị nghẽn! Hãy nhặt đúng 1 từ vừa nói ở câu trước, tự hỏi <em>"như thế nào / ví dụ là gì"</em> rồi nói tiếp câu sau.
          </span>
        </div>
      </section>
    );
  };

  // --- COMPONENT LÝ THUYẾT CHUNG ---
 const GeneralTheory = React.memo(() => {
 const tones = {
 indigo: {
 accent: 'bg-indigo-600',
 soft: 'bg-indigo-50',
 softText: 'text-indigo-700',
 border: 'border-indigo-100',
 chip: 'bg-indigo-50 text-indigo-700 border-indigo-100',
 step: 'bg-indigo-600 text-white'
 },
 emerald: {
 accent: 'bg-emerald-600',
 soft: 'bg-emerald-50',
 softText: 'text-emerald-700',
 border: 'border-emerald-100',
 chip: 'bg-emerald-50 text-emerald-700 border-emerald-100',
 step: 'bg-emerald-600 text-white'
 },
 sky: {
 accent: 'bg-sky-600',
 soft: 'bg-sky-50',
 softText: 'text-sky-700',
 border: 'border-sky-100',
 chip: 'bg-sky-50 text-sky-700 border-sky-100',
 step: 'bg-sky-600 text-white'
 },
 amber: {
 accent: 'bg-amber-500',
 soft: 'bg-amber-50',
 softText: 'text-amber-800',
 border: 'border-amber-100',
 chip: 'bg-amber-50 text-amber-800 border-amber-100',
 step: 'bg-amber-500 text-slate-950'
 },
 rose: {
 accent: 'bg-rose-600',
 soft: 'bg-rose-50',
 softText: 'text-rose-700',
 border: 'border-rose-100',
 chip: 'bg-rose-50 text-rose-700 border-rose-100',
 step: 'bg-rose-600 text-white'
 },
 purple: {
 accent: 'bg-purple-600',
 soft: 'bg-purple-50',
 softText: 'text-purple-700',
 border: 'border-purple-100',
 chip: 'bg-purple-50 text-purple-700 border-purple-100',
 step: 'bg-purple-600 text-white'
 },
 slate: {
 accent: 'bg-slate-900',
 soft: 'bg-slate-100',
 softText: 'text-slate-700',
 border: 'border-slate-200',
 chip: 'bg-slate-100 text-slate-700 border-slate-200',
 step: 'bg-slate-900 text-white'
 }
 };

 const [activeWhWord, setActiveWhWord] = useState(null);

 const yesNoAux = [
 { en:"Do you like cooking?", vi:"Bạn có thích nấu ăn không?" },
 { en:"Do you think emails will replace letters?", vi:"Bạn có nghĩ rằng thư điện tử sẽ thay thế thư tay không?" },
 { en:"Did you have many friends when you were a child?", vi:"Bạn có nhiều bạn bè khi còn nhỏ không?" },
 { en:"Have you ever travelled by plane?", vi:"Bạn đã từng đi du lịch bằng máy bay chưa?" }
 ];

 const yesNoTobe = [
 { en:"Are you a family person?", vi:"Bạn có phải là người của gia đình không?" },
 { en:"Are you good at saving money?", vi:"Bạn có giỏi tiết kiệm tiền không?" },
 { en:"Are there many advertisements in your country?", vi:"Có nhiều quảng cáo ở đất nước của bạn không?" },
 { en:"Is it important to keep up with the news?", vi:"Việc cập nhật tin tức có quan trọng không?" }
 ];

 const yesNoModal = [
 { en:"Can you access the Internet from where you work?", vi:"Bạn có thể truy cập Internet từ nơi làm việc không?" },
 { en:"Should children be punished when they make mistakes?", vi:"Trẻ em có nên bị phạt khi chúng phạm lỗi không?" },
 { en:"Can you share some experiences or tips from your dating life?", vi:"Bạn có thể chia sẻ một vài kinh nghiệm hoặc mẹo trong chuyện hẹn hò không?" },
 { en:"Would you like to change anything in your room?", vi:"Bạn có muốn thay đổi thứ gì trong phòng của mình không?" }
 ];

 const choiceExamples = [
 { en:"Do you prefer watching films at home or in the cinema?", vi:"Bạn thích xem phim ở nhà hay ở rạp chiếu phim hơn?" },
 { en:"Do you prefer reading online or printed materials?", vi:"Bạn thích đọc tài liệu trực tuyến hay tài liệu in hơn?" },
 { en:"Which do you prefer: letters or emails?", vi:"Bạn thích cái nào hơn: thư tay hay thư điện tử?" },
 { en:"Would you prefer to travel alone or with someone else?", vi:"Bạn thích đi du lịch một mình hay đi cùng người khác hơn?" }
 ];

 const detailExamples = [
 { en:"What did you often do when you were a child?", vi:"Bạn thường làm gì khi còn là một đứa trẻ?" },
 { en:"What do you often buy at the market?", vi:"Bạn thường mua gì ở chợ?" },
 { en:"What gameshow do you often watch?", vi:"Chương trình truyền hình nào bạn thường xem?" },
 { en:"In the future, which type of school do you think will become more common?", vi:"Trong tương lai, loại hình trường học nào bạn nghĩ sẽ trở nên phổ biến hơn?" },
 { en:"Where do you often go for a walk?", vi:"Bạn thường đi dạo ở đâu?" },
 { en:"When do people in your country often decorate their homes?", vi:"Khi nào người dân ở đất nước bạn thường trang trí nhà cửa của họ?" },
 { en:"Who is the most talkative person in your family?", vi:"Ai là người nói nhiều nhất trong gia đình bạn?" },
 { en:"Why do children learn things more quickly than adults?", vi:"Tại sao trẻ em học hỏi mọi thứ nhanh hơn người lớn?" },
 { en:"How do you save money?", vi:"Bạn tiết kiệm tiền bằng cách nào?" },
 { en:"How much time do you spend on your hobby?", vi:"Bạn dành bao nhiêu thời gian cho sở thích của mình?" },
 { en:"How do you travel to work?", vi:"Bạn đi làm bằng phương tiện gì?" },
 { en:"How often do you donate money or do charity work?", vi:"Bạn có thường quyên góp tiền hoặc làm công việc từ thiện không?" }
 ];

 const examFacts = [
 { icon: <FileText size={20} />, label:"Cấu trúc", value:"2 chủ đề", detail:"Mỗi chủ đề có 3 câu hỏi ngắn." },
 { icon: <Clock size={20} />, label:"Thời gian", value:"3 phút", detail:"Đề hiện lên là bắt đầu nói." },
 { icon: <Activity size={20} />, label:"Mục tiêu", value:"4-5 câu", detail:"Mốc an toàn để hướng tới B2." },
 { icon: <Award size={20} />, label:"Điểm số", value:"6 tiêu chí", detail:"Nội dung, mở rộng, phát âm, liên kết, trôi chảy, ngữ pháp." }
 ];

 const workflow = [
 { title:"Nhìn tín hiệu", detail:"Xác định Yes-No, lựa chọn A/B, hoặc câu hỏi Wh." },
 { title:"Chốt ý chính", detail:"Nói ngay câu trả lời trực tiếp, không vòng vo." },
 { title:"Thêm lý do", detail:"Dùng because, since, one main reason is that..." },
 { title:"Mở rộng tự nhiên", detail:"Bổ sung thời gian, nơi chốn, tần suất, ví dụ cá nhân." }
 ];

 const yesNoGroups = [
 {
 title:"TRỢ ĐỘNG TỪ",
 tone:"indigo",
 chips: ["do","does","did","will","have","has"],
 items: yesNoAux
 },
 {
 title:"ĐỘNG TỪ TOBE",
 tone:"emerald",
 chips: ["is","are","was","were"],
 items: yesNoTobe
 },
 {
 title:"ĐỘNG TỪ KHIẾM KHUYẾT",
 tone:"purple",
 chips: ["would","can","could","should"],
 items: yesNoModal
 }
 ];

 const choicePatterns = [
"Do you prefer A or B?",
"Would you prefer A or B?",
"Which do you prefer: A or B?",
"Which do you enjoy more, A or B?"
 ];

 const whWords = [
 { en:"what", vi:"cái gì / điều gì" },
 { en:"which", vi:"cái nào" },
 { en:"where", vi:"ở đâu" },
 { en:"when", vi:"khi nào" },
 { en:"why", vi:"tại sao" },
 { en:"who", vi:"ai" },
 { en:"how", vi:"như thế nào / bằng cách nào" },
 { en:"how often", vi:"thường xuyên như thế nào" },
 { en:"how much", vi:"bao nhiêu" }
 ];

 const detailStructures = {
 tobe: [
 {
 id:"tobe-basic",
 number: 1,
 parts: [
 { text:"Wh" },
 { text:"động từ tobe", tone:"neon" },
 { text:"S" },
 { text: "...?" }
 ]
 },
 {
 id:"tobe-ing",
 number: 2,
 parts: [
 { text:"Wh" },
 { text:"động từ tobe", tone:"grammar" },
 { text:"S" },
 { verb:"ing" },
 { text: "...?" }
 ]
 },
 {
 id:"tobe-v3",
 number: 3,
 parts: [
 { text:"Wh" },
 { text:"động từ tobe", tone:"grammar" },
 { text:"S" },
 { verb:"3/ed" },
 { text: "...?" }
 ]
 }
 ],
 support: [
 {
 id:"aux",
 number: 4,
 parts: [
 { text:"Wh" },
 { text:"trợ động từ", tone:"grammar" },
 { text:"S" },
 { verb:"o" },
 { text: "...?" }
 ]
 },
 {
 id:"modal",
 number: 5,
 parts: [
 { text:"Wh" },
 { text:"động từ khiếm khuyết", tone:"grammar" },
 { text:"S" },
 { verb:"o" },
 { text: "...?" }
 ]
 }
 ]
 };

 const answerFormula = [
 {
 letter:"A",
 level:"B1",
 title:"Answer",
 tone:"emerald",
 headline:"Trả lời trực tiếp",
 points: [
 <><span className="font-black text-slate-950">Yes-No:</span> nói Yes hoặc No rồi nêu quan điểm.</>,
 <><span className="font-black text-slate-950">Lựa chọn:</span> I prefer + N/Ving</>,
 <><span className="font-black text-slate-950">Wh-question:</span> trả lời thẳng vào thông tin được hỏi.</>
 ]
 },
 {
 letter:"R",
 level:"B2",
 title:"Reason",
 tone:"sky",
 headline:"Giải thích lý do",
 points: [
 <><span className="font-black text-slate-950">because / since</span> + lý do</>,
 <><span className="font-black text-slate-950">This is because</span> + lý do</>,
 <><span className="font-black text-slate-950">The main reason is that</span> + lý do</>
 ]
 },
 {
 letter:"E",
 level:"B2+",
 title:"Expansion",
 tone:"purple",
 headline:"Mở rộng câu trả lời",
 points: [
"Thêm ví dụ cá nhân.",
"Nói về tần suất, thời gian, nơi chốn.",
"Kết nối sang thói quen hoặc trải nghiệm thật."
 ]
 }
 ];

 const SectionTitle = ({ eyebrow, title, subtitle, icon }) => (
 <div className="mb-5 flex items-start gap-3">
 <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
 {icon}
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-sm font-extrabold uppercase text-orange-600">{eyebrow}</p>
 <h3 className="mt-1 text-2xl font-black leading-tight text-slate-950">{title}</h3>
 {subtitle && <p className="mt-2 w-full max-w-none text-base font-light leading-relaxed text-slate-600 ">{subtitle}</p>}
 </div>
 </div>
 );

 const ExampleRows = ({ items, tone ="indigo", columns = false }) => {
 const color = tones[tone];
 const [openQuestion, setOpenQuestion] = useState(null);
 return (
 <div className={columns ?"grid grid-cols-1 lg:grid-cols-2" :"divide-y divide-slate-100"}>
 {items.map((q, idx) => (
 <button
 key={q.en}
 type="button"
 onClick={() => setOpenQuestion(openQuestion === q.en ? null : q.en)}
 className={`group w-full px-5 py-3.5 text-left transition-colors hover:bg-slate-50 ${columns ? 'border-b border-slate-100 lg:border-r lg:[&:nth-child(even)]:border-r-0' : ''}`}
 >
 <p className="font-light leading-snug text-slate-900 group-hover:text-slate-950">{q.en}</p>
 {openQuestion === q.en && (
 <p className={`mt-2 rounded-md border px-3 py-2 text-sm font-light leading-relaxed ${color.soft} ${color.softText} ${color.border}`}>
 {q.vi}
 </p>
 )}
 </button>
 ))}
 </div>
 );
 };

 const Chip = ({ children, tone ="indigo" }) => (
 <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-extrabold ${tones[tone].chip}`}>
 {children}
 </span>
 );

 const WhChip = ({ item }) => {
 const isActive = activeWhWord === item.en;
 return (
 <button
 type="button"
 onClick={() => setActiveWhWord(isActive ? null : item.en)}
 className={`flex flex-col items-center justify-center rounded-md border p-1 text-[11px] xl:text-xs 2xl:text-sm font-extrabold transition-colors ${
 isActive
 ? 'border-rose-200 bg-rose-100 text-rose-800'
 : tones.rose.chip + ' hover:bg-rose-100'
 }`}
 >
 <span>{item.en}</span>
 {isActive && <span className="font-bold text-rose-700 text-center">= {item.vi}</span>}
 </button>
 );
 };

 const renderChoicePattern = (pattern) => {
 return pattern.split(/(\bA\b|\bB\b|\bor\b)/gi).map((part, idx) => {
 const normalized = part.toLowerCase();
 if (part ==="A" || part ==="B") {
 return <span key={idx} className="font-black text-red-600 ">{part}</span>;
 }
 if (normalized ==="or") {
 return <span key={idx} className="font-black text-slate-950">or</span>;
 }
 return <React.Fragment key={idx}>{part}</React.Fragment>;
 });
 };

 const renderFormulaPart = (part, idx) => {
 if (part.verb) {
 return (
 <span key={idx} className="font-black text-blue-600 ">
 V<sub className="text-[0.62em] leading-none">{part.verb}</sub>
 </span>
 );
 }

 const className = part.tone ==="neon"
 ?"font-black text-blue-600"
 : part.tone ==="grammar"
 ?"font-black text-amber-900"
 :"font-black text-slate-950";

 return <span key={idx} className={className}>{part.text}</span>;
 };

 const FormulaRow = ({ formula }) => (
 <div className="flex min-w-0 items-center gap-2 border-b border-slate-100 px-3 py-3">
 <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-rose-600 text-sm font-black text-white">
 {formula.number}
 </span>
 <p className="min-w-0 whitespace-nowrap font-mono text-[12px] font-black leading-none tracking-normal text-slate-900 2xl:text-sm">
 {formula.parts.map((part, idx) => (
 <React.Fragment key={`${formula.id}-${idx}`}>
 {idx > 0 && <span className="mx-1.5 text-base font-black text-slate-950">+</span>}
 {renderFormulaPart(part, idx)}
 </React.Fragment>
 ))}
 </p>
 </div>
 );

 return (
 <div className="animate-fade-in space-y-10 pb-12">
 <header className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
 <div className="grid grid-cols-1 lg:grid-cols-5">
 <div className="lg:col-span-3 p-6 lg:p-8">
 <div className="flex items-center gap-3 text-orange-600">
 <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 ">
 <FileText size={24} />
 </div>
 <span className="text-sm font-extrabold uppercase">Tài liệu chung</span>
 </div>
 <h2 className="mt-5 max-w-none text-3xl font-black leading-tight text-slate-950">
 Lý thuyết chung Speaking Part 1
 </h2>
 <p className="mt-4 max-w-none text-lg font-light leading-relaxed text-slate-600 ">
 Một bản đồ học nhanh cho phần hỏi đáp cá nhân: biết dạng câu hỏi, chọn cách trả lời, rồi mở rộng đủ ý trong thời gian ngắn.
 </p>

 <div className="mt-7 rounded-lg bg-slate-950 p-4 text-white">
 <p className="mb-3 text-sm font-extrabold uppercase text-orange-300">Luồng trả lời khuyến nghị</p>
 <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
 {answerFormula.map((step) => (
 <div key={step.letter} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-slate-900">
 <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg font-black ${tones[step.tone].step}`}>
 {step.letter}
 </span>
 <div>
 <p className="text-base font-black">{step.title}</p>
 <p className="text-sm font-light text-slate-500">{step.headline}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>

 <aside className="lg:col-span-2 border-t border-slate-200 bg-slate-100 p-6 lg:border-l lg:border-t-0 lg:p-8">
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
 {examFacts.map((fact) => (
 <div key={fact.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
 <div className="flex items-center gap-2 text-slate-500 ">
 {fact.icon}
 <span className="text-sm font-extrabold uppercase">{fact.label}</span>
 </div>
 <p className="mt-3 whitespace-nowrap text-2xl font-black leading-tight text-slate-950">{fact.value}</p>
 <p className="mt-1 text-sm font-light leading-relaxed text-slate-600 ">{fact.detail}</p>
 </div>
 ))}
 </div>
 </aside>
 </div>
 </header>

 <section>
 <SectionTitle
 eyebrow="Bước xử lý"
 title="Từ câu hỏi đến câu trả lời trong 4 nhịp"
 subtitle="Part 1 không cần nói dài. Cái cần là phản xạ đúng dạng câu, rõ ý chính và đủ thông tin để giám khảo thấy bạn kiểm soát được câu trả lời."
 icon={<Activity size={21} />}
 />
 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
 {workflow.map((item, idx) => (
 <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
 <div className="mb-4 flex items-center justify-between">
 <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
 {idx + 1}
 </span>
 {idx < workflow.length - 1 && <ArrowRight size={20} className="hidden text-slate-300 xl:block" />}
 </div>
 <h4 className="text-lg font-black text-slate-950">{item.title}</h4>
 <p className="mt-2 text-base font-light leading-relaxed text-slate-600 ">{item.detail}</p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <SectionTitle
 eyebrow="Nhận diện"
 title="Ba dạng câu hỏi thường gặp"
 subtitle="Mỗi dạng có tín hiệu nhận biết riêng. Nhìn đúng tín hiệu thì bạn sẽ chọn được khung trả lời phù hợp ngay."
 icon={<HelpCircle size={21} />}
 />
 
 <div className="space-y-6">
 <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
 <div className="h-1.5 rounded-t-lg bg-indigo-600"></div>
 <div className="grid grid-cols-1 lg:grid-cols-4">
 <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
 <div className="lg:sticky lg:top-8">
 <p className="text-sm font-black uppercase text-indigo-700 ">Dạng 01</p>
 <h4 className="mt-2 text-2xl font-black text-slate-950">Yes - No</h4>
 <p className="mt-3 text-base font-light leading-relaxed text-slate-600 ">
 Câu hỏi bắt đầu bằng trợ động từ, động từ tobe hoặc động từ khiếm khuyết. Câu trả lời nên có Yes/No rõ ràng trước.
 </p>
 <div className="mt-5 rounded-lg bg-indigo-50 p-4">
 <p className="font-black text-indigo-800">Khung trả lời</p>
 <div className="mt-2 space-y-1 text-justify text-base font-light leading-relaxed text-indigo-800">
 <p><span className="font-black text-slate-950">Bước 1:</span> Trả lời Yes hoặc No đồng thời nói rõ quan điểm cá nhân</p>
 <p><span className="font-black text-slate-950">Bước 2:</span> cho lý do</p>
 <p><span className="font-black text-slate-950">Bước 3:</span> mở rộng câu trả lời</p>
 </div>
 </div>
 </div>
 </div>
 <div className="lg:col-span-3 divide-y divide-slate-100">
 {yesNoGroups.map((group) => (
 <div key={group.title} className="p-5">
 <div className="mb-3 flex flex-wrap items-center gap-2">
 <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tones[group.tone].step}`}>
 <List size={17} />
 </span>
 <h5 className="mr-1 text-lg font-black text-slate-950">{group.title}</h5>
 {group.chips.map((chip) => <Chip key={chip} tone={group.tone}>{chip}</Chip>)}
 </div>
 <div className="-mx-5 border-t border-slate-100 ">
 <ExampleRows items={group.items} tone={group.tone} />
 </div>
 </div>
 ))}
 </div>
 </div>
 </article>
 
 <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
 <div className="h-1.5 rounded-t-lg bg-amber-500"></div>
 <div className="grid grid-cols-1 lg:grid-cols-4">
 <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
 <div className="lg:sticky lg:top-8">
 <p className="text-sm font-black uppercase text-amber-700">Dạng 02</p>
 <h4 className="mt-2 text-2xl font-black text-slate-950">Chọn một trong hai</h4>
 <p className="mt-3 text-base font-light leading-relaxed text-slate-600 ">
 Tín hiệu rõ nhất là từ <strong className="font-black text-slate-950">or</strong>. Bạn chỉ cần chọn một phía rồi giải thích vì sao.
 </p>
 <div className="mt-5 rounded-lg bg-amber-50 p-4">
 <p className="font-black text-amber-900">Khung trả lời</p>
 <div className="mt-2 space-y-1 text-justify text-base font-light leading-relaxed text-amber-900">
 <p><span className="font-black text-slate-950">Bước 1:</span> đưa ra lựa chọn</p>
 <p><span className="font-black text-slate-950">Bước 2:</span> cho lý do</p>
 <p><span className="font-black text-slate-950">Bước 3:</span> mở rộng câu trả lời</p>
 </div>
 </div>
 </div>
 </div>
 <div className="lg:col-span-3">
 <div className="grid grid-cols-1 border-b border-slate-100 lg:grid-cols-2">
 {choicePatterns.map((pattern, idx) => (
 <div key={pattern} className="flex gap-3 border-b border-slate-100 px-5 py-4 lg:border-r lg:[&:nth-child(even)]:border-r-0">
 <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500 text-sm font-black text-slate-950">
 {idx + 1}
 </span>
 <p className="font-mono text-lg font-black leading-snug text-slate-900 ">{renderChoicePattern(pattern)}</p>
 </div>
 ))}
 </div>
 <ExampleRows items={choiceExamples} tone="amber" columns />
 </div>
 </div>
 </article>

 <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
 <div className="h-1.5 rounded-t-lg bg-rose-600"></div>
 <div className="grid grid-cols-1 lg:grid-cols-4">
 <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
 <div className="lg:sticky lg:top-8">
 <p className="text-sm font-black uppercase text-rose-700">Dạng 03</p>
 <h4 className="mt-2 text-2xl font-black text-slate-950">Thông tin chi tiết</h4>
 <p className="mt-3 text-base font-light leading-relaxed text-slate-600 ">
 Câu hỏi bắt đầu bằng <strong className="font-black uppercase text-red-600 ">Wh-word</strong>. Từ hỏi quyết định loại thông tin cần trả lời.
 </p>
 <div className="mt-5 grid grid-cols-3 gap-1.5">
 {whWords.map((item) => <WhChip key={item.en} item={item} />)}
 </div>
 </div>
 </div>
 <div className="lg:col-span-3">
 <div className="wh-formula-grid grid grid-cols-1 border-b border-slate-100 xl:grid-cols-2">
 <div className="border-r border-slate-100 ">
 {detailStructures.tobe.map((formula) => <FormulaRow key={formula.id} formula={formula} />)}
 </div>
 <div>
 {detailStructures.support.map((formula) => <FormulaRow key={formula.id} formula={formula} />)}
 </div>
 </div>
 <ExampleRows items={detailExamples} tone="rose" columns />
 </div>
 </div>
 </article>
 </div>
 </section>

 <VisualAnswerFlow />

 

 </div>
 );
 });


 // Tách riêng"Shared vocab & expressions" từ group1 (chạy 1 lần ngoài component để tránh mất data khi re-render)
 const sharedVocabGroup = vstepGroupsData.find(g => g.id === 'group1');
 let sharedVocabData = null;
 if (sharedVocabGroup) {
 sharedVocabData = sharedVocabGroup.subtopics.find(s => s.id === 'sub1_5');
 if (sharedVocabData) {
 sharedVocabData.title ="Cấu trúc & từ vựng dùng chung";
 }
 sharedVocabGroup.subtopics = sharedVocabGroup.subtopics.filter(s => s.id !== 'sub1_5');
 }

 const Adj = ({ word, vi }) => {
 const [showVi, setShowVi] = useState(false);
 return (
 <span 
 onClick={() => setShowVi(!showVi)} 
 className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg cursor-pointer transition-colors text-sm font-light border border-slate-200 select-none shadow-sm active:scale-95"
 title="Nhấn để xem nghĩa tiếng Việt"
 >
 <span>{word}</span>
 {showVi && <span className="text-xs text-rose-600 font-light ml-1 animate-fade-in">{vi}</span>}
 </span>
 );
 };

 const AdjectivesTab = React.memo(() => {
 return (
 <div className="space-y-6 text-slate-800 pb-8 animate-fade-in">
 <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
 <h3 className="text-xl font-black text-indigo-900 mb-4">CÁCH SỬ DỤNG TÍNH TỪ</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
 <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="mb-2 text-base leading-relaxed">
 <span className="font-bold text-slate-900">1. I feel</span> <span className="font-bold text-slate-400 mx-1">+</span>
 <span className="px-2 py-0.5 bg-teal-800 text-white rounded-md text-sm font-bold mx-1 shadow-sm">tính từ</span>
 </div>
 <p className="text-sm text-slate-600 mb-2 font-light">Dùng tính từ miêu tả cảm xúc</p>
 <div className="bg-indigo-50 p-2 rounded-lg text-sm text-indigo-900 italic font-light">"I feel <span className="font-bold text-rose-500">relaxed</span>."</div>
 </div>
 <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="mb-2 text-base leading-relaxed">
 <span className="font-bold text-slate-900">2. It makes me feel</span> <span className="font-bold text-slate-400 mx-1">+</span>
 <span className="px-2 py-0.5 bg-teal-800 text-white rounded-md text-sm font-bold mx-1 shadow-sm">tính từ</span>
 </div>
 <p className="text-sm text-slate-600 mb-2 font-light">Dùng tính từ miêu tả cảm xúc</p>
 <div className="bg-indigo-50 p-2 rounded-lg text-sm text-indigo-900 italic font-light">"It makes me feel <span className="font-bold text-rose-500">happy</span>."</div>
 </div>
 <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="mb-2 text-base leading-relaxed">
 <span className="font-bold text-slate-900">3. It's / I find it</span> <span className="font-bold text-slate-400 mx-1">+</span>
 <span className="px-2 py-0.5 bg-teal-800 text-white rounded-md text-sm font-bold mx-1 shadow-sm">tính từ</span>
 </div>
 <p className="text-sm text-slate-600 mb-2 font-light">Dùng tính từ miêu tả sự vật, sự việc</p>
 <div className="bg-indigo-50 p-2 rounded-lg text-sm text-indigo-900 italic mb-2 font-light">"It's <span className="font-bold text-rose-500">beautiful</span>."</div>
 <div className="bg-indigo-50 p-2 rounded-lg text-sm text-indigo-900 italic font-light">"I find it <span className="font-bold text-rose-500">beautiful</span>."</div>
 </div>
 <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="mb-2 text-base leading-relaxed">
 <span className="font-bold text-slate-900 mr-1">4. It's</span>
 <span className="px-2 py-0.5 bg-teal-800 text-white rounded-md text-sm font-bold mx-1 shadow-sm">tính từ</span>
 <span className="font-bold text-slate-900 mx-1">for</span>
 <span className="px-2 py-0.5 bg-slate-800 text-white rounded-md text-sm font-bold mx-1 shadow-sm">ai đó</span>
 <span className="font-bold text-slate-900 mx-1">to</span>
 <span className="px-2 py-0.5 bg-rose-500 text-white rounded-md text-sm font-bold mx-1 shadow-sm">làm gì đó</span>
 </div>
 <p className="text-sm text-slate-600 mb-2 font-light">Miêu tả tính chất của việc gì đối với ai đó</p>
 <div className="bg-indigo-50 p-2 rounded-lg text-sm text-indigo-900 italic font-light">"It's <span className="font-bold text-rose-500">easy</span> for me to learn English."</div>
 </div>
 </div>

 <div className="space-y-3">
 <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
 <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-0.5">Lưu ý 1</span>
 <div>
 <p className="text-sm text-slate-700 font-light">Có thể thêm trạng từ chỉ mức độ trước tính từ: <span className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded shadow-sm">very, really, quite, a bit, extremely</span></p>
 <p className="text-sm text-emerald-700 mt-1.5 italic font-light">VD:"It's <span className="font-bold">really</span> beautiful."</p>
 </div>
 </div>
 <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
 <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-0.5">Lưu ý 2</span>
 <div>
 <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-700 mb-1 font-light">
 <span className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded shadow-sm">more + tính từ</span>
 <span className="text-slate-400 text-xs">hoặc</span>
 <span className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded shadow-sm">tính từ + er</span>
 <span className="inline-flex items-center justify-center w-5 h-5 bg-amber-50 text-amber-500 rounded-full mx-0.5 shadow-sm text-xs border border-amber-200">➔</span>
 <span>Mang nghĩa <span className="font-bold text-amber-700">"... hơn"</span></span>
 </div>
 <p className="text-sm text-amber-700 italic font-light">VD:"It's <span className="font-bold">more</span> comfortable." /"It's <span className="font-bold">easier</span>."</p>
 </div>
 </div>
 <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-rose-100 shadow-sm">
 <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-0.5">Lưu ý 3</span>
 <div>
 <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-700 mb-1 font-light">
 <span className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded shadow-sm">the most + tính từ</span>
 <span className="inline-flex items-center justify-center w-5 h-5 bg-rose-50 text-rose-500 rounded-full mx-0.5 shadow-sm text-xs border border-rose-200">➔</span>
 <span>Mang nghĩa <span className="font-bold text-rose-700">"... nhất"</span></span>
 </div>
 <p className="text-sm text-rose-700 italic font-light">VD:"It's <span className="font-bold">the most</span> memorable experience."</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">1. Tính từ miêu tả Cảm xúc & Trạng thái tinh thần</h3>
 <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl mb-4 text-sm text-yellow-800 ">
 <strong className="font-bold">Mẹo:</strong> Nhấn vào từng từ để xem nghĩa tiếng Việt!
 </div>
 <ul className="space-y-4">
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Tích cực</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="happy" vi="vui vẻ" /><Adj word="relaxed" vi="thư giãn" /><Adj word="excited" vi="hào hứng" />
 <Adj word="comfortable" vi="thoải mái" /><Adj word="confident" vi="tự tin" /><Adj word="calm" vi="bình tĩnh" />
 <Adj word="refreshed" vi="sảng khoái" /><Adj word="energetic" vi="tràn đầy năng lượng" /><Adj word="motivated" vi="có động lực" />
 <Adj word="peaceful" vi="yên bình" /><Adj word="proud" vi="tự hào" /><Adj word="satisfied" vi="hài lòng" />
 <Adj word="cheerful" vi="vui tươi" /><Adj word="positive" vi="tích cực" /><Adj word="safe" vi="an toàn" />
 <Adj word="grateful" vi="biết ơn" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Tiêu cực - Mệt mỏi</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="tired" vi="mệt mỏi" /><Adj word="exhausted" vi="kiệt sức" /><Adj word="stressed" vi="căng thẳng" />
 <Adj word="bored" vi="buồn chán" /><Adj word="sad" vi="buồn bã" /><Adj word="nervous" vi="lo lắng" />
 <Adj word="anxious" vi="lo âu" /><Adj word="frustrated" vi="bực bội" /><Adj word="disappointed" vi="thất vọng" />
 <Adj word="lonely" vi="cô đơn" /><Adj word="overwhelmed" vi="quá tải, ngợp" /><Adj word="uncomfortable" vi="khó chịu" />
 <Adj word="awkward" vi="ngại ngùng" /><Adj word="insecure" vi="tự ti, bất an" /><Adj word="sleepy" vi="buồn ngủ" />
 <Adj word="angry" vi="tức giận" />
 </div>
 </li>
 </ul>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">2. Tính từ miêu tả Đồ ăn & Thức uống</h3>
 <ul className="space-y-4">
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Độ ngon & Mùi vị</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="delicious" vi="rất ngon" /><Adj word="tasty" vi="ngon miệng" />
 <Adj word="flavorful" vi="đậm đà, thơm ngon" /><Adj word="rich" vi="đậm đà, béo ngậy" />
 <Adj word="sweet" vi="ngọt" /><Adj word="spicy" vi="cay" /><Adj word="sour" vi="chua" />
 <Adj word="salty" vi="mặn" /><Adj word="bitter" vi="đắng" /><Adj word="bland" vi="nhạt nhẽo" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Tính chất & Kết cấu</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="crispy" vi="giòn rụm" /><Adj word="crunchy" vi="giòn sần sật" /><Adj word="tender" vi="mềm, mềm thơm" />
 <Adj word="juicy" vi="mọng nước" /><Adj word="soft" vi="mềm mịn" /><Adj word="creamy" vi="béo ngậy, sánh mịn" />
 <Adj word="chewy" vi="dai dai, dẻo" /><Adj word="fresh" vi="tươi mới" />
 <Adj word="tough" vi="dai, khó nhai" /><Adj word="dry" vi="khô khốc" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Đánh giá chung</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="healthy" vi="lành mạnh" /><Adj word="nutritious" vi="bổ dưỡng" /><Adj word="refreshing" vi="thanh mát, sảng khoái" />
 <Adj word="filling" vi="no bụng, chắc bụng" /><Adj word="light" vi="nhẹ bụng, thanh đạm" /><Adj word="greasy" vi="nhiều dầu mỡ, ngấy" />
 <Adj word="affordable" vi="vừa túi tiền" /><Adj word="expensive" vi="đắt đỏ" /><Adj word="convenient" vi="tiện lợi" />
 <Adj word="authentic" vi="chuẩn vị, chính gốc" />
 </div>
 </li>
 </ul>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">3. Tính từ miêu tả Địa điểm, Sự vật & Thời tiết</h3>
 <ul className="space-y-4">
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Địa điểm</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="peaceful" vi="yên bình" /><Adj word="quiet" vi="yên tĩnh" /><Adj word="comfortable" vi="tiện nghi, thoải mái" />
 <Adj word="pleasant" vi="dễ chịu, thư thái" /><Adj word="relaxing" vi="thư thái, thư giãn" /><Adj word="cozy" vi="ấm cúng" />
 <Adj word="spacious" vi="rộng rãi" /><Adj word="cramped" vi="chật chội" /><Adj word="beautiful" vi="đẹp đẽ" />
 <Adj word="lively" vi="náo nhiệt" /><Adj word="vibrant" vi="sôi động, rực rỡ" /><Adj word="bustling" vi="nhộn nhịp, tấp nập" />
 <Adj word="crowded" vi="đông đúc" /><Adj word="noisy" vi="ồn ào" /><Adj word="modern" vi="hiện đại" />
 <Adj word="clean" vi="sạch sẽ" /><Adj word="polluted" vi="ô nhiễm" /><Adj word="convenient" vi="thuận tiện" />
 <Adj word="safe" vi="an toàn" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Thời tiết</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="pleasant" vi="dễ chịu, ôn hòa" /><Adj word="comfortable" vi="dễ chịu, thoải mái" /><Adj word="refreshing" vi="sảng khoái, trong lành" />
 <Adj word="warm" vi="ấm áp" /><Adj word="cool" vi="mát mẻ" /><Adj word="hot" vi="nóng" />
 <Adj word="scorching" vi="nóng như thiêu" /><Adj word="cold" vi="lạnh" /><Adj word="chilly" vi="se lạnh" />
 <Adj word="freezing" vi="lạnh cóng" /><Adj word="humid" vi="oi bức, ẩm" /><Adj word="dry" vi="khô ráo" />
 <Adj word="sunny" vi="nhiều nắng" /><Adj word="windy" vi="nhiều gió" /><Adj word="gloomy" vi="u ám" />
 <Adj word="unpredictable" vi="thất thường" /><Adj word="harsh" vi="khắc nghiệt" />
 </div>
 </li>
 </ul>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">4. Tính từ miêu tả Trải nghiệm & Sự việc</h3>
 <ul className="space-y-4">
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Tích cực & Thú vị</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="fun" vi="vui vẻ" /><Adj word="interesting" vi="thú vị" /><Adj word="exciting" vi="hào hứng" />
 <Adj word="enjoyable" vi="thích thú" /><Adj word="relaxing" vi="thư giãn" /><Adj word="rewarding" vi="bổ ích, đáng giá" />
 <Adj word="meaningful" vi="ý nghĩa" /><Adj word="memorable" vi="đáng nhớ" /><Adj word="special" vi="đặc biệt" />
 <Adj word="inspiring" vi="truyền cảm hứng" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Thử thách & Độ khó</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="easy" vi="dễ dàng" /><Adj word="simple" vi="đơn giản" /><Adj word="hard" vi="khó" />
 <Adj word="difficult" vi="khó khăn" /><Adj word="challenging" vi="đầy thử thách" /><Adj word="complicated" vi="phức tạp" />
 <Adj word="demanding" vi="đòi hỏi cao" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Mệt mỏi & Tiêu cực</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="boring" vi="nhàm chán" /><Adj word="tiring" vi="mệt mỏi" /><Adj word="exhausting" vi="kiệt sức" />
 <Adj word="stressful" vi="căng thẳng" /><Adj word="frustrating" vi="bực bội, nản lòng" /><Adj word="annoying" vi="phiền phức" />
 <Adj word="time-consuming" vi="tốn thời gian" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Giá trị & Tiện ích</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="useful" vi="hữu ích" /><Adj word="helpful" vi="có ích" /><Adj word="practical" vi="thiết thực" />
 <Adj word="effective" vi="hiệu quả" /><Adj word="convenient" vi="thuận tiện" /><Adj word="inconvenient" vi="bất tiện" />
 <Adj word="important" vi="quan trọng" /><Adj word="necessary" vi="cần thiết" />
 </div>
 </li>
 </ul>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">5. Tính từ miêu tả Con người</h3>
 <ul className="space-y-4">
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Ngoại hình</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="tall" vi="cao ráo" /><Adj word="short" vi="thấp, lùn" /><Adj word="slim" vi="thon gọn, mảnh mai" />
 <Adj word="fit" vi="cân đối, săn chắc" /><Adj word="chubby" vi="mũm mĩm, tròn trịa" /><Adj word="strong" vi="khỏe khoắn, vạm vỡ" />
 <Adj word="good-looking" vi="sáng sủa, ưa nhìn" /><Adj word="attractive" vi="cuốn hút" /><Adj word="handsome" vi="đẹp trai" />
 <Adj word="pretty" vi="xinh xắn" /><Adj word="cute" vi="dễ thương" /><Adj word="neat" vi="gọn gàng, chỉn chu" />
 <Adj word="young" vi="trẻ trung" /><Adj word="old" vi="lớn tuổi, già" />
 </div>
 </li>
 <li className="flex flex-col gap-2">
 <strong className="font-mono text-red-800 font-bold uppercase tracking-wide text-sm">Tính cách</strong> 
 <div className="flex flex-wrap gap-2">
 <Adj word="friendly" vi="thân thiện" /><Adj word="kind" vi="tốt bụng" /><Adj word="funny" vi="hài hước, vui tính" />
 <Adj word="easy-going" vi="dễ tính, hòa đồng" /><Adj word="hard-working" vi="chăm chỉ" /><Adj word="patient" vi="kiên nhẫn" />
 <Adj word="outgoing" vi="cởi mở, hướng ngoại" /><Adj word="shy" vi="nhút nhát" /><Adj word="quiet" vi="trầm tính, ít nói" />
 <Adj word="supportive" vi="hay giúp đỡ, ủng hộ" /><Adj word="generous" vi="hào phóng" /><Adj word="reliable" vi="đáng tin cậy" />
 <Adj word="polite" vi="lịch sự" /><Adj word="honest" vi="thật thà, trung thực" /><Adj word="smart" vi="thông minh, nhanh nhạy" />
 <Adj word="confident" vi="tự tin" />
 </div>
 </li>
 </ul>
 </div>
 </div>
 );
 });

 const BenefitsTab = React.memo(() => {
 const [activeLevel, setActiveLevel] = useState('b1');
 const [activeItem, setActiveItem] = useState(null);
 const [activeStruct, setActiveStruct] = useState(null);
 
 const sNode = "<span class='font-bold text-red-600 '>S</span>";
 const aiDoNode = "<span class='px-2 py-0.5 bg-slate-800 text-white rounded-md text-sm font-bold mx-1'>ai đó</span>";
 const lamGiDoNode = "<span class='px-2 py-0.5 bg-rose-500 text-white rounded-md text-sm font-bold mx-1'>làm gì đó</span>";
 
 const structures = [
 { 
 en: `${sNode} help<span class='text-orange-500 font-bold'>s</span> ${aiDoNode} ${lamGiDoNode}`,
 vi: `${sNode} giúp ${aiDoNode} ${lamGiDoNode}`
 },
 { 
 en: `${sNode} allow<span class='text-orange-500 font-bold'>s</span> ${aiDoNode} to ${lamGiDoNode}`,
 vi: `${sNode} cho phép ${aiDoNode} ${lamGiDoNode}`
 },
 { 
 en: `${sNode} is a great way for ${aiDoNode} to ${lamGiDoNode}`,
 vi: `${sNode} là một cách tuyệt vời để ${aiDoNode} ${lamGiDoNode}`
 },
 { 
 en: `${sNode} give<span class='text-orange-500 font-bold'>s</span> ${aiDoNode} the chan<span class='text-orange-500 font-bold'>ce</span> to ${lamGiDoNode}`,
 vi: `${sNode} cho ${aiDoNode} cơ hội ${lamGiDoNode}`
 }
 ];

 const b1Phrases = {
 mental: [
 { en:"relax", vi:"thư giãn" },
 { en:"reduce stress", vi:"giảm căng thẳng" },
 { en:"regain energy", vi:"phục hồi năng lượng" },
 { en:"improve my mood", vi:"cải thiện tâm trạng" },
 { en:"forget about work", vi:"quên đi công việc" },
 { en:"make new friends", vi:"kết bạn mới" },
 { en:"become more confident", vi:"trở nên tự tin hơn" },
 { en:"become more responsible", vi:"trở nên có trách nhiệm hơn" },
 { en:"become more positive", vi:"trở nên tích cực hơn" },
 { en:"become more patient", vi:"trở nên kiên nhẫn hơn" },
 { en:"become more sociable", vi:"trở nên hòa đồng hơn" },
 { en:"become more independent", vi:"trở nên tự lập hơn" }
 ],
 knowledge: [
 { en:"learn new things", vi:"học những điều mới" },
 { en:"learn a new language", vi:"học một ngôn ngữ mới" },
 { en:"learn new vocabulary", vi:"học từ vựng mới" },
 { en:"improve memory", vi:"cải thiện trí nhớ" },
 { en:"improve imagination", vi:"cải thiện trí tưởng tượng" },
 { en:"improve concentration", vi:"cải thiện sự tập trung" },
 { en:"improve soft-skills", vi:"cải thiện kỹ năng mềm" },
 { en:"widen knowledge", vi:"mở rộng kiến thức" },
 { en:"make better decisions", vi:"đưa ra quyết định tốt hơn" },
 { en:"work better", vi:"làm việc tốt hơn" },
 { en:"study better", vi:"học tập tốt hơn" },
 { en:"explore cultures", vi:"khám phá các nền văn hóa" },
 { en:"have new experiences", vi:"có những trải nghiệm mới" },
 { en:"explore new places", vi:"khám phá những địa điểm mới" }
 ],
 health: [
 { en:"improve physical health", vi:"cải thiện sức khỏe thể chất" },
 { en:"improve mental health", vi:"cải thiện sức khỏe tinh thần" },
 { en:"stay healthy", vi:"giữ sức khỏe" },
 { en:"sleep better", vi:"ngủ ngon hơn" },
 { en:"lose weight", vi:"giảm cân" },
 { en:"keep fit", vi:"giữ dáng" },
 { en:"have a healthy lifestyle", vi:"có một lối sống lành mạnh" },
 { en:"avoid getting sick", vi:"tránh bị ốm" },
 { en:"get stronger", vi:"trở nên khỏe mạnh hơn" },
 { en:"build muscles", vi:"xây dựng cơ bắp" }
 ]
 };

 const b2Phrases = {
 mental: [
 { en:"unwind", vi:"thư giãn" },
 { en:"blow off some steam", vi:"xả hơi / giảm căng thẳng" },
 { en:"recharge battery", vi:"nạp lại năng lượng" },
 { en:"boost my mood", vi:"cải thiện tâm trạng" },
 { en:"forget about work for a while", vi:"tạm quên đi công việc" },
 { en:"expand my social circle", vi:"mở rộng mối quan hệ xã hội" },
 { en:"become more confident", vi:"trở nên tự tin hơn" },
 { en:"become more responsible", vi:"trở nên có trách nhiệm hơn" },
 { en:"become more positive", vi:"trở nên tích cực hơn" },
 { en:"become more patient", vi:"trở nên kiên nhẫn hơn" },
 { en:"become more sociable", vi:"trở nên hòa đồng hơn" },
 { en:"become more independent", vi:"trở nên tự lập hơn" },
 { en:"become more disciplined", vi:"trở nên kỷ luật hơn" }
 ],
 knowledge: [
 { en:"learn new things", vi:"học những điều mới" },
 { en:"learn a new language", vi:"học một ngôn ngữ mới" },
 { en:"learn new vocabulary", vi:"học từ vựng mới" },
 { en:"learn valuable lessons", vi:"học những bài học quý giá" },
 { en:"enhance memory", vi:"tăng cường trí nhớ" },
 { en:"enhance imagination", vi:"tăng cường trí tưởng tượng" },
 { en:"enhance concentration", vi:"tăng cường sự tập trung" },
 { en:"enhance soft-skills", vi:"tăng cường kỹ năng mềm" },
 { en:"gain more knowledge", vi:"thu nhận thêm kiến thức" },
 { en:"make better decisions", vi:"đưa ra quyết định tốt hơn" },
 { en:"work more effectively", vi:"làm việc hiệu quả hơn" },
 { en:"study more effectively", vi:"học tập hiệu quả hơn" },
 { en:"explore different cultures", vi:"khám phá các nền văn hóa khác nhau" },
 { en:"develop critical thinking", vi:"phát triển tư duy phản biện" },
 { en:"gain new experiences", vi:"có được những trải nghiệm mới" },
 { en:"explore unfamiliar places", vi:"khám phá những địa điểm mới lạ" }
 ],
 health: [
 { en:"enhance physical health", vi:"tăng cường sức khỏe thể chất" },
 { en:"enhance mental health", vi:"tăng cường sức khỏe tinh thần" },
 { en:"keep my mind sharp", vi:"giữ cho đầu óc minh mẫn" },
 { en:"stay healthy", vi:"giữ sức khỏe" },
 { en:"sleep better", vi:"ngủ ngon hơn" },
 { en:"lose weight", vi:"giảm cân" },
 { en:"stay in shape", vi:"giữ vóc dáng" },
 { en:"build a healthy lifestyle", vi:"xây dựng lối sống lành mạnh" },
 { en:"lower the risk of getting sick", vi:"giảm nguy cơ mắc bệnh" },
 { en:"get stronger", vi:"trở nên khỏe mạnh hơn" },
 { en:"build muscles", vi:"xây dựng cơ bắp" },
 { en:"strengthen the immune system", vi:"tăng cường hệ miễn dịch" }
 ]
 };

 const currentPhrases = activeLevel === 'b1' ? b1Phrases : b2Phrases;

 return (
 <div className="animate-fade-in space-y-6 sm:space-y-8 mt-2">
 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">1. Cấu trúc kể lợi ích</h3>
 <div className="grid grid-cols-1 gap-3 sm:gap-4">
 {structures.map((struct, idx) => (
 <div 
 key={idx} 
 className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-2 md:gap-4 cursor-pointer hover:shadow transition-shadow"
 onClick={() => setActiveStruct(activeStruct === idx ? null : idx)}
 >
 <span className="font-light text-slate-800 text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: struct.en }}></span>
 {activeStruct === idx && (
 <>
 <span className="text-slate-400 hidden md:inline font-bold">=</span>
 <span className="font-light text-slate-800 text-base sm:text-lg leading-relaxed animate-fade-in" dangerouslySetInnerHTML={{ __html: struct.vi }}></span>
 </>
 )}
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
 <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 uppercase">2. Các cụm từ chỉ lợi ích</h3>
 <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl mb-4 text-sm text-yellow-800 ">
 <strong className="font-bold">Mẹo:</strong> Nhấn vào từng cụm từ để xem nghĩa tiếng Việt!
 </div>
 
 <div className="flex items-center gap-2 mb-6">
 <button 
 onClick={() => { setActiveLevel('b1'); setActiveItem(null); }}
 className={`px-5 py-2 sm:py-2.5 rounded-xl font-bold transition-all ${activeLevel === 'b1' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 '}`}
 >
 Level B1
 </button>
 <button 
 onClick={() => { setActiveLevel('b2'); setActiveItem(null); }}
 className={`px-5 py-2 sm:py-2.5 rounded-xl font-bold transition-all ${activeLevel === 'b2' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 '}`}
 >
 Level B2
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="space-y-4">
 <h4 className="font-bold text-center text-rose-600 bg-rose-50 py-2 rounded-xl border border-rose-100 uppercase text-sm tracking-wider">Tinh thần</h4>
 <div className="flex flex-col gap-2 w-full">
 {currentPhrases.mental.map((item, idx) => (
 <button 
 key={`mental-${idx}`}
 onClick={() => setActiveItem(activeItem ===`mental-${idx}` ? null :`mental-${idx}`)}
 className={`px-3 py-2.5 rounded-xl text-sm font-light transition-all border flex flex-wrap items-center gap-2 text-left w-full ${
 activeItem ===`mental-${idx}` 
 ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
 : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 '
 }`}
 >
 <span className="shrink-0">{item.en}</span>
 {activeItem ===`mental-${idx}` && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-lg text-sm shrink-0 animate-fade-in font-light">{item.vi}</span>}
 </button>
 ))}
 </div>
 </div>

 <div className="space-y-4">
 <h4 className="font-bold text-center text-blue-600 bg-blue-50 py-2 rounded-xl border border-blue-100 uppercase text-sm tracking-wider">Kiến thức</h4>
 <div className="flex flex-col gap-2 w-full">
 {currentPhrases.knowledge.map((item, idx) => (
 <button 
 key={`knowledge-${idx}`}
 onClick={() => setActiveItem(activeItem ===`knowledge-${idx}` ? null :`knowledge-${idx}`)}
 className={`px-3 py-2.5 rounded-xl text-sm font-light transition-all border flex flex-wrap items-center gap-2 text-left w-full ${
 activeItem ===`knowledge-${idx}` 
 ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
 : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 '
 }`}
 >
 <span className="shrink-0">{item.en}</span>
 {activeItem ===`knowledge-${idx}` && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-lg text-sm shrink-0 animate-fade-in font-light">{item.vi}</span>}
 </button>
 ))}
 </div>
 </div>

 <div className="space-y-4">
 <h4 className="font-bold text-center text-emerald-600 bg-emerald-50 py-2 rounded-xl border border-emerald-100 uppercase text-sm tracking-wider">Sức khoẻ</h4>
 <div className="flex flex-col gap-2 w-full">
 {currentPhrases.health.map((item, idx) => (
 <button 
 key={`health-${idx}`}
 onClick={() => setActiveItem(activeItem ===`health-${idx}` ? null :`health-${idx}`)}
 className={`px-3 py-2.5 rounded-xl text-sm font-light transition-all border flex flex-wrap items-center gap-2 text-left w-full ${
 activeItem ===`health-${idx}` 
 ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
 : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 '
 }`}
 >
 <span className="shrink-0">{item.en}</span>
 {activeItem ===`health-${idx}` && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-lg text-sm shrink-0 animate-fade-in font-light">{item.vi}</span>}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
 });

 const StructureCard = React.memo(({ struct, hideEnAudio }) => (
 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
 <div className="flex justify-between items-start mb-2">
 <span className="font-bold text-slate-800 text-base sm:text-lg pr-2 leading-snug" dangerouslySetInnerHTML={{ __html: struct.en }}></span>
 {!hideEnAudio && (
 <button onClick={(e) => { e.stopPropagation(); speakText(struct.en.replace(/<[^>]*>?/gm, '')); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex-shrink-0" title="Nghe phát âm cấu trúc"><Volume2 size={18} /></button>
 )}
 </div>
 <div className="mt-2 flex flex-col gap-3.5 flex-1">
 <span className="text-indigo-600 text-sm sm:text-base font-light block leading-relaxed" dangerouslySetInnerHTML={{ __html: struct.vi }}></span>
 <div className="bg-slate-50 p-3.5 rounded-lg flex items-start gap-2.5 mt-auto border border-slate-100 ">
 <button onClick={(e) => { e.stopPropagation(); speakText(struct.example.replace(/<[^>]*>?/gm, '')); }} className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0" title="Nghe phát âm câu ví dụ"><Volume2 size={16} /></button>
 <p className="text-slate-700 text-sm italic leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: struct.example }}></p>
 </div>
 </div>
 </div>
 ));

 const contentSections = [
  { key: 'b1', label: 'Level B1', dotClass: 'bg-blue-500' },
  { key: 'b2', label: 'Level B2', dotClass: 'bg-green-500' },
  { key: 'b1b2', label: 'Level B1 & B2', dotClass: 'bg-blue-500' },
  { key: 'c1', label: 'Level C1', dotClass: 'bg-purple-500' }
 ];

 const renderCollection = (data, renderItem, groupedLayout = false) => {
  if (!data) return null;

  if (Array.isArray(data)) {
   if (groupedLayout && data.length > 0 && data[0].groupTitle) {
    return (
     <div className="space-y-6 sm:space-y-8">
     {data.map((group, idx) => (
      <div key={idx} id={`expr-group-${idx}`}>
      <h4 className="text-base sm:text-lg font-black text-black uppercase tracking-wider mb-4 mt-2">{group.groupTitle}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
      {group.items.map((item, itemIdx) => renderItem(item, itemIdx))}
      </div>
      </div>
     ))}
     </div>
    );
   }
   return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">{data.map(renderItem)}</div>;
  }

  return (
   <div>
   {contentSections.map((section) => {
    const items = data[section.key];
    if (!items || items.length === 0) return null;
    return (
     <div key={section.key} className="mb-6 sm:mb-8">
     <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${section.key === 'b2' ? 'text-green-600' : section.key === 'c1' ? 'text-purple-600' : 'text-blue-600'}`}>
     <span className={`w-1.5 h-1.5 rounded-full ${section.dotClass}`}></span> {section.label}
     </h4>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">{items.map(renderItem)}</div>
     </div>
    );
   })}
   </div>
  );
 };

 const renderStructures = (data, hideEnAudio = false) => {
  if (!data) return null;
  return renderCollection(data, (struct, idx) => <StructureCard key={idx} struct={struct} hideEnAudio={hideEnAudio} />, true);
 };

 const renderVocabList = (data) => {
  if (!data) return null;
  return renderCollection(data, (vocab, idx) => (
   <VocabCard key={idx} word={vocab.word || vocab.en} ipa={vocab.ipa} pos={vocab.pos || 'phrase'} vi={vocab.vi} example={vocab.example} subItems={vocab.subItems} />
  ), true);
 };

 const App = () => {

 // Sort dữ liệu dựa trên thứ tự custom
 const sortedData = sortedVstepGroups;

 const [expandedGroups, setExpandedGroups] = useState(sortedData.length > 0 ? [sortedData[0].id] : []);
 const [activeView, setActiveView] = useState({ type: 'general_theory' });
 const [activeSharedTab, setActiveSharedTab] = useState('expressions');
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
 if (sortedData.length === 0) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
 <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md border border-slate-200 ">
 <h2 className="text-2xl font-bold text-red-600 mb-4">Chưa tải được dữ liệu</h2>
 </div>
 </div>
 )
 }

 const toggleGroup = (groupId) => {
 setExpandedGroups(prev => 
 prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
 );
 };

 const navigateToView = (viewObject) => {
 setActiveView(viewObject);
 setIsMobileMenuOpen(false);
 };

 const currentGroup = sortedData.find(g => g.id === activeView.id || g.id === activeView.groupId);
 const currentSubtopic = activeView.type === 'subtopic' ? currentGroup?.subtopics.find(s => s.id === activeView.id) : null;

 return (
 <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
 <div className="md:hidden bg-black text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
 <h1 className="text-lg font-black tracking-tight flex items-center gap-2 min-w-0">
 <Mic size={20} className="flex-shrink-0" />
 <span className="truncate">SPEAKING PART 01</span>
 </h1>
 <button 
 onClick={() => setIsMobileMenuOpen(true)}
 className="p-1 hover:bg-slate-800 rounded transition-colors flex-shrink-0 ml-2"
 >
 <Menu size={24} />
 </button>
 </div>

 {isMobileMenuOpen && (
 <div className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
 )}
 
 <div className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-[320px] bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:w-80 md:flex-shrink-0 md:h-screen md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
 <div className="p-4 sm:p-5 border-b border-slate-700 bg-black text-white flex justify-between items-center overflow-hidden">
 <h1 className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2 min-w-0">
 <Mic size={24} className="flex-shrink-0" />
 <span className="truncate hidden md:inline">SPEAKING PART 01</span>
 <span className="truncate md:hidden">Menu Bài Học</span>
 </h1>
 <button className="md:hidden p-1 hover:bg-slate-800 rounded flex-shrink-0 ml-2" onClick={() => setIsMobileMenuOpen(false)}>
 <X size={24} />
 </button>
 </div>
 
 <div className="p-4 overflow-y-auto flex-1 pb-20">
 <div className="mb-6">
 <h2 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">TÀI LIỆU CHUNG</h2>
 <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm p-1.5 space-y-1">
 <button 
 onClick={() => navigateToView({ type: 'general_theory' })} 
 className={`w-full text-left px-3.5 py-2.5 rounded-lg font-bold transition-all text-sm flex items-center ${activeView.type === 'general_theory' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50 '}`}
 >
 <span className="truncate">Lý thuyết chung</span>
 </button>
 {sharedVocabData && (
 <button 
 onClick={() => navigateToView({ type: 'shared_vocab' })} 
 className={`w-full text-left px-3.5 py-2.5 rounded-lg font-bold transition-all text-sm flex items-center ${activeView.type === 'shared_vocab' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50 '}`}
 >
 <span className="truncate">Cấu trúc & từ vựng dùng chung</span>
 </button>
 )}
 </div>
 </div>

 <h2 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">DANH SÁCH BÀI HỌC</h2>
 <div className="space-y-3">
 {sortedData.map(group => {
 const isExpanded = expandedGroups.includes(group.id);
 return (
 <div key={group.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
 <button onClick={() => toggleGroup(group.id)} className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
 <span className="font-bold text-slate-800 text-sm sm:text-base text-left pr-2">{group.title}</span>
 {isExpanded ? <ChevronDown size={18} className="text-slate-500 flex-shrink-0" /> : <ChevronRight size={18} className="text-slate-400 flex-shrink-0" />}
 </button>

 {isExpanded && (
 <div className="p-1.5 sm:p-2 border-t border-slate-100 bg-white ">
 <button onClick={() => navigateToView({ type: 'group', id: group.id })} className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 font-semibold flex items-center gap-2 transition-all text-[13px] sm:text-sm ${activeView.type === 'group' && activeView.id === group.id ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-orange-500'}`}>
 Từ vựng chung của nhóm {group.title.match(/\d+/)?.[0] || '1'}
 </button>
 
 <div className="space-y-1 mt-1.5 sm:mt-2">
 {group.subtopics.map(sub => {
 const isActiveSub = activeView.type === 'subtopic' && activeView.id === sub.id;
 return (
 <button key={sub.id} onClick={() => navigateToView({ type: 'subtopic', id: sub.id, groupId: group.id })} className={`w-full text-left px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-all text-[13px] sm:text-sm flex items-center justify-between ${isActiveSub ? 'bg-indigo-50 text-indigo-700 relative' : 'hover:bg-slate-50 text-slate-600 '}`}>
 <span className="truncate pr-2">{sub.title}</span>
 {isActiveSub && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>}
 </button>
 );
 })}
 </div>
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 </div>

 <div className="flex-1 overflow-y-auto relative w-full">
 <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 md:p-10 pb-20">
 {activeView.type === 'general_theory' && (
 <GeneralTheory />
 )}

 {activeView.type === 'shared_vocab' && sharedVocabData && (
 <div className="animate-fade-in">
 <header className="mb-6 sm:mb-8 flex items-center gap-3">
 <div className="bg-orange-100 text-orange-600 p-2 sm:p-3 rounded-2xl hidden sm:block"><BookOpen size={28} /></div>
 <div>
 <span className="text-xs sm:text-sm font-bold text-orange-500 uppercase tracking-wider">Tài liệu chung</span>
 <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mt-1">{sharedVocabData.title}</h2>
 </div>
 </header>

 {/* Tabs */}
 <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 border-b border-slate-200 pb-4">
 <button
 onClick={() => setActiveSharedTab('expressions')}
 className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
 activeSharedTab === 'expressions' 
 ? 'bg-blue-600 text-white shadow-md' 
 : 'bg-slate-100 text-slate-600 hover:bg-slate-200 '
 }`}
 >
 Cách diễn đạt
 </button>
 <button
 onClick={() => setActiveSharedTab('adjectives')}
 className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
 activeSharedTab === 'adjectives' 
 ? 'bg-blue-600 text-white shadow-md' 
 : 'bg-slate-100 text-slate-600 hover:bg-slate-200 '
 }`}
 >
 Tính từ
 </button>
 <button
 onClick={() => setActiveSharedTab('benefits')}
 className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
 activeSharedTab === 'benefits' 
 ? 'bg-blue-600 text-white shadow-md' 
 : 'bg-slate-100 text-slate-600 hover:bg-slate-200 '
 }`}
 >
 Kể lợi ích
 </button>
 </div>

 {activeSharedTab === 'expressions' && sharedVocabData.expressions && sharedVocabData.expressions.length > 0 && (
  <section className="mb-6 sm:mb-8 animate-fade-in">

  <div className="mb-6 flex justify-end w-full">
  <select 
  className="w-full sm:w-auto p-2 border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={(e) => {
    if (e.target.value !== "") {
      const el = document.getElementById(`expr-group-${e.target.value}`);
      if (el) {
        const headerOffset = 150;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      e.target.value = "";
    }
  }}
  >
  <option value="">Chọn chủ đề để di chuyển nhanh</option>
  {sharedVocabData.expressions.map((group, idx) => {
    const text = group.groupTitle.charAt(0).toUpperCase() + group.groupTitle.slice(1).toLowerCase();
    return <option key={idx} value={idx}>{text}</option>;
  })}
  </select>
  </div>
  {renderStructures(sharedVocabData.expressions, true)}

  </section>
  )}

 {activeSharedTab === 'adjectives' && (
 <AdjectivesTab />
 )}

 {activeSharedTab === 'benefits' && (
 <BenefitsTab />
 )}
 </div>
 )}

 {activeView.type === 'group' && currentGroup && (
 <div className="animate-fade-in">
 <header className="mb-5 sm:mb-6">
 <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 sm:mb-3 leading-tight">{currentGroup.title}</h2>
 <p className="text-slate-500 text-sm sm:text-lg leading-relaxed font-light">{currentGroup.description}</p>
 </header>

 {currentGroup.groupVocabulary && (
 <section className="mb-8 sm:mb-12">
 {renderVocabList(currentGroup.groupVocabulary)}
 </section>
 )}

 {currentGroup.usefulIdeas && (
 <section className="mb-8 sm:mb-12">
 <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
 <span className="bg-rose-100 text-rose-600 p-1.5 sm:p-2 rounded-lg"><Lightbulb size={18} className="sm:w-5 sm:h-5" /></span>
 Các ý tưởng & Cụm từ hay xài (High-scoring Ideas)
 </h3>
 {renderVocabList(currentGroup.usefulIdeas)}
 </section>
 )}
 </div>
 )}

 {activeView.type === 'subtopic' && currentSubtopic && (
 <div className="animate-fade-in">
 <header className="mb-6 sm:mb-8 flex items-center gap-3">
 <div className="bg-indigo-100 text-indigo-600 p-2 sm:p-3 rounded-2xl hidden sm:block"><Mic size={28} /></div>
 <div>
 <span className="text-xs sm:text-sm font-bold text-indigo-500 uppercase tracking-wider">{currentGroup?.title}</span>
 <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mt-1">{currentSubtopic.title}</h2>
 </div>
 </header>

 {currentSubtopic.subVocab && currentSubtopic.subVocab.length > 0 && (
 <section className="mb-6 sm:mb-8">
 <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 border-b border-slate-200 pb-2">Từ vựng mới trong chủ đề này</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
 {currentSubtopic.subVocab.map((vocab, idx) => (
 <VocabCard key={idx} {...vocab} />
 ))}
 </div>
 </section>
 )}

 {currentSubtopic.expressions && currentSubtopic.expressions.length > 0 && (
 <section className="mb-6 sm:mb-8">
 <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 border-b border-slate-200 pb-2">Expressions</h3>
 {renderStructures(currentSubtopic.expressions, true)}
 </section>
 )}

 {currentSubtopic.vocabulary && currentSubtopic.vocabulary.length > 0 && (
 <section className="mb-6 sm:mb-8">
 <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 border-b border-slate-200 pb-2">Vocabulary</h3>
 {renderVocabList(currentSubtopic.vocabulary)}
 </section>
 )}

 {currentSubtopic.questions && currentSubtopic.questions.length > 0 && (
 <section>
 <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 border-b border-slate-200 pb-2">Câu hỏi & Trả lời mẫu</h3>
 <div className="space-y-4 sm:space-y-6">
 {currentSubtopic.questions.map((q, idx) => (
 <QuestionBlock key={`${currentSubtopic.id}_q_${idx}`} question={q} idx={idx} />
 ))}
 </div>
 </section>
 )}
 </div>
 )}
 </div>
 </div>
 </div>
 );
 }

 class ErrorBoundary extends React.Component {
 constructor(props) {
 super(props);
 this.state = { hasError: false, error: null };
 }
 static getDerivedStateFromError(error) {
 return { hasError: true, error };
 }
 componentDidCatch(error, errorInfo) {
 console.error("ErrorBoundary caught:", error, errorInfo);
 }
 render() {
 if (this.state.hasError) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
 <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-lg border border-red-200">
 <h2 className="text-xl font-bold text-red-600 mb-2">Đã xảy ra sự cố khi tải nội dung này</h2>
 <p className="text-slate-600 text-sm mb-4">Vui lòng bấm nút bên dưới để tải lại trang.</p>
 <button 
 onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
 className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
 >
 Tải lại trang
 </button>
 </div>
 </div>
 );
 }
 return this.props.children;
 }
 }

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
 <ErrorBoundary>
 <App />
 </ErrorBoundary>
 );

 
