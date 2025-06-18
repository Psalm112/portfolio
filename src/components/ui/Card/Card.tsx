"use client";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blueprint" | "glass" | "electric";
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "blueprint";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      shadow = "md",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = "rounded-lg border transition-all duration-200";

    const variants = {
      default: "bg-slate-900 border-slate-700",
      blueprint: cn(
        "bg-slate-950 border-blueprint-600",
        "blueprint-bg backdrop-blur-sm",
        "relative overflow-hidden",
      ),
      glass: cn(
        "bg-slate-900/80 border-slate-600/50",
        "backdrop-blur-lg backdrop-saturate-150",
      ),
      electric: cn(
        "bg-gradient-to-br from-slate-900 to-slate-800",
        "border-electric-blue/30 relative",
        "before:absolute before:inset-0 before:rounded-lg",
        "before:bg-gradient-to-r before:from-electric-blue/5 before:to-electric-cyan/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      ),
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const shadows = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      blueprint: "shadow-blueprint",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          shadows[shadow],
          className,
        )}
        {...props}
      >
        {variant === "blueprint" && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern
                  id="blueprint-grid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
            </svg>
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

Card.displayName = "Card";
