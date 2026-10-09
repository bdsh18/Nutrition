import React from 'react';

interface NavigationProps {
  activeTab: 'daily-log' | 'weekly-summary' | 'modular-program' | 'setup';
  setActiveTab: (tab: 'daily-log' | 'weekly-summary' | 'modular-program' | 'setup') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#efe6e1]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(37,33,30,0.08)] border-t border-[#c0c9c3]/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="h-20 max-w-lg mx-auto px-4 flex items-center justify-around">
        {/* Setup */}
        <button
          type="button"
          onClick={() => setActiveTab('setup')}
          className={`group min-w-[56px] min-h-[48px] flex-1 py-1 px-1 mx-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'setup'
              ? 'shadow-[inset_0_2px_4px_rgba(37,33,30,0.24)] bg-[#e1d8d3] text-[#855400] font-bold border border-[#c0c9c3]'
              : 'bg-[#fbf2ed] shadow-[0_2px_4px_rgba(37,33,30,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-active:scale-95">
            tune
          </span>
          <span className="font-mono text-[9px] mt-0.5 tracking-tight uppercase truncate">
            Setup
          </span>
        </button>

        {/* Daily Log */}
        <button
          type="button"
          onClick={() => setActiveTab('daily-log')}
          className={`group min-w-[56px] min-h-[48px] flex-1 py-1 px-1 mx-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'daily-log'
              ? 'shadow-[inset_0_2px_4px_rgba(37,33,30,0.24)] bg-[#e1d8d3] text-[#855400] font-bold border border-[#c0c9c3]'
              : 'bg-[#fbf2ed] shadow-[0_2px_4px_rgba(37,33,30,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-active:scale-95">
            schedule
          </span>
          <span className="font-mono text-[9px] mt-0.5 tracking-tight uppercase truncate">
            Daily Log
          </span>
        </button>

        {/* Summary */}
        <button
          type="button"
          onClick={() => setActiveTab('weekly-summary')}
          className={`group min-w-[56px] min-h-[48px] flex-1 py-1 px-1 mx-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'weekly-summary'
              ? 'shadow-[inset_0_2px_4px_rgba(37,33,30,0.24)] bg-[#e1d8d3] text-[#855400] font-bold border border-[#c0c9c3]'
              : 'bg-[#fbf2ed] shadow-[0_2px_4px_rgba(37,33,30,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-active:scale-95">
            monitoring
          </span>
          <span className="font-mono text-[9px] mt-0.5 tracking-tight uppercase truncate">
            Summary
          </span>
        </button>

        {/* 15-Day Cadence */}
        <button
          type="button"
          onClick={() => setActiveTab('modular-program')}
          className={`group min-w-[56px] min-h-[48px] flex-1 py-1 px-1 mx-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'modular-program'
              ? 'shadow-[inset_0_2px_4px_rgba(37,33,30,0.24)] bg-[#e1d8d3] text-[#855400] font-bold border border-[#c0c9c3]'
              : 'bg-[#fbf2ed] shadow-[0_2px_4px_rgba(37,33,30,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-active:scale-95">
            timelapse
          </span>
          <span className="font-mono text-[9px] mt-0.5 tracking-tight uppercase truncate">
            15-Day
          </span>
        </button>
      </div>
    </nav>
  );
};
