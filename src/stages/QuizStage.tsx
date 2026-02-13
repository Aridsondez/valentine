import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { QUIZ_QUESTIONS } from '../config/gameConfig';
import { BurstConfetti } from '../components/ui/Confetti';

function isCorrect(
  questionIndex: number,
  selected: number | number[],
): boolean {
  const q = QUIZ_QUESTIONS[questionIndex];
  if (q.type === 'multiselect') {
    const correct = q.correct as number[];
    const sel = selected as number[];
    return (
      correct.length === sel.length &&
      correct.every((c) => sel.includes(c))
    );
  }
  return selected === q.correct;
}

function getOptionClass(
  optionIndex: number,
  selected: number | number[] | null,
  revealed: boolean,
  correctAnswer: number | number[],
): string {
  const classes: string[] = ['quiz-option'];
  if (revealed) {
    classes.push('revealed');
    const isThisCorrect = Array.isArray(correctAnswer)
      ? (correctAnswer as number[]).includes(optionIndex)
      : correctAnswer === optionIndex;
    if (isThisCorrect) {
      classes.push('correct');
    } else if (
      Array.isArray(selected)
        ? (selected as number[]).includes(optionIndex)
        : selected === optionIndex
    ) {
      classes.push('incorrect');
    }
  } else {
    const isSelected = Array.isArray(selected)
      ? (selected as number[]).includes(optionIndex)
      : selected === optionIndex;
    if (isSelected) classes.push('selected');
  }
  return classes.join(' ');
}

export function QuizStage() {
  const { quiz, answerQuiz, nextQuizQuestion, finishQuiz, adjustMeter } = useGameStore();
  const { currentQuestion, answers } = quiz;

  const [localSelected, setLocalSelected] = useState<number | number[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const q = QUIZ_QUESTIONS[currentQuestion];
  const totalQ = QUIZ_QUESTIONS.length;
  const isLastQuestion = currentQuestion === totalQ - 1;

  useEffect(() => {
    // If answer already exists in store (e.g., refresh mid-quiz), restore it
    const existing = answers[q.id];
    if (existing !== undefined) {
      setLocalSelected(existing);
      setRevealed(true);
    } else {
      setLocalSelected(null);
      setRevealed(false);
    }
    setQuestionKey((k) => k + 1);
  }, [currentQuestion]);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    if (q.type === 'multiselect') {
      setLocalSelected((prev) => {
        const arr = (prev as number[]) ?? [];
        return arr.includes(idx) ? arr.filter((i) => i !== idx) : [...arr, idx];
      });
    } else {
      setLocalSelected(idx);
    }
  };

  const handleConfirm = () => {
    if (localSelected === null || (Array.isArray(localSelected) && localSelected.length === 0)) return;
    setRevealed(true);
    answerQuiz(q.id, localSelected);

    const correct = isCorrect(currentQuestion, localSelected);
    if (correct) {
      adjustMeter(q.meterChange);
      setBurst(true);
      setTimeout(() => setBurst(false), 100);
    } else {
      adjustMeter(-5);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score
      const allAnswers = { ...answers, [q.id]: localSelected! };
      let correctCount = 0;
      const missed: number[] = [];

      QUIZ_QUESTIONS.forEach((question, idx) => {
        const ans = allAnswers[question.id];
        const correct = isCorrect(idx, ans as number | number[]);
        if (correct) {
          correctCount++;
        } else if (question.isKey) {
          missed.push(question.id);
        }
      });

      const scoreRatio = correctCount / totalQ;
      finishQuiz(scoreRatio, missed);
    } else {
      nextQuizQuestion();
    }
  };

  const wasCorrect = revealed && localSelected !== null && isCorrect(currentQuestion, localSelected);
  const hasSelection = localSelected !== null && (!Array.isArray(localSelected) || localSelected.length > 0);

  return (
    <div className="stage-content">
      <BurstConfetti active={burst} count={15} />

      <div style={{ textAlign: 'center' }}>
        <span className="tag">Stage 3 of 4 — Prove You Know Me</span>
      </div>

      {/* Progress */}
      <div className="progress-row">
        <div className="progress-dots">
          {Array.from({ length: totalQ }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < currentQuestion ? 'done' : i === currentQuestion ? 'active' : ''}`}
            />
          ))}
        </div>
        <span className="progress-label">Q{currentQuestion + 1} of {totalQ}</span>
      </div>

      {/* Question card */}
      <div key={questionKey} className="card animate-fade-in-up" style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 16 }}>
          {q.isKey && (
            <span className="tag" style={{ background: '#fff9e6', color: '#92400e', borderColor: '#fcd34d', flexShrink: 0 }}>
              ⭐ Key
            </span>
          )}
          <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.5 }}>
            {q.text}
          </p>
        </div>

        {q.type === 'multiselect' && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 12, fontWeight: 700 }}>
            Select all that apply
          </p>
        )}

        <div className="quiz-options-stack">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={getOptionClass(idx, localSelected, revealed, q.correct)}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
            >
              <span className="option-indicator">
                {revealed ? (
                  Array.isArray(q.correct)
                    ? (q.correct as number[]).includes(idx) ? '✓' : (Array.isArray(localSelected) && (localSelected as number[]).includes(idx)) ? '✗' : ''
                    : q.correct === idx ? '✓' : localSelected === idx ? '✗' : ''
                ) : (
                  Array.isArray(localSelected) && (localSelected as number[]).includes(idx) ? '✓' : ''
                )}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {revealed && (
        <div className={`feedback-banner ${wasCorrect ? 'correct' : 'incorrect'}`}>
          {wasCorrect ? '✅ Correct! You really do know me.' : '❌ Not quite — but keep going!'}
        </div>
      )}

      {/* Action buttons */}
      {!revealed ? (
        <button
          className="btn btn-primary"
          onClick={handleConfirm}
          disabled={!hasSelection}
          style={{ width: '100%' }}
        >
          Confirm Answer
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleNext}
          style={{ width: '100%' }}
        >
          {isLastQuestion ? '🎯 See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
