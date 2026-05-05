import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { getKnowledgeForTool } from "@/lib/knowledge-base";
import { STYLE_QUADRANTS } from "@/data/style-system";
import { COLOR_FORMULAS } from "@/data/color-system";

const IMAGE_DIAGNOSIS_PROMPT = `请基于用户上传的形象照片，生成一张横向 4:3 的高完成度「AI 衣品升级改造报告 / Before & After Style Upgrade Report」。

人物一致性要求：保留用户本人的基础身份特征、脸部辨识度、五官特征、年龄感、发型特征、身材比例和整体气质，让人一眼能认出这是同一个人。在不改变"这个人是谁"的前提下，对整体穿搭、气质、比例、层次、配饰和上镜状态进行明显升级。

整体定位：本次生成不是普通换装图，不是简单穿搭建议，也不是基础电商搭配图，而是一张「高设计感、高反差、高信息量」的个人潮流形象重塑提案板。

第一眼感受：改造前后差异明显，改造后更帅、更潮、更有型、更会穿
第二眼感受：这是一份专业、精致、逻辑清晰、细节丰富的风格升级报告

核心审美方向：
- 韩系轻潮、Clean Fit、City Boy、Urban Casual
- 日系简约街头、港风松弛有型
- 主流潮牌感、清爽高级、日常可穿、上镜好看

避免方向：
- 古板、成熟过头、商务感太强、老气、沉闷
- 像中年通勤装、普通夹克西裤套装
- 只是"更干净"——要明显更帅、更时髦、更有造型完成度

After 应具备的特征：
1. 轮廓更利落：上身有结构感，肩线更精神，衣长更修饰比例
2. 比例更优化：通过短外套、内搭层次、裤型和鞋型拉高视觉重心
3. 层次更完整：外套、内搭、裤装、鞋包、配饰形成完整造型
4. 配饰更精致：银色项链、手表、戒指、眼镜、斜挎包、小体量包袋，不过度堆叠
5. 鞋型更有风格：复古运动鞋、德训鞋、板鞋、乐福鞋或简洁皮鞋
6. 整体更上镜：姿态更自然自信，气质更松弛，视觉上更有潮流杂志感

Before / After 主视觉：人物对比区占整张图约 55%-60% 的视觉权重。
Before：原始形象，风格普通、真实、基础、略显单调，姿势平直普通
After：同一个人经过潮流升级后的新形象，必须明显更帅、更潮、更有型，姿态更自然自信，气质更松弛上镜

建议穿搭逻辑：
- 短款夹克 / 飞行员夹克 / 工装夹克 / 干净衬衫外套 / 轻机能外套
- 高质感白色或米白色内搭、针织内搭、干净圆领 T 恤
- 直筒裤、微阔裤、垂顺西裤、宽松牛仔裤或卡其裤
- 复古运动鞋、德训鞋、板鞋、乐福鞋
- 小体量斜挎包、银色项链、手表、戒指、眼镜等精致配饰

版式设计要求：整体版式要像「潮流杂志内页 + 专业形象顾问提案板」，不要像普通表格、说明书或电商拼图。
设计元素：大标题、Before/After 标签、箭头、分割线、编号模块、半透明信息卡片、局部斜切块、错位网格、轻微层叠卡片、杂志式留白
背景色：主色白色/浅灰/米白，强调色炭黑/橄榄绿/钴蓝/金属银

内容模块：
1. 风格主题 / Style Direction — 自动判断最适合的升级方向
2. 核心变化点 / Key Upgrades — 5-6 个短标签展示改造亮点
3. 色系选择 / Color Palette — 主色3个+辅助色2个+点缀色1个
4. 材质构成 / Materials — 4-5 种关键材质+简短说明
5. 廓形/比例策略 / Silhouette Strategy — 3-5 条让 After 更帅的关键策略
6. 推荐 Look / Outfit Ideas — 3 套完整穿搭（日常通勤/周末出街/约会漫步）
7. 关键单品升级 / Key Pieces — 5-6 个最能带来改造感的单品
8. 细节说明 / Detail Notes — 局部放大圆形注释
9. 总结 / Summary — 底部清晰总结

严格避免：
- After 古板、老气、商务化、成熟过头
- 只是普通夹克+普通裤子，缺少潮流感
- 全身灰黑导致沉闷
- 像保险销售、办公室通勤、老干部穿搭
- 过度暗黑、过度机能、过度先锋
- 像 Excel 表格、PPT 模板、电商拼图
- Before 和 After 不像同一个人

最终输出：用户第一眼应感受到"改造后明显更帅、更潮、更会穿"，第二眼应感受到"这是一份专业、精致、有设计感、可执行的个人穿搭升级方案"。`;

// Key pieces data from style-system
const KEY_PIECES_DATA = [
  { name: "白色圆领T恤", desc: "万能内搭，叠穿神器" },
  { name: "直筒牛仔裤", desc: "修饰腿型，四季可穿" },
  { name: "工装夹克", desc: "硬朗有型，层次利器" },
  { name: "德训鞋", desc: "复古百搭，通勤首选" },
  { name: "简约双肩包", desc: "实用耐看，学院风" },
];

// Materials data from style-system
const MATERIALS_DATA = [
  { name: "纯棉", desc: "透气舒适，适合春夏内搭" },
  { name: "羊毛混纺", desc: "保暖有质感，适合秋冬外穿" },
  { name: "丹宁布", desc: "耐磨经典，牛仔裤核心面料" },
  { name: "亚麻", desc: "轻盈透气，夏季首选" },
  { name: "皮革", desc: "鞋履与配饰的灵魂材质" },
];

// Color palettes for image diagnosis
const IMAGE_COLOR_PALETTES = [
  { role: "主色", colors: ["#1A1A1A", "#FFFFFF", "#F5F5F5"] },
  { role: "辅助色", colors: ["#4A5568", "#C3B091"] },
  { role: "点缀色", colors: ["#C0C0C0"] },
];

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    // Read knowledge base
    const knowledge = getKnowledgeForTool("image-diagnosis");

    // Select a style quadrant randomly for variety
    const selectedQuadrant = STYLE_QUADRANTS[Math.floor(Math.random() * STYLE_QUADRANTS.length)];
    
    // Select a color formula for palette
    const selectedColorFormula = COLOR_FORMULAS[Math.floor(Math.random() * COLOR_FORMULAS.length)];

    // Generate match score (75-95)
    const matchScore = Math.floor(75 + Math.random() * 21);

    // Build enhanced analysis
    const enhancedAnalysis = {
      styleDirection: `${selectedQuadrant.name} / ${selectedQuadrant.nameEn}`,
      matchScore,
      keyUpgrades: [
        "短外套重构比例，视觉显高5cm",
        "内搭层次感，从单品到叠穿",
        "裤型升级，直筒/微阔修饰腿型",
        "精致配饰，项链手表提升精致度",
        "鞋型换新，德训/板鞋增加潮流感",
        "整体色调统一，告别杂乱配色",
      ],
      colorPalette: {
        role: selectedColorFormula.name,
        colors: selectedColorFormula.colors,
      },
      materials: MATERIALS_DATA,
      silhouetteStrategies: [
        "短外套+高腰裤，拉高视觉腰线",
        "内搭塞入裤腰，制造清晰腰线",
        "Oversize外套配修身下装，松紧对比",
        "竖向色彩呼应，拉长身形比例",
        "卷袖口露下手臂，增加线条感",
      ],
      outfitIdeas: [
        {
          scene: "通勤",
          desc: "干净利落的职场穿搭，简约有精神",
          items: ["白色衬衫+卷袖", "卡其直筒裤", "棕色皮鞋", "简约皮带"],
        },
        {
          scene: "周末",
          desc: "松弛有型的街头休闲，舒适又时髦",
          items: ["灰色卫衣", "直筒牛仔裤", "白色板鞋", "斜挎包"],
        },
        {
          scene: "约会",
          desc: "精致有品味的约会穿搭，低调显气质",
          items: ["黑色针织开衫", "白色圆领T", "深灰西裤", "复古跑鞋"],
        },
      ],
      keyPieces: KEY_PIECES_DATA.map((kp: { name: string }) => kp.name),
      avoidStyles: [
        "全身灰黑沉闷无趣",
        "过大过长的T恤压身高",
        "皱巴巴的面料显廉价",
        "logo堆砌的暴发户感",
        "过于紧身的束缚感",
      ],
      styleCorrelation: [
        "Clean Fit",
        "City Boy",
        "韩系轻潮",
        "Urban Casual",
        "日系简约街头",
      ],
      expertTips: [
        "白色T恤作为万能内搭，多备几件不同厚度",
        "裤长控制在脚踝上方，避免堆叠",
        "配饰少量精致，项链手表二选一",
        "鞋履决定风格，德训鞋适配大多数场景",
        "颜色不超过三种，主次分明",
      ],
      knowledgeSource: [
        "Obsidian/穿搭知识库/穿搭底层逻辑与三步变帅.md",
        "Obsidian/穿搭知识库/套装照抄合集",
        "Obsidian/穿搭知识库/男士配色完全指南.md",
        "Obsidian/穿搭知识库/穿搭细节与配饰进阶.md",
      ],
    };

    let reportImage: string | null = null;
    let mockMode = false;

    if (isStepfunConfigured()) {
      try {
        reportImage = await stepfunEditImage(IMAGE_DIAGNOSIS_PROMPT, photoUrl);
      } catch (e) {
        console.error("StepFun error:", e);
      }
    }

    if (!reportImage) {
      mockMode = true;
      reportImage =
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600";
    }

    return NextResponse.json({
      reportImage,
      mock: mockMode,
      enhancedAnalysis,
    });
  } catch (e) {
    console.error("image-diagnosis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}