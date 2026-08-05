import type { Cell, LevelConfig } from '../types/game';
import { getLevelConfig } from '../config/DifficultyConfig';

export interface SeededBoard {
  cells: Cell[];
  numCols: number;
}

export function getComplementaryValue(val: number): number {
  if (Math.random() < 0.5) {
    return val;
  }
  return 10 - val;
}

export function generateSeededBoard(level: number, numCols = 9): SeededBoard {
  const config: LevelConfig = getLevelConfig(level);
  const totalCells = numCols * 3;
  const numPairs = Math.floor(totalCells / 2);

  const pairs: [number, number][] = [];
  for (let i = 0; i < numPairs; i++) {
    const valA = Math.floor(Math.random() * 9) + 1;
    const valB = getComplementaryValue(valA);
    pairs.push([valA, valB]);
  }

  const directPairCount = Math.round(numPairs * config.initialMatchDensity);
  const sequence: number[] = [];

  const directPairs = pairs.slice(0, directPairCount);
  const buriedPairs = pairs.slice(directPairCount);

  for (const [a, b] of directPairs) {
    sequence.push(a, b);
  }

  if (buriedPairs.length > 0) {
    const firstHalf: number[] = [];
    const secondHalf: number[] = [];

    for (const [a, b] of buriedPairs) {
      firstHalf.push(a);
      secondHalf.push(b);
    }

    // Shuffle secondHalf so buried pairs don't trivially align in identical columns
    for (let i = secondHalf.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [secondHalf[i], secondHalf[j]] = [secondHalf[j], secondHalf[i]];
    }

    sequence.push(...firstHalf);
    
    if (sequence.length < totalCells) {
      sequence.push(Math.floor(Math.random() * 9) + 1);
    }

    sequence.push(...secondHalf);
  }

  while (sequence.length < totalCells) {
    sequence.push(Math.floor(Math.random() * 9) + 1);
  }
  if (sequence.length > totalCells) {
    sequence.length = totalCells;
  }

  const cells: Cell[] = sequence.map((val, idx) => ({
    id: `cell_${level}_0_${idx}_${Math.random().toString(36).substr(2, 5)}`,
    val,
    cleared: false,
    row: Math.floor(idx / numCols),
    col: idx % numCols,
    index: idx,
  }));

  return { cells, numCols };
}
