import { useGameStore } from './store/gameStore';
import { StatusBar } from './components/ui/StatusBar';
import { StartScreen } from './stages/StartScreen';
import { CrushTrap } from './stages/CrushTrap';
import { RealQuestion } from './stages/RealQuestion';
import { QuizStage } from './stages/QuizStage';
import { PrizeScreen } from './stages/PrizeScreen';
import { FailScreen } from './stages/FailScreen';

function StageRouter() {
  const stage = useGameStore((s) => s.stage);

  switch (stage) {
    case 'start':
      return <StartScreen />;
    case 'crush-trap':
      return <CrushTrap />;
    case 'real-question':
      return <RealQuestion />;
    case 'quiz':
      return <QuizStage />;
    case 'prize':
      return <PrizeScreen />;
    case 'fail':
      return <FailScreen />;
    default:
      return <StartScreen />;
  }
}

function App() {
  return (
    <div className="app-shell">
      <StatusBar />
      <StageRouter />
    </div>
  );
}

export default App;
