'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface NeuralVizProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function NeuralViz({ className = '', intensity = 'medium' }: NeuralVizProps) {
  const circlesRef = useRef<SVGCircleElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circlesRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      circlesRef.current.forEach((circle, i) => {
        if (!circle) return;
        // Rotation animation
        gsap.to(circle, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 8 + i * 3,
          repeat: -1,
          ease: 'none',
          delay: i * 0.8,
        });
        // Opacity pulse
        gsap.to(circle, {
          opacity: 0.05 + (i % 3) * 0.05,
          scale: 1.03,
          duration: 2.5 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const config = { low: 2, medium: 3, high: 4 }[intensity];
  const blurMap = { low: '80px', medium: '120px', high: '150px' }[intensity];
  const glowOpacity = { low: 0.08, medium: 0.12, high: 0.2 }[intensity];

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(255,45,120,0.2) 0%, transparent 70%)',
          filter: `blur(${blurMap})`,
          opacity: glowOpacity * 3,
        }}
      />
      {/* Dashed concentric circles SVG */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        viewBox="0 0 500 500"
        fill="none"
        style={{ opacity: glowOpacity * 5 }}
      >
        {Array.from({ length: config }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            cx="250"
            cy="250"
            r={80 + i * 70}
            stroke="rgba(255,45,120,0.4)"
            strokeWidth="1"
            strokeDasharray="6 6"
            fill="none"
            opacity={0.12 + i * 0.06}
          />
        ))}
      </svg>
    </div>
  );
}
