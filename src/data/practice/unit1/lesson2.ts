import React from 'react';
import { PracticeQuestion } from '../../../types';

const SchoolDeskSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'desk-scene' }, [
    // Floor line
    React.createElement('line', { x1: 20, y1: 160, x2: 180, y2: 160, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' }),
    // Desk metal legs
    React.createElement('rect', { x: 45, y: 80, width: 10, height: 80, fill: '#6B7280', key: 'leg-left' }),
    React.createElement('rect', { x: 145, y: 80, width: 10, height: 80, fill: '#6B7280', key: 'leg-right' }),
    // Support bar
    React.createElement('rect', { x: 45, y: 130, width: 110, height: 8, fill: '#4B5563', key: 'support-bar' }),
    // Cubby body
    React.createElement('rect', { x: 35, y: 65, width: 130, height: 20, fill: '#D97706', rx: 1, key: 'cubby' }),
    React.createElement('rect', { x: 40, y: 70, width: 120, height: 12, fill: '#92400E', rx: 1, key: 'cubby-opening' }),
    // Desk top
    React.createElement('rect', { x: 25, y: 55, width: 150, height: 12, fill: '#F59E0B', rx: 2, key: 'desk-top' }),
    // Pencil cup
    React.createElement('rect', { x: 50, y: 40, width: 12, height: 15, fill: '#3B82F6', rx: 1, key: 'cup' }),
    React.createElement('rect', { x: 52, y: 35, width: 2, height: 8, fill: '#10B981', key: 'pencil1' }),
    React.createElement('rect', { x: 57, y: 32, width: 2, height: 11, fill: '#EF4444', key: 'pencil2' })
  ])
]);

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Is it a notebook?",
    image: "📓",
    vocabulary: "notebook",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là quyển vở.",
    hintImage: "📓",
    unscrambledLetters: ["e", "n", "o", "k", "b", "o", "t", "o"],
    oddChoices: ["alien", "desk", "notebook", "pencil"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Is it a chair?",
    image: "✏️",
    vocabulary: "pencil",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là cái bút chì.",
    hintImage: "✏️",
    unscrambledLetters: ["l", "i", "c", "n", "e", "p"],
    oddChoices: ["book", "guitar", "notebook", "pencil"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Is it a chair?",
    image: "🪑",
    vocabulary: "chair",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, nó là cái ghế.",
    hintImage: "🪑",
    unscrambledLetters: ["i", "h", "a", "c", "r"],
    oddChoices: ["chair", "desk", "eraser", "ruler"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it a notebook?",
    image: SchoolDeskSVG as any,
    vocabulary: "desk",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, it am.", "No, it can't."],
    correctAnswer: "No, it isn't.",
    explanation: "No, it isn't. = Không phải, nó là cái bàn học.",
    hintImage: SchoolDeskSVG as any,
    unscrambledLetters: ["d", "e", "s", "k"],
    oddChoices: ["notebook", "pencil", "desk", "dinosaur"]
  }
];
