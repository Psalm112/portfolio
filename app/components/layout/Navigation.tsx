"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RiHome6Line, RiUser4Line } from "react-icons/ri";
import { HiMiniCog, HiOutlineBriefcase } from "react-icons/hi2";
import { PiEnvelopeDuotone } from "react-icons/pi";
import { BsHddStack } from "react-icons/bs";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  activeSection: string;
}

const navItems = [
  { id: "hero", label: "Home", icon: RiHome6Line },
  { id: "about", label: "About", icon: RiUser4Line },
  { id: "skills", label: "Skills", icon: HiMiniCog },
  { id: "projects", label: "Projects", icon: BsHddStack },
  { id: "experience", label: "Experience", icon: HiOutlineBriefcase },
  { id: "contact", label: "Contact", icon: PiEnvelopeDuotone },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hide/show navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          type: "spring",
          damping: 20,
        }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  className={`relative group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm
                    ${
                      isActive
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-inter hidden lg:block">
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full border border-cyan-400/30"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 flex items-center justify-center shadow-lg md:hidden
          focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoIosClose className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TfiLayoutMenuSeparated className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={navRef}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.3,
              }}
              className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-45 shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700/30">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-lg font-orbitron font-bold text-white">
                    Samuel Oyenuga
                  </h2>
                  <p className="text-sm text-gray-400 font-inter mt-1">
                    Multi-Disciplinary Engineer
                  </p>
                </motion.div>
              </div>

              {/* Navigation Items */}
              <nav className="py-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.15 }}
                      className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-all duration-300
                        ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-400/10 to-blue-400/10 text-cyan-400 border-r-2 border-cyan-400"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                        }
                        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-inset`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-inter font-medium">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-gray-500 font-jetbrains">
                    Bridging Hardware & Software
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
