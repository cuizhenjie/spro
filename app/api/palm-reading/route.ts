import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";

const PALM_READING_PROMPT = `请根据我上传的【手部照片 / 面部照片 / 手脸组合照片】，创作一张高完成度、有设计感、适合分享的「东方玄学分析报告图」。

这不是普通的照片说明，也不是简单的娱乐占卜，而是一张结合【中国传统手相、面相、易经五行、中医望诊气色理论】的视觉化分析图。整体应呈现出"命理师分析报告 + 古籍玄学注解 + 高级视觉海报"的感觉，让用户能直观看到关键特征、对应解释和趋势预警。

【识别与分析要求】

请先判断图片中包含的是：
1. 手部：重点分析掌纹、掌丘、手型、指形、指节、指纹走势、生命线、智慧线、感情线、事业线、财运线等可见特征。
2. 面部：重点分析额头、眉眼、鼻梁、颧骨、法令、嘴型、下巴、面部轮廓、气色、五官比例与整体神态。
3. 如果同时包含手和脸，请综合分析，不要重复堆砌，要形成统一判断。

请至少提炼【10个关键分析点】，每个分析点都要包括：
- 可见特征：指出照片中能看到的具体位置或形态。
- 玄学解释：结合手相、面相、易经五行或传统命理语言进行分析。
- 趋势提示：用"倾向于、容易、需要注意、适合、未来一段时间可能"等方式表达。
- 行动建议：给出一句现实可执行的提醒，例如情绪管理、作息、事业节奏、人际关系、财务规划等。

【标注要求】

请在图片中使用清晰的线条、箭头、圆圈或编号标签，标明每个关键位置：
- 手相图可标注：生命线、智慧线、感情线、事业线、掌丘、指节、拇指根部、食指长度、无名指比例、手相纹路交汇点等。
- 面相图可标注：额头、眉眼、鼻梁、颧骨、法令纹、嘴角、下巴、耳形、面部中庭、气色区域等。
- 每个标注点用 01、02、03……编号，对应右侧或下方的分析说明。
- 线条要细致、优雅，不要杂乱，不要遮挡主体。

【视觉风格】

整体风格要符合东方玄学、命理、手相、面相的调性：
- 主色调：米白、宣纸色，点缀：深墨黑、玄青、古铜金、暗红
- 风格气质：神秘、克制、高级、古籍感、命理报告感。
- 可加入轻微元素：八卦纹、罗盘刻度、五行符号、古籍边框、星盘细线、朱砂印章、宣纸纹理。
- 不要做成恐怖风、低俗算命摊风，也不要过度赛博朋克。
- 排版要像高级杂志信息图，而不是杂乱截图。

【版式设计】

版面结构建议：
1. 顶部：标题区
   标题可为「手相面相玄学分析报告」「东方命理特征解读」「掌纹与面相趋势观察」等，要符合用户上传的图片内容。
2. 中间：主体照片分析区
   保留手部或脸部主体，加入编号、箭头和关键线条标注。
3. 侧边或下方：十点分析区
   每一点用简短标题 + 2-3行说明，不要文字太小。
4. 底部：综合结论区
   总结此人的性格倾向、事业财运、人际情感、健康作息和近期提醒。

【内容语气】

分析语言要有传统玄学味道，但不要绝对化，不要说"必定""一定会发财""一定有灾"。
可以使用：
- "此纹路显示其人多半……"
- "从五行气象看，偏向……"
- "此处若纹路明显，通常代表……"
- "近期需要留意……"
- "适合走……方向"
- "建议在……方面做调整"

【输出目标】

请最终生成一张完整的视觉分析图，至少包含10个编号分析点。
整体要让人一眼看出"哪里被分析了、对应什么含义、有什么提醒"，既有玄学氛围，又有专业排版和高级设计感。

注意：
- 只基于图片中可见特征分析，不要编造看不见的信息。
- 不做医学诊断，不给出疾病结论；中医气色内容只作为传统文化角度的生活提醒。
- 不要出现过多小字，确保手机上也能清楚阅读。`;

// Traditional Chinese metaphysics data for palm and face reading
const PALM_TYPES = ["金形手", "木形手", "水形手", "火形手", "土形手"];
const FACE_TYPES = ["金型面", "木型面", "水型面", "火型面", "土型面"];

const PERSONALITY_TRAITS_BY_ELEMENT: Record<string, string[]> = {
  金: ["果断坚定", "执行力强", "原则性强", "善于决策", "正义感强", "独立自主"],
  木: ["仁慈善良", "有主见", "生长向上", "正直可靠", "创意十足", "追求成长"],
  水: ["聪明智慧", "适应力强", "流动性思维", "直觉敏锐", "善于沟通", "变通灵活"],
  火: ["热情洋溢", "行动力快", "感染力强", "精力充沛", "积极主动", "敢于冒险"],
  土: ["稳重踏实", "忠诚可靠", "耐心十足", "务实肯干", "包容心强", "诚信为本"],
};

const CAREER_BY_ELEMENT: Record<string, string[]> = {
  金: ["金融投资", "法律司法", "企业管理", "政府机关", "机械制造", "财务审计"],
  木: ["教育培训", "文化出版", "设计创意", "园林农业", "医疗健康", "法律咨询"],
  水: ["国际贸易", "物流运输", "媒体传播", "旅游休闲", "心理咨询", "外交公关"],
  火: ["演艺娱乐", "体育运动", "销售营销", "餐饮旅游", "电力能源", "网络科技"],
  土: ["建筑工程", "房地产", "农业畜牧", "矿产开采", "物流仓储", "行政管理"],
};

const RELATIONSHIP_BY_ELEMENT: Record<string, string[]> = {
  金: ["重情重义", "言出必行", "不善言辞表达", "适合与土型人相处", "需学会柔和沟通"],
  木: ["真诚待人", "重视精神契合", "有原则不妥协", "适合与水型人相处", "需学会变通"],
  水: ["温柔体贴", "善于倾听", "情感细腻", "适合与金型人相处", "需避免优柔寡断"],
  火: ["热情主动", "浪漫表达", "行动力强", "适合与木型人相处", "需学会冷静"],
  土: ["忠诚专一", "细心照顾", "务实安稳", "适合与火型人相处", "需避免固执"],
};

const HEALTH_BY_ELEMENT: Record<string, string[]> = {
  金: ["注意肺部呼吸系统", "大肠排泄功能", "皮肤敏感性", "秋季养肺为宜"],
  木: ["注意肝脏解毒功能", "胆囊健康", "眼部疲劳", "春季养肝为宜"],
  水: ["注意肾脏泌尿系统", "妇科或前列腺", "骨骼牙齿", "冬季养肾为宜"],
  火: ["注意心脏血液循环", "小肠吸收功能", "睡眠质量", "夏季养心为宜"],
  土: ["注意脾胃消化系统", "胰腺功能", "口腔健康", "长夏养脾为宜"],
};

const LUCKY_ELEMENTS_BY_ELEMENT: Record<string, { color: string; number: string; direction: string }> = {
  金: { color: "白色、金色、银色", number: "4、9", direction: "西方" },
  木: { color: "绿色、青色、翠色", number: "3、8", direction: "东方" },
  水: { color: "黑色、蓝色、灰色", number: "1、6", direction: "北方" },
  火: { color: "红色、紫色、橙色", number: "2、7", direction: "南方" },
  土: { color: "黄色、棕色、褐色", number: "0、5", direction: "中央/西南" },
};

function getRandomElement(): string {
  const elements = ["金", "木", "水", "火", "土"];
  return elements[Math.floor(Math.random() * elements.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffleArray(arr).slice(0, count);
}

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Read knowledge base for tips
    const knowledge = getKnowledgeForTool("palm-reading");

    // Determine reading type based on random or photo analysis hints
    const readingTypes = ["面相", "手相", "手脸综合"] as const;
    const readingType = readingTypes[Math.floor(Math.random() * readingTypes.length)];

    // Random element for five elements analysis
    const element = getRandomElement();
    const personalityTraits = pickRandom(PERSONALITY_TRAITS_BY_ELEMENT[element], 4);
    const careerDirection = pickRandom(CAREER_BY_ELEMENT[element], 3);
    const relationshipInsights = pickRandom(RELATIONSHIP_BY_ELEMENT[element], 3);
    const healthNotes = pickRandom(HEALTH_BY_ELEMENT[element], 2);

    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(PALM_READING_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
    }

    // Build comprehensive enhanced analysis
    const enhancedAnalysis = {
      readingType,
      matchScore: Math.floor(75 + Math.random() * 20), // 75-95
      personalityTraits,
      careerDirection,
      relationshipInsights,
      healthNotes,
      luckyElements: LUCKY_ELEMENTS_BY_ELEMENT[element],
      fiveElements: {
        element,
        balance: element === "金"
          ? "金形人需注意土来生金，避免火来克金"
          : element === "木"
          ? "木形人需注意水来生木，避免金来克木"
          : element === "水"
          ? "水形人需注意金来生水，避免土来克水"
          : element === "火"
          ? "火形人需注意木来生火，避免水来克火"
          : "土形人需注意火来生土，避免木来克土",
        advice: `五行属${element}，建议多接触同属性的事物，如${LUCKY_ELEMENTS_BY_ELEMENT[element].color}等幸运色，注意${healthNotes[0]}，在${LUCKY_ELEMENTS_BY_ELEMENT[element].direction}方向活动更有利。`,
      },
      recentTips: [
        "近期事业上可能有突破机会，宜把握",
        "人际关系需要多加维护，贵人运渐旺",
        "财务方面宜稳不宜进，注意守财",
        "健康注意休息，避免过度劳累",
        knowledge.styleTips?.[0] || "近期适合学习新技能，提升自我",
      ],
      longTermGuidance: [
        `你的${element}属性特质明显，适合在${careerDirection[0]}方向发展`,
        "人生中期将迎来重要转折点，建议提前规划",
        "命中注定有贵人相助，关键时刻可寻求帮助",
        `五行中${element}过旺，需注意平衡，避免固执`,
        "晚年在财运和健康方面都有不错的运势",
      ],
      expertTips: [
        "手相面相分析仅供参考，真正的命运掌握在自己手中",
        "运势低落时可多接触大自然，有助于调整个人的五行气场",
        "面相会随时间和心态改变，保持积极心态可令面相越来越吉",
        "手纹若有明显变化，预示着即将迎来转变期",
        knowledge.raw ? "结合知识库分析：保持面相手相部位的清洁整齐，有助于提升运势" : "建议每年进行一次面相手相复检，观察运势变化",
      ],
      knowledgeSource: [
        "Obsidian/玄学知识库/手相学入门",
        "Obsidian/玄学知识库/面相学基础",
        "Obsidian/玄学知识库/五行与命理",
        "Obsidian/玄学知识库/易经智慧",
      ],
    };

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("palm-reading error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
