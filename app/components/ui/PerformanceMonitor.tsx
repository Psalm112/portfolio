"use client";

import { useEffect, useState, useRef } from "react";

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  domLoad: number;
  windowLoad: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const collectMetrics = () => {
      if (!("performance" in window)) return;

      const perfData = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");

      const fcp =
        paintEntries.find((entry) => entry.name === "first-contentful-paint")
          ?.startTime || 0;
      const lcp =
        paintEntries.find((entry) => entry.name === "largest-contentful-paint")
          ?.startTime || 0;

      const newMetrics: PerformanceMetrics = {
        fcp: Math.round(fcp),
        lcp: Math.round(lcp),
        fid: 0, // Will be updated by observer
        cls: 0, // Will be updated by observer
        ttfb: Math.round(perfData?.responseStart - perfData?.requestStart || 0),
        domLoad: Math.round(
          perfData?.domContentLoadedEventEnd -
            perfData?.domContentLoadedEventStart || 0
        ),
        windowLoad: Math.round(
          perfData?.loadEventEnd - perfData?.loadEventStart || 0
        ),
      };

      setMetrics(newMetrics);
    };

    // Collect initial metrics
    setTimeout(collectMetrics, 1000);

    // Set up performance observers
    if ("PerformanceObserver" in window) {
      // First Input Delay
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "first-input") {
            const firstInputEntry = entry as PerformanceEventTiming;
            setMetrics((prev) =>
              prev
                ? {
                    ...prev,
                    fid: Math.round(
                      firstInputEntry.processingStart -
                        firstInputEntry.startTime
                    ),
                  }
                : null
            );
          }
        });
      });

      try {
        observerRef.current.observe({ entryTypes: ["first-input"] });
      } catch {
        console.warn("PerformanceObserver not supported");
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isVisible]);

  if (!isVisible || !metrics) return null;

  const getPerformanceGrade = (metric: keyof PerformanceMetrics): string => {
    const value = metrics[metric];
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    // Only check metrics that have thresholds
    if (metric === "domLoad" || metric === "windowLoad") return "N/A";

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (value <= threshold.good) return "🟢 Good";
    if (value <= threshold.poor) return "🟡 Needs Improvement";
    return "🔴 Poor";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-xs font-mono z-50 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-cyan-400 font-bold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span
            className={metrics.fcp <= 1800 ? "text-green-400" : "text-red-400"}
          >
            {metrics.fcp}ms {getPerformanceGrade("fcp")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>LCP:</span>
          <span
            className={metrics.lcp <= 2500 ? "text-green-400" : "text-red-400"}
          >
            {metrics.lcp}ms {getPerformanceGrade("lcp")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>FID:</span>
          <span
            className={metrics.fid <= 100 ? "text-green-400" : "text-red-400"}
          >
            {metrics.fid}ms {getPerformanceGrade("fid")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>TTFB:</span>
          <span
            className={metrics.ttfb <= 800 ? "text-green-400" : "text-red-400"}
          >
            {metrics.ttfb}ms {getPerformanceGrade("ttfb")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>DOM Load:</span>
          <span className="text-gray-300">{metrics.domLoad}ms</span>
        </div>

        <div className="flex justify-between">
          <span>Window Load:</span>
          <span className="text-gray-300">{metrics.windowLoad}ms</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700 text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
