"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const TOOL_META: Record<string, {
  title: string;
  subtitle: string;
  placeholder: string;
  bgImage: string;
  accentColor: string;
  steps?: string[];
}> = {
  fashion: {
    title: "赛博穿搭解析",
    subtitle: "STRUCTURAL ANALYSIS // SYNTHETIC FABRICS",
    placeholder: "将服饰图片拖入神经扫描区",
    bgImage: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ecffe3",
    steps: ["初始化视觉网络", "提取色彩特征", "生成穿搭方案", "打包数据资产"],
  },
  color: {
    title: "AI色彩诊断",
    subtitle: "CHROMATIC MAPPING // OPTIMAL REFLECTION",
    placeholder: "上传正脸照片，获取色彩分析",
    bgImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ffabf3",
    steps: ["初始化视觉网络", "提取色彩特征", "生成穿搭方案", "打包数据资产"],
  },
  "seasonal-outfit": {
    title: "四季穿搭指南",
    subtitle: "SEASONAL STREETWEAR // FOUR SEASONS",
    placeholder: "上传正面或全身人物照片，获取四季穿搭指南",
    bgImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff9f43",
    steps: ["初始化视觉网络", "提取面部色彩特征", "分析体型比例", "生成春季穿搭", "生成夏季穿搭", "生成秋季穿搭", "生成冬季穿搭", "打包四季穿搭报告"],
  },
  "personal-color": {
    title: "个人色彩分析",
    subtitle: "PERSONAL COLOR ANALYSIS // OPTIMAL PALETTE",
    placeholder: "上传真人正面照片，获取专属色彩报告",
    bgImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff6b9d",
    steps: ["初始化色彩网络", "分析肤色冷暖调", "判断四季类型", "生成色盘分析", "打包个人报告"],
  },
};

export default function UploadPage() {
  const params = useParams();
  const router = useRouter();
  const tool = (params.tool as string) || "fashion";
  const meta = TOOL_META[tool as keyof typeof TOOL_META] || TOOL_META.fashion;

  const [step, setStep] = useState<"idle" | "uploading" | "processing">("idle");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setStep("uploading");
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStep("processing");
          setTimeout(() => router.push(`/result/${tool}`), 3000);
        }, 500);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" style={{ backgroundImage: `url('${meta.bgImage}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.08))] bg-[length:100%_4px] opacity-40" />

      {/* Back */}
      <Link href="/" className="absolute left-6 top-6 z-20 flex items-center gap-2 font-mono text-[12px] text-outline transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> 返回首页
      </Link>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] uppercase"
            style={{ borderColor: `${meta.accentColor}50`, color: meta.accentColor }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: meta.accentColor, boxShadow: `0 0 8px ${meta.accentColor}` }} />
            {meta.subtitle}
          </div>
          <h1 className="font-h1 text-h1 text-on-background">{meta.title}</h1>
        </div>

        {/* Upload zone */}
        {step === "idle" && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex h-80 w-full max-w-lg cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${dragOver ? "border-primary bg-primary/10" : "border-outline hover:border-primary/50"}`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-outline-variant">
                <span className="material-symbols-outlined text-4xl text-outline">upload_file</span>
              </div>
              <p className="font-mono text-[13px] text-on-surface-variant">{meta.placeholder}</p>
              <p className="mt-2 font-mono text-[11px] text-outline">支持 JPG / PNG / WEBP</p>
            </div>
          </div>
        )}

        {/* Upload progress */}
        {step === "uploading" && (
          <div className="flex w-full max-w-lg flex-col items-center">
            <div className="mb-4 font-mono text-[13px] text-outline">正在上传神经资产...</div>
            <div className="h-1 w-full rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%`, backgroundColor: meta.accentColor, boxShadow: `0 0 10px ${meta.accentColor}` }}
              />
            </div>
            <div className="mt-2 font-mono text-[12px] text-outline">{Math.round(progress)}%</div>
          </div>
        )}

        {/* Processing */}
        {step === "processing" && (
          <div className="flex w-full max-w-lg flex-col items-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2" style={{ borderColor: `${meta.accentColor}60`, boxShadow: `0 0 30px ${meta.accentColor}30` }}>
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-dotted" style={{ borderColor: `${meta.accentColor}60` }} />
            </div>
            <div className="mb-4 font-mono text-[13px]" style={{ color: meta.accentColor }}>正在启动神经分析引擎...</div>
            <div className="space-y-2 w-full">
              {(meta.steps || ["初始化视觉网络", "提取色彩特征", "生成穿搭方案", "打包数据资产"]).map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-[12px] text-outline">
                  <span style={{ color: meta.accentColor }}>{">"}</span>
                  <span className={i === ((meta.steps?.length || 4) - 1) ? "animate-pulse" : ""}>{item}{i === ((meta.steps?.length || 4) - 1) ? "_" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
