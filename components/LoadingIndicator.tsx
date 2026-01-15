import React from 'react';

const loadingMessages = [
  "Preparing your gentle adventure...",
  "Creating a cozy moment...",
  "Gathering FLOW energy...",
  "Finding the right path...",
  "Taking a mindful breath...",
  "Loading sensory-friendly vibes...",
];

const LoadingIndicator: React.FC = () => {
  const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="ui-panel p-8 rounded-lg text-center">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>

        {/* Animated loader */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        <p className="text-xl text-cyan-300 font-pixel tracking-wide">LOADING</p>
        <p className="text-cyan-200 mt-2">{message}</p>

        {/* Breathing reminder */}
        <div className="mt-6 p-3 rounded bg-purple-900/30 border border-purple-400/30">
          <p className="text-sm text-purple-300">
            While you wait, try taking a slow, deep breath
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
