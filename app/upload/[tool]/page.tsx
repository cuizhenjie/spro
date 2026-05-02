"use client";

import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ─── Tool metadata ─── */
const TOOL_META: Record<string, {
  title: string;
  subtitle: string;
  placeholder: string;
  bgImage: string;
  accentColor: string;
  steps: string[];
  apiEndpoint?: string;
}> = {
  "palm-reading": {
    title: "掌心占卜",
    subtitle: "NEURAL PALM // FATE MAPPING",
    placeholder: "上传手掌照片，获取命运解读",
    bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    accentColor: "#c4a35a",
    steps: ["初始化玄学网络", "提取掌纹特征", "解析命运曲线", "生成占卜报告"],
  },
  "style-analyzer": {
    title: "风格解析",
    subtitle: "STYLE QUADRANT // IDENTITY MAPPING",
    placeholder: "上传全身照片，获取风格定位",
    bgImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ffabf3",
    steps: ["初始化风格网络", "提取轮廓特征", "匹配风格象限", "生成风格报告"],
  },
  "lipstick-recommendation": {
    title: "口红推荐",
    subtitle: "LIP ANALYSIS // SHADE MATCHING",
    placeholder: "上传唇部特写照片，获取专属色号",
    bgImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f472b6",
    steps: ["初始化美妆网络", "分析唇色特征", "匹配肤色调", "推荐色号组合"],
  },
  "image-diagnosis": {
    title: "形象诊断",
    subtitle: "VISUAL DIAGNOSIS // FULL ANALYSIS",
    placeholder: "上传正面照片，获取整体形象分析",
    bgImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
    accentColor: "#a78bfa",
    steps: ["初始化诊断网络", "提取面部特征", "分析整体风格", "生成诊断报告"],
  },
  "seasonal-outfit": {
    title: "四季穿搭指南",
    subtitle: "SEASONAL STREETWEAR // FOUR SEASONS",
    placeholder: "上传正面或全身人物照片，获取四季穿搭指南",
    bgImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff9f43",
    steps: ["初始化视觉网络", "提取面部色彩特征", "分析体型比例", "生成春季穿搭", "生成夏季穿搭", "生成秋季穿搭", "生成冬季穿搭", "打包四季穿搭报告"],
    apiEndpoint: "/api/style-guide",
  },
  "personal-color": {
    title: "个人色彩分析",
    subtitle: "PERSONAL COLOR // OPTIMAL PALETTE",
    placeholder: "上传真人正面照片，获取专属色彩报告",
    bgImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff6b9d",
    steps: ["初始化色彩网络", "分析肤色冷暖调", "判断四季类型", "生成色盘分析", "打包个人报告"],
    apiEndpoint: "/api/personal-color",
  },
  "neon-street-syndicate": {
    title: "霓虹街头党",
    subtitle: "NEON STREET // URBAN MAPPING",
    placeholder: "上传街头风格照片，获取霓虹穿搭方案",
    bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff2d78",
    steps: ["初始化霓虹网络", "提取街头特征", "解析赛博元素", "生成穿搭方案"],
  },
  "hardware-implant-faction": {
    title: "机能植入派",
    subtitle: "HARDWARE IMPLANT // CYBERNETIC",
    placeholder: "上传人物照片，获取机能风穿搭方案",
    bgImage: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=800",
    accentColor: "#60a5fa",
    steps: ["初始化机能网络", "提取植入特征", "解析赛博指数", "生成穿搭方案"],
  },
  "makeup-analysis": {
    title: "妆容分析",
    subtitle: "MAKEUP ANALYSIS // BEAUTY GUIDE",
    placeholder: "上传真人正面照片，获取专属妆容分析",
    bgImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f472b6",
    steps: ["初始化美妆网络", "分析五官结构", "判断脸型比例", "提取皮肤质感", "生成妆容方案", "打包妆容报告"],
    apiEndpoint: "/api/makeup-analysis",
  },
};

/* ─── Default for unknown tools ─── */
const DEFAULT_META = {
  title: "AI 分析",
  subtitle: "NEURAL ANALYSIS // PROCESSING",
  placeholder: "上传照片开始分析",
  bgImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
  accentColor: "#ffabf3",
  steps: ["初始化视觉网络", "提取特征", "生成报告"],
};

export default function UploadPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = (params.tool as string) || "fashion";
  const meta = TOOL_META[toolId] || DEFAULT_META;

  const [step, setStep] = useState<"idle" | "uploading" | "processing">("idle");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Upload file → convert to dataURL → call API → store result */
  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setStep("uploading");
    /* Simulate upload progress */
    let p = 0;
    const uploadTimer = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) { p = 100; clearInterval(uploadTimer); startProcessing(file); }
      setProgress(p);
    }, 150);
  };

  const startProcessing = (file: File) => {
    setStep("processing");
    setProgress(0);
    setCurrentStepIdx(0);

    /* Read file as dataURL for display */
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const photoDataUrl = ev.target?.result as string;

      /* Animate step progression */
      const totalSteps = meta.steps.length;
      let stepIdx = 0;
      const stepTimer = setInterval(() => {
        stepIdx++;
        if (stepIdx >= totalSteps) {
          clearInterval(stepTimer);
          /* Call API if available */
          callAnalysisApi(photoDataUrl, toolId);
          return;
        }
        setCurrentStepIdx(stepIdx);
      }, 600);

      /* Progress bar simulation */
      let p = 0;
      const progressTimer = setInterval(() => {
        p += Math.random() * 8;
        if (p >= 100) { p = 100; clearInterval(progressTimer); }
        setProgress(p);
      }, 200);
    };
    reader.readAsDataURL(file);
  };

  const callAnalysisApi = async (photoDataUrl: string, toolId: string) => {
    if (!meta.apiEndpoint) {
      /* No API → use mock result after processing */
      sessionStorage.setItem(`spro_result_${toolId}`, JSON.stringify({ mock: true, photoDataUrl }));
      router.push(`/result/${toolId}`);
      return;
    }

    try {
      const res = await fetch(meta.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: photoDataUrl }),
      });
      const data = await res.json();
      sessionStorage.setItem(`spro_result_${toolId}`, JSON.stringify({ ...data, photoDataUrl, mock: data.mock ?? false }));
    } catch {
      /* API failure → fallback to mock */
      sessionStorage.setItem(`spro_result_${toolId}`, JSON.stringify({ mock: true, photoDataUrl }));
    }
    router.push(`/result/${toolId}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" style={{ backgroundImage: `url('${meta.bgImage}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.08))] bg-[length:100%_4px] opacity-40" />

      {/* Back */}
      <Link href="/marketplace" className="absolute left-6 top-6 z-20 flex items-center gap-2 font-mono text-[12px] text-outline transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> 返回市场
      </Link>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] uppercase" style={{ borderColor: `${meta.accentColor}50`, color: meta.accentColor }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: meta.accentColor, boxShadow: `0 0 8px ${meta.accentColor}` }} />
            {meta.subtitle}
          </div>
          <h1 className="font-h1 text-h1 text-on-surface">{meta.title}</h1>
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
              <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progress}%`, backgroundColor: meta.accentColor, boxShadow: `0 0 10px ${meta.accentColor}` }} />
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
              {meta.steps.map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-[12px] text-outline">
                  <span style={{ color: meta.accentColor }}>{">"}</span>
                  <span className={i === currentStepIdx ? "animate-pulse" : i < currentStepIdx ? "text-secondary" : ""}>
                    {item}{i === currentStepIdx ? "_" : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: meta.accentColor, boxShadow: `0 0 8px ${meta.accentColor}` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
