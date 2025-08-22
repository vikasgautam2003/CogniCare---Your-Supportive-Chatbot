import React, { useState, useEffect, useRef } from 'react';

// A simple, animatable chevron icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FAQComponent = () => {
  // State to track which FAQ item is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Data for the FAQ items
  const faqs = [
    {
      question: "Is my data secure and my conversations private?",
      answer: "Absolutely. Privacy is our highest priority. All conversations are end-to-end encrypted, and we have a strict policy against sharing your data. Your journey with CogniCare is completely anonymous and confidential."
    },
    {
      question: "Is CogniCare a replacement for a human therapist?",
      answer: "CogniCare is designed as a supportive tool for mental wellness, not as a replacement for professional therapy or medical advice. It's a great resource for daily check-ins and self-reflection, but we strongly encourage seeking help from a qualified professional for clinical needs."
    },
    {
      question: "What should I do if I'm in a crisis?",
      answer: "If you are in a crisis or feel you are in danger, please do not use this app. Contact a crisis hotline or dial your local emergency number immediately. CogniCare is not equipped to handle crisis situations."
    },
    {
      question: "How does the AI actually learn and remember?",
      answer: "Our AI uses advanced Vector Databases to understand the context and sentiment of your conversations. This allows it to recall relevant past discussions to provide a more coherent and empathetic experience, without ever compromising your personal data's security."
    },
    {
      question: "Is CogniCare free to use?",
      answer: "We offer a free tier with core features to ensure everyone has access to basic support. Our premium subscription unlocks advanced features like in-depth analytics, guided exercises, and more personalization options to enhance your wellness journey."
    }
  ];

  // Animation logic for revealing the section on scroll
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-section-reveal');
            const items = element.querySelectorAll('.faq-item');
            items.forEach((item, index) => {
              item.classList.add('animate-item-reveal');
              (item as HTMLElement).style.animationDelay = `${index * 0.15}s`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handler to toggle FAQ items
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes sectionReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-section-reveal {
          animation: sectionReveal 0.8s ease-out forwards;
        }
        
        @keyframes itemReveal {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-item-reveal {
          opacity: 0; /* Start hidden */
          animation: itemReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Jaw-dropping accordion animation */
        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease-in-out;
        }
        .faq-answer > div {
          overflow: hidden;
          transition: opacity 0.3s ease-in-out 0.1s;
          opacity: 0;
        }
        .faq-answer.open {
          grid-template-rows: 1fr;
        }
        .faq-answer.open > div {
          opacity: 1;
        }
      `}</style>

      <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#0a0a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Your trust is our priority. Here are answers to common questions about our technology, your privacy, and our mission.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-6"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <span className="text-cyan-300"><ChevronIcon isOpen={openIndex === index} /></span>
                </button>
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <div>
                    <p className="text-gray-300 px-6 pb-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQComponent;
