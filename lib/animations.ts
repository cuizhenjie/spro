// GSAP Animation Utilities for Cyber Wardrobe
// Based on spro_ui_analysis.md recommendations

export const CYAN_SCAN = {
  keyframes: { top: '0%', middle: '50%', bottom: '100%' },
  duration: 2.2,
  ease: 'none',
};

export const PULSE_GLOW = {
  keyframes: { from: { opacity: 0.4, scale: 1 }, to: { opacity: 1, scale: 1.05 } },
  duration: 1.2,
  repeat: -1,
  yoyo: true,
};

export const TERMINAL_CURSOR = { text: '_', duration: 0.8, repeat: -1, yoyo: true, ease: 'none' };
export const PROGRESS_STRIPES = { angle: 45, speed: 8 };

// --- rAF-based animations (no GSAP dependency needed) ---

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
  // Intersection Observer for scroll-triggered fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.scrollVisible = 'true';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('[data-scroll-animate]').forEach((el) => observer.observe(el));
}

export function initButtonPulse() {
  // CSS animation via class toggling (avoids GSAP overhead for simple pulses)
  const buttons = document.querySelectorAll('.cyber-btn-orange, .btn-pulse');
  buttons.forEach((btn) => {
    btn.classList.add('animate-pulse-glow');
  });
}

export function initTypographicSplitReveal() {
  // Split text into words and animate each with stagger
  const targets = document.querySelectorAll('[data-split-reveal]');
  targets.forEach((el) => {
    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = words
      .map((w) => `<span class="split-word" style="display:inline-block;opacity:0;transform:translateY(12px)">${w}</span>`)
      .join(' ');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('.split-word');
            spans.forEach((span, i) => {
              setTimeout(() => {
                (span as HTMLElement).style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                (span as HTMLElement).style.opacity = '1';
                (span as HTMLElement).style.transform = 'translateY(0)';
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
  });
}

// --- GSAP helpers (for when GSAP is available) ---
export function gsapScanLine(element: HTMLElement, options: { fromY?: number; toY?: number; duration?: number }) {
  const { fromY = -10, toY = element.parentElement?.offsetHeight ?? 300, duration = 2.2 } = options;
  element.style.position = 'absolute';
  element.style.top = `${fromY}px`;
  let start: number | null = null;
  const animate = (ts: number) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / (duration * 1000), 1);
    element.style.top = `${fromY + (toY - fromY) * progress}px`;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}
