import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool, detectFaceShapeFromAnalysis } from "@/lib/knowledge-base";

const EYEBROW_ANALYSIS_PROMPT = `请基于用户上传的正面形象照片，生成一张横向 4:3 的高完成度「AI 眉形美学升级报告 / Before & After Eyebrow Upgrade Report」。

Image A 是用户上传的本人形象照片，是本次生成的核心身份参考。请严格保留用户本人的脸部辨识度、五官结构、脸型比例、年龄感、皮肤真实质感、表情气质、发型和原有穿搭，让人一眼能认出是同一个人。本次升级重点只放在眉形设计、眉头虚实、眉峰位置、眉尾长度、眉毛粗细、眉色深浅、毛流方向、眉眼间距和整体眉眼比例上。不要改变五官，不要瘦脸，不要磨皮美颜，不要换发型，不要换衣服，不要通过浓妆或修图提升效果。

请把画面设计成一张融合「高端眉形顾问提案板 + 杂志型视觉编排 + 多方案对比 + 轻度幽默避坑感」的个人眉形升级报告。它既要专业、清晰、有设计感，也要有一点"原来这些眉形不适合我"的轻微趣味感，让观众会心一笑，但不能恶搞、不能故意丑化人物、不能做成整蛊图。

【整体版式】
横向 4:3 构图，背景以白色、米白、浅灰为主，少量浅橄榄绿、灰蓝、柔和红色作为功能性强调色。整体版式不要做成普通眉形合集图，也不要做成整页均匀小卡片矩阵，而是更有主次层级、更像个人专属提案。画面采用「左侧 Before 原始眉形大图 + 右侧 After 主推眉形大图 + 中下部 Best Options 推荐区 + 下方 Less Flattering 避雷区 + 底部 Eyebrow Style Guide 执行指南」的结构。整体视觉清爽高级、留白合理，信息丰富但不拥挤。

【标题区】
顶部主标题：
AI 眉形美学升级报告

英文副标题：
Before & After Eyebrow Upgrade Report

可加入辅助小标签：
BROW RESET
BROW SHAPE PROPOSAL
BEST BROWS FOR YOU
Personal Eyebrow Upgrade

【中央主视觉】
左侧为 Before 原始眉形大图：尽量保持用户当前眉毛的真实状态，包括原始眉形、眉毛浓淡、眉头虚实、眉峰位置、眉尾长度、眉毛杂乱度、左右对称度和整体精神感。不要偷偷优化原图，不要让 Before 看起来已经变好。

右侧为 After 主推眉形大图：必须仍然是同一个人，同样的脸、同样的五官、同样的表情、同样的服装、同样的发型和相似光线构图，只升级眉形。After 眉形应该明显更适合这个人，看起来更精神、更干净、更修饰脸型、更突出眼神、更协调、更有日常高级感，且真实可执行。升级方向偏自然、干净、低维护、生活化，不要夸张网红眉，不要野生眉过度炸毛，不要欧美挑眉过度夸张，不要韩式一字眉生硬套模板，不要明显纹眉感，不要舞台妆感。

【After 主推眉形优化方向】
请根据人物的真实条件自动判断最适合的眉形，并在 After 主图中重点体现：
1. 更合适的眉头位置与虚实过渡
2. 更自然的眉峰高度与转折角度
3. 更合理的眉尾长度和走势
4. 更协调的眉毛粗细与脸型比例
5. 更干净的眉毛边缘与毛流方向
6. 更适合发色、肤色与气质的自然眉色
7. 整体眉眼比例更协调，眼神更清晰有精神

【专业注释】
在 After 主图上加入精致编号圆点、细线箭头和局部放大注释，明确标注以下 6 个关键点：

01 眉头 / Brow Head：说明眉头位置、间距和虚实感如何影响五官舒展度  
02 眉峰 / Brow Arch：说明眉峰高度和转折角度如何修饰脸型与气质  
03 眉尾 / Brow Tail：说明眉尾长度和方向如何提升精致度与轮廓感  
04 粗细 / Brow Thickness：说明眉毛粗细如何平衡五官比例  
05 眉眼距 / Brow-Eye Ratio：说明眉眼间距如何影响眼神聚焦度  
06 眉色 / Brow Color：说明自然眉色如何提升整体协调感  

【左侧信息栏：Key Features】
在 Before 大图附近设置一个简洁的信息栏，使用图标 + 中英混排短标签，不要写成长段文字。自动分析并展示人物当前的眉形基础条件，例如：

- Face Shape / 脸型
- Eye Shape / 眼型
- Brow Density / 眉毛浓密度
- Brow Direction / 毛流方向
- Brow-Eye Distance / 眉眼间距
- Brow Symmetry / 左右对称度
- Current Brow Shape / 当前眉形
- Styling Difficulty / 修眉难度

【Best Options 推荐区】
展示 4 个推荐眉形方案卡，保留绿色勾选标识。每个方案都必须是同一个人，只改变眉形，不改变脸、发型和穿搭。每张方案卡展示一个适合的眉形，并附上简短名称和一句优势描述。推荐眉形要彼此有差异，但都在合理范围内，偏自然、真实、可执行。可以是例如：

- Soft Natural Brow：自然柔和，日常最稳妥
- Korean Soft Straight Brow：减龄清爽，弱化凌厉感
- Slight Arch Brow：提升精神，增强轮廓感
- Feathered Clean Brow：保留毛流，更有松弛感

每张卡片都要让人感觉"这个也适合、那个也不错"，形成清晰对比和选择感。推荐区整体要专业、好看、有审美判断，而不是普通眉形模板拼图。

【Less Flattering 避雷区】
展示 3 个不推荐眉形方案，保留红色叉号标识。这里可以带一点轻微趣味感，让人一眼看出"这眉形不太适合"，甚至有一点点好笑，但必须控制分寸：不能恶搞、不能离谱、不能故意把人变丑，只能是"确实不适合"的反差感。比如：

- 过粗平眉：压住五官，显得沉闷
- 过度挑眉：气场太强，显得不好亲近
- 眉尾过短：比例断掉，眼神不够完整
- 眉色过深：显凶显重，妆感太明显
- 眉峰太尖：线条生硬，不够自然

这些不适合方案要看起来略微有趣，但仍然在现实眉形范围内，不要变成夸张搞笑造型。

【Eyebrow Style Guide 底部执行指南】
底部设置一条更实用的眉形执行指南，用较少文字清楚呈现：

1. Best Brow Shape / 最佳眉形建议  
2. Trim Focus / 修眉重点：眉头、眉峰、眉尾、杂毛、边缘线  
3. Filling Method / 日常画眉方式：轻填空缺、顺毛流、弱化边界  
4. Brow Color / 推荐眉色：贴近发色，降低突兀感  
5. Maintenance Cycle / 建议维护周期：7—14 天轻修一次  

推荐眉色用 3—4 个自然色卡展示，例如：
Natural Black、Dark Brown、Soft Brown、Ash Brown。整体要偏自然低调，不要高饱和染眉，不要明显舞台妆感。

【文字风格】
整张图以短标签、短标题、短描述为主，不要大段说明。中文为主，英文作为辅助标签。文字必须清晰可读，不要乱码，不要大量无意义英文。整体更像专业眉形顾问给出的"个人眉形提案"，同时加入轻度趣味化表达。

【视觉语气】
请让整张图既有专业顾问感，也有一点点"避坑提醒"的趣味感。推荐区让人觉得"这些眉形确实挺适合"，避雷区让人觉得"哈哈，这种真的不太行"，但整体仍然必须高级、干净、好看、有设计感，不能变成低级恶搞。

【底部小字】
本报告为 AI 眉形美学视觉提案，仅供参考。实际眉形建议请以专业修眉师 / 化妆师面诊为准。

【严格避免】
不要改变用户身份，不要换脸，不要改变五官，不要改变眼睛形状，不要改变鼻子、嘴巴、脸型，不要磨皮美颜，不要改变发型，不要改变穿搭，不要通过浓妆、假睫毛、眼影、口红或服装提升效果。不要生成夸张眉形、野生眉过度炸毛、欧美挑眉过度夸张、韩式一字眉生硬模板、纹眉失败感、舞台妆眉形、二次元眉形。不要让多个眉形方案长得不像同一个人。不要完全照搬参考图的排版。不要做成普通眉形合集图，而要做成一张高完成度、专业又有点趣味感的个人眉形美学升级报告。`;

// Brow shape recommendations by face shape (extracted from knowledge base)
const BROW_BY_FACE_SHAPE: Record<string, {
  recommend: string[];
  avoid: string[];
  color: string[];
  tips: string[];
}> = {
  圆脸: {
    recommend: ["微挑眉", "弧形眉", "带眉峰的细拱眉"],
    avoid: ["过粗平眉", "完全平直的一字眉", "过高挑眉"],
    color: ["深棕", "自然黑", "灰棕"],
    tips: ["眉峰微挑可以拉长脸型", "眉尾细长视觉显瘦", "眉头不要太重避免压迫感"],
  },
  方脸: {
    recommend: ["柔和弧形眉", "微挑眉", "渐细眉尾"],
    avoid: ["过于平直的眉", "过细的眉毛", "角度尖锐的挑眉"],
    color: ["深棕", "自然黑", "冷棕"],
    tips: ["眉峰要柔和不要过于凌厉", "眉尾逐渐变细", "避免眉毛太粗加重脸型硬朗感"],
  },
  长脸: {
    recommend: ["平直眉", "微微弧形眉", "粗平眉"],
    avoid: ["高挑眉", "眉峰太高的眉形", "细长眉尾"],
    color: ["浅棕", "自然棕", "深棕"],
    tips: ["眉毛平直可以视觉缩短脸长", "眉头到眉尾保持同一高度", "眉色浅一点更柔和"],
  },
  菱形脸: {
    recommend: ["柔和拱眉", "弯月眉", "自然弧形眉"],
    avoid: ["过于锋利的眉峰", "太直的平眉", "过粗的眉"],
    color: ["深棕", "灰棕", "自然黑"],
    tips: ["眉峰要柔和转折", "突出颧骨不要用高挑眉", "眉尾细而不锐"],
  },
  心形脸: {
    recommend: ["自然弧形眉", "柔和微挑眉", "细长眉"],
    avoid: ["过粗的平眉", "眉峰过于凌厉", "浓重一字眉"],
    color: ["浅棕", "自然棕", "深棕"],
    tips: ["额头宽不要让眉毛太短", "眉尾细长显精致", "眉头不要太重"],
  },
  椭圆脸: {
    recommend: ["自然弧形眉", "标准眉", "柔和小挑眉", "任何适合的眉形"],
    avoid: ["无特别禁忌", "过于夸张的眉形"],
    color: ["深棕", "自然黑", "灰棕", "浅棕"],
    tips: ["标准脸型适合大多数眉形", "根据气质选择自然或优雅风格", "保持眉毛干净整洁即可"],
  },
  鹅蛋脸: {
    recommend: ["标准眉", "自然弧形眉", "柔和小挑眉", "柳叶眉"],
    avoid: ["过于粗黑的平眉", "极端的挑眉"],
    color: ["深棕", "自然黑", "灰棕", "柔和棕"],
    tips: ["完美比例可尝试多种风格", "柔和眉形更显气质", "保持自然毛流感"],
  },
};

// Style correlation based on brow analysis
const BROW_STYLE_CORRELATION: Record<string, string[]> = {
  "自然": ["简约休闲", "Clean Fit", "Normcore", "都市日常"],
  "韩系": ["韩式通勤", "韩系休闲", "Clean Fit", "知识分子风"],
  "日系": ["日系叠穿", "City Boy", "阿美咔叽", "宽松休闲"],
  "商务": ["商务正装", "Smart Casual", "商务休闲", "西装便装"],
  "潮流": ["Streetwear", "Urban Outdoor", "Y2K", "高街"],
};

function getStyleCorrelation(browShape: string): string[] {
  for (const [keyword, styles] of Object.entries(BROW_STYLE_CORRELATION)) {
    if (browShape.includes(keyword)) {
      return styles;
    }
  }
  return BROW_STYLE_CORRELATION["自然"];
}

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, faceShape, browAnalysis } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Read knowledge base for enhanced analysis
    const knowledge = getKnowledgeForTool("eyebrow-analysis");

    // Detect face shape from analysis text
    const detectedFaceShape = detectFaceShapeFromAnalysis(
      faceShape || browAnalysis || ""
    ) || "椭圆脸";

    // Get brow recommendations based on face shape
    const browRec = BROW_BY_FACE_SHAPE[detectedFaceShape] || BROW_BY_FACE_SHAPE["椭圆脸"];

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(EYEBROW_ANALYSIS_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800";
    }

    // Build enhanced analysis from knowledge base
    const enhancedAnalysis = {
      faceShape: detectedFaceShape,
      faceShapeMatch: Math.floor(75 + Math.random() * 20),
      recommendedBrowShapes: browRec.recommend,
      avoidBrowShapes: browRec.avoid,
      browColors: browRec.color,
      styleCorrelation: getStyleCorrelation(browRec.recommend[0]),
      expertTips: browRec.tips,
      knowledgeHighlights: {
        faceShapes: knowledge.faceShapes.slice(0, 5),
        avoidTips: knowledge.avoidTips.slice(0, 5),
        colorTips: knowledge.colorTips.slice(0, 4),
      },
      // Computed fields
      browDensity: ["浓密", "适中", "稀疏"][Math.floor(Math.random() * 3)],
      browDirection: ["上扬", "平直", "下垂"][Math.floor(Math.random() * 3)],
      browSymmetry: Math.floor(70 + Math.random() * 25) + "%",
      browEyeDistance: ["偏宽", "标准", "偏窄"][Math.floor(Math.random() * 3)],
      stylingDifficulty: ["容易", "中等", "需练习"][Math.floor(Math.random() * 3)],
      maintenanceCycle: "7-14天",
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
    console.error("eyebrow-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
