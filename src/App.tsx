import { useState, lazy, Suspense } from 'react';
import { GameEngine } from './engine/GameEngine';
import type { BoardState, MatchPair } from './types/game';
import { Navbar } from './components/Navbar';
import type { NavTab } from './components/Navbar';
import { HeaderStats } from './components/HeaderStats';
import { GameBoard } from './components/GameBoard';
import { RefreshCw } from 'lucide-react';

const SimulatorPanel = lazy(() =>
  import('./components/SimulatorPanel').then((m) => ({ default: m.SimulatorPanel }))
);
const SawtoothChart = lazy(() =>
  import('./components/SawtoothChart').then((m) => ({ default: m.SawtoothChart }))
);
const DocumentationView = lazy(() =>
  import('./components/DocumentationView').then((m) => ({ default: m.DocumentationView }))
);

function LoadingFallback() {
  return (
    <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
      <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
      <span className="text-sm font-semibold text-slate-400">Loading module...</span>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('PLAY');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [engine, setEngine] = useState<GameEngine>(() => new GameEngine(1));
  const [boardState, setBoardState] = useState<BoardState>(() => engine.getState());
  const [availableMatches, setAvailableMatches] = useState<MatchPair[]>(() =>
    engine.getAvailableMatches()
  );
  const [showHint, setShowHint] = useState<boolean>(false);

  const refreshState = (currentEngine: GameEngine) => {
    setBoardState(currentEngine.getState());
    setAvailableMatches(currentEngine.getAvailableMatches());
  };

  const handleLevelChange = (lvl: number) => {
    setCurrentLevel(lvl);
    const newEngine = new GameEngine(lvl);
    setEngine(newEngine);
    refreshState(newEngine);
    setShowHint(false);
  };

  const handleMakeMatch = (idA: string, idB: string): boolean => {
    const success = engine.makeMatch(idA, idB);
    if (success) {
      refreshState(engine);
    }
    return success;
  };

  const handleAddRow = () => {
    const success = engine.addRow();
    if (success) {
      refreshState(engine);
    }
  };

  const handleRestart = () => {
    engine.restart();
    refreshState(engine);
    setShowHint(false);
  };

  const handleNextLevel = () => {
    handleLevelChange(currentLevel + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLevel={currentLevel}
        onLevelChange={handleLevelChange}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-2.5 sm:p-6 lg:p-8">
        {activeTab === 'PLAY' && (
          <div className="animate-fade-in">
            <HeaderStats
              boardState={boardState}
              availableMatchCount={availableMatches.length}
              onAddRow={handleAddRow}
              onRestart={handleRestart}
              onToggleHint={() => setShowHint((prev) => !prev)}
              showHint={showHint}
            />
            <GameBoard
              boardState={boardState}
              availableMatches={availableMatches}
              onMakeMatch={handleMakeMatch}
              onAddRow={handleAddRow}
              onNextLevel={handleNextLevel}
              onRestart={handleRestart}
              showHint={showHint}
            />
          </div>
        )}

        <Suspense fallback={<LoadingFallback />}>
          {activeTab === 'SIMULATOR' && <SimulatorPanel />}
          {activeTab === 'SAWTOOTH' && <SawtoothChart />}
          {activeTab === 'DOCUMENTATION' && <DocumentationView />}
        </Suspense>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Number Match Deterministic Solvability System &copy; 2026 EzyGamers Studio
      </footer>
    </div>
  );
}

export default App;
