// // FILE: /src/app/components/InputArea.tsx
// // ----------------------------------------------------------------
// // This component provides the text input and send button.

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
//   const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter' && !isLoading) {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="border-t border-gray-200 pt-4 mt-2">
//       <div className="flex items-center space-x-3">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={handleKeyPress}
//           placeholder="Type your message..."
//           className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
//         />
//         <button
//           onClick={handleSendMessage}
//           disabled={isLoading}
//           className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <SendIcon />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InputArea;


// FILE: /src/app/components/InputArea.tsx
// This component provides the text input and send button.

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
    <div className="p-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
            <div className="relative">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Message CogniCare..."
                    rows={1}
                    className="w-full pl-5 pr-16 py-4 border-gray-200 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none min-h-[60px] max-h-48"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !userInput.trim()}
                    className="absolute right-3.5 bottom-3.5 bg-gradient-to-br from-blue-500 to-cyan-400 text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:scale-100 shadow-md"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    </div>
  );
};

export default InputArea;
