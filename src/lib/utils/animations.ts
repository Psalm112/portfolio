import { gsap } from 'gsap';
import type { AnimationConfig } from '@/types';

export const defaultAnimationConfig: AnimationConfig = {
  duration: 0.6,
  delay: 0,
  ease: 'power2.out',
  stagger: 0.1,
};

export const createScrollTriggerAnimation = (
  trigger: string | Element,
  animation: gsap.TweenVars,
  config: Partial<ScrollTrigger.Vars> = {}
) => {
  return gsap.to(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...config,
    },
  });
};

export const fadeInUp = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
) => {
  const finalConfig = { ...defaultAnimationConfig, ...config };
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      ease: finalConfig.ease,
    }
  );
};

export const fadeInLeft = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
) => {
  const finalConfig = { ...defaultAnimationConfig, ...config };
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      ease: finalConfig.ease,
    }
  );
};

export const fadeInRight = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
) => {
  const finalConfig = { ...defaultAnimationConfig, ...config };
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      ease: finalConfig.ease,
    }
  );
};

export const scaleIn = (
  element: string | Element,
  config: Partial<AnimationConfig> = {}
) => {
  const finalConfig = { ...defaultAnimationConfig, ...config };
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: finalConfig.duration,
      delay: finalConfig.delay,
      ease: finalConfig.ease,
    }
  );
};

export const staggerAnimation = (
  elements: string | Element[],
  animation: gsap.TweenVars,
  stagger = 0.1
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      ...animation,
      stagger,
    }
  );
};

export const morphSVG = (
  element: string | Element,
  path: string,
  duration = 1,
  ease = 'power2.inOut'
) => {
  return gsap.to(element, {
    morphSVG: path,
    duration,
    ease,
  });
};

export const drawSVGPath = (
  element: string | Element,
  duration = 2,
  ease = 'power2.inOut'
) => {
  return gsap.fromTo(
    element,
    {
      drawSVG: '0%',
    },
    {
      drawSVG: '100%',
      duration,
      ease,
    }
  );
};

export const electricEffect = (element: string | Element) => {
  const tl = gsap.timeline({ repeat: -1 });
  
  tl.to(element, {
    boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff',
    duration: 0.1,
  })
  .to(element, {
    boxShadow: '0 0 2px #00d4ff, 0 0 5px #00d4ff, 0 0 8px #00d4ff',
    duration: 0.1,
  })
  .to(element, {
    boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff',
    duration: 0.2,
  });
  
  return tl;
};

export const blueprintReveal = (element: string | Element) => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    element,
    {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.5,
      ease: 'power2.inOut',
    }
  )
  .from(
    `${element} .blueprint-lines`,
    {
      strokeDashoffset: 1000,
      duration: 2,
      ease: 'power2.inOut',
    },
    0.5
  );
  
  return tl;
};

export const particleSystem = (container: string | Element, count = 50) => {
  const particles: HTMLElement[] = [];
  const containerEl = typeof container === 'string' 
    ? document.querySelector(container) as HTMLElement
    : container as HTMLElement;
  
  if (!containerEl) return;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 bg-blueprint-400 rounded-full';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    containerEl.appendChild(particle);
    particles.push(particle);
  }
  
  particles.forEach((particle, index) => {
    gsap.to(particle, {
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      opacity: Math.random(),
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      delay: index * 0.1,
      ease: 'sine.inOut',
    });
  });
  
  return particles;
};