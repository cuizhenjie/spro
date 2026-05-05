'use client';

import NextLink from 'next/link';
import ClientToolLink from '@/components/ClientToolLink';
import {
  ArrowRight,
  BarChart3,
  Eye,
  LayoutGrid,
  Palette,
  ScanLine,
  Shirt,
  Sparkles,
  Store,
  User,
  type LucideIcon,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';

const MOBILE_NAV: { label: string; icon: LucideIcon; href: string; active?: boolean }[] = [
  { label: '首页', icon: LayoutGrid, href: '/' },
  { label: '分析', icon: BarChart3, href: '/marketplace' },
  { label: '商店', icon: Store, href: '/marketplace', active: true },
  { label: '我的', icon: User, href: '/profile' },
];

const AI_TOOLS = [
  {
    title: '衣品升级改造',
    description: '上传照片，AI生成Before & After高反差衣品升级报告',
    icon: Eye,
    href: '/upload/neon-street-syndicate',
    toolId: 'neon-street-syndicate',
  },
  {
    title: '四季穿搭指南',
    description: '上传照片，AI生成春夏秋冬四套韩系潮牌穿搭方案',
    icon: Shirt,
    href: '/upload/seasonal-outfit',
    toolId: 'seasonal-outfit',
  },
  {
    title: 'AI色彩诊断',
    description: '智能分析肤色冷暖，精准推荐最适合的色彩方案',
    icon: Palette,
    href: '/upload/personal-color',
    toolId: 'personal-color',
  },
];

const TRENDS = [
  {
    label: '趋势_01',
    labelColor: 'text-primary',
    title: '霓虹街头辛迪加',
    productId: 'prod_neo_tokyo_trench',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
  },
  {
    label: '趋势_02',
    labelColor: 'text-secondary',
    title: '废土机能美学',
    productId: 'prod_wasteland_visor',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24 text-on-surface md:pb-0">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[length:100%_4px] opacity-30" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none fixed left-4 top-24 z-40 h-16 w-16 border-t-2 border-l-2 border-primary/30" />
      <div className="pointer-events-none fixed right-4 top-24 z-40 h-16 w-16 border-t-2 border-r-2 border-primary/30" />

      {/* ── Main content ── */}
      <main className="mx-auto max-w-container-max space-y-xl p-6 md:p-10">
        {/* ── Hero section ── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Large feature card */}
          <ClientToolLink href="/upload/seasonal-outfit" toolId="seasonal-outfit" className="lg:col-span-8 lg:h-[500px] block">
            <div className="cyber-glass group relative overflow-hidden rounded-xl border border-outline-variant h-full transition-colors hover:border-primary/50">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                <div className="mb-4 inline-flex w-max items-center space-x-2 rounded-sm border border-secondary bg-secondary/20 px-3 py-1 text-secondary backdrop-blur-sm">
                  <ScanLine className="h-4 w-4" />
                  <span className="font-mono-data text-mono-data uppercase">系统运行中</span>
                </div>
                <h1 className="font-h1 text-h1 mb-2 tracking-widest text-on-surface drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  AI 四季穿搭指南
                </h1>
                <p className="font-body-lg text-body-lg mb-6 max-w-xl text-on-surface-variant">
                  上传照片，AI生成春夏秋冬四套韩系潮牌穿搭方案，保留本人真实辨识度
                </p>
                <span className="flex w-max items-center space-x-2 border border-secondary px-8 py-4 font-label-caps text-label-caps text-secondary transition-all hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(236,255,227,0.5)]">
                  开启扫描 <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              {/* Animated scan line */}
              <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-secondary opacity-50 shadow-[0_0_10px_#13ff43]" />
            </div>
          </ClientToolLink>

          {/* Right side: two stacked cards */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card: 四季穿搭指南 */}
            <ClientToolLink href="/upload/seasonal-outfit" toolId="seasonal-outfit" className="flex-1 block">
              <div className="cyber-glass group relative flex min-h-[238px] flex-col justify-end overflow-hidden rounded-xl border border-outline-variant p-6 transition-colors hover:border-secondary/50 h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-h2 mb-2 text-2xl text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.5)]">
                    四季穿搭指南
                  </h3>
                  <p className="font-body-md mb-4 text-sm text-on-surface-variant">
                    上传照片，AI生成春夏秋冬四套韩系潮牌穿搭方案
                  </p>
                  <span className="flex items-center text-sm font-label-caps text-secondary transition-colors hover:text-on-surface">
                    开启扫描 <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </ClientToolLink>

            {/* Card: AI色彩诊断 */}
            <ClientToolLink href="/upload/personal-color" toolId="personal-color" className="flex-1 block">
              <div className="cyber-glass group relative flex min-h-[238px] flex-col justify-end overflow-hidden rounded-xl border border-outline-variant p-6 transition-colors hover:border-primary/50 h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-h2 mb-2 text-2xl text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.5)]">
                    AI色彩诊断
                  </h3>
                  <p className="font-body-md mb-4 text-sm text-on-surface-variant">
                    智能分析肤色冷暖，精准推荐最适合您的色彩搭配方案
                  </p>
                  <span className="flex items-center text-sm font-label-caps text-primary transition-colors hover:text-on-surface">
                    提取 <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </ClientToolLink>
          </div>
        </section>

        {/* ── AI 分析工具 // SCAN ── */}
        <section className="mt-12">
          <h2 className="font-h2 text-h2 mb-6 flex items-center text-primary">
            <span className="mr-4 h-8 w-2 bg-secondary shadow-[0_0_10px_#13ff43]" />
            AI 分析工具 // SCAN
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {AI_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <ClientToolLink key={tool.title} href={tool.href} toolId={tool.toolId} className="group">
                  <div className="cyber-glass flex h-full flex-col border border-outline-variant p-6 transition-all hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(236,255,227,0.1)]">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center border border-secondary/30 bg-secondary/10">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-h3 mb-2 text-lg text-on-surface">{tool.title}</h3>
                    <p className="font-body-md mb-6 flex-1 text-sm text-on-surface-variant">
                      {tool.description}
                    </p>
                    <span className="flex w-full items-center justify-center border border-secondary py-3 font-label-caps text-label-caps text-secondary transition-all group-hover:bg-secondary/10 group-hover:shadow-[0_0_15px_rgba(236,255,227,0.3)]">
                      开启扫描 <ScanLine className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </ClientToolLink>
              );
            })}
          </div>
        </section>

        {/* ── 热门商品 // HOT ASSETS ── */}
        <section className="mt-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-h2 text-h2 flex items-center text-primary">
              <span className="mr-4 h-8 w-2 bg-primary shadow-glow-pink" />
              热门商品 // HOT ASSETS
            </h2>
            <NextLink
              href="/marketplace"
              className="flex items-center font-label-caps text-label-caps text-primary transition-colors hover:text-on-surface"
            >
              查看全部 <ArrowRight className="ml-1 h-4 w-4" />
            </NextLink>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((product) => {
              const rarityColor: Record<string, string> = {
                COMMON: '#9CA3AF',
                RARE: '#60A5FA',
                EPIC: '#A78BFA',
                LEGENDARY: '#F59E0B',
              };
              return (
                <div
                  key={product.id}
                  className="cyber-glass group flex flex-col border border-outline-variant transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,171,243,0.1)]"
                >
                  <NextLink href={`/product/${product.id}`}>
                    <div className="relative h-48 overflow-hidden bg-surface-container">
                      <img
                        alt={product.nameZh}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                        src={product.image}
                      />
                      <div
                        className="absolute left-2 top-2 border px-2 py-1 font-mono-data text-[10px] font-bold backdrop-blur-sm"
                        style={{
                          color: rarityColor[product.rarity],
                          borderColor: `${rarityColor[product.rarity]}60`,
                          backgroundColor: `${rarityColor[product.rarity]}20`,
                        }}
                      >
                        {product.rarity}
                      </div>
                    </div>
                  </NextLink>
                  <div className="flex flex-1 flex-col p-4">
                    <NextLink href={`/product/${product.id}`}>
                      <h4 className="font-h3 mb-1 text-sm text-on-surface group-hover:text-primary transition-colors">
                        {product.nameZh}
                      </h4>
                    </NextLink>
                    <p className="font-mono-data mb-2 text-xs text-primary">
                      BY {product.authorLabel ?? product.author}
                    </p>
                    <p className="font-mono-data text-sm font-bold text-primary">
                      {product.price} 赛博币
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Style Trends ── */}
        <section className="mt-12">
          <h2 className="font-h2 text-h2 mb-6 flex items-center text-primary">
            <span className="mr-4 h-8 w-2 bg-tertiary shadow-[0_0_10px_#ffe04a]" />
            穿搭风格趋势 // FORECAST
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {TRENDS.map((trend) => (
              <NextLink
                key={trend.label}
                href={`/product/${trend.productId}`}
                className="block"
              >
                <div className="cyber-glass group relative h-64 overflow-hidden border border-outline-variant transition-colors hover:border-primary/50">
                  <img
                    alt={trend.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                    src={trend.image}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                    <div
                      className={`font-mono-data mb-2 text-xs tracking-widest ${trend.labelColor}`}
                    >
                      {trend.label}
                    </div>
                    <h3 className="font-h2 text-xl text-on-surface group-hover:text-primary transition-colors">
                      {trend.title}
                    </h3>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>
        </section>

        {/* System status footer */}
        <div className="mt-12 flex items-center justify-between border-t border-outline-variant py-8 font-mono-data text-xs text-outline-variant">
          <div>SYS_V.12.4.99</div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary shadow-[0_0_5px_#13ff43]" />
            <span>数据流已加密</span>
          </div>
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-primary/30 bg-background/90 shadow-[0_-5px_25px_rgba(255,171,243,0.15)] backdrop-blur-lg md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {MOBILE_NAV.map((item, i) => {
          const Icon = item.icon;
          return (
            <NextLink
              key={i}
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 font-display text-[10px] font-bold uppercase transition-transform active:scale-90 ${
                item.active
                  ? 'text-primary drop-shadow-[0_0_5px_rgba(255,171,243,0.6)]'
                  : 'text-outline-variant transition-colors hover:text-primary'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{item.label}</span>
            </NextLink>
          );
        })}
      </nav>
    </div>
  );
}
