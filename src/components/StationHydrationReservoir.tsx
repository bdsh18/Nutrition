import React, { useState } from 'react';

interface StationHydrationReservoirProps {
  currentWaterMl: number;
  targetWaterMl: number;
  onAddWater: (amountMl: number) => void;
  isCompact?: boolean;
}

export const StationHydrationReservoir: React.FC<StationHydrationReservoirProps> = ({
  currentWaterMl,
  targetWaterMl,
  onAddWater,
  isCompact = false,
}) => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const percentFull = Math.min(100, Math.round((currentWaterMl / (targetWaterMl || 1)) * 100));
  const deficitMl = Math.max(0, targetWaterMl - currentWaterMl);

  const handleDispense = (amount: number, label: string) => {
    onAddWater(amount);
    setLastAction(`${amount > 0 ? '+' : ''}${amount}mL`);
    setTimeout(() => setLastAction(null), 1200);
  };

  return (
    <div className="flex flex-col justify-between bg-[#fff8f5] rounded-xl p-4 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] relative overflow-hidden h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#855400] tracking-widest uppercase font-bold">
            STATION II • APPARATUS
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
            Hydration Reservoir
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {lastAction && (
            <span className="font-mono text-[10px] text-[#004a6b] font-bold animate-bounce bg-[#c8e6ff] px-2 py-0.5 rounded shadow-sm">
              {lastAction}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded bg-[#c8e6ff] text-[#001e2e] font-mono text-[10px] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#95cdf6]">
            {percentFull}% QUENCHED
          </span>
        </div>
      </div>

      {/* Main Glass Apparatus Body (Responsive: Vertical on desktop, or sleek chamber on compact) */}
      <div className="my-auto py-2">
        {/* Desktop Vertical Glass Cylinder + Side Ladder */}
        <div className="hidden sm:flex items-center justify-center gap-4">
          {/* Recessed Glass Tube Housing */}
          <div className="w-32 h-76 rounded-2xl bg-[#eae1dc] shadow-[inset_0_4px_10px_rgba(37,33,30,0.3),inset_0_-2px_4px_rgba(255,255,255,0.7)] p-2 relative flex flex-col justify-end overflow-hidden border border-[#c0c9c3]/40">
            {/* Metallic Cylinder Top Fitting */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#b27626] to-[#653e00] rounded-t-xl shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-20 flex items-center justify-center">
              <div className="w-8 h-1 bg-[#ffddb7]/50 rounded-full" />
            </div>

            {/* Optical Graduated Glass Vessel */}
            <div className="relative w-full h-[94%] rounded-xl overflow-hidden shadow-[inset_2px_0_4px_rgba(255,255,255,0.7),inset_-2px_0_4px_rgba(0,0,0,0.15)] flex flex-col justify-end bg-gradient-to-r from-[#f5ece7]/30 via-transparent to-[#f5ece7]/40">
              {/* Fluid Reservoir with dynamic height */}
              <div
                className="w-full relative bg-gradient-to-t from-[#00324a] via-[#004a6b] to-[#81b9e1]/90 transition-all duration-700 ease-out shadow-[0_0_16px_rgba(0,74,107,0.4)]"
                style={{ height: `${percentFull}%` }}
              >
                {/* Glowing Meniscus / Water Shimmer Surface Wave */}
                <div className="absolute top-0 left-0 right-0 h-3 -translate-y-1.5 flex items-center">
                  <svg className="w-full h-full text-[#95cdf6]" preserveAspectRatio="none" viewBox="0 0 100 12">
                    <path
                      d="M0,6 C25,12 35,0 60,6 C85,12 95,2 100,6 L100,12 L0,12 Z"
                      fill="currentColor"
                      opacity="0.9"
                    />
                  </svg>
                </div>

                {/* Subtle internal glass highlight */}
                <div className="absolute inset-y-0 left-2 w-1.5 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full" />

                {/* Fluid level readout floating inside */}
                <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center text-center">
                  <span className="font-serif text-2xl text-white font-bold leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                    {currentWaterMl.toLocaleString()}
                  </span>
                  <span className="font-mono text-[8px] text-[#c8e6ff] tracking-widest uppercase font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                    ML QUENCHED
                  </span>
                </div>
              </div>

              {/* Graduated Measurement Ticks Overlay Stamped on Glass */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between py-5 px-1.5 pointer-events-none text-[#404945] font-mono text-[9px]">
                {/* 3,000 mL */}
                <div className="flex items-center justify-between border-t border-[#707974]/30 pt-0.5">
                  <span className="text-[8px] font-bold">3,000</span>
                  <span className="w-3 h-px bg-[#707974]" />
                </div>
                {/* 2,500 mL */}
                <div className="flex items-center justify-between border-t border-[#707974]/20 pt-0.5">
                  <span className="text-[8px]">2,500</span>
                  <span className="w-2 h-px bg-[#707974]/60" />
                </div>
                {/* 2,000 mL */}
                <div className="flex items-center justify-between border-t border-[#707974]/30 pt-0.5">
                  <span className="text-[8px] font-bold">2,000</span>
                  <span className="w-3 h-px bg-[#707974]" />
                </div>
                {/* 1,500 mL */}
                <div className="flex items-center justify-between border-t border-[#707974]/20 pt-0.5">
                  <span className="text-[8px]">1,500</span>
                  <span className="w-2 h-px bg-[#707974]/60" />
                </div>
                {/* 1,000 mL */}
                <div className="flex items-center justify-between border-t border-[#707974]/30 pt-0.5">
                  <span className="text-[8px] font-bold">1,000</span>
                  <span className="w-3 h-px bg-[#707974]" />
                </div>
              </div>

              {/* Diagonal Specular Glass Reflection Sheen */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
            </div>

            {/* Metallic Cylinder Bottom Pedestal Mount */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#2a1700] to-[#855400] rounded-b-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
          </div>

          {/* Side Chrono Hydration Pacing Bar */}
          <div className="flex flex-col gap-3 h-76 justify-between py-1">
            <div className="flex flex-col items-start bg-[#fbf2ed] p-2 rounded-lg border border-[#eae1dc] shadow-[inset_0_1px_2px_rgba(37,33,30,0.08)] w-full">
              <span className="font-mono text-[9px] text-[#707974] uppercase font-bold">Deficit</span>
              <span className="font-serif text-lg text-[#855400] font-bold">
                {deficitMl.toLocaleString()} mL
              </span>
            </div>

            {/* Hourly Pace Ladder */}
            <div className="flex flex-col gap-1.5 my-auto bg-[#fbf2ed] p-2.5 rounded-lg border border-[#eae1dc] shadow-[inset_0_1px_2px_rgba(37,33,30,0.08)]">
              <span className="font-mono text-[9px] text-[#404945] uppercase font-bold tracking-wider">
                Hourly Pace
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#003629]" />
                <span className="font-mono text-[10px] text-[#1f1b18]">10:00 • 350ml</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#003629]" />
                <span className="font-mono text-[10px] text-[#1f1b18]">12:30 • 500ml</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#003629]" />
                <span className="font-mono text-[10px] text-[#1f1b18]">14:15 • 250ml</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-50">
                <span className="w-2 h-2 rounded-full bg-[#707974]" />
                <span className="font-mono text-[10px] text-[#707974]">16:00 • Target</span>
              </div>
            </div>

            <div className="flex flex-col items-start bg-[#fbf2ed] p-2 rounded-lg border border-[#eae1dc] shadow-[inset_0_1px_2px_rgba(37,33,30,0.08)] w-full">
              <span className="font-mono text-[9px] text-[#707974] uppercase font-bold">
                Optimal Interval
              </span>
              <span className="font-mono text-[10px] text-[#003629] font-bold">
                250 mL / 45m
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Chamber (As seen in Screen 1 Mockup) */}
        <div className="sm:hidden flex flex-col gap-2">
          <div className="flex justify-between items-center text-[#1f1b18] px-1">
            <span className="font-mono text-[10px] text-[#404945] font-bold uppercase tracking-wider">
              Fluid Quenched: {currentWaterMl} / {targetWaterMl} mL
            </span>
            <span className="font-mono text-[10px] text-[#855400] font-bold">
              {deficitMl} mL Deficit
            </span>
          </div>

          <div className="relative w-full h-24 rounded-lg bg-[#e1d8d3] p-2 shadow-[inset_0_3px_6px_rgba(37,33,30,0.25),inset_0_-1px_0_rgba(255,255,255,0.7)] flex items-center justify-between overflow-hidden border border-[#c0c9c3]">
            {/* Graduated Measurement Ticks & Labels */}
            <div className="flex flex-col justify-between h-full py-0.5 z-20 pointer-events-none pl-1">
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#404945]/40" />
                <span className="font-mono text-[9px] text-[#404945] font-bold">3,000 ml</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-[#404945]/30" />
                <span className="font-mono text-[8px] text-[#404945]/70">2,000 ml</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#404945]/40" />
                <span className="font-mono text-[9px] text-[#404945] font-bold">1,000 ml</span>
              </div>
            </div>

            {/* Horizontal Glass Cylinder Vessel Body */}
            <div className="relative flex-1 h-18 ml-2 rounded-lg bg-white/80 overflow-hidden shadow-[inset_2px_0_4px_rgba(255,255,255,0.8),inset_-2px_0_4px_rgba(0,0,0,0.15),0_2px_5px_rgba(0,0,0,0.1)]">
              {/* Glass Reflection Gloss Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 pointer-events-none z-20" />
              <div className="absolute top-1 left-2 right-2 h-1 bg-white/60 rounded-full blur-[0.5px] z-20 pointer-events-none" />

              {/* Liquid Content */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00324a] via-[#004a6b] to-[#2c698d] transition-all duration-500 shadow-[inset_0_2px_6px_rgba(149,205,246,0.5)]"
                style={{ height: `${percentFull}%` }}
              >
                {/* Fluid Meniscus Highlight */}
                <div className="absolute -top-1 left-0 right-0 h-2 bg-[#95cdf6]/80 rounded-[50%] blur-[0.5px]" />
                <div className="absolute bottom-1 right-2 z-10 flex flex-col items-end">
                  <span className="font-mono text-[9px] text-[#c8e6ff] font-bold tracking-widest">
                    {percentFull}% QUENCHED
                  </span>
                  <span className="font-mono text-[8px] text-white/80">
                    {deficitMl} ml remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TACTILE MECHANICAL DISPENSER SWITCHES */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {/* Push button 1: +250ml Glass */}
        <button
          type="button"
          onClick={() => handleDispense(250, 'Glass')}
          className="py-2.5 px-1 rounded-lg bg-gradient-to-b from-[#dfa54d] to-[#b27626] text-white shadow-[0_3px_6px_rgba(37,33,30,0.18),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transition-all cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[16px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            local_cafe
          </span>
          <span className="font-mono text-[10px] text-white uppercase tracking-wider font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] mt-0.5">
            +250ml
          </span>
          <span className="font-mono text-[8px] text-[#ffddb7] opacity-90 uppercase">
            Glass
          </span>
        </button>

        {/* Push button 2: +500ml Flask */}
        <button
          type="button"
          onClick={() => handleDispense(500, 'Flask')}
          className="py-2.5 px-1 rounded-lg bg-gradient-to-b from-[#dfa54d] to-[#b27626] text-white shadow-[0_3px_6px_rgba(37,33,30,0.18),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transition-all cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[16px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            sports_bar
          </span>
          <span className="font-mono text-[10px] text-white uppercase tracking-wider font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] mt-0.5">
            +500ml
          </span>
          <span className="font-mono text-[8px] text-[#ffddb7] opacity-90 uppercase">
            Flask
          </span>
        </button>

        {/* Correction button: -100ml Adjust */}
        <button
          type="button"
          onClick={() => handleDispense(-100, 'Adjust')}
          className="py-2.5 px-1 rounded-lg bg-[#efe6e1] text-[#404945] shadow-[inset_0_2px_4px_rgba(37,33,30,0.16),inset_0_-1px_0_rgba(255,255,255,0.6)] hover:bg-[#eae1dc] active:scale-[0.98] flex flex-col items-center justify-center transition-all cursor-pointer border border-[#c0c9c3]/50"
        >
          <span className="material-symbols-outlined text-[16px] text-[#707974]">
            remove
          </span>
          <span className="font-mono text-[10px] text-[#1f1b18] uppercase tracking-wider font-bold mt-0.5">
            -100ml
          </span>
          <span className="font-mono text-[8px] text-[#707974] uppercase">
            Adjust
          </span>
        </button>
      </div>
    </div>
  );
};
