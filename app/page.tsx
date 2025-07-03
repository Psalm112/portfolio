"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/app/components/sections/hero";
// import About from "@/app/components/sections/about";
// import FrontendSection from "@/components/sections/frontend";
// import CommunicationsSection from "@/components/sections/communications";
// import EmbeddedSection from "@/components/sections/embedded";
// import ProjectsSection from "@/components/sections/projects";
// import ExperienceSection from "@/components/sections/experience";
// import ContactSection from "@/components/sections/contact";
// import Navigation from "@/app/components/layout/Navigation";
import LoadingScreen from "@/app/components/ui/LoadingScreen";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
// import Skills from "./components/sections/skills";

const About = dynamic(() => import("@/app/components/sections/about"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/app/components/sections/skills"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/app/components/sections/projects"), {
  ssr: false,
});
const Experience = dynamic(
  () => import("@/app/components/sections/experience"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // const sections = [
  //   "hero",
  //   "about",
  //   "frontend",
  //   "communications",
  //   "embedded",
  //   "projects",
  //   "experience",
  //   "contact",
  // ];

  // const activeSection = useScrollSpy(sections);

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
            {/* <BackgroundEffects /> */}
            <ScrollProgress />
            {/* <Navigation activeSection={activeSection} /> */}

            <div className="relative">
              <Hero />

              <Suspense fallback={<div>Loading...</div>}>
                <div>
                  <About />
                </div>
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <div>
                  <Skills />
                </div>
              </Suspense>

              <Suspense fallback={<div>Loading...</div>}>
                <div>
                  <Projects />
                </div>
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <div>
                  <Experience />
                </div>
              </Suspense>

              {/* <section id="frontend">
                <FrontendSection />
              </section>

              <section id="communications">
                <CommunicationsSection />
              </section>

              <section id="embedded">
                <EmbeddedSection />
              </section>

              <section id="projects">
                <ProjectsSection />
              </section>

              <section id="experience">
                <ExperienceSection />
              </section>

              <section id="contact">
                <ContactSection />
              </section> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
