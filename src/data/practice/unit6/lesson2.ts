import React from 'react';
import { PracticeQuestion } from '../../../types';

// Custom position illustrations for Unit 6 Lesson 2

// Q5: Ball under table illustration (used to test 'under')
const UnderIllustrationSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'under-scene' }, [
    // Table
    React.createElement('rect', { x: 30, y: 70, width: 140, height: 15, fill: '#D97706', rx: 2, key: 'table-top' }),
    React.createElement('rect', { x: 45, y: 85, width: 15, height: 75, fill: '#B45309', key: 'leg-left' }),
    React.createElement('rect', { x: 140, y: 85, width: 15, height: 75, fill: '#B45309', key: 'leg-right' }),
    // Red ball UNDER the table
    React.createElement('circle', { cx: 100, cy: 135, r: 25, fill: '#EF4444', stroke: '#DC2626', strokeWidth: 2, key: 'ball' }),
    React.createElement('circle', { cx: 100, cy: 135, r: 15, fill: '#F87171', key: 'ball-highlight' }),
    // Floor line
    React.createElement('line', { x1: 15, y1: 160, x2: 185, y2: 160, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' }),
    // Blue arrow pointing down to the ball under the table
    React.createElement('path', { d: 'M100 85 L100 105 M95 100 L100 105 L105 100', fill: 'none', stroke: '#2563EB', strokeWidth: 3, strokeLinecap: 'round', key: 'arrow' })
  ])
]);

// Q6: Monkey sitting in the canopy of a tree (used to test 'in')
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

// Q7: Snake resting on top of a rock (used to test 'on')
const SnakesOnRockSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'snakes-rock-scene' }, [
    // Grey rock
    React.createElement('path', {
      d: 'M30 160 Q 50 80, 100 80 T 170 160 Z',
      fill: '#9CA3AF',
      stroke: '#4B5563',
      strokeWidth: 2.5,
      key: 'rock'
    }),
    React.createElement('path', {
      d: 'M60 100 Q 100 90, 140 100',
      fill: 'none',
      stroke: '#E5E7EB',
      strokeWidth: 2,
      key: 'rock-highlight'
    }),
    // Green snake coiled on top of the rock
    React.createElement('g', { transform: 'translate(60, 50)', key: 'snake1' }, [
      React.createElement('path', {
        d: 'M10 30 Q 30 15, 50 30 T 80 30',
        fill: 'none',
        stroke: '#10B981',
        strokeWidth: 8,
        strokeLinecap: 'round',
        key: 'body'
      }),
      React.createElement('circle', { cx: 75, cy: 26, r: 1.5, fill: '#FFFFFF', key: 'eye1' }),
      React.createElement('circle', { cx: 78, cy: 28, r: 1.5, fill: '#FFFFFF', key: 'eye2' }),
      React.createElement('path', { d: 'M81 30 L86 28 M81 30 L86 32', fill: 'none', stroke: '#EF4444', strokeWidth: 1.5, key: 'tongue' })
    ]),
    // Floor
    React.createElement('line', { x1: 15, y1: 160, x2: 185, y2: 160, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' })
  ])
]);

// Q8: Bear sitting on the ground under a tree canopy (used to test 'under')
const BearUnderTreeSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'bear-tree-scene' }, [
    // Tree trunk
    React.createElement('rect', { x: 130, y: 50, width: 25, height: 120, fill: '#78350F', key: 'trunk' }),
    // Green tree canopy
    React.createElement('circle', { cx: 120, cy: 50, r: 50, fill: '#10B981', key: 'canopy1' }),
    React.createElement('circle', { cx: 70, cy: 60, r: 40, fill: '#059669', key: 'canopy2' }),
    // Bear sitting on the ground UNDER the tree leaves
    React.createElement('g', { transform: 'translate(45, 100)', key: 'bear' }, [
      React.createElement('circle', { cx: 30, cy: 50, r: 22, fill: '#92400E', key: 'body' }),
      React.createElement('circle', { cx: 15, cy: 20, r: 6, fill: '#92400E', key: 'ear-l' }),
      React.createElement('circle', { cx: 45, cy: 20, r: 6, fill: '#92400E', key: 'ear-r' }),
      React.createElement('circle', { cx: 30, cy: 30, r: 16, fill: '#B45309', key: 'head' }),
      React.createElement('circle', { cx: 30, cy: 34, r: 6, fill: '#FDE68A', key: 'snout' }),
      React.createElement('circle', { cx: 25, cy: 28, r: 2, fill: '#000000', key: 'eye-l' }),
      React.createElement('circle', { cx: 35, cy: 28, r: 2, fill: '#000000', key: 'eye-r' }),
      React.createElement('circle', { cx: 30, cy: 32, r: 2, fill: '#000000', key: 'nose' })
    ]),
    // Floor
    React.createElement('line', { x1: 15, y1: 170, x2: 185, y2: 170, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' })
  ])
]);

// Q9: Blue toy ball sitting on the floor under a table
const BallUnderTableSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'ball-table-scene' }, [
    // Table
    React.createElement('rect', { x: 30, y: 70, width: 140, height: 15, fill: '#D97706', rx: 2, key: 'table-top' }),
    React.createElement('rect', { x: 45, y: 85, width: 15, height: 75, fill: '#B45309', key: 'leg-left' }),
    React.createElement('rect', { x: 140, y: 85, width: 15, height: 75, fill: '#B45309', key: 'leg-right' }),
    // Blue toy ball under the table
    React.createElement('circle', { cx: 100, cy: 135, r: 22, fill: '#3B82F6', stroke: '#2563EB', strokeWidth: 2, key: 'ball' }),
    React.createElement('circle', { cx: 100, cy: 135, r: 12, fill: '#60A5FA', key: 'ball-highlight' }),
    // Floor
    React.createElement('line', { x1: 15, y1: 160, x2: 185, y2: 160, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' })
  ])
]);

// Q10: Tiger head peaking out of a cardboard box (used to test 'in')
const TigerInBoxSVG = React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200',
  style: { width: '100%', height: '100%', maxHeight: '140px', display: 'block', margin: 'auto' }
}, [
  React.createElement('g', { key: 'tiger-box-scene' }, [
    // Lower half of box
    React.createElement('rect', { x: 50, y: 100, width: 100, height: 70, rx: 4, fill: '#D97706', stroke: '#B45309', strokeWidth: 2.5, key: 'box-base' }),
    // Box flaps
    React.createElement('polygon', { points: '50 100, 25 80, 50 80', fill: '#F59E0B', stroke: '#B45309', strokeWidth: 1.5, key: 'flap-l' }),
    React.createElement('polygon', { points: '150 100, 175 80, 150 80', fill: '#F59E0B', stroke: '#B45309', strokeWidth: 1.5, key: 'flap-r' }),
    // Tiger peaking out from inside the box
    React.createElement('g', { transform: 'translate(75, 45)', key: 'tiger' }, [
      React.createElement('circle', { cx: 12, cy: 20, r: 8, fill: '#EA580C', key: 'ear-l' }),
      React.createElement('circle', { cx: 12, cy: 20, r: 4, fill: '#000000', key: 'ear-li' }),
      React.createElement('circle', { cx: 38, cy: 20, r: 8, fill: '#EA580C', key: 'ear-r' }),
      React.createElement('circle', { cx: 38, cy: 20, r: 4, fill: '#000000', key: 'ear-ri' }),
      React.createElement('circle', { cx: 25, cy: 30, r: 18, fill: '#F97316', key: 'head' }),
      React.createElement('ellipse', { cx: 15, cy: 38, rx: 8, ry: 6, fill: '#FFFFFF', key: 'cheek-l' }),
      React.createElement('ellipse', { cx: 35, cy: 38, rx: 8, ry: 6, fill: '#FFFFFF', key: 'cheek-r' }),
      React.createElement('circle', { cx: 25, cy: 38, r: 5, fill: '#FFEDD5', key: 'snout' }),
      React.createElement('polygon', { points: '23 35, 27 35, 25 38', fill: '#000000', key: 'nose' }),
      React.createElement('circle', { cx: 18, cy: 28, r: 2.5, fill: '#000000', key: 'eye-l' }),
      React.createElement('circle', { cx: 32, cy: 28, r: 2.5, fill: '#000000', key: 'eye-r' }),
      React.createElement('path', { d: 'M12 28 L18 29 M38 28 L32 29 M25 12 L25 18', fill: 'none', stroke: '#000000', strokeWidth: 2, key: 'stripes' })
    ]),
    // Floor
    React.createElement('line', { x1: 20, y1: 170, x2: 180, y2: 170, stroke: '#9CA3AF', strokeWidth: 2, key: 'floor' })
  ])
]);

export const lesson2Practice: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Are they snakes?",
    image: "🐍🐍",
    vocabulary: "snake",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "Yes, they are. = Đúng vậy, chúng là những con rắn.",
    hintImage: "🐍🐍",
    unscrambledLetters: ["k", "e", "n", "a", "s"],
    oddChoices: ["snake", "zebra", "alien", "giraffe"]
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Are they snakes?",
    image: "🦒🦒",
    vocabulary: "giraffe",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "No, they aren't.",
    explanation: "No, they aren't. = Không phải, chúng là hươu cao cổ.",
    hintImage: "🦒🦒",
    unscrambledLetters: ["a", "f", "i", "r", "e", "f", "g"],
    oddChoices: ["giraffe", "zebra", "alien", "snake"]
  },
  {
    id: 3,
    type: "multiple_choice",
    question: "Are they zebras?",
    image: "🦓🦓",
    vocabulary: "zebra",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "Yes, they are.",
    explanation: "Yes, they are. = Đúng vậy, chúng là những con ngựa vằn.",
    hintImage: "🦓🦓",
    unscrambledLetters: ["z", "e", "b", "r", "a"],
    oddChoices: ["zebra", "snake", "guitar", "giraffe"]
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "Are they zebras?",
    image: "🦁🦁",
    vocabulary: "lion",
    choices: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    options: ["Yes, they are.", "No, they aren't.", "Yes, it is.", "No, it isn't."],
    correctAnswer: "No, they aren't.",
    explanation: "No, they aren't. = Không phải, chúng là sư tử.",
    hintImage: "🦁🦁",
    unscrambledLetters: ["l", "i", "o", "n"],
    oddChoices: ["lion", "zebra", "alien", "snake"]
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Which one is 'under'?",
    image: UnderIllustrationSVG as any,
    vocabulary: "under",
    choices: ["📦⬇️ (under)", "📦⬆️ (on)", "📦📥 (in)", "📦➡️ (next to)"],
    options: ["📦⬇️ (under)", "📦⬆️ (on)", "📦📥 (in)", "📦➡️ (next to)"],
    correctAnswer: "📦⬇️ (under)",
    explanation: "under = ở dưới",
    hintImage: UnderIllustrationSVG as any
  },
  {
    id: 6,
    type: "multiple_choice",
    question: "Where is the monkey?",
    image: MonkeyInTreeSVG as any,
    vocabulary: "in",
    choices: ["It's in the tree.", "It's under the tree.", "It's on the tree.", "It's next to the tree."],
    options: ["It's in the tree.", "It's under the tree.", "It's on the tree.", "It's next to the tree."],
    correctAnswer: "It's in the tree.",
    explanation: "in = ở trong",
    hintImage: MonkeyInTreeSVG as any
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "Where are the snakes?",
    image: SnakesOnRockSVG as any,
    vocabulary: "on",
    choices: ["They're on the rock.", "They're under the rock.", "They're in the rock.", "They're next to the rock."],
    options: ["They're on the rock.", "They're under the rock.", "They're in the rock.", "They're next to the rock."],
    correctAnswer: "They're on the rock.",
    explanation: "on = ở trên",
    hintImage: SnakesOnRockSVG as any
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "Where is the bear?",
    image: BearUnderTreeSVG as any,
    vocabulary: "under",
    choices: ["It's under the tree.", "It's in the tree.", "It's on the tree.", "It's next to the tree."],
    options: ["It's under the tree.", "It's in the tree.", "It's on the tree.", "It's next to the tree."],
    correctAnswer: "It's under the tree.",
    explanation: "under = ở dưới",
    hintImage: BearUnderTreeSVG as any
  },
  {
    id: 9,
    type: "multiple_choice",
    question: "Is the ball under the table?",
    image: BallUnderTableSVG as any,
    vocabulary: "under",
    choices: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    options: ["Yes, it is.", "No, it isn't.", "Yes, they are.", "No, they aren't."],
    correctAnswer: "Yes, it is.",
    explanation: "Yes, it is. = Đúng vậy, quả bóng ở dưới cái bàn.",
    hintImage: BallUnderTableSVG as any
  },
  {
    id: 10,
    type: "multiple_choice",
    question: "Where is the tiger?",
    image: TigerInBoxSVG as any,
    vocabulary: "in",
    choices: ["It's in the box.", "It's on the box.", "It's under the box.", "It's behind the box."],
    options: ["It's in the box.", "It's on the box.", "It's under the box.", "It's behind the box."],
    correctAnswer: "It's in the box.",
    explanation: "in = ở trong",
    hintImage: TigerInBoxSVG as any
  }
];
