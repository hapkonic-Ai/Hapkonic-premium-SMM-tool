import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCompactNumber } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

interface MetricWidgetProps {
  title: string;
  value: number;
  change?: number;
  label?: string;
  icon?: LucideIcon;
  className?: string;
  trend?: "up" | "down" | "neutral";
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  value,
  change,
  label,
  icon: Icon,
  className,
  trend,
}) => {
  const isPositive = trend === "up" || (change && change > 0);
  const isNegative = trend === "down" || (change && change < 0);

  return (
    <GlassCard className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {title}
        </span>
        {Icon && <Icon className="h-4 w-4 text-accent-cyan opacity-70" />}
      </div>
      
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-3xl font-bold tracking-tight text-white">
          {formatCompactNumber(value)}
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
