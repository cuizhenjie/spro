"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const TASKS = [
  { icon: "check_box", label: "正在提取肤色...", status: "done" as const },
  { icon: "sync", label: "正在分析发型指标...", status: "progress" as const },
  { icon: "hourglass_empty", label: "正在匹配机能装备...", status: "queued" as const },
];

export default function LoadingOverlay() {
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const DURATION = 2200;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = (elapsed % DURATION) / DURATION;
      if (scanRef.current) {
        scanRef.current.style.top = `${progress * 100}%`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="h-screen w-full overflow-hidden flex items-center justify-center relative bg-background text-on-background font-body-md">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-50" />

      {/* Dashboard blur background */}
      <div className="absolute inset-0 bg-surface-container z-0 overflow-hidden">
        <div className="absolute inset-0 scanlines z-10 pointer-events-none" />
        <div className="p-xl opacity-30">
          <h1 className="font-h1 text-h1 text-primary-container">SELLER_DASHBOARD</h1>
          <div className="grid grid-cols-3 gap-md mt-lg">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-64 cyber-glass border border-outline-variant" />
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-20" />

      {/* Modal */}
      <div className="z-30 w-[90%] max-w-4xl cyber-glass border border-primary/50 shadow-[0_0_30px_rgba(255,171,243,0.2)] rounded relative flex flex-col md:flex-row overflow-hidden">
        {/* HUD Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary m-xs z-10" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary m-xs z-10" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary m-xs z-10" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary m-xs z-10" />

        {/* Left: Silhouette + Scan */}
        <div className="w-full md:w-1/2 relative bg-surface-container-lowest flex items-center justify-center border-b md:border-b-0 md:border-r border-primary/30 overflow-hidden min-h-[400px]">
          <div className="absolute inset-0">
            <Image
              alt="Neural scan silhouette"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale"
              src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800"
              fill
              unoptimized
            />
          </div>

          {/* Scan beam container */}
          <div className="absolute inset-0 border border-secondary/20 z-10 flex flex-col justify-between p-sm">
            <div className="flex justify-between w-full">
              <div className="w-xs h-xs border-t-2 border-l-2 border-secondary-fixed" />
              <div className="w-xs h-xs border-t-2 border-r-2 border-secondary-fixed" />
            </div>
            <div className="flex justify-between w-full">
              <div className="w-xs h-xs border-b-2 border-l-2 border-secondary-fixed" />
              <div className="w-xs h-xs border-b-2 border-r-2 border-secondary-fixed" />
            </div>
          </div>

          {/* Animated scan line */}
          <div
            ref={scanRef}
            className="absolute left-[45%] w-[2px] h-full bg-secondary-container shadow-[0_0_20px_rgba(19,255,67,1)] z-20"
            style={{ top: "0%" }}
          />
          <div className="absolute left-[45%] w-12 h-full bg-gradient-to-r from-secondary-container/30 to-transparent z-10 pointer-events-none -translate-x-1/2" />

          {/* Status badge */}
          <div className="absolute bottom-md left-md bg-background/90 px-sm py-xs border border-secondary-container text-secondary font-mono-data text-mono-data uppercase flex items-center gap-xs z-20">
            <span className="material-symbols-outlined text-[16px]">radar</span>
            [ 系统：目标已锁定 ]
          </div>
        </div>

        {/* Right: Task Queue + Progress */}
        <div className="w-full md:w-1/2 p-lg flex flex-col justify-between bg-surface-container-low/50 relative">
          {/* Title */}
          <div className="mb-lg">
            <h1 className="font-h1 text-h1 text-secondary-fixed drop-shadow-[0_0_15px_rgba(114,255,112,0.8)] tracking-[0.2em] uppercase">
              正在扫描
            </h1>
            <p className="font-mono-data text-mono-data text-secondary mt-unit opacity-80">
              [ 系统：目标已锁定 ]
            </p>
          </div>

          {/* Task Queue */}
          <div className="flex flex-col gap-sm w-full max-w-md px-md mb-xl flex-grow">
            {TASKS.map((task, i) => (
              <div
                key={i}
                className={`flex items-center gap-md ${
                  task.status === "progress" ? "bg-secondary/5 p-xs -mx-xs border-l-2 border-secondary-container" : ""
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    task.status === "done"
                      ? "text-secondary-fixed"
                      : task.status === "progress"
                      ? "text-secondary-fixed drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]"
                      : "text-outline"
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {task.icon}
                </span>
                <span
                  className={`font-mono-data text-mono-data ${
                    task.status === "done"
                      ? "text-on-surface-variant opacity-60"
                      : task.status === "progress"
                      ? "text-secondary drop-shadow-[0_0_8px_rgba(236,255,227,0.6)]"
                      : "text-outline"
                  }`}
                >
                  {task.label}
                  {task.status === "done" ? " [完成]" : task.status === "progress" ? " [进行中]" : " [排队中]"}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md px-md">
            <div className="w-full h-xs bg-surface-container-high border border-outline-variant/50 relative overflow-hidden">
              <div className="h-full bg-secondary-container w-[65%] shadow-[0_0_15px_rgba(19,255,67,0.8)] relative">
                {/* Diagonal stripes */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:8px_8px]"
                />
              </div>
            </div>
            <div className="flex justify-between mt-sm">
              <span className="font-label-caps text-label-caps text-secondary opacity-70">系统进度</span>
              <span className="font-mono-data text-mono-data text-secondary opacity-90 drop-shadow-[0_0_5px_rgba(236,255,227,0.5)]">
                65.03%
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
