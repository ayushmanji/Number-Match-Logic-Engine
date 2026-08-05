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
  const tabs = [
    { id: 'PLAY' as NavTab, label: 'Play Game', shortLabel: 'Play', icon: Gamepad2 },
    { id: 'SIMULATOR' as NavTab, label: '100-Run Simulator', shortLabel: 'Simulator', icon: Cpu },
    { id: 'SAWTOOTH' as NavTab, label: 'Sawtooth Curve', shortLabel: 'Sawtooth', icon: LineChart },
    { id: 'DOCUMENTATION' as NavTab, label: 'Technical Writeup', shortLabel: 'Writeup', icon: BookOpen },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-12">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <Layers className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
                Number Match Game Engine
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Solvability & Difficulty System
              </p>
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <label htmlFor="level-select-desktop" className="text-xs text-slate-400 font-medium">Level:</label>
            <select
              id="level-select-desktop"
              value={currentLevel}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="bg-slate-900 text-indigo-300 font-bold text-xs border border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Nav Tabs */}
          <nav className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800" role="tablist" aria-label="Main Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile & Tablet Responsive Layout */}
        <div className="flex flex-col space-y-2.5 lg:hidden">
          {/* Top Row: Brand & Level Dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="p-1.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg shadow-md shrink-0">
                <Layers className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div className="truncate">
                <h1 className="text-sm font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight truncate">
                  Number Match
                </h1>
                <p className="text-[10px] text-slate-400 font-medium truncate hidden sm:block">
                  Logic Engine
                </p>
              </div>
            </div>

            {/* Mobile Level Dropdown */}
            <div className="flex items-center space-x-1.5 bg-slate-800/90 px-2 py-1 rounded-lg border border-slate-700 shrink-0">
              <label htmlFor="level-select-mobile" className="text-[11px] text-slate-400 font-semibold">Lvl:</label>
              <select
                id="level-select-mobile"
                value={currentLevel}
                onChange={(e) => onLevelChange(Number(e.target.value))}
                className="bg-slate-900 text-indigo-300 font-bold text-xs border border-slate-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-indigo-500"
              >
                {Array.from({ length: 15 }, (_, i) => i + 1).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Tab Navigation Bar */}
          <nav className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800" role="tablist" aria-label="Mobile Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center space-y-0.5 sm:space-y-0 sm:space-x-1 px-1.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[10px] sm:text-xs">{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
