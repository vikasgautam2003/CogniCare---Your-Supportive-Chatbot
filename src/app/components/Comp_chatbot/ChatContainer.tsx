



import React, { forwardRef } from 'react';
import { Message } from '../../types';
import { BotIcon, UserIcon } from './Icons';

interface ChatContainerProps {
  chatHistory: Message[];
  isLoading: boolean;
}

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ chatHistory, isLoading }, ref) => {
    return (
      <div ref={ref} className="relative h-full w-full overflow-y-auto min-h-0">
  
        <div className="relative w-full h-full p-4 md:p-6 flex flex-col">
          <div className="relative flex-1">
            {chatHistory.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
             
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

                      className={`p-4 rounded-2xl max-w-2xl shadow-lg transition-all duration-300 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-[#10B981] to-[#0284C7] text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
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
                    {/* --- CHANGE: Loading indicator styled for the dark theme --- */}
                    <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"></span>
                        <span
                          className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                        <span
                          className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-bounce"
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