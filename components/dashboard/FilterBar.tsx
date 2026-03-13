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
import { 
  X, SlidersHorizontal, ArrowUpRight, ArrowDownRight,
  TrendingUp, Users2, Activity
} from "lucide-react";
import { subDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch("/api/social/accounts");
        if (response.ok) {
          const data = await response.json();
          const platforms = data.map((acc: any) => acc.platform);
          setConnectedPlatforms(platforms);
        }
      } catch (error) {
        console.error("Failed to fetch connections", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, []);

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
            const isConnected = connectedPlatforms.includes(platform.id);

            return (
              <button
                key={platform.id}
                onClick={() => isConnected && togglePlatform(platform.id)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300 relative",
                  isSelected && isConnected
                    ? `bg-white/10 ring-1 ring-white/20 ${platform.color}` 
                    : "text-text-muted hover:bg-white/5",
                  !isConnected && "opacity-20 cursor-not-allowed grayscale"
                )}
                title={isConnected ? platform.id : `${platform.id} (Not Connected)`}
                disabled={!isConnected}
              >
                <Icon className="w-4 h-4" />
                {!isConnected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-pink rounded-full border border-bg-primary" />
                )}
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
            onClick={() => setShowAdvanced(true)}
        >
          <Filter className="w-3 h-3 mr-2" /> More Filters
        </Button>
      </div>

      {/* Advanced Filters Overlay */}
      <AnimatePresence>
        {showAdvanced && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              onClick={() => setShowAdvanced(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md glass border-l border-white/10 z-[101] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-5 h-5 text-accent-cyan" />
                  <h2 className="text-xl font-black gradient-text uppercase tracking-tighter">Strategic Filters</h2>
                </div>
                <button onClick={() => setShowAdvanced(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              <div className="space-y-10">
                {/* Metric Thresholds */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-text-muted">Metric Thresholds</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { label: "High Engagement", icon: Activity, value: "5%+", color: "text-accent-purple" },
                      { label: "Rapid Growth", icon: TrendingUp, value: "12%+", color: "text-accent-green" },
                      { label: "Influencer Reach", icon: Users2, value: "100K+", color: "text-accent-cyan" }
                    ].map((m) => (
                      <button key={m.label} className="flex items-center justify-between p-4 rounded-xl glass-hover border border-white/5 text-left group">
                        <div className="flex items-center gap-3">
                          <m.icon className={cn("w-4 h-4", m.color)} />
                          <span className="text-xs font-bold text-text-secondary group-hover:text-white transition-colors">{m.label}</span>
                        </div>
                        <span className="text-[10px] font-black text-white">{m.value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience Demographics */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-text-muted">Demographic Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {["GEN Z", "MILLENNIALS", "TIER 1 CITIES", "HIGH INCOME", "TECH SAVVY"].map(tag => (
                      <button key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-black tracking-widest text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance Delta */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-text-muted">Performance Variance</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl glass border-accent-green/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight className="w-4 h-4 text-accent-green" />
                        <span className="text-[10px] font-black text-accent-green uppercase tracking-widest">Outperforming</span>
                      </div>
                      <p className="text-[10px] text-text-muted font-bold leading-tight uppercase">Posts exceeding 200% avg base</p>
                    </div>
                    <div className="p-4 rounded-xl glass border-accent-pink/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDownRight className="w-4 h-4 text-accent-pink" />
                        <span className="text-[10px] font-black text-accent-pink uppercase tracking-widest">Underperforming</span>
                      </div>
                      <p className="text-[10px] text-text-muted font-bold leading-tight uppercase">Critical attention required</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                 <Button className="w-full h-12 uppercase font-black tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    APPLY STRATEGIC LAYERS
                 </Button>
                 <button onClick={resetFilters} className="w-full mt-4 text-[9px] font-black uppercase tracking-[3px] text-text-muted hover:text-white transition-colors">
                    CLEAR ALL OVERLAYS
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
