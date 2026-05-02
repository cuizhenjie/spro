export default function CtaSection() {
  return (
    <section id="cta" className="cta-section bg-surface-container-lowest py-24 md:py-32 px-4">
      <div className="cta-content max-w-3xl mx-auto text-center">
        <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Ready to Ship</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-on-surface mb-6 leading-tight font-display">
          StyleBoxAI<br />AI时尚百宝箱
        </h2>
        <p className="text-lg text-on-surface-variant mb-10 max-w-lg mx-auto leading-relaxed">
          买AI穿搭工具 / 卖创意技能，按次付费，2分钟体验完整链路。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-all hover:shadow-[0_0_30px_rgba(255,45,120,0.4)] text-sm"
          >
            开始构建 →
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/60 text-on-surface font-medium rounded-lg hover:border-primary/50 hover:bg-primary/10 transition-all text-sm"
          >
            查看案例 →
          </a>
        </div>
      </div>
    </section>
  );
}
