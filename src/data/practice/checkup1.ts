import { PracticeQuestion, SpeakingTask } from '../../types';

export const checkup1Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is a pencil?",
    image: "❓",
    vocabulary: "pencil",
    choices: ["✏️", "🎒", "📏", "🧼"],
    options: ["✏️", "🎒", "📏", "🧼"],
    correctAnswer: "✏️",
    explanation: "pencil = bút chì",
    hintImage: "❓"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which one is yellow?",
    image: "❓",
    vocabulary: "yellow",
    choices: ["🟡", "🔴", "🔵", "⚫"],
    options: ["🟡", "🔴", "🔵", "⚫"],
    correctAnswer: "🟡",
    explanation: "yellow = màu vàng",
    hintImage: "❓"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it a circle?",
    image: "🔴",
    vocabulary: "circle",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is.",
    hintImage: "🔴"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is this a ruler?",
    image: "🎒",
    vocabulary: "backpack",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "backpack = ba lô",
    hintImage: "🎒"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "📖",
    vocabulary: "book",
    choices: ["This is a book.", "This is a chair.", "This is a desk.", "This is a pencil."],
    options: ["This is a book.", "This is a chair.", "This is a desk.", "This is a pencil."],
    correctAnswer: "This is a book.",
    explanation: "book = sách",
    hintImage: "📖"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🎨",
    vocabulary: "paint",
    choices: ["This is paint.", "This is paper.", "This is chalk.", "This is yarn."],
    options: ["This is paint.", "This is paper.", "This is chalk.", "This is yarn."],
    correctAnswer: "This is paint.",
    explanation: "paint = màu vẽ",
    hintImage: "🎨"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "It is a ______.",
    image: "📏",
    vocabulary: "ruler",
    choices: ["ruler", "pencil", "eraser", "backpack"],
    options: ["ruler", "pencil", "eraser", "backpack"],
    correctAnswer: "ruler",
    explanation: "ruler = thước kẻ",
    hintImage: "📏"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "This is a ______.",
    image: "🪑",
    vocabulary: "chair",
    choices: ["chair", "desk", "book", "notebook"],
    options: ["chair", "desk", "book", "notebook"],
    correctAnswer: "chair",
    explanation: "chair = cái ghế",
    hintImage: "🪑"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Choose the different item.",
    image: "❓",
    vocabulary: "circle",
    choices: ["✏️", "📓", "📖", "🔴"],
    options: ["✏️", "📓", "📖", "🔴"],
    correctAnswer: "🔴",
    explanation: "circle = hình tròn",
    hintImage: "❓"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Teacher: How are you?",
    image: "💬",
    vocabulary: "fine",
    choices: ["I'm fine. Thank you.", "Yes, it is.", "No, it isn't.", "Sure."],
    options: ["I'm fine. Thank you.", "Yes, it is.", "No, it isn't.", "Sure."],
    correctAnswer: "I'm fine. Thank you.",
    explanation: "I'm fine. Thank you.",
    hintImage: "💬"
  }
];

export const checkup1Speaking: SpeakingTask[] = [
  {
    number: 1,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "✏️",
    promptText: "pencil",
    targetPhrase: "pencil"
  },
  {
    number: 2,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "🔴",
    promptText: "circle",
    targetPhrase: "circle"
  },
  {
    number: 3,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "📏",
    promptText: "It is a ruler.",
    targetPhrase: "It is a ruler."
  },
  {
    number: 4,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🎨",
    promptText: "This is paint.",
    targetPhrase: "This is paint."
  },
  {
    number: 5,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "📖",
    teacherQuestion: "What is it?",
    promptText: "It's a book.",
    targetPhrase: "It's a book."
  },
  {
    number: 6,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🔴",
    teacherQuestion: "Is it a circle?",
    promptText: "Yes, it is.",
    targetPhrase: "Yes, it is."
  },
  {
    number: 7,
    type: "describe_picture",
    instruction: "Describe the picture!",
    emoji: "🔵🪑",
    promptText: "This is a blue chair.",
    targetPhrase: "This is a blue chair."
  },
  {
    number: 8,
    type: "conversation",
    instruction: "Complete the conversation!",
    emoji: "💬",
    teacherQuestion: "How are you?",
    promptText: "I'm fine. Thank you.",
    targetPhrase: "I'm fine. Thank you."
  }
];
