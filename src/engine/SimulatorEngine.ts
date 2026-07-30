import type { SimulationResult, LevelConfig } from '../types/game';
import { GameEngine } from './GameEngine';
import { getLevelConfig } from '../config/DifficultyConfig';

export function runSimulationForLevel(level: number, runs = 100): SimulationResult {
  let wins = 0;
  let totalTime = 0;
  let totalAddRows = 0;
  let totalMoves = 0;
  let rescueCount = 0;

  const config: LevelConfig = getLevelConfig(level);

  for (let r = 0; r < runs; r++) {
    const engine = new GameEngine(level);
    let moves = 0;
    let rescueTriggeredInRun = false;

    const secondsPerPair = 2.5 + config.decoyRatio * 2.0;
    const secondsPerAddRow = 2.0;

    let stepLimit = 500;
    while (stepLimit > 0) {
      stepLimit--;
      const state = engine.getState();

      if (state.isWon) {
        wins++;
        if (state.rescueTriggered) rescueTriggeredInRun = true;
        break;
      }

      if (state.isGameOver) {
        break;
      }

      const availableMatches = engine.getAvailableMatches();

      if (availableMatches.length > 0) {
        const selectedMatch = availableMatches[0];
        engine.makeMatch(selectedMatch.cellA.id, selectedMatch.cellB.id);
        moves++;
      } else {
        if (state.addRowsUsed < state.maxAddRows) {
          const success = engine.addRow();
          if (!success) break;
        } else {
          break;
        }
      }
    }

    const finalState = engine.getState();
    totalMoves += moves;
    totalAddRows += finalState.addRowsUsed;
    if (rescueTriggeredInRun || finalState.rescueTriggered) rescueCount++;

    const simulatedTime = moves * secondsPerPair + finalState.addRowsUsed * secondsPerAddRow;
    totalTime += simulatedTime;
  }

  const winRate = wins / runs;
  const avgTimeSeconds = Math.round(totalTime / runs);
  const avgAddRowsUsed = Math.round((totalAddRows / runs) * 10) / 10;
  const avgMoves = Math.round(totalMoves / runs);
  const rescueTriggerRate = Math.round((rescueCount / runs) * 100);

  return {
    level,
    runs,
    winRate,
    avgTimeSeconds,
    avgAddRowsUsed,
    avgMoves,
    rescueTriggerRate,
    stragglerClearCount: Math.round(avgMoves * 0.4),
  };
}
