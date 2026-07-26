import React, { useState, useEffect } from 'react';
import { Sparkles, Star, ArrowRight, RotateCcw, CheckCircle2, XCircle, Award } from 'lucide-react';
import { Lesson } from '../types';
import { EMOJI_MAP } from '../data/curriculum';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  onCorrectAnswer: () => void;
  onGameCompleted: () => void;
}

const ODD_WORDS = ['dinosaur', 'spaceship', 'hamburger', 'guitar', 'alien', 'octopus', 'wizard', 'volcano'];

type MiniGameType = 'pictureQuiz' | 'wordPuzzle' | 'chooseCorrect' | 'memoryGame' | 'matchingGame' | 'oddOneOut';

interface Question {
  targetWord: string;
  meaningVi: string;
  emoji: string;
  choices: string[];
  sentencePattern?: string;
  unscrambledLetters?: string[];
  oddChoices?: string[];
}

interface UserAnswer {
  questionNumber: number;
  questionType: string;
  targetWord: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export const InteractiveGame: React.FC<Props> = ({ lesson, onCorrectAnswer, onGameCompleted }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0); // 0 to 9
  const [selectedGame, setSelectedGame] = useState<MiniGameType>('pictureQuiz');
  const [game1, setGame1] = useState<MiniGameType>('pictureQuiz');
  const [game2, setGame2] = useState<MiniGameType>('wordPuzzle');

  // Game specific state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Unscramble state
  const [unscrambleInput, setUnscrambleInput] = useState<string[]>([]);

  // Memory Game state
  const [memoryCards, setMemoryCards] = useState<{ id: number; value: string; type: 'word' | 'illustration'; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Matching Game state
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // Summary and single attempt tracking
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeTimer, setActiveTimer] = useState<any | null>(null);

  const vocabList = lesson.vocabulary.length > 0 ? lesson.vocabulary : [
    { id: 'v-fb-1', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
    { id: 'v-fb-2', word: 'book', meaningVi: 'sách', exampleSentence: 'It is a book.' },
    { id: 'v-fb-3', word: 'eraser', meaningVi: 'cục tẩy', exampleSentence: 'It is an eraser.' },
    { id: 'v-fb-4', word: 'ruler', meaningVi: 'thước kẻ', exampleSentence: 'It is a ruler.' }
  ];

  // Helper to generate the 10 questions
  const generateQuestions = () => {
    const generatedQs: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const vocab = vocabList[i % vocabList.length];
      const wordLower = vocab.word.toLowerCase();
      const emoji = EMOJI_MAP[wordLower] || '🔤';

      // Distractors
      const distractors = vocabList
        .filter((v) => v.word !== vocab.word)
        .map((v) => v.word);
      while (distractors.length < 3) {
        const extra = ['pencil', 'eraser', 'ruler', 'book', 'notebook', 'desk', 'chair', 'paper', 'paint', 'blue', 'red', 'yellow', 'green', 'purple', 'orange', 'pink'];
        const rand = extra[Math.floor(Math.random() * extra.length)];
        if (!distractors.includes(rand) && rand !== vocab.word) {
          distractors.push(rand);
        }
      }
      const choices = [vocab.word, distractors[0], distractors[1], distractors[2]].sort(() => Math.random() - 0.5);

      // Sentence pattern fill-in-the-blank
      let pattern = 'It is a/an ______.';
      if (lesson.sentencePatterns && lesson.sentencePatterns.length > 0) {
        const selectedPattern = lesson.sentencePatterns[i % lesson.sentencePatterns.length].pattern;
        const currentVocabWords = vocabList.map((v) => v.word.toLowerCase());
        let replaced = selectedPattern;
        for (const w of currentVocabWords) {
          const regex = new RegExp(`\\b${w}\\b`, 'gi');
          if (regex.test(replaced)) {
            replaced = replaced.replace(regex, '______');
            break;
          }
        }
        if (replaced === selectedPattern) {
          replaced = selectedPattern.replace(/(\w+)$/, '______');
        }
        pattern = replaced;
      }

      // Odd choices
      const oddDistractor = ODD_WORDS[Math.floor(Math.random() * ODD_WORDS.length)];
      const oddList = [vocab.word];
      vocabList.filter((v) => v.word !== vocab.word).slice(0, 2).forEach((v) => oddList.push(v.word));
      while (oddList.length < 3) {
        oddList.push(vocabList[0].word);
      }
      const oddChoices = [...oddList, oddDistractor].sort(() => Math.random() - 0.5);

      generatedQs.push({
        targetWord: vocab.word,
        meaningVi: vocab.meaningVi || vocab.word,
        emoji,
        choices,
        sentencePattern: pattern,
        unscrambledLetters: vocab.word.split('').sort(() => Math.random() - 0.5),
        oddChoices: oddChoices
      });
    }
    setQuestions(generatedQs);
  };

  useEffect(() => {
    const games: MiniGameType[] = ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'];
    const shuffledGames = [...games].sort(() => Math.random() - 0.5);
    setGame1(shuffledGames[0]);
    setGame2(shuffledGames[1]);
    setSelectedGame(shuffledGames[0]);

    generateQuestions();
    setCurrentQIndex(0);
    setUserAnswers([]);
    setShowSummary(false);
  }, [lesson]);

  // Track stage (Question 1-5 = Game 1, Question 6-10 = Game 2)
  useEffect(() => {
    if (questions.length === 0) return;
    const activeGame = currentQIndex < 5 ? game1 : game2;
    setSelectedGame(activeGame);
    resetGameState(activeGame, questions[currentQIndex]);
  }, [currentQIndex, game1, game2, questions]);

  const resetGameState = (gameType: MiniGameType, q: Question) => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setUnscrambleInput([]);
    setLeftSelected(null);
    setRightSelected(null);
    setMatchedPairs({});

    if (gameType === 'memoryGame') {
      const activeWords = [q.targetWord];
      const otherWords = vocabList.filter(v => v.word !== q.targetWord).map(v => v.word);
      if (otherWords.length > 0) activeWords.push(otherWords[0]);
      if (otherWords.length > 1) activeWords.push(otherWords[1]);
      while (activeWords.length < 3) {
        activeWords.push(q.targetWord);
      }

      const cards: any[] = [];
      activeWords.forEach((word, idx) => {
        cards.push({ id: idx * 2, value: word, type: 'word', flipped: false, matched: false });
        cards.push({ id: idx * 2 + 1, value: word, type: 'illustration', flipped: false, matched: false });
      });

      setMemoryCards(cards.sort(() => Math.random() - 0.5));
      setSelectedCards([]);
    }
  };

  // Record student response and compile brief Vietnamese explanations
  const recordAnswer = (studentAns: string, isCorrect: boolean, customCorrectAns?: string) => {
    const currentQ = questions[currentQIndex];
    let correctAnswer = customCorrectAns || currentQ.targetWord;
    let explanation = `Đáp án đúng là "${correctAnswer}" vì từ này có nghĩa là "${currentQ.meaningVi}".`;

    if (selectedGame === 'chooseCorrect' && currentQ.sentencePattern) {
      correctAnswer = currentQ.sentencePattern.replace('______', currentQ.targetWord);
      explanation = `Mẫu câu đúng là "${correctAnswer}" (Nghĩa: "${currentQ.meaningVi}").`;
    }

    const newAnswer: UserAnswer = {
      questionNumber: currentQIndex + 1,
      questionType: selectedGame,
      targetWord: currentQ.targetWord,
      studentAnswer: studentAns,
      correctAnswer: correctAnswer,
      isCorrect,
      explanation
    };

    setUserAnswers(prev => {
      const filtered = prev.filter(ans => ans.questionNumber !== newAnswer.questionNumber);
      return [...filtered, newAnswer];
    });
  };

  const handleChooseOption = (option: string, correctValue: string) => {
    if (isAnswerCorrect !== null) return;
    setSelectedOption(option);

    const isCorrect = option.toLowerCase() === correctValue.toLowerCase();
    recordAnswer(option, isCorrect);

    if (isCorrect) {
      setIsAnswerCorrect(true);
      soundFX.playCorrect();
      onCorrectAnswer();
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 1500);
      setActiveTimer(timer);
    } else {
      setIsAnswerCorrect(false);
      soundFX.playClick();
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 4000);
      setActiveTimer(timer);
    }
  };

  // Word Puzzle letter builder
  const handleLetterClick = (letter: string, index: number, targetWord: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();
    const newInput = [...unscrambleInput, letter];
    setUnscrambleInput(newInput);

    if (newInput.length === targetWord.length) {
      const spelled = newInput.join('');
      const isCorrect = spelled.toLowerCase() === targetWord.toLowerCase();
      recordAnswer(spelled, isCorrect);

      if (isCorrect) {
        setIsAnswerCorrect(true);
        soundFX.playCorrect();
        onCorrectAnswer();
        const timer = setTimeout(() => {
          handleNextQuestion();
        }, 1500);
        setActiveTimer(timer);
      } else {
        setIsAnswerCorrect(false);
        soundFX.playClick();
        const timer = setTimeout(() => {
          handleNextQuestion();
        }, 4000);
        setActiveTimer(timer);
      }
    }
  };

  // Memory Game pairs matching
  const handleCardClick = (cardId: number, q: Question) => {
    if (selectedCards.length >= 2 || isAnswerCorrect !== null) return;
    const card = memoryCards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    soundFX.playClick();
    const updatedCards = memoryCards.map(c => c.id === cardId ? { ...c, flipped: true } : c);
    setMemoryCards(updatedCards);

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const firstCard = memoryCards.find(c => c.id === newSelected[0])!;
      const secondCard = card;

      const isWordEmojiMatch = firstCard.value === secondCard.value && firstCard.type !== secondCard.type;

      if (isWordEmojiMatch) {
        setTimeout(() => {
          const matchedCards = updatedCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, matched: true } : c
          );
          setMemoryCards(matchedCards);
          setSelectedCards([]);

          if (matchedCards.every(c => c.matched)) {
            setIsAnswerCorrect(true);
            soundFX.playCorrect();
            onCorrectAnswer();
            recordAnswer('Match 3 Pairs', true);
            const timer = setTimeout(() => {
              handleNextQuestion();
            }, 1500);
            setActiveTimer(timer);
          }
        }, 600);
      } else {
        setTimeout(() => {
          soundFX.playClick();
          setIsAnswerCorrect(false);
          // Reveal all cards instantly to show correct layout
          setMemoryCards(updatedCards.map(c => ({ ...c, flipped: true })));
          setSelectedCards([]);
          recordAnswer('Mismatched Cards', false);
          
          const timer = setTimeout(() => {
            handleNextQuestion();
          }, 4000);
          setActiveTimer(timer);
        }, 600);
      }
    }
  };

  // Matching Game clicks check
  const handleMatchingLeft = (item: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();
    setLeftSelected(item);
    if (rightSelected) {
      checkMatch(item, rightSelected);
    }
  };

  const handleMatchingRight = (item: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();
    setRightSelected(item);
    if (leftSelected) {
      checkMatch(leftSelected, item);
    }
  };

  const checkMatch = (left: string, right: string) => {
    const isMatched = EMOJI_MAP[left.toLowerCase()] === right;
    if (isMatched) {
      const newPairs = { ...matchedPairs, [left]: right };
      setMatchedPairs(newPairs);
      setLeftSelected(null);
      setRightSelected(null);
      soundFX.playStar();

      const startIndex = Math.min(currentQIndex, 7);
      const matchingWords = Array.from(new Set(questions.slice(startIndex, startIndex + 3).map(q => q.targetWord)));

      if (Object.keys(newPairs).length === matchingWords.length) {
        setIsAnswerCorrect(true);
        soundFX.playCorrect();
        onCorrectAnswer();
        recordAnswer('All Matched', true);
        const timer = setTimeout(() => {
          handleNextQuestion();
        }, 1500);
        setActiveTimer(timer);
      }
    } else {
      soundFX.playClick();
      setLeftSelected(null);
      setRightSelected(null);

      // Incorrect connection! Immediately reveal correct pairings & mark wrong
      setIsAnswerCorrect(false);
      
      const startIndex = Math.min(currentQIndex, 7);
      const matchingWords = Array.from(new Set(questions.slice(startIndex, startIndex + 3).map(q => q.targetWord)));
      const correctPairs: Record<string, string> = {};
      matchingWords.forEach(w => {
        correctPairs[w] = EMOJI_MAP[w.toLowerCase()] || '🔤';
      });
      setMatchedPairs(correctPairs);

      recordAnswer('Incorrect matching connection', false);

      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 4000);
      setActiveTimer(timer);
    }
  };

  const handleNextQuestion = () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
      setActiveTimer(null);
    }

    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setUnscrambleInput([]);
    setLeftSelected(null);
    setRightSelected(null);
    setMatchedPairs({});

    if (currentQIndex < 9) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      soundFX.playFanfare();
      setShowSummary(true);
    }
  };

  // Actions for Summary Screen
  const handleTryAgain = () => {
    soundFX.playClick();
    setUserAnswers([]);
    setShowSummary(false);
    setCurrentQIndex(0);
    
    // Choose 2 random games
    const games: MiniGameType[] = ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'];
    const shuffledGames = [...games].sort(() => Math.random() - 0.5);
    setGame1(shuffledGames[0]);
    setGame2(shuffledGames[1]);
    setSelectedGame(shuffledGames[0]);

    generateQuestions();
  };

  const handleContinueToSpeaking = () => {
    soundFX.playClick();
    onGameCompleted();
  };

  if (questions.length === 0) return null;
  const currentQuestion = questions[currentQIndex];

  // RENDER SUMMARY PAGE
  if (showSummary) {
    const correctCount = userAnswers.filter(ans => ans.isCorrect).length;
    const scorePercentage = Math.round((correctCount / 10) * 100);
    const incorrectAnswers = userAnswers.filter(ans => !ans.isCorrect);

    return (
      <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px] animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-red-50 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500 animate-bounce" />
            <span className="font-black text-slate-800 text-sm md:text-base capitalize">
              Practice Completed! (Hoàn thành luyện tập)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
            <span>Result Summary</span>
          </div>
        </div>

        {/* Results Info Cards */}
        <div className="flex-1 flex flex-col items-center py-2 space-y-4">
          <div className="flex items-center gap-4 bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-3xl shadow-md w-full max-w-md justify-around">
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">SCORE</span>
              <span className="text-3xl font-black">{correctCount} / 10</span>
            </div>
            <div className="w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">PERCENTAGE</span>
              <span className="text-3xl font-black">{scorePercentage}%</span>
            </div>
            <div className="w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">STARS</span>
              <span className="text-3xl font-black flex items-center gap-1">
                <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
                +{correctCount}
              </span>
            </div>
          </div>

          {/* Details list of incorrect answers */}
          <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <h4 className="text-xs font-black text-slate-700 uppercase mb-3 flex items-center gap-1">
              <span>Review Mistakes (Xem lại lỗi sai)</span>
            </h4>
            
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
              {incorrectAnswers.length > 0 ? (
                incorrectAnswers.map((ans, idx) => (
                  <div key={idx} className="bg-white border border-rose-100 p-2.5 rounded-xl text-xs space-y-1">
                    <span className="font-extrabold text-red-600 block">Question {ans.questionNumber}: {ans.questionType.replace(/([A-Z])/g, ' $1')}</span>
                    <p className="text-slate-600 font-semibold">Your Answer: <span className="text-rose-600 line-through capitalize font-bold">{ans.studentAnswer}</span></p>
                    <p className="text-slate-700 font-extrabold">Correct Answer: <span className="text-emerald-600 capitalize">{ans.correctAnswer}</span></p>
                    <p className="text-[10px] font-medium italic text-slate-400 mt-1">💡 {ans.explanation}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-emerald-600 font-black flex flex-col items-center gap-1.5">
                  <Star className="w-8 h-8 fill-amber-300 text-amber-400 animate-spin" />
                  <span>Excellent! Perfect 10/10 Score! 🌟</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 border-t border-red-50 pt-4 mt-2 justify-center">
          <button
            onClick={handleTryAgain}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 transition-all active:scale-95 border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again (Luyện tập lại)</span>
          </button>
          
          <button
            onClick={handleContinueToSpeaking}
            className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>Continue to Speaking (Luyện nói)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // RENDER NORMAL GAME SCREEN
  return (
    <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px]">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4 border-b border-red-50 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <span className="font-black text-slate-800 text-sm md:text-base capitalize">
            Game Mode: {selectedGame.replace(/([A-Z])/g, ' $1')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
          <span>Question {currentQIndex + 1} / 10</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-2">
        {/* PICTURE QUIZ */}
        {selectedGame === 'pictureQuiz' && (
          <div className="flex flex-col items-center gap-5">
            <div className="text-8xl select-none p-4 bg-amber-50 rounded-full border-2 border-amber-200 animate-bounce">
              {currentQuestion.emoji}
            </div>
            <h4 className="text-xl font-black text-slate-800 mt-2">
              What is this in English?
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {currentQuestion.choices.map((choice, idx) => {
                const isSelected = selectedOption === choice;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
                if (isSelected) {
                  btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-rose-600 border-rose-600 text-white shadow-md';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswerCorrect !== null}
                    onClick={() => handleChooseOption(choice, currentQuestion.targetWord)}
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* WORD PUZZLE / UNSCRAMBLE */}
        {selectedGame === 'wordPuzzle' && (
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Unscramble the word!
            </span>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <p className="text-2xl font-black text-amber-800">{currentQuestion.emoji}</p>
              <p className="text-sm font-extrabold text-slate-600 mt-1">Hint: {currentQuestion.meaningVi}</p>
            </div>

            {/* Answer Display */}
            <div className="flex gap-2 min-h-[50px] border-b-2 border-dashed border-red-200 px-6 py-2 items-center">
              {unscrambleInput.map((letter, idx) => (
                <span key={idx} className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-black text-xl shadow-md capitalize animate-scaleUp">
                  {letter}
                </span>
              ))}
              {unscrambleInput.length === 0 && <span className="text-slate-400 font-semibold italic text-sm">Click letters below</span>}
            </div>

            {/* Selection letters */}
            <div className="flex flex-wrap gap-2.5 justify-center max-w-sm">
              {currentQuestion.unscrambledLetters?.map((letter, idx) => (
                <button
                  key={idx}
                  disabled={isAnswerCorrect !== null}
                  onClick={() => handleLetterClick(letter, idx, currentQuestion.targetWord)}
                  className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-800 hover:bg-amber-55 hover:border-amber-35 font-black text-lg shadow-xs flex items-center justify-center capitalize active:scale-95 transition-all"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHOOSE CORRECT ANSWER (Sentence pattern) */}
        {selectedGame === 'chooseCorrect' && (
          <div className="flex flex-col items-center gap-5">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Fill in the Blank!
            </span>
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 max-w-md w-full">
              <h4 className="text-xl font-black text-slate-800 leading-relaxed">
                "{currentQuestion.sentencePattern}"
              </h4>
              <p className="text-xs font-bold text-red-600 mt-2">Hint: ({currentQuestion.meaningVi})</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {currentQuestion.choices.map((choice, idx) => {
                const isSelected = selectedOption === choice;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
                if (isSelected) {
                  btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-rose-600 border-rose-600 text-white shadow-md';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswerCorrect !== null}
                    onClick={() => handleChooseOption(choice, currentQuestion.targetWord)}
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MEMORY GAME */}
        {selectedGame === 'memoryGame' && (
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-2">
              Match 3 Pairs!
            </span>
            <div className="grid grid-cols-3 gap-4 max-w-lg w-full justify-center px-2">
              {memoryCards.map((card) => {
                const isFlipped = card.flipped || card.matched;
                const iconName = card.value.toLowerCase().replace(/\s+/g, '-');
                return (
                  <button
                    key={card.id}
                    disabled={card.matched || isAnswerCorrect !== null}
                    onClick={() => handleCardClick(card.id, currentQuestion)}
                    className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl border-3 flex flex-col items-center justify-center font-black transition-all duration-300 transform active:scale-90 overflow-hidden relative ${
                      card.matched
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-inner ring-4 ring-emerald-100'
                        : card.flipped
                        ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-md'
                        : 'bg-gradient-to-tr from-red-500 to-rose-600 border-red-600 text-white text-3xl shadow-md hover:scale-[1.03]'
                    }`}
                  >
                    {isFlipped ? (
                      card.type === 'word' ? (
                        <span className="capitalize text-xs sm:text-sm md:text-base font-extrabold px-1 truncate max-w-full text-center">
                          {card.value}
                        </span>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img
                            src={`https://img.icons8.com/color/256/${encodeURIComponent(iconName)}.png`}
                            alt={card.value}
                            className="w-[75%] h-[75%] object-contain animate-fadeIn"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = parent.querySelector('.fallback-emoji');
                                if (fallback) fallback.setAttribute('style', 'display: block');
                              }
                            }}
                          />
                          <span className="fallback-emoji text-3xl sm:text-4xl md:text-5xl font-normal hidden">
                            {EMOJI_MAP[card.value.toLowerCase()] || '🔤'}
                          </span>
                        </div>
                      )
                    ) : (
                      <span className="text-2xl sm:text-3xl md:text-4xl select-none">❓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MATCHING GAME */}
        {selectedGame === 'matchingGame' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-3">
              Match word with picture!
            </span>
            
            {/* Split layout */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto">
              {/* Words (Left) */}
              <div className="space-y-3">
                {(() => {
                  const startIndex = Math.min(currentQIndex, 7);
                  const matchingWords = Array.from(new Set(questions.slice(startIndex, startIndex + 3).map(q => q.targetWord)));
                  return matchingWords.map((word, idx) => {
                    const isMatched = !!matchedPairs[word];
                    const isSelected = leftSelected === word;
                    return (
                      <button
                        key={idx}
                        disabled={isMatched || isAnswerCorrect !== null}
                        onClick={() => handleMatchingLeft(word)}
                        className={`w-full p-3 rounded-xl border-2 font-black text-sm capitalize transition-all text-center ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800 line-through'
                            : isSelected
                            ? 'bg-red-500 border-red-500 text-white shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  });
                })()}
              </div>

              {/* Emojis (Right) */}
              <div className="space-y-3">
                {(() => {
                  const startIndex = Math.min(currentQIndex, 7);
                  const matchingEmojis = Array.from(new Set(questions.slice(startIndex, startIndex + 3).map(q => q.emoji))).sort();
                  return matchingEmojis.map((emoji, idx) => {
                    const isMatched = Object.values(matchedPairs).includes(emoji);
                    const isSelected = rightSelected === emoji;
                    return (
                      <button
                        key={idx}
                        disabled={isMatched || isAnswerCorrect !== null}
                        onClick={() => handleMatchingRight(emoji)}
                        className={`w-full p-3 rounded-xl border-2 font-normal text-2xl transition-all text-center ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ODD ONE OUT */}
        {selectedGame === 'oddOneOut' && (
          <div className="flex flex-col items-center gap-5">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Find the Odd One Out!
            </span>
            <h4 className="text-xl font-black text-slate-800">
              One of these is NOT like the others! Tap it:
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {currentQuestion.oddChoices?.map((choice, idx) => {
                const isSelected = selectedOption === choice;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
                if (isSelected) {
                  btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-rose-600 border-rose-600 text-white shadow-md';
                }
                return (
                  <button
                    key={idx}
                    disabled={isAnswerCorrect !== null}
                    onClick={() => handleChooseOption(choice, ODD_WORDS.includes(choice) ? choice : 'nonsense_value_to_fail')}
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Feedback & Navigation */}
      <div className="mt-4 border-t border-red-50 pt-3">
        {isAnswerCorrect === true && (
          <div className="w-full bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-emerald-950 flex items-center justify-between animate-fadeIn shadow-2xs">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
              <span className="font-extrabold text-sm text-emerald-800">Awesome! Question Completed! ⭐</span>
            </div>
            <button
              onClick={handleNextQuestion}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>{currentQIndex === 9 ? 'See Practice Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {isAnswerCorrect === false && (
          <div className="w-full bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl text-rose-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn shadow-2xs">
            <div className="text-left space-y-1">
              <span className="font-extrabold text-sm text-rose-800 block">Oops! Sai một chút rồi 🌟</span>
              <p className="text-[11px] font-bold text-rose-700">
                {selectedGame === 'chooseCorrect'
                  ? `Mẫu câu đúng: "${currentQuestion.sentencePattern?.replace('______', currentQuestion.targetWord)}" (Nghĩa: "${currentQuestion.meaningVi}").`
                  : `Đáp án đúng là "${currentQuestion.targetWord}" vì từ này có nghĩa là "${currentQuestion.meaningVi}".`}
              </p>
            </div>
            <button
              onClick={handleNextQuestion}
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>Tiếp tục (Continue)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
