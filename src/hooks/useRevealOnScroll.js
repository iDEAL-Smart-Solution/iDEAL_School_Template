// Usage: const [sectionRef, isVisible] = useRevealOnScroll();
// <section ref={sectionRef} data-reveal className={`... ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

import { useEffect, useRef, useState } from 'react';

export const useRevealOnScroll = (options = {}) => {
  const ref = useRef(null);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [isVisible, setIsVisible] = useState(prefersReduced);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.12, ...options },
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};
