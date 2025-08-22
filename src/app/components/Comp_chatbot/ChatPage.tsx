


"use client";
import { useState, useEffect, useRef } from 'react';
import { Message } from '../../types';
import Header from './Header';
import ChatContainer from './ChatContainer';
import InputArea from './InputArea';
import Sidebar from './Sidebar'; // <-- IMPORT THE SIDEBAR

// A simple hamburger menu icon
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);


const ChatPage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // <-- ADD STATE FOR SIDEBAR

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  

  useEffect(() => {
    setChatHistory([
      {
        role: 'model',
        parts: [{ text: "👋 Hey there! I'm your new AI health care assistant. How can I help you today?" }],
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', parts: [{ text: userInput }] };
    const newChatHistory = [...chatHistory, newUserMessage];

    setChatHistory(newChatHistory);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newChatHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const { response: botResponse } = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'model', parts: [{ text: botResponse }] },
      ]);
    } catch (error: unknown) {
      console.error('Failed to send message:', error);

      let errorMessage = 'Something went wrong';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'model', parts: [{ text: `⚠️ Oops! ${errorMessage}` }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- UPDATE THE MAIN LAYOUT TO USE FLEXBOX ---
    <div className="h-screen w-screen flex bg-[#0a0a2a] text-gray-200 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-slate-800 flex items-center justify-between">
            {/* --- ADD HAMBURGER MENU BUTTON FOR MOBILE --- */}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-4 text-slate-400 hover:text-white lg:hidden"
            >
                <MenuIcon />
            </button>
            <div className="flex-grow">
                <Header />
            </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 min-h-0" ref={chatContainerRef}>
          <ChatContainer chatHistory={chatHistory} isLoading={isLoading} />
        </div>

        {/* Input Area */}
        <div>
          <InputArea
            userInput={userInput}
            setUserInput={setUserInput}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
