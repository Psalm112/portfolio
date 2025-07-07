"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null!);
  const indicatorRef = useRef<HTMLDivElement>(null!);
  const glowRef = useRef<HTMLDivElement>(null!);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!progressRef.current) return;

    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);

    setScrollProgress(progress);

    // Update progress bar directly for better performance
    progressRef.current.style.transform = `scaleX(${progress})`;

    // Update indicator position
    if (indicatorRef.current) {
      const maxX = window.innerWidth - 16;
      indicatorRef.current.style.transform = `translateX(${progress * maxX}px)`;
    }

    // Handle scroll velocity for glow effect
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
        glowRef.current.style.transform = "scaleX(1)";
      }
    }, 150);
  }, []);

  useEffect(() => {
    // Use native scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Optimized GSAP animations with better cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Indicator pulse animation (only when not scrolling)
      const pulseAnimation = gsap.to(indicatorRef.current, {
        scale: 1.25,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
        paused: true,
      });

      // Start pulse when not scrolling
      const startPulse = () => {
        if (!isScrolling) {
          pulseAnimation.play();
        }
      };

      const stopPulse = () => {
        pulseAnimation.pause();
        gsap.set(indicatorRef.current, { scale: 1 });
      };

      // Handle scroll state changes
      if (isScrolling) {
        stopPulse();
      } else {
        startPulse();
      }

      return () => {
        pulseAnimation.kill();
      };
    });

    return () => ctx.revert();
  }, [isScrolling]);

  // Handle glow effect during scroll
  useEffect(() => {
    if (glowRef.current && isScrolling) {
      gsap.to(glowRef.current, {
        opacity: 0.7,
        scaleX: 1.2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isScrolling]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/40 backdrop-blur-md z-50 performance-optimized">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-sm" />
        <div
          ref={progressRef}
          className="relative h-full bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 origin-left shadow-xl"
          style={{ transform: "scaleX(0)" }}
        />
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 blur-lg"
          style={{ opacity: 0, transform: "scaleX(1)" }}
        />
      </div>

      <div
        ref={indicatorRef}
        className="fixed top-1 left-1 w-4 h-4 z-50 performance-optimized"
        style={{ transform: "translateX(0)" }}
      >
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-cyan-300 font-mono opacity-0 hover:opacity-100 transition-opacity">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;
