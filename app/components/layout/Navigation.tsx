"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBars,
  FaXmark,
  FaUser,
  FaDiagramProject,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa6";
import { IoMdCog } from "react-icons/io";
import { FaHome } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  activeSection: string;
}

const navItems = [
  { id: "hero", label: "Home", icon: FaHome },
  { id: "about", label: "About", icon: FaUser },
  { id: "skills", label: "Skills", icon: IoMdCog },
  { id: "projects", label: "Projects", icon: FaDiagramProject },
  { id: "experience", label: "Experience", icon: FaBriefcase },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        onUpdate: (self) => {
          const currentY = self.scroll();
          setScrolled(currentY > 50);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollTo(id);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className={`fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          scrolled ? "backdrop-blur-lg bg-opacity-90" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
              <FaXmark size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaBars size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Side Panel Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Navigation Panel */}
            <motion.nav
              ref={navRef}
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="fixed right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-45 shadow-2xl"
              role="navigation"
              aria-label="Main navigation"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700/50">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Samuel Oyenuga
                  </h2>
                  <p className="text-sm text-gray-400 font-inter mt-1">
                    Multi-Disciplinary Engineer
                  </p>
                </motion.div>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col py-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredItem === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className={`relative group flex items-center space-x-4 px-6 py-4 mx-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          rotate: isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`text-lg ${
                          isActive
                            ? "text-cyan-400"
                            : "text-gray-400 group-hover:text-cyan-300"
                        }`}
                      >
                        <Icon />
                      </motion.div>

                      {/* Label */}
                      <span className="font-space-grotesk font-medium">
                        {item.label}
                      </span>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-center space-y-2"
                >
                  <p className="text-xs text-gray-500 font-jetbrains">
                    Bridging Hardware & Software
                  </p>
                  <div className="flex justify-center space-x-1">
                    {["⚡", "🌐", "🧠"].map((emoji, index) => (
                      <motion.span
                        key={index}
                        className="text-sm"
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
