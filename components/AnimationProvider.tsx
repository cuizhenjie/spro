'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import {
  initScrollAnimations,
  initButtonPulse,
  initTypographicSplitReveal,
} from '@/lib/animations';

export default function AnimationProvider() {
  useEffect(() => {
    let mounted = true;

    const ctx = gsap.context(() => {
      if (!mounted) return;

      // Hero: word-by-word headline reveal
      initTypographicSplitReveal();

      // Hero: supporting elements entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 })
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
        .from('.hero-badge', { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, '-=0.3');

      // Scroll-triggered: feature cards, showcase, stats counter, CTA
      initScrollAnimations();

      // Marketplace cards stagger
      const mktCards = document.querySelectorAll('.marketplace-card');
      if (mktCards.length > 0) {
        gsap.from(mktCards, {
          scrollTrigger: {
            trigger: '.marketplace-section',
            start: 'top 75%',
          },
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      // Button idle glow pulse
      initButtonPulse();
    });

    return () => {
      mounted = false;
      ctx.revert();
    };
  }, []);

  return null;
}
