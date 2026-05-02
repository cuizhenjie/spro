export default function Footer() {
  return (
    <footer className="cyber-glass-card bg-surface-container/70 backdrop-blur-xl border-t-2 border-l-2 border-r-0 border-b-0 border-primary-container/30 shadow-[0_0_30px_rgba(255,0,255,0.15)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <span className="font-bold text-xl text-on-surface block mb-2">赛博穿搭</span>
            <span className="text-sm text-on-surface-variant block mb-6">AI时尚百宝箱</span>
            <span className="text-xs font-mono text-on-surface-variant/60">© 2026</span>
          </div>

          <div>
            <h3 className="text-on-surface font-medium mb-4">链接</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: '功能特性', href: '#features' },
                { label: '画廊', href: '#gallery' },
                { label: '关于', href: '#about' },
                { label: '联系我们', href: '#cta' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-on-surface-variant hover:text-secondary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-on-surface font-medium mb-4">关注我们</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: '开源地址', href: 'https://github.com/cuizhenjie/cyberdress' },
                { label: 'Twitter', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-on-surface-variant hover:text-secondary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-on-surface font-medium mb-4">保持更新</h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-on-surface-variant">订阅我们的新闻简报。</span>
              <ul className="flex flex-col gap-3 mt-2">
                {[
                  { label: '隐私政策', href: '#' },
                  { label: '服务条款', href: '#' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-on-surface-variant hover:text-secondary transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-outline-variant/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-on-surface-variant/70">Built with Next.js, Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
