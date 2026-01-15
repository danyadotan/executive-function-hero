import React from 'react';
import type { DisplayScene } from '../types';

interface SceneDisplayProps {
  scene: DisplayScene;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ scene }) => {
  return (
    <div className="w-full ui-panel p-6 rounded-lg">
      <div className="ui-corner top-left"></div>
      <div className="ui-corner top-right"></div>
      <div className="ui-corner bottom-left"></div>
      <div className="ui-corner bottom-right"></div>

      {/* Scene Image */}
      {scene.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden neon-border">
          <img
            src={scene.imageUrl}
            alt="Scene illustration"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
      )}

      {/* Story Text */}
      <div className="text-lg md:text-xl text-cyan-200 leading-relaxed">
        <p className="whitespace-pre-wrap">{scene.story}</p>
      </div>

      {/* Sensory Tip (randomly shown) */}
      {Math.random() > 0.7 && (
        <div className="mt-4 p-3 rounded bg-purple-900/30 border border-purple-400/30">
          <p className="text-sm text-purple-300">
            <span className="text-yellow-300">Sensory Tip:</span> Take a moment to notice how your body feels.
            Are you comfortable? Need to stretch or adjust?
          </p>
        </div>
      )}
    </div>
  );
};

export default SceneDisplay;
