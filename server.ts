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
    let isCompletelyUnrelated = false;
    if (studentText && expectedText) {
      if (!expectedText.includes(' ')) {
        // Single word target (e.g. "red")
        const studentWords = studentText.split(/\s+/);
        if (!studentWords.includes(expectedText)) {
          isMismatch = true;
          // check if completely unrelated
          isCompletelyUnrelated = studentWords.length > 0 && !studentText.includes(expectedText.substring(0, 2));
        }
      } else {
        // Sentence target (e.g. "It is red.")
        const expectedWords = expectedText.split(/\s+/).filter(w => w.length > 2);
        const studentWords = studentText.split(/\s+/);
        if (expectedWords.length > 0) {
          const overlap = expectedWords.filter(w => studentWords.includes(w));
          if (overlap.length === 0) {
            isCompletelyUnrelated = true;
          } else if (overlap.length < expectedWords.length * 0.3) {
            isMismatch = true;
          }
        }
      }
    }

    if (isCompletelyUnrelated) {
      return res.json({
        overallScore: 25,
        pronunciation: 20,
        fluency: 80,
        completeness: 30,
        comment: 'Em hãy nghe lại mẫu và thử đọc lại chậm hơn nhé.',
      });
    }

    if (isMismatch) {
      return res.json({
        overallScore: 45,
        pronunciation: 40,
        fluency: 85,
        completeness: 100,
        comment: 'Em hãy nghe lại mẫu và thử đọc lại chậm hơn nhé.',
      });
    }

    const genAI = getAI();
    if (!genAI) {
      return res.json({
        overallScore: 92,
        pronunciation: 90,
        fluency: 95,
        completeness: 95,
        comment: 'Em đọc khá tốt. Chỉ cần phát âm rõ hơn một vài từ.',
      });
    }

    const systemInstruction = `
You are evaluating an actual speech transcript from a young ESL learner (age 6-11) practicing English at LeeGo English Center.
Expected Target Phrase: "${targetPhrase}"
Actual learner transcript: "${transcript || ''}"

Evaluation Rules (LeeGo Speaking Assessment Protocol):
1. COMPARE target phrase against learner transcript.
2. CRITICAL SCORING BRACKETS (must reflect actual performance):
   - Correct answer → 90-100.
   - One missing word → 70-85.
   - Several mistakes → 50-70.
   - Wrong answer → Below 50.
   - Completely unrelated answer → Below 30.
   - CRITICAL: Never give an overall score above 90 unless the student's response matches the expected answer very closely!
3. Evaluate exactly three separate criteria (0-100 each):
   - Pronunciation (Phát âm): Evaluate pronunciation quality. Reduce if incorrect, increase if clear/natural.
   - Fluency (Độ trôi chảy): Evaluate rhythm, hesitation, pauses, response time only.
   - Completeness (Mức độ hoàn thành): Evaluate if the student finished the required answer (e.g. expected "This is a pencil." but said "This is..." -> low score).
4. The overallScore must be calculated directly based on similarity, pronunciation, fluency, and completion.
5. Vietnamese Feedback (comment): Output exactly ONE short comment depending on the overallScore:
   - Score 95-100: "Rất tốt! Em đọc rõ ràng và hoàn thành đúng yêu cầu."
   - Score 80-94: "Em đọc khá tốt. Chỉ cần phát âm rõ hơn một vài từ."
   - Score 60-79: "Em đã hoàn thành phần lớn câu trả lời. Hãy luyện thêm để phát âm chính xác hơn."
   - Score < 60: "Em hãy nghe lại mẫu và thử đọc lại chậm hơn nhé."

Output JSON format ONLY:
{
  "overallScore": number,
  "pronunciation": number,
  "fluency": number,
  "completeness": number,
  "comment": "string"
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
            completeness: { type: Type.INTEGER },
            comment: { type: Type.STRING },
          },
          required: ['overallScore', 'pronunciation', 'fluency', 'completeness', 'comment'],
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
    let isCompletelyUnrelated = false;
    if (studentText && expectedText) {
      if (!expectedText.includes(' ')) {
        const studentWords = studentText.split(/\s+/);
        if (!studentWords.includes(expectedText)) {
          isMismatch = true;
          isCompletelyUnrelated = studentWords.length > 0 && !studentText.includes(expectedText.substring(0, 2));
        }
      } else {
        const expectedWords = expectedText.split(/\s+/).filter(w => w.length > 2);
        const studentWords = studentText.split(/\s+/);
        if (expectedWords.length > 0) {
          const overlap = expectedWords.filter(w => studentWords.includes(w));
          if (overlap.length === 0) {
            isCompletelyUnrelated = true;
          } else if (overlap.length < expectedWords.length * 0.3) {
            isMismatch = true;
          }
        }
      }
    }

    if (isCompletelyUnrelated) {
      res.json({
        overallScore: 25,
        pronunciation: 20,
        fluency: 80,
        completeness: 30,
        comment: 'Em hãy nghe lại mẫu và thử đọc lại chậm hơn nhé.',
      });
    } else if (isMismatch) {
      res.json({
        overallScore: 45,
        pronunciation: 40,
        fluency: 85,
        completeness: 100,
        comment: 'Em hãy nghe lại mẫu và thử đọc lại chậm hơn nhé.',
      });
    } else {
      res.json({
        overallScore: 88,
        pronunciation: 85,
        fluency: 90,
        completeness: 90,
        comment: 'Em đọc khá tốt. Chỉ cần phát âm rõ hơn một vài từ.',
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
