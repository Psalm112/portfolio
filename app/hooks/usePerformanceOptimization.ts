"use client";

import { useEffect, useRef, useCallback } from "react";

interface PerformanceOptions {
  throttleMs?: number;
  debounceMs?: number;
}

export const usePerformanceOptimization = (
  options: PerformanceOptions = {}
) => {
  const {
    throttleMs = 16, // ~60fps
    debounceMs = 100,
  } = options;

  const rafRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastCallRef = useRef<number>(0);

  // Throttled function wrapper
  const throttle = useCallback(
    (func: (...args: unknown[]) => void) => {
      return (...args: unknown[]) => {
        const now = Date.now();

        if (now - lastCallRef.current >= throttleMs) {
          func(...args);
          lastCallRef.current = now;
        } else {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }

          rafRef.current = requestAnimationFrame(() => {
            func(...args);
            lastCallRef.current = Date.now();
          });
        }
      };
    },
    [throttleMs]
  );

  // Debounced function wrapper
  const debounce = useCallback(
    (func: (...args: unknown[]) => void, delay: number = debounceMs) => {
      return (...args: unknown[]) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          func(...args);
        }, delay);
      };
    },
    [debounceMs]
  );

  // Memory management
  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    throttle,
    debounce,
    cleanup,
  };
};
