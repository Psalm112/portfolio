"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "max",
          scrub: 0.3,
        },
      });

      // Animate indicator dot
      gsap.to(indicatorRef.current, {
        x: "calc(100vw - 20px)",
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "max",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 origin-left"
        />
      </div>
      <div
        ref={indicatorRef}
        className="fixed top-2 left-2 w-3 h-3 bg-cyan-400 rounded-full z-50 shadow-lg"
        style={{ transform: "translateX(0)" }}
      />
    </>
  );
};

export default ScrollProgress;
