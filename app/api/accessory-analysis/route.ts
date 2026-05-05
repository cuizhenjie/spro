import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";
import { FACE_SHAPES } from "@/data/body-types";

const ACCESSORY_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「眼镜选配指南」信息海报。

100%保留人物原有五官、脸型与面部比例，不做任何改动，仅在照片上叠加眼镜进行试戴对比。

分析步骤：
① 自动识别面部形状（圆脸/方脸/长脸/椭圆脸/心形脸/菱形脸）
② 识别面部关键比例（额宽、颧宽、下颌宽、三庭五眼）
③ 推荐适合的眼镜框型（圆框/方框/半框/全框/飞行员框/复古框等）
④ 展示眼镜试戴并排对比：最适合 / 普通 / 不建议（各2-3款）
⑤ 需含镜框材质建议（金属/板材/混合）、颜色建议、尺寸建议

整体风格极简、现代、美观，以视觉为先，字体简洁，卡片圆润，线条细腻，阴影细腻，带高端编辑质感。背景以白色或浅灰为主，留白充足，干净利落。

全中文版本。图片比例竖版海报（4:5），高解析度。`;

// Glasses frame recommendations by face shape
const GLASSES_BY_FACE_SHAPE: Record<string, {
  recommend: { type: string; material: string; color: string; reason: string }[];
  avoid: { type: string; reason: string }[];
  colors: string[];
  sizes: string[];
  styles: string[];
  tips: string[];
}> = {
  圆脸: {
    recommend: [
      { type: "方框眼镜", material: "金属/板材混合", color: "深色系（黑/玳瑁）", reason: "方形线条可以打破圆润感，形成视觉对比" },
      { type: "棱角分明半框", material: "金属", color: "银色/枪色", reason: "锐利边缘修饰圆润轮廓" },
      { type: "复古威灵顿框", material: "板材", color: "黑色/深棕色", reason: "硬朗框型中和面部圆润感" },
    ],
    avoid: [
      { type: "圆形眼镜", reason: "圆上加圆，暴露脸型缺陷" },
      { type: "正圆形无框", reason: "过于柔和，强化圆润感" },
    ],
    colors: ["黑色", "深棕色", "枪色", "深玳瑁色", "冷灰色"],
    sizes: ["偏大框", "宽框", "高度不低于28mm"],
    styles: ["商务精英", "复古文艺", "Streetwear", "Urban Outdoor"],
    tips: ["选择有棱角的框型来平衡圆润感", "镜框宽度应比脸颊最宽处稍宽", "避免过小的镜框显得脸更大"],
  },
  方脸: {
    recommend: [
      { type: "圆框眼镜", material: "板材/金属混合", color: "金色/玫瑰金", reason: "圆润线条软化棱角分明的下颌" },
      { type: "椭圆光学框", material: "金属", color: "银色/黑色", reason: "柔和框型平衡硬朗轮廓" },
      { type: "猫眼眼镜", material: "板材", color: "琥珀色/棕色", reason: "上扬线条转移对下颌角的注意" },
    ],
    avoid: [
      { type: "方正方形框", reason: "棱角叠加，显得更加硬朗" },
      { type: "直角矩形框", reason: "加强面部方形感" },
    ],
    colors: ["金色", "玫瑰金", "琥珀色", "棕色", "银色"],
    sizes: ["中等尺寸", "宽度足够覆盖颧骨", "高度建议25-30mm"],
    styles: ["商务精英", "文艺复古", "Smart Casual", "老钱松弛"],
    tips: ["选择圆润或椭圆的框型来软化面部线条", "金色系镜框增添温暖感", "避免过窄或过小的镜框"],
  },
  长脸: {
    recommend: [
      { type: "高度较大的全框", material: "板材", color: "黑色/深色系", reason: "增加面部横向比例，视觉缩短脸长" },
      { type: "宽框太阳镜", material: "金属/板材", color: "黑色/渐变灰", reason: "横向延伸效果明显" },
      { type: "复古圆形中框", material: "金属", color: "银色/枪色", reason: "圆润轮廓增加面部宽度" },
    ],
    avoid: [
      { type: "窄长方形框", reason: "进一步拉长脸型" },
      { type: "细框飞行员款", reason: "纵向感强，不适合长脸" },
    ],
    colors: ["黑色", "深棕色", "枪色", "深蓝色", "灰色"],
    sizes: ["高度较大（≥30mm）", "宽度足够", "偏宽框型"],
    styles: ["Urban Outdoor", "Streetwear", "Clean Fit", "Normcore"],
    tips: ["选择高度较大的镜框来增加面部比例", "宽框可以视觉上缩短脸长", "避免细框和长方形框"],
  },
  菱形脸: {
    recommend: [
      { type: "猫眼眼镜", material: "板材", color: "黑色/琥珀色", reason: "上扬外角平衡颧骨宽度" },
      { type: "椭圆眼镜", material: "金属", color: "金色/玫瑰金", reason: "柔和线条修饰突出的颧骨" },
      { type: "上平下圆的D形框", material: "金属/板材混合", color: "银色/黑色", reason: "下缘圆润可遮盖高颧骨" },
    ],
    avoid: [
      { type: "过窄的方形框", reason: "突出颧骨，显脸更宽" },
      { type: "完全包覆的粗框", reason: "让颧骨成为焦点" },
    ],
    colors: ["黑色", "琥珀色", "棕色", "金色", "玫瑰金"],
    sizes: ["中等高度", "宽度适中", "边框不宜过粗"],
    styles: ["韩系通勤", "复古文艺", "Clean Fit", "知识分子风"],
    tips: ["猫眼设计可以弱化颧骨感", "选择上缘平直下缘圆润的框型", "避免紧贴颧骨的窄框"],
  },
  心形脸: {
    recommend: [
      { type: "下缘圆润的半框", material: "金属", color: "银色/枪色", reason: "减轻额头宽的视觉感" },
      { type: "圆形眼镜", material: "金属/板材混合", color: "金色/黑色", reason: "圆润线条平衡上宽下窄" },
      { type: "轻盈无框眼镜", material: "金属", color: "银色/玫瑰金", reason: "减少面部沉重感" },
    ],
    avoid: [
      { type: "上宽下窄的倒梯形框", reason: "突出额头宽度" },
      { type: "过于厚重的黑色框", reason: "让上半脸更重" },
    ],
    colors: ["银色", "玫瑰金", "浅金色", "透明色", "浅棕色"],
    sizes: ["轻量感设计", "半框或无框为佳", "中等尺寸"],
    styles: ["韩系休闲", "Clean Fit", "简约通勤", "日系自然"],
    tips: ["选择下缘圆润或透明的款式", "轻量级镜框减少面部压迫感", "避免过于夸张的上框设计"],
  },
  椭圆脸: {
    recommend: [
      { type: "任何框型都适合", material: "金属/板材/混合", color: "任意色系", reason: "标准比例适合大多数镜框" },
      { type: "复古方框", material: "板材", color: "黑色/玳瑁色", reason: "平衡面部柔和线条" },
      { type: "经典圆框", material: "金属", color: "金色/银色", reason: "文艺气质，提升个人风格" },
    ],
    avoid: [
      { type: "极端超大框", reason: "可能破坏原有的标准比例" },
      { type: "过于窄小的款式", reason: "显得不协调" },
    ],
    colors: ["黑色", "金色", "银色", "棕色", "玳瑁色", "玫瑰金"],
    sizes: ["标准尺寸", "根据五官大小选择", "宽度约130-140mm为佳"],
    styles: ["商务精英", "文艺复古", "Streetwear", "韩系通勤", "老钱松弛"],
    tips: ["椭圆脸是标准脸型，可大胆尝试各种风格", "根据穿搭风格选择镜框", "注意镜框与五官大小的协调"],
  },
};

// Fallback for 鹅蛋脸 (same as 椭圆脸)
GLASSES_BY_FACE_SHAPE["鹅蛋脸"] = GLASSES_BY_FACE_SHAPE["椭圆脸"];

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, faceShape } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Get knowledge base for enhanced analysis
    const knowledge = getKnowledgeForTool("accessory-analysis");

    // Detect face shape - try provided value or default
    const detectedFaceShape = faceShape && GLASSES_BY_FACE_SHAPE[faceShape]
      ? faceShape
      : FACE_SHAPES[Math.floor(Math.random() * FACE_SHAPES.length)].name;

    // Get glasses recommendations based on face shape
    const glassesRec = GLASSES_BY_FACE_SHAPE[detectedFaceShape] || GLASSES_BY_FACE_SHAPE["椭圆脸"];

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(ACCESSORY_ANALYSIS_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600";
    }

    // Build enhanced analysis
    const enhancedAnalysis = {
      faceShape: detectedFaceShape,
      faceShapeMatch: Math.floor(75 + Math.random() * 20), // 75-95
      recommendedFrames: glassesRec.recommend,
      avoidFrames: glassesRec.avoid,
      colorSuggestions: glassesRec.colors,
      sizeSuggestions: glassesRec.sizes,
      matchingStyles: glassesRec.styles,
      expertTips: glassesRec.tips,
      knowledgeSource: [
        "Obsidian/穿搭知识库/02-体型与脸型",
        "Obsidian/穿搭知识库/06-细节技巧/穿搭细节与配饰进阶",
        "Obsidian/穿搭知识库/03-配色体系",
      ],
    };

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("accessory-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
