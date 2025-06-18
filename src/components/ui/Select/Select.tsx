"use client";
import { forwardRef, SelectHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "blueprint" | "electric";
  selectSize?: "sm" | "md" | "lg";
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = "default",
      selectSize = "md",
      options,
      placeholder,
      error = false,
      label,
      helperText,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const baseStyles = cn(
      "w-full rounded-lg border transition-all duration-200 appearance-none",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "bg-no-repeat bg-right-3 bg-center",
      "cursor-pointer",
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
      sm: "px-3 py-1.5 text-sm h-8 pr-8",
      md: "px-4 py-2 text-sm h-10 pr-10",
      lg: "px-5 py-3 text-base h-12 pr-12",
    };

    const chevronSvg = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-200 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[selectSize],
              className,
            )}
            style={{ backgroundImage: chevronSvg }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-slate-900 text-slate-200"
              >
                {option.label}
              </option>
            ))}
          </select>
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

Select.displayName = "Select";
