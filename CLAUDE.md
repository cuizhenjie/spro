# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**赛博穿搭AI百宝箱** — a fashion AI toolkit marketplace for the Vibe Coding Competition 2026. Users buy/sell AI fashion tools (style analysis, skin tone detection, hairstyle recommendation) with coin-based payments. Dark cyberpunk aesthetic with glassmorphism, particle animations, and GSAP-driven motion effects. The entire UI is in Chinese (zh-CN).

## Commands

```bash
npm run dev    # Dev server on port 3847
npm run build  # Production build
npm start      # Production server on port 3847
```

No linter or test runner is configured.

## Architecture

### Stack
- **Next.js 15** (App Router, TypeScript, `"type": "commonjs"`)
- **Tailwind CSS 3** + Cyber Wardrobe Design Token System
- **GSAP** with ScrollTrigger and Observer plugins
- **Lucide React** for icons
- **clsx + tailwind-merge** via `lib/utils.ts` → `cn()` helper
- **No backend** — auth is client-side only (localStorage + cookie)

### Layout System
`AppShell` wraps all pages. It renders `TopNav` (fixed top bar) and conditionally shows `Sidebar` (fixed left, 288px) on pages that aren't in the no-sidebar list (`/`, `/profile`, `/pricing`, `/marketplace`, `/seller`). Pages with sidebar get `lg:pl-72` padding. All pages get `pt-[73px]` for the top nav.

### Routing & Auth
- **Middleware** (`middleware.ts`) protects: `/marketplace`, `/seller`, `/profile`, `/orders`, `/pricing`, `/marketplace`
- **Auth** (`lib/auth.ts`) — client-side only. Uses `localStorage` + a `cyberdress_auth` cookie (7-day max-age, `SameSite=Lax`). Single hardcoded demo user: `demo@cyberdress.ai` / `cyberdress123` (520 coins, level "Cyberpunk").
- Unauthenticated users hitting protected routes get redirected to `/login?redirect=<original-path>`.

### Design Token System (tailwind.config.js)
All components MUST use these semantic Tailwind classes. Never hardcode hex values.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#ffabf3` | `text-primary`, `bg-primary` — neon pink accents |
| `secondary` | `#ecffe3` | `text-secondary`, `bg-secondary` — hacker green |
| `tertiary` | `#ffe04a` | `text-tertiary`, `bg-tertiary` — amber gold |
| `background` | `#1c0f1a` | `bg-background` — page background |
| `surface-container` | `#141422` | `bg-surface-container` — card/panel background |
| `on-surface` | `#e8e0f0` | `text-on-surface` — primary text |
| `on-surface-variant` | `#a098b0` | `text-on-surface-variant` — secondary text |
| `error` | `#ff4444` | `text-error` |
| `outline-variant` | `#302840` | `border-outline-variant` |

Use the `glass-card` CSS class from `globals.css` for glassmorphism cards.

**Legacy aliases still in tailwind config** (prefer the semantic tokens above): `bg-primary`, `bg-elevated`, `bg-glass`, `text-primary`, `text-secondary`, `accent-primary`, `accent-secondary`, `accent-tertiary`, `border-subtle`.

### Fonts
Google Fonts loaded in `layout.tsx`: **Syne**, **Space Grotesk**, **JetBrains Mono**, **Be Vietnam Pro**.
Tailwind `fontFamily` config: `display`/`sans`/`mono`/`h1`-`h3` → Space Grotesk; `body`/`body-lg`/`body-md` → Be Vietnam Pro; `mono-data` → Space Grotesk monospace.

### Key Directories
```
app/              — Next.js App Router pages
  page.tsx        — Landing page (Hero/Features/MarketplaceBanner/Gallery/Stats/Cta/Footer)
  ai-listing/     — Individual AI tool detail page
  ai-tools/       — AI tools overview page
  history/        — Analysis history
  segment-explorer/ — Style quadrant explorer
components/
  CyberUI/        — Reusable cyberpunk UI primitives (GlassCard, HUDBrackets, TerminalLog)
  AppShell.tsx    — TopNav + conditional Sidebar wrapper
  TopNav.tsx      — Fixed top navigation bar
  AnimationProvider.tsx — GSAP context provider
  ParticleCanvas.tsx   — Canvas-based particle system
lib/
  gsap.ts         — GSAP plugin registration (client-only guard)
  animations.ts   — Animation utilities (rAF-based + GSAP helpers)
  auth.ts         — Client-side auth (login/logout/getAuth)
  marketplace-data.ts — 12 AI tool listings with categories
  utils.ts        — cn() helper (clsx + tailwind-merge)
types/
  marketplace.ts  — All TypeScript interfaces (MarketTool, AnalysisResult variants, StyleQuiz types)
middleware.ts     — Server-side route protection
```

### Animation Pattern
`lib/animations.ts` provides two approaches:
1. **rAF-based** (no GSAP): `initScanLineAnimation`, `initScrollAnimations` (IntersectionObserver), `initTypographicSplitReveal`
2. **GSAP helpers**: `gsapScanLine` — use when GSAP context is available

GSAP is initialized in `lib/gsap.ts` with a `typeof window` guard. Register ScrollTrigger and Observer plugins there.

### Data Types
All marketplace tool types and analysis result interfaces live in `types/marketplace.ts`. Tool categories: `style | fortune | outfit | color | hair | lipstick | image-diagnosis`. Each analysis type has its own result interface (StyleResult, PalmReadingResult, etc.).
