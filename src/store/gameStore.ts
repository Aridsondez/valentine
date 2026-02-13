import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Stage = 'start' | 'crush-trap' | 'real-question' | 'quiz' | 'prize' | 'fail';

export type FailReason =
  | 'said-yes-to-trap'
  | 'said-no-to-aj'
  | 'quiz-failed';

interface QuizState {
  currentQuestion: number;
  answers: Record<number, number | number[]>;
  score: number;
  missedKeyQuestions: number[];
  completed: boolean;
}

interface RedemptionState {
  redeemed: boolean;
  note: string;
  redeemedAt?: string;
}

interface GameState {
  stage: Stage;
  crushTrapIndex: number; // which trap character we're on (0-3)
  relationshipMeter: number; // 0-100
  failReason: FailReason | null;
  failStage: Stage | null;
  quiz: QuizState;
  redemption: RedemptionState;
  soundEnabled: boolean;

  // Actions
  startGame: () => void;
  answerTrap: (saidYes: boolean) => void;
  answerAJ: (saidYes: boolean) => void;
  answerQuiz: (questionId: number, answer: number | number[]) => void;
  nextQuizQuestion: () => void;
  finishQuiz: (score: number, missedKeyQuestions: number[]) => void;
  redeemVoucher: (note: string) => void;
  retry: () => void;
  toggleSound: () => void;
  adjustMeter: (delta: number) => void;
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const defaultQuiz: QuizState = {
  currentQuestion: 0,
  answers: {},
  score: 0,
  missedKeyQuestions: [],
  completed: false,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      stage: 'start',
      crushTrapIndex: 0,
      relationshipMeter: 20,
      failReason: null,
      failStage: null,
      quiz: { ...defaultQuiz },
      redemption: { redeemed: false, note: '' },
      soundEnabled: true,

      startGame: () =>
        set({
          stage: 'crush-trap',
          crushTrapIndex: 0,
          relationshipMeter: 20,
          failReason: null,
          failStage: null,
          quiz: { ...defaultQuiz },
        }),

      answerTrap: (saidYes: boolean) => {
        const { crushTrapIndex } = get();
        if (saidYes) {
          set({ stage: 'fail', failReason: 'said-yes-to-trap', failStage: 'crush-trap' });
          return;
        }
        // Correct answer: NO — bump meter
        set((s) => ({
          relationshipMeter: clamp(s.relationshipMeter + 8, 0, 100),
          crushTrapIndex: crushTrapIndex + 1,
          // after all 4 trap characters, move to real question
          stage: crushTrapIndex >= 3 ? 'real-question' : 'crush-trap',
        }));
      },

      answerAJ: (saidYes: boolean) => {
        if (!saidYes) {
          set({ stage: 'fail', failReason: 'said-no-to-aj', failStage: 'real-question' });
          return;
        }
        set((s) => ({
          stage: 'quiz',
          relationshipMeter: clamp(s.relationshipMeter + 15, 0, 100),
        }));
      },

      answerQuiz: (questionId: number, answer: number | number[]) => {
        set((s) => ({
          quiz: {
            ...s.quiz,
            answers: { ...s.quiz.answers, [questionId]: answer },
          },
        }));
      },

      nextQuizQuestion: () => {
        set((s) => ({
          quiz: { ...s.quiz, currentQuestion: s.quiz.currentQuestion + 1 },
        }));
      },

      finishQuiz: (score: number, missedKeyQuestions: number[]) => {
        if (missedKeyQuestions.length > 0 || score < 0.8) {
          set((s) => ({
            stage: 'fail',
            failReason: 'quiz-failed',
            failStage: 'quiz',
            quiz: { ...s.quiz, score, missedKeyQuestions, completed: true },
          }));
        } else {
          set((s) => ({
            stage: 'prize',
            quiz: { ...s.quiz, score, missedKeyQuestions, completed: true },
            relationshipMeter: 100,
          }));
        }
      },

      redeemVoucher: (note: string) => {
        set({
          redemption: {
            redeemed: true,
            note,
            redeemedAt: new Date().toISOString(),
          },
        });
      },

      retry: () =>
        set({
          stage: 'start',
          crushTrapIndex: 0,
          relationshipMeter: 20,
          failReason: null,
          failStage: null,
          quiz: { ...defaultQuiz },
        }),

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      adjustMeter: (delta: number) =>
        set((s) => ({ relationshipMeter: clamp(s.relationshipMeter + delta, 0, 100) })),
    }),
    {
      name: 'valentine-game-state',
      partialize: (state) => ({
        stage: state.stage,
        crushTrapIndex: state.crushTrapIndex,
        relationshipMeter: state.relationshipMeter,
        failReason: state.failReason,
        failStage: state.failStage,
        quiz: state.quiz,
        redemption: state.redemption,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
