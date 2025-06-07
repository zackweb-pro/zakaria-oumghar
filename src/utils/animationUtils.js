import { useState, useEffect, useMemo, useRef } from 'react';
import { useScroll, useInView as framerUseInView } from 'framer-motion';

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  
  return function(...args) {
    const context = this;
    
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Custom hook for throttled scroll effects
 * @param {Object} options - Options for useScroll (target, offset, etc)
 * @param {number} throttleMs - Throttle time in milliseconds
 * @returns {Object} - Object containing throttled scrollYProgress
 */
export function useThrottledScroll(options = {}, throttleMs = 100) {
  // Get the original scroll values from Framer Motion
  const { scrollYProgress } = useScroll(options);
  const [throttledProgress, setThrottledProgress] = useState(0);
  const latestValue = useRef(0);
  
  // Set up effect to throttle scroll updates
  useEffect(() => {
    // Using the modern API: .on("change") instead of .onChange()
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      latestValue.current = latest;
    });
    
    // Create a throttled update function
    const handleThrottledUpdate = throttle(() => {
      setThrottledProgress(latestValue.current);
    }, throttleMs);
    
    // Set up a timer to check for updates at a reasonable frequency
    const intervalId = setInterval(handleThrottledUpdate, 16); // ~60fps
    
    // Clean up subscriptions and timers
    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, [scrollYProgress, throttleMs]);
  
  // Simply pass the throttled value directly
  // No need to recreate the entire API
  return {
    scrollYProgress: useMemo(() => ({
      current: throttledProgress
    }), [throttledProgress])
  };
}

/**
 * A simpler in-view detection hook that uses Framer Motion's native implementation
 * with optimized threshold values for earlier triggering of animations
 * @param {Object} ref - React ref object
 * @param {Object} options - Options for useInView
 * @returns {boolean} - Whether the element is in view
 */
export function useThrottledInView(ref, options = {}) {
  // Use smaller threshold and negative margin for earlier animation triggering
  const optimizedOptions = {
    ...options,
    // If amount is not explicitly provided, default to a small value (0.05)
    amount: options.amount !== undefined ? Math.min(options.amount, 0.05) : 0.05,
    // Add margin to trigger animations before elements enter viewport
    margin: options.margin || "0px 0px -100px 0px"
  };
  
  // Use Framer Motion's native implementation
  return framerUseInView(ref, optimizedOptions);
}

/**
 * Standard viewport configuration for optimized motion animations
 * Creates a consistent configuration for whileInView animations across the site
 */
export const optimizedViewport = {
  once: false,
  margin: "0px 0px -150px 0px", // Trigger animations earlier 
  amount: 0.05 // Only need a small portion of the element to be visible
};
