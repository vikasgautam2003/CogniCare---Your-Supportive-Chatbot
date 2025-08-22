




// import React from 'react';

// // A simple, modern brain icon component
// const BrainIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     width="24" 
//     height="24" 
//     viewBox="0 0 24 24" 
//     fill="none" 
//     stroke="currentColor" 
//     strokeWidth="2" 
//     strokeLinecap="round" 
//     strokeLinejoin="round"
//     className="w-5 h-5 text-white"
//   >
//     <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5-2.5"/>
//     <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5-2.5"/>
//     <path d="M5 10a4.5 4.5 0 0 1 4.5-4.5A4.5 4.5 0 0 1 14 10"/>
//     <path d="M19 10a4.5 4.5 0 0 0-4.5-4.5A4.5 4.5 0 0 0 10 10"/>
//     <path d="M5 14a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 14 14"/>
//     <path d="M19 14a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 10 14"/>
//   </svg>
// );


// const Header = () => {
//   return (
//    <div className="px-4 pb-4 p-6 sm:px-6 sm:pb-6 bg-white border-b border-gray-100 flex items-center">
//       <div className="flex items-center">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
//             <img src="/logo.png" alt="CogniCare Logo" className="w-8 h-8" />
//           </div>
//           <div className="ml-4">
//             <h1 className="text-lg font-bold text-gray-800">CogniCare</h1>
//             <p className="text-xs text-gray-500">Your AI-Powered Companion</p>
//           </div>
//         </div>
//  </div>
//   );
// };

// export default Header;






import React from 'react';

// The BrainIcon component remains the same
const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-cyan-400"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5-2.5" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5-2.5" />
    <path d="M5 10a4.5 4.5 0 0 1 4.5-4.5A4.5 4.5 0 0 1 14 10" />
    <path d="M19 10a4.5 4.5 0 0 0-4.5-4.5A4.5 4.5 0 0 0 10 10" />
    <path d="M5 14a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 14 14" />
    <path d="M19 14a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 10 14" />
  </svg>
);


const Header = () => {
  return (
    <div className="px-4 py-4 sm:px-6 bg-[#0a0a2a] flex items-center">
      <div className="flex items-center">
        {/* --- CHANGE: New gradient and a new, softer violet glow --- */}
        <div className="w-10 h-10 bg-gradient-to-br from-violet-950 to-[#0a0a2a] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.25)]">
          <BrainIcon />
        </div>
        <div className="ml-4">
          {/* --- CHANGE: Text gradient updated to complement the new violet hue --- */}
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-violet-300">
            CogniCare
          </h1>
          <p className="text-xs text-slate-500">
            Your AI-Powered Companion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;