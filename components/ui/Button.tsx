import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
        secondary: "glass border-glass-border text-white hover:bg-glass-hover hover:border-accent-cyan",
        ghost: "bg-transparent text-white hover:bg-white/10",
        danger: "bg-accent-pink/20 border border-accent-pink/50 text-accent-pink hover:bg-accent-pink/30",
        outline: "bg-transparent border border-glass-border text-white hover:border-accent-cyan",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-6 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
