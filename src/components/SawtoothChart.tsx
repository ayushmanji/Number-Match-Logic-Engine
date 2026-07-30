import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { getLevelConfig } from '../config/DifficultyConfig';

export const SawtoothChart: React.FC = () => {
  const chartData = Array.from({ length: 15 }, (_, i) => i + 1).map((lvl) => {
    const config = getLevelConfig(lvl);
    return {
      level: `L${lvl}`,
      targetTime: config.targetTimeSeconds,
      initialMatchDensity: Math.round(config.initialMatchDensity * 100),
      decoyRatio: Math.round(config.decoyRatio * 100),
      addRowsMin: config.targetAddRowsMin,
      addRowsMax: config.targetAddRowsMax,
      isRelief: config.isReliefLevel,
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Sawtooth Curve Title Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-2xl font-black text-white">The Sawtooth Difficulty Curve</h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Visualizes the rhythmic wave pattern of difficulty progression. Levels 1–5 ramp up time and friction, Level 6 drops difficulty as a relief level ("breath of fresh air"), and Levels 7–10 ramp up higher.
        </p>
      </div>

      {/* Target Time Sawtooth Wave Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-lg font-extrabold text-indigo-300 mb-4">
          Target Playing Time (Seconds) Across Levels 1–15
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="level" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" unit="s" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
              />
              <Area
                type="monotone"
                dataKey="targetTime"
                name="Target Time (s)"
                stroke="#818cf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Match Density vs Decoy Friction Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-base font-extrabold text-emerald-300 mb-4">
            Initial Match Density (%)
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="level" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="initialMatchDensity" name="Initial Density %" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-base font-extrabold text-pink-300 mb-4">
            Decoy Friction Ratio (%)
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="level" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="decoyRatio" name="Decoy Ratio %" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
