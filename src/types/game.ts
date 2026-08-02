export interface Cell {
  id: string;
  val: number; // 1 to 9
  cleared: boolean;
  row: number;
  col: number;
  index: number;
}

export type MatchType = 'SAME' | 'SUM10';
export type AdjacencyType = 'HORIZONTAL' | 'VERTICAL' | 'DIAGONAL' | 'WRAP_AROUND';

export interface MatchPair {
  cellA: Cell;
  cellB: Cell;
  type: MatchType;
  adjType: AdjacencyType;
}

export interface LevelConfig {
  level: number;
  targetTimeSeconds: number;
  experienceGoal: string;
  targetAddRowsMin: number;
  targetAddRowsMax: number;
  initialMatchDensity: number; // e.g. 0.70 for 70% direct matches
  decoyRatio: number; // 0.0 to 1.0 (friction)
  isReliefLevel: boolean;
  winProbabilityTarget: number; // e.g. 0.95
}

export interface BoardState {
  cells: Cell[];
  numCols: number;
  level: number;
  addRowsUsed: number;
  maxAddRows: number;
  consecutiveAddRowsWithoutMatch: number;
  rescueTriggered: boolean;
  isWon: boolean;
  isGameOver: boolean;
  timeExpired: boolean;
  matchesMade: number;
  totalTimeElapsed: number; // in seconds
  timeRemaining: number; // in seconds
}

export interface SimulationResult {
  level: number;
  runs: number;
  winRate: number; // 0.0 to 1.0 (e.g. 0.96 = 96%)
  avgTimeSeconds: number;
  avgAddRowsUsed: number;
  avgMoves: number;
  rescueTriggerRate: number; // % of runs that triggered rescue
  stragglerClearCount: number;
}
