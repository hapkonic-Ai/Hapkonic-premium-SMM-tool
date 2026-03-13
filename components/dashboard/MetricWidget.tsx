import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCompactNumber } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricWidgetProps {
  title: string;
  value: number | string;
  change?: number;
  label?: string;
  icon?: any;
  className?: string;
  trend?: "up" | "down" | "neutral";
  isLoading?: boolean;
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  value,
  change,
  label,
  icon: Icon,
  className,
  trend,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <GlassCard className={cn("flex flex-col gap-1 min-h-[140px]", className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-20 bg-white/5 rounded" />
          <div className="h-8 w-24 bg-white/5 rounded" />
          <div className="h-3 w-16 bg-white/5 rounded" />
        </div>
      </GlassCard>
    );
  }

  const isPositive = trend === "up" || (change !== undefined && change > 0);
  const isNegative = trend === "down" || (change !== undefined && change < 0);

  return (
    <GlassCard className={cn("flex flex-col gap-1 relative overflow-hidden", className)}>
      <div className="flex items-center justify-between z-10">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {title}
        </span>
        {Icon && <div className="text-accent-cyan opacity-70">{Icon}</div>}
      </div>
      
      <div className="mt-2 flex items-baseline gap-2 z-10">
        <h3 className="text-3xl font-bold tracking-tight text-white">
          {typeof value === "number" ? formatCompactNumber(value) : value}
        </h3>
        
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs font-bold",
              isPositive ? "text-accent-green" : "text-accent-pink"
            )}
          >
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-[10px] text-text-muted mt-1 uppercase tracking-tight">
          {label}
        </span>
      )}
      
      {/* Decorative Blur Accent */}
      <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-accent-cyan/5 blur-2xl rounded-full" />
    </GlassCard>
  );
};
