import { Unit } from '../types';

export const CURRICULUM_UNITS: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'FIRST DAY',
    theme: 'First Day at School',
    learningGoal: 'Students become familiar with school life and classroom communication.',
    lessons: [
      {
        id: 'u1-l1',
        number: 1,
        title: 'School Supplies',
        learningObjective: 'Students identify common school supplies.',
        grammarFocus: 'a / an, It is..., What is it?',
        vocabulary: [
          { id: 'v1', word: 'pencil', meaningVi: 'bút chì', exampleSentence: 'It is a pencil.' },
          { id: 'v2', word: 'eraser', meaningVi: 'cục tẩy', exampleSentence: 'It is an eraser.' },
          { id: 'v3', word: 'ruler', meaningVi: 'thước kẻ', exampleSentence: 'It is a ruler.' },
          { id: 'v4', word: 'pencil case', meaningVi: 'hộp bút', exampleSentence: 'It is a pencil case.' },
          { id: 'v5', word: 'backpack', meaningVi: 'ba lô', exampleSentence: 'It is a backpack.' }
        ],
        sentencePatterns: [
          { pattern: 'It is a ______.', example: 'It is a pencil.', translationVi: 'Nó là một cái bút chì.' },
          { pattern: 'It is an ______.', example: 'It is an eraser.', translationVi: 'Nó là một cục tẩy.' },
          { pattern: 'What is it?', example: "What is it? It's a ruler.", translationVi: 'Nó là cái gì?' }
        ],
        forbiddenVocab: ['pen', 'book', 'notebook', 'chair', 'desk', 'teacher', 'student'],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture', 'missingWord'],
        practiceQuestions: [
          { image: '✏️', vocabulary: 'pencil', question: 'What is it?', choices: ["It's a pencil.", "It's an eraser.", "It's a ruler.", "It's a backpack."], correctAnswer: "It's a pencil." },
          { image: '🧽', vocabulary: 'eraser', question: 'What is it?', choices: ["It's an eraser.", "It's a pencil.", "It's a ruler.", "It's a backpack."], correctAnswer: "It's an eraser." },
          { image: '📏', vocabulary: 'ruler', question: 'What is it?', choices: ["It's a ruler.", "It's an eraser.", "It's a pencil.", "It's a backpack."], correctAnswer: "It's a ruler." },
          { image: '👝', vocabulary: 'pencil case', question: 'What is it?', choices: ["It's a pencil case.", "It's an eraser.", "It's a ruler.", "It's a backpack."], correctAnswer: "It's a pencil case." },
          { image: '🎒', vocabulary: 'backpack', question: 'What is it?', choices: ["It's a backpack.", "It's an eraser.", "It's a ruler.", "It's a pencil."], correctAnswer: "It's a backpack." },
          { image: '✏️', vocabulary: 'pencil', question: 'Is it a pencil?', choices: ["Yes, it is.", "No, it isn't.", "It is a ruler.", "It is a book."], correctAnswer: "Yes, it is." },
          { image: '🧽', vocabulary: 'eraser', question: 'What is it?', choices: ["It's an eraser.", "It's a ruler.", "It's a desk.", "It's a book."], correctAnswer: "It's an eraser." },
          { image: '📏', vocabulary: 'ruler', question: 'Is it a ruler?', choices: ["Yes, it is.", "No, it isn't.", "It is an eraser.", "It is a pencil."], correctAnswer: "Yes, it is." },
          { image: '👝', vocabulary: 'pencil case', question: 'What is it?', choices: ["It's a pencil case.", "It's a book.", "It's a chair.", "It's a desk."], correctAnswer: "It's a pencil case." },
          { image: '🎒', vocabulary: 'backpack', question: 'Is it a backpack?', choices: ["Yes, it is.", "No, it isn't.", "It is a notebook.", "It is a desk."], correctAnswer: "Yes, it is." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '✏️', promptText: 'pencil', targetPhrase: 'pencil' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '✏️', promptText: 'It is a pencil.', targetPhrase: 'It is a pencil.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '📏', teacherQuestion: 'What is it?', promptText: "It's a ruler.", targetPhrase: "It's a ruler." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🎒', promptText: 'It is a backpack.', targetPhrase: 'It is a backpack.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '✏️', teacherQuestion: 'What is it?', promptText: 'It is a pencil.', targetPhrase: 'It is a pencil.' }
        ]
      },
      {
        id: 'u1-l2',
        number: 2,
        title: 'School Supplies: Books',
        learningObjective: 'Students distinguish classroom objects.',
        grammarFocus: 'Affirmative / Negative (This / It)',
        vocabulary: [
          { id: 'v6', word: 'notebook', meaningVi: 'vở viết', exampleSentence: "It's a notebook." },
          { id: 'v7', word: 'desk', meaningVi: 'bàn học', exampleSentence: "It's a desk." },
          { id: 'v8', word: 'chair', meaningVi: 'ghế', exampleSentence: "It's a chair." },
          { id: 'v9', word: 'book', meaningVi: 'sách', exampleSentence: "It's a book." }
        ],
        sentencePatterns: [
          { pattern: "It's a book.", example: "It's a book.", translationVi: 'Nó là một quyển sách.' },
          { pattern: "It isn't a notebook.", example: "It isn't a notebook.", translationVi: 'Nó không phải là quyển vở.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse', 'memoryGame', 'sentenceBuilder'],
        practiceQuestions: [
          { image: '📓', vocabulary: 'notebook', question: 'What is it?', choices: ["It's a notebook.", "It's a desk.", "It's a chair.", "It's a book."], correctAnswer: "It's a notebook." },
          { image: '✍️', vocabulary: 'desk', question: 'What is it?', choices: ["It's a desk.", "It's a notebook.", "It's a chair.", "It's a book."], correctAnswer: "It's a desk." },
          { image: '🪑', vocabulary: 'chair', question: 'What is it?', choices: ["It's a chair.", "It's a notebook.", "It's a desk.", "It's a book."], correctAnswer: "It's a chair." },
          { image: '📖', vocabulary: 'book', question: 'What is it?', choices: ["It's a book.", "It's a notebook.", "It's a desk.", "It's a chair."], correctAnswer: "It's a book." },
          { image: '📓', vocabulary: 'notebook', question: 'Is it a book?', choices: ["No, it isn't. It's a notebook.", "Yes, it is.", "It is a chair.", "It is a desk."], correctAnswer: "No, it isn't. It's a notebook." },
          { image: '✍️', vocabulary: 'desk', question: 'Is it a chair?', choices: ["No, it isn't. It's a desk.", "Yes, it is.", "It is a notebook.", "It is a book."], correctAnswer: "No, it isn't. It's a desk." },
          { image: '🪑', vocabulary: 'chair', question: 'Is it a chair?', choices: ["Yes, it is.", "No, it isn't.", "It is a notebook.", "It is a book."], correctAnswer: "Yes, it is." },
          { image: '📖', vocabulary: 'book', question: 'Is it a notebook?', choices: ["No, it isn't. It's a book.", "Yes, it is.", "It is a chair.", "It is a desk."], correctAnswer: "No, it isn't. It's a book." },
          { image: '📓', vocabulary: 'notebook', question: 'What is it?', choices: ["It's a notebook.", "It's a ruler.", "It's a pencil.", "It's a backpack."], correctAnswer: "It's a notebook." },
          { image: '🪑', vocabulary: 'chair', question: 'What is it?', choices: ["It's a chair.", "It's a ruler.", "It's a desk.", "It's a pencil."], correctAnswer: "It's a chair." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '📓', promptText: 'notebook', targetPhrase: 'notebook' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '📓', promptText: "It's a book.", targetPhrase: "It's a book." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🪑', teacherQuestion: 'What is it?', promptText: "It's a chair.", targetPhrase: "It's a chair." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '✍️', promptText: "It's a desk.", targetPhrase: "It's a desk." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '📓', teacherQuestion: 'Is it a notebook?', promptText: "No, it isn't. It's a notebook.", targetPhrase: "No, it isn't. It's a notebook." }
        ]
      },
      {
        id: 'u1-l3',
        number: 3,
        title: "Story: I'm Great!",
        learningObjective: 'Students greet classmates politely.',
        grammarFocus: 'Greetings and social polite expressions',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'How are you?', example: 'How are you?', translationVi: 'Bạn khỏe không?' },
          { pattern: "I'm fine. Thank you.", example: "I'm fine. Thank you.", translationVi: 'Mình khỏe. Cảm ơn bạn.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Teacher', text: 'How are you?', translationVi: 'Bạn khỏe không?' },
            { speaker: 'Student', text: "I'm fine. Thank you.", translationVi: 'Mình khỏe. Cảm ơn cô.' }
          ],
          socialSkill: 'Be friendly.'
        },
        suggestedGames: ['flashcard', 'sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'fine', question: "A: How are you?\nB: __________", choices: ["I'm fine, thank you.", "Goodbye.", "Hello.", "Thank you."], correctAnswer: "I'm fine, thank you." },
          { image: '', vocabulary: 'great', question: "A: How are you?\nB: __________", choices: ["I'm great! Thank you.", "Good morning.", "Nice to meet you.", "See you later."], correctAnswer: "I'm great! Thank you." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '😊', promptText: 'great', targetPhrase: 'great' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '👋', promptText: 'How are you?', targetPhrase: 'How are you?' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '😊', teacherQuestion: 'How are you?', promptText: "I'm fine. Thank you.", targetPhrase: "I'm fine. Thank you." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '👋', promptText: 'Hello, teacher.', targetPhrase: 'Hello, teacher.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '😊', teacherQuestion: 'How are you?', promptText: "I'm great! Thank you.", targetPhrase: "I'm great! Thank you." }
        ]
      },
      {
        id: 'u1-l4',
        number: 4,
        title: 'Shapes',
        learningObjective: 'Students identify basic shapes.',
        grammarFocus: 'Yes / No Questions',
        vocabulary: [
          { id: 'v10', word: 'circle', meaningVi: 'hình tròn', exampleSentence: 'Is it a circle?' },
          { id: 'v11', word: 'square', meaningVi: 'hình vuông', exampleSentence: 'It is a square.' },
          { id: 'v12', word: 'triangle', meaningVi: "It's a triangle.", exampleSentence: "It's a triangle." },
          { id: 'v13', word: 'rectangle', meaningVi: "It's a rectangle.", exampleSentence: "It's a rectangle." }
        ],
        sentencePatterns: [
          { pattern: 'Is it a circle?', example: 'Is it a circle?', translationVi: 'Đó có phải là hình tròn không?' },
          { pattern: "Yes, it is. / No, it isn't.", example: 'Yes, it is.', translationVi: 'Đúng rồi. / Không phải.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch', 'mysteryBox'],
        practiceQuestions: [
          { image: '🔴', vocabulary: 'circle', question: 'What shape is it?', choices: ["It's a circle.", "It's a square.", "It's a triangle.", "It's a rectangle."], correctAnswer: "It's a circle." },
          { image: '🟩', vocabulary: 'square', question: 'What shape is it?', choices: ["It's a square.", "It's a circle.", "It's a triangle.", "It's a rectangle."], correctAnswer: "It's a square." },
          { image: '🔺', vocabulary: 'triangle', question: 'What shape is it?', choices: ["It's a triangle.", "It's a circle.", "It's a square.", "It's a rectangle."], correctAnswer: "It's a triangle." },
          { image: '▮', vocabulary: 'rectangle', question: 'What shape is it?', choices: ["It's a rectangle.", "It's a circle.", "It's a square.", "It's a triangle."], correctAnswer: "It's a rectangle." },
          { image: '🔴', vocabulary: 'circle', question: 'Is it a circle?', choices: ["Yes, it is.", "No, it isn't.", "It is a square.", "It is a triangle."], correctAnswer: "Yes, it is." },
          { image: '🟩', vocabulary: 'square', question: 'Is it a circle?', choices: ["No, it isn't.", "Yes, it is.", "It is a rectangle.", "It is a triangle."], correctAnswer: "No, it isn't." },
          { image: '🔺', vocabulary: 'triangle', question: 'Is it a triangle?', choices: ["Yes, it is.", "No, it isn't.", "It is a square.", "It is a circle."], correctAnswer: "Yes, it is." },
          { image: '▮', vocabulary: 'rectangle', question: 'Is it a square?', choices: ["No, it isn't.", "Yes, it is.", "It is a circle.", "It is a triangle."], correctAnswer: "No, it isn't." },
          { image: '🔴', vocabulary: 'circle', question: 'What shape is it?', choices: ["It's a circle.", "It's a square.", "It's a triangle.", "It's a rectangle."], correctAnswer: "It's a circle." },
          { image: '🟩', vocabulary: 'square', question: 'What shape is it?', choices: ["It's a square.", "It's a circle.", "It's a triangle.", "It's a rectangle."], correctAnswer: "It's a square." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🟩', promptText: 'square', targetPhrase: 'square' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🔴', promptText: 'Is it a circle?', targetPhrase: 'Is it a circle?' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🔴', teacherQuestion: 'Is it a circle?', promptText: 'Yes, it is.', targetPhrase: 'Yes, it is.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🔺', promptText: "It's a triangle.", targetPhrase: "It's a triangle." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '▮', teacherQuestion: 'Is it a rectangle?', promptText: 'Yes, it is.', targetPhrase: 'Yes, it is.' }
        ]
      }
    ],
    checkUp: {
      title: 'CHECK UP 1 (Units 1–2)',
      description: 'Review vocabulary and sentence patterns from Units 1 and 2.',
      phonics: ['dog', 'bug', 'pop', 'pig', 'fog', 'top', 'dad', 'dig', 'mat', 'mud', 'nap', 'nod'],
      project: 'Color Poster'
    }
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'ART CLASS',
    theme: 'Art Class',
    learningGoal: 'Students identify colors and classroom art supplies.',
    lessons: [
      {
        id: 'u2-l1',
        number: 1,
        title: 'Art Supplies',
        learningObjective: 'Identify classroom art materials.',
        grammarFocus: 'This is..., What\'s this?',
        vocabulary: [
          { id: 'v14', word: 'paint', meaningVi: 'sơn / màu vẽ', exampleSentence: 'This is paint.' },
          { id: 'v15', word: 'paper', meaningVi: 'giấy', exampleSentence: 'This is paper.' },
          { id: 'v16', word: 'chalk', meaningVi: 'phấn', exampleSentence: 'This is chalk.' },
          { id: 'v17', word: 'yarn', meaningVi: 'cuộn len', exampleSentence: 'This is yarn.' },
          { id: 'v18', word: 'glue', meaningVi: 'keo dán', exampleSentence: 'This is glue.' },
          { id: 'v19', word: 'tape', meaningVi: 'băng dính', exampleSentence: 'This is tape.' }
        ],
        sentencePatterns: [
          { pattern: 'This is paint.', example: 'This is paint.', translationVi: 'Đây là màu vẽ.' },
          { pattern: "What's this?", example: "What's this? This is glue.", translationVi: 'Đây là cái gì?' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'mysteryBox'],
        practiceQuestions: [
          { image: '🎨', vocabulary: 'paint', question: "What's this?", choices: ["This is paint.", "This is paper.", "This is chalk.", "This is glue."], correctAnswer: "This is paint." },
          { image: '📄', vocabulary: 'paper', question: "What's this?", choices: ["This is paper.", "This is paint.", "This is chalk.", "This is glue."], correctAnswer: "This is paper." },
          { image: '🖍️', vocabulary: 'chalk', question: "What's this?", choices: ["This is chalk.", "This is paint.", "This is paper.", "This is glue."], correctAnswer: "This is chalk." },
          { image: '🧶', vocabulary: 'yarn', question: "What's this?", choices: ["This is yarn.", "This is paint.", "This is paper.", "This is tape."], correctAnswer: "This is yarn." },
          { image: '🧴', vocabulary: 'glue', question: "What's this?", choices: ["This is glue.", "This is paint.", "This is paper.", "This is tape."], correctAnswer: "This is glue." },
          { image: '🩹', vocabulary: 'tape', question: "What's this?", choices: ["This is tape.", "This is paint.", "This is paper.", "This is chalk."], correctAnswer: "This is tape." },
          { image: '🎨', vocabulary: 'paint', question: "Is this paper?", choices: ["No, it isn't. This is paint.", "Yes, this is paper.", "This is chalk.", "This is glue."], correctAnswer: "No, it isn't. This is paint." },
          { image: '📄', vocabulary: 'paper', question: "Is this paper?", choices: ["Yes, this is paper.", "No, this is chalk.", "This is paint.", "This is tape."], correctAnswer: "Yes, this is paper." },
          { image: '🧴', vocabulary: 'glue', question: "Is this glue?", choices: ["Yes, this is glue.", "No, this is tape.", "This is paper.", "This is chalk."], correctAnswer: "Yes, this is glue." },
          { image: '🩹', vocabulary: 'tape', question: "Is this tape?", choices: ["Yes, this is tape.", "No, this is glue.", "This is yarn.", "This is chalk."], correctAnswer: "Yes, this is tape." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🎨', promptText: 'paint', targetPhrase: 'paint' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🎨', promptText: 'This is paint.', targetPhrase: 'This is paint.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🧴', teacherQuestion: "What's this?", promptText: 'This is glue.', targetPhrase: 'This is glue.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '📄', promptText: 'This is paper.', targetPhrase: 'This is paper.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🎨', teacherQuestion: "What's this?", promptText: 'This is chalk.', targetPhrase: 'This is chalk.' }
        ]
      },
      {
        id: 'u2-l2',
        number: 2,
        title: 'Colors',
        learningObjective: 'Recognize basic colors.',
        grammarFocus: 'Question + Color Answer',
        vocabulary: [
          { id: 'v20', word: 'red', meaningVi: 'màu đỏ', exampleSentence: "It's red." },
          { id: 'v21', word: 'yellow', meaningVi: 'màu vàng', exampleSentence: "It's yellow." },
          { id: 'v22', word: 'blue', meaningVi: 'màu xanh dương', exampleSentence: "It's blue." },
          { id: 'v23', word: 'white', meaningVi: 'màu trắng', exampleSentence: "It's white." },
          { id: 'v24', word: 'black', meaningVi: 'màu đen', exampleSentence: "It's black." }
        ],
        sentencePatterns: [
          { pattern: 'What color is it?', example: 'What color is it?', translationVi: 'Nó là màu gì?' },
          { pattern: "It's red.", example: "It's red.", translationVi: 'Nó màu đỏ.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch', 'phonicsMatch'],
        practiceQuestions: [
          { image: '🔴', vocabulary: 'red', question: "What color is it?", choices: ["It's red.", "It's yellow.", "It's blue.", "It's white."], correctAnswer: "It's red." },
          { image: '🟡', vocabulary: 'yellow', question: "What color is it?", choices: ["It's yellow.", "It's red.", "It's blue.", "It's white."], correctAnswer: "It's yellow." },
          { image: '🔵', vocabulary: 'blue', question: "What color is it?", choices: ["It's blue.", "It's yellow.", "It's red.", "It's white."], correctAnswer: "It's blue." },
          { image: '⚪', vocabulary: 'white', question: "What color is it?", choices: ["It's white.", "It's yellow.", "It's blue.", "It's black."], correctAnswer: "It's white." },
          { image: '⚫', vocabulary: 'black', question: "What color is it?", choices: ["It's black.", "It's white.", "It's yellow.", "It's blue."], correctAnswer: "It's black." },
          { image: '🔴', vocabulary: 'red', question: "Is it red?", choices: ["Yes, it is.", "No, it isn't.", "It is blue.", "It is white."], correctAnswer: "Yes, it is." },
          { image: '🟡', vocabulary: 'yellow', question: "Is it blue?", choices: ["No, it isn't. It's yellow.", "Yes, it is.", "It is red.", "It is black."], correctAnswer: "No, it isn't. It's yellow." },
          { image: '🔵', vocabulary: 'blue', question: "Is it blue?", choices: ["Yes, it is.", "No, it isn't.", "It is white.", "It is yellow."], correctAnswer: "Yes, it is." },
          { image: '⚪', vocabulary: 'white', question: "Is it black?", choices: ["No, it isn't. It's white.", "Yes, it is.", "It is blue.", "It is red."], correctAnswer: "No, it isn't. It's white." },
          { image: '⚫', vocabulary: 'black', question: "Is it red?", choices: ["No, it isn't. It's black.", "Yes, it is.", "It is yellow.", "It is white."], correctAnswer: "No, it isn't. It's black." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🔴', promptText: 'red', targetPhrase: 'red' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🔴', promptText: 'What color is it?', targetPhrase: 'What color is it?' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🔵', teacherQuestion: 'What color is it?', promptText: "It's blue.", targetPhrase: "It's blue." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🟡', promptText: "It's yellow.", targetPhrase: "It's yellow." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '⚫', teacherQuestion: 'What color is it?', promptText: "It's black.", targetPhrase: "It's black." }
        ]
      },
      {
        id: 'u2-l3',
        number: 3,
        title: 'Story: The Blue Paint',
        learningObjective: 'Practice sharing politely.',
        grammarFocus: 'Sharing expressions',
        vocabulary: [],
        sentencePatterns: [
          { pattern: "Let's share.", example: "Let's share.", translationVi: 'Chúng ta cùng dùng chung nhé.' },
          { pattern: 'OK.', example: 'OK.', translationVi: 'Được rồi.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: "Let's share.", translationVi: 'Chúng mình dùng chung nhé.' },
            { speaker: 'Student', text: 'OK.', translationVi: 'Được thôi!' }
          ],
          socialSkill: 'Be nice.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'share', question: "A: Let's share the blue paint.\nB: __________", choices: ["OK.", "No, it isn't.", "Thank you.", "You're welcome."], correctAnswer: "OK." },
          { image: '', vocabulary: 'share', question: "A: Can we share?\nB: __________", choices: ["Yes, let's share.", "I'm fine, thank you.", "See you.", "Great!"], correctAnswer: "Yes, let's share." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🤝', promptText: 'share', targetPhrase: 'share' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🤝', promptText: "Let's share.", targetPhrase: "Let's share." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🤝', teacherQuestion: "Let's share.", promptText: 'Okay. Thank you.', targetPhrase: 'Okay. Thank you.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🎨', promptText: 'This is blue paint.', targetPhrase: 'This is blue paint.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🤝', teacherQuestion: 'Can we share?', promptText: "Yes, let's share.", targetPhrase: "Yes, let's share." }
        ]
      },
      {
        id: 'u2-l4',
        number: 4,
        title: 'More Colors',
        learningObjective: 'Identify additional colors & color mixing.',
        grammarFocus: 'Color combinations',
        vocabulary: [
          { id: 'v25', word: 'green', meaningVi: 'màu xanh lá', exampleSentence: 'Blue and yellow make green.' },
          { id: 'v26', word: 'purple', meaningVi: 'màu tím', exampleSentence: "It's purple." },
          { id: 'v27', word: 'orange', meaningVi: 'màu cam', exampleSentence: "It's orange." },
          { id: 'v28', word: 'pink', meaningVi: 'màu hồng', exampleSentence: "It's pink." },
          { id: 'v29', word: 'gray', meaningVi: 'màu xám', exampleSentence: "It's gray." },
          { id: 'v30', word: 'brown', meaningVi: 'màu nâu', exampleSentence: "It's brown." }
        ],
        sentencePatterns: [
          { pattern: 'Blue and yellow make green.', example: 'Blue and yellow make green.', translationVi: 'Xanh dương và vàng tạo thành xanh lá.' }
        ],
        suggestedGames: ['pictureMatch', 'choosePicture', 'trueOrFalse'],
        practiceQuestions: [
          { image: '🟢', vocabulary: 'green', question: 'Blue and yellow make ______.', choices: ["green", "purple", "orange", "pink"], correctAnswer: "green" },
          { image: '🟣', vocabulary: 'purple', question: 'Red and blue make ______.', choices: ["purple", "green", "orange", "gray"], correctAnswer: "purple" },
          { image: '🟠', vocabulary: 'orange', question: 'Red and yellow make ______.', choices: ["orange", "pink", "purple", "brown"], correctAnswer: "orange" },
          { image: '🌸', vocabulary: 'pink', question: 'Red and white make ______.', choices: ["pink", "orange", "purple", "gray"], correctAnswer: "pink" },
          { image: '🔘', vocabulary: 'gray', question: 'Black and white make ______.', choices: ["gray", "brown", "pink", "orange"], correctAnswer: "gray" },
          { image: '🟢', vocabulary: 'green', question: 'What color is it?', choices: ["It's green.", "It's purple.", "It's orange.", "It's pink."], correctAnswer: "It's green." },
          { image: '🟣', vocabulary: 'purple', question: 'What color is it?', choices: ["It's purple.", "It's green.", "It's orange.", "It's pink."], correctAnswer: "It's purple." },
          { image: '🟠', vocabulary: 'orange', question: 'What color is it?', choices: ["It's orange.", "It's purple.", "It's green.", "It's pink."], correctAnswer: "It's orange." },
          { image: '🌸', vocabulary: 'pink', question: 'What color is it?', choices: ["It's pink.", "It's gray.", "It's brown.", "It's green."], correctAnswer: "It's pink." },
          { image: '🟤', vocabulary: 'brown', question: 'What color is it?', choices: ["It's brown.", "It's gray.", "It's pink.", "It's orange."], correctAnswer: "It's brown." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🟢', promptText: 'green', targetPhrase: 'green' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🟣', promptText: "It's purple.", targetPhrase: "It's purple." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🟠', teacherQuestion: 'What color is it?', promptText: "It's orange.", targetPhrase: "It's orange." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🌸', promptText: "It's pink.", targetPhrase: "It's pink." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🟤', teacherQuestion: 'What color is it?', promptText: "It's brown.", targetPhrase: "It's brown." }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'BIRTHDAY PARTY',
    theme: 'Birthday Party',
    learningGoal: 'Students count numbers and identify toys.',
    lessons: [
      {
        id: 'u3-l1',
        number: 1,
        title: 'Numbers',
        learningObjective: 'Students count numbers 1–12 and express age.',
        grammarFocus: 'Age & Numbers',
        vocabulary: [
          { id: 'v31', word: 'one', meaningVi: 'số 1' },
          { id: 'v32', word: 'two', meaningVi: 'số 2' },
          { id: 'v33', word: 'three', meaningVi: 'số 3' },
          { id: 'v34', word: 'four', meaningVi: 'số 4' },
          { id: 'v35', word: 'five', meaningVi: 'số 5' },
          { id: 'v36', word: 'six', meaningVi: 'số 6' },
          { id: 'v37', word: 'seven', meaningVi: 'số 7' },
          { id: 'v38', word: 'eight', meaningVi: 'số 8' },
          { id: 'v39', word: 'nine', meaningVi: 'số 9' },
          { id: 'v40', word: 'ten', meaningVi: 'số 10' },
          { id: 'v41', word: 'eleven', meaningVi: 'số 11' },
          { id: 'v42', word: 'twelve', meaningVi: 'số 12' }
        ],
        sentencePatterns: [
          { pattern: 'How old are you?', example: 'How old are you?', translationVi: 'Bạn bao nhiêu tuổi?' },
          { pattern: "I'm seven. / I'm eight.", example: "I'm seven.", translationVi: 'Tớ 7 tuổi.' }
        ],
        suggestedGames: ['flashcard', 'choosePicture', 'memoryGame'],
        practiceQuestions: [
          { image: '7️⃣', vocabulary: 'seven', question: "How old are you?", choices: ["I'm seven.", "I'm eight.", "I'm nine.", "I'm ten."], correctAnswer: "I'm seven." },
          { image: '8️⃣', vocabulary: 'eight', question: "How old are you?", choices: ["I'm eight.", "I'm seven.", "I'm nine.", "I'm ten."], correctAnswer: "I'm eight." },
          { image: '9️⃣', vocabulary: 'nine', question: "How old are you?", choices: ["I'm nine.", "I'm seven.", "I'm eight.", "I'm ten."], correctAnswer: "I'm nine." },
          { image: '🔟', vocabulary: 'ten', question: "How old are you?", choices: ["I'm ten.", "I'm seven.", "I'm eight.", "I'm nine."], correctAnswer: "I'm ten." },
          { image: '6️⃣', vocabulary: 'six', question: "How old are you?", choices: ["I'm six.", "I'm five.", "I'm four.", "I'm three."], correctAnswer: "I'm six." },
          { image: '5️⃣', vocabulary: 'five', question: "How old are you?", choices: ["I'm five.", "I'm six.", "I'm seven.", "I'm eight."], correctAnswer: "I'm five." },
          { image: '4️⃣', vocabulary: 'four', question: "How old are you?", choices: ["I'm four.", "I'm three.", "I'm two.", "I'm one."], correctAnswer: "I'm four." },
          { image: '3️⃣', vocabulary: 'three', question: "How old are you?", choices: ["I'm three.", "I'm four.", "I'm five.", "I'm six."], correctAnswer: "I'm three." },
          { image: '2️⃣', vocabulary: 'two', question: "How old are you?", choices: ["I'm two.", "I'm one.", "I'm three.", "I'm four."], correctAnswer: "I'm two." },
          { image: '1️⃣', vocabulary: 'one', question: "How old are you?", choices: ["I'm one.", "I'm two.", "I'm three.", "I'm four."], correctAnswer: "I'm one." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '7️⃣', promptText: 'seven', targetPhrase: 'seven' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '7️⃣', promptText: "I'm seven.", targetPhrase: "I'm seven." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '8️⃣', teacherQuestion: 'How old are you?', promptText: "I'm eight.", targetPhrase: "I'm eight." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '1️⃣', promptText: "I'm one year old.", targetPhrase: "I'm one year old." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '9️⃣', teacherQuestion: 'How old are you?', promptText: "I'm nine.", targetPhrase: "I'm nine." }
        ]
      },
      {
        id: 'u3-l2',
        number: 2,
        title: 'Toys',
        learningObjective: 'Count toys correctly.',
        grammarFocus: 'Singular / Plural',
        vocabulary: [
          { id: 'v43', word: 'doll', meaningVi: 'búp bê (ít)', exampleSentence: 'One doll.' },
          { id: 'v44', word: 'dolls', meaningVi: 'búp bê (nhiều)', exampleSentence: 'Two dolls.' },
          { id: 'v45', word: 'ball', meaningVi: 'quả bóng (ít)', exampleSentence: 'One ball.' },
          { id: 'v46', word: 'balls', meaningVi: 'quả bóng (nhiều)', exampleSentence: 'Three balls.' },
          { id: 'v47', word: 'car', meaningVi: 'ô tô (ít)', exampleSentence: 'One car.' },
          { id: 'v48', word: 'cars', meaningVi: 'ô tô (nhiều)', exampleSentence: 'Four cars.' },
          { id: 'v49', word: 'kite', meaningVi: 'con diều (ít)', exampleSentence: 'One kite.' },
          { id: 'v50', word: 'kites', meaningVi: 'con diều (nhiều)', exampleSentence: 'Two kites.' }
        ],
        sentencePatterns: [
          { pattern: 'How many dolls?', example: 'How many dolls?', translationVi: 'Có bao nhiêu con búp bê?' },
          { pattern: 'One doll. / Two dolls.', example: 'Two dolls.', translationVi: 'Một con búp bê. / Hai con búp bê.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse', 'mysteryBox'],
        practiceQuestions: [
          { image: '🧸', vocabulary: 'doll', question: "How many dolls?", choices: ["One doll.", "Two dolls.", "Three dolls.", "Four dolls."], correctAnswer: "One doll." },
          { image: '🧸🧸', vocabulary: 'dolls', question: "How many dolls?", choices: ["Two dolls.", "One doll.", "Three dolls.", "Four dolls."], correctAnswer: "Two dolls." },
          { image: '⚽', vocabulary: 'ball', question: "How many balls?", choices: ["One ball.", "Two balls.", "Three balls.", "Four balls."], correctAnswer: "One ball." },
          { image: '⚽⚽', vocabulary: 'balls', question: "How many balls?", choices: ["Two balls.", "One ball.", "Three balls.", "Four balls."], correctAnswer: "Two balls." },
          { image: '🚗', vocabulary: 'car', question: "How many cars?", choices: ["One car.", "Two cars.", "Three cars.", "Four cars."], correctAnswer: "One car." },
          { image: '🚗🚗', vocabulary: 'cars', question: "How many cars?", choices: ["Two cars.", "One car.", "Three cars.", "Four cars."], correctAnswer: "Two cars." },
          { image: '🪁', vocabulary: 'kite', question: "How many kites?", choices: ["One kite.", "Two kites.", "Three kites.", "Four kites."], correctAnswer: "One kite." },
          { image: '🪁🪁', vocabulary: 'kites', question: "How many kites?", choices: ["Two kites.", "One kite.", "Three kites.", "Four kites."], correctAnswer: "Two kites." },
          { image: '🧸', vocabulary: 'doll', question: "What is it?", choices: ["It's a doll.", "It's a ball.", "It's a car.", "It's a kite."], correctAnswer: "It's a doll." },
          { image: '⚽', vocabulary: 'ball', question: "What is it?", choices: ["It's a ball.", "It's a doll.", "It's a car.", "It's a kite."], correctAnswer: "It's a ball." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🧸🧸', promptText: 'dolls', targetPhrase: 'dolls' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🧸🧸', promptText: 'How many balls?', targetPhrase: 'How many balls?' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🚗🚗', teacherQuestion: 'How many cars?', promptText: 'Two cars.', targetPhrase: 'Two cars.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🧸', promptText: 'One doll.', targetPhrase: 'One doll.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🧸🧸', teacherQuestion: 'How many kites?', promptText: 'Two kites.', targetPhrase: 'Two kites.' }
        ]
      },
      {
        id: 'u3-l3',
        number: 3,
        title: 'Story: My Turn!',
        learningObjective: 'Practice taking turns politely.',
        grammarFocus: 'Turn taking',
        vocabulary: [],
        sentencePatterns: [
          { pattern: "It's your turn.", example: "It's your turn.", translationVi: 'Đến lượt bạn rồi.' },
          { pattern: 'Thank you.', example: 'Thank you.', translationVi: 'Cảm ơn bạn.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: "It's your turn.", translationVi: 'Đến lượt bạn đấy.' },
            { speaker: 'Student', text: 'Thank you.', translationVi: 'Cảm ơn nhé.' }
          ],
          socialSkill: 'Be fair.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'play', question: "A: It's your turn.\nB: __________", choices: ["Thank you.", "Let's play!", "It's my turn.", "No, it isn't."], correctAnswer: "Thank you." },
          { image: '', vocabulary: 'play', question: "A: Let's play a game!\nB: __________", choices: ["Okay, let's play.", "Nice to meet you.", "How are you?", "You're welcome."], correctAnswer: "Okay, let's play." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🎮', promptText: 'play', targetPhrase: 'play' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🎮', promptText: "Let's play!", targetPhrase: "Let's play!" },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🎮', teacherQuestion: "It's your turn.", promptText: 'Thank you.', targetPhrase: 'Thank you.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🎮', promptText: "Let's play a game.", targetPhrase: "Let's play a game." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '⚽🏃', teacherQuestion: "Let's play soccer.", promptText: "Okay, let's play.", targetPhrase: "Okay, let's play." }
        ]
      },
      {
        id: 'u3-l4',
        number: 4,
        title: 'More Toys',
        learningObjective: 'Identify more toys and use "have".',
        grammarFocus: 'Have / Singular / Plural',
        vocabulary: [
          { id: 'v51', word: 'game', meaningVi: 'trò chơi', exampleSentence: 'I have one game.' },
          { id: 'v52', word: 'marble', meaningVi: 'viên bi', exampleSentence: 'I have five marbles.' },
          { id: 'v53', word: 'puzzle', meaningVi: 'trò xếp hình', exampleSentence: 'I have a puzzle.' },
          { id: 'v54', word: 'card', meaningVi: 'thẻ bài', exampleSentence: 'I have two cards.' }
        ],
        sentencePatterns: [
          { pattern: 'I have one game.', example: 'I have one game.', translationVi: 'Tớ có một trò chơi.' },
          { pattern: 'I have two games.', example: 'I have two games.', translationVi: 'Tớ có hai trò chơi.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch'],
        practiceQuestions: [
          { image: '🎮', vocabulary: 'game', question: 'What do you have?', choices: ["I have one game.", "I have a puzzle.", "I have cards.", "I have marbles."], correctAnswer: "I have one game." },
          { image: '🔮', vocabulary: 'marble', question: 'What do you have?', choices: ["I have marbles.", "I have one game.", "I have a puzzle.", "I have cards."], correctAnswer: "I have marbles." },
          { image: '🧩', vocabulary: 'puzzle', question: 'What do you have?', choices: ["I have a puzzle.", "I have one game.", "I have cards.", "I have marbles."], correctAnswer: "I have a puzzle." },
          { image: '🃏', vocabulary: 'card', question: 'What do you have?', choices: ["I have cards.", "I have one game.", "I have a puzzle.", "I have marbles."], correctAnswer: "I have cards." },
          { image: '🎮', vocabulary: 'game', question: 'Do you have a game?', choices: ["Yes, I do.", "No, I don't.", "I have two cars.", "One doll."], correctAnswer: "Yes, I do." },
          { image: '🔮', vocabulary: 'marble', question: 'How many marbles?', choices: ["I have five marbles.", "I have one game.", "I have two cards.", "I have a puzzle."], correctAnswer: "I have five marbles." },
          { image: '🧩', vocabulary: 'puzzle', question: 'Do you have a puzzle?', choices: ["Yes, I do.", "No, I don't.", "I have a game.", "I have cards."], correctAnswer: "Yes, I do." },
          { image: '🃏', vocabulary: 'card', question: 'How many cards?', choices: ["I have two cards.", "I have one game.", "I have a puzzle.", "I have marbles."], correctAnswer: "I have two cards." },
          { image: '🎮', vocabulary: 'game', question: 'What is it?', choices: ["It's a game.", "It's a doll.", "It's a car.", "It's a kite."], correctAnswer: "It's a game." },
          { image: '🧩', vocabulary: 'puzzle', question: 'What is it?', choices: ["It's a puzzle.", "It's a ball.", "It's a doll.", "It's a car."], correctAnswer: "It's a puzzle." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🧩', promptText: 'puzzle', targetPhrase: 'puzzle' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🧩', promptText: 'I have two puzzles.', targetPhrase: 'I have two puzzles.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🔮', teacherQuestion: 'How many marbles?', promptText: 'One marble.', targetPhrase: 'One marble.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🃏', promptText: 'These are cards.', targetPhrase: 'These are cards.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🧩', teacherQuestion: 'How many games?', promptText: 'One game.', targetPhrase: 'One game.' }
        ]
      }
    ],
    checkUp: {
      title: 'CHECK UP 2 (Units 3–4)',
      description: 'Review vocabulary and sentence patterns from Units 3 and 4.',
      phonics: ['bat', 'map', 'bed', 'net', 'pin', 'bib', 'mop', 'pot', 'tub', 'nut'],
      project: 'All About Me Book'
    }
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'HOME',
    theme: 'My Home',
    learningGoal: 'Students talk about family and food.',
    lessons: [
      {
        id: 'u4-l1',
        number: 1,
        title: 'Family',
        learningObjective: 'Identify family members.',
        grammarFocus: 'Possessive adjective: my',
        vocabulary: [
          { id: 'v55', word: 'mother', meaningVi: 'mẹ', exampleSentence: 'This is my mother.' },
          { id: 'v56', word: 'father', meaningVi: 'bố', exampleSentence: 'This is my father.' },
          { id: 'v57', word: 'brother', meaningVi: 'anh/em trai', exampleSentence: 'This is my brother.' },
          { id: 'v58', word: 'sister', meaningVi: 'chị/em gái', exampleSentence: 'This is my sister.' },
          { id: 'v59', word: 'grandmother', meaningVi: 'bà', exampleSentence: 'This is my grandmother.' },
          { id: 'v60', word: 'grandfather', meaningVi: 'ông', exampleSentence: 'This is my grandfather.' }
        ],
        sentencePatterns: [
          { pattern: "Who's this?", example: "Who's this?", translationVi: 'Đây là ai?' },
          { pattern: 'This is my mother.', example: 'This is my mother.', translationVi: 'Đây là mẹ của tớ.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture'],
        practiceQuestions: [
          { image: '👩', vocabulary: 'mother', question: "Who's this?", choices: ["This is my mother.", "This is my father.", "This is my sister.", "This is my brother."], correctAnswer: "This is my mother." },
          { image: '👨', vocabulary: 'father', question: "Who's this?", choices: ["This is my father.", "This is my mother.", "This is my sister.", "This is my brother."], correctAnswer: "This is my father." },
          { image: '👦', vocabulary: 'brother', question: "Who's this?", choices: ["This is my brother.", "This is my sister.", "This is my mother.", "This is my father."], correctAnswer: "This is my brother." },
          { image: '👧', vocabulary: 'sister', question: "Who's this?", choices: ["This is my sister.", "This is my brother.", "This is my mother.", "This is my father."], correctAnswer: "This is my sister." },
          { image: '👵', vocabulary: 'grandmother', question: "Who's this?", choices: ["This is my grandmother.", "This is my grandfather.", "This is my mother.", "This is my father."], correctAnswer: "This is my grandmother." },
          { image: '👴', vocabulary: 'grandfather', question: "Who's this?", choices: ["This is my grandfather.", "This is my grandmother.", "This is my mother.", "This is my father."], correctAnswer: "This is my grandfather." },
          { image: '👩', vocabulary: 'mother', question: "Is this your mother?", choices: ["Yes, it is.", "No, it isn't.", "This is my father.", "This is my brother."], correctAnswer: "Yes, it is." },
          { image: '👨', vocabulary: 'father', question: "Is this your mother?", choices: ["No, it isn't. This is my father.", "Yes, it is.", "This is my sister.", "This is my brother."], correctAnswer: "No, it isn't. This is my father." },
          { image: '👦', vocabulary: 'brother', question: "Is this your brother?", choices: ["Yes, it is.", "No, it isn't.", "This is my sister.", "This is my father."], correctAnswer: "Yes, it is." },
          { image: '👧', vocabulary: 'sister', question: "Is this your brother?", choices: ["No, it isn't. This is my sister.", "Yes, it is.", "This is my father.", "This is my mother."], correctAnswer: "No, it isn't. This is my sister." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '👩', promptText: 'mother', targetPhrase: 'mother' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '👨', promptText: 'This is my father.', targetPhrase: 'This is my father.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '👦', teacherQuestion: "Who's this?", promptText: 'This is my brother.', targetPhrase: 'This is my brother.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '👵', promptText: 'This is my grandmother.', targetPhrase: 'This is my grandmother.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '👴', teacherQuestion: "Who's this?", promptText: 'This is my grandfather.', targetPhrase: 'This is my grandfather.' }
        ]
      },
      {
        id: 'u4-l2',
        number: 2,
        title: 'Food',
        learningObjective: 'Express food preferences.',
        grammarFocus: 'Like / Don\'t like',
        vocabulary: [
          { id: 'v61', word: 'juice', meaningVi: 'nước ép', exampleSentence: 'I like juice.' },
          { id: 'v62', word: 'chicken', meaningVi: 'thịt gà', exampleSentence: "I don't like chicken." },
          { id: 'v63', word: 'fish', meaningVi: 'cá', exampleSentence: 'I like fish.' },
          { id: 'v64', word: 'ice cream', meaningVi: 'kem', exampleSentence: 'I like ice cream.' }
        ],
        sentencePatterns: [
          { pattern: 'I like juice.', example: 'I like juice.', translationVi: 'Tớ thích nước ép.' },
          { pattern: "I don't like juice.", example: "I don't like juice.", translationVi: 'Tớ không thích nước ép.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse', 'mysteryBox'],
        practiceQuestions: [
          { image: '🧃', vocabulary: 'juice', question: 'Do you like juice?', choices: ["I like juice.", "I don't like juice.", "I like chicken.", "I don't like fish."], correctAnswer: "I like juice." },
          { image: '🍗', vocabulary: 'chicken', question: 'Do you like chicken?', choices: ["I don't like chicken.", "I like chicken.", "I like juice.", "I like ice cream."], correctAnswer: "I don't like chicken." },
          { image: '🐟', vocabulary: 'fish', question: 'Do you like fish?', choices: ["I like fish.", "I don't like fish.", "I like juice.", "I like ice cream."], correctAnswer: "I like fish." },
          { image: '🍦', vocabulary: 'ice cream', question: 'Do you like ice cream?', choices: ["I like ice cream.", "I don't like ice cream.", "I like chicken.", "I don't like fish."], correctAnswer: "I like ice cream." },
          { image: '🧃', vocabulary: 'juice', question: 'Do you like juice?', choices: ["No, I don't like juice.", "Yes, I do.", "I like chicken.", "I like fish."], correctAnswer: "No, I don't like juice." },
          { image: '🍗', vocabulary: 'chicken', question: 'Do you like chicken?', choices: ["Yes, I like chicken.", "No, I don't.", "I like juice.", "I don't like fish."], correctAnswer: "Yes, I like chicken." },
          { image: '🐟', vocabulary: 'fish', question: 'Do you like fish?', choices: ["Yes, I like fish.", "No, I don't.", "I like juice.", "I don't like chicken."], correctAnswer: "Yes, I like fish." },
          { image: '🍦', vocabulary: 'ice cream', question: 'Do you like ice cream?', choices: ["Yes, I like ice cream.", "No, I don't.", "I like chicken.", "I don't like fish."], correctAnswer: "Yes, I like ice cream." },
          { image: '🧃', vocabulary: 'juice', question: 'What is it?', choices: ["It's juice.", "It's chicken.", "It's fish.", "It's ice cream."], correctAnswer: "It's juice." },
          { image: '🍗', vocabulary: 'chicken', question: 'What is it?', choices: ["It's chicken.", "It's juice.", "It's fish.", "It's ice cream."], correctAnswer: "It's chicken." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🍗', promptText: 'chicken', targetPhrase: 'chicken' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🍦', promptText: 'I like ice cream.', targetPhrase: 'I like ice cream.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🍗', teacherQuestion: 'Do you like chicken?', promptText: 'Yes, I do.', targetPhrase: 'Yes, I do.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🧃', promptText: "I don't like juice.", targetPhrase: "I don't like juice." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🐟', teacherQuestion: 'Do you like fish?', promptText: "No, I don't like fish.", targetPhrase: "No, I don't like fish." }
        ]
      },
      {
        id: 'u4-l3',
        number: 3,
        title: 'Story: Cookies',
        learningObjective: 'Offer and accept politely.',
        grammarFocus: 'Sharing cookies',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'Here you are.', example: 'Here you are.', translationVi: 'Của bạn đây.' },
          { pattern: 'Thank you.', example: 'Thank you.', translationVi: 'Cảm ơn bạn.' },
          { pattern: "You're welcome.", example: "You're welcome.", translationVi: 'Không có gì đâu.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: 'Here you are.', translationVi: 'Của bạn đây.' },
            { speaker: 'Student', text: 'Thank you.', translationVi: 'Tớ cảm ơn.' },
            { speaker: 'Friend', text: "You're welcome.", translationVi: 'Không có gì.' }
          ],
          socialSkill: 'Be kind.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'cookie', question: "A: Here you are.\nB: __________", choices: ["Thank you.", "You're welcome.", "No, it isn't.", "Goodbye."], correctAnswer: "Thank you." },
          { image: '', vocabulary: 'welcome', question: "A: Thank you!\nB: __________", choices: ["You're welcome.", "Here you are.", "I'm fine.", "OK."], correctAnswer: "You're welcome." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🍪', promptText: 'cookie', targetPhrase: 'cookie' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🍪', promptText: 'Here you are.', targetPhrase: 'Here you are.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🍪', teacherQuestion: 'Thank you.', promptText: "You're welcome.", targetPhrase: "You're welcome." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🍞', promptText: 'This is bread.', targetPhrase: 'This is bread.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🍪', teacherQuestion: 'Here is a cookie for you.', promptText: 'Thank you very much.', targetPhrase: 'Thank you very much.' }
        ]
      },
      {
        id: 'u4-l4',
        number: 4,
        title: 'More Food',
        learningObjective: 'Identify more food items.',
        grammarFocus: 'This is... / Like...',
        vocabulary: [
          { id: 'v65', word: 'pizza', meaningVi: 'bánh pizza', exampleSentence: 'This is pizza. I like pizza.' },
          { id: 'v66', word: 'rice', meaningVi: 'cơm / gạo', exampleSentence: 'This is rice.' },
          { id: 'v67', word: 'cookie', meaningVi: 'bánh quy', exampleSentence: 'I like cookies.' },
          { id: 'v68', word: 'bread', meaningVi: 'bánh mì', exampleSentence: 'This is bread.' }
        ],
        sentencePatterns: [
          { pattern: "What's this?", example: "What's this?", translationVi: 'Đây là cái gì?' },
          { pattern: 'This is pizza. I like pizza.', example: 'This is pizza.', translationVi: 'Đây là pizza. Tớ thích pizza.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch'],
        practiceQuestions: [
          { image: '🍕', vocabulary: 'pizza', question: "What's this?", choices: ["This is pizza.", "This is rice.", "This is a cookie.", "This is bread."], correctAnswer: "This is pizza." },
          { image: '🍚', vocabulary: 'rice', question: "What's this?", choices: ["This is rice.", "This is pizza.", "This is a cookie.", "This is bread."], correctAnswer: "This is rice." },
          { image: '🍪', vocabulary: 'cookie', question: "What's this?", choices: ["This is a cookie.", "This is pizza.", "This is rice.", "This is bread."], correctAnswer: "This is a cookie." },
          { image: '🍞', vocabulary: 'bread', question: "What's this?", choices: ["This is bread.", "This is pizza.", "This is rice.", "This is a cookie."], correctAnswer: "This is bread." },
          { image: '🍕', vocabulary: 'pizza', question: "Do you like pizza?", choices: ["Yes, I like pizza.", "No, I don't.", "This is rice.", "This is bread."], correctAnswer: "Yes, I like pizza." },
          { image: '🍚', vocabulary: 'rice', question: "Is this rice?", choices: ["Yes, this is rice.", "No, it isn't.", "This is pizza.", "This is bread."], correctAnswer: "Yes, this is rice." },
          { image: '🍪', vocabulary: 'cookie', question: "Is this bread?", choices: ["No, it isn't. It's a cookie.", "Yes, it is.", "This is rice.", "This is pizza."], correctAnswer: "No, it isn't. It's a cookie." },
          { image: '🍞', vocabulary: 'bread', question: "Do you like bread?", choices: ["Yes, I like bread.", "No, I don't.", "This is pizza.", "This is rice."], correctAnswer: "Yes, I like bread." },
          { image: '🍕', vocabulary: 'pizza', question: "What's this?", choices: ["This is pizza.", "This is rice.", "This is a cookie.", "This is bread."], correctAnswer: "This is pizza." },
          { image: '🍪', vocabulary: 'cookie', question: "What's this?", choices: ["This is a cookie.", "This is pizza.", "This is rice.", "This is bread."], correctAnswer: "This is a cookie." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🍞', promptText: 'bread', targetPhrase: 'bread' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🍕', promptText: 'This is pizza. I like pizza.', targetPhrase: 'This is pizza. I like pizza.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🍚', teacherQuestion: "What's this?", promptText: 'This is rice.', targetPhrase: 'This is rice.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🍪', promptText: 'I like cookies.', targetPhrase: 'I like cookies.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🍞', teacherQuestion: "What's this?", promptText: 'This is bread.', targetPhrase: 'This is bread.' }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'THE PARK',
    theme: 'The Park',
    learningGoal: 'Students identify nature, outdoor activities, and simple abilities.',
    lessons: [
      {
        id: 'u5-l1',
        number: 1,
        title: 'Nature',
        learningObjective: 'Identify common objects found in nature.',
        grammarFocus: 'I can see... Singular and plural nouns',
        vocabulary: [
          { id: 'v69', word: 'flower', meaningVi: 'bông hoa', exampleSentence: 'I can see a flower.' },
          { id: 'v70', word: 'tree', meaningVi: 'cây', exampleSentence: 'I can see a tree.' },
          { id: 'v71', word: 'rock', meaningVi: 'hòn đá', exampleSentence: 'I can see rocks.' },
          { id: 'v72', word: 'river', meaningVi: 'dòng sông', exampleSentence: 'I can see a river.' },
          { id: 'v73', word: 'hill', meaningVi: 'ngọn đồi', exampleSentence: 'I can see a hill.' },
          { id: 'v74', word: 'lake', meaningVi: 'hồ nước', exampleSentence: 'I can see a lake.' }
        ],
        sentencePatterns: [
          { pattern: 'What can you see?', example: 'What can you see?', translationVi: 'Bạn nhìn thấy gì?' },
          { pattern: 'I can see a flower.', example: 'I can see a flower.', translationVi: 'Tớ có thể nhìn thấy một bông hoa.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture'],
        practiceQuestions: [
          { image: '🌸', vocabulary: 'flower', question: 'What can you see?', choices: ["I can see a flower.", "I can see a tree.", "I can see a rock.", "I can see a river."], correctAnswer: "I can see a flower." },
          { image: '🌳', vocabulary: 'tree', question: 'What can you see?', choices: ["I can see a tree.", "I can see a flower.", "I can see a rock.", "I can see a river."], correctAnswer: "I can see a tree." },
          { image: '🪨', vocabulary: 'rock', question: 'What can you see?', choices: ["I can see a rock.", "I can see a flower.", "I can see a tree.", "I can see a river."], correctAnswer: "I can see a rock." },
          { image: '🏞️', vocabulary: 'river', question: 'What can you see?', choices: ["I can see a river.", "I can see a flower.", "I can see a tree.", "I can see a rock."], correctAnswer: "I can see a river." },
          { image: '⛰️', vocabulary: 'hill', question: 'What can you see?', choices: ["I can see a hill.", "I can see a lake.", "I can see a flower.", "I can see a tree."], correctAnswer: "I can see a hill." },
          { image: '🌅', vocabulary: 'lake', question: 'What can you see?', choices: ["I can see a lake.", "I can see a hill.", "I can see a flower.", "I can see a tree."], correctAnswer: "I can see a lake." },
          { image: '🌸', vocabulary: 'flower', question: 'Can you see a flower?', choices: ["Yes, I can.", "No, I can't.", "I can see a river.", "I can see a rock."], correctAnswer: "Yes, I can." },
          { image: '🪨', vocabulary: 'rock', question: 'Can you see a tree?', choices: ["No, I can't. I can see a rock.", "Yes, I can.", "I can see a flower.", "I can see a river."], correctAnswer: "No, I can't. I can see a rock." },
          { image: '🏞️', vocabulary: 'river', question: 'What can you see?', choices: ["I can see a river.", "I can see a flower.", "I can see a tree.", "I can see a rock."], correctAnswer: "I can see a river." },
          { image: '⛰️', vocabulary: 'hill', question: 'What can you see?', choices: ["I can see a hill.", "I can see a lake.", "I can see a flower.", "I can see a tree."], correctAnswer: "I can see a hill." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🌸', promptText: 'flower', targetPhrase: 'flower' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🌳', promptText: 'I can see a tree.', targetPhrase: 'I can see a tree.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🏞️', teacherQuestion: 'What can you see?', promptText: 'I can see a river.', targetPhrase: 'I can see a river.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '⛰️', promptText: 'I can see a hill.', targetPhrase: 'I can see a hill.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🌅', teacherQuestion: 'What can you see?', promptText: 'I can see a lake.', targetPhrase: 'I can see a lake.' }
        ]
      },
      {
        id: 'u5-l2',
        number: 2,
        title: 'Activities',
        learningObjective: 'Describe simple abilities and activities.',
        grammarFocus: 'Can / Can\'t',
        vocabulary: [
          { id: 'v75', word: 'play soccer', meaningVi: 'đá bóng', exampleSentence: 'I can play soccer.' },
          { id: 'v76', word: 'jump rope', meaningVi: 'nhảy dây', exampleSentence: 'I can jump rope.' },
          { id: 'v77', word: 'fly a kite', meaningVi: 'thả diều', exampleSentence: 'I can fly a kite.' },
          { id: 'v78', word: 'ride a bike', meaningVi: 'đi xe đạp', exampleSentence: "I can't ride a bike." }
        ],
        sentencePatterns: [
          { pattern: 'I can play soccer.', example: 'I can play soccer.', translationVi: 'Tớ có thể đá bóng.' },
          { pattern: "I can't play soccer.", example: "I can't play soccer.", translationVi: 'Tớ không biết đá bóng.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse'],
        practiceQuestions: [
          { image: '⚽🏃', vocabulary: 'play soccer', question: 'What can you do?', choices: ["I can play soccer.", "I can jump rope.", "I can fly a kite.", "I can ride a bike."], correctAnswer: "I can play soccer." },
          { image: '🏃‍♀️', vocabulary: 'jump rope', question: 'What can you do?', choices: ["I can jump rope.", "I can play soccer.", "I can fly a kite.", "I can ride a bike."], correctAnswer: "I can jump rope." },
          { image: '🪁🏃', vocabulary: 'fly a kite', question: 'What can you do?', choices: ["I can fly a kite.", "I can play soccer.", "I can jump rope.", "I can ride a bike."], correctAnswer: "I can fly a kite." },
          { image: '🚴', vocabulary: 'ride a bike', question: 'What can you do?', choices: ["I can't ride a bike.", "I can ride a bike.", "I can play soccer.", "I can jump rope."], correctAnswer: "I can't ride a bike." },
          { image: '⚽🏃', vocabulary: 'play soccer', question: 'Can you play soccer?', choices: ["Yes, I can.", "No, I can't.", "I can jump rope.", "I can fly a kite."], correctAnswer: "Yes, I can." },
          { image: '🚴', vocabulary: 'ride a bike', question: 'Can you ride a bike?', choices: ["No, I can't.", "Yes, I can.", "I can play soccer.", "I can jump rope."], correctAnswer: "No, I can't." },
          { image: '🏃‍♀️', vocabulary: 'jump rope', question: 'Can you jump rope?', choices: ["Yes, I can.", "No, I can't.", "I can fly a kite.", "I can ride a bike."], correctAnswer: "Yes, I can." },
          { image: '🪁🏃', vocabulary: 'fly a kite', question: 'Can you fly a kite?', choices: ["Yes, I can.", "No, I can't.", "I can play soccer.", "I can ride a bike."], correctAnswer: "Yes, I can." },
          { image: '⚽🏃', vocabulary: 'play soccer', question: 'What can you do?', choices: ["I can play soccer.", "I can jump rope.", "I can fly a kite.", "I can ride a bike."], correctAnswer: "I can play soccer." },
          { image: '🚴', vocabulary: 'ride a bike', question: 'What can you do?', choices: ["I can't ride a bike.", "I can ride a bike.", "I can play soccer.", "I can jump rope."], correctAnswer: "I can't ride a bike." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '⚽🏃', promptText: 'soccer', targetPhrase: 'soccer' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🚴', promptText: 'I can ride a bike.', targetPhrase: 'I can ride a bike.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🪁🏃', teacherQuestion: 'Can you fly a kite?', promptText: 'Yes, I can.', targetPhrase: 'Yes, I can.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🏃‍♀️', promptText: 'I can jump rope.', targetPhrase: 'I can jump rope.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '⚽🏃', teacherQuestion: 'Can you play soccer?', promptText: "No, I can't.", targetPhrase: "No, I can't." }
        ]
      },
      {
        id: 'u5-l3',
        number: 3,
        title: 'Story: My Kite!',
        learningObjective: 'Ask politely for and offer help.',
        grammarFocus: 'Asking for help',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'Please help me.', example: 'Please help me.', translationVi: 'Làm ơn giúp tớ với.' },
          { pattern: 'Sure.', example: 'Sure.', translationVi: 'Tất nhiên rồi.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: 'Please help me.', translationVi: 'Cậu giúp tớ với.' },
            { speaker: 'Student', text: 'Sure.', translationVi: 'Chắc chắn rồi!' }
          ],
          socialSkill: 'Be helpful.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'help', question: "A: Please help me with the kite.\nB: __________", choices: ["Sure.", "No, thank you.", "You're welcome.", "I'm seven."], correctAnswer: "Sure." },
          { image: '', vocabulary: 'help', question: "A: Can you help me?\nB: __________", choices: ["Yes, I can.", "No, it isn't.", "Goodbye.", "Thank you."], correctAnswer: "Yes, I can." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🏃', promptText: 'help', targetPhrase: 'help' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🏃', promptText: 'Please help me.', targetPhrase: 'Please help me.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🏃', teacherQuestion: 'Can you help me?', promptText: 'Yes, I can.', targetPhrase: 'Yes, I can.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🏃', promptText: 'Please help me run.', targetPhrase: 'Please help me run.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🚴', teacherQuestion: 'Can you ride a bike?', promptText: 'Yes, I can. Look at me!', targetPhrase: 'Yes, I can. Look at me!' }
        ]
      },
      {
        id: 'u5-l4',
        number: 4,
        title: 'Animals',
        learningObjective: 'Identify park animals & ask "Can you see...?"',
        grammarFocus: 'Can you see...? Yes, I can. / No, I can\'t.',
        vocabulary: [
          { id: 'v79', word: 'turtle', meaningVi: 'con rùa', exampleSentence: 'Can you see a turtle?' },
          { id: 'v80', word: 'frog', meaningVi: 'con ếch', exampleSentence: 'I can see a frog.' },
          { id: 'v81', word: 'spider', meaningVi: "It's a spider.", exampleSentence: "It's a spider." },
          { id: 'v82', word: 'ant', meaningVi: 'con kiến', exampleSentence: 'I see an ant.' }
        ],
        sentencePatterns: [
          { pattern: 'Can you see a turtle?', example: 'Can you see a turtle?', translationVi: 'Cậu có thấy con rùa không?' },
          { pattern: 'Yes, I can. / No, I can\'t.', example: 'Yes, I can.', translationVi: 'Có, tớ thấy. / Không, tớ không thấy.' }
        ],
        suggestedGames: ['choosePicture', 'mysteryBox'],
        practiceQuestions: [
          { image: '🐢', vocabulary: 'turtle', question: 'What can you see?', choices: ["I can see a turtle.", "I can see a frog.", "I can see a spider.", "I can see an ant."], correctAnswer: "I can see a turtle." },
          { image: '🐸', vocabulary: 'frog', question: 'What can you see?', choices: ["I can see a frog.", "I can see a turtle.", "I can see a spider.", "I can see an ant."], correctAnswer: "I can see a frog." },
          { image: '🕷️', vocabulary: 'spider', question: 'What can you see?', choices: ["I can see a spider.", "I can see a turtle.", "I can see a frog.", "I can see an ant."], correctAnswer: "I can see a spider." },
          { image: '🐜', vocabulary: 'ant', question: 'What can you see?', choices: ["I can see an ant.", "I can see a turtle.", "I can see a frog.", "I can see a spider."], correctAnswer: "I can see an ant." },
          { image: '🐢', vocabulary: 'turtle', question: 'Can you see a turtle?', choices: ["Yes, I can.", "No, I can't.", "I see a frog.", "I see an ant."], correctAnswer: "Yes, I can." },
          { image: '🐸', vocabulary: 'frog', question: 'Can you see a turtle?', choices: ["No, I can't. I see a frog.", "Yes, I can.", "I see a spider.", "I see an ant."], correctAnswer: "No, I can't. I see a frog." },
          { image: '🕷️', vocabulary: 'spider', question: 'Can you see a spider?', choices: ["Yes, I can.", "No, I can't.", "I see a turtle.", "I see a frog."], correctAnswer: "Yes, I can." },
          { image: '🐜', vocabulary: 'ant', question: 'Can you see a frog?', choices: ["No, I can't. I see an ant.", "Yes, I can.", "I see a spider.", "I see a turtle."], correctAnswer: "No, I can't. I see an ant." },
          { image: '🐢', vocabulary: 'turtle', question: 'What can you see?', choices: ["I can see a turtle.", "I can see a frog.", "I can see a spider.", "I can see an ant."], correctAnswer: "I can see a turtle." },
          { image: '🐸', vocabulary: 'frog', question: 'What can you see?', choices: ["I can see a frog.", "I can see a turtle.", "I can see a spider.", "I can see an ant."], correctAnswer: "I can see a frog." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🐢', promptText: 'turtle', targetPhrase: 'turtle' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🐸', promptText: 'I can see a frog.', targetPhrase: 'I can see a frog.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🕷️', teacherQuestion: 'Can you see a spider?', promptText: 'Yes, I can.', targetPhrase: 'Yes, I can.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🐜', promptText: 'I see an ant.', targetPhrase: 'I see an ant.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🐢', teacherQuestion: 'Can you see a turtle?', promptText: 'Yes, I can.', targetPhrase: 'Yes, I can.' }
        ]
      }
    ],
    checkUp: {
      title: 'CHECK UP 3 (Units 5–6)',
      description: 'Review Nature, Activities, Animals, Abilities, Locations and Conversations.',
      phonics: ['fan', 'fox', 'van', 'vet', 'six', 'sun', 'zap', 'zip', 'red', 'rug', 'log', 'lip'],
      project: 'Tangram Animals'
    }
  },
  {
    id: 'unit-6',
    number: 6,
    title: 'THE ZOO',
    theme: 'The Zoo',
    learningGoal: 'Students identify zoo animals and describe locations.',
    lessons: [
      {
        id: 'u6-l1',
        number: 1,
        title: 'Animals',
        learningObjective: 'Identify zoo animals and their locations.',
        grammarFocus: 'Where is...? Prepositions of place',
        vocabulary: [
          { id: 'v83', word: 'elephant', meaningVi: 'con voi', exampleSentence: 'The elephant is big.' },
          { id: 'v84', word: 'monkey', meaningVi: 'con khỉ', exampleSentence: 'The monkey is in the tree.' },
          { id: 'v85', word: 'tiger', meaningVi: 'con hổ', exampleSentence: 'Where is the tiger?' },
          { id: 'v86', word: 'bear', meaningVi: 'con gấu', exampleSentence: 'The bear is on the rock.' },
          { id: 'v87', word: 'kangaroo', meaningVi: "It's a kangaroo.", exampleSentence: "It's a kangaroo." },
          { id: 'v88', word: 'penguin', meaningVi: 'chim cánh cụt', exampleSentence: 'The penguin is in the water.' }
        ],
        sentencePatterns: [
          { pattern: 'Where is the monkey?', example: 'Where is the monkey?', translationVi: 'Con khỉ ở đâu?' },
          { pattern: "It's in the tree.", example: "It's in the tree.", translationVi: 'Nó ở trên cây.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture'],
        practiceQuestions: [
          { image: '🐘', vocabulary: 'elephant', question: 'What is this?', choices: ["It's an elephant.", "It's a monkey.", "It's a tiger.", "It's a bear."], correctAnswer: "It's an elephant." },
          { image: '🐒', vocabulary: 'monkey', question: 'What is this?', choices: ["It's a monkey.", "It's an elephant.", "It's a tiger.", "It's a bear."], correctAnswer: "It's a monkey." },
          { image: '🐅', vocabulary: 'tiger', question: 'What is this?', choices: ["It's a tiger.", "It's an elephant.", "It's a monkey.", "It's a bear."], correctAnswer: "It's a tiger." },
          { image: '🐻', vocabulary: 'bear', question: 'What is this?', choices: ["It's a bear.", "It's an elephant.", "It's a monkey.", "It's a tiger."], correctAnswer: "It's a bear." },
          { image: '🦘', vocabulary: 'kangaroo', question: 'What is this?', choices: ["It's a kangaroo.", "It's a penguin.", "It's an elephant.", "It's a monkey."], correctAnswer: "It's a kangaroo." },
          { image: '🐧', vocabulary: 'penguin', question: 'What is this?', choices: ["It's a penguin.", "It's a kangaroo.", "It's an elephant.", "It's a monkey."], correctAnswer: "It's a penguin." },
          { image: '🐒', vocabulary: 'monkey', question: 'Where is the monkey?', choices: ["It's in the tree.", "It's on the rock.", "It's under the rock.", "It's by the chair."], correctAnswer: "It's in the tree." },
          { image: '🐻', vocabulary: 'bear', question: 'Where is the bear?', choices: ["It's on the rock.", "It's in the tree.", "It's under the rock.", "It's by the chair."], correctAnswer: "It's on the rock." },
          { image: '🐘', vocabulary: 'elephant', question: 'Is the elephant big?', choices: ["Yes, it is big.", "No, it isn't.", "It is small.", "It is short."], correctAnswer: "Yes, it is big." },
          { image: '🐧', vocabulary: 'penguin', question: 'Where is the penguin?', choices: ["It's in the water.", "It's in the tree.", "It's on the rock.", "It's by the chair."], correctAnswer: "It's in the water." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🐒', promptText: 'monkey', targetPhrase: 'monkey' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🐘', promptText: 'The elephant is big.', targetPhrase: 'The elephant is big.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🐒', teacherQuestion: 'Where is the monkey?', promptText: "It's in the tree.", targetPhrase: "It's in the tree." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🐻', promptText: 'The bear is on the rock.', targetPhrase: 'The bear is on the rock.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🐅', teacherQuestion: 'Where is the tiger?', promptText: 'It is under the tree.', targetPhrase: 'It is under the tree.' }
        ]
      },
      {
        id: 'u6-l2',
        number: 2,
        title: 'More Animals',
        learningObjective: 'Talk about plural animals and locations.',
        grammarFocus: 'Where are...? They\'re...',
        vocabulary: [
          { id: 'v89', word: 'snake', meaningVi: 'con rắn', exampleSentence: 'Where are the snakes?' },
          { id: 'v90', word: 'giraffe', meaningVi: 'hưu cao cổ', exampleSentence: 'The giraffes are tall.' },
          { id: 'v91', word: 'zebra', meaningVi: "They're zebras." }
        ],
        sentencePatterns: [
          { pattern: 'Where are the snakes?', example: 'Where are the snakes?', translationVi: 'Những con rắn ở đâu?' },
          { pattern: "They're on the rock.", example: "They're on the rock.", translationVi: 'Chúng ở trên hòn đá.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse'],
        practiceQuestions: [
          { image: '🐍', vocabulary: 'snake', question: 'What are they?', choices: ["They're snakes.", "They're giraffes.", "They're zebras.", "They're elephants."], correctAnswer: "They're snakes." },
          { image: '🦒', vocabulary: 'giraffe', question: 'What are they?', choices: ["They're giraffes.", "They're snakes.", "They're zebras.", "They're elephants."], correctAnswer: "They're giraffes." },
          { image: '🦓', vocabulary: 'zebra', question: 'What are they?', choices: ["They're zebras.", "They're snakes.", "They're giraffes.", "They're elephants."], correctAnswer: "They're zebras." },
          { image: '🐍', vocabulary: 'snake', question: 'Where are the snakes?', choices: ["They're on the rock.", "They're in the tree.", "They're under the rock.", "They're by the chair."], correctAnswer: "They're on the rock." },
          { image: '🦒', vocabulary: 'giraffe', question: 'Are the giraffes tall?', choices: ["Yes, they are tall.", "No, they aren't.", "They are on the rock.", "They are in the water."], correctAnswer: "Yes, they are tall." },
          { image: '🦓', vocabulary: 'zebra', question: 'What is this?', choices: ["This is a zebra.", "This is a snake.", "This is a giraffe.", "This is an elephant."], correctAnswer: "This is a zebra." },
          { image: '🐍', vocabulary: 'snake', question: 'Where are the snakes?', choices: ["They're on the rock.", "They're in the water.", "They're in the tree.", "They're under the tree."], correctAnswer: "They're on the rock." },
          { image: '🦒', vocabulary: 'giraffe', question: 'What are these?', choices: ["They're giraffes.", "They're snakes.", "They're zebras.", "They're monkeys."], correctAnswer: "They're giraffes." },
          { image: '🦓', vocabulary: 'zebra', question: 'Are these zebras?', choices: ["Yes, they are.", "No, they aren't.", "This is a tiger.", "This is a bear."], correctAnswer: "Yes, they are." },
          { image: '🐍', vocabulary: 'snake', question: 'What\'s that?', choices: ["That is a snake.", "That is a zebra.", "That is a giraffe.", "That is a monkey."], correctAnswer: "That is a snake." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🦓', promptText: 'zebra', targetPhrase: 'zebra' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🦒', promptText: 'That is a giraffe.', targetPhrase: 'That is a giraffe.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🐍', teacherQuestion: 'Where are the snakes?', promptText: "They're on the rock.", targetPhrase: "They're on the rock." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🦓', promptText: 'This is a zebra.', targetPhrase: 'This is a zebra.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🦒', teacherQuestion: 'What is this?', promptText: 'This is a giraffe.', targetPhrase: 'This is a giraffe.' }
        ]
      },
      {
        id: 'u6-l3',
        number: 3,
        title: "Story: Where's Danny?",
        learningObjective: 'Apologize politely.',
        grammarFocus: 'Apologizing',
        vocabulary: [],
        sentencePatterns: [
          { pattern: "I'm sorry.", example: "I'm sorry.", translationVi: 'Tớ xin lỗi.' },
          { pattern: "That's OK.", example: "That's OK.", translationVi: 'Không sao đâu.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Student', text: "I'm sorry.", translationVi: 'Tớ xin lỗi nhé.' },
            { speaker: 'Friend', text: "That's OK.", translationVi: 'Không sao đâu mà.' }
          ],
          socialSkill: 'Be safe.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'sorry', question: "A: I'm sorry.\nB: __________", choices: ["That's OK.", "You're welcome.", "Yes, I can.", "Sure."], correctAnswer: "That's OK." },
          { image: '', vocabulary: 'sorry', question: "A: I'm sorry for being late.\nB: __________", choices: ["That's OK.", "No, thank you.", "Goodbye.", "OK."], correctAnswer: "That's OK." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🐸', promptText: 'sorry', targetPhrase: 'sorry' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🐸', promptText: "I'm sorry.", targetPhrase: "I'm sorry." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🐸', teacherQuestion: "I'm sorry.", promptText: "That's OK.", targetPhrase: "That's OK." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🐸', promptText: 'Where is the frog?', targetPhrase: 'Where is the frog?' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🐍', teacherQuestion: 'Where is the snake?', promptText: "It's under the rock.", targetPhrase: "It's under the rock." }
        ]
      },
      {
        id: 'u6-l4',
        number: 4,
        title: 'Abilities',
        learningObjective: 'Describe animal abilities using Can + plural subject.',
        grammarFocus: 'Can + plural subject',
        vocabulary: [
          { id: 'v92', word: 'run', meaningVi: 'chạy', exampleSentence: 'Zebras can run.' },
          { id: 'v93', word: 'hop', meaningVi: 'nhảy nhót', exampleSentence: 'Kangaroos can hop.' },
          { id: 'v94', word: 'swim', meaningVi: 'bơi', exampleSentence: 'Penguins can swim.' },
          { id: 'v95', word: 'walk', meaningVi: 'đi bộ', exampleSentence: 'Bears can walk.' }
        ],
        sentencePatterns: [
          { pattern: 'Can zebras run?', example: 'Can zebras run?', translationVi: 'Ngựa vằn có biết chạy không?' },
          { pattern: 'Yes, they can. / No, they can\'t.', example: 'Yes, they can.', translationVi: 'Có, chúng có thể.' }
        ],
        suggestedGames: ['choosePicture', 'mysteryBox'],
        practiceQuestions: [
          { image: '🏃', vocabulary: 'run', question: 'What can zebras do?', choices: ["Zebras can run.", "Zebras can hop.", "Zebras can swim.", "Zebras can walk."], correctAnswer: "Zebras can run." },
          { image: '🐇', vocabulary: 'hop', question: 'What can kangaroos do?', choices: ["Kangaroos can hop.", "Kangaroos can run.", "Kangaroos can swim.", "Kangaroos can walk."], correctAnswer: "Kangaroos can hop." },
          { image: '🏊', vocabulary: 'swim', question: 'What can penguins do?', choices: ["Penguins can swim.", "Penguins can run.", "Penguins can hop.", "Penguins can walk."], correctAnswer: "Penguins can swim." },
          { image: '🚶', vocabulary: 'walk', question: 'What can bears do?', choices: ["Bears can walk.", "Bears can run.", "Bears can hop.", "Bears can swim."], correctAnswer: "Bears can walk." },
          { image: '🏃', vocabulary: 'run', question: 'Can zebras run?', choices: ["Yes, they can.", "No, they can't.", "They can hop.", "They can swim."], correctAnswer: "Yes, they can." },
          { image: '🏊', vocabulary: 'swim', question: 'Can kangaroos swim?', choices: ["No, they can't.", "Yes, they can.", "They can run.", "They can hop."], correctAnswer: "No, they can't." },
          { image: '🐇', vocabulary: 'hop', question: 'Can kangaroos hop?', choices: ["Yes, they can.", "No, they can't.", "They can swim.", "They can walk."], correctAnswer: "Yes, they can." },
          { image: '🚶', vocabulary: 'walk', question: 'Can bears walk?', choices: ["Yes, they can.", "No, they can't.", "They can fly.", "They can hop."], correctAnswer: "Yes, they can." },
          { image: '🏃', vocabulary: 'run', question: 'What can zebras do?', choices: ["Zebras can run.", "Zebras can hop.", "Zebras can swim.", "Zebras can walk."], correctAnswer: "Zebras can run." },
          { image: '🏊', vocabulary: 'swim', question: 'What can penguins do?', choices: ["Penguins can swim.", "Penguins can run.", "Penguins can hop.", "Penguins can walk."], correctAnswer: "Penguins can swim." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🏊', promptText: 'swim', targetPhrase: 'swim' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🐇', promptText: 'Kangaroos can hop.', targetPhrase: 'Kangaroos can hop.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🏃', teacherQuestion: 'Can zebras run?', promptText: 'Yes, they can.', targetPhrase: 'Yes, they can.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🏊', promptText: 'Penguins can swim.', targetPhrase: 'Penguins can swim.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🚶', teacherQuestion: 'Can bears walk?', promptText: 'Yes, they can.', targetPhrase: 'Yes, they can.' }
        ]
      }
    ]
  },
  {
    id: 'unit-7',
    number: 7,
    title: 'SCIENCE DAY',
    theme: 'Science Day',
    learningGoal: 'Students identify body parts and healthy habits.',
    lessons: [
      {
        id: 'u7-l1',
        number: 1,
        title: 'My Body',
        learningObjective: 'Identify body parts.',
        grammarFocus: 'This is... / These are... Singular / Plural',
        vocabulary: [
          { id: 'v96', word: 'arm', meaningVi: 'cánh tay', exampleSentence: 'This is my arm.' },
          { id: 'v97', word: 'hand', meaningVi: 'bàn tay', exampleSentence: 'These are my hands.' },
          { id: 'v98', word: 'finger', meaningVi: 'ngón tay', exampleSentence: 'These are my fingers.' },
          { id: 'v99', word: 'leg', meaningVi: 'cẳng chân', exampleSentence: 'This is my leg.' },
          { id: 'v100', word: 'foot', meaningVi: 'bàn chân', exampleSentence: 'This is my foot.' },
          { id: 'v101', word: 'toe', meaningVi: 'ngón chân', exampleSentence: 'These are my toes.' }
        ],
        sentencePatterns: [
          { pattern: "What's this? / What are these?", example: "What's this?", translationVi: 'Đây là cái gì?' },
          { pattern: 'This is my arm. / These are my arms.', example: 'This is my arm.', translationVi: 'Đây là cánh tay của tớ.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture'],
        practiceQuestions: [
          { image: '💪', vocabulary: 'arm', question: 'What is this?', choices: ["This is my arm.", "This is my leg.", "This is my foot.", "These are my hands."], correctAnswer: "This is my arm." },
          { image: '✋', vocabulary: 'hand', question: 'What are these?', choices: ["These are my hands.", "These are my fingers.", "These are my toes.", "This is my arm."], correctAnswer: "These are my hands." },
          { image: '☝️', vocabulary: 'finger', question: 'What are these?', choices: ["These are my fingers.", "These are my hands.", "These are my toes.", "This is my arm."], correctAnswer: "These are my fingers." },
          { image: '🦵', vocabulary: 'leg', question: 'What is this?', choices: ["This is my leg.", "This is my arm.", "This is my foot.", "These are my hands."], correctAnswer: "This is my leg." },
          { image: '🦶', vocabulary: 'foot', question: 'What is this?', choices: ["This is my foot.", "This is my leg.", "This is my arm.", "These are my hands."], correctAnswer: "This is my foot." },
          { image: '🦶', vocabulary: 'toe', question: 'What are these?', choices: ["These are my toes.", "These are my fingers.", "These are my hands.", "This is my arm."], correctAnswer: "These are my toes." },
          { image: '💪', vocabulary: 'arm', question: 'Is this my arm?', choices: ["Yes, it is.", "No, it isn't.", "These are my legs.", "These are my hands."], correctAnswer: "Yes, it is." },
          { image: '🦵', vocabulary: 'leg', question: 'Is this my arm?', choices: ["No, it isn't. It's my leg.", "Yes, it is.", "These are my hands.", "These are my toes."], correctAnswer: "No, it isn't. It's my leg." },
          { image: '✋', vocabulary: 'hand', question: 'Are these my hands?', choices: ["Yes, they are.", "No, they aren't.", "This is my foot.", "This is my leg."], correctAnswer: "Yes, they are." },
          { image: '☝️', vocabulary: 'finger', question: 'Are these my fingers?', choices: ["Yes, they are.", "No, they aren't.", "These are my toes.", "This is my arm."], correctAnswer: "Yes, they are." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '💪', promptText: 'arm', targetPhrase: 'arm' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '✋', promptText: 'These are my hands.', targetPhrase: 'These are my hands.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '💪', teacherQuestion: 'What is this?', promptText: 'This is my arm.', targetPhrase: 'This is my arm.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🦵', promptText: 'These are my legs.', targetPhrase: 'These are my legs.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '☝️', teacherQuestion: 'Are these your fingers?', promptText: 'Yes, these are my fingers.', targetPhrase: 'Yes, these are my fingers.' }
        ]
      },
      {
        id: 'u7-l2',
        number: 2,
        title: 'My Face',
        learningObjective: 'Identify facial features.',
        grammarFocus: 'Is this...? / Are these...?',
        vocabulary: [
          { id: 'v102', word: 'eye', meaningVi: 'mắt', exampleSentence: 'Are these my eyes?' },
          { id: 'v103', word: 'nose', meaningVi: 'mũi', exampleSentence: 'Is this my nose?' },
          { id: 'v104', word: 'mouth', meaningVi: 'miệng', exampleSentence: 'This is my mouth.' },
          { id: 'v105', word: 'ear', meaningVi: 'tai', exampleSentence: 'These are my ears.' }
        ],
        sentencePatterns: [
          { pattern: 'Is this my eye?', example: 'Is this my eye?', translationVi: 'Đó có phải mắt tớ không?' },
          { pattern: 'Are these my eyes?', example: 'Are these my eyes?', translationVi: 'Đó có phải đôi mắt của tớ không?' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse'],
        practiceQuestions: [
          { image: '👁️', vocabulary: 'eye', question: 'What are these?', choices: ["These are my eyes.", "These are my ears.", "This is my nose.", "This is my mouth."], correctAnswer: "These are my eyes." },
          { image: '👃', vocabulary: 'nose', question: 'What is this?', choices: ["This is my nose.", "This is my mouth.", "These are my eyes.", "These are my ears."], correctAnswer: "This is my nose." },
          { image: '👄', vocabulary: 'mouth', question: 'What is this?', choices: ["This is my mouth.", "This is my nose.", "These are my eyes.", "These are my ears."], correctAnswer: "This is my mouth." },
          { image: '👂', vocabulary: 'ear', question: 'What are these?', choices: ["These are my ears.", "These are my eyes.", "This is my nose.", "This is my mouth."], correctAnswer: "These are my ears." },
          { image: '👃', vocabulary: 'nose', question: 'Is this my nose?', choices: ["Yes, it is.", "No, it isn't.", "These are my eyes.", "These are my ears."], correctAnswer: "Yes, it is." },
          { image: '👄', vocabulary: 'mouth', question: 'Is this my nose?', choices: ["No, it isn't. It's my mouth.", "Yes, it is.", "These are my eyes.", "These are my ears."], correctAnswer: "No, it isn't. It's my mouth." },
          { image: '👁️', vocabulary: 'eye', question: 'Are these my eyes?', choices: ["Yes, they are.", "No, they aren't.", "This is my nose.", "This is my mouth."], correctAnswer: "Yes, they are." },
          { image: '👂', vocabulary: 'ear', question: 'Are these my eyes?', choices: ["No, they aren't. They're my ears.", "Yes, they are.", "This is my nose.", "This is my mouth."], correctAnswer: "No, they aren't. They're my ears." },
          { image: '👁️', vocabulary: 'eye', question: 'What are these?', choices: ["These are my eyes.", "These are my hands.", "These are my fingers.", "These are my toes."], correctAnswer: "These are my eyes." },
          { image: '👃', vocabulary: 'nose', question: 'What is this?', choices: ["This is my nose.", "This is my arm.", "This is my leg.", "This is my foot."], correctAnswer: "This is my nose." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '👃', promptText: 'nose', targetPhrase: 'nose' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '👁️', promptText: 'Are these my eyes?', targetPhrase: 'Are these my eyes?' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '👄', teacherQuestion: 'Is this my mouth?', promptText: 'Yes, it is.', targetPhrase: 'Yes, it is.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '👁️', promptText: 'These are my eyes.', targetPhrase: 'These are my eyes.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '👂', teacherQuestion: 'Is this my ear?', promptText: "No, it isn't. It's my nose.", targetPhrase: "No, it isn't. It's my nose." }
        ]
      },
      {
        id: 'u7-l3',
        number: 3,
        title: "Story: I Can't See!",
        learningObjective: 'Polite classroom interjections.',
        grammarFocus: 'Polite requests',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'Excuse me.', example: 'Excuse me.', translationVi: 'Xin lỗi cho tớ hỏi.' },
          { pattern: 'Sure.', example: 'Sure.', translationVi: 'Chắc chắn rồi.' },
          { pattern: 'Thank you.', example: 'Thank you.', translationVi: 'Tớ cảm ơn.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Student', text: 'Excuse me.', translationVi: 'Xin lỗi bạn.' },
            { speaker: 'Friend', text: 'Sure.', translationVi: 'Được chứ.' },
            { speaker: 'Student', text: 'Thank you.', translationVi: 'Cảm ơn cậu.' }
          ],
          socialSkill: 'Be polite.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'excuse', question: "A: Excuse me.\nB: __________", choices: ["Sure.", "Thank you.", "You're welcome.", "I'm sorry."], correctAnswer: "Sure." },
          { image: '', vocabulary: 'excuse', question: "A: Excuse me. - B: Sure.\nA: __________", choices: ["Thank you.", "Excuse me.", "Good morning.", "That's OK."], correctAnswer: "Thank you." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🌅', promptText: 'excuse', targetPhrase: 'excuse' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🌅', promptText: 'Excuse me.', targetPhrase: 'Excuse me.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🌅', teacherQuestion: 'Excuse me.', promptText: 'Yes, how can I help you?', targetPhrase: 'Yes, how can I help you?' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🏫', promptText: 'Good morning, teacher.', targetPhrase: 'Good morning, teacher.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🌅', teacherQuestion: 'Excuse me.', promptText: 'Sure, go ahead.', targetPhrase: 'Sure, go ahead.' }
        ]
      },
      {
        id: 'u7-l4',
        number: 4,
        title: 'Healthy Habits',
        learningObjective: 'Describe healthy hygiene habits.',
        grammarFocus: 'Daily routines',
        vocabulary: [
          { id: 'v106', word: 'wash my face', meaningVi: 'rửa mặt', exampleSentence: 'I can wash my face.' },
          { id: 'v107', word: 'wash my hands', meaningVi: 'rửa tay', exampleSentence: 'I can wash my hands.' },
          { id: 'v108', word: 'brush my hair', meaningVi: 'chải tóc', exampleSentence: 'I can brush my hair.' },
          { id: 'v109', word: 'brush my teeth', meaningVi: 'đánh răng', exampleSentence: 'I can brush my teeth.' }
        ],
        sentencePatterns: [
          { pattern: 'I can wash my face.', example: 'I can wash my face.', translationVi: 'Tớ có thể tự rửa mặt.' },
          { pattern: 'I can wash my hands.', example: 'I can wash my hands.', translationVi: 'Tớ có thể tự rửa tay.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch'],
        practiceQuestions: [
          { image: '🧼', vocabulary: 'wash my face', question: 'What can you do?', choices: ["I can wash my face.", "I can wash my hands.", "I can brush my hair.", "I can brush my teeth."], correctAnswer: "I can wash my face." },
          { image: '👐🧼', vocabulary: 'wash my hands', question: 'What can you do?', choices: ["I can wash my hands.", "I can wash my face.", "I can brush my hair.", "I can brush my teeth."], correctAnswer: "I can wash my hands." },
          { image: '🪮', vocabulary: 'brush my hair', question: 'What can you do?', choices: ["I can brush my hair.", "I can wash my face.", "I can wash my hands.", "I can brush my teeth."], correctAnswer: "I can brush my hair." },
          { image: '🪥', vocabulary: 'brush my teeth', question: 'What can you do?', choices: ["I can brush my teeth.", "I can wash my face.", "I can wash my hands.", "I can brush my hair."], correctAnswer: "I can brush my teeth." },
          { image: '🧼', vocabulary: 'wash my face', question: 'Can you wash your face?', choices: ["Yes, I can.", "No, I can't.", "I can brush my teeth.", "I can brush my hair."], correctAnswer: "Yes, I can." },
          { image: '🪥', vocabulary: 'brush my teeth', question: 'Can you brush your teeth?', choices: ["Yes, I can.", "No, it is slow.", "I can wash my hands.", "I can wash my face."], correctAnswer: "Yes, I can." },
          { image: '👐🧼', vocabulary: 'wash my hands', question: 'Can you wash your hands?', choices: ["Yes, I can.", "No, I can't.", "I can brush my hair.", "I can brush my teeth."], correctAnswer: "Yes, I can." },
          { image: '🪮', vocabulary: 'brush my hair', question: 'Can you brush your hair?', choices: ["Yes, I can.", "No, I can't.", "I can wash my face.", "I can wash my hands."], correctAnswer: "Yes, I can." },
          { image: '🧼', vocabulary: 'wash my face', question: 'What can you do?', choices: ["I can wash my face.", "I can wash my hands.", "I can brush my hair.", "I can brush my teeth."], correctAnswer: "I can wash my face." },
          { image: '🪥', vocabulary: 'brush my teeth', question: 'What can you do?', choices: ["I can brush my teeth.", "I can wash my face.", "I can wash my hands.", "I can brush my hair."], correctAnswer: "I can brush my teeth." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🧼', promptText: 'wash', targetPhrase: 'wash' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🪥', promptText: 'I can brush my teeth.', targetPhrase: 'I can brush my teeth.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '👐🧼', teacherQuestion: 'What can you do?', promptText: 'I can wash my hands.', targetPhrase: 'I can wash my hands.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🪮', promptText: 'I can brush my hair.', targetPhrase: 'I can brush my hair.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🧼', teacherQuestion: 'Can you wash your face?', promptText: 'Yes, I can wash my face.', targetPhrase: 'Yes, I can wash my face.' }
        ]
      }
    ],
    checkUp: {
      title: 'CHECK UP 4 (Units 7–8)',
      description: 'Review Body Parts, Healthy Habits, Adjectives, Transportation and Polite Expressions.',
      phonics: ['rake', 'vase', 'beet', 'peek', 'cube', 'lime', 'rose', 'bone', 'mule'],
      project: 'My Robot'
    }
  },
  {
    id: 'unit-8',
    number: 8,
    title: 'THE TOY STORE',
    theme: 'The Toy Store',
    learningGoal: 'Students describe toys, transportation and basic adjectives.',
    lessons: [
      {
        id: 'u8-l1',
        number: 1,
        title: 'Adjectives',
        learningObjective: 'Describe items using basic adjectives.',
        grammarFocus: 'This / That / These / Those + Adjectives',
        vocabulary: [
          { id: 'v110', word: 'old', meaningVi: 'cũ', exampleSentence: "That's an old bike." },
          { id: 'v111', word: 'new', meaningVi: 'mới', exampleSentence: 'Those are new bikes.' },
          { id: 'v112', word: 'big', meaningVi: 'to / lớn', exampleSentence: 'It is big.' },
          { id: 'v113', word: 'small', meaningVi: 'nhỏ', exampleSentence: 'It is small.' },
          { id: 'v114', word: 'long', meaningVi: 'dài', exampleSentence: 'That is long.' },
          { id: 'v115', word: 'short', meaningVi: 'ngắn', exampleSentence: 'It is short.' }
        ],
        sentencePatterns: [
          { pattern: "That's an old bike.", example: "That's an old bike.", translationVi: 'Kìa là một chiếc xe đạp cũ.' },
          { pattern: 'What are these? Those are new bikes.', example: 'Those are new bikes.', translationVi: 'Kìa là những chiếc xe đạp mới.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture'],
        practiceQuestions: [
          { image: '🧓', vocabulary: 'old', question: 'Is that bus old?', choices: ["That's an old bus.", "That's a new truck.", "It is big.", "It is small."], correctAnswer: "That's an old bus." },
          { image: '✨', vocabulary: 'new', question: 'Are those trucks new?', choices: ["Those are new trucks.", "That's an old bus.", "It is long.", "It is short."], correctAnswer: "Those are new trucks." },
          { image: '🐘', vocabulary: 'big', question: 'Is it big?', choices: ["It is big.", "It is small.", "It is long.", "It is short."], correctAnswer: "It is big." },
          { image: '🐭', vocabulary: 'small', question: 'Is it small?', choices: ["It is small.", "It is big.", "It is long.", "It is short."], correctAnswer: "It is small." },
          { image: '📏', vocabulary: 'long', question: 'Is it long?', choices: ["It is long.", "It is short.", "It is big.", "It is small."], correctAnswer: "It is long." },
          { image: '📐', vocabulary: 'short', question: 'Is it short?', choices: ["It is short.", "It is long.", "It is big.", "It is small."], correctAnswer: "It is short." },
          { image: '🧓', vocabulary: 'old', question: 'Is that bus new?', choices: ["No, it isn't. It's an old bus.", "Yes, it is.", "Those are new trucks.", "It is long."], correctAnswer: "No, it isn't. It's an old bus." },
          { image: '✨', vocabulary: 'new', question: 'Are those trucks old?', choices: ["No, they aren't. They're new trucks.", "Yes, they are.", "That's an old bus.", "It is small."], correctAnswer: "No, they aren't. They're new trucks." },
          { image: '🐘', vocabulary: 'big', question: 'Is that elephant big?', choices: ["Yes, it is big.", "No, it is small.", "It is long.", "It is short."], correctAnswer: "Yes, it is big." },
          { image: '🐭', vocabulary: 'small', question: 'Is that mouse big?', choices: ["No, it is a small mouse.", "Yes, it is big.", "It is long.", "It is short."], correctAnswer: "No, it is a small mouse." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🧓', promptText: 'old', targetPhrase: 'old' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '✨', promptText: "That's a new toy.", targetPhrase: "That's a new toy." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🐘', teacherQuestion: 'Is that a big box?', promptText: "Yes, it's big.", targetPhrase: "Yes, it's big." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🐭', promptText: 'It is a small mouse.', targetPhrase: 'It is a small mouse.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '✨', teacherQuestion: 'What are those?', promptText: 'Those are new toys.', targetPhrase: 'Those are new toys.' }
        ]
      },
      {
        id: 'u8-l2',
        number: 2,
        title: 'More Adjectives',
        learningObjective: 'Ask and answer with descriptive adjectives.',
        grammarFocus: 'Adjective Questions',
        vocabulary: [
          { id: 'v116', word: 'fast', meaningVi: 'nhanh', exampleSentence: 'Is that a fast car?' },
          { id: 'v117', word: 'slow', meaningVi: 'chậm', exampleSentence: 'The bus is slow.' },
          { id: 'v118', word: 'noisy', meaningVi: 'ồn ào', exampleSentence: 'It is noisy.' },
          { id: 'v119', word: 'quiet', meaningVi: 'yên tĩnh', exampleSentence: 'Please be quiet.' }
        ],
        sentencePatterns: [
          { pattern: 'Is that a fast car?', example: 'Is that a fast car?', translationVi: 'Kia có phải ô tô chạy nhanh không?' },
          { pattern: 'Yes, it is. / No, it isn\'t.', example: 'Yes, it is.', translationVi: 'Đúng vậy. / Không phải.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse'],
        practiceQuestions: [
          { image: '⚡', vocabulary: 'fast', question: 'Is that train fast?', choices: ["It is a fast train.", "The train is slow.", "It is noisy.", "It is quiet."], correctAnswer: "It is a fast train." },
          { image: '🐢', vocabulary: 'slow', question: 'Is the train slow?', choices: ["The train is slow.", "It is a fast train.", "It is noisy.", "It is quiet."], correctAnswer: "The train is slow." },
          { image: '📢', vocabulary: 'noisy', question: 'Is it noisy?', choices: ["It is noisy.", "It is quiet.", "It is a fast train.", "The train is slow."], correctAnswer: "It is noisy." },
          { image: '🤫', vocabulary: 'quiet', question: 'Is it quiet?', choices: ["It is quiet.", "It is noisy.", "It is a fast train.", "The train is slow."], correctAnswer: "It is quiet." },
          { image: '⚡', vocabulary: 'fast', question: 'Is that a fast train?', choices: ["Yes, it is.", "No, it isn't.", "It is slow.", "It is noisy."], correctAnswer: "Yes, it is." },
          { image: '🐢', vocabulary: 'slow', question: 'Is that a fast train?', choices: ["No, it isn't. It is slow.", "Yes, it is.", "It is fast.", "It is quiet."], correctAnswer: "No, it isn't. It is slow." },
          { image: '📢', vocabulary: 'noisy', question: 'Is it quiet?', choices: ["No, it isn't. It is noisy.", "Yes, it is.", "It is fast.", "It is slow."], correctAnswer: "No, it isn't. It is noisy." },
          { image: '🤫', vocabulary: 'quiet', question: 'Is it quiet?', choices: ["Yes, it is quiet.", "No, it is noisy.", "It is fast.", "It is slow."], correctAnswer: "Yes, it is quiet." },
          { image: '⚡', vocabulary: 'fast', question: 'Is that train fast?', choices: ["It is a fast train.", "The train is slow.", "It is noisy.", "It is quiet."], correctAnswer: "It is a fast train." },
          { image: '🤫', vocabulary: 'quiet', question: 'Is it quiet?', choices: ["It is quiet.", "It is noisy.", "It is a fast train.", "The train is slow."], correctAnswer: "It is quiet." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '⚡', promptText: 'fast', targetPhrase: 'fast' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🐢', promptText: 'The train is slow.', targetPhrase: 'The train is slow.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '📢', teacherQuestion: 'Is that truck noisy?', promptText: 'Yes, it is.', targetPhrase: 'Yes, it is.' },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🤫', promptText: 'It is very quiet.', targetPhrase: 'It is very quiet.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '⚡', teacherQuestion: 'Is that car fast?', promptText: 'Yes, it is fast.', targetPhrase: 'Yes, it is fast.' }
        ]
      },
      {
        id: 'u8-l3',
        number: 3,
        title: 'Story: Please Be Quiet',
        learningObjective: 'Practice quiet behavior and politeness.',
        grammarFocus: 'Polite requests',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'Please be quiet.', example: 'Please be quiet.', translationVi: 'Xin hãy giữ trật tự.' },
          { pattern: 'OK. I\'m sorry.', example: 'OK. I\'m sorry.', translationVi: 'Được rồi. Tớ xin lỗi.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Teacher', text: 'Please be quiet.', translationVi: 'Các em trật tự nhé.' },
            { speaker: 'Student', text: 'OK. I\'m sorry.', translationVi: 'Vâng ạ, em xin lỗi.' }
          ],
          socialSkill: 'Be nice.'
        },
        suggestedGames: ['sentenceBuilder'],
        practiceQuestions: [
          { image: '', vocabulary: 'please', question: "A: Please be quiet.\nB: __________", choices: ["OK. I'm sorry.", "You're welcome.", "Thank you.", "Sure."], correctAnswer: "OK. I'm sorry." },
          { image: '', vocabulary: 'please', question: "A: Please be quiet in the library.\nB: __________", choices: ["OK. I'm sorry.", "That's OK.", "Here you are.", "OK!"], correctAnswer: "OK. I'm sorry." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🙏', promptText: 'please', targetPhrase: 'please' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🚪', promptText: 'Close the door, please.', targetPhrase: 'Close the door, please.' },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🚪', teacherQuestion: 'Please be quiet.', promptText: "OK. I'm sorry.", targetPhrase: "OK. I'm sorry." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '🚪', promptText: 'Close the door, please.', targetPhrase: 'Close the door, please.' },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🪑', teacherQuestion: 'Please sit down.', promptText: 'Thank you, teacher.', targetPhrase: 'Thank you, teacher.' }
        ]
      },
      {
        id: 'u8-l4',
        number: 4,
        title: 'Transportation',
        learningObjective: 'Identify vehicles and describe them.',
        grammarFocus: 'This / That / These / Those',
        vocabulary: [
          { id: 'v120', word: 'bus', meaningVi: 'xe buýt', exampleSentence: "It's an old bus." },
          { id: 'v121', word: 'truck', meaningVi: 'xe tải', exampleSentence: "What's this? It's a truck." },
          { id: 'v122', word: 'train', meaningVi: 'tàu hỏa', exampleSentence: 'That is a long train.' },
          { id: 'v123', word: 'boat', meaningVi: 'thuyền', exampleSentence: "They're new boats." }
        ],
        sentencePatterns: [
          { pattern: "What's this? It's a bus.", example: "What's this? It's a bus.", translationVi: 'Đây là gì? Đây là xe buýt.' },
          { pattern: 'What are these? They\'re new buses.', example: "They're new buses.", translationVi: 'Đây là những chiếc xe buýt mới.' }
        ],
        suggestedGames: ['choosePicture', 'mysteryBox'],
        practiceQuestions: [
          { image: '🚌', vocabulary: 'bus', question: 'What\'s this?', choices: ["It's a bus.", "It's a truck.", "It's a train.", "It's a boat."], correctAnswer: "It's a bus." },
          { image: '🚚', vocabulary: 'truck', question: 'What\'s this?', choices: ["It's a truck.", "It's a bus.", "It's a train.", "It's a boat."], correctAnswer: "It's a truck." },
          { image: '🚆', vocabulary: 'train', question: 'What\'s this?', choices: ["It's a train.", "It's a bus.", "It's a truck.", "It's a boat."], correctAnswer: "It's a train." },
          { image: '⛵', vocabulary: 'boat', question: 'What\'s this?', choices: ["It's a boat.", "It's a bus.", "It's a truck.", "It's a train."], correctAnswer: "It's a boat." },
          { image: '🚌', vocabulary: 'bus', question: 'Is this a bus?', choices: ["Yes, it is.", "No, it isn't.", "It's a truck.", "It's a train."], correctAnswer: "Yes, it is." },
          { image: '🚚', vocabulary: 'truck', question: 'Is this a bus?', choices: ["No, it isn't. It's a truck.", "Yes, it is.", "It's a train.", "It's a boat."], correctAnswer: "No, it isn't. It's a truck." },
          { image: '🚆', vocabulary: 'train', question: 'Is this a train?', choices: ["Yes, it is.", "No, it isn't.", "It's a bus.", "It's a boat."], correctAnswer: "Yes, it is." },
          { image: '⛵', vocabulary: 'boat', question: 'What are these?', choices: ["They're boats.", "They're buses.", "They're trucks.", "They're trains."], correctAnswer: "They're boats." },
          { image: '🚌', vocabulary: 'bus', question: 'What\'s this?', choices: ["It's a bus.", "It's a truck.", "It's a train.", "It's a boat."], correctAnswer: "It's a bus." },
          { image: '🚆', vocabulary: 'train', question: 'What\'s this?', choices: ["It's a train.", "It's a bus.", "It's a truck.", "It's a boat."], correctAnswer: "It's a train." }
        ],
        speakingTasks: [
          { number: 1, type: 'repeat_word', instruction: 'Repeat this word aloud!', emoji: '🚆', promptText: 'train', targetPhrase: 'train' },
          { number: 2, type: 'read_sentence', instruction: 'Read this sentence aloud!', emoji: '🚚', promptText: "They're new trucks.", targetPhrase: "They're new trucks." },
          { number: 3, type: 'answer_question', instruction: "Answer the teacher's question!", emoji: '🚌', teacherQuestion: "What's this?", promptText: "It's a bus.", targetPhrase: "It's a bus." },
          { number: 4, type: 'describe_picture', instruction: 'Look at the picture and describe it!', emoji: '⛵', promptText: "It's a boat.", targetPhrase: "It's a boat." },
          { number: 5, type: 'conversation', instruction: 'Complete the mini conversation!', emoji: '🚆', teacherQuestion: 'What are those?', promptText: "They're trains.", targetPhrase: "They're trains." }
        ]
      }
    ]
  }
];

export const LEEGO_BRAND = {
  name: 'LeeGo English Center',
  motto: 'Learn with Joy – Grow with Confidence',
  aiName: 'LeeGo English Explorer AI',
  primaryColor: '#DC2626', // LeeGo Red
  coreValues: [
    'Every child can succeed.',
    'Learning should be enjoyable.',
    'Encourage instead of criticize.',
    'Build confidence through small achievements.',
    'Communication comes before memorization.'
  ],
  personality: ['Kind', 'Patient', 'Energetic', 'Supportive', 'Creative', 'Positive']
};

export const EMOJI_MAP: Record<string, string> = {
  pencil: '✏️', eraser: '🧽', ruler: '📏', 'pencil case': '👝', backpack: '🎒', notebook: '📓', desk: '✍️', chair: '🪑', book: '📖',
  circle: '🔴', square: '🟩', triangle: '🔺', rectangle: '▮', paint: '🎨', paper: '📄', chalk: '🖍️', yarn: '🧶', glue: '🧴', tape: '🩹',
  red: '🔴', yellow: '🟡', blue: '🔵', white: '⚪', black: '⚫', green: '🟢', purple: '🟣', orange: '🟠', pink: '🌸', gray: '🔘', brown: '🟤',
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣', six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟', eleven: '⑪', twelve: '⑫',
  doll: '🧸', dolls: '🧸🧸', ball: '⚽', balls: '⚽⚾', car: '🚗', cars: '🚗🚗', kite: '🪁', kites: '🪁🪁', game: '🎮', marble: '🔮', puzzle: '🧩', card: '🃏',
  mother: '👩', father: '👨', brother: '👦', sister: '👧', grandmother: '👵', grandfather: '👴', juice: '🧃', chicken: '🍗', fish: '🐟', 'ice cream': '🍦',
  pizza: '🍕', rice: '🍚', cookie: '🍪', bread: '🍞', flower: '🌸', tree: '🌳', rock: '🪨', river: '🏞️', hill: '⛰️', lake: '🌅',
  'play soccer': '⚽🏃', 'jump rope': '🏃‍♀️', 'fly a kite': '🪁🏃', 'ride a bike': '🚴', turtle: '🐢', frog: '🐸', spider: '🕷️', ant: '🐜',
  elephant: '🐘', monkey: '🐒', tiger: '🐅', bear: '🐻', kangaroo: '🦘', penguin: '🐧', snake: '🐍', giraffe: '🦒', zebra: '🦓',
  run: '🏃', hop: '🐇', swim: '🏊', walk: '🚶', arm: '💪', hand: '✋', finger: '☝️', leg: '🦵', foot: '🦶', toe: '🦶',
  eye: '👁️', nose: '👃', mouth: '👄', ear: '👂', 'wash my face': '🧼', 'wash my hands': '👐🧼', 'brush my hair': '🪮', 'brush my teeth': '🪥',
  old: '🧓', new: '✨', big: '🐘', small: '🐭', long: '📏', short: '📐', fast: '⚡', slow: '🐢', noisy: '📢', quiet: '🤫',
  bus: '🚌', truck: '🚚', train: '🚆', boat: '⛵'
};
