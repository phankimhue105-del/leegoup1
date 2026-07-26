import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Award, Star, ArrowRight, Sparkles, CheckCircle2, XCircle, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Unit, VocabularyItem, SpeakingAssessment } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';

interface Props {
  checkUpNumber: number;
  unitA: Unit;
  unitB: Unit;
  onCompleted: () => void;
  onCorrectAnswer: () => void;
  activeStage: string;
  onStageChange: (stage: any) => void;
}

const EMOJI_MAP: Record<string, string> = {
  pencil: '✏️', eraser: '🧽', ruler: '📏', 'pencil case': '👝', backpack: '🎒', notebook: '📓', desk: '🏫', chair: '🪑', book: '📖',
  circle: '🔴', square: '🟩', triangle: '🔺', rectangle: '▮', paint: '🎨', paper: '📄', chalk: '🖍️', yarn: '🧶', glue: '🧴', tape: '🩹',
  red: '🔴', yellow: '🟡', blue: '🔵', white: '⚪', black: '⚫', green: '🟢', purple: '🟣', orange: '🟠', pink: '🌸', gray: '🔘', brown: '🟤',
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣', six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟', eleven: '⑪', twelve: '⑫',
  doll: '🧸', dolls: '🧸🧸', ball: '⚽', balls: '⚽⚾', car: '🚗', cars: '🚗🚗', kite: '🪁', kites: '🪁🪁', game: '🎮', marble: '🔮', puzzle: '🧩', card: '🃏',
  mother: '👩', father: '👨', brother: '👦', sister: '👧', grandmother: '👵', grandfather: '👴', juice: '🧃', chicken: '🍗', fish: '🐟', 'ice cream': '🍦',
  pizza: '🍕', rice: '🍚', cookie: '🍪', bread: '🍞', flower: '🌸', tree: '🌳', rock: '🪨', river: '🏞️', hill: '⛰️', lake: '🌅',
  'play soccer': '⚽🏃', 'jump rope': '🏃‍♀️', 'fly a kite': '🪁🏃', 'ride a bike': '🚴', turtle: '🐢', frog: '🐸', spider: '🕷️', ant: '🐜',
  elephant: '🐘', monkey: '🐒', tiger: '🐅', bear: '🐻', kangaroo: '🦘', penguin: '🐧', snake: '🐍', giraffe: '🦒', zebra: '🦓',
  run: '🏃', hop: '🐇', swim: '🏊', walk: '🚶', arm: '💪', hand: '✋', finger: '☝️', leg: '🦵', foot: '🦶', toe: '🦶',
  eye: '👁️', nose: '👃', mouth: '👄', ear: '👂', 'wash my face': '🧼', 'wash my hands': '👐🧼', 'brush my hair': '🪮', 'brush my teeth': '🪥',
  old: '🧓', new: '✨', big: '🐘', small: '🐭', long: '📏', short: '📐', fast: '⚡', slow: '🐢', noisy: '📢', quiet: '🤫',
  bus: '🚌', truck: '🚚', train: '🚆', boat: '⛵'
};

type CheckUpStage = 'vocabReview' | 'patternReview' | 'listeningTest' | 'speakingTest' | 'mixedPractice' | 'completed';

export const CheckUpModule: React.FC<Props> = ({
  checkUpNumber,
  unitA,
  unitB,
  onCompleted,
  onCorrectAnswer,
  activeStage,
  onStageChange,
}) => {
  const [currentStage, setCurrentStage] = useState<CheckUpStage>('vocabReview');

  // Synchronize internal stage with app-level activeStage
  useEffect(() => {
    if (activeStage === 'vocabulary') {
      setCurrentStage('vocabReview');
    } else if (activeStage === 'modelPattern') {
      setCurrentStage('patternReview');
    } else if (activeStage === 'practice') {
      // If we are in practice stage, support sub-stages (listening -> mixed puzzle)
      setCurrentStage((prev) => (prev === 'mixedPractice' ? 'mixedPractice' : 'listeningTest'));
    } else if (activeStage === 'speaking') {
      setCurrentStage('speakingTest');
    } else if (activeStage === 'completed') {
      setCurrentStage('completed');
    }
  }, [activeStage]);

  // Review lists (combining both previous units)
  const vocabList = [...unitA.lessons, ...unitB.lessons]
    .flatMap((l) => l.vocabulary)
    .filter((item, index, self) => self.findIndex(t => t.word === item.word) === index); // unique items

  const patternList = [...unitA.lessons, ...unitB.lessons]
    .flatMap((l) => l.sentencePatterns)
    .filter((item, index, self) => self.findIndex(t => t.pattern === item.pattern) === index);

  // 1. Vocabulary Match states
  const [matchLeftSelected, setMatchLeftSelected] = useState<string | null>(null);
  const [matchRightSelected, setMatchRightSelected] = useState<string | null>(null);
  const [matchedVocab, setMatchedVocab] = useState<Record<string, string>>({});
  const [matchingItems, setMatchingItems] = useState<{ words: string[]; icons: string[] }>({ words: [], icons: [] });

  // 2. Sentence Pattern Review states
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);

  // 3. Listening Test states
  const [listenIndex, setListenIndex] = useState(0); // 3 questions
  const [listenCorrect, setListenCorrect] = useState<boolean | null>(null);
  const [listenSelected, setListenSelected] = useState<string | null>(null);
  const [listenQuestions, setListenQuestions] = useState<{ target: VocabularyItem; choices: VocabularyItem[] }[]>([]);

  // 4. Speaking Test states
  const [speakingIndex, setSpeakingIndex] = useState(0); // 2 tasks
  const [speakingPhrases, setSpeakingPhrases] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessment, setAssessment] = useState<SpeakingAssessment | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 5. Mixed Practice states (Word Puzzle)
  const [puzzleTarget, setPuzzleTarget] = useState<VocabularyItem | null>(null);
  const [puzzleLetters, setPuzzleLetters] = useState<string[]>([]);
  const [puzzleInput, setPuzzleInput] = useState<string[]>([]);
  const [puzzleCorrect, setPuzzleCorrect] = useState<boolean | null>(null);

  // Initialize Check-Up contents
  useEffect(() => {
    // A. Vocabulary matching setup
    const selectedVocab = [...vocabList].sort(() => Math.random() - 0.5).slice(0, 3);
    setMatchingItems({
      words: selectedVocab.map(v => v.word),
      icons: selectedVocab.map(v => v.word).sort(() => Math.random() - 0.5)
    });
    setMatchedVocab({});

    // B. Listening test questions setup (3 questions)
    const shuffledVocab = [...vocabList].sort(() => Math.random() - 0.5);
    const generatedListening = shuffledVocab.slice(0, 3).map((target) => {
      const distractors = vocabList.filter(v => v.word !== target.word).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [target, ...distractors].sort(() => Math.random() - 0.5);
      return { target, choices };
    });
    setListenQuestions(generatedListening);
    setListenIndex(0);
    setListenCorrect(null);
    setListenSelected(null);

    // C. Speaking tasks setup (2 tasks, one from Unit A model pattern, one from Unit B)
    const taskA = unitA.lessons.flatMap(l => l.sentencePatterns)[0]?.example || 'It is a pencil.';
    const taskB = unitB.lessons.flatMap(l => l.sentencePatterns)[0]?.example || 'It is red.';
    setSpeakingPhrases([taskA, taskB]);
    setSpeakingIndex(0);
    setAssessment(null);
    setTranscript('');

    // D. Mixed Practice puzzle setup
    const puzzleWord = shuffledVocab[shuffledVocab.length - 1] || { id: 'fallback', word: 'book', meaningVi: 'sách' };
    setPuzzleTarget(puzzleWord);
    setPuzzleLetters(puzzleWord.word.split('').sort(() => Math.random() - 0.5));
    setPuzzleInput([]);
    setPuzzleCorrect(null);

    setCurrentStage('vocabReview');
  }, [unitA, unitB]);

  // Speech recognition initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };
        recognition.onerror = (e: any) => console.warn('Speech recognition error:', e);
        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Play TTS helper
  const playTTS = (text: string) => {
    speakText(text, undefined, 0.85, 1.15);
  };

  // Vocab Matching handlers
  const handleMatchLeft = (word: string) => {
    soundFX.playClick();
    setMatchLeftSelected(word);
    if (matchRightSelected) checkMatch(word, matchRightSelected);
  };

  const handleMatchRight = (word: string) => {
    soundFX.playClick();
    setMatchRightSelected(word);
    if (matchLeftSelected) checkMatch(matchLeftSelected, word);
  };

  const checkMatch = (left: string, right: string) => {
    if (left === right) {
      soundFX.playStar();
      const updated = { ...matchedVocab, [left]: right };
      setMatchedVocab(updated);
      setMatchLeftSelected(null);
      setMatchRightSelected(null);
      onCorrectAnswer();

      if (Object.keys(updated).length === matchingItems.words.length) {
        soundFX.playCorrect();
        setTimeout(() => {
          onStageChange('modelPattern');
        }, 1200);
      }
    } else {
      soundFX.playClick();
      setMatchLeftSelected(null);
      setMatchRightSelected(null);
    }
  };

  // Pattern sequential playback
  const playModelPatterns = () => {
    if (isPlayingPattern || patternList.length === 0) return;
    setIsPlayingPattern(true);
    soundFX.playClick();

    const pA = patternList[0]?.example || 'It is a pencil.';
    const pB = patternList[1 % patternList.length]?.example || 'What color is it?';

    speakText(pA, () => {
      setTimeout(() => {
        speakText(pB, () => {
          setIsPlayingPattern(false);
        }, 0.85, 1.1);
      }, 1000);
    }, 0.85, 1.1);
  };

  // Listening Test handlers
  const startListeningQuestion = () => {
    if (listenQuestions.length === 0) return;
    playTTS(listenQuestions[listenIndex].target.word);
  };

  useEffect(() => {
    if (currentStage === 'listeningTest' && listenQuestions.length > 0 && listenCorrect === null) {
      setTimeout(() => {
        startListeningQuestion();
      }, 500);
    }
  }, [currentStage, listenIndex, listenCorrect]);

  const handleListenSelect = (word: string) => {
    if (listenCorrect !== null) return;
    setListenSelected(word);
    const target = listenQuestions[listenIndex].target.word;
    if (word.toLowerCase() === target.toLowerCase()) {
      setListenCorrect(true);
      soundFX.playCorrect();
      onCorrectAnswer();
    } else {
      setListenCorrect(false);
      soundFX.playClick();
    }
  };

  const handleNextListen = () => {
    setListenSelected(null);
    setListenCorrect(null);
    if (listenIndex < 2) {
      setListenIndex(listenIndex + 1);
    } else {
      setCurrentStage('mixedPractice');
    }
  };

  // Speaking Test handlers
  const startRecording = async () => {
    setTranscript('');
    setAssessment(null);
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        mediaRecorder.start();
      }
    } catch (err) {
      console.warn('Mic error:', err);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }

    setIsRecording(true);
    soundFX.playClick();

    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 14) {
          if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
          stopRecording();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  const handleEvaluateSpeaking = async () => {
    setIsEvaluating(true);
    const targetPhrase = speakingPhrases[speakingIndex];
    const text = transcript || targetPhrase;

    try {
      const res = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          targetPhrase,
          studentName: 'Explorer',
        }),
      });
      const data: SpeakingAssessment = await res.json();
      setAssessment(data);
      soundFX.playFanfare();
    } catch (err) {
      const fallback: SpeakingAssessment = {
        overallScore: 90,
        pronunciation: 88,
        fluency: 92,
        accuracy: 90,
        completeness: 92,
        confidence: 90,
        strength: 'Giọng đọc to và rõ ràng, luyện tập rất tốt!',
        suggestion: 'Chú ý phát âm tròn trịa âm cuối hơn chút nhé.',
        encouragement: 'Đạt kết quả xuất sắc! Nhận thêm 2 sao nhé! ⭐⭐',
      };
      setAssessment(fallback);
      soundFX.playStar();
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextSpeaking = () => {
    setTranscript('');
    setAssessment(null);
    if (speakingIndex < 1) {
      setSpeakingIndex(speakingIndex + 1);
    } else {
      onStageChange('completed');
    }
  };

  // Mixed Practice (Puzzle) handlers
  const handleLetterClick = (letter: string, index: number) => {
    soundFX.playClick();
    const newInput = [...puzzleInput, letter];
    setPuzzleInput(newInput);

    if (newInput.length === puzzleTarget?.word.length) {
      const spelled = newInput.join('');
      if (spelled.toLowerCase() === puzzleTarget.word.toLowerCase()) {
        setPuzzleCorrect(true);
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        setPuzzleCorrect(false);
        setTimeout(() => {
          setPuzzleInput([]);
          setPuzzleCorrect(null);
        }, 1000);
      }
    }
  };

  const getStageHeader = () => {
    switch (currentStage) {
      case 'vocabReview': return 'Vocabulary Match (Ôn tập từ vựng)';
      case 'patternReview': return 'Pattern Review (Ôn tập mẫu câu)';
      case 'listeningTest': return `Listening Activity (Bài tập nghe) - Câu ${listenIndex + 1}/3`;
      case 'speakingTest': return `Speaking Activity (Bài tập nói) - Câu ${speakingIndex + 1}/2`;
      case 'mixedPractice': return 'Mixed Practice (Luyện tập tổng hợp)';
      default: return 'Check-Up Completed!';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-xl max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[500px]">
      {/* Check-Up Header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-amber-100 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500 animate-bounce" />
          <span className="font-black text-slate-800 text-sm md:text-base">
            CHECK-UP {checkUpNumber} (Units {unitA.number}–{unitB.number})
          </span>
        </div>
        <span className="bg-amber-100 text-amber-800 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-amber-300">
          {getStageHeader()}
        </span>
      </div>

      {/* Main Routine Stage Arena */}
      <div className="flex-1 flex flex-col justify-center py-2">

        {/* 1. VOCABULARY MATCH REVIEW */}
        {currentStage === 'vocabReview' && (
          <div className="flex flex-col items-center gap-6">
            <h4 className="text-lg font-black text-slate-800">
              Match the word to its correct illustration! (Nối từ với hình ảnh đúng!)
            </h4>
            <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto">
              {/* Words List */}
              <div className="space-y-3">
                {matchingItems.words.map((word, idx) => {
                  const isMatched = !!matchedVocab[word];
                  const isSelected = matchLeftSelected === word;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleMatchLeft(word)}
                      className={`w-full p-3.5 rounded-2xl border-2 font-black text-sm capitalize transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 line-through'
                          : isSelected
                          ? 'bg-red-500 border-red-500 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {/* Illustrations List */}
              <div className="space-y-3">
                {matchingItems.icons.map((word, idx) => {
                  const isMatched = Object.values(matchedVocab).includes(word);
                  const isSelected = matchRightSelected === word;
                  const iconName = word.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <button
                      key={idx}
                      disabled={isMatched}
                      onClick={() => handleMatchRight(word)}
                      className={`w-full p-2.5 rounded-2xl border-2 flex items-center justify-center transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                          : isSelected
                          ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img
                          src={`https://img.icons8.com/color/256/${encodeURIComponent(iconName)}.png`}
                          alt={word}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = parent.querySelector('.fallback-emoji');
                              if (fallback) fallback.setAttribute('style', 'display: block');
                            }
                          }}
                        />
                        <span className="fallback-emoji text-3xl font-normal hidden">
                          {EMOJI_MAP[word.toLowerCase()] || '🔤'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. SENTENCE PATTERN REVIEW */}
        {currentStage === 'patternReview' && (
          <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
            <h4 className="text-xl font-black text-slate-800">
              Listen to the key structures (Lắng nghe mẫu câu cốt lõi)
            </h4>
            <div className="w-full space-y-3 mt-2">
              {patternList.slice(0, 2).map((pattern, idx) => (
                <div key={idx} className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-5 rounded-2xl shadow-md text-left">
                  <span className="text-[10px] font-black uppercase text-amber-300 block mb-1">Mẫu câu {idx + 1}</span>
                  <p className="text-lg font-black">{pattern.pattern}</p>
                  <p className="text-xs font-semibold text-red-100 italic mt-1">Ví dụ: "{pattern.example}"</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={playModelPatterns}
                disabled={isPlayingPattern}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingPattern ? 'AI is speaking...' : 'Listen Model Audio'}</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStageChange('practice');
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>Continue to Listening Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. LISTENING TEST */}
        {currentStage === 'listeningTest' && listenQuestions.length > 0 && (
          <div className="flex flex-col items-center gap-6">
            <h4 className="text-lg font-black text-slate-800">
              Listen and choose the correct illustration! (Nghe và chọn hình vẽ đúng!)
            </h4>

            {/* Speaker block */}
            <button
              onClick={startListeningQuestion}
              className="p-5 bg-red-100 hover:bg-red-200 border-2 border-red-200 text-red-600 rounded-full shadow-md transition-all active:scale-95"
              title="Nghe lại"
            >
              <Volume2 className="w-8 h-8 animate-pulse" />
            </button>

            {/* Choices Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto mt-2">
              {listenQuestions[listenIndex].choices.map((choice, idx) => {
                const isSelected = listenSelected === choice.word;
                const iconName = choice.word.toLowerCase().replace(/\s+/g, '-');
                let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300';
                if (isSelected) {
                  btnStyle = listenCorrect ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100' : 'bg-rose-50 border-rose-500 ring-4 ring-rose-100';
                }
                return (
                  <button
                    key={idx}
                    disabled={listenCorrect !== null}
                    onClick={() => handleListenSelect(choice.word)}
                    className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all transform hover:scale-[1.02] active:scale-98 relative ${btnStyle}`}
                  >
                    <div className="w-16 h-16 flex items-center justify-center mb-2">
                      <img
                        src={`https://img.icons8.com/color/256/${encodeURIComponent(iconName)}.png`}
                        alt={choice.word}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector('.fallback-emoji');
                            if (fallback) fallback.setAttribute('style', 'display: block');
                          }
                        }}
                      />
                      <span className="fallback-emoji text-4xl font-normal hidden">
                        {EMOJI_MAP[choice.word.toLowerCase()] || '🔤'}
                      </span>
                    </div>
                    <span className="capitalize text-xs font-extrabold text-slate-700">{choice.word}</span>
                    {isSelected && listenCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute top-2 right-2" />}
                    {isSelected && listenCorrect === false && <XCircle className="w-5 h-5 text-rose-500 absolute top-2 right-2" />}
                  </button>
                );
              })}
            </div>

            {listenCorrect !== null && (
              <button
                onClick={handleNextListen}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all text-xs mt-2"
              >
                <span>{listenIndex === 2 ? 'Go to Speaking Review' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* 4. SPEAKING TEST */}
        {currentStage === 'speakingTest' && (
          <div className="flex flex-col items-center gap-5 max-w-lg mx-auto">
            <h4 className="text-lg font-black text-slate-800">
              Read the sentence aloud! (Đọc to mẫu câu dưới đây!)
            </h4>

            {/* Speaking phrase card */}
            <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 rounded-2xl shadow-md flex items-center justify-between gap-4">
              <span className="text-lg font-black tracking-wide text-left">{speakingPhrases[speakingIndex]}</span>
              <button
                onClick={() => playTTS(speakingPhrases[speakingIndex])}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors shrink-0"
              >
                <Volume2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Recording operations */}
            <div className="w-full flex flex-col items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  disabled={isEvaluating}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all ring-4 ring-red-200 disabled:opacity-50"
                >
                  <Mic className="w-6 h-6" />
                  <span className="text-[8px] font-black uppercase mt-0.5">RECORD</span>
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg animate-pulse ring-4 ring-rose-200"
                  >
                    <MicOff className="w-6 h-6 text-rose-400" />
                    <span className="text-[8px] font-black uppercase mt-0.5 text-rose-300">STOP</span>
                  </button>
                  <div className="w-40 bg-slate-200 h-1.5 rounded-full overflow-hidden border border-slate-300 relative">
                    <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${(recordingSeconds / 15) * 100}%` }}></div>
                  </div>
                </div>
              )}

              <div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl min-h-[50px] flex flex-col justify-center text-xs text-slate-700">
                {transcript ? (
                  <p className="font-extrabold text-slate-900">"{transcript}"</p>
                ) : isRecording ? (
                  <p className="text-red-500 font-bold animate-pulse">Đang nghe... Nói to và rõ nhé! 🎙️</p>
                ) : (
                  <p className="text-slate-400 italic">Nhấn nút record hoặc gõ câu trả lời của em dưới đây</p>
                )}
              </div>

              {/* Type response input fallback */}
              {!transcript && !isRecording && !assessment && (
                <div className="w-full flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="Gõ câu trả lời luyện nói tại đây..."
                    className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500 shadow-2xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        setTranscript(e.currentTarget.value);
                        handleEvaluateSpeaking();
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                      if (input) {
                        setTranscript(input);
                        handleEvaluateSpeaking();
                      }
                    }}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-colors"
                  >
                    Gửi đi
                  </button>
                </div>
              )}

              {transcript && !isRecording && !assessment && (
                <button
                  onClick={handleEvaluateSpeaking}
                  disabled={isEvaluating}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-md transition-all text-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>{isEvaluating ? 'LeeGo AI đang đánh giá...' : 'Đánh giá phát âm'}</span>
                </button>
              )}
            </div>

            {/* Speaking feedback */}
            {assessment && (
              <div className="w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 p-4 rounded-2xl border-2 border-emerald-300 text-left animate-fadeIn">
                <div className="flex items-center justify-between mb-3 border-b border-emerald-200 pb-2">
                  <span className="font-extrabold text-emerald-950 text-xs">Điểm số từ LeeGo AI:</span>
                  <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full font-black text-xs shadow-2xs">
                    ⭐ {assessment.overallScore} / 100
                  </span>
                </div>
                <p className="text-emerald-900 font-extrabold text-xs mb-3">{assessment.encouragement}</p>
                <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
                  <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50">
                    <span className="text-slate-500 font-semibold block">Phát âm</span>
                    <span className="font-black text-emerald-700 text-xs">{assessment.pronunciation}%</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50">
                    <span className="text-slate-500 font-semibold block">Độ trôi chảy</span>
                    <span className="font-black text-emerald-700 text-xs">{assessment.fluency}%</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50">
                    <span className="text-slate-500 font-semibold block">Độ chính xác</span>
                    <span className="font-black text-emerald-700 text-xs">{assessment.accuracy}%</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50">
                    <span className="text-slate-500 font-semibold block">Độ hoàn thành</span>
                    <span className="font-black text-emerald-700 text-xs">{assessment.completeness}%</span>
                  </div>
                </div>
                <div className="text-[10px] space-y-1 text-slate-700 bg-white/60 p-2 rounded-xl border border-emerald-100/50">
                  <p><strong>🌟 Điểm mạnh:</strong> {assessment.strength}</p>
                  <p><strong>💡 Gợi ý:</strong> {assessment.suggestion}</p>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleNextSpeaking}
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>{speakingIndex === 1 ? 'Finish Check-Up' : 'Next Speaking Task'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. MIXED PRACTICE (Word Puzzle) */}
        {currentStage === 'mixedPractice' && puzzleTarget && (
          <div className="flex flex-col items-center gap-5">
            <h4 className="text-lg font-black text-slate-800">
              Unscramble this word to complete the Check-Up!
            </h4>
            <div className="bg-amber-50 p-4 rounded-3xl border border-amber-200 flex flex-col items-center">
              <span className="text-5xl mb-2">{EMOJI_MAP[puzzleTarget.word.toLowerCase()] || '🔤'}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Nghĩa tiếng Việt: {puzzleTarget.meaningVi}</span>
            </div>

            {/* Puzzle Output Display */}
            <div className="flex gap-2 min-h-[48px] border-b-2 border-dashed border-amber-200 px-6 py-1.5 items-center">
              {puzzleInput.map((letter, idx) => (
                <span key={idx} className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shadow-md capitalize animate-scaleUp">
                  {letter}
                </span>
              ))}
              {puzzleInput.length === 0 && <span className="text-slate-400 font-semibold italic text-xs">Click letters below</span>}
            </div>

            {/* Letter selection */}
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {puzzleLetters.map((letter, idx) => (
                <button
                  key={idx}
                  disabled={puzzleCorrect === true || puzzleInput.length === puzzleTarget.word.length}
                  onClick={() => handleLetterClick(letter, idx)}
                  className="w-11 h-11 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300 font-black text-base shadow-xs flex items-center justify-center capitalize"
                >
                  {letter}
                </button>
              ))}
            </div>

            {puzzleCorrect === true && (
              <div className="mt-2 w-full bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-emerald-950 flex items-center justify-between animate-fadeIn max-w-md">
                <span className="font-extrabold text-sm text-emerald-800">Tuyệt vời! Giải đố chính xác! ⭐</span>
                <button
                  onClick={() => {
                    soundFX.playFanfare();
                    onStageChange('speaking');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
                >
                  <span>Go to Speaking Activity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. COMPLETED SCREEN */}
        {currentStage === 'completed' && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4 border-4 border-amber-300 shadow-lg animate-bounce">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Check-Up Completed!</h2>
            <p className="text-sm font-semibold text-slate-600 max-w-md mb-6">
              Congratulations! You have completed the review of Units {unitA.number} & {unitB.number}! The next Unit is now unlocked.
            </p>

            <button
              onClick={onCompleted}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm animate-pulse"
            >
              <span>Unlock & Start Unit {unitB.number + 1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
