import React from 'react';
import { PracticeQuestion } from '../../../types';

const WhitePaperSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 280',
  style: { width: '100%', height: '100%', maxHeight: '150px', display: 'block', margin: 'auto' }
}, [
  React.createElement('filter', { id: 'shadow-paper', key: 'f' }, 
    React.createElement('feDropShadow', { dx: 2, dy: 4, stdDeviation: 4, floodColor: '#000000', floodOpacity: 0.15 })
  ),
  React.createElement('rect', {
    key: 'r',
    x: 30,
    y: 30,
    width: 140,
    height: 220,
    rx: 4,
    ry: 4,
    fill: '#FFFFFF',
    stroke: '#D1D5DB',
    strokeWidth: 1,
    filter: 'url(#shadow-paper)'
  })
]);

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Is it red?",
    image: "🔴",
    vocabulary: "red",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó màu đỏ.",
    hintImage: "🔴",
    unscrambledLetters: ["d", "e", "r"],
    oddChoices: ["red", "blue", "white", "wizard"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Is it red?",
    image: "🟡",
    vocabulary: "yellow",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó màu vàng.",
    hintImage: "🟡",
    unscrambledLetters: ["w", "l", "e", "y", "o", "l"],
    oddChoices: ["yellow", "blue", "white", "wizard"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it blue?",
    image: "🔵",
    vocabulary: "blue",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó màu xanh dương.",
    hintImage: "🔵",
    unscrambledLetters: ["u", "l", "e", "b"],
    oddChoices: ["blue", "red", "yellow", "octopus"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it blue?",
    image: WhitePaperSVG as any,
    vocabulary: "white",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó màu trắng.",
    hintImage: WhitePaperSVG as any,
    unscrambledLetters: ["e", "t", "i", "h", "w"],
    oddChoices: ["white", "blue", "red", "guitar"]
  }
];
