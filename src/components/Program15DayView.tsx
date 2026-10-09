import React, { useState } from 'react';
import { PROGRAM_15_DAYS } from '../constants/mockData';

export const Program15DayView: React.FC = () => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(6);
  const [pacingOverride, setPacingOverride] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'Cold-Pressed Olive Oil': true,
    'White Royal Quinoa': true,
    'Wild Salmon Fillets (4x)': true,
    'Organic Tender Broccolini': false,
  });

  const activePlan = PROGRAM_15_DAYS.find((p) => p.dayNumber === selectedDayNum) || PROGRAM_15_DAYS[5];

  const toggleCheck = (name: string) => {
    setChecklist((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-4">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-[#f5ece7] rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(31,27,24,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] border border-[#eae1dc] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <span className="material-symbols-outlined text-[24px] text-[#feb95f]">military_tech</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#855400] font-bold uppercase tracking-wider">
              <span>PROTOCOL PHASE II</span>
              <span>•</span>
              <span>Stage 06/15</span>
            </div>
            <h2 className="font-serif text-2xl text-[#003629] font-bold">
              15-Day Cadence
            </h2>
          </div>
        </div>

        {/* Completion Circular Progress Dial */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#c0c9c3]/50 shadow-sm">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#eae1dc" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#003629"
                strokeWidth="3"
                strokeDasharray="88"
                strokeDashoffset="52.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-[#707974] uppercase">Completion</span>
            <span className="font-mono text-[11px] text-[#003629] font-bold">40.0%</span>
          </div>
        </div>
      </div>

      {/* CHRONO DIAL RAIL: DAY 01 - DAY 06 */}
      <div className="w-full bg-[#efe6e1] rounded-xl p-3 shadow-[inset_0_2px_4px_rgba(37,33,30,0.15)] border border-[#c0c9c3]/60 flex flex-col gap-2">
        <div className="flex justify-between items-center px-1">
          <span className="font-mono text-[9px] text-[#707974] uppercase font-bold tracking-wider">
            CHRONO DIAL RAIL
          </span>
          <span className="font-mono text-[9px] text-[#855400] font-bold uppercase">
            Day 06: Active Station
          </span>
        </div>

        {/* Rail days button row */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5, 6].map((day) => {
            const isCurrent = day === 6;
            const isSelected = selectedDayNum === day;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDayNum(day)}
                className={`py-2 px-1 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white shadow-[0_3px_6px_rgba(0,54,41,0.3)] border border-[#feb95f]'
                    : isSelected
                    ? 'bg-white text-[#003629] shadow border border-[#003629] font-bold'
                    : 'bg-[#fbf2ed] text-[#404945] hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-[#eae1dc]'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-1.5 -right-1 text-[12px] text-[#feb95f]">★</span>
                )}
                <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold">
                  {isCurrent ? 'DAY 06' : `D-0${day}`}
                </span>
                <span className="material-symbols-outlined text-[16px] my-0.5 text-[#feb95f]">
                  check_circle
                </span>
                <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-tighter opacity-90">
                  {isCurrent ? 'CURRENT' : '100%'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FOCUS PROTOCOL CARD */}
      <div className="w-full bg-[#fff8f5] rounded-xl p-5 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-wider">
              FOCUS PROTOCOL • Regimen No. {activePlan.regimenNumber}
            </span>
            <h3 className="font-serif text-2xl text-[#003629] font-bold leading-tight">
              {activePlan.title}
            </h3>
          </div>

          <div className="p-2 rounded-lg bg-[#fbf2ed] border border-[#c0c9c3]/60 shadow-[inset_0_1px_2px_rgba(37,33,30,0.08)] flex flex-col items-center flex-shrink-0">
            <span className="font-mono text-[8px] text-[#707974] uppercase">TARGET</span>
            <span className="font-serif text-lg text-[#855400] font-bold leading-none">
              {activePlan.proteinTarget}g
            </span>
            <span className="font-mono text-[7px] text-[#855400] uppercase font-bold">PROTEIN</span>
          </div>
        </div>

        {/* Hydration standard bar */}
        <div className="p-3 rounded-lg bg-[#c8e6ff]/30 border border-[#95cdf6]/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004a6b] text-[20px]">water_drop</span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-[#00324a] font-bold">
                {activePlan.waterTargetMl.toLocaleString()} mL Standard
              </span>
              <span className="font-sans text-[11px] text-[#404945]">
                {activePlan.waterNote}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#95cdf6] text-[#001e2e] font-mono text-[9px] font-bold">
            OPTIMAL
          </span>
        </div>

        {/* Prescribed Nutrient Intake Timeline */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="font-mono text-[9px] text-[#707974] font-bold uppercase tracking-wider">
            PRESCRIBED NUTRIENT INTAKE TIMELINE
          </span>

          <div className="flex flex-col gap-2">
            {activePlan.timeline.map((item, idx) => {
              const isInFocus = item.status === 'in-focus';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isInFocus
                      ? 'bg-gradient-to-r from-[#1b4d3e] to-[#003629] text-white border-[#002117] shadow-[0_2px_6px_rgba(0,54,41,0.25)]'
                      : isCompleted
                      ? 'bg-[#fbf2ed] text-[#1f1b18] border-[#eae1dc]'
                      : 'bg-[#fff8f5] text-[#707974] border-dashed border-[#c0c9c3]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      isInFocus ? 'bg-white/20 text-white' : 'bg-[#eae1dc] text-[#855400]'
                    }`}>
                      {item.time}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-serif text-sm font-bold truncate">
                        {item.title}
                      </span>
                      <span className={`font-mono text-[9px] truncate ${
                        isInFocus ? 'text-white/80' : 'text-[#707974]'
                      }`}>
                        {item.proteinGrams}g Protein • {item.calories} kcal • {item.hydrationNote}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isInFocus ? (
                      <span className="px-2 py-0.5 rounded bg-[#feb95f] text-[#2a1700] font-mono text-[8px] font-bold uppercase tracking-wider">
                        IN FOCUS
                      </span>
                    ) : isCompleted ? (
                      <span className="material-symbols-outlined text-[#003629] text-[18px]">
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[#c0c9c3] text-[18px]">
                        radio_button_unchecked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CULINARY INSTRUCTION CONSOLE (REC-0845 VINTAGE CRT MONITOR) */}
      <div className="w-full bg-[#fff8f5] rounded-xl p-5 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855400] text-[20px]">videocam</span>
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-wider">
              CULINARY INSTRUCTION CONSOLE
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#efe6e1] font-mono text-[9px] text-[#ba1a1a] font-bold border border-[#c0c9c3]/50">
            REC-0845
          </span>
        </div>

        {/* Vintage Monitor Frame with Food Video Preview */}
        <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.2)] border-4 border-[#25211e]">
          <img
            src={activePlan.recipeVideoImg}
            alt={activePlan.recipeTitle}
            className="w-full h-52 sm:h-64 object-cover opacity-90 filter brightness-[0.95]"
          />
          {/* CRT scanlines effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.7)_100%)]" />

          {/* Top HUD */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded font-mono text-[9px] text-white backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              <span>08:45 • MASTERCLASS</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-black/60 font-mono text-[9px] text-[#feb95f] backdrop-blur-sm">
              1080p HIGH-BITRATE
            </span>
          </div>

          {/* Bottom Monitor Console Bar */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white/70 font-mono text-[8px] z-10">
            <div className="flex items-center gap-3">
              <span>● PWR</span>
              <span>● AUDIO</span>
            </div>
            <span>OPTIC TAPE II</span>
          </div>
        </div>

        {/* Recipe Title & Overview */}
        <div className="flex flex-col gap-1">
          <h4 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold leading-tight">
            {activePlan.recipeTitle}
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#404945] leading-relaxed">
            {activePlan.recipeDescription}
          </p>
        </div>

        {/* Mise En Place Checklist */}
        <div className="flex flex-col gap-2 pt-2 border-t border-dashed border-[#c0c9c3]/60">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-widest">
              MISE EN PLACE CHECKLIST
            </span>
            <span className="font-mono text-[8px] text-[#707974] uppercase">
              Tap to mark pantry ready
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(checklist).map(([item, checked]) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleCheck(item)}
                className={`p-2.5 rounded-lg border font-mono text-[10px] text-left flex items-center gap-2 transition-all cursor-pointer ${
                  checked
                    ? 'bg-[#fbf2ed] text-[#003629] border-[#003629]/40 shadow-inner font-bold'
                    : 'bg-white text-[#707974] border-[#eae1dc] hover:bg-[#fff8f5]'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] ${
                  checked ? 'text-[#003629]' : 'text-[#c0c9c3]'
                }`}>
                  {checked ? 'check_box' : 'check_box_outline_blank'}
                </span>
                <span className="truncate">{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEXT REVEAL CARD (DAY 07 LOCKED) */}
      <div className="w-full bg-[#fbf2ed] rounded-xl p-5 border border-dashed border-[#c0c9c3] flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#e1d8d3] flex items-center justify-center text-[#707974] flex-shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-[24px]">lock</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase">
              NEXT REVEAL • DAY 07
            </span>
            <span className="font-mono text-[9px] text-[#707974]">
              ⏱ Unlocks in 09h 14m
            </span>
          </div>
          <h4 className="font-serif text-lg text-[#1f1b18] font-bold mt-0.5">
            Day 7: Antioxidant Flush &amp; Lean Glycogen Replenish
          </h4>
          <p className="font-sans text-xs text-[#707974] mt-1">
            Full plant-polyphenol infusion, whole berry purée protocols, and restorative sodium buffering before the Day 8 benchmark test.
          </p>
        </div>
      </div>

      {/* PACING OVERRIDE TOGGLE */}
      <div className="w-full bg-[#f5ece7] rounded-xl p-4 shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] border border-[#eae1dc] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-[#003629] font-bold uppercase tracking-wider">
            PACING OVERRIDE
          </span>
          <span className="font-sans text-xs text-[#707974]">
            Require mentor master pin to open early
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPacingOverride(!pacingOverride)}
          className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer border ${
            pacingOverride ? 'bg-[#003629] border-[#002117]' : 'bg-[#c0c9c3] border-[#707974]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              pacingOverride ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
