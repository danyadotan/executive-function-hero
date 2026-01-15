import React, { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
  onLearn: () => void;
}

const SensoryInfoCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  color: string;
}> = ({ title, description, icon, color }) => (
  <div className={`ui-panel p-4 rounded-lg ${color} transition-transform hover:scale-105`}>
    <div className="ui-corner top-left"></div>
    <div className="ui-corner top-right"></div>
    <div className="ui-corner bottom-left"></div>
    <div className="ui-corner bottom-right"></div>
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-lg font-bold mb-1 text-cyan-300">{title}</h3>
    <p className="text-sm text-cyan-200 opacity-90">{description}</p>
  </div>
);

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onLearn }) => {
  const [showInfo, setShowInfo] = useState(false);

  const sensoryTypes = [
    {
      title: "Visual",
      description: "How we process what we see - lights, colors, movement",
      icon: "👁️",
      color: "border-pink-400"
    },
    {
      title: "Auditory",
      description: "How we process sounds - volume, pitch, background noise",
      icon: "👂",
      color: "border-cyan-400"
    },
    {
      title: "Tactile",
      description: "How we feel touch - textures, pressure, temperature",
      icon: "✋",
      color: "border-yellow-400"
    },
    {
      title: "Vestibular",
      description: "Our sense of balance and movement in space",
      icon: "🔄",
      color: "border-green-400"
    },
    {
      title: "Proprioceptive",
      description: "Awareness of our body position and muscle control",
      icon: "🏃",
      color: "border-purple-400"
    },
    {
      title: "Interoceptive",
      description: "Internal body signals like hunger, thirst, emotions",
      icon: "💗",
      color: "border-red-400"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-pixel text-pink-400 flicker-text mb-4 tracking-wider">
          EXECUTIVE
        </h1>
        <h1 className="text-4xl md:text-6xl font-pixel text-cyan-400 mb-4 tracking-wider">
          FUNCTION
        </h1>
        <h1 className="text-4xl md:text-6xl font-pixel text-yellow-300 mb-6 tracking-wider">
          HERO
        </h1>
        <p className="text-xl md:text-2xl text-cyan-200 max-w-lg mx-auto leading-relaxed">
          A gentle, supportive adventure for minds that work differently
        </p>
      </div>

      {/* Quick Info Banner */}
      <div className="ui-panel p-4 mb-8 rounded-lg max-w-2xl w-full">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>
        <p className="text-center text-cyan-200 text-lg">
          <span className="text-yellow-300">Did you know?</span> Everyone processes sensory information differently.
          This game is designed with neurodivergent minds in mind - including ADHD, autism, and sensory processing differences.
        </p>
      </div>

      {/* Main Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
        <button
          onClick={onStart}
          className="flex-1 neon-border neon-button px-8 py-4 text-xl text-cyan-300 rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          <span className="font-pixel text-sm">START QUEST</span>
        </button>
        <button
          onClick={onLearn}
          className="flex-1 neon-border neon-button px-8 py-4 text-xl text-cyan-300 rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          <span className="font-pixel text-sm">LEARN MORE</span>
        </button>
      </div>

      {/* Toggle Sensory Info */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="text-cyan-400 hover:text-yellow-300 transition-colors mb-6 underline text-lg"
      >
        {showInfo ? "Hide" : "Show"} Sensory Systems Guide
      </button>

      {/* Sensory Systems Grid */}
      {showInfo && (
        <div className="w-full animate-fade-in">
          <h2 className="text-2xl font-pixel text-pink-400 text-center mb-6">
            THE 8 SENSORY SYSTEMS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sensoryTypes.map((type, index) => (
              <SensoryInfoCard key={index} {...type} />
            ))}
          </div>

          {/* Understanding Section */}
          <div className="ui-panel p-6 rounded-lg mt-6">
            <div className="ui-corner top-left"></div>
            <div className="ui-corner top-right"></div>
            <div className="ui-corner bottom-left"></div>
            <div className="ui-corner bottom-right"></div>
            <h3 className="text-xl font-pixel text-yellow-300 mb-4">Understanding Sensory Differences</h3>
            <div className="space-y-3 text-cyan-200">
              <p>
                <span className="text-pink-400 font-bold">Hypersensitivity (Over-responsive):</span> When
                sensory input feels too intense - bright lights seem blinding, sounds feel overwhelming.
              </p>
              <p>
                <span className="text-cyan-400 font-bold">Hyposensitivity (Under-responsive):</span> When
                more sensory input is needed - seeking movement, pressure, or intense flavors.
              </p>
              <p>
                <span className="text-yellow-300 font-bold">SPD (Sensory Processing Disorder):</span> When
                the brain has difficulty organizing sensory information, affecting daily activities.
              </p>
              <p>
                <span className="text-green-400 font-bold">Executive Function:</span> Brain skills that
                help with planning, focus, and managing tasks - often affected in ADHD and autism.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-cyan-400 opacity-75">
        <p className="text-sm">
          Built with love for neurodivergent families
        </p>
        <p className="text-xs mt-2">
          Uses gentle gamification to support executive function development
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
