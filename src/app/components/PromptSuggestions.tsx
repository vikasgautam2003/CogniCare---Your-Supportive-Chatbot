import React from "react";

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  "✨ Tell me a fun fact",
  "📚 Summarize a news article",
  "💡 Explain a programming concept",
  "🧘 Quick mindfulness tip",
  "🍳 Healthy recipe idea",
  "🎵 Recommend a playlist",
];

const colors: string[] = [
  "bg-gradient-to-r from-pink-400 to-rose-500 text-slate-900",
  "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-900",
  "bg-gradient-to-r from-emerald-400 to-green-500 text-slate-900",
  "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900",
  "bg-gradient-to-r from-indigo-400 to-violet-500 text-slate-900",
  "bg-gradient-to-r from-fuchsia-400 to-pink-500 text-slate-900",
];

const PromptSuggestions: React.FC<{ onSelect: (prompt: string) => void }> = ({
  onSelect,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5
          w-full max-w-2xl
        "
      >
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(text)}
            className={`
              ${colors[idx % colors.length]}
              rounded-xl font-semibold shadow-md
              transition-all duration-300
              px-3 py-2 text-[13px]
              sm:px-4 sm:py-3 sm:text-sm
              lg:px-6 lg:py-4 lg:text-base
              hover:scale-105 hover:shadow-lg
              active:scale-95
            `}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
