"use client";
import { forwardRef, HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { Button } from "../Button/Button";
import { trapFocus } from "@/lib/utils/accessibility";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      size = "md",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4",
      "backdrop-blur-sm backdrop-saturate-150",
      "transition-all duration-300",
      isOpen ? "opacity-100 visible" : "opacity-0 invisible",
    );

    const overlayStyles = cn(
      "absolute inset-0 bg-slate-900/80",
      "transition-opacity duration-300",
      isOpen ? "opacity-100" : "opacity-0",
    );

    const contentStyles = cn(
      "relative bg-slate-900 border border-blueprint-600 rounded-lg",
      "blueprint-bg shadow-2xl shadow-blueprint-600/20",
      "transform transition-all duration-300",
      "max-h-[90vh] overflow-y-auto",
      isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4",
    );

    const sizes = {
      sm: "max-w-sm w-full",
      md: "max-w-md w-full",
      lg: "max-w-lg w-full",
      xl: "max-w-4xl w-full",
      full: "max-w-[95vw] w-full max-h-[95vh]",
    };

    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
      if (isOpen && ref && typeof ref !== "function" && ref.current) {
        const cleanup = trapFocus(ref.current);
        return cleanup;
      }
      return () => {};
    }, [isOpen, ref]);

    if (!isOpen && typeof window !== "undefined") return null;

    const modalContent = (
      <div
        className={baseStyles}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div
          className={overlayStyles}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
        <div
          ref={ref}
          className={cn(contentStyles, sizes[size], className)}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-blueprint-600/30">
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-blueprint-200"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="text-slate-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );

    return typeof window !== "undefined"
      ? createPortal(modalContent, document.body)
      : null;
  },
);

Modal.displayName = "Modal";
