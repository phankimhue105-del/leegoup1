import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, HelpCircle, Star, ArrowRight, RefreshCw, Box, Trophy } from 'lucide-react';
import { GameType, Lesson, VocabularyItem } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  gameType: GameType;
  onCorrectAnswer: () => void;
  onGameCompleted: () => void;
}

export const InteractiveGame: React.FC<Props> = ({
  lesson,
  gameType,
  onCorrectAnswer,
  onGameCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [flippedCard, setFlippedCard] = useState(false);

  const vocabList = lesson.vocabulary.length > 0 ? lesson.vocabulary : [
    { id: 'v-fallback', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
    { id: 'v-fallback2', word: 'book', meaningVi: 'sách', exampleSentence: 'It is a book.' }
  ];

  const currentVocab = vocabList[currentIndex % vocabList.length];

  const handleChooseOption = (optionWord: string) => {
    setSelectedOption(optionWord);
    if (optionWord.toLowerCase() === currentVocab.word.toLowerCase()) {
      setIsCorrect(true);
      soundFX.playCorrect();
      setStreak(streak + 1);
      onCorrectAnswer();
    } else {
      setIsCorrect(false);
      soundFX.playClick();
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setFlippedCard(false);
    if (currentIndex + 1 >= vocabList.length) {
      soundFX.playFanfare();
      onGameCompleted();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Generate options for multiple choice
  const getOptions = () => {
    const distractors = vocabList
      .filter((v) => v.word !== currentVocab.word)
      .map((v) => v.word);
    
    // add fallback options if not enough distractors
    const extra = ['pencil', 'eraser', 'ruler', 'book', 'notebook', 'desk', 'chair', 'paper', 'paint', 'blue', 'red', 'yellow'];
    while (distractors.length < 3) {
      const rand = extra[Math.floor(Math.random() * extra.length)];
      if (!distractors.includes(rand) && rand !== currentVocab.word) {
        distractors.push(rand);
      }
    }

    const shuffled = [currentVocab.word, distractors[0], distractors[1], distractors[2]]
      .sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const [options, setOptions] = useState<string[]>(() => getOptions());

  React.useEffect(() => {
    setOptions(getOptions());
  }, [currentIndex]);

  return (
    <div id="interactive-game-container" className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg max-w-2xl mx-auto my-4 text-center">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4 border-b border-red-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="font-extrabold text-slate-800 text-sm md:text-base capitalize">
            Game Mode: {gameType.replace(/([A-Z])/g, ' $1')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-200">
          <span>Item {currentIndex + 1} / {vocabList.length}</span>
        </div>
      </div>

      {/* FLASHCARD GAME MODE */}
      {gameType === 'flashcard' && (
        <div className="flex flex-col items-center gap-6 my-4">
          <div
            onClick={() => {
              setFlippedCard(!flippedCard);
              soundFX.playClick();
              speakText(currentVocab.word);
            }}
            className={`w-64 h-64 rounded-3xl bg-gradient-to-tr from-red-500 to-rose-600 text-white flex flex-col items-center justify-center p-6 shadow-xl cursor-pointer transition-all transform duration-500 ${
              flippedCard ? 'rotate-y-180 bg-gradient-to-tr from-amber-500 to-amber-600' : 'hover:scale-105'
            }`}
          >
            <span className="text-6xl mb-4 select-none">🔤</span>
            <h4 className="text-3xl font-black tracking-wider uppercase">{currentVocab.word}</h4>
            <p className="text-sm font-semibold opacity-90 mt-1">{currentVocab.meaningVi}</p>
            {currentVocab.exampleSentence && (
              <p className="text-xs italic bg-white/20 px-3 py-1 rounded-full mt-3">
                "{currentVocab.exampleSentence}"
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => speakText(currentVocab.word)}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4" /> Listen Audio
            </button>
            <button
              onClick={handleNext}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Next Card</span> <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CHOOSE PICTURE / MULTIPLE CHOICE MODE */}
      {(gameType === 'choosePicture' || gameType === 'pictureMatch' || gameType === 'missingWord' || gameType === 'bossChallenge') && (
        <div className="flex flex-col items-center gap-6 my-2">
          {/* Question Prompt */}
          <div className="bg-red-50 p-4 rounded-2xl border border-red-200 w-full flex items-center justify-between">
            <div>
              <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Target Vocabulary</p>

              <h4 className="text-xl font-black text-slate-800 mt-0.5">
                {gameType === 'missingWord'
                  ? currentVocab.exampleSentence
                    ? currentVocab.exampleSentence.replace(new RegExp(currentVocab.word, 'gi'), '_____')
                    : `It is a _____ (${currentVocab.meaningVi})`
                  : `What is "${currentVocab.meaningVi || currentVocab.word}" in English?`}
              </h4>
            </div>
            <button
              onClick={() => speakText(currentVocab.word)}
              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-sm transition-colors"
              title="Listen to Word"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {options.map((optionWord, idx) => {
              const isSelected = selectedOption === optionWord;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50 hover:border-red-300';

              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-200';
                } else {
                  btnStyle = 'bg-rose-600 border-rose-600 text-white ring-4 ring-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isCorrect === true}
                  onClick={() => handleChooseOption(optionWord)}
                  className={`p-4 rounded-2xl border-2 text-base font-extrabold flex items-center justify-between transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                >
                  <span className="capitalize">{optionWord}</span>
                  {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {isSelected && isCorrect === false && <XCircle className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isCorrect === true && (
            <div className="w-full bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-emerald-900 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
                <span className="font-extrabold text-sm">Excellent! +1 Star Earned! ⭐</span>
              </div>
              <button
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {isCorrect === false && (
            <p className="text-rose-600 font-bold text-xs bg-rose-50 p-2 rounded-lg border border-rose-200">
              Almost! Try one more time! LeeGo is cheering for you! 🌟
            </p>
          )}
        </div>
      )}

      {/* TRUE OR FALSE MODE */}
      {gameType === 'trueOrFalse' && (
        <div className="flex flex-col items-center gap-6 my-4">
          <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 w-full">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">Check Statement</span>
            <p className="text-xl font-black text-slate-800">
              "{currentVocab.word}" means "{currentVocab.meaningVi || 'School item'}".
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => handleChooseOption(currentVocab.word)}
              className="p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-md transition-all"
            >
              TRUE (Đúng)
            </button>
            <button
              onClick={() => handleChooseOption('wrong_option')}
              className="p-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-lg shadow-md transition-all"
            >
              FALSE (Sai)
            </button>
          </div>

          {isCorrect === true && (
            <button
              onClick={handleNext}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <span>Next Question</span> <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* MYSTERY BOX MODE */}
      {gameType === 'mysteryBox' && (
        <div className="flex flex-col items-center gap-6 my-4">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xl animate-bounce">
            <Box className="w-16 h-16" />
          </div>
          <p className="text-sm font-bold text-slate-700">Open LeeGo's Mystery Box to unlock your word!</p>
          <button
            onClick={() => {
              soundFX.playFanfare();
              handleChooseOption(currentVocab.word);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all"
          >
            🎁 Open Mystery Box!
          </button>
          {isCorrect === true && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 w-full text-emerald-900 font-extrabold text-sm flex justify-between items-center">
              <span>You found: "{currentVocab.word}" ({currentVocab.meaningVi})!</span>
              <button onClick={handleNext} className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold">
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
