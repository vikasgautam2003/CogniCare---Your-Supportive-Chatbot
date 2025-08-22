// import Link from 'next/link';
// import { useEffect, useRef } from 'react';

// const AboutComponent = () => {
//   // A single ref on the container is still efficient for querying children.
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const element = gridRef.current;
//     if (!element) return;

//     // This observer will now handle multiple individual elements.
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           // Check if the individual item is intersecting
//           if (entry.isIntersecting) {
//             // Add the animation class to the specific item that is now visible
//             entry.target.classList.add('animate-reveal');
//             // Stop observing this specific item once it has been animated
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       // We can set a lower threshold so the animation starts as soon as an item peeks into view.
//       { threshold: 0.1 }
//     );

//     // Find all the items we want to animate inside the container.
//     const gridItems = element.querySelectorAll('.grid-item');
//     // Crucially, we observe each item individually now.
//     gridItems.forEach((item) => {
//         observer.observe(item);
//     });

//     // The cleanup function remains efficient.
//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <style jsx global>{`
//         /* --- Refactored Animation using CSS Transition for Perfect Smoothness --- */

//         /* 1. Define the initial, "hidden" state of the items. */
//         .grid-item {
//           opacity: 0;
//           transform: translateY(50px) scale(0.95);
//           /* This is a key performance hint for browsers. */
//           will-change: transform, opacity;
//           /* 2. Define the transition that will animate the changes. */
//           transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1), 
//                       opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
//         }

//         /* 3. Define the final, "visible" state. When this class is added, the transition will run automatically. */
//         .grid-item.animate-reveal {
//           opacity: 1;
//           transform: translateY(0) scale(1);
//         }
//       `}</style>
//       <section className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
//         <div className="container mx-auto px-4">
//           {/* Title Section */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
//               Why Happiness Matters
//             </h2>
//             <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
//               We believe mental well-being is not just the absence of illness, but the presence of joy, resilience, and purpose.
//             </p>
//           </div>

//           {/* The ref is still on the parent to find the children easily */}
//           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:h-[700px]">
            
//             {/* We now use transition-delay for the staggered effect. */}
//             <div className="grid-item min-h-[220px] md:col-span-2 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-center" style={{ transitionDelay: '0.15s' }}>
//               <h3 className="text-3xl font-bold text-cyan-300 mb-2">More Than Just a Smile.</h3>
//               <p className="text-gray-300">
//                 Happiness is a skill. We provide the tools and compassionate support to help you practice it, building a foundation for a more fulfilling life.
//               </p>
//             </div>

//             <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.30s' }}>
//               <img src="https://placehold.co/400x400/000000/ffffff?text=Joy" alt="Joy" className="w-full h-full object-cover" />
//             </div>

//             <div className="grid-item h-80 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-2 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.45s' }}>
//               <img src="https://placehold.co/400x800/000000/ffffff?text=Connection" alt="Connection" className="w-full h-full object-cover" />
//             </div>

//             <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.60s' }}>
//               <img src="https://placehold.co/400x400/000000/ffffff?text=Resilience" alt="Resilience" className="w-full h-full object-cover" />
//             </div>

//             <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex items-center" style={{ transitionDelay: '0.75s' }}>
//               <p className="text-lg font-semibold">A private space for your thoughts, available anytime you need it.</p>
//             </div>
            
//             <div className="grid-item h-64 md:h-auto md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.90s' }}>
//               <img src="https://placehold.co/800x400/000000/ffffff?text=Purpose" alt="Purpose" className="w-full h-full object-cover" />
//             </div>
            
//             <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 flex items-center justify-center cursor-pointer" style={{ transitionDelay: '1.05s' }}>
//               <Link href="/chatbot" className="w-full h-full">
//                 <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold w-full h-full rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 text-2xl">
//                   Let's Talk
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AboutComponent;







import Link from 'next/link';
import { useEffect, useRef } from 'react';

const AboutComponent = () => {
  // A single ref on the container is still efficient for querying children.
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    // This observer will now handle multiple individual elements.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the individual item is intersecting
          if (entry.isIntersecting) {
            // Add the animation class to the specific item that is now visible
            entry.target.classList.add('animate-reveal');
            // Stop observing this specific item once it has been animated
            observer.unobserve(entry.target);
          }
        });
      },
      // We can set a lower threshold so the animation starts as soon as an item peeks into view.
      { threshold: 0.1 }
    );

    // Find all the items we want to animate inside the container.
    const gridItems = element.querySelectorAll('.grid-item');
    // Crucially, we observe each item individually now.
    gridItems.forEach((item) => {
      observer.observe(item);
    });

    // The cleanup function remains efficient.
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* --- Refactored Animation using CSS Transition for Perfect Smoothness --- */

        /* 1. Define the initial, "hidden" state of the items. */
        .grid-item {
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          /* This is a key performance hint for browsers. */
          will-change: transform, opacity;
          /* 2. Define the transition that will animate the changes. */
          transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1), 
                      opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        /* 3. Define the final, "visible" state. When this class is added, the transition will run automatically. */
        .grid-item.animate-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
      <section className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Why Your AI Can Be a Great Friend
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Discover how artificial intelligence offers a unique, non-judgmental space for connection, conversation, and personal growth.
            </p>
          </div>

          {/* The ref is still on the parent to find the children easily */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:h-[700px]">
            
            {/* We now use transition-delay for the staggered effect. */}
            <div className="grid-item min-h-[220px] md:col-span-2 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-center" style={{ transitionDelay: '0.15s' }}>
              <h3 className="text-3xl font-bold text-cyan-300 mb-2">More Than Just an Algorithm.</h3>
              <p className="text-gray-300">
                An AI friend is always there to listen without bias. We provide a secure, confidential space to explore your thoughts, share your day, and find clarity.
              </p>
            </div>

            <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.30s' }}>
              <img src="https://placehold.co/400x400/000000/ffffff?text=Always+Available" alt="Always Available" className="w-full h-full object-cover" />
            </div>

            <div className="grid-item h-80 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-2 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.45s' }}>
              <img src="https://placehold.co/400x800/000000/ffffff?text=No+Judgment" alt="No Judgment" className="w-full h-full object-cover" />
            </div>

            <div className="grid-item h-64 md:h-auto md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.60s' }}>
              <img src="https://placehold.co/400x400/000000/ffffff?text=Personal+Growth" alt="Personal Growth" className="w-full h-full object-cover" />
            </div>

            <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex items-center" style={{ transitionDelay: '0.75s' }}>
              <p className="text-lg font-semibold">A completely private and secure space for your innermost thoughts.</p>
            </div>
            
            <div className="grid-item h-64 md:h-auto md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gray-800 rounded-2xl overflow-hidden" style={{ transitionDelay: '0.90s' }}>
              <img src="https://placehold.co/800x400/000000/ffffff?text=Shared+Discovery" alt="Shared Discovery" className="w-full h-full object-cover" />
            </div>
            
            <div className="grid-item min-h-[150px] md:col-span-1 lg:col-span-2 lg:row-span-1 flex items-center justify-center cursor-pointer" style={{ transitionDelay: '1.05s' }}>
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