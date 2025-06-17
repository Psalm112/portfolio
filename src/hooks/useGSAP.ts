import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

type GSAPAnimation = () => gsap.core.Timeline | gsap.core.Tween | void;

interface UseGSAPOptions {
  dependencies?: any[];
  revertOnUpdate?: boolean;
  scope?: React.RefObject<HTMLElement>;
}

export const useGSAP = (
  animation: GSAPAnimation,
  options: UseGSAPOptions = {},
) => {
  const { dependencies = [], revertOnUpdate = true, scope } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      return animation();
    }, scope?.current || undefined);

    contextRef.current = context;

    return () => {
      context.revert();
    };
  }, dependencies);

  useEffect(() => {
    if (revertOnUpdate && contextRef.current) {
      return () => {
        contextRef.current?.revert();
      };
    }
    return undefined;
  }, [revertOnUpdate]);

  return contextRef.current;
};
