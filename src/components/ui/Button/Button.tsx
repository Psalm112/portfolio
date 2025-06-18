"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./Button.module.css";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "electric";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueprint-500",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "relative overflow-hidden",
      fullWidth && "w-full",
    );
    const variants = {
      primary: cn(
        "bg-blueprint-600 text-white hover:bg-blueprint-700",
        "shadow-lg shadow-blueprint-600/20 hover:shadow-blueprint-600/30",
        "border border-blueprint-500",
      ),
      secondary: cn(
        "bg-slate-800 text-slate-200 hover:bg-slate-700",
        "border border-slate-600 hover:border-slate-500",
      ),
      outline: cn(
        "bg-transparent text-blueprint-300 hover:text-blueprint-200",
        "border border-blueprint-600 hover:border-blueprint-500",
        "hover:bg-blueprint-600/10",
      ),
      ghost: cn(
        "bg-transparent text-slate-300 hover:text-white",
        "hover:bg-slate-800/50",
      ),
      electric: cn(
        "bg-gradient-to-r from-electric-blue to-electric-cyan text-slate-900",
        "hover:from-electric-cyan hover:to-electric-green",
        "shadow-lg shadow-electric-blue/20 hover:shadow-electric-blue/40",
        "font-semibold",
        styles.electric,
      ),
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-6 py-3 text-base h-12",
      xl: "px-8 py-4 text-lg h-14",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "cursor-wait",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {variant === "electric" && <div className={styles.electricGlow} />}

        {isLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
