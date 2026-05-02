const ITEMS = [
  {
    label: '设计',
    title: '视觉优先架构',
    tag: '界面系统',
    icon: '◇',
    accent: 'text-secondary-container drop-shadow-[0_0_30px_rgba(19,255,67,0.75)]',
    rule: 'from-secondary-container',
  },
  {
    label: '开发',
    title: '多智能体流程',
    tag: 'AI 技术栈',
    icon: '⚡',
    accent: 'text-primary drop-shadow-[0_0_30px_rgba(255,171,243,0.75)]',
    rule: 'from-primary',
  },
  {
    label: '原型',
    title: 'GSAP 动效引擎',
    tag: '动效系统',
    icon: '◈',
    accent: 'text-tertiary drop-shadow-[0_0_30px_rgba(191,208,67,0.75)]',
    rule: 'from-tertiary',
  },
  {
    label: '上线',
    title: '生产级交付',
    tag: '基础设施',
    icon: '▲',
    accent: 'text-primary-container drop-shadow-[0_0_30px_rgba(255,0,255,0.7)]',
    rule: 'from-primary-container',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="showcase-section bg-surface-container-low py-24 md:py-32 overflow-hidden">
      <div className="container px-4 mb-12">
        <p className="mb-4 text-xs font-mono text-primary uppercase tracking-widest">作品展示</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface leading-tight font-display">
          一个项目。<br />四个智能体。
        </h2>
      </div>

      <div className="flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:overflow-visible md:px-0">
        <div className="md:container md:mx-auto md:flex md:gap-5 md:snap-none">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="panel showcase-item min-h-72 w-[82vw] max-w-80 shrink-0 snap-start rounded-2xl border border-outline-variant/40 bg-surface-container/60 p-6 backdrop-blur-xl md:min-h-80 md:w-auto md:grow"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-xs font-mono text-on-surface-variant">{item.label}</span>
                <span className="text-right text-xs font-mono text-tertiary">{item.tag}</span>
              </div>
              <div className={`mb-8 text-5xl ${item.accent}`}>
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-on-surface leading-snug">{item.title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                赛博衣橱AI百宝箱，买卖AI工具，按次付费，轻松上手。
              </p>
              <div className={`mt-8 h-px w-full bg-gradient-to-r ${item.rule} to-transparent`} />
            </div>
          ))}

          <div className="panel min-h-72 w-[82vw] max-w-80 shrink-0 snap-start flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-container/10 to-primary/10 border border-secondary-container/20 p-8 md:min-h-80 md:w-auto md:grow">
            <span className="mb-4 block text-xs font-mono text-on-surface-variant">赛博衣橱</span>
            <h3 className="mb-6 text-center text-2xl font-bold leading-tight text-on-surface font-display">
              展示案例，<br />探索下一步。
            </h3>
            <a
              href="#cta"
              className="rounded-lg bg-secondary-container px-6 py-2.5 text-sm font-bold text-on-secondary transition-all hover:bg-secondary-fixed hover:shadow-[0_0_20px_rgba(19,255,67,0.35)]"
            >
              立即探索
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
