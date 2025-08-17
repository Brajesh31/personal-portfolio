'use client';

import React from 'react';

interface ControlPanelProps {
  rotationSpeed: number;
  setRotationSpeed: (value: number) => void;
  resolution: number;
  setResolution: (value: number) => void;
  distortion: number;
  setDistortion: (value: number) => void;
  audioReactivity: number;
  setAudioReactivity: (value: number) => void;
  onReset: () => void;
}

export function ControlPanel({
  rotationSpeed,
  setRotationSpeed,
  resolution,
  setResolution,
  distortion,
  setDistortion,
  audioReactivity,
  setAudioReactivity,
  onReset
}: ControlPanelProps) {
  return (
    <div className="fixed top-1/2 left-5 transform -translate-y-1/2 w-[300px] bg-[rgba(30,26,24,0.7)] border border-[rgba(255,78,66,0.3)] rounded-md p-4 backdrop-blur-sm pointer-events-auto z-20">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[#ff4e42]">DEVELOPER CONTROLS</span>
        <span className="text-[#ff4e42] cursor-move">⋮⋮</span>
      </div>

      {/* Rotation Speed */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#c2b8b2]">CODING VELOCITY</span>
          <span className="text-xs text-[#f3ede9]">{rotationSpeed.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm appearance-none slider"
        />
      </div>

      {/* Resolution */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#c2b8b2]">CODE COMPLEXITY</span>
          <span className="text-xs text-[#f3ede9]">{resolution}</span>
        </div>
        <input
          type="range"
          min="12"
          max="64"
          step="4"
          value={resolution}
          onChange={(e) => setResolution(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm appearance-none slider"
        />
      </div>

      {/* Distortion */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#c2b8b2]">INNOVATION FACTOR</span>
          <span className="text-xs text-[#f3ede9]">{distortion.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="3"
          step="0.1"
          value={distortion}
          onChange={(e) => setDistortion(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm appearance-none slider"
        />
      </div>

      {/* Audio Reactivity */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#c2b8b2]">TECH ADAPTABILITY</span>
          <span className="text-xs text-[#f3ede9]">{audioReactivity.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={audioReactivity}
          onChange={(e) => setAudioReactivity(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm appearance-none slider"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 py-2 bg-[rgba(255,78,66,0.1)] border border-[rgba(255,78,66,0.3)] text-[#ff4e42] text-xs rounded-sm hover:bg-[rgba(255,78,66,0.2)] transition-colors"
        >
          RESET
        </button>
        <button className="flex-1 py-2 bg-[rgba(255,78,66,0.1)] border border-[rgba(255,78,66,0.3)] text-[#ff4e42] text-xs rounded-sm hover:bg-[rgba(255,78,66,0.2)] transition-colors">
          COMPILE
        </button>
      </div>
    </div>
  );
}
