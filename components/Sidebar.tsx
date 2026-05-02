'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BadgeDollarSign,
  Home,
  LogIn,
  Menu,
  Store,
  User,
  UserCog,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: '首页', href: '/', icon: Home },
  { label: '市场', href: '/marketplace', icon: Store },
  { label: '定价', href: '/pricing', icon: BadgeDollarSign },
  { label: '个人中心', href: '/profile', icon: User },
  { label: '创作者', href: '/seller', icon: UserCog },
  { label: '登录', href: '/login', icon: LogIn },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-[70] inline-flex h-11 w-11 items-center justify-center border border-primary/50 bg-surface-container/90 text-primary shadow-[0_0_18px_rgba(255,0,255,0.28)] backdrop-blur-xl transition hover:bg-primary/15 lg:hidden"
        aria-label="打开导航"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm lg:hidden"
          aria-label="关闭导航遮罩"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-72 flex-col border-r border-primary/25 bg-[#160a15]/95 shadow-[0_0_40px_rgba(255,0,255,0.16)] backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-primary/20 px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-primary bg-primary/15 text-primary shadow-[0_0_20px_rgba(255,0,255,0.35)]">
              穿
            </span>
            <span>
              <span className="block font-display text-xl font-bold tracking-[0.08em] text-primary drop-shadow-[0_0_12px_rgba(255,0,255,0.45)]">
                赛博衣橱
              </span>
              <span className="block font-mono-data text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                AI Fashion
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center border border-primary/30 text-primary hover:bg-primary/15 lg:hidden"
            aria-label="关闭导航"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group relative flex items-center gap-3 border px-4 py-3 font-label-caps text-label-caps transition-all ${
                  active
                    ? 'border-primary bg-primary/20 text-primary shadow-[0_0_18px_rgba(255,0,255,0.28)]'
                    : 'border-white/10 bg-white/[0.03] text-on-surface-variant hover:border-primary/50 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 transition-opacity ${
                    active ? 'bg-primary opacity-100' : 'bg-primary opacity-0 group-hover:opacity-70'
                  }`}
                />
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-primary/20 p-4">
          <div className="cyber-glass p-4">
            <p className="font-label-caps text-label-caps text-primary">NAV_SYS</p>
            <p className="mt-2 font-mono-data text-xs leading-relaxed text-on-surface-variant">
              深紫黑界面核心已接入，霓虹粉导航通道在线。
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
