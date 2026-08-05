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
          <h2 className="text-3xl font-black text-white">System Technical Specification</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Board Seeding, Adaptive Add-Row Mechanics, Rescue Assistance, & Monotonic Difficulty Progression.
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
          Our system replaces RNG with a <strong>Custom Board & Difficulty Engine</strong> that guarantees every generated board is solvable with a gradual difficulty ramp across levels.
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
            <strong>Step 2 (Interleaving & Friction Control):</strong> For a target initial match density $D_L$ (e.g. $D_1 = 92\%$, $D_5 = 38\%$), the engine places direct pairs and buries remaining pairs across the board.
          </p>
          <p>
            <strong>Step 3 (Solver Verification):</strong> During generation, an automated heuristic solver verifies that the board yields the target initial match density and expected completion time.
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
          When (+) Add Numbers is pressed, the engine analyzes the board state to apply targeted assistance and decoy friction:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-pink-400 text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>The "Rescue" Mechanic</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If a player presses (+) 2 or more times without making any match, a frustration state is detected. The next injected row automatically places a complement matching the bottom-most active cell.
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-emerald-400 text-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>The "Straggler" Cleanup</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The engine identifies un-cleared cells ("stragglers") and prioritizes injecting complementary values in boundary positions to clear clutter from upper rows.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Difficulty Progression */}
      <section className="space-y-3">
        <h3 className="text-xl font-bold text-indigo-300 flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>4. Difficulty Progression</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Difficulty scales smoothly and monotonically across levels:
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
                <td className="px-3 py-2 font-bold text-amber-300">120s</td>
                <td className="px-3 py-2">Easy tutorial. 92% direct matches. Instant gratification.</td>
                <td className="px-3 py-2">1 time</td>
                <td className="px-3 py-2 text-emerald-400">92%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 3</td>
                <td className="px-3 py-2 font-bold text-amber-300">95s</td>
                <td className="px-3 py-2">Normal. Requires visual scanning.</td>
                <td className="px-3 py-2">1–2 times</td>
                <td className="px-3 py-2 text-emerald-400">69%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 5</td>
                <td className="px-3 py-2 font-bold text-amber-300">75s</td>
                <td className="px-3 py-2">Hard peak. Strategic planning required.</td>
                <td className="px-3 py-2">2–4 times</td>
                <td className="px-3 py-2 text-emerald-400">38%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 6</td>
                <td className="px-3 py-2 font-bold text-amber-300">70s</td>
                <td className="px-3 py-2">Advanced. Deep decoy layers.</td>
                <td className="px-3 py-2">3–4 times</td>
                <td className="px-3 py-2 text-emerald-400">23%</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold text-indigo-400">Level 10</td>
                <td className="px-3 py-2 font-bold text-amber-300">50s</td>
                <td className="px-3 py-2">Master peak. Extreme timer and decoys.</td>
                <td className="px-3 py-2">4–5 times</td>
                <td className="px-3 py-2 text-emerald-400">0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
