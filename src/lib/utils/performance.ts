import type { PerformanceMetrics } from '@/types';

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Performance Observer for navigation timing
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
          }
        }
      });

      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navObserver);

      // Performance Observer for paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        }
      });

      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);

      // Performance Observer for largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // Performance Observer for layout shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsScore = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsScore += (entry as any).value;
          }
        }
        this.metrics.cls = clsScore;
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }
  }

  public measureFPS(): void {
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const measure = (currentTime: number) => {
      frameCount++;
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.metrics.fps = fps;
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  }

  public measureMemory(): void {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      this.metrics.memory = memInfo.usedJSHeapSize / 1048576; // Convert to MB
    }
  }

 public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    console.group('Performance Metrics');
    console.log('First Contentful Paint:', this.metrics.fcp?.toFixed(2), 'ms');
    console.log('Largest Contentful Paint:', this.metrics.lcp?.toFixed(2), 'ms');
    console.log('Cumulative Layout Shift:', this.metrics.cls?.toFixed(4));
    console.log('Time to First Byte:', this.metrics.ttfb?.toFixed(2), 'ms');
    console.log('FPS:', this.metrics.fps);
    console.log('Memory Usage:', this.metrics.memory?.toFixed(2), 'MB');
    console.groupEnd();
  }

  public dispose(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Utility functions for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<HTMLImageElement[]> => {
  return Promise.all(sources.map(preloadImage));
};

export const getOptimizedImageUrl = (
  src: string,
  width: number,
  height?: number,
  quality = 75
): string => {
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
  });
  
  if (height) {
    params.set('h', height.toString());
  }
  
  return `${src}?${params.toString()}`;
};