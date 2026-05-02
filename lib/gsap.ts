// lib/gsap.ts — GSAP initialization + plugin registration
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

export { gsap, ScrollTrigger, Observer };
export default gsap;
