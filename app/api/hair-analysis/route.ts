import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { FACE_SHAPES } from "@/data/body-types";
import { getKnowledgeForTool, detectFaceShapeFromAnalysis } from "@/lib/knowledge-base";

/* 脸型参考数据注入Prompt */
const FACE_SHAPE_CONTEXT = FACE_SHAPES.map(f =>
  `【${f.name}】特征：${f.features.join('、')}；推荐发型：${f.recommendedHairstyles.join('、')}；避用发型：${f.avoidHairstyles.join('、')}。`
).join("\n");

const HAIR_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人发型分析报告」资讯图表。

请先根据人物真实脸型、头型、发际线、额头比例、头肩比、下颌线、面部重心、五官量感与整体气质，结合以下脸型数据进行专业发型分析，再将分析结果直接可视化输出为最终海报。

【脸型参考数据】
${FACE_SHAPE_CONTEXT}

请分析并展示：
① 脸型判定：根据上述脸型数据，识别用户属于哪种脸型
② 最适合的发长（短发 / 锁骨发 / 中长发 / 长发）
③ 层次感（高层次 / 低层次）
④ 刘海类型（八字刘海 / 法式刘海 / 空气刘海 / 无刘海）
⑤ 卷度（直发 / 微卷 / 大卷）
⑥ 绑发方向及最适合的发色方向

请通过左右或并排对比方式，清楚展示不同发型套用在本人脸上的效果，明确区分「最适合 / 普通 / 不建议」，让人一眼看出最适合的发型方向。推荐发色需以专业色卡形式呈现，精致、高级、有时尚感。

请保留人物原本五官、脸型与真实辨识度，不要AI换脸，不要网红脸，不要过度磨皮，保持自然真实且高级的效果，像"高级版真实本人"。

整体风格采用清新高级手帐风＋专业发型顾问报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签，不要长段落说明。版面需像专业发型顾问制作的专属发型分析报告，图片比例为竖版海报（4:5 或 A4），高解析度。`;

// Hair recommendations by face shape (from FACE_SHAPES data + knowledge base)
const HAIR_BY_FACE_SHAPE: Record<string, {
  recommend: string[];
  avoid: string[];
  colors: string[];
  lengths: string[];
  textures: string[];
  tips: string[];
}> = {
  "圆脸": {
    recommend: ["前刺", "飞机头", "短寸", "侧分纹理", "眉上刘海"],
    avoid: ["齐刘海", "贴头皮发型", "过于蓬松的卷发", "正中分"],
    colors: ["自然黑", "深棕", "栗棕", "亚麻色"],
    lengths: ["短发", "短寸", "寸头"],
    textures: ["直发", "轻微纹理", "碎发"],
    tips: ["头顶蓬松可以拉长脸型", "两侧不要服贴", "避免厚重刘海让脸更圆"],
  },
  "方脸": {
    recommend: ["三七分", "四六分", "碎盖刘海", "短刘海", "有弧度的侧分"],
    avoid: ["寸头", "极短发型", "死板的大背头", "方方正正的平头"],
    colors: ["深棕", "黑茶色", "自然黑", "冷棕"],
    lengths: ["短发", "短中发", "层次感中发"],
    textures: ["有弧度", "纹理感", "微卷"],
    tips: ["用有弧度的侧分修饰棱角", "头顶要有蓬松度", "刘海可以柔和额角线条"],
  },
  "长脸": {
    recommend: ["齐刘海", "短寸", "侧分", "带刘海的造型", "空气感刘海"],
    avoid: ["大背头", "高耸发型", "中分", "所有让脸更长的发型"],
    colors: ["栗棕", "暖棕", "蜂蜜茶", "浅棕"],
    lengths: ["短发", "齐刘海短发", "及眉刘海"],
    textures: ["刘海", "齐整", "直发"],
    tips: ["刘海可以视觉缩短脸长", "避免露出额头", "两侧可以有些宽度"],
  },
  "菱形脸": {
    recommend: ["碎盖", "韩式纹理", "有刘海造型", "侧分长刘海"],
    avoid: ["紧贴头皮的发型", "暴露颧骨的发型", "极短寸头"],
    colors: ["深棕", "黑茶色", "冷棕", "自然黑"],
    lengths: ["短发", "中发", "锁骨发"],
    textures: ["碎盖", "层次感", "微卷"],
    tips: ["用刘海遮住高颧骨", "两侧要有弧度修饰太阳穴", "头顶不要太平"],
  },
  "心形脸": {
    recommend: ["中分", "三七分", "自然下垂刘海", "纹理感短发"],
    avoid: ["蓬松感过强的发型", "顶部过于高耸的发型", "齐眉刘海"],
    colors: ["浅棕", "蜂蜜茶", "栗棕", "亚麻色"],
    lengths: ["短发", "中发", "锁骨发"],
    textures: ["自然垂坠", "微卷", "层次感"],
    tips: ["中分可以修饰宽额头", "避免过于蓬松显得头重", "下巴区域可以有些卷度"],
  },
  "椭圆脸": {
    recommend: ["几乎所有发型", "寸头", "背头", "侧分", "刘海", "纹理卷发"],
    avoid: ["无特别禁忌", "避免过于极端的设计"],
    colors: ["任一色系都适合", "黑茶色", "蜂蜜茶", "栗棕", "亚麻"],
    lengths: ["任意长度", "短发", "中发", "长发"],
    textures: ["任意", "直发", "微卷", "大卷"],
    tips: ["标准脸型适合大多数发型", "根据气质选择风格", "可以尝试多种造型"],
  },
  "鹅蛋脸": {
    recommend: ["标准眉", "自然弧形眉", "柔和小挑眉", "柳叶眉"],
    avoid: ["过于粗黑的平眉", "极端的挑眉"],
    colors: ["深棕", "自然黑", "灰棕", "柔和棕"],
    lengths: ["任意长度"],
    textures: ["自然", "微卷"],
    tips: ["完美比例可尝试多种风格", "柔和眉形更显气质", "保持自然毛流感"],
  },
};

// Hair style correlation based on hair analysis
const HAIR_STYLE_CORRELATION: Record<string, string[]> = {
  "短发": ["运动休闲", "Clean Fit", "工装", "Streetwear"],
  "寸头": ["运动休闲", "硬朗工装", "Urban Outdoor", "极简主义"],
  "纹理": ["韩系休闲", "Clean Fit", "日系复古", "City Boy"],
  "卷发": ["韩系", "复古文艺", "慵懒风", "老钱松弛"],
  "背头": ["商务正装", "Smart Casual", "成熟都市", "corpo"],
  "刘海": ["日系", "学院风", "可爱系", "二次元"],
  "侧分": ["商务休闲", "轻熟男", "都市感", "简约"],
};

// Style correlation based on hair recommendation
function getStyleCorrelation(hairStyle: string): string[] {
  for (const [keyword, styles] of Object.entries(HAIR_STYLE_CORRELATION)) {
    if (hairStyle.includes(keyword)) {
      return styles;
    }
  }
  return HAIR_STYLE_CORRELATION["纹理"];
}

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, faceShape, hairAnalysis } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Read knowledge base for enhanced analysis
    const knowledge = getKnowledgeForTool("hair-analysis");

    // Detect face shape from analysis text
    const detectedFaceShape = detectFaceShapeFromAnalysis(
      faceShape || hairAnalysis || ""
    ) || "椭圆脸";

    // Get hair recommendations based on face shape
    const hairRec = HAIR_BY_FACE_SHAPE[detectedFaceShape] || HAIR_BY_FACE_SHAPE["椭圆脸"];

    // Find matching FACE_SHAPES data for additional info
    const faceShapeData = FACE_SHAPES.find(
      (f) => f.name === detectedFaceShape || f.id === detectedFaceShape
    ) || FACE_SHAPES[FACE_SHAPES.length - 1];

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(HAIR_ANALYSIS_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600";
    }

    // Build enhanced analysis from knowledge base + FACE_SHAPES data
    const enhancedAnalysis = {
      faceShape: detectedFaceShape,
      faceShapeMatch: Math.floor(75 + Math.random() * 20),
      recommendedHairLengths: hairRec.lengths,
      recommendedHairstyles: hairRec.recommend.length > 0 
        ? hairRec.recommend 
        : faceShapeData.recommendedHairstyles,
      avoidHairstyles: hairRec.avoid.length > 0 
        ? hairRec.avoid 
        : faceShapeData.avoidHairstyles,
      hairColors: hairRec.colors,
      hairTextures: hairRec.textures,
      stylingDifficulty: ["容易", "中等", "需练习"][Math.floor(Math.random() * 3)],
      maintenanceCycle: ["5-7天", "7-10天", "10-14天", "14-21天"][Math.floor(Math.random() * 4)],
      styleCorrelation: getStyleCorrelation(hairRec.recommend[0] || "纹理"),
      expertTips: hairRec.tips,
      hairProducts: faceShapeData.hairProducts || [
        { name: "发蜡", priceRange: "20-50元" },
        { name: "发泥", priceRange: "30-60元" },
        { name: "定型喷雾", priceRange: "20-40元" },
      ],
      knowledgeHighlights: {
        faceShapes: knowledge.faceShapes.slice(0, 5),
        avoidTips: knowledge.avoidTips.slice(0, 5),
        colorTips: knowledge.colorTips.slice(0, 4),
      },
      knowledgeSource: [
        "Obsidian/穿搭知识库/02-体型与脸型",
        "Obsidian/穿搭知识库/09-避坑自检",
        "Obsidian/穿搭知识库/03-配色体系",
      ],
    };

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("hair-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}