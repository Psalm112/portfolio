import { useCallback, useRef, useState } from "react";

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    duration = 1000,
    easing = (t: number) => t * (2 - t), // ease out
    offset = -80, // Account for fixed navigation
    onTransitionStart,
    onTransitionEnd,
  } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    isActive: boolean;
    direction: "up" | "down";
  }>({ isActive: false, direction: "down" });

  const rafRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const scrollToElement = useCallback(
    (targetId: string, customOffset?: number) => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement || isScrolling) return;

      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.offsetTop + (customOffset ?? offset);
      const distance = targetPosition - startPosition;
      const direction = distance > 0 ? "down" : "up";

      // Start cloth transition
      setTransitionData({ isActive: true, direction });
      setIsScrolling(true);
      onTransitionStart?.();

      const animateScroll = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);

        const currentPosition = startPosition + distance * easedProgress;

        window.scrollTo({
          top: currentPosition,
          behavior: "auto", // Use auto since we're handling the animation
        });

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
          startTimeRef.current = undefined;

          // Small delay before ending transition
          setTimeout(() => {
            setTransitionData({ isActive: false, direction });
            onTransitionEnd?.();
          }, 200);
        }
      };

      rafRef.current = requestAnimationFrame(animateScroll);
    },
    [duration, easing, offset, isScrolling, onTransitionStart, onTransitionEnd]
  );

  const cancelScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    setIsScrolling(false);
    startTimeRef.current = undefined;
  }, []);

  return {
    scrollToElement,
    cancelScroll,
    isScrolling,
    transitionData,
  };
};
