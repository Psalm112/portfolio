"use client";
import { forwardRef, HTMLAttributes, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "blueprint" | "electric";
  delay?: number;
  offset?: number;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      position = "top",
      variant = "default",
      delay = 300,
      offset = 8,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
      if (disabled) return;

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        updatePosition();
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0,
        y = 0;

      switch (position) {
        case "top":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.top - tooltipRect.height - offset;
          break;
        case "bottom":
          x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          y = triggerRect.bottom + offset;
          break;
        case "left":
          x = triggerRect.left - tooltipRect.width - offset;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          x = triggerRect.right + offset;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      // Keep tooltip within viewport
      const padding = 8;
      x = Math.max(
        padding,
        Math.min(x, window.innerWidth - tooltipRect.width - padding),
      );
      y = Math.max(
        padding,
        Math.min(y, window.innerHeight - tooltipRect.height - padding),
      );

      setTooltipPosition({ x, y });
    };

    useEffect(() => {
      if (isVisible) {
        updatePosition();
        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        return () => {
          window.removeEventListener("scroll", updatePosition);
          window.removeEventListener("resize", updatePosition);
        };
      }
      return () => {};
    }, [isVisible]);

    const baseTooltipStyles = cn(
      "fixed z-50 px-3 py-2 text-sm rounded-lg shadow-lg pointer-events-none",
      "transition-opacity duration-200",
      "max-w-xs break-words",
      isVisible ? "opacity-100" : "opacity-0",
    );

    const variants = {
      default: "bg-slate-800 text-slate-200 border border-slate-600",
      blueprint: cn(
        "bg-slate-950 text-blueprint-200 border border-blueprint-600",
        "shadow-blueprint-600/20",
      ),
      electric: cn(
        "bg-gradient-to-r from-electric-blue/90 to-electric-cyan/90",
        "text-slate-900 font-medium",
        "shadow-electric-blue/30",
      ),
    };

    const arrowStyles = cn(
      "absolute w-2 h-2 rotate-45",
      variants[variant].includes("gradient")
        ? "bg-electric-blue"
        : variant === "blueprint"
          ? "bg-slate-950 border-blueprint-600"
          : "bg-slate-800 border-slate-600",
    );

    const getArrowPosition = () => {
      switch (position) {
        case "top":
          return "top-full left-1/2 -translate-x-1/2 -mt-1 border-t border-l";
        case "bottom":
          return "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b border-r";
        case "left":
          return "left-full top-1/2 -translate-y-1/2 -ml-1 border-l border-b";
        case "right":
          return "right-full top-1/2 -translate-y-1/2 -mr-1 border-r border-t";
        default:
          return "";
      }
    };

    const tooltip =
      isVisible && typeof window !== "undefined"
        ? createPortal(
            <div
              ref={tooltipRef}
              className={cn(baseTooltipStyles, variants[variant])}
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
              }}
              role="tooltip"
            >
              {content}
              <div className={cn(arrowStyles, getArrowPosition())} />
            </div>,
            document.body,
          )
        : null;

    return (
      <>
        <div
          ref={triggerRef}
          className={cn("inline-block", className)}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
          {...props}
        >
          {children}
        </div>
        {tooltip}
      </>
    );
  },
);

Tooltip.displayName = "Tooltip";
