"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header/Header";
import { Hero } from "@/components/sections/Hero/Hero";
import { ScrollTriggerAnimations } from "@/components/animations/ScrollTriggerAnimations";
import { MouseFollower } from "@/components/animations/MouseFollower";
import { PageTransitions } from "@/components/animations/PageTransitions";

// const About = dynamic(() => import("@/components/sections/About/About"), {
//   loading: () => (
//     <div className="h-screen flex items-center justify-center">Loading...</div>
//   ),
// });
// const Experience = dynamic(
//   () => import("@/components/sections/Experience/Experience"),
// );
// const Skills = dynamic(() => import("@/components/sections/Skills/Skills"));
// const Projects = dynamic(
//   () => import("@/components/sections/Projects/Projects"),
// );
// const Contact = dynamic(() => import("@/components/sections/Contact/Contact"));

export default function HomePage() {
  return (
    <PageTransitions>
      <MouseFollower />
      <ScrollTriggerAnimations />

      <Header />

      <main id="main-content" className="relative">
        <section id="hero" className="relative">
          <Hero />
        </section>

        {/* <Suspense fallback={<div className="h-screen" />}>
          <section id="about" className="relative">
            <About />
          </section>

          <section id="experience" className="relative">
            <Experience />
          </section>

          <section id="skills" className="relative">
            <Skills />
          </section>

          <section id="projects" className="relative">
            <Projects />
          </section>

          <section id="contact" className="relative">
            <Contact />
          </section>
        </Suspense> */}
      </main>
    </PageTransitions>
  );
}
