// import React, { useEffect, useRef } from 'react';

// const WhyUsComponent = () => {
//   // 1. Create a ref directly in the component.
//   const sectionRef = useRef<HTMLElement>(null);

//   // 2. Add the animation logic using useEffect.
//   useEffect(() => {
//     const element = sectionRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-reveal');
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const itemsToAnimate = element.querySelectorAll('.grid-item');
//     if (itemsToAnimate.length > 0) {
//       itemsToAnimate.forEach((item) => observer.observe(item));
//     } else {
//       observer.observe(element);
//     }

//     // Cleanup function
//     return () => {
//       observer.disconnect();
//     };
//   }, []); // Empty array ensures this runs only once.

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes reveal {
//           from {
//             opacity: 0;
//             transform: translateY(40px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-reveal {
//           animation: reveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
//         }
//       `}</style>
      
//       {/* 3. Attach the ref to your section element. */}
//       <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
//             {/* Content Section - NOTE: `opacity-0` is removed */}
//             <div className="grid-item" style={{ animationDelay: '0.1s' }}>
//               <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
//                 Why CogniCare?
//               </h2>
//               <p className="text-lg text-gray-300 mb-8">
//                 We go beyond simple chatbots. By leveraging advanced **Vector Databases**, we create a deeply personalized and empathetic experience. Your conversations are understood in context, allowing for truly meaningful and supportive interactions that remember, adapt, and grow with you.
//               </p>
              
//               {/* Stylized Code Editor */}
//               <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl mt-8">
//                 <div className="p-3 bg-gray-800/50 rounded-t-xl flex items-center">
//                   <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                 </div>
//                 <div className="p-6 text-sm font-mono">
//                   <p><span className="text-purple-400">const</span> userFeeling = <span className="text-green-400">"I'm feeling a bit lost today."</span>;</p>
//                   <p className="mt-2"><span className="text-purple-400">const</span> similarMemories = await <span className="text-cyan-400">vectorDB.findSimilar</span>(userFeeling, 5);</p>
//                   <p className="mt-2"><span className="text-purple-400">const</span> empatheticResponse = <span className="text-cyan-400">AI.generateResponse</span>(similarMemories);</p>
//                   <p className="mt-4 text-gray-500">// Result: A conversation that truly understands.</p>
//                 </div>
//               </div>
//             </div>

//             {/* Animated Image Section - NOTE: `opacity-0` is removed */}
//             <div className="grid-item h-96 relative" style={{ animationDelay: '0.3s' }}>
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
//                 <img src="https://placehold.co/600x800/000000/ffffff?text=Empathy" alt="Empathetic AI" className="w-full h-full object-cover rounded-3xl" />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-3xl transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
//                 <img src="https://placehold.co/600x800/ffffff/000000?text=Understanding" alt="AI Understanding" className="w-full h-full object-cover rounded-3xl opacity-90" />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default WhyUsComponent;


import React, { useEffect, useRef } from 'react';

const WhyUsComponent = () => {
  // 1. Create a ref to attach to the section for animations.
  const sectionRef = useRef<HTMLElement>(null);

  // 2. The animation logic remains the same, as it's not device-dependent.
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
      { threshold: 0.1 }
    );

    const itemsToAnimate = element.querySelectorAll('.grid-item');
    if (itemsToAnimate.length > 0) {
      itemsToAnimate.forEach((item) => observer.observe(item));
    } else {
      observer.observe(element);
    }

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []); // Empty array ensures this runs only once.

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
          animation: reveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      
      {/* 3. Attach the ref to the main section element. */}
      <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* - Mobile (default): A single-column layout with a smaller gap.
            - Desktop (lg): A two-column layout with a larger gap.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Content Section: This stacks naturally on mobile. */}
            <div className="grid-item" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Why CogniCare?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                We go beyond simple chatbots. By leveraging advanced **Vector Databases**, we create a deeply personalized and empathetic experience. Your conversations are understood in context, allowing for truly meaningful and supportive interactions that remember, adapt, and grow with you.
              </p>
              
              {/* Stylized Code Editor */}
              <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl mt-8">
                <div className="p-3 bg-gray-800/50 rounded-t-xl flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-6 text-sm font-mono overflow-x-auto">
                  <p><span className="text-purple-400">const</span> userFeeling = <span className="text-green-400">"I'm feeling a bit lost today."</span>;</p>
                  <p className="mt-2"><span className="text-purple-400">const</span> similarMemories = await <span className="text-cyan-400">vectorDB.findSimilar</span>(userFeeling, 5);</p>
                  <p className="mt-2"><span className="text-purple-400">const</span> empatheticResponse = <span className="text-cyan-400">AI.generateResponse</span>(similarMemories);</p>
                  <p className="mt-4 text-gray-500">// Result: A conversation that truly understands.</p>
                </div>
              </div>
            </div>

            {/* Animated Image Section:
              - Mobile (default): A shorter height (h-80) to save vertical space.
              - Desktop (lg): Taller height (h-96) for a more impactful visual.
            */}
            <div className="grid-item h-80 lg:h-96 relative" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <img src="https://placehold.co/600x800/000000/ffffff?text=Empathy" alt="Empathetic AI" className="w-full h-full object-cover rounded-3xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-3xl transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <img src="https://placehold.co/600x800/ffffff/000000?text=Understanding" alt="AI Understanding" className="w-full h-full object-cover rounded-3xl opacity-90" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUsComponent;
