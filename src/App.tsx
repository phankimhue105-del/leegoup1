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
import { speakText } from './utils/ttsPlayer';
import { soundFX } from './utils/soundEffects';

export default function App() {
  // Curriculum state
  const [currentUnit, setCurrentUnit] = useState<Unit>(CURRICULUM_UNITS[0]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(CURRICULUM_UNITS[0].lessons[0]);
  const [currentStage, setCurrentStage] = useState<Stage>('greeting');

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
    currentStage: 'greeting',
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
    setCurrentUnit(unit);
    setCurrentLesson(lesson);
    setCurrentStage('greeting');
    fetchTeacherResponse(`Switched to Unit ${unit.number} Lesson ${lesson.number}: ${lesson.title}`);
  };

  const handleNextStage = () => {
    const stages: Stage[] = [
      'greeting',
      'warmup',
      'vocabulary',
      'modelSentence',
      'guidedPractice',
      'game',
      'speaking',
      'miniReview',
      'reward',
      'goodbye',
    ];

    const idx = stages.indexOf(currentStage);
    if (idx < stages.length - 1) {
      handleStageChange(stages[idx + 1]);
    } else {
      // Completed lesson! Trigger reward modal
      setRewardStars(5);
      if (!progress.completedLessonIds.includes(currentLesson.id)) {
        setProgress((prev) => ({
          ...prev,
          completedLessonIds: [...prev.completedLessonIds, currentLesson.id],
          badges: prev.badges.concat(
            prev.completedLessonIds.length === 2 ? ['Cambridge Master'] : []
          ),
        }));
        setUnlockedBadge('Lesson Master Badge');
      }
      setIsRewardOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Lesson Routine Header */}
      <LessonFlowHeader
        currentUnit={currentUnit}
        currentLesson={currentLesson}
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

        {/* Dynamic Classroom Arena for Current Stage */}
        <div className="flex-1 bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md min-h-[420px] flex flex-col justify-between">
          
          {/* STAGE 1: GREETING */}
          {currentStage === 'greeting' && (
            <div className="flex flex-col items-center text-center my-auto py-8">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-4 border-4 border-red-200 animate-bounce">
                <span className="text-5xl">👋</span>
              </div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">
                LeeGo Classroom Routine
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Hello, Explorer! Ready to Learn?
              </h2>
              <p className="text-sm text-slate-600 max-w-md mb-6">
                Today's Learning Objective: <strong>{currentLesson.learningObjective}</strong>
              </p>
              <button
                onClick={handleNextStage}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <span>Start Warm-up</span> <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STAGE 2: WARM-UP */}
          {currentStage === 'warmup' && (
            <div className="flex flex-col items-center text-center my-auto py-6">
              <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 max-w-md w-full mb-6">
                <span className="text-xs font-bold text-amber-700 uppercase block mb-1">🔥 Warm-up Question</span>
                <p className="text-lg font-black text-slate-800">
                  {currentLesson.conversation
                    ? currentLesson.conversation.lines[0]?.text
                    : `Look around! Do you know any ${currentLesson.title.toLowerCase()}?`}
                </p>
              </div>
              <button
                onClick={() => {
                  soundFX.playCorrect();
                  addStars(1);
                  handleNextStage();
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-3 rounded-2xl shadow-md flex items-center gap-2"
              >
                <span>I'm Ready! Let's Learn Vocabulary!</span> <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STAGE 3: VOCABULARY */}
          {currentStage === 'vocabulary' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-red-100 pb-2">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Vocabulary Set</h3>
                  <p className="text-xs text-slate-500">Listen and repeat each target word!</p>
                </div>
                <span className="bg-red-50 text-red-600 font-bold text-xs px-3 py-1 rounded-full border border-red-200">
                  {currentLesson.vocabulary.length} Words
                </span>
              </div>

              {/* Grid of Vocabulary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentLesson.vocabulary.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      speakText(item.word);
                      soundFX.playClick();
                    }}
                    className="p-4 rounded-2xl border-2 border-red-100 bg-gradient-to-b from-white to-red-50/30 hover:border-red-400 cursor-pointer flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    <span className="text-base font-black text-slate-800 capitalize">{item.word}</span>
                    <span className="text-xs font-semibold text-red-600 mt-0.5">{item.meaningVi}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNextStage}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md"
                >
                  <span>Learn Model Pattern</span> <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: MODEL SENTENCE */}
          {currentStage === 'modelSentence' && (
            <div className="flex flex-col items-center text-center my-auto py-6">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">💬 Sentence Pattern</span>
              
              <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 rounded-3xl shadow-lg max-w-lg w-full mb-6">
                <h3 className="text-2xl font-black mb-2">
                  {currentLesson.sentencePatterns[0]?.pattern || 'It is a ______.'}
                </h3>
                <p className="text-sm font-semibold text-red-100">
                  Example: "{currentLesson.sentencePatterns[0]?.example || 'It is a pencil.'}"
                </p>
                <p className="text-xs text-amber-300 font-bold mt-2">
                  💡 {currentLesson.sentencePatterns[0]?.translationVi || 'Mẫu câu thực hành.'}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => speakText(currentLesson.sentencePatterns[0]?.example || 'It is a pencil.')}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" /> Listen Model Audio
                </button>
                <button
                  onClick={handleNextStage}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
                >
                  <span>Practice Pattern</span> <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 5: GUIDED PRACTICE */}
          {currentStage === 'guidedPractice' && (
            <div className="flex flex-col items-center text-center my-auto py-6">
              <h3 className="text-lg font-black text-slate-800 mb-2">Guided Practice</h3>
              <p className="text-xs text-slate-500 mb-6">Complete the sentence pattern with LeeGo!</p>

              <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl max-w-md w-full mb-6">
                <p className="text-xl font-extrabold text-slate-800">
                  Teacher: "What is it?"
                </p>
                <p className="text-lg font-bold text-red-600 mt-2">
                  Student: "{currentLesson.sentencePatterns[0]?.example || 'It is a pencil.'}"
                </p>
              </div>

              <button
                onClick={() => {
                  soundFX.playCorrect();
                  addStars(1);
                  handleNextStage();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3 rounded-2xl shadow-md flex items-center gap-2"
              >
                <span>Awesome! Let's Play Interactive Game!</span> <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STAGE 6: GAME */}
          {currentStage === 'game' && (
            <InteractiveGame
              lesson={currentLesson}
              gameType={currentLesson.suggestedGames[0] || 'choosePicture'}
              onCorrectAnswer={() => addStars(1)}
              onGameCompleted={handleNextStage}
            />
          )}

          {/* STAGE 7: SPEAKING */}
          {currentStage === 'speaking' && (
            <SpeakingPractice
              targetPhrase={currentLesson.sentencePatterns[0]?.example || 'It is a pencil.'}
              onAssessmentCompleted={() => {
                addStars(2);
              }}
            />
          )}

          {/* STAGE 8: MINI REVIEW */}
          {currentStage === 'miniReview' && (
            <div className="flex flex-col items-center text-center my-auto py-6">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">🔄 Lesson Recap</span>
              <h3 className="text-2xl font-black text-slate-900 mb-4">What did we learn today?</h3>

              <div className="bg-red-50 p-4 rounded-2xl border border-red-200 max-w-md w-full mb-6 text-left space-y-2 text-xs font-semibold">
                <p>📍 <strong>Vocabulary:</strong> {currentLesson.vocabulary.map((v) => v.word).join(', ')}</p>
                <p>📍 <strong>Pattern:</strong> {currentLesson.sentencePatterns[0]?.pattern}</p>
                <p>📍 <strong>Goal:</strong> {currentLesson.learningObjective}</p>
              </div>

              <button
                onClick={handleNextStage}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Claim Lesson Reward!</span>
              </button>
            </div>
          )}

          {/* STAGE 9: REWARD */}
          {currentStage === 'reward' && (
            <div className="flex flex-col items-center text-center my-auto py-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 border-4 border-amber-300 shadow-md animate-bounce">
                <Award className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Lesson Celebration!</h2>
              <p className="text-xs text-slate-600 mb-6">You did an outstanding job following LeeGo's classroom routine!</p>

              <button
                onClick={handleNextStage}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg"
              >
                Say Goodbye to LeeGo Teacher 👋
              </button>
            </div>
          )}

          {/* STAGE 10: GOODBYE */}
          {currentStage === 'goodbye' && (
            <div className="flex flex-col items-center text-center my-auto py-8">
              <span className="text-6xl mb-4">🌟</span>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Goodbye! See you in the next lesson!
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                You learned new words, practiced speaking, and earned more stars!
              </p>

              <button
                onClick={() => {
                  const currentIdx = currentUnit.lessons.findIndex((l) => l.id === currentLesson.id);
                  if (currentIdx < currentUnit.lessons.length - 1) {
                    handleLessonSelect(currentUnit, currentUnit.lessons[currentIdx + 1]);
                  } else {
                    setIsDrawerOpen(true);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-2xl shadow-md"
              >
                Continue to Next Lesson
              </button>
            </div>
          )}

          {/* Navigation Controls Footer */}
          <div className="flex items-center justify-between border-t border-red-100 pt-4 mt-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Switch Unit / Lesson
            </button>

            <button
              onClick={handleNextStage}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Curriculum Map Drawer */}
      <CurriculumDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentUnitId={currentUnit.id}
        currentLessonId={currentLesson.id}
        progress={progress}
        onSelectLesson={handleLessonSelect}
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
