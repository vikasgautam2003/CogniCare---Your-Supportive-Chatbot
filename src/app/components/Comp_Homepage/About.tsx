import Link from 'next/link';


import { useEffect, useRef } from 'react';

const AboutComponent = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure we have a current ref to observe
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            // Stop observing the element once it has been revealed
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    const gridItems = element.querySelectorAll('.grid-item');
    gridItems.forEach((item) => observer.observe(item));

    // Best practice for cleanup: disconnect the observer entirely
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      <section className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Why Happiness Matters
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              We believe mental well-being is not just the absence of illness, but the presence of joy, resilience, and purpose.
            </p>
          </div>

          {/* Fully Responsive Animated Grid */}
          {/*
            - Mobile (default): A single-column layout where items stack vertically.
            - Tablet (md): A 3-column grid.
            - Desktop (lg): The full 4-column complex grid with a fixed height.
          */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:h-[700px]">
            
            {/* Item 1: Large Text */}
            <div className="grid-item min-h-[220px] md:col-span-2 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-center" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-3xl font-bold text-cyan-300 mb-2">More Than Just a Smile.</h3>
              <p className="text-gray-300">
                Happiness is a skill. We provide the tools and compassionate support to help you practice it, building a foundation for a more fulfilling life.
              </p>
            </div>

            {/* Item 2: Image */}
            <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <img src="https://placehold.co/400x400/000000/ffffff?text=Joy" alt="Joy" className="w-full h-full object-cover" />
            </div>

            {/* Item 3: Image */}
            <div className="grid-item h-80 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-2 bg-gray-800 rounded-2xl overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <img src="https://placehold.co/400x800/000000/ffffff?text=Connection" alt="Connection" className="w-full h-full object-cover" />
            </div>

            {/* Item 4: Image */}
            <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ animationDelay: '0.4s' }}>
              <img src="https://placehold.co/400x400/000000/ffffff?text=Resilience" alt="Resilience" className="w-full h-full object-cover" />
            </div>

            {/* Item 5: Small Text */}
            <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex items-center" style={{ animationDelay: '0.5s' }}>
              <p className="text-lg font-semibold">A private space for your thoughts, available anytime you need it.</p>
            </div>
            
            {/* Item 6: Image */}
            <div className="grid-item h-64 md:h-auto md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ animationDelay: '0.6s' }}>
              <img src="https://placehold.co/800x400/000000/ffffff?text=Purpose" alt="Purpose" className="w-full h-full object-cover" />
            </div>
            
            {/* Item 7: Button */}
            
            {/* <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 flex items-center justify-center" style={{ animationDelay: '0.7s' }}>
               
              <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold w-full h-full rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 text-2xl">
                Let's Talk
              </button>
              
            </div> */}
            <div
                className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 flex items-center justify-center cursor-pointer"
                style={{ animationDelay: "0.7s" }}
                >
                <Link href="/chatbot" className="w-full h-full">
                    <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold w-full h-full rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 text-2xl">
                    Let's Talk
                    </button>
                </Link>
                </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutComponent;


