import React from 'react';

const LoadingIndicator: React.FC = () => {
  const messages = [
    "Resolving merge conflicts...",
    "Rebasing your timeline...",
    "Fetching from origin...",
    "Cherry-picking commits...",
    "Stashing changes...",
  ];

  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated commit graph */}
      <div className="mb-8 relative">
        <svg width="120" height="120" className="animate-pulse">
          <circle cx="60" cy="20" r="10" fill="#a855f7" className="animate-bounce" style={{ animationDelay: '0ms' }} />
          <line x1="60" y1="30" x2="60" y2="50" stroke="#a855f7" strokeWidth="3" />
          <circle cx="60" cy="60" r="10" fill="#22d3ee" className="animate-bounce" style={{ animationDelay: '200ms' }} />
          <line x1="60" y1="70" x2="60" y2="90" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="60" cy="100" r="10" fill="#22c55e" className="animate-bounce" style={{ animationDelay: '400ms' }} />

          {/* Branch line */}
          <line x1="70" y1="60" x2="100" y2="60" stroke="#f472b6" strokeWidth="3" />
          <circle cx="100" cy="60" r="8" fill="#f472b6" className="animate-ping" />
        </svg>
      </div>

      <div className="font-mono text-cyan-400 text-lg mb-4">
        <span className="text-purple-400">$</span> {messages[messageIndex]}
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;
