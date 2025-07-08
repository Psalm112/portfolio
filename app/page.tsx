"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/app/components/ui/LoadingScreen";
import Navigation from "./components/layout/Navigation";
import ScrollProgress from "@/app/components/ui/ScrollProgress";

const Hero = dynamic(() => import("@/app/components/sections/hero"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800" />
  ),
});

const About = dynamic(() => import("@/app/components/sections/about"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black" />
  ),
});

const Skills = dynamic(() => import("@/app/components/sections/skills"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800" />
  ),
});

const Projects = dynamic(() => import("@/app/components/sections/projects"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black" />
  ),
});

const Experience = dynamic(
  () => import("@/app/components/sections/experience"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800" />
    ),
  }
);

const Contact = dynamic(() => import("@/app/components/sections/contact"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black" />
  ),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Section observer for active navigation
  useEffect(() => {
    if (!mounted) return;

    const sections = navItems.map((item) => item.id);
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sectionElements.forEach((element) => {
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ScrollProgress />
            <Navigation activeSection={activeSection} />

            <div className="relative">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
