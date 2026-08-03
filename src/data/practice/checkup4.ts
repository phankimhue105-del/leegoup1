import { PracticeQuestion, SpeakingTask } from '../../types';

export const checkup4Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is a hand?",
    image: "❓",
    vocabulary: "hand",
    choices: ["✋", "💪", "🦵", "🦶"],
    options: ["✋", "💪", "🦵", "🦶"],
    correctAnswer: "✋",
    explanation: "hand = bàn tay",
    hintImage: "❓"
  },
  {
    id: 2,
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
    id: 3,
    type: "multiple_choice",
    question: "Are these my eyes?",
    image: "👁️👁️",
    vocabulary: "eye",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "Yes, they are.",
    hintImage: "👁️👁️"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is this a new truck?",
    image: "🛻🧓",
    vocabulary: "old",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "No, it isn't.",
    explanation: "old = cũ",
    hintImage: "🛻🧓"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🧼👦",
    vocabulary: "wash my face",
    choices: ["I can wash my face.", "I can wash my hands.", "I can brush my hair.", "I can brush my teeth."],
    options: ["I can wash my face.", "I can wash my hands.", "I can brush my hair.", "I can brush my teeth."],
    correctAnswer: "I can wash my face.",
    explanation: "wash my face = rửa mặt",
    hintImage: "🧼👦"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🚂⚡",
    vocabulary: "fast",
    choices: ["This is a fast train.", "This is a slow train.", "This is a quiet boat.", "This is a noisy truck."],
    options: ["This is a fast train.", "This is a slow train.", "This is a quiet boat.", "This is a noisy truck."],
    correctAnswer: "This is a fast train.",
    explanation: "fast train = tàu hỏa nhanh",
    hintImage: "🚂⚡"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "This is my ______.",
    image: "💪",
    vocabulary: "arm",
    choices: ["arm", "hand", "finger", "leg"],
    options: ["arm", "hand", "finger", "leg"],
    correctAnswer: "arm",
    explanation: "arm = cánh tay",
    hintImage: "💪"
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
    question: "Choose the different item.",
    image: "❓",
    vocabulary: "bus",
    choices: ["👁️", "👂", "👃", "🚌"],
    options: ["👁️", "👂", "👃", "🚌"],
    correctAnswer: "🚌",
    explanation: "bus = xe buýt",
    hintImage: "❓"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Teacher: Please be quiet.",
    image: "🤫",
    vocabulary: "quiet",
    choices: ["OK. I'm sorry.", "Yes, I do.", "No, I don't.", "Thank you."],
    options: ["OK. I'm sorry.", "Yes, I do.", "No, I don't.", "Thank you."],
    correctAnswer: "OK. I'm sorry.",
    explanation: "OK. I'm sorry.",
    hintImage: "🤫"
  }
];

export const checkup4Speaking: SpeakingTask[] = [
  {
    number: 1,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "✋",
    promptText: "hand",
    targetPhrase: "hand"
  },
  {
    number: 2,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "🚂",
    promptText: "train",
    targetPhrase: "train"
  },
  {
    number: 3,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "💪",
    promptText: "This is my arm.",
    targetPhrase: "This is my arm."
  },
  {
    number: 4,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🧼👦",
    promptText: "I can wash my face.",
    targetPhrase: "I can wash my face."
  },
  {
    number: 5,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "👁️👁️",
    teacherQuestion: "Are these my eyes?",
    promptText: "Yes, they are.",
    targetPhrase: "Yes, they are."
  },
  {
    number: 6,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🚂⚡",
    teacherQuestion: "Is this a fast train?",
    promptText: "Yes, it is.",
    targetPhrase: "Yes, it is."
  },
  {
    number: 7,
    type: "describe_picture",
    instruction: "Describe the picture!",
    emoji: "🛻🆕",
    promptText: "This is a new truck.",
    targetPhrase: "This is a new truck."
  },
  {
    number: 8,
    type: "conversation",
    instruction: "Complete the conversation!",
    emoji: "🤫",
    teacherQuestion: "Please be quiet.",
    promptText: "OK. I'm sorry.",
    targetPhrase: "OK. I'm sorry."
  }
];
