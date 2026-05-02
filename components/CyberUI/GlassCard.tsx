'use client';
interface GlassCardProps { children: React.ReactNode; className?: string; glow?: string; }
export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`cyber-glass border border-primary/30 rounded ${className}`}>
      {children}
    </div>
  );
}
