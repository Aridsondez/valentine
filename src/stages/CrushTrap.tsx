import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { TRAP_CHARACTERS } from '../config/gameConfig';
import { CharacterCard } from '../components/ui/CharacterCard';
import { BurstConfetti } from '../components/ui/Confetti';

export function CrushTrap() {
  const { crushTrapIndex, answerTrap } = useGameStore();
  const [shaking, setShaking] = useState(false);
  const [burst, setBurst] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const character = TRAP_CHARACTERS[crushTrapIndex];

  useEffect(() => {
    setCardKey((k) => k + 1);
    setShaking(false);
    setBurst(false);
  }, [crushTrapIndex]);

  const handleYes = () => {
    setShaking(true);
    setTimeout(() => {
      answerTrap(true);
    }, 300);
  };

  const handleNo = () => {
    setBurst(true);
    setTimeout(() => {
      answerTrap(false);
    }, 400);
  };

  if (!character) return null;

  const total = TRAP_CHARACTERS.length;

  return (
    <div className="stage-content centerable">
      <BurstConfetti active={burst} count={20} />

      {/* Stage label */}
      <div style={{ textAlign: 'center' }}>
        <span className="tag">Stage 1 of 4 — The Crush Trap</span>
      </div>

      {/* Progress dots */}
      <div className="progress-row">
        <div className="progress-dots">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${i < crushTrapIndex ? 'done' : i === crushTrapIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <span className="progress-label">{crushTrapIndex + 1} / {total}</span>
      </div>

      {/* Character card */}
      <div key={cardKey} style={{ width: '100%' }}>
        <CharacterCard
          character={character}
          question="Would you be my valentine? 💘"
          shaking={shaking}
        >
          <div className="yes-no-row" style={{ marginTop: 4 }}>
            <button className="btn btn-yes" onClick={handleYes}>
              💝 Yes!
            </button>
            <button className="btn btn-no" onClick={handleNo}>
              💚 No
            </button>
          </div>
        </CharacterCard>
      </div>

      <p className="subtitle" style={{ fontSize: '0.8rem' }}>
        Choose wisely... your heart meter is watching. 👀
      </p>
    </div>
  );
}
