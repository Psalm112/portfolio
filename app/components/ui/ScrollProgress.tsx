"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const scrollableHeight = documentHeight - windowHeight;

    if (scrollableHeight <= 0) return;

    const progress = Math.max(0, Math.min(scrollTop / scrollableHeight, 1));

    setScrollProgress(progress);
    setIsVisible(scrollTop > 50);

    // Update progress bar with hardware acceleration
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress})`;
    }

    if (glowRef.current) {
      glowRef.current.style.transform = `scaleX(${progress})`;
      glowRef.current.style.opacity = isVisible ? "0.6" : "0";
    }
  }, [isVisible]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    // Initial calculation
    updateProgress();

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateProgress]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-transparent z-[60] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm" />

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg transform-gpu origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: "left center",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
      />

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400/60 via-blue-500/60 to-purple-500/60 blur-sm transform-gpu origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: "left center",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
