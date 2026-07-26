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
          { pattern: 'What is it?', example: 'What is it? It\'s a ruler.', translationVi: 'Nó là cái gì?' }
        ],
        forbiddenVocab: ['pen', 'book', 'notebook', 'chair', 'desk', 'teacher', 'student'],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture', 'missingWord']
      },
      {
        id: 'u1-l2',
        number: 2,
        title: 'School Supplies: Books',
        learningObjective: 'Students distinguish classroom objects.',
        grammarFocus: 'Affirmative / Negative (This / It)',
        vocabulary: [
          { id: 'v6', word: 'notebook', meaningVi: 'vở viết', exampleSentence: 'It\'s a notebook.' },
          { id: 'v7', word: 'desk', meaningVi: 'bàn học', exampleSentence: 'It\'s a desk.' },
          { id: 'v8', word: 'chair', meaningVi: 'ghế', exampleSentence: 'It\'s a chair.' },
          { id: 'v9', word: 'book', meaningVi: 'sách', exampleSentence: 'It\'s a book.' }
        ],
        sentencePatterns: [
          { pattern: 'It\'s a book.', example: 'It\'s a book.', translationVi: 'Nó là một quyển sách.' },
          { pattern: 'It isn\'t a notebook.', example: 'It isn\'t a notebook.', translationVi: 'Nó không phải là quyển vở.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse', 'memoryGame', 'sentenceBuilder']
      },
      {
        id: 'u1-l3',
        number: 3,
        title: 'Story: I\'m Great!',
        learningObjective: 'Students greet classmates politely.',
        grammarFocus: 'Greetings and social polite expressions',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'How are you?', example: 'How are you?', translationVi: 'Bạn khỏe không?' },
          { pattern: 'I\'m fine. Thank you.', example: 'I\'m fine. Thank you.', translationVi: 'Mình khỏe. Cảm ơn bạn.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Teacher', text: 'How are you?', translationVi: 'Bạn khỏe không?' },
            { speaker: 'Student', text: 'I\'m fine. Thank you.', translationVi: 'Mình khỏe. Cảm ơn cô.' }
          ],
          socialSkill: 'Be friendly.'
        },
        suggestedGames: ['flashcard', 'sentenceBuilder']
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
          { id: 'v12', word: 'triangle', meaningVi: 'hình tam giác', exampleSentence: 'It\'s a triangle.' },
          { id: 'v13', word: 'rectangle', meaningVi: 'hình chữ nhật', exampleSentence: 'It\'s a rectangle.' }
        ],
        sentencePatterns: [
          { pattern: 'Is it a circle?', example: 'Is it a circle?', translationVi: 'Đó có phải là hình tròn không?' },
          { pattern: 'Yes, it is. / No, it isn\'t.', example: 'Yes, it is.', translationVi: 'Đúng rồi. / Không phải.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch', 'mysteryBox']
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
          { pattern: 'What\'s this?', example: 'What\'s this? This is glue.', translationVi: 'Đây là cái gì?' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'mysteryBox']
      },
      {
        id: 'u2-l2',
        number: 2,
        title: 'Colors',
        learningObjective: 'Recognize basic colors.',
        grammarFocus: 'Question + Color Answer',
        vocabulary: [
          { id: 'v20', word: 'red', meaningVi: 'màu đỏ', exampleSentence: 'It\'s red.' },
          { id: 'v21', word: 'yellow', meaningVi: 'màu vàng', exampleSentence: 'It\'s yellow.' },
          { id: 'v22', word: 'blue', meaningVi: 'màu xanh dương', exampleSentence: 'It\'s blue.' },
          { id: 'v23', word: 'white', meaningVi: 'màu trắng', exampleSentence: 'It\'s white.' },
          { id: 'v24', word: 'black', meaningVi: 'màu đen', exampleSentence: 'It\'s black.' }
        ],
        sentencePatterns: [
          { pattern: 'What color is it?', example: 'What color is it?', translationVi: 'Nó là màu gì?' },
          { pattern: 'It\'s red.', example: 'It\'s red.', translationVi: 'Nó màu đỏ.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch', 'phonicsMatch']
      },
      {
        id: 'u2-l3',
        number: 3,
        title: 'Story: The Blue Paint',
        learningObjective: 'Practice sharing politely.',
        grammarFocus: 'Sharing expressions',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'Let\'s share.', example: 'Let\'s share.', translationVi: 'Chúng ta cùng dùng chung nhé.' },
          { pattern: 'OK.', example: 'OK.', translationVi: 'Được rồi.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: 'Let\'s share.', translationVi: 'Chúng mình dùng chung nhé.' },
            { speaker: 'Student', text: 'OK.', translationVi: 'Được thôi!' }
          ],
          socialSkill: 'Be nice.'
        },
        suggestedGames: ['sentenceBuilder']
      },
      {
        id: 'u2-l4',
        number: 4,
        title: 'More Colors',
        learningObjective: 'Identify additional colors & color mixing.',
        grammarFocus: 'Color combinations',
        vocabulary: [
          { id: 'v25', word: 'green', meaningVi: 'màu xanh lá', exampleSentence: 'Blue and yellow make green.' },
          { id: 'v26', word: 'purple', meaningVi: 'màu tím', exampleSentence: 'It\'s purple.' },
          { id: 'v27', word: 'orange', meaningVi: 'màu cam', exampleSentence: 'It\'s orange.' },
          { id: 'v28', word: 'pink', meaningVi: 'màu hồng', exampleSentence: 'It\'s pink.' },
          { id: 'v29', word: 'gray', meaningVi: 'màu xám', exampleSentence: 'It\'s gray.' },
          { id: 'v30', word: 'brown', meaningVi: 'màu nâu', exampleSentence: 'It\'s brown.' }
        ],
        sentencePatterns: [
          { pattern: 'Blue and yellow make green.', example: 'Blue and yellow make green.', translationVi: 'Xanh dương và vàng tạo thành xanh lá.' }
        ],
        suggestedGames: ['pictureMatch', 'choosePicture', 'trueOrFalse']
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
          { pattern: 'I\'m seven. / I\'m eight.', example: 'I\'m seven.', translationVi: 'Tớ 7 tuổi.' }
        ],
        suggestedGames: ['flashcard', 'choosePicture', 'memoryGame']
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
        suggestedGames: ['choosePicture', 'trueOrFalse', 'mysteryBox']
      },
      {
        id: 'u3-l3',
        number: 3,
        title: 'Story: My Turn!',
        learningObjective: 'Practice taking turns politely.',
        grammarFocus: 'Turn taking',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'It\'s your turn.', example: 'It\'s your turn.', translationVi: 'Đến lượt bạn rồi.' },
          { pattern: 'Thank you.', example: 'Thank you.', translationVi: 'Cảm ơn bạn.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: 'It\'s your turn.', translationVi: 'Đến lượt bạn đấy.' },
            { speaker: 'Student', text: 'Thank you.', translationVi: 'Cảm ơn nhé.' }
          ],
          socialSkill: 'Be fair.'
        },
        suggestedGames: ['sentenceBuilder']
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
        suggestedGames: ['choosePicture', 'pictureMatch']
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
          { pattern: 'Who\'s this?', example: 'Who\'s this?', translationVi: 'Đây là ai?' },
          { pattern: 'This is my mother.', example: 'This is my mother.', translationVi: 'Đây là mẹ của tớ.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture']
      },
      {
        id: 'u4-l2',
        number: 2,
        title: 'Food',
        learningObjective: 'Express food preferences.',
        grammarFocus: 'Like / Don\'t like',
        vocabulary: [
          { id: 'v61', word: 'juice', meaningVi: 'nước ép', exampleSentence: 'I like juice.' },
          { id: 'v62', word: 'chicken', meaningVi: 'thịt gà', exampleSentence: 'I don\'t like chicken.' },
          { id: 'v63', word: 'fish', meaningVi: 'cá', exampleSentence: 'I like fish.' },
          { id: 'v64', word: 'ice cream', meaningVi: 'kem', exampleSentence: 'I like ice cream.' }
        ],
        sentencePatterns: [
          { pattern: 'I like juice.', example: 'I like juice.', translationVi: 'Tớ thích nước ép.' },
          { pattern: 'I don\'t like juice.', example: 'I don\'t like juice.', translationVi: 'Tớ không thích nước ép.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse', 'mysteryBox']
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
          { pattern: 'You\'re welcome.', example: 'You\'re welcome.', translationVi: 'Không có gì đâu.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Friend', text: 'Here you are.', translationVi: 'Của bạn đây.' },
            { speaker: 'Student', text: 'Thank you.', translationVi: 'Tớ cảm ơn.' },
            { speaker: 'Friend', text: 'You\'re welcome.', translationVi: 'Không có gì.' }
          ],
          socialSkill: 'Be kind.'
        },
        suggestedGames: ['sentenceBuilder']
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
          { pattern: 'What\'s this?', example: 'What\'s this?', translationVi: 'Đây là cái gì?' },
          { pattern: 'This is pizza. I like pizza.', example: 'This is pizza.', translationVi: 'Đây là pizza. Tớ thích pizza.' }
        ],
        suggestedGames: ['choosePicture', 'pictureMatch']
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
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture']
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
          { id: 'v78', word: 'ride a bike', meaningVi: 'đi xe đạp', exampleSentence: 'I can\'t ride a bike.' }
        ],
        sentencePatterns: [
          { pattern: 'I can play soccer.', example: 'I can play soccer.', translationVi: 'Tớ có thể đá bóng.' },
          { pattern: 'I can\'t play soccer.', example: 'I can\'t play soccer.', translationVi: 'Tớ không biết đá bóng.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse']
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
        suggestedGames: ['sentenceBuilder']
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
          { id: 'v81', word: 'spider', meaningVi: 'con nhện', exampleSentence: 'It\'s a spider.' },
          { id: 'v82', word: 'ant', meaningVi: 'con kiến', exampleSentence: 'I see an ant.' }
        ],
        sentencePatterns: [
          { pattern: 'Can you see a turtle?', example: 'Can you see a turtle?', translationVi: 'Cậu có thấy con rùa không?' },
          { pattern: 'Yes, I can. / No, I can\'t.', example: 'Yes, I can.', translationVi: 'Có, tớ thấy. / Không, tớ không thấy.' }
        ],
        suggestedGames: ['choosePicture', 'mysteryBox']
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
          { id: 'v87', word: 'kangaroo', meaningVi: 'con chuột túi', exampleSentence: 'It\'s a kangaroo.' },
          { id: 'v88', word: 'penguin', meaningVi: 'chim cánh cụt', exampleSentence: 'The penguin is in the water.' }
        ],
        sentencePatterns: [
          { pattern: 'Where is the monkey?', example: 'Where is the monkey?', translationVi: 'Con khỉ ở đâu?' },
          { pattern: 'It\'s in the tree.', example: 'It\'s in the tree.', translationVi: 'Nó ở trên cây.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture']
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
          { id: 'v91', word: 'zebra', meaningVi: 'ngựa vằn', exampleSentence: 'They\'re zebras.' }
        ],
        sentencePatterns: [
          { pattern: 'Where are the snakes?', example: 'Where are the snakes?', translationVi: 'Những con rắn ở đâu?' },
          { pattern: 'They\'re on the rock.', example: 'They\'re on the rock.', translationVi: 'Chúng ở trên hòn đá.' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse']
      },
      {
        id: 'u6-l3',
        number: 3,
        title: 'Story: Where\'s Danny?',
        learningObjective: 'Apologize politely.',
        grammarFocus: 'Apologizing',
        vocabulary: [],
        sentencePatterns: [
          { pattern: 'I\'m sorry.', example: 'I\'m sorry.', translationVi: 'Tớ xin lỗi.' },
          { pattern: 'That\'s OK.', example: 'That\'s OK.', translationVi: 'Không sao đâu.' }
        ],
        conversation: {
          lines: [
            { speaker: 'Student', text: 'I\'m sorry.', translationVi: 'Tớ xin lỗi nhé.' },
            { speaker: 'Friend', text: 'That\'s OK.', translationVi: 'Không sao đâu mà.' }
          ],
          socialSkill: 'Be safe.'
        },
        suggestedGames: ['sentenceBuilder']
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
        suggestedGames: ['choosePicture', 'mysteryBox']
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
          { pattern: 'What\'s this? / What are these?', example: 'What\'s this?', translationVi: 'Đây là cái gì?' },
          { pattern: 'This is my arm. / These are my arms.', example: 'This is my arm.', translationVi: 'Đây là cánh tay của tớ.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture']
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
          { pattern: 'Is this my eye?', example: 'Is this my eye?', translationVi: 'Đây có phải mắt tớ không?' },
          { pattern: 'Are these my eyes?', example: 'Are these my eyes?', translationVi: 'Đây có phải đôi mắt của tớ không?' }
        ],
        suggestedGames: ['choosePicture', 'trueOrFalse']
      },
      {
        id: 'u7-l3',
        number: 3,
        title: 'Story: I Can\'t See!',
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
        suggestedGames: ['sentenceBuilder']
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
        suggestedGames: ['choosePicture', 'pictureMatch']
      }
    ]
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
          { id: 'v110', word: 'old', meaningVi: 'cũ', exampleSentence: 'That\'s an old bike.' },
          { id: 'v111', word: 'new', meaningVi: 'mới', exampleSentence: 'Those are new bikes.' },
          { id: 'v112', word: 'big', meaningVi: 'to / lớn', exampleSentence: 'It is big.' },
          { id: 'v113', word: 'small', meaningVi: 'nhỏ', exampleSentence: 'It is small.' },
          { id: 'v114', word: 'long', meaningVi: 'dài', exampleSentence: 'That is long.' },
          { id: 'v115', word: 'short', meaningVi: 'ngắn', exampleSentence: 'It is short.' }
        ],
        sentencePatterns: [
          { pattern: 'That\'s an old bike.', example: 'That\'s an old bike.', translationVi: 'Kìa là một chiếc xe đạp cũ.' },
          { pattern: 'What are these? Those are new bikes.', example: 'Those are new bikes.', translationVi: 'Kìa là những chiếc xe đạp mới.' }
        ],
        suggestedGames: ['flashcard', 'pictureMatch', 'choosePicture']
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
        suggestedGames: ['choosePicture', 'trueOrFalse']
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
        suggestedGames: ['sentenceBuilder']
      },
      {
        id: 'u8-l4',
        number: 4,
        title: 'Transportation',
        learningObjective: 'Identify vehicles and describe them.',
        grammarFocus: 'This / That / These / Those',
        vocabulary: [
          { id: 'v120', word: 'bus', meaningVi: 'xe buýt', exampleSentence: 'It\'s an old bus.' },
          { id: 'v121', word: 'truck', meaningVi: 'xe tải', exampleSentence: 'What\'s this? It\'s a truck.' },
          { id: 'v122', word: 'train', meaningVi: 'tàu hỏa', exampleSentence: 'That is a long train.' },
          { id: 'v123', word: 'boat', meaningVi: 'thuyền', exampleSentence: 'They\'re new boats.' }
        ],
        sentencePatterns: [
          { pattern: 'What\'s this? It\'s a bus.', example: 'What\'s this? It\'s a bus.', translationVi: 'Đây là gì? Đây là xe buýt.' },
          { pattern: 'What are these? They\'re new buses.', example: 'They\'re new buses.', translationVi: 'Đây là những chiếc xe buýt mới.' }
        ],
        suggestedGames: ['choosePicture', 'mysteryBox']
      }
    ],
    checkUp: {
      title: 'CHECK UP 4 (Units 7–8)',
      description: 'Review Body Parts, Healthy Habits, Adjectives, Transportation and Polite Expressions.',
      phonics: ['rake', 'vase', 'beet', 'peek', 'cube', 'lime', 'rose', 'bone', 'mule'],
      project: 'My Robot'
    }
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
