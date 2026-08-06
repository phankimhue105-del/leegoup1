import React from 'react';
import { PracticeQuestion } from '../../../types';

export const TapeSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'tape-g' }, [
    React.createElement('circle', { cx: 100, cy: 100, r: 60, fill: '#FEF3C7', stroke: '#F59E0B', strokeWidth: 3, key: 'outer' }),
    React.createElement('circle', { cx: 100, cy: 100, r: 28, fill: '#FFFFFF', stroke: '#EF4444', strokeWidth: 3, key: 'inner-hole' }),
    React.createElement('path', {
      d: 'M 148 68 L 180 68 L 180 82',
      fill: '#FEF3C7',
      stroke: '#F59E0B',
      strokeWidth: 2,
      key: 'tape-pull'
    }),
    React.createElement('path', {
      d: 'M 180 82 L 176 85 L 180 88 L 176 91 L 180 94',
      fill: 'none',
      stroke: '#EF4444',
      strokeWidth: 2,
      key: 'teeth'
    }),
    React.createElement('path', {
      d: 'M 75 145 C 75 145, 90 165, 120 165 C 150 165, 165 140, 165 110',
      fill: 'none',
      stroke: '#3B82F6',
      strokeWidth: 5,
      strokeLinecap: 'round',
      key: 'dispenser'
    })
  ])
]);

const ChalkSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('filter', { id: 'shadow-chalk', key: 'f' }, 
    React.createElement('feDropShadow', { dx: 2, dy: 3, stdDeviation: 3, floodColor: '#000000', floodOpacity: 0.1 })
  ),
  React.createElement('linearGradient', { id: 'cylinder-grad', key: 'g', x1: '0%', y1: '0%', x2: '100%', y2: '0%' }, [
    React.createElement('stop', { offset: '0%', stopColor: '#E5E7EB', key: 's1' }),
    React.createElement('stop', { offset: '30%', stopColor: '#FFFFFF', key: 's2' }),
    React.createElement('stop', { offset: '70%', stopColor: '#FFFFFF', key: 's3' }),
    React.createElement('stop', { offset: '100%', stopColor: '#D1D5DB', key: 's4' })
  ]),
  React.createElement('g', { filter: 'url(#shadow-chalk)', key: 'group' }, [
    // Chalk 1
    React.createElement('g', { transform: 'rotate(-15 90 90)', key: 'c1' }, [
      React.createElement('rect', { x: 75, y: 40, width: 22, height: 110, rx: 3, fill: 'url(#cylinder-grad)', key: 'r1' }),
      React.createElement('ellipse', { cx: 86, cy: 40, rx: 11, ry: 4, fill: '#F3F4F6', stroke: '#E5E7EB', strokeWidth: 0.5, key: 'e1' })
    ]),
    // Chalk 2
    React.createElement('g', { transform: 'rotate(30 110 110)', key: 'c2' }, [
      React.createElement('rect', { x: 105, y: 70, width: 22, height: 70, rx: 3, fill: 'url(#cylinder-grad)', key: 'r2' }),
      React.createElement('ellipse', { cx: 116, cy: 70, rx: 11, ry: 3, fill: '#E5E7EB', key: 'e2' }),
      React.createElement('rect', { x: 105, y: 45, width: 22, height: 18, rx: 2, fill: 'url(#cylinder-grad)', key: 'r3' }),
      React.createElement('ellipse', { cx: 116, cy: 45, rx: 11, ry: 3, fill: '#F3F4F6', key: 'e3' }),
      React.createElement('ellipse', { cx: 116, cy: 63, rx: 11, ry: 3, fill: '#D1D5DB', key: 'e4' })
    ]),
    // Dust
    React.createElement('circle', { cx: 65, cy: 140, r: 1.5, fill: '#FFFFFF', opacity: 0.6, key: 'd1' }),
    React.createElement('circle', { cx: 72, cy: 150, r: 1, fill: '#FFFFFF', opacity: 0.5, key: 'd2' }),
    React.createElement('circle', { cx: 140, cy: 130, r: 1.5, fill: '#FFFFFF', opacity: 0.6, key: 'd3' }),
    React.createElement('circle', { cx: 148, cy: 120, r: 1, fill: '#FFFFFF', opacity: 0.5, key: 'd4' }),
    React.createElement('circle', { cx: 115, cy: 66, r: 1.2, fill: '#FFFFFF', opacity: 0.7, key: 'd5' })
  ])
]);

export const lesson1Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "What is this?",
    image: "🎨",
    vocabulary: "paint",
    choices: ["This is tape.", "This is yarn.", "This is paint.", "This is glue."],
    options: ["This is tape.", "This is yarn.", "This is paint.", "This is glue."],
    correctAnswer: "This is paint.",
    explanation: "paint = sơn / màu vẽ",
    hintImage: "🎨",
    unscrambledLetters: ["i", "a", "n", "p", "t"],
    oddChoices: ["yarn", "octopus", "paint", "chalk"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "What is it?",
    image: "🎨",
    vocabulary: "paint",
    choices: ["This is tape.", "This is paper.", "This is paint.", "This is glue."],
    options: ["This is tape.", "This is paper.", "This is paint.", "This is glue."],
    correctAnswer: "This is paint.",
    explanation: "paint = sơn / màu vẽ",
    hintImage: "🎨",
    unscrambledLetters: ["p", "i", "t", "n", "a"],
    oddChoices: ["paint", "yarn", "paper", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "What is this?",
    image: "📄",
    vocabulary: "paper",
    choices: ["This is tape.", "This is yarn.", "This is paper.", "This is glue."],
    options: ["This is tape.", "This is yarn.", "This is paper.", "This is glue."],
    correctAnswer: "Independence Day.", // Wait! The original was "paper = giấy" and answer is "This is paper."
    // Let's check line 42 of view_file:
    // correctAnswer: "This is paper.",
    correctAnswer: "This is paper.",
    explanation: "paper = giấy",
    hintImage: "📄",
    unscrambledLetters: ["p", "p", "r", "e", "a"],
    oddChoices: ["paper", "yarn", "paint", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "What is it?",
    image: "📄",
    vocabulary: "paper",
    choices: ["This is tape.", "This is yarn.", "This is paper.", "This is glue."],
    options: ["This is tape.", "This is yarn.", "This is paper.", "This is glue."],
    correctAnswer: "This is paper.",
    explanation: "paper = giấy",
    hintImage: "📄",
    unscrambledLetters: ["p", "p", "r", "e", "a"],
    oddChoices: ["paper", "yarn", "paint", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "What is this?",
    image: ChalkSVG as any,
    vocabulary: "chalk",
    choices: ["This is tape.", "This is yarn.", "This is chalk.", "This is glue."],
    options: ["This is tape.", "This is yarn.", "This is chalk.", "This is glue."],
    correctAnswer: "This is chalk.",
    explanation: "chalk = phấn",
    hintImage: ChalkSVG as any,
    unscrambledLetters: ["c", "a", "k", "l", "h"],
    oddChoices: ["chalk", "yarn", "paint", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "What is it?",
    image: ChalkSVG as any,
    vocabulary: "chalk",
    choices: ["This is tape.", "This is yarn.", "This is chalk.", "This is glue."],
    options: ["This is tape.", "This is yarn.", "This is chalk.", "This is glue."],
    correctAnswer: "This is chalk.",
    explanation: "chalk = phấn",
    hintImage: ChalkSVG as any,
    unscrambledLetters: ["c", "a", "k", "l", "h"],
    oddChoices: ["chalk", "yarn", "paint", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "What is this?",
    image: "🧶",
    vocabulary: "yarn",
    choices: ["This is tape.", "This is chalk.", "This is yarn.", "This is glue."],
    options: ["This is tape.", "This is chalk.", "This is yarn.", "This is glue."],
    correctAnswer: "This is yarn.",
    explanation: "yarn = cuộn len",
    hintImage: "🧶",
    unscrambledLetters: ["n", "a", "r", "y"],
    oddChoices: ["paper", "yarn", "glue", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "What is it?",
    image: "🧶",
    vocabulary: "yarn",
    choices: ["This is tape.", "This is chalk.", "This is yarn.", "This is glue."],
    options: ["This is tape.", "This is chalk.", "This is yarn.", "This is glue."],
    correctAnswer: "This is yarn.",
    explanation: "yarn = cuộn len",
    hintImage: "🧶",
    unscrambledLetters: ["n", "a", "r", "y"],
    oddChoices: ["paper", "yarn", "glue", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "What is this?",
    image: "🧴",
    vocabulary: "glue",
    choices: ["This is tape.", "This is chalk.", "This is glue.", "This is yarn."],
    options: ["This is tape.", "This is chalk.", "This is glue.", "This is yarn."],
    correctAnswer: "This is glue.",
    explanation: "glue = keo dán",
    hintImage: "🧴",
    unscrambledLetters: ["e", "l", "u", "g"],
    oddChoices: ["paper", "glue", "yarn", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "What is it?",
    image: TapeSVG as any,
    vocabulary: "tape",
    choices: ["This is glue.", "This is chalk.", "This is tape.", "This is yarn."],
    options: ["This is glue.", "This is chalk.", "This is tape.", "This is yarn."],
    correctAnswer: "This is tape.",
    explanation: "tape = băng dính",
    hintImage: TapeSVG as any,
    unscrambledLetters: ["a", "p", "e", "t"],
    oddChoices: ["tape", "paper", "volcano", "chalk"],
    activityTitle: "Choose the Correct Answer"
  }
];
