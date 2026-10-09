import React, { useState } from 'react';
import { MealCategory, MealEntry, StatusBadge } from '../types';

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMeal: (meal: Omit<MealEntry, 'id'>) => void;
}

export const ManualEntryModal: React.FC<ManualEntryModalProps> = ({
  isOpen,
  onClose,
  onSaveMeal,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MealCategory>('Lunch');
  const [calories, setCalories] = useState<number>(500);
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(45);
  const [fats, setFats] = useState<number>(15);
  const [statusBadge, setStatusBadge] = useState<StatusBadge>('PEAK FUEL');
  const [time, setTime] = useState<string>('12:30 PM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveMeal({
      name: name.trim(),
      time,
      category,
      calories: Number(calories) || 0,
      proteinGrams: Number(protein) || 0,
      carbsGrams: Number(carbs) || 0,
      fatGrams: Number(fats) || 0,
      statusBadge,
      notes: 'Manual entry stamped into chronological journal.',
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#fff8f5] rounded-2xl p-6 shadow-2xl border border-[#c0c9c3] flex flex-col gap-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-[#c0c9c3] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855400] text-[22px]">draw</span>
            <h3 className="font-serif text-2xl text-[#003629] font-bold">
              Add Manual Ledger Entry
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Meal Name */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#855400] font-bold uppercase">
              Dish / Influx Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grilled Salmon & Warm Quinoa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2.5 rounded-lg bg-[#fbf2ed] border border-[#c0c9c3] font-sans text-sm text-[#1f1b18] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#855400]"
            />
          </div>

          {/* Category & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-[#404945] font-bold uppercase">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MealCategory)}
                className="p-2 rounded-lg bg-[#fbf2ed] border border-[#c0c9c3] font-mono text-xs text-[#1f1b18] shadow-inner"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Mid-Cycle Snack</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-[#404945] font-bold uppercase">
                Timestamp
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2 rounded-lg bg-[#fbf2ed] border border-[#c0c9c3] font-mono text-xs text-[#1f1b18] shadow-inner"
              />
            </div>
          </div>

          {/* Energy & Macros */}
          <div className="grid grid-cols-4 gap-2 bg-[#fbf2ed] p-3 rounded-xl border border-[#eae1dc]">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#003629] font-bold uppercase">
                Calories
              </label>
              <input
                type="number"
                min={0}
                required
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="p-1.5 rounded bg-white border border-[#c0c9c3] font-mono text-xs font-bold text-[#003629]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#003629] font-bold uppercase">
                Protein (g)
              </label>
              <input
                type="number"
                min={0}
                required
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="p-1.5 rounded bg-white border border-[#c0c9c3] font-mono text-xs font-bold text-[#003629]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#855400] font-bold uppercase">
                Carbs (g)
              </label>
              <input
                type="number"
                min={0}
                required
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
                className="p-1.5 rounded bg-white border border-[#c0c9c3] font-mono text-xs font-bold text-[#855400]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] text-[#00324a] font-bold uppercase">
                Fat (g)
              </label>
              <input
                type="number"
                min={0}
                required
                value={fats}
                onChange={(e) => setFats(Number(e.target.value))}
                className="p-1.5 rounded bg-white border border-[#c0c9c3] font-mono text-xs font-bold text-[#00324a]"
              />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#404945] font-bold uppercase">
              Metabolic Classification
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['STABLE', 'PEAK FUEL', 'QUICK BURN'] as StatusBadge[]).map((badge) => (
                <button
                  key={badge}
                  type="button"
                  onClick={() => setStatusBadge(badge)}
                  className={`py-1.5 px-2 rounded-lg font-mono text-[9px] font-bold uppercase border cursor-pointer ${
                    statusBadge === badge
                      ? 'bg-[#1b4d3e] text-white border-[#002117] shadow-sm'
                      : 'bg-[#fbf2ed] text-[#404945] border-[#c0c9c3]'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-[#efe6e1] text-[#404945] font-mono text-xs uppercase font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#1b4d3e] to-[#003629] text-white font-mono text-xs uppercase font-bold shadow-md cursor-pointer"
            >
              Stamp Entry Into Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
