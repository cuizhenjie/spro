const STATS = [
  { value: 12, suffix: '+', label: 'AI穿搭工具' },
  { value: 2, suffix: '分钟', label: '出分析结果' },
  { value: 100, suffix: '%', label: '隐私保护' },
  { value: 0, suffix: '门槛', label: '无需注册' },
];

export default function Stats() {
  return (
    <section id="about" className="section-pad bg-background">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-surface-container-high px-4 sm:px-8 md:px-12 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-4xl font-bold text-secondary mb-2 sm:mb-3">
                <span className="stat-number" data-target={s.value}>{s.value}</span>{s.suffix}
              </div>
              <span className="text-xs sm:text-sm font-mono text-on-surface-variant tracking-wider px-2">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
