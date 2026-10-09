import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StationCaloricDial } from './components/StationCaloricDial';
import { StationHydrationReservoir } from './components/StationHydrationReservoir';
import { StationMacroScanner } from './components/StationMacroScanner';
import { TodayLedger } from './components/TodayLedger';
import { WeeklySummaryView } from './components/WeeklySummaryView';
import { Program15DayView } from './components/Program15DayView';
import { SetupView } from './components/SetupView';
import { ManualEntryModal } from './components/ManualEntryModal';
import { ArchivalReportModal } from './components/ArchivalReportModal';
import { DayData, MealEntry } from './types';
import { INITIAL_DAY_DATA } from './constants/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'daily-log' | 'weekly-summary' | 'modular-program' | 'setup'>('daily-log');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [dayData, setDayData] = useState<DayData>(() => {
    try {
      const saved = localStorage.getItem('chrono_day_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_DAY_DATA;
  });

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('chrono_day_data', JSON.stringify(dayData));
    } catch (e) {
      // ignore
    }
  }, [dayData]);

  // Adjust view mode based on screen width on load
  useEffect(() => {
    if (window.innerWidth < 768) {
      setViewMode('mobile');
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddWater = (amountMl: number) => {
    setDayData((prev) => {
      const updated = Math.max(0, prev.waterIntakeMl + amountMl);
      return { ...prev, waterIntakeMl: updated };
    });
    showToast(amountMl > 0 ? `+${amountMl}mL Quenched into Reservoir` : `${amountMl}mL Calibrated`);
  };

  const handleLogMeal = (mealData: Omit<MealEntry, 'id'>) => {
    const newEntry: MealEntry = {
      ...mealData,
      id: `entry-${Date.now()}`,
    };
    setDayData((prev) => ({
      ...prev,
      meals: [newEntry, ...prev.meals],
    }));
    showToast(`Logged "${newEntry.name}" (+${newEntry.calories} kcal)`);
  };

  const handleQuickAddMacro = (macroType: 'protein' | 'carbs' | 'fats', grams: number) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    let calories = 0;
    let proteinGrams = 0;
    let carbsGrams = 0;
    let fatGrams = 0;
    let label = '';
    let badge: 'STABLE' | 'PEAK FUEL' | 'QUICK BURN' = 'STABLE';

    if (macroType === 'protein') {
      proteinGrams = grams;
      calories = grams * 4;
      label = `Quick Add: +${grams}g Protein`;
      badge = 'PEAK FUEL';
    } else if (macroType === 'carbs') {
      carbsGrams = grams;
      calories = grams * 4;
      label = `Quick Add: +${grams}g Carbs`;
      badge = 'QUICK BURN';
    } else {
      fatGrams = grams;
      calories = grams * 9;
      label = `Quick Add: +${grams}g Healthy Fats`;
      badge = 'STABLE';
    }

    const newEntry: MealEntry = {
      id: `quick-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: label,
      time: timeString,
      category: 'Snack',
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams,
      statusBadge: badge,
      notes: `Single-click quick macro bolus (+${grams}g ${macroType}).`,
    };

    setDayData((prev) => ({
      ...prev,
      meals: [newEntry, ...prev.meals],
    }));

    showToast(`Stamped +${grams}g ${macroType.toUpperCase()} (+${calories} kcal) into Ledger`);
  };

  const handleDeleteMeal = (id: string) => {
    setDayData((prev) => ({
      ...prev,
      meals: prev.meals.filter((m) => m.id !== id),
    }));
    showToast('Entry removed from ledger');
  };

  const handleSaveCalibration = (settings: {
    calorieTarget: number;
    waterTargetMl: number;
    targetProtein: number;
    targetCarbs: number;
    targetFats: number;
  }) => {
    setDayData((prev) => ({
      ...prev,
      ...settings,
    }));
    showToast('Instrument calibrated to new metabolic targets');
  };

  const handleResetFactory = () => {
    setDayData(INITIAL_DAY_DATA);
    showToast('Chronometer reset to factory specifications');
  };

  // Calculated totals
  const totalLoggedCalories = dayData.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = dayData.meals.reduce((sum, m) => sum + m.proteinGrams, 0);
  const totalCarbs = dayData.meals.reduce((sum, m) => sum + m.carbsGrams, 0);
  const totalFats = dayData.meals.reduce((sum, m) => sum + m.fatGrams, 0);
  const expenditureCalories = 1820; // nominal daily baseline expenditure

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1f1b18] flex flex-col font-sans selection:bg-[#feb95f]/30">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#003629] text-white rounded-xl shadow-xl font-mono text-xs font-bold flex items-center gap-2 border border-[#feb95f] animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#feb95f]">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenManualEntry={() => setIsManualModalOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-8 py-4 sm:py-6 flex flex-col gap-6 ${viewMode === 'mobile' ? 'pb-28' : 'pb-16'}`}>
        {/* TOP INSTRUMENT STATUS RIBBON */}
        <div className="w-full bg-[#f5ece7] rounded-xl p-3 sm:p-4 shadow-[0_4px_12px_rgba(31,27,24,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] border border-[#eae1dc] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 relative overflow-hidden">
          {/* Subtle metallic hairline plate accent */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#feb95f]/20 via-transparent to-transparent pointer-events-none blur-2xl" />

          {/* Left: Device identification plate */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#efe6e1] rounded-lg shadow-[inset_0_2px_4px_rgba(37,33,30,0.16)] border border-[#c0c9c3]/50">
              <span className="w-2 h-2 rounded-full bg-[#003629] animate-pulse shadow-[0_0_6px_rgba(0,54,41,0.6)]" />
              <span className="font-mono text-[10px] text-[#003629] tracking-widest uppercase font-bold">
                CHRONO-INSTRUMENT MK. IV
              </span>
              <span className="font-mono text-[9px] text-[#707974] px-0.5">•</span>
              <span className="font-mono text-[10px] text-[#404945] font-bold">SOL {dayData.solNumber}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg shadow-[0_2px_4px_rgba(37,33,30,0.04)] border border-[#eae1dc]">
              <span className="material-symbols-outlined text-[15px] text-[#855400]">verified</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#404945] font-bold">
                CALIBRATION CERTIFIED
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#efe6e1] rounded-lg shadow-[inset_0_1px_2px_rgba(37,33,30,0.12)] border border-[#c0c9c3]/40">
              <span className="font-mono text-[9px] text-[#707974] uppercase tracking-wider font-bold">
                DAILY CEILING
              </span>
              <span className="font-mono text-[10px] text-[#003629] font-bold">
                {dayData.calorieTarget.toLocaleString()} KCAL
              </span>
            </div>
          </div>

          {/* Right: Chrono date cycle switcher */}
          <div className="flex items-center justify-between lg:justify-end gap-2 bg-[#fbf2ed] p-1 rounded-lg shadow-[inset_0_2px_3px_rgba(37,33,30,0.14)] border border-[#eae1dc]">
            <button
              type="button"
              onClick={() => showToast('Displaying certified archival data for Sol 283')}
              className="h-8 px-2 rounded bg-white hover:bg-[#fff8f5] text-[#404945] flex items-center justify-center shadow-sm active:translate-y-0.5 transition-all border border-[#c0c9c3] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span className="font-mono text-[9px] uppercase hidden sm:inline ml-1 font-bold">Sol 283</span>
            </button>

            <div className="px-3 py-0.5 flex flex-col items-center">
              <span className="font-serif text-sm sm:text-base text-[#003629] leading-tight font-bold">
                {dayData.dateLabel}
              </span>
              <span className="font-mono text-[8px] text-[#855400] uppercase tracking-widest font-bold">
                CURRENT CYCLE • TODAY
              </span>
            </div>

            <button
              type="button"
              onClick={() => showToast('Sol 285 is an upcoming chronological cycle')}
              className="h-8 px-2 rounded bg-white opacity-75 hover:opacity-100 text-[#404945] flex items-center justify-center shadow-sm active:translate-y-0.5 transition-all border border-[#c0c9c3] cursor-pointer"
            >
              <span className="font-mono text-[9px] uppercase hidden sm:inline mr-1 font-bold">Sol 285</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Tab 1: DAILY LOG */}
        {activeTab === 'daily-log' && (
          <div className="flex flex-col gap-6">
            {/* If in Desktop Workbench mode */}
            {viewMode === 'desktop' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Station I: Caloric Dial & Macros (4 Cols) */}
                <div className="lg:col-span-4 h-full">
                  <StationCaloricDial
                    loggedCalories={totalLoggedCalories}
                    targetCalories={dayData.calorieTarget}
                    expenditureCalories={expenditureCalories}
                    proteinGrams={totalProtein}
                    targetProtein={dayData.targetProtein}
                    carbsGrams={totalCarbs}
                    targetCarbs={dayData.targetCarbs}
                    fatGrams={totalFats}
                    targetFats={dayData.targetFats}
                  />
                </div>

                {/* Station II: Hydration Reservoir (3 Cols) */}
                <div className="lg:col-span-3 h-full">
                  <StationHydrationReservoir
                    currentWaterMl={dayData.waterIntakeMl}
                    targetWaterMl={dayData.waterTargetMl}
                    onAddWater={handleAddWater}
                  />
                </div>

                {/* Station III: AI Macro Scanner (5 Cols) */}
                <div className="lg:col-span-5 h-full">
                  <StationMacroScanner onLogMeal={handleLogMeal} />
                </div>
              </div>
            ) : (
              /* If in Mobile Pocket Chrono mode (Cassette Stack matching Screen 1 mockup) */
              <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
                {/* Hero Analog Caloric Chronometer */}
                <StationCaloricDial
                  loggedCalories={totalLoggedCalories}
                  targetCalories={dayData.calorieTarget}
                  expenditureCalories={expenditureCalories}
                  proteinGrams={totalProtein}
                  targetProtein={dayData.targetProtein}
                  carbsGrams={totalCarbs}
                  targetCarbs={dayData.targetCarbs}
                  fatGrams={totalFats}
                  targetFats={dayData.targetFats}
                  isCompact={true}
                />

                {/* Tactile Glass Hydration Reservoir Cylinder */}
                <StationHydrationReservoir
                  currentWaterMl={dayData.waterIntakeMl}
                  targetWaterMl={dayData.waterTargetMl}
                  onAddWater={handleAddWater}
                  isCompact={true}
                />

                {/* AI Optical Food Telemetry Scanner Card */}
                <StationMacroScanner onLogMeal={handleLogMeal} isCompact={true} />
              </div>
            )}

            {/* FULL-WIDTH LOWER SECTION: TODAY'S NUTRITION LEDGER */}
            <TodayLedger
              meals={dayData.meals}
              onDeleteMeal={handleDeleteMeal}
              onOpenManualEntry={() => setIsManualModalOpen(true)}
              onOpenExportReport={() => setIsReportModalOpen(true)}
              solNumber={dayData.solNumber}
              onQuickAddMacro={handleQuickAddMacro}
            />
          </div>
        )}

        {/* Tab 2: WEEKLY SUMMARY */}
        {activeTab === 'weekly-summary' && (
          <WeeklySummaryView onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}

        {/* Tab 3: 15-DAY CADENCE */}
        {activeTab === 'modular-program' && <Program15DayView />}

        {/* Tab 4: SETUP & CALIBRATION */}
        {activeTab === 'setup' && (
          <SetupView
            calorieTarget={dayData.calorieTarget}
            waterTargetMl={dayData.waterTargetMl}
            targetProtein={dayData.targetProtein}
            targetCarbs={dayData.targetCarbs}
            targetFats={dayData.targetFats}
            onSaveCalibration={handleSaveCalibration}
            onResetFactory={handleResetFactory}
          />
        )}
      </main>

      {/* Floating Bottom Nav for Mobile / Pocket View */}
      {viewMode === 'mobile' && (
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Modal Dialogs */}
      <ManualEntryModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onSaveMeal={handleLogMeal}
      />

      <ArchivalReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        dayData={dayData}
      />

      {/* Footer memorandum */}
      <footer className="w-full bg-[#fbf2ed] py-8 border-t border-[#eae1dc]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-serif text-lg text-[#003629] font-bold">
              NutritionBudy Instrument Panel
            </span>
            <span className="font-mono text-[10px] text-[#404945] uppercase tracking-wider">
              Tactile Chrono-Nutrition &amp; Metabolic Rhythm Regulator
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-[#707974] uppercase">
              CALIBRATION PROTOCOL V4.2
            </span>
            <span className="font-mono text-[10px] text-[#404945]">
              © 2026 Archival Field Health
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
