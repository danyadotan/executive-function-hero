import React from 'react';

interface SettingsPanelProps {
  onClose: () => void;
  isDyslexiaFont: boolean;
  onToggleDyslexiaFont: () => void;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
  isCalmMode: boolean;
  onToggleCalmMode: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
}

const ToggleSwitch: React.FC<{
  label: string;
  description: string;
  isOn: boolean;
  onToggle: () => void;
}> = ({ label, description, isOn, onToggle }) => (
  <div className="flex items-start justify-between p-3 rounded bg-black/30 mb-3">
    <div className="flex-1 mr-4">
      <p className="text-cyan-300 font-bold">{label}</p>
      <p className="text-sm text-cyan-200 opacity-75">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300
                  ${isOn ? 'bg-pink-500' : 'bg-gray-600'}`}
      aria-pressed={isOn}
    >
      <span
        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300
                    ${isOn ? 'left-8' : 'left-1'}`}
      />
    </button>
  </div>
);

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isDyslexiaFont,
  onToggleDyslexiaFont,
  isReducedMotion,
  onToggleReducedMotion,
  isCalmMode,
  onToggleCalmMode,
  isHighContrast,
  onToggleHighContrast,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="ui-panel p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-pixel text-pink-400">SETTINGS</h2>
          <button
            onClick={onClose}
            className="neon-border neon-button p-2 rounded-lg"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sensory-Friendly Options */}
        <div className="mb-6">
          <h3 className="text-lg font-pixel text-yellow-300 mb-4">SENSORY OPTIONS</h3>

          <ToggleSwitch
            label="Dyslexia-Friendly Font"
            description="Uses Atkinson Hyperlegible font for easier reading"
            isOn={isDyslexiaFont}
            onToggle={onToggleDyslexiaFont}
          />

          <ToggleSwitch
            label="Reduced Motion"
            description="Minimizes animations and moving elements"
            isOn={isReducedMotion}
            onToggle={onToggleReducedMotion}
          />

          <ToggleSwitch
            label="Calm Mode"
            description="Softer colors and gentler visual effects"
            isOn={isCalmMode}
            onToggle={onToggleCalmMode}
          />

          <ToggleSwitch
            label="High Contrast"
            description="Increased contrast for better visibility"
            isOn={isHighContrast}
            onToggle={onToggleHighContrast}
          />
        </div>

        {/* Sensory Information */}
        <div className="p-4 rounded bg-purple-900/30 border border-purple-400/30">
          <h4 className="text-pink-400 font-bold mb-2">About Sensory Settings</h4>
          <p className="text-sm text-cyan-200 mb-2">
            These options are designed to make the experience more comfortable for different sensory needs:
          </p>
          <ul className="text-sm text-cyan-200 space-y-1 list-disc list-inside">
            <li><span className="text-yellow-300">Visual sensitivity:</span> Try Calm Mode or Reduced Motion</li>
            <li><span className="text-yellow-300">Reading difficulties:</span> Use Dyslexia-Friendly Font</li>
            <li><span className="text-yellow-300">Focus challenges:</span> Reduced Motion helps minimize distractions</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-cyan-400 opacity-60">
            Your preferences are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
