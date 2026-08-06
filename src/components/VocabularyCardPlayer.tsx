import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Sparkles, Languages } from 'lucide-react';
import { VocabularyItem } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';
import { lesson1Practice, TapeSVG } from '../data/practice/unit2/lesson1';
import { lesson2Practice } from '../data/practice/unit2/lesson2';

interface Props {
  vocabulary: VocabularyItem[];
  onCompleted: () => void;
  isCheckUp?: boolean;
}

// IPA lookup dictionary for curriculum vocabulary
const IPA_LOOKUP: Record<string, string> = {
  pencil: '/ˈpensl/',
  eraser: '/ɪˈreɪsər/',
  ruler: '/ˈruːlər/',
  'pencil case': '/ˈpen.səl ˌkeɪs/',
  backpack: '/ˈbæk.pæk/',
  notebook: '/ˈnoʊt.bʊk/',
  desk: '/desk/',
  chair: '/tʃer/',
  book: '/bʊk/',
  circle: '/ˈsɜːr.kl/',
  square: '/skwer/',
  triangle: '/ˈtraɪ.æŋ.ɡəl/',
  rectangle: '/ˈrek.tæŋ.ɡəl/',
  paint: '/peɪnt/',
  paper: '/ˈpeɪ.pər/',
  chalk: '/tʃɔːk/',
  yarn: '/jɑːrn/',
  glue: '/ɡluː/',
  tape: '/teɪp/',
  red: '/red/',
  yellow: '/ˈjel.oʊ/',
  blue: '/bluː/',
  white: '/waɪt/',
  black: '/blæk/',
  green: '/ɡriːn/',
  purple: '/ˈpɜːr.pəl/',
  orange: '/ˈɔːr.ɪndʒ/',
  pink: '/pɪŋk/',
  gray: '/ɡreɪ/',
  brown: '/braʊn/',
  one: '/wʌn/',
  two: '/tuː/',
  three: '/θriː/',
  four: '/fɔːr/',
  five: '/faɪv/',
  six: '/sɪks/',
  seven: '/ˈsev.ən/',
  eight: '/eɪt/',
  nine: '/naɪn/',
  ten: '/ten/',
  eleven: '/ɪˈlev.ən/',
  twelve: '/twelv/',
  doll: '/dɒl/',
  dolls: '/dɒlz/',
  ball: '/bɔːl/',
  balls: '/bɔːlz/',
  car: '/kɑːr/',
  cars: '/kɑːrz/',
  kite: '/kaɪt/',
  kites: '/kaɪts/',
  game: '/ɡeɪm/',
  marble: '/ˈmɑːr.bl̩/',
  puzzle: '/ˈpʌz.l̩/',
  card: '/kɑːrd/',
  mother: '/ˈmʌð.ər/',
  father: '/ˈfɑː.ðər/',
  brother: '/ˈbrʌð.ər/',
  sister: '/ˈsɪs.tər/',
  grandmother: '/ˈɡræn.mʌð.ər/',
  grandfather: '/ˈɡrænd.fɑː.ðər/',
  juice: '/dʒuːs/',
  chicken: '/ˈtʃɪk.ɪn/',
  fish: '/fɪʃ/',
  'ice cream': '/ˌaɪs ˈkriːm/',
  pizza: '/ˈpiːt.sə/',
  rice: '/raɪs/',
  cookie: '/ˈkʊk.i/',
  bread: '/bred/',
  flower: '/ˈflaʊ.ər/',
  tree: '/triː/',
  rock: '/rɒk/',
  river: '/ˈrɪv.ər/',
  hill: '/hɪl/',
  lake: '/leɪk/',
  'play soccer': '/pleɪ ˈsɒk.ər/',
  'jump rope': '/dʒʌmp roʊp/',
  'fly a kite': '/flaɪ ə kaɪt/',
  'ride a bike': '/raɪd ə baɪk/',
  turtle: '/ˈtɜː.tl̩/',
  frog: '/frɒɡ/',
  spider: '/ˈspaɪ.dər/',
  ant: '/ænt/',
  elephant: '/ˈel.ɪ.fənt/',
  monkey: '/ˈmʌŋ.ki/',
  tiger: '/ˈtaɪ.ɡər/',
  bear: '/beər/',
  kangaroo: '/ˌkæŋ.ɡərˈuː/',
  penguin: '/ˈpeŋ.ɡwɪn/',
  snake: '/sneɪk/',
  giraffe: '/dʒɪˈrɑːf/',
  zebra: '/ˈzeb.rə/',
  run: '/rʌn/',
  hop: '/hɒp/',
  swim: '/swɪm/',
  walk: '/wɔːk/',
  arm: '/ɑːrm/',
  hand: '/hænd/',
  finger: '/ˈfɪŋ.ɡər/',
  leg: '/leɡ/',
  foot: '/fʊt/',
  toe: '/toʊ/',
  eye: '/aɪ/',
  nose: '/noʊz/',
  mouth: '/maʊθ/',
  ear: '/ɪər/',
  'wash my face': '/wɒʃ maɪ feɪs/',
  'wash my hands': '/wɒʃ maɪ hændz/',
  'brush my hair': '/brʌʃ maɪ heər/',
  'brush my teeth': '/brʌʃ maɪ tiːθ/',
  old: '/oʊld/',
  new: '/nuː/',
  big: '/bɪɡ/',
  small: '/smɔːl/',
  long: '/lɒŋ/',
  short: '/ʃɔːt/',
  fast: '/fæst/',
  slow: '/sloʊ/',
  noisy: '/ˈnɔɪ.zi/',
  quiet: '/ˈkwaɪ.ət/',
  bus: '/bʌs/',
  truck: '/trʌk/',
  train: '/treɪn/',
  boat: '/boʊt/'
};

// Emoji lookup dictionary for curriculum vocabulary
const EMOJI_LOOKUP: Record<string, string> = {
  pencil: '✏️',
  eraser: '🧽',
  ruler: '📏',
  'pencil case': '👝',
  backpack: '🎒',
  notebook: '📓',
  desk: '🏫',
  chair: '🪑',
  book: '📖',
  circle: '🔴',
  square: '🟩',
  triangle: '🔺',
  rectangle: '▮',
  paint: '🎨',
  paper: '📄',
  chalk: '▯',
  yarn: '🧶',
  glue: '🧴',
  tape: '🩹',
  red: '🔴',
  yellow: '🟡',
  blue: '🔵',
  white: '📄',
  black: '⚫',
  green: '🟢',
  purple: '🟣',
  orange: '🟠',
  pink: '🌸',
  gray: '🔘',
  brown: '🟤',
  one: '1️⃣',
  two: '2️⃣',
  three: '3️⃣',
  four: '4️⃣',
  five: '5️⃣',
  six: '6️⃣',
  seven: '7️⃣',
  eight: '8️⃣',
  nine: '9️⃣',
  ten: '🔟',
  eleven: '⑪',
  twelve: '⑫',
  doll: '🧸',
  dolls: '🧸🧸',
  ball: '⚽',
  balls: '⚽⚾',
  car: '🚗',
  cars: '🚗🚗',
  kite: '🪁',
  kites: '🪁🪁',
  game: '🎮',
  marble: '🔮',
  puzzle: '🧩',
  card: '🃏',
  mother: '👩',
  father: '👨',
  brother: '👦',
  sister: '👧',
  grandmother: '👵',
  grandfather: '👴',
  juice: '🧃',
  chicken: '🍗',
  fish: '🐟',
  'ice cream': '🍦',
  pizza: '🍕',
  rice: '🍚',
  cookie: '🍪',
  bread: '🍞',
  flower: '🌸',
  tree: '🌳',
  rock: '🪨',
  river: '🏞️',
  hill: '⛰️',
  lake: '🌅',
  'play soccer': '⚽🏃',
  'jump rope': '🏃‍♀️',
  'fly a kite': '🪁🏃',
  'ride a bike': '🚴',
  turtle: '🐢',
  frog: '🐸',
  spider: '🕷️',
  ant: '🐜',
  elephant: '🐘',
  monkey: '🐒',
  tiger: '🐅',
  bear: '🐻',
  kangaroo: '🦘',
  penguin: '🐧',
  snake: '🐍',
  giraffe: '🦒',
  zebra: '🦓',
  run: '🏃',
  hop: '🐇',
  swim: '🏊',
  walk: '🚶',
  arm: '💪',
  hand: '✋',
  finger: '☝️',
  leg: '🦵',
  foot: '🦶',
  toe: '👣',
  eye: '👁️',
  nose: '👃',
  mouth: '👄',
  ear: '👂',
  'wash my face': '🧼',
  'wash my hands': '👐🧼',
  'brush my hair': '🪮',
  'brush my teeth': '🪥',
  old: '🧓',
  new: '✨',
  big: '🐘',
  small: '🐭',
  long: '📏━━━━',
  short: '📏',
  fast: '⚡',
  slow: '🐢',
  noisy: '📢',
  quiet: '🤫',
  bus: '🚌',
  truck: '🚚',
  train: '🚆',
  boat: '⛵'
};

export const VocabularyCardPlayer: React.FC<Props> = ({ vocabulary, onCompleted, isCheckUp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Handle empty state (though curriculum should have vocab, some story lessons might be empty)
  const items = vocabulary && vocabulary.length > 0 ? vocabulary : [
    { id: 'v-fallback-1', word: 'explorer', meaningVi: 'nhà thám hiểm' }
  ];

  const currentItem = items[currentIndex];
  
  const getTwoExampleSentences = (word: string, fallback: string) => {
    const wordLower = word.toLowerCase().trim();
    const plural = wordLower === 'bus' ? 'buses' : wordLower + 's';
    
    // Unit 7: Body parts
    if (['arm', 'leg', 'foot', 'nose', 'mouth', 'eye', 'nose', 'ear', 'finger', 'toe', 'hand'].includes(wordLower)) {
      return [`This is my ${wordLower}.`, `These are my ${plural}.`];
    }
    
    // Unit 7: Healthy habits
    if (wordLower.includes('wash') || wordLower.includes('brush')) {
      return [`I can ${wordLower}.`, `Can you ${wordLower}?`];
    }
    
    // Unit 8: Adjectives
    if (['old', 'new', 'big', 'small', 'long', 'short', 'fast', 'slow', 'noisy', 'quiet'].includes(wordLower)) {
      return [`That's an ${wordLower} toy.`, `Those are new toys.`];
    }
    
    // Unit 8: Transportation
    if (['bus', 'truck', 'train', 'boat'].includes(wordLower)) {
      return [`It's a ${wordLower}.`, `They're ${plural}.`];
    }
    
    return [
      fallback || `It is a ${wordLower}.`,
      `What is it? It's a ${wordLower}.`
    ];
  };

  const twoExamples = isCheckUp ? getTwoExampleSentences(currentItem.word, currentItem.exampleSentence || '') : [];
  const wordLower = currentItem.word.toLowerCase().trim();
  const pronunciation = IPA_LOOKUP[wordLower] || `/${currentItem.word}/`;
  const emoji = EMOJI_LOOKUP[wordLower] || '🔤';

  // Find if there is a custom illustration in the practice questions for the current word
  const customIllustration = React.useMemo(() => {
    if (wordLower === 'chalk') {
      const q = lesson1Practice.find(p => p.vocabulary === 'chalk');
      return q?.image;
    }
    if (wordLower === 'white') {
      const q = lesson2Practice.find(p => p.vocabulary === 'white');
      return q?.image;
    }
    if (wordLower === 'toe') {
      return <div className="text-8xl select-none animate-bounce font-normal">👣</div>;
    }
    if (wordLower === 'long') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }}>
          <path d="M10 100 Q 50 95, 100 100 T 190 100" fill="none" stroke="#D97706" strokeWidth={12} strokeLinecap="round" />
          <path d="M15 100 L25 97 M35 100 L45 97 M55 100 L65 97 M75 100 L85 97 M95 100 L105 97 M115 100 L125 97 M135 100 L145 97 M155 100 L165 97 M175 100 L185 97" fill="none" stroke="#F59E0B" strokeWidth={3} />
          <path d="M6 95 L10 100 L5 105 M194 95 L190 100 L195 105" fill="none" stroke="#B45309" strokeWidth={2} />
        </svg>
      );
    }
    if (wordLower === 'short') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }}>
          <rect x={80} y={80} width={40} height={40} rx={4} fill="#F3F4F6" stroke="#D1D5DB" strokeWidth={2} />
          <ellipse cx={100} cy={80} rx={20} ry={6} fill="#E5E7EB" stroke="#D1D5DB" strokeWidth={1} />
          <circle cx={65} cy={110} r={3} fill="#E5E7EB" />
          <circle cx={75} cy={120} r={2} fill="#E5E7EB" />
          <circle cx={125} cy={115} r={3} fill="#E5E7EB" />
          <circle cx={135} cy={105} r={2} fill="#E5E7EB" />
          <text x={120} y={75} fontSize={30}>🤏</text>
        </svg>
      );
    }
    if (wordLower === 'tape') {
      return TapeSVG;
    }
    return null;
  }, [wordLower]);

  // Format illustration URL using Icons8 color icons for clean, child-friendly vector illustrations
  const iconName = wordLower === 'white' ? 'blank-file' : wordLower.replace(/\s+/g, '-');
  const imageUrl = `https://img.icons8.com/color/256/${encodeURIComponent(iconName)}.png`;

  React.useEffect(() => {
    // Speak word automatically when card changes
    speakWord(currentItem.word);
    setImageError(false);
  }, [currentIndex]);

  const speakWord = (word: string) => {
    speakText(word, undefined, 0.85, 1.1);
  };

  const handleCardClick = () => {
    soundFX.playClick();
    speakWord(currentItem.word);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundFX.playClick();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      soundFX.playClick();
      setCurrentIndex(currentIndex + 1);
    } else {
      soundFX.playFanfare();
      onCompleted();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto py-2">
      {/* Top Controls: Pagination Indicator & Vietnamese Switcher */}
      <div className="w-full flex items-center justify-between px-2 mb-1">
        <span className="bg-red-50 text-red-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
          Card {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={() => {
            soundFX.playClick();
            setShowVietnamese(!showVietnamese);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all ${
            showVietnamese
              ? 'bg-red-600 border-red-600 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>{showVietnamese ? 'Vietnamese: ON' : 'Vietnamese: OFF'}</span>
        </button>
      </div>

      {/* Main Vocabulary Card (Interactive & Animated) */}
      <div
        onClick={handleCardClick}
        className="w-full bg-gradient-to-b from-white to-red-50/10 rounded-3xl border-3 border-red-100 hover:border-red-400 p-6 flex flex-col items-center text-center cursor-pointer shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
      >
        <span className="absolute top-3 right-3 text-red-400 opacity-60 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </span>

        {/* Illustration Container */}
        <div className="w-48 h-48 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-center mb-6 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
          {customIllustration ? (
            <div className="w-full h-full flex items-center justify-center p-4">
              {customIllustration}
            </div>
          ) : !imageError ? (
            <img
              src={imageUrl}
              alt={currentItem.word}
              className="w-full h-full object-cover rounded-2xl animate-fadeIn"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="text-8xl select-none animate-bounce font-normal">
              {emoji}
            </div>
          )}
        </div>

        {/* Word Details */}
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight capitalize select-all">
            {currentItem.word}
          </h2>
          <p className="text-base font-bold text-red-500 tracking-wide">
            {pronunciation}
          </p>
          {showVietnamese && currentItem.meaningVi && (
            <p className="text-lg font-black text-emerald-600 mt-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 inline-block animate-fadeIn">
              {currentItem.meaningVi}
            </p>
          )}
        </div>

        {isCheckUp && (
          <div className="w-full mt-5 pt-4 border-t border-red-100/60 text-left space-y-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
              Review Example Sentences (Mẫu câu ôn tập)
            </span>
            {twoExamples.map((ex, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-xl text-xs font-bold text-slate-700">
                <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                <span className="capitalize">{ex}</span>
              </div>
            ))}
            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card tap
                soundFX.playClick();
                if (twoExamples[0]) {
                  speakText(twoExamples[0], () => {
                    setTimeout(() => {
                      if (twoExamples[1]) {
                        speakText(twoExamples[1], undefined, 0.85, 1.15);
                      }
                    }, 1200);
                  }, 0.85, 1.15);
                }
              }}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-black py-2.5 rounded-xl text-[10px] flex items-center justify-center gap-1.5 transition-all mt-2 active:scale-95 border border-red-200 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Listen Model Audio</span>
            </button>
          </div>
        )}

        {/* Speaker Action Hint */}
        <div className="mt-6 flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-red-500 transition-colors bg-slate-50 group-hover:bg-red-50 px-4 py-2 rounded-full border border-slate-100 group-hover:border-red-200">
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span>Tap to Hear Pronunciation</span>
        </div>
      </div>

      {/* Card Pagination Control Buttons */}
      <div className="w-full flex items-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex-1 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 active:scale-95 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <span>{currentIndex === items.length - 1 ? 'Done & Continue' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
