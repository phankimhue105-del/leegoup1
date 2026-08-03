import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "😊 Do you like juice?",
    image: "🧃",
    vocabulary: "juice",
    choices: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    options: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    correctAnswer: "Yes, I do.",
    explanation: "😊 Yes, I do. = Tôi thích nước ép.",
    hintImage: "🧃",
    unscrambledLetters: ["j", "u", "i", "c", "e"],
    oddChoices: ["juice", "chicken", "fish", "dinosaur"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "😞 Do you like chicken?",
    image: "🍗",
    vocabulary: "chicken",
    choices: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    options: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    correctAnswer: "No, I don't.",
    explanation: "😞 No, I don't. = Tôi không thích thịt gà.",
    hintImage: "🍗",
    unscrambledLetters: ["c", "h", "i", "c", "k", "e", "n"],
    oddChoices: ["chicken", "juice", "fish", "spaceship"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "😊 Do you like fish?",
    image: "🐟",
    vocabulary: "fish",
    choices: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    options: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    correctAnswer: "Yes, I do.",
    explanation: "😊 Yes, I do. = Tôi thích cá.",
    hintImage: "🐟",
    unscrambledLetters: ["f", "i", "s", "h"],
    oddChoices: ["fish", "chicken", "juice", "guitar"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "😞 Do you like ice cream?",
    image: "🍦",
    vocabulary: "ice cream",
    choices: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    options: [
      "Yes, I do.",
      "No, I don't.",
      "Yes, I am.",
      "No, I can't."
    ],
    correctAnswer: "No, I don't.",
    explanation: "😞 No, I don't. = Tôi không thích kem.",
    hintImage: "🍦",
    unscrambledLetters: ["i", "c", "e", "c", "r", "e", "a", "m"],
    oddChoices: ["ice cream", "fish", "chicken", "wizard"]
  }
];
