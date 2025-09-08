// Performance monitoring utilities for production optimization

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure function execution time
  measureTime<T>(label: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.recordMetric(label, duration);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${label}_error`, duration);
      throw error;
    }
  }

  // Measure async function execution time
  async measureTimeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(label, duration);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${label}_error`, duration);
      throw error;
    }
  }

  // Record performance metric
  recordMetric(label: string, value: number): void {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    
    const values = this.metrics.get(label)!;
    values.push(value);
    
    // Keep only last 100 measurements to prevent memory leaks
    if (values.length > 100) {
      values.shift();
    }

    // Log slow operations
    if (value > 1000) { // > 1 second
      console.warn(`🐌 Slow operation detected: ${label} took ${value.toFixed(2)}ms`);
    }
  }

  // Get performance statistics
  getStats(label: string): { 
    count: number; 
    avg: number; 
    min: number; 
    max: number;
    p95: number;
  } | null {
    const values = this.metrics.get(label);
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const p95Index = Math.floor(sorted.length * 0.95);

    return {
      count: values.length,
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[p95Index]
    };
  }

  // Get all metrics summary
  getAllStats(): Record<string, ReturnType<typeof this.getStats>> {
    const stats: Record<string, ReturnType<typeof this.getStats>> = {};
    for (const label of this.metrics.keys()) {
      stats[label] = this.getStats(label);
    }
    return stats;
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear();
  }
}

// Performance monitoring decorators and utilities
export const performanceMonitor = PerformanceMonitor.getInstance();

// HOC for React components performance monitoring
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return React.memo(function PerformanceMonitoredComponent(props: P) {
    const renderStart = React.useRef<number>(0);
    
    React.useLayoutEffect(() => {
      renderStart.current = performance.now();
    });

    React.useLayoutEffect(() => {
      const renderTime = performance.now() - renderStart.current;
      performanceMonitor.recordMetric(`component_render_${componentName}`, renderTime);
    });

    return React.createElement(Component, props);
  });
}

// Database query performance wrapper
export async function measureDbQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  return performanceMonitor.measureTimeAsync(`db_${queryName}`, queryFn);
}

// API call performance wrapper
export async function measureApiCall<T>(
  endpoint: string,
  apiFn: () => Promise<T>
): Promise<T> {
  return performanceMonitor.measureTimeAsync(`api_${endpoint}`, apiFn);
}

// Web Vitals monitoring for client-side
export function initializeWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Measure Core Web Vitals
  try {
    import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      onCLS((metric) => {
        console.log('CLS:', metric);
        performanceMonitor.recordMetric('web_vitals_cls', metric.value);
      });
      
      onFCP((metric) => {
        console.log('FCP:', metric);
        performanceMonitor.recordMetric('web_vitals_fcp', metric.value);
      });
      
      onLCP((metric) => {
        console.log('LCP:', metric);
        performanceMonitor.recordMetric('web_vitals_lcp', metric.value);
      });
      
      onINP((metric) => {
        console.log('INP:', metric);
        performanceMonitor.recordMetric('web_vitals_inp', metric.value);
      });
      
      onTTFB((metric) => {
        console.log('TTFB:', metric);
        performanceMonitor.recordMetric('web_vitals_ttfb', metric.value);
      });
    });
  } catch (error) {
    console.warn('Failed to load web-vitals:', error);
  }
}

// Memory usage monitoring
export function logMemoryUsage(): void {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  console.log('Memory usage:', {
    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
  });
}

// Performance budget checker
export function checkPerformanceBudget(): void {
  const stats = performanceMonitor.getAllStats();
  const budgets = {
    'db_': 100, // DB queries should be under 100ms
    'api_': 200, // API calls should be under 200ms
    'component_render_': 16, // Component renders should be under 16ms (60fps)
  };

  Object.entries(stats).forEach(([metric, data]) => {
    if (!data) return;
    
    const budgetKey = Object.keys(budgets).find(key => metric.startsWith(key));
    if (budgetKey) {
      const budget = budgets[budgetKey as keyof typeof budgets];
      if (data.avg > budget) {
        console.warn(`⚠️ Performance budget exceeded: ${metric} avg ${data.avg.toFixed(2)}ms > ${budget}ms`);
      }
    }
  });
}
