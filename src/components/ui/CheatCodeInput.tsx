import { useState } from 'react';

export function CheatCodeInput() {
  const [value, setValue] = useState('');
  const [tried, setTried] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) setTried(true);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <form className="cheat-input-row" onSubmit={handleSubmit}>
        <input
          className="cheat-input"
          type="text"
          placeholder="Enter cheat code..."
          value={value}
          onChange={(e) => { setValue(e.target.value); setTried(false); }}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="btn btn-secondary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
          Try
        </button>
      </form>
      {tried && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic', animation: 'fadeInUp 0.3s ease both' }}>
          Nice try 😌
        </p>
      )}
    </div>
  );
}
