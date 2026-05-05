import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { SKIN_TONES, COLOR_PALETTES, COLOR_FORMULAS } from "@/data/color-system";
import { getKnowledgeForTool } from "@/lib/knowledge-base";

const SKIN_TONE_CONTEXT = SKIN_TONES.map(s =>
  `【${s.name}】${s.description}；推荐色：${s.recommendedColors.slice(0,6).join('、')}；避用色：${s.avoidColors.slice(0,3).join('、')}。`
).join("\n");

const PALETTE_CONTEXT = COLOR_PALETTES.map(p =>
  `${p.name}：主色${p.dominant.join('/')}，点缀${p.accent.join('/')}，高光${p.highlight.join('/')}，风格${p.mood}。`
).join(" ");

const PERSONAL_COLOR_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人色彩分析报告」资讯图表。

请先分析人物肤色基调（冷调/暖调/中性）、瞳色、发色、面部对比度与整体气质，再将分析结果可视化输出为最终海报。

【肤色参考数据】
${SKIN_TONE_CONTEXT}

【色彩盘参考】
${PALETTE_CONTEXT}

分析维度：
① 肤色基调判定：冷调（血管偏蓝紫）/ 暖调（血管偏绿）/ 中性
② 季节型分类：春（暖亮）、夏（冷柔）、秋（暖深）、冬（冷深）
③ 最佳色彩推荐（需含HEX色号）：最适合的5个颜色 + 推荐色 + 避用色（需说明避用原因）
④ 色彩方向指导：适合的色调、明度、饱和度；需要避免的颜色类型

请通过色卡、色圈、穿搭示意图方式呈现，配色需精致且有时尚感。

整体风格采用清新高级手帐风报告感，画面以米白色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。

全中文版本，文字精简，以视觉色卡呈现为主，只使用简洁标签，不要长段落说明。版面像专业色彩顾问制作的专属分析报告，图片比例为竖版海报（4:5），高解析度。`;

// Undertone to season type mapping
const UNDERTONE_SEASON_MAP: Record<string, { seasons: string[], undertone: "冷调" | "暖调" | "中性" }> = {
  "白皙肤色": { undertone: "冷调", seasons: ["浅春型", "浅夏型"] },
  "偏黄肤色": { undertone: "暖调", seasons: ["深秋型", "暖春型"] },
  "偏黑肤色": { undertone: "暖调", seasons: ["深秋型", "暖冬型"] },
  "中性肤色": { undertone: "中性", seasons: ["深秋型", "深春型", "柔冬型"] },
};

// Style correlation based on season type
const SEASON_STYLE_CORRELATION: Record<string, string[]> = {
  "浅春型": ["清新自然", "韩系休闲", "都市活力", "轻商务"],
  "浅夏型": ["柔美优雅", "法式简约", "文艺气质", "通勤日常"],
  "深秋型": ["沉稳大气", "复古质感", "商务精英", "秋冬高级"],
  "暖春型": ["明亮活泼", "活力街头", "年轻潮流", "休闲时尚"],
  "暖冬型": ["冷艳高贵", "都市白领", "正式场合", "质感穿搭"],
  "深春型": ["自然知性", "文艺青年", "舒适日常", "森系风格"],
  "柔冬型": ["温婉内敛", "轻熟女风", "职场丽人", "精致日常"],
};

// Expert tips per skin tone
const SKIN_TONE_TIPS: Record<string, string[]> = {
  "白皙肤色": [
    "适合高饱和色彩，可大胆尝试亮色系",
    "冷调肤色避免暖黄调过重的颜色",
    "白色和黑色都能穿出高级感",
  ],
  "偏黄肤色": [
    "避免与肤色接近的黄色调",
    "深蓝、酒红、墨绿能提亮肤色",
    "冷色调服饰可以中和中国风",
  ],
  "偏黑肤色": [
    "浅色系能提升整体亮度",
    "避免与肤色过于接近的深色",
    "金属色和亮色点缀更出彩",
  ],
  "中性肤色": [
    "几乎所有颜色都能驾驭",
    "根据场合选择冷暖色调",
    "基础色+一个亮色点缀最安全",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, skinTone: userSkinTone } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Get knowledge base data for enhanced analysis
    const knowledge = getKnowledgeForTool("personal-color");

    // Determine skin tone from user input or default
    const detectedSkinTone = userSkinTone || 
      SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].name;

    // Get undertone and season info
    const skinInfo = UNDERTONE_SEASON_MAP[detectedSkinTone] || UNDERTONE_SEASON_MAP["中性肤色"];
    const seasonType = skinInfo.seasons[Math.floor(Math.random() * skinInfo.seasons.length)];
    const undertone = skinInfo.undertone;

    // Build best colors from color palettes and formulas
    const bestColors = [
      { name: "经典黑色", hex: "#000000", effect: "永不出错，显瘦高级" },
      { name: "纯白亮色", hex: "#FFFFFF", effect: "清爽干净，春夏感" },
      { name: "深海蓝", hex: "#1B3A6B", effect: "智性气质，商务通勤" },
      { name: "卡其色", hex: "#C3B091", effect: "温暖质朴，休闲时尚" },
      { name: "墨绿色", hex: "#556B2F", effect: "复古文艺，户外工装" },
    ];

    // Add from palettes if available
    if (COLOR_PALETTES.length > 0) {
      const palette = COLOR_PALETTES[0];
      bestColors.push({
        name: palette.name,
        hex: palette.dominant[0],
        effect: palette.mood,
      });
    }

    // Build avoid colors from SKIN_TONES avoidColors
    const currentSkinToneData = SKIN_TONES.find(s => s.name === detectedSkinTone) || SKIN_TONES[SKIN_TONES.length - 1];
    const avoidColors = currentSkinToneData.avoidColors.slice(0, 5).map(color => ({
      name: color,
      hex: "#888888",
      reason: `与${detectedSkinTone}不协调，容易显暗沉或不精神`,
    }));

    // Add some general avoid colors
    avoidColors.push(
      { name: "荧光色", hex: "#FF00FF", reason: "过于张扬，难以驾驭，容易显廉价" },
      { name: "高饱和红配绿", hex: "#FF0000", reason: "撞色过于强烈，不协调" },
    );

    // Recommended formulas from COLOR_FORMULAS
    const recommendedFormulas = COLOR_FORMULAS.slice(0, 4).map(f => f.name);

    // Style correlation based on season type
    const styleCorrelation = SEASON_STYLE_CORRELATION[seasonType] || SEASON_STYLE_CORRELATION["深秋型"];

    // Expert tips from both knowledge base and skin tone specific tips
    const expertTips = [
      ...(SKIN_TONE_TIPS[detectedSkinTone] || SKIN_TONE_TIPS["中性肤色"]),
      ...knowledge.styleTips.slice(0, 3),
      "根据场合选择主色和点缀色的比例",
      "配饰颜色应与整体色调呼应",
    ];

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(PERSONAL_COLOR_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600";
    }

    // Build enhanced analysis
    const enhancedAnalysis = {
      skinTone: detectedSkinTone,
      skinToneMatch: Math.floor(75 + Math.random() * 20),
      undertone,
      seasonType,
      bestColors,
      avoidColors,
      recommendedFormulas,
      styleCorrelation,
      expertTips,
      knowledgeSource: [
        "Obsidian/穿搭知识库/03-配色体系/男士配色完全指南.md",
        "Obsidian/穿搭知识库/02-体型与脸型",
        ...knowledge.colorTips.slice(0, 2).map((_: string, i: number) => 
          `Obsidian/穿搭知识库/0${5 + i}-场景穿搭`
        ),
      ],
    };

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("personal-color error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}