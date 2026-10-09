import React from 'react';

interface StationCaloricDialProps {
  loggedCalories: number;
  targetCalories: number;
  expenditureCalories: number;
  proteinGrams: number;
  targetProtein: number;
  carbsGrams: number;
  targetCarbs: number;
  fatGrams: number;
  targetFats: number;
  isCompact?: boolean;
}

export const StationCaloricDial: React.FC<StationCaloricDialProps> = ({
  loggedCalories,
  targetCalories,
  expenditureCalories,
  proteinGrams,
  targetProtein,
  carbsGrams,
  targetCarbs,
  fatGrams,
  targetFats,
  isCompact = false,
}) => {
  const remainingCalories = Math.max(0, targetCalories - loggedCalories);
  const burnPercent = Math.min(100, Math.round((loggedCalories / targetCalories) * 100));
  const isSurplus = loggedCalories > targetCalories;
  const surplusKcal = loggedCalories - targetCalories;

  // Arc math: 270 degree sweep
  // Angle for needle: -135 deg (0%) to +135 deg (100%)
  const ratio = Math.min(1.2, loggedCalories / (targetCalories || 1));
  const needleAngle = -135 + ratio * 270;

  // SVG circle calculations for radius 82: circumference is 2 * PI * 82 = ~515
  // We use a sweep of 386 units (~270 deg)
  const maxArcLength = 386;
  const currentArcLength = Math.min(maxArcLength, Math.round(maxArcLength * (loggedCalories / (targetCalories || 1))));

  const proteinPct = Math.min(100, Math.round((proteinGrams / (targetProtein || 1)) * 100));
  const carbsPct = Math.min(100, Math.round((carbsGrams / (targetCarbs || 1)) * 100));
  const fatPct = Math.min(100, Math.round((fatGrams / (targetFats || 1)) * 100));

  return (
    <div className="flex flex-col justify-between bg-[#fff8f5] rounded-xl p-4 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] relative overflow-hidden h-full">
      {/* Decorative brass specular light */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-[#feb95f]/20 to-transparent pointer-events-none blur-2xl" />

      {/* Top Title & Telemetry Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#855400] tracking-widest uppercase font-bold">
            STATION I • TELEMETRY
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
            Caloric Dial &amp; Macros
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-[#f5ece7] font-mono text-[10px] text-[#404945] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-[#c0c9c3]/50">
          {burnPercent}% BURN
        </span>
      </div>

      {/* SKEUOMORPHIC BRASS-RIMMED ROTARY ANALOG GAUGE */}
      <div className="my-2 flex flex-col items-center justify-center relative">
        {/* Outer knurled brass perimeter ring */}
        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2.5 bg-gradient-to-b from-[#dfa54d] via-[#b27626] to-[#653e00] shadow-[0_8px_20px_rgba(37,33,30,0.22),inset_0_2px_2px_rgba(255,255,255,0.7)] flex items-center justify-center relative">
          {/* Secondary Bevel Rim */}
          <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-t from-[#2a1700] to-[#855400] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
            {/* Recessed Parchment Dial Face */}
            <div className="w-full h-full rounded-full bg-[#fbf2ed] shadow-[inset_0_4px_8px_rgba(37,33,30,0.25),inset_0_-1px_1px_rgba(255,255,255,0.8)] relative flex flex-col items-center justify-center overflow-hidden">
              {/* Dial Tick Marks & Circular Arc (Inline SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                {/* Outer Circular Track Background */}
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke="#eae1dc"
                  strokeWidth="8"
                  strokeDasharray="386 150"
                  strokeLinecap="round"
                  transform="rotate(135 100 100)"
                />

                {/* Active Progress Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke={isSurplus ? '#ba1a1a' : '#1b4d3e'}
                  strokeWidth="8"
                  strokeDasharray={`${currentArcLength} 500`}
                  strokeLinecap="round"
                  transform="rotate(135 100 100)"
                  className="transition-all duration-700 ease-out"
                />

                {/* Brass Calibration Ticks */}
                <g stroke="#707974" strokeWidth="1.5" opacity="0.45">
                  <line x1="100" y1="20" x2="100" y2="28" strokeWidth="2" />
                  <line x1="156.6" y1="43.4" x2="150.9" y2="49.1" />
                  <line x1="180" y1="100" x2="172" y2="100" strokeWidth="2" />
                  <line x1="156.6" y1="156.6" x2="150.9" y2="150.9" />
                  <line x1="100" y1="180" x2="100" y2="172" strokeWidth="2" />
                  <line x1="43.4" y1="156.6" x2="49.1" y2="150.9" />
                  <line x1="20" y1="100" x2="28" y2="100" strokeWidth="2" />
                  <line x1="43.4" y1="43.4" x2="49.1" y2="49.1" />
                </g>
              </svg>

              {/* Physical Analog Pointer Needle (Rotated accurately) */}
              <div
                className="absolute w-1.5 h-22 origin-bottom transition-transform duration-700 ease-out pointer-events-none -translate-y-9"
                style={{
                  transform: `rotate(${needleAngle}deg)`,
                }}
              >
                {/* Needle shadow */}
                <div className="absolute inset-0 bg-black/25 blur-[1px] translate-x-0.5 translate-y-0.5 rounded-full" />
                {/* Needle body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#855400] via-[#feb95f] to-[#003629] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  <div className="w-0.5 h-6 bg-[#ffddb7] mx-auto mt-1 rounded-full opacity-90" />
                </div>
              </div>

              {/* Central Milled Brass Pivot Screw Cap */}
              <div className="absolute w-7 h-7 rounded-full bg-gradient-to-b from-[#dfa54d] to-[#653e00] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)] z-10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-t from-[#855400] to-[#feb95f] flex items-center justify-center">
                  <div className="w-2.5 h-0.5 bg-[#2a1700] rounded" />
                </div>
              </div>

              {/* Center dial numerical readout */}
              <div className="relative z-10 flex flex-col items-center mt-10">
                <span className="font-mono text-[9px] text-[#707974] uppercase tracking-wider font-bold">
                  {isSurplus ? 'SURPLUS FLUX' : 'DEFICIT FLUX'}
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#003629] leading-none tracking-tight font-bold my-0.5">
                  {isSurplus ? `+${surplusKcal}` : remainingCalories.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-[#855400] uppercase font-bold tracking-widest">
                  {isSurplus ? 'KCAL SURPLUS' : 'KCAL REMAINING'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom readout plaque */}
        <div className="mt-3 w-full flex items-center justify-around bg-[#fbf2ed] px-3 py-1.5 rounded-lg shadow-[inset_0_2px_3px_rgba(37,33,30,0.12)] border border-[#eae1dc]">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[8px] text-[#707974] uppercase tracking-wider font-bold">
              Logged
            </span>
            <span className="font-sans text-sm sm:text-base text-[#1f1b18] font-bold">
              {loggedCalories.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-6 bg-[#c0c9c3]/60" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[8px] text-[#707974] uppercase tracking-wider font-bold">
              Target
            </span>
            <span className="font-sans text-sm sm:text-base text-[#1f1b18] font-bold">
              {targetCalories.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-6 bg-[#c0c9c3]/60" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[8px] text-[#707974] uppercase tracking-wider font-bold">
              Expenditure
            </span>
            <span className="font-sans text-sm sm:text-base text-[#003629] font-bold">
              {expenditureCalories.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* MACRONUTRIENT GROOVED TRACKS */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#404945] font-bold">
            Fuel Partitions
          </span>
          <span className="font-mono text-[9px] text-[#707974] uppercase font-bold">
            Target Balance
          </span>
        </div>

        {/* Protein Track (Emerald Jade) */}
        <div className="flex flex-col gap-1 bg-[#fbf2ed] p-2 rounded-lg shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] border border-[#eae1dc]">
          <div className="flex justify-between items-center text-[#1f1b18]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#003629] shadow-[0_0_4px_rgba(0,54,41,0.5)]" />
              <span className="font-sans text-xs sm:text-sm text-[#003629] font-bold">Protein</span>
            </div>
            <span className="font-mono text-[10px] text-[#1f1b18]">
              <span className="font-bold text-[#003629]">{proteinGrams}g</span> / {targetProtein}g
            </span>
          </div>
          {/* Debossed grooved track */}
          <div className="w-full h-3 rounded-full bg-[#eae1dc] shadow-[inset_0_2px_3px_rgba(37,33,30,0.24),inset_0_-1px_0_rgba(255,255,255,0.7)] p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#003629] to-[#1b4d3e] shadow-[0_1px_2px_rgba(0,54,41,0.3)] transition-all duration-500 relative"
              style={{ width: `${proteinPct}%` }}
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Carbohydrates Track (Warm Amber Gold) */}
        <div className="flex flex-col gap-1 bg-[#fbf2ed] p-2 rounded-lg shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] border border-[#eae1dc]">
          <div className="flex justify-between items-center text-[#1f1b18]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#feb95f] shadow-[0_0_4px_rgba(254,185,95,0.8)]" />
              <span className="font-sans text-xs sm:text-sm text-[#855400] font-bold">Carbohydrates</span>
            </div>
            <span className="font-mono text-[10px] text-[#1f1b18]">
              <span className="font-bold text-[#855400]">{carbsGrams}g</span> / {targetCarbs}g
            </span>
          </div>
          {/* Debossed grooved track */}
          <div className="w-full h-3 rounded-full bg-[#eae1dc] shadow-[inset_0_2px_3px_rgba(37,33,30,0.24),inset_0_-1px_0_rgba(255,255,255,0.7)] p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#feb95f] to-[#855400] shadow-[0_1px_2px_rgba(133,84,0,0.3)] transition-all duration-500 relative"
              style={{ width: `${carbsPct}%` }}
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Lipids Track (Deep Cerulean Blue) */}
        <div className="flex flex-col gap-1 bg-[#fbf2ed] p-2 rounded-lg shadow-[inset_0_1px_2px_rgba(37,33,30,0.1)] border border-[#eae1dc]">
          <div className="flex justify-between items-center text-[#1f1b18]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004a6b] shadow-[0_0_4px_rgba(0,74,107,0.6)]" />
              <span className="font-sans text-xs sm:text-sm text-[#00324a] font-bold">Lipids &amp; Fats</span>
            </div>
            <span className="font-mono text-[10px] text-[#1f1b18]">
              <span className="font-bold text-[#00324a]">{fatGrams}g</span> / {targetFats}g
            </span>
          </div>
          {/* Debossed grooved track */}
          <div className="w-full h-3 rounded-full bg-[#eae1dc] shadow-[inset_0_2px_3px_rgba(37,33,30,0.24),inset_0_-1px_0_rgba(255,255,255,0.7)] p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#81b9e1] to-[#00324a] shadow-[0_1px_2px_rgba(0,50,74,0.3)] transition-all duration-500 relative"
              style={{ width: `${fatPct}%` }}
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
