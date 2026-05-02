'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MARKET_TOOLS, CATEGORIES, STYLE_QUADRANTS, MOCK_ANALYSIS_RESULTS } from '@/lib/marketplace-data';
import { PRODUCTS as PRODUCT_LIST } from '@/lib/products-data';
import { MarketTool, StyleQuadrant } from '@/types/marketplace';
import StyleQuiz from '@/components/StyleQuiz';
import { HUDBrackets } from '@/components/CyberUI/HUDBrackets';
import { GlassCard } from '@/components/CyberUI/GlassCard';
import { Sparkles, ShoppingCart, Coins, Check, Star, Palette, Trash2, Minus, Plus, X, Terminal, Search, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { getAuth } from '@/lib/auth';

export default function MarketplacePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<MarketTool[]>([]);
  const [coins, setCoins] = useState(() => {
    try { return getAuth()?.coins ?? 520; } catch { return 520; }
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [ownedTools, setOwnedTools] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<MarketTool | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<StyleQuadrant | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const filteredTools = activeCategory === 'all'
    ? MARKET_TOOLS
    : MARKET_TOOLS.filter(t => t.category === activeCategory);

  const addToCart = (tool: MarketTool) => {
    if (!cart.find(t => t.id === tool.id)) {
      setCart([...cart, tool]);
    }
  };

  const removeFromCart = (toolId: string) => {
    setCart(cart.filter(t => t.id !== toolId));
  };

  const checkout = () => {
    const total = cart.reduce((sum, t) => sum + t.price, 0);
    if (total <= coins) {
      const purchasedIds = cart.map((t: MarketTool) => t.id);
      // Save orders to localStorage
      try {
        const orders = JSON.parse(localStorage.getItem("spro_orders") || "[]");
        cart.forEach((tool: MarketTool) => {
          orders.unshift({
            id: "ORD_" + Math.random().toString(36).slice(2, 8).toUpperCase(),
            productId: tool.id,
            productName: tool.name,
            productImage: "",
            author: "",
            price: tool.price,
            type: "buy",
            status: "completed",
            time: "刚刚",
            rarity: "",
          });
        });
        localStorage.setItem("spro_orders", JSON.stringify(orders));
        // Sync owned tools list for scan page to read
        const owned = JSON.parse(localStorage.getItem('spro_owned_tools') || '[]');
        purchasedIds.forEach((id: string) => { if (!owned.includes(id)) owned.push(id); });
        localStorage.setItem('spro_owned_tools', JSON.stringify(owned));
      } catch {}
      setCoins(coins - total);
      setOwnedTools([...ownedTools, ...purchasedIds]);
      setCart([]);
      setShowCheckout(false);
      // Redirect to scan for the active tool
      if (activeTool) {
        sessionStorage.setItem('spro_active_tool', activeTool.id);
        router.push('/scan');
      }
    }
  };

  const startAnalysis = (tool: MarketTool) => {
    // Step 1: Check login
    const auth = getAuth();
    if (!auth.loggedIn) {
      router.push('/login?redirect=/marketplace');
      return;
    }

    // Step 2: Not owned → add to cart and open checkout
    if (!ownedTools.includes(tool.id)) {
      addToCart(tool);
      setShowCheckout(true);
      return;
    }

    // Step 3: Owned → scan then upload/[tool]
    setActiveTool(tool);
    sessionStorage.setItem('spro_active_tool', tool.id);
    router.push('/scan');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const closeTool = () => {
    setActiveTool(null);
    setShowResult(false);
    setUploadedImage(null);
    setShowQuiz(false);
    setQuizResult(null);
  };

  const renderResult = () => {
    if (!activeTool) return null;

    if (activeTool.category === 'style' || activeTool.id === 'vip-all-in') {
      if (quizResult) {
        return (
          <div className="space-y-4">
            <div className="cyber-glass border-t border-l border-white/20 p-6 text-center border-2" style={{ borderColor: quizResult.color }}>
              <div
                className="w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: `${quizResult.color}30`, color: quizResult.color }}
              >
                {quizResult.line === '直线型' ? '◆' : '●'}
              </div>
              <div className="text-2xl font-bold mb-1 text-on-surface">{quizResult.name}</div>
              <div className="text-on-surface-variant mb-4">{quizResult.desc}</div>
              <div className="flex flex-wrap justify-center gap-2">
                {quizResult.traits.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-sm font-mono" style={{ backgroundColor: `${quizResult.color}20`, color: quizResult.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="cyber-glass border-t border-l border-white/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-secondary drop-shadow-[0_0_6px_rgba(236,255,227,0.6)]" />
                <span className="font-bold text-on-surface">适合的风格</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizResult.suitableStyles.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-sm">{s}</span>
                ))}
              </div>
            </div>

            <div className="cyber-glass border-t border-l border-white/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
                <span className="font-bold text-on-surface">推荐颜色</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizResult.suitableColors.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-tertiary/10 text-tertiary text-sm">{c}</span>
                ))}
              </div>
            </div>

            <div className="cyber-glass border-t border-l border-white/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
                <span className="font-bold text-on-surface">推荐单品</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizResult.recommendedItems.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-tertiary/10 text-tertiary text-sm">{item}</span>
                ))}
              </div>
            </div>
          </div>
        );
      }

      const result = MOCK_ANALYSIS_RESULTS.style;
      const quadrant = STYLE_QUADRANTS.find(q => q.id === result.quadrant);
      void quadrant;
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {STYLE_QUADRANTS.map((q) => (
              <div
                key={q.id}
                className={`p-4 border-2 transition-all cursor-pointer cyber-glass ${
                  q.id === result.quadrant
                    ? 'border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(236,255,227,0.2)]'
                    : 'border-white/10 hover:border-primary/40'
                }`}
              >
                <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: q.color }} />
                <div className="font-bold text-sm text-on-surface">{q.name}</div>
                <div className="text-xs text-on-surface-variant">{q.desc}</div>
                {q.id === result.quadrant && (
                  <div className="mt-2 text-xs text-secondary font-bold tracking-wider">{'// MATCHED'}</div>
                )}
              </div>
            ))}
          </div>

          <div className="cyber-glass border-t border-l border-white/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-4 h-4 text-secondary drop-shadow-[0_0_6px_rgba(236,255,227,0.6)]" />
              <span className="font-bold text-on-surface">适合的风格</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.suitableStyles.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="cyber-glass border-t border-l border-white/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
              <span className="font-bold text-on-surface">适合的颜色</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.suitableColors.map((c, i) => (
                <span key={i} className="px-3 py-1 bg-tertiary/10 text-tertiary text-sm">{c}</span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTool.category === 'fortune') {
      const result = MOCK_ANALYSIS_RESULTS.palmReading;
      return (
        <div className="space-y-4">
          <div className="cyber-glass border-t border-l border-primary/30 p-6 text-center">
            <div className="text-3xl mb-2">🔮</div>
            <div className="text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,171,243,0.6)] mb-1">{result.overallFortune}</div>
            <div className="text-on-surface-variant font-mono text-sm">{result.overallRating}</div>
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-4 text-sm leading-relaxed text-on-surface-variant whitespace-pre-wrap">
            {result.summary}
          </div>
          <div className="space-y-3">
            {result.points.slice(0, 4).map((pt, i) => (
              <div key={i} className="cyber-glass border-t border-l border-white/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-on-surface">{pt.classicalTitle}</span>
                  <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary font-mono">{pt.fortune}</span>
                </div>
                <div className="text-sm text-on-surface-variant">{pt.interpretation}</div>
              </div>
            ))}
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-4 text-sm leading-relaxed text-on-surface-variant">
            {result.ancientWisdom}
          </div>
        </div>
      );
    }

    if (activeTool.category === 'lipstick') {
      const result = MOCK_ANALYSIS_RESULTS.lipstick;
      return (
        <div className="space-y-4">
          <div className="cyber-glass border-t border-l border-primary/30 p-6 text-center">
            <div className="text-3xl mb-2">💄</div>
            <div className="text-xl font-bold text-on-surface">{result.brand} 口红推荐</div>
            <div className="text-on-surface-variant text-sm font-mono">{result.skinTone} · {result.undertone}调</div>
          </div>
          <div className="space-y-3">
            {result.recommendedShades.map((shade, i) => (
              <div key={i} className="cyber-glass border-t border-l border-white/20 p-4 flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 border border-white/10" style={{ backgroundColor: shade.hex }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-on-surface">{shade.name}</span>
                    <span className="text-xs text-secondary font-mono font-bold">MATCH {shade.matchScore}%</span>
                  </div>
                  <div className="text-xs text-on-surface-variant mb-2">{shade.description}</div>
                  <div className="flex flex-wrap gap-1">
                    {shade.sceneTags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-mono">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-4 text-sm text-on-surface-variant">{result.summaryAdvice}</div>
        </div>
      );
    }

    if (activeTool.category === 'image-diagnosis') {
      const result = MOCK_ANALYSIS_RESULTS.imageDiagnosis;
      return (
        <div className="space-y-4">
          <div className="cyber-glass border-t border-l border-tertiary/30 p-6 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="text-xl font-bold text-on-surface">{result.seasonType} · {result.toneType}</div>
            <div className="text-on-surface-variant text-sm font-mono">{result.brightness} · {result.contrast}</div>
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-secondary drop-shadow-[0_0_6px_rgba(236,255,227,0.6)]" />
              <span className="font-bold text-on-surface">色彩搭配</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {result.colorPalette.map((swatch, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: swatch.hex }} />
                  <span className={`text-xs font-mono ${swatch.category === 'avoid' ? 'text-primary' : 'text-on-surface-variant'}`}>{swatch.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-4 text-sm text-on-surface-variant">{result.overallSummary}</div>
        </div>
      );
    }

    return (
      <div className="cyber-glass border-t border-l border-white/20 p-6 text-center">
        <div className="text-4xl mb-4">{activeTool.icon}</div>
        <div className="font-bold text-on-surface">{activeTool.name}</div>
        <div className="text-on-surface-variant text-sm mt-2 font-mono">{'// COMING SOON...'}</div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.15))',
        backgroundSize: '100% 4px'
      }} />

      {/* Background Glow Orbs */}
      <div className="fixed top-[-15%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary blur-[180px] opacity-[0.07] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-secondary blur-[180px] opacity-[0.06] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 pt-6 pb-32 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">

        {/* ── Hero Section ── */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">
                  市场
                </h1>
                <span className="text-sm md:text-base font-mono text-primary/60 tracking-widest uppercase">
                  / Market
                </span>
              </div>
              <p className="text-on-surface-variant text-sm md:text-base">
                AI穿搭分析工具 & 数字时尚资产 · 升级你的赛博美学
              </p>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-tertiary" />
                <span>{MARKET_TOOLS.length} 工具</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-tertiary" />
                <span>{coins} 金币</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span>{PRODUCT_LIST.length} 资产</span>
              </div>
            </div>
          </div>

          {/* Coin Balance Bar */}
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-surface-container/60 border border-outline-variant/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
                <Coins className="w-4 h-4 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-mono">账户余额</div>
                <div className="font-display font-bold text-tertiary text-lg leading-tight">{coins} <span className="text-xs font-mono text-on-surface-variant">金币</span></div>
              </div>
            </div>
            <div className="flex-1 hidden md:block">
              <div className="h-1.5 rounded-full bg-outline-variant/30 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-tertiary/80 to-tertiary/40" style={{ width: `${Math.min(100, (coins / 1000) * 100)}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/pricing" className="text-xs text-primary font-mono hover:underline flex items-center gap-1">
                充值 <ChevronRight className="w-3 h-3" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                <Star className="w-3.5 h-3.5 text-tertiary" />
                每日签到 +20
              </div>
            </div>
          </div>
        </header>

        {/* ── Category Tabs ── */}
        <section className="mb-8">
          <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide border-b border-outline-variant/30">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 whitespace-nowrap transition-all text-sm rounded-lg ${
                  activeCategory === cat.id
                    ? 'bg-pink-500 text-white font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                }`}
              >
                {activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/60 rounded-full" />
                )}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── AI Tools Grid ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-on-surface flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_8px_rgba(255,171,243,0.4)]" />
              AI 分析工具
            </h2>
            <span className="text-xs font-mono text-on-surface-variant">
              {filteredTools.length} 项
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="group relative bg-surface-container/40 border border-outline-variant/50 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-[0_0_20px_rgba(255,171,243,0.08)] transition-all duration-300"
              >
                {/* Top gradient accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${tool.color}60, transparent)` }} />

                <div className="p-5">
                  {/* Header: icon + badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5" style={{ backgroundColor: `${tool.color}10` }}>
                      <span className="material-symbols-outlined text-2xl" style={{ color: tool.color, filter: `drop-shadow(0 0 6px ${tool.color}60)` }}>
                        {tool.icon}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.isHot && (
                        <span className="px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-mono font-semibold rounded border border-primary/20">
                          HOT
                        </span>
                      )}
                      {tool.isNew && (
                        <span className="px-2 py-0.5 bg-secondary/15 text-secondary text-[10px] font-mono font-semibold rounded border border-secondary/20">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title + desc */}
                  <h3 className="font-display font-bold text-on-surface text-base mb-1.5">{tool.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2">{tool.description}</p>

                  {/* Price + action */}
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                    <div className="flex items-baseline gap-1.5">
                      {tool.originalPrice && tool.originalPrice > tool.price && (
                        <span className="text-xs text-on-surface-variant/60 line-through font-mono mr-0.5">{tool.originalPrice}</span>
                      )}
                      <span className="font-display font-bold text-tertiary text-lg">{tool.price}</span>
                      <span className="text-xs text-on-surface-variant font-mono">金币</span>
                    </div>
                    {ownedTools.includes(tool.id) ? (
                      <button
                        onClick={() => startAnalysis(tool)}
                        className="px-4 py-1.5 rounded-lg border border-secondary/50 text-secondary text-xs font-mono hover:bg-secondary/10 hover:shadow-[0_0_12px_rgba(236,255,227,0.3)] transition-all duration-300 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> 去使用
                      </button>
                    ) : (
                      <button
                        onClick={() => startAnalysis(tool)}
                        className="px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/40 text-primary text-xs font-mono hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(255,171,243,0.3)] transition-all duration-300 flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> 购买
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent" />
          <span className="text-xs font-mono text-on-surface-variant/40 tracking-widest">DIGITAL ASSETS</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent" />
        </div>

        {/* ── Hot Assets Grid ── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-on-surface flex items-center gap-2">
              <span className="w-1.5 h-6 bg-tertiary rounded-full shadow-[0_0_8px_rgba(191,208,67,0.4)]" />
              热门资产
            </h2>
            <Link href="/seller" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
              查看全部 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_LIST.slice(0, 6).map((asset) => {
              const rarityColor: Record<string,string> = {
                COMMON: "#9CA3AF", RARE: "#60A5FA", EPIC: "#A78BFA", LEGENDARY: "#F59E0B",
              };
              const rarityLabel: Record<string,string> = {
                COMMON: "普通", RARE: "稀有", EPIC: "史诗", LEGENDARY: "传说",
              };
              return (
                <div
                  key={asset.id}
                  className="group relative bg-surface-container/40 border border-outline-variant/50 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-[0_0_24px_rgba(255,171,243,0.06)] transition-all duration-300"
                >
                  {/* Cover Image */}
                  <Link href={`/product/${asset.id}`}>
                    <div className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={asset.image}
                        alt={asset.nameZh}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      {/* Rarity badge */}
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[10px] font-semibold rounded border backdrop-blur-md"
                        style={{ color: rarityColor[asset.rarity], borderColor: `${rarityColor[asset.rarity]}40`, backgroundColor: `${rarityColor[asset.rarity]}15` }}
                      >
                        {rarityLabel[asset.rarity]} · {asset.rarity}
                      </div>
                      {/* Rating */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                        <Star className="w-3 h-3 text-tertiary fill-tertiary" />
                        <span className="text-[10px] font-mono text-on-surface">{asset.rating}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link href={`/product/${asset.id}`}>
                      <h3 className="font-display font-bold text-sm text-on-surface mb-1 hover:text-primary transition-colors cursor-pointer">
                        {asset.nameZh}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        by {(asset as any).authorLabel ?? asset.author}
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        {asset.sales} 已售
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        {asset.originalPrice > asset.price && (
                          <span className="text-xs text-on-surface-variant/40 line-through font-mono">{asset.originalPrice}</span>
                        )}
                        <span className="font-display font-bold text-primary">{asset.price}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">金币</span>
                      </div>
                      <button
                        onClick={() => {
                          const tool = { ...asset, icon: "star", color: rarityColor[asset.rarity], description: asset.description, features: asset.features, isHot: false, isNew: false, originalPrice: asset.originalPrice } as unknown as MarketTool;
                          addToCart(tool);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(255,171,243,0.3)] transition-all duration-300 flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" /> 加入
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FAB - Cart Quick Access */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className="fixed bottom-8 right-6 md:right-8 w-14 h-14 rounded-full bg-primary/15 border border-primary/40 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/25 hover:shadow-[0_0_24px_rgba(255,171,243,0.3)] transition-all duration-300 z-40"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      )}


      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-background/80 backdrop-blur-xl border border-primary/50 shadow-[inset_0_0_12px_rgba(255,171,243,0.1),0_0_12px_rgba(255,171,243,0.3),0_0_30px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/30 bg-surface-container/50">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.6)]" />
                <h2 className="font-display font-bold text-xl text-on-surface tracking-wide uppercase">
                  神经购物车 <span className="text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.6)] ml-2">[{String(cart.length).padStart(2, '0')} 物品]</span>
                </h2>
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            {cart.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant font-mono text-sm">
                {'// CART EMPTY — 浏览市场添加工具'}
                <div className="mt-6">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="px-6 py-3 border border-outline-variant text-on-surface font-label-caps hover:border-primary hover:text-primary transition-colors"
                  >
                    继续浏览市场
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 overflow-y-auto max-h-[420px] space-y-3">
                  {cart.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-surface-container border border-outline-variant hover:border-primary/40 transition-colors"
                    >
                      {/* Icon */}
                      <div className="w-16 h-16 rounded bg-surface-container-high flex items-center justify-center border border-secondary/20 shrink-0">
                        <span
                          className="material-symbols-outlined text-3xl"
                          style={{ color: tool.color, textShadow: `0 0 8px ${tool.color}` }}
                        >
                          {tool.icon}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-on-surface truncate">{tool.name}</h3>
                        <p className="font-mono text-sm text-on-surface-variant mt-1">{tool.price} 金币</p>
                      </div>
                      {/* Quantity */}
                      <div className="flex items-center gap-1 bg-surface-container-highest rounded border border-outline-variant p-1">
                        <button
                          onClick={() => removeFromCart(tool.id)}
                          className="text-on-surface-variant hover:text-secondary w-6 h-6 flex items-center justify-center rounded hover:bg-surface-container transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-sm w-4 text-center">1</span>
                        <button className="text-on-surface-variant hover:text-secondary w-6 h-6 flex items-center justify-center rounded hover:bg-surface-container transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(tool.id)}
                        className="text-on-surface-variant hover:text-error ml-1 p-2 rounded hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary & Footer */}
                <div className="border-t border-primary/30 bg-surface-container p-6">
                  <div className="space-y-3 mb-6 font-mono text-sm">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>小计</span>
                      <span>{cart.reduce((s, t) => s + t.price, 0)} 金币</span>
                    </div>
                    <div className="flex justify-between text-secondary drop-shadow-[0_0_6px_rgba(236,255,227,0.4)]">
                      <span>处理费 (黑客促销已应用)</span>
                      <span>0 金币</span>
                    </div>
                    <div className="h-px w-full bg-outline-variant my-2" />
                    <div className="flex justify-between items-center text-on-surface">
                      <span className="font-display font-bold text-base">购买后账户余额</span>
                      <div className="text-right">
                        <span className="font-display font-bold text-lg text-tertiary">
                          {Math.max(0, coins - cart.reduce((s, t) => s + t.price, 0))} 金币
                        </span>
                        <span className="block text-xs text-on-surface-variant">(剩余自 {coins} 金币)</span>
                      </div>
                    </div>
                  </div>

                  {cart.reduce((s, t) => s + t.price, 0) > coins ? (
                    <div className="w-full py-4 text-center text-error font-mono text-sm border border-error/30 bg-error/5">
                      {'// 余额不足 — 请先充值'}
                    </div>
                  ) : (
                    <button
                      onClick={checkout}
                      className="w-full relative overflow-hidden bg-surface-container border border-primary text-primary font-display font-bold uppercase tracking-wider py-4 rounded-lg hover:shadow-[0_0_16px_rgba(255,171,243,0.4)] transition-all duration-300 group"
                    >
                      <div className="absolute inset-0 opacity-50" style={{
                        background: 'linear-gradient(to bottom, rgba(255,171,243,0) 0%, rgba(255,171,243,0.08) 50%, rgba(255,171,243,0) 100%)',
                        backgroundSize: '100% 4px',
                      }} />
                      <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,171,243,0.6)] flex items-center justify-center gap-2">
                        <Terminal className="w-5 h-5" />
                        初始化神经结账
                      </span>
                    </button>
                  )}

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="font-mono text-sm text-on-surface-variant hover:text-secondary transition-colors underline decoration-outline-variant hover:decoration-secondary underline-offset-4"
                    >
                      继续浏览市场
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <HUDBrackets>
            <GlassCard className="border-t border-l border-primary/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined" style={{ color: activeTool.color, filter: `drop-shadow(0 0 8px ${activeTool.color}80)` }}>
                  {activeTool.icon}
                </span>
                {activeTool.name}
              </h2>
              <button
                onClick={closeTool}
                className="text-on-surface-variant hover:text-primary font-mono text-sm transition-colors"
              >
                {'// CLOSE'}
              </button>
            </div>

            {showQuiz && activeTool?.id === 'style-analyzer' && !quizResult && (
              <StyleQuiz
                onComplete={(quadrant) => {
                  setQuizResult(quadrant);
                  setShowQuiz(false);
                  setShowResult(true);
                }}
                onClose={closeTool}
              />
            )}

            {!showQuiz && !uploadedImage && !showResult && (
              <div className="text-center py-12">
                <label className="cursor-pointer">
                  <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-secondary/40 hover:border-secondary flex items-center justify-center transition-colors cyber-glass">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-4xl text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.5)]">photo_camera</span>
                      <div className="text-xs text-on-surface-variant font-mono mt-1">UPLOAD</div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-on-surface-variant text-sm font-mono">
                  {'// UPLOAD PHOTO FOR AI ANALYSIS'}
                </p>
              </div>
            )}

            {uploadedImage && analyzing && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-secondary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-secondary rounded-full border-t-transparent animate-spin" />
                </div>
                <div className="text-lg font-bold text-on-surface mb-2 font-mono">{'SCANNING...'}</div>
                <div className="text-on-surface-variant text-sm font-mono">{'// EST. 2-3 SECONDS'}</div>
              </div>
            )}

            {showResult && (
              <div>
                {uploadedImage && (
                  <div className="mb-6 flex gap-4">
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={uploadedImage} alt="上传的照片" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-on-surface-variant font-mono mb-1">{'// ANALYSIS COMPLETE'}</div>
                      <div className="font-bold text-on-surface">{activeTool.name}</div>
                      <div className="text-sm text-secondary font-mono">REPORT GENERATED</div>
                    </div>
                  </div>
                )}
                {renderResult()}
              </div>
            )}

            {uploadedImage && !showResult && !analyzing && (
              <div className="text-center">
                <button
                  onClick={() => startAnalysis(activeTool)}
                  className="px-8 py-3 bg-secondary text-background font-bold font-mono tracking-wider hover:shadow-[0_0_20px_rgba(236,255,227,0.6)] transition-all duration-300"
                >
                  LAUNCH SCAN
                </button>
              </div>
            )}
          </GlassCard>
          </HUDBrackets>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
