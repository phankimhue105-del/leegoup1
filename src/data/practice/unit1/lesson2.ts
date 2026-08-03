import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Is it a notebook?",
    image: "📓",
    vocabulary: "notebook",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là quyển vở.",
    hintImage: "📓",
    unscrambledLetters: ["e", "n", "o", "k", "b", "o", "t", "o"],
    oddChoices: ["alien", "desk", "notebook", "pencil"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Is it a chair?",
    image: "✏️",
    vocabulary: "pencil",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là cái bút chì.",
    hintImage: "✏️",
    unscrambledLetters: ["l", "i", "c", "n", "e", "p"],
    oddChoices: ["book", "guitar", "notebook", "pencil"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it a chair?",
    image: "🪑",
    vocabulary: "chair",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là cái ghế.",
    hintImage: "🪑",
    unscrambledLetters: ["i", "h", "a", "c", "r"],
    oddChoices: ["chair", "desk", "eraser", "ruler"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it a notebook?",
    image: "🪑🏫",
    vocabulary: "desk",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là cái bàn học.",
    hintImage: "🪑🏫",
    unscrambledLetters: ["d", "e", "s", "k"],
    oddChoices: ["notebook", "pencil", "desk", "dinosaur"]
  }
];
