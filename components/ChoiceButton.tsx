import React from 'react';

interface ChoiceButtonProps {
  choice: string;
  onChoose: (choice: string) => void;
  index?: number;
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
