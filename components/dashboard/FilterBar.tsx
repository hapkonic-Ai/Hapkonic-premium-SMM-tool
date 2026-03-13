"use client";

import React from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import { 
  Calendar, Layers, Instagram, Facebook, Twitter, Linkedin, 
  Check, ChevronDown, Filter, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { subDays, format } from "date-fns";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { id: "INSTAGRAM", icon: Instagram, color: "text-accent-purple" },
  { id: "FACEBOOK", icon: Facebook, color: "text-blue-500" },
  { id: "TWITTER", icon: Twitter, color: "text-cyan-400" },
  { id: "LINKEDIN", icon: Linkedin, color: "text-blue-600" },
];

export const FilterBar = () => {
  const { 
    dateRange, 
    setDateRange, 
    selectedPlatforms, 
    togglePlatform, 
    resetFilters 
  } = useFilterStore();

  const handleDateChange = (days: string) => {
    const from = subDays(new Date(), parseInt(days));
    setDateRange({ from, to: new Date() });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass border-white/5 rounded-2xl mb-8">
      <div className="flex items-center gap-4">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-muted" />
          <Select onValueChange={handleDateChange} defaultValue="30">
            <SelectTrigger className="w-[180px] h-9 glass-border bg-white/5">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="180">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-6 w-px bg-white/10 mx-2" />

        {/* Platform Selector */}
        <div className="flex items-center gap-2">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  isSelected 
                    ? `bg-white/10 ring-1 ring-white/20 ${platform.color}` 
                    : "text-text-muted hover:bg-white/5 hover:text-white"
                )}
                title={platform.id}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
            variant="ghost" 
            size="sm" 
            className="text-[10px] font-bold uppercase tracking-widest h-9 border-none hover:bg-white/5"
            onClick={resetFilters}
        >
          <Trash2 className="w-3 h-3 mr-2" /> Reset
        </Button>
        <Button 
            variant="outline" 
            size="sm" 
            className="text-[10px] font-bold uppercase tracking-widest h-9 border-white/10 hover:bg-white/5"
        >
          <Filter className="w-3 h-3 mr-2" /> More Filters
        </Button>
      </div>
    </div>
  );
};
