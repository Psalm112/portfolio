import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean | number | number[];
}

export const useScrollTrigger = (
  animation: gsap.TweenVars,
  options: UseScrollTriggerOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const {
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
      toggleActions = 'play none none reverse',
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      scrub = false,
      pin = false,
      snap = false,
    } = options;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger,
      start,
      end,
      toggleActions,
      scrub,
      pin,
      snap,
      onUpdate: (self) => {
        if (scrub) {
          gsap.to(element, {
            ...animation,
            progress: self.progress,
            duration: 0,
          });
        }
      },
      onEnter: () => {
        if (!scrub) {
          gsap.to(element, animation);
        }
        onEnter?.();
      },
      onLeave: onLeave,
      onEnterBack: onEnterBack,
      onLeaveBack: onLeaveBack,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [animation, options]);

  return elementRef;
};