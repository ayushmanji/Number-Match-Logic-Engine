import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, PlusCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import type { SimulationResult } from '../types/game';
import { runSimulationForLevel } from '../engine/SimulatorEngine';
import { LEVEL_CONFIGS } from '../config/DifficultyConfig';

export const SimulatorPanel: React.FC = () => {
  const [results, setResults] = useState<Record<number, SimulationResult>>({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatingLevel, setSimulatingLevel] = useState<number | null>(null);

  const runSimulation = async (level: number) => {
    setSimulatingLevel(level);
    setIsSimulating(true);

    // Give browser UI time to render loading state
    await new Promise((res) => setTimeout(res, 50));

    const res = runSimulationForLevel(level, 100);
    setResults((prev) => ({ ...prev, [level]: res }));
    setIsSimulating(false);
    setSimulatingLevel(null);
  };

  const runAllSimulations = async () => {
    setIsSimulating(true);
    const newResults: Record<number, SimulationResult> = {};

    for (let lvl = 1; lvl <= 11; lvl++) {
      setSimulatingLevel(lvl);
      await new Promise((res) => setTimeout(res, 30));
      newResults[lvl] = runSimulationForLevel(lvl, 100);
    }

    setResults(newResults);
    setIsSimulating(false);
    setSimulatingLevel(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Simulation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-white">Monte Carlo Solvability Simulator</h2>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-extrabold text-xs rounded-full border border-indigo-500/30">
              100 Runs / Level
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Measures win rates, average completion times, and Add Row counts across difficulty levels.
          </p>
        </div>

        <button
          onClick={runAllSimulations}
          disabled={isSimulating}
          className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Simulating Level {simulatingLevel}...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run All Levels (1 to 11)</span>
            </>
          )}
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 11 }, (_, i) => i + 1).map((lvl) => {
          const config = LEVEL_CONFIGS[lvl];
          const res = results[lvl];
          const isCurrentSimulating = simulatingLevel === lvl;

          return (
            <div
              key={lvl}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 transition-all shadow-xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-black text-white">Level {lvl}</span>
                </div>
                <button
                  onClick={() => runSimulation(lvl)}
                  disabled={isSimulating}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl transition-all disabled:opacity-50 text-xs font-bold flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run 100x</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 mb-4 h-8 overflow-hidden line-clamp-2">
                {config.experienceGoal}
              </div>

              {/* Simulation Result Metrics */}
              {res ? (
                <div className="space-y-4">
                  {/* Win Rate Badge */}
                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      res.winRate >= 0.95
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold">Win Probability</span>
                    </div>
                    <span className="text-lg font-black">{Math.round(res.winRate * 100)}%</span>
                  </div>

                  {/* Metrics Table */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Simulated Time</span>
                      </span>
                      <span className="font-extrabold text-amber-300">
                        {res.avgTimeSeconds}s <span className="text-slate-500">(Target: {config.targetTimeSeconds}s)</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center space-x-1.5">
                        <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Avg Add Rows</span>
                      </span>
                      <span className="font-extrabold text-emerald-300">
                        {res.avgAddRowsUsed} / 6 <span className="text-slate-500">(Target: {config.targetAddRowsMin}-{config.targetAddRowsMax})</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                        <span>Rescue Trigger Rate</span>
                      </span>
                      <span className="font-extrabold text-pink-300">{res.rescueTriggerRate}%</span>
                    </div>
                  </div>
                </div>
              ) : isCurrentSimulating ? (
                <div className="py-8 text-center text-xs text-indigo-400 font-semibold flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Running 100 Monte Carlo solver iterations...</span>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-900">
                  Click "Run 100x" to simulate solvability
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
