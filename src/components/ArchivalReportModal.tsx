import React, { useState } from 'react';
import { DayData } from '../types';

interface ArchivalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayData: DayData;
}

export const ArchivalReportModal: React.FC<ArchivalReportModalProps> = ({
  isOpen,
  onClose,
  dayData,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalCalories = dayData.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = dayData.meals.reduce((sum, m) => sum + m.proteinGrams, 0);
  const totalCarbs = dayData.meals.reduce((sum, m) => sum + m.carbsGrams, 0);
  const totalFats = dayData.meals.reduce((sum, m) => sum + m.fatGrams, 0);

  const reportText = `
CHRONO-NUTRITION ARCHIVAL REPORT
================================
Date: ${dayData.dateLabel} (Sol ${dayData.solNumber})
Daily Ceiling Target: ${dayData.calorieTarget} kcal
Logged Energy: ${totalCalories} kcal (${Math.round((totalCalories / dayData.calorieTarget) * 100)}% Consumed)
Balance Status: ${dayData.calorieTarget - totalCalories >= 0 ? `${dayData.calorieTarget - totalCalories} kcal Deficit` : `${totalCalories - dayData.calorieTarget} kcal Surplus`}

HYDRATION RESERVOIR
-------------------
Volume Quenched: ${dayData.waterIntakeMl} mL / ${dayData.waterTargetMl} mL (${Math.round((dayData.waterIntakeMl / dayData.waterTargetMl) * 100)}% Full)

MACRO FUEL PARTITIONS
---------------------
Protein: ${totalProtein}g / ${dayData.targetProtein}g
Carbohydrates: ${totalCarbs}g / ${dayData.targetCarbs}g
Lipids / Fats: ${totalFats}g / ${dayData.targetFats}g

RECORDED INFLUX LEDGER (${dayData.meals.length} ENTRIES)
---------------------------------------
${dayData.meals.map((m, i) => `${i + 1}. [${m.time}] ${m.name} - ${m.calories} kcal (P: ${m.proteinGrams}g, C: ${m.carbsGrams}g, F: ${m.fatGrams}g) [${m.statusBadge}]`).join('\n')}

Cryptographic Hash: 0x9B424A7F3A8C01D
Certified by Chronometer Mk. IV Calibration Protocol
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadFile = () => {
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ChronoFuel_Sol_${dayData.solNumber}_Archival_Log.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-[#fff8f5] rounded-2xl p-6 shadow-2xl border border-[#c0c9c3] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-dashed border-[#c0c9c3] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855400] text-[24px]">verified_user</span>
            <h3 className="font-serif text-2xl text-[#003629] font-bold">
              Archival Chrono-Log Report
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#707974] hover:text-[#1f1b18] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Parchment Certificate View */}
        <div className="p-4 bg-[#fbf2ed] rounded-xl border border-[#eae1dc] shadow-inner font-mono text-xs leading-relaxed text-[#1f1b18] whitespace-pre-wrap select-all overflow-x-auto">
          {reportText}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#c0c9c3] text-[#003629] font-mono text-xs font-bold uppercase hover:bg-[#fbf2ed] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Telemetry'}</span>
          </button>

          <button
            type="button"
            onClick={downloadFile}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white font-mono text-xs font-bold uppercase shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#feb95f]">download</span>
            <span>Download .TXT Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};
