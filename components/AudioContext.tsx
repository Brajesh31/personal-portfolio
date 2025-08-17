'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AudioContextType {
  audioLevel: number;
  beatIntensity: number;
  setAudioLevel: (level: number) => void;
  setBeatIntensity: (intensity: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioLevel, setAudioLevel] = useState(0);
  const [beatIntensity, setBeatIntensity] = useState(0);

  const handleSetAudioLevel = useCallback((level: number) => {
    setAudioLevel(level);
  }, []);

  const handleSetBeatIntensity = useCallback((intensity: number) => {
    setBeatIntensity(intensity);
    // Auto-decay beat intensity
    setTimeout(() => setBeatIntensity(0), 200);
  }, []);

  return (
      <AudioContext.Provider
          value={{
            audioLevel,
            beatIntensity,
            setAudioLevel: handleSetAudioLevel,
            setBeatIntensity: handleSetBeatIntensity,
          }}
      >
        {children}
      </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
