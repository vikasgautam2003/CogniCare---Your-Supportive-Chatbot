


"use client"
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import AboutComponent from './components/Comp_Homepage/About';
import WhyUsComponent from './components/Comp_Homepage/Whyus';
import TestimonialsComponent from './components/Comp_Homepage/Testimonial';
import FooterComponent from './components/Comp_Homepage/Footer';
import Link from 'next/link';

const Home = () => {
  // Create a ref to target the video container
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // useEffect to handle the scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current) {
        // This moves the video down at half the scroll speed, creating a "sticky" parallax effect
        videoContainerRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <main className="relative w-full h-screen font-['Manrope',_sans-serif] text-white overflow-hidden">
        {/* Video Background Layer */}
        <div ref={videoContainerRef} className="absolute top-0 left-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover"
          >
            <source src="/happy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#0a0a2a] opacity-70"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full font-poppins">
            {/* Navbar */}
            <nav className="w-full p-6 flex items-center justify-between animate-fade-in-down">
              <div className="text-2xl font-extrabold tracking-tight">
                CogniCare
              </div>
              <div className="hidden md:flex items-center space-x-30 text-gray-300 font-semibold">
                <a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">About</a>
                <a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Contact</a>
                <a href="#" className="hover:text-white transition-colors duration-300 cursor-pointer">Gemini</a>
              </div>
              <div className="flex items-center space-x-8">
                <button className="font-semibold text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                  Login
                </button>
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Sign Up
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
              <h1 className="font-poppins text-4xl md:text-7xl font-extrabold max-w-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Compassionate conversations to help lighten your emotional load
              </h1>
              
              <p className="font-manrope mt-6 max-w-2xl text-base md:text-lg text-gray-300">
                CogniCare is your private, AI-powered companion, here to provide a
                supportive space for your thoughts and feelings, anytime you need.
              </p>
              
              <div className="mt-12 flex flex-row sm-flex-col gap-6">
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-10 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-lg shadow-lg cursor-pointer">
                  Login
                </button>
                <Link href="/chatbot">
                  <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-10 py-4 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 text-lg cursor-pointer">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </main>
      <div className='bg-[#0a0a2a]'>
        <AboutComponent />
      </div>
      <div className='bg-[#0a0a2a]'>
        <WhyUsComponent />
      </div>
      <div className='bg-[#0a0a2a]'>
        <TestimonialsComponent />
      </div>
      <FooterComponent />
    </>
  );
};

export default Home;
