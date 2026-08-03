import { PracticeQuestion } from '../../../types';

export const lesson4Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is a train?",
    image: "❓",
    vocabulary: "train",
    choices: ["🚂", "🚌", "🛻", "⛵"],
    options: ["🚂", "🚌", "🛻", "⛵"],
    correctAnswer: "🚂",
    explanation: "train = tàu hỏa",
    hintImage: "❓"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which one is a boat?",
    image: "❓",
    vocabulary: "boat",
    choices: ["⛵", "🚂", "🚌", "🛻"],
    options: ["⛵", "🚂", "🚌", "🛻"],
    correctAnswer: "⛵",
    explanation: "boat = thuyền",
    hintImage: "❓"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Which one is fast?",
    image: "❓",
    vocabulary: "fast",
    choices: ["⚡", "🐢", "📢", "🤫"],
    options: ["⚡", "🐢", "📢", "🤫"],
    correctAnswer: "⚡",
    explanation: "fast = nhanh",
    hintImage: "❓"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is this a fast train?",
    image: "🚂⚡",
    vocabulary: "train",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "Yes, it is.",
    explanation: "train = tàu hỏa",
    hintImage: "🚂⚡"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Is this a small car?",
    image: "🐘",
    vocabulary: "small",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "elephant = con voi",
    hintImage: "🐘"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🚌🧓",
    vocabulary: "bus",
    choices: ["This is an old bus.", "This is a new bus.", "This is a fast train.", "This is a slow boat."],
    options: ["This is an old bus.", "This is a new bus.", "This is a fast train.", "This is a slow boat."],
    correctAnswer: "This is an old bus.",
    explanation: "old bus = xe buýt cũ",
    hintImage: "🚌🧓"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🛻🆕",
    vocabulary: "truck",
    choices: ["This is a new truck.", "This is an old truck.", "This is a quiet train.", "This is a noisy boat."],
    options: ["This is a new truck.", "This is an old truck.", "This is a quiet train.", "This is a noisy boat."],
    correctAnswer: "This is a new truck.",
    explanation: "new truck = xe tải mới",
    hintImage: "🛻🆕"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "That is a long ______.",
    image: "🚂",
    vocabulary: "train",
    choices: ["train", "bus", "truck", "boat"],
    options: ["train", "bus", "truck", "boat"],
    correctAnswer: "train",
    explanation: "train = tàu hỏa",
    hintImage: "🚂"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "It is a fast ______.",
    image: "🚗⚡",
    vocabulary: "car",
    choices: ["car", "truck", "train", "boat"],
    options: ["car", "truck", "train", "boat"],
    correctAnswer: "car",
    explanation: "car = xe ô tô",
    hintImage: "🚗⚡"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Choose the different item.",
    image: "❓",
    vocabulary: "quiet",
    choices: ["🚌", "🛻", "🚂", "🤫"],
    options: ["🚌", "🛻", "🚂", "🤫"],
    correctAnswer: "🤫",
    explanation: "quiet = im lặng",
    hintImage: "❓"
  }
];
