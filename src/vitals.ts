import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

/**
 * Report Core Web Vitals (CLS, INP, LCP) to console or custom callback.
 *
 * @param onPerfEntry - Optional callback to handle each metric. If not provided,
 *                      metrics are logged to console in development mode only.
 *
 * IMPORTANT: This function must be called exactly ONCE per page load.
 * Do NOT call this inside a component render - use a useEffect with empty deps.
 */
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  const callback = onPerfEntry || ((metric: Metric) => {
    // Only log in development mode
    if (import.meta.env.DEV) {
      console.log(metric);
    }
  });

  // Register listeners for Core Web Vitals
  onCLS(callback);
  onINP(callback);
  onLCP(callback);
};
