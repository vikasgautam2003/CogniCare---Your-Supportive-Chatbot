// FILE: /src/app/hooks/useAnimationOnScroll.ts
import { useEffect, useRef } from 'react';

export const useAnimationOnScroll = () => {
  // The ref that will be attached to the DOM element.
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Capture the current element. This value is stable within the effect's closure.
    const element = elementRef.current;

    // Guard clause: If the element doesn't exist when the effect runs, do nothing.
    if (!element) {
      return;
    }

    // Create the observer instance.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            // Unobserve the element after the animation is triggered.
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Animation triggers when 10% of the element is visible.
    );

    // Check if the container has specific child items to animate.
    const itemsToAnimate = element.querySelectorAll('.grid-item');

    if (itemsToAnimate.length > 0) {
      // If children with `.grid-item` exist, observe them individually.
      itemsToAnimate.forEach((item) => observer.observe(item));
    } else {
      // Otherwise, just observe the main container element itself.
      observer.observe(element);
    }

    // **THE FIX:** The cleanup function.
    // This is called when the component unmounts.
    return () => {
      // `disconnect()` is the safest and most efficient way to clean up.
      // It stops the observer from watching all target elements.
      observer.disconnect();
    };
  }, []); // The empty dependency array `[]` ensures this effect runs only once on mount.

  return elementRef;
};