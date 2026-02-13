import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Confetti } from '../components/ui/Confetti';
import { Plumbob } from '../components/ui/Plumbob';

const THEME_ITEMS = [
  { emoji: '🐴', label: 'For the horse girl' },
  { emoji: '🎸', label: 'Guitar energy' },
  { emoji: '💎', label: 'sims head ' },
  { emoji: '🎤', label: 'One Direction fan' },
  { emoji: '🩺', label: 'Future Dr. Nalani' },
  { emoji: '🌙', label: 'Good Days vibes' },
  { emoji: '🐎', label: 'Unbothered queen' },
  { emoji: '📚', label: 'Pre-med grind' },
];

export function PrizeScreen() {
  const { retry, redeemVoucher, redemption } = useGameStore();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [note, setNote] = useState(redemption.note ?? '');
  const [justRedeemed, setJustRedeemed] = useState(false);

  const handleRedeem = () => {
    redeemVoucher(note);
    setJustRedeemed(true);
  };

  return (
    <div className="stage-content">
      <Confetti count={80} />

      <div style={{ textAlign: 'center' }}>
        <span className="tag" style={{ background: '#fdf4ff', color: '#7e22ce', borderColor: '#e9d5ff' }}>
          Stage 4 — Winner! 🎉
        </span>
      </div>

      {/* Hero card */}
      <div className="card animate-pop-in" style={{ textAlign: 'center', padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
        <span className="sparkle" style={{ top: 14, left: 18, fontSize: '1.4rem', animationDelay: '0s' }}>✦</span>
        <span className="sparkle" style={{ top: 20, right: 20, fontSize: '1rem', animationDelay: '0.6s' }}>✧</span>
        <span className="sparkle" style={{ bottom: 14, left: 28, fontSize: '0.9rem', animationDelay: '1.2s' }}>✦</span>
        <span className="sparkle" style={{ bottom: 16, right: 16, fontSize: '1.1rem', animationDelay: '0.4s' }}>✧</span>

        <Plumbob />

        <div style={{ fontSize: '3rem', marginBottom: 10 }} className="animate-bounce">💚</div>
        <h2 className="title-xl" style={{ marginBottom: 12 }}>
          <span className="gradient-text">You Won!</span>
        </h2>
        <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 16, lineHeight: 1.65 }}>
          You are my Valentine every year —<br />so please be sweet and don't cry<br />if I don't ask. 😌
        </p>
        <div className="divider" style={{ marginBottom: 16 }} />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.8, fontStyle: 'italic' }}>
          Sorry I can't get you anything,<br />hope this helps butt butt.
        </p>
        <p style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--sims-pink)', marginTop: 14 }} className="animate-heartbeat">
          I just love you so much 💗
        </p>
      </div>

      {/* ── ENVELOPE ── */}
      <div className="envelope-wrap animate-fade-in-up">
        {!envelopeOpen ? (
          /* Sealed envelope */
          <div
            className="envelope-outer"
            onClick={() => setEnvelopeOpen(true)}
            role="button"
            aria-label="Open your voucher"
          >
            {/* Crease decorations */}
            <div className="envelope-bottom-crease" />
            <div className="envelope-left-crease" />
            <div className="envelope-right-crease" />
            {/* Flap */}
            <div className="envelope-flap" />

            {/* Body */}
            <div className="envelope-body">
              <div className="envelope-seal">💌</div>
              <p style={{ fontWeight: 900, fontSize: '1rem', color: '#be185d', marginBottom: 2 }}>
                Your Valentine's Gift
              </p>
              <p className="envelope-tap-hint">
                Tap to open 🐴✨
              </p>
            </div>
          </div>
        ) : (
          /* Opened — show voucher */
          <div className="voucher-inner">
            <div className="voucher-full">
              {/* Top deco */}
              <div className="voucher-deco-row">
                🐴🐎🎸🎤💎🌙🩺📚
              </div>

              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 4 }}>
                Official Valentine's Voucher
              </div>

              <div className="voucher-title">Made with love ♡</div>

              <div className="voucher-amount">1 Free Pass</div>
              <div className="voucher-desc">Make me do anything (reasonable)</div>

              <div className="divider" style={{ margin: '12px 0' }} />

              {/* Themed grid */}
              <div className="voucher-theme-grid">
                {THEME_ITEMS.map(({ emoji, label }) => (
                  <div key={label} className="voucher-theme-item">
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="divider" style={{ margin: '12px 0' }} />

              {/* Personal note */}
              <p style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: 10 }}>
                For the girl who loves horses 🐴, cries at 1D songs 🎤,<br />
                has SZA on repeat 🌙, and is going to be<br />
                the most incredible doctor one day 🩺
              </p>

              <p style={{ fontSize: '0.82rem', color: '#be185d', fontWeight: 900 }}>
                — redeemable anytime, forever 💗
              </p>

              <div className="voucher-terms">
                Valid for one use · No expiry · Reasonable requests only<br />
                Sims-certified 💎
              </div>

              {/* Bottom deco */}
              <div className="voucher-deco-row" style={{ marginTop: 12 }}>
                💚💗🐎🎸🎤💎🌙🩺
              </div>
            </div>

            {/* Screenshot warning */}
            <div className="screenshot-warning" style={{ marginTop: 12 }}>
              <p>📸 SCREENSHOT THIS NOW or you'll lose it forever!</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: 4, opacity: 0.8 }}>
                No screenshot = no voucher. I'm serious. 😤
              </p>
            </div>

            {/* Redemption */}
            {!redemption.redeemed && !justRedeemed && (
              <div className="card" style={{ padding: '20px', marginTop: 12 }}>
                <p style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10 }}>
                  💌 Ready to redeem?
                </p>
                <textarea
                  className="note-input"
                  placeholder="What do you want to use it for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleRedeem}
                  style={{ width: '100%', marginTop: 12 }}
                >
                  💚 Redeem Voucher
                </button>
              </div>
            )}

            {(redemption.redeemed || justRedeemed) && (
              <div className="card animate-pop-in" style={{ background: '#f0fdf4', border: '2px solid #86efac', padding: '20px', marginTop: 12 }}>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: '#166534', textAlign: 'center', marginBottom: 6 }}>
                  ✅ Voucher Redeemed!
                </p>
                {(note || redemption.note) && (
                  <p style={{ fontSize: '0.85rem', color: '#166534', textAlign: 'center', fontStyle: 'italic' }}>
                    "{note || redemption.note}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <button className="btn btn-secondary btn" onClick={retry} style={{ width: '100%' }}>
        🔄 Play Again
      </button>
    </div>
  );
}
