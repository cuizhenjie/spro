'use client';

import React, { useState } from 'react';
import { Coins, Zap, Check, X, Star, Crown, Sparkles, Shield } from 'lucide-react';
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";

const TIERS = [
  {
    id: 'tier_01',
    name: 'SCAVENGER',
    subtitle: '拾荒者',
    price: 'FREE',
    priceNote: '',
    icon: 'delete',
    accent: 'outline-variant',
    featured: false,
    features: [
      { text: 'Basic wardrobe access', included: true },
      { text: '5 scans per day', included: true },
      { text: 'Community models only', included: true },
      { text: 'Priority AI processing', included: false },
      { text: 'HD asset export', included: false },
      { text: 'Custom style training', included: false },
    ],
    cta: 'CURRENT PLAN',
    ctaStyle: 'border border-white/20 text-on-surface-variant',
  },
  {
    id: 'tier_02',
    name: 'CYBERPUNK',
    subtitle: '赛博朋克',
    price: '¥19',
    priceNote: '/MO',
    icon: 'offline_bolt',
    accent: 'primary',
    featured: true,
    features: [
      { text: 'Unlimited scans', included: true },
      { text: 'Priority AI processing', included: true },
      { text: 'HD asset export', included: true },
      { text: 'All community models', included: true },
      { text: 'Custom style training', included: false },
      { text: 'Dedicated server instance', included: false },
    ],
    cta: 'UPGRADE NOW',
    ctaStyle: 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)] hover:shadow-[0_0_20px_rgba(236,255,227,0.6)]',
  },
  {
    id: 'tier_03',
    name: 'OVERLORD',
    subtitle: '霸主',
    price: '¥99',
    priceNote: '/MO',
    icon: 'diamond',
    accent: 'tertiary',
    featured: false,
    features: [
      { text: 'Everything in Cyberpunk', included: true },
      { text: 'Custom style training', included: true },
      { text: 'Dedicated server instance', included: true },
      { text: 'API access', included: true },
      { text: 'White-label tools', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'CONTACT ADMIN',
    ctaStyle: 'border border-tertiary/50 text-tertiary hover:bg-tertiary/10 hover:shadow-[0_0_15px_rgba(191,208,67,0.3)]',
  },
];

const COIN_PACKS = [
  { coins: 100, bonus: 0, price: '¥4.99', popular: false },
  { coins: 500, bonus: 50, price: '¥19.99', popular: true },
  { coins: 1000, bonus: 150, price: '¥34.99', popular: false },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <main className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
        backgroundSize: '100% 4px'
      }} />

      {/* Background Glow Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary blur-[150px] opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary blur-[150px] opacity-10 pointer-events-none z-0" />

      {/* TopAppBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-background/80 backdrop-blur-md border-b border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-black italic text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.8)] font-display tracking-tighter uppercase">
            NEON_MARKET
          </span>
          <span className="text-on-surface/50 font-mono text-xs hidden md:inline">访问协议</span>
        </div>
        <div className="flex items-center gap-1 text-primary font-mono text-sm px-3 py-1 border border-primary/30 cyber-glass">
          <Coins className="w-4 h-4" />
          <span>200 CR</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pb-[120px] px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <header className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 py-2 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-sm text-secondary font-mono mb-2">
            <Zap className="w-3 h-3" />
            SYS.UPGRADE · UNLOCK FULL POWER
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-on-surface glitch-hover transition-all duration-300">
            ACCESS PROTOCOL
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Choose your AI level. From street-level scanning to full neural dominance — every tier unlocks more power.
          </p>
          <div className="absolute top-0 right-0 text-primary/30 font-mono text-[10px] hidden md:block">
            SYS.AUTH: CLEARANCE REQUIRED
          </div>
        </header>

        {/* Billing Toggle */}
        <section className="flex gap-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-all font-mono text-xs tracking-wider uppercase ${
              billingCycle === 'monthly'
                ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)]'
                : 'cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5'
            }`}
          >
            MONTHLY
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-all font-mono text-xs tracking-wider uppercase ${
              billingCycle === 'yearly'
                ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)]'
                : 'cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5'
            }`}
          >
            YEARLY · SAVE 20%
          </button>
        </section>

        {/* Pricing Tiers */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,255,227,0.8)] animate-pulse" />
            AI LEVEL SELECT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <HUDBrackets key={tier.id} className={`cyber-glass border-t border-l p-6 relative overflow-hidden flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? 'border-primary/50 shadow-[0_0_30px_rgba(255,171,243,0.15)] hover:shadow-[0_0_40px_rgba(255,171,243,0.3)]'
                    : 'border-white/20 hover:border-primary/30'
                }`}>
                {/* Gradient corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />

                {/* Background icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-on-surface">{tier.icon}</span>
                </div>

                {/* Tier badge */}
                <div className={`inline-block w-fit px-2 py-1 font-mono text-[10px] tracking-widest uppercase ${
                  tier.featured
                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(255,171,243,0.3)]'
                    : 'bg-white/5 text-on-surface-variant border border-white/10'
                }`}>
                  [{tier.id.toUpperCase()}]
                </div>

                {/* Name & Price */}
                <div>
                  <h3 className={`text-2xl font-bold font-display ${
                    tier.featured ? 'text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.5)]' : 'text-on-surface'
                  }`}>
                    {tier.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">{tier.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono text-on-surface">{tier.price}</span>
                  {tier.priceNote && <span className="text-lg text-on-surface-variant font-mono">{tier.priceNote}</span>}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feat, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm font-mono ${
                      feat.included ? 'text-on-surface-variant' : 'text-on-surface-variant/40 line-through'
                    }`}>
                      {feat.included ? (
                        <Check className={`w-4 h-4 flex-shrink-0 ${
                          tier.featured ? 'text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.8)]' : 'text-secondary'
                        }`} />
                      ) : (
                        <X className="w-4 h-4 flex-shrink-0 text-on-surface-variant/30" />
                      )}
                      {feat.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={`w-full py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${tier.ctaStyle}`}>
                  {tier.cta}
                </button>
              </HUDBrackets>
            ))}
          </div>
        </section>

        {/* Coin Packs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_8px_rgba(191,208,67,0.8)] animate-pulse" />
            COIN EXCHANGE
          </h2>
          <p className="text-on-surface-variant font-mono text-sm">// Top up credits for premium AI generation</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COIN_PACKS.map((pack, idx) => (
              <div
                key={idx}
                className={`cyber-glass border-t border-l p-6 text-center relative overflow-hidden cursor-pointer transition-all duration-300 group hover:-translate-y-1 ${
                  pack.popular
                    ? 'border-secondary/50 bg-white/[0.08] hover:shadow-[0_0_25px_rgba(236,255,227,0.3)]'
                    : 'border-white/20 hover:border-secondary/30'
                }`}
              >
                {/* Gradient corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />

                {pack.popular && (
                  <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-secondary text-background text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-[0_0_10px_rgba(236,255,227,0.5)] font-mono">
                    POPULAR
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-6 h-6 text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]" />
                  <span className="text-4xl font-bold text-secondary font-mono group-hover:drop-shadow-[0_0_15px_rgba(236,255,227,0.8)] transition-all">
                    {pack.coins}
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase mb-4">
                  COINS{pack.bonus > 0 ? ` + ${pack.bonus} BONUS` : ''}
                </div>
                <div className={`inline-block px-4 py-2 font-mono text-sm transition-all ${
                  pack.popular
                    ? 'bg-background border border-secondary text-secondary shadow-[0_0_15px_rgba(236,255,227,0.4)] group-hover:shadow-[0_0_25px_rgba(236,255,227,0.8)]'
                    : 'bg-background border border-secondary/30 text-secondary group-hover:shadow-[0_0_15px_rgba(236,255,227,0.5)]'
                }`}>
                  {pack.price}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="cyber-glass border-t border-l border-primary/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary drop-shadow-[0_0_6px_rgba(255,171,243,0.6)]" />
            <div>
              <span className="font-bold text-on-surface font-mono text-sm">SECURE PROTOCOL</span>
              <span className="text-on-surface-variant font-mono text-xs ml-2">// All payments encrypted on-chain</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant font-mono">
            <Star className="w-4 h-4 text-tertiary" />
            DAILY CHECK-IN → +20 CR
          </div>
        </section>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 bg-background/90 backdrop-blur-lg border-t border-primary/20 shadow-[0_-4px_20px_rgba(255,171,243,0.1)]">
        <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span>CORE</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          <span>MARKET</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl">android_fingerprint</span>
          <span>SCAN</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl">inventory_2</span>
          <span>ASSETS</span>
        </button>
        <button className="flex flex-col items-center justify-center text-secondary drop-shadow-[0_0_10px_rgba(236,255,227,0.7)] scale-110 font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span>PRICING</span>
        </button>
      </nav>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cyber-glass {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
        }
        .glitch-hover:hover {
          transform: translate(1px, -1px);
          text-shadow: 2px 0 #ffabf3, -2px 0 #ecffe3;
        }
      `}</style>
    </main>
  );
}
