export type Stage =
  | 'vocabulary'
  | 'modelPattern'
  | 'practice'
  | 'speaking'
  | 'completed';

export type GameType =
  | 'flashcard'
  | 'pictureMatch'
  | 'choosePicture'
  | 'missingWord'
  | 'sentenceBuilder'
  | 'trueOrFalse'
  | 'memoryGame'
  | 'phonicsMatch'
  | 'mysteryBox'
  | 'bossChallenge';

export interface VocabularyItem {
  id: string;
  word: string;
  meaningVi?: string;
  imageUrl?: string;
  exampleSentence?: string;
  audioText?: string;
}

export interface SentencePattern {
  pattern: string;
  example: string;
  translationVi?: string;
}

export interface PracticeQuestion {
  id?: number;
  type?: string;
  image: string;
  vocabulary: string;
  question: string;
  choices: string[];
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  hintImage?: string;
  unscrambledLetters?: string[];
  oddChoices?: string[];
  activityTitle?: string;
}

export interface SpeakingTask {
  number: number;
  type: 'repeat_word' | 'read_sentence' | 'answer_question' | 'describe_picture' | 'conversation';
  instruction: string;
  emoji?: string;
  promptText: string;
  targetPhrase: string;
  teacherQuestion?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  vocabulary: VocabularyItem[];
  sentencePatterns: SentencePattern[];
  grammarFocus: string;
  learningObjective: string;
  suggestedGames: GameType[];
  conversation?: {
    lines: { speaker: string; text: string; translationVi?: string }[];
    socialSkill?: string;
  };
  forbiddenVocab?: string[];
  practiceQuestions?: PracticeQuestion[];
  speakingTasks?: SpeakingTask[];
}

export interface PhonicsSet {
  words: string[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  theme: string;
  learningGoal: string;
  lessons: Lesson[];
  checkUp?: {
    title: string;
    description: string;
    phonics: string[];
    project: string;
    practiceQuestions?: PracticeQuestion[];
    speakingTasks?: SpeakingTask[];
  };
}

export interface StudentProgress {
  stars: number;
  badges: string[];
  completedLessonIds: string[];
  completedUnitIds: string[];
  speakingScoreAvg: number;
  dailyStreak: number;
  currentUnitId: string;
  currentLessonId: string;
  currentStage: Stage;
}

export interface SpeakingAssessment {
  overallScore: number;
  pronunciation: number;
  fluency: number;
  accuracy: number;
  completeness: number;
  confidence: number;
  strength: string;
  suggestion: string;
  encouragement: string;
  comment?: string;
  correctWords?: string[];
  missingWords?: string[];
  incorrectWords?: { expected: string; student: string }[];
  pronunciationProblems?: string[];
}

export interface AITeacherResponse {
  speechText: string;
  translationVi?: string;
  teacherMood: 'cheerful' | 'encouraging' | 'praising' | 'explaining' | 'celebrating';
  suggestedAction?: string;
  hint?: string;
  starsAwarded?: number;
}
