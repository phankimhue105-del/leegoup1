import React from 'react';
import { PracticeQuestion, SpeakingTask } from '../../types';

const MonkeyInTreeSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'monkey-tree-scene' }, [
    // Tree trunk
    React.createElement('rect', { x: 90, y: 110, width: 20, height: 60, fill: '#78350F', key: 'trunk' }),
    // Green canopy
    React.createElement('circle', { cx: 100, cy: 75, r: 60, fill: '#10B981', key: 'leaves' }),
    React.createElement('circle', { cx: 70, cy: 60, r: 40, fill: '#059669', key: 'leaves-left' }),
    React.createElement('circle', { cx: 130, cy: 60, r: 40, fill: '#059669', key: 'leaves-right' }),
    // Monkey head sitting INSIDE the leaves
    React.createElement('g', { transform: 'translate(80, 50)', key: 'monkey' }, [
      React.createElement('circle', { cx: 5, cy: 20, r: 8, fill: '#8B5A2B', key: 'ear-l' }),
      React.createElement('circle', { cx: 5, cy: 20, r: 4, fill: '#FBCFE8', key: 'ear-li' }),
      React.createElement('circle', { cx: 35, cy: 20, r: 8, fill: '#8B5A2B', key: 'ear-r' }),
      React.createElement('circle', { cx: 35, cy: 20, r: 4, fill: '#FBCFE8', key: 'ear-ri' }),
      React.createElement('circle', { cx: 20, cy: 20, r: 15, fill: '#8B5A2B', key: 'head' }),
      React.createElement('ellipse', { cx: 20, cy: 23, rx: 11, ry: 9, fill: '#FED7AA', key: 'face' }),
      React.createElement('circle', { cx: 16, cy: 19, r: 2, fill: '#000000', key: 'eye-l' }),
      React.createElement('circle', { cx: 24, cy: 19, r: 2, fill: '#000000', key: 'eye-r' }),
      React.createElement('path', { d: 'M17 26 Q20 29 23 26', fill: 'none', stroke: '#000000', strokeWidth: 1.5, key: 'smile' })
    ]),
    // Floor
    React.createElement('line', { x1: 20, y1: 170, x2: 180, y2: 170, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' })
  ])
]);

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
    explanation: "Yes, I can. = Có.",
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
    explanation: "No, they can't. = Không.",
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
    image: MonkeyInTreeSVG as any,
    vocabulary: "monkey",
    choices: ["The monkey is in the tree.", "The monkey is under the tree.", "The monkey is on the rock.", "The monkey is in the river."],
    options: ["The monkey is in the tree.", "The monkey is under the tree.", "The monkey is on the rock.", "The monkey is in the river."],
    correctAnswer: "The monkey is in the tree.",
    explanation: "in the tree = ở trong cây",
    hintImage: MonkeyInTreeSVG as any
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
    explanation: "Sure. = Chắc chắn rồi.",
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
