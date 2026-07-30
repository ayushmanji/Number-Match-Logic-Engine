import type { Cell, LevelConfig } from '../types/game';
import { getLevelConfig } from '../config/DifficultyConfig';
import { getComplementaryValue } from './SeedingEngine';

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

  const rescueTriggered = consecutiveAddRowsWithoutMatch >= 2 || (level === 1 && consecutiveAddRowsWithoutMatch >= 1);

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
    if (activeCells.length > 0) {
      const lastActive = activeCells[activeCells.length - 1];
      const complementForLast = 10 - lastActive.val > 0 ? 10 - lastActive.val : lastActive.val;
      newValues[0] = complementForLast;
    }
    if (newValues.length > 2) {
      const targetVal = Math.floor(Math.random() * 9) + 1;
      newValues[1] = targetVal;
      newValues[2] = getComplementaryValue(targetVal);
    }
  }

  if (stragglers.length > 0) {
    stragglers.forEach((straggler, idx) => {
      const replaceIdx = (idx * 3) % newValues.length;
      const complementVal = 10 - straggler.val > 0 ? 10 - straggler.val : straggler.val;
      newValues[replaceIdx] = complementVal;
      stragglersTargetedCount++;
    });
  }

  if (!rescueTriggered && config.decoyRatio > 0.40) {
    const decoyCount = Math.floor(newValues.length * (config.decoyRatio - 0.3));
    for (let d = 0; d < decoyCount; d++) {
      const randIdx = Math.floor(Math.random() * newValues.length);
      newValues[randIdx] = Math.floor(Math.random() * 9) + 1;
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
