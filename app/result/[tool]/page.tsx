"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Download, Share2 } from "lucide-react";
import { DataBox } from "@/components/CyberUI/DataCard";

/* ─── Read sessionStorage for real API result ─── */
interface StoredResult {
  photoDataUrl?: string;
  mock?: boolean;
  [key: string]: unknown;
}

function useStoredResult(toolId: string): StoredResult {
  const [stored, setStored] = useState<StoredResult | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`spro_result_${toolId}`);
      if (raw) setStored(JSON.parse(raw));
    } catch {}
  }, [toolId]);
  return stored || { mock: true };
}

/* ─── MOCK DATA ─── */

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

const MAKEUP_RESULT = {
  foundation: {
    type: "奶油肌",
    description: "微光泽感奶油肌底妆，保留皮肤自然质感，不追求过度的磨皮效果",
    avoid: "雾面哑光底妆会显得干涩无生气",
  },
  brows: {
    shape: "自然弧形眉",
    color: "深棕/灰棕色",
    direction: "顺着原生眉流方向描补，眉头轻眉尾实",
    avoid: "过于平直的一字眉或过浓的黑眉",
  },
  eye: {
    eyeshadow: "暖棕色系（焦糖/摩卡/浅金）",
    liner: "内眼线 + 微上挑外眼线，不宜过粗",
    intensity: "自然清透，睫毛根部晕染为主",
    avoid: "蓝色/紫色/绿色等冷色眼影，过重烟熏妆",
  },
  blush: {
    position: "颧骨偏内侧，轻扫至太阳穴方向",
    color: "杏色/暖桃色/淡砖红",
    avoid: "高光感太强的腮红，颜色过深或位置过低",
  },
  contour: {
    zone: "颧骨下侧 + 鼻梁 + 发际线轻扫",
    color: "偏灰棕修容色，比肤色深2-3度",
    avoid: "发红的修容色，容易显脏",
  },
  lip: {
    color: "焦糖棕/肉桂色/豆沙色",
    texture: "缎光或微哑光，避免纯雾面显得干",
    shape: "自然唇形，可轻抹出边缘",
    avoid: "过浅的粉色或过深的正红，显得老气",
  },
  overallStyle: "韩系清透轻熟妆",
  overallDesc: "以清透感为核心，暖调棕色系贯穿眼唇，保留五官的原生辨识度，轻微提亮轮廓，适合日常通勤和约会。",
  comparison: {
    best: { label: "最适合", desc: "暖调清透妆：焦糖棕眼影+杏色腮红+缎光唇釉", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400" },
    good: { label: "普通", desc: "轻泰妆：略微加深的眼窝和小烟熏感", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400" },
    avoid: { label: "不建议", desc: "浓重烟熏妆/冷粉色系：显得老气且失去辨识度", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400" },
  },
};

/* ─── META MAP ─── */

const RESULT_META: Record<string, {
  title: string;
  subtitle: string;
  accentColor: string;
  matchScore?: number;
}> = {
  "palm-reading": {
    title: "掌心占卜报告",
    subtitle: "PALM READING COMPLETE",
    accentColor: "#c4a35a",
    matchScore: 88,
  },
  "style-analyzer": {
    title: "风格解析报告",
    subtitle: "STYLE ANALYSIS COMPLETE",
    accentColor: "#ffabf3",
    matchScore: 90,
  },
  "lipstick-recommendation": {
    title: "口红推荐报告",
    subtitle: "LIPSTICK RECOMMENDATION",
    accentColor: "#f472b6",
    matchScore: 86,
  },
  "image-diagnosis": {
    title: "形象诊断报告",
    subtitle: "IMAGE DIAGNOSIS COMPLETE",
    accentColor: "#a78bfa",
    matchScore: 89,
  },
  "seasonal-outfit": {
    title: "四季穿搭指南",
    subtitle: "SEASONAL STREETWEAR GUIDE",
    accentColor: "#ff9f43",
    matchScore: 88,
  },
  "personal-color": {
    title: "个人色彩分析",
    subtitle: "PERSONAL COLOR ANALYSIS",
    accentColor: "#ff6b9d",
    matchScore: 85,
  },
  "neon-street-syndicate": {
    title: "穿搭分析",
    subtitle: "OUTFIT ANALYSIS COMPLETE",
    accentColor: "#ff2d78",
    matchScore: 91,
  },
  "hardware-implant-faction": {
    title: "配饰分析",
    subtitle: "ACCESSORY ANALYSIS COMPLETE",
    accentColor: "#60a5fa",
    matchScore: 87,
  },
  "makeup-analysis": {
    title: "妆容分析",
    subtitle: "MAKEUP ANALYSIS",
    accentColor: "#f472b6",
    matchScore: 87,
  },
  "hair-analysis": {
    title: "发型分析",
    subtitle: "HAIR ANALYSIS COMPLETE",
    accentColor: "#a78bfa",
    matchScore: 90,
  },
  "eyebrow-analysis": {
    title: "眉形美学分析",
    subtitle: "EYEBROW SHAPE ANALYSIS",
    accentColor: "#fb923c",
    matchScore: 89,
  },
};

function SeasonalOutfitContent({ meta, stored }: { meta: { accentColor: string }; stored: StoredResult }) {
  /* Use API-generated images if available, otherwise fall back to mock Unsplash URLs */
  const apiImages: Record<string, string | null> = {
    spring: (stored.spring as string) || null,
    summer: (stored.summer as string) || null,
    autumn: (stored.autumn as string) || null,
    winter: (stored.winter as string) || null,
  };

  return (
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
        {SEASONAL_OUTFIT_RESULT.seasons.map((season) => {
          const imageSrc = apiImages[season.id] || season.heroImage;
          return (
            <div key={season.id} className="border border-white/10 overflow-hidden" style={{ borderColor: `${season.accentColor}30` }}>
              <div className="relative h-56 overflow-hidden">
                <img src={imageSrc} alt={season.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-white">{season.label}</span>
                  <span className="font-mono text-xs text-white/60">{season.labelEn}</span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  {season.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-white/80 border border-white/20 backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="font-mono text-[10px] text-outline uppercase tracking-widest">推荐色盘</label>
                  <div className="flex gap-1.5 mt-1.5">
                    {season.colorPalette.map((c, i) => (
                      <div key={i} className="h-7 w-7 rounded-full border border-white/10" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-outline uppercase tracking-widest">主推造型</label>
                  <p className="text-sm text-on-surface mt-1">{season.heroOutfit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-outline uppercase">配色</span>
                  <span className="font-mono text-xs" style={{ color: season.accentColor }}>{season.colorFormula}</span>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-primary/70 uppercase tracking-widest">避雷</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {season.avoid.map((a) => (
                      <span key={a} className="text-[10px] font-mono text-primary/60 px-1.5 py-0.5 border border-primary/20">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-xs text-on-surface-variant italic">"{season.summary}"</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function ResultPage() {
  const params = useParams();
  const tool = (params.tool as string) || "personal-color";
  const stored = useStoredResult(tool);
  const meta = RESULT_META[tool] || { title: "分析报告", subtitle: "ANALYSIS COMPLETE", accentColor: "#ffabf3", matchScore: 85 };
  const [copied, setCopied] = useState(false);

  const copyResult = () => {
    const text = `${meta.title} | 匹配度: ${meta.matchScore}% | ${window.location.href}`;
    navigator.clipboard.writeText(text);
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
            <span className="font-mono text-[11px] uppercase font-bold" style={{ color: meta.accentColor }}>
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

        {/* ── PALM READING ── */}
        {tool === "palm-reading" && (
          <div className="space-y-6">
            {(stored as any).reportImage && (
              <div className="border border-white/10 overflow-hidden rounded-xl">
                <img src={(stored as any).reportImage} alt="掌相玄学分析报告图" className="w-full" />
              </div>
            )}
            {!((stored as any).reportImage) && stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="掌纹" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            {!((stored as any).reportImage) && (
              <>
                <DataBox label="掌心纹路" value="生命线深刻，情感线柔和，智慧线发达" verified accentColor="green" />
                <DataBox label="命运曲线" value="中期上升，短期调整，长期平稳" accentColor="orange" />
                <DataBox label="性格解码" value="独立思考型，创造力强，适应力极佳" accentColor="orange" />
              </>
            )}
            <div className="p-4 border border-white/10">
              <p className="text-sm text-on-surface-variant">掌心占卜仅供娱乐参考。真正的命运掌握在自己手中，AI 分析可帮助你更好地了解自我特质。</p>
            </div>
          </div>
        )}

        {/* ── STYLE ANALYZER ── */}
        {tool === "style-analyzer" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="全身照" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">风格方向</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.styleDirection}</div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div><div className="font-mono text-[10px] text-outline uppercase">体型</div><div className="text-sm font-bold">{ea.bodyType}</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">肤色</div><div className="text-sm font-bold">{ea.skinTone}</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">季节型</div><div className="text-sm font-bold">{ea.seasonType}</div></div>
                  </div>
                </div>
                {/* Best Colors */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 最佳用色</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {(ea.bestColors as Array<{name:string;hex?:string;effect?:string}> || []).map((c) => (
                      <div key={c.name} className="border border-white/10 p-2 text-center">
                        <div className="w-8 h-8 rounded-full mx-auto mb-1 border border-white/20" style={{ backgroundColor: c.hex || "#888" }} />
                        <div className="text-xs font-bold">{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Avoid Colors */}
                {(ea.avoidColors as Array<{name:string;reason?:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避用颜色</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.avoidColors as Array<{name:string;reason?:string}> || []).map((c) => (
                        <span key={c.name} className="px-3 py-1 border border-red-500/30 text-xs text-red-400 bg-red-500/5">{c.name}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Recommendations */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-white/10 p-4">
                    <label className="font-mono text-[10px] text-outline uppercase mb-2 block">上衣推荐</label>
                    <div className="space-y-1">
                      {(ea.recommendedTops as string[] || []).slice(0,4).map((t) => (
                        <div key={t} className="text-xs text-on-surface-variant flex items-center gap-1"><span className="text-green-400">✓</span>{t}</div>
                      ))}
                    </div>
                  </div>
                  <div className="border border-white/10 p-4">
                    <label className="font-mono text-[10px] text-outline uppercase mb-2 block">下装推荐</label>
                    <div className="space-y-1">
                      {(ea.recommendedBottoms as string[] || []).slice(0,4).map((t) => (
                        <div key={t} className="text-xs text-on-surface-variant flex items-center gap-1"><span className="text-green-400">✓</span>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Outfit Ideas */}
                {(ea.outfitIdeas as Array<{scene:string;look:string;items?:string[]}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 穿搭方案</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(ea.outfitIdeas as Array<{scene:string;look:string;items?:string[]}> || []).map((o) => (
                        <div key={o.scene} className="border border-white/10 p-3">
                          <div className="text-sm font-bold mb-1" style={{ color: meta.accentColor }}>{o.scene}</div>
                          <div className="text-xs text-on-surface-variant mb-2">{o.look}</div>
                          <div className="flex flex-wrap gap-1">
                            {(o.items || []).map((item) => (
                              <span key={item} className="text-[10px] px-2 py-0.5 border border-white/10 bg-white/[0.03]">{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Style Correlation */}
                {(ea.styleCorrelation as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◇ 关联风格</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.styleCorrelation as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专业建议</label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).slice(0,5).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="风格定位" value="赛博机能风" verified accentColor="green" />
                <DataBox label="轮廓类型" value="直线型 · 宽肩窄腰" accentColor="orange" />
                <DataBox label="色彩倾向" value="深空黑 + 霓虹粉 + 翡翠绿" accentColor="orange" />
                <DataBox label="核心特质" value="未来感 · 锐利 · 极简主义" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── LIPSTICK RECOMMENDATION ── */}
        {tool === "lipstick-recommendation" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="唇部" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">肤色判断</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.skinTone}</div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div><div className="font-mono text-[10px] text-outline uppercase">肤色基调</div><div className="text-sm font-bold">{ea.undertone}</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">唇部状态</div><div className="text-sm font-bold">{ea.lipCondition}</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">匹配度</div><div className="text-sm font-bold">{ea.matchScore}%</div></div>
                  </div>
                </div>
                {/* Recommended Shades */}
                {(ea.recommendedShades as Array<{name:string;color:string;hex?:string;finish?:string;scene?:string;avoid?:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 推荐色号</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(ea.recommendedShades as Array<{name:string;color:string;hex?:string;finish?:string;scene?:string;avoid?:string}> || []).map((s) => (
                        <div key={s.name} className="border border-white/10 p-3 flex gap-3">
                          <div className="w-12 h-12 rounded-full flex-shrink-0 border border-white/20" style={{ backgroundColor: s.hex || "#888" }} />
                          <div>
                            <div className="text-sm font-bold mb-1">{s.name}</div>
                            <div className="text-xs text-on-surface-variant mb-1">{s.color} · {s.finish}</div>
                            <div className="text-xs text-primary/70">场景：{s.scene}</div>
                            {s.avoid && <div className="text-[10px] text-red-400/70">避：{s.avoid}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Avoid Shades */}
                {(ea.avoidShades as Array<{name:string;color:string;hex?:string;reason?:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避用色号</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {(ea.avoidShades as Array<{name:string;color:string;hex?:string;reason?:string}> || []).map((s) => (
                        <div key={s.name} className="border border-red-500/30 p-2 bg-red-500/5">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: s.hex || "#888" }} />
                            <span className="text-xs font-bold text-red-400">{s.name}</span>
                          </div>
                          <div className="text-[10px] text-red-400/70">{s.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Lip Care */}
                {(ea.lipCare as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 唇部护理</label>
                    <div className="space-y-2">
                      {(ea.lipCare as string[] || []).map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                          <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                          <span className="text-sm text-on-surface-variant">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Style Correlation */}
                {(ea.styleCorrelation as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◇ 关联风格</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.styleCorrelation as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专业建议</label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).slice(0,5).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="推荐色系" value="暖调玫瑰 / 肉桂棕 / 焦糖橘" verified accentColor="pink" />
                <DataBox label="最适合场合" value="日常通勤 · 约会 · 派对" accentColor="orange" />
                <DataBox label="质地推荐" value="缎光质感，不宜纯雾面" accentColor="pink" />
                <DataBox label="避用色号" value="冷调玫粉 · 荧光橘" accentColor="pink" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── IMAGE DIAGNOSIS ── */}
        {tool === "image-diagnosis" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="形象照" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">升级方向</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.styleDirection}</div>
                  <div className="font-mono text-[10px] text-outline uppercase mb-1">匹配指数</div>
                  <div className="text-lg font-bold">{ea.matchScore}%</div>
                </div>
                {/* Key Upgrades */}
                {(ea.keyUpgrades as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 核心变化点</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(ea.keyUpgrades as string[] || []).map((u, i) => (
                        <div key={i} className="border border-white/10 p-3 text-center">
                          <div className="text-xs font-mono text-outline mb-1">{String(i+1).padStart(2,'0')}</div>
                          <div className="text-sm font-bold">{u}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Color Palette */}
                {ea.colorPalette && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 配色方案</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["dominant","accent","avoid"].map((role) => {
                        const colors = (ea.colorPalette as Record<string,string[]>)[role] || [];
                        const label = role === "dominant" ? "主色" : role === "accent" ? "辅助色" : "避用色";
                        const cls = role === "avoid" ? "border-red-500/30 bg-red-500/5" : "border-white/10";
                        return (
                          <div key={role} className={`border p-3 ${cls}`}>
                            <div className="font-mono text-[10px] text-outline uppercase mb-2">{label}</div>
                            <div className="flex flex-wrap gap-1">
                              {colors.map((c) => (
                                <span key={c} className="text-[10px] px-2 py-0.5 border border-white/10">{c}</span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* Silhouette Strategies */}
                {(ea.silhouetteStrategies as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 廓形策略</label>
                    <div className="space-y-2">
                      {(ea.silhouetteStrategies as string[] || []).map((s, i) => (
                        <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                          <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                          <span className="text-sm text-on-surface-variant">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Outfit Ideas */}
                {(ea.outfitIdeas as Array<{scene:string;desc:string;items?:string[]}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 推荐穿搭</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(ea.outfitIdeas as Array<{scene:string;desc:string;items?:string[]}> || []).map((o) => (
                        <div key={o.scene} className="border border-white/10 p-3">
                          <div className="text-sm font-bold mb-1" style={{ color: meta.accentColor }}>{o.scene}</div>
                          <div className="text-xs text-on-surface-variant mb-2">{o.desc}</div>
                          <div className="flex flex-wrap gap-1">
                            {(o.items || []).map((item) => (
                              <span key={item} className="text-[10px] px-2 py-0.5 border border-white/10 bg-white/[0.03]">{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Avoid Styles */}
                {(ea.avoidStyles as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避坑穿搭</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.avoidStyles as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border border-red-500/30 text-xs text-red-400 bg-red-500/5">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专业建议</label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).slice(0,5).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="整体评分" value="89/100 · 优秀" verified accentColor="green" />
                <DataBox label="风格属性" value="都市机能 · 赛博朋克" accentColor="orange" />
                <DataBox label="体型分析" value="标准型 · 肩线清晰" accentColor="orange" />
                <DataBox label="形象建议" value="加强层次感，配饰点睛" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── SEASONAL OUTFIT ── */}
        {tool === "seasonal-outfit" && (
          <>
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-64 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="上传照片" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <SeasonalOutfitContent meta={meta} stored={stored} />
          </>
        )}

        {/* ── PERSONAL COLOR ── */}
        {tool === "personal-color" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="面部" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Core Metrics */}
                <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">肤色底调</div>
                    <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{ea.undertone}</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">四季类型</div>
                    <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{ea.seasonType}</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">肤色匹配</div>
                    <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{ea.skinToneMatch}%</div>
                  </div>
                </div>

                {/* Best Colors */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ✓ 推荐用色
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(ea.bestColors as Array<{name:string;hex:string;effect?:string}> || []).slice(0, 4).map((c) => (
                      <div key={c.name} className="flex flex-col items-center gap-1">
                        <div className="h-12 w-12 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                        <span className="text-[10px] font-mono text-on-surface-variant">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avoid Colors */}
                {ea.avoidColors && (ea.avoidColors as Array<{name:string;hex?:string;reason?:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                      ✗ 避用颜色
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(ea.avoidColors as Array<{name:string;hex?:string;reason?:string}> || []).map((c) => (
                        <div key={c.name} className="border border-red-500/30 px-3 py-2 bg-red-500/5 flex items-center gap-2">
                          {c.hex && <div className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0" style={{ backgroundColor: c.hex }} />}
                          <span className="text-red-400 text-xs">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Formulas */}
                {ea.recommendedFormulas && (ea.recommendedFormulas as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                      ◇ 配色公式
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(ea.recommendedFormulas as string[] || []).map((f) => (
                        <div key={f} className="border border-white/10 px-3 py-2">
                          <span className="text-sm text-on-surface">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◆ 专业建议
                  </label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Correlation */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◇ 关联穿搭风格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(ea.styleCorrelation as string[] || []).map((style) => (
                      <span key={style} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Knowledge Source */}
                <div className="border border-white/5 p-4 bg-white/[0.02]">
                  <div className="font-mono text-[10px] text-outline uppercase mb-2">知识库来源</div>
                  <div className="flex flex-wrap gap-2">
                    {(ea.knowledgeSource as string[] || []).map((src) => (
                      <span key={src} className="text-[10px] font-mono text-on-surface-variant/60">{src}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">肤色底调</div>
                    <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{stored.mock ? "暖皮" : (stored.undertone as string) || "暖皮"}</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">四季类型</div>
                    <div className="text-xl font-bold" style={{ color: meta.accentColor }}>{stored.mock ? "深秋型" : (stored.seasonType as string) || "深秋型"}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "琥珀金", hex: "#D4A373" }, { name: "焦糖棕", hex: "#8B4513" },
                    { name: "暗红", hex: "#8B0000" }, { name: "深牛仔蓝", hex: "#2F4F4F" }
                  ].map((c) => (
                    <div key={c.name} className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-full border border-white/10" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] font-mono text-on-surface-variant">{c.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          );
        })()}

        {/* ── NEON STREET SYNDICATE (OUTFIT ANALYSIS) ── */}
        {tool === "neon-street-syndicate" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="穿搭照" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">穿搭方向</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.styleDirection}</div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div><div className="font-mono text-[10px] text-outline uppercase">穿搭评分</div><div className="text-sm font-bold">{ea.outfitScore}%</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">体型</div><div className="text-sm font-bold">{ea.bodyType}</div></div>
                    <div><div className="font-mono text-[10px] text-outline uppercase">推荐风格</div><div className="text-sm font-bold">{ea.recommendedStyle}</div></div>
                  </div>
                </div>
                {/* Color Palette */}
                {ea.colorPalette && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专属配色</label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(ea.colorPalette as Record<string,string[]>).map(([role, colors]) => (
                        <div key={role} className={`border p-3 ${role === "avoid" ? "border-red-500/30 bg-red-500/5" : "border-white/10"}`}>
                          <div className="font-mono text-[10px] text-outline uppercase mb-2">{role === "dominant" ? "主色" : role === "accent" ? "辅助色" : "避用"}</div>
                          <div className="flex flex-wrap gap-1">
                            {(colors as string[]).map((c) => (
                              <span key={c} className="text-[10px] px-2 py-0.5 border border-white/10">{c}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Outfit Ideas */}
                {(ea.outfitIdeas as Array<{scene:string;look:string;items?:string[]}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 穿搭方案</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(ea.outfitIdeas as Array<{scene:string;look:string;items?:string[]}> || []).map((o) => (
                        <div key={o.scene} className="border border-white/10 p-3">
                          <div className="text-sm font-bold mb-1" style={{ color: meta.accentColor }}>{o.scene}</div>
                          <div className="text-xs text-on-surface-variant mb-2">{o.look}</div>
                          <div className="flex flex-wrap gap-1">
                            {(o.items || []).map((item) => (
                              <span key={item} className="text-[10px] px-2 py-0.5 border border-white/10 bg-white/[0.03]">{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Avoid Styles */}
                {(ea.avoidStyles as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避坑穿搭</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.avoidStyles as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border border-red-500/30 text-xs text-red-400 bg-red-500/5">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Style Correlation */}
                {(ea.styleCorrelation as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◇ 关联风格</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.styleCorrelation as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专业建议</label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).slice(0,5).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="穿搭指数" value="92/100 · 时尚达人" verified accentColor="pink" />
                <DataBox label="推荐风格" value="韩系温柔风 · 清冷高级感" accentColor="orange" />
                <DataBox label="配色方案" value="米白 + 雾霾蓝 + 焦糖棕" accentColor="orange" />
                <DataBox label="避雷穿搭" value="全身大logo · 过于宽松 · 荧光色" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── HARDWARE IMPLANT FACTION (ACCESSORY ANALYSIS) ── */}
        {tool === "hardware-implant-faction" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="配饰照" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">脸型分析</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.faceShape}</div>
                  <div className="font-mono text-[10px] text-outline uppercase mb-1">适配指数</div>
                  <div className="text-lg font-bold">{ea.faceShapeMatch}%</div>
                </div>
                {/* Recommended Frames */}
                {(ea.recommendedFrames as Array<{type:string;material:string;color:string;reason:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 推荐镜框</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(ea.recommendedFrames as Array<{type:string;material:string;color:string;reason:string}> || []).map((f) => (
                        <div key={f.type} className="border border-white/10 p-3">
                          <div className="text-sm font-bold mb-1" style={{ color: meta.accentColor }}>{f.type}</div>
                          <div className="text-xs text-on-surface-variant mb-1">材质：{f.material} · 颜色：{f.color}</div>
                          <div className="text-xs text-on-surface-variant/70">{f.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Avoid Frames */}
                {(ea.avoidFrames as Array<{type:string;reason:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避用镜框</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.avoidFrames as Array<{type:string;reason:string}> || []).map((f) => (
                        <span key={f.type} className="px-3 py-1 border border-red-500/30 text-xs text-red-400 bg-red-500/5">{f.type}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Color & Size Suggestions */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-white/10 p-4">
                    <label className="font-mono text-[10px] text-outline uppercase mb-2 block">配色建议</label>
                    <div className="space-y-1">
                      {(ea.colorSuggestions as string[] || []).map((c) => (
                        <div key={c} className="text-xs text-on-surface-variant flex items-center gap-1"><span className="text-primary" style={{ color: meta.accentColor }}>◆</span>{c}</div>
                      ))}
                    </div>
                  </div>
                  <div className="border border-white/10 p-4">
                    <label className="font-mono text-[10px] text-outline uppercase mb-2 block">尺寸建议</label>
                    <div className="space-y-1">
                      {(ea.sizeSuggestions as string[] || []).map((s) => (
                        <div key={s} className="text-xs text-on-surface-variant flex items-center gap-1"><span className="text-primary" style={{ color: meta.accentColor }}>◆</span>{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Matching Styles */}
                {(ea.matchingStyles as string[] || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◇ 适合风格</label>
                    <div className="flex flex-wrap gap-2">
                      {(ea.matchingStyles as string[] || []).map((s) => (
                        <span key={s} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">◆ 专业建议</label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).slice(0,5).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="脸型分析" value="鹅蛋脸 · 五官匀称" verified accentColor="green" />
                <DataBox label="推荐镜框" value="圆框 · 半框 · 金属细框" accentColor="orange" />
                <DataBox label="避雷镜框" value="超大方框 · 粗黑板材 · 猫眼框" accentColor="orange" />
                <DataBox label="配色建议" value="金框 + 银框 + 透明框" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── MAKEUP ANALYSIS ── */}
        {tool === "makeup-analysis" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="妆容照" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Style header */}
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">整体妆容风格</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{ea.overallStyle}</div>
                  <div className="font-mono text-[10px] text-outline uppercase mb-1">风格匹配</div>
                  <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.matchScore}%</div>
                </div>

                {/* Detail grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {[
                    { label: "底妆", value: ea.foundation?.type, sub: ea.foundation?.description, avoid: ea.foundation?.avoid },
                    { label: "眉形", value: ea.brows?.shape, sub: `${ea.brows?.color} · ${ea.brows?.direction}`, avoid: ea.brows?.avoid },
                    { label: "眼妆", value: ea.eye?.eyeshadow, sub: `${ea.eye?.liner} · ${ea.eye?.intensity}`, avoid: ea.eye?.avoid },
                    { label: "腮红", value: ea.blush?.color, sub: ea.blush?.position, avoid: ea.blush?.avoid },
                    { label: "修容", value: ea.contour?.zone, sub: ea.contour?.color, avoid: ea.contour?.avoid },
                    { label: "唇妆", value: ea.lip?.color, sub: `${ea.lip?.texture} · ${ea.lip?.shape}`, avoid: ea.lip?.avoid },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/10 p-3">
                      <div className="font-mono text-[10px] text-outline uppercase mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-on-surface mb-1">{item.value || "—"}</div>
                      <div className="text-[10px] text-on-surface-variant mb-1">{item.sub || ""}</div>
                      <div className="text-[10px] text-primary/70">{item.avoid || ""}</div>
                    </div>
                  ))}
                </div>

                {/* Best Looks */}
                {ea.bestLooks && (ea.bestLooks as Array<{label:string;desc:string;image?:string}> || []).length > 0 && (
                  <div className="mb-8">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-4 block">最佳妆容参考</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(ea.bestLooks as Array<{label:string;desc:string;image?:string}> || []).map((look) => (
                        <div key={look.label} className="border border-green-500/30 overflow-hidden">
                          <div className="relative h-40 overflow-hidden">
                            {look.image && <img src={look.image} alt={look.label} className="w-full h-full object-cover" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold text-green-400 bg-green-500/20">最适合</span>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-on-surface-variant">{look.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Avoid Looks */}
                {ea.avoidLooks && (ea.avoidLooks as Array<{label:string;desc:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">✗ 避雷妆容</label>
                    <div className="space-y-2">
                      {(ea.avoidLooks as Array<{label:string;desc:string}> || []).map((look, i) => (
                        <div key={i} className="border border-red-500/30 px-3 py-2 bg-red-500/5">
                          <span className="text-red-400 text-sm">{look.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◆ 专业建议
                  </label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Correlation */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◇ 关联穿搭风格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(ea.styleCorrelation as string[] || []).map((style) => (
                      <span key={style} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Knowledge Source */}
                <div className="border border-white/5 p-4 bg-white/[0.02]">
                  <div className="font-mono text-[10px] text-outline uppercase mb-2">知识库来源</div>
                  <div className="flex flex-wrap gap-2">
                    {(ea.knowledgeSource as string[] || []).map((src) => (
                      <span key={src} className="text-[10px] font-mono text-on-surface-variant/60">{src}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 p-6 border text-center" style={{ borderColor: `${meta.accentColor}30` }}>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-2">整体妆容风格</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: meta.accentColor }}>{MAKEUP_RESULT.overallStyle}</div>
                  <p className="text-sm text-on-surface-variant">{MAKEUP_RESULT.overallDesc}</p>
                </div>
                {/* Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "best", data: MAKEUP_RESULT.comparison.best, color: "#ecffe3", tagColor: "text-green-400", borderColor: "border-green-400/30" },
                    { key: "good", data: MAKEUP_RESULT.comparison.good, color: "#fbbf24", tagColor: "text-yellow-400", borderColor: "border-yellow-400/30" },
                    { key: "avoid", data: MAKEUP_RESULT.comparison.avoid, color: "#f87171", tagColor: "text-red-400", borderColor: "border-red-400/30" },
                  ].map(({ key, data, color, tagColor, borderColor }) => (
                    <div key={key} className={`border ${borderColor} overflow-hidden`}>
                      <div className="relative h-40 overflow-hidden">
                        <img src={data.image} alt={data.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono font-bold ${tagColor}`} style={{ backgroundColor: `${color}20` }}>
                          {data.label}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-on-surface-variant">{data.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                  {[
                    { label: "底妆", value: MAKEUP_RESULT.foundation.type, sub: MAKEUP_RESULT.foundation.description, avoid: MAKEUP_RESULT.foundation.avoid },
                    { label: "眉形", value: MAKEUP_RESULT.brows.shape, sub: `${MAKEUP_RESULT.brows.color} · ${MAKEUP_RESULT.brows.direction}`, avoid: MAKEUP_RESULT.brows.avoid },
                    { label: "眼妆", value: MAKEUP_RESULT.eye.eyeshadow, sub: `${MAKEUP_RESULT.eye.liner} · ${MAKEUP_RESULT.eye.intensity}`, avoid: MAKEUP_RESULT.eye.avoid },
                    { label: "腮红", value: MAKEUP_RESULT.blush.color, sub: MAKEUP_RESULT.blush.position, avoid: MAKEUP_RESULT.blush.avoid },
                    { label: "修容", value: MAKEUP_RESULT.contour.color, sub: MAKEUP_RESULT.contour.zone, avoid: MAKEUP_RESULT.contour.avoid },
                    { label: "唇妆", value: MAKEUP_RESULT.lip.color, sub: `${MAKEUP_RESULT.lip.texture} · ${MAKEUP_RESULT.lip.shape}`, avoid: MAKEUP_RESULT.lip.avoid },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/10 p-3">
                      <div className="font-mono text-[10px] text-outline uppercase mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-on-surface mb-1">{item.value}</div>
                      <div className="text-[10px] text-on-surface-variant mb-1">{item.sub}</div>
                      <div className="text-[10px] text-primary/70">{item.avoid}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          );
        })()}

        {/* ── EYEBROW ANALYSIS ── */}
        {tool === "eyebrow-analysis" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="面部" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Face Shape + Match Score */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">脸型判断</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.faceShape}</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">适配指数</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.faceShapeMatch}%</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">修眉难度</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.stylingDifficulty}</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">维护周期</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.maintenanceCycle}</div>
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "眉毛浓密度", value: ea.browDensity, icon: "◉" },
                    { label: "毛流方向", value: ea.browDirection, icon: "↗" },
                    { label: "左右对称度", value: ea.browSymmetry, icon: "◎" },
                    { label: "眉眼间距", value: ea.browEyeDistance, icon: "⇕" },
                    { label: "推荐眉色", value: ea.browColors?.slice(0,2).join(" · "), icon: "◐" },
                    { label: "关联风格", value: ea.styleCorrelation?.slice(0,2).join(" · "), icon: "◆" },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/10 p-3 flex items-start gap-2">
                      <span className="text-primary mt-0.5" style={{ color: meta.accentColor }}>{item.icon}</span>
                      <div>
                        <div className="font-mono text-[10px] text-outline uppercase">{item.label}</div>
                        <div className="text-sm font-bold text-on-surface mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Brow Shapes */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ✓ 推荐眉形
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(ea.recommendedBrowShapes as string[] || []).map((shape) => (
                      <div key={shape} className="border border-green-500/30 px-3 py-2 bg-green-500/5">
                        <span className="text-green-400 text-sm font-bold">{shape}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avoid Brow Shapes */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ✗ 避雷眉形
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(ea.avoidBrowShapes as string[] || []).map((shape) => (
                      <div key={shape} className="border border-red-500/30 px-3 py-2 bg-red-500/5">
                        <span className="text-red-400 text-sm">{shape}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◆ 专业建议
                  </label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Correlation */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◇ 关联穿搭风格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(ea.styleCorrelation as string[] || []).map((style) => (
                      <span key={style} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Knowledge Source */}
                <div className="border border-white/5 p-4 bg-white/[0.02]">
                  <div className="font-mono text-[10px] text-outline uppercase mb-2">知识库来源</div>
                  <div className="flex flex-wrap gap-2">
                    {(ea.knowledgeSource as string[] || []).map((src) => (
                      <span key={src} className="text-[10px] font-mono text-on-surface-variant/60">{src}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Fallback when no enhancedAnalysis */
              <>
                <DataBox label="眉形建议" value="自然弧形眉 · 眉头虚实过渡" verified accentColor="green" />
                <DataBox label="眉峰高度" value="微挑 · 自然转折 · 不夸张" accentColor="orange" />
                <DataBox label="眉尾长度" value="自然延伸 · 不过短" accentColor="orange" />
                <DataBox label="推荐眉色" value="自然黑 · 深棕 · 柔和棕" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}

        {/* ── HAIR ANALYSIS ── */}
        {tool === "hair-analysis" && (() => {
          const ea = (stored as any).enhancedAnalysis as Record<string, any> | undefined;
          return (
          <div className="space-y-6">
            {/* User Photo */}
            {stored.photoDataUrl && (
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: `${meta.accentColor}50` }}>
                  <img src={stored.photoDataUrl} alt="面部" className="w-full h-full object-cover" />
                  {stored.mock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="text-xs font-mono text-secondary">[ MOCK MODE ]</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ea ? (
              <>
                {/* Core Metrics 4-grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">脸型</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.faceShape}</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">脸型匹配</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.faceShapeMatch}%</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">打理难度</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.stylingDifficulty}</div>
                  </div>
                  <div className="border border-white/10 p-4 text-center">
                    <div className="font-mono text-[10px] text-outline uppercase tracking-widest mb-1">维护周期</div>
                    <div className="text-lg font-bold" style={{ color: meta.accentColor }}>{ea.maintenanceCycle}</div>
                  </div>
                </div>

                {/* Recommended Hairstyles */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ✓ 推荐发型
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(ea.recommendedHairstyles as string[] || []).map((shape) => (
                      <div key={shape} className="border border-green-500/30 px-3 py-2 bg-green-500/5">
                        <span className="text-green-400 text-sm font-bold">{shape}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avoid Hairstyles */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ✗ 避雷发型
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(ea.avoidHairstyles as string[] || []).map((shape) => (
                      <div key={shape} className="border border-red-500/30 px-3 py-2 bg-red-500/5">
                        <span className="text-red-400 text-sm">{shape}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "推荐发长", value: ea.recommendedHairLengths?.slice(0,2).join(" · "), icon: "↕" },
                    { label: "推荐发色", value: ea.hairColors?.slice(0,2).join(" · "), icon: "◐" },
                    { label: "发质要求", value: ea.hairTextures?.slice(0,2).join(" · "), icon: "~" },
                    { label: "关联风格", value: ea.styleCorrelation?.slice(0,2).join(" · "), icon: "◆" },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/10 p-3 flex items-start gap-2">
                      <span className="text-primary mt-0.5" style={{ color: meta.accentColor }}>{item.icon}</span>
                      <div>
                        <div className="font-mono text-[10px] text-outline uppercase">{item.label}</div>
                        <div className="text-sm font-bold text-on-surface mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expert Tips */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◆ 专业建议
                  </label>
                  <div className="space-y-2">
                    {(ea.expertTips as string[] || []).map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 border border-white/5 p-3">
                        <span className="text-primary font-mono text-xs mt-0.5" style={{ color: meta.accentColor }}>→</span>
                        <span className="text-sm text-on-surface-variant">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Correlation */}
                <div className="mb-6">
                  <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                    ◇ 关联穿搭风格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(ea.styleCorrelation as string[] || []).map((style) => (
                      <span key={style} className="px-3 py-1 border text-xs font-mono" style={{ borderColor: `${meta.accentColor}40`, color: meta.accentColor }}>
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hair Products */}
                {(ea.hairProducts as Array<{name:string;priceRange:string}> || []).length > 0 && (
                  <div className="mb-6">
                    <label className="font-mono text-[11px] text-outline uppercase tracking-widest mb-3 block">
                      ◇ 造型好物
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {(ea.hairProducts as Array<{name:string;priceRange:string}> || []).map((p) => (
                        <div key={p.name} className="border border-white/10 px-3 py-2">
                          <span className="text-sm text-on-surface font-bold">{p.name}</span>
                          <span className="text-xs text-outline ml-2">{p.priceRange}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Knowledge Source */}
                <div className="border border-white/5 p-4 bg-white/[0.02]">
                  <div className="font-mono text-[10px] text-outline uppercase mb-2">知识库来源</div>
                  <div className="flex flex-wrap gap-2">
                    {(ea.knowledgeSource as string[] || []).map((src) => (
                      <span key={src} className="text-[10px] font-mono text-on-surface-variant/60">{src}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataBox label="推荐发型" value="锁骨发 · 高层次 · 法式刘海" verified accentColor="green" />
                <DataBox label="推荐卷度" value="微卷 · 自然蓬松感" accentColor="orange" />
                <DataBox label="推荐发色" value="暖棕 · 焦糖 · 蜂蜜茶色" accentColor="orange" />
                <DataBox label="避雷发型" value="超短男仔头 · 厚重齐刘海 · 全黑直发" accentColor="orange" />
              </>
            )}
          </div>
          );
        })()}
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
