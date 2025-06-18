"use client";

import { useState, useEffect } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { Navigation } from "./Navigation/Navigation";
import { ThemeToggle } from "./ThemeToggle";
import { gsap } from "gsap";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useScrollTrigger(
    { y: -100, opacity: 0 },
    { start: "top top", end: "+=100", scrub: false },
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-blueprint-400/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-blueprint">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blueprint-600 rounded border border-electric-blue flex items-center justify-center">
              <span className="text-white font-bold font-mono text-sm">EN</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-blueprint-200">
                Engineer
              </h1>
              <p className="text-xs text-blueprint-400 font-mono">
                Frontend • Embedded • Comm
              </p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
