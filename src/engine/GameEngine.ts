import type { BoardState, MatchPair } from '../types/game';
import { generateSeededBoard } from './SeedingEngine';
import { findMatches } from './MatchFinder';
import { generateAddRowCells } from './AddRowEngine';
import { getLevelConfig } from '../config/DifficultyConfig';

export class GameEngine {
  private state: BoardState;

  constructor(level = 1) {
    this.state = this.createInitialState(level);
  }

  private createInitialState(level: number): BoardState {
    const seeded = generateSeededBoard(level);
    const config = getLevelConfig(level);

    return {
      cells: seeded.cells,
      numCols: seeded.numCols,
      level,
      addRowsUsed: 0,
      maxAddRows: 6,
      consecutiveAddRowsWithoutMatch: 0,
      rescueTriggered: false,
      isWon: false,
      isGameOver: false,
      timeExpired: false,
      matchesMade: 0,
      totalTimeElapsed: 0,
      timeRemaining: config.targetTimeSeconds,
    };
  }

  public getState(): BoardState {
    return { ...this.state, cells: [...this.state.cells] };
  }

  public getAvailableMatches(): MatchPair[] {
    return findMatches(this.state.cells, this.state.numCols);
  }

  public tickTimer(seconds = 1): void {
    if (this.state.isWon || this.state.isGameOver) return;

    this.state.totalTimeElapsed += seconds;
    this.state.timeRemaining = Math.max(0, this.state.timeRemaining - seconds);

    if (this.state.timeRemaining <= 0) {
      this.state.timeExpired = true;
      this.state.isGameOver = true;
    }
  }

  public makeMatch(idA: string, idB: string): boolean {
    if (this.state.isWon || this.state.isGameOver) return false;

    const available = this.getAvailableMatches();
    const validMatch = available.find(
      (m) =>
        (m.cellA.id === idA && m.cellB.id === idB) ||
        (m.cellA.id === idB && m.cellB.id === idA)
    );

    if (!validMatch) return false;

    this.state.cells = this.state.cells.map((c) => {
      if (c.id === idA || c.id === idB) {
        return { ...c, cleared: true };
      }
      return c;
    });

    this.state.matchesMade += 1;
    this.state.consecutiveAddRowsWithoutMatch = 0;

    const remainingActive = this.state.cells.filter((c) => !c.cleared);
    if (remainingActive.length === 0) {
      this.state.isWon = true;
    }

    return true;
  }

  public addRow(): boolean {
    if (this.state.isWon || this.state.isGameOver) return false;
    if (this.state.addRowsUsed >= this.state.maxAddRows) return false;

    const result = generateAddRowCells(
      this.state.cells,
      this.state.level,
      this.state.consecutiveAddRowsWithoutMatch,
      this.state.numCols
    );

    if (result.newCells.length === 0) return false;

    this.state.cells = [...this.state.cells, ...result.newCells];
    this.state.addRowsUsed += 1;
    this.state.consecutiveAddRowsWithoutMatch += 1;
    if (result.rescueTriggered) {
      this.state.rescueTriggered = true;
    }

    const available = this.getAvailableMatches();
    if (available.length === 0 && this.state.addRowsUsed >= this.state.maxAddRows) {
      this.state.isGameOver = true;
    }

    return true;
  }

  public restart(level?: number): void {
    const targetLevel = level !== undefined ? level : this.state.level;
    this.state = this.createInitialState(targetLevel);
  }
}
