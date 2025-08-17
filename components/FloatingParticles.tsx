'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  audioLevel: number;
}

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  angleSpeed: number;
  amplitude: number;
  size: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function FloatingParticles({ audioLevel }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const numParticles = 1000;
    const particles: Particle[] = [];

    // Clear existing particles
    container.innerHTML = '';

    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = '1.5px';
      particle.style.height = '1.5px';
      particle.style.backgroundColor = `rgba(255, ${
          Math.floor(Math.random() * 100) + 78
      }, ${Math.floor(Math.random() * 100) + 66}, ${
          Math.random() * 0.5 + 0.2
      })`;
      particle.style.borderRadius = '50%';

      // Create hollow center area
      const minDistance = 200;
      const maxDistance = Math.max(windowWidth, windowHeight) * 0.8;

      // Use polar coordinates for even distribution
      const angle = Math.random() * Math.PI * 2;
      const distanceFactor = Math.sqrt(Math.random());
      const distance = minDistance + distanceFactor * (maxDistance - minDistance);

      const x = Math.cos(angle) * distance + centerX;
      const y = Math.sin(angle) * distance + centerY;

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';

      const particleObj: Particle = {
        element: particle,
        x: x,
        y: y,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        amplitude: Math.random() * 50 + 20,
        size: 1.5,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      };

      particles.push(particleObj);
      container.appendChild(particle);
    }

    particlesRef.current = particles;

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      particles.forEach((particle) => {
        // Update angle
        particle.angle += particle.angleSpeed;

        // Calculate orbit around center
        const orbitX = centerX + Math.cos(particle.angle) * particle.amplitude;
        const orbitY = centerY + Math.sin(particle.angle) * particle.amplitude;

        // Add noise movement
        const noiseX = Math.sin(time * particle.speed + particle.angle) * 5;
        const noiseY = Math.cos(time * particle.speed + particle.angle * 0.7) * 5;

        // Apply audio reactivity
        const audioFactor = 1 + audioLevel * 2;
        const newX = orbitX + noiseX * audioFactor;
        const newY = orbitY + noiseY * audioFactor;

        // Update position
        particle.element.style.left = newX + 'px';
        particle.element.style.top = newY + 'px';

        // Pulse size
        const pulseFactor = 1 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3;
        const audioSizeFactor = 1 + audioLevel * 1.5;
        const newSize = particle.size * pulseFactor * audioSizeFactor;

        particle.element.style.width = newSize + 'px';
        particle.element.style.height = newSize + 'px';

        // Adjust opacity
        const baseOpacity = 0.2 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.1;
        const audioOpacity = Math.min(0.8, baseOpacity + audioLevel * 0.3);
        particle.element.style.opacity = audioOpacity.toString();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Update animation based on audio level
  useEffect(() => {
    // Audio level changes are handled in the animation loop
  }, [audioLevel]);

  return (
      <div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-[4]"
      />
  );
}
