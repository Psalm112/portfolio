"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/app/components/sections/hero";
import LoadingScreen from "@/app/components/ui/LoadingScreen";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
import About from "./components/sections/about";
import Skills from "./components/sections/skills";
import Projects from "./components/sections/projects";
import Experience from "./components/sections/experience";
import Contact from "./components/sections/contact";

// const About = dynamic(() => import("@/app/components/sections/about"), {
//   ssr: false,
// });
// const Skills = dynamic(() => import("@/app/components/sections/skills"), {
//   ssr: false,
// });
// const Projects = dynamic(() => import("@/app/components/sections/projects"), {
//   ssr: false,
// });
// const Experience = dynamic(
//   () => import("@/app/components/sections/experience"),
//   {
//     ssr: false,
//   }
// );
// const Contact = dynamic(() => import("@/app/components/sections/contact"), {
//   ssr: false,
// });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            {/* <Navigation activeSection={activeSection} /> */}

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
