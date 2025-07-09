"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/app/components/ui/LoadingScreen";
// import Navigation from "./components/layout/Navigation";
// import ScrollProgress from "@/app/components/ui/ScrollProgress";
import Hero from "./components/sections/hero";

const About = dynamic(() => import("@/app/components/sections/about"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Loading...</div>
    </div>
  ),
});

const Skills = dynamic(() => import("@/app/components/sections/skills"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Loading...</div>
    </div>
  ),
});

const Projects = dynamic(() => import("@/app/components/sections/projects"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Loading...</div>
    </div>
  ),
});

const Experience = dynamic(
  () => import("@/app/components/sections/experience"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-cyan-400">Loading...</div>
      </div>
    ),
  }
);

const Contact = dynamic(() => import("@/app/components/sections/contact"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Loading...</div>
    </div>
  ),
});

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  // const [activeSection, setActiveSection] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // const handleIntersection = useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setActiveSection(entry.target.id);
  //       }
  //     });
  //   },
  //   []
  // );

  // useEffect(() => {
  //   if (!mounted) return;

  //   observerRef.current = new IntersectionObserver(handleIntersection, {
  //     threshold: [0.1, 0.5, 0.9],
  //     rootMargin: "-10% 0px -10% 0px",
  //   });

  //   // Observe all sections
  //   const sections = navItems
  //     .map((item) => document.getElementById(item.id))
  //     .filter(Boolean);

  //   sections.forEach((section) => {
  //     if (section && observerRef.current) {
  //       sectionsRef.current.set(section.id, section);
  //       observerRef.current.observe(section);
  //     }
  //   });

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //     sectionsRef.current.clear();
  //   };
  // }, [mounted, handleIntersection]);

  // Handle loading state
  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* <ScrollProgress />

            <Navigation activeSection={activeSection} /> */}

            {/* Page sections */}
            <div className="relative">
              <section id="hero" className="section-base">
                <Hero />
              </section>

              <section id="about" className="section-base">
                <About />
              </section>

              <section id="skills" className="section-base">
                <Skills />
              </section>

              <section id="projects" className="section-base">
                <Projects />
              </section>

              <section id="experience" className="section-base">
                <Experience />
              </section>

              <section id="contact" className="section-base">
                <Contact />
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
