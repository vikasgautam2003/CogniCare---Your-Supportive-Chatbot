"use client";

import { useState, useEffect } from 'react';

// Array of loading messages for a dynamic effect
const loadingTexts = [
  'Initializing AI Core...',
  'Calibrating Neural Networks...',
  'Booting Consciousness...',
  'Synthesizing Reality...',
  'Almost there...',
];

export default function Loading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a2a] text-white overflow-hidden">
      {/* AI Core Animation */}
      <div className="relative flex items-center justify-center w-48 h-48">
        
        {/* We use simple, targetable class names now */}
        <div className="pulse-ring-slow absolute w-full h-full rounded-full border-2 border-cyan-400/30"></div>
        <div className="pulse-ring-medium absolute w-2/3 h-2/3 rounded-full border-2 border-cyan-400/30"></div>
        
        {/* Central Glowing Core */}
        <div className="glowing-core w-16 h-16 bg-cyan-400 rounded-full"></div>

        {/* Orbiting Particles */}
        <div className="orbit-container-slow absolute w-full h-full">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
        </div>
        <div className="orbit-container-medium absolute w-2/3 h-2/3">
          <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]"></div>
        </div>
      </div>
      
      {/* Dynamic Loading Text */}
      <p className="mt-12 text-xl text-cyan-300 font-mono tracking-widest transition-opacity duration-500">
        {loadingTexts[currentTextIndex]}
      </p>

      {/* Indeterminate Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-900/50 overflow-hidden">
        <div className="progress-bar h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>
    </div>
  );
}