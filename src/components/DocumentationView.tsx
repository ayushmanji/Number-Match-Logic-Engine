import React from 'react';
import { BookOpen, ShieldCheck, Sparkles, Zap, Cpu, RefreshCw, CheckCircle } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black text-white">Algorithm Technical Specification</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Deterministic Seeding, Adaptive Add-Row Engine, Rescue Trigger, & Sawtooth Progression System.
        </p>
      </div>

      {/* Executive Summary */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-indigo-300 flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>1. Executive Summary & Core Objective</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Traditional Number Match puzzle games rely on pure Random Number Generation (RNG) during initial board creation and when expanding rows via (+) Add Numbers. This produces high variance, causing Level 1 to occasionally be un-solvable or Level 10 to be trivial.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our system replaces RNG with a <strong>Deterministic Logic Engine</strong> that guarantees every generated board is mathematically solvable with a <strong>&gt;95% completion probability</strong> within target playing times (e.g. 45s for Level 1, 90s for Level 3, 150s for Level 5, and 90s relief drop for Level 6).
        </p>
      </section>

      {/* Part A: Seeding Logic */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-indigo-300 flex items-center space-x-2">
          <Cpu className="w-5 h-5" />
          <span>2. Part A: Seeding Logic (Backward Pair Construction)</span>
        </h3>
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3 text-sm text-slate-300">
          <p>
            <strong>Step 1 (Pair Generation):</strong> Instead of picking random numbers from 1 to 9, the generator constructs valid complementary pairs $(a, b)$ satisfying $a = b$ or $a + b = 10$.
          </p>
          <p>
            <strong>Step 2 (Interleaving & Friction Control):</strong> For a target initial match density $D_L$ (e.g. $D_1 = 70\%$, $D_5 = 20\%$), the engine places a fraction $D_L$ of pairs in immediate direct sequence or aligned 2D positions. The remaining $1 - D_L$ pairs are interleaved with separator cells to create scanning depth.
          </p>
          <p>
            <strong>Step 3 (Solver Verification):</strong> During generation, an automated heuristic solver runs on the initial 3x9 board to verify that the board yields the target initial match density and expected completion time before serving it to the player.
          </p>
        </div>
      </section>

      {/* Part B: Adaptive Add-Row Logic */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-indigo-300 flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span>3. Part B: Adaptive "Add Row" Mechanics</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          When (+) Add Numbers is pressed, rather than duplicating active board cells verbatim with random noise, the engine analyzes the board state to apply targeted assistance:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-pink-400 text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>The "Rescue" Mechanic</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If a player presses (+) 2 or more times without making any match, a frustration state is detected. The next injected row automatically forces instant direct pairs and places a complement matching the bottom-most active cell as the very first entry of the new row.
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-emerald-400 text-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>The "Straggler" Cleanup</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The engine identifies top rows containing $\le 2$ un-cleared cells ("stragglers"). It prioritizes injecting exact complementary values in positions that align vertically or wrap around to those stragglers, rapidly clearing clutter from upper rows.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Sawtooth Curve */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-indigo-300 flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>4. The Sawtooth Difficulty Curve</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          To prevent player fatigue caused by monotonous difficulty escalation, difficulty follows a periodic Sawtooth wave pattern:
        </p>
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="text-slate-400 uppercase bg-slate-900">
              <tr>
                <th className="px-3 py-2">Level</th>
                <th className="px-3 py-2">Target Time</th>
                <th className="px-3 py-2">Experience Goal</th>
                <th className="px-3 py-2">Add Rows Used</th>
                <th className="px-3 py-2">Density %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 1</td>
                <td className="px-3 py-2 font-bold text-amber-300">45s</td>
                <td className="px-3 py-2">Easy. 70% direct matches. Instant gratification.</td>
                <td className="px-3 py-2">1 time</td>
                <td className="px-3 py-2 text-emerald-400">70%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 3</td>
                <td className="px-3 py-2 font-bold text-amber-300">90s</td>
                <td className="px-3 py-2">Normal. Requires scanning.</td>
                <td className="px-3 py-2">2-3 times</td>
                <td className="px-3 py-2 text-emerald-400">40%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 5</td>
                <td className="px-3 py-2 font-bold text-amber-300">150s</td>
                <td className="px-3 py-2">Hard. Matches buried behind decoys.</td>
                <td className="px-3 py-2">2-3 times</td>
                <td className="px-3 py-2 text-emerald-400">20%</td>
              </tr>
              <tr className="bg-emerald-950/20 font-bold">
                <td className="px-3 py-2 text-emerald-300">Level 6 ⚡</td>
                <td className="px-3 py-2 text-emerald-300">90s</td>
                <td className="px-3 py-2 text-emerald-200">Relief Level (Drop). Breath of fresh air.</td>
                <td className="px-3 py-2 text-emerald-300">2-4 times</td>
                <td className="px-3 py-2 text-emerald-300">45%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 10</td>
                <td className="px-3 py-2 font-bold text-amber-300">210s</td>
                <td className="px-3 py-2">Peak Master. High decoy friction.</td>
                <td className="px-3 py-2">4-5 times</td>
                <td className="px-3 py-2 text-emerald-400">10%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
