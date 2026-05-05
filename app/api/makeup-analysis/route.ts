import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";

const MAKEUP_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人妆容分析报告」资讯图表。

请先根据人物五官比例、肤色基调、脸型、气质量感，进行专业妆容分析，再将分析结果可视化输出为最终海报。

分析维度（每个维度需包含：推荐 + 避用说明）：
① 底妆：粉底类型（光泽肌/奶油肌/哑光肌）+ 色调选择 + 避用
② 眉毛：眉形推荐 + 颜色 + 描画方向 + 避用眉形
③ 眼妆：眼影色系 + 眼线风格 + 睫毛重点 + 眼妆避用雷区
④ 腮红：颜色推荐 + 位置打法 + 避用
⑤ 修容：重点区域 + 颜色选择 + 避用
⑥ 唇妆：色系推荐 + 质地选择 + 适合唇形 + 避用色号

另需展示：最适合妆容风格标签（如"韩系清透轻熟妆"/"泰式混血妆"/"日杂氛围妆"）+ 整体风格描述 + 妆容对比参考图（最适合/普通/不建议三档并排对比）

整体风格采用清新高级手帐风报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签和要点，不要长段落说明。版面需像专业化妆师制作的专属妆容分析报告，图片比例为竖版海报（4:5），高解析度。`;

// Makeup style recommendations by face shape / skin tone
const MAKEUP_BY_TYPE: Record<string, {
  overallStyle: string;
  foundation: { type: string; description: string; avoid: string };
  brows: { shape: string; color: string; direction: string; avoid: string };
  eye: { eyeshadow: string; liner: string; intensity: string; avoid: string };
  blush: { color: string; position: string; avoid: string };
  contour: { zone: string; color: string; avoid: string };
  lip: { color: string; texture: string; shape: string; avoid: string };
  expertTips: string[];
}> = {
  暖皮: {
    overallStyle: "韩系清透轻熟妆",
    foundation: { type: "奶油肌", description: "微光泽感奶油肌底妆，保留皮肤自然质感", avoid: "雾面哑光底妆会显得干涩无生气" },
    brows: { shape: "自然弧形眉", color: "深棕/灰棕色", direction: "顺着原生眉流方向描补，眉头轻眉尾实", avoid: "过于平直的一字眉或过浓的黑眉" },
    eye: { eyeshadow: "暖棕色系（焦糖/摩卡/浅金）", liner: "内眼线 + 微上挑外眼线，不宜过粗", intensity: "自然清透，睫毛根部晕染为主", avoid: "蓝色/紫色/绿色等冷色眼影，过重烟熏妆" },
    blush: { color: "杏色/暖桃色/淡砖红", position: "颧骨偏内侧，轻扫至太阳穴方向", avoid: "高光感太强的腮红，颜色过深或位置过低" },
    contour: { zone: "颧骨下侧 + 鼻梁 + 发际线轻扫", color: "偏灰棕修容色，比肤色深2-3度", avoid: "发红的修容色，容易显脏" },
    lip: { color: "焦糖棕/肉桂色/豆沙色", texture: "缎光或微哑光，避免纯雾面显得干", shape: "自然唇形，可轻抹出边缘", avoid: "过浅的粉色或过深的正红，显得老气" },
    expertTips: ["底妆选暖调黄调", "眼影用棕色系", "腮红用砖红色", "口红选焦糖/暗红", "避免冷色调一切彩妆"],
  },
  冷皮: {
    overallStyle: "清冷感轻欧美妆",
    foundation: { type: "缎光肌", description: "带微微光泽感的缎光肌，有质感但不油亮", avoid: "过于哑光的底妆显得没有生气" },
    brows: { shape: "线条分明微挑眉", color: "灰棕/自然黑", direction: "顺着毛流，眉头根根分明", avoid: "过粗过黑的韩式平眉" },
    eye: { eyeshadow: "灰棕/炭灰/冷调大地色", liner: "全包眼线 + 微上挑，清晰不夸张", intensity: "自然晕染，有轮廓感", avoid: "粉色调眼影，暖调过强的颜色" },
    blush: { color: "玫瑰粉/冷调桃色/淡莓红", position: "颧骨偏外侧，轻扫", avoid: "橘色调腮红，暖桃色" },
    contour: { zone: "颧骨下侧 + 颞部 + 下颌线", color: "偏灰修容色，比肤色深2度", avoid: "发红或发黄的修容" },
    lip: { color: "玫瑰豆沙/冷调莓红/干枯玫瑰", texture: "缎光或丝绒，不宜纯雾面", shape: "清晰唇形，边缘干净", avoid: "过亮的橘色调口红" },
    expertTips: ["底妆选冷调粉调", "眼影用灰棕系", "腮红用冷粉", "口红选玫瑰豆沙", "避免暖色调一切彩妆"],
  },
  中性: {
    overallStyle: "日杂氛围感妆容",
    foundation: { type: "自然裸肌", description: "轻薄透气，保留原生皮肤质感，不追求完美无瑕", avoid: "过厚粉底导致假面感" },
    brows: { shape: "自然毛流感眉毛", color: "深棕/自然棕", direction: "顺着眉毛生长方向轻描", avoid: "边框感太重的画眉方式" },
    eye: { eyeshadow: "浅杏/香槟/淡粉棕", liner: "内眼线为主，轻轻拉出眼尾", intensity: "若有若无，强调睫毛存在感", avoid: "浓重烟熏妆，过深眼影" },
    blush: { color: "奶杏色/珊瑚粉/淡奶茶", position: "颧骨内侧与外侧之间，轻扫", avoid: "高饱和颜色，颜色过重" },
    contour: { zone: "颧骨下侧轻扫 + 鼻影", color: "淡灰色修容，轻轻带过", avoid: "修容过重导致轮廓不自然" },
    lip: { color: "奶茶色/裸粉色/淡肉桂", texture: "缎光或滋润型", shape: "自然唇形，不需要明显唇线", avoid: "过深或过艳的唇色" },
    expertTips: ["底妆轻薄为主", "眼影以暖调浅色为主", "腮红用淡色轻扫", "唇色以裸色奶茶色为主", "整体追求自然空气感"],
  },
};

const MAKEUP_STYLE_CORRELATION: Record<string, string[]> = {
  "韩系": ["Clean Fit", "韩式通勤", "简约高级感", "知识分子风"],
  "欧美": ["Streetwear", "Urban Outdoor", "高街", "美式休闲"],
  "日系": ["阿美咔叽", "City Boy", "日系叠穿", "宽松休闲"],
  "泰式": ["混血感", "轻欧美", "高对比", "精致感"],
};

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, skinTone, makeupAnalysis } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Read knowledge base
    const knowledge = getKnowledgeForTool("makeup-analysis");

    // Detect skin tone from analysis text
    const detectedTone = (skinTone || makeupAnalysis || "").includes("冷")
      ? "冷皮"
      : (skinTone || makeupAnalysis || "").includes("暖")
      ? "暖皮"
      : "中性";

    const makeupRec = MAKEUP_BY_TYPE[detectedTone] || MAKEUP_BY_TYPE["中性"];

    // Get style correlation
    let correlation: string[] = [];
    for (const [keyword, styles] of Object.entries(MAKEUP_STYLE_CORRELATION)) {
      if (makeupRec.overallStyle.includes(keyword)) {
        correlation = styles;
        break;
      }
    }
    if (correlation.length === 0) correlation = MAKEUP_STYLE_CORRELATION["韩系"];

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(MAKEUP_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600";
    }

    const enhancedAnalysis = {
      overallStyle: makeupRec.overallStyle,
      matchScore: Math.floor(75 + Math.random() * 20),
      foundation: makeupRec.foundation,
      brows: makeupRec.brows,
      eye: makeupRec.eye,
      blush: makeupRec.blush,
      contour: makeupRec.contour,
      lip: makeupRec.lip,
      bestLooks: [
        {
          label: "最适合",
          desc: `${makeupRec.overallStyle}：${makeupRec.foundation.type} + ${makeupRec.eye.eyeshadow}眼影 + ${makeupRec.lip.color}唇`,
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400",
        },
        {
          label: "普通",
          desc: "轻泰妆：略微加深的眼窝和小烟熏感",
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400",
        },
      ],
      avoidLooks: [
        { label: "不建议", desc: "浓重烟熏妆/冷粉色系：显得老气且失去辨识度" },
      ],
      styleCorrelation: correlation,
      expertTips: [...makeupRec.expertTips, ...(knowledge.avoidTips?.slice(0, 3) || [])],
      knowledgeSource: [
        "Obsidian/穿搭知识库/03-配色体系",
        "Obsidian/穿搭知识库/09-避坑自检",
      ],
    };

    return NextResponse.json({ reportImage, mock: mockMode, enhancedAnalysis });
  } catch (e) {
    console.error("makeup-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
