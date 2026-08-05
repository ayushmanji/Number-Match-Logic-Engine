import React from 'react';
import { Layers } from 'lucide-react';

interface NavbarProps {
  currentLevel: number;
  onLevelChange: (lvl: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  onLevelChange,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-10">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <Layers className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
                Number Match
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                Puzzle Game Engine
              </p>
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex items-center space-x-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 shadow-md">
            <label htmlFor="level-select" className="text-xs text-slate-400 font-semibold">Level:</label>
            <select
              id="level-select"
              value={currentLevel}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="bg-slate-900 text-indigo-300 font-bold text-xs border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
