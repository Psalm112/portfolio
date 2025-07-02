"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  activeSection: string;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null!);
  const lastY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      ScrollTrigger.create({
        start: "top top",
        onUpdate: () => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);
          setHidden(currentY > lastY.current && currentY > 100);
          lastY.current = currentY;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el)
      gsap.to(window, {
        duration: 1,
        scrollTo: el,
        offsetY: 80,
        ease: "power2.inOut",
      });
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full top-0 z-40 transform transition-transform ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div
            className="font-mono text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            &lt;SamuelOyenuga /&gt;
          </div>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 font-medium transition ${
                  activeSection === item.id
                    ? "text-cyan-300"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute left-0 bottom-0 w-full h-1 bg-cyan-400 rounded-t-lg"
                  />
                )}
              </button>
            ))}
          </div>
          <button className="md:hidden p-3" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900/95 z-30 backdrop-blur-lg"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`text-2xl font-medium ${
                  activeSection === item.id
                    ? "text-cyan-300"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
