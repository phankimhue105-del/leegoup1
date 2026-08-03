import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Is it a doll?",
    image: "🧸",
    vocabulary: "doll",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là búp bê.",
    hintImage: "🧸",
    unscrambledLetters: ["o", "l", "l", "d"],
    oddChoices: ["cars", "dinosaur", "ball", "doll"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Is it a kite?",
    image: "⚽",
    vocabulary: "ball",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là quả bóng.",
    hintImage: "⚽",
    unscrambledLetters: ["l", "a", "l", "b"],
    oddChoices: ["cars", "dinosaur", "ball", "dolls"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it a kite?",
    image: "🪁",
    vocabulary: "kite",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là con diều.",
    hintImage: "🪁",
    unscrambledLetters: ["t", "e", "i", "k"],
    oddChoices: ["kite", "ball", "car", "alien"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it a doll?",
    image: "🚗",
    vocabulary: "car",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là ô tô.",
    hintImage: "🚗",
    unscrambledLetters: ["r", "a", "c"],
    oddChoices: ["car", "kite", "doll", "spaceship"]
  }
];
