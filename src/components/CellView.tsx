import React from 'react';
import type { Cell } from '../types/game';

interface CellViewProps {
  cell: Cell;
  isSelected: boolean;
  isHinted: boolean;
  onClick: (cell: Cell) => void;
}

const COLOR_MAP: Record<number, string> = {
  1: 'from-blue-500 to-indigo-600 text-blue-100 shadow-blue-500/20',
  2: 'from-emerald-500 to-teal-600 text-emerald-100 shadow-emerald-500/20',
  3: 'from-purple-500 to-indigo-600 text-purple-100 shadow-purple-500/20',
  4: 'from-rose-500 to-pink-600 text-rose-100 shadow-rose-500/20',
  5: 'from-amber-500 to-orange-600 text-amber-100 shadow-amber-500/20',
  6: 'from-cyan-500 to-blue-600 text-cyan-100 shadow-cyan-500/20',
  7: 'from-fuchsia-500 to-pink-600 text-fuchsia-100 shadow-fuchsia-500/20',
  8: 'from-teal-500 to-emerald-600 text-teal-100 shadow-teal-500/20',
  9: 'from-violet-500 to-purple-600 text-violet-100 shadow-violet-500/20',
};

export const CellView: React.FC<CellViewProps> = ({
  cell,
  isSelected,
  isHinted,
  onClick,
}) => {
  if (cell.cleared) {
    return (
      <div 
        className="aspect-square flex items-center justify-center rounded-xl bg-slate-950/40 border border-slate-900/60 transition-opacity"
        aria-hidden="true"
      >
        <span className="text-slate-800 font-extrabold text-sm opacity-20 select-none">✕</span>
      </div>
    );
  }

  const gradientClass = COLOR_MAP[cell.val] || 'from-slate-700 to-slate-800 text-slate-200';

  return (
    <button
      onClick={() => onClick(cell)}
      aria-label={`Number ${cell.val} at row ${cell.row + 1}, column ${cell.col + 1}${
        isSelected ? ', selected' : ''
      }${isHinted ? ', hinted match' : ''}`}
      aria-pressed={isSelected}
      className={`aspect-square relative flex items-center justify-center rounded-xl font-black text-xl sm:text-2xl transition-all transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
        isSelected
          ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 text-white ring-4 ring-indigo-400 scale-105 shadow-xl shadow-indigo-500/50 z-10'
          : isHinted
          ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 ring-4 ring-amber-400 animate-pulse scale-105 z-10'
          : `bg-gradient-to-tr ${gradientClass} hover:brightness-110 shadow-md border border-white/10 hover:scale-105`
      }`}
    >
      <span>{cell.val}</span>
      <span className="absolute bottom-1 right-1 text-[8px] font-medium text-slate-400/40">
        {cell.row},{cell.col}
      </span>
    </button>
  );
};
