import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Is it red?",
    image: "🔴",
    vocabulary: "red",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó màu đỏ.",
    hintImage: "🔴",
    unscrambledLetters: ["d", "e", "r"],
    oddChoices: ["red", "blue", "white", "wizard"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Is it red?",
    image: "🟡",
    vocabulary: "yellow",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó màu vàng.",
    hintImage: "🟡",
    unscrambledLetters: ["w", "l", "e", "y", "o", "l"],
    oddChoices: ["yellow", "blue", "white", "wizard"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it blue?",
    image: "🔵",
    vocabulary: "blue",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó màu xanh dương.",
    hintImage: "🔵",
    unscrambledLetters: ["u", "l", "e", "b"],
    oddChoices: ["blue", "red", "yellow", "octopus"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it blue?",
    image: "⚪",
    vocabulary: "white",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó màu trắng.",
    hintImage: "⚪",
    unscrambledLetters: ["e", "t", "i", "h", "w"],
    oddChoices: ["white", "blue", "red", "guitar"]
  }
];
