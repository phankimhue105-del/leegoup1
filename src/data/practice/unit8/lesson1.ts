import React from 'react';
import { PracticeQuestion } from '../../../types';

// Custom educational vector illustrations using React.createElement SVG

const OldShoeSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'shoe-g' }, [
    // Outer shoe body (brown faded sneaker)
    React.createElement('path', {
      d: 'M 25 140 C 25 140, 30 110, 50 100 C 65 92, 80 110, 100 110 C 120 110, 140 85, 160 85 C 175 85, 185 105, 185 125 C 185 140, 180 145, 165 145 C 150 145, 45 145, 25 140 Z',
      fill: '#8B5A2B', // Faded brown
      stroke: '#5C3A21',
      strokeWidth: 2.5,
      key: 'body'
    }),
    // White sole (dirty yellowed/grey white)
    React.createElement('path', {
      d: 'M 25 140 Q 105 145, 165 145 C 170 145, 180 143, 182 135 L 184 142 C 184 148, 175 152, 165 152 C 145 152, 45 152, 25 147 Z',
      fill: '#D1D5DB', // Dirty grey
      stroke: '#9CA3AF',
      strokeWidth: 1.5,
      key: 'sole'
    }),
    // Laces (old and frayed)
    React.createElement('path', {
      d: 'M 90 110 L 105 95 M 100 110 L 115 95 M 110 110 L 125 95',
      stroke: '#F3F4F6',
      strokeWidth: 2,
      key: 'laces'
    }),
    // Dirty grey patches on the shoe toe and heel
    React.createElement('circle', { cx: 160, cy: 110, r: 8, fill: '#4A3525', opacity: 0.6, key: 'dirt1' }),
    React.createElement('circle', { cx: 50, cy: 120, r: 6, fill: '#4A3525', opacity: 0.6, key: 'dirt2' }),
    // Patch / Bandage
    React.createElement('rect', { x: 120, y: 115, width: 22, height: 12, rx: 2, fill: '#D2B48C', stroke: '#8B5A2B', strokeWidth: 1, transform: 'rotate(-10 131 121)', key: 'patch' }),
    React.createElement('line', { x1: 125, y1: 112, x2: 125, y2: 128, stroke: '#5C3A21', strokeWidth: 1.5, key: 'stitch1' }),
    React.createElement('line', { x1: 135, y1: 112, x2: 135, y2: 128, stroke: '#5C3A21', strokeWidth: 1.5, key: 'stitch2' }),
    // Grandfather icon 👴 beside the shoe to reinforce "OLD"
    React.createElement('text', { x: 130, y: 65, fontSize: '40', key: 'old-icon' }, '👴')
  ])
]);

// Issue 3: Very Short Pencil (tiny, heavily used, pencil less than half normal length)
const ShortPencilSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'pencil-g' }, [
    // Short pencil body
    React.createElement('rect', { x: 85, y: 75, width: 30, height: 45, fill: '#FBBF24', stroke: '#D97706', strokeWidth: 2, key: 'body' }),
    // Stripes
    React.createElement('line', { x1: 95, y1: 75, x2: 95, y2: 120, stroke: '#D97706', strokeWidth: 2, key: 'stripe1' }),
    React.createElement('line', { x1: 105, y1: 75, x2: 105, y2: 120, stroke: '#D97706', strokeWidth: 2, key: 'stripe2' }),
    // Metal band
    React.createElement('rect', { x: 85, y: 60, width: 30, height: 15, fill: '#9CA3AF', stroke: '#4B5563', strokeWidth: 2, key: 'metal' }),
    // Worn down pink eraser
    React.createElement('path', { d: 'M85 60 Q100 53 115 60 Z', fill: '#F472B6', stroke: '#DB2777', strokeWidth: 2, key: 'eraser' }),
    // Sharpened wood tip
    React.createElement('path', { d: 'M85 120 L100 145 L115 120 Z', fill: '#FEF3C7', stroke: '#D97706', strokeWidth: 2, key: 'wood' }),
    // Lead point
    React.createElement('path', { d: 'M96 138 L100 145 L104 138 Z', fill: '#1F2937', key: 'lead' }),
    // Pinching hand 🤏 indicator showing small/short
    React.createElement('text', { x: 130, y: 110, fontSize: '32', key: 'pinch' }, '🤏')
  ])
]);

// Issue 4: Old Book (worn cover, faded brown, with grandfather icon beside it)
const OldBookSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'book-g' }, [
    // Faded book cover
    React.createElement('path', {
      d: 'M40 40 L140 32 Q160 32 160 50 L150 160 Q150 170 130 170 L30 160 Z',
      fill: '#5C3A21', // Old brown
      stroke: '#4A301C',
      strokeWidth: 3,
      key: 'cover'
    }),
    // Yellowed pages at edges
    React.createElement('path', {
      d: 'M142 37 L148 37 L138 162 L132 162 Z',
      fill: '#FEF08A', // Yellowed paper
      key: 'pages'
    }),
    // Tears on the cover
    React.createElement('path', { d: 'M50 60 L70 65 L60 80', fill: 'none', stroke: '#3E2514', strokeWidth: 2, key: 'tear1' }),
    React.createElement('path', { d: 'M110 120 L125 115 L120 130', fill: 'none', stroke: '#3E2514', strokeWidth: 2, key: 'tear2' })
  ])
]);

// Issue 5: Big Box (enlarged, occupying ~80% of the area)
const BigBoxSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'box-g' }, [
    // Massive box occupying 80%+ of the area
    React.createElement('path', {
      d: 'M20 55 L100 20 L180 55 L180 165 L100 198 L20 165 Z',
      fill: '#D97706', // Cardboard brown
      stroke: '#B45309',
      strokeWidth: 3,
      key: 'box-body'
    }),
    // Top flaps
    React.createElement('path', { d: 'M20 55 L100 90 L180 55 L100 20 Z', fill: '#F59E0B', stroke: '#B45309', strokeWidth: 2, key: 'box-top' }),
    // Vertical line
    React.createElement('line', { x1: 100, y1: 90, x2: 100, y2: 198, stroke: '#B45309', strokeWidth: 3, key: 'divider' }),
    // Big label on the side
    React.createElement('text', { x: 75, y: 135, fontSize: '36', fill: '#FFFFFF', fontWeight: 'bold', key: 'label' }, 'BIG')
  ])
]);

// Issue 6: One Long Straight Rope (stretched horizontally from left to right, not rolled/curled/coiled)
const LongRopeSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'rope-g' }, [
    // Long straight rope
    React.createElement('path', {
      d: 'M10 100 Q 50 95, 100 100 T 190 100',
      fill: 'none',
      stroke: '#D97706', // Rope color
      strokeWidth: 12,
      strokeLinecap: 'round',
      key: 'rope-core'
    }),
    // Threads
    React.createElement('path', {
      d: 'M15 100 L25 97 M35 100 L45 97 M55 100 L65 97 M75 100 L85 97 M95 100 L105 97 M115 100 L125 97 M135 100 L145 97 M155 100 L165 97 M175 100 L185 97',
      fill: 'none',
      stroke: '#F59E0B',
      strokeWidth: 3,
      key: 'threads'
    }),
    // Ends
    React.createElement('path', { d: 'M6 95 L10 100 L5 105 M194 95 L190 100 L195 105', fill: 'none', stroke: '#B45309', strokeWidth: 2, key: 'ends' })
  ])
]);

export const lesson1Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: OldShoeSVG as any,
    vocabulary: "old",
    choices: ["That is an old shoe.", "That is a new shoe.", "That is a big shoe.", "That is a small shoe."],
    options: ["That is an old shoe.", "That is a new shoe.", "That is a big shoe.", "That is a small shoe."],
    correctAnswer: "That is an old shoe.",
    explanation: "old = cũ",
    hintImage: OldShoeSVG as any,
    unscrambledLetters: ["o", "l", "d"],
    oddChoices: ["old", "new", "big", "dinosaur"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: "✨🚲🚲🚲",
    vocabulary: "new",
    choices: ["Those are new bikes.", "Those are old bikes.", "Those are big bikes.", "Those are small bikes."],
    options: ["Those are new bikes.", "Those are old bikes.", "Those are big bikes.", "Those are small bikes."],
    correctAnswer: "Those are new bikes.",
    explanation: "new = mới",
    hintImage: "✨🚲🚲🚲",
    unscrambledLetters: ["n", "e", "w"],
    oddChoices: ["new", "old", "long", "spaceship"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: "🐘",
    vocabulary: "big",
    choices: ["It is a big elephant.", "It is a small elephant.", "It is a long elephant.", "It is a short elephant."],
    options: ["It is a big elephant.", "It is a small elephant.", "It is a long elephant.", "It is a short elephant."],
    correctAnswer: "It is a big elephant.",
    explanation: "big = to",
    hintImage: "🐘",
    unscrambledLetters: ["b", "i", "g"],
    oddChoices: ["big", "small", "long", "hamburger"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: "🐭",
    vocabulary: "small",
    choices: ["It is a small mouse.", "It is a big mouse.", "It is a long mouse.", "It is a short mouse."],
    options: ["It is a small mouse.", "It is a big mouse.", "It is a long mouse.", "It is a short mouse."],
    correctAnswer: "It is a small mouse.",
    explanation: "small = nhỏ",
    hintImage: "🐭",
    unscrambledLetters: ["s", "m", "a", "l", "l"],
    oddChoices: ["small", "big", "short", "guitar"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: "📏━━━━",
    vocabulary: "long",
    choices: ["That is a long ruler.", "That is a short ruler.", "That is a big ruler.", "That is a small ruler."],
    options: ["That is a long ruler.", "That is a short ruler.", "That is a big ruler.", "That is a small ruler."],
    correctAnswer: "That is a long ruler.",
    explanation: "long = dài",
    hintImage: "📏━━━━",
    unscrambledLetters: ["l", "o", "n", "g"],
    oddChoices: ["long", "short", "big", "alien"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: ShortPencilSVG as any,
    vocabulary: "short",
    choices: ["It is a short pencil.", "It is a long pencil.", "It is a big pencil.", "It is a small pencil."],
    options: ["It is a short pencil.", "It is a long pencil.", "It is a big pencil.", "It is a small pencil."],
    correctAnswer: "It is a short pencil.",
    explanation: "short = ngắn",
    hintImage: ShortPencilSVG as any,
    unscrambledLetters: ["s", "h", "o", "r", "t"],
    oddChoices: ["short", "long", "small", "octopus"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: OldBookSVG as any,
    vocabulary: "old",
    choices: ["That is an old book.", "That is a new book.", "That is a big book.", "That is a small book."],
    options: ["That is an old book.", "That is a new book.", "That is a big book.", "That is a small book."],
    correctAnswer: "That is an old book.",
    explanation: "old = cũ",
    hintImage: OldBookSVG as any,
    unscrambledLetters: ["o", "l", "d"],
    oddChoices: ["old", "new", "short", "volcano"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: "✨🧸",
    vocabulary: "new",
    choices: ["That is a new toy.", "That is an old toy.", "That is a big toy.", "That is a small toy."],
    options: ["That is a new toy.", "That is an old toy.", "That is a big toy.", "That is a small toy."],
    correctAnswer: "That is a new toy.",
    explanation: "new = mới",
    hintImage: "✨🧸",
    unscrambledLetters: ["n", "e", "w"],
    oddChoices: ["new", "old", "big", "wizard"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: BigBoxSVG as any,
    vocabulary: "big",
    choices: ["That is a big box.", "That is a small box.", "That is a new box.", "That is an old box."],
    options: ["That is a big box.", "That is a small box.", "That is a new box.", "That is an old box."],
    correctAnswer: "That is a big box.",
    explanation: "big = to",
    hintImage: BigBoxSVG as any,
    unscrambledLetters: ["b", "i", "g"],
    oddChoices: ["big", "small", "long", "hamburger"],
    activityTitle: "Choose the Correct Answer"
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Choose the correct description.",
    image: LongRopeSVG as any,
    vocabulary: "long",
    choices: ["That is a long rope.", "That is a short rope.", "That is a big rope.", "That is a small rope."],
    options: ["That is a long rope.", "That is a short rope.", "That is a big rope.", "That is a small rope."],
    correctAnswer: "That is a long rope.",
    explanation: "long = dài",
    hintImage: LongRopeSVG as any,
    unscrambledLetters: ["l", "o", "n", "g"],
    oddChoices: ["long", "short", "big", "alien"],
    activityTitle: "Choose the Correct Answer"
  }
];
