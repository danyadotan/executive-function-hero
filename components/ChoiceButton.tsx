import React from 'react';

interface ChoiceButtonProps {
  choice: string;
  onChoose: (choice: string) => void;
  index?: number;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onChoose, index = 0 }) => {
  const prefixes = ['git checkout', 'git merge', 'git commit'];
  const prefix = prefixes[index % prefixes.length];

  return (
    <button
      onClick={() => onChoose(choice)}
      className="w-full p-4 text-left text-lg border border-cyan-500/50
                 bg-black/30 hover:bg-purple-500/20 hover:border-purple-400
                 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-center gap-3">
        <span className="text-purple-400 font-mono text-sm opacity-70 group-hover:opacity-100">
          $
        </span>
        <span className="text-cyan-300 group-hover:text-white transition-colors">
          {choice}
        </span>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onChoose }) => {
  return (
    <button
      onClick={() => onChoose(choice)}
      className="w-full neon-border neon-button p-4 text-left text-cyan-300 rounded-lg
                 transition-all duration-300 hover:shadow-lg hover:translate-x-1
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent"
    >
      <span className="text-lg md:text-xl">{choice}</span>
    </button>
  );
};

export default ChoiceButton;
