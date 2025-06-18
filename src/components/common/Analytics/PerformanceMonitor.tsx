"use client";

import { useEffect, useState } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export const PerformanceMonitor = () => {
  const { metrics, isMonitoring } = usePerformanceMonitor();
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Only show in development or when debug flag is present
    const isDev = process.env.NODE_ENV === "development";
    const hasDebugFlag = new URLSearchParams(window.location.search).has(
      "debug",
    );
    setShowMonitor(isDev || hasDebugFlag);
  }, []);

  if (!showMonitor || !isMonitoring) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-blueprint-600/50 rounded-lg p-3 text-xs font-mono text-slate-300 z-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-blueprint-400 font-semibold">
          Performance Monitor
        </span>
      </div>

      <div className="space-y-1">
        {metrics.fps && (
          <div className="flex justify-between gap-3">
            <span>FPS:</span>
            <span
              className={
                metrics.fps > 50
                  ? "text-green-400"
                  : metrics.fps > 30
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {metrics.fps}
            </span>
          </div>
        )}

        {metrics.memory && (
          <div className="flex justify-between gap-3">
            <span>Memory:</span>
            <span
              className={
                metrics.memory < 50
                  ? "text-green-400"
                  : metrics.memory < 100
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {metrics.memory.toFixed(1)}MB
            </span>
          </div>
        )}

        {metrics.fcp && (
          <div className="flex justify-between gap-3">
            <span>FCP:</span>
            <span
              className={
                metrics.fcp < 1500
                  ? "text-green-400"
                  : metrics.fcp < 2500
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {metrics.fcp.toFixed(0)}ms
            </span>
          </div>
        )}

        {metrics.lcp && (
          <div className="flex justify-between gap-3">
            <span>LCP:</span>
            <span
              className={
                metrics.lcp < 2500
                  ? "text-green-400"
                  : metrics.lcp < 4000
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {metrics.lcp.toFixed(0)}ms
            </span>
          </div>
        )}

        {typeof metrics.cls === "number" && (
          <div className="flex justify-between gap-3">
            <span>CLS:</span>
            <span
              className={
                metrics.cls < 0.1
                  ? "text-green-400"
                  : metrics.cls < 0.25
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
