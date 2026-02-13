import { useGameStore } from '../store/gameStore';
import { CharacterCard } from '../components/ui/CharacterCard';
import { BurstConfetti } from '../components/ui/Confetti';
import { useState } from 'react';

const AJ_CHARACTER = {
  id: 'aj',
  name: 'AJ',
  emoji: '💚',
  subtitle: 'Your actual valentine. The one who made all this for you.',
  color: '#2ecc71',
};

export function RealQuestion() {
  const { answerAJ } = useGameStore();
  const [burst, setBurst] = useState(false);

  const handleYes = () => {
    setBurst(true);
    setTimeout(() => answerAJ(true), 600);
  };

  const handleNo = () => {
    answerAJ(false);
  };

  return (
    <div className="stage-content centerable">
      <BurstConfetti active={burst} count={50} />

      <div style={{ textAlign: 'center' }}>
        <span className="tag" style={{ background: '#f0fdf4', color: '#166534' }}>Stage 2 of 4 — The Real Question</span>
      </div>

      <div className="animate-fade-in-up" style={{ width: '100%' }}>
        <CharacterCard
          character={AJ_CHARACTER}
          question="Will you be my Valentine? 💚"
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 16, fontStyle: 'italic' }}>
            (This one actually matters.)
          </p>
          <div className="yes-no-row">
            <button className="btn btn-yes" onClick={handleYes} style={{ fontSize: '1.05rem', padding: '16px 20px' }}>
              💚 Yes!!
            </button>
            <button className="btn btn-no" onClick={handleNo}>
              😬 No...
            </button>
          </div>
        </CharacterCard>
      </div>

      <p className="subtitle" style={{ fontSize: '0.82rem' }}>
        You resisted all the impostors. Don't blow it now. 🌟
      </p>
    </div>
  );
}
