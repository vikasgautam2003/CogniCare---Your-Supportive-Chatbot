



import React, { KeyboardEvent, useState } from 'react';
import { SendIcon, SparklesIcon } from './Icons';

interface InputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
}

const suggestionPrompts = [
  "How can I manage feelings of anxiety?",
  "Suggest a simple 5-minute mindfulness exercise",
  "What are some ways to build a healthy routine?",
  "Help me write a positive affirmation for today"
];


const InputArea: React.FC<InputAreaProps> = ({
  userInput,
  setUserInput,
  isLoading,
  handleSendMessage,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setUserInput(prompt);
    setShowSuggestions(false);
    // Use a small timeout to allow state to update before attempting to click the send button
    setTimeout(() => {
        const sendButton = document.getElementById('send-button');
        if(sendButton) sendButton.click();
    }, 100);
  };

  return (
    // --- CHANGE: The main container is now themed with a dark gradient and border ---
    <div className="bg-gradient-to-t from-[#111133] to-[#0a0a2a] border-t border-slate-800 sticky bottom-0 p-4 md:p-6 border-none">
      <div className="w-full max-w-4xl mx-auto ">
        {showSuggestions && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
            {suggestionPrompts.map((prompt, index) => (
              // --- CHANGE: Suggestion buttons are styled for the dark theme ---
              <button
                key={index}
                onClick={() => handleSuggestionClick(prompt)}
                className="bg-slate-800/50 text-slate-300 text-sm font-medium px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700/70 hover:border-slate-600 transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          {/* --- CHANGE: Suggestions toggle button is styled for the dark theme --- */}
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-400 p-2 rounded-full hover:bg-slate-700 transition-all duration-200"
          >
            <SparklesIcon />
          </button>

          {/* --- CHANGE: Textarea is now white, with an updated focus ring for consistency --- */}
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message CogniCare..."
            rows={1}
            className="w-full pl-14 pr-16 py-4 text-base font-medium
                       bg-white text-gray-900 
                       border border-gray-300 rounded-xl
                       shadow-inner
                       focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500
                       transition-all duration-200
                       resize-none min-h-[60px] max-h-60"
          />

          {/* --- CHANGE: Send button gradient and focus ring updated for theme consistency --- */}
          <button
            id="send-button"
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-br from-violet-500 to-purple-600 
                       text-white p-2 rounded-full shadow-lg
                       hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500
                       transition-all duration-200
                       disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:scale-100"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;