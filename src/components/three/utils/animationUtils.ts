import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin);
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  repeat?: number;
  yoyo?: boolean;
  paused?: boolean;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export class AnimationController {
  private static instance: AnimationController;
  private timelines: Map<string, gsap.core.Timeline> = new Map();
  private scrollTriggers: Map<string, ScrollTrigger> = new Map();

  static getInstance(): AnimationController {
    if (!AnimationController.instance) {
      AnimationController.instance = new AnimationController();
    }
    return AnimationController.instance;
  }

  // Create a master timeline for section animations
  createMasterTimeline(id: string, config: AnimationConfig = {}): gsap.core.Timeline {
    const tl = gsap.timeline({
      ...config,
      onComplete: () => {
        console.log(`Animation timeline ${id} completed`);
      },
    });
    
    this.timelines.set(id, tl);
    return tl;
  }

  // Get existing timeline or create new one
  getTimeline(id: string, config?: AnimationConfig): gsap.core.Timeline {
    return this.timelines.get(id) || this.createMasterTimeline(id, config);
  }

  // Blueprint paper reveal animation
  blueprintReveal(
    element: string | Element,
    config: ScrollAnimationConfig = {}
  ): ScrollTrigger {
    const {
      duration = 2,
      start = "top 80%",
      end = "bottom 20%",
      toggleActions = "play none none reverse",
      ...restConfig
    } = config;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      toggleActions,
      animation: gsap.timeline()
        .fromTo(element, 
          { 
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
            "--blueprint-opacity": 0,
          },
          { 
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            "--blueprint-opacity": 0.2,
            duration,
            ease: "power2.out",
            ...restConfig,
          }
        ),
      ...restConfig,
    });

    return scrollTrigger;
  }

  // Circuit line drawing animation
  circuitDraw(
    paths: string | string[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const pathElements = typeof paths === 'string' ? [paths] : paths;
    const tl = gsap.timeline(config);

    pathElements.forEach((path, index) => {
      tl.fromTo(path,
        { drawSVG: "0%" },
        { 
          drawSVG: "100%",
          duration: config.duration || 2,
          ease: config.ease || "power2.inOut",
          stagger: config.stagger || 0.2,
        },
        index * (config.stagger || 0.2)
      );
    });

    return tl;
  }

  // Mechanical assembly animation
  mechanicalAssembly(
    components: { element: string | Element; fromPosition: { x: number; y: number; z?: number } }[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline(config);

    components.forEach(({ element, fromPosition }, index) => {
      tl.fromTo(element,
        { 
          x: fromPosition.x,
          y: fromPosition.y,
          z: fromPosition.z || 0,
          opacity: 0,
          scale: 0.5,
          rotation: 180,
        },
        { 
          x: 0,
          y: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: config.duration || 1.5,
          ease: config.ease || "back.out(1.7)",
        },
        index * (config.stagger || 0.3)
      );
    });

    return tl;
  }

  // Microcontroller signal flow animation
  signalFlow(
    signals: { from: string | Element; to: string | Element; color?: string }[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, ...config });

    signals.forEach(({ from, to, color = "#00d4ff" }, index) => {
      // Create signal particle
      const signal = document.createElement('div');
      signal.className = 'signal-particle';
      signal.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        z-index: 1000;
        pointer-events: none;
      `;
      
      document.body.appendChild(signal);

      tl.set(signal, { 
        x: (from as HTMLElement).offsetLeft,
        y: (from as HTMLElement).offsetTop,
        opacity: 1,
      })
      .to(signal, {
        motionPath: {
          path: `M${(from as HTMLElement).offsetLeft},${(from as HTMLElement).offsetTop} L${(to as HTMLElement).offsetLeft},${(to as HTMLElement).offsetTop}`,
          autoRotate: true,
        },
        duration: config.duration || 1,
        ease: config.ease || "power2.inOut",
        onComplete: () => {
          // Flash destination
          gsap.to(to, {
            boxShadow: `0 0 20px ${color}`,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          });
          
          // Remove signal particle
          setTimeout(() => {
            document.body.removeChild(signal);
          }, 100);
        },
      }, index * (config.stagger || 0.5));
    });

    return tl;
  }

  // Robot arm movement animation
  robotArmMovement(
    arm: string | Element,
    waypoints: { x: number; y: number; rotation?: number }[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline(config);

    waypoints.forEach((waypoint, index) => {
      tl.to(arm, {
        x: waypoint.x,
        y: waypoint.y,
        rotation: waypoint.rotation || 0,
        duration: config.duration || 1,
        ease: config.ease || "power2.inOut",
      });
    });

    return tl;
  }

  // Data visualization animation
  dataVisualization(
    dataPoints: { element: string | Element; value: number; maxValue: number }[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline(config);

    dataPoints.forEach(({ element, value, maxValue }, index) => {
      const percentage = (value / maxValue) * 100;
      
      tl.fromTo(element,
        { 
          scaleY: 0,
          opacity: 0,
        },
        { 
          scaleY: percentage / 100,
          opacity: 1,
          duration: config.duration || 1,
          ease: config.ease || "power2.out",
          transformOrigin: "bottom",
        },
        index * (config.stagger || 0.1)
      );
    });

    return tl;
  }

  // Holographic interface animation
  holographicInterface(
    interface: string | Element,
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, ...config });

    tl.to(interface, {
      backgroundPosition: "200% 0%",
      duration: config.duration || 3,
      ease: "none",
    })
    .to(interface, {
      filter: "hue-rotate(360deg)",
      duration: config.duration || 4,
      ease: "none",
    }, 0);

    return tl;
  }

  // Particle system animation
  particleSystem(
    container: string | Element,
    particleCount: number = 50,
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1, ...config });
    const particles: HTMLElement[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00d4ff;
        border-radius: 50%;
        opacity: 0;
      `;
      
      (container as HTMLElement).appendChild(particle);
      particles.push(particle);

      // Animate each particle
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;
      const startX = Math.random() * (container as HTMLElement).offsetWidth;
      const startY = (container as HTMLElement).offsetHeight;
      const endX = startX + (Math.random() - 0.5) * 100;
      const endY = -50;

      tl.fromTo(particle,
        { 
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0,
        },
        { 
          x: endX,
          y: endY,
          opacity: 1,
          scale: 1,
          duration,
          ease: "none",
          onComplete: () => {
            gsap.set(particle, { opacity: 0 });
          },
        },
        delay
      );
    }

    return tl;
  }

  // Section transition animation
  sectionTransition(
    from