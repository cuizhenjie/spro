'use client';

import { useEffect, useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero-headline', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
        .from('.hero-badge', { opacity: 0, y: 10, duration: 0.4 }, '-=0.6');

      gsap.to('.btn-primary-pulse', {
        boxShadow: '0 0 40px rgba(255,45,120,0.4)',
        duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });

      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '.features-section', start: 'top 80%' },
        opacity: 0, y: 40, scale: 0.96, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      });

      gsap.from('.cta-content', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 75%' },
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-14 sm:pt-16 bg-background overflow-hidden">
      <ParticleCanvas />
      {/* gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-tertiary opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="container relative z-10 py-16 sm:py-20 md:py-32 px-4 md:px-0">
        <p className="hero-eyebrow text-xs sm:text-sm font-medium text-on-surface-variant uppercase tracking-widest mb-3 sm:mb-4 md:mb-6 font-mono">
          赛博穿搭 · AI时尚百宝箱
        </p>

        <h1
          className="hero-headline text-[2.4rem] sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8 md:mb-10 font-display text-on-surface"
        >
          <span className="word">智能</span>{' '}
          <span className="word">穿搭</span>{' '}
          <span className="word">，</span>{' '}
          <span className="word">一键</span>{' '}
          <span className="word">get。</span>
        </h1>

        <p className="hero-sub text-base sm:text-lg md:text-xl text-on-surface-variant mb-10 sm:mb-12 md:mb-16 max-w-xl leading-relaxed">
          智能穿搭分析 · 按次付费 · 无需注册
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-16 sm:mb-20">
          <a
            href="#cta"
            className="btn-primary-pulse inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all hover:shadow-glow-pink text-sm sm:text-base"
          >
            开始穿搭分析 →
          </a>
          <a
            href="/marketplace"
            className="inline-flex items-center justify-center px-8 py-4 border border-outline text-on-surface font-medium rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm sm:text-base"
          >
            浏览工具市场 →
          </a>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="hero-badge flex items-center gap-2 px-4 py-2 rounded-full border border-outline bg-surface-container backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary" style={{ boxShadow: '0 0 8px #ecffe3' }} />
            <span className="text-xs font-mono text-on-surface-variant">赛博穿搭</span>
            <span className="text-on-surface">·</span>
            <span className="text-sm text-on-surface">AI时尚百宝箱</span>
          </div>
        </div>
      </div>
    </section>
  );
}
