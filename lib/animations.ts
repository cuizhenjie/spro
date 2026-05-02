// lib/animations.ts — Reusable GSAP animation helpers
import { gsap } from './gsap';
import { ScrollTrigger } from './gsap';
import { useGSAP } from '@gsap/react';

export function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 })
    .from('.hero-headline', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2')
    .from('.hero-badge', { opacity: 0, y: 10, duration: 0.4 }, '-=0.6');

  return tl;
}

export function initScrollAnimations() {
  // Feature cards stagger
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    scale: 0.96,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
  });

  // Showcase section
  gsap.from('.showcase-item', {
    scrollTrigger: {
      trigger: '.showcase-section',
      start: 'top 75%',
    },
    opacity: 0,
    x: -40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });

  // CTA section
  gsap.from('.cta-content', {
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 75%',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  });
}

export function initNavbarEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 50) {
        navbar.classList.add('navbar-scrolled');
      } else if (self.scroll() <= 50) {
        navbar.classList.remove('navbar-scrolled');
      }
    },
  });
}

export function initButtonPulse() {
  gsap.to('.btn-primary-pulse', {
    boxShadow: '0 0 40px rgba(255,45,120,0.4)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

export { useGSAP };

export function initTypographicSplitReveal() {
  const words = gsap.utils.toArray<HTMLElement>('.hero-headline .word');
  if (words.length === 0) return;

  gsap.set(words, { y: '120%', rotationZ: 4, opacity: 0 });

  gsap.to(words, {
    y: '0%',
    rotationZ: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.04,
    ease: 'power4.out',
    delay: 0.3,
  });
}

export function initHorizontalScrollGallery() {
  const wrapper = document.querySelector<HTMLElement>('.gallery-wrapper');
  if (!wrapper) return;

  const panels = gsap.utils.toArray<HTMLElement>('.panel');
  if (panels.length === 0) return;

  const tl = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: wrapper,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => '+=' + wrapper.scrollWidth,
    },
  });

  const panelImages = gsap.utils.toArray<HTMLElement>('.panel-image');
  panelImages.forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.1,
        scrollTrigger: {
          trigger: img,
          containerAnimation: tl,
          start: 'left center',
          end: 'right center',
          scrub: true,
        },
      }
    );
  });
}
