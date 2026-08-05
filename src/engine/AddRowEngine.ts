import type { Cell, LevelConfig } from '../types/game';
import { getLevelConfig } from '../config/DifficultyConfig';

export interface AddRowResult {
  newCells: Cell[];
  rescueTriggered: boolean;
  stragglersTargetedCount: number;
}

export function generateAddRowCells(
  currentCells: Cell[],
  level: number,
  consecutiveAddRowsWithoutMatch: number,
  numCols = 9
): AddRowResult {
  const config: LevelConfig = getLevelConfig(level);
  const activeCells = currentCells.filter((c) => !c.cleared);

  if (activeCells.length === 0) {
    return { newCells: [], rescueTriggered: false, stragglersTargetedCount: 0 };
  }

  const rescueTriggered = consecutiveAddRowsWithoutMatch >= 2 || (level <= 2 && consecutiveAddRowsWithoutMatch >= 1);

  const rowActiveCounts = new Map<number, Cell[]>();
  activeCells.forEach((c) => {
    const list = rowActiveCounts.get(c.row) || [];
    list.push(c);
    rowActiveCounts.set(c.row, list);
  });

  const stragglers: Cell[] = [];
  rowActiveCounts.forEach((cellsInRow) => {
    if (cellsInRow.length <= 2) {
      stragglers.push(...cellsInRow);
    }
  });

  const rawValues = activeCells.map((c) => c.val);
  const newValues: number[] = [...rawValues];

  let stragglersTargetedCount = 0;

  if (rescueTriggered) {
    // Rescue: for every active cell, inject its complement in the exact same column
    activeCells.forEach((c, idx) => {
      if (idx < newValues.length) {
        newValues[idx] = 10 - c.val > 0 ? 10 - c.val : c.val;
      }
    });
  } else {
    // Standard assistance: inject complement in same column for active cells based on assistProbability
    const assistProbability = Math.max(0.15, 1.0 - (level - 1) * 0.12);
    activeCells.forEach((c, idx) => {
      if (Math.random() < assistProbability && idx < newValues.length) {
        newValues[idx] = 10 - c.val > 0 ? 10 - c.val : c.val;
        stragglersTargetedCount++;
      }
    });

    // Decoy friction scaling with decoyRatio
    if (config.decoyRatio > 0.10) {
      const decoyCount = Math.floor(newValues.length * config.decoyRatio * 0.3);
      for (let d = 0; d < decoyCount; d++) {
        const randIdx = Math.floor(Math.random() * newValues.length);
        newValues[randIdx] = Math.floor(Math.random() * 9) + 1;
      }
    }
  }

  const startRow = Math.max(...currentCells.map((c) => c.row)) + 1;
  const startIndex = currentCells.length;

  const newCells: Cell[] = newValues.map((val, i) => {
    const globalIdx = startIndex + i;
    const r = startRow + Math.floor(i / numCols);
    const c = i % numCols;
    return {
      id: `cell_${level}_${r}_${c}_${Math.random().toString(36).substr(2, 5)}`,
      val,
      cleared: false,
      row: r,
      col: c,
      index: globalIdx,
    };
  });

  return {
    newCells,
    rescueTriggered,
    stragglersTargetedCount,
  };
}
