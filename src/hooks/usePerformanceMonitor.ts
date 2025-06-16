import { useEffect, useState } from 'react';
import { performanceMonitor} from '@/lib/utils/performance';
import { PerformanceMetrics } from '@/types';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsMonitoring(true);
    performanceMonitor.measureFPS();
    performanceMonitor.measureMemory();

    const interval = setInterval(() => {
      performanceMonitor.measureMemory();
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);

    return () => {
      clearInterval(interval);
      setIsMonitoring(false);
    };
  }, []);

  const logMetrics = () => {
    performanceMonitor.logMetrics();
  };

  return {
    metrics,
    isMonitoring,
    logMetrics,
  };
};