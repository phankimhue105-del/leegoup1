import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Do you like juice?",
    image: "🧃",
    vocabulary: "juice",
    choices: [
      "Yes, I like juice.",
      "No, I don't like fish.",
      "I don't like chicken.",
      "Yes, I like rice."
    ],
    options: [
      "Yes, I like juice.",
      "No, I don't like fish.",
      "I don't like chicken.",
      "Yes, I like rice."
    ],
    correctAnswer: "Yes, I like juice.",
    explanation: "juice = nước ép. Yes, I like juice. = Vâng, tớ thích nước ép.",
    hintImage: "🧃",
    unscrambledLetters: ["j", "u", "i", "c", "e"],
    oddChoices: ["juice", "chicken", "fish", "dinosaur"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Do you like chicken?",
    image: "🍗",
    vocabulary: "chicken",
    choices: [
      "I like chicken.",
      "I don't like fish.",
      "Yes, I like juice.",
      "No, I like ice cream."
    ],
    options: [
      "I like chicken.",
      "I don't like fish.",
      "Yes, I like juice.",
      "No, I like ice cream."
    ],
    correctAnswer: "I like chicken.",
    explanation: "chicken = thịt gà. I like chicken. = Tớ thích thịt gà.",
    hintImage: "🍗",
    unscrambledLetters: ["c", "h", "i", "c", "k", "e", "n"],
    oddChoices: ["chicken", "juice", "fish", "spaceship"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Do you like fish?",
    image: "🐟",
    vocabulary: "fish",
    choices: [
      "I don't like fish.",
      "I like chicken.",
      "Yes, I like juice.",
      "No, I like ice cream."
    ],
    options: [
      "I don't like fish.",
      "I like chicken.",
      "Yes, I like juice.",
      "No, I like ice cream."
    ],
    correctAnswer: "I don't like fish.",
    explanation: "fish = cá. I don't like fish. = Tớ không thích cá.",
    hintImage: "🐟",
    unscrambledLetters: ["f", "i", "s", "h"],
    oddChoices: ["fish", "chicken", "juice", "guitar"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Do you like ice cream?",
    image: "🍦",
    vocabulary: "ice cream",
    choices: [
      "I like ice cream.",
      "I don't like fish.",
      "Yes, I like juice.",
      "No, I like chicken."
    ],
    options: [
      "I like ice cream.",
      "I don't like fish.",
      "Yes, I like juice.",
      "No, I like chicken."
    ],
    correctAnswer: "I like ice cream.",
    explanation: "ice cream = kem. I like ice cream. = Tớ thích kem.",
    hintImage: "🍦",
    unscrambledLetters: ["i", "c", "e", "c", "r", "e", "a", "m"],
    oddChoices: ["ice cream", "fish", "chicken", "wizard"]
  }
];
