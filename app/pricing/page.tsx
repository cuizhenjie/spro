'use client';

import React from 'react';
import Link from 'next/link';
import { Coins, Zap, Check, X, Star, Crown, Sparkles, Shield, Trash2, Bolt, Diamond, LayoutGrid, BarChart3, Store, User } from 'lucide-react';
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";

const TIERS = [
  {
    id: 'tier_01',
    name: 'SCAVENGER',
    subtitle: '拾荒者',
    price: 'FREE',
    priceNote: '',
    icon: Trash2,
    accent: 'outline-variant',
    featured: false,
    features: [
      { text: '基础衣橱访问', included: true },
      { text: '每日5次扫描', included: true },
      { text: '仅社区模型', included: true },
      { text: '优先AI处理', included: false },
      { text: '高清资产导出', included: false },
      { text: '自定义风格训练', included: false },
    ],
    cta: '当前方案',
    ctaStyle: 'border border-white/20 text-on-surface-variant',
  },
  {
    id: 'tier_02',
    name: 'CYBERPUNK',
    subtitle: '赛博朋克',
    price: '¥19',
    priceNote: '/月',
    icon: Bolt,
    accent: 'primary',
    featured: true,
    features: [
      { text: '无限扫描', included: true },
      { text: '优先AI处理', included: true },
      { text: '高清资产导出', included: true },
      { text: '全部社区模型', included: true },
      { text: '自定义风格训练', included: false },
      { text: '专属服务器实例', included: false },
    ],
    cta: '立即升级',
    ctaStyle: 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)] hover:shadow-[0_0_20px_rgba(236,255,227,0.6)]',
  },
  {
    id: 'tier_03',
    name: 'OVERLORD',
    subtitle: '霸主',
    price: '¥99',
    priceNote: '/月',
    icon: Diamond,
    accent: 'tertiary',
    featured: false,
    features: [
      { text: '包含赛博朋克全部功能', included: true },
      { text: '自定义风格训练', included: true },
      { text: '专属服务器实例', included: true },
      { text: 'API 访问权限', included: true },
      { text: '白标工具', included: true },
      { text: '7×24 优先支持', included: true },
    ],
    cta: '联系管理员',
    ctaStyle: 'border border-tertiary/50 text-tertiary hover:bg-tertiary/10 hover:shadow-[0_0_15px_rgba(191,208,67,0.3)]',
  },
];

const COIN_PACKS = [
  { coins: 100, bonus: 0, price: '¥4.99', popular: false },
  { coins: 500, bonus: 50, price: '¥19.99', popular: true },
  { coins: 1000, bonus: 150, price: '¥34.99', popular: false },
];

const MOBILE_NAV: { label: string; icon: React.ElementType; href: string; active?: boolean }[] = [
  { label: '首页', icon: LayoutGrid, href: '/' },
  { label: '分析', icon: BarChart3, href: '/marketplace' },
  { label: '商店', icon: Store, href: '/marketplace' },
  { label: '订阅', icon: Star, href: '/pricing', active: true },
  { label: '我的', icon: User, href: '/profile' },
];

export default function PricingPage() {
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

      {/* Main Content */}
      <div className="relative z-10 pb-[120px] px-4 md:px-6 pt-8 max-w-7xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <header className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 py-2 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-sm text-secondary font-mono mb-2">
            <Zap className="w-3 h-3" />
            系统升级 · 解锁全部能力
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-on-surface glitch-hover transition-all duration-300">
            订阅方案
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            选择你的 AI 等级。从街头扫描到全面神经掌控 — 每个等级解锁更多能力。
          </p>
          <div className="absolute top-0 right-0 text-primary/30 font-mono text-[10px] hidden md:block">
            SYS.AUTH: 需要授权
          </div>
        </header>

        {/* Pricing Tiers */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,255,227,0.8)] animate-pulse" />
            AI 等级选择
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier) => {
              const TierIcon = tier.icon;
              return (
                <HUDBrackets key={tier.id} className={`cyber-glass border-t border-l p-6 relative overflow-hidden flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
                    tier.featured
                      ? 'border-primary/50 shadow-[0_0_30px_rgba(255,171,243,0.15)] hover:shadow-[0_0_40px_rgba(255,171,243,0.3)]'
                      : 'border-white/20 hover:border-primary/30'
                  }`}>
                  {/* Gradient corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />

                  {/* Background icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <TierIcon className="w-14 h-14 text-on-surface" />
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
              );
            })}
          </div>
        </section>

        {/* Coin Packs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_8px_rgba(191,208,67,0.8)] animate-pulse" />
            金币兑换
          </h2>
          <p className="text-on-surface-variant font-mono text-sm">// 充值积分用于高级AI生成</p>

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
                    热门
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-6 h-6 text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]" />
                  <span className="text-4xl font-bold text-secondary font-mono group-hover:drop-shadow-[0_0_15px_rgba(236,255,227,0.8)] transition-all">
                    {pack.coins}
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase mb-4">
                  金币{pack.bonus > 0 ? ` + ${pack.bonus} 赠送` : ''}
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
              <span className="font-bold text-on-surface font-mono text-sm">安全协议</span>
              <span className="text-on-surface-variant font-mono text-xs ml-2">// 所有支付链上加密</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant font-mono">
            <Star className="w-4 h-4 text-tertiary" />
            每日签到 → +20 金币
          </div>
        </section>
      </div>

      {/* Mobile Bottom Nav — matches homepage style */}
      <nav className="md:hidden fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-primary-container/30 bg-background/90 pb-safe shadow-[0_-5px_25px_rgba(255,171,243,0.15)] backdrop-blur-lg">
        {MOBILE_NAV.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 font-display text-[10px] font-bold uppercase transition-transform active:scale-90 ${
                item.active
                  ? 'text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.6)]'
                  : 'text-outline transition-colors hover:text-primary-fixed'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
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
