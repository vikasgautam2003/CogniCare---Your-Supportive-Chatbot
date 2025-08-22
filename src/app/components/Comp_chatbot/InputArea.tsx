


// import React, { KeyboardEvent } from 'react';
// import { SendIcon } from './Icons';

// interface InputAreaProps {
//   userInput: string;
//   setUserInput: (value: string) => void;
//   isLoading: boolean;
//   handleSendMessage: () => void;
// }

// const InputArea: React.FC<InputAreaProps> = ({
//   userInput,
//   setUserInput,
//   isLoading,
//   handleSendMessage,
// }) => {
//   const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
//       event.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="bg-white border-t border-gray-200 sticky bottom-0">
//       <div className="w-full py-4">
//         <div className="relative">
//          <textarea
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Message CogniCare..."
//             rows={1}   // default height bigger
//             className="w-full pl-5 pr-16 py-5 text-lg font-medium
//                       bg-white text-gray-900
//                       border border-gray-200 rounded-2xl
//                       shadow-md
//                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
//                       transition-all duration-200
//                       resize-none min-h-[80px] max-h-60"
//           />

//           <button
//             onClick={handleSendMessage}
//             disabled={isLoading || !userInput.trim()}
//             className="absolute right-3.5 bottom-3.5 bg-blue-500 
//                        text-white p-2.5 rounded-xl shadow-md
//                        hover:bg-blue-600 hover:scale-105 active:scale-95
//                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
//                        transition-all duration-200
//                        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
//           >
//             <SendIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InputArea;





import React, { KeyboardEvent, useState } from 'react';
import { SendIcon, SparklesIcon } from './Icons';

interface InputAreaProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  handleSendMessage: () => void;
}

const suggestionPrompts = [
  "Explain quantum computing in simple terms",
  "Best places to visit in Japan?",
  "Write a short story about a robot",
  "Healthy breakfast recipe",
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
    setTimeout(() => {
        const sendButton = document.getElementById('send-button');
        if(sendButton) sendButton.click();
    }, 100);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/80 sticky bottom-0 p-4 md:p-6">
      <div className="w-full max-w-4xl mx-auto">
        {showSuggestions && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
            {suggestionPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(prompt)}
                className="bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-all duration-200"
          >
            <SparklesIcon />
          </button>

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message CogniCare..."
            rows={1}
            className="w-full pl-16 pr-16 py-5 text-base font-medium
                       bg-gray-50 text-gray-900
                       border border-gray-200 rounded-2xl
                       shadow-inner
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition-all duration-200
                       resize-none min-h-[80px] md:min-h-[90px] max-h-60"
          />

          <button
            id="send-button"
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 
                       text-white p-3 rounded-full shadow-lg
                       hover:scale-105 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
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
