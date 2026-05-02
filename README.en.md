# Spro — AI Fashion Lab

> **Your AI-Powered Fashion Command Center.** Personal styling diagnostics, creator monetization, and a marketplace for fashion intelligence — all in one.

---

## What Is Spro?

Spro is an AI-native fashion platform that bridges three critical gaps in the fashion industry:

1. **Personal diagnosis** — Most people dress based on trends, not what actually suits them. Spro analyzes your skin tone, face shape, style quadrant, and seasonal color type to give you personalized recommendations you can actually act on.

2. **Smart shopping** — Instead of browsing thousands of products, you get matched with items that align with your AI-generated style profile.

3. **Creator monetization** — Fashion creators with real taste can package their expertise into AI-powered tools and sell them directly to consumers — no brand deal required.

---

## Core Features

### 🧬 AI Diagnostic Tools

| Tool | What It Does |
|------|-------------|
| Palm & Face Reading | Fun fortune-style fashion personality report |
| Style Quiz | 15 questions → style quadrant (straight/curve × large/small) |
| Seasonal Color Diagnosis | Upload a selfie → spring/summer/autumn/winter type + color palette |
| Personal Image Diagnosis | Full style report: outfits, makeup, hair, accessories |
| Lipstick Finder | Skin tone analysis → Dior/YSL/Armani/Chanel shade match |
| Seasonal Outfit Guide | Upload photo → 4 seasonal outfit lookbooks AI-generated |
| Personal Color Analysis | Color science report with personalized swatches |
| Makeup Analysis | Professional makeup evaluation & recommendations |

### 🛍️ AI Fashion Marketplace

Creators sell AI tools. Consumers buy with Coins. AI generates personalized reports. Full automation, zero friction.

### 📦 Product Loop

Product detail pages → Add to cart → Order created → Saved in localStorage → Visible in orders page → Creator sees sale in dashboard.

### 💳 Pricing & Coins

- **3 subscription tiers**: Scavenger (free) / Cyberpunk (¥19/mo) / Overlord (¥99/mo)
- **Coins**: Pay-per-use for AI tools, with daily check-in bonus
- **Creator revenue share**: Tools listed by users, sales tracked in Seller Dashboard

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 15** (App Router) |
| Styling | **Tailwind CSS 3** + CyberUI component system |
| Animation | **GSAP** (ScrollTrigger, scan lines, parallax) |
| AI Text | **GLM-5.1** (bigmodel.cn / z.ai) |
| AI Image | **Stepfun step-image-edit-2** |
| State | React useState + localStorage |
| Icons | Lucide React + Material Symbols |

### Visual Identity

Cyberpunk × Swiss Grid design language:
- Primary: Neon Pink `#ffabf3`
- Secondary: Jade Green `#ecffe3`
- Tertiary: Lime `#bfd043`
- Background: Deep Purple-Black `#0a0610`

---

## Getting Started

```bash
git clone https://github.com/cuizhenjie/spro.git
cd spro
npm install
npm run dev
```

---

## Roadmap

| Status | Feature |
|--------|---------|
| ✅ | 8 AI diagnostic tools |
| ✅ | Full product loop (browse → detail → cart → order) |
| ✅ | Creator dashboard with order tracking |
| ✅ | Subscription tiers + Coins system |
| ✅ | CyberUI design system (dark theme) |
| ✅ | GSAP animations throughout |
| ⬜ | Real payment (WeChat/Alipay) |
| ⬜ | Self-serve creator tool publishing |
| ⬜ | User profile + report history |
| ⬜ | Social sharing + referral system |

---

## License

MIT License
