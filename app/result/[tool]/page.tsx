"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import { DataBox, DataTag } from "@/components/CyberUI/DataCard";

const FASHION_RESULT = {
  style: "赛博战术通勤",
  material: "碳纤维混纺 + 纳米涂层",
  colorFamily: "哑光黑 / 铁黑",
  matchScore: 94,
  tags: ["战术通勤", "机能风", "都市", "低调", "防水"],
  desc: "基于神经网络的材质结构分析，判定此服饰适合都市战术通勤场景。碳纤维混纺面料提供优异的耐磨性与轻量化体验，配合纳米涂层实现全天候防护。",
};

const COLOR_RESULT = {
  season: "深秋型人",
  undertone: "暖灰底调",
  bestColors: "琥珀金 / 焦糖棕 / 暗红",
  avoidColors: "荧光色 / 冷白",
  matchScore: 91,
  tags: ["暖调", "秋冬", "高级感", "显白", "复古"],
  desc: "根据面部色彩特征分析，您的肤色属于深秋型人，瞳色与发色形成良好的暖灰对比。建议选择琥珀金系、焦糖棕系等暖色调服饰，避免冷色荧光色。",
};

const RESULT_META = {
  fashion: {
    title: "穿搭解析报告",
    subtitle: "STRUCTURAL ANALYSIS COMPLETE",
    accentColor: "#ecffe3",
    result: FASHION_RESULT,
  },
  color: {
    title: "色彩诊断报告",
    subtitle: "CHROMATIC ANALYSIS COMPLETE",
    accentColor: "#ffabf3",
    result: COLOR_RESULT,
  },
};

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const tool = (params.tool as string) || "fashion";
  const meta = RESULT_META[tool as keyof typeof RESULT_META] || RESULT_META.fashion;
  const [copied, setCopied] = useState(false);

  const copyResult = () => {
    navigator.clipboard.writeText(meta.result.desc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low via-background to-background" />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.08))] bg-[length:100%_4px] opacity-40" />

      {/* Header */}
      <div className="relative z-20 border-b border-surface-container-high px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono text-[12px] text-outline transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> 返回首页
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: meta.accentColor, boxShadow: `0 0 8px ${meta.accentColor}` }}
            />
            <span className="font-mono text-[11px] uppercase" style={{ color: meta.accentColor }}>
              {meta.subtitle}
            </span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="font-h1 text-h1 mb-3">{meta.title}</h1>
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1" style={{ borderColor: `${meta.accentColor}40` }}>
            <span className="font-mono text-[11px] text-outline">匹配度</span>
            <span className="font-mono text-[14px] font-bold" style={{ color: meta.accentColor }}>
              {meta.result.matchScore}%
            </span>
          </div>
        </div>

        {/* Data grid */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {tool === "fashion" ? (
            <>
              <DataBox label="风格类型" value={FASHION_RESULT.style} verified accentColor="green" />
              <DataBox label="材质面料" value={FASHION_RESULT.material} accentColor="green" />
              <DataBox label="色彩家族" value={FASHION_RESULT.colorFamily} accentColor="green" />
            </>
          ) : (
            <>
              <DataBox label="肤色季型" value={COLOR_RESULT.season} verified accentColor="pink" />
              <DataBox label="底调分析" value={COLOR_RESULT.undertone} accentColor="pink" />
              <DataBox label="最佳色彩" value={COLOR_RESULT.bestColors} accentColor="orange" />
              <DataBox label="避用色彩" value={COLOR_RESULT.avoidColors} accentColor="orange" />
            </>
          )}
        </div>

        {/* AI description */}
        <div className="mb-10">
          <DataBox label="AI 分析摘要" value={tool === "fashion" ? FASHION_RESULT.desc : COLOR_RESULT.desc} accentColor="orange" />
        </div>

        {/* Tags */}
        <div className="mb-10">
          <label className="font-mono text-[11px] text-outline mb-3 block uppercase tracking-widest">推荐标签</label>
          <div className="flex flex-wrap gap-2">
            {(tool === "fashion" ? FASHION_RESULT.tags : COLOR_RESULT.tags).map((tag) => (
              <DataTag key={tag}>{tag}</DataTag>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={copyResult}
            className="flex flex-1 items-center justify-center gap-2 border py-4 font-label-caps text-label-caps transition-all hover:bg-surface-container-high"
            style={{ borderColor: `${meta.accentColor}50`, color: meta.accentColor }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {copied ? "已复制" : "复制结果"}
          </button>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 border py-4 font-label-caps text-label-caps transition-all hover:bg-surface-container-high"
            style={{ borderColor: `${meta.accentColor}50`, color: meta.accentColor }}
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
