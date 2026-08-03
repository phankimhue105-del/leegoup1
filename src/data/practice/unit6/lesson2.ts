import { PracticeQuestion } from '../../../types';

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Are they snakes?",
    image: "🐍🐍",
    vocabulary: "snake",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "Yes, they are. = Đúng vậy, chúng là những con rắn.",
    hintImage: "🐍🐍",
    unscrambledLetters: ["k", "e", "n", "a", "s"],
    oddChoices: ["snake", "zebra", "alien", "giraffe"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Are they snakes?",
    image: "🦒🦒",
    vocabulary: "giraffe",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "No, they aren't.",
    explanation: "No, they aren't. = Không phải, chúng là hươu cao cổ.",
    hintImage: "🦒🦒",
    unscrambledLetters: ["a", "f", "i", "r", "e", "f", "g"],
    oddChoices: ["giraffe", "zebra", "alien", "snake"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Are they zebras?",
    image: "🦓🦓",
    vocabulary: "zebra",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "Yes, they are. = Đúng vậy, chúng là những con ngựa vằn.",
    hintImage: "🦓🦓",
    unscrambledLetters: ["z", "e", "b", "r", "a"],
    oddChoices: ["zebra", "snake", "guitar", "giraffe"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Are they zebras?",
    image: "🦁🦁",
    vocabulary: "lion",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "No, they aren't.",
    explanation: "No, they aren't. = Không phải, chúng là sư tử.",
    hintImage: "🦁🦁",
    unscrambledLetters: ["l", "i", "o", "n"],
    oddChoices: ["lion", "zebra", "alien", "snake"]
  }
];
