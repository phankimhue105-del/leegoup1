import React from 'react';
import { PracticeQuestion } from '../../../types';

const BlueYellowSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'mix1' }, [
    React.createElement('circle', { cx: 60, cy: 100, r: 35, fill: '#3B82F6', opacity: 0.8, key: 'blue' }),
    React.createElement('text', { x: 95, y: 110, fontSize: 30, textAnchor: 'middle', fill: '#4B5563', fontWeight: 'bold', key: 'plus' }, '+'),
    React.createElement('circle', { cx: 140, cy: 100, r: 35, fill: '#F59E0B', opacity: 0.8, key: 'yellow' }),
    React.createElement('text', { x: 100, y: 165, fontSize: 18, textAnchor: 'middle', fill: '#1F2937', fontWeight: 'bold', key: 'label' }, 'make... ?')
  ])
]);

const RedWhiteSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'mix2' }, [
    React.createElement('circle', { cx: 60, cy: 100, r: 35, fill: '#EF4444', opacity: 0.8, key: 'red' }),
    React.createElement('text', { x: 95, y: 110, fontSize: 30, textAnchor: 'middle', fill: '#4B5563', fontWeight: 'bold', key: 'plus' }, '+'),
    React.createElement('circle', { cx: 140, cy: 100, r: 35, fill: '#FFFFFF', stroke: '#D1D5DB', strokeWidth: 2, opacity: 0.8, key: 'white' }),
    React.createElement('text', { x: 100, y: 165, fontSize: 18, textAnchor: 'middle', fill: '#1F2937', fontWeight: 'bold', key: 'label' }, 'make... ?')
  ])
]);

export const lesson4Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Which one is green?",
    image: "❓",
    vocabulary: "green",
    choices: ["🟢", "🔴", "🔵", "🟡"],
    options: ["🟢", "🔴", "🔵", "🟡"],
    correctAnswer: "🟢",
    explanation: "green = màu xanh lá",
    hintImage: "❓"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which one is purple?",
    image: "❓",
    vocabulary: "purple",
    choices: ["🟣", "🟠", "🔘", "🟤"],
    options: ["🟣", "🟠", "🔘", "🟤"],
    correctAnswer: "🟣",
    explanation: "purple = màu tím",
    hintImage: "❓"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Which one is paint?",
    image: "❓",
    vocabulary: "paint",
    choices: ["🎨", "🧶", "🧴", "🩹"],
    options: ["🎨", "🧶", "🧴", "🩹"],
    correctAnswer: "🎨",
    explanation: "paint = sơn / màu vẽ",
    hintImage: "❓"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Is it orange?",
    image: "🟠",
    vocabulary: "orange",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "Yes, it is.",
    explanation: "orange = màu cam",
    hintImage: "🟠"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Is it pink?",
    image: "🟢",
    vocabulary: "pink",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, I do.", "No, I don't."],
    correctAnswer: "No, it isn't.",
    explanation: "green = màu xanh lá",
    hintImage: "🟢"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🌸",
    vocabulary: "pink",
    choices: ["It is pink.", "It is green.", "It is purple.", "It is orange."],
    options: ["It is pink.", "It is green.", "It is purple.", "It is orange."],
    correctAnswer: "It is pink.",
    explanation: "pink = màu hồng",
    hintImage: "🌸"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "Choose the correct sentence.",
    image: "🎨",
    vocabulary: "paint",
    choices: ["This is paint.", "This is paper.", "This is chalk.", "This is glue."],
    options: ["This is paint.", "This is paper.", "This is chalk.", "This is glue."],
    correctAnswer: "This is paint.",
    explanation: "paint = màu vẽ",
    hintImage: "🎨"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "It is ______.",
    image: "🔘",
    vocabulary: "gray",
    choices: ["gray", "pink", "purple", "brown"],
    options: ["gray", "pink", "purple", "brown"],
    correctAnswer: "gray",
    explanation: "gray = màu xám",
    hintImage: "🔘"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Blue and yellow make...",
    image: BlueYellowSVG as any,
    vocabulary: "green",
    choices: ["Green", "Pink", "Red", "Black"],
    options: ["Green", "Pink", "Red", "Black"],
    correctAnswer: "Green",
    explanation: "None",
    hintImage: BlueYellowSVG as any
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Red and white make...",
    image: RedWhiteSVG as any,
    vocabulary: "pink",
    choices: ["Pink", "Green", "Blue", "Brown"],
    options: ["Pink", "Green", "Blue", "Brown"],
    correctAnswer: "Pink",
    explanation: "None",
    hintImage: RedWhiteSVG as any
  }
];
