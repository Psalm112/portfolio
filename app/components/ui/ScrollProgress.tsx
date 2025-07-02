"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null!);
  const indicatorRef = useRef<HTMLDivElement>(null!);
  const glowRef = useRef<HTMLDivElement>(null!);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Base progress bar scaling
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "power1.out",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const velocity = Math.abs(self.getVelocity()) / 2000;
            gsap.to(glowRef.current, {
              opacity: Math.min(velocity * 1.5, 0.7),
              scaleX: 1 + velocity,
              duration: 0.3,
            });
          },
        },
      });

      // Indicator movement
      gsap.to(indicatorRef.current, {
        x: () => window.innerWidth - 16,
        ease: "power1.out",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      // Indicator pulse
      gsap.to(indicatorRef.current, {
        scale: 1.25,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/40 backdrop-blur-md z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-sm" />
        <div
          ref={progressRef}
          className="relative h-full bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 origin-left shadow-xl"
        />
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 blur-lg"
        />
      </div>

      <div
        ref={indicatorRef}
        className="fixed top-1 left-1 w-4 h-4 z-50"
        style={{ transform: "translateX(0)" }}
      >
        {/* <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </div> */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-cyan-300 font-mono opacity-0 hover:opacity-100 transition-opacity">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      <style jsx>{`
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollProgress;
