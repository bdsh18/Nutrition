import React, { useState } from 'react';
import { ASSETS, WEEKLY_STATS_DATA } from '../constants/mockData';
import { WeeklyDayStat } from '../types';

interface WeeklySummaryViewProps {
  onOpenReportModal: () => void;
}

export const WeeklySummaryView: React.FC<WeeklySummaryViewProps> = ({ onOpenReportModal }) => {
  const [activeWeek, setActiveWeek] = useState<'w1' | 'w2' | 'prev'>('w1');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default Saturday (Today)

  const selectedDay = WEEKLY_STATS_DATA[selectedDayIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-4">
      {/* Top Chronometer Ledger Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[#855400] uppercase font-bold tracking-widest">
            CHRONOMETER LEDGER
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#707974] uppercase font-bold">
          CYCLE 01 • Q3
        </span>
      </div>

      {/* Week Selector Cassette */}
      <div className="w-full bg-[#efe6e1] p-1 rounded-xl shadow-[inset_0_2px_4px_rgba(37,33,30,0.15)] border border-[#c0c9c3]/60 grid grid-cols-3 gap-1">
        <button
          type="button"
          onClick={() => setActiveWeek('w1')}
          className={`py-2 px-3 rounded-lg font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeWeek === 'w1'
              ? 'bg-[#fbf2ed] text-[#855400] shadow-[0_2px_4px_rgba(37,33,30,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#c0c9c3]'
              : 'text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#feb95f] shadow-[0_0_6px_#feb95f]" />
          <span>W1 (Current)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveWeek('w2')}
          className={`py-2 px-3 rounded-lg font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeWeek === 'w2'
              ? 'bg-[#fbf2ed] text-[#855400] shadow-[0_2px_4px_rgba(37,33,30,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#c0c9c3]'
              : 'text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          Week 2
        </button>

        <button
          type="button"
          onClick={() => setActiveWeek('prev')}
          className={`py-2 px-3 rounded-lg font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeWeek === 'prev'
              ? 'bg-[#fbf2ed] text-[#855400] shadow-[0_2px_4px_rgba(37,33,30,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#c0c9c3]'
              : 'text-[#404945] hover:text-[#1f1b18]'
          }`}
        >
          Previous
        </button>
      </div>

      {/* Metallic Medallion Banner */}
      <div className="w-full bg-[#fff8f5] rounded-xl p-4 sm:p-5 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full p-1 bg-gradient-to-b from-[#dfa54d] to-[#653e00] shadow-[0_4px_8px_rgba(0,0,0,0.25)] flex items-center justify-center flex-shrink-0">
          <img
            src={ASSETS.medallion}
            alt="Medallion"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[#855400]">
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest">
              WEEKLY INSTRUMENT AUDIT
            </span>
            <span className="material-symbols-outlined text-[14px]">verified</span>
          </div>
          <h2 className="font-serif text-2xl text-[#003629] font-bold">
            Metabolic Calibrations
          </h2>
          <span className="font-sans text-xs text-[#404945]">
            Sustained discipline • Period: Oct 14 - Oct 24
          </span>
        </div>
      </div>

      {/* ENERGY EQUILIBRIUM: DAILY CALORIE CONSONANCE BAR CHART */}
      <div className="w-full bg-[#fff8f5] rounded-xl p-4 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-widest">
              ENERGY EQUILIBRIUM
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
              Daily Calorie Consonance
            </h3>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#efe6e1] border border-[#c0c9c3]/60 shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] flex flex-col items-end">
            <span className="font-mono text-[8px] text-[#707974] uppercase">Benchmark</span>
            <span className="font-mono text-[11px] text-[#003629] font-bold">2,200 kcal</span>
          </div>
        </div>

        {/* Vintage Instrument Chart Stage */}
        <div className="relative w-full h-64 bg-[#fbf2ed] rounded-xl p-4 shadow-[inset_0_3px_6px_rgba(37,33,30,0.18)] border border-[#eae1dc] flex flex-col justify-end overflow-hidden">
          {/* Target 2.2k Dashed Line */}
          <div className="absolute top-18 left-0 right-0 border-b-2 border-dashed border-[#707974]/50 z-10 flex justify-end pr-4">
            <span className="font-mono text-[9px] text-[#707974] uppercase font-bold bg-[#fbf2ed] px-1.5 -translate-y-2">
              Target 2.2k
            </span>
          </div>

          {/* Bar Columns Container */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 h-48 items-end z-20 pb-2">
            {WEEKLY_STATS_DATA.map((day, idx) => {
              const maxScale = 2800;
              const heightPct = Math.min(100, Math.round((day.calories / maxScale) * 100));
              const isSelected = selectedDayIndex === idx;

              // Color schemes:
              let barGradient = 'from-[#003629] via-[#1b4d3e] to-[#376757]'; // target
              let textColor = 'text-[#003629]';
              if (day.type === 'deficit') {
                barGradient = 'from-[#855400] via-[#c88a35] to-[#feb95f]';
                textColor = 'text-[#855400]';
              } else if (day.type === 'surplus') {
                barGradient = 'from-[#ba1a1a] via-[#dc2626] to-[#f87171]';
                textColor = 'text-[#ba1a1a]';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className="flex flex-col items-center justify-end h-full cursor-pointer group"
                >
                  {/* Calorie value label */}
                  {day.calories > 0 ? (
                    <span className={`font-mono text-[9px] sm:text-[10px] font-bold mb-1 ${textColor}`}>
                      {(day.calories / 1000).toFixed(1)}k
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#707974] mb-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                    </span>
                  )}

                  {/* Cylindrical Physical Bar */}
                  {day.calories > 0 ? (
                    <div
                      className={`w-6 sm:w-10 rounded-t-xl bg-gradient-to-t ${barGradient} shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_2px_2px_rgba(255,255,255,0.6)] relative transition-all duration-300 group-hover:brightness-110 ${
                        isSelected ? 'ring-2 ring-[#feb95f] ring-offset-1' : ''
                      }`}
                      style={{ height: `${heightPct}%` }}
                    >
                      {/* Luminous Core Pip */}
                      <div className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_4px_white] mx-auto absolute bottom-2 left-1/2 -translate-x-1/2" />
                    </div>
                  ) : (
                    <div className="w-6 sm:w-10 h-16 rounded-t-xl bg-[#e1d8d3] border border-dashed border-[#c0c9c3] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-[#707974]">lock</span>
                    </div>
                  )}

                  {/* Day label */}
                  <span className={`font-mono text-[10px] sm:text-[11px] font-bold mt-2 uppercase ${
                    day.isToday ? 'text-[#855400] underline decoration-[#feb95f] decoration-2' : 'text-[#404945]'
                  }`}>
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-1 text-[#404945] font-mono text-[10px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#003629]" />
            <span>Target (4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#feb95f]" />
            <span>Deficit (1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            <span>Surplus (1)</span>
          </div>
        </div>
      </div>

      {/* DUAL ROTARY GAUGES: HYDRATION & MACRO RATIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gauge 1: Hydration Compliance */}
        <div className="bg-[#fff8f5] rounded-xl p-4 sm:p-5 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-widest">
              HYDRATION
            </span>
            <span className="material-symbols-outlined text-[#004a6b] text-[18px]">water_drop</span>
          </div>

          {/* Brass Bezel Dial */}
          <div className="relative w-40 h-40 rounded-full p-2 bg-gradient-to-b from-[#dfa54d] via-[#b27626] to-[#653e00] shadow-[0_6px_16px_rgba(37,33,30,0.22),inset_0_2px_2px_rgba(255,255,255,0.7)] flex items-center justify-center my-2">
            <div className="w-full h-full rounded-full bg-[#fbf2ed] shadow-[inset_0_3px_6px_rgba(37,33,30,0.22)] relative flex flex-col items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#eae1dc" strokeWidth="6" strokeDasharray="188 60" transform="rotate(135 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#004a6b" strokeWidth="6" strokeDasharray="168 60" strokeLinecap="round" transform="rotate(135 50 50)" />
              </svg>
              {/* Dial needle */}
              <div
                className="absolute w-1 h-12 origin-bottom bg-[#003629] transform rotate-[48deg] -translate-y-4 rounded shadow pointer-events-none"
              />
              <div className="absolute w-4 h-4 rounded-full bg-[#feb95f] border-2 border-[#855400] z-10" />
              <div className="relative z-10 flex flex-col items-center mt-7">
                <span className="font-serif text-2xl text-[#003629] font-bold leading-none">89%</span>
                <span className="font-mono text-[7px] text-[#855400] uppercase font-bold tracking-wider mt-0.5">
                  COMPLIANCE
                </span>
              </div>
            </div>
          </div>

          <span className="font-serif text-sm sm:text-base text-[#1f1b18] font-bold">
            6 of 7 Days Met
          </span>
        </div>

        {/* Gauge 2: Macro Balance Ratio Ring */}
        <div className="bg-[#fff8f5] rounded-xl p-4 sm:p-5 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-widest">
              BALANCE
            </span>
            <span className="material-symbols-outlined text-[#855400] text-[18px]">pie_chart</span>
          </div>

          {/* Brass Bezel Concentric Ring */}
          <div className="relative w-40 h-40 rounded-full p-2 bg-gradient-to-b from-[#dfa54d] via-[#b27626] to-[#653e00] shadow-[0_6px_16px_rgba(37,33,30,0.22),inset_0_2px_2px_rgba(255,255,255,0.7)] flex items-center justify-center my-2">
            <div className="w-full h-full rounded-full bg-[#fbf2ed] shadow-[inset_0_3px_6px_rgba(37,33,30,0.22)] relative flex flex-col items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* 30% Protein (Green) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#003629" strokeWidth="6" strokeDasharray="72 200" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                {/* 45% Carbs (Amber) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#feb95f" strokeWidth="6" strokeDasharray="107 200" strokeDashoffset="-72" transform="rotate(-90 50 50)" />
                {/* 25% Lipids (Blue) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#004a6b" strokeWidth="6" strokeDasharray="60 200" strokeDashoffset="-179" transform="rotate(-90 50 50)" />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <span className="font-mono text-[7px] text-[#707974] uppercase font-bold">RATIO</span>
                <span className="font-serif text-lg text-[#003629] font-bold leading-tight">30·45·25</span>
              </div>
            </div>
          </div>

          <span className="font-mono text-[10px] text-[#404945] font-bold">
            <span className="text-[#003629]">30% P</span> • <span className="text-[#855400]">45% C</span> • <span className="text-[#00324a]">25% F</span>
          </span>
        </div>
      </div>

      {/* LEDGER MEMORANDUM PARCHMENT CARD WITH TACTILE PAPERCLIP */}
      <div className="relative w-full bg-[#fbf2ed] rounded-xl p-5 sm:p-6 shadow-[0_4px_12px_rgba(37,33,30,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#eae1dc] flex flex-col gap-4">
        {/* Trompe l'oeil Metal Paperclip in top right corner */}
        <div className="absolute -top-3 right-6 w-5 h-10 pointer-events-none z-30">
          <svg viewBox="0 0 24 50" className="w-full h-full drop-shadow-[1px_2px_3px_rgba(0,0,0,0.3)]">
            <path
              d="M12,2 C6.5,2 2,6.5 2,12 L2,38 C2,44 6.5,48 12,48 C17.5,48 22,44 22,38 L22,8 C22,4 19,1 15,1 C11,1 8,4 8,8 L8,36 C8,39 10,41 12.5,41 C15,41 17,39 17,36 L17,14"
              fill="none"
              stroke="#c0c9c3"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M12,2 C6.5,2 2,6.5 2,12 L2,38 C2,44 6.5,48 12,48 C17.5,48 22,44 22,38 L22,8 C22,4 19,1 15,1 C11,1 8,4 8,8 L8,36 C8,39 10,41 12.5,41 C15,41 17,39 17,36 L17,14"
              fill="none"
              stroke="#dfa54d"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Memorandum Header */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#855400] text-[20px]">description</span>
          <h3 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
            Ledger Memorandum
          </h3>
          <span className="px-2 py-0.5 rounded bg-[#fff8f5] text-[#855400] font-mono text-[9px] font-bold shadow-sm border border-[#c0c9c3]/50">
            VERIFIED
          </span>
        </div>

        {/* Archival Quoted Remark */}
        <p className="font-serif italic text-base sm:text-lg text-[#1f1b18] leading-relaxed border-l-2 border-[#feb95f] pl-3 py-0.5">
          &ldquo;Metabolic expenditure retained equilibrium throughout physical stress windows on midweek cycles. Hydration adherence reached nominal threshold with minimal deviation.&rdquo;
        </p>

        {/* Telemetry Metric Plaque */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-[#c0c9c3]/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">local_fire_department</span>
              <span className="font-mono text-[11px] text-[#404945]">Total Metabolic Deficit</span>
            </div>
            <span className="font-mono text-[12px] text-[#003629] font-bold">-1,850 kcal</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-[#c0c9c3]/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004a6b] text-[18px]">water_drop</span>
              <span className="font-mono text-[11px] text-[#404945]">Average Daily Water</span>
            </div>
            <span className="font-mono text-[12px] text-[#003629] font-bold">2,850 ml</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-dashed border-[#c0c9c3]/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#855400] text-[18px]">photo_camera</span>
              <span className="font-mono text-[11px] text-[#404945]">AI Scanned Meals</span>
            </div>
            <span className="font-mono text-[12px] text-[#003629] font-bold">18 Logs</span>
          </div>
        </div>

        {/* Program Progression Bar */}
        <div className="p-3 rounded-lg bg-[#efe6e1] shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003629] text-[18px]">timelapse</span>
            <span className="font-mono text-[10px] text-[#003629] font-bold uppercase tracking-wider">
              PROGRAM PROGRESSION
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#404945]">
            <strong className="text-[#855400]">Day 6</strong> of 15 Complete
          </span>
        </div>

        {/* Highest Consonance Meal Card */}
        <div className="p-3 rounded-lg bg-white shadow-sm border border-[#eae1dc] flex items-center gap-3">
          <img
            src={ASSETS.herbChickenQuinoa}
            alt="Highest Consonance Meal"
            className="w-12 h-12 rounded-lg object-cover shadow flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[8px] text-[#855400] font-bold uppercase tracking-widest">
              HIGHEST CONSONANCE MEAL
            </span>
            <span className="font-serif text-sm font-bold text-[#1f1b18] truncate">
              Harvest Grain &amp; Protein Crucible
            </span>
            <span className="font-mono text-[9px] text-[#707974]">
              Logged Friday 13:15 • 680 kcal (42g P)
            </span>
          </div>
        </div>
      </div>

      {/* Primary Push Button: STAMP & EXPORT ARCHIVAL REPORT */}
      <button
        type="button"
        onClick={onOpenReportModal}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-b from-[#dfa54d] via-[#c88a35] to-[#855400] text-white font-mono text-[12px] sm:text-[13px] uppercase tracking-wider font-bold shadow-[0_4px_12px_rgba(37,33,30,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#754900]"
      >
        <span className="material-symbols-outlined text-[20px] text-white drop-shadow">receipt_long</span>
        <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">STAMP &amp; EXPORT ARCHIVAL REPORT</span>
      </button>
    </div>
  );
};
