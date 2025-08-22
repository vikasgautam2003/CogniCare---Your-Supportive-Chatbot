import React, { useEffect, useRef } from 'react';

const TestimonialsComponent = () => {
  // A ref on the main section to find the animatable children
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Animate when 10% of the element is visible
    );

    // Find and observe each testimonial card individually for a precise reveal
    const itemsToAnimate = element.querySelectorAll('.testimonial-card');
    itemsToAnimate.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* --- Animation Repaired using CSS Transition --- */

        /* 1. Define the initial, "hidden" state for the cards. */
        .testimonial-card {
          opacity: 0;
          transform: translateY(50px) scale(0.95) translateZ(0); /* Added translateZ for hardware acceleration */
          will-change: transform, opacity;
          transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1), 
                      opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        /* 2. Define the final, "visible" state. */
        .testimonial-card.animate-reveal {
          opacity: 1;
          transform: translateY(0) scale(1) translateZ(0);
        }
      `}</style>

      <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Trusted by Professionals
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Experts in mind, logic, and body recognize the unique potential of our empathetic AI.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Testimonial Card 1: Neurosurgeon */}
            <div 
              className="testimonial-card bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2"
              style={{ transitionDelay: '0.15s' }}
            >
              <img 
                src="/ankit.jpg" 
                alt="Dr. Pranav Kumar" 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-gray-700 shadow-lg"
              />
              <p className="text-gray-300 text-center italic mb-6">
                "CogniCare's ability to build context and recall past conversations is remarkable. It mirrors the way our brains form connections, creating a supportive framework that can genuinely aid in cognitive and emotional self-reflection. It's a fascinating application of memory for mental wellness."
              </p>
              <div className="text-center">
                <h3 className="font-bold text-xl text-white">Dr. Pranav Kumar</h3>
                <p className="text-purple-300 font-medium">Neurosurgeon</p>
              </div>
            </div>

            {/* Testimonial Card 2: Chemical Engineer */}
            <div 
              className="testimonial-card bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2"
              style={{ transitionDelay: '0.30s' }}
            >
              <img 
                src="/tarun.jpg" 
                alt="Mr. Tarun Chen" 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-gray-700 shadow-lg"
              />
              <p className="text-gray-300 text-center italic mb-6">
                "From an engineering perspective, the system's architecture is elegant. It processes unstructured human emotion and provides structured, empathetic feedback. It's a logical yet deeply human-centered tool that solves a complex problem with precision and grace. The data integration is seamless."
              </p>
              <div className="text-center">
                <h3 className="font-bold text-xl text-white">Mr. Tarun Chen</h3>
                <p className="text-teal-300 font-medium">Chemical Engineer</p>
              </div>
            </div>

            {/* Testimonial Card 3: Fitness Trainer */}
            <div 
              className="testimonial-card bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2"
              style={{ transitionDelay: '0.45s' }}
            >
              <img 
                src="pranav.jpg" 
                alt="Mr. Ankit Reed" 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-gray-700 shadow-lg"
              />
              <p className="text-gray-300 text-center italic mb-6">
                "Mental fitness is as crucial as physical. I see CogniCare as a personal trainer for the mind. It helps build consistency, encourages positive self-talk, and tracks progress. The gentle accountability it provides is key to forming healthy mental habits, just like in the gym."
              </p>
              <div className="text-center">
                <h3 className="font-bold text-xl text-white">Mr. Ankit Reed</h3>
                <p className="text-pink-300 font-medium">Certified Fitness Trainer</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsComponent;
