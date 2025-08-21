// import React, { forwardRef } from 'react';
// import { Message } from '../types';
// import { BotIcon, UserIcon } from './Icons';

// interface ChatContainerProps {
//   chatHistory: Message[];
//   isLoading: boolean;
// }

// const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
//   ({ chatHistory, isLoading }, ref) => {
//     // Define the background style with a translucent overlay
//     const containerStyle = {
//       backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/Gemini_Generated_Image_41m0bm41m0bm41m0.png')`,
//     };

//     return (
//       <div
//         ref={ref}
//         style={containerStyle}
//         className="flex-1 overflow-y-auto bg-[length:auto_100%] bg-no-repeat bg-center"
//       >
//         <div className="max-w-3xl mx-auto w-full p-4 md:p-6">
//             {chatHistory.map((message, index) => (
//             <div
//                 key={index}
//                 className={`flex items-start gap-4 my-5 ${
//                 message.role === 'user' ? 'justify-end' : ''
//                 }`}
//             >
//                 {message.role === 'model' && <BotIcon />}
//                 <div
//                 className={`p-4 rounded-2xl max-w-xl shadow-lg transition-all duration-300 ${
//                     message.role === 'user'
//                     ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-lg'
//                     : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200/80 rounded-bl-lg'
//                 }`}
//                 >
//                 <p className="whitespace-pre-wrap text-base leading-relaxed">{message.parts[0].text}</p>
//                 </div>
//                 {message.role === 'user' && <UserIcon />}
//             </div>
//             ))}
//             {isLoading && (
//             <div className="flex items-start gap-4">
//                 <BotIcon />
//                 <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl rounded-bl-lg border border-gray-200/80 shadow-lg">
//                 <div className="flex items-center space-x-2">
//                     <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>
//                     <span
//                     className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
//                     style={{ animationDelay: '0.2s' }}
//                     ></span>
//                     <span
//                     className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"
//                     style={{ animationDelay: '0.4s' }}
//                     ></span>
//                 </div>
//                 </div>
//             </div>
//             )}
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
}

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ chatHistory, isLoading }, ref) => {
    // Define the background style with a translucent overlay
    const containerStyle = {
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/Gemini_Generated_Image_41m0bm41m0bm41m0.png')`,
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className="flex-1 overflow-y-auto bg-[length:auto_100%] bg-no-repeat bg-center"
      >
        <div className="w-full h-full p-4 md:p-6">
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
                    : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200/80 rounded-bl-lg'
                }`}
                >
                <p className="whitespace-pre-wrap text-base leading-relaxed">{message.parts[0].text}</p>
                </div>
                {message.role === 'user' && <UserIcon />}
            </div>
            ))}
            {isLoading && (
            <div className="flex items-start gap-4">
                <BotIcon />
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl rounded-bl-lg border border-gray-200/80 shadow-lg">
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
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';
export default ChatContainer;
