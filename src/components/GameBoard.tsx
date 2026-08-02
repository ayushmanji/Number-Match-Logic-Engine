import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, AlertTriangle } from 'lucide-react';
import type { BoardState, Cell, MatchPair } from '../types/game';
import { CellView } from './CellView';

interface GameBoardProps {
  boardState: BoardState;
  availableMatches: MatchPair[];
  onMakeMatch: (idA: string, idB: string) => boolean;
  onAddRow: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
  showHint: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  boardState,
  availableMatches,
  onMakeMatch,
  onAddRow,
  onNextLevel,
  onRestart,
  showHint,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [hintPair, setHintPair] = useState<MatchPair | null>(null);

  // Trigger confetti on victory
  useEffect(() => {
    if (boardState.isWon) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [boardState.isWon]);

  // Update hint pair when showHint changes
  useEffect(() => {
    if (showHint && availableMatches.length > 0) {
      setHintPair(availableMatches[0]);
    } else {
      setHintPair(null);
    }
  }, [showHint, availableMatches]);

  const handleCellClick = (cell: Cell) => {
    if (cell.cleared || boardState.isWon || boardState.isGameOver) return;

    if (!selectedCell) {
      setSelectedCell(cell);
      return;
    }

    if (selectedCell.id === cell.id) {
      setSelectedCell(null); // Deselect
      return;
    }

    // Attempt match between selectedCell and clicked cell
    onMakeMatch(selectedCell.id, cell.id);
    setSelectedCell(null);
  };

  return (
    <div className="relative max-w-4xl mx-auto flex flex-col items-center">
      {/* 9-Column Grid Container */}
      <div className="w-full bg-slate-900/60 p-2.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-9 gap-1.5 sm:gap-3">
          {boardState.cells.map((cell) => {
            const isSelected = selectedCell?.id === cell.id;
            const isHinted =
              !!hintPair && (hintPair.cellA.id === cell.id || hintPair.cellB.id === cell.id);

            return (
              <CellView
                key={cell.id}
                cell={cell}
                isSelected={isSelected}
                isHinted={isHinted}
                onClick={handleCellClick}
              />
            );
          })}
        </div>

        {/* Add Rows Button at Bottom of Grid */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <button
            onClick={onAddRow}
            disabled={
              boardState.addRowsUsed >= boardState.maxAddRows ||
              boardState.isWon ||
              boardState.isGameOver
            }
            className="w-full max-w-md py-3 sm:py-3.5 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-indigo-600/30 transition-all transform active:scale-95 flex items-center justify-center space-x-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>(+) Add Numbers ({boardState.maxAddRows - boardState.addRowsUsed} Left)</span>
          </button>
        </div>
      </div>

      {/* Victory Modal Overlay */}
      {boardState.isWon && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl shadow-indigo-500/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/40 animate-bounce">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Level Complete!</h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              You cleared all numbers on Level {boardState.level} with deterministic precision!
            </p>

            <div className="bg-slate-950 rounded-2xl p-4 mb-6 border border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400">Add Rows Used</div>
                <div className="text-lg sm:text-xl font-black text-emerald-400">
                  {boardState.addRowsUsed} / {boardState.maxAddRows}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Matches Made</div>
                <div className="text-lg sm:text-xl font-black text-indigo-400">{boardState.matchesMade}</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onRestart}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replay</span>
              </button>
              <button
                onClick={onNextLevel}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs sm:text-sm"
              >
                Next Level →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal Overlay */}
      {boardState.isGameOver && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl shadow-rose-500/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/40">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">No Moves Left!</h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              You used all {boardState.maxAddRows} Add Row buttons without clearing the board.
            </p>

            <button
              onClick={onRestart}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Level {boardState.level} Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
