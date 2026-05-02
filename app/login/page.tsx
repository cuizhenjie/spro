'use client';

import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Badge, KeyRound, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, getAuth, DEFAULT_USER, DEMO_PASSWORD } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEFAULT_USER.email);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (getAuth().loggedIn) router.replace('/');
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (mode === 'login') {
        const user = login(email, password);
        if (user) {
          router.push('/');
        } else {
          setError('邮箱或密码错误');
          setLoading(false);
        }
      } else {
        const user = login(DEFAULT_USER.email, DEMO_PASSWORD);
        if (user) router.push('/');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center p-gutter relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-secondary-container/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Corner HUD Brackets */}
        <div className="absolute -top-xs -left-xs w-md h-md border-t-2 border-l-2 border-primary-container/50" />
        <div className="absolute -top-xs -right-xs w-md h-md border-t-2 border-r-2 border-primary-container/50" />
        <div className="absolute -bottom-xs -left-xs w-md h-md border-b-2 border-l-2 border-primary-container/50" />
        <div className="absolute -bottom-xs -right-xs w-md h-md border-b-2 border-r-2 border-primary-container/50" />

        <div className="cyber-glass p-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="mb-xxl text-center">
            <h1 className="font-h2 text-h2 text-primary-container drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] mb-unit glitch-text cursor-default">
              StyleBoxAI
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              {mode === 'login' ? '需要操作员身份验证' : '注册新操作员身份'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-lg px-md py-sm border border-error/50 bg-error/10 text-error font-mono-data text-mono-data text-sm rounded-none">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
            {/* Login Name / Email */}
            <div className="flex flex-col gap-unit group">
              <label className="font-label-caps text-label-caps text-on-surface flex items-center gap-xs" htmlFor="operator_id">
                <Badge className="w-3.5 h-3.5 text-on-surface-variant" />
                登录名
              </label>
              <div className="relative">
                <input
                  id="operator_id"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入神经邮箱..."
                  className="w-full bg-transparent border-0 border-b border-outline px-0 py-sm text-on-background font-mono-data text-mono-data placeholder:text-surface-variant focus:ring-0 focus:border-secondary-container transition-colors outline-none rounded-none peer"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-px bg-secondary-container shadow-[0_0_10px_rgba(0,255,204,0.8)] scale-x-0 peer-focus:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-unit group">
              <label className="font-label-caps text-label-caps text-on-surface flex items-center gap-xs" htmlFor="neural_link">
                <KeyRound className="w-3.5 h-3.5 text-on-surface-variant" />
                密码
              </label>
              <div className="relative">
                <input
                  id="neural_link"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent border-0 border-b border-outline px-0 py-sm text-on-background font-mono-data text-mono-data tracking-[0.2em] placeholder:text-surface-variant focus:ring-0 focus:border-secondary-container transition-colors outline-none rounded-none peer"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-px bg-secondary-container shadow-[0_0_10px_rgba(0,255,204,0.8)] scale-x-0 peer-focus:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-md mt-lg">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-md border border-primary-container text-primary-container font-label-caps text-label-caps flex items-center justify-center gap-sm bg-transparent hover:bg-primary-container/10 shadow-[0_0_10px_rgba(255,0,255,0.1)] hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all duration-300 rounded-none disabled:opacity-50 group"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4 group-hover:animate-pulse" />
                )}
                {mode === 'login' ? '初始化登录' : '创建操作员身份'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-xl pt-lg border-t border-outline-variant flex justify-center">
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="font-mono-data text-mono-data text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-xs group"
            >
              <UserPlus className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {mode === 'login' ? '注册新操作员' : '返回登录'}
            </button>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-lg">
          <Link
            href="/"
            className="inline-flex items-center gap-xs font-mono-data text-mono-data text-on-surface-variant hover:text-primary-container transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回赛博空间
          </Link>
        </div>
      </div>
    </div>
  );
}
