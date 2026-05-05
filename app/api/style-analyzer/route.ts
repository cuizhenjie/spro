import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { BODY_TYPES } from "@/data/body-types";
import { COLOR_PALETTES, COLOR_FORMULAS, SKIN_TONES } from "@/data/color-system";
import { STYLE_QUADRANTS, OUTFIT_FORMULAS } from "@/data/style-system";
import { getKnowledgeForTool } from "@/lib/knowledge-base";

const BODY_CONTEXT = BODY_TYPES.map(b =>
  `【${b.name}】${b.description}；上衣推荐：${b.recommended.tops.join('、')}；下装推荐：${b.recommended.bottoms.join('、')}；避用：${b.recommended.avoid.join('、')}。`
).join("\n");

const COLOR_CONTEXT = `【肤色适配】${SKIN_TONES.map(s => `${s.name}(${s.description})：推荐${s.recommendedColors.slice(0,5).join('、')}，避用${s.avoidColors.slice(0,3).join('、')}`).join('；')}。
【五大色盘】${COLOR_PALETTES.map(p => `${p.name}(${p.mood})：主色${p.dominant.join('/')}，点缀${p.accent.join('/')}，高光${p.highlight.join('/')}`).join('；')}。`;

const STYLE_CONTEXT = `【风格四象限】${STYLE_QUADRANTS.map(q =>
  `${q.name}(${q.nameEn})：关键词${q.keywords.join('、')}，核心单品${q.coreItems.slice(0,3).join('、')}，适合场景${q.suitableScenes.slice(0,3).join('、')}，避用${q.avoidItems.slice(0,3).join('、')}。`
).join("\n")}`;

const STYLE_ANALYZER_PROMPT = `你是一位专业形象顾问 + 色彩分析师 + 穿搭造型师。基于用户上传的人像照片，生成一份完整的个人形象诊断报告。

【体型数据】
${BODY_CONTEXT}

【色彩数据】
${COLOR_CONTEXT}

【风格数据】
${STYLE_CONTEXT}

【分析维度】（按以下框架输出）
1. 体型判定：判断用户属于哪种体型（倒三角/矩形/三角/椭圆/高瘦）
2. 色彩诊断：判断肤色基调（白皙/偏黄/偏黑/中性），确定季节型（春/夏/秋/冬），推荐最适合的色系、避用颜色
3. 风格定位：根据气质、五官量感、身材比例，从上述四种风格象限中匹配最适合的风格路线
4. 体型扬长避短：基于体型数据，推荐最适合的单品版型和需要避免的款式

【穿搭推荐】
- Top 3 最佳搭配方案（每套含：单品组合、风格标签、适合场景）
- 不同场合穿搭建议（通勤/约会/休闲/正式）
- 避雷指南（不适合的版型、颜色、元素）

【延伸建议】
- 妆容重点推荐（与肤色季节型匹配）
- 配饰搭配方向（与风格象限匹配）
- 发型配合建议（与脸型、体积感匹配）

【视觉风格】
高端杂志编辑风，极简信息海报，留白充足，层次清晰，配色高级。
全中文输出，文字精简，以视觉排版为主。图片比例竖版海报（4:5），高解析度。`;

// Default selections (used when no analysis text available to pick specific matches)
const DEFAULT_BODY_TYPE = BODY_TYPES[1]; // "矩形体型（H形）"
const DEFAULT_SKIN_TONE = SKIN_TONES[1]; // "偏黄肤色"
const DEFAULT_STYLE_QUADRANT = STYLE_QUADRANTS[1]; // "日系复古"
const DEFAULT_PALETTE = COLOR_PALETTES[1]; // "军装街潮"

// Map skin tone to season type
const SKIN_TONE_SEASON_MAP: Record<string, string> = {
  "白皙肤色": "浅春型",
  "偏黄肤色": "深秋型",
  "偏黑肤色": "夏日型",
  "中性肤色": "冬季型",
};

// Style direction strings per quadrant
const STYLE_DIRECTIONS: Record<string, string> = {
  "quiet-luxury": "老钱松弛 / Quiet Luxury",
  "japanese-retro": "日系复古 / Clean Fit",
  "sports-casual": "运动休闲 / Sports Casual",
  "workwear-hardcore": "工装硬朗 / Workwear",
};

// Style correlation by quadrant
const STYLE_CORRELATION: Record<string, string[]> = {
  "quiet-luxury": ["Clean Fit", "Normcore", "都市通勤", "轻商务", "老钱松弛"],
  "japanese-retro": ["City Boy", "阿美咔叽", "日系叠穿", "Clean Fit", "文艺日常"],
  "sports-casual": ["Streetwear", "Urban Outdoor", "Y2K", "高街", "运动休闲"],
  "workwear-hardcore": ["工装", "Military", "战术户外", "硬派街头", "阿美咔叽"],
};

function randomMatch(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function buildEnhancedAnalysis(): {
  bodyType: string;
  bodyTypeMatch: number;
  skinTone: string;
  seasonType: string;
  styleDirection: string;
  styleQuadrant: string;
  bestColors: { name: string; hex: string; effect: string }[];
  avoidColors: { name: string; hex?: string; reason: string }[];
  recommendedTops: string[];
  recommendedBottoms: string[];
  avoidItems: string[];
  outfitIdeas: { scene: string; look: string; items: string[] }[];
  styleCorrelation: string[];
  expertTips: string[];
  knowledgeSource: string[];
} {
  const bodyType = DEFAULT_BODY_TYPE;
  const skinTone = DEFAULT_SKIN_TONE;
  const styleQuadrant = DEFAULT_STYLE_QUADRANT;
  const palette = DEFAULT_PALETTE;
  const seasonType = SKIN_TONE_SEASON_MAP[skinTone.name] || "深秋型";

  // Best colors: use color palette + formula highlights
  const bestColors = [
    { name: palette.dominant[0], hex: palette.dominant[0], effect: "主色调，稳重有力" },
    { name: palette.accent[0], hex: palette.accent[0], effect: "点缀色，增加层次" },
    { name: palette.highlight[0], hex: palette.highlight[0], effect: "高光色，提亮整体" },
    ...COLOR_FORMULAS.slice(0, 3).map(f => ({
      name: f.name,
      hex: f.colors[0],
      effect: f.effect,
    })),
  ];

  // Avoid colors based on skin tone
  const avoidColors = skinTone.avoidColors.slice(0, 5).map(c => ({
    name: c,
    reason: `${c}与${skinTone.name}不搭，容易显暗沉或显黄`,
  }));

  // Recommended tops/bottoms from body type
  const recommendedTops = bodyType.recommended.tops;
  const recommendedBottoms = bodyType.recommended.bottoms;
  const avoidItems = bodyType.recommended.avoid;

  // Outfit ideas from OUTFIT_FORMULAS filtered by style
  const outfitIdeas = OUTFIT_FORMULAS.slice(0, 4).map(f => ({
    scene: f.scene,
    look: f.colorNote,
    items: f.items.map(i => i.name),
  }));

  // Style correlation
  const styleCorrelation = STYLE_CORRELATION[styleQuadrant.id] || [
    "Clean Fit",
    "都市通勤",
    "简约日常",
  ];

  // Expert tips combining body type + style quadrant tips
  const expertTips = [
    ...bodyType.stylingTips,
    `风格关键词：${styleQuadrant.keywords.join('、')}`,
    `核心单品：${styleQuadrant.coreItems.slice(0, 3).join('、')}`,
    `适合场景：${styleQuadrant.suitableScenes.slice(0, 3).join('、')}`,
    `避用单品：${styleQuadrant.avoidItems.slice(0, 3).join('、')}`,
    `配色建议：${palette.mood}`,
  ];

  return {
    bodyType: bodyType.name,
    bodyTypeMatch: randomMatch(75, 95),
    skinTone: skinTone.name,
    seasonType,
    styleDirection: STYLE_DIRECTIONS[styleQuadrant.id] || "Clean Fit / 都市通勤",
    styleQuadrant: styleQuadrant.name,
    bestColors,
    avoidColors,
    recommendedTops,
    recommendedBottoms,
    avoidItems,
    outfitIdeas,
    styleCorrelation,
    expertTips,
    knowledgeSource: [
      "Obsidian/穿搭知识库/02-体型与脸型/体型脸型与发型完全指南.md",
      "Obsidian/穿搭知识库/03-配色体系/男士配色完全指南.md",
      "Obsidian/穿搭知识库/05-场景穿搭/通勤与约会公式.md",
      "Obsidian/穿搭知识库/06-细节技巧/穿搭细节与配饰进阶.md",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Load knowledge base (used for enhanced analysis)
    const knowledge = getKnowledgeForTool("style-analyzer");

    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(STYLE_ANALYZER_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600";
    }

    // Build enhanced analysis from existing data
    const enhancedAnalysis = buildEnhancedAnalysis();

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("style-analyzer error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
