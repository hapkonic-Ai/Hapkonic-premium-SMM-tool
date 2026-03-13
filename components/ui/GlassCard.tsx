import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "compact";
  glow?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    const variants = {
      default: "p-6",
      elevated: "p-8 shadow-2xl",
      interactive: "p-6 glass-hover cursor-pointer",
      compact: "p-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "glass relative overflow-hidden rounded-lg transition-all duration-300",
          variants[variant],
          glow && "after:absolute after:inset-0 after:z-[-1] after:bg-accent-cyan/10 after:blur-3xl",
          className
        )}
        {...props}
      >
        {/* Shimmer Border Top */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
        
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
