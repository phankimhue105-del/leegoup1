import React, { useEffect } from 'react';
import { Star, Award, BookOpen, Flame, Sparkles, ChevronRight, Menu, Volume2, Mic } from 'lucide-react';
import { Stage, StudentProgress, Unit, Lesson } from '../types';

interface Props {
  currentUnit: Unit;
  currentLesson: Lesson;
  currentStage: Stage;
  progress: StudentProgress;
  onSelectStage: (stage: Stage) => void;
  onOpenCurriculum: () => void;
}

const STAGE_ORDER: { id: Stage; label: string; icon: string }[] = [
  { id: 'vocabulary', label: 'Vocabulary', icon: '🔤' },
  { id: 'modelPattern', label: 'Model Pattern', icon: '💬' },
  { id: 'practice', label: 'Practice', icon: '✏️' },
  { id: 'speaking', label: 'Speaking', icon: '🎙️' },
  { id: 'completed', label: 'Completed', icon: '🎉' },
];

export const LessonFlowHeader: React.FC<Props> = ({
  currentUnit,
  currentLesson,
  currentStage,
  progress,
  onSelectStage,
  onOpenCurriculum,
}) => {
  const currentStageIndex = STAGE_ORDER.findIndex((s) => s.id === currentStage);

  // Auto-route Check-Up past vocabulary and modelPattern stages
  useEffect(() => {
    const isCheckUp = currentLesson.id.startsWith('checkup');
    if (isCheckUp && (currentStage === 'vocabulary' || currentStage === 'modelPattern')) {
      onSelectStage('practice');
    }
  }, [currentLesson.id, currentStage, onSelectStage]);

  return (
    <header id="leego-flow-header" className="bg-white border-b border-red-100 shadow-xs sticky top-0 z-30">
      {/* Top Brand & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand & Curriculum Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCurriculum}
            className="flex items-center gap-2 p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
            title="Choose Unit & Lesson"
          >
            <Menu className="w-5 h-5" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                {currentUnit.title.includes('CHECK-UP') ? currentUnit.title : `Unit ${currentUnit.number}: ${currentUnit.title}`}
              </span>
              <span className="text-xs font-black text-slate-800 line-clamp-1">
                {currentUnit.title.includes('CHECK-UP') ? currentUnit.theme : `Lesson ${currentLesson.number}: ${currentLesson.title}`}
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
              LG
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                LeeGo English Explorer AI
              </h1>
              <p className="text-[10px] text-red-600 font-semibold mt-0.5">
                Learn with Joy – Grow with Confidence
              </p>
            </div>
          </div>
        </div>

        {/* Gamification Counters */}
        <div className="flex items-center gap-3">
          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-200 text-amber-700 shadow-2xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs font-black">{progress.dailyStreak} Day</span>
          </div>

          {/* Stars Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100/80 rounded-full border border-amber-300 text-amber-900 shadow-2xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-sm font-black">{progress.stars} Stars</span>
          </div>

          {/* Badges Earned */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 rounded-full border border-rose-200 text-rose-700">
            <Award className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-black">{progress.badges.length} Badges</span>
          </div>
        </div>
      </div>

      {/* Routine Stepper Flow (10 Stages) */}
      <div className="bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 border-t border-red-100 overflow-x-auto no-scrollbar py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max gap-1">
          {(() => {
            const isCheckUp = currentLesson.id.startsWith('checkup');
            const stagesToRender = isCheckUp
              ? STAGE_ORDER.filter(s => s.id !== 'vocabulary' && s.id !== 'modelPattern')
              : (!currentLesson.vocabulary || currentLesson.vocabulary.length === 0)
              ? STAGE_ORDER.filter(s => s.id !== 'vocabulary')
              : STAGE_ORDER;
            
            return stagesToRender.map((s, index) => {
              const isActive = s.id === currentStage;
              const renderedStageIndex = STAGE_ORDER.findIndex((x) => x.id === s.id);
              const isPassed = renderedStageIndex < currentStageIndex;

              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => onSelectStage(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md scale-105 ring-2 ring-red-400'
                        : isPassed
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
                    }`}
                  >
                    <span className="text-sm">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                  {index < stagesToRender.length - 1 && (
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isPassed ? 'text-red-400' : 'text-slate-300'}`} />
                  )}
                </React.Fragment>
              );
            });
          })()}
        </div>
      </div>
    </header>
  );
};
