import React from 'react';

interface SettingsPanelProps {
  onClose: () => void;
  isDyslexiaFont: boolean;
  onToggleDyslexiaFont: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  isDyslexiaFont,
  onToggleDyslexiaFont
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="ui-panel p-6 max-w-md w-full relative">
        <div className="ui-corner top-left"></div>
        <div className="ui-corner top-right"></div>
        <div className="ui-corner bottom-left"></div>
        <div className="ui-corner bottom-right"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-pixel text-purple-400">
            git config
          </h2>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/30 rounded border border-cyan-500/30">
            <div>
              <p className="text-cyan-300 font-mono">--dyslexia-friendly</p>
              <p className="text-sm text-purple-400/70">Use Atkinson Hyperlegible font</p>
            </div>
            <button
              onClick={onToggleDyslexiaFont}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                isDyslexiaFont ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  isDyslexiaFont ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-black/30 rounded border border-cyan-500/30">
            <p className="text-cyan-300 font-mono mb-2">About Git Quest</p>
            <p className="text-sm text-purple-400/70">
              Learn Git through adventure! Made with 💜 for GitKon 2025.
            </p>
            <p className="text-xs text-cyan-500/50 mt-2">
              Powered by GitKraken
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 font-pixel text-cyan-300 border border-cyan-400
                     hover:bg-cyan-400/20 transition-all"
        >
          git stash save
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
