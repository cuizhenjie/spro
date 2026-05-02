# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**赛博穿搭AI百宝箱** is a fashion AI toolkit marketplace for the Vibe Coding Competition 2026. Users can buy/sell AI fashion tools (style analysis, skin tone detection, hairstyle recommendation) with coin-based payments. Features dark cyberpunk aesthetic with glassmorphism, particle animations, and GSAP-driven motion effects.

## Commands

```bash
npm run dev    # Start development server on port 3847
npm run build  # Build for production
npm start      # Start production server on port 3847
```

## Architecture

### Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS 3 + Cyber Wardrobe Design Token System
- **Animation**: GSAP with ScrollTrigger and Observer
- **Icons**: Lucide React
- **Auth**: localStorage + cookie (middleware route protection)
- **Fonts**: Syne (display), Space Grotesk (body), JetBrains Mono (code)

### Directory Structure
```
app/
  layout.tsx       — Root layout with font loading and metadata
  page.tsx         — Main landing page (Hero/Features/MarketplaceBanner/Gallery/Stats/Cta/Footer)
  globals.css      — CSS variables, base styles, custom utilities
  login/page.tsx   — Login/Register page
  marketplace/page.tsx — Tool marketplace
  seller/page.tsx  — Seller dashboard
  profile/page.tsx  — User profile
  orders/page.tsx  — Order history
  pricing/page.tsx — Pricing tiers

components/
  Hero.tsx, Features.tsx, Stats.tsx, CtaSection.tsx, Footer.tsx
  Sidebar.tsx       — Fixed left sidebar with nav
  MarketplaceBanner.tsx, GallerySection.tsx, Marquee.tsx
  ParticleCanvas.tsx — Canvas particle system
  AnimationProvider.tsx — GSAP provider

lib/
  gsap.ts         — GSAP initialization
  animations.ts   — Reusable GSAP animation functions
  auth.ts         — Auth system (login/logout/getAuth)
  marketplace-data.ts — 12 AI tool listings

middleware.ts     — Route protection (redirect to /login if not authenticated)
```

### Auth System
- `lib/auth.ts` — client-side auth with localStorage + cookie sync
- `middleware.ts` — protects /marketplace, /seller, /profile, /orders, /pricing
- Default demo: demo@cyberdress.ai / cyberdress123

### Design Token System (Cyber Wardrobe)
All components MUST use these tokens from tailwind.config.js:
- `primary` (#ffabf3 neon pink) → `text-primary`, `bg-primary`
- `secondary` (#ecffe3 hacker green) → `text-secondary`, `bg-secondary`
- `background` (#1c0f1a dark purple-black) → `bg-background`
- `surface-container` (#291b27) → `bg-surface-container`
- `on-surface` (#f4dcec) → `text-on-surface`
- `on-surface-variant` (#dcbed4) → `text-on-surface-variant`
- `tertiary` (#bfd043 amber gold) → `text-tertiary`, `bg-tertiary`
- `error` (#ffb4ab) → `text-error`
- `outline-variant` → `border-outline-variant`
- `glass-card` class from globals.css for glassmorphism cards

**Legacy aliases to avoid**: #00ff88, #ff2d78, #8888a0, #f0f0f5, #050508
