'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
// Lazy loaded heavy visual / audio components (no SSR needed for WebGL)
const SciFiAnomaly = dynamic(() => import('./SciFiAnomaly').then(m => m.SciFiAnomaly), { ssr: false });
const SpectrumAnalyzer = dynamic(() => import('./SpectrumAnalyzer').then(m => m.SpectrumAnalyzer), { ssr: false, loading: () => null });
const LoadingOverlay = dynamic(() => import('./LoadingOverlay').then(m => m.LoadingOverlay), { ssr: false });
const FloatingParticles = dynamic(() => import('./FloatingParticles').then(m => m.FloatingParticles), { ssr: false, loading: () => null });
import { useAudio } from './AudioContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export default function SciFiLanding() {
  const { setAudioLevel: setGlobalAudioLevel, setBeatIntensity: setGlobalBeatIntensity } = useAudio();
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [beatIntensity, setBeatIntensity] = useState(0);
  const [timestamp, setTimestamp] = useState('00:00:00');
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Audio settings
  const [audioReactivity, setAudioReactivity] = useState(1.0);
  const [audioSensitivity, setAudioSensitivity] = useState(5.0);

  // Anomaly settings
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [resolution, setResolution] = useState(32);
  const [distortion, setDistortion] = useState(1.0);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const [isSmall, setIsSmall] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const mobileAnimRef = useRef<number | null>(null);
  const mobileHistoryRef = useRef<number[]>([]);
  const lastMobileBeatRef = useRef<number>(0);
  const waveCoreRef = useRef<HTMLDivElement | null>(null);
  const ringOuterRef = useRef<HTMLDivElement | null>(null);
  const ringMidRef = useRef<HTMLDivElement | null>(null);
  const ringInnerRef = useRef<HTMLDivElement | null>(null);
  const smoothLevelRef = useRef(0);
  const smoothBeatRef = useRef(0);
  const wavePhaseRef = useRef(0);
  const waveRAFRef = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [audioBtnOffset, setAudioBtnOffset] = useState(120); // px from bottom on mobile

  // Handle audio level changes from spectrum analyzer
  const handleAudioLevelChange = (level: number) => {
    setAudioLevel(level);
    setGlobalAudioLevel(level);
  };

  // Beat detection with smooth decay handled by RAF loop (avoid multiple timeouts)
  const lastBeatRef = useRef(0);
  const beatPeakRef = useRef(0);
  const handleBeatDetected = (intensity: number) => {
    beatPeakRef.current = Math.max(beatPeakRef.current * 0.5, intensity);
    lastBeatRef.current = performance.now();
    setBeatIntensity(intensity); // immediate UI reaction
    setGlobalBeatIntensity(intensity);
  };

  // Initialize audio context
  const initAudio = () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = context.createAnalyser();
      // Lower FFT size on small / low-power devices for performance
      analyser.fftSize = window.innerWidth < 640 ? 1024 : 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyser.connect(context.destination);

      setAudioContext(context);
      setAudioAnalyser(analyser);
      setAudioActive(true);

      showNotificationMessage('AUDIO ANALYSIS SYSTEM ONLINE');
      return true;
    } catch (error) {
      console.error('Audio initialization error:', error);
      showNotificationMessage('AUDIO SYSTEM ERROR');
      return false;
    }
  };

  // Show notification
  const showNotificationMessage = (message: string) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Update timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      setTimestamp(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      initAudio();
    }, 1500); // shorter splash for faster TTI
    return () => clearTimeout(timer);
  }, []);

  const createMobileAudioIfNeeded = () => {
    if (!isSmall) return;
    if (audioElRef.current) return; // already created
    if (!audioContext || !audioAnalyser) return; // wait until context/analyser exist

    // Prevent double creation if SpectrumAnalyzer already did it (desktop switch)
    if ((window as any).__GLOBAL_AUDIO_CREATED) {
      audioActive || setAudioActive(true);
      return;
    }

    const audio = new Audio('https://res.cloudinary.com/dbpvl1rnb/video/upload/v1754820799/song_jww36y.mp3');
    audio.loop = true;
    audio.crossOrigin = 'anonymous';
    try {
      const source = audioContext.createMediaElementSource(audio);
      source.connect(audioAnalyser);
      source.connect(audioContext.destination);
      audioElRef.current = audio;
      (window as any).__GLOBAL_AUDIO_CREATED = true;
      audio.play().then(() => {
        setAudioActive(true);
        setIsMobilePlaying(true);
        showNotificationMessage('AUDIO PLAYING (MOBILE)');
      }).catch(() => {
        showNotificationMessage('TAP AGAIN TO ENABLE AUDIO');
      });
    } catch (e) {
      console.error(e);
      showNotificationMessage('AUDIO ERROR');
    }
  };

  const toggleMobileAudio = () => {
    if (!audioElRef.current) {
      handleUserInteraction();
      return;
    }
    const el = audioElRef.current;
    if (el.paused) {
      el.play().then(() => {
        setIsMobilePlaying(true);
        showNotificationMessage('AUDIO PLAYING');
      }).catch(() => showNotificationMessage('PLAY BLOCKED - TAP AGAIN'));
    } else {
      el.pause();
      setIsMobilePlaying(false);
      showNotificationMessage('AUDIO PAUSED');
    }
  };

  // Handle user interaction to start audio
  const handleUserInteraction = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        setAudioActive(true);
        createMobileAudioIfNeeded();
      });
    } else if (!audioContext) {
      if (initAudio()) {
        // initAudio sets context/analyser async; defer creation slightly
        setTimeout(createMobileAudioIfNeeded, 200);
      }
    } else {
      createMobileAudioIfNeeded();
    }
  };

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Recompute audio button offset when layout changes (mobile)
  useEffect(() => {
    if (!isSmall) return;
    const compute = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight; // nav height
        setAudioBtnOffset(h + 32); // add gap below audio button
      }
    };
    compute();
    window.addEventListener('resize', compute);
    const id = setInterval(compute, 600); // fallback to catch font load / dynamic changes
    return () => { window.removeEventListener('resize', compute); clearInterval(id); };
  }, [isSmall]);

  // Dynamically reduce complexity on very small screens
  useEffect(() => {
    if (isSmall) {
      setResolution(24); // lower geometry detail
      setRotationSpeed(0.8);
    } else {
      setResolution(32);
      setRotationSpeed(1.0);
    }
  }, [isSmall]);

  // Show hint on small screens once after load
  useEffect(() => {
    if (isSmall) {
      showNotificationMessage('TAP AUDIO ICON TO ENABLE REACTIVE MODE');
    }
  }, [isSmall]);

  // Sync playing state on viewport change (e.g., rotate)
  useEffect(() => {
    if (isSmall && audioElRef.current) {
      setIsMobilePlaying(!audioElRef.current.paused);
    }
  }, [isSmall]);

  // Mobile lightweight analyser (runs only when SpectrumAnalyzer hidden)
  useEffect(() => {
    if (!isSmall || !audioAnalyser) {
      if (mobileAnimRef.current) cancelAnimationFrame(mobileAnimRef.current);
      return;
    }

    const analyser = audioAnalyser;
    const bufferLength = Math.min(256, analyser.frequencyBinCount);
    const dataArray = new Uint8Array(bufferLength);

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      let bassSum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i];
        sum += v;
        if (i < 32) bassSum += v;
      }
      const avg = sum / bufferLength / 255; // 0..1
      const bassAvg = (bassSum / 32) / 255;

      // Maintain bass history for adaptive beat threshold
      mobileHistoryRef.current.push(bassAvg);
      if (mobileHistoryRef.current.length > 30) mobileHistoryRef.current.shift();
      const hist = mobileHistoryRef.current;
      const mAvg = hist.reduce((a,b)=>a+b,0) / hist.length;
      const variance = hist.reduce((a,b)=> a + (b - mAvg) * (b - mAvg), 0) / hist.length;
      const std = Math.sqrt(variance);
      const dynamicThreshold = Math.max(0.15, mAvg + std * 1.6);

      let localBeatIntensity = 0;
      const now = performance.now();
      if (bassAvg > dynamicThreshold && (now - lastMobileBeatRef.current) > 130) {
        localBeatIntensity = Math.min(1, (bassAvg - dynamicThreshold) / (dynamicThreshold + 1e-6));
        lastMobileBeatRef.current = now;
        handleBeatDetected(localBeatIntensity);
      }

      // Slightly boost audio level with beat intensity for visual pulse
      const level = Math.min(1, avg + localBeatIntensity * 0.7);
      setAudioLevel(level);
      setGlobalAudioLevel(level);

      mobileAnimRef.current = requestAnimationFrame(tick);
    };

    tick();
    return () => { if (mobileAnimRef.current) cancelAnimationFrame(mobileAnimRef.current); };
  }, [isSmall, audioAnalyser]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // respect user preference
    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const dt = Math.min(100, now - lastTime);
      lastTime = now;
      // Smooth incoming audio / beat state (read latest state values)
      smoothLevelRef.current += (audioLevel - smoothLevelRef.current) * 0.12;
      // Beat decay using time-based approach
      const beatElapsed = now - lastBeatRef.current;
      const targetBeat = beatElapsed < 400 ? beatPeakRef.current * (1 - beatElapsed / 400) : 0;
      smoothBeatRef.current += (targetBeat - smoothBeatRef.current) * 0.2;
      if (smoothBeatRef.current < 0.002) {
        smoothBeatRef.current = 0;
        if (beatIntensity !== 0) setBeatIntensity(0);
      }
      wavePhaseRef.current += 0.02 + smoothLevelRef.current * 0.05 + smoothBeatRef.current * 0.08;

      const composite = smoothLevelRef.current * 0.6 + smoothBeatRef.current * 0.9;
      const pulse = Math.sin(wavePhaseRef.current) * 0.04;
      const coreScale = 1 + composite * 0.55 + pulse;
      const glowRadius = 18 + composite * 60;

      if (waveCoreRef.current) {
        waveCoreRef.current.style.transform = `translate(-50%, -50%) scale(${coreScale.toFixed(4)})`;
        waveCoreRef.current.style.boxShadow = `0 0 ${glowRadius}px rgba(255,78,66,${(0.25 + composite * 0.45).toFixed(3)})`;
        waveCoreRef.current.style.borderColor = `rgba(255,78,66,${(0.15 + composite * 0.55).toFixed(3)})`;
        waveCoreRef.current.style.opacity = (0.85 + smoothLevelRef.current * 0.15).toString();
      }

      const ringScales = [1.6, 1.3, 1.05];
      const ringRefs = [ringOuterRef, ringMidRef, ringInnerRef];
      ringRefs.forEach((ref, idx) => {
        const phaseOffset = wavePhaseRef.current - idx * 0.4;
        const ringPulse = Math.sin(phaseOffset) * 0.5 + 0.5;
        const dynamicScale = 1 + (smoothBeatRef.current * 0.35 + smoothLevelRef.current * 0.15) * (1 - idx * 0.25) + ringPulse * 0.04;
        const scale = ringScales[idx] * dynamicScale;
        const op = 0.18 - idx * 0.04 + composite * (0.15 - idx * 0.03);
        if (ref.current) {
          ref.current.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
          ref.current.style.opacity = Math.max(0, Math.min(0.5, op)).toString();
          ref.current.style.borderColor = `rgba(255,78,66,${(0.18 + composite * 0.4 - idx * 0.05).toFixed(3)})`;
          ref.current.style.boxShadow = `0 0 ${(25 + composite * 55 - idx * 10).toFixed(0)}px rgba(255,78,66,${(0.15 + composite * 0.35 - idx * 0.04).toFixed(3)})`;
        }
      });

      waveRAFRef.current = requestAnimationFrame(animate);
    };
    waveRAFRef.current = requestAnimationFrame(animate);
    return () => { if (waveRAFRef.current) cancelAnimationFrame(waveRAFRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioLevel]); // keep audioLevel to ensure start after first data; beat handled via refs

  return (
      <div
          className="sci-fi-landing w-full h-full"
          onClick={handleUserInteraction}
          onKeyDown={handleUserInteraction}
          tabIndex={0}
          role="main"
          aria-label="Sci-Fi Interactive Landing"
      >
        {/* Loading Overlay */}
        <LoadingOverlay isVisible={!isLoaded} />

        {/* Space Background */}
        <div className="fixed inset-0 bg-[#12100f] bg-cover bg-center opacity-80 z-0"
             style={{ backgroundImage: 'url("https://assets.codepen.io/7558/space-bg-002.jpg")' }} />

        {/* Grid Overlay */}
        <div className="fixed inset-0 opacity-20 z-0"
             style={{
               backgroundImage: `
               linear-gradient(to right, rgba(255, 240, 230, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 240, 230, 0.05) 1px, transparent 1px)
             `,
               backgroundSize: '40px 40px'
             }} />

        {/* Three.js Scene */}
        <div className="fixed inset-0 z-10">
          <Canvas
              camera={{ position: [0, 0, 10], fov: 60 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
              }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[1, 1, 1]} intensity={1.5} />
            <pointLight position={[2, 2, 2]} color="#ff4e42" intensity={1} />
            <pointLight position={[-2, -2, -2]} color="#c2362f" intensity={1} />

            <SciFiAnomaly
                audioLevel={audioLevel}
                beatIntensity={beatIntensity}
                rotationSpeed={rotationSpeed}
                resolution={resolution}
                distortion={distortion}
                audioReactivity={audioReactivity}
            />

            <OrbitControls
                enableZoom={false}
                enableDamping
                dampingFactor={0.1}
                rotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Floating Particles */}
        <FloatingParticles audioLevel={audioLevel} />

        {/* Interface Container */}
        <div className="fixed inset-0 z-20 pointer-events-none p-4 sm:p-5 flex flex-col justify-between">
          {/* Scanner Frame */}
          <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#ff4e42] pointer-events-none"
              style={{ width: 'clamp(220px,70vw,384px)', height: 'clamp(220px,70vw,384px)' }}
          >
            {/* Corner decorations */}
            <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-2 border-l-2 border-[#ff4e42]"></div>
            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-2 border-r-2 border-[#ff4e42]"></div>
            <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-2 border-l-2 border-[#ff4e42]"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-2 border-r-2 border-[#ff4e42]"></div>


          </div>
        </div>

        {/* Spectrum Analyzer (hidden on small screens to declutter) */}
        {!isSmall && (
            <SpectrumAnalyzer
                audioAnalyser={audioAnalyser}
                audioContext={audioContext}
                audioSensitivity={audioSensitivity}
                setAudioSensitivity={setAudioSensitivity}
                onNotification={showNotificationMessage}
                onAudioLevelChange={handleAudioLevelChange}
                onBeatDetected={handleBeatDetected}
            />
        )}

        {/* Mobile audio activation button */}
        {isSmall && (
            <button
                onClick={toggleMobileAudio}
                aria-label={isMobilePlaying ? 'Pause audio' : 'Play audio'}
                style={{ bottom: audioBtnOffset, right: 16 }}
                className={`fixed z-50 pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-[rgba(0,0,0,0.7)] border border-[rgba(255,78,66,0.6)] font-mono text-xs tracking-wide shadow-lg shadow-[rgba(255,78,66,0.2)] active:scale-95 transition ${isMobilePlaying ? 'text-[#ffffff]' : 'text-[#ff4e42]'}`}
            >
          <span className="relative flex items-center gap-2">
            <span className="font-semibold">AUDIO</span>
            <span className="relative w-4 h-4 flex items-center justify-center">
              <span
                  className="absolute inline-block rounded-full bg-[#ff4e42] transition-all"
                  style={{
                    width: `${8 + Math.min(8, audioLevel * 30 + beatIntensity * 20)}px`,
                    height: `${8 + Math.min(8, audioLevel * 30 + beatIntensity * 20)}px`,
                    opacity: 0.5 + Math.min(0.5, audioLevel * 0.5 + beatIntensity * 0.4),
                    boxShadow: beatIntensity > 0.2 && isMobilePlaying ? `0 0 ${6 + beatIntensity * 20}px #ff4e42` : 'none'
                  }}
              />
              {isMobilePlaying && (
                  <span
                      className="absolute inline-block rounded-full border border-[#ff4e42]/70 animate-ping"
                      style={{
                        width: '14px',
                        height: '14px',
                        animationDuration: `${1.1 - Math.min(0.6, audioLevel * 0.8 + beatIntensity * 0.5)}s`,
                        opacity: 0.5
                      }}
                  />
              )}
            </span>
          </span>
              <span className="uppercase font-semibold min-w-[42px] text-center">
            {audioElRef.current ? (isMobilePlaying ? 'PAUSE' : 'PLAY') : 'LOAD'}
          </span>
            </button>
        )}

        {/* Layered Circle Visualiser */}
        <div
            ref={waveCoreRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 rounded-full border transition-transform duration-150 ease-out"
            style={{ width: isSmall ? 'clamp(240px,68vw,400px)' : '500px', height: isSmall ? 'clamp(240px,68vw,400px)' : '500px', borderColor: 'rgba(255,78,66,0.2)' }}
        />
        <div
            ref={ringOuterRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 rounded-full border border-[rgba(255,78,66,0.15)] transition-transform duration-200 ease-out"
            style={{ width: isSmall ? 'clamp(240px,68vw,400px)' : '500px', height: isSmall ? 'clamp(240px,68vw,400px)' : '500px' }}
        />
        <div
            ref={ringMidRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 rounded-full border border-[rgba(255,78,66,0.15)] transition-transform duration-200 ease-out"
            style={{ width: isSmall ? 'clamp(240px,68vw,400px)' : '500px', height: isSmall ? 'clamp(240px,68vw,400px)' : '500px' }}
        />
        <div
            ref={ringInnerRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 rounded-full border border-[rgba(255,78,66,0.15)] transition-transform duration-200 ease-out"
            style={{ width: isSmall ? 'clamp(240px,68vw,400px)' : '500px', height: isSmall ? 'clamp(240px,68vw,400px)' : '500px' }}
        />

        {/* Notification - Improved styling */}
        {showNotification && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[rgba(0,0,0,0.8)] border-2 border-[rgba(255,78,66,0.6)] px-6 py-3 rounded-lg text-[#ff4e42] text-sm z-50 backdrop-blur-md shadow-lg shadow-[rgba(255,78,66,0.2)]">
              {notification}
            </div>
        )}

        {/* Portfolio Navigation - responsive */}
        <div ref={navRef} className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-105 z-40 pointer-events-auto w-[min(92%,480px)]">
          <div className="bg-[rgba(0,0,0,0.75)] border border-[rgba(255,78,66,0.5)] sm:border-2 px-4 py-3 sm:px-8 sm:py-4 rounded-lg backdrop-blur-md shadow-lg shadow-[rgba(255,78,66,0.15)]">
            <div className="text-[#ff4e42] font-bold uppercase tracking-wide text-center text-[clamp(0.7rem,2.2vw,0.95rem)] sm:text-base">
              BRAJESH KUMAR • FULL STACK / MERN DEVELOPER
            </div>
            <div className="text-[#ffffff] text-[clamp(0.65rem,2vw,0.85rem)] sm:text-sm mt-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span className="opacity-90">Building fast, scalable & innovative experiences</span>
              <button
                  onClick={() => {
                    const portfolioSection = document.getElementById('portfolio-sections');
                    if (portfolioSection) {
                      portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-[#ff4e42] hover:text-[#c2362f] transition-colors underline underline-offset-2 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4e42]/50"
              >
                Access Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
