"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

interface PageTransitionsProps {
  children: React.ReactNode;
}

export const PageTransitions = ({ children }: PageTransitionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Entry animation
    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
    );

    // Blueprint reveal effect
    tl.fromTo(
      ".blueprint-reveal",
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
      },
      0.2,
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
};
