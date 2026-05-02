// GSAP Animation Utilities for Cyber Wardrobe
// Based on spro_ui_analysis.md recommendations

export const CYAN_SCAN = {
  keyframes: {
    top: '0%',
    middle: '50%',
    bottom: '100%',
  },
  duration: 2.2,
  ease: 'none',
};

export const PULSE_GLOW = {
  keyframes: {
    from: { opacity: 0.4, scale: 1 },
    to: { opacity: 1, scale: 1.05 },
  },
  duration: 1.2,
  repeat: -1,
  yoyo: true,
};

export const TERMINAL_CURSOR = {
  text: '_',
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'none',
};

export const PROGRESS_STRIPES = {
  angle: 45,
  speed: 8, // px per second
};

export function initScanLineAnimation(element: HTMLElement, duration = 2200) {
  let start: number | null = null;
  const animate = (ts: number) => {
    if (!start) start = ts;
    const progress = ((ts - start) % duration) / duration;
    element.style.top = `${progress * 100}%`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

export function initScrollAnimations() {
  // Scroll-triggered animations registered via ScrollTrigger
  // Placeholder — actual implementations handled in AnimationProvider
}

export function initButtonPulse() {
  // Button idle glow pulse — implemented inline in AnimationProvider
}

export function initTypographicSplitReveal() {
  // Word-by-word headline reveal — implemented inline in AnimationProvider
}
