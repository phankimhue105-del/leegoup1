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

// AI Speaking Assessment Endpoint
app.post('/api/evaluate-speaking', async (req, res) => {
  try {
    const { transcript, targetPhrase, studentName } = req.body;

    const studentText = (transcript || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const expectedText = targetPhrase.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    let isMismatch = false;
    if (studentText && expectedText) {
      if (!expectedText.includes(' ')) {
        // Target is a single word (e.g. "red")
        const studentWords = studentText.split(/\s+/);
        if (!studentWords.includes(expectedText)) {
          isMismatch = true;
        }
      } else {
        // Target is a sentence (e.g. "It is red.")
        const expectedWords = expectedText.split(/\s+/).filter(w => w.length > 2);
        const studentWords = studentText.split(/\s+/);
        if (expectedWords.length > 0) {
          const overlap = expectedWords.filter(w => studentWords.includes(w));
          // If student speaks less than 30% of key words, count as mismatch
          if (overlap.length < expectedWords.length * 0.3) {
            isMismatch = true;
          }
        }
      }
    }

    if (isMismatch) {
      return res.json({
        overallScore: 66,
        pronunciation: 65,
        fluency: 92,
        accuracy: 10,
        completeness: 100,
        confidence: 60,
        strength: 'Em nói khá trôi chảy và tự nhiên.',
        suggestion: `Em đã đọc sang một từ khác với yêu cầu ("${transcript || 'Chưa rõ'}" thay vì "${targetPhrase}").`,
        encouragement: `Em hãy nghe lại mẫu của LeeGo và đọc đúng từ "${targetPhrase}" nhé!`,
      });
    }

    const genAI = getAI();
    if (!genAI) {
      return res.json({
        overallScore: 92,
        pronunciation: 90,
        fluency: 95,
        accuracy: 90,
        completeness: 95,
        confidence: 90,
        strength: 'Giọng nói rất to, rõ ràng và tự tin!',
        suggestion: 'Cố gắng phát âm rõ các âm đuôi hơn một chút nhé.',
        encouragement: 'Tuyệt vời quá! Em đã hoàn thành thử thách và nhận được 2 sao! ⭐⭐',
      });
    }

    const systemInstruction = `
You are evaluating an actual speech transcript from a young ESL learner (age 6-11) practicing English at LeeGo English Center.
Target phrase to pronounce: "${targetPhrase}"
Actual learner transcript: "${transcript || ''}"

Evaluation Rules (LeeGo Speaking Assessment Protocol):
1. CRITICAL CONTENT CHECK: Compare learner transcript to target phrase.
   - If they spoke the wrong word/phrase (e.g. target is "red" but they said "blue", or the words differ completely):
     * Accuracy (Độ chính xác) MUST be between 5 and 20.
     * Pronunciation (Phát âm) MUST NOT exceed 65.
     * Overall Score MUST be between 55 and 70. Never assign scores above 90 when the student speaks the wrong word or sentence!
     * feedback suggestion/encouragement must explain: "Em đã đọc nhầm sang từ khác với yêu cầu ('[spoken word]' thay vì '${targetPhrase}')."
2. Evaluate exactly four separate criteria (0-100 each):
   - Pronunciation (Phát âm): Evaluate pronunciation quality of correct matched words.
   - Fluency (Độ trôi chảy): Evaluate rhythm and speed only (do not penalize fluency for correctness errors).
   - Accuracy (Độ chính xác): Compare spoken words against the target. Penalize for deletions, substitutions, additions, or mismatch.
   - Completeness (Mức độ hoàn thành): Evaluate how much of the target word/phrase was completed.
3. The overallScore must be calculated as a composite of these four criteria. Never generate a fixed/static score.
4. All feedback must be in VIETNAMESE, child-friendly, and match the score ranges (95-100: Great praise; 85-94: 1 constructive suggestion; 70-84: Good + suggestions; <70: Encouraging advice detailing the specific mistake).

Output JSON format ONLY:
{
  "overallScore": number (0-100),
  "pronunciation": number (0-100),
  "fluency": number (0-100),
  "accuracy": number (0-100),
  "completeness": number (0-100),
  "confidence": number (0-100),
  "strength": "Nhận xét chi tiết về điểm mạnh bằng tiếng Việt (1 câu)",
  "suggestion": "Một gợi ý cụ thể để cải thiện bằng tiếng Việt (1 câu)",
  "encouragement": "Lời khen ngợi và động viên của giáo viên bằng tiếng Việt (1 câu)"
}
`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Evaluate speaking for target: "${targetPhrase}". Learner said: "${transcript}".`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            pronunciation: { type: Type.INTEGER },
            fluency: { type: Type.INTEGER },
            accuracy: { type: Type.INTEGER },
            completeness: { type: Type.INTEGER },
            confidence: { type: Type.INTEGER },
            strength: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            encouragement: { type: Type.STRING },
          },
          required: ['overallScore', 'pronunciation', 'fluency', 'accuracy', 'completeness', 'strength', 'suggestion', 'encouragement'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err) {
    console.error('Speaking assessment error:', err);
    
    // Check mismatch for fallback
    const studentText = (transcript || '').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const expectedText = targetPhrase.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    
    let isMismatch = false;
    if (studentText && expectedText) {
      if (!expectedText.includes(' ')) {
        const studentWords = studentText.split(/\s+/);
        if (!studentWords.includes(expectedText)) {
          isMismatch = true;
        }
      } else {
        const expectedWords = expectedText.split(/\s+/).filter(w => w.length > 2);
        const studentWords = studentText.split(/\s+/);
        if (expectedWords.length > 0) {
          const overlap = expectedWords.filter(w => studentWords.includes(w));
          if (overlap.length < expectedWords.length * 0.3) {
            isMismatch = true;
          }
        }
      }
    }

    if (isMismatch) {
      res.json({
        overallScore: 66,
        pronunciation: 65,
        fluency: 92,
        accuracy: 10,
        completeness: 100,
        confidence: 60,
        strength: 'Em nói khá trôi chảy và tự nhiên.',
        suggestion: `Em đã đọc sang một từ khác với yêu cầu ("${transcript || 'Chưa rõ'}" thay vì "${targetPhrase}").`,
        encouragement: `Em hãy nghe lại mẫu của LeeGo và đọc đúng từ "${targetPhrase}" nhé!`,
      });
    } else {
      res.json({
        overallScore: 88,
        pronunciation: 85,
        fluency: 90,
        accuracy: 88,
        completeness: 90,
        confidence: 88,
        strength: 'Giọng đọc to và rõ ràng, phát âm tương đối chính xác!',
        suggestion: 'Em chú ý phát âm nối âm hoặc âm đuôi mượt mà hơn nhé.',
        encouragement: 'Làm tốt lắm! Chúc mừng em đã hoàn thành xuất sắc nhiệm vụ! ⭐',
      });
    }
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
