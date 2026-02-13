import { useGameStore } from '../../store/gameStore';
import { MOODS } from '../../config/gameConfig';

export function StatusBar() {
  const { stage, relationshipMeter, soundEnabled, toggleSound } = useGameStore();

  const moodIndex =
    stage === 'start' ? 0
    : stage === 'crush-trap' ? 1
    : stage === 'real-question' ? 2
    : stage === 'quiz' ? 3
    : 4;

  const mood = MOODS[moodIndex] ?? MOODS[0];

  return (
    <div className="status-bar">
      <span
        className="mood-badge"
        style={{ backgroundColor: mood.color }}
      >
        {mood.emoji} {mood.label}
      </span>

      <div className="meter-wrapper">
        <div className="meter-label">Relationship ♥</div>
        <div className="meter-track">
          <div
            className="meter-fill"
            style={{ width: `${relationshipMeter}%` }}
          />
        </div>
      </div>

      <button
        className="sound-btn"
        onClick={toggleSound}
        title={soundEnabled ? 'Mute' : 'Unmute'}
        aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
