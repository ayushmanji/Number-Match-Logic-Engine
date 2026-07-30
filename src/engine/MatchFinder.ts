import type { Cell, MatchPair, MatchType } from '../types/game';

export function isValueMatch(valA: number, valB: number): boolean {
  return valA === valB || valA + valB === 10;
}

export function getMatchType(valA: number, valB: number): MatchType | null {
  if (valA === valB) return 'SAME';
  if (valA + valB === 10) return 'SUM10';
  return null;
}

export function findMatches(cells: Cell[], _numCols = 9): MatchPair[] {
  const matches: MatchPair[] = [];
  const activeCells = cells.filter((c) => !c.cleared);

  const gridMap = new Map<string, Cell>();
  cells.forEach((c) => {
    gridMap.set(`${c.row},${c.col}`, c);
  });

  // 1. Check Sequence Wrap-Around / 1D Adjacency
  for (let i = 0; i < activeCells.length - 1; i++) {
    const cellA = activeCells[i];
    const cellB = activeCells[i + 1];

    if (isValueMatch(cellA.val, cellB.val)) {
      const matchType = getMatchType(cellA.val, cellB.val)!;
      matches.push({
        cellA,
        cellB,
        type: matchType,
        adjType: 'WRAP_AROUND',
      });
    }
  }

  // 2. Check 2D Grid Adjacencies (Horizontal, Vertical, Diagonal)
  for (let i = 0; i < activeCells.length; i++) {
    const cellA = activeCells[i];

    for (let j = i + 1; j < activeCells.length; j++) {
      const cellB = activeCells[j];

      if (!isValueMatch(cellA.val, cellB.val)) continue;
      const matchType = getMatchType(cellA.val, cellB.val)!;
      const isConsecutiveIn1D = j === i + 1;

      // Horizontal check (same row)
      if (cellA.row === cellB.row) {
        const minCol = Math.min(cellA.col, cellB.col);
        const maxCol = Math.max(cellA.col, cellB.col);
        let pathClear = true;

        for (let c = minCol + 1; c < maxCol; c++) {
          const midCell = gridMap.get(`${cellA.row},${c}`);
          if (midCell && !midCell.cleared) {
            pathClear = false;
            break;
          }
        }

        if (pathClear && (!isConsecutiveIn1D || cellA.row !== cellB.row)) {
          matches.push({ cellA, cellB, type: matchType, adjType: 'HORIZONTAL' });
          continue;
        }
      }

      // Vertical check (same col)
      if (cellA.col === cellB.col) {
        const minRow = Math.min(cellA.row, cellB.row);
        const maxRow = Math.max(cellA.row, cellB.row);
        let pathClear = true;

        for (let r = minRow + 1; r < maxRow; r++) {
          const midCell = gridMap.get(`${r},${cellA.col}`);
          if (midCell && !midCell.cleared) {
            pathClear = false;
            break;
          }
        }

        if (pathClear) {
          matches.push({ cellA, cellB, type: matchType, adjType: 'VERTICAL' });
          continue;
        }
      }

      // Diagonal check (|r1 - r2| == |c1 - c2|)
      const rowDiff = Math.abs(cellA.row - cellB.row);
      const colDiff = Math.abs(cellA.col - cellB.col);

      if (rowDiff === colDiff && rowDiff > 0) {
        const stepR = cellB.row > cellA.row ? 1 : -1;
        const stepC = cellB.col > cellA.col ? 1 : -1;
        let pathClear = true;

        for (let step = 1; step < rowDiff; step++) {
          const r = cellA.row + step * stepR;
          const c = cellA.col + step * stepC;
          const midCell = gridMap.get(`${r},${c}`);
          if (midCell && !midCell.cleared) {
            pathClear = false;
            break;
          }
        }

        if (pathClear) {
          matches.push({ cellA, cellB, type: matchType, adjType: 'DIAGONAL' });
          continue;
        }
      }
    }
  }

  const uniqueMatches: MatchPair[] = [];
  const seenKeys = new Set<string>();

  for (const m of matches) {
    const key = [m.cellA.id, m.cellB.id].sort().join('::');
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueMatches.push(m);
    }
  }

  return uniqueMatches;
}
