import React from 'react';
import { X, BookOpen, Star, Award, CheckCircle2, ChevronRight, Lock, Sparkles, Play } from 'lucide-react';
import { Unit, Lesson, StudentProgress } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculum';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUnitId: string;
  currentLessonId: string;
  progress: StudentProgress;
  onSelectLesson: (unit: Unit, lesson: Lesson) => void;
  onSelectCheckUp: (number: number, unitA: Unit, unitB: Unit) => void;
  currentCheckUpNum: number | null;
}

// Unit locking logic based on completed checkup IDs (disabled by default)
function isUnitLocked(unitNumber: number, completedUnitIds: string[]): boolean {
  return false;
}

// Returns the checkup info corresponding to the even unit bottom position
function getCheckUpForUnit(unitNumber: number) {
  if (unitNumber === 2) return { number: 1, data: CURRICULUM_UNITS[0].checkUp, prevUnit: CURRICULUM_UNITS[0], currentUnit: CURRICULUM_UNITS[1] };
  if (unitNumber === 4) return { number: 2, data: CURRICULUM_UNITS[2].checkUp, prevUnit: CURRICULUM_UNITS[2], currentUnit: CURRICULUM_UNITS[3] };
  if (unitNumber === 6) return { number: 3, data: CURRICULUM_UNITS[4].checkUp, prevUnit: CURRICULUM_UNITS[4], currentUnit: CURRICULUM_UNITS[5] };
  if (unitNumber === 8) return { number: 4, data: CURRICULUM_UNITS[7].checkUp, prevUnit: CURRICULUM_UNITS[6], currentUnit: CURRICULUM_UNITS[7] };
  return null;
}

export const CurriculumDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUnitId,
  currentLessonId,
  progress,
  onSelectLesson,
  onSelectCheckUp,
  currentCheckUpNum,
}) => {
  if (!isOpen) return null;

  return (
    <div id="curriculum-drawer-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-red-100 overflow-hidden">
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="text-lg font-black tracking-tight">LeeGo Curriculum Map</h2>
              <p className="text-xs text-red-100 font-medium">Cambridge Young Learners Syllabus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Units & Lessons List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {CURRICULUM_UNITS.map((unit) => {
            const isCurrentUnit = unit.id === currentUnitId && currentCheckUpNum === null;
            const isLocked = isUnitLocked(unit.number, progress.completedUnitIds);

            return (
              <div key={unit.id} className={`border-2 rounded-2xl overflow-hidden bg-slate-50/50 transition-all ${isLocked ? 'border-slate-100 opacity-70' : 'border-red-100'}`}>
                {/* Unit Banner */}
                <div className={`p-4 ${isLocked ? 'bg-slate-200 text-slate-500' : isCurrentUnit ? 'bg-red-500 text-white' : 'bg-red-50 text-slate-800'} flex items-center justify-between`}>
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isLocked ? 'text-slate-400' : isCurrentUnit ? 'text-amber-300' : 'text-red-600'}`}>
                      Unit {unit.number} {isLocked && '🔒 Locked'}
                    </span>
                    <h3 className="font-black text-base">{unit.title}</h3>
                    <p className={`text-xs ${isLocked ? 'text-slate-400' : isCurrentUnit ? 'text-red-100' : 'text-slate-500'} font-medium line-clamp-1`}>
                      {unit.theme}
                    </p>
                  </div>
                  {isCurrentUnit && (
                    <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Lessons in Unit */}
                <div className="p-2 space-y-1 bg-white">
                  {unit.lessons.map((lesson) => {
                    const isSelected = lesson.id === currentLessonId && currentCheckUpNum === null;
                    const isCompleted = progress.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        onClick={() => {
                          onSelectLesson(unit, lesson);
                          onClose();
                        }}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                          isLocked
                            ? 'opacity-50 cursor-not-allowed text-slate-400 bg-slate-50'
                            : isSelected
                            ? 'bg-red-50 border-2 border-red-500 text-red-900 font-bold shadow-xs'
                            : 'hover:bg-slate-50 text-slate-700 font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                            isLocked ? 'bg-slate-100 text-slate-400' : isCompleted ? 'bg-emerald-500 text-white' : isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              lesson.number
                            )}
                          </div>
                          <div>
                            <span className="text-xs block line-clamp-1">Lesson {lesson.number}: {lesson.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal block line-clamp-1">
                              {lesson.learningObjective}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    );
                  })}

                  {/* Check Up Section placed at bottom of even units */}
                  {(() => {
                    const checkUp = getCheckUpForUnit(unit.number);
                    if (!checkUp || !checkUp.data) return null;

                    const isCheckUpUnlocked = true;
                    const isCheckUpFinished = progress.completedUnitIds.includes(`checkup-${checkUp.number}`);
                    const isCheckUpActive = currentCheckUpNum === checkUp.number;

                    return (
                      <div className={`mt-3 p-3 rounded-xl border transition-all ${
                        isCheckUpActive
                          ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                          : isCheckUpFinished
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : isCheckUpUnlocked
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-black">
                            <Sparkles className={`w-4 h-4 ${isCheckUpUnlocked ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                            <span>{checkUp.data.title}</span>
                          </div>
                          {isCheckUpFinished && (
                            <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                              PASSED
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-medium leading-relaxed mb-2">{checkUp.data.description}</p>
                        
                        <button
                          disabled={!isCheckUpUnlocked}
                          onClick={() => {
                            onSelectCheckUp(checkUp.number, checkUp.prevUnit, checkUp.currentUnit);
                            onClose();
                          }}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                            isCheckUpActive
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                              : isCheckUpFinished
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : isCheckUpUnlocked
                              ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md animate-pulse'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {!isCheckUpUnlocked ? (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>Complete both units to unlock</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{isCheckUpFinished ? 'Play Review Again' : 'Play Check-Up Now'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
