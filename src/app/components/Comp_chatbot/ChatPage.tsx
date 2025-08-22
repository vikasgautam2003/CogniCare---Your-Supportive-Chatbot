




"use client";
import { useState, useEffect, useRef } from 'react';
import { Message } from '../../types';
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


const handlePromptSelect = (prompt: string) => {
  setUserInput(prompt);   // 👈 fill the input field
};



  useEffect(() => {
    setChatHistory([
      {
        role: 'model',
        parts: [{ text: "👋 Hey there! I'm your new AI assistant. How can I help you today?" }],
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
    // } catch (error: unknown) {
    //   console.error('Failed to send message:', error);
    //   setChatHistory((prevHistory) => [
    //     ...prevHistory,
    //     { role: 'model', parts: [{ text: `⚠️ Oops! ${error.message}` }] },
    //   ]);
    // } finally {
    //   setIsLoading(false);
    // }
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
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <Header />
      </div>

      {/* Chat Container - fills remaining height */}
      <div className="flex-1 min-h-0 bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900" ref={chatContainerRef} >
        <ChatContainer chatHistory={chatHistory} isLoading={isLoading} />
      </div>

      {/* Input Area */}
      <div className=" border-gray-200 bg-white p-4">
        <InputArea
          userInput={userInput}
          setUserInput={setUserInput}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
