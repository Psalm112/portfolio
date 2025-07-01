"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { FaGithub, FaLinkedin, FaTwitter, FaChevronDown } from "react-icons/fa";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codeBlockRef = useRef<HTMLPreElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "GraphQL",
    "AWS",
    "Docker",
    "Python",
    "MongoDB",
    "PostgreSQL",
  ];

  const codeSnippets = [
    `const developer = {
  name: "YourName",
  role: "Senior Frontend Engineer",
  passion: "Creating Digital Experiences",
  expertise: ["React", "TypeScript", "Performance"]
};`,
    `// Optimized for performance
const useOptimizedState = () => {
  return useMemo(() => 
    heavyComputation(), [dependencies]
  );
};`,
    `interface Innovation {
  creativity: boolean;
  technology: "cutting-edge";
  impact: "transformative";
}`,
  ];

  // Initialize particles
  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = Array.from({ length: isMobile ? 50 : 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      life: Math.random() * 100,
      maxLife: 100,
    }));
  };

  // Animate particles
  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      // Mouse interaction
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        particle.vx += dx * 0.0001;
        particle.vy += dy * 0.0001;
      }

      // Boundary check
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Reset if life is over
      if (particle.life <= 0) {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.life = particle.maxLife;
      }

      // Draw particle
      const alpha = particle.life / particle.maxLife;
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      );
      gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha * 0.8})`);
      gradient.addColorStop(1, `rgba(0, 150, 255, ${alpha * 0.2})`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw connections
      particlesRef.current.forEach((otherParticle, otherIndex) => {
        if (index === otherIndex) return;

        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline();

      tl.set(
        [
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
          socialRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      )
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Typing effect for code blocks
      let currentSnippet = 0;
      const typeCode = () => {
        if (!codeBlockRef.current) return;

        setIsTyping(true);
        gsap.to(codeBlockRef.current, {
          text: codeSnippets[currentSnippet],
          duration: 2,
          ease: "none",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(codeBlockRef.current, {
                text: "",
                duration: 0.5,
                ease: "none",
                onComplete: () => {
                  currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                  setTimeout(typeCode, 500);
                },
              });
            }, 3000);
          },
        });
      };

      setTimeout(typeCode, 2000);

      // Skills animation
      gsap.from(skillsRef.current?.children || [], {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.5,
      });

      // Stats counter animation
      gsap.from(statsRef.current?.children || [], {
        scale: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 2,
      });

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Parallax scrolling effects
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: self.progress * -100,
              opacity: 1 - self.progress * 0.5,
              duration: 0.3,
            });
          }
          if (canvasRef.current) {
            gsap.to(canvasRef.current, {
              scale: 1 + self.progress * 0.2,
              opacity: 1 - self.progress * 0.3,
              duration: 0.3,
            });
          }
        },
      });

      // Magnetic effect for CTA buttons
      const ctaButtons = ctaRef.current?.querySelectorAll("button");
      ctaButtons?.forEach((button) => {
        button.addEventListener("mouseenter", (e) => {
          gsap.to(e.target, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", (e) => {
          gsap.to(e.target, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mousemove", (e) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(e.target, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, containerRef);

    // Initialize and start particle animation
    initParticles();
    animateParticles();

    // Handle resize
    const handleResize = () => {
      initParticles();
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToNext = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: window.innerHeight, offsetY: 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Navigation Spacer */}
      <div className="h-20" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-12rem)]">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block text-white">Creative</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Frontend Engineer
                </span>
                <span className="block text-gray-300 text-2xl sm:text-3xl lg:text-4xl mt-4">
                  Crafting Digital Experiences
                </span>
              </h1>

              <p
                ref={subtitleRef}
                className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                I transform complex ideas into intuitive, high-performance web
                applications. Specializing in React, TypeScript, and modern
                frontend architecture with a focus on user experience and
                scalability.
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg overflow-hidden shadow-xl">
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300">
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex space-x-6">
              {[
                { icon: FaGithub, href: "#", label: "GitHub" },
                { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-3 rounded-full border border-gray-600 text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Code Block */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 ml-4">portfolio.ts</span>
              </div>
              <pre
                ref={codeBlockRef}
                className="text-cyan-300 min-h-[200px] whitespace-pre-wrap"
              >
                {/* Dynamic typing content */}
              </pre>
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1" />
              )}
            </div>

            {/* Skills Tags */}
            <div ref={skillsRef} className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {[
                { label: "Years Experience", value: "15+" },
                { label: "Projects Completed", value: "200+" },
                { label: "Client Satisfaction", value: "99%" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-gray-400 hover:text-cyan-400 transition-colors duration-300">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
          </div>
          <FaChevronDown className="mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
