import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      {/* Keif the Kraken ASCII Art */}
      <pre className="text-purple-400 text-xs md:text-sm mb-6 font-mono leading-tight">
{`      ___
   .-'   '-.
  /  .---.  \\
 |  /     \\  |
 | |  O O  | |
 |  \\ ._. /  |
  \\  '---'  /
   '._____.'\n    /|   |\\
   (_|   |_)`}
      </pre>

      <h1 className="text-4xl md:text-6xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 mb-4 flicker-text">
        GIT QUEST
      </h1>
      <h2 className="text-xl md:text-2xl font-pixel text-cyan-300 mb-8">
        BRANCH HERO
      </h2>

      <p className="text-lg md:text-xl text-purple-300 mb-2 max-w-md">
        Learn Git through adventure!
      </p>
      <p className="text-md text-cyan-400 mb-8 max-w-md">
        Keif the Kraken will guide you through merge conflicts, rebasing, and more.
      </p>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={onStart}
          className="px-8 py-4 text-xl font-pixel text-cyan-300 border-2 border-cyan-400
                     hover:bg-cyan-400/20 hover:text-white hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]
                     transition-all duration-300 relative group"
        >
          <span className="relative z-10">git init adventure</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <p className="text-sm text-purple-400/70 mt-4">
          Powered by GitKraken
        </p>
      </div>

      {/* Decorative commit graph */}
      <div className="absolute bottom-8 left-8 opacity-30">
        <svg width="100" height="200" className="text-cyan-400">
          <circle cx="20" cy="20" r="8" fill="currentColor" />
          <line x1="20" y1="28" x2="20" y2="60" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="68" r="8" fill="currentColor" />
          <line x1="20" y1="76" x2="20" y2="108" stroke="currentColor" strokeWidth="2" />
          <line x1="28" y1="68" x2="60" y2="68" stroke="currentColor" strokeWidth="2" />
          <circle cx="68" cy="68" r="8" fill="#a855f7" />
          <line x1="68" y1="76" x2="68" y2="108" stroke="#a855f7" strokeWidth="2" />
          <circle cx="20" cy="116" r="8" fill="currentColor" />
          <line x1="20" y1="124" x2="20" y2="156" stroke="currentColor" strokeWidth="2" />
          <circle cx="68" cy="116" r="8" fill="#a855f7" />
          <line x1="60" y1="116" x2="28" y2="156" stroke="#a855f7" strokeWidth="2" />
          <circle cx="20" cy="164" r="8" fill="#22c55e" />
        </svg>
      </div>
    </div>
  );
};

export default StartScreen;
