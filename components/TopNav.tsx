'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAuth, type AuthUser } from '@/lib/auth';
import { LogIn, Store, BadgeDollarSign, Sparkles, Coins } from 'lucide-react';

const NAV_ITEMS = [
  { label: '市场', href: '/marketplace', icon: Store },
  { label: '定价', href: '/pricing', icon: BadgeDollarSign },
  { label: '创作者', href: '/seller', icon: Sparkles },
];

export default function TopNav() {
  const pathname = usePathname();
  // SSR-safe: always start as not-logged-in, populate from localStorage in useEffect
  const [auth, setAuth] = useState<AuthUser>({ loggedIn: false, name: '', level: '', coins: 0, email: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAuth(getAuth());
    setMounted(true);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setAuth(getAuth());
    window.addEventListener('spro-coins-updated', handler);
    return () => window.removeEventListener('spro-coins-updated', handler);
  }, []);

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-primary-container/30 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-10 px-6 py-4">
        <Link href="/" className="font-display text-xl font-black italic text-primary drop-shadow-[0_0_8px_rgba(255,171,243,0.8)]">
          StyleBoxAI
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 font-display text-sm uppercase tracking-widest transition-colors ${
                  active
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4 px-6 py-4">
        {/* Wallet Balance — SSR-safe, only show after mount */}
        {mounted && auth.loggedIn && (
          <div className="hidden md:flex items-center gap-1.5 text-primary font-mono text-sm px-3 py-1.5 border border-primary/30 cyber-glass">
            <Coins className="w-4 h-4" />
            <span>{auth.coins} 赛博币</span>
          </div>
        )}

        {mounted && auth.loggedIn ? (
          <Link
            href="/profile"
            className="block overflow-hidden rounded-full border border-primary-container/50 shadow-cyber-glass transition-colors hover:border-primary hover:shadow-glow"
          >
            <img
              alt="User avatar"
              className="h-8 w-8 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU6zPSzHbjpE0VT-ChMF5ftbQAdBiOITIkDEl9qg2i23mJBmIUfKJLbyxVSNnq8IW-b8UId7bjjwCoc9Im5GKxXXjn5vsF-IbUqLPc8yWwvCSLnIijtOCLb2pth4-PXxBWQ8vN_dv_zVeejqW-_S9gftK7ULvqq2R5o_WcnQBW5vmFBH26EqecwnAZgA1F5e2eUm54z6ySFgmlWgM5kgHC95YnuCyGTMBHuP8uNYDIFYDXUYjpmQDaeaz_XAF7bLIgoV_KtxGHwuo"
            />
          </Link>
        ) : null}
      </div>
    </header>
  );
}
