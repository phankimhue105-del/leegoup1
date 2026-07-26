import React from 'react';
import { X, BookOpen, Star, Award, CheckCircle2, ChevronRight, Lock, Sparkles } from 'lucide-react';
import { Unit, Lesson, StudentProgress } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculum';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUnitId: string;
  currentLessonId: string;
  progress: StudentProgress;
  onSelectLesson: (unit: Unit, lesson: Lesson) => void;
}

export const CurriculumDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUnitId,
  currentLessonId,
  progress,
  onSelectLesson,
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
            const isCurrentUnit = unit.id === currentUnitId;

            return (
              <div key={unit.id} className="border-2 border-red-100 rounded-2xl overflow-hidden bg-slate-50/50">
                {/* Unit Banner */}
                <div className={`p-4 ${isCurrentUnit ? 'bg-red-500 text-white' : 'bg-red-50 text-slate-800'} flex items-center justify-between`}>
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isCurrentUnit ? 'text-amber-300' : 'text-red-600'}`}>
                      Unit {unit.number}
                    </span>
                    <h3 className="font-black text-base">{unit.title}</h3>
                    <p className={`text-xs ${isCurrentUnit ? 'text-red-100' : 'text-slate-500'} font-medium line-clamp-1`}>
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
                    const isSelected = lesson.id === currentLessonId;
                    const isCompleted = progress.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(unit, lesson);
                          onClose();
                        }}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-red-50 border-2 border-red-500 text-red-900 font-bold shadow-xs'
                            : 'hover:bg-slate-50 text-slate-700 font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                            isCompleted ? 'bg-emerald-500 text-white' : isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : lesson.number}
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

                  {/* Check Up Section if available */}
                  {unit.checkUp && (
                    <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                      <div className="flex items-center gap-1.5 text-xs font-black mb-1">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>{unit.checkUp.title}</span>
                      </div>
                      <p className="text-[10px] text-amber-800 font-medium">{unit.checkUp.description}</p>
                      <p className="text-[10px] text-amber-700 font-bold mt-1">
                        🎨 Project: {unit.checkUp.project}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
