'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpectrumAnalyzerProps {
  audioAnalyser: AnalyserNode | null;
  audioContext: AudioContext | null;
  audioSensitivity: number;
  setAudioSensitivity: (value: number) => void;
  onNotification: (message: string) => void;
  onAudioLevelChange: (level: number) => void;
  onBeatDetected?: (intensity: number) => void;
}

export function SpectrumAnalyzer({
                                   audioAnalyser,
                                   audioContext,
                                   audioSensitivity,
                                   setAudioSensitivity,
                                   onNotification,
                                   onAudioLevelChange,
                                   onBeatDetected
                                 }: SpectrumAnalyzerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [beatDetected, setBeatDetected] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const lastBeatTime = useRef<number>(0);
  const beatThreshold = useRef<number>(0.1);
  const audioHistory = useRef<number[]>([]);

  // Draw spectrum analyzer
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = 120;

    const drawSpectrum = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (audioAnalyser) {
        const bufferLength = 256;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteFrequencyData(dataArray);

        // Calculate audio level for beat detection
        let sum = 0;
        let bassSum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
          // Focus on bass frequencies for beat detection (first 32 bins)
          if (i < 32) {
            bassSum += dataArray[i];
          }
        }
        const average = sum / bufferLength;
        const bassAverage = bassSum / 32;
        const normalizedLevel = average / 255;
        const normalizedBass = bassAverage / 255;

        // Beat detection algorithm
        const currentTime = Date.now();
        audioHistory.current.push(normalizedBass);

        // Keep only last 30 samples for better beat detection
        if (audioHistory.current.length > 30) {
          audioHistory.current.shift();
        }

        // Calculate moving average and variance for more accurate beat detection
        const movingAverage = audioHistory.current.reduce((a, b) => a + b, 0) / audioHistory.current.length;
        const variance = audioHistory.current.reduce((acc, val) => acc + Math.pow(val - movingAverage, 2), 0) / audioHistory.current.length;
        const standardDeviation = Math.sqrt(variance);

        // Dynamic beat threshold based on variance
        beatThreshold.current = Math.max(0.15, movingAverage + standardDeviation * 1.5);

        // Detect beat with improved algorithm
        let finalAudioLevel = normalizedLevel;
        let beatIntensity = 0;

        if (normalizedBass > beatThreshold.current && currentTime - lastBeatTime.current > 120) {
          // Calculate beat intensity based on how much it exceeds threshold
          beatIntensity = Math.min(1.0, (normalizedBass - beatThreshold.current) / beatThreshold.current);
          finalAudioLevel = Math.min(1.0, normalizedLevel + beatIntensity * 0.8);

          lastBeatTime.current = currentTime;
          setBeatDetected(true);

          // Call beat detected callback with intensity
          if (onBeatDetected) {
            onBeatDetected(beatIntensity);
          }

          setTimeout(() => setBeatDetected(false), 80);
        }

        onAudioLevelChange(finalAudioLevel);

        const barWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * (audioSensitivity / 5);
          const hue = (i / bufferLength) * 20 + 0;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 78, 66, 0.2)';
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = 0; i < 5; i++) {
        const y = height * (i / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = 0; i < 9; i++) {
        const x = width * (i / 8);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Frequency labels
      ctx.fillStyle = 'rgba(255, 78, 66, 0.7)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';

      const freqLabels = ['0', '1K', '2K', '4K', '8K', '16K'];
      for (let i = 0; i < freqLabels.length; i++) {
        const x = (width / (freqLabels.length - 1)) * i;
        ctx.fillText(freqLabels[i], x, height - 5);
      }

      animationRef.current = requestAnimationFrame(drawSpectrum);
    };

    animationRef.current = requestAnimationFrame(drawSpectrum);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioAnalyser, audioSensitivity, onAudioLevelChange]);

  // Initialize the song
  useEffect(() => {
    if (!audioContext || audioElement) return;
    // Avoid creating duplicate global audio if already created elsewhere (e.g., mobile in SciFiLanding)
    if (typeof window !== 'undefined' && (window as any).__GLOBAL_AUDIO_CREATED) return;

    const audioPath = '/song.mp3';
    // Check if file exists by attempting fetch HEAD
    fetch(audioPath, { method: 'HEAD' }).then(res => {
      if (!res.ok) {
        onNotification('AUDIO FILE MISSING');
        return;
      }
      const audio = new Audio();
      audio.src = audioPath;
      audio.loop = true;
      audio.crossOrigin = 'anonymous';
      try {
        const source = audioContext.createMediaElementSource(audio);
        if (audioAnalyser) {
          source.connect(audioAnalyser);
        }
        (window as any).__GLOBAL_AUDIO_CREATED = true;
        setAudioElement(audio);
        onNotification('SONG LOADED - READY TO PLAY');
      } catch (error) {
        console.error('Error setting up audio source:', error);
        onNotification('AUDIO SETUP ERROR');
      }
    }).catch(() => {
      onNotification('AUDIO CHECK FAILED');
    });
  }, [audioContext, audioAnalyser, audioElement, onNotification]);

  const togglePlayPause = () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
      onNotification('AUDIO PAUSED');
    } else {
      audioElement.play().then(() => {
        setIsPlaying(true);
        onNotification('AUDIO PLAYING');
      }).catch((error) => {
        console.error('Error playing audio:', error);
        onNotification('CLICK TO ENABLE AUDIO');
      });
    }
  };

  const toggleMute = () => {
    if (!audioElement) return;

    audioElement.muted = !isMuted;
    setIsMuted(!isMuted);
    onNotification(isMuted ? 'AUDIO UNMUTED' : 'AUDIO MUTED');
  };

  return (
      <div className="fixed bottom-5 right-5 w-[400px] bg-[rgba(30,26,24,0.7)] border border-[rgba(255,78,66,0.3)] rounded-md overflow-hidden pointer-events-auto z-20 select-none">
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 bg-[rgba(0,0,0,0.3)] text-sm text-[#ff4e42]">
          <span>AUDIO SPECTRUM ANALYZER</span>
        </div>

        {/* Spectrum Canvas */}
        <div className="p-3">
          <canvas
              ref={canvasRef}
              className="w-full block"
              style={{ height: '120px' }}
          />
        </div>

        {/* Controls */}
        <div className="px-3 pb-3 space-y-3">
          {/* Audio Controls */}
          <div>
            <div className="text-xs text-[#c2b8b2] mb-2">AUDIO CONTROLS:</div>
            <div className="flex gap-2">
              <button
                  onClick={togglePlayPause}
                  className="flex-1 px-3 py-2 bg-[rgba(255,78,66,0.1)] border border-[rgba(255,78,66,0.3)] text-[#ff4e42] text-xs rounded-sm hover:bg-[rgba(255,78,66,0.2)] transition-colors"
              >
                {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
              </button>
              <button
                  onClick={toggleMute}
                  className="px-3 py-2 bg-[rgba(255,78,66,0.1)] border border-[rgba(255,78,66,0.3)] text-[#ff4e42] text-xs rounded-sm hover:bg-[rgba(255,78,66,0.2)] transition-colors"
              >
                {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
              </button>
            </div>
          </div>

          {/* Sensitivity Control */}
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-[#c2b8b2]">SENSITIVITY</span>
              <span className="text-[#ff4e42]">{audioSensitivity.toFixed(1)}</span>
            </div>
            <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={audioSensitivity}
                onChange={(e) => setAudioSensitivity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm appearance-none slider"
            />
          </div>
        </div>
      </div>
  );
}
