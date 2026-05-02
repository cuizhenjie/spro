'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MARKET_TOOLS, CATEGORIES, STYLE_QUADRANTS, MOCK_ANALYSIS_RESULTS } from '@/lib/marketplace-data';
import { PRODUCTS as PRODUCT_LIST } from '@/lib/products-data';
import { MarketTool, StyleQuadrant } from '@/types/marketplace';
import StyleQuiz from '@/components/StyleQuiz';
import { Sparkles, ShoppingCart, Coins, Check, Star, Palette } from 'lucide-react';
import { GlassCard } from '@/components/CyberUI/GlassCard';
import { HUDBrackets } from '@/components/CyberUI/HUDBrackets';

export default function MarketplacePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<MarketTool[]>([]);
  const [coins, setCoins] = useState(200);
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
      // Save orders to localStorage
      try {
        const orders = JSON.parse(localStorage.getItem("spro_orders") || "[]");
        cart.forEach((tool) => {
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
      } catch {}
      setCoins(coins - total);
      setOwnedTools([...ownedTools, ...cart.map(t => t.id)]);
      setCart([]);
      setShowCheckout(false);
    }
  };

  const startAnalysis = (tool: MarketTool) => {
    setActiveTool(tool);
    setShowResult(false);
    setQuizResult(null);

    if (tool.id === 'style-analyzer') {
      setShowQuiz(true);
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2000);
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
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
        backgroundSize: '100% 4px'
      }} />

      {/* Background Glow Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary blur-[150px] opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary blur-[150px] opacity-10 pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 pt-8 pb-24 md:pb-10 px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <header className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 py-2 relative">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-on-surface glitch-hover transition-all duration-300">
            NEURAL MARKET
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            升级你的数字美学 · 社区训练AI模型与时尚分析工具
          </p>
          <div className="absolute top-0 right-0 text-primary/30 font-mono text-[10px] hidden md:block">
            SYS.STAT: OPTIMAL // LOC: SECTOR_4
          </div>
        </header>

        {/* Category Filter */}
        <section className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-all font-mono text-xs tracking-wider uppercase ${
                activeCategory === cat.id
                  ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)]'
                  : 'cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </section>

        {/* AI ANALYSIS GRID */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,255,227,0.8)] animate-pulse" />
            AI ANALYSIS GRID
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <HUDBrackets key={tool.id} data-scroll-animate>
                <GlassCard className="p-4 flex flex-col gap-4 hover:bg-white/10 transition-colors duration-300 relative group overflow-hidden">
                  {/* Gradient corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />

                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ color: tool.color }}
                  >
                    <span className="material-symbols-outlined text-[32px]" style={{ filter: `drop-shadow(0 0 8px ${tool.color}80)` }}>
                      {tool.icon}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {tool.isHot && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono border border-primary/30">
                        HOT
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-[10px] font-mono border border-secondary/30">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">{tool.name}</h3>
                  <p className="text-sm text-on-surface-variant">{tool.description}</p>
                </div>

                {ownedTools.includes(tool.id) ? (
                  <button
                    onClick={() => router.push('/scan?target=/ai-listing')}
                    className="mt-auto border border-secondary text-secondary font-mono text-xs py-2 px-4 hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(236,255,227,0.5)] transition-all duration-300 glitch-hover w-full flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    开启扫描 <span className="material-symbols-outlined text-sm">barcode_scanner</span>
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(tool)}
                    className="mt-auto border border-primary text-primary font-mono text-xs py-2 px-4 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,171,243,0.5)] transition-all duration-300 glitch-hover w-full flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    {tool.price} CR <span className="material-symbols-outlined text-sm">shopping_cart_checkout</span>
                  </button>
                )}
                </GlassCard>
              </HUDBrackets>
            ))}
          </div>
        </section>

        {/* Free Coins Banner */}
        <section data-scroll-animate>
          <HUDBrackets>
            <GlassCard className="border-t border-l border-tertiary/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
                  <span className="font-bold text-on-surface">BALANCE: {coins} CR</span>
                </div>
                <span className="text-sm text-primary font-mono hover:underline cursor-pointer">
                  {'// GET MORE COINS?'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant font-mono">
                <Star className="w-4 h-4 text-tertiary" />
                DAILY CHECK-IN → +20 CR
              </div>
            </GlassCard>
          </HUDBrackets>
        </section>

        {/* HOT ASSETS */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(255,171,243,0.8)] animate-pulse" />
            HOT ASSETS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_LIST.slice(0, 6).map((asset) => {
              const rarityColor: Record<string,string> = {
                COMMON: "#9CA3AF", RARE: "#60A5FA", EPIC: "#A78BFA", LEGENDARY: "#F59E0B",
              };
              return (
                <div key={asset.id} className="cyber-glass border-t border-l border-white/20 p-2 flex flex-col gap-2 relative group">
                  {/* Cover Image - links to product page */}
                  <Link href={`/product/${asset.id}`}>
                    <div
                      className="h-48 bg-surface-container-high relative overflow-hidden border border-white/10 cursor-pointer"
                      style={{ backgroundImage: `url('${asset.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
                      <div
                        className="absolute top-2 left-2 px-2 py-0.5 font-mono text-[10px] border backdrop-blur-sm"
                        style={{ color: rarityColor[asset.rarity], borderColor: `${rarityColor[asset.rarity]}60`, backgroundColor: `${rarityColor[asset.rarity]}20` }}
                      >
                        {asset.rarity}
                      </div>
                    </div>
                  </Link>
                  {/* Info */}
                  <div className="flex justify-between items-start mt-1">
                    <div>
                      <Link href={`/product/${asset.id}`}>
                        <h3 className="font-display text-base text-on-surface uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
                          {asset.name}
                        </h3>
                      </Link>
                      <p className="font-mono text-xs text-on-surface-variant mt-1">CREATED BY {asset.author}</p>
                    </div>
                    <span className="font-mono text-primary font-bold">{asset.price} CR</span>
                  </div>
                  {/* CTA */}
                  <button
                    onClick={() => {
                      const tool = { ...asset, icon: "star", color: rarityColor[asset.rarity], description: asset.description, features: asset.features, isHot: false, isNew: false, originalPrice: asset.originalPrice } as unknown as MarketTool;
                      addToCart(tool);
                    }}
                    className="mt-1 border border-primary text-primary font-mono text-xs py-2 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(255,171,243,0.5)] transition-all duration-300 w-full flex justify-center items-center gap-1 uppercase tracking-wider"
                  >
                    ADD TO CART <span className="material-symbols-outlined text-sm">shopping_cart_checkout</span>
                  </button>
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
          className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-primary/20 border border-primary cyber-glass flex items-center justify-center text-primary hover:bg-primary/40 hover:shadow-[0_0_20px_rgba(255,171,243,0.8)] transition-all duration-300 z-40 group"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-background text-xs flex items-center justify-center font-bold">
            {cart.length}
          </span>
        </button>
      )}


      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <HUDBrackets>
            <GlassCard className="border-t border-l border-primary/30 w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-on-surface">
              <ShoppingCart className="w-5 h-5 text-primary" />
              CART // 购物车
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant font-mono text-sm">
                {'// CART EMPTY — BROWSE TOOLS FIRST'}
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between cyber-glass border-t border-l border-white/10 p-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl" style={{ color: tool.color, filter: `drop-shadow(0 0 6px ${tool.color}80)` }}>
                          {tool.icon}
                        </span>
                        <div>
                          <div className="font-bold text-on-surface text-sm">{tool.name}</div>
                          <div className="text-xs text-on-surface-variant font-mono">{tool.price} CR</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(tool.id)}
                        className="text-on-surface-variant hover:text-primary transition-colors font-mono text-xs"
                      >
                        DEL
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-primary/20">
                  <div className="flex justify-between mb-4">
                    <span className="text-on-surface-variant font-mono text-sm">TOTAL</span>
                    <span className="text-xl font-bold text-tertiary font-mono">
                      {cart.reduce((s, t) => s + t.price, 0)} CR
                    </span>
                  </div>
                  <div className="flex justify-between mb-4 text-sm text-on-surface-variant font-mono">
                    <span>BALANCE</span>
                    <span>{coins} CR</span>
                  </div>

                  {cart.reduce((s, t) => s + t.price, 0) > coins ? (
                    <div className="text-center text-primary text-sm font-mono mb-4">
                      {'// INSUFFICIENT FUNDS — EARN MORE CR'}
                    </div>
                  ) : (
                    <button
                      onClick={checkout}
                      className="w-full py-3 bg-secondary text-background font-bold font-mono tracking-wider hover:shadow-[0_0_20px_rgba(236,255,227,0.6)] transition-all duration-300"
                    >
                      CONFIRM PURCHASE
                    </button>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => setShowCheckout(false)}
              className="mt-4 w-full py-2 text-on-surface-variant hover:text-on-surface font-mono text-sm transition-colors"
            >
              {'// CLOSE'}
            </button>
            </GlassCard>
          </HUDBrackets>
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
