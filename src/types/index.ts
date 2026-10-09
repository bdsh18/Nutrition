export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export type StatusBadge = 'STABLE' | 'PEAK FUEL' | 'QUICK BURN' | 'LEAN RECOVERY';

export interface MealEntry {
  id: string;
  name: string;
  time: string; // e.g. "07:45 AM"
  category: MealCategory;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  statusBadge: StatusBadge;
  imageUrl?: string;
  notes?: string;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  solNumber: number;
  dateLabel: string; // e.g. "October 24"
  meals: MealEntry[];
  waterIntakeMl: number;
  waterTargetMl: number;
  calorieTarget: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}

export interface WeeklyDayStat {
  dayName: string; // 'M', 'T', 'W', 'T', 'F', 'S', 'S'
  fullDay: string; // 'Monday', etc.
  dateStr: string;
  calories: number;
  waterMl: number;
  targetCal: number;
  type: 'target' | 'deficit' | 'surplus' | 'locked';
  isToday?: boolean;
}

export interface ProgramPrescription {
  time: string;
  title: string;
  proteinGrams: number;
  calories: number;
  hydrationNote: string;
  status: 'completed' | 'in-focus' | 'pending';
}

export interface ProgramDayPlan {
  dayNumber: number;
  title: string;
  subtitle: string;
  regimenNumber: string;
  proteinTarget: number;
  waterTargetMl: number;
  waterNote: string;
  timeline: ProgramPrescription[];
  recipeTitle: string;
  recipeDescription: string;
  recipeVideoImg: string;
  recipeDuration: string;
  ingredients: { name: string; checked: boolean }[];
  isLocked?: boolean;
}

export interface TelemetryScanResult {
  dishName: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  confidence: number;
  category: MealCategory;
  statusBadge: StatusBadge;
  summary: string;
  isSimulated?: boolean;
}
