"use client";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "blueprint" | "electric";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      label,
      animated = false,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const baseStyles = "w-full rounded-full overflow-hidden";

    const variants = {
      default: "bg-slate-800",
      blueprint: "bg-slate-950 border border-blueprint-600/30",
      electric: "bg-slate-900 border border-electric-blue/20",
    };

    const sizes = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    const barVariants = {
      default: "bg-blueprint-600",
      blueprint: cn(
        "bg-gradient-to-r from-blueprint-500 to-blueprint-400",
        "shadow-sm shadow-blueprint-500/50",
      ),
      electric: cn(
        "bg-gradient-to-r from-electric-blue to-electric-cyan",
        "shadow-sm shadow-electric-blue/50",
      ),
    };

    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-200">
              {label || "Progress"}
            </span>
            {showLabel && (
              <span className="text-sm text-slate-400">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out",
              barVariants[variant],
              animated && "animate-pulse",
            )}
            style={{ width: `${percentage}%` }}
          >
            {variant === "electric" && (
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            )}
          </div>
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";
