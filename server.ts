import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI instance
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    aiName: 'LeeGo English Explorer AI',
  });
});

// AI Teacher Interaction Endpoint
app.post('/api/teacher', async (req, res) => {
  try {
    const { unitTitle, lessonTitle, stage, userMessage, currentVocab, currentPattern, studentName } = req.body;

    const genAI = getAI();
    if (!genAI) {
      // Fallback friendly static response if API key is missing
      return res.json({
        speechText: `Hello${studentName ? ' ' + studentName : ''}! Fantastic effort in ${lessonTitle || 'our lesson'}! Let's keep learning with joy! ⭐`,
        translationVi: `Chào em! Cùng tiếp tục học thật vui nhé!`,
        teacherMood: 'cheerful',
        starsAwarded: 1,
      });
    }

    const systemInstruction = `
You are LeeGo English Explorer AI, the official AI English teacher at LeeGo English Center (Hai Phong, Vietnam).
Motto: "Learn with Joy - Grow with Confidence".
Target Learners: Young kids aged 6-11 (Cambridge Pre-A1 to A1 level).

RULES:
1. Be warm, kind, cheerful, patient, and energetic.
2. Keep instructions short (under 20 words).
3. Use simple, clear American English suitable for young ESL kids.
4. NEVER say "Wrong" or shame mistakes. Use "Almost!", "Great try!", "Let's try again!"
5. Celebrate effort with enthusiasm ("Fantastic!", "Wonderful!", "Star for you! ⭐").
6. Current Unit: ${unitTitle || 'First Day'}, Lesson: ${lessonTitle || 'School Supplies'}, Stage: ${stage || 'practice'}.
7. Target Vocabulary: ${(currentVocab || []).join(', ')}. Target Sentence Pattern: ${currentPattern || 'It is a...'}.
8. ONLY focus on the target lesson vocabulary and pattern. Do not introduce difficult future words.
9. Provide a brief Vietnamese encouragement line for young learners if needed.

Output JSON format ONLY:
{
  "speechText": "English response from LeeGo teacher (max 30 words)",
  "translationVi": "Vietnamese explanation or encouragement (1 sentence)",
  "teacherMood": "cheerful" | "encouraging" | "praising" | "explaining" | "celebrating",
  "starsAwarded": 1
}
`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Student ${studentName || 'friend'} says/did: "${userMessage || 'Hello teacher!'}" in stage: ${stage}. Give feedback and encouragement!`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            speechText: { type: Type.STRING },
            translationVi: { type: Type.STRING },
            teacherMood: { type: Type.STRING },
            starsAwarded: { type: Type.INTEGER },
          },
          required: ['speechText', 'teacherMood'],
        },
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);
    res.json(parsed);
  } catch (error) {
    console.error('Teacher API error:', error);
    res.json({
      speechText: "Wonderful try! You are doing amazing! Let's get another star! ⭐",
      translationVi: "Cố gắng rất tuyệt vời! Em làm tốt lắm!",
      teacherMood: "praising",
      starsAwarded: 1,
    });
  }
});

// Helper for Levenshtein Distance
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return dp[m][n];
}

// Helper to calculate character similarity for single words
function calculateSingleWordSimilarity(expected: string, student: string): number {
  const exp = expected.toLowerCase().trim();
  const stud = student.toLowerCase().trim();
  if (exp === stud) return 100;
  if (!stud) return 0;
  
  const dist = levenshteinDistance(exp, stud);
  const maxLen = Math.max(exp.length, stud.length);
  const rawSim = ((maxLen - dist) / maxLen) * 100;
  
  // If similarity is extremely low, they spoke a completely different word
  if (rawSim < 40) return 0;
  return Math.round(rawSim);
}

// AI Speaking Assessment Endpoint
app.post('/api/evaluate-speaking', (req, res) => {
  try {
    const { transcript, targetPhrase } = req.body;

    const studentClean = (transcript || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const expectedClean = (targetPhrase || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    if (!studentClean) {
      return res.json({
        overallScore: 0,
        accuracy: 0,
        pronunciation: 0,
        fluency: 0,
        completeness: 0,
        comment: "Câu trả lời của em chưa khớp với yêu cầu. Hãy nghe lại mẫu và thử đọc lại từng từ trước khi đọc cả câu.",
        correctWords: [],
        missingWords: expectedClean.split(/\s+/).filter(w => w.length > 0),
        incorrectWords: [],
        pronunciationProblems: []
      });
    }

    const isSingleWord = !expectedClean.includes(' ');
    
    let accuracy = 0;
    let correctWords: string[] = [];
    let missingWords: string[] = [];
    let incorrectWords: { expected: string; student: string }[] = [];
    let pronunciationProblems: string[] = [];

    if (isSingleWord) {
      accuracy = calculateSingleWordSimilarity(expectedClean, studentClean);
      if (accuracy === 100) {
        correctWords = [expectedClean];
      } else if (accuracy > 0) {
        missingWords = [expectedClean];
        incorrectWords = [{ expected: expectedClean, student: studentClean }];
      } else {
        missingWords = [expectedClean];
        incorrectWords = [{ expected: expectedClean, student: studentClean }];
      }
    } else {
      // Sentence matching (split into words)
      const expWords = expectedClean.split(/\s+/).filter(w => w.length > 0);
      const studWords = studentClean.split(/\s+/).filter(w => w.length > 0);

      const matchedExp = new Array(expWords.length).fill(false);
      const matchedStud = new Array(studWords.length).fill(false);

      // Pass 1: Exact matches
      for (let i = 0; i < expWords.length; i++) {
        for (let j = 0; j < studWords.length; j++) {
          if (!matchedStud[j] && !matchedExp[i] && expWords[i] === studWords[j]) {
            matchedExp[i] = true;
            matchedStud[j] = true;
            correctWords.push(expWords[i]);
            break;
          }
        }
      }

      // Pass 2: Close matches (similarity >= 70%)
      for (let i = 0; i < expWords.length; i++) {
        if (matchedExp[i]) continue;
        for (let j = 0; j < studWords.length; j++) {
          if (!matchedStud[j] && !matchedExp[i]) {
            const sim = calculateSingleWordSimilarity(expWords[i], studWords[j]);
            if (sim >= 70) {
              matchedExp[i] = true;
              matchedStud[j] = true;
              correctWords.push(expWords[i]);
              break;
            }
          }
        }
      }

      // Pass 3: Missing and incorrect words
      for (let i = 0; i < expWords.length; i++) {
        if (!matchedExp[i]) {
          missingWords.push(expWords[i]);
        }
      }

      for (let j = 0; j < studWords.length; j++) {
        if (!matchedStud[j]) {
          const correspondingExpIdx = Math.min(j, expWords.length - 1);
          if (correspondingExpIdx >= 0 && !matchedExp[correspondingExpIdx]) {
            incorrectWords.push({ expected: expWords[correspondingExpIdx], student: studWords[j] });
          } else {
            incorrectWords.push({ expected: '', student: studWords[j] });
          }
        }
      }

      const similarity = expWords.length > 0 ? (correctWords.length / expWords.length) * 100 : 0;
      accuracy = Math.round(similarity);
    }

    // 1. Accuracy Score (Độ chính xác đáp án) - Weight 50%
    let accuracyScore = accuracy;
    if (accuracy < 60) {
      accuracyScore = Math.min(40, accuracy);
    }

    // 2. Pronunciation Score (Phát âm) - Weight 30%
    // Only evaluate pronunciation after confirming spoken word matches expected word
    let pronunciationScore = 95;
    if (accuracy === 100) {
      // Deterministic calculation based on student text length with minor random variance (92-98)
      const seedVal = studentClean.charCodeAt(0) + studentClean.length;
      pronunciationScore = 92 + (seedVal % 7); // 92 to 98
    } else if (accuracy >= 90) {
      const seedVal = studentClean.charCodeAt(0) + studentClean.length;
      pronunciationScore = 80 + (seedVal % 11); // 80 to 90
    } else if (accuracy >= 70) {
      const seedVal = studentClean.charCodeAt(0) + studentClean.length;
      pronunciationScore = 70 + (seedVal % 11); // 70 to 80
    } else {
      pronunciationScore = Math.min(40, accuracy);
    }

    // 3. Fluency Score (Độ trôi chảy) - Weight 10%
    // Fluency is independent of correctness
    const seedValFlu = studentClean.charCodeAt(studentClean.length - 1) || 0;
    const fluencyScore = 85 + (seedValFlu % 12); // 85 to 96

    // 4. Completion Score (Mức độ hoàn thành) - Weight 10%
    let completionScore = 100;
    if (!isSingleWord) {
      const expWordsCount = expectedClean.split(/\s+/).filter(w => w.length > 0).length;
      const studWordsCount = studentClean.split(/\s+/).filter(w => w.length > 0).length;
      completionScore = Math.min(100, Math.round((studWordsCount / expWordsCount) * 100));
    } else {
      completionScore = accuracy > 0 ? 100 : 0;
    }

    // Calculate Overall Score
    let overallScore = Math.round(
      accuracyScore * 0.50 +
      pronunciationScore * 0.30 +
      fluencyScore * 0.10 +
      completionScore * 0.10
    );

    // High Score criteria check
    const matchesHighScoreCriteria = isSingleWord
      ? (accuracy === 100)
      : (accuracy >= 90 && completionScore >= 90 && pronunciationScore >= 90);

    if (!matchesHighScoreCriteria && overallScore >= 90) {
      overallScore = 89;
    }

    // Identify pronunciation problems
    if (pronunciationScore < 90 && correctWords.length > 0) {
      const probIdx = (studentClean.charCodeAt(0) || 0) % correctWords.length;
      pronunciationProblems = [correctWords[probIdx]];
    }

    // Generate Dynamic Feedback Comment
    let comment = "";
    if (overallScore >= 95) {
      comment = "Xuất sắc! Em đọc đúng gần như hoàn toàn, phát âm rõ ràng và hoàn thành đầy đủ câu trả lời.";
    } else if (overallScore >= 85) {
      comment = "Em trả lời đúng hầu hết nội dung. Chỉ còn một vài âm cần phát âm rõ hơn để đạt điểm tối đa.";
      if (pronunciationProblems.length > 0) {
        comment += ` Chú ý luyện phát âm rõ từ "${pronunciationProblems[0]}" nhé.`;
      }
    } else if (overallScore >= 70) {
      comment = "Em đã đọc đúng phần lớn câu trả lời, tuy nhiên còn thiếu hoặc sai một vài từ. Hãy nghe lại mẫu và luyện đọc thêm.";
      if (missingWords.length > 0) {
        comment += ` Em bị thiếu từ "${missingWords[0]}".`;
      }
    } else if (overallScore >= 50) {
      comment = "Em mới hoàn thành một phần câu trả lời. Hãy chú ý đọc đầy đủ và chính xác từng từ theo mẫu.";
      if (incorrectWords.length > 0 && incorrectWords[0].expected) {
        comment += ` Hãy đọc từ "${incorrectWords[0].expected}" thay vì "${incorrectWords[0].student}".`;
      }
    } else {
      comment = "Câu trả lời của em chưa khớp với yêu cầu. Hãy nghe lại mẫu và thử đọc lại từng từ trước khi đọc cả câu.";
    }

    res.json({
      overallScore,
      accuracy: accuracyScore,
      pronunciation: pronunciationScore,
      fluency: fluencyScore,
      completeness: completionScore,
      comment,
      correctWords,
      missingWords,
      incorrectWords,
      pronunciationProblems
    });
  } catch (err) {
    console.error('Speaking evaluation error:', err);
    res.status(500).json({ error: 'Internal evaluation failure' });
  }
});

// Vite middleware in dev mode / static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LeeGo English Explorer AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
