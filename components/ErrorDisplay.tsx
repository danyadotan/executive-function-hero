import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 max-w-lg mx-auto">
      <div className="ui-panel p-8 rounded-lg text-center">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>

        <div className="text-4xl mb-4">🌙</div>
        <h2 className="text-2xl font-pixel text-pink-400 mb-4">OOPS</h2>
        <p className="text-cyan-200 mb-4">
          {message || "Something unexpected happened. That's okay - let's try again."}
        </p>

        {/* Gentle reminder */}
        <div className="p-3 rounded bg-purple-900/30 border border-purple-400/30 mb-6">
          <p className="text-sm text-purple-300">
            It's perfectly normal for things to not work sometimes.
            Take a breath, and we'll try again together.
          </p>
        </div>

        <button
          onClick={onRetry}
          className="px-6 py-3 font-pixel text-cyan-300 border-2 border-cyan-400
                     hover:bg-cyan-400/20 hover:text-white transition-all duration-300"
        >
          git reset --soft HEAD~1
        </button>

        <p className="text-sm text-purple-400 mt-4">
          (Try again)
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
