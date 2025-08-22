






import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// --- Icon Components (remain the same) ---

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


// --- Modal Component ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: 'feedback' | 'complaint';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, type }) => {
    const form = useRef<HTMLFormElement>(null);
    // --- NEW: State to manage the sending status ---
    const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSendStatus('sending'); // --- Update status to 'sending' ---

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (form.current && serviceId && templateId && publicKey) {
            emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log('SUCCESS!', result.text);
                setSendStatus('success'); // --- Update status on success ---
            }, (error) => {
                console.log('FAILED...', error.text);
                setSendStatus('error'); // --- Update status on error ---
            });
        } else {
            console.error("EmailJS credentials are not set in the environment variables.");
            setSendStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-gray-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md m-4 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <XIcon />
                    </button>
                </div>

                {/* --- NEW: Conditional rendering based on sendStatus --- */}
                {sendStatus === 'idle' || sendStatus === 'sending' ? (
                    <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input type="text" name="from_name" placeholder="Your Name" required disabled={sendStatus === 'sending'} className="w-full p-3 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50" />
                        <input type="email" name="from_email" placeholder="Your Email" required disabled={sendStatus === 'sending'} className="w-full p-3 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50" />
                        <textarea name="message" placeholder={type === 'feedback' ? "Your feedback..." : "Please describe your complaint..."} required rows={5} disabled={sendStatus === 'sending'} className="w-full p-3 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none disabled:opacity-50"></textarea>
                        <input type="hidden" name="type" value={type} />
                        <button type="submit" disabled={sendStatus === 'sending'} className="w-full p-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors disabled:bg-violet-800 disabled:cursor-not-allowed">
                            {sendStatus === 'sending' ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                ) : sendStatus === 'success' ? (
                    <div className="text-center py-8">
                        <p className="text-lg text-green-400">Message sent successfully!</p>
                        <button onClick={onClose} className="mt-4 w-full p-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">Close</button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-lg text-red-400">Failed to send message.</p>
                        <p className="text-sm text-slate-400 mb-4">Please try again later.</p>
                        <button onClick={() => setSendStatus('idle')} className="mt-4 w-full p-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">Try Again</button>
                    </div>
                )}
            </div>
        </div>
    );
};


const deeperQuestions = [
    "What is cognitive-behavioral therapy (CBT)?",
    "How can I improve my sleep quality?",
    "Techniques for dealing with negative thought patterns.",
    "What are the benefits of journaling for mental health?",
    "How to set healthy boundaries in relationships?",
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [showDeeperQuestions, setShowDeeperQuestions] = useState(false);
  const [modalType, setModalType] = useState<null | 'feedback' | 'complaint'>(null);

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* --- Main Sidebar Container with a new theme --- */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 border-r border-slate-700 text-slate-300
                    flex flex-col p-4 z-40
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0`}
      >
        {/* 1. Header Section */}
        <div className="flex items-center justify-between gap-3 mb-6 px-2">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-violet-950 to-gray-900 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.25)]">
              <BrainIcon />
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-violet-300">
              CogniCare
            </h1>
           </div>
           <button 
            onClick={handleNewChat}
            className="p-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            title="New Chat"
           >
             <PlusIcon />
           </button>
        </div>

        {/* 2. Deeper Questions Section */}
        <div className="flex flex-col gap-2">
            <button
                onClick={() => setShowDeeperQuestions(!showDeeperQuestions)}
                className="flex items-center justify-between w-full px-4 py-3
                           bg-slate-800/50 text-slate-200 font-semibold rounded-lg
                           hover:bg-slate-700/70 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-slate-600"
            >
                <span>Deeper Questions</span>
                <ChevronDownIcon isOpen={showDeeperQuestions} />
            </button>

            {/* Collapsible Question List */}
            {showDeeperQuestions && (
                <div className="pl-4 mt-2 flex flex-col gap-1 animate-fade-in">
                    {deeperQuestions.map((question, index) => (
                        <a
                            key={index}
                            href="#"
                            className="text-sm text-slate-400 p-2 rounded-md hover:bg-slate-800 hover:text-slate-200 transition-colors"
                        >
                            {question}
                        </a>
                    ))}
                </div>
            )}
        </div>
        
        {/* Spacer to push content to the bottom */}
        <div className="flex-grow"></div>

        {/* 3. Footer Section */}
        <div className="flex flex-col gap-4 border-t border-slate-700 pt-4">
            {/* --- UPDATED: Feedback and Complaints buttons --- */}
            <div className="flex flex-col gap-2 text-center">
                <button 
                  onClick={() => setModalType('feedback')} 
                  className="w-full px-4 py-2.5 bg-slate-800/50 text-slate-300 font-medium rounded-lg hover:bg-slate-700/70 transition-colors duration-200 text-sm"
                >
                  Give Feedback
                </button>
                <button 
                  onClick={() => setModalType('complaint')} 
                  className="w-full px-4 py-2.5 bg-slate-800/50 text-slate-300 font-medium rounded-lg hover:bg-slate-700/70 transition-colors duration-200 text-sm"
                >
                  File a Complaint
                </button>
            </div>

            {/* Follow Us Links */}
            <div className="text-center pt-2">
                <p className="text-sm text-slate-500 mb-2">Follow Us</p>
                <div className="flex justify-center items-center gap-4">
                    <a href="#" className="text-slate-400 hover:text-white transition-colors"><TwitterIcon /></a>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors"><GitHubIcon /></a>
                </div>
            </div>
            
            {/* Help/Documentation Button */}
            <a 
              href="https://ai.google.dev/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-sm text-slate-400 hover:text-violet-300 transition-colors"
            >
                Need help with prompts?
            </a>
        </div>
      </aside>

      {/* Modal Render */}
      {modalType && (
        <Modal 
            isOpen={!!modalType}
            onClose={() => setModalType(null)}
            title={modalType === 'feedback' ? 'Give Feedback' : 'File a Complaint'}
            type={modalType}
        />
      )}
    </>
  );
};

export default Sidebar;
