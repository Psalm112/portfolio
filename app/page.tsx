"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
// import Hero from "@/app/components/sections/hero";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
// import About from "./components/sections/about";
// import Skills from "./components/sections/skills";
// import Projects from "./components/sections/projects";
// import Experience from "./components/sections/experience";
// import Contact from "./components/sections/contact";

// Optimized dynamic imports with better loading states
const Hero = dynamic(() => import("@/app/components/sections/hero"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 animation-container" />
  ),
});

const About = dynamic(() => import("@/app/components/sections/about"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black animation-container" />
  ),
});

const Skills = dynamic(() => import("@/app/components/sections/skills"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 animation-container" />
  ),
});

const Projects = dynamic(() => import("@/app/components/sections/projects"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black animation-container" />
  ),
});

const Experience = dynamic(
  () => import("@/app/components/sections/experience"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 animation-container" />
    ),
  }
);

const Contact = dynamic(() => import("@/app/components/sections/contact"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black animation-container" />
  ),
});

// Optimized loading screen component
const OptimizedLoadingScreen = dynamic(
  () => import("@/app/components/ui/LoadingScreen"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced from 2000ms to 1500ms

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen performance-optimized">
      <AnimatePresence mode="wait">
        {isLoading && <OptimizedLoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3, // Reduced from 0.5s
              ease: "easeOut",
            }}
            className="performance-optimized"
          >
            <ScrollProgress />
            {/* <Navigation activeSection={activeSection} /> */}

            <div className="relative">
              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 animation-container" />
                }
              >
                <Hero />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black animation-container" />
                }
              >
                <About />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 animation-container" />
                }
              >
                <Skills />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black animation-container" />
                }
              >
                <Projects />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 animation-container" />
                }
              >
                <Experience />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black animation-container" />
                }
              >
                <Contact />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
