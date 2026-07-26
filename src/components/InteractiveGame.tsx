import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, Star, ArrowRight, RefreshCw, Box, Trophy, Grid } from 'lucide-react';
import { Lesson, VocabularyItem } from '../types';
import { speakText } from '../utils/ttsPlayer';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  onCorrectAnswer: () => void;
  onGameCompleted: () => void;
}

// Emoji lookup dictionary for vocabulary items
const EMOJI_MAP: Record<string, string> = {
  pencil: '✏️', eraser: '🧽', ruler: '📏', 'pencil case': '👝', backpack: '🎒', notebook: '📓', desk: '🏫', chair: '🪑', book: '📖',
  circle: '🔴', square: '🟩', triangle: '🔺', rectangle: '▮', paint: '🎨', paper: '📄', chalk: '🖍️', yarn: '🧶', glue: '🧴', tape: '🩹',
  red: '🔴', yellow: '🟡', blue: '🔵', white: '⚪', black: '⚫', green: '🟢', purple: '🟣', orange: '🟠', pink: '🌸', gray: '🔘', brown: '🟤',
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣', six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟', eleven: '⑪', twelve: '⑫',
  doll: '🧸', dolls: '🧸🧸', ball: '⚽', balls: '⚽⚾', car: '🚗', cars: '🚗🚗', kite: '🪁', kites: '🪁🪁', game: '🎮', marble: '🔮', puzzle: '🧩', card: '🃏',
  mother: '👩', father: '👨', brother: '👦', sister: '👧', grandmother: '👵', grandfather: '👴', juice: '🧃', chicken: '🍗', fish: '🐟', 'ice cream': '🍦',
  pizza: '🍕', rice: '🍚', cookie: '🍪', bread: '🍞', flower: '🌸', tree: '🌳', rock: '🪨', river: '🏞️', hill: '⛰️', lake: '🌅',
  'play soccer': '⚽🏃', 'jump rope': '🏃‍♀️', 'fly a kite': '🪁🏃', 'ride a bike': '🚴', turtle: '🐢', frog: '🐸', spider: '🕷️', ant: '🐜',
  elephant: '🐘', monkey: '🐒', tiger: '🐅', bear: '🐻', kangaroo: '🦘', penguin: '🐧', snake: '🐍', giraffe: '🦒', zebra: '🦓',
  run: '🏃', hop: '🐇', swim: '🏊', walk: '🚶', arm: '💪', hand: '✋', finger: '☝️', leg: '🦵', foot: '🦶', toe: '🦶',
  eye: '👁️', nose: '👃', mouth: '👄', ear: '👂', 'wash my face': '🧼', 'wash my hands': '👐🧼', 'brush my hair': '🪮', 'brush my teeth': '🪥',
  old: '🧓', new: '✨', big: '🐘', small: '🐭', long: '📏', short: '📐', fast: '⚡', slow: '🐢', noisy: '📢', quiet: '🤫',
  bus: '🚌', truck: '🚚', train: '🚆', boat: '⛵'
};

const ODD_WORDS = ['dinosaur', 'spaceship', 'hamburger', 'guitar', 'alien', 'octopus', 'wizard', 'volcano'];

type MiniGameType = 'pictureQuiz' | 'wordPuzzle' | 'chooseCorrect' | 'memoryGame' | 'matchingGame' | 'oddOneOut';

interface Question {
  targetWord: string;
  meaningVi: string;
  emoji: string;
  choices: string[];
  sentencePattern?: string;
  unscrambledLetters?: string[];
  oddChoices?: string[]; // For odd one out
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
  const [memoryCards, setMemoryCards] = useState<{ id: number; value: string; type: 'word' | 'emoji'; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Matching Game state
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  const vocabList = lesson.vocabulary.length > 0 ? lesson.vocabulary : [
    { id: 'v-fb-1', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
    { id: 'v-fb-2', word: 'book', meaningVi: 'sách', exampleSentence: 'It is a book.' },
    { id: 'v-fb-3', word: 'eraser', meaningVi: 'cục tẩy', exampleSentence: 'It is an eraser.' },
    { id: 'v-fb-4', word: 'ruler', meaningVi: 'thước kẻ', exampleSentence: 'It is a ruler.' }
  ];

  useEffect(() => {
    // 1. Choose 2 random games
    const games: MiniGameType[] = ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'];
    const shuffledGames = [...games].sort(() => Math.random() - 0.5);
    setGame1(shuffledGames[0]);
    setGame2(shuffledGames[1]);
    setSelectedGame(shuffledGames[0]);

    // 2. Generate 10 questions using ONLY vocab and patterns of current lesson
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
        // Replace vocabulary word with blanks
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

      // Odd choices (3 from current vocab, 1 completely odd)
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
    setCurrentQIndex(0);
    resetGameState(shuffledGames[0], generatedQs[0]);
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
      // Generate memory cards for 3 words (target and 2 distractors)
      const activeWords = [q.targetWord];
      const otherWords = vocabList.filter(v => v.word !== q.targetWord).map(v => v.word);
      if (otherWords.length > 0) activeWords.push(otherWords[0]);
      if (otherWords.length > 1) activeWords.push(otherWords[1]);
      while (activeWords.length < 3) {
        activeWords.push(q.targetWord);
      }

      const cards: any[] = [];
      activeWords.forEach((word, idx) => {
        const emoji = EMOJI_MAP[word.toLowerCase()] || '🔤';
        cards.push({ id: idx * 2, value: word, type: 'word', flipped: false, matched: false });
        cards.push({ id: idx * 2 + 1, value: emoji, type: 'emoji', flipped: false, matched: false });
      });

      setMemoryCards(cards.sort(() => Math.random() - 0.5));
      setSelectedCards([]);
    }
  };

  const handleChooseOption = (option: string, correctValue: string) => {
    setSelectedOption(option);
    if (option.toLowerCase() === correctValue.toLowerCase()) {
      setIsAnswerCorrect(true);
      soundFX.playCorrect();
      onCorrectAnswer();
    } else {
      setIsAnswerCorrect(false);
      soundFX.playClick();
    }
  };

  // Word Puzzle (Unscramble) handlers
  const handleLetterClick = (letter: string, index: number, targetWord: string) => {
    soundFX.playClick();
    const newInput = [...unscrambleInput, letter];
    setUnscrambleInput(newInput);

    if (newInput.length === targetWord.length) {
      const spelled = newInput.join('');
      if (spelled.toLowerCase() === targetWord.toLowerCase()) {
        setIsAnswerCorrect(true);
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        setIsAnswerCorrect(false);
        // auto reset after 1s on mistake
        setTimeout(() => {
          setUnscrambleInput([]);
          setIsAnswerCorrect(null);
        }, 1000);
      }
    }
  };

  // Memory Game match handler
  const handleCardClick = (cardId: number, q: Question) => {
    if (selectedCards.length >= 2) return;
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

      // Check match: either word-emoji match or vice versa
      const isWordEmojiMatch =
        (firstCard.type === 'word' && secondCard.type === 'emoji' && EMOJI_MAP[firstCard.value.toLowerCase()] === secondCard.value) ||
        (firstCard.type === 'emoji' && secondCard.type === 'word' && EMOJI_MAP[secondCard.value.toLowerCase()] === firstCard.value) ||
        (firstCard.value === secondCard.value); // Fallback

      if (isWordEmojiMatch) {
        setTimeout(() => {
          const matchedCards = updatedCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, matched: true } : c
          );
          setMemoryCards(matchedCards);
          setSelectedCards([]);

          // Check win
          if (matchedCards.every(c => c.matched)) {
            setIsAnswerCorrect(true);
            soundFX.playCorrect();
            onCorrectAnswer();
          }
        }, 600);
      } else {
        setTimeout(() => {
          setMemoryCards(updatedCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, flipped: false } : c
          ));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Matching Game handlers
  const handleMatchingLeft = (item: string) => {
    soundFX.playClick();
    setLeftSelected(item);
    if (rightSelected) {
      checkMatch(item, rightSelected);
    }
  };

  const handleMatchingRight = (item: string) => {
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

      // Check win (all 3 pairs matched)
      if (Object.keys(newPairs).length === 3) {
        setIsAnswerCorrect(true);
        soundFX.playCorrect();
        onCorrectAnswer();
      }
    } else {
      soundFX.playClick();
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < 9) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      soundFX.playFanfare();
      onGameCompleted();
    }
  };

  if (questions.length === 0) return null;
  const currentQuestion = questions[currentQIndex];

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
                    disabled={isAnswerCorrect === true}
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

            {/* Letter Selection Grid */}
            <div className="flex flex-wrap gap-3 justify-center max-w-md">
              {currentQuestion.unscrambledLetters?.map((letter, idx) => (
                <button
                  key={idx}
                  disabled={isAnswerCorrect === true || unscrambleInput.length === currentQuestion.targetWord.length}
                  onClick={() => handleLetterClick(letter, idx, currentQuestion.targetWord)}
                  className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-800 hover:bg-red-50 hover:border-red-300 font-black text-lg shadow-xs flex items-center justify-center capitalize active:scale-90"
                >
                  {letter}
                </button>
              ))}
            </div>

            {unscrambleInput.length > 0 && isAnswerCorrect !== true && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  setUnscrambleInput([]);
                  setIsAnswerCorrect(null);
                }}
                className="text-xs font-extrabold text-red-600 flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Spelling</span>
              </button>
            )}
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
                    disabled={isAnswerCorrect === true}
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
            <div className="grid grid-cols-3 gap-3 max-w-sm w-full justify-center">
              {memoryCards.map((card) => {
                const isFlipped = card.flipped || card.matched;
                return (
                  <button
                    key={card.id}
                    disabled={card.matched || isAnswerCorrect === true}
                    onClick={() => handleCardClick(card.id, currentQuestion)}
                    className={`w-24 h-24 rounded-2xl border-3 flex items-center justify-center font-black text-sm transition-all duration-300 transform active:scale-90 ${
                      card.matched
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-800 scale-95 shadow-inner'
                        : isFlipped
                        ? 'bg-amber-100 border-amber-400 text-slate-900 shadow-md font-bold text-lg'
                        : 'bg-gradient-to-tr from-red-500 to-rose-600 border-red-600 text-white text-3xl shadow-md hover:scale-[1.03]'
                    }`}
                  >
                    {card.matched ? (
                      <span className="text-2xl">✅</span>
                    ) : isFlipped ? (
                      <span className="capitalize">{card.value}</span>
                    ) : (
                      '❓'
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
                {Array.from(new Set(questions.slice(0, 3).map(q => q.targetWord))).map((word, idx) => {
                  const isMatched = !!matchedPairs[word];
                  const isSelected = leftSelected === word;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched || isAnswerCorrect === true}
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
                })}
              </div>

              {/* Emojis (Right) */}
              <div className="space-y-3">
                {Array.from(new Set(questions.slice(0, 3).map(q => q.emoji))).sort().map((emoji, idx) => {
                  const isMatched = Object.values(matchedPairs).includes(emoji);
                  const isSelected = rightSelected === emoji;
                  return (
                    <button
                      key={idx}
                      disabled={isMatched || isAnswerCorrect === true}
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
                })}
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
                    disabled={isAnswerCorrect === true}
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
              <span>{currentQIndex === 9 ? 'Complete Practice' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {isAnswerCorrect === false && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl animate-fadeIn">
            <p className="text-rose-700 font-extrabold text-xs">
              Almost! Try again, you can do it! LeeGo is cheering for you! 🌟
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
