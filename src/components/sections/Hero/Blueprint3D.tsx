"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

export const Blueprint3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!circuitRef.current) return;

      // Animate circuit paths
      const paths = circuitRef.current.querySelectorAll("path");
      const circles = circuitRef.current.querySelectorAll("circle");

      // Initial setup
      gsap.set(paths, {
        strokeDasharray: "1000",
        strokeDashoffset: "1000",
      });

      // Create drawing animation
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      paths.forEach((path, index) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            delay: index * 0.2,
          },
          0,
        );
      });

      // Pulse animation for connection points
      gsap.to(circles, {
        r: 6,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.1,
      });

      return tl;
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!circuitRef.current) return;

    // Electric flow animation
    const electricFlow = () => {
      const paths = circuitRef.current?.querySelectorAll("path");
      if (!paths) return;

      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        const dot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", "#00d4ff");
        dot.setAttribute("filter", "blur(1px)");
        circuitRef.current?.appendChild(dot);

        gsap.fromTo(
          dot,
          {
            motionPath: {
              path: path,
              start: 0,
              end: 1,
            },
            opacity: 1,
            scale: 1,
          },
          {
            motionPath: {
              path: path,
              start: 0,
              end: 1,
            },
            opacity: 0,
            scale: 0.3,
            duration: 3,
            ease: "none",
            onComplete: () => dot.remove(),
          },
        );
      });
    };

    const flowInterval = setInterval(electricFlow, 1000);
    return () => clearInterval(flowInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden opacity-30"
    >
      <svg
        ref={circuitRef}
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="circuitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0070f3" />
            <stop offset="50%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>

        {/* Main Circuit Paths */}
        <g
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        >
          {/* Horizontal main lines */}
          <path d="M 100 200 L 500 200 L 600 300 L 900 300 L 1000 200 L 1800 200" />
          <path d="M 100 500 L 400 500 L 500 600 L 800 600 L 900 500 L 1800 500" />
          <path d="M 100 800 L 600 800 L 700 700 L 1200 700 L 1300 800 L 1800 800" />

          {/* Vertical connections */}
          <path d="M 300 200 L 300 400 L 450 500" />
          <path d="M 700 300 L 700 500 L 850 600" />
          <path d="M 1200 200 L 1200 400 L 1050 500" />
          <path d="M 1500 300 L 1500 600 L 1350 700" />

          {/* Complex interconnections */}
          <path d="M 500 200 L 600 100 L 800 100 L 900 200" />
          <path d="M 600 500 L 700 400 L 900 400 L 1000 500" />
          <path d="M 800 800 L 900 900 L 1100 900 L 1200 800" />

          {/* Microprocessor connections */}
          <path d="M 960 540 L 960 580 M 940 560 L 980 560 M 950 550 L 970 570" />
          <path d="M 1160 340 L 1160 380 M 1140 360 L 1180 360 M 1150 350 L 1170 370" />
        </g>

        {/* Connection Points */}
        <g fill="#00d4ff" filter="url(#glow)">
          <circle cx="300" cy="200" r="4" />
          <circle cx="500" cy="200" r="4" />
          <circle cx="700" cy="300" r="4" />
          <circle cx="900" cy="300" r="4" />
          <circle cx="1200" cy="200" r="4" />
          <circle cx="400" cy="500" r="4" />
          <circle cx="600" cy="600" r="4" />
          <circle cx="800" cy="600" r="4" />
          <circle cx="1000" cy="500" r="4" />
          <circle cx="600" cy="800" r="4" />
          <circle cx="900" cy="700" r="4" />
          <circle cx="1200" cy="700" r="4" />
          <circle cx="1500" cy="800" r="4" />
        </g>

        {/* Microprocessor symbols */}
        <g stroke="#00ff88" strokeWidth="2" fill="none" filter="url(#glow)">
          <rect x="940" y="540" width="40" height="40" rx="4" />
          <rect x="1140" y="340" width="40" height="40" rx="4" />
          <rect x="740" y="740" width="40" height="40" rx="4" />
        </g>
      </svg>
    </div>
  );
};
