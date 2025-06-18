"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export const HeroAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circuitBoardRef = useRef<SVGSVGElement>(null);
  const dataFlowRef = useRef<SVGSVGElement>(null);
  const processorRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<SVGSVGElement>(null);

  // Advanced circuit board animation with data flow
  const animateCircuitBoard = useCallback(() => {
    if (!circuitBoardRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    const paths = circuitBoardRef.current.querySelectorAll(".circuit-path");
    const nodes = circuitBoardRef.current.querySelectorAll(".circuit-node");
    const dataPackets =
      circuitBoardRef.current.querySelectorAll(".data-packet");

    // Initialize circuit paths
    gsap.set(paths, {
      strokeDasharray: (i, el) => (el as SVGPathElement).getTotalLength(),
      strokeDashoffset: (i, el) => (el as SVGPathElement).getTotalLength(),
    });

    // Circuit activation sequence
    paths.forEach((path, index) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          delay: index * 0.2,
        },
        0,
      );
    });

    // Node activation with electric pulse
    tl.to(
      nodes,
      {
        scale: 1.3,
        filter: "brightness(1.5) drop-shadow(0 0 10px #00d4ff)",
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
      },
      1,
    );

    // Data packet flow animation
    dataPackets.forEach((packet, index) => {
      const path = paths[index % paths.length] as SVGPathElement;
      if (path) {
        tl.to(
          packet,
          {
            motionPath: {
              path: path,
              autoRotate: false,
              alignOrigin: [0.5, 0.5],
            },
            duration: 2,
            ease: "none",
            repeat: -1,
            delay: index * 0.3,
          },
          1.5,
        );
      }
    });

    return tl;
  }, []);

  // Advanced processor animation with heat simulation
  const animateProcessor = useCallback(() => {
    if (!processorRef.current) return;

    const cores = processorRef.current.querySelectorAll(".processor-core");
    const cache = processorRef.current.querySelectorAll(".cache-level");
    const instructions = processorRef.current.querySelectorAll(".instruction");

    const tl = gsap.timeline({ repeat: -1 });

    // Core activation sequence
    cores.forEach((core, index) => {
      tl.to(
        core,
        {
          background: "linear-gradient(45deg, #00d4ff, #00ffff)",
          scale: 1.05,
          duration: 0.5,
          delay: index * 0.1,
        },
        0,
      ).to(
        core,
        {
          background: "linear-gradient(45deg, #0070f3, #38abff)",
          scale: 1,
          duration: 0.5,
          delay: 0.3,
        },
        ">",
      );
    });

    // Cache level animations
    cache.forEach((level, index) => {
      tl.to(
        level,
        {
          opacity: 0.8,
          boxShadow: "0 0 15px rgba(0, 212, 255, 0.6)",
          duration: 0.3,
          yoyo: true,
          repeat: 3,
          delay: index * 0.2,
        },
        1,
      );
    });

    // Instruction pipeline animation
    tl.to(
      instructions,
      {
        x: "+=100px",
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.in",
      },
      2,
    ).set(instructions, { x: 0, opacity: 1 }, ">");

    return tl;
  }, []);

  // Communication signal propagation animation
  const animateSignalPropagation = useCallback(() => {
    if (!signalRef.current) return;

    const waves = signalRef.current.querySelectorAll(".signal-wave");
    const antennas = signalRef.current.querySelectorAll(".antenna");
    const packets = signalRef.current.querySelectorAll(".data-packet-rf");

    const tl = gsap.timeline({ repeat: -1 });

    // Antenna transmission
    antennas.forEach((antenna, index) => {
      tl.to(
        antenna,
        {
          filter: "brightness(1.5) drop-shadow(0 0 20px #00ff88)",
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          delay: index * 1,
        },
        0,
      );
    });

    // Signal wave propagation
    waves.forEach((wave, index) => {
      tl.fromTo(
        wave,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 3,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
          delay: index * 0.3,
        },
        0.5,
      );
    });

    // RF packet transmission
    tl.to(
      packets,
      {
        x: "300px",
        opacity: 0.3,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.inOut",
      },
      1,
    ).set(packets, { x: 0, opacity: 1 }, ">");

    return tl;
  }, []);

  // Scroll-triggered section animations
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Parallax effect for floating elements
      const floatingElements =
        containerRef.current.querySelectorAll(".floating-element");

      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: `${-50 * (index + 1)}px`,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Complex technical diagram reveal
      const diagrams = containerRef.current.querySelectorAll(".tech-diagram");
      diagrams.forEach((diagram) => {
        ScrollTrigger.create({
          trigger: diagram,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              diagram.querySelectorAll(".diagram-part"),
              {
                opacity: 0,
                scale: 0.8,
                rotation: -15,
              },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
              },
            );
          },
        });
      });

      // Performance optimization: disable animations on low-end devices
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      if (prefersReducedMotion.matches) {
        gsap.set("*", { duration: 0.01 });
      }
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const animations = [
      animateCircuitBoard(),
      animateProcessor(),
      animateSignalPropagation(),
    ];

    return () => {
      animations.forEach((animation) => {
        animation?.kill();
      });
    };
  }, [animateCircuitBoard, animateProcessor, animateSignalPropagation]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Advanced Circuit Board Illustration */}
      <svg
        ref={circuitBoardRef}
        className="absolute top-10 right-10 w-80 h-60 opacity-40"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="circuit-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit Board Base */}
        <rect
          width="380"
          height="280"
          x="10"
          y="10"
          fill="#0f172a"
          stroke="#1e293b"
          strokeWidth="2"
          rx="8"
        />

        {/* Circuit Paths */}
        <g filter="url(#circuit-glow)">
          <path
            className="circuit-path"
            d="M 50 100 L 150 100 L 200 150 L 300 150"
            stroke="#00d4ff"
            strokeWidth="3"
            fill="none"
          />
          <path
            className="circuit-path"
            d="M 50 200 L 120 200 L 180 140 L 300 140"
            stroke="#00ff88"
            strokeWidth="3"
            fill="none"
          />
          <path
            className="circuit-path"
            d="M 100 50 L 100 120 L 180 200 L 280 200"
            stroke="#ffff00"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* Circuit Nodes */}
        <g className="circuit-nodes">
          <circle
            className="circuit-node"
            cx="50"
            cy="100"
            r="6"
            fill="#00d4ff"
          />
          <circle
            className="circuit-node"
            cx="150"
            cy="100"
            r="6"
            fill="#00d4ff"
          />
          <circle
            className="circuit-node"
            cx="200"
            cy="150"
            r="6"
            fill="#00d4ff"
          />
          <circle
            className="circuit-node"
            cx="300"
            cy="150"
            r="6"
            fill="#00d4ff"
          />
        </g>

        {/* Data Packets */}
        <g className="data-packets">
          <circle className="data-packet" r="4" fill="#ffffff" opacity="0.8" />
          <circle className="data-packet" r="4" fill="#ffffff" opacity="0.8" />
          <circle className="data-packet" r="4" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Microprocessor */}
        <rect
          x="170"
          y="120"
          width="60"
          height="60"
          fill="#1a1a1a"
          stroke="#00d4ff"
          strokeWidth="2"
          rx="4"
        />
        <text
          x="200"
          y="155"
          textAnchor="middle"
          fill="#00d4ff"
          fontSize="10"
          fontFamily="JetBrains Mono"
        >
          MCU
        </text>
      </svg>

      {/* Advanced Processor Animation */}
      <div
        ref={processorRef}
        className="absolute bottom-20 left-10 w-64 h-48 floating-element"
      >
        <div className="relative w-full h-full bg-slate-900/80 rounded-lg border border-blueprint-600/30 p-4">
          <div className="text-xs text-blueprint-300 font-mono mb-2">
            ARM Cortex-M7 @ 480MHz
          </div>

          {/* Processor Cores */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="processor-core h-8 bg-slate-800 rounded border border-blueprint-500/30 flex items-center justify-center text-xs text-blueprint-200">
              Core 0
            </div>
            <div className="processor-core h-8 bg-slate-800 rounded border border-blueprint-500/30 flex items-center justify-center text-xs text-blueprint-200">
              Core 1
            </div>
          </div>

          {/* Cache Levels */}
          <div className="space-y-1 mb-3">
            <div className="cache-level h-2 bg-blueprint-800/50 rounded-full">
              <div className="h-full w-3/4 bg-blueprint-500 rounded-full"></div>
            </div>
            <div className="cache-level h-2 bg-blueprint-800/50 rounded-full">
              <div className="h-full w-1/2 bg-blueprint-400 rounded-full"></div>
            </div>
          </div>

          {/* Instruction Pipeline */}
          <div className="flex space-x-1">
            <div className="instruction w-3 h-3 bg-electric-blue rounded-full"></div>
            <div className="instruction w-3 h-3 bg-electric-cyan rounded-full"></div>
            <div className="instruction w-3 h-3 bg-electric-green rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Communication Signal Animation */}
      <svg
        ref={signalRef}
        className="absolute top-1/2 left-1/4 w-96 h-32 opacity-30 floating-element"
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* RF Antennas */}
        <g className="antennas">
          <path
            className="antenna"
            d="M 50 80 L 50 40 M 45 45 L 55 45 M 47 50 L 53 50"
            stroke="#00ff88"
            strokeWidth="3"
            fill="none"
          />
          <path
            className="antenna"
            d="M 350 80 L 350 40 M 345 45 L 355 45 M 347 50 L 353 50"
            stroke="#00ff88"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* Signal Waves */}
        <g className="signal-waves">
          <circle
            className="signal-wave"
            cx="50"
            cy="60"
            r="15"
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.6"
          />
          <circle
            className="signal-wave"
            cx="50"
            cy="60"
            r="25"
            fill="none"
            stroke="#00ff88"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle
            className="signal-wave"
            cx="350"
            cy="60"
            r="15"
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>

        {/* Data Packets */}
        <g className="rf-packets">
          <rect
            className="data-packet-rf"
            x="80"
            y="55"
            width="20"
            height="10"
            fill="#ffffff"
            opacity="0.8"
            rx="2"
          />
          <rect
            className="data-packet-rf"
            x="120"
            y="55"
            width="20"
            height="10"
            fill="#ffffff"
            opacity="0.8"
            rx="2"
          />
        </g>

        {/* Protocol Labels */}
        <text
          x="200"
          y="100"
          textAnchor="middle"
          fill="#00ff88"
          fontSize="12"
          fontFamily="JetBrains Mono"
        >
          LoRaWAN | WiFi 6 | 5G NR
        </text>
      </svg>

      {/* Floating Technical Diagrams */}
      <div className="tech-diagram absolute top-1/4 right-1/4 w-48 h-32 floating-element">
        <div className="relative w-full h-full">
          <div className="diagram-part absolute top-0 left-0 w-12 h-12 bg-blueprint-600/20 border border-blueprint-400 rounded flex items-center justify-center">
            <span className="text-xs text-blueprint-300">ADC</span>
          </div>
          <div className="diagram-part absolute top-0 right-0 w-12 h-12 bg-blueprint-600/20 border border-blueprint-400 rounded flex items-center justify-center">
            <span className="text-xs text-blueprint-300">DAC</span>
          </div>
          <div className="diagram-part absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-blueprint-600/20 border border-blueprint-400 rounded flex items-center justify-center">
            <span className="text-xs text-blueprint-300">DSP</span>
          </div>
        </div>
      </div>

      {/* Embedded System Components */}
      <div className="tech-diagram absolute bottom-1/4 right-10 w-40 h-40 floating-element">
        <div className="relative w-full h-full">
          {/* System on Chip */}
          <div className="diagram-part absolute inset-4 bg-slate-900/80 border-2 border-electric-blue rounded-lg p-2">
            <div className="text-xs text-electric-blue font-mono mb-1 text-center">
              SoC
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="diagram-part w-3 h-3 bg-electric-cyan/50 rounded-sm"></div>
              <div className="diagram-part w-3 h-3 bg-electric-green/50 rounded-sm"></div>
              <div className="diagram-part w-3 h-3 bg-electric-yellow/50 rounded-sm"></div>
              <div className="diagram-part w-3 h-3 bg-electric-orange/50 rounded-sm"></div>
              <div className="diagram-part w-3 h-3 bg-electric-red/50 rounded-sm"></div>
              <div className="diagram-part w-3 h-3 bg-electric-blue/50 rounded-sm"></div>
            </div>
          </div>

          {/* Peripheral Connections */}
          <div className="diagram-part absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-electric-blue"></div>
          <div className="diagram-part absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-electric-cyan"></div>
          <div className="diagram-part absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-2 bg-electric-green"></div>
          <div className="diagram-part absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-2 bg-electric-yellow"></div>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="absolute top-10 left-10 w-48 h-20 bg-slate-900/60 backdrop-blur-sm border border-blueprint-600/30 rounded p-3 floating-element">
        <div className="text-xs text-blueprint-300 font-mono mb-2">
          System Performance
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-blueprint-400">CPU</span>
            <span className="text-electric-blue">67%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full">
            <div className="h-full w-2/3 bg-gradient-to-r from-electric-blue to-electric-cyan rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
