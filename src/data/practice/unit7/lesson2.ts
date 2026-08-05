import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "😊 😊 Are these my eyes?",
    image: "👁️👁️",
    vocabulary: "eye",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "😊 Yes, they are.\n→ Đúng.",
    hintImage: "👁️👁️",
    unscrambledLetters: ["y", "e", "e"],
    oddChoices: ["mouth", "eye", "volcano", "ear"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "😞 😞 Is this my nose?",
    image: "👃",
    vocabulary: "nose",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "😞 No, it isn't.\n→ Không phải.",
    hintImage: "👃",
    unscrambledLetters: ["s", "o", "n", "e"],
    oddChoices: ["mouth", "nose", "volcano", "ear"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "😊 😊 Is this my mouth?",
    image: "👄",
    vocabulary: "mouth",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "Yes, it is.",
    explanation: "😊 Yes, it is.\n→ Đúng.",
    hintImage: "👄",
    unscrambledLetters: ["m", "o", "u", "t", "h"],
    oddChoices: ["mouth", "eye", "eraser", "ear"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "😞 😞 Is this my ear?",
    image: "👂",
    vocabulary: "ear",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "😞 No, it isn't.\n→ Không phải.",
    hintImage: "👂",
    unscrambledLetters: ["e", "a", "r"],
    oddChoices: ["ear", "mouth", "nose", "dinosaur"]
  }
];
