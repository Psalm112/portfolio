"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    if (!progressRef.current) return;

    const scrollTop = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(scrollTop / documentHeight, 1));

    setScrollProgress(progress);
    setIsVisible(scrollTop > 100);

    // Update progress bar with hardware acceleration
    progressRef.current.style.transform = `translateX(${
      (progress - 1) * 100
    }%)`;
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    updateProgress();
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
      className={`fixed top-0 left-0 right-0 h-1 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20" />

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg transform translate-x-[-100%] will-change-transform"
        style={{
          transformOrigin: "left center",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 blur-sm transform translate-x-[-100%] will-change-transform"
        style={{
          transform: `translateX(${(scrollProgress - 1) * 100}%)`,
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
