import { CURRICULUM_UNITS } from '../../../../../../Desktop/LeeGo/TẠO APP - UP 1/leegoup1/src/data/curriculum';

const validateQuestion = (q: any): boolean => {
  if (!q.image) {
    console.error(`[Validation] image/emoji is missing!`, q);
    return false;
  }
  const choices = q.options || q.choices || [];
  if (!choices || choices.length !== 4) {
    console.error(`[Validation] choices count is not exactly 4!`, q);
    return false;
  }
  if (!choices.includes(q.correctAnswer)) {
    console.error(`[Validation] correctAnswer "${q.correctAnswer}" is not in choices!`, choices);
    return false;
  }
  if (!q.question) {
    console.error(`[Validation] question text is empty!`, q);
    return false;
  }
  if (!q.explanation) {
    console.error(`[Validation] explanation is missing!`, q);
    return false;
  }
  return true;
};

const validateUnits = [1, 2, 3, 4, 5, 6, 7, 8];
validateUnits.forEach(unitNum => {
  const unit = CURRICULUM_UNITS.find(u => u.number === unitNum);
  if (!unit) {
    console.error(`Unit ${unitNum} not found!`);
    return;
  }
  const lesson = unit.lessons.find(l => l.number === 2);
  if (!lesson) {
    console.error(`Lesson 2 not found in Unit ${unitNum}!`);
    return;
  }
  
  console.log(`\n--- Validating Unit ${unitNum} Lesson 2 ---`);
  const practiceQs = lesson.practiceQuestions || [];
  console.log(`Found ${practiceQs.length} questions.`);
  
  let allValid = true;
  practiceQs.forEach((q, idx) => {
    const isValid = validateQuestion(q);
    if (!isValid) {
      console.error(`Question ${idx + 1} is INVALID!`);
      allValid = false;
    }
  });
  
  if (allValid && practiceQs.length > 0) {
    console.log(`Unit ${unitNum} Lesson 2 is fully VALID!`);
  } else {
    console.error(`Unit ${unitNum} Lesson 2 has validation failures!`);
  }
});
