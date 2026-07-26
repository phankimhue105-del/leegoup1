import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, Award, Sparkles, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  starsEarned: number;
  badgeUnlocked?: string;
  onClose: () => void;
  onNextLesson: () => void;
}

export const RewardModal: React.FC<Props> = ({
  isOpen,
  starsEarned,
  badgeUnlocked,
  onClose,
  onNextLesson,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundFX.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="reward-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden transform animate-scaleUp">
        {/* Decorative Top Sunburst */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-200/50 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-200/50 rounded-full blur-xl pointer-events-none" />

        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-amber-300 shadow-md">
          <Trophy className="w-10 h-10 text-amber-500 animate-bounce" />
        </div>

        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">
          FANTASTIC JOB! 🎉
        </h2>
        <p className="text-xs font-bold text-red-600 mb-6 uppercase tracking-wider">
          LeeGo Lesson Reward
        </p>

        {/* Stars Earned */}
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 mb-4 flex items-center justify-center gap-3">
          <Star className="w-8 h-8 text-amber-500 fill-amber-400 animate-pulse" />
          <div className="text-left">
            <span className="text-2xl font-black text-amber-900">+{starsEarned} Stars</span>
            <span className="text-xs text-amber-700 font-semibold block">Earned in this activity!</span>
          </div>
        </div>

        {/* Badge Unlocked if applicable */}
        {badgeUnlocked && (
          <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-200 mb-6 flex items-center gap-3 text-left">
            <Award className="w-8 h-8 text-rose-500 shrink-0" />
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">New Badge Unlocked!</span>
              <span className="text-sm font-black text-slate-800">{badgeUnlocked}</span>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-600 font-semibold mb-6 italic">
          "Every child can succeed. You are growing with confidence!" - LeeGo AI Teacher
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onNextLesson();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-102"
          >
            <span>Next Lesson</span> <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-2xl text-xs transition-colors"
          >
            Stay in Current Activity
          </button>
        </div>
      </div>
    </div>
  );
};
