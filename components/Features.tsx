const FEATURES = [
  {
    title: 'AI风格分析',
    desc: '上传照片，AI精准识别您的穿搭风格，推荐最适合您的搭配方案。',
    tag: '智能分析',
    color: '#ecffe3',
  },
  {
    title: '肤色检测',
    desc: '基于计算机视觉分析肤色类型，推荐最适合您的颜色搭配和发色建议。',
    tag: '精准检测',
    color: '#bfd043',
  },
  {
    title: '发型推荐',
    desc: '根据脸型特征智能匹配最适合的发型，告别选择困难症。',
    tag: '个性推荐',
    color: '#ffabf3',
  },
  {
    title: '按次付费',
    desc: '无需订阅，按需购买，随时体验最新的AI穿搭工具，零门槛上手。',
    tag: '灵活付费',
    color: '#ffabf3',
  },
];

export default function Features() {
  return (
    <section id="features" className="features-section bg-background py-24 md:py-32">
      <div className="container px-4">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-mono text-primary uppercase tracking-widest">功能特性</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface leading-tight font-display">
            你的AI穿搭助手<br />随时待命。
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-surface-variant leading-relaxed">
            从风格分析到肤色检测，从发型推荐到单品搭配，一个平台全部搞定。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="feature-card rounded-xl border border-outline-variant bg-surface-container p-6 md:p-8 transition-all hover:border-primary/30 hover:bg-surface-container-high"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: f.color,
                    boxShadow: `0 0 12px ${f.color}`,
                  }}
                />
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">{f.tag}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-on-surface leading-snug">{f.title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
