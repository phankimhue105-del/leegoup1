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

import { Stage, StudentProgress, Unit, Lesson, AITeacherResponse } from './types';
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
          currentVocab: currentLesson.vocabulary.map((v) => v.word),
          currentPattern: currentLesson.sentencePatterns[0]?.pattern,
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
    setCurrentStage('vocabulary');
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
    const stages: Stage[] = [
      'vocabulary',
      'modelPattern',
      'practice',
      'speaking',
      'completed',
    ];

    const idx = stages.indexOf(currentStage);
    if (idx < stages.length - 1) {
      handleStageChange(stages[idx + 1]);
    }
  };

  const handleSpeakingCompleted = (averageScore: number) => {
    // Award lesson completion bonus stars (5 stars)
    addStars(5);

    // Save lesson progression
    if (!progress.completedLessonIds.includes(currentLesson.id)) {
      const updatedCompleted = [...progress.completedLessonIds, currentLesson.id];
      const earnedBadge = updatedCompleted.length === 2 ? 'Cambridge Master' : undefined;
      
      setProgress((prev) => ({
        ...prev,
        completedLessonIds: updatedCompleted,
        badges: earnedBadge ? [...prev.badges, earnedBadge] : prev.badges,
      }));

      if (earnedBadge) {
        setUnlockedBadge(earnedBadge);
      } else {
        setUnlockedBadge('Lesson Master Badge');
      }
    }
    
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
        .flatMap((l) => l.vocabulary)
        .filter((item, index, self) => self.findIndex(t => t.word === item.word) === index)
    : [];

  const checkUpPatterns = currentCheckUpNum !== null && checkUpUnitA && checkUpUnitB
    ? [...checkUpUnitA.lessons, ...checkUpUnitB.lessons]
        .flatMap((l) => l.sentencePatterns)
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

  const checkUpLessonVirtual: Lesson = currentCheckUpNum !== null ? {
    id: `checkup-l-${currentCheckUpNum}`,
    number: currentCheckUpNum,
    title: `Units ${checkUpUnitA?.number} & ${checkUpUnitB?.number} Review`,
    learningObjective: `Review vocabulary, key patterns, listening, and speaking from Units ${checkUpUnitA?.number} and ${checkUpUnitB?.number}.`,
    vocabulary: checkUpVocab,
    sentencePatterns: checkUpPatterns,
    suggestedGames: ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut']
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
                  onGameCompleted={handleNextStage}
                />
              )}

              {/* STAGE 4: SPEAKING */}
              {currentStage === 'speaking' && (
                <SpeakingPractice
                  lesson={currentLessonToUse}
                  studentName="Explorer"
                  onSpeakingCompleted={handleSpeakingCompleted}
                />
              )}

              {/* STAGE 5: COMPLETED */}
              {currentStage === 'completed' && (
                <div className="flex flex-col items-center text-center my-auto py-8">
                  <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-4 border-4 border-amber-200 animate-bounce">
                    <span className="text-5xl">🎉</span>
                  </div>
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">
                    LeeGo English Explorer
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 animate-pulse">
                    {currentCheckUpNum !== null ? 'Check-Up Completed!' : 'Lesson Completed!'}
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mb-6 font-semibold">
                    {currentCheckUpNum !== null
                      ? `Super job! You have completed the review of Units ${checkUpUnitA?.number} & ${checkUpUnitB?.number}!`
                      : `Super job! You have finished all activities for ${currentLessonToUse.title}!`}
                  </p>

                  {/* Reward stats display */}
                  <div className="bg-red-50/50 p-5 rounded-3xl border-2 border-red-100 max-w-sm w-full mb-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-red-50 pb-2">
                      <span className="text-slate-500 font-extrabold text-xs">Total Stars:</span>
                      <span className="text-amber-600 font-black text-sm flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        {progress.stars} Stars
                      </span>
                    </div>
                    {unlockedBadge && (
                      <div className="flex items-center justify-between border-b border-red-50 pb-2">
                        <span className="text-slate-500 font-extrabold text-xs">Badge Earned:</span>
                        <span className="text-rose-600 font-black text-xs flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {unlockedBadge}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-extrabold text-xs">Daily Streak:</span>
                      <span className="text-emerald-600 font-black text-xs">
                        🔥 {progress.dailyStreak} Days
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFX.playClick();
                      if (currentCheckUpNum !== null) {
                        const nextUnitIdx = currentCheckUpNum * 2; // e.g. Check-Up 1 -> Unit 3 (index 2)
                        if (nextUnitIdx < CURRICULUM_UNITS.length) {
                          const nextUnit = CURRICULUM_UNITS[nextUnitIdx];
                          const updatedCompleted = [...progress.completedUnitIds];
                          if (!updatedCompleted.includes(`checkup-${currentCheckUpNum}`)) {
                            updatedCompleted.push(`checkup-${currentCheckUpNum}`);
                          }
                          setProgress((prev) => ({
                            ...prev,
                            completedUnitIds: updatedCompleted,
                          }));
                          setCurrentCheckUpNum(null);
                          handleLessonSelect(nextUnit, nextUnit.lessons[0]);
                        } else {
                          setCurrentCheckUpNum(null);
                          setIsDrawerOpen(true);
                        }
                      } else {
                        const currentIdx = currentUnit.lessons.findIndex((l) => l.id === currentLesson.id);
                        if (currentIdx < currentUnit.lessons.length - 1) {
                          handleLessonSelect(currentUnit, currentUnit.lessons[currentIdx + 1]);
                        } else {
                          // Check if this even unit has a checkup and triggers it automatically
                          const checkUpNumber = currentUnit.number / 2;
                          const isEvenUnit = currentUnit.number % 2 === 0;
                          const isCheckUpCompleted = progress.completedUnitIds.includes(`checkup-${checkUpNumber}`);
                          
                          if (isEvenUnit && !isCheckUpCompleted) {
                            const unitA = CURRICULUM_UNITS[currentUnit.number - 2];
                            const unitB = CURRICULUM_UNITS[currentUnit.number - 1];
                            handleSelectCheckUp(checkUpNumber, unitA, unitB);
                          } else {
                            // Normal flow: load first lesson of next unit
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
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm animate-bounce"
                  >
                    <span>Continue to Next Lesson</span> <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
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
