'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SCAN_STEPS = [
  { label: '正在提取肤色...', status: 'done' as const },
  { label: '正在分析发型指标...', status: 'active' as const },
  { label: '正在匹配机能装备...', status: 'pending' as const },
];

function ScanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get('target') || '/upload/color';
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.5;
        if (next >= 100) {
          clearInterval(timer);
          // Read tool from sessionStorage and navigate to upload/[tool]
          const toolId = sessionStorage.getItem('spro_active_tool');
          const dest = toolId ? `/upload/${toolId}` : target;
          setTimeout(() => router.push(dest), 400);
          return 100;
        }
        if (next > 30 && stepIndex < 1) setStepIndex(1);
        if (next > 60 && stepIndex < 2) setStepIndex(2);
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const steps = SCAN_STEPS.map((s, i) => ({
    ...s,
    status: i < stepIndex ? ('done' as const) : i === stepIndex ? ('active' as const) : ('pending' as const),
  }));

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative bg-background text-on-surface overflow-hidden">
      {/* Scanline */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
        backgroundSize: '100% 4px',
      }} />

      <div className="relative z-10 flex flex-col items-center px-6 py-10 w-full max-w-md">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="font-h1 text-h1 text-secondary drop-shadow-[0_0_15px_rgba(236,255,227,0.8)] tracking-[0.2em] uppercase">
            正在扫描
          </h1>
          <p className="font-mono-data text-mono-data text-secondary mt-2 opacity-80">
            [ 系统：目标已锁定 ]
          </p>
        </div>

        {/* Scanning Figure */}
        <div className="relative w-64 h-[400px] mb-10 flex items-center justify-center">
          {/* Background image container */}
          <div className="absolute inset-0 bg-surface-container-low border border-surface-variant overflow-hidden flex items-center justify-center">
            <div
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7KpT65YGFCxAhg__8sQNGFI50C9B3p-LruDHo487ElDAIVr-g87WMo8lmegGtY71cqwekOAjCvtULSGLzeCxp_MHQ71edwhV1U02RqiGREVYmNcPvJu6PwN4oDX_BQRzm3mLuW2au95ArTLGZE8iIxpYhtpMb6wpOLOv5-d4vM61lUHlY_8iU97iwcvFG3mMyBI-_xBKOC6kJb62ELBorn5pjySUEJeTG2MmXiHHBcu_46Vn1Yl6ppGP8fysMwqSav86cQsGH57A')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute inset-0 border border-secondary/20 z-10 flex flex-col justify-between p-2">
            <div className="flex justify-between w-full">
              <div className="w-4 h-4 border-t-2 border-l-2 border-secondary" />
              <div className="w-4 h-4 border-t-2 border-r-2 border-secondary" />
            </div>
            <div className="flex justify-between w-full">
              <div className="w-4 h-4 border-b-2 border-l-2 border-secondary" />
              <div className="w-4 h-4 border-b-2 border-r-2 border-secondary" />
            </div>
          </div>

          {/* Laser scan line */}
          <div
            className="absolute left-[45%] w-[2px] bg-secondary shadow-[0_0_20px_rgba(236,255,227,1)] z-20 transition-all duration-100"
            style={{ top: 0, height: `${progress}%` }}
          />
          <div
            className="absolute left-[45%] w-12 h-full bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none -translate-x-1/2"
            style={{ top: 0, clipPath: `inset(${100 - progress}% 0 0 0)` }}
          />
        </div>

        {/* Step Log */}
        <div className="flex flex-col gap-2 w-full mb-8">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-4 ${
              step.status === 'active' ? 'bg-secondary/5 p-1 -mx-1 border-l-2 border-secondary' : ''
            }`}>
              <span className={`material-symbols-outlined text-[16px] ${
                step.status === 'done' ? 'text-secondary' :
                step.status === 'active' ? 'text-secondary animate-spin' :
                'text-outline'
              }`} style={step.status === 'done' ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {step.status === 'done' ? 'check_circle' :
                 step.status === 'active' ? 'sync' :
                 'hourglass_empty'}
              </span>
              <span className={`font-mono-data text-mono-data ${
                step.status === 'done' ? 'text-on-surface-variant opacity-60' :
                step.status === 'active' ? 'text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]' :
                'text-outline'
              }`}>
                {step.label} [{step.status === 'done' ? '完成' : step.status === 'active' ? '进行中' : '排队中'}]
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="w-full h-1 bg-surface-container-high border border-outline-variant/50 relative overflow-hidden">
            <div
              className="h-full bg-secondary shadow-[0_0_15px_rgba(236,255,227,0.8)] relative transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2) 100%)',
                backgroundSize: '8px 8px',
              }} />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-label-caps text-label-caps text-secondary opacity-70">系统进度</span>
            <span className="font-mono-data text-mono-data text-secondary opacity-90 drop-shadow-[0_0_5px_rgba(236,255,227,0.5)]">
              {progress.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-background" />}>
      <ScanContent />
    </Suspense>
  );
}
