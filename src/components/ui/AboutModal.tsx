interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">📋 How to Play</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '💚', text: 'Resist all the wrong crushes — answer NO to every trap character to keep your relationship meter rising.' },
            { icon: '💌', text: 'When I finally ask the question, you better say YES or it\'s game over.' },
            { icon: '🧠', text: 'Prove you truly know me by acing the quiz. Score ≥80% AND get all 3 key questions right to win the prize.' },
          ].map(({ icon, text }, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{text}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '12px 36px' }} onClick={onClose}>
            Got it! 💪
          </button>
        </div>
      </div>
    </div>
  );
}
