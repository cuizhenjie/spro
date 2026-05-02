'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Coins, Zap, Check, X, Star, Crown, Shield, Trash2, Bolt, Diamond, LayoutGrid, BarChart3, Store, User, Loader2, ChevronRight, AlertTriangle } from 'lucide-react';
import { HUDBrackets } from "@/components/CyberUI/HUDBrackets";
import { getAuth, updateUserLevel, DEFAULT_USER, type AuthUser } from '@/lib/auth';

const TIER_ID_MAP: Record<string, string> = {
  tier_01: 'SCAVENGER',
  tier_02: 'CYBERPUNK',
  tier_03: 'OVERLORD',
};

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
  },
  {
    id: 'tier_02',
    name: 'CYBERPUNK',
    subtitle: '赛博朋克',
    price: '19',
    priceNote: '金币/月',
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
  },
  {
    id: 'tier_03',
    name: 'OVERLORD',
    subtitle: '霸主',
    price: '99',
    priceNote: '金币/月',
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
  },
];

const COIN_PACKS = [
  { coins: 100, bonus: 0, price: 5, popular: false },
  { coins: 500, bonus: 50, price: 20, popular: true },
  { coins: 1000, bonus: 150, price: 35, popular: false },
];

const MOBILE_NAV: { label: string; icon: React.ElementType; href: string; active?: boolean }[] = [
  { label: '首页', icon: LayoutGrid, href: '/' },
  { label: '分析', icon: BarChart3, href: '/marketplace' },
  { label: '商店', icon: Store, href: '/marketplace' },
  { label: '订阅', icon: Star, href: '/pricing', active: true },
  { label: '我的', icon: User, href: '/profile' },
];

export default function PricingPage() {
  const router = useRouter();
  const [coins, setCoins] = useState(DEFAULT_USER.coins);
  const [userLevel, setUserLevel] = useState(DEFAULT_USER.level);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutType, setCheckoutType] = useState<'tier' | 'coin' | null>(null);
  const [selectedTier, setSelectedTier] = useState<typeof TIERS[0] | null>(null);
  const [selectedPack, setSelectedPack] = useState<typeof COIN_PACKS[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = getAuth();
    setCoins(user.coins);
    setUserLevel(user.level);
    setLoggedIn(user.loggedIn);
  }, []);

  const handleTierPurchase = (tier: typeof TIERS[0]) => {
    if (!loggedIn) {
      router.push('/login?redirect=/pricing');
      return;
    }
    if (tier.price === 'FREE') return;
    setSelectedTier(tier);
    setCheckoutType('tier');
    setShowCheckout(true);
  };

  const handleCoinPurchase = (pack: typeof COIN_PACKS[0]) => {
    if (!loggedIn) {
      router.push('/login?redirect=/pricing');
      return;
    }
    setSelectedPack(pack);
    setCheckoutType('coin');
    setShowCheckout(true);
  };

  const confirmPurchase = () => {
    setLoading(true);
    setTimeout(() => {
      if (checkoutType === 'tier' && selectedTier) {
        const newLevel = TIER_ID_MAP[selectedTier.id];
        updateUserLevel(newLevel);
        setUserLevel(newLevel);
        setSuccess(`升级成功！您现在是 ${selectedTier.name}（${selectedTier.subtitle}）`);
      } else if (checkoutType === 'coin' && selectedPack) {
        const totalCoins = selectedPack.coins + selectedPack.bonus;
        const auth = getAuth();
        const updated = { ...auth, coins: auth.coins + totalCoins };
        localStorage.setItem('spro_auth', JSON.stringify(updated));
        setCoins(updated.coins);
        setSuccess(`充值成功！+${totalCoins} 金币已到账`);
      }
      setLoading(false);
      setShowCheckout(false);
      setTimeout(() => setSuccess(''), 4000);
    }, 1200);
  };

  const getTierCta = (tier: typeof TIERS[0]) => {
    const levelName = TIER_ID_MAP[tier.id];
    if (levelName === userLevel) return { label: '当前方案', style: 'border border-white/20 text-on-surface-variant cursor-default' };
    if (tier.price === 'FREE') return { label: '当前方案', style: 'border border-white/20 text-on-surface-variant cursor-default' };
    return { label: '立即升级', style: 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)] hover:shadow-[0_0_20px_rgba(236,255,227,0.6)]' };
  };

  const getTierCtaStyle = (tier: typeof TIERS[0]) => {
    const cta = getTierCta(tier);
    if (cta.label === '当前方案') return cta.style;
    return `w-full py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${tier.featured ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)] hover:shadow-[0_0_20px_rgba(236,255,227,0.6)]' : 'border border-secondary/50 text-secondary hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(236,255,227,0.3)]'}`;
  };

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

      {/* Success Toast */}
      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-secondary/20 border border-secondary/50 text-secondary font-mono text-sm shadow-[0_0_20px_rgba(236,255,227,0.4)] backdrop-blur-xl">
          ✓ {success}
        </div>
      )}

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
          {/* Current user badge */}
          {loggedIn && (
            <div className="flex items-center gap-3 mt-2 px-4 py-2 cyber-glass border border-white/10">
              <Crown className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-on-surface-variant">当前等级：</span>
              <span className="font-mono text-xs text-primary font-bold">{userLevel}</span>
              <span className="font-mono text-xs text-secondary">·</span>
              <Coins className="w-4 h-4 text-secondary" />
              <span className="font-mono text-xs text-secondary font-bold">{coins}</span>
            </div>
          )}
          <div className="absolute top-0 right-0 text-primary/30 font-mono text-[10px] hidden md:block">
            SYS.AUTH: {loggedIn ? '已授权' : '未登录'}
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
              const cta = getTierCta(tier);
              const isCurrent = cta.label === '当前方案';
              return (
                <HUDBrackets key={tier.id} className={`cyber-glass border-t border-l p-6 relative overflow-hidden flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
                    tier.featured && !isCurrent
                      ? 'border-primary/50 shadow-[0_0_30px_rgba(255,171,243,0.15)] hover:shadow-[0_0_40px_rgba(255,171,243,0.3)]'
                      : isCurrent
                      ? 'border-secondary/40 shadow-[0_0_20px_rgba(236,255,227,0.1)]'
                      : 'border-white/20 hover:border-primary/30'
                  }`}>
                  {/* Gradient corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />

                  {/* Background icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <TierIcon className="w-14 h-14 text-on-surface" />
                  </div>

                  {/* Current badge */}
                  {isCurrent && (
                    <div className="absolute top-0 left-0 right-0 bg-secondary/20 border-b border-secondary/40 text-center py-1">
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">当前方案</span>
                    </div>
                  )}

                  {/* Tier badge */}
                  <div className={`inline-block w-fit px-2 py-1 font-mono text-[10px] tracking-widest uppercase ${
                    tier.featured && !isCurrent
                      ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(255,171,243,0.3)]'
                      : isCurrent
                      ? 'bg-secondary/20 text-secondary border border-secondary/40'
                      : 'bg-white/5 text-on-surface-variant border border-white/10'
                  }`}>
                    [{tier.id.toUpperCase()}]
                  </div>

                  {/* Name & Price */}
                  <div>
                    <h3 className={`text-2xl font-bold font-display ${
                      tier.featured && !isCurrent ? 'text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.5)]' : 'text-on-surface'
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
                            tier.featured && !isCurrent ? 'text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.8)]' : 'text-secondary'
                          }`} />
                        ) : (
                          <X className="w-4 h-4 flex-shrink-0 text-on-surface-variant/30" />
                        )}
                        {feat.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleTierPurchase(tier)}
                    className={`w-full py-3 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${getTierCtaStyle(tier)}`}
                  >
                    {isCurrent ? '✓ 当前方案' : tier.price === 'FREE' ? '当前方案' : '立即升级'}
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
            金币充值
          </h2>
          <p className="text-on-surface-variant font-mono text-sm">// 充值金币用于高级AI生成分析</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COIN_PACKS.map((pack, idx) => (
              <div
                key={idx}
                onClick={() => handleCoinPurchase(pack)}
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
                  ¥{pack.price}
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

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-background/80 backdrop-blur-xl border border-primary/50 shadow-[inset_0_0_12px_rgba(255,171,243,0.1),0_0_12px_rgba(255,171,243,0.3),0_0_30px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/30 bg-surface-container/50">
              <div className="flex items-center gap-3">
                {checkoutType === 'tier' ? (
                  <Diamond className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.6)]" />
                ) : (
                  <Coins className="w-5 h-5 text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]" />
                )}
                <h2 className="font-display font-bold text-lg text-on-surface">
                  {checkoutType === 'tier' ? '升级 AI 等级' : '金币充值'}
                </h2>
              </div>
              <button
                onClick={() => !loading && setShowCheckout(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {checkoutType === 'tier' && selectedTier && (
                <>
                  <div className="p-4 cyber-glass border border-white/10 text-center">
                    <p className="font-mono text-xs text-on-surface-variant mb-2">即将升级至</p>
                    <p className="text-2xl font-display font-bold text-primary">{selectedTier.name}</p>
                    <p className="font-mono text-sm text-on-surface-variant">{selectedTier.subtitle}</p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <span className="text-3xl font-bold text-secondary">{selectedTier.price}</span>
                      <span className="text-sm text-on-surface-variant font-mono ml-1">{selectedTier.priceNote}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-tertiary/10 border border-tertiary/30 text-xs font-mono text-on-surface-variant">
                    <AlertTriangle className="w-4 h-4 text-tertiary flex-shrink-0 mt-0.5" />
                    升级立即生效，自动续费。如需取消，请在到期日前手动关闭续费。
                  </div>
                </>
              )}

              {checkoutType === 'coin' && selectedPack && (
                <>
                  <div className="p-4 cyber-glass border border-white/10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Coins className="w-5 h-5 text-secondary" />
                      <span className="text-3xl font-bold text-secondary font-mono">{selectedPack.coins + selectedPack.bonus}</span>
                    </div>
                    <p className="font-mono text-xs text-on-surface-variant">金币 {selectedPack.bonus > 0 ? `（含赠送 ${selectedPack.bonus}）` : ''}</p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <span className="text-3xl font-bold text-secondary">¥{selectedPack.price}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-tertiary/10 border border-tertiary/30 text-xs font-mono text-on-surface-variant">
                    <AlertTriangle className="w-4 h-4 text-tertiary flex-shrink-0 mt-0.5" />
                    金币充值不可退款，有效期12个月。
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCheckout(false)}
                  disabled={loading}
                  className="flex-1 py-3 border border-white/20 text-on-surface-variant font-mono text-xs uppercase tracking-wider transition-colors hover:bg-white/5 disabled:opacity-50"
                >
                  取消
                </button>
                <button
                  onClick={confirmPurchase}
                  disabled={loading}
                  className="flex-1 py-3 bg-secondary text-background font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(236,255,227,0.4)] hover:shadow-[0_0_25px_rgba(236,255,227,0.6)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {loading ? '处理中...' : '确认支付'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .cyber-glass { background-color: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); }
        .glitch-hover:hover { transform: translate(1px, -1px); text-shadow: 2px 0 #ffabf3, -2px 0 #ecffe3; }
      `}</style>
    </main>
  );
}
