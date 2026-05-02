"use client";
import { MARKET_TOOLS } from "@/lib/marketplace-data";
import { Sparkles, Zap } from "lucide-react";
import NextLink from "next/link";

const TOOL_INTRO = {
  fortune: {
    icon: "auto_awesome",
    label: "玄学解读",
    color: "#ffabf3",
    intro: "古籍智慧 × AI分析 · 十余项命理指标深度解读",
    cta: "开始解读",
    href: "/marketplace",
  },
  style: {
    icon: "checkroom",
    label: "风格测试",
    color: "#ecffe3",
    intro: "15道题找到您的专属风格象限",
    cta: "开始测试",
    href: "/marketplace",
  },
  lipstick: {
    icon: "palette",
    label: "口红推荐",
    color: "#fbbf24",
    intro: "AI肤色调分析 · 顶级品牌精准色号匹配",
    cta: "寻找色号",
    href: "/marketplace",
  },
  "image-diagnosis": {
    icon: "face",
    label: "形象诊断",
    color: "#bfd043",
    intro: "四季类型 × 穿搭 × 妆容 × 发型全方案",
    cta: "获取诊断",
    href: "/marketplace",
  },
};

const STATS = [
  { value: "50,000+", label: "用户已分析" },
  { value: "4大工具", label: "AI分析全家桶" },
  { value: "98%", label: "用户满意度" },
  { value: "< 3分钟", label: "完成一次分析" },
];

export default function AIToolsPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      {/* Scanline Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary blur-[200px] opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary blur-[150px] opacity-10 pointer-events-none z-0" />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-md border-b border-primary/30">
        <NextLink
          href="/"
          className="font-display text-xl font-black italic text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.8)] tracking-tighter uppercase"
        >
          NEON_MARKET
        </NextLink>
        <NextLink
          href="/marketplace"
          className="font-mono-data text-xs text-primary hover:text-primary/70 transition-colors border border-primary/30 px-3 py-1 hover:bg-primary/10"
        >
          {'// 进入市集'}
        </NextLink>
      </nav>

      <div className="relative z-10 pt-28 pb-24 px-6 max-w-6xl mx-auto">
        {/* Hero */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs mb-6">
            <Zap className="w-3 h-3" />
            AI_POWERED · READY TO USE
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-on-surface mb-6 leading-tight">
            AI <span className="text-primary drop-shadow-[0_0_20px_rgba(255,171,243,0.6)]">百宝箱</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-4 leading-relaxed">
            赛博朋克美学 × AI智能分析 · 穿搭 · 美妆 · 命理四大工具矩阵
            <br />
            上传一张照片，即可获得专业级的个性化分析报告
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <NextLink
              href="/marketplace"
              className="px-8 py-3 bg-primary/20 border border-primary text-primary font-mono text-sm hover:bg-primary/30 hover:shadow-[0_0_20px_rgba(255,171,243,0.5)] transition-all"
            >
              立即体验 →
            </NextLink>
            <a
              href="#tools"
              className="px-8 py-3 border border-white/20 text-on-surface-variant font-mono text-sm hover:bg-white/5 transition-all"
            >
              了解更多
            </a>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-surface-container/50 backdrop-blur-md border border-white/10 p-6 text-center hover:border-primary/30 transition-colors"
            >
              <div className="font-h2 text-h2 text-primary mb-1">{s.value}</div>
              <div className="font-mono-data text-mono-data text-on-surface-variant text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <section id="tools" className="mb-20">
          <h2 className="text-2xl font-display font-bold text-on-surface mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(236,255,227,0.8)]" />
            工具矩阵
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MARKET_TOOLS.map((tool) => {
              const intro = TOOL_INTRO[tool.category as keyof typeof TOOL_INTRO];
              return (
                <div
                  key={tool.id}
                  className="bg-surface-container/50 backdrop-blur-md border border-white/20 p-6 hover:border-primary/40 transition-all group relative overflow-hidden"
                >
                  {/* Gradient corner */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${tool.color}40, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 flex items-center justify-center"
                      style={{ color: tool.color }}
                    >
                      <span
                        className="material-symbols-outlined text-[36px]"
                        style={{ filter: `drop-shadow(0 0 8px ${tool.color}80)` }}
                      >
                        {tool.icon}
                      </span>
                    </div>
                    <div>
                      <div className="font-h3 text-h3 text-on-surface mb-1">{tool.name}</div>
                      <div className="font-mono-data text-mono-data text-on-surface-variant text-xs">
                        {intro.intro}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tool.features.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-mono border"
                        style={{
                          borderColor: `${tool.color}40`,
                          color: tool.color,
                          backgroundColor: `${tool.color}10`,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono text-on-surface-variant border border-white/10">
                        +{tool.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-h3 text-h3 text-primary">{tool.price} CR</span>
                      <span className="font-mono-data text-mono-data text-on-surface-variant line-through text-xs">
                        {tool.originalPrice} CR
                      </span>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono">
                        HOT
                      </span>
                    </div>
                    <NextLink
                      href="/marketplace"
                      className="font-mono text-xs px-4 py-2 border border-primary/50 text-primary hover:bg-primary/20 transition-all hover:shadow-[0_0_15px_rgba(255,171,243,0.4)]"
                    >
                      {intro.cta} →
                    </NextLink>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-on-surface mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-tertiary rounded-full shadow-[0_0_8px_rgba(191,208,67,0.8)]" />
            使用流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "选择工具",
                desc: "从四大AI工具中选择您需要的分析类型，进入市集页开始",
                color: "#ffabf3",
              },
              {
                step: "02",
                title: "上传内容",
                desc: "根据工具要求上传手部照片、正面照或完成风格测试问卷",
                color: "#ecffe3",
              },
              {
                step: "03",
                title: "获取报告",
                desc: "AI即时分析，生成专业级报告，可保存、分享或直接用于购物决策",
                color: "#ffe04a",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-surface-container/50 backdrop-blur-md border border-white/10 p-6 relative overflow-hidden hover:border-white/20 transition-colors"
              >
                <div
                  className="font-h1 text-h1 absolute top-2 right-4 opacity-10"
                  style={{ color: item.color }}
                >
                  {item.step}
                </div>
                <div
                  className="font-mono text-xs mb-3"
                  style={{ color: item.color }}
                >
                  STEP_{item.step}
                </div>
                <h3 className="font-h3 text-h3 text-on-surface mb-2">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-surface-container/50 backdrop-blur-md border border-primary/30 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,171,243,0.1)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" style={{ filter: "drop-shadow(0 0 8px rgba(255,171,243,0.8))" }} />
            <h2 className="font-h2 text-h2 text-on-surface mb-3">准备好探索您的风格了吗？</h2>
            <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
              4大AI工具，数十种分析维度，只需一张照片，开启您的专属赛博美学之旅
            </p>
            <NextLink
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-background font-mono text-sm hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,171,243,0.6)] transition-all"
            >
              <Zap className="w-4 h-4" />
              进入市集开始体验
            </NextLink>
          </div>
        </section>
      </div>
    </main>
  );
}
