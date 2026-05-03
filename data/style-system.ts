/**
 * 风格体系完整数据
 * 来源：Obsidian 穿搭知识库 / 穿搭底层逻辑与三步变帅.md + 套装照抄合集
 */

export interface StyleQuadrant {
  id: string;
  name: string;
  nameEn: string;
  keywords: string[];
  description: string;
  coreItems: string[];
  mood: string;
  suitableScenes: string[];
  colorSuggestion: string[];
  avoidItems: string[];
}

export interface OutfitFormula {
  id: string;
  name: string;
  style: string;
  season: string; // "spring" | "summer" | "autumn" | "winter" | "all" | "spring,autumn"
  scene: string;
  items: { name: string; price: string; color?: string; note?: string }[];
  totalPrice: string;
  colorNote: string;
  keyPoint: string;
}

export interface LayeringTechnique {
  id: string;
  name: string;
  description: string;
 适用场景: string;
  effect: string;
}

/* ─── 风格四象限 ─── */
export const STYLE_QUADRANTS: StyleQuadrant[] = [
  {
    id: "quiet-luxury",
    name: "老钱松弛",
    nameEn: "Quiet Luxury",
    keywords: ["克制", "质感", "不费力", "松弛", "贵气"],
    description: "不张扬却透露出高级感，穿得贵不如穿得对。注重面料、剪裁和配色克制，看起来毫不费力却质感十足。",
    coreItems: ["针织衫", "亚麻裤", "勃肯鞋", "简约皮带手表", "羊绒大衣"],
    mood: "松弛、克制、质感、贵气",
    suitableScenes: ["约会", "日常", "轻商务", "艺术展", "咖啡馆"],
    colorSuggestion: ["米白", "燕麦色", "深灰", "藏蓝", "棕色", "黑色"],
    avoidItems: ["大logo", "过度设计", "荧光色", "浮夸配饰", "皱巴巴的面料"]
  },
  {
    id: "japanese-retro",
    name: "日系复古",
    nameEn: "Japanese Retro",
    keywords: ["干净", "层次", "文艺", "简约", "少年感"],
    description: "强调层次感和少年感，用基础单品叠穿出文艺氛围。颜色克制，版型偏宽松，整体干净有气质。",
    coreItems: ["条纹衫", "直筒裤", "帆布鞋", "工装外套", "简约双肩包"],
    mood: "干净、文艺、少年感、日系",
    suitableScenes: ["校园", "日常", "逛街", "旅行", "咖啡馆"],
    colorSuggestion: ["白", "藏蓝", "浅灰", "卡其", "军绿", "条纹"],
    avoidItems: ["紧身款", "高饱和色", "商务正装", "过于成熟的款式", "logo堆砌"]
  },
  {
    id: "sports-casual",
    name: "运动休闲",
    nameEn: "Sports Casual",
    keywords: ["功能", "舒适", "活力", "减龄", "年轻感"],
    description: "以运动单品为核心，舒适又有活力。适合日常出行、运动场景，强调功能性和穿着者的年轻状态。",
    coreItems: ["夹克", "束脚裤", "跑鞋", "运动袜", "棒球帽"],
    mood: "活力、年轻、舒适、功能",
    suitableScenes: ["运动", "日常", "校园", "出街", "郊游"],
    colorSuggestion: ["黑", "白", "灰", "藏蓝", "橙色点缀", "绿色点缀"],
    avoidItems: ["皮鞋", "西装面料", "正式场合穿搭", "皱褶", "不干净的运动鞋"]
  },
  {
    id: "workwear-hardcore",
    name: "工装硬朗",
    nameEn: "Workwear Hardcore",
    keywords: ["口袋", "厚重", "耐磨", "硬派", "户外"],
    description: "以工装、军装单品为核心，强调实用性和硬派气质。面料厚重，配色沉稳，适合户外和街头。",
    coreItems: ["工装外套", "工装裤", "工装靴", "战术背心", "军事风包袋"],
    mood: "硬派、户外、工装、粗犷",
    suitableScenes: ["户外", "街头", "旅行", "露营", "日常"],
    colorSuggestion: ["军绿", "卡其", "深棕", "黑色", "藏蓝", "沙漠色"],
    avoidItems: ["蕾丝", "亮片", "紧身款", "薄纱面料", "过于女性化的设计"]
  }
];

/* ─── 穿搭公式 ─── */
export const OUTFIT_FORMULAS: OutfitFormula[] = [
  // ── 通勤公式 ──
  {
    id: "formula-commute-1",
    name: "经典白T组合",
    style: "通勤",
    season: "all",
    scene: "日常通勤/上课",
    items: [
      { name: "纯色T恤", color: "白色", price: "¥50-150" },
      { name: "直筒牛仔裤", color: "水洗蓝", price: "¥120-300" },
      { name: "简约板鞋", color: "白色", price: "¥100-300" },
      { name: "简约双肩包", color: "深色", price: "¥80-200" }
    ],
    totalPrice: "¥350-950",
    colorNote: "白 + 水洗蓝 + 白 = 清爽学院风",
    keyPoint: "白T塞入裤腰，系皮带，干净利落"
  },
  {
    id: "formula-commute-2",
    name: "衬衫通勤组合",
    style: "通勤",
    season: "all",
    scene: "上班/面试/商务",
    items: [
      { name: "条纹衬衫（卷袖）", color: "蓝白条纹", price: "¥100-250" },
      { name: "垂感西裤", color: "卡其", price: "¥100-250" },
      { name: "皮质休闲鞋", color: "棕色", price: "¥200-500" },
      { name: "简约皮带", color: "棕色", price: "¥50-150" }
    ],
    totalPrice: "¥450-1150",
    colorNote: "蓝白条纹 + 卡其 + 棕 = 休闲通勤风",
    keyPoint: "衬衫卷袖露出前臂，正式又不失休闲感"
  },
  // ── 约会公式 ──
  {
    id: "formula-date-1",
    name: "针织开衫组合",
    style: "约会",
    season: "spring/autumn",
    scene: "约会/聚餐/见面",
    items: [
      { name: "针织开衫", color: "黑色/深蓝", price: "¥100-300" },
      { name: "纯色T恤", color: "白色", price: "¥50-150" },
      { name: "垂感西裤", color: "深灰", price: "¥100-250" },
      { name: "复古跑鞋", color: "米白", price: "¥150-400" }
    ],
    totalPrice: "¥400-1100",
    colorNote: "黑 + 白 + 深灰 = 精致有亲和力",
    keyPoint: "针织开衫敞开穿，内搭塞入裤腰，精致感"
  },
  {
    id: "formula-date-2",
    name: "牛仔夹克组合",
    style: "约会",
    season: "spring/autumn",
    scene: "约会/逛街/拍照",
    items: [
      { name: "牛仔夹克", color: "深蓝", price: "¥150-300" },
      { name: "白衬衫（只扣一颗）", color: "白色", price: "¥80-200" },
      { name: "直筒牛仔裤", color: "深蓝", price: "¥120-300" },
      { name: "帆布鞋", color: "低帮白", price: "¥80-150" }
    ],
    totalPrice: "¥430-950",
    colorNote: "深蓝 + 白 + 深蓝 = 层次丰富又干净",
    keyPoint: "衬衫只扣一颗扣子制造随意感，配手表或手链"
  },
  // ── 场景公式 ──
  {
    id: "formula-layer-spring",
    name: "三层叠穿组合",
    style: "休闲",
    season: "spring/autumn",
    scene: "春秋换季/温差大",
    items: [
      { name: "纯色高领/白T恤", color: "黑/白", price: "¥50-150" },
      { name: "格子衬衫/针织开衫", color: "卡其/灰", price: "¥100-250" },
      { name: "工装夹克/牛仔夹克", color: "军绿/深蓝", price: "¥150-400" }
    ],
    totalPrice: "¥300-800",
    colorNote: "内深外浅 or 内浅外深皆可",
    keyPoint: "外套袖子随意卷起，制造松弛感"
  },
  // ── 懒人套装 ──
  {
    id: "formula-lazy-summer-1",
    name: "老钱松弛风（夏季）",
    style: "夏季懒人",
    season: "summer",
    scene: "日常/约会/出街",
    items: [
      { name: "亨利领针织衫", color: "浅色", price: "¥166", note: "莱赛尔混纺亚麻，不闷热" },
      { name: "微锥亚麻裤", color: "米白/卡其", price: "¥359", note: "垂感利落" }
    ],
    totalPrice: "¥525",
    colorNote: "米白 + 浅色 = 高级松弛感",
    keyPoint: "面料选择有质感，亚麻垂坠感强"
  },
  {
    id: "formula-lazy-summer-2",
    name: "日系复古风（夏季）",
    style: "夏季懒人",
    season: "summer",
    scene: "日常/校园/旅行",
    items: [
      { name: "水墨花卉T恤", color: "黑白", price: "¥148", note: "240克索罗娜凉感面料" },
      { name: "弯刀裤", color: "深色", price: "¥239" }
    ],
    totalPrice: "¥387",
    colorNote: "黑白配 + 深色裤 = 日系干净",
    keyPoint: "宽松版型，不紧绷"
  },
  {
    id: "formula-lazy-summer-3",
    name: "美式复古工装风",
    style: "夏季懒人",
    season: "summer",
    scene: "日常/街头/出街",
    items: [
      { name: "工装夹克", color: "棉籽壳原胚白", price: "¥148", note: "灯芯绒领" },
      { name: "工装裤", color: "军绿/卡其", price: "¥139" }
    ],
    totalPrice: "¥287",
    colorNote: "军绿 + 原胚白 = 工装感强",
    keyPoint: "整体色调统一，面料有质感"
  }
];

/* ─── 穿搭手法技巧 ─── */
export const LAYERING_TECHNIQUES: LayeringTechnique[] = [
  {
    id: "roll-sleeve",
    name: "卷袖口的「自然折叠法」",
    description: "不要整齐地卷两层，而是随意卷1-2次，露出前臂线条。先向外翻折一圈（约5cm），再随意翻折一圈，调整到前臂最粗的地方停止。",
    适用场景: "春夏卷袖",
    effect: "增加线条感，减少正式感"
  },
  {
    id: "tuck-half",
    name: "塞衣角技巧",
    description: "全塞：全部塞入裤腰，系皮带，适合正式场合；半塞：只塞前面中间部分，适合休闲日常；侧塞：塞一侧，另一侧自然垂落，适合拍照造型。",
    适用场景: "塞入裤腰制造腰线",
    effect: "显高、显精神、比例更好"
  },
  {
    id: "roll-hem",
    name: "裤脚窄边卷法",
    description: "裤脚向上翻折约2-3cm，再翻一层，调整至脚踝最细处上方。宽边卷法翻折5-7cm，适合工装裤、牛仔裤。",
    适用场景: "九分裤/长裤调节",
    effect: "显瘦、显利落、露出脚踝"
  },
  {
    id: "shoulder-drap",
    name: "外套肩披法",
    description: "将薄外套从背后搭在肩上，一只手穿过袖管，另一边自然垂落。调整位置保持平衡。",
    适用场景: "春秋季室内外温差大",
    effect: "层次感增加，减少手持外套的累赘"
  },
  {
    id: "belt-match",
    name: "腰带颜色统一",
    description: "腰带颜色与鞋履一致（棕色皮鞋→棕色皮带）；材质统一（皮鞋配皮带，帆布鞋配帆布腰带）；选简洁针扣，不选大logo。",
    适用场景: "通勤/正式场合",
    effect: "整体感强，细节讲究"
  }
];

/* ─── 四季核心变化 ─── */
export const SEASONAL_VARIATION = {
  spring: {
    keyword: "薄外套+内搭",
    layering: "三层叠穿，外套变化应对换季",
    mustHave: ["薄夹克", "条纹T恤", "直筒裤"]
  },
  summer: {
    keyword: "清爽+层次",
    layering: "衬衫外罩/叠穿背心制造层次",
    mustHave: ["纯色T恤", "百慕大短裤", "透气面料"]
  },
  autumn: {
    keyword: "叠穿+夹克",
    layering: "内搭+中层+外套三层叠穿",
    mustHave: ["工装夹克", "针织衫", "高领内搭"]
  },
  winter: {
    keyword: "保暖不臃肿",
    layering: "外套厚，内搭薄，避免层层叠加",
    mustHave: ["黑色羽绒服", "高领毛衣", "深色直筒裤"]
  }
};
