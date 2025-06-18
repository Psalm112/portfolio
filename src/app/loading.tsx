"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current || !circuitRef.current || !progressRef.current)
      return;
    const tl = gsap.timeline({ repeat: -1 });

    // Circuit animation
    tl.from(".circuit-path", {
      drawSVG: "0%",
      duration: 2,
      stagger: 0.2,
      ease: "power2.inOut",
    })
      .to(
        ".circuit-node",
        {
          scale: 1.2,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          yoyo: true,
          repeat: 1,
        },
        "-=1",
      )
      .to(
        progressRef.current,
        {
          width: "100%",
          duration: 2,
          ease: "power2.out",
        },
        0,
      );

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 blueprint-bg"
    >
      <div className="text-center">
        {/* Circuit Loading Animation */}
        <div className="relative w-64 h-32 mb-8">
          <svg
            ref={circuitRef}
            className="w-full h-full"
            viewBox="0 0 256 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main circuit paths */}
            <path
              className="circuit-path"
              d="M20 64H60L80 44L100 64H140L160 44L180 64H236"
              stroke="#0070f3"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              className="circuit-path"
              d="M128 20V44M128 84V108"
              stroke="#00d4ff"
              strokeWidth="2"
              fill="none"
            />
            <path
              className="circuit-path"
              d="M80 44V20H176V44M80 84V108H176V84"
              stroke="#00ffff"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Circuit nodes */}
            <circle
              className="circuit-node"
              cx="60"
              cy="64"
              r="3"
              fill="#0070f3"
              opacity="0.7"
            />
            <circle
              className="circuit-node"
              cx="100"
              cy="64"
              r="3"
              fill="#00d4ff"
              opacity="0.7"
            />
            <circle
              className="circuit-node"
              cx="140"
              cy="64"
              r="3"
              fill="#00ffff"
              opacity="0.7"
            />
            <circle
              className="circuit-node"
              cx="180"
              cy="64"
              r="3"
              fill="#00ff88"
              opacity="0.7"
            />

            {/* Microcontroller representation */}
            <rect
              x="118"
              y="54"
              width="20"
              height="20"
              rx="2"
              stroke="#0070f3"
              strokeWidth="1.5"
              fill="rgba(0, 112, 243, 0.1)"
            />
            <rect
              x="121"
              y="57"
              width="14"
              height="14"
              rx="1"
              stroke="#00d4ff"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold electric-text mb-2">
            Initializing Systems
          </h2>
          <p className="text-blueprint-300 text-sm font-mono">
            Compiling experience & expertise...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blueprint-500 to-electric-blue rounded-full w-0"
          />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blueprint-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
