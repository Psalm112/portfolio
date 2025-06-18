"use client";

import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

interface MobileMenuProps {
  items: Array<{ label: string; href: string }>;
  onItemClick: (href: string) => void;
}

export const MobileMenu = ({ items, onItemClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.fromTo(
          ".mobile-menu",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
        gsap.fromTo(
          ".mobile-menu-item",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.1 },
        );
      }
    },
    { dependencies: [isOpen] },
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleItemClick = (href: string) => {
    onItemClick(href);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-blueprint-200 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-blueprint-200 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-blueprint-200 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 top-20 bg-slate-950/95 backdrop-blur-md">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => handleItemClick(item.href)}
                className="mobile-menu-item text-xl font-medium text-blueprint-200 hover:text-electric-blue transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
