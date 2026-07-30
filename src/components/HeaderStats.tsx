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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Level Banner & Experience Goal */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-indigo-400">Level {boardState.level}</span>
              {config.isReliefLevel && (
                <span className="px-2 py-0.5 text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full animate-pulse">
                  ⚡ Relief Level
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400 max-w-sm">{config.experienceGoal}</span>
          </div>
        </div>

        {/* Level Stats Badges */}
        <div className="flex items-center space-x-4">
          {/* Target Time */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Target Time</div>
              <div className="text-sm font-bold text-amber-300">{config.targetTimeSeconds}s</div>
            </div>
          </div>

          {/* Matches Available */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <Target className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Open Matches</div>
              <div className="text-sm font-bold text-indigo-300">{availableMatchCount}</div>
            </div>
          </div>

          {/* Rescue Mechanic Status */}
          {boardState.rescueTriggered && (
            <div className="flex items-center space-x-2 bg-pink-500/10 px-3 py-2 rounded-xl border border-pink-500/30">
              <ShieldAlert className="w-4 h-4 text-pink-400 animate-bounce" />
              <div>
                <div className="text-[10px] text-pink-400 font-bold uppercase">Rescue Trigger</div>
                <div className="text-xs font-semibold text-pink-300">Instant Match Injected</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls: Add Row, Hint, Restart */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddRow}
            disabled={remainingAddRows <= 0 || boardState.isWon || boardState.isGameOver}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all ${
              remainingAddRows > 0 && !boardState.isWon && !boardState.isGameOver
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/30 active:scale-95'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Numbers (+)</span>
            <span className="ml-1 px-2 py-0.5 text-xs bg-slate-950/60 rounded-md text-emerald-200">
              {boardState.addRowsUsed}/{boardState.maxAddRows}
            </span>
          </button>

          <button
            onClick={onToggleHint}
            className={`p-2.5 rounded-xl border transition-all ${
              showHint
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Hint"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={onRestart}
            className="p-2.5 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 rounded-xl transition-all"
            title="Restart Level"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
