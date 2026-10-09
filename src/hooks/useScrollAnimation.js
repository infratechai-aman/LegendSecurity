import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer based scroll animations.
 * Elements animate-in as they enter the viewport.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Fire once, don't re-animate
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * Hook for staggered child animations.
 * Returns array of [ref, isVisible] pairs.
 */
export function useStaggerAnimation(count, options = {}) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each child
          const delay = options.staggerMs ?? 80;
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * delay);
          }
          observer.unobserve(container);
        }
      },
      {
        threshold: options.threshold ?? 0.05,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [count, options.staggerMs, options.threshold, options.rootMargin]);

  return [containerRef, visibleItems];
}
