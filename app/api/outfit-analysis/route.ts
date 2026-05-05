import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";
import { BODY_TYPES } from "@/data/body-types";
import { COLOR_FORMULAS, COLOR_PALETTES, STARTER_COLORS } from "@/data/color-system";
import { STYLE_QUADRANTS, OutfitFormula } from "@/data/style-system";

const OUTFIT_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人穿搭分析报告」资讯图表。请先根据人物真实五官、脸型、身形比例、肩型、头肩比、骨架感、腰线位置、整体量感、肤色与气质氛围，进行专业穿搭分析，再将分析结果直接可视化输出为最终海报。

请保留人物原本五官、脸型、肤色、身形比例与真实辨识度，不要AI换脸，不要网红脸，不要过度磨皮，不要失真，保持自然真实且高级的效果，像"高级版真实本人"。

请分析并展示：最适合的穿搭风格方向（韩系温柔风、小香风、法式慵懒风、轻熟知性风、清冷高级感、学院风等）、最适合的上衣版型、裙装方向、裤装版型、外套方向、领口类型，以及最适合的颜色搭配与材质感。

请重点说明哪些风格最提气质、显高级、显瘦显高、显贵气，哪些容易显土、显廉价、显胖、显矮或压气场。请通过左右或并排对比方式，清楚展示不同穿搭风格套用在本人身上的效果，明确区分「最适合 / 普通 / 不建议」，让人一眼看出最适合的穿搭方向。专属配色盘需精致高级，像专业形象顾问的搭配方案。

整体风格采用清新高级手绘手帐风＋专业形象顾问报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。不要淘宝详情页风，不要廉价模板感，不要AI网红海报感，不要过度花哨或高饱和设计。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签，不要长段落说明。版面需像专业穿搭顾问制作的专属穿搭分析报告，图片比例为竖版海报（4:5 或 A4），高解析度。`;

// Outfit recommendations by style direction
const OUTFIT_BY_STYLE: Record<string, {
  styleDirection: string;
  topRecommendation: string[];
  bottomRecommendation: string[];
  outerwearRecommendation: string[];
  shoesRecommendation: string[];
  accessoriesRecommendation: string[];
  avoidStyles: string[];
  expertTips: string[];
}> = {
  "韩系温柔风": {
    styleDirection: "韩系温柔风",
    topRecommendation: ["针织开衫", "柔软衬衫", "轻薄毛衣", "宽松T恤"],
    bottomRecommendation: ["高腰直筒裤", "百褶裙", "微喇裤", "浅色牛仔裤"],
    outerwearRecommendation: ["短款开衫", "轻薄风衣", "休闲西装", "棒针毛衣外套"],
    shoesRecommendation: ["小白鞋", "乐福鞋", "玛丽珍鞋", "帆布鞋"],
    accessoriesRecommendation: ["精致项链", "小巧耳钉", "帆布包", "细带手表"],
    avoidStyles: ["全身深色", "过于正式的职业装", "过度街头暗黑系"],
    expertTips: ["同色系搭配更温柔", "柔软面料提升亲和力", "高腰线拉长比例"],
  },
  "Clean Fit": {
    styleDirection: "Clean Fit / 都市通勤",
    topRecommendation: ["重磅白T", "亨利衫", "修身衬衫", "简洁针织衫"],
    bottomRecommendation: ["直筒卡其裤", "水洗牛仔裤", "修身西裤", "Chino裤"],
    outerwearRecommendation: ["工装夹克", "教练夹克", "简约风衣", "短款冲锋衣"],
    shoesRecommendation: ["复古运动鞋", "德训鞋", "板鞋", "简约皮鞋"],
    accessoriesRecommendation: ["棒球帽", "双肩包", "简约手表", "银色首饰"],
    avoidStyles: ["全身Logo", "过于花哨的印花", "不修边幅的宽松"],
    expertTips: ["白T是灵魂单品", "裤型比颜色更重要", "保持整洁干净是基础"],
  },
  "法式慵懒": {
    styleDirection: "法式慵懒风",
    topRecommendation: ["条纹衫", "亚麻衬衫", "复古针织", "宽松白衬衫"],
    bottomRecommendation: ["高腰牛仔裤", "九分裤", "A字裙", "阔腿裤"],
    outerwearRecommendation: ["法式风衣", "简约西装外套", "海军蓝外套", "针织开衫"],
    shoesRecommendation: ["芭蕾鞋", "穆勒鞋", "法棍包", "小猫跟"],
    accessoriesRecommendation: ["丝巾", "金色小饰品", "草编包", "复古耳环"],
    avoidStyles: ["过度精致", "浓妆艳抹", "过于正式的职业装"],
    expertTips: ["法式核心是effortless", "配饰少而精", "头发保持自然蓬松"],
  },
  "日系复古": {
    styleDirection: "日系复古风",
    topRecommendation: ["古着T恤", "重磅卫衣", "格纹衬衫", "工装内搭"],
    bottomRecommendation: ["工装裤", "直筒牛仔裤", "休闲短裤", "宽松运动裤"],
    outerwearRecommendation: ["工装外套", "教练夹克", "MA-1飞行员夹克", "复古牛仔外套"],
    shoesRecommendation: ["复古运动鞋", "工装靴", "沙漠靴", "帆布鞋"],
    accessoriesRecommendation: ["军事风包袋", "冷帽", "战术腰带", "简约银饰"],
    avoidStyles: ["过于甜美的粉色调", "紧身款式", "商务正装"],
    expertTips: ["层次感是日系核心", "军装元素经常出现", "颜色控制在低饱和度"],
  },
};

const STYLE_CORRELATION: Record<string, string[]> = {
  "韩系温柔风": ["Clean Fit", "韩式通勤", "简约高级感", "知识分子风"],
  "Clean Fit": ["Streetwear", "Urban Outdoor", "工装", "美式休闲"],
  "法式慵懒风": ["老钱松弛", "轻熟知性", "法式浪漫", "简约高级"],
  "日系复古风": ["阿美咔叽", "City Boy", "日系叠穿", "工装硬朗"],
};

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    const knowledge = getKnowledgeForTool("outfit-analysis");
    const bodyType = BODY_TYPES[1] || BODY_TYPES[0];
    const colors = COLOR_PALETTES[1] || COLOR_PALETTES[0];
    const formulas = COLOR_FORMULAS.slice(0, 4);

    const styleKeys = Object.keys(OUTFIT_BY_STYLE);
    const primaryStyle = styleKeys[Math.floor(Math.random() * styleKeys.length)];
    const outfitRec = OUTFIT_BY_STYLE[primaryStyle];
    const correlation = STYLE_CORRELATION[primaryStyle] || STYLE_CORRELATION["Clean Fit"];

    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(OUTFIT_ANALYSIS_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600";
    }

    const enhancedAnalysis = {
      outfitScore: Math.floor(75 + Math.random() * 20),
      styleDirection: outfitRec.styleDirection,
      bodyType: bodyType.name,
      recommendedStyle: outfitRec.styleDirection,
      colorPalette: {
        dominant: colors.dominant,
        accent: colors.accent,
        avoid: ["荧光色", "高饱和撞色", "超过5种颜色"],
      },
      topRecommendation: outfitRec.topRecommendation,
      bottomRecommendation: outfitRec.bottomRecommendation,
      outerwearRecommendation: outfitRec.outerwearRecommendation,
      shoesRecommendation: outfitRec.shoesRecommendation,
      accessoriesRecommendation: outfitRec.accessoriesRecommendation,
      outfitIdeas: [
        { scene: "日常通勤", look: "Clean基础搭配", items: ["重磅白T", "直筒卡其裤", "德训鞋", "简约手表"] },
        { scene: "周末出街", look: "层次感叠穿", items: ["针织开衫", "条纹衫", "高腰牛仔裤", "小白鞋"] },
        { scene: "约会聚会", look: "法式慵懒感", items: ["亚麻衬衫", "阔腿裤", "乐福鞋", "精致项链"] },
      ],
      avoidStyles: outfitRec.avoidStyles,
      styleCorrelation: correlation,
      expertTips: [...outfitRec.expertTips, ...(knowledge.avoidTips?.slice(0, 3) || [])],
      knowledgeSource: [
        "Obsidian/穿搭知识库/体型脸型与发型完全指南",
        "Obsidian/穿搭知识库/03-配色体系/男士配色完全指南",
        "Obsidian/穿搭知识库/穿搭体系MOC",
      ],
    };

    return NextResponse.json({ reportImage, mock: mockMode, enhancedAnalysis });
  } catch (e) {
    console.error("outfit-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
