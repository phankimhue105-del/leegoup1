import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Lesson } from '../types';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  onCorrectAnswer: () => void;
  onGameCompleted: (score: number) => void;
}

const simplifyExplanation = (text: string, targetWord?: string): string => {
  if (!text) return '';
  let cleaned = text.trim();
  
  cleaned = cleaned.replace(/^correct!\s*/i, '');
  cleaned = cleaned.replace(/^the correct answer is\s*/i, '');
  cleaned = cleaned.replace(/^the answer is\s*/i, '');
  cleaned = cleaned.replace(/^correct!\s*yes,\s*it\s*is\s*a\s*\w+\./i, 'Yes, it is.');
  
  if (cleaned.toLowerCase().includes('yes, it is') || cleaned.toLowerCase() === 'đáp án đúng.') {
    return 'Yes, it is.';
  }
  
  if (cleaned.toLowerCase().includes("no, it isn't")) {
    if (targetWord) {
      return `No. It's a ${targetWord.toLowerCase()}.`;
    }
    const match = cleaned.match(/it\s*is\s*a\s+(\w+)/i);
    if (match) {
      return `No. It's a ${match[1].toLowerCase()}.`;
    }
    return "No, it isn't.";
  }
  
  if (cleaned.includes('=')) {
    const parts = cleaned.split('=');
    const english = parts[0].trim().replace(/['"]/g, '');
    let vietnamese = parts[1].trim();
    vietnamese = vietnamese
      .replace(/^(Không phải|Đúng vậy|Đúng thế),\s*/i, '')
      .replace(/^nó màu\s+/i, '')
      .replace(/^nó là\s+/i, '')
      .replace(/^đây là\s+/i, '');
    return `${english} = ${vietnamese}`;
  }
  
  return cleaned;
};

const renderChoiceContent = (choice: string) => {
  const emojiRegex = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/;
  const isEmoji = emojiRegex.test(choice) && choice.length <= 4;
  
  if (isEmoji) {
    return (
      <span className="text-5xl sm:text-6xl block my-1 animate-scaleUp select-none" style={{ lineHeight: '1.2' }}>
        {choice}
      </span>
    );
  }
  
  return <span>{choice}</span>;
};

export const InteractiveLesson2: React.FC<Props> = ({ lesson, onCorrectAnswer, onGameCompleted }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = lesson.practiceQuestions || [];

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md text-center max-w-2xl mx-auto my-2">
        <p className="text-red-500 font-extrabold">No questions available for this lesson.</p>
      </div>
    );
  }

  const q = questions[currentQIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswerCorrect !== null) return;
    setSelectedOption(option);
    soundFX.playClick();
  };

  const handleSubmitAnswer = () => {
    if (isAnswerCorrect !== null || selectedOption === null) return;

    const isCorrect = selectedOption === q.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      soundFX.playCorrect();
      onCorrectAnswer();
    } else {
      soundFX.playClick();
    }
  };

  const handleNextQuestion = () => {
    soundFX.playClick();
    setIsAnswerCorrect(null);
    setSelectedOption(null);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      soundFX.playFanfare();
      setShowSummary(true);
    }
  };

  const handleTryAgain = () => {
    soundFX.playClick();
    setShowSummary(false);
    setCurrentQIndex(0);
    setCorrectCount(0);
    setIsAnswerCorrect(null);
    setSelectedOption(null);
  };

  const handleContinue = () => {
    soundFX.playClick();
    const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    onGameCompleted(scorePercentage);
  };

  if (showSummary) {
    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px]">
        <div className="flex items-center justify-between mb-4 border-b border-red-50 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500 animate-bounce" />
            <span className="font-black text-slate-800 text-sm md:text-base">
              Practice Completed! (Hoàn thành luyện tập)
            </span>
          </div>
          <span className="text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
            Result Summary
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center py-8 space-y-4">
          <div className="flex items-center gap-4 bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-3xl shadow-md w-full max-w-md justify-around">
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">SCORE</span>
              <span className="text-3xl font-black">{correctCount} / {questions.length}</span>
            </div>
            <div className="w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">PERCENTAGE</span>
              <span className="text-3xl font-black">{scorePercentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 border-t border-red-50 pt-4 mt-2 justify-center">
          <button
            onClick={handleTryAgain}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 border border-slate-200 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again (Luyện tập lại)</span>
          </button>
          <button
            onClick={handleContinue}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>Continue to Speaking (Luyện nói)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px]">
      <div className="flex items-center justify-between mb-4 border-b border-red-50 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <span className="text-slate-500 font-extrabold uppercase tracking-widest text-[9px] bg-slate-100 px-3 py-1 rounded-full">
            Lesson 2 Practice
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
          <span>Question {currentQIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-2">
        <div className="flex flex-col items-center gap-5">
          {q.image && (
            <div className="text-9xl md:text-[11rem] select-none p-4 bg-amber-50 rounded-full border-2 border-amber-200 animate-bounce">
              {q.image}
            </div>
          )}
          <h4 className="text-xl font-black text-slate-800 mt-2">{q.question}</h4>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            {(q.choices || []).map((choice, idx) => {
              const isSelected = selectedOption === choice;
              const isTarget = choice === q.correctAnswer;
              
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
              if (isAnswerCorrect !== null) {
                if (isSelected) {
                  btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-rose-600 border-rose-600 text-white shadow-md';
                } else if (isTarget) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-800 font-extrabold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-red-50 border-red-500 text-red-900 font-black shadow-xs scale-102';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerCorrect !== null}
                  onClick={() => handleSelectOption(choice)}
                  className={`p-4 rounded-2xl border-2 text-base font-extrabold transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                >
                  {renderChoiceContent(choice)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-red-50 pt-3 flex justify-center">
        {isAnswerCorrect === null ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className="w-full max-w-md bg-red-600 hover:bg-red-700 disabled:bg-slate-100 disabled:text-slate-400 text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Submit Answer (Nộp bài)</span>
          </button>
        ) : (
          <div className="w-full flex flex-col gap-4 text-left p-5 rounded-3xl border-2 animate-fadeIn bg-white shadow-md">
            <div className="flex items-center justify-between border-b pb-3">
              <span className={`text-base font-black flex items-center gap-1.5 ${isAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isAnswerCorrect ? '✅ Correct! Good job! (Chính xác!) ⭐' : '❌ Incorrect! Keep trying! (Chưa chính xác)'}
              </span>
              <button
                onClick={handleNextQuestion}
                className={`px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-md transition-all active:scale-95 flex items-center gap-2 ${
                  isAnswerCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                <span>Continue (Tiếp tục)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {lesson.id !== 'u7-l2' && lesson.id !== 'u5-l2' && (
              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block mb-0.5">Explanation (Giải thích)</span>
                  <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl text-amber-900 leading-relaxed font-bold">
                    {simplifyExplanation(q.explanation, q.vocabulary)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
