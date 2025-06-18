"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "blueprint" | "electric";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      error = false,
      leftIcon,
      rightIcon,
      label,
      helperText,
      errorMessage,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      "w-full rounded-lg border transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "placeholder:text-slate-400",
    );

    const variants = {
      default: cn(
        "bg-slate-900 border-slate-600 text-slate-200",
        "focus:border-blueprint-500 focus:ring-blueprint-500/20",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      ),
      blueprint: cn(
        "bg-slate-950 border-blueprint-600 text-blueprint-200",
        "focus:border-blueprint-400 focus:ring-blueprint-400/20",
        "shadow-inner shadow-blueprint-950/50",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      ),
      electric: cn(
        "bg-slate-900 border-electric-blue/30 text-slate-200",
        "focus:border-electric-blue focus:ring-electric-blue/20",
        "shadow-sm shadow-electric-blue/10",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      ),
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-5 py-3 text-base h-12",
    };

    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-200 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <div className={iconSizes[inputSize]}>{leftIcon}</div>
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[inputSize],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              <div className={iconSizes[inputSize]}>{rightIcon}</div>
            </div>
          )}
        </div>
        {(helperText || errorMessage) && (
          <p
            className={cn(
              "mt-1 text-sm",
              error ? "text-red-400" : "text-slate-400",
            )}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
