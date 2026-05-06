'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, RotateCcw, Shirt, Palette, Eye } from 'lucide-react';
import { QUIZ_STYLE_QUADRANTS, type StyleQuadrantResult } from '@/data/quiz-data';

export default function QuizResultPage() {
  const [result, setResult] = useState<StyleQuadrantResult | null>(null);
  const [scores, setScores] = useState<{ lineScore: number; curveScore: number; volumeScore: number } | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('quiz_result');
      const scoreStored = sessionStorage.getItem('quiz_scores');
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        setNotFound(true);
      }
      if (scoreStored) {
        setScores(JSON.parse(scoreStored));
      }
    } catch {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">未找到测试结果，请先完成测试</p>
          <Link href="/quiz" className="cyber-button px-6 py-3 rounded-lg inline-block">
            去测试
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 计算风格雷达：直线感/曲线感/量感占比
  const total = (scores?.lineScore ?? 0) + (scores?.curveScore ?? 0) + (scores?.volumeScore ?? 0) || 1;
  const linePct = Math.round(((scores?.lineScore ?? 0) / total) * 100);
  const curvePct = Math.round(((scores?.curveScore ?? 0) / total) * 100);
  const volumePct = Math.round(((scores?.volumeScore ?? 0) / total) * 100);

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24 md:pb-10">
      {/* ── Header ── */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center text-sm text-on-surface-variant hover:text-secondary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Link>
        <span className="font-mono text-xs text-secondary uppercase tracking-widest">个人风格报告</span>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 p-6 md:p-10">

        {/* ── Result Hero ── */}
        <div className="text-center py-8 border border-secondary/20 rounded-xl bg-secondary/5">
          <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-3">您的风格象限</div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="px-3 py-1 border border-secondary/40 bg-secondary/10 text-secondary rounded-full text-xs font-mono">
              {result.line}
            </span>
            <span className="text-outline">×</span>
            <span className="px-3 py-1 border border-orange-500/40 bg-orange-500/10 text-orange-400 rounded-full text-xs font-mono">
              {result.volume}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-secondary drop-shadow-[0_0_15px_rgba(19,255,67,0.4)] mb-2">
            {result.name}
          </h1>
          <p className="text-on-surface-variant text-sm mb-4">{result.nameEn}</p>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto">{result.description}</p>
        </div>

        {/* ── Score Bar ── */}
        {scores && (
          <div className="cyber-glass border border-white/10 rounded-xl p-6">
            <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-4">◆ 风格特征分布</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary font-mono w-16 shrink-0">直线感</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all duration-700" style={{ width: `${linePct}%` }} />
                </div>
                <span className="text-xs font-mono text-secondary w-10 text-right">{linePct}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-primary font-mono w-16 shrink-0">曲线感</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${curvePct}%` }} />
                </div>
                <span className="text-xs font-mono text-primary w-10 text-right">{curvePct}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-orange-400 font-mono w-16 shrink-0">量感</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full transition-all duration-700" style={{ width: `${volumePct}%` }} />
                </div>
                <span className="text-xs font-mono text-orange-400 w-10 text-right">{volumePct}%</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Style Keywords ── */}
        <div className="cyber-glass border border-white/10 rounded-xl p-6">
          <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">◆ 风格关键词</div>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((kw) => (
              <span key={kw} className="px-3 py-1 border border-secondary/30 bg-secondary/5 text-secondary rounded-full text-xs">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* ── Celebrity Reference ── */}
        <div className="cyber-glass border border-white/10 rounded-xl p-6">
          <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">◆ 代表明星</div>
          <div className="flex flex-wrap gap-2">
            {result.celebrities.map((c) => (
              <span key={c} className="px-3 py-1 bg-white/5 text-on-surface-variant rounded-full text-xs border border-white/10">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Suitable Styles ── */}
        <div className="cyber-glass border border-green-500/20 rounded-xl p-6">
          <div className="font-mono text-[11px] text-green-400 uppercase tracking-widest mb-3">✓ 适合风格</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {result.suitableStyles.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-green-500/10 text-green-300 rounded-xl text-xs border border-green-500/20">
                {s}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] text-blue-400 uppercase tracking-widest mb-3">✓ 适合颜色</div>
          <div className="flex flex-wrap gap-2">
            {result.suitableColors.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-xl text-xs border border-blue-500/20">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Core Items ── */}
        <div className="cyber-glass border border-white/10 rounded-xl p-6">
          <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">◆ 核心单品</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {result.coreItems.map((item) => (
              <div key={item} className="border border-white/10 p-3 rounded-lg text-center">
                <Shirt className="w-5 h-5 text-secondary mx-auto mb-1" />
                <div className="text-xs text-on-surface-variant">{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Avoid ── */}
        <div className="cyber-glass border border-red-500/20 rounded-xl p-6">
          <div className="font-mono text-[11px] text-red-400 uppercase tracking-widest mb-3">✗ 避雷风格</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {result.avoidStyles.map((s) => (
              <span key={s} className="px-3 py-1 bg-red-500/10 text-red-300 rounded-full text-xs border border-red-500/20">
                {s}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] text-red-400 uppercase tracking-widest mb-3">✗ 避雷颜色</div>
          <div className="flex flex-wrap gap-2">
            {result.avoidColors.map((c) => (
              <span key={c} className="px-3 py-1 bg-red-500/5 text-red-300/70 rounded-full text-xs border border-red-500/15">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ── Scenes ── */}
        <div className="cyber-glass border border-white/10 rounded-xl p-6">
          <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">◆ 适用场景</div>
          <div className="flex flex-wrap gap-2">
            {result.suitableScenes.map((scene) => (
              <span key={scene} className="px-3 py-1 bg-white/5 text-on-surface-variant rounded-full text-xs border border-white/10">
                {scene}
              </span>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link href="/quiz" className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg text-sm hover:border-secondary/50 transition-colors">
            <RotateCcw className="w-4 h-4" />
            重新测试
          </Link>
          <Link href="/upload/personal-color" className="flex items-center gap-2 px-6 py-3 border border-secondary/30 bg-secondary/10 rounded-lg text-sm text-secondary hover:bg-secondary/20 transition-colors">
            <Palette className="w-4 h-4" />
            AI色彩诊断
          </Link>
          <Link href="/upload/seasonal-outfit" className="flex items-center gap-2 px-6 py-3 border border-secondary/30 bg-secondary/10 rounded-lg text-sm text-secondary hover:bg-secondary/20 transition-colors">
            <Shirt className="w-4 h-4" />
            四季穿搭指南
          </Link>
          <Link href="/upload/style-analyzer" className="flex items-center gap-2 px-6 py-3 border border-secondary rounded-lg text-sm text-secondary hover:bg-secondary/10 transition-colors">
            <Eye className="w-4 h-4" />
            衣品升级改造
          </Link>
        </div>

        {/* ── Other Quadrants ── */}
        <div className="pt-4">
          <div className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3">象限图谱</div>
          <div className="grid grid-cols-2 gap-3">
            {QUIZ_STYLE_QUADRANTS.filter((q) => q.id !== result.id).map((q) => (
              <div key={q.id} className="border border-white/10 rounded-xl p-4 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex gap-1 mb-2">
                  <span className="text-[10px] font-mono text-secondary">{q.line}</span>
                  <span className="text-[10px] font-mono text-outline">×</span>
                  <span className="text-[10px] font-mono text-orange-400">{q.volume}</span>
                </div>
                <div className="text-sm font-bold text-on-surface mb-1">{q.name}</div>
                <div className="text-xs text-on-surface-variant">{q.keywords.slice(0, 3).join('、')}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
