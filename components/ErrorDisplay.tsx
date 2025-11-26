import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="ui-panel p-8 max-w-md relative">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>

        <div className="text-6xl mb-4">💥</div>

        <h2 className="text-2xl font-pixel text-red-400 mb-4">
          MERGE CONFLICT!
        </h2>

        <div className="font-mono text-sm text-red-300 bg-red-900/30 p-4 rounded mb-6 text-left">
          <p className="text-red-500">error: could not continue adventure</p>
          <p className="text-gray-400 mt-2">{message || "An unexpected error occurred"}</p>
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
