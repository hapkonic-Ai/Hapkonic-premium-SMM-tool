"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays, startOfToday, format } from "date-fns";

export type DateRange = {
  from: Date;
  to: Date;
};

interface FilterState {
  dateRange: DateRange;
  selectedPlatforms: string[];
  comparisonMode: boolean;
  
  setDateRange: (range: DateRange) => void;
  togglePlatform: (platform: string) => void;
  setPlatforms: (platforms: string[]) => void;
  setComparisonMode: (mode: boolean) => void;
  resetFilters: () => void;
}

const initialDateRange = {
  from: addDays(startOfToday(), -30),
  to: startOfToday(),
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      dateRange: initialDateRange,
      selectedPlatforms: ["INSTAGRAM", "FACEBOOK", "TWITTER", "LINKEDIN"],
      comparisonMode: false,

      setDateRange: (dateRange) => set({ dateRange }),
      
      togglePlatform: (platform) => set((state) => ({
        selectedPlatforms: state.selectedPlatforms.includes(platform)
          ? state.selectedPlatforms.filter((p) => p !== platform)
          : [...state.selectedPlatforms, platform],
      })),

      setPlatforms: (selectedPlatforms) => set({ selectedPlatforms }),
      
      setComparisonMode: (comparisonMode) => set({ comparisonMode }),

      resetFilters: () => set({
        dateRange: initialDateRange,
        selectedPlatforms: ["INSTAGRAM", "FACEBOOK", "TWITTER", "LINKEDIN"],
        comparisonMode: false,
      }),
    }),
    {
      name: "hapkonic-filters",
    }
  )
);
