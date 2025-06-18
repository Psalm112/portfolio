"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">(
    "default",
  );
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (
      prefersReducedMotion ||
      isMobile ||
      !followerRef.current ||
      !dotRef.current
    )
      return;

    const follower = followerRef.current;
    const dot = dotRef.current;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation loop
    const animateFollower = () => {
      gsap.to(follower, {
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(dot, {
        x: mousePosition.x - 2,
        y: mousePosition.y - 2,
        duration: 0.1,
      });

      requestAnimationFrame(animateFollower);
    };

    // Mouse enter/leave handlers for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      if (tagName === "a" || tagName === "button" || target.onclick) {
        setCursorType("pointer");
        setIsHovering(true);
      } else if (tagName === "input" || tagName === "textarea") {
        setCursorType("text");
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setCursorType("default");
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Start animation loop
    animateFollower();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [prefersReducedMotion, isMobile, mousePosition]);

  if (prefersReducedMotion || isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">
      {/* Main follower */}
      <div
        ref={followerRef}
        className={`absolute w-10 h-10 border-2 border-electric-blue rounded-full transition-all duration-200 ${
          isHovering
            ? "scale-150 border-electric-cyan shadow-[0_0_20px_rgba(0,212,255,0.5)]"
            : "scale-100"
        } ${cursorType === "pointer" ? "bg-electric-blue/20" : ""}`}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="absolute w-1 h-1 bg-electric-blue rounded-full"
      />

      {/* Circuit lines that follow */}
      <svg
        className="absolute w-20 h-20 opacity-30"
        style={{
          left: `${mousePosition.x - 40}px`,
          top: `${mousePosition.y - 40}px`,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      >
        <circle
          cx="40"
          cy="40"
          r="15"
          fill="none"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-spin"
          style={{ animationDuration: "3s" }}
        />
        <defs>
          <linearGradient
            id="circuitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
