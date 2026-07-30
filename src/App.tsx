import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Award,
  Star,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Heart,
} from 'lucide-react';

import { Stage, StudentProgress, Unit, Lesson, AITeacherResponse, PracticeQuestion, SpeakingTask } from './types';
import { CURRICULUM_UNITS, LEEGO_BRAND } from './data/curriculum';
import { LeeGoTeacherAvatar } from './components/LeeGoTeacherAvatar';
import { LessonFlowHeader } from './components/LessonFlowHeader';
import { InteractiveGame } from './components/InteractiveGame';
import { SpeakingPractice } from './components/SpeakingPractice';
import { CurriculumDrawer } from './components/CurriculumDrawer';
import { RewardModal } from './components/RewardModal';
import { VocabularyCardPlayer } from './components/VocabularyCardPlayer';
import { speakText } from './utils/ttsPlayer';
import { soundFX } from './utils/soundEffects';
import { checkup1Practice } from './data/practice/checkup1';
import { checkup2Practice } from './data/practice/checkup2';
import { checkup3Practice } from './data/practice/checkup3';
import { checkup4Practice } from './data/practice/checkup4';


function getModelPatternInfo(unitNumber: number, lessonNumber: number, lesson: Lesson) {
  const defaultPattern = lesson.sentencePatterns[0]?.pattern || 'It is a/an ______.';
  const defaultExamples = lesson.sentencePatterns.map(p => p.example).slice(0, 2);
  while (defaultExamples.length < 2) {
    defaultExamples.push(lesson.sentencePatterns[0]?.example || 'It is a pencil.');
  }

  if (lesson.id.startsWith('checkup-')) {
    return {
      structure: 'Check-Up Review (Ôn tập tổng hợp)',
      examples: defaultExamples,
      translationVi: 'Luyện nghe và luyện nói các mẫu câu cốt lõi đã học trong hai Unit vừa qua.'
    };
  }

  // Define lookup patterns based on curriculum
  if (unitNumber === 1) {
    if (lessonNumber === 1) {
      return {
        structure: 'It is a/an ______.',
        examples: ['It is a pencil.', 'It is an eraser.'],
        translationVi: 'Dùng "a" trước phụ âm và "an" trước nguyên âm (u, e, o, a, i).'
      };
    } else if (lessonNumber === 2) {
      return {
        structure: "It's a ______ / It isn't a ______.",
        examples: ["It's a book.", "It isn't a notebook."],
        translationVi: 'Khẳng định "It\'s a..." (Nó là...) và Phủ định "It isn\'t a..." (Nó không phải là...).'
      };
    } else if (lessonNumber === 3) {
      return {
        structure: 'How are you? I\'m ______.',
        examples: ['How are you?', 'I\'m fine. Thank you.'],
        translationVi: 'Hỏi thăm sức khỏe của bạn và trả lời lịch sự.'
      };
    } else {
      return {
        structure: 'Is it a ______? Yes, it is. / No, it isn\'t.',
        examples: ['Is it a circle? Yes, it is.', 'Is it a square? No, it isn\'t.'],
        translationVi: 'Câu hỏi ngắn Có/Không về hình dáng.'
      };
    }
  } else if (unitNumber === 2) {
    if (lessonNumber === 1) {
      return {
        structure: 'What\'s this? This is ______.',
        examples: ['What\'s this?', 'This is paint.'],
        translationVi: 'Hỏi và trả lời về đồ dùng ở gần.'
      };
    } else if (lessonNumber === 2) {
      return {
        structure: 'What color is it? It\'s ______.',
        examples: ['What color is it?', 'It\'s red.'],
        translationVi: 'Hỏi và trả lời về màu sắc.'
      };
    } else if (lessonNumber === 3) {
      return {
        structure: 'Let\'s share. OK.',
        examples: ['Let\'s share.', 'OK.'],
        translationVi: 'Đề xuất chia sẻ đồ dùng học tập.'
      };
    } else {
      return {
        structure: '______ and ______ make ______.',
        examples: ['Blue and yellow make green.', 'Red and yellow make orange.'],
        translationVi: 'Kết hợp hai màu sắc để tạo thành màu mới.'
      };
    }
  } else if (unitNumber === 3) {
    if (lessonNumber === 1) {
      return {
        structure: 'How old are you? I\'m ______.',
        examples: ['How old are you?', 'I\'m seven.'],
        translationVi: 'Hỏi và trả lời về tuổi.'
      };
    } else if (lessonNumber === 2) {
      return {
        structure: 'How many ______? There is/There are ______.',
        examples: ['How many dolls? Two dolls.', 'How many balls? One ball.'],
        translationVi: 'Hỏi số lượng đồ chơi dạng số nhiều.'
      };
    } else if (lessonNumber === 3) {
      return {
        structure: 'It\'s your turn. Thank you.',
        examples: ['It\'s your turn.', 'Thank you.'],
        translationVi: 'Nói đến lượt của bạn một cách lịch sự.'
      };
    } else {
      return {
        structure: 'I have ______.',
        examples: ['I have one game.', 'I have two cards.'],
        translationVi: 'Nói về số lượng đồ chơi mình sở hữu.'
      };
    }
  } else if (unitNumber === 4) {
    if (lessonNumber === 1) {
      return {
        structure: 'Who\'s this? This is my ______.',
        examples: ['Who\'s this?', 'This is my mother.'],
        translationVi: 'Hỏi và giới thiệu về các thành viên gia đình.'
      };
    } else if (lessonNumber === 2) {
      return {
        structure: 'I like ______ / I don\'t like ______.',
        examples: ['I like juice.', 'I don\'t like chicken.'],
        translationVi: 'Diễn tả sở thích hoặc không thích đồ ăn.'
      };
    } else if (lessonNumber === 3) {
      return {
        structure: 'Here you are. Thank you.',
        examples: ['Here you are.', 'Thank you.'],
        translationVi: 'Đưa đồ vật cho ai đó và nhận lời cảm ơn.'
      };
    } else {
      return {
        structure: 'What\'s this? This is ______.',
        examples: ['What\'s this?', 'This is pizza.'],
        translationVi: 'Hỏi và giới thiệu về đồ ăn.'
      };
    }
  } else {
    // Other units fallback generator
    return {
      structure: defaultPattern,
      examples: defaultExamples,
      translationVi: lesson.sentencePatterns[0]?.translationVi || 'Mẫu câu thực hành của bài.'
    };
  }
}

export default function App() {
  // Curriculum state
  const [currentUnit, setCurrentUnit] = useState<Unit>(CURRICULUM_UNITS[0]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(CURRICULUM_UNITS[0].lessons[0]);
  const [currentStage, setCurrentStage] = useState<Stage>('vocabulary');
  const [lastPracticeScore, setLastPracticeScore] = useState<number>(100);
  const [lastSpeakingScore, setLastSpeakingScore] = useState<number>(90);

  // Check-Up active state
  const [currentCheckUpNum, setCurrentCheckUpNum] = useState<number | null>(null);
  const [checkUpUnitA, setCheckUpUnitA] = useState<Unit | null>(null);
  const [checkUpUnitB, setCheckUpUnitB] = useState<Unit | null>(null);

  // Gamification progress state
  const [progress, setProgress] = useState<StudentProgress>({
    stars: 12,
    badges: ['First Step', 'School Star'],
    completedLessonIds: [],
    completedUnitIds: [],
    speakingScoreAvg: 90,
    dailyStreak: 3,
    currentUnitId: CURRICULUM_UNITS[0].id,
    currentLessonId: CURRICULUM_UNITS[0].lessons[0].id,
    currentStage: 'vocabulary',
  });

  // UI Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [rewardStars, setRewardStars] = useState(1);
  const [unlockedBadge, setUnlockedBadge] = useState<string | undefined>(undefined);

  // LeeGo AI Teacher Response state
  const [teacherResponse, setTeacherResponse] = useState<AITeacherResponse>({
    speechText: `Welcome to LeeGo English Explorer AI! Today we are learning Unit 1: ${CURRICULUM_UNITS[0].title}! Are you ready?`,
    translationVi: 'Chào mừng em đến với LeeGo! Hôm nay chúng mình học Bài 1 nhé!',
    teacherMood: 'cheerful',
  });

  const [studentInput, setStudentInput] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Trigger stage update & AI interaction when stage changes
  const handleStageChange = async (newStage: Stage) => {
    if (currentUnit.id === 'unit-1' && currentLesson.number === 3 && newStage === 'vocabulary') {
      return;
    }
    setCurrentStage(newStage);
    soundFX.playClick();

    // Generate tailored LeeGo response for stage
    fetchTeacherResponse(`Entered stage: ${newStage}`);
  };

  const fetchTeacherResponse = async (userMsg: string) => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: currentUnit.title,
          lessonTitle: currentLesson.title,
          stage: currentStage,
          userMessage: userMsg,
          currentVocab: (currentLesson.vocabulary || []).map((v) => v.word),
          currentPattern: (currentLesson.sentencePatterns || [])[0]?.pattern,
        }),
      });

      const data: AITeacherResponse = await res.json();
      setTeacherResponse(data);
      if (data.starsAwarded) {
        addStars(data.starsAwarded);
      }
    } catch (err) {
      console.warn('Teacher AI fetch fallback:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const addStars = (num: number) => {
    setProgress((prev) => ({ ...prev, stars: prev.stars + num }));
    soundFX.playStar();
  };

  const handleLessonSelect = (unit: Unit, lesson: Lesson) => {
    setCurrentCheckUpNum(null);
    setCheckUpUnitA(null);
    setCheckUpUnitB(null);
    setCurrentUnit(unit);
    setCurrentLesson(lesson);
    const startStage = (unit.id === 'unit-1' && lesson.number === 3) ? 'modelPattern' : 'vocabulary';
    setCurrentStage(startStage);
    setUnlockedBadge(undefined);
    fetchTeacherResponse(`Switched to Unit ${unit.number} Lesson ${lesson.number}: ${lesson.title}`);
  };

  const handleSelectCheckUp = (num: number, unitA: Unit, unitB: Unit) => {
    setCurrentCheckUpNum(num);
    setCheckUpUnitA(unitA);
    setCheckUpUnitB(unitB);
    fetchTeacherResponse(`Starting Check-Up ${num} for Units ${unitA.number} & ${unitB.number}`);
  };

  const handleCheckUpCompleted = () => {
    if (currentCheckUpNum === null) return;
    
    // Add checkup to completedUnitIds to unlock the next unit!
    const checkUpId = `checkup-${currentCheckUpNum}`;
    let newCompletedUnits = [...progress.completedUnitIds];
    if (!newCompletedUnits.includes(checkUpId)) {
      newCompletedUnits.push(checkUpId);
    }
    
    setProgress((prev) => ({
      ...prev,
      completedUnitIds: newCompletedUnits,
    }));
    
    soundFX.playFanfare();
    
    // Reset Check-Up state and load the first lesson of the next unit
    const nextUnitIdx = currentCheckUpNum * 2; // e.g. Check-Up 1 completed -> Unit 3 index is 2
    setCurrentCheckUpNum(null);
    setCheckUpUnitA(null);
    setCheckUpUnitB(null);
    
    if (nextUnitIdx < CURRICULUM_UNITS.length) {
      const nextUnit = CURRICULUM_UNITS[nextUnitIdx];
      handleLessonSelect(nextUnit, nextUnit.lessons[0]);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleNextStage = () => {
    let stages: Stage[] = [
      'vocabulary',
      'modelPattern',
      'practice',
      'speaking',
      'completed',
    ];
    if (currentUnit.id === 'unit-1' && currentLesson.number === 3) {
      stages = stages.filter(s => s !== 'vocabulary');
    }

    const idx = stages.indexOf(currentStage);
    if (idx < stages.length - 1) {
      handleStageChange(stages[idx + 1]);
    }
  };

  const handleSpeakingCompleted = (averageScore: number) => {
    // Calculate Overall Score
    const overall = Math.round(lastPracticeScore * 0.6 + averageScore * 0.4);
    
    // Determine stars to award
    let starsAwarded = 1;
    if (overall >= 95) starsAwarded = 5;
    else if (overall >= 90) starsAwarded = 4.5;
    else if (overall >= 80) starsAwarded = 4;
    else if (overall >= 70) starsAwarded = 3;
    else if (overall >= 60) starsAwarded = 2;

    addStars(starsAwarded);

    // Determine badge to award
    let badge = "Never Give Up";
    if (overall >= 95) badge = "Excellent Explorer";
    else if (overall >= 85) badge = "Smart Explorer";
    else if (overall >= 70) badge = "Active Learner";
    else if (overall >= 60) badge = "Keep Practicing";

    // Save lesson progression
    const isCheckUp = currentCheckUpNum !== null;
    const currentId = isCheckUp ? `checkup-${currentCheckUpNum}` : currentLesson.id;

    setProgress((prev) => {
      const updatedLessons = isCheckUp ? prev.completedLessonIds : [...prev.completedLessonIds];
      if (!isCheckUp && !updatedLessons.includes(currentId)) {
        updatedLessons.push(currentId);
      }

      const updatedUnits = [...prev.completedUnitIds];
      if (isCheckUp && !updatedUnits.includes(currentId)) {
        updatedUnits.push(currentId);
      }

      const updatedBadges = [...prev.badges];
      if (!updatedBadges.includes(badge)) {
        updatedBadges.push(badge);
      }

      return {
        ...prev,
        completedLessonIds: updatedLessons,
        completedUnitIds: updatedUnits,
        badges: updatedBadges,
      };
    });

    setUnlockedBadge(badge);
    handleStageChange('completed');
  };

  const speakModelAudio = (examples: string[]) => {
    if (examples.length === 0) return;
    speakText(examples[0], () => {
      // Pause naturally (about one second)
      setTimeout(() => {
        if (examples[1]) {
          speakText(examples[1], undefined, 0.85, 1.15);
        }
      }, 1000);
    }, 0.85, 1.15);
  };

  const checkUpVocab = currentCheckUpNum !== null && checkUpUnitA && checkUpUnitB
    ? [...checkUpUnitA.lessons, ...checkUpUnitB.lessons]
        .flatMap((l) => l.vocabulary || [])
        .filter((item, index, self) => self.findIndex(t => t.word === item.word) === index)
    : [];

  const checkUpPatterns = currentCheckUpNum !== null && checkUpUnitA && checkUpUnitB
    ? [...checkUpUnitA.lessons, ...checkUpUnitB.lessons]
        .flatMap((l) => l.sentencePatterns || [])
        .filter((item, index, self) => self.findIndex(t => t.pattern === item.pattern) === index)
    : [];

  const checkUpUnitVirtual: Unit = currentCheckUpNum !== null ? {
    id: `checkup-u-${currentCheckUpNum}`,
    number: currentCheckUpNum,
    title: `CHECK-UP ${currentCheckUpNum}`,
    theme: `Reviewing Units ${checkUpUnitA?.number} & ${checkUpUnitB?.number}`,
    learningGoal: `Practice speaking, vocabulary matching, and listening test from Units ${checkUpUnitA?.number} and ${checkUpUnitB?.number}.`,
    lessons: []
  } : currentUnit;

  const checkUpSource = checkUpUnitA?.checkUp || checkUpUnitB?.checkUp;

  // Dynamic Selector for Check-Up Practice Questions (8 questions: 4 from Unit A, 4 from Unit B)
  const dynamicCheckUpQuestions = currentCheckUpNum !== null
    ? (() => {
        if (currentCheckUpNum === 1) return checkup1Practice;
        if (currentCheckUpNum === 2) return checkup2Practice;
        if (currentCheckUpNum === 3) return checkup3Practice;
        if (currentCheckUpNum === 4) return checkup4Practice;
        return [];
      })()
    : undefined;

  // Dynamic Selector for Check-Up Speaking Tasks (5 tasks)
  const dynamicCheckUpSpeaking = currentCheckUpNum !== null && checkUpUnitA && checkUpUnitB
    ? (() => {
        const tasks: SpeakingTask[] = [];
        
        // Task 1: repeat_word from Unit A Lesson 1
        const t1 = checkUpUnitA.lessons[0]?.speakingTasks?.find(t => t.type === 'repeat_word') 
                   || checkUpUnitA.lessons[0]?.speakingTasks?.[0];
        if (t1) tasks.push({ ...t1, number: 1 });

        // Task 2: read_sentence from Unit A Lesson 2
        const t2 = checkUpUnitA.lessons[1]?.speakingTasks?.find(t => t.type === 'read_sentence') 
                   || checkUpUnitA.lessons[1]?.speakingTasks?.[1];
        if (t2) tasks.push({ ...t2, number: 2 });

        // Task 3: answer_question from Unit B Lesson 1
        const t3 = checkUpUnitB.lessons[0]?.speakingTasks?.find(t => t.type === 'answer_question') 
                   || checkUpUnitB.lessons[0]?.speakingTasks?.[2];
        if (t3) tasks.push({ ...t3, number: 3 });

        // Task 4: describe_picture from Unit B Lesson 2
        const t4 = checkUpUnitB.lessons[1]?.speakingTasks?.find(t => t.type === 'describe_picture') 
                   || checkUpUnitB.lessons[1]?.speakingTasks?.[3];
        if (t4) tasks.push({ ...t4, number: 4 });

        // Task 5: conversation from Unit B Lesson 3 (or Unit A Lesson 3)
        const t5 = checkUpUnitB.lessons[2]?.speakingTasks?.find(t => t.type === 'conversation')
                   || checkUpUnitA.lessons[2]?.speakingTasks?.find(t => t.type === 'conversation')
                   || checkUpUnitB.lessons[2]?.speakingTasks?.[4];
        if (t5) tasks.push({ ...t5, number: 5 });

        return tasks;
      })()
    : undefined;

  const checkUpLessonVirtual: Lesson = currentCheckUpNum !== null ? {
    id: `checkup-l-${currentCheckUpNum}`,
    number: currentCheckUpNum,
    title: `Units ${checkUpUnitA?.number} & ${checkUpUnitB?.number} Review`,
    learningObjective: `Review vocabulary, key patterns, listening, and speaking from Units ${checkUpUnitA?.number} and ${checkUpUnitB?.number}.`,
    vocabulary: checkUpVocab,
    sentencePatterns: checkUpPatterns,
    suggestedGames: ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'],
    practiceQuestions: dynamicCheckUpQuestions,
    speakingTasks: dynamicCheckUpSpeaking
  } : currentLesson;

  const currentLessonToUse = currentCheckUpNum !== null ? checkUpLessonVirtual : currentLesson;
  const currentUnitToUse = currentCheckUpNum !== null ? checkUpUnitVirtual : currentUnit;

  const modelPatternInfo = getModelPatternInfo(currentUnitToUse.number, currentLessonToUse.number, currentLessonToUse);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Lesson Routine Header */}
      <LessonFlowHeader
        currentUnit={currentUnitToUse}
        currentLesson={currentLessonToUse}
        currentStage={currentStage}
        progress={progress}
        onSelectStage={handleStageChange}
        onOpenCurriculum={() => setIsDrawerOpen(true)}
      />

      {/* Main Classroom Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 flex flex-col gap-6">
        {/* LeeGo AI Teacher Character Banner */}
        <LeeGoTeacherAvatar
          speechText={teacherResponse.speechText}
          translationVi={teacherResponse.translationVi}
          mood={teacherResponse.teacherMood}
        />

        {/* Dynamic Classroom Arena for Current Stage / Check-Up */}
        <div className="flex-1 bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md min-h-[420px] flex flex-col justify-between">
          
            <>
              {/* STAGE 1: VOCABULARY */}
              {currentStage === 'vocabulary' && (
                <VocabularyCardPlayer
                  vocabulary={currentLessonToUse.vocabulary}
                  onCompleted={handleNextStage}
                  isCheckUp={currentCheckUpNum !== null}
                />
              )}

              {/* STAGE 2: MODEL PATTERN */}
              {currentStage === 'modelPattern' && (
                <div className="flex flex-col items-center text-center my-auto py-6">
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full mb-3">
                    💬 Model Pattern
                  </span>
                  
                  {/* General Structure Card */}
                  <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 rounded-3xl shadow-lg max-w-lg w-full mb-6">
                    <h3 className="text-2xl font-black mb-2">
                      {modelPatternInfo.structure}
                    </h3>
                    <p className="text-xs text-amber-300 font-bold mt-2">
                      💡 {modelPatternInfo.translationVi}
                    </p>
                  </div>

                  {/* 2 Simple Examples Card */}
                  <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl w-full max-w-lg mb-6 text-left space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Example Sentences
                    </span>
                    {modelPatternInfo.examples.map((example, index) => (
                      <div key={index} className="flex items-center gap-3 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-black">
                          {index + 1}
                        </span>
                        <span className="text-sm font-extrabold text-slate-800">{example}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => speakModelAudio(modelPatternInfo.examples)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4" /> Listen Model Audio
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Practice Pattern</span> <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: PRACTICE */}
              {currentStage === 'practice' && (
                <InteractiveGame
                  lesson={currentLessonToUse}
                  onCorrectAnswer={() => addStars(1)}
                  onGameCompleted={(score) => {
                    setLastPracticeScore(score);
                    handleNextStage();
                  }}
                />
              )}

              {/* STAGE 4: SPEAKING */}
              {currentStage === 'speaking' && (
                <SpeakingPractice
                  lesson={currentLessonToUse}
                  studentName="Explorer"
                  onSpeakingCompleted={(averageScore) => {
                    setLastSpeakingScore(averageScore);
                    handleSpeakingCompleted(averageScore);
                  }}
                />
              )}

              {/* STAGE 5: COMPLETED */}
              {currentStage === 'completed' && (() => {
                const isCheckUp = currentCheckUpNum !== null;
                const overallScore = Math.round(lastPracticeScore * 0.6 + lastSpeakingScore * 0.4);

                // Star Conversion
                let stars = 1;
                if (overallScore >= 95) stars = 5;
                else if (overallScore >= 90) stars = 4.5;
                else if (overallScore >= 80) stars = 4;
                else if (overallScore >= 70) stars = 3;
                else if (overallScore >= 60) stars = 2;

                // Badge Awarded
                let badge = "Never Give Up";
                if (overallScore >= 95) badge = "Excellent Explorer";
                else if (overallScore >= 85) badge = "Smart Explorer";
                else if (overallScore >= 70) badge = "Active Learner";
                else if (overallScore >= 60) badge = "Keep Practicing";

                // Teacher Comment
                const getTeacherComment = (p: number, s: number) => {
                  if (p >= 95 && s >= 95) {
                    return "🌟 Xuất sắc! Em đã hoàn thành rất tốt cả phần Practice và Speaking. Hãy tiếp tục phát huy nhé!";
                  }
                  if (p >= 85 && s < 80) {
                    return "👍 Em làm rất tốt phần Practice. Hãy luyện Speaking thêm để phát âm rõ hơn và trả lời tự nhiên hơn.";
                  }
                  if (p < 80 && s >= 85) {
                    return "🎤 Em giao tiếp rất tốt. Tuy nhiên em nên ôn lại từ vựng và cấu trúc để làm tốt hơn phần Practice.";
                  }
                  if (p >= 50 && s >= 50) {
                    return "💪 Em đã hoàn thành bài học. Hãy xem lại từ vựng, cấu trúc và luyện nói thêm trước khi sang bài tiếp theo.";
                  }
                  return "📚 Em đã cố gắng hoàn thành bài học. Hãy ôn lại bài học này rồi thử lại để đạt kết quả cao hơn.";
                };
                const teacherComment = getTeacherComment(lastPracticeScore, lastSpeakingScore);

                // Performance Analysis
                const analysisItems = [];
                if (lastPracticeScore >= 80) {
                  analysisItems.push({ status: 'good', text: 'Vocabulary: Good' });
                  analysisItems.push({ status: 'good', text: 'Sentence Pattern: Good' });
                } else {
                  analysisItems.push({ status: 'warn', text: 'Vocabulary: Needs review' });
                }
                if (lastSpeakingScore >= 85) {
                  analysisItems.push({ status: 'good', text: 'Speaking Accuracy: Good' });
                } else {
                  analysisItems.push({ status: 'warn', text: 'Speaking Accuracy: Needs more practice' });
                }
                if (lastSpeakingScore < 90) {
                  analysisItems.push({ status: 'warn', text: 'Pronunciation: Practice ending sounds' });
                }

                // Course Progress
                const currentUnitIdx = CURRICULUM_UNITS.findIndex(u => u.id === currentUnit.id);
                const currentLessonIdx = currentUnit.lessons.findIndex(l => l.id === currentLesson.id);
                const absoluteLessonNum = (currentUnitIdx * 4) + currentLessonIdx + 1;

                // Stars Helper
                const renderStarsList = (sNum: number) => {
                  const elements = [];
                  const fullStars = Math.floor(sNum);
                  const hasHalf = sNum % 1 !== 0;
                  for (let i = 1; i <= 5; i++) {
                    if (i <= fullStars) {
                      elements.push(<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500 shrink-0" />);
                    } else if (i === fullStars + 1 && hasHalf) {
                      elements.push(
                        <div key={i} className="relative inline-block w-5 h-5 select-none shrink-0">
                          <Star className="absolute top-0 left-0 w-5 h-5 text-slate-200" />
                          <div className="absolute top-0 left-0 w-2.5 h-5 overflow-hidden">
                            <Star className="w-5 h-5 fill-amber-400 text-amber-500 max-w-none" />
                          </div>
                        </div>
                      );
                    } else {
                      elements.push(<Star key={i} className="w-5 h-5 text-slate-200 shrink-0" />);
                    }
                  }
                  return elements;
                };

                // RESET COURSE HANDLER
                const handleReviewCourse = () => {
                  soundFX.playClick();
                  setProgress({
                    stars: 0,
                    badges: ['First Step'],
                    completedLessonIds: [],
                    completedUnitIds: [],
                    speakingScoreAvg: 90,
                    dailyStreak: 1,
                    currentUnitId: CURRICULUM_UNITS[0].id,
                    currentLessonId: CURRICULUM_UNITS[0].lessons[0].id,
                    currentStage: 'vocabulary',
                  });
                  setCurrentUnit(CURRICULUM_UNITS[0]);
                  setCurrentLesson(CURRICULUM_UNITS[0].lessons[0]);
                  setCurrentStage('vocabulary');
                  setCurrentCheckUpNum(null);
                  setCheckUpUnitA(null);
                  setCheckUpUnitB(null);
                };

                // Check if Check-Up 4 is completed to show COURSE COMPLETION
                if (isCheckUp && currentCheckUpNum === 4) {
                  return (
                    <div className="flex flex-col items-center text-center my-auto py-4 w-full max-w-xl mx-auto animate-fadeIn">
                      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4 border-4 border-amber-200 animate-bounce">
                        <span className="text-4xl">🎓</span>
                      </div>
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 bg-red-50 px-3.5 py-1 rounded-full">
                        Course Completed
                      </span>
                      <h2 className="text-3xl font-black text-slate-900 mb-2">
                        Congratulations!
                      </h2>
                      <p className="text-sm text-slate-600 font-semibold mb-6">
                        You have completed the LeeGo English Explorer course.
                      </p>

                      <div className="bg-red-50/50 p-5 rounded-3xl border-2 border-red-100 w-full mb-6 space-y-3.5 text-left text-xs">
                        <div className="flex items-center justify-between border-b border-red-100 pb-2">
                          <span className="text-slate-500 font-extrabold">Total Stars Earned:</span>
                          <span className="text-amber-600 font-black text-sm flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                            {progress.stars} Stars
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-red-100 pb-2">
                          <span className="text-slate-500 font-extrabold">Final Badge:</span>
                          <span className="text-rose-600 font-black flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {badge}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-red-100 pb-2">
                          <span className="text-slate-500 font-extrabold">Lessons Completed:</span>
                          <span className="text-slate-800 font-black">32 / 32</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-red-100 pb-2">
                          <span className="text-slate-500 font-extrabold">Speaking Activities Completed:</span>
                          <span className="text-slate-800 font-black">32 Completed</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-extrabold">Practice Activities Completed:</span>
                          <span className="text-slate-800 font-black">32 Completed</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 justify-center w-full">
                        <button
                          onClick={handleReviewCourse}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black px-6 py-3 rounded-2xl transition-all text-xs active:scale-95 border border-slate-200"
                        >
                          Review Course
                        </button>
                        <button
                          onClick={() => {
                            soundFX.playClick();
                            setCurrentCheckUpNum(null);
                            setIsDrawerOpen(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs"
                        >
                          <span>Back to Curriculum</span> <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                }

                // Otherwise show standard LEARNING REPORT
                return (
                  <div className="flex flex-col items-center text-center my-auto py-4 w-full max-w-xl mx-auto animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-3">
                      <span className="text-2xl animate-bounce">🎉</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-0.5">
                      {isCheckUp ? 'Check-Up Completed!' : 'Lesson Completed!'}
                    </h2>
                    <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-4 bg-red-50 border border-red-100 px-3 py-0.5 rounded-full">
                      Learning Report
                    </span>

                    {/* Scores Card */}
                    <div className="grid grid-cols-3 gap-2 w-full mb-3 text-left">
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-center">
                        <span className="text-[9px] text-slate-400 font-bold block mb-1">📊 Practice</span>
                        <span className="text-sm font-black text-slate-800">{lastPracticeScore} / 100</span>
                      </div>
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-center">
                        <span className="text-[9px] text-slate-400 font-bold block mb-1">🎤 Speaking</span>
                        <span className="text-sm font-black text-slate-800">{lastSpeakingScore} / 100</span>
                      </div>
                      <div className="bg-red-50 p-3 rounded-2xl border border-red-100 text-center">
                        <span className="text-[9px] text-red-500 font-bold block mb-1">📈 Overall</span>
                        <span className="text-sm font-black text-red-600">{overallScore} / 100</span>
                      </div>
                    </div>

                    {/* Stars & Badge Row */}
                    <div className="grid grid-cols-2 gap-2 w-full mb-3">
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-slate-400 font-bold block mb-1">Achievement</span>
                        <div className="flex gap-0.5">{renderStarsList(stars)}</div>
                      </div>
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-slate-400 font-bold block mb-1">Badge Earned</span>
                        <span className="text-xs font-black text-rose-600 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          {badge}
                        </span>
                      </div>
                    </div>

                    {/* Teacher Comment */}
                    <div className="bg-red-50/30 border border-red-100/60 p-4 rounded-2xl w-full mb-3 text-left">
                      <span className="text-[9px] font-black text-red-600 uppercase tracking-wider block mb-1">
                        💬 Nhận xét từ giáo viên LeeGo AI
                      </span>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">
                        {teacherComment}
                      </p>
                    </div>

                    {/* Performance Analysis & Course Progress */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-4 text-left">
                      <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
                          📈 Phân tích kết quả
                        </span>
                        <div className="space-y-1 text-[10px] font-bold text-slate-700">
                          {analysisItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1">
                              <span>{item.status === 'good' ? '✅' : '⚠️'}</span>
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                            📚 Tiến trình học tập
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            {isCheckUp ? `Check-Up ${currentCheckUpNum} / 4` : `Lesson ${absoluteLessonNum} / 32`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-red-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${isCheckUp ? (currentCheckUpNum / 4) * 100 : (absoluteLessonNum / 32) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Next Button Controls */}
                    {(() => {
                      const currentIdx = currentUnit.lessons.findIndex((l) => l.id === currentLesson.id);
                      const isEvenUnit = currentUnit.number % 2 === 0;
                      const isLastLessonOfUnit = currentIdx === currentUnit.lessons.length - 1;
                      
                      const checkUpNumber = currentUnit.number / 2;
                      const isCheckUpCompleted = progress.completedUnitIds.includes(`checkup-${checkUpNumber}`);
                      const isGoToCheckUp = !isCheckUp && isEvenUnit && isLastLessonOfUnit && !isCheckUpCompleted;

                      return (
                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              soundFX.playClick();
                              setIsDrawerOpen(true);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-3 rounded-2xl text-xs transition-all active:scale-95 border border-slate-200"
                          >
                            Review Lesson
                          </button>
                          <button
                            onClick={() => {
                              soundFX.playClick();
                              if (isCheckUp) {
                                const nextUnitIdx = currentCheckUpNum * 2;
                                if (nextUnitIdx < CURRICULUM_UNITS.length) {
                                  const nextUnit = CURRICULUM_UNITS[nextUnitIdx];
                                  setCurrentCheckUpNum(null);
                                  handleLessonSelect(nextUnit, nextUnit.lessons[0]);
                                } else {
                                  setCurrentCheckUpNum(null);
                                  setIsDrawerOpen(true);
                                }
                              } else {
                                if (currentIdx < currentUnit.lessons.length - 1) {
                                  handleLessonSelect(currentUnit, currentUnit.lessons[currentIdx + 1]);
                                } else {
                                  if (isEvenUnit && !isCheckUpCompleted) {
                                    const unitA = CURRICULUM_UNITS[currentUnit.number - 2];
                                    const unitB = CURRICULUM_UNITS[currentUnit.number - 1];
                                    handleSelectCheckUp(checkUpNumber, unitA, unitB);
                                  } else {
                                    const nextUnitIdx = CURRICULUM_UNITS.findIndex(u => u.id === currentUnit.id) + 1;
                                    if (nextUnitIdx < CURRICULUM_UNITS.length) {
                                      const nextUnit = CURRICULUM_UNITS[nextUnitIdx];
                                      handleLessonSelect(nextUnit, nextUnit.lessons[0]);
                                    } else {
                                      setIsDrawerOpen(true);
                                    }
                                  }
                                }
                              }
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs animate-bounce"
                          >
                            <span>
                              {isGoToCheckUp ? 'Go to Check-Up' : 'Continue to Next Lesson'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}
            </>

          {/* Navigation Controls Footer */}
          <div className="flex items-center justify-between border-t border-red-100 pt-4 mt-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Switch Unit / Lesson
            </button>

            {currentStage !== 'completed' && (
              <button
                onClick={handleNextStage}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* LeeGo Brand Footer */}
      <footer className="w-full text-center py-3 text-[10px] sm:text-xs font-black text-red-600 bg-white border-t border-red-100 mt-auto select-none">
        Fanpage: Anh ngữ LeeGo Hải Phòng | Hotline: 0988.526.585
      </footer>

      {/* Curriculum Map Drawer */}
      <CurriculumDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentUnitId={currentUnit.id}
        currentLessonId={currentLesson.id}
        progress={progress}
        onSelectLesson={handleLessonSelect}
        onSelectCheckUp={handleSelectCheckUp}
        currentCheckUpNum={currentCheckUpNum}
      />

      {/* Reward & Confetti Celebration Modal */}
      <RewardModal
        isOpen={isRewardOpen}
        starsEarned={rewardStars}
        badgeUnlocked={unlockedBadge}
        onClose={() => setIsRewardOpen(false)}
        onNextLesson={() => {
          const currentIdx = currentUnit.lessons.findIndex((l) => l.id === currentLesson.id);
          if (currentIdx < currentUnit.lessons.length - 1) {
            handleLessonSelect(currentUnit, currentUnit.lessons[currentIdx + 1]);
          } else {
            setIsDrawerOpen(true);
          }
        }}
      />
    </div>
  );
}
