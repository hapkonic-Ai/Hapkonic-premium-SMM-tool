import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        active: "border-accent-green/50 bg-accent-green/10 text-accent-green",
        pending: "border-accent-orange/50 bg-accent-orange/10 text-accent-orange",
        planned: "border-accent-purple/50 bg-accent-purple/10 text-accent-purple",
        alert: "border-accent-pink/50 bg-accent-pink/10 text-accent-pink pulse",
        info: "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
