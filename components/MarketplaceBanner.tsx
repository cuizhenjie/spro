'use client';
import { Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const TOOL_CARDS = [
  { icon: '👔', label: '风格分析', tone: 'bg-secondary-container/20 text-secondary-container' },
  { icon: '🎨', label: '肤色检测', tone: 'bg-primary/20 text-primary' },
  { icon: '💇', label: '发型推荐', tone: 'bg-tertiary/20 text-tertiary' },
  { icon: '👗', label: '穿搭搭配', tone: 'bg-primary-container/20 text-primary' },
];

export default function MarketplaceBanner() {
  return (
    <section className="marketplace-section py-24 px-4 relative overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary-container/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/10 border border-secondary-container/30 rounded-full text-sm text-secondary-container mb-4">
                <Sparkles className="w-4 h-4" />
                全新上线
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                <span className="bg-gradient-to-r from-secondary-container to-primary bg-clip-text text-transparent">
                  穿搭AI百宝箱
                </span>
              </h2>
              <p className="text-on-surface-variant mb-6 max-w-lg">
                基于先进AI技术，为您提供专属的穿搭风格分析、肤色检测、发型推荐等服务。
                买AI工具，卖创意灵感，让时尚变得更简单。
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-container to-primary text-on-secondary font-bold rounded-lg hover:opacity-90 transition-all hover:shadow-[0_0_30px_rgba(19,255,67,0.3)]"
              >
                <Sparkles className="w-5 h-5" />
                立即体验
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-4">
              {TOOL_CARDS.map((item) => (
                <div
                  key={item.label}
                  className="marketplace-card flex flex-col items-center gap-2 p-4 glass-card"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.tone}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs text-on-surface-variant">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
