import React from 'react';
import { Gamepad2, Cpu, LineChart, BookOpen, Layers } from 'lucide-react';

export type NavTab = 'PLAY' | 'SIMULATOR' | 'SAWTOOTH' | 'DOCUMENTATION';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentLevel: number;
  onLevelChange: (lvl: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLevel,
  onLevelChange,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <Layers className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Number Match Logic Engine
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Deterministic Solvability & Sawtooth Difficulty System
              </p>
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <label htmlFor="level-select" className="text-xs text-slate-400 font-medium">Level:</label>
            <select
              id="level-select"
              value={currentLevel}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="bg-slate-900 text-indigo-300 font-bold text-sm border border-slate-700 rounded px-2 py-0.5 focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl} {lvl === 6 || lvl === 11 ? '⚡ (Relief)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Nav Tabs */}
          <nav className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800" role="tablist" aria-label="Main Navigation">
            <button
              role="tab"
              aria-selected={activeTab === 'PLAY'}
              onClick={() => setActiveTab('PLAY')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeTab === 'PLAY'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Play Game</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'SIMULATOR'}
              onClick={() => setActiveTab('SIMULATOR')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeTab === 'SIMULATOR'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>100-Run Simulator</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'SAWTOOTH'}
              onClick={() => setActiveTab('SAWTOOTH')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeTab === 'SAWTOOTH'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Sawtooth Curve</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'DOCUMENTATION'}
              onClick={() => setActiveTab('DOCUMENTATION')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeTab === 'DOCUMENTATION'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Technical Writeup</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
