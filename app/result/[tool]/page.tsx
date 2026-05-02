"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Download, Share2 } from "lucide-react";
import { DataBox, DataTag } from "@/components/CyberUI/DataCard";

/* ─── MOCK DATA ─── */

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

const SEASONAL_OUTFIT_RESULT = {
  type: "秋季型人",
  undertone: "暖灰底调",
  matchScore: 88,
  seasons: [
    {
      id: "spring",
      label: "春季",
      labelEn: "SPRING",
      accentColor: "#a8e6cf",
      heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
      tags: ["清爽", "明亮", "轻盈"],
      colorPalette: ["#FFF5E1", "#FFE4B5", "#E8F5E9", "#B2DFDB"],
      avoidColors: ["#8B4513", "#800020", "#2F4F4F"],
      colorFormula: "象牙白 + 嫩绿 + 晴空蓝",
      heroOutfit: "短款浅色夹克 + 白色内搭 + 高腰浅蓝牛仔 + 德训鞋",
      items: ["浅灰短夹克", "修身白T", "高腰浅蓝牛仔", "白色德训鞋", "米白小肩包"],
      avoid: ["高饱和撞色", "土气碎花", "工装口袋堆叠"],
      summary: "春季潮感不靠花色，靠清爽浅色、短比例和一点亮色。",
    },
    {
      id: "summer",
      label: "夏季",
      labelEn: "SUMMER",
      accentColor: "#90caf9",
      heroImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
      tags: ["冷感", "清爽", "都市"],
      colorPalette: ["#F5F5F5", "#BDBDBD", "#37474F", "#B0BEC5"],
      avoidColors: ["#F48FB1", "#FFD54F", "#FF7043"],
      colorFormula: "冷白 + 炭黑 + 雾蓝",
      heroOutfit: "短款炭灰夹克 + rib背心 + 高腰黑短裤 + 银色小包",
      items: ["炭灰短夹克", "冷白rib背心", "高腰黑短裤", "白灰运动鞋", "银色小包"],
      avoid: ["全身甜美浅粉蓝", "暖黄贴脸", "厚重焦糖色"],
      summary: "夏季不是只能穿浅色，黑灰白做骨架，冷色和轻露肤负责透气。",
    },
    {
      id: "autumn",
      label: "秋季",
      labelEn: "AUTUMN",
      accentColor: "#d4a373",
      heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
      tags: ["质感", "黑棕", "复古"],
      colorPalette: ["#6B4423", "#2C2C2C", "#E8DCC4", "#3B5998"],
      avoidColors: ["#C4A35A", "#8B8378", "#D2691E"],
      colorFormula: "可可棕 + 炭黑 + 深牛仔蓝",
      heroOutfit: "短款棕色皮衣 + 白色内搭 + 深色高腰牛仔 + 乐福鞋",
      items: ["棕色短皮衣", "白色修身内搭", "深蓝高腰牛仔", "酒红乐福鞋", "酒红小包"],
      avoid: ["土味大地色", "过多工装口袋", "全身松垮"],
      summary: "秋季潮感靠黑棕灰做骨架，短外套和深色牛仔负责把比例拉出来。",
    },
    {
      id: "winter",
      label: "冬季",
      labelEn: "WINTER",
      accentColor: "#90a4ae",
      heroImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600",
      tags: ["冷感", "高对比", "锋利"],
      colorPalette: ["#FFFFFF", "#212121", "#1a237e", "#546E7A"],
      avoidColors: ["#F5DEB3", "#DEB887", "#D2B48C"],
      colorFormula: "纯白 + 炭黑 + 钴蓝",
      heroOutfit: "结构感墨蓝长大衣 + 白色针织 + 黑短裙 + 黑色长靴",
      items: ["墨蓝长大衣", "纯白修身针织", "黑色短裙", "黑色长靴", "钴蓝小包"],
      avoid: ["普通销售西装", "全身低对比", "浑浊卡其"],
      summary: "冬季的重点是边界清楚，黑白做骨架，冷亮色负责让人被看见。",
    },
  ],
};

const PERSONAL_COLOR_RESULT = {
  toneType: "暖皮",
  toneTypeEn: "Warm Undertone",
  seasonType: "深秋型",
  seasonTypeEn: "Deep Autumn",
  matchScore: 85,
  skinDescription: "您的肤色为中性偏暖，瞳色为深棕，发色为自然黑，面部对比度为中高对比，整体气质沉稳有气场。",
  bestColors: [
    { name: "琥珀金", hex: "#D4A373", effect: "显白提气色" },
    { name: "焦糖棕", hex: "#8B4513", effect: "高级质感" },
    { name: "暗红", hex: "#8B0000", effect: "气场全开" },
    { name: "橄榄绿", hex: "#556B2F", effect: "复古气质" },
    { name: "深牛仔蓝", hex: "#2F4F4F", effect: "显瘦百搭" },
  ],
  goodColors: [
    { name: "暖白", hex: "#FAF0E6" },
    { name: "奶茶色", hex: "#C19A6B" },
    { name: "砖红", hex: "#CB4154" },
  ],
  avoidColors: [
    { name: "冷粉", hex: "#FFB6C1", reason: "显疲惫" },
    { name: "荧光色", hex: "#00FF7F", reason: "廉价感" },
    { name: "冷白", hex: "#F8F8FF", reason: "对比太强" },
    { name: "高饱和蓝", hex: "#007FFF", reason: "显脏" },
  ],
  makeupTips: ["底妆选暖调黄调", "眼影用棕色系", "腮红用砖红色", "口红选焦糖/暗红"],
  hairTips: ["棕色系染发", "焦糖挑染", "避免冷色调发色"],
  colorDirection: "以暖色调、高饱和、有质感的颜色为主，避免冷色调和过于浅淡的颜色。",
};

/* ─── META MAP ─── */

const RESULT_META: Record<string, {
  title: string;
  subtitle: string;
  accentColor: string;
  matchScore?: number;
}> = {
  fashion: {
    title: "穿搭解析报告",
    subtitle: "STRUCTURAL ANALYSIS COMPLETE",
    accentColor: "#ecffe3",
    matchScore: FASHION_RESULT.matchScore,
  },
  color: {
    title: "色彩诊断报告",
    subtitle: "CHROMATIC ANALYSIS COMPLETE",
    accentColor: "#ffabf3",
    matchScore: COLOR_RESULT.matchScore,
  },
  "seasonal-outfit": {
    title: "四季穿搭指南",
    subtitle: "SEASONAL STREETWEAR GUIDE",
    accentColor: "#ff9f43",
    matchScore: SEASONAL_OUTFIT_RESULT.matchScore,
  },
  "personal-color": {
    title: "个人色彩分析",
    subtitle: "PERSONAL COLOR ANALYSIS",
    accentColor: "#ff6b9d",
    matchScore: PERSONAL_COLOR_RESULT.matchScore,
  },
};

export default function ResultPage() {
  const params = useParams();
  const tool = (params.tool as string) || "fashion";
  const meta = RESULT_META[tool] || RESULT_META.fashion;
  const [copied, setCopied] = useState(false);

  const copyResult = () => {
    navigator.clipboard.writeText("spro result");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: meta.title, url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low via-background to-background" />

      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.08))] bg-[length:100%_4px] opacity-40" />

      {/* Header */}
      <div className="relative z-20 border-b border-surface-container-high px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono text-[12px] text-outline transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> 返回首页
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: meta.accentColor, boxShadow: `0 0 8px ${meta.accentColor}` }} />
            <span className="font-mono text-[11px] uppercase" style={{ color: meta.accentColor }}>
              {meta.subtitle}
            </span>
          </div>
          <button onClick={handleShare} className="flex items-center gap-2 font-mono text-[12px] text-outline transition-colors hover:text-primary">
            <Share2 className="h-4 w-4" /> 分享
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 py-12">

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="font-h1 text-h1 mb-3">{meta.title}</h1>
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1" style={{ borderColor: `${meta.accentColor}40` }}>
            <span className="font-mono text-[11px] text-outline">匹配度</span>
            <span className="font-mono text-[14px] font-bold" style={{ color: meta.accentColor }}>
              {meta.matchScore}%
            </span>
          </div>
        </div>

        {/* ── FASHION / COLOR (existing) ── */}
        {(tool === "fashion" || tool === "color") && (
          <>
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
            <div className="mb-10">
              <DataBox label="AI 分析摘要" value={tool === "fashion" ? FASHION_RESULT.desc : COLOR_RESULT.desc} accentColor="orange" />
            </div>
            <div className="mb-10">
              <label className="font-mono text-[11px] text-outline mb-3 block uppercase tracking-widest">推荐标签</label>
              <div className="flex flex-wrap gap-2">
                {(tool === "fashion" ? FASHION_RESULT.tags : COLOR_RESULT.tags).map((tag) => (
                  <DataTag key={tag}>{tag}</DataTag>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── SEASONAL OUTFIT ── */}
        {tool === "seasonal-outfit" && (
          <>
            {/* Season type bar */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              {SEASONAL_OUTFIT_RESULT.seasons.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.accentColor, boxShadow: `0 0 6px ${s.accentColor}` }} />
                  <span className="font-mono text-xs" style={{ color: s.accentColor }}>{s.labelEn}</span>
                </div>
              ))}
            </div>

            {/* 4 Season Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {SEASONAL_OUTFIT_RESULT.seasons.map((season) => (
                <div key={season.id} className="border border-white/10 overflow-hidden" style={{ borderColor: `${season.accentColor}30` }}>
                  {/* Hero image */}
                  <div className="relative h-56 overflow-hidden">
                    <img src={season.heroImage} alt={season.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="font-display text-2xl font-bold text-white">{season.label}</span>
                      <span className="font-mono text-xs text-white/60">{season.labelEn}</span>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1">
                      {season.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-white/80 border border-white/20 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    {/* Color palette */}
                    <div>
                      <label className="font-mono text-[10px] text-outline uppercase tracking-widest">推荐色盘</label>
                      <div className="flex gap-1.5 mt-1.5">
                        {season.colorPalette.map((c, i) => (
                          <div key={i} className="h-7 w-7 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c} />
                        ))}
                      </div>
                    </div>

                    {/* Hero outfit */}
                    <div>
                      <label className="font-mono text-[10px] text-outline uppercase tracking-widest">主推造型</label>
                      <p className="text-sm text-on-surface mt-1">{season.heroOutfit}</p>
                    </div>

                    {/* Color formula */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-outline uppercase">配色</span>
                      <span className="font-mono text-xs" style={{ color: season.accentColor }}>{season.colorFormula}</span>
                    </div>

                    {/* Avoid */}
                    <div>
                      <label className="font-mono text-[10px] text-primary/70 uppercase tracking-widest">避雷</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {season.avoid.map((a) => (
                          <span key={a} className="text-[10px] font-mono text-primary/60 px-1.5 py-0.5 border border-primary/20">{a}</span>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-white/5 pt-3">
                      <p className="text-xs text-on-surface-variant italic">"{season.summary}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── PERSONAL COLOR ── */}
        {tool === "personal-color" && (
          <>
            {/* Type header */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
              <div className="text-center">
                <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">肤色底调</div>
                <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{PERSONAL_COLOR_RESULT.toneType}</div>
                <div className="font-mono text-xs text-on-surface-variant">{PERSONAL_COLOR_RESULT.toneTypeEn}</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center">
                <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">四季类型</div>
                <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{PERSONAL_COLOR_RESULT.seasonType}</div>
                <div className="font-mono text-xs text-on-surface-variant">{PERSONAL_COLOR_RESULT.seasonTypeEn}</div>
              </div>
            </div>

            {/* Skin description */}
            <div className="mb-8 p-4 border border-white/10" style={{ borderColor: `${meta.accentColor}20` }}>
              <p className="text-sm text-on-surface-variant">{PERSONAL_COLOR_RESULT.skinDescription}</p>
            </div>

            {/* Color grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Best colors */}
              <div className="border border-white/10 p-4" style={{ borderColor: `${meta.accentColor}30` }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-secondary">最适合</span>
                </div>
                <div className="space-y-3">
                  {PERSONAL_COLOR_RESULT.bestColors.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border border-white/10 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                      <div>
                        <div className="text-sm font-medium text-on-surface">{c.name}</div>
                        <div className="text-[10px] font-mono text-secondary">{c.effect}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Good colors */}
              <div className="border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-tertiary" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-tertiary">普通适合</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_COLOR_RESULT.goodColors.map((c) => (
                    <div key={c.name} className="flex flex-col items-center gap-1">
                      <div className="h-10 w-10 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] font-mono text-on-surface-variant">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid colors */}
              <div className="border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary">不建议</span>
                </div>
                <div className="space-y-3">
                  {PERSONAL_COLOR_RESULT.avoidColors.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border border-white/10 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                      <div>
                        <div className="text-sm font-medium text-on-surface">{c.name}</div>
                        <div className="text-[10px] font-mono text-primary">{c.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Makeup & Hair tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="border border-white/10 p-4">
                <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">妆容方向</label>
                <div className="space-y-1.5">
                  {PERSONAL_COLOR_RESULT.makeupTips.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: meta.accentColor }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 p-4">
                <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">发色方向</label>
                <div className="space-y-1.5">
                  {PERSONAL_COLOR_RESULT.hairTips.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: meta.accentColor }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Color direction */}
            <div className="p-4 border border-secondary/20" style={{ borderColor: `${meta.accentColor}20` }}>
              <p className="text-sm text-on-surface-variant italic">{PERSONAL_COLOR_RESULT.colorDirection}</p>
            </div>
          </>
        )}

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
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 border py-4 font-label-caps text-label-caps transition-all hover:bg-surface-container-high"
            style={{ borderColor: `${meta.accentColor}50`, color: meta.accentColor }}
          >
            <Share2 className="h-4 w-4" />
            分享报告
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
