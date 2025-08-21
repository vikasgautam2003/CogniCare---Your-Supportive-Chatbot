


import React, { KeyboardEvent } from 'react';
import { SendIcon } from './Icons';

interface InputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  userInput,
  setUserInput,
  isLoading,
  handleSendMessage,
}) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 sticky bottom-0">
      <div className="w-full py-4">
        <div className="relative">
         <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message CogniCare..."
            rows={1}   // default height bigger
            className="w-full pl-5 pr-16 py-5 text-lg font-medium
                      bg-white text-gray-900
                      border border-gray-200 rounded-2xl
                      shadow-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-all duration-200
                      resize-none min-h-[80px] max-h-60"
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="absolute right-3.5 bottom-3.5 bg-blue-500 
                       text-white p-2.5 rounded-xl shadow-md
                       hover:bg-blue-600 hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       transition-all duration-200
                       disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;


