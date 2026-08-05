import { useState, useEffect } from 'react';
import { GameEngine } from './engine/GameEngine';
import type { BoardState, MatchPair } from './types/game';
import { Navbar } from './components/Navbar';
import { HeaderStats } from './components/HeaderStats';
import { GameBoard } from './components/GameBoard';

export function App() {
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

  // Live Timer Interval Hook
  useEffect(() => {
    if (boardState.isWon || boardState.isGameOver) return;

    const timer = setInterval(() => {
      engine.tickTimer(1);
      refreshState(engine);
    }, 1000);

    return () => clearInterval(timer);
  }, [engine, boardState.isWon, boardState.isGameOver]);

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
        currentLevel={currentLevel}
        onLevelChange={handleLevelChange}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-2.5 sm:p-6 lg:p-8">
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
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Number Match Puzzle Game &copy; 2026 EzyGamers Studio
      </footer>
    </div>
  );
}

export default App;
