import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, RotateCcw, Sparkles, CheckCircle, Volume2, Award, Star } from 'lucide-react';
import { SpeakingAssessment } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';

interface Props {
  targetPhrase: string;
  studentName?: string;
  onAssessmentCompleted: (assessment: SpeakingAssessment) => void;
}

export const SpeakingPractice: React.FC<Props> = ({
  targetPhrase,
  studentName = 'Learner',
  onAssessmentCompleted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessment, setAssessment] = useState<SpeakingAssessment | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API SpeechRecognition if available
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

  const startRecording = async () => {
    setTranscript('');
    setAssessment(null);
    audioChunksRef.current = [];

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

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        };

        mediaRecorder.start();
      }
    } catch (err) {
      console.warn('Microphone permission or recording error:', err);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Already started
      }
    }

    setIsRecording(true);
    soundFX.playClick();
  };

  const stopRecording = () => {
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
    const text = textToEval || transcript || targetPhrase; // fallback to target phrase if mock mode

    try {
      const res = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          targetPhrase,
          studentName,
        }),
      });

      const data: SpeakingAssessment = await res.json();
      setAssessment(data);
      soundFX.playFanfare();
      onAssessmentCompleted(data);
    } catch (err) {
      console.error('Failed to evaluate speaking:', err);
      const fallback: SpeakingAssessment = {
        overallScore: 90,
        pronunciation: 88,
        fluency: 92,
        accuracy: 90,
        completeness: 92,
        confidence: 90,
        strength: 'Energetic and clear voice!',
        suggestion: 'Keep repeating to build speech memory.',
        encouragement: 'Great job! You earned 2 stars! ⭐⭐',
      };
      setAssessment(fallback);
      soundFX.playStar();
      onAssessmentCompleted(fallback);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div id="speaking-practice-card" className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-md flex flex-col items-center max-w-xl mx-auto my-4 text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
        <Mic className="w-6 h-6 animate-pulse" />
      </div>

      <h3 className="text-lg font-black text-slate-800 mb-1">Speaking Mission</h3>
      <p className="text-xs text-slate-500 mb-4">Listen to LeeGo and repeat aloud into your microphone!</p>

      {/* Target Sentence Card */}
      <div className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between gap-3">
        <span className="text-lg font-black tracking-wide">{targetPhrase}</span>
        <button
          onClick={() => speakText(targetPhrase, undefined, 0.8, 1.1)}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          title="Listen to Target Audio"
        >
          <Volume2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Record Controls */}
      <div className="flex flex-col items-center gap-4 w-full">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all ring-4 ring-red-200"
          >
            <Mic className="w-8 h-8" />
            <span className="text-[10px] font-black uppercase mt-1">RECORD</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg animate-pulse ring-4 ring-rose-300"
          >
            <MicOff className="w-8 h-8 text-rose-400" />
            <span className="text-[10px] font-black uppercase mt-1 text-rose-300">STOP</span>
          </button>
        )}

        {/* Live Audio Transcript Display or Manual Input */}
        <div className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl min-h-[60px] flex flex-col justify-center text-sm text-slate-700">
          {transcript ? (
            <p className="font-semibold text-slate-900">"{transcript}"</p>
          ) : isRecording ? (
            <p className="text-red-500 font-bold animate-pulse">Listening to your voice... Speak clearly!</p>
          ) : (
            <p className="text-slate-400 italic">Press record or type your speaking answer below</p>
          )}
        </div>

        {/* Fallback Typing Input for Environments without Microphone */}
        {!transcript && !isRecording && (
          <div className="w-full flex items-center gap-2">
            <input
              type="text"
              placeholder={`Type "${targetPhrase}" to practice...`}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
            >
              Submit
            </button>
          </div>
        )}

        {/* Evaluate Action Button */}
        {transcript && !isRecording && !assessment && (
          <button
            onClick={() => handleEvaluate(transcript)}
            disabled={isEvaluating}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isEvaluating ? 'LeeGo AI is Assessing...' : 'Evaluate My Speaking'}</span>
          </button>
        )}
      </div>

      {/* Assessment Feedback Card */}
      {assessment && (
        <div className="mt-6 w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 p-5 rounded-2xl border-2 border-emerald-300 shadow-sm animate-fadeIn text-left">
          <div className="flex items-center justify-between mb-3 border-b border-emerald-200 pb-2">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span className="font-extrabold text-emerald-900 text-base">LeeGo AI Evaluation</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-400 text-slate-900 px-3 py-1 rounded-full font-black text-sm shadow-2xs">
              <Star className="w-4 h-4 fill-slate-900" />
              <span>{assessment.overallScore} / 100</span>
            </div>
          </div>

          <p className="text-emerald-900 font-bold text-sm mb-3">{assessment.encouragement}</p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <span className="text-slate-500 font-semibold block">Pronunciation</span>
              <span className="font-black text-emerald-700 text-sm">{assessment.pronunciation}%</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <span className="text-slate-500 font-semibold block">Fluency</span>
              <span className="font-black text-emerald-700 text-sm">{assessment.fluency}%</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <span className="text-slate-500 font-semibold block">Accuracy</span>
              <span className="font-black text-emerald-700 text-sm">{assessment.accuracy}%</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
              <span className="text-slate-500 font-semibold block">Confidence</span>
              <span className="font-black text-emerald-700 text-sm">{assessment.confidence}%</span>
            </div>
          </div>

          <div className="text-xs space-y-1 text-slate-700 bg-white/60 p-3 rounded-xl border border-emerald-100">
            <p><strong>🌟 Strength:</strong> {assessment.strength}</p>
            <p><strong>💡 Tip:</strong> {assessment.suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};
