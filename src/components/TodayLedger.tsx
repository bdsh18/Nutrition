import React, { useState } from 'react';
import { MealEntry, MealCategory, StatusBadge } from '../types';

interface TodayLedgerProps {
  meals: MealEntry[];
  onDeleteMeal: (id: string) => void;
  onOpenManualEntry: () => void;
  onOpenExportReport: () => void;
  solNumber: number;
  onQuickAddMacro?: (macroType: 'protein' | 'carbs' | 'fats', grams: number) => void;
}

export const TodayLedger: React.FC<TodayLedgerProps> = ({
  meals,
  onDeleteMeal,
  onOpenManualEntry,
  onOpenExportReport,
  solNumber,
  onQuickAddMacro,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [lastQuickAddFeedback, setLastQuickAddFeedback] = useState<string | null>(null);

  const categories: string[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const filteredMeals = selectedFilter === 'All'
    ? meals
    : meals.filter((m) => m.category.toLowerCase() === selectedFilter.toLowerCase());

  const handleQuickAddClick = (macroType: 'protein' | 'carbs' | 'fats', grams: number) => {
    if (onQuickAddMacro) {
      onQuickAddMacro(macroType, grams);
    }
    const cal = macroType === 'fats' ? grams * 9 : grams * 4;
    setLastQuickAddFeedback(`+${grams}g ${macroType.toUpperCase()} (${cal} kcal) Stamped`);
    setTimeout(() => setLastQuickAddFeedback(null), 2500);
  };

  return (
    <div className="w-full bg-[#fff8f5] rounded-xl p-4 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] flex flex-col gap-4">
      {/* Ledger Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3 border-b border-dashed border-[#c0c9c3]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f5ece7] flex items-center justify-center text-[#003629] shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] border border-[#c0c9c3]/50">
            <span className="material-symbols-outlined text-[22px]">menu_book</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#855400] tracking-widest uppercase font-bold">
              ARCHIVAL CHRONO-LOG
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
              Today's Nutrition Ledger
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-[#f5ece7] font-mono text-[10px] text-[#003629] font-bold shadow-[inset_0_1px_2px_rgba(37,33,30,0.12)] border border-[#c0c9c3]/50">
            {meals.length} {meals.length === 1 ? 'ENTRY' : 'ENTRIES'} RECORDED
          </span>

          {/* Filter dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="h-9 px-3 rounded bg-white hover:bg-[#fff8f5] text-[#1f1b18] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-[0_2px_4px_rgba(37,33,30,0.08)] active:translate-y-0.5 transition-all border border-[#c0c9c3] cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[16px] text-[#855400]">tune</span>
              <span>Filter: {selectedFilter}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-[#c0c9c3] z-30 py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedFilter(cat);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 font-mono text-[10px] uppercase flex items-center justify-between cursor-pointer ${
                      selectedFilter === cat
                        ? 'bg-[#f5ece7] text-[#003629] font-bold'
                        : 'text-[#404945] hover:bg-[#fff8f5]'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedFilter === cat && (
                      <span className="material-symbols-outlined text-[14px] text-[#003629]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TACTILE SKEUOMORPHIC QUICK ADD ROW */}
      <div className="w-full bg-[#fbf2ed] rounded-xl p-3 sm:p-4 border border-[#eae1dc] shadow-[inset_0_2px_4px_rgba(37,33,30,0.1),0_1px_2px_rgba(255,255,255,0.8)] flex flex-col gap-2.5 relative overflow-hidden">
        {/* Quick Add Cassette Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855400] text-[18px]">bolt</span>
            <span className="font-mono text-[10px] text-[#003629] font-bold uppercase tracking-wider">
              Quick Add • Single-Click Macro Bolus
            </span>
          </div>
          {lastQuickAddFeedback ? (
            <span className="px-2.5 py-0.5 rounded bg-[#1b4d3e] text-white font-mono text-[9px] font-bold animate-pulse shadow-sm">
              ✓ {lastQuickAddFeedback}
            </span>
          ) : (
            <span className="font-mono text-[8px] text-[#707974] uppercase tracking-wider hidden sm:inline">
              Instant 5g · 10g · 20g calibration
            </span>
          )}
        </div>

        {/* 3 Macro Channel Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Channel 1: Protein (Emerald) */}
          <div className="bg-[#fff8f5] p-2.5 rounded-lg border border-[#eae1dc] shadow-[0_1px_2px_rgba(37,33,30,0.05)] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#003629] shadow-[0_0_4px_rgba(0,54,41,0.6)]" />
                <span className="font-mono text-[10px] font-bold text-[#003629] uppercase tracking-wide">
                  Protein
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#707974]">4 kcal / g</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[5, 10, 20].map((g) => (
                <button
                  key={`pro-${g}`}
                  type="button"
                  onClick={() => handleQuickAddClick('protein', g)}
                  className="py-1.5 px-1 rounded-md bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white font-mono text-[10px] font-bold uppercase shadow-[0_2px_4px_rgba(0,54,41,0.25),inset_0_1px_0_rgba(186,238,217,0.4)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] transition-all cursor-pointer flex flex-col items-center justify-center border border-[#002117] group hover:brightness-110"
                >
                  <span className="leading-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                    +{g}g
                  </span>
                  <span className="text-[7px] text-[#baeed9] opacity-80 uppercase leading-none">
                    {g * 4}kcal
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Channel 2: Carbohydrates (Amber) */}
          <div className="bg-[#fff8f5] p-2.5 rounded-lg border border-[#eae1dc] shadow-[0_1px_2px_rgba(37,33,30,0.05)] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#feb95f] shadow-[0_0_4px_rgba(254,185,95,0.8)]" />
                <span className="font-mono text-[10px] font-bold text-[#855400] uppercase tracking-wide">
                  Carbohydrates
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#707974]">4 kcal / g</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[5, 10, 20].map((g) => (
                <button
                  key={`carb-${g}`}
                  type="button"
                  onClick={() => handleQuickAddClick('carbs', g)}
                  className="py-1.5 px-1 rounded-md bg-gradient-to-b from-[#feb95f] to-[#855400] text-white font-mono text-[10px] font-bold uppercase shadow-[0_2px_4px_rgba(133,84,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] transition-all cursor-pointer flex flex-col items-center justify-center border border-[#754900] group hover:brightness-110"
                >
                  <span className="leading-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                    +{g}g
                  </span>
                  <span className="text-[7px] text-[#ffddb7] opacity-80 uppercase leading-none">
                    {g * 4}kcal
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Channel 3: Lipids & Fats (Cerulean) */}
          <div className="bg-[#fff8f5] p-2.5 rounded-lg border border-[#eae1dc] shadow-[0_1px_2px_rgba(37,33,30,0.05)] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#004a6b] shadow-[0_0_4px_rgba(0,74,107,0.7)]" />
                <span className="font-mono text-[10px] font-bold text-[#00324a] uppercase tracking-wide">
                  Lipids &amp; Fats
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#707974]">9 kcal / g</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[5, 10, 20].map((g) => (
                <button
                  key={`fat-${g}`}
                  type="button"
                  onClick={() => handleQuickAddClick('fats', g)}
                  className="py-1.5 px-1 rounded-md bg-gradient-to-b from-[#004a6b] to-[#00324a] text-white font-mono text-[10px] font-bold uppercase shadow-[0_2px_4px_rgba(0,50,74,0.25),inset_0_1px_0_rgba(200,230,255,0.4)] active:translate-y-0.5 active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] transition-all cursor-pointer flex flex-col items-center justify-center border border-[#001e2e] group hover:brightness-110"
                >
                  <span className="leading-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                    +{g}g
                  </span>
                  <span className="text-[7px] text-[#c8e6ff] opacity-80 uppercase leading-none">
                    {g * 9}kcal
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Cards Mosaic / Perforated Paper Stack */}
      {filteredMeals.length === 0 ? (
        <div className="py-10 flex flex-col items-center justify-center text-center bg-[#fbf2ed] rounded-xl border border-dashed border-[#c0c9c3] p-6">
          <span className="material-symbols-outlined text-4xl text-[#707974] mb-2">dinner_dining</span>
          <p className="font-serif text-lg text-[#1f1b18] font-bold">No entries found for this category</p>
          <p className="font-mono text-[10px] text-[#707974] mt-1">
            Capture with AI Macro Scanner or tap &ldquo;Add Manual Entry&rdquo; below.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="flex flex-col justify-between bg-[#fbf2ed] p-4 rounded-xl shadow-[inset_0_1px_2px_rgba(37,33,30,0.08),0_2px_4px_rgba(37,33,30,0.04)] border border-[#eae1dc] relative group hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                {meal.imageUrl ? (
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-14 h-14 rounded-lg object-cover shadow-[0_2px_4px_rgba(0,0,0,0.15)] flex-shrink-0 border border-white"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-[#efe6e1] flex items-center justify-center text-[#855400] shadow-[inset_0_1px_2px_rgba(37,33,30,0.2)] flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">restaurant</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[#855400]">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider">
                      {meal.time}
                    </span>
                    <span className="text-[10px]">•</span>
                    <span className="font-mono text-[9px] uppercase text-[#707974] font-bold">
                      {meal.category}
                    </span>
                  </div>
                  <span className="font-serif text-base text-[#1f1b18] font-bold truncate">
                    {meal.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-serif text-xl text-[#003629] font-bold leading-tight">
                      {meal.calories}
                    </span>
                    <span className="font-mono text-[9px] text-[#707974] uppercase font-normal">
                      kcal
                    </span>
                  </div>
                </div>

                {/* Delete button on hover / active */}
                <button
                  type="button"
                  onClick={() => onDeleteMeal(meal.id)}
                  title="Remove this log entry"
                  className="opacity-40 group-hover:opacity-100 hover:text-[#ba1a1a] transition-opacity p-1 text-[#707974] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              {/* Perforated Tear Line Visual Separator */}
              <div className="w-full h-px border-t border-dashed border-[#c0c9c3]/60 my-1" />

              <div className="flex items-center justify-between pt-1 text-[#404945] font-mono text-[10px]">
                <span>
                  Carbs: <strong className="text-[#855400]">{meal.carbsGrams}g</strong>
                </span>
                <span>
                  Pro: <strong className="text-[#003629]">{meal.proteinGrams}g</strong>
                </span>
                <span>
                  Fat: <strong className="text-[#00324a]">{meal.fatGrams}g</strong>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white shadow-[0_1px_1px_rgba(0,0,0,0.08)] text-[8px] font-bold text-[#003629] border border-[#eae1dc]">
                  {meal.statusBadge}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER MEMORANDUM BAR & AUDIT PLUG */}
      <div className="w-full bg-[#f5ece7] rounded-lg p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[inset_0_1px_3px_rgba(37,33,30,0.12)] border border-[#eae1dc]">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#855400] text-[22px]">verified_user</span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#003629] font-bold uppercase tracking-wider">
              CHRONOMETER CALIBRATED • JOURNAL CERTIFIED FOR SOL {solNumber}
            </span>
            <span className="font-mono text-[9px] text-[#404945]">
              Cryptographic telemetry hash: 0x9B42...F3A8 • Sync interval: 60s nominal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={onOpenExportReport}
            className="h-9 px-3.5 rounded bg-white text-[#404945] hover:text-[#1f1b18] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-[0_1px_2px_rgba(37,33,30,0.08)] active:translate-y-0.5 transition-all border border-[#c0c9c3] cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Archival Log</span>
          </button>
          <button
            type="button"
            onClick={onOpenManualEntry}
            className="h-9 px-3.5 rounded bg-gradient-to-b from-[#003629] to-[#1b4d3e] text-white font-mono text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 shadow-[0_2px_4px_rgba(0,54,41,0.25)] active:translate-y-0.5 transition-all cursor-pointer border border-[#002117]"
          >
            <span className="material-symbols-outlined text-[16px]">draw</span>
            <span>Add Manual Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
