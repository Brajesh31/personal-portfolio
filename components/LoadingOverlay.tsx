'use client';

import React, { useEffect, useRef } from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 180;
    canvas.height = 180;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;
    let lastTime = 0;
    const maxRadius = 80;
    const circleCount = 5;
    const dotCount = 24;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 78, 66, 0.9)';
      ctx.fill();

      // Expanding circles with dots
      for (let c = 0; c < circleCount; c++) {
        const circlePhase = (time * 0.3 + c / circleCount) % 1;
        const radius = circlePhase * maxRadius;
        const opacity = 1 - circlePhase;

        // Circle outline
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dots around circle
        for (let i = 0; i < dotCount; i++) {
          const angle = (i / dotCount) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const size = 2 * (1 - circlePhase * 0.5);

          // Line from center to dot
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Dot
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 78, 66, ${opacity * 0.9})`;
          ctx.fill();
        }
      }

      if (isVisible) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
      <div className="fixed inset-0 bg-[#12100f] flex items-center justify-center z-[1000] transition-opacity duration-500">
        <div className="flex flex-col items-center justify-center max-w-lg p-5">
          <div className="w-[180px] h-[180px]">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                width={180}
                height={180}
            />
          </div>
          <div className="mt-5 text-center text-[#ff4e42] tracking-[2px] text-sm uppercase font-mono">
            INITIALIZING SCANNER
          </div>
        </div>
      </div>
  );
}
