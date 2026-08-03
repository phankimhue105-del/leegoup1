import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "😊 Is that car fast?",
    image: "⚡",
    vocabulary: "fast",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "😊 Yes, it is. = Đúng vậy, cái xe đó rất nhanh.",
    hintImage: "⚡",
    unscrambledLetters: ["s", "t", "a", "f"],
    oddChoices: ["slow", "quiet", "dinosaur", "fast"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "😞 Is that turtle slow?",
    image: "🐢",
    vocabulary: "slow",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "😞 No, it isn't. = Không phải, con rùa đó không chậm.",
    hintImage: "🐢",
    unscrambledLetters: ["l", "w", "o", "s"],
    oddChoices: ["slow", "quiet", "dinosaur", "fast"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "😊 Is that speaker noisy?",
    image: "📢",
    vocabulary: "noisy",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "😊 Yes, it is. = Đúng vậy, cái loa đó rất ồn ào.",
    hintImage: "📢",
    unscrambledLetters: ["n", "o", "i", "s", "y"],
    oddChoices: ["noisy", "quiet", "guitar", "fast"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "😞 Is that room quiet?",
    image: "🤫",
    vocabulary: "quiet",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "😞 No, it isn't. = Không phải, căn phòng đó không yên tĩnh.",
    hintImage: "🤫",
    unscrambledLetters: ["q", "u", "i", "e", "t"],
    oddChoices: ["quiet", "slow", "desk", "fast"]
  }
];
