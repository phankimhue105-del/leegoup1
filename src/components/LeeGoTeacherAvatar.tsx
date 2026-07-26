import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Award } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/ttsPlayer';

interface Props {
  speechText: string;
  translationVi?: string;
  mood?: 'cheerful' | 'encouraging' | 'praising' | 'explaining' | 'celebrating';
  onFinishedSpeaking?: () => void;
  autoSpeak?: boolean;
}

export const LeeGoTeacherAvatar: React.FC<Props> = ({
  speechText,
  translationVi,
  mood = 'cheerful',
  onFinishedSpeaking,
  autoSpeak = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);

  React.useEffect(() => {
    if (autoSpeak && speechText && !muted) {
      handleSpeak();
    }
  }, [speechText]);

  const handleSpeak = () => {
    if (!speechText || muted) return;
    setIsSpeaking(true);
    speakText(
      speechText,
      () => {
        setIsSpeaking(false);
        if (onFinishedSpeaking) onFinishedSpeaking();
      },
      0.88,
      1.15
    );
  };

  const toggleMute = () => {
    if (isSpeaking) stopSpeaking();
    setIsSpeaking(false);
    setMuted(!muted);
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'praising':
      case 'celebrating':
        return '🎉';
      case 'encouraging':
        return '🌟';
      case 'explaining':
        return '📚';
      default:
        return '😊';
    }
  };

  return (
    <div id="leego-teacher-avatar" className="relative flex flex-col md:flex-row items-center gap-4 p-4 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-rose-500/10 rounded-2xl border-2 border-red-500/20 backdrop-blur-sm shadow-md transition-all">
      {/* Mascot Avatar Frame */}
      <div className="relative group shrink-0">
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 p-1.5 shadow-lg flex items-center justify-center transition-transform ${isSpeaking ? 'scale-105 animate-pulse ring-4 ring-red-400/50' : 'hover:scale-105'}`}>
          <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center overflow-hidden border-2 border-red-100 relative">
            {/* Cute AI Teacher Mascot Face */}
            <div className="text-3xl md:text-4xl select-none transition-all transform duration-300">
              {getMoodEmoji()}
            </div>
            <span className="text-[10px] font-black uppercase text-red-600 tracking-wider mt-0.5">
              LeeGo AI
            </span>
          </div>
        </div>

        {/* Live Speaking Indicator */}
        {isSpeaking && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 w-full relative bg-white rounded-2xl p-4 shadow-sm border border-red-100 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>LeeGo Teacher AI</span>
            <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
              {mood}
            </span>
          </div>
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            title={muted ? 'Unmute AI voice' : 'Mute AI voice'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>

        {/* Teacher Speech Text */}
        <p className="text-slate-800 font-semibold text-sm md:text-base leading-relaxed">
          {speechText}
        </p>

        {/* Optional Vietnamese Translation for Young Learners */}
        {translationVi && (
          <p className="text-xs text-red-600/90 font-medium mt-2 italic bg-red-50/80 p-2 rounded-lg border border-red-100">
            💡 {translationVi}
          </p>
        )}

        {/* Play Sound Button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSpeak}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full transition-colors border border-red-200 shadow-2xs"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'Speaking...' : 'Listen Again'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
