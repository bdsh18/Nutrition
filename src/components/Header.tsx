import React from 'react';
import { ASSETS } from '../constants/mockData';

interface HeaderProps {
  activeTab: 'daily-log' | 'weekly-summary' | 'modular-program' | 'setup';
  setActiveTab: (tab: 'daily-log' | 'weekly-summary' | 'modular-program' | 'setup') => void;
  onOpenManualEntry: () => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenManualEntry,
  viewMode,
  setViewMode,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#fff8f5]/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(31,27,24,0.06)] border-b border-[#eae1dc]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('daily-log')}>
            <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-[#f5ece7] shadow-[0_2px_4px_rgba(37,33,30,0.12)] border border-[#c0c9c3]/50">
              <img
                src={ASSETS.logoEmblem}
                alt="NutritionBudy Emblem"
                className="h-8 w-8 object-contain"
              />
              <span className="absolute inset-0 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(37,33,30,0.15)] pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl text-[#003629] tracking-tight font-bold">
                  NutritionBudy
                </span>
                <span className="w-2 h-2 rounded-full bg-[#feb95f] shadow-[0_0_8px_rgba(254,185,95,0.9)] animate-pulse" />
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#855400] tracking-widest uppercase font-bold">
                CHRONO NUTRITION DASHBOARD
              </span>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-[#f5ece7] rounded-lg shadow-[inset_0_2px_4px_rgba(37,33,30,0.12)] border border-[#eae1dc]">
            <button
              type="button"
              onClick={() => setActiveTab('setup')}
              className={`px-3.5 py-1.5 rounded font-mono text-[11px] uppercase tracking-wider transition-all font-bold ${
                activeTab === 'setup'
                  ? 'bg-[#1b4d3e] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-[#404945] hover:text-[#1f1b18] hover:bg-[#efe6e1]'
              }`}
            >
              Setup
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('daily-log')}
              className={`px-3.5 py-1.5 rounded font-mono text-[11px] uppercase tracking-wider transition-all font-bold ${
                activeTab === 'daily-log'
                  ? 'bg-[#1b4d3e] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-[#404945] hover:text-[#1f1b18] hover:bg-[#efe6e1]'
              }`}
            >
              Daily Log
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('weekly-summary')}
              className={`px-3.5 py-1.5 rounded font-mono text-[11px] uppercase tracking-wider transition-all font-bold ${
                activeTab === 'weekly-summary'
                  ? 'bg-[#1b4d3e] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-[#404945] hover:text-[#1f1b18] hover:bg-[#efe6e1]'
              }`}
            >
              Weekly Summary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('modular-program')}
              className={`px-3.5 py-1.5 rounded font-mono text-[11px] uppercase tracking-wider transition-all font-bold ${
                activeTab === 'modular-program'
                  ? 'bg-[#1b4d3e] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-[#404945] hover:text-[#1f1b18] hover:bg-[#efe6e1]'
              }`}
            >
              15-Day Cadence
            </button>
          </nav>
        </div>

        {/* Right Station info & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Circadian Sol Stamp */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#f5ece7] rounded-lg shadow-[inset_0_1px_3px_rgba(37,33,30,0.14)] border border-[#eae1dc]">
            <span className="material-symbols-outlined text-[#855400] text-[16px]">schedule</span>
            <span className="font-mono text-[10px] text-[#404945] font-bold">SOL 284 • 13:45 CIRCADIAN</span>
          </div>

          {/* View mode toggle button */}
          <div className="flex items-center bg-[#efe6e1] p-0.5 rounded-lg border border-[#c0c9c3]/50 shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)]">
            <button
              type="button"
              title="Wide Workbench Layout"
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded flex items-center gap-1 font-mono text-[9px] uppercase font-bold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-[#003629] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                  : 'text-[#707974] hover:text-[#1f1b18]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
              <span className="hidden sm:inline">Workbench</span>
            </button>
            <button
              type="button"
              title="Pocket Chrono Layout"
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded flex items-center gap-1 font-mono text-[9px] uppercase font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-[#003629] shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                  : 'text-[#707974] hover:text-[#1f1b18]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
              <span className="hidden sm:inline">Pocket</span>
            </button>
          </div>

          {/* Quick Log Button */}
          <button
            type="button"
            onClick={onOpenManualEntry}
            aria-label="Quick calibrate action"
            className="h-9 px-3 sm:px-4 rounded-lg bg-gradient-to-b from-[#feb95f] to-[#855400] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-[0_2px_4px_rgba(37,33,30,0.2),inset_0_1px_0_rgba(255,255,255,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] transition-all font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">add</span>
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">Log Influx</span>
          </button>

          {/* Profile Badge */}
          <div className="relative p-0.5 rounded-full bg-[#f5ece7] shadow-[0_2px_4px_rgba(37,33,30,0.12)] border border-[#c0c9c3]/50">
            <img
              src={ASSETS.userAvatar}
              alt="Researcher Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(37,33,30,0.2)] pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );
};
