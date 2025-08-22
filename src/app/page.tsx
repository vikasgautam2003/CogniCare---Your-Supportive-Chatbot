

// import Home from "./components/Home";

// export default async function Page() {
//   // Artificial delay to show loading.tsx
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   return <Home />;
// }


"use client";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until everything (images, videos, fonts) is loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1200); // small delay for smooth fade-out
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a2a] text-white">
          <style jsx>{`
            .loader {
              display: flex;
              gap: 0.5rem;
            }
            .dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background: linear-gradient(135deg, #00f5d4, #7b2ff7);
              animation: bounce 0.8s infinite alternate;
            }
            .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .dot:nth-child(3) {
              animation-delay: 0.4s;
            }

            @keyframes bounce {
              from {
                transform: translateY(0);
                opacity: 0.6;
              }
              to {
                transform: translateY(-12px);
                opacity: 1;
              }
            }

            .ai-text {
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1rem;
              background: linear-gradient(90deg, #00f5d4, #7b2ff7, #00f5d4);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-size: 200% auto;
              animation: shine 3s linear infinite;
            }

            @keyframes shine {
              to {
                background-position: 200% center;
              }
            }
          `}</style>

          <div className="text-center">
            {/* AI Loader Dots */}
            <div className="loader justify-center">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>

            {/* AI Text */}
            <p className="ai-text">Initializing CogniCare AI...</p>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}
