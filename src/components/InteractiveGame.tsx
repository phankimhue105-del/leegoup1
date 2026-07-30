import React, { useState, useEffect } from 'react';
import { Sparkles, Star, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Lesson } from '../types';
import { EMOJI_MAP } from '../data/curriculum';
import { soundFX } from '../utils/soundEffects';

interface Props {
  lesson: Lesson;
  onCorrectAnswer: () => void;
  onGameCompleted: (score: number) => void;
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
  correctAnswer: string;
  explanation: string;
  vietnameseMeaning: string;
  hintImage?: string;
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

// Simple seedable pseudo-random number generator
function createSeededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h, 48271) | 0;
    return (h & 2147483647) / 2147483648;
  };
}

export const InteractiveGame: React.FC<Props> = ({ lesson, onCorrectAnswer, onGameCompleted }) => {
  const isCommunicationLesson = lesson.number === 3 || lesson.id.includes('checkup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0); // 0 to questions.length - 1
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
  const [isCheckingMemory, setIsCheckingMemory] = useState(false);

  // Matching Game state
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [tempPairs, setTempPairs] = useState<Record<string, string>>({}); // Temp connections before submit

  // Summary and single attempt tracking
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // Fallback vocabulary list for stability
  const vocabList = lesson.vocabulary && lesson.vocabulary.length > 0 ? lesson.vocabulary : [
    { id: 'v-fb-1', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
    { id: 'v-fb-2', word: 'book', meaningVi: 'sách', exampleSentence: 'It is a book.' },
    { id: 'v-fb-3', word: 'eraser', meaningVi: 'cục tẩy', exampleSentence: 'It is an eraser.' },
    { id: 'v-fb-4', word: 'ruler', meaningVi: 'thước kẻ', exampleSentence: 'It is a ruler.' }
  ];

  // Generate deterministic questions based on lesson ID
  const generateQuestions = () => {
    const rng = createSeededRandom(lesson.id || 'default-seed');

    function seededShuffle<T>(arr: T[]): T[] {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }


    const validateQuestion = (q: Question): boolean => {
      if (!q.emoji) {
        console.error(`[Practice QA Engine] Validation error: image/emoji is missing!`, q);
        return false;
      }
      if (!q.choices || q.choices.length !== 4) {
        console.error(`[Practice QA Engine] Validation error: choices count is not exactly 4!`, q);
        return false;
      }
      if (!q.choices.includes(q.correctAnswer)) {
        console.error(`[Practice QA Engine] Validation error: correctAnswer "${q.correctAnswer}" is not in choices!`, q.choices);
        return false;
      }
      if (!q.sentencePattern) {
        console.error(`[Practice QA Engine] Validation error: question text is empty!`, q);
        return false;
      }
      if (!q.explanation) {
        console.error(`[Practice QA Engine] Validation error: explanation is missing!`, q);
        return false;
      }
      return true;
    };

    const generateDynamicQuestions = () => {
      const generatedQs: Question[] = [];
      for (let i = 0; i < 10; i++) {
        const vocab = vocabList[i % vocabList.length];
        const wordLower = vocab.word.toLowerCase();
        const emoji = EMOJI_MAP[wordLower] || '🔤';

        const distractors = vocabList
          .filter((v) => v.word.toLowerCase() !== vocab.word.toLowerCase())
          .map((v) => v.word);

        const extraWords = ['pencil', 'eraser', 'ruler', 'book', 'notebook', 'desk', 'chair', 'paper', 'paint', 'blue', 'red', 'yellow', 'green', 'purple', 'orange', 'pink'];
        const shuffledExtra = seededShuffle(extraWords);
        for (const w of shuffledExtra) {
          if (distractors.length >= 3) break;
          if (w.toLowerCase() !== vocab.word.toLowerCase() && !distractors.some(d => d.toLowerCase() === w.toLowerCase())) {
            distractors.push(w);
          }
        }

        let questionPrompt = '';
        let isConversational = false;

        if (lesson.id.includes('u3-l1') || lesson.id.includes('checkup-l-2')) {
          isConversational = true;
          questionPrompt = 'How old are you?';
        } else if (lesson.id.includes('u2-l2') || lesson.id.includes('checkup-l-1')) {
          isConversational = true;
          questionPrompt = 'What color is it?';
        } else if (lesson.id.includes('u2-l1')) {
          isConversational = true;
          questionPrompt = "What's this?";
        } else if (lesson.id.includes('u1-l1')) {
          isConversational = true;
          questionPrompt = 'What is it?';
        } else if (lesson.id.includes('u3-l2')) {
          isConversational = true;
          questionPrompt = `How many ${vocab.word}?`;
        } else if (lesson.id.includes('u4-l1')) {
          isConversational = true;
          questionPrompt = "Who's this?";
        }

        const makeFullSentence = (word: string) => {
          const wordLower = word.toLowerCase();
          if (questionPrompt.includes('How old are you')) {
            return `I'm ${wordLower}.`;
          }
          if (questionPrompt.includes('What color is it')) {
            return `It's ${wordLower}.`;
          }
          if (questionPrompt.includes("What's this")) {
            return `This is ${wordLower}.`;
          }
          if (questionPrompt.includes('What is it')) {
            const vowel = ['a', 'e', 'i', 'o', 'u'].includes(wordLower.charAt(0));
            return `It's ${vowel ? 'an' : 'a'} ${wordLower}.`;
          }
          if (questionPrompt.includes('How many')) {
            return `${word.charAt(0).toUpperCase() + word.slice(1)}.`;
          }
          if (questionPrompt.includes("Who's this")) {
            return `This is my ${wordLower}.`;
          }
          return word;
        };

        let sentencePattern = 'It is a/an ______.';
        let choices: string[] = [];

        if (isConversational) {
          sentencePattern = questionPrompt;
          const correctChoice = makeFullSentence(vocab.word);
          const distractorOptions = distractors.map(d => makeFullSentence(d));
          choices = seededShuffle([correctChoice, distractorOptions[0], distractorOptions[1], distractorOptions[2]]);
        } else {
          if (vocab.exampleSentence) {
            const regex = new RegExp(`\\b${vocab.word}\\b`, 'gi');
            if (regex.test(vocab.exampleSentence)) {
              sentencePattern = vocab.exampleSentence.replace(regex, '______');
            } else {
              sentencePattern = vocab.exampleSentence + ' (______)';
            }
          } else if (lesson.sentencePatterns && lesson.sentencePatterns.length > 0) {
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
            sentencePattern = replaced;
          }
          choices = seededShuffle([vocab.word, distractors[0], distractors[1], distractors[2]]);
        }

        const oddDistractor = ODD_WORDS[Math.floor(rng() * ODD_WORDS.length)];
        const oddList = [vocab.word];
        vocabList.filter((v) => v.word.toLowerCase() !== vocab.word.toLowerCase()).slice(0, 2).forEach((v) => oddList.push(v.word));
        while (oddList.length < 3) {
          const fallbackWord = vocabList[0].word;
          oddList.push(fallbackWord);
        }
        const oddChoices = seededShuffle([...oddList, oddDistractor]);

        const correctAnswer = isConversational ? makeFullSentence(vocab.word) : vocab.word;

        const questionObj: Question = {
          targetWord: vocab.word,
          meaningVi: vocab.meaningVi || vocab.word,
          emoji,
          choices,
          sentencePattern,
          unscrambledLetters: seededShuffle((vocab.word || '').replace(/\s+/g, '').split('')),
          oddChoices,
          correctAnswer: correctAnswer,
          explanation: `Đáp án đúng là "${correctAnswer}" (Nghĩa: "${vocab.meaningVi || vocab.word}").`,
          vietnameseMeaning: vocab.meaningVi || vocab.word
        };

        if (validateQuestion(questionObj)) {
          generatedQs.push(questionObj);
        }
      }

      setQuestions(generatedQs);
      setIsLoading(false);
    };

    setIsLoading(true);



    if (lesson.practiceQuestions && lesson.practiceQuestions.length > 0) {
      const predefined: Question[] = [];
      lesson.practiceQuestions.forEach((q) => {
        const questionObj: Question = {
          targetWord: q.vocabulary || '',
          meaningVi: q.explanation || '',
          emoji: q.image,
          choices: q.options || q.choices || [],
          sentencePattern: q.question,
          unscrambledLetters: q.unscrambledLetters || [],
          oddChoices: q.oddChoices || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || '',
          vietnameseMeaning: q.explanation || '',
          hintImage: q.hintImage
        };

        if (validateQuestion(questionObj)) {
          predefined.push(questionObj);
        }
      });

      if (predefined.length === 0) {
        console.warn("Predefined questions failed validation, falling back to generated questions for recovery.");
        generateDynamicQuestions();
      } else {
        setQuestions(predefined);
        setIsLoading(false);
      }
      return;
    }

    generateDynamicQuestions();
  };

  useEffect(() => {
    const rng = createSeededRandom(lesson.id || 'default-seed');
    
    function seededShuffle<T>(arr: T[]): T[] {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }

    const games: MiniGameType[] = ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'];
    const shuffledGames = seededShuffle(games);
    setGame1(shuffledGames[0]);
    setGame2(shuffledGames[1]);
    setSelectedGame(shuffledGames[0]);

    generateQuestions();
    setCurrentQIndex(0);
    setUserAnswers([]);
    setShowSummary(false);
  }, [lesson]);

  // Synchronize stage transitions (Deterministic)
  useEffect(() => {
    if (questions.length === 0) return;
    if (isCommunicationLesson) {
      resetGameState('chooseCorrect', questions[currentQIndex]);
      return;
    }
    const activeGame = currentQIndex < 5 ? game1 : game2;
    setSelectedGame(activeGame);
    resetGameState(activeGame, questions[currentQIndex]);
  }, [currentQIndex, game1, game2, questions, isCommunicationLesson]);

  const resetGameState = (gameType: MiniGameType, q: Question) => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setUnscrambleInput([]);
    setLeftSelected(null);
    setRightSelected(null);
    setTempPairs({});
    setIsCheckingMemory(false);

    if (gameType === 'memoryGame') {
      const rng = createSeededRandom(`${lesson.id}-${currentQIndex}`);
      function seededShuffle<T>(arr: T[]): T[] {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
        return copy;
      }

      const activeWords = [q.targetWord];
      const otherWords = vocabList.filter(v => v.word.toLowerCase() !== q.targetWord.toLowerCase()).map(v => v.word);
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

      setMemoryCards(seededShuffle(cards));
      setSelectedCards([]);
    }
  };

  const recordAnswer = (studentAns: string, isCorrect: boolean, customCorrectAns?: string) => {
    const currentQ = questions[currentQIndex];
    if (!currentQ) return;
    const correctAnswer = customCorrectAns || currentQ.correctAnswer;
    const explanation = currentQ.explanation;

    const newAnswer: UserAnswer = {
      questionNumber: currentQIndex + 1,
      questionType: isCommunicationLesson ? 'Choose Correct' : selectedGame,
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

  const handleSelectOption = (option: string) => {
    if (isAnswerCorrect !== null) return;
    setSelectedOption(option);
    soundFX.playClick();
  };

  const handleLetterClick = (letter: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();
    if (unscrambleInput.length < currentQuestion.targetWord.length) {
      setUnscrambleInput(prev => [...prev, letter]);
    }
  };

  const handleResetPuzzle = () => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();
    setUnscrambleInput([]);
  };

  // Memory Card Click with Undo & Lockouts
  const handleCardClick = (cardId: number) => {
    if (isAnswerCorrect !== null || isCheckingMemory) return;
    const card = memoryCards.find(c => c.id === cardId);
    if (!card || card.matched) return;

    soundFX.playClick();

    if (selectedCards.includes(cardId)) {
      // Undo: flip back face down
      setMemoryCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: false } : c));
      setSelectedCards(prev => prev.filter(id => id !== cardId));
    } else {
      // Flip face up
      setMemoryCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c));
      const newSelected = [...selectedCards, cardId];
      setSelectedCards(newSelected);

      if (newSelected.length === 2) {
        setIsCheckingMemory(true);
        const cardA = memoryCards.find(c => c.id === newSelected[0])!;
        const cardB = memoryCards.find(c => c.id === cardId)!;

        const isMatch = cardA.value.toLowerCase() === cardB.value.toLowerCase() && cardA.type !== cardB.type;

        setTimeout(() => {
          if (isMatch) {
            soundFX.playStar();
            setMemoryCards(prev => prev.map(c =>
              c.id === cardA.id || c.id === cardB.id ? { ...c, matched: true } : c
            ));
          } else {
            // Mismatch: flip back face down after 1.2s delay
            setMemoryCards(prev => prev.map(c =>
              c.id === cardA.id || c.id === cardB.id ? { ...c, flipped: false } : c
            ));
          }
          setSelectedCards([]);
          setIsCheckingMemory(false);
        }, 1200);
      }
    }
  };

  // Matching selections with visual hyphens
  const handleMatchingLeft = (item: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();

    if (tempPairs[item]) {
      const updated = { ...tempPairs };
      delete updated[item];
      setTempPairs(updated);
      setLeftSelected(null);
      return;
    }

    setLeftSelected(item);
    if (rightSelected) {
      addConnection(item, rightSelected);
    }
  };

  const handleMatchingRight = (item: string) => {
    if (isAnswerCorrect !== null) return;
    soundFX.playClick();

    const connectedWord = Object.keys(tempPairs).find(k => tempPairs[k] === item);
    if (connectedWord) {
      const updated = { ...tempPairs };
      delete updated[connectedWord];
      setTempPairs(updated);
      setRightSelected(null);
      return;
    }

    setRightSelected(item);
    if (leftSelected) {
      addConnection(leftSelected, item);
    }
  };

  const addConnection = (left: string, right: string) => {
    setTempPairs(prev => ({ ...prev, [left]: right }));
    setLeftSelected(null);
    setRightSelected(null);
    soundFX.playStar();
  };

  // Safe fail for stability checks (placed before state dependencies to prevent crashes on initial render)
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md text-center max-w-lg mx-auto my-6 animate-fadeIn">
        <p className="text-slate-500 font-extrabold text-sm mb-2">⏳ Đang tải bài tập...</p>
        <p className="text-xs text-slate-400 font-semibold mb-4">Đang chuẩn bị câu hỏi luyện tập cho bài học...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0 || !questions[currentQIndex]) {
    return (
      <div className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md text-center max-w-lg mx-auto my-6 animate-fadeIn">
        <p className="text-red-500 font-extrabold text-sm mb-2">⚠️ Lỗi tải bài tập luyện tập</p>
        <p className="text-xs text-slate-500 font-semibold mb-4">Đang chuẩn bị câu hỏi luyện tập cho bài học...</p>
        <button
          onClick={generateQuestions}
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-2 rounded-xl transition-all shadow-xs"
        >
          Tải lại câu hỏi
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];

  const isReadyToSubmit = (() => {
    if (!currentQuestion) return false;
    if (isCommunicationLesson) return selectedOption !== null;
    if (selectedGame === 'pictureQuiz' || selectedGame === 'chooseCorrect' || selectedGame === 'oddOneOut') {
      return selectedOption !== null;
    }
    if (selectedGame === 'wordPuzzle') {
      const targetLen = currentQuestion.targetWord ? currentQuestion.targetWord.replace(/\s+/g, '').length : 0;
      return unscrambleInput.length === targetLen;
    }
    if (selectedGame === 'matchingGame') {
      return Object.keys(tempPairs).length === 3;
    }
    if (selectedGame === 'memoryGame') {
      // Memory game is submitted once all cards are matched
      return memoryCards && memoryCards.length > 0 && memoryCards.every(c => c.matched);
    }
    return false;
  })();

  const handleSubmitAnswer = () => {
    if (isAnswerCorrect !== null || !isReadyToSubmit) return;

    if (isCommunicationLesson) {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      setIsAnswerCorrect(isCorrect);
      recordAnswer(selectedOption || '', isCorrect, currentQuestion.correctAnswer);
      if (isCorrect) {
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        soundFX.playClick();
      }
      return;
    }

    if (selectedGame === 'pictureQuiz' || selectedGame === 'chooseCorrect' || selectedGame === 'oddOneOut') {
      let target = currentQuestion.correctAnswer;
      if (selectedGame === 'oddOneOut') {
        target = currentQuestion.oddChoices?.find(choice => ODD_WORDS.includes(choice)) || '';
      }
      const isCorrect = selectedOption === target;

      setIsAnswerCorrect(isCorrect);
      recordAnswer(selectedOption || '', isCorrect, target);

      if (isCorrect) {
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        soundFX.playClick();
      }
    } else if (selectedGame === 'wordPuzzle') {
      const spelled = unscrambleInput.join('');
      const targetClean = (currentQuestion?.targetWord || '').replace(/\s+/g, '');
      const isCorrect = spelled.toLowerCase() === targetClean.toLowerCase();

      setIsAnswerCorrect(isCorrect);
      recordAnswer(spelled, isCorrect);

      if (isCorrect) {
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        soundFX.playClick();
      }
    } else if (selectedGame === 'matchingGame') {
      const startIndex = Math.min(currentQIndex, 7);
      const matchingWords = Array.from(new Set(questions.slice(startIndex, startIndex + 3).map(q => q.targetWord)));

      let allCorrect = true;
      matchingWords.forEach(w => {
        const vocabItem = vocabList.find(v => v.word.toLowerCase() === w.toLowerCase());
        const correctMeaningVi = vocabItem ? vocabItem.meaningVi : '';
        if (tempPairs[w] !== correctMeaningVi) {
          allCorrect = false;
        }
      });

      setIsAnswerCorrect(allCorrect);
      recordAnswer('Custom Match Pairings', allCorrect);

      // Force correct answers display
      const correctPairs: Record<string, string> = {};
      matchingWords.forEach(w => {
        const vocabItem = vocabList.find(v => v.word.toLowerCase() === w.toLowerCase());
        correctPairs[w] = vocabItem ? vocabItem.meaningVi : '';
      });
      setTempPairs(correctPairs);

      if (allCorrect) {
        soundFX.playCorrect();
        onCorrectAnswer();
      } else {
        soundFX.playClick();
      }
    } else if (selectedGame === 'memoryGame') {
      // If we reach here, all cards are verified matched!
      setIsAnswerCorrect(true);
      soundFX.playCorrect();
      onCorrectAnswer();
      recordAnswer('Matched all cards', true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setUnscrambleInput([]);
    setLeftSelected(null);
    setRightSelected(null);
    setTempPairs({});
    setIsCheckingMemory(false);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      soundFX.playFanfare();
      setShowSummary(true);
    }
  };

  const handleTryAgain = () => {
    soundFX.playClick();
    setUserAnswers([]);
    setShowSummary(false);
    setCurrentQIndex(0);

    const rng = createSeededRandom(lesson.id || 'default-seed');
    function seededShuffle<T>(arr: T[]): T[] {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }

    const games: MiniGameType[] = ['pictureQuiz', 'wordPuzzle', 'chooseCorrect', 'memoryGame', 'matchingGame', 'oddOneOut'];
    const shuffledGames = seededShuffle(games);
    setGame1(shuffledGames[0]);
    setGame2(shuffledGames[1]);
    setSelectedGame(shuffledGames[0]);

    generateQuestions();
  };

  const handleContinueToSpeaking = () => {
    soundFX.playClick();
    const correctCount = userAnswers.filter(ans => ans.isCorrect).length;
    const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    onGameCompleted(scorePercentage);
  };



  // RENDER RESULTS SUMMARY
  if (showSummary) {
    const correctCount = userAnswers.filter(ans => ans.isCorrect).length;
    const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const incorrectAnswers = userAnswers.filter(ans => !ans.isCorrect);

    return (
      <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px] animate-fadeIn">
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

        <div className="flex-1 flex flex-col items-center py-2 space-y-4">
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
            <div className="w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 block uppercase">STARS</span>
              <span className="text-3xl font-black flex items-center gap-1">
                <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
                +{correctCount}
              </span>
            </div>
          </div>

          <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <h4 className="text-xs font-black text-slate-700 uppercase mb-3">Review Mistakes (Xem lại câu sai)</h4>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
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
                  <span>Excellent! Perfect {correctCount}/{questions.length} Score! 🌟</span>
                </div>
              )}
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

  return (
    <div id="interactive-game-container" className="bg-white rounded-3xl p-6 border-2 border-red-100 shadow-md max-w-2xl mx-auto my-2 text-center flex flex-col justify-between min-h-[460px]">
      <div className="flex items-center justify-between mb-4 border-b border-red-50 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <span className="font-black text-slate-800 text-sm md:text-base capitalize">
            Game Mode: {isCommunicationLesson ? 'Communication' : selectedGame.replace(/([A-Z])/g, ' $1')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 shadow-2xs">
          <span>Question {currentQIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-2">
        {isCommunicationLesson ? (
          <div className="flex flex-col items-center gap-5">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Complete the conversation.
            </span>
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 max-w-md w-full my-4">
              <h4 className="text-xl font-black text-slate-800 leading-relaxed whitespace-pre-line text-left">
                {currentQuestion?.sentencePattern || ''}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {(currentQuestion?.choices || []).map((choice, idx) => {
                const isSelected = selectedOption === choice;
                const isTarget = choice === currentQuestion?.correctAnswer;
                
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
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* PICTURE QUIZ */}
            {selectedGame === 'pictureQuiz' && (
          <div className="flex flex-col items-center gap-5">
            <div className="text-8xl select-none p-4 bg-amber-50 rounded-full border-2 border-amber-200 animate-bounce">
              {currentQuestion?.emoji || '🔤'}
            </div>
            <h4 className="text-xl font-black text-slate-800 mt-2">What is this in English?</h4>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {(currentQuestion?.choices || []).map((choice, idx) => {
                const isSelected = selectedOption === choice;
                const isTarget = choice === currentQuestion?.correctAnswer;
                
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
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* WORD PUZZLE */}
        {selectedGame === 'wordPuzzle' && (
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Unscramble the word!
            </span>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <p className="text-2xl font-black text-amber-800">{currentQuestion?.emoji || '🔤'}</p>
              {currentQuestion?.hintImage ? (
                <div className="flex items-center justify-center mt-1.5 text-2xl" title="Hint">
                  {currentQuestion.hintImage}
                </div>
              ) : (
                currentQuestion?.meaningVi && <p className="text-sm font-extrabold text-slate-600 mt-1">Hint: {currentQuestion.meaningVi}</p>
              )}
            </div>

            <div className="flex gap-2 min-h-[50px] border-b-2 border-dashed border-red-200 px-6 py-2 items-center relative">
              {unscrambleInput.map((letter, idx) => (
                <span key={idx} className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-black text-xl shadow-md capitalize animate-scaleUp">
                  {letter}
                </span>
              ))}
              {unscrambleInput.length === 0 && <span className="text-slate-400 font-semibold italic text-sm">Click letters below</span>}
              
              {unscrambleInput.length > 0 && isAnswerCorrect === null && (
                <button
                  onClick={handleResetPuzzle}
                  className="absolute right-[-45px] text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-black px-2.5 py-1 rounded-lg border border-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {(currentQuestion?.unscrambledLetters || []).map((letter, idx) => (
                <button
                  key={idx}
                  disabled={isAnswerCorrect !== null}
                  onClick={() => handleLetterClick(letter)}
                  className="w-11 h-11 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300 font-black text-lg shadow-xs flex items-center justify-center capitalize transition-all"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHOOSE CORRECT */}
        {selectedGame === 'chooseCorrect' && (
          <div className="flex flex-col items-center gap-5">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Fill in the Blank!
            </span>
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 max-w-md w-full">
              <h4 className="text-xl font-black text-slate-800 leading-relaxed">"{currentQuestion?.sentencePattern || ''}"</h4>
              {currentQuestion?.hintImage ? (
                <div className="flex items-center justify-center mt-2 text-2xl" title="Hint">
                  {currentQuestion.hintImage}
                </div>
              ) : (
                currentQuestion?.meaningVi && <p className="text-xs font-bold text-red-600 mt-2">Hint: ({currentQuestion.meaningVi})</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {(currentQuestion?.choices || []).map((choice, idx) => {
                const isSelected = selectedOption === choice;
                const isTarget = choice === currentQuestion?.correctAnswer;

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
                if (isAnswerCorrect !== null) {
                  if (isSelected) {
                    btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-rose-600 border-rose-600 text-white shadow-md';
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
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MEMORY MATCHING */}
        {selectedGame === 'memoryGame' && (
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-2">
              Match 3 Pairs! (Click a flipped card to undo)
            </span>
            <div className="grid grid-cols-3 gap-3 max-w-lg w-full justify-center px-2">
              {memoryCards.map((card) => {
                const isFlipped = card.flipped || card.matched;
                const isSelected = selectedCards.includes(card.id);
                const iconName = card.value.toLowerCase().replace(/\s+/g, '-');
                return (
                  <button
                    key={card.id}
                    disabled={card.matched || isAnswerCorrect !== null || (isCheckingMemory && !isSelected)}
                    onClick={() => handleCardClick(card.id)}
                    className={`w-20 h-20 sm:w-28 sm:h-28 rounded-3xl border-3 flex flex-col items-center justify-center font-black transition-all duration-300 transform active:scale-90 overflow-hidden relative ${
                      card.matched
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-inner ring-4 ring-emerald-100'
                        : isFlipped
                        ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-md'
                        : isSelected
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 shadow-sm'
                        : 'bg-gradient-to-tr from-red-500 to-rose-600 border-red-600 text-white text-3xl shadow-md hover:scale-[1.03]'
                    }`}
                  >
                    {isFlipped ? (
                      card.type === 'word' ? (
                        <span className="capitalize text-xs sm:text-sm font-extrabold px-1 truncate max-w-full text-center">
                          {card.value}
                        </span>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img
                            src={`https://img.icons8.com/color/256/${encodeURIComponent(iconName)}.png`}
                            alt={card.value}
                            className="w-[75%] h-[75%] object-contain"
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
                          <span className="fallback-emoji text-3xl font-normal hidden">
                            {EMOJI_MAP[(card.value || '').toLowerCase()] || '🔤'}
                          </span>
                        </div>
                      )
                    ) : (
                      <span className="text-2xl select-none">❓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MATCHING GAME WITH LANG SEPARATION */}
        {selectedGame === 'matchingGame' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-3">
              Match word with meaning! (Nối từ với nghĩa đúng)
            </span>
            <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto">
              {/* Words (Left) */}
              <div className="space-y-3">
                {(() => {
                  const startIndex = Math.min(currentQIndex, 7);
                  const matchingWords = Array.from(new Set((questions || []).slice(startIndex, startIndex + 3).map(q => q.targetWord)));
                  return matchingWords.map((word, idx) => {
                    const isMatched = !!tempPairs[word];
                    const isSelected = leftSelected === word;
                    
                    const displayLabel = word.charAt(0).toUpperCase() + word.slice(1);

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerCorrect !== null}
                        onClick={() => handleMatchingLeft(word)}
                        className={`w-full p-3 rounded-2xl border-2 font-black text-xs transition-all text-left flex justify-between items-center px-4 ${
                          isMatched
                            ? 'bg-red-50 border-red-300 text-red-700 shadow-2xs font-bold'
                            : isSelected
                            ? 'bg-red-500 border-red-500 text-white shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50'
                        }`}
                      >
                        <span className="capitalize">{displayLabel}</span>
                        {isMatched && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-bold">Connected</span>}
                      </button>
                    );
                  });
                })()}
              </div>

              {/* Meanings (Right) */}
              <div className="space-y-3">
                {(() => {
                  const startIndex = Math.min(currentQIndex, 7);
                  const matchingMeanings = Array.from(new Set(
                    (questions || []).slice(startIndex, startIndex + 3).map(q => {
                      const vocabItem = (vocabList || []).find(v => v.word.toLowerCase() === q.targetWord.toLowerCase());
                      return vocabItem ? vocabItem.meaningVi : q.targetWord;
                    })
                  )).sort();
                  return matchingMeanings.map((meaningVi, idx) => {
                    const isMatched = Object.values(tempPairs).includes(meaningVi);
                    const isSelected = rightSelected === meaningVi;
                    return (
                      <button
                        key={idx}
                        disabled={isAnswerCorrect !== null}
                        onClick={() => handleMatchingRight(meaningVi)}
                        className={`w-full p-3 rounded-2xl border-2 font-extrabold text-xs transition-all text-center flex justify-between items-center px-4 ${
                          isMatched
                            ? 'bg-red-50 border-red-300 shadow-2xs text-red-700 font-bold'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                        }`}
                      >
                        <span className="capitalize">{meaningVi}</span>
                        {isMatched && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-bold">🔗</span>}
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
            <h4 className="text-xl font-black text-slate-800">One of these is NOT like the others! Tap it:</h4>
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {(currentQuestion?.oddChoices || []).map((choice, idx) => {
                const isSelected = selectedOption === choice;
                const isTarget = ODD_WORDS.includes(choice);
                
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-red-50/50 hover:border-red-300';
                if (isAnswerCorrect !== null) {
                  if (isSelected) {
                    btnStyle = isAnswerCorrect ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-rose-600 border-rose-600 text-white shadow-md';
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
                    className={`p-4 rounded-2xl border-2 text-base font-extrabold capitalize transition-all transform hover:scale-[1.02] active:scale-98 ${btnStyle}`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}
          </>
        )}
      </div>

      {/* Footer Feedback & Navigation */}
      <div className="mt-4 border-t border-red-50 pt-3 flex justify-center">
        {isAnswerCorrect === null ? (
          <button
            disabled={!isReadyToSubmit}
            onClick={handleSubmitAnswer}
            className="w-full max-w-md bg-red-600 hover:bg-red-700 disabled:bg-slate-100 disabled:text-slate-400 text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Submit Answer (Nộp bài)</span>
          </button>
        ) : (
          isAnswerCorrect === true ? (
            <div className="w-full bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn shadow-2xs">
              <div className="text-left space-y-1">
                <span className="font-extrabold text-xs sm:text-sm text-emerald-800">✅ Correct! Good job! (Chính xác!) ⭐</span>
                {selectedGame === 'matchingGame' && (
                  <p className="text-[11px] font-bold text-emerald-700">
                    {(() => {
                      const startIndex = Math.min(currentQIndex, 7);
                      const matchingWords = Array.from(new Set((questions || []).slice(startIndex, startIndex + 3).map(q => q.targetWord)));
                      return matchingWords.map(w => {
                        const vocabItem = (vocabList || []).find(v => v.word.toLowerCase() === w.toLowerCase());
                        const meaning = vocabItem ? vocabItem.meaningVi : '';
                        return `${w.charAt(0).toUpperCase() + w.slice(1)} = ${meaning}`;
                      }).join(', ');
                    })()}
                  </p>
                )}
              </div>
              <button
                onClick={handleNextQuestion}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
              >
                <span>Continue (Tiếp tục)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl text-rose-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn shadow-2xs">
              <div className="text-left space-y-1">
                <span className="font-extrabold text-xs sm:text-sm text-rose-800 block">❌ Incorrect (Chưa chính xác)</span>
                <p className="text-[11px] font-bold text-rose-700">
                  {selectedGame === 'matchingGame'
                    ? `Đáp án đúng: ` + (() => {
                        const startIndex = Math.min(currentQIndex, 7);
                        const matchingWords = Array.from(new Set((questions || []).slice(startIndex, startIndex + 3).map(q => q.targetWord)));
                        return matchingWords.map(w => {
                          const vocabItem = (vocabList || []).find(v => v.word.toLowerCase() === w.toLowerCase());
                          const meaning = vocabItem ? vocabItem.meaningVi : '';
                          return `${w.charAt(0).toUpperCase() + w.slice(1)} = ${meaning}`;
                        }).join(', ');
                      })()
                    : selectedGame === 'chooseCorrect' && currentQuestion?.sentencePattern
                    ? (currentQuestion.sentencePattern.includes('______')
                        ? `Mẫu câu đúng: "${currentQuestion.sentencePattern.replace('______', currentQuestion.targetWord)}" (Nghĩa: "${currentQuestion.meaningVi}").`
                        : `Mẫu câu đúng: "${currentQuestion.sentencePattern} ${currentQuestion.targetWord}" (Nghĩa: "${currentQuestion.meaningVi}").`)
                    : `Đáp án đúng là "${currentQuestion?.targetWord || ''}" vì từ này có nghĩa là "${currentQuestion?.meaningVi || ''}".`}
                </p>
              </div>
              <button
                onClick={handleNextQuestion}
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
              >
                <span>Continue (Tiếp tục)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
