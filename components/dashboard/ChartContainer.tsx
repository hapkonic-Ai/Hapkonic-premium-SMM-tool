"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Download, Maximize2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  className?: string;
  headerActions?: React.ReactNode;
}

export const ChartContainer = ({
  title,
  subtitle,
  children,
  isLoading,
  isEmpty,
  className,
  headerActions,
}: ChartContainerProps) => {
  return (
    <GlassCard className={cn("flex flex-col h-full overflow-hidden", className)}>
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          {headerActions}
          <div className="flex items-center gap-1 glass p-1 rounded-md">
            <button className="p-1 px-1.5 hover:bg-white/5 rounded transition-colors" title="Export Data">
              <Download className="w-3.5 h-3.5 text-text-muted hover:text-accent-cyan" />
            </button>
            <button className="p-1 px-1.5 hover:bg-white/5 rounded transition-colors" title="Expand View">
              <Maximize2 className="w-3.5 h-3.5 text-text-muted hover:text-accent-cyan" />
            </button>
            <button className="p-1 px-1.5 hover:bg-white/5 rounded transition-colors" title="Chart Info">
              <Info className="w-3.5 h-3.5 text-text-muted hover:text-accent-cyan" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Content Area */}
      <div className="flex-1 relative min-h-[300px] w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col gap-4">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ) : isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-text-muted">
              <Info className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-text-secondary">No Data Available</h4>
            <p className="text-xs text-text-muted mt-1 max-w-[200px]">
              We couldn't find any data for the selected period or filters.
            </p>
          </div>
        ) : (
          <div className="h-full w-full">
            {children}
          </div>
        )}
      </div>
    </GlassCard>
  );
};
