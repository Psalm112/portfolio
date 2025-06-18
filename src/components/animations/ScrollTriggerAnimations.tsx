"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollTriggerAnimations = () => {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const animations: gsap.core.Tween[] = [];

    // Fade in animations
    animations.push(
      gsap.fromTo(
        ".fade-in-up",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fade-in-up",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Stagger animations
    animations.push(
      gsap.fromTo(
        ".stagger-up",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".stagger-up",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Scale animations
    animations.push(
      gsap.fromTo(
        ".scale-in",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".scale-in",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Slide animations
    animations.push(
      gsap.fromTo(
        ".slide-left",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".slide-left",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    animations.push(
      gsap.fromTo(
        ".slide-right",
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".slide-right",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Circuit line drawing animation
    animations.push(
      gsap.fromTo(
        ".draw-line",
        {
          strokeDasharray: "1000",
          strokeDashoffset: "1000",
        },
        {
          strokeDashoffset: "0",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".draw-line",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Blueprint reveal animation
    animations.push(
      gsap.fromTo(
        ".blueprint-reveal",
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".blueprint-reveal",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    // Electric glow effect
    animations.push(
      gsap.to(".electric-glow", {
        boxShadow: "0 0 30px #00d4ff, 0 0 60px #00d4ff, 0 0 90px #00d4ff",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: ".electric-glow",
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      }),
    );

    // Rotating elements
    animations.push(
      gsap.to(".rotate-slow", {
        rotation: 360,
        duration: 10,
        ease: "none",
        repeat: -1,
        scrollTrigger: {
          trigger: ".rotate-slow",
          start: "top 80%",
          toggleActions: "play pause resume pause",
        },
      }),
    );

    // Number counter animation
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      animations.push(
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        ),
      );
    });

    // Progress bars
    animations.push(
      gsap.fromTo(
        ".progress-bar",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".progress-bar",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      ),
    );

    return () => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return null;
};
