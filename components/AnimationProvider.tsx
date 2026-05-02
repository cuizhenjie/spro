'use client';

import { useEffect } from 'react';
import { initScrollAnimations, initButtonPulse } from '@/lib/animations';

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initScrollAnimations();
    initButtonPulse();
  }, []);

  return <>{children}</>;
}
