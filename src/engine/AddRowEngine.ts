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
    // Rescue Mechanic: Force instant complement match for active cells
    activeCells.forEach((c, idx) => {
      if (idx < newValues.length) {
        newValues[idx] = c.val === 5 ? 5 : (10 - c.val > 0 ? 10 - c.val : c.val);
      }
    });
  } else {
    // Straggler Cleanup Priority: Ensure rows with 1 or 2 remaining active numbers get direct complement injection
    const stragglerIndices = new Set<number>();
    activeCells.forEach((c, idx) => {
      if (stragglers.some((s) => s.id === c.id)) {
        stragglerIndices.add(idx);
      }
    });

    // 1. Force complement for all stragglers first
    stragglerIndices.forEach((idx) => {
      if (idx < newValues.length) {
        const origVal = activeCells[idx].val;
        newValues[idx] = origVal === 5 ? 5 : (10 - origVal > 0 ? 10 - origVal : origVal);
        stragglersTargetedCount++;
      }
    });

    // 2. Standard assistance for remaining active cells based on level assist probability
    const assistProbability = Math.max(0.35, 1.0 - (level - 1) * 0.05);
    activeCells.forEach((c, idx) => {
      if (!stragglerIndices.has(idx) && Math.random() < assistProbability && idx < newValues.length) {
        newValues[idx] = c.val === 5 ? 5 : (10 - c.val > 0 ? 10 - c.val : c.val);
      }
    });

    // 3. Apply level decoy friction
    if (config.decoyRatio > 0.05) {
      const decoyCount = Math.floor(newValues.length * config.decoyRatio * 0.25);
      for (let d = 0; d < decoyCount; d++) {
        const randIdx = Math.floor(Math.random() * newValues.length);
        // Do not ruin straggler guaranteed matches if possible
        if (!stragglerIndices.has(randIdx)) {
          newValues[randIdx] = Math.floor(Math.random() * 9) + 1;
        }
      }
    }
  }

  const startIndex = currentCells.length;

  const newCells: Cell[] = newValues.map((val, i) => {
    const globalIdx = startIndex + i;
    const r = Math.floor(globalIdx / numCols);
    const c = globalIdx % numCols;
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
