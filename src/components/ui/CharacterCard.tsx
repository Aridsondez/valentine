import type { TrapCharacter } from '../../config/gameConfig';
import { Plumbob } from './Plumbob';
import imageMap from '../../config/images.json';

interface CharacterCardProps {
  character: TrapCharacter;
  question?: string;
  children?: React.ReactNode;
  shaking?: boolean;
}

type ImageConfig = { src: string | null };

export function CharacterCard({ character, question, children, shaking }: CharacterCardProps) {
  const imgEntry = (imageMap.trapCharacters as Record<string, ImageConfig>)[character.id];
  const imgSrc = imgEntry?.src ?? null;

  return (
    <div className={`card character-card animate-fade-in-up ${shaking ? 'animate-shake' : ''}`}>
      <div
        className="char-stripe"
        style={{ background: `linear-gradient(90deg, ${character.color}, ${character.color}88)` }}
      />
      <Plumbob />
      <div
        className="character-avatar"
        style={
          imgSrc
            ? { padding: 0, overflow: 'hidden', border: `3px solid ${character.color}55` }
            : {
                background: `linear-gradient(135deg, ${character.color}22, ${character.color}44)`,
                border: `3px solid ${character.color}55`,
              }
        }
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={character.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          />
        ) : (
          character.emoji
        )}
      </div>
      <div className="character-name">{character.name}</div>
      <div className="character-subtitle">{character.subtitle}</div>
      {question && <div className="character-question">{question}</div>}
      {children}
    </div>
  );
}
