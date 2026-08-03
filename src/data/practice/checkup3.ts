import { PracticeQuestion, SpeakingTask } from '../../types';

export const checkup3Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is a turtle?",
    image: "❓",
    vocabulary: "turtle",
    choices: ["🐢", "🐸", "🕷️", "🐜"],
    options: ["🐢", "🐸", "🕷️", "🐜"],
    correctAnswer: "🐢",
    explanation: "turtle = con rùa",
    hintImage: "❓"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which one is a bear?",
    image: "❓",
    vocabulary: "bear",
    choices: ["🐻", "🐘", "🐒", "🐅"],
    options: ["🐻", "🐘", "🐒", "🐅"],
    correctAnswer: "🐻",
    explanation: "bear = con gấu",
    hintImage: "❓"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Can you see a spider?",
    image: "🕷️",
    vocabulary: "spider",
    choices: ["Yes, I can.", "No, I can't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, I can.", "No, I can't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, I can.",
    explanation: "Yes, I can.",
    hintImage: "🕷️"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Can snakes walk?",
    image: "🐍",
    vocabulary: "walk",
    choices: ["Yes, they can.", "No, they can't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they can.", "No, they can't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "No, they can't.",
    explanation: "No, they can't.",
    hintImage: "🐍"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🏊",
    vocabulary: "swim",
    choices: ["I can swim.", "I can run.", "I can hop.", "I can walk."],
    options: ["I can swim.", "I can run.", "I can hop.", "I can walk."],
    correctAnswer: "I can swim.",
    explanation: "swim = bơi",
    hintImage: "🏊"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🐒🌳",
    vocabulary: "monkey",
    choices: ["The monkey is in the tree.", "The monkey is under the tree.", "The monkey is on the rock.", "The monkey is in the river."],
    options: ["The monkey is in the tree.", "The monkey is under the tree.", "The monkey is on the rock.", "The monkey is in the river."],
    correctAnswer: "The monkey is in the tree.",
    explanation: "in the tree = ở trên cây",
    hintImage: "🐒🌳"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "I can see a ______.",
    image: "🏞️",
    vocabulary: "river",
    choices: ["river", "flower", "tree", "rock"],
    options: ["river", "flower", "tree", "rock"],
    correctAnswer: "river",
    explanation: "river = sông",
    hintImage: "🏞️"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "Zebras can ______.",
    image: "🏃",
    vocabulary: "run",
    choices: ["run", "swim", "hop", "walk"],
    options: ["run", "swim", "hop", "walk"],
    correctAnswer: "run",
    explanation: "run = chạy",
    hintImage: "🏃"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Choose the different item.",
    image: "❓",
    vocabulary: "pizza",
    choices: ["🐘", "🐒", "🐅", "🍕"],
    options: ["🐘", "🐒", "🐅", "🍕"],
    correctAnswer: "🍕",
    explanation: "pizza = bánh pizza",
    hintImage: "❓"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Teacher: Please help me.",
    image: "💬",
    vocabulary: "sure",
    choices: ["Sure.", "Yes, I do.", "No, I don't.", "Thank you."],
    options: ["Sure.", "Yes, I do.", "No, I don't.", "Thank you."],
    correctAnswer: "Sure.",
    explanation: "Sure.",
    hintImage: "💬"
  }
];

export const checkup3Speaking: SpeakingTask[] = [
  {
    number: 1,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "🌸",
    promptText: "flower",
    targetPhrase: "flower"
  },
  {
    number: 2,
    type: "repeat_word",
    instruction: "Repeat the word aloud!",
    emoji: "🐒",
    promptText: "monkey",
    targetPhrase: "monkey"
  },
  {
    number: 3,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🏞️",
    promptText: "I can see a river.",
    targetPhrase: "I can see a river."
  },
  {
    number: 4,
    type: "read_sentence",
    instruction: "Read the sentence aloud!",
    emoji: "🦓🏃",
    promptText: "Zebras can run.",
    targetPhrase: "Zebras can run."
  },
  {
    number: 5,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🐢",
    teacherQuestion: "Can you see a turtle?",
    promptText: "Yes, I can.",
    targetPhrase: "Yes, I can."
  },
  {
    number: 6,
    type: "answer_question",
    instruction: "Answer the question!",
    emoji: "🐍",
    teacherQuestion: "Can snakes walk?",
    promptText: "No, they can't.",
    targetPhrase: "No, they can't."
  },
  {
    number: 7,
    type: "describe_picture",
    instruction: "Describe the picture!",
    emoji: "🐒🌳",
    promptText: "The monkey is in the tree.",
    targetPhrase: "The monkey is in the tree."
  },
  {
    number: 8,
    type: "conversation",
    instruction: "Complete the conversation!",
    emoji: "💬",
    teacherQuestion: "Please help me.",
    promptText: "Sure.",
    targetPhrase: "Sure."
  }
];
