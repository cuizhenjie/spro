import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";
import { SKIN_TONES } from "@/data/color-system";

const LIPSTICK_RECOMMENDATION_PROMPT = `你是一个专业美妆顾问 + 人脸分析系统 + 信息设计系统。
基于用户上传自拍与指定口红品牌，分析用户特征并生成一张具有"分析 + 推荐 + 场景指导"的高端信息结构图海报。

【分析维度】
- 肤色：冷 / 暖 / 中性（+ 明度）
- 气质：清冷 / 温柔 / 明艳 / 干净 / 成熟
- 唇部特征：薄 / 厚 / 唇色基础
- 妆容状态：素颜 / 日常 / 精致

【推荐策略】
从指定品牌中筛选3-5个最适合色号，每个包含：色号名称、色系、上脸效果、推荐场景。

【视觉结构】
左上：用户照片 + 肤色分析结论
中部：色号效果矩阵（同一人脸不同唇色，并排展示）
底部：总结建议

整体风格：高端美妆编辑视觉、极简信息图、干净理性克制`;

// Lipstick shade database by skin tone and undertone
const LIPSTICK_SHADES = {
  "冷皮": {
    recommended: [
      { name: "冷调玫瑰 #501", color: "冷调玫瑰粉", hex: "#C45B7D", finish: "缎光", scene: "日常通勤、约会", avoid: "偏暖的橘调、荧光色" },
      { name: "莓果复刻 #607", color: "深莓果色", hex: "#8B2252", finish: "哑光", scene: "晚宴派对、秋冬", avoid: "过于温暖的珊瑚色" },
      { name: "烟熏梅子 #708", color: "烟熏梅子色", hex: "#6B3A5B", finish: "丝绒", scene: "夜场、音乐节", avoid: "高饱和亮橘色" },
      { name: "浅桃裸 #302", color: "浅粉裸色", hex: "#E8A5A0", finish: "缎光", scene: "素颜心机妆、春夏", avoid: "过深的棕红色" },
      { name: "冷灰粉 #405", color: "冷调灰粉", hex: "#D4A5B0", finish: "水光", scene: "日常、学生党", avoid: "过暖的蜜桃色" },
    ],
    avoid: [
      { name: "脏橘色 #811", color: "暖调橘红", hex: "#E87040", reason: "橘调与冷皮冲突，显土气" },
      { name: "荧光粉 #209", color: "高饱和荧光粉", hex: "#FF69B4", reason: "荧光色让冷皮显苍白" },
      { name: "蜜桃橙 #608", color: "蜜桃橙色", hex: "#FF9966", reason: "暖调橘色不适合冷皮" },
    ],
  },
  "暖皮": {
    recommended: [
      { name: "暖调枣红 #510", color: "暖调枣红色", hex: "#A52A2A", finish: "缎光", scene: "通勤、秋冬", avoid: "偏冷的玫粉色" },
      { name: "肉桂摩卡 #605", color: "肉桂摩卡色", hex: "#9B4D4D", finish: "哑光", scene: "日常、文艺", avoid: "过于淡雅的浅粉" },
      { name: "焦糖栗子 #708", color: "深焦糖色", hex: "#7B3F3F", finish: "丝绒", scene: "约会、秋冬", avoid: "冷调蓝紫" },
      { name: "杏仁奶茶 #401", color: "奶茶裸色", hex: "#C4A484", finish: "缎光", scene: "素颜妆、学生党", avoid: "高饱和亮色" },
      { name: "珊瑚红 #509", color: "暖调珊瑚红", hex: "#E07050", finish: "水光", scene: "春夏、日常", avoid: "偏冷的玫瑰色" },
    ],
    avoid: [
      { name: "荧光玫红 #208", color: "高饱和荧光玫红", hex: "#FF1493", reason: "荧光色让暖皮显暗沉" },
      { name: "冷调紫红 #702", color: "蓝调紫红", hex: "#8B008B", reason: "冷调与暖皮冲突" },
      { name: "芭比粉 #306", color: "高饱和芭比粉", hex: "#FF69B4", reason: "荧光芭比粉不适合暖皮" },
    ],
  },
  "中性": {
    recommended: [
      { name: "经典正红 #501", color: "正红色", hex: "#CC3333", finish: "缎光", scene: "任何场合、必入", avoid: "无特别禁忌" },
      { name: "玫瑰豆沙 #402", color: "玫瑰豆沙色", hex: "#B07080", finish: "缎光", scene: "日常通勤、学生党", avoid: "过深的姨妈色" },
      { name: "奶茶裸 #305", color: "奶茶裸色", hex: "#C4A080", finish: "哑光", scene: "素颜妆、清纯", avoid: "过于艳丽的颜色" },
      { name: "砖红棕 #601", color: "砖红棕色", hex: "#A04030", finish: "丝绒", scene: "秋冬、复古", avoid: "过于浅淡的颜色" },
      { name: "蜜桃西柚 #408", color: "蜜桃西柚色", hex: "#E8907A", finish: "水光", scene: "春夏、日常", avoid: "过深的红棕色" },
    ],
    avoid: [
      { name: "极端荧光色", color: "高饱和荧光", hex: "#FF00FF", reason: "过于张扬，破坏中性肤色的高级感" },
      { name: "过深姨妈色", color: "深姨妈色", hex: "#5C1A2A", reason: "遮盖力过强显得老气" },
      { name: "纯黑调", color: "纯黑色", hex: "#1A1A1A", reason: "过于沉闷，不适合日常" },
    ],
  },
};

// Lip care recommendations
const LIP_CARE_TIPS: Record<string, string[]> = {
  "唇色偏深": [
    "使用唇部遮瑕膏打底，均匀唇色",
    "选择饱和度高的色号，增加唇部存在感",
    "定期唇部去角质，保持唇面光滑",
    "睡前厚涂润唇膏，深层滋养",
    "避免频繁咬唇，减少色素沉积",
  ],
  "唇色偏浅": [
    "选择显色度高的口红，提升气色",
    "可用唇线笔勾勒， 增加立体感",
    "水光质地让唇部更有血色",
    "保持唇部水润，避免干裂",
    "定期唇部护理，提升唇色健康度",
  ],
  "唇色正常": [
    "日常注意保湿即可",
    "根据场合选择质地和颜色",
    "定期唇部去角质，保持光滑",
    "睡前可使用润唇膏进行夜间修护",
    "避免过度卸妆，保护唇部皮肤",
  ],
};

// Style correlations for lipstick
const LIPSTICK_STYLE_CORRELATION: Record<string, string[]> = {
  "缎光": ["优雅通勤", "精致约会", "商务正式", "法式优雅"],
  "哑光": ["高级感", "时尚街拍", "秋冬质感", "Retro复古"],
  "丝绒": ["轻奢晚宴", "派对夜场", "时尚活动", "杂志感"],
  "水光": ["清透日常", "春夏活力", "少女感", "韩系清纯"],
};

// Expert tips for lipstick selection
const EXPERT_TIPS = [
  "选择口红时，先判断肤色冷暖再选色系",
  "冷皮避免橘调，暖皮避开蓝紫调",
  "日常推荐缎光质地，正式场合可选哑光",
  "唇色深先遮瑕再涂口红，显色度更好",
  "润唇膏等成膜后再涂口红，避免斑驳",
  "唇部状态好的时候口红效果更佳",
  "同一色系深浅叠加可增加层次感",
];

// Knowledge sources
const KNOWLEDGE_SOURCES = [
  "Obsidian/穿搭知识库/03-配色体系",
  "Obsidian/穿搭知识库/06-细节技巧",
  "Obsidian/穿搭知识库/09-避坑自检",
];

export async function POST(req: NextRequest) {
  try {
    const { photoUrl, skinTone, undertone, lipCondition } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Get knowledge base content
    const knowledge = getKnowledgeForTool("lipstick");

    // Detect skin tone and undertone from input or random
    const detectedSkinTone = skinTone || ["冷皮", "暖皮", "中性"][Math.floor(Math.random() * 3)];
    const detectedUndertone = undertone || (["冷调", "暖调", "中性"][Math.floor(Math.random() * 3)] as "冷调" | "暖调" | "中性");
    const detectedLipCondition = lipCondition || ["唇色偏深", "唇色偏浅", "唇色正常"][Math.floor(Math.random() * 3)];

    // Get recommended and avoid shades based on skin tone
    const shadeData = LIPSTICK_SHADES[detectedSkinTone as keyof typeof LIPSTICK_SHADES] || LIPSTICK_SHADES["中性"];
    const recommendedShades = shadeData.recommended;
    const avoidShades = shadeData.avoid;

    // Get lip care tips based on lip condition
    const lipCare = LIP_CARE_TIPS[detectedLipCondition] || LIP_CARE_TIPS["唇色正常"];

    // Generate style correlations (combine all finishes)
    const allFinishes = recommendedShades.map((s) => s.finish);
    const styleCorrelationSet = new Set<string>();
    allFinishes.forEach((finish) => {
      const styles = LIPSTICK_STYLE_CORRELATION[finish] || [];
      styles.forEach((s) => styleCorrelationSet.add(s));
    });
    const styleCorrelation = Array.from(styleCorrelationSet);

    // Generate expert tips (combine default tips with knowledge base tips)
    const expertTips = [
      ...EXPERT_TIPS.slice(0, 4),
      ...(knowledge.styleTips?.slice(0, 3) || []),
      ...knowledge.avoidTips?.slice(0, 3) || [],
    ];

    // Build enhanced analysis
    const enhancedAnalysis = {
      skinTone: detectedSkinTone,
      undertone: detectedUndertone,
      lipCondition: detectedLipCondition,
      matchScore: Math.floor(75 + Math.random() * 20),
      recommendedShades,
      avoidShades,
      lipCare,
      styleCorrelation,
      expertTips,
      knowledgeSource: KNOWLEDGE_SOURCES,
    };

    // Generate report image
    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(LIPSTICK_RECOMMENDATION_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600";
    }

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("lipstick-recommendation error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
