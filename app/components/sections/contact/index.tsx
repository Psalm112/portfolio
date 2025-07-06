import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import data
import { contactMethods } from "./contactMethods";
import { contactContent } from "./data/content";

// Import components
import {
  FloatingShapes,
  ContactCard,
  ContactForm,
  // StatsSection,
  // CallToAction,
} from "./components";

gsap.registerPlugin(ScrollTrigger);

// Main Contact Component
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Background parallax effect
      gsap.to(".contact-bg-1", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".contact-bg-2", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stagger animation for contact cards
      gsap.fromTo(
        ".contact-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-800 via-gray-900 to-black overflow-hidden"
      role="main"
      aria-labelledby="contact-heading"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Primary Background Gradients */}
        <div className="contact-bg-1 absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="contact-bg-2 absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        <div className="contact-bg-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-3xl" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_800px_400px_at_50%_50%,black,transparent)]" />
      </motion.div>

      {/* Floating 3D Shapes */}
      <FloatingShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 60 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block font-jetbrains text-cyan-400 text-sm sm:text-base tracking-[0.2em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {contactContent.header.subtitle}
          </motion.span>

          <motion.h2
            id="contact-heading"
            className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              {contactContent.header.titleHighlight1}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400">
              {contactContent.header.titleHighlight2}
            </span>
          </motion.h2>

          <motion.p
            className="font-inter text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {contactContent.header.description}
          </motion.p>
        </motion.div>

        {/* Contact Form Section */}
        <div ref={formRef} className="mb-20 lg:mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block font-jetbrains text-green-400 text-sm sm:text-base tracking-[0.2em] uppercase mb-4 font-medium">
              {contactContent.contactForm.subtitle}
            </span>
            <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {contactContent.contactForm.title}
            </h3>
            <p className="font-inter text-gray-400 max-w-2xl mx-auto font-light">
              {contactContent.contactForm.description}
            </p>
          </motion.div>

          <ContactForm
            isInView={formInView}
            content={contactContent.contactForm}
          />
        </div>

        {/* Contact Methods Grid */}
        <div ref={cardsRef} className="mb-20 lg:mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block font-jetbrains text-purple-400 text-sm sm:text-base tracking-[0.2em] uppercase mb-4 font-medium">
              {contactContent.contactMethods.subtitle}
            </span>
            <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {contactContent.contactMethods.title}
            </h3>
            <p className="font-inter text-gray-400 max-w-2xl mx-auto font-light">
              {contactContent.contactMethods.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {contactMethods.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                index={index}
                isInView={cardsInView}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {/* <StatsSection /> */}

        {/* Call to Action */}
        {/* <CallToAction content={contactContent.callToAction} /> */}

        {/* Footer Note */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-inter text-sm text-gray-500 font-light">
            {contactContent.footer.copyright}
          </p>
          <p className="font-jetbrains text-xs text-gray-600 mt-2 uppercase tracking-wide">
            {contactContent.footer.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
