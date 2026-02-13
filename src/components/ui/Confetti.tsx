import { useEffect, useState } from 'react';

const COLORS = ['#ff6b9d', '#2ecc71', '#60a5fa', '#fbbf24', '#c084fc', '#fb923c', '#34d399'];

interface Piece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    duration: 2.5 + Math.random() * 2,
    delay: Math.random() * 1.5,
  }));
}

interface ConfettiProps {
  count?: number;
}

export function Confetti({ count = 60 }: ConfettiProps) {
  const [pieces] = useState(() => makePieces(count));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}vw`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

interface BurstConfettiProps {
  active: boolean;
  count?: number;
}

export function BurstConfetti({ active, count = 30 }: BurstConfettiProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (active) setKey((k) => k + 1);
  }, [active]);

  if (!active) return null;

  return <Confetti key={key} count={count} />;
}
