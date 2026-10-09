import React, { useState } from 'react';

interface SetupViewProps {
  calorieTarget: number;
  waterTargetMl: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  onSaveCalibration: (settings: {
    calorieTarget: number;
    waterTargetMl: number;
    targetProtein: number;
    targetCarbs: number;
    targetFats: number;
  }) => void;
  onResetFactory: () => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  calorieTarget,
  waterTargetMl,
  targetProtein,
  targetCarbs,
  targetFats,
  onSaveCalibration,
  onResetFactory,
}) => {
  const [calories, setCalories] = useState<number>(calorieTarget);
  const [water, setWater] = useState<number>(waterTargetMl);
  const [protein, setProtein] = useState<number>(targetProtein);
  const [carbs, setCarbs] = useState<number>(targetCarbs);
  const [fats, setFats] = useState<number>(targetFats);
  const [goal, setGoal] = useState<'deficit' | 'maintenance' | 'surplus'>('maintenance');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCalibration({
      calorieTarget: calories,
      waterTargetMl: water,
      targetProtein: protein,
      targetCarbs: carbs,
      targetFats: fats,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 py-4">
      {/* Header Banner */}
      <div className="w-full bg-[#f5ece7] rounded-xl p-5 shadow-[0_4px_12px_rgba(31,27,24,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] border border-[#eae1dc] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-[24px] text-[#feb95f]">tune</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-wider">
              HARDWARE CALIBRATION
            </span>
            <h2 className="font-serif text-2xl text-[#003629] font-bold">
              Instrument Calibration &amp; Targets
            </h2>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-[#1b4d3e] text-white rounded-xl font-mono text-[11px] font-bold flex items-center justify-between shadow">
          <span>✓ Telemetry targets successfully calibrated and saved to chronometer.</span>
          <span className="material-symbols-outlined text-[18px]">verified</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSave} className="bg-[#fff8f5] rounded-xl p-6 shadow-md border border-[#eae1dc] flex flex-col gap-6">
        {/* Goal selector */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] text-[#855400] uppercase font-bold tracking-wider">
            Metabolic Regimen Objective
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'deficit', label: 'Deficit (-400 kcal)' },
              { id: 'maintenance', label: 'Maintenance (Nominal)' },
              { id: 'surplus', label: 'Surplus (+300 kcal)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGoal(item.id as any)}
                className={`py-2 px-2 rounded-lg font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  goal === item.id
                    ? 'bg-[#1b4d3e] text-white shadow-inner border border-[#002117]'
                    : 'bg-[#fbf2ed] text-[#404945] border border-[#c0c9c3]/50 hover:bg-[#efe6e1]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Caloric Ceiling Slider & Number */}
        <div className="flex flex-col gap-2 p-4 bg-[#fbf2ed] rounded-xl border border-[#eae1dc]">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-[#003629] font-bold uppercase">
              Daily Caloric Ceiling (KCAL)
            </span>
            <span className="font-serif text-xl font-bold text-[#855400]">
              {calories.toLocaleString()} kcal
            </span>
          </div>
          <input
            type="range"
            min={1200}
            max={4000}
            step={50}
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full accent-[#003629] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-[#707974]">
            <span>1,200 kcal</span>
            <span>2,200 kcal (Nominal)</span>
            <span>4,000 kcal</span>
          </div>
        </div>

        {/* Hydration Reservoir Target */}
        <div className="flex flex-col gap-2 p-4 bg-[#fbf2ed] rounded-xl border border-[#eae1dc]">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[11px] text-[#00324a] font-bold uppercase">
              Hydration Reservoir Capacity (mL)
            </span>
            <span className="font-serif text-xl font-bold text-[#004a6b]">
              {water.toLocaleString()} mL
            </span>
          </div>
          <input
            type="range"
            min={1500}
            max={5000}
            step={100}
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="w-full accent-[#004a6b] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-[#707974]">
            <span>1,500 mL</span>
            <span>3,000 mL (Standard)</span>
            <span>5,000 mL</span>
          </div>
        </div>

        {/* Target Macronutrients Split */}
        <div className="flex flex-col gap-3 p-4 bg-[#fbf2ed] rounded-xl border border-[#eae1dc]">
          <span className="font-mono text-[10px] text-[#855400] font-bold uppercase tracking-wider">
            Target Macro Partitioning (Grams)
          </span>

          <div className="grid grid-cols-3 gap-3">
            {/* Protein */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#003629] font-bold uppercase">
                Protein (g)
              </label>
              <input
                type="number"
                min={40}
                max={300}
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full p-2 bg-white rounded-lg border border-[#c0c9c3] font-mono text-sm text-[#003629] font-bold shadow-inner"
              />
            </div>

            {/* Carbs */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#855400] font-bold uppercase">
                Carbohydrates (g)
              </label>
              <input
                type="number"
                min={20}
                max={500}
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="w-full p-2 bg-white rounded-lg border border-[#c0c9c3] font-mono text-sm text-[#855400] font-bold shadow-inner"
              />
            </div>

            {/* Fats */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#00324a] font-bold uppercase">
                Lipids / Fats (g)
              </label>
              <input
                type="number"
                min={20}
                max={200}
                value={fats}
                onChange={(e) => setFats(Number(e.target.value))}
                className="w-full p-2 bg-white rounded-lg border border-[#c0c9c3] font-mono text-sm text-[#00324a] font-bold shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onResetFactory}
            className="py-3 px-4 rounded-xl bg-[#efe6e1] text-[#404945] font-mono text-[11px] uppercase font-bold hover:bg-[#eae1dc] transition-all cursor-pointer border border-[#c0c9c3]"
          >
            Reset Factory Specs
          </button>

          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white font-mono text-[12px] uppercase font-bold shadow-[0_4px_8px_rgba(0,54,41,0.3)] hover:brightness-105 active:translate-y-0.5 transition-all cursor-pointer border border-[#002117]"
          >
            Lock &amp; Calibrate Chronometer
          </button>
        </div>
      </form>
    </div>
  );
};
