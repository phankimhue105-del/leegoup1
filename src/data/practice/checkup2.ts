import { PracticeQuestion, SpeakingTask } from '../../types';

export const checkup2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is a puzzle?",
    image: "❓",
    vocabulary: "puzzle",
    choices: ["🧩", "🃏", "🧱", "🎮"],
    options: ["🧩", "🃏", "🧱", "🎮"],
    correctAnswer: "🧩",
    explanation: "puzzle = trò chơi ghép hình",
    hintImage: "❓"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which one is pizza?",
    image: "❓",
    vocabulary: "pizza",
    choices: ["🍕", "🍎", "🍌", "🍪"],
    options: ["🍕", "🍎", "🍌", "🍪"],
    correctAnswer: "🍕",
    explanation: "pizza = bánh pizza",
    hintImage: "❓"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Do you like fish?",
    image: "🐟 😊",
    vocabulary: "fish",
    choices: ["Yes, I do.", "No, I don't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, I do.", "No, I don't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, I do.",
    explanation: "Yes, I do. = Có.",
    hintImage: "🐟 😊"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it a ball?",
    image: "🚗",
    vocabulary: "car",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "car = xe ô tô",
    hintImage: "🚗"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🪁🪁",
    vocabulary: "kites",
    choices: ["Two kites.", "One kite.", "Three kites.", "Four kites."],
    options: ["Two kites.", "One kite.", "Three kites.", "Four kites."],
    correctAnswer: "Two kites.",
    explanation: "two kites = hai con diều",
    hintImage: "🪁🪁"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🍞",
    vocabulary: "bread",
    choices: ["I like bread.", "I like juice.", "I like chicken.", "I like fish."],
    options: ["I like bread.", "I like juice.", "I like chicken.", "I like fish."],
    correctAnswer: "I like bread.",
    explanation: "bread = bánh mì",
    hintImage: "🍞"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "I don't like ______.",
    image: "🥛",
    vocabulary: "milk",
    choices: ["milk", "chicken", "fish", "rice"],
    options: ["milk", "chicken", "fish", "rice"],
    correctAnswer: "milk",
    explanation: "milk = sữa",
    hintImage: "🥛"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "Count the ______.",
    image: "🧱🧱🧱",
    vocabulary: "blocks",
    choices: ["blocks", "puzzles", "cards", "games"],
    options: ["blocks", "puzzles", "cards", "games"],
    correctAnswer: "blocks",
    explanation: "blocks = những khối hình",
    hintImage: "🧱🧱🧱"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Choose the different item.",
    image: "❓",
    vocabulary: "car",
    choices: ["🍕", "🍗", "🐟", "🚗"],
    options: ["🍕", "🍗", "🐟", "🚗"],
    correctAnswer: "🚗",
    explanation: "car = xe ô tô",
    hintImage: "❓"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Teacher: Do you like apples?",
    image: "🍎",
    vocabulary: "apple",
    choices: ["Yes, I do.", "Yes, it is.", "No, it isn't.", "No, they aren't."],
    options: ["Yes, I do.", "Yes, it is.", "No, it isn't.", "No, they aren't."],
    correctAnswer: "Yes, I do.",
    explanation: "Yes, I do. = Có.",
    hintImage: "🍎"
  }
];

export const checkup2Speaking: SpeakingTask[] = [
  {
    number: 1,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "3️⃣",
    promptText: "three",
    targetPhrase: "three"
  },
  {
    number: 2,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "🍕",
    promptText: "pizza",
    targetPhrase: "pizza"
  },
  {
    number: 3,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🍗",
    promptText: "I like chicken.",
    targetPhrase: "I like chicken."
  },
  {
    number: 4,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🥛",
    promptText: "I don't like milk.",
    targetPhrase: "I don't like milk."
  },
  {
    number: 5,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🎂7️⃣",
    teacherQuestion: "How old are you?",
    promptText: "I'm seven.",
    targetPhrase: "I'm seven."
  },
  {
    number: 6,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🐟",
    teacherQuestion: "Do you like fish?",
    promptText: "Yes, I do.",
    targetPhrase: "Yes, I do."
  },
  {
    number: 7,
    type: "describe_picture",
    instruction: "Describe the picture!",
    emoji: "🚗🚗🚗",
    promptText: "I see three cars.",
    targetPhrase: "I see three cars."
  },
  {
    number: 8,
    type: "conversation",
    instruction: "Complete the conversation!",
    emoji: "🧃",
    teacherQuestion: "Here you are.",
    promptText: "Thank you.",
    targetPhrase: "Thank you."
  }
];
