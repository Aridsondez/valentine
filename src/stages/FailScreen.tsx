import { useGameStore } from '../store/gameStore';
import { QUIZ_QUESTIONS } from '../config/gameConfig';

const FAIL_MESSAGES: Record<string, { title: string; body: string; emoji: string }> = {
  'said-yes-to-trap': {
    emoji: '😳',
    title: 'Caught in the trap!',
    body: 'You said yes to the wrong person. That was very suspicious behaviour.',
  },
  'said-no-to-aj': {
    emoji: '💔',
    title: 'You really said no?',
    body: "I asked you directly and you said no. Bold choice. Wrong choice.",
  },
  'quiz-failed': {
    emoji: '😬',
    title: 'Not quite there yet!',
    body: "You didn't quite prove you know me. Study up and try again.",
  },
};

export function FailScreen() {
  const { failReason, quiz, retry } = useGameStore();

  const info = FAIL_MESSAGES[failReason ?? 'said-yes-to-trap'];
  const totalQ = QUIZ_QUESTIONS.length;
  const correctCount = Math.round((quiz.score ?? 0) * totalQ);
  const pct = Math.round((quiz.score ?? 0) * 100);

  return (
    <div className="stage-content centerable">
      {/* Main fail card */}
      <div className="card animate-pop-in" style={{ textAlign: 'center', padding: '36px 24px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>{info.emoji}</div>
        <h2 className="title-lg" style={{ marginBottom: 10, color: 'var(--text-dark)' }}>
          {info.title}
        </h2>
        <p className="subtitle" style={{ marginBottom: 16 }}>
          {info.body}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic', fontWeight: 700 }}>
          "Oops… that was not the right interaction."
        </p>
      </div>

      {/* Quiz score breakdown — only for quiz fail */}
      {failReason === 'quiz-failed' && (
        <div className="card animate-fade-in-up" style={{ padding: '20px' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-dark)', marginBottom: 14, textAlign: 'center' }}>
            📊 Your Score
          </p>

          {/* Score visual */}
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: pct >= 80 ? '#f0fdf4' : '#fff1f2',
                border: `2px solid ${pct >= 80 ? '#86efac' : '#fca5a5'}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px 28px',
                gap: 2,
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 900, color: pct >= 80 ? '#166534' : '#9f1239' }}>
                {correctCount}/{totalQ}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)' }}>
                {pct}% correct
              </span>
            </div>
          </div>

          {/* Missed key questions */}
          {quiz.missedKeyQuestions && quiz.missedKeyQuestions.length > 0 && (
            <>
              <div className="divider" style={{ marginBottom: 12 }} />
              <p style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9f1239', marginBottom: 8 }}>
                ⭐ Key questions you missed:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {quiz.missedKeyQuestions.map((id) => {
                  const q = QUIZ_QUESTIONS.find((q) => q.id === id);
                  if (!q) return null;
                  return (
                    <div
                      key={id}
                      style={{
                        background: '#fff1f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 14px',
                      }}
                    >
                      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9f1239', marginBottom: 4 }}>
                        Q{q.id}: {q.text}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)' }}>
                        Correct:{' '}
                        {Array.isArray(q.correct)
                          ? (q.correct as number[]).map((i) => q.options[i]).join(', ')
                          : q.options[q.correct as number]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      <button className="btn btn-danger btn" onClick={retry} style={{ width: '100%' }}>
        💪 Try Again
      </button>
    </div>
  );
}
