import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Award, Star, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { SpeakingAssessment, Lesson } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  studentName?: string;
  onSpeakingCompleted: (averageScore: number) => void;
}

interface SpeakingTask {
  number: number;
  type: string;
  instruction: string;
  promptText: string;
  targetPhrase: string;
  emoji?: string;
  teacherQuestion?: string;
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

export const SpeakingPractice: React.FC<Props> = ({
  lesson,
  studentName = 'Learner',
  onSpeakingCompleted,
}) => {
  const [tasks, setTasks] = useState<SpeakingTask[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // 0 to 4
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessment, setAssessment] = useState<SpeakingAssessment | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate 5 speaking tasks when lesson changes
  useEffect(() => {
    const vocabList = lesson.vocabulary && lesson.vocabulary.length > 0 ? lesson.vocabulary : [
      { id: 'v-fb-1', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
      { id: 'v-fb-2', word: 'book', meaningVi: 'sách', exampleSentence: 'It is a book.' },
      { id: 'v-fb-3', word: 'eraser', meaningVi: 'cục tẩy', exampleSentence: 'It is an eraser.' },
      { id: 'v-fb-4', word: 'ruler', meaningVi: 'thước kẻ', exampleSentence: 'It is a ruler.' }
    ];

    const sentencePatterns = lesson.sentencePatterns || [];
    const pattern = sentencePatterns[0]?.pattern || 'It is a/an ______.';
    const example1 = sentencePatterns[0]?.example || 'It is a pencil.';
    const example2 = sentencePatterns[1]?.example || sentencePatterns[0]?.example || 'It is a book.';

    const word1 = vocabList[0].word;
    const word2 = vocabList[1]?.word || word1;
    const word3 = vocabList[2]?.word || word1;

    const emoji1 = EMOJI_MAP[word1.toLowerCase()] || '🔤';
    const emoji3 = EMOJI_MAP[word3.toLowerCase()] || '🔤';

    // Build the 5 tasks progression:
    const generatedTasks: SpeakingTask[] = [
      {
        number: 1,
        type: 'repeat_word',
        instruction: 'Repeat this word aloud!',
        promptText: word1,
        targetPhrase: word1,
        emoji: emoji1,
      },
      {
        number: 2,
        type: 'read_sentence',
        instruction: 'Read this sentence aloud!',
        promptText: example1,
        targetPhrase: example1,
      },
      {
        number: 3,
        type: 'answer_question',
        instruction: "Answer the teacher's question!",
        teacherQuestion: pattern.includes('color')
          ? 'What color is it?'
          : pattern.includes('many')
          ? `How many ${word2}s?`
          : 'What is it?',
        promptText: example2,
        targetPhrase: example2,
      },
      {
        number: 4,
        type: 'describe_picture',
        instruction: 'Look at the picture and describe it!',
        emoji: emoji3,
        promptText: example1.replace(new RegExp(word1, 'gi'), word3),
        targetPhrase: example1.replace(new RegExp(word1, 'gi'), word3),
      },
      {
        number: 5,
        type: 'conversation',
        instruction: 'Complete the mini conversation!',
        teacherQuestion: pattern.includes('color')
          ? 'What color is it?'
          : pattern.includes('many')
          ? `How many ${word1}s?`
          : 'What is it?',
        promptText: example1,
        targetPhrase: example1,
      },
    ];

    setTasks(generatedTasks);
    setCurrentTaskIndex(0);
    setAssessment(null);
    setTranscript('');
    setScores([]);
  }, [lesson]);

  // Speech recognition setup
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

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, []);

  const activeTask = tasks[currentTaskIndex];

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
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.start();
      }
    } catch (err) {
      console.warn('Microphone recording error:', err);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }

    setIsRecording(true);
    soundFX.playClick();

    // Start 15s recording limit countdown
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 14) {
          // Stop recording automatically at 15s
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

  const handleEvaluate = async (textToEval: string) => {
    setIsEvaluating(true);
    const text = textToEval || transcript || activeTask.targetPhrase;

    try {
      const res = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          targetPhrase: activeTask.targetPhrase,
          studentName,
        }),
      });

      const data: SpeakingAssessment = await res.json();
      setAssessment(data);
      setScores((prev) => [...prev, data.overallScore]);
      soundFX.playFanfare();
    } catch (err) {
      console.error('Evaluate API error:', err);
      
      const studentClean = (text || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
      const expectedClean = (activeTask.targetPhrase || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
      
      const isSingleWord = !expectedClean.includes(' ');
      let accuracy = 0;
      let correctWords: string[] = [];
      let missingWords: string[] = [];
      let incorrectWords: { expected: string; student: string }[] = [];
      
      if (isSingleWord) {
        accuracy = studentClean === expectedClean ? 100 : (studentClean.includes(expectedClean) || expectedClean.includes(studentClean) ? 75 : 0);
        if (accuracy === 100) {
          correctWords = [expectedClean];
        } else {
          missingWords = [expectedClean];
          incorrectWords = [{ expected: expectedClean, student: studentClean || '?' }];
        }
      } else {
        const expWords = expectedClean.split(/\s+/).filter(w => w.length > 0);
        const studWords = studentClean.split(/\s+/).filter(w => w.length > 0);
        correctWords = expWords.filter(w => studWords.includes(w));
        missingWords = expWords.filter(w => !studWords.includes(w));
        studWords.filter(w => !expWords.includes(w)).forEach((w, idx) => {
          incorrectWords.push({ expected: missingWords[idx] || '', student: w });
        });
        accuracy = expWords.length > 0 ? Math.round((correctWords.length / expWords.length) * 100) : 0;
      }
      
      let accuracyScore = accuracy;
      if (accuracy < 60) accuracyScore = Math.min(40, accuracy);
      
      let pronunciationScore = accuracy === 100 ? 95 : (accuracy >= 70 ? 75 : Math.min(40, accuracy));
      let fluencyScore = 90;
      let completionScore = isSingleWord ? (accuracy > 0 ? 100 : 0) : Math.min(100, Math.round(((studentClean.split(/\s+/).length) / (expectedClean.split(/\s+/).length)) * 100));
      
      let overallScore = Math.round(accuracyScore * 0.5 + pronunciationScore * 0.3 + fluencyScore * 0.1 + completionScore * 0.1);
      
      const matchesHighScore = isSingleWord ? (accuracy === 100) : (accuracy >= 90 && completionScore >= 90 && pronunciationScore >= 90);
      if (!matchesHighScore && overallScore >= 90) {
        overallScore = 89;
      }

      let comment = "";
      if (overallScore >= 95) {
        comment = "Xuất sắc! Em đọc đúng gần như hoàn toàn, phát âm rõ ràng và hoàn thành đầy đủ câu trả lời.";
      } else if (overallScore >= 85) {
        comment = "Em trả lời đúng hầu hết nội dung. Chỉ còn một vài âm cần phát âm rõ hơn để đạt điểm tối đa.";
      } else if (overallScore >= 70) {
        comment = "Em đã đọc đúng phần lớn câu trả lời, tuy nhiên còn thiếu hoặc sai một vài từ. Hãy nghe lại mẫu và luyện đọc thêm.";
      } else if (overallScore >= 50) {
        comment = "Em mới hoàn thành một phần câu trả lời. Hãy chú ý đọc đầy đủ và chính xác từng từ theo mẫu.";
      } else {
        comment = "Câu trả lời của em chưa khớp với yêu cầu. Hãy nghe lại mẫu và thử đọc lại từng từ trước khi đọc cả câu.";
      }

      const fallback: SpeakingAssessment = {
        overallScore,
        pronunciation: pronunciationScore,
        fluency: fluencyScore,
        accuracy: accuracyScore,
        completeness: completionScore,
        confidence: overallScore,
        strength: '',
        suggestion: '',
        encouragement: '',
        comment,
        correctWords,
        missingWords,
        incorrectWords,
        pronunciationProblems: []
      };

      setAssessment(fallback);
      setScores((prev) => [...prev, overallScore]);
      soundFX.playStar();
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextTask = () => {
    if (currentTaskIndex < 4) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setTranscript('');
      setAssessment(null);
      soundFX.playClick();
    } else {
      // Calculate final average score
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      const avgScore = Math.round(totalScore / 5);
      onSpeakingCompleted(avgScore);
    }
  };

  if (tasks.length === 0) return null;

  return (
    <div id="speaking-practice-card" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md flex flex-col items-center max-w-xl mx-auto my-2 text-center min-h-[460px] justify-between">
      {/* Speaking Header */}
      <div className="w-full flex items-center justify-between border-b border-red-50 pb-3 mb-4">
        <span className="text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
          Task {currentTaskIndex + 1} / 5
        </span>
        <span className="text-xs font-bold text-slate-500 capitalize">
          Difficulty: {currentTaskIndex === 0 ? 'Very Easy' : currentTaskIndex === 1 ? 'Easy' : currentTaskIndex === 2 ? 'Medium' : currentTaskIndex === 3 ? 'Challenging' : 'Advanced'}
        </span>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center py-2">
        <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-2">
          {activeTask.instruction}
        </span>

        {/* Task Visual Prompts */}
        {activeTask.type === 'repeat_word' && (
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="text-7xl p-3 bg-red-50 rounded-full border border-red-100">{activeTask.emoji}</div>
            <h4 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{activeTask.targetPhrase}</h4>
          </div>
        )}

        {activeTask.type === 'read_sentence' && (
          <div className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white p-5 rounded-2xl shadow-md mb-6 flex items-center justify-between gap-4">
            <span className="text-xl font-black tracking-wide text-left">{activeTask.targetPhrase}</span>
            <button
              onClick={() => speakText(activeTask.targetPhrase, undefined, 0.85, 1.1)}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors shrink-0"
              title="Listen"
            >
              <Volume2 className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {activeTask.type === 'answer_question' && (
          <div className="w-full space-y-4 mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left flex items-start gap-3">
              <span className="text-3xl select-none">😊</span>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">LeeGo Teacher asks:</span>
                <p className="font-extrabold text-slate-800 text-base">"{activeTask.teacherQuestion}"</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3 text-left">
              <span className="text-[10px] font-bold text-red-500 uppercase">Your answer should be:</span>
              <p className="font-bold text-slate-700 italic">"{activeTask.targetPhrase}"</p>
            </div>
          </div>
        )}

        {activeTask.type === 'describe_picture' && (
          <div className="flex flex-col items-center gap-4 w-full mb-4">
            <div className="w-40 h-40 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shadow-inner select-none text-8xl font-normal">
              {activeTask.emoji}
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3 text-left w-full max-w-sm">
              <span className="text-[10px] font-bold text-red-500 uppercase">Describe this image using:</span>
              <p className="font-bold text-slate-700 italic">"{activeTask.targetPhrase}"</p>
            </div>
          </div>
        )}

        {activeTask.type === 'conversation' && (
          <div className="w-full space-y-3 mb-6">
            {/* Dialogue Bubble 1 */}
            <div className="bg-slate-100 rounded-2xl p-4 text-left max-w-[85%] mr-auto">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">LeeGo Teacher:</span>
              <p className="font-black text-slate-800">"{activeTask.teacherQuestion}"</p>
            </div>
            {/* Dialogue Bubble 2 */}
            <div className="bg-red-50 rounded-2xl p-4 text-left max-w-[85%] ml-auto border border-red-100">
              <span className="text-[10px] font-bold text-red-500 uppercase block">You:</span>
              <p className="font-bold text-slate-700 italic">"{activeTask.targetPhrase}"</p>
            </div>
          </div>
        )}

        {/* Recording Visuals & Timing controls */}
        <div className="w-full flex flex-col items-center gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isEvaluating}
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all ring-4 ring-red-200 disabled:opacity-50"
            >
              <Mic className="w-8 h-8" />
              <span className="text-[9px] font-black uppercase mt-1">RECORD</span>
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg animate-pulse ring-4 ring-rose-200"
              >
                <MicOff className="w-8 h-8 text-rose-400" />
                <span className="text-[9px] font-black uppercase mt-1 text-rose-300">STOP</span>
              </button>
              {/* 15 Seconds Limit Progress Bar */}
              <div className="w-48 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden border border-slate-300 relative">
                <div
                  className="bg-red-500 h-full transition-all duration-1000"
                  style={{ width: `${(recordingSeconds / 15) * 100}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-slate-700">
                  {15 - recordingSeconds}s remaining
                </span>
              </div>
            </div>
          )}

          {/* Transcript display */}
          <div className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl min-h-[56px] flex flex-col justify-center text-sm text-slate-700">
            {transcript ? (
              <p className="font-extrabold text-slate-950">"{transcript}"</p>
            ) : isRecording ? (
              <p className="text-red-500 font-bold animate-pulse">Speak clearly... 🎙️</p>
            ) : (
              <div className="flex items-center justify-center gap-1 text-slate-400 italic text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Tap record or type your response below</span>
              </div>
            )}
          </div>

          {/* Type response fallback (for environments without mic) */}
          {!transcript && !isRecording && !assessment && (
            <div className="w-full flex items-center gap-2 max-w-sm mt-1">
              <input
                type="text"
                placeholder={`Type "${activeTask.targetPhrase}" to practice...`}
                className="flex-1 px-3.5 py-2 border-2 border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-red-500 shadow-2xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    setTranscript(e.currentTarget.value);
                    handleEvaluate(e.currentTarget.value);
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                  if (input) {
                    setTranscript(input);
                    handleEvaluate(input);
                  }
                }}
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black transition-colors"
              >
                Submit
              </button>
            </div>
          )}

          {/* Evaluation buttons */}
          {transcript && !isRecording && !assessment && (
            <button
              onClick={() => handleEvaluate(transcript)}
              disabled={isEvaluating}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <span>{isEvaluating ? 'LeeGo AI is Assessing...' : 'Evaluate My Speaking'}</span>
            </button>
          )}
        </div>

        {/* AI Evaluation feedback result block */}
        {assessment && (
          <div className="mt-5 w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 p-4 rounded-2xl border-2 border-emerald-300 shadow-xs text-left animate-fadeIn">
            <div className="flex items-center justify-between mb-3 border-b border-emerald-200 pb-2">
              <div className="flex items-center gap-1.5">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold text-emerald-950 text-xs md:text-sm">Kết quả từ LeeGo AI</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-400 text-slate-900 px-3 py-1 rounded-full font-black text-xs shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-slate-900" />
                <span>Điểm tổng: {assessment.overallScore} / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[10px]">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50 text-center">
                <span className="text-slate-500 font-semibold block">Độ chính xác</span>
                <span className="font-black text-emerald-700 text-xs">{assessment.accuracy !== undefined ? assessment.accuracy : assessment.overallScore}%</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50 text-center">
                <span className="text-slate-500 font-semibold block">Phát âm</span>
                <span className="font-black text-emerald-700 text-xs">{assessment.pronunciation}%</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50 text-center">
                <span className="text-slate-500 font-semibold block">Độ trôi chảy</span>
                <span className="font-black text-emerald-700 text-xs">{assessment.fluency}%</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100/50 text-center">
                <span className="text-slate-500 font-semibold block">Mức độ hoàn thành</span>
                <span className="font-black text-emerald-700 text-xs">{assessment.completeness}%</span>
              </div>
            </div>

            {/* Error Highlighting */}
            <div className="mb-3 text-[11px] space-y-1.5 bg-white/60 p-2.5 rounded-xl border border-emerald-100/50 text-left">
              {/* Correct Words */}
              {assessment.correctWords && assessment.correctWords.length > 0 && (
                <div>
                  <span className="font-extrabold text-emerald-800">✅ Correct Words:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {assessment.correctWords.map((w, idx) => (
                      <span key={idx} className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold capitalize">{w}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Missing Words */}
              {assessment.missingWords && assessment.missingWords.length > 0 && (
                <div className="pt-1">
                  <span className="font-extrabold text-rose-800">❌ Missing Words:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {assessment.missingWords.map((w, idx) => (
                      <span key={idx} className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-md font-bold capitalize">{w}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Incorrect Words */}
              {assessment.incorrectWords && assessment.incorrectWords.length > 0 && (
                <div className="pt-1">
                  <span className="font-extrabold text-amber-800">❌ Incorrect Words:</span>
                  <div className="space-y-1 mt-1">
                    {assessment.incorrectWords.map((item, idx) => (
                      <div key={idx} className="text-[10px]">
                        <span className="text-rose-600 font-bold line-through">Student: "{item.student}"</span>
                        <span className="text-emerald-600 font-bold ml-1.5">Expected: "{item.expected}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Pronunciation Problems */}
              {assessment.pronunciationProblems && assessment.pronunciationProblems.length > 0 && (
                <div className="pt-1">
                  <span className="font-extrabold text-amber-900">⚠️ Practice pronunciation of:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {assessment.pronunciationProblems.map((w, idx) => (
                      <span key={idx} className="bg-amber-100 text-amber-950 px-1.5 py-0.5 rounded-md font-bold border border-amber-300 capitalize">{w}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-[11px] space-y-1 text-slate-700 bg-white/60 p-2.5 rounded-xl border border-emerald-100/50">
              <p><strong>📝 Nhận xét:</strong> {assessment.comment || assessment.encouragement}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      {assessment && (
        <div className="w-full border-t border-red-50 pt-3 mt-4 flex justify-end">
          <button
            onClick={handleNextTask}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all text-xs"
          >
            <span>{currentTaskIndex === 4 ? 'See Lesson Results!' : 'Next Task'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
