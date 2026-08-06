import React from 'react';
import { Clock, PlusCircle, ShieldAlert, Sparkles, RotateCcw, Target } from 'lucide-react';
import type { BoardState, LevelConfig } from '../types/game';
import { getLevelConfig } from '../config/DifficultyConfig';

interface HeaderStatsProps {
  boardState: BoardState;
  availableMatchCount: number;
  onAddRow: () => void;
  onRestart: () => void;
  onToggleHint: () => void;
  showHint: boolean;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${secs}s`;
}

export const HeaderStats: React.FC<HeaderStatsProps> = ({
  boardState,
  availableMatchCount,
  onAddRow,
  onRestart,
  onToggleHint,
  showHint,
}) => {
  const config: LevelConfig = getLevelConfig(boardState.level);
  const remainingAddRows = boardState.maxAddRows - boardState.addRowsUsed;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md mb-4 sm:mb-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Top Section: Level Title & Experience Goal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl sm:text-2xl font-black text-indigo-400">
              Level {boardState.level}
            </span>
            {config.isReliefLevel && (
              <span className="px-2 py-0.5 text-[10px] sm:text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full animate-pulse">
                ⚡ Relief Level
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {config.experienceGoal}
          </span>
        </div>

        {/* Middle Section: Stats Badges & Controls Row */}
        <div className="grid grid-cols-2 sm:flex sm:items-center justify-between gap-2 sm:gap-4">
          {/* Stats Group */}
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2 sm:gap-3">
            {/* Live Elapsed Play Time vs Target Benchmark */}
            <div className="flex-1 sm:flex-initial flex items-center space-x-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border bg-slate-950 border-slate-800">
              <Clock className="w-4 h-4 shrink-0 text-amber-400" />
              <div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Elapsed / Target
                </div>
                <div className="text-xs sm:text-sm font-extrabold font-mono text-amber-300">
                  {formatTime(boardState.totalTimeElapsed)}{' '}
                  <span className="text-[10px] text-slate-500 font-normal">/ {config.targetTimeSeconds}s Target</span>
                </div>
              </div>
            </div>

            {/* Matches Available */}
            <div className="flex-1 sm:flex-initial flex items-center space-x-2 bg-slate-950 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-800">
              <Target className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Open Matches
                </div>
                <div className="text-xs sm:text-sm font-bold text-indigo-300">
                  {availableMatchCount}
                </div>
              </div>
            </div>

            {/* Rescue Trigger */}
            {boardState.rescueTriggered && (
              <div className="flex items-center space-x-1.5 bg-pink-500/10 px-2.5 py-1.5 rounded-xl border border-pink-500/30">
                <ShieldAlert className="w-4 h-4 text-pink-400 animate-bounce shrink-0" />
                <div className="hidden md:block">
                  <div className="text-[9px] text-pink-400 font-bold uppercase">Rescue</div>
                  <div className="text-xs font-semibold text-pink-300">Injected</div>
                </div>
              </div>
            )}
          </div>

          {/* Action Controls Group */}
          <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 justify-end">
            <button
              onClick={onAddRow}
              disabled={remainingAddRows <= 0 || boardState.isWon || boardState.isGameOver}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all ${
                remainingAddRows > 0 && !boardState.isWon && !boardState.isGameOver
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/30 active:scale-95'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">Add Numbers</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-slate-950/60 rounded-md text-emerald-200 shrink-0">
                {boardState.addRowsUsed}/{boardState.maxAddRows}
              </span>
            </button>

            <button
              onClick={onToggleHint}
              className={`p-2 rounded-xl border transition-all shrink-0 ${
                showHint
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle Hint"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={onRestart}
              className="p-2 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 rounded-xl transition-all shrink-0"
              title="Restart Level"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
