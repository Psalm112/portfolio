"use client";

import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href.slice(1));
    }
  };

  if (isMobile) {
    return <MobileMenu items={navItems} onItemClick={handleNavClick} />;
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => handleNavClick(item.href)}
          className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
            activeSection === item.href.slice(1)
              ? "text-electric-blue"
              : "text-blueprint-300 hover:text-blueprint-200"
          }`}
        >
          {item.label}
          {/* Active indicator */}
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-electric-blue transform transition-all duration-300 ${
              activeSection === item.href.slice(1) ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      ))}
    </nav>
  );
};
