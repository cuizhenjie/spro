'use client';

export default function Marquee() {
  const items = ['Next.js 15', 'Tailwind CSS', 'GSAP', 'TypeScript', 'React', 'Vercel', 'Cloudflare', 'Figma', 'Claude Code', 'Copilot', 'OpenCode', 'gemini CLI'];
  return (
    <section className="bg-surface-container/70 border-y border-outline-variant/40 py-5 overflow-hidden backdrop-blur-xl">
      <div className="flex items-center gap-12 whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-mono text-on-surface-variant/70 shrink-0">{item}</span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
