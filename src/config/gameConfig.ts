export type QuestionType = 'single' | 'truefalse' | 'multiselect';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options: string[];
  correct: number | number[]; // index or indices
  isKey: boolean; // must get right to pass
  meterChange: number; // positive = up, negative = down
}

export interface TrapCharacter {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  color: string; // gradient color
}

export const TRAP_CHARACTERS: TrapCharacter[] = [
  {
    id: 'robert',
    name: 'Robert Pattinson',
    emoji: '🧛',
    subtitle: 'The broody vampire with cheekbones that could cut glass',
    color: '#c084fc',
  },
  {
    id: 'zuko',
    name: 'Prince Zuko',
    emoji: '🔥',
    subtitle: 'Conflicted fire prince with a redemption arc',
    color: '#fb923c',
  },
  {
    id: 'onedirection',
    name: 'Everyone in One Direction',
    emoji: '🎤',
    subtitle: 'All five of them. Simultaneously.',
    color: '#60a5fa',
  },
  {
    id: 'hamilton',
    name: 'Alexander Hamilton',
    emoji: '🎭',
    subtitle: 'Non-stop overachiever. Also, not throwing away his shot.',
    color: '#34d399',
  },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'single',
    text: "When did I say 'I love you' first?",
    options: [
      'In your car',
      'In your room (College Station)',
      'In your room (North Gate)',
      'At dinner',
    ],
    correct: 0,
    isKey: true,
    meterChange: 12,
  },
  {
    id: 2,
    type: 'single',
    text: 'What is your contact name on my phone?',
    options: [
      'Nalani-BabyHead Butt butt',
      'Nalani Walker',
      'Nalani-BabyLala Beautiful 💗💗 GF',
      'Nalani Jitty head 😍 girlfriend',
      'Nalani baby head 😍😍',
      'Nalani-BabyLala Beautiful 😍😍 Girlfriend',
    ],
    correct: 5,
    isKey: true,
    meterChange: 12,
  },
  {
    id: 3,
    type: 'multiselect',
    text: 'Select all events you were physically present for',
    options: [
      'Me quitting RWC',
      'Me receiving the email for Everbright Internship',
      'Me going to my citizen test',
      'Me meeting Lexi for the first time',
      'Me finding out I passed the foundation exam',
      'Me hurting my leg skating',
      'Me getting Universal Knights tickets',
      'Me moving into Lake Clair',
    ],
    // Indices of TRUE events: 0, 2, 3, 4, 5, 6
    correct: [0, 2, 3, 4, 5, 6],
    isKey: true,
    meterChange: 12,
  },
  {
    id: 4,
    type: 'truefalse',
    text: "True or False: I've been to a Black Women in Medicine meeting before you were president?",
    options: ['True', 'False'],
    correct: 0,
    isKey: false,
    meterChange: 10,
  },
  {
    id: 5,
    type: 'truefalse',
    text: "True or False: I've gotten my hair done by someone else than you after meeting you?",
    options: ['True', 'False'],
    correct: 1,
    isKey: false,
    meterChange: 10,
  },
  {
    id: 6,
    type: 'single',
    text: 'What park did I take you to first when you were in San Francisco?',
    options: [
      'Dolores Park',
      'Golden Gate Park',
      'Alamo Square',
      'Presidio',
    ],
    correct: 0,
    isKey: false,
    meterChange: 10,
  },
  {
    id: 7,
    type: 'multiselect',
    text: 'Last question: What is my favorite part about you? (Select all that apply)',
    options: [
      'Your cheeks',
      'Your sweet head',
      'Your kindness',
      'Your compassion',
      'Your intelligence',
      'How you make me feel so happy everyday',
      "How you're the sweetest, kindest thing ever and I'm happy to be with you",
    ],
    // All 7 options are correct
    correct: [0, 1, 2, 3, 4, 5, 6],
    isKey: false,
    meterChange: 14,
  },
];

export const PASS_THRESHOLD = 0.8; // 80% correct
export const KEY_QUESTION_IDS = [1, 2, 3];

export const MOODS: Record<number, { label: string; emoji: string; color: string }> = {
  0: { label: 'Flirty', emoji: '😏', color: '#f472b6' },
  1: { label: 'Confident', emoji: '😎', color: '#818cf8' },
  2: { label: 'Nervous', emoji: '😬', color: '#fb923c' },
  3: { label: 'Inspired', emoji: '✨', color: '#34d399' },
  4: { label: 'Overjoyed', emoji: '🥰', color: '#f472b6' },
};

export const PRIZE_TEXT = {
  voucher: '1 Free Voucher',
  description: 'Make me do anything (reasonable)',
  terms: 'Valid for one use. No expiry. Reasonable requests only. Management reserves the right to negotiate.',
};
