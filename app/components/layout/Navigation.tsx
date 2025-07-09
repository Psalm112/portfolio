"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { RiHome6Line, RiUser4Line } from "react-icons/ri";
import { HiMiniCog, HiOutlineBriefcase } from "react-icons/hi2";
import { PiEnvelopeDuotone } from "react-icons/pi";
import { BsHddStack } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

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
  const [isAtTop, setIsAtTop] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Disable/enable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  // Enhanced scroll handler with performance optimization
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isTop = currentScrollY < 50;

    setIsAtTop(isTop);

    // Show nav when at top or scrolling up, hide when scrolling down
    if (isTop) {
      setIsVisible(true);
    } else if (isScrollingUp) {
      setIsVisible(true);
    } else if (currentScrollY > 100) {
      setIsVisible(false);
      setIsOpen(false); // Close mobile menu when scrolling down
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Throttled scroll listener
  useEffect(() => {
    const throttledHandleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleScroll, 16); // 60fps
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
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
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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
          ease: [0.4, 0.0, 0.2, 1],
          type: "tween",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtTop
            ? "bg-transparent backdrop-blur-none"
            : "bg-gray-900/90 backdrop-blur-xl shadow-lg"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <h1 className="text-xl font-orbitron font-bold text-white">
                Samuel
              </h1>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      onClick={() => scrollToSection(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      className={`relative group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm
                        ${
                          isActive
                            ? "text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        }
                        focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-inter">{item.label}</span>

                      {/* Active indicator with smooth animation */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg border border-cyan-400/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
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
                      <IoClose className="block h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiOutlineMenuAlt3 className="block h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Mobile Menu Panel */}
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
                className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 z-50 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-700/30">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2
                        id="mobile-menu-title"
                        className="text-lg font-orbitron font-bold text-white"
                      >
                        Samuel Oyenuga
                      </h2>
                      <p className="text-sm text-gray-400 font-inter mt-1">
                        Multi-Disciplinary Engineer
                      </p>
                    </motion.div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      aria-label="Close menu"
                    >
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="py-4 px-2" role="navigation">
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
                        className={`w-full flex items-center space-x-4 px-4 py-3 mx-2 rounded-lg text-left transition-all duration-300 group
                          ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-400/10 to-blue-400/10 text-cyan-400 border-r-4 border-cyan-400 shadow-lg shadow-cyan-400/20"
                              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }
                          focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-inter font-medium text-base">
                          {item.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/30">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <p className="text-xs text-gray-500 font-jetbrains">
                      Bridging Hardware & Software
                    </p>
                    <div className="mt-2 flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
// import { ClothTransition } from "@/app/components/ui/ClothTransition";

// interface NavigationProps {
//   activeSection: string;
// }

// const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { scrollToElement, transitionData } = useSmoothScroll({
//     duration: 1200,
//     easing: (t) => 1 - Math.pow(1 - t, 3), // ease out cubic
//     offset: -80,
//   });

//   const navItems = [
//     { id: "hero", label: "Home", icon: "🏠" },
//     { id: "about", label: "About", icon: "👨‍💻" },
//     { id: "skills", label: "Skills", icon: "⚡" },
//     { id: "projects", label: "Projects", icon: "🚀" },
//     { id: "experience", label: "Experience", icon: "💼" },
//     { id: "contact", label: "Contact", icon: "📬" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavClick = (id: string) => {
//     scrollToElement(id);
//   };

//   return (
//     <>
//       <ClothTransition
//         isActive={transitionData.isActive}
//         direction={transitionData.direction}
//       />

//       <motion.nav
//         className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
//           isScrolled
//             ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50 shadow-xl"
//             : "bg-transparent"
//         }`}
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo */}
//             <motion.div
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">SO</span>
//               </div>
//               <span className="font-orbitron text-white font-bold text-lg">
//                 Samuel
//               </span>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <motion.button
//                   key={item.id}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`relative px-4 py-2 rounded-lg font-jetbrains text-sm font-medium transition-all duration-300 group ${
//                     activeSection === item.id
//                       ? "text-cyan-400 bg-cyan-400/10"
//                       : "text-gray-300 hover:text-white"
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   aria-label={`Navigate to ${item.label} section`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs">{item.icon}</span>
//                     <span>{item.label}</span>
//                   </div>

//                   {/* Active indicator */}
//                   {activeSection === item.id && (
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg"
//                       layoutId="activeNav"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   )}

//                   {/* Hover effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </motion.button>
//               ))}
//             </div>

//             {/* Mobile Navigation Button */}
//             <motion.button
//               className="md:hidden relative w-8 h-8 flex items-center justify-center"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label="Toggle mobile menu"
//             >
//               <div className="w-6 h-6 flex flex-col justify-center items-center">
//                 <div className="w-full h-0.5 bg-cyan-400 rounded-full mb-1" />
//                 <div className="w-full h-0.5 bg-cyan-400 rounded-full mb-1" />
//                 <div className="w-full h-0.5 bg-cyan-400 rounded-full" />
//               </div>
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>
//     </>
//   );
// };

// export default Navigation;
