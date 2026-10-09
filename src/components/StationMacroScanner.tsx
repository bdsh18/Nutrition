import React, { useState, useRef } from 'react';
import { ASSETS, SAMPLE_PRESET_SCANS } from '../constants/mockData';
import { MealEntry, TelemetryScanResult } from '../types';
import { scanFoodTelemetry } from '../services/geminiService';

interface StationMacroScannerProps {
  onLogMeal: (meal: Omit<MealEntry, 'id'>) => void;
  isCompact?: boolean;
}

export const StationMacroScanner: React.FC<StationMacroScannerProps> = ({
  onLogMeal,
  isCompact = false,
}) => {
  const [currentImage, setCurrentImage] = useState<string>(ASSETS.eggAvocadoToast);
  const [scanResult, setScanResult] = useState<TelemetryScanResult>(SAMPLE_PRESET_SCANS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64 = evt.target?.result as string;
      setCurrentImage(base64);
      setIsCustomUpload(true);
      performAIScan(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const performAIScan = async (base64Img: string, mimeType: string = 'image/jpeg', hint?: string) => {
    setIsScanning(true);
    setNotification('Sensors focusing... AI spectral chromatography in progress');
    try {
      const result = await scanFoodTelemetry(base64Img, hint, mimeType);
      setScanResult(result);
      setNotification(`Telemetry verified: ${result.dishName} (${result.confidence}% confidence)`);
    } catch (err) {
      setNotification('Optical sensor calibrated to baseline');
    } finally {
      setIsScanning(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const selectPreset = (preset: TelemetryScanResult, imgUrl: string) => {
    setCurrentImage(imgUrl);
    setScanResult(preset);
    setIsCustomUpload(false);
    setShowPresets(false);
    setNotification(`Telemetry calibrated to ${preset.dishName}`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleConfirmLog = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    onLogMeal({
      name: scanResult.dishName,
      time: timeString,
      category: scanResult.category || 'Lunch',
      calories: scanResult.calories,
      proteinGrams: scanResult.proteinGrams,
      carbsGrams: scanResult.carbsGrams,
      fatGrams: scanResult.fatGrams,
      statusBadge: scanResult.statusBadge || 'PEAK FUEL',
      imageUrl: currentImage,
      notes: scanResult.summary,
    });

    setNotification(`Stamping "${scanResult.dishName}" into Chrono-Ledger!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col justify-between bg-[#fff8f5] rounded-xl p-4 sm:p-6 shadow-[0_2px_4px_rgba(37,33,30,0.04),0_8px_16px_rgba(37,33,30,0.06)] border border-[#eae1dc] relative overflow-hidden h-full">
      {/* Hidden file input for custom food photos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Header with Live focus badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-[#855400] tracking-widest uppercase font-bold">
              STATION III • OPTICAL SPECTROMETRY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#003629] font-bold">
            AI Macro Scanner
          </h2>
        </div>

        {/* Live focus indicator */}
        <div className="px-2.5 py-1 rounded bg-[#1b4d3e] text-white flex items-center gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] border border-[#002117]">
          <span className="w-2 h-2 rounded-full bg-[#feb95f] animate-pulse" />
          <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
            LIVE FOCUS
          </span>
        </div>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="mb-2 px-3 py-1 bg-[#feb95f]/20 border border-[#feb95f]/40 rounded text-[#855400] font-mono text-[10px] flex items-center justify-between transition-all">
          <span className="truncate">{notification}</span>
          <span className="material-symbols-outlined text-[14px]">sensors</span>
        </div>
      )}

      {/* CAMERA OPTICAL VIEWFINDER CONSOLE */}
      <div className="w-full relative rounded-xl overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.35),0_2px_6px_rgba(37,33,30,0.1)] bg-[#eae1dc] group border border-[#c0c9c3]">
        {/* Food Scan Subject Image */}
        <img
          src={currentImage}
          alt={scanResult.dishName}
          className="w-full h-48 sm:h-56 object-cover filter brightness-[0.96] contrast-[1.05] transition-all duration-300"
        />

        {/* Animated Scanning Laser Line */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#feb95f] to-transparent shadow-[0_0_12px_#feb95f] animate-[bounce_1.5s_infinite]" />
            <div className="absolute inset-0 bg-[#003629]/20 backdrop-blur-[1px]" />
          </div>
        )}

        {/* High Precision Optical Reticle & Telemetry Overlays */}
        <div className="absolute inset-0 pointer-events-none p-3 sm:p-4 flex flex-col justify-between z-20">
          {/* Reticle Top Brackets & Sensor Readout */}
          <div className="flex justify-between items-start">
            <div className="w-6 h-6 border-t-2 border-l-2 border-[#feb95f] shadow-[0_0_8px_rgba(254,185,95,0.8)]" />
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/65 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono text-[9px] sm:text-[10px] border border-white/10">
              <span>ISO 400</span>
              <span>•</span>
              <span>F/2.8</span>
              <span>•</span>
              <span className="text-[#feb95f] font-bold">{scanResult.confidence}% CONF</span>
            </div>
            <div className="w-6 h-6 border-t-2 border-r-2 border-[#feb95f] shadow-[0_0_8px_rgba(254,185,95,0.8)]" />
          </div>

          {/* Central Aiming Crosshair Target */}
          <div className="self-center flex items-center justify-center relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#feb95f]/70 flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-[#feb95f] shadow-[0_0_6px_#feb95f]" />
            </div>
            <span className="absolute -bottom-5 px-1.5 py-0.5 rounded bg-black/75 text-[8px] sm:text-[9px] font-mono text-[#ffddb7] tracking-wider uppercase border border-[#feb95f]/30">
              OBJECT ACQUIRED
            </span>
          </div>

          {/* Bottom Reticle Brackets */}
          <div className="flex justify-between items-end">
            <div className="w-6 h-6 border-b-2 border-l-2 border-[#feb95f] shadow-[0_0_8px_rgba(254,185,95,0.8)]" />
            <span className="font-mono text-[8px] sm:text-[9px] text-white/90 uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              SPECTRAL CHROMATOGRAPHY ACTIVE
            </span>
            <div className="w-6 h-6 border-b-2 border-r-2 border-[#feb95f] shadow-[0_0_8px_rgba(254,185,95,0.8)]" />
          </div>
        </div>

        {/* Quick preset selector overlay toggler */}
        <div className="absolute top-2 right-2 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="p-1 rounded bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm shadow border border-white/20 text-xs flex items-center gap-1 cursor-pointer"
            title="Choose sample meals"
          >
            <span className="material-symbols-outlined text-[16px] text-[#feb95f]">collections</span>
          </button>
        </div>
      </div>

      {/* Preset dropdown drawer */}
      {showPresets && (
        <div className="my-2 p-2 bg-[#fbf2ed] rounded-lg border border-[#c0c9c3] shadow-md flex flex-col gap-1.5">
          <span className="font-mono text-[9px] text-[#855400] uppercase font-bold">
            Select Calibration Subject:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => selectPreset(SAMPLE_PRESET_SCANS[0], ASSETS.eggAvocadoToast)}
              className="text-left p-1.5 rounded bg-white hover:bg-[#efe6e1] text-[11px] font-sans font-semibold truncate border border-[#eae1dc] cursor-pointer"
            >
              🥑 Poached Egg & Avocado
            </button>
            <button
              type="button"
              onClick={() => selectPreset(SAMPLE_PRESET_SCANS[1], ASSETS.salmonBowl)}
              className="text-left p-1.5 rounded bg-white hover:bg-[#efe6e1] text-[11px] font-sans font-semibold truncate border border-[#eae1dc] cursor-pointer"
            >
              🐟 Salmon Quinoa Crucible
            </button>
            <button
              type="button"
              onClick={() => selectPreset(SAMPLE_PRESET_SCANS[2], ASSETS.steelCutOats)}
              className="text-left p-1.5 rounded bg-white hover:bg-[#efe6e1] text-[11px] font-sans font-semibold truncate border border-[#eae1dc] cursor-pointer"
            >
              🫐 Berry Acai Crucible
            </button>
            <button
              type="button"
              onClick={() => selectPreset(SAMPLE_PRESET_SCANS[3], ASSETS.steakAsparagus)}
              className="text-left p-1.5 rounded bg-white hover:bg-[#efe6e1] text-[11px] font-sans font-semibold truncate border border-[#eae1dc] cursor-pointer"
            >
              🥩 Sirloin & Roasted Yam
            </button>
          </div>
        </div>
      )}

      {/* TELEMETRY RECOGNITION PLAQUE & COMPOSITION */}
      <div className="mt-2 bg-[#fbf2ed] p-3 sm:p-3.5 rounded-xl shadow-[inset_0_2px_4px_rgba(37,33,30,0.12),inset_0_-1px_0_rgba(255,255,255,0.7)] flex flex-col gap-1 border border-[#eae1dc]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[9px] text-[#855400] font-bold uppercase tracking-widest">
              Identified Influx
            </span>
            <span className="font-serif text-base sm:text-lg text-[#003629] font-bold truncate">
              {scanResult.dishName}
            </span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white shadow-[0_1px_2px_rgba(37,33,30,0.1)] border border-[#c0c9c3]/50 flex-shrink-0">
            <span className="material-symbols-outlined text-[#003629] text-[15px]">check_circle</span>
            <span className="font-mono text-[9px] text-[#003629] font-bold">VERIFIED</span>
          </div>
        </div>

        {/* Partition breakdown badges */}
        <div className="grid grid-cols-4 gap-1.5 mt-1">
          <div className="p-1 sm:p-1.5 rounded bg-white flex flex-col items-center shadow-[0_1px_2px_rgba(37,33,30,0.06)] border border-[#eae1dc]">
            <span className="font-mono text-[8px] text-[#707974] uppercase font-bold">Cal</span>
            <span className="font-sans text-xs sm:text-sm text-[#003629] font-bold">
              {scanResult.calories}
            </span>
          </div>
          <div className="p-1 sm:p-1.5 rounded bg-white flex flex-col items-center shadow-[0_1px_2px_rgba(37,33,30,0.06)] border border-[#eae1dc]">
            <span className="font-mono text-[8px] text-[#003629] uppercase font-bold">Protein</span>
            <span className="font-sans text-xs sm:text-sm text-[#003629] font-bold">
              {scanResult.proteinGrams}g
            </span>
          </div>
          <div className="p-1 sm:p-1.5 rounded bg-white flex flex-col items-center shadow-[0_1px_2px_rgba(37,33,30,0.06)] border border-[#eae1dc]">
            <span className="font-mono text-[8px] text-[#855400] uppercase font-bold">Carbs</span>
            <span className="font-sans text-xs sm:text-sm text-[#855400] font-bold">
              {scanResult.carbsGrams}g
            </span>
          </div>
          <div className="p-1 sm:p-1.5 rounded bg-white flex flex-col items-center shadow-[0_1px_2px_rgba(37,33,30,0.06)] border border-[#eae1dc]">
            <span className="font-mono text-[8px] text-[#00324a] uppercase font-bold">Lipids</span>
            <span className="font-sans text-xs sm:text-sm text-[#00324a] font-bold">
              {scanResult.fatGrams}g
            </span>
          </div>
        </div>
      </div>

      {/* ACTION PUSH BUTTONS */}
      <div className="flex items-center gap-2 pt-2">
        {/* Primary Stamp Button */}
        <button
          type="button"
          onClick={handleConfirmLog}
          className="flex-1 py-3 px-3 rounded-lg bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_4px_8px_rgba(0,54,41,0.3),inset_0_1px_0_rgba(186,238,217,0.4)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#002117]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#feb95f]">add_task</span>
          <span>Confirm &amp; Log Meal</span>
        </button>

        {/* Auxiliary Photo Upload / Camera Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload photo"
          title="Snap or upload meal photo for Gemini AI analysis"
          className="w-12 h-12 rounded-lg bg-[#efe6e1] hover:bg-[#eae1dc] text-[#404945] flex items-center justify-center shadow-[0_2px_4px_rgba(37,33,30,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] active:translate-y-0.5 transition-all cursor-pointer border border-[#c0c9c3]"
        >
          <span className="material-symbols-outlined text-[20px] text-[#855400]">
            photo_camera
          </span>
        </button>
      </div>
    </div>
  );
};
