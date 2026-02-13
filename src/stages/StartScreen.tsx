import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Plumbob } from '../components/ui/Plumbob';
import { AboutModal } from '../components/ui/AboutModal';

export function StartScreen() {
  const { startGame, redemption } = useGameStore();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="stage-content centerable">
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Hero card */}
      <div className="card" style={{ textAlign: 'center', padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
        <span className="sparkle" style={{ top: 16, left: 20, fontSize: '1.4rem', animationDelay: '0s' }}>✦</span>
        <span className="sparkle" style={{ top: 24, right: 22, fontSize: '1rem', animationDelay: '0.5s' }}>✧</span>
        <span className="sparkle" style={{ bottom: 20, left: 30, fontSize: '0.9rem', animationDelay: '1s' }}>✦</span>
        <span className="sparkle" style={{ bottom: 18, right: 18, fontSize: '1.2rem', animationDelay: '0.3s' }}>✧</span>

        <Plumbob />

        <div style={{ fontSize: '3.5rem', marginBottom: 12, display: 'inline-block' }} className="animate-heartbeat">
          💚
        </div>

        <h1 className="title-xl" style={{ marginBottom: 10 }}>
          <span className="gradient-text">Valentine</span>
          <br />
          <span style={{ color: 'var(--text-dark)' }}>Challenge</span>
        </h1>

        <p className="subtitle" style={{ marginBottom: 8, maxWidth: 300, margin: '0 auto 20px' }}>
          A Sims-themed mini game for the boldest valentine in the neighbourhood.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['4 Stages', '7 Questions', '1 Prize'].map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn btn-primary" onClick={startGame} style={{ width: '100%' }}>
        💚 Start Challenge
      </button>

      {/* Redemption notice */}
      {redemption.redeemed && (
        <div className="card" style={{ padding: '16px 20px', background: '#f0fdf4', border: '1.5px solid #86efac' }}>
          <p style={{ fontSize: '0.85rem', color: '#166534', textAlign: 'center', fontWeight: 700 }}>
            ✅ You already redeemed your voucher!{' '}
            {redemption.note && <span style={{ fontStyle: 'italic', fontWeight: 400 }}>"{redemption.note}"</span>}
          </p>
        </div>
      )}

      {/* About */}
      <button className="btn-ghost" onClick={() => setShowAbout(true)}>
        📋 How to play
      </button>
    </div>
  );
}
