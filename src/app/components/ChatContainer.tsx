


// import React, { forwardRef } from 'react';
// import { Message } from '../types';
// import { BotIcon, UserIcon } from './Icons';

// interface ChatContainerProps {
//   chatHistory: Message[];
//   isLoading: boolean;
// }

// const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
//   ({ chatHistory, isLoading }, ref) => {
//     return (
//       <div ref={ref} className="relative h-full w-full overflow-y-auto min-h-0">
//         {/* Background image layer */}
//         <div className="absolute inset-0">
//           {/* Background image that switches by screen size */}
//           <div
//             className="
//               absolute inset-0 bg-center bg-cover
//               bg-[url('/gemini.png')]
//               md:bg-[url('/pexels-pixabay-33582.jpg')]
//             "
//           ></div>

//           {/* White overlay at 70% opacity */}
//           <div className="absolute inset-0 bg-white/40"></div>
//         </div>


//         {/* Chat content above background */}
//         <div className="relative w-full h-full p-4 md:p-6">
//           <div className="relative">
//             {chatHistory.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start gap-4 my-5 ${
//                   message.role === 'user' ? 'justify-end' : ''
//                 }`}
//               >
//                 {message.role === 'model' && <BotIcon />}
//                 <div
//                   className={`p-4 rounded-2xl max-w-xl shadow-lg transition-all duration-300 ${
//                     message.role === 'user'
//                       ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-lg'
//                       : 'bg-white/95 backdrop-blur-sm text-gray-800 border border-gray-200/80 rounded-bl-lg'
//                   }`}
//                 >
//                   <p className="whitespace-pre-wrap text-base leading-relaxed">
//                     {message.parts[0].text}
//                   </p>
//                 </div>
//                 {message.role === 'user' && <UserIcon />}
//               </div>
//             ))}

//             {isLoading && (
//               <div className="flex items-start gap-4">
//                 <BotIcon />
//                 <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl rounded-bl-lg border border-gray-200/80 shadow-lg">
//                   <div className="flex items-center space-x-2">
//                     <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>
//                     <span
//                       className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
//                       style={{ animationDelay: '0.2s' }}
//                     ></span>
//                     <span
//                       className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
//                       style={{ animationDelay: '0.4s' }}
//                     ></span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// ChatContainer.displayName = 'ChatContainer';
// export default ChatContainer;



import React, { forwardRef } from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon } from './Icons';

interface ChatContainerProps {
  chatHistory: Message[];
  isLoading: boolean;
  onPromptSelect?: (prompt: string) => void; // 👈 allow sending prompt
}



const suggestions = [
  "🌿 Share a quick mindfulness exercise",
  "💬 Help me reframe a negative thought",
  "🧘 Guide me through a 1-minute breathing practice",
  "💡 Give me a self-care tip for today",
  "✨ Tell me something uplifting or inspiring",
  "📖 Share a short journaling prompt",
];




const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ chatHistory, isLoading, onPromptSelect }, ref) => {
    return (
      <div ref={ref} className="relative h-full w-full overflow-y-auto min-h-0">
        {/* Background image layer */}
        <div className="absolute inset-0">
          <div
            className="
              absolute inset-0 bg-center bg-cover
              bg-[url('/gemini.png')]
              md:bg-[url('/pexels-pixabay-33582.jpg')]
            "
          ></div>
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        {/* Chat content */}
        <div className="relative w-full h-full p-4 md:p-6 flex flex-col">
          <div className="relative flex-1">
            {chatHistory.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full">
                  {suggestions.map((text, idx) => (
                    <button
                        key={idx}
                        onClick={() => onPromptSelect?.(text)}
                        className="
                          px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold 
                          rounded-2xl shadow-md 
                          bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100
                          text-indigo-700
                          border border-indigo-200/70
                          hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                          hover:text-white 
                          transition-all duration-300 transform hover:scale-105
                        "
                      >
                        {text}
                      </button>

                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 my-5 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'model' && <BotIcon />}
                    <div
                      className={`p-4 rounded-2xl max-w-xl shadow-lg transition-all duration-300 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-lg'
                          : 'bg-white/95 backdrop-blur-sm text-gray-800 border border-gray-200/80 rounded-bl-lg'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-base leading-relaxed">
                        {message.parts[0].text}
                      </p>
                    </div>
                    {message.role === 'user' && <UserIcon />}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-4">
                    <BotIcon />
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl rounded-bl-lg border border-gray-200/80 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>
                        <span
                          className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                        <span
                          className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';
export default ChatContainer;
