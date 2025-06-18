"use client";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "blueprint"
    | "electric"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      pulse = false,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      "inline-flex items-center font-medium rounded-full transition-all duration-200",
      pulse && "animate-pulse",
    );

    const variants = {
      default: "bg-slate-800 text-slate-200 border border-slate-600",
      blueprint: cn(
        "bg-blueprint-600 text-white border border-blueprint-500",
        "shadow-sm shadow-blueprint-600/20",
      ),
      electric: cn(
        "bg-gradient-to-r from-electric-blue to-electric-cyan text-slate-900",
        "font-semibold shadow-sm shadow-electric-blue/20",
      ),
      success: "bg-green-600 text-white border border-green-500",
      warning: "bg-yellow-600 text-white border border-yellow-500",
      error: "bg-red-600 text-white border border-red-500",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
