"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxElementsProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  trigger?: string;
}

export const ParallaxElements = ({
  children,
  speed = 0.5,
  direction = "up",
  trigger,
}: ParallaxElementsProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let yPercent = 0;
    let xPercent = 0;

    switch (direction) {
      case "up":
        yPercent = -100 * speed;
        break;
      case "down":
        yPercent = 100 * speed;
        break;
      case "left":
        xPercent = -100 * speed;
        break;
      case "right":
        xPercent = 100 * speed;
        break;
    }

    const animation = gsap.to(element, {
      yPercent,
      xPercent,
      ease: "none",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed, direction, trigger]);

  return (
    <div ref={elementRef} className="will-change-transform">
      {children}
    </div>
  );
};

// Circuit Board Background Component
export const CircuitBoardParallax = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <ParallaxElements speed={0.2} direction="up">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <defs>
            <pattern
              id="circuitPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="2" fill="#00d4ff" />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.5"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </ParallaxElements>

      <ParallaxElements speed={0.3} direction="down">
        <div className="absolute top-1/4 left-1/4 w-32 h-32">
          <div className="w-full h-full border-2 border-electric-blue/30 rounded-lg rotate-45 animate-pulse" />
        </div>
      </ParallaxElements>

      <ParallaxElements speed={0.4} direction="right">
        <div className="absolute top-3/4 right-1/4 w-24 h-24">
          <div
            className="w-full h-full border border-electric-cyan/40 rounded-full animate-spin"
            style={{ animationDuration: "10s" }}
          />
        </div>
      </ParallaxElements>
    </div>
  );
};
