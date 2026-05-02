'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coins, ArrowUp, ArrowDown, Clock, CheckCircle, ChevronRight, Filter, Download, Sparkles, TrendingUp, TrendingDown, Zap } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD_7F3A2B', tool: '风格预测引擎 Pro', type: 'buy', amount: 50, coins: 150, time: '2分钟前', status: 'completed' },
  { id: 'ORD_9C1D8E', tool: '色彩搭配AI网', type: 'sell', amount: 80, coins: 240, time: '15分钟前', status: 'completed' },
  { id: 'ORD_2E5F9A', tool: '衣橱扫描仪', type: 'buy', amount: 30, coins: 90, time: '1小时前', status: 'completed' },
  { id: 'ORD_4B8C3D', tool: '穿搭推荐 AI', type: 'buy', amount: 120, coins: 360, time: '3小时前', status: 'completed' },
  { id: 'ORD_6D2E1F', tool: '体型分析器', type: 'sell', amount: 60, coins: 180, time: '5小时前', status: 'completed' },
  { id: 'ORD_8A5B7C', tool: '场合穿搭顾问', type: 'buy', amount: 200, coins: 600, time: '1天前', status: 'completed' },
];

interface LiveOrder {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  author?: string;
  price: number;
  type: 'buy' | 'sell';
  amount: number;
  coins: number;
  time: string;
  status: 'completed' | 'pending';
  rarity?: string;
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<LiveOrder[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("spro_orders") || "[]");
      const live: LiveOrder[] = saved.map((o: LiveOrder) => ({
        ...o,
        amount: 1,
        coins: o.price,
        type: "buy",
      }));
      setOrders(live);
    } catch {
      setOrders([]);
    }
  }, []);

  const displayOrders = orders.length > 0 ? orders : MOCK_ORDERS.map((o) => ({
    id: o.id,
    productId: "",
    productName: o.tool,
    productImage: "",
    author: "",
    price: o.amount,
    type: o.type as "buy" | "sell",
    amount: o.amount,
    coins: o.coins,
    time: o.time,
    status: "completed" as const,
    rarity: "",
  }));

  const filtered = filter === 'all' ? displayOrders : displayOrders.filter(o => o.type === filter);
  const totalPages = Math.ceil(filtered.length / 5);
  const paginated = filtered.slice((page - 1) * 5, page * 5);

  const totalBuy = displayOrders.filter(o => o.type === 'buy').reduce((s, o) => s + o.coins, 0);
  const totalSell = displayOrders.filter(o => o.type === 'sell').reduce((s, o) => s + o.coins, 0);

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
      <div className="relative z-10 pt-8 pb-[120px] px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-10">

        {/* Hero Section */}
        <header className="flex flex-col items-start gap-4 border-l-4 border-primary pl-6 py-2 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-sm text-secondary font-mono mb-2">
            <Zap className="w-3 h-3" />
            SYS.LOG · TRANSPARENT LEDGER
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-on-surface glitch-hover transition-all duration-300">
            TRANSACTION LOG
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Full on-chain record of every AI tool purchase and sale. Your trading history, immutable.
          </p>
          <div className="absolute top-0 right-0 text-primary/30 font-mono text-[10px] hidden md:block">
            SYS.STAT: VERIFIED // BLOCKS: 4,892
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="cyber-glass border-t border-l border-white/20 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />
            <div className="absolute top-2 right-3 text-primary/20 font-mono text-[10px]">STAT_01</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase">TOTAL BUY</div>
                <div className="text-2xl font-bold text-secondary flex items-center gap-1 font-mono">
                  <Coins className="w-5 h-5" /> {totalBuy}
                </div>
              </div>
            </div>
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/20 to-transparent" />
            <div className="absolute top-2 right-3 text-primary/20 font-mono text-[10px]">STAT_02</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase">TOTAL SELL</div>
                <div className="text-2xl font-bold text-primary flex items-center gap-1 font-mono">
                  <Coins className="w-5 h-5" /> {totalSell}
                </div>
              </div>
            </div>
          </div>
          <div className="cyber-glass border-t border-l border-white/20 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-tertiary/20 to-transparent" />
            <div className="absolute top-2 right-3 text-primary/20 font-mono text-[10px]">STAT_03</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase">NET PROFIT</div>
                <div className="text-2xl font-bold text-tertiary flex items-center gap-1 font-mono">
                  <Coins className="w-5 h-5" /> {totalSell - totalBuy}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['all', 'buy', 'sell'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-all font-mono text-xs tracking-wider uppercase ${
                filter === f
                  ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)]'
                  : 'cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5'
              }`}
            >
              {f === 'all' && <span className="material-symbols-outlined text-base">list</span>}
              {f === 'buy' && <ArrowDown className="w-3 h-3" />}
              {f === 'sell' && <ArrowUp className="w-3 h-3" />}
              {f === 'all' ? 'ALL' : f === 'buy' ? 'BUY ↓' : 'SELL ↑'}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5 font-mono text-xs tracking-wider uppercase transition-all">
              <Filter className="w-3 h-3" /> FILTER
            </button>
            <button className="flex items-center gap-2 px-3 py-2 cyber-glass border border-white/10 text-on-surface-variant hover:bg-white/5 font-mono text-xs tracking-wider uppercase transition-all">
              <Download className="w-3 h-3" /> CSV
            </button>
          </div>
        </section>

        {/* Transaction Table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,255,227,0.8)] animate-pulse" />
            TRADE RECORDS
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block cyber-glass border-t border-l border-white/20 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">ORDER ID</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">ASSET</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">TYPE</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">QTY</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">VALUE</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">TIME</th>
                  <th className="text-left px-6 py-4 font-mono text-xs tracking-wider uppercase text-on-surface-variant">STATUS</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order, idx) => (
                  <tr key={order.id} className={`border-b border-white/5 hover:bg-primary/5 transition-colors ${idx % 2 === 1 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="px-6 py-4 font-mono text-sm text-primary">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                          {order.productImage ? (
                            <img src={order.productImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ShoppingBag className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-on-surface text-sm font-medium">{order.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 font-mono text-xs tracking-wider uppercase ${
                        order.type === 'buy'
                          ? 'bg-secondary/10 text-secondary border border-secondary/30'
                          : 'bg-primary/10 text-primary border border-primary/30'
                      }`}>
                        {order.type === 'buy' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                        {order.type === 'buy' ? 'BUY' : 'SELL'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-on-surface">{order.amount}</td>
                    <td className="px-6 py-4 font-mono text-sm text-primary flex items-center gap-1">
                      <Coins className="w-4 h-4" /> {order.coins}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-mono text-sm text-on-surface-variant">
                        <Clock className="w-3 h-3" /> {order.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-secondary tracking-wider uppercase">
                        <CheckCircle className="w-3 h-3" /> DONE
                      </span>
                    </td>
                    <td className="px-4">
                      <button className="text-primary/50 hover:text-primary transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {paginated.map((order) => (
              <div key={order.id} className="cyber-glass border-t border-l border-white/20 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-secondary/20 to-transparent" />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-primary mb-1">{order.id}</div>
                    <div className="text-on-surface text-sm font-medium">{order.productName}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] tracking-wider uppercase ${
                    order.type === 'buy'
                      ? 'bg-secondary/10 text-secondary border border-secondary/30'
                      : 'bg-primary/10 text-primary border border-primary/30'
                  }`}>
                    {order.type === 'buy' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                    {order.type === 'buy' ? 'BUY' : 'SELL'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                  <div className="flex items-center gap-3">
                    <span>{order.amount} units</span>
                    <span className="text-primary flex items-center gap-1"><Coins className="w-3 h-3" />{order.coins}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{order.time}</span>
                    <span className="text-secondary flex items-center gap-1"><CheckCircle className="w-3 h-3" />OK</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 cyber-glass border border-white/10 text-on-surface-variant hover:border-primary/30 disabled:opacity-30 font-mono text-sm transition-all"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 font-mono text-sm transition-all ${
                  page === p
                    ? 'bg-secondary text-background font-bold shadow-[0_0_10px_rgba(236,255,227,0.4)]'
                    : 'cyber-glass border border-white/10 text-on-surface-variant hover:border-primary/30'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 cyber-glass border border-white/10 text-on-surface-variant hover:border-primary/30 disabled:opacity-30 font-mono text-sm transition-all"
            >
              ›
            </button>
          </div>
        )}

        {/* Quick Actions Banner */}
        <section className="cyber-glass border-t border-l border-tertiary/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-tertiary drop-shadow-[0_0_6px_rgba(191,208,67,0.6)]" />
            <span className="font-bold text-on-surface font-mono">EARN MORE // SELL YOUR AI TOOLS</span>
          </div>
          <button className="px-6 py-2 bg-secondary text-background font-bold font-mono tracking-wider hover:shadow-[0_0_20px_rgba(236,255,227,0.6)] transition-all duration-300">
            BECOME A SELLER
          </button>
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
        <button className="flex flex-col items-center justify-center text-secondary drop-shadow-[0_0_10px_rgba(236,255,227,0.7)] scale-110 font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
          <span>LOG</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface/40 hover:text-primary transition-colors font-mono text-[10px] font-bold tracking-widest gap-1 w-16">
          <span className="material-symbols-outlined text-xl">person</span>
          <span>PROFILE</span>
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
