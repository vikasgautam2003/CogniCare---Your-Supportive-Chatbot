


// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";

// const WhyUsComponent = () => {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const element = sectionRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-reveal");
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const itemsToAnimate = element.querySelectorAll(".grid-item");
//     itemsToAnimate.forEach((item) => {
//       observer.observe(item);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <style jsx global>{`
//         .grid-item {
//           opacity: 0;
//           transform: translateY(50px) scale(0.95) translateZ(0);
//           will-change: transform, opacity;
//           transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1),
//             opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
//         }

//         .grid-item.animate-reveal {
//           opacity: 1;
//           transform: translateY(0) scale(1) translateZ(0);
//         }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden"
//       >
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* Content Section */}
//             <div className="grid-item" style={{ transitionDelay: "0.15s" }}>
//               <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
//                 Why CogniCare?
//               </h2>
//               <p className="text-lg text-gray-300 mb-8">
//                 We go beyond simple chatbots. By leveraging advanced{" "}
//                 <strong>Vector Databases</strong>, we create a deeply
//                 personalized and empathetic experience. Your conversations are
//                 understood in context, allowing for truly meaningful and
//                 supportive interactions that remember, adapt, and grow with you.
//               </p>

//               {/* Stylized Code Editor */}
//               <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl mt-8">
//                 <div className="p-3 bg-gray-800/50 rounded-t-xl flex items-center">
//                   <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                 </div>
//                 <div className="p-6 text-sm font-mono overflow-x-auto">
//                   <p>
//                     <span className="text-purple-400">const</span> userFeeling ={" "}
//                     <span className="text-green-400">
//                       &quot;I&apos;m feeling a bit lost today.&quot;
//                     </span>
//                     ;
//                   </p>
//                   <p className="mt-2">
//                     <span className="text-purple-400">const</span>{" "}
//                     similarMemories = await{" "}
//                     <span className="text-cyan-400">vectorDB.findSimilar</span>(
//                     userFeeling, 5);
//                   </p>
//                   <p className="mt-2">
//                     <span className="text-purple-400">const</span>{" "}
//                     empatheticResponse ={" "}
//                     <span className="text-cyan-400">AI.generateResponse</span>(
//                     similarMemories);
//                   </p>
//                   <p className="mt-4 text-gray-500">
//                     {/* Result: A conversation that truly understands. */}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Animated Image Section */}
//             <div
//               className="grid-item h-80 lg:h-96 relative"
//               style={{ transitionDelay: "0.30s" }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
//                 <img
//                   src="https://placehold.co/600x800/000000/ffffff?text=Empathy"
//                   alt="Empathetic AI"
                
//                   className="object-cover rounded-3xl"
//                 />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-3xl transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
//                 <img
//                   src="https://placehold.co/600x800/ffffff/000000?text=Understanding"
//                   alt="AI Understanding"
                  
//                   className="object-cover rounded-3xl opacity-90"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default WhyUsComponent;



"use client";
import React, { useEffect, useRef } from "react";

const WhyUsComponent = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const itemsToAnimate = element.querySelectorAll(".grid-item");
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
        .grid-item {
          opacity: 0;
          transform: translateY(50px) scale(0.95) translateZ(0);
          will-change: transform, opacity;
          transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1),
            opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .grid-item.animate-reveal {
          opacity: 1;
          transform: translateY(0) scale(1) translateZ(0);
        }

        /* Smooth floating animation */
        @keyframes float {
          0% {
            transform: translateY(0) rotate(-6deg);
          }
          50% {
            transform: translateY(-12px) rotate(-4deg) scale(1.02);
          }
          100% {
            transform: translateY(0) rotate(-6deg);
          }
        }

        @keyframes float2 {
          0% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(12px) rotate(4deg) scale(1.02);
          }
          100% {
            transform: translateY(0) rotate(6deg);
          }
        }

        .float-anim {
          animation: float 6s ease-in-out infinite;
        }

        .float-anim2 {
          animation: float2 6s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Section */}
            <div className="grid-item" style={{ transitionDelay: "0.15s" }}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Why CogniCare?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                We go beyond simple chatbots. By leveraging advanced{" "}
                <strong>Vector Databases</strong>, we create a deeply
                personalized and empathetic experience. Your conversations are
                understood in context, allowing for truly meaningful and
                supportive interactions that remember, adapt, and grow with you.
              </p>

              {/* Stylized Code Editor */}
              <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-2xl mt-8">
                <div className="p-3 bg-gray-800/50 rounded-t-xl flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-6 text-sm font-mono overflow-x-auto">
                  <p>
                    <span className="text-purple-400">const</span> userFeeling ={" "}
                    <span className="text-green-400">
                      &quot;I&apos;m feeling a bit lost today.&quot;
                    </span>
                    ;
                  </p>
                  <p className="mt-2">
                    <span className="text-purple-400">const</span>{" "}
                    similarMemories = await{" "}
                    <span className="text-cyan-400">vectorDB.findSimilar</span>(
                    userFeeling, 5);
                  </p>
                  <p className="mt-2">
                    <span className="text-purple-400">const</span>{" "}
                    empatheticResponse ={" "}
                    <span className="text-cyan-400">AI.generateResponse</span>(
                    similarMemories);
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Image Section */}
            <div
              className="grid-item h-80 lg:h-96 relative"
              style={{ transitionDelay: "0.30s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl float-anim">
                <img
                  src="https://placehold.co/600x800/000000/ffffff?text=Empathy"
                  alt="Empathetic AI"
                  className="object-cover rounded-3xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-3xl float-anim2">
                <img
                  src="https://placehold.co/600x800/ffffff/000000?text=Understanding"
                  alt="AI Understanding"
                  className="object-cover rounded-3xl opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUsComponent;
