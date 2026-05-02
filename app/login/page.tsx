'use client';

import React, { useState, useEffect } from 'react';
import { LogIn, Fingerprint, UserPlus, Badge, KeyRound, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
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
    <div className="flex min-h-screen w-full relative">
      {/* Left Panel — Atmospheric Artwork */}
      <div className="hidden lg:flex w-1/2 relative bg-surface-container-lowest border-r border-primary-container/20">
        <div className="absolute inset-0 opacity-80 mix-blend-luminosity saturate-50">
          <Image src="/images/login_bg.png" alt="" fill className="object-cover" priority sizes="50vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        {/* HUD Status */}
        <div className="absolute top-xl left-xl flex items-center gap-md bg-surface/40 backdrop-blur-md border border-primary-container/30 px-md py-sm shadow-[0_0_15px_rgba(255,0,255,0.15)]">
          <div className="w-2 h-2 bg-primary-container animate-pulse shadow-[0_0_8px_rgba(255,0,255,0.8)]" />
          <span className="font-mono-data text-mono-data text-primary-container tracking-widest uppercase glitch-text">
            系统状态：已加密 // ACCESS PENDING
          </span>
        </div>

        {/* Coordinate HUD */}
        <div className="absolute bottom-xl left-xl font-mono-data text-mono-data text-on-surface-variant/50">
          <p>LAT: 35.6895° N</p>
          <p>LNG: 139.6917° E</p>
          <p className="mt-sm text-secondary-container/70">安全连接已建立</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-gutter lg:p-xxl relative overflow-hidden">
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
              <div className="inline-flex items-center gap-3 mb-unit">
                <div className="relative w-10 h-10 rounded overflow-hidden border border-primary-container shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                  <Image src="/images/logo_spro.png" alt="SPRO" fill className="object-cover" sizes="40px" />
                </div>
              </div>
              <h1 className="font-h2 text-h2 text-primary-container drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] mb-unit glitch-text cursor-default">
                赛博衣橱
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
              {/* Operator ID / Email */}
              <div className="flex flex-col gap-unit group">
                <label className="font-label-caps text-label-caps text-on-surface flex items-center gap-xs" htmlFor="operator_id">
                  <Badge className="w-3.5 h-3.5 text-on-surface-variant" />
                  操作员 ID
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

              {/* Neural Link / Password */}
              <div className="flex flex-col gap-unit group">
                <label className="font-label-caps text-label-caps text-on-surface flex items-center gap-xs" htmlFor="neural_link">
                  <KeyRound className="w-3.5 h-3.5 text-on-surface-variant" />
                  神经连接密钥
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

                {mode === 'login' && (
                  <>
                    <div className="flex items-center gap-sm">
                      <div className="flex-1 h-px bg-outline-variant" />
                      <span className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">OR</span>
                      <div className="flex-1 h-px bg-outline-variant" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const user = login(DEFAULT_USER.email, DEMO_PASSWORD);
                        if (user) router.push('/');
                      }}
                      className="w-full py-md border border-secondary/30 text-secondary font-label-caps text-label-caps flex items-center justify-center gap-sm bg-transparent hover:bg-secondary/5 hover:border-secondary transition-all duration-300 rounded-none"
                    >
                      <Fingerprint className="w-4 h-4" />
                      生物识别扫描
                    </button>
                  </>
                )}
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

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container/30 to-transparent" />
      </div>
    </div>
  );
}
