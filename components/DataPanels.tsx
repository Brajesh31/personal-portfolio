'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DataPanelsProps {
  audioLevel: number;
  audioAnalyser: AnalyserNode | null;
}

export function DataPanels({ audioLevel, audioAnalyser }: DataPanelsProps) {
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stabilityValue, setStabilityValue] = useState(75);
  const [massValue, setMassValue] = useState(1.728);
  const [energyValue, setEnergyValue] = useState(5.3);
  const [varianceValue, setVarianceValue] = useState(0.0042);
  const [peakFrequency, setPeakFrequency] = useState(127.3);
  const [amplitude, setAmplitude] = useState(0.56);
  const [phaseShift, setPhaseShift] = useState('π/4');

  // Update values based on audio
  useEffect(() => {
    if (audioAnalyser) {
      const frequencyData = new Uint8Array(audioAnalyser.frequencyBinCount);
      audioAnalyser.getByteFrequencyData(frequencyData);

      // Calculate peak frequency
      let maxValue = 0;
      let maxIndex = 0;
      for (let i = 0; i < frequencyData.length; i++) {
        if (frequencyData[i] > maxValue) {
          maxValue = frequencyData[i];
          maxIndex = i;
        }
      }

      const sampleRate = 44100; // Assume standard sample rate
      const peakFreq = (maxIndex * sampleRate) / (audioAnalyser.frequencyBinCount * 2);
      setPeakFrequency(peakFreq);

      // Calculate average amplitude
      let sum = 0;
      for (let i = 0; i < frequencyData.length; i++) {
        sum += frequencyData[i];
      }
      const avgAmplitude = sum / (frequencyData.length * 255);
      setAmplitude(avgAmplitude);

      // Update stability based on audio
      const stability = 50 + Math.round(avgAmplitude * 50);
      setStabilityValue(stability);

      // Occasionally update other values
      if (Math.random() < 0.05) {
        setMassValue(1 + avgAmplitude * 2);
        setEnergyValue(avgAmplitude * 10);
        setVarianceValue(avgAmplitude * 0.01);

        const phases = ['π/4', 'π/2', 'π/6', '3π/4'];
        setPhaseShift(phases[Math.floor(Math.random() * phases.length)]);
      }
    }
  }, [audioAnalyser, audioLevel]);

  // Draw waveform
  useEffect(() => {
    if (!waveformCanvasRef.current) return;

    const canvas = waveformCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (audioAnalyser) {
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioAnalyser.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 78, 66, 0.8)';
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.stroke();
      } else {
        // Fallback animation
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 78, 66, 0.8)';
        ctx.lineWidth = 1;

        const time = Date.now() / 1000;
        const sliceWidth = width / 100;
        let x = 0;

        for (let i = 0; i < 100; i++) {
          const t = i / 100;
          const y = height / 2 +
              Math.sin(t * 10 + time) * 5 +
              Math.sin(t * 20 + time * 1.5) * 3 +
              Math.sin(t * 30 + time * 0.5) * 7 +
              (Math.random() - 0.5) * 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      }

      requestAnimationFrame(drawWaveform);
    };

    drawWaveform();
  }, [audioAnalyser]);

  const getStatusColor = () => {
    if (stabilityValue < 40) return '#ff00a0';
    if (stabilityValue < 70) return '#ffae00';
    return '#ff4e42';
  };

  return (
      <>
        {/* Left Data Panel */}
        <div className="fixed top-5 left-5 w-[300px] bg-[rgba(30,26,24,0.7)] border border-[rgba(255,78,66,0.3)] rounded-md p-4 backdrop-blur-sm pointer-events-auto z-20">
          <div className="flex items-center justify-between mb-3 text-sm text-[#ff4e42]">
            <span>DEVELOPER METRICS</span>
            <span
                className="text-2xl leading-none"
                style={{ color: getStatusColor() }}
            >
            ●
          </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-sm mb-3 relative">
            <div
                className="h-full bg-[#ff4e42] rounded-sm transition-all duration-500"
                style={{ width: `${stabilityValue}%` }}
            />
          </div>

          {/* Data Readouts */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">CODE QUALITY INDEX:</span>
              <span className="text-[#f3ede9]">{stabilityValue}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">TYPESCRIPT MASTERY:</span>
              <span className="text-[#f3ede9]">{massValue.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">REACT PERFORMANCE:</span>
              <span className="text-[#f3ede9]">{energyValue.toFixed(1)}e8 OPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">MERN STACK EFFICIENCY:</span>
              <span className="text-[#f3ede9]">{varianceValue.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Right Data Panel */}
        <div className="fixed top-5 right-5 w-[300px] bg-[rgba(30,26,24,0.7)] border border-[rgba(255,78,66,0.3)] rounded-md p-4 backdrop-blur-sm pointer-events-auto z-20">
          <div className="text-sm text-[#ff4e42] mb-3">PORTFOLIO ANALYTICS</div>

          {/* Waveform */}
          <div className="w-full h-12 mb-3 flex items-center relative">
            <canvas
                ref={waveformCanvasRef}
                width={268}
                height={48}
                className="w-full h-full"
            />
          </div>

          {/* Data Readouts */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">PROJECT FREQUENCY:</span>
              <span className="text-[#f3ede9]">{Math.round(peakFrequency)} COMMITS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">CODE AMPLITUDE:</span>
              <span className="text-[#f3ede9]">{amplitude.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c2b8b2]">DEPLOYMENT PHASE:</span>
              <span className="text-[#f3ede9]">{phaseShift}</span>
            </div>
          </div>
        </div>
      </>
  );
}
