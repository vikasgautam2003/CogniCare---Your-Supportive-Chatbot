"use client";
import { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import Header from './Header';
import ChatContainer from './ChatContainer';
import InputArea from './InputArea';

const ChatPage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  useEffect(() => {
    setChatHistory([
      {
        role: 'model',
        parts: [{ text: "Hello! I'm your new, uniquely designed AI assistant. How can I help you today?" }],
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
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'model', parts: [{ text: `Sorry, an error occurred: ${error.message}` }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 font-sans max-w-7xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
      <Header />
      <ChatContainer chatHistory={chatHistory} isLoading={isLoading} ref={chatContainerRef} />
      <InputArea
        userInput={userInput}
        setUserInput={setUserInput}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
