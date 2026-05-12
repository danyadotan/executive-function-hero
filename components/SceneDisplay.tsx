import React from 'react';
import type { DisplayScene } from '../types';

interface SceneDisplayProps {
  scene: DisplayScene;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene }) => {
  return (
    <div className="w-full ui-panel p-6 relative">
      <div className="ui-corner top-left"></div>
      <div className="ui-corner top-right"></div>
      <div className="ui-corner bottom-left"></div>
      <div className="ui-corner bottom-right"></div>

      {scene.imageUrl && (
        <div className="mb-6 rounded overflow-hidden border border-purple-500/30">
          <img
            src={scene.imageUrl}
            alt="Scene"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Keif avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-2xl border-2 border-purple-400">
          🐙
        </div>

        <div className="flex-1">
          <p className="text-lg md:text-xl text-cyan-100 leading-relaxed">
            {scene.story}
          </p>
        </div>
      </div>

      {/* Git status indicator */}
      <div className="mt-4 pt-4 border-t border-cyan-500/20">
        <code className="text-sm text-green-400 font-mono">
          $ git status
          <span className="text-purple-400 ml-2">// Your adventure continues...</span>
        </code>
      </div>
    </div>
  );
};

export default SceneDisplay;
