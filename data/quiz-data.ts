/**
 * 个人风格测试 · 题目数据
 * 核心模型：直线/曲线 × 大量感/小量感
 * 数据来源：Obsidian穿搭知识库 + twork quizQuestions
 */

export interface QuizOption {
  text: string;
  lineScore: number;   // 直线型得分
  curveScore: number; // 曲线型得分
  volumeScore: number; // 量感得分
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface StyleQuadrantResult {
  id: string;
  name: string;
  nameEn: string;
  line: '直线型' | '曲线型';
  volume: '大量感' | '小量感';
  keywords: string[];
  description: string;
  suitableStyles: string[];
  suitableColors: string[];
  avoidStyles: string[];
  avoidColors: string[];
  coreItems: string[];
  celebrities: string[];
  suitableScenes: string[];
}

// 四象限定义（与 style-system.ts 的 STYLE_QUADRANTS 对齐）
export const QUIZ_STYLE_QUADRANTS: StyleQuadrantResult[] = [
  {
    id: 'quiet-luxury',
    name: '老钱松弛',
    nameEn: 'Quiet Luxury',
    line: '直线型',
    volume: '大量感',
    keywords: ['克制', '质感', '松弛', '贵气', '不费力'],
    description: '不张扬却透露出高级感，穿得贵不如穿得对。注重面料、剪裁和配色克制，看起来毫不费力却质感十足。',
    suitableStyles: ['老钱松弛', '轻熟商务', '暗黑机能', '美式复古', '智性轻熟'],
    suitableColors: ['米白', '燕麦色', '深灰', '藏蓝', '棕色', '黑色'],
    avoidStyles: ['大logo', '过度设计', '浮夸配饰', '皱巴巴的面料'],
    avoidColors: ['荧光色', '高饱和撞色', '花哨图案'],
    coreItems: ['针织衫', '亚麻裤', '勃肯鞋', '简约皮带/手表', '羊绒大衣'],
    celebrities: ['胡军', '彭于晏', '张涵予', '吴京'],
    suitableScenes: ['约会', '日常', '轻商务', '艺术展', '咖啡馆'],
  },
  {
    id: 'japanese-retro',
    name: '日系复古',
    nameEn: 'Japanese Retro',
    line: '曲线型',
    volume: '小量感',
    keywords: ['干净', '层次', '文艺', '少年感', '简约'],
    description: '强调层次感和少年感，用基础单品叠穿出文艺氛围。颜色克制，版型偏宽松，整体干净有气质。',
    suitableStyles: ['日系复古', '韩系盐系', '学院风', '文艺清新', 'Clean Fit'],
    suitableColors: ['白色', '藏蓝', '浅灰', '卡其', '军绿', '条纹'],
    avoidStyles: ['紧身款', '高饱和色', '商务正装', '过于成熟的款式'],
    avoidColors: ['纯黑', '深紫', '大红色', '荧光色'],
    coreItems: ['条纹衫', '直筒裤', '帆布鞋', '工装外套', '简约双肩包'],
    celebrities: ['张国荣', '林志颖', '王源', '何炅'],
    suitableScenes: ['校园', '日常', '逛街', '旅行', '咖啡馆'],
  },
  {
    id: 'urban-minimal',
    name: '都市极简',
    nameEn: 'Urban Minimal',
    line: '直线型',
    volume: '小量感',
    keywords: ['清冷', '精致', '高级', '氛围感', '距离感'],
    description: '以黑白灰无色彩系为主，版型利落，强调冷感和精致感。适合追求高级感的都市男性。',
    suitableStyles: ['Urban休闲', 'Clean Fit', '盐系', '老钱松弛', '极简主义'],
    suitableColors: ['黑色', '白色', '灰色', '藏蓝', '军绿'],
    avoidStyles: ['老年款', '宽松Oversized', '复杂图案', '大logo'],
    avoidColors: ['花色', '过于鲜艳', '老年款颜色'],
    coreItems: ['黑色打底', '直筒裤', '简约球鞋', '工装马甲', '白衬衫'],
    celebrities: ['丁真', '王鹤棣', '吴磊', '陈坤'],
    suitableScenes: ['通勤', '日常', '约会', '街头', '拍照'],
  },
  {
    id: 'casual-dynamic',
    name: '慵懒有型',
    nameEn: 'Casual Dynamic',
    line: '曲线型',
    volume: '大量感',
    keywords: ['大气', '慵懒', '有存在感', '幽默', '雅痞'],
    description: '整体偏暖调，版型宽松但有存在感。适合有魅力、有亲和力的大气风格，不追求极致精致但有独特的品味感。',
    suitableStyles: ['雅痞风', '复古文艺', '霸道总裁', '轻熟休闲', '老钱松弛'],
    suitableColors: ['深色系', '酒红', '墨绿', '深棕', '藏青'],
    avoidStyles: ['臃肿', '不修边幅', '过于紧身', '可爱风格'],
    avoidColors: ['臃肿的浅色', '荧光色', '粉红'],
    coreItems: ['西装外套', '直筒大衣', '修身长裤', '乐福鞋', '高领毛衣'],
    celebrities: ['沙溢', '黄晓明', '邓超', '沈腾'],
    suitableScenes: ['约会', '聚会', '日常', '轻商务', '拍照'],
  },
];

// 10道测试题
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '您的脸型整体轮廓更接近哪种？',
    options: [
      { text: '棱角分明，下颌线清晰', lineScore: 2, curveScore: 0, volumeScore: 1 },
      { text: '线条柔和，脸部圆润', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '额头宽，下巴尖，呈倒三角', lineScore: 1, curveScore: 1, volumeScore: 0 },
      { text: '脸部各部分都比较均衡', lineScore: 1, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 2,
    question: '您的五官给人的第一感觉是？',
    options: [
      { text: '深邃、立体、攻击性强', lineScore: 2, curveScore: 0, volumeScore: 2 },
      { text: '柔和、温暖、无距离感', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '精致、清冷、高级感', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '亲切、自然、接地气', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 3,
    question: '您更适合哪种风格的衣服？',
    options: [
      { text: '硬挺的皮衣、工装', lineScore: 2, curveScore: 0, volumeScore: 1 },
      { text: '柔软的针织、毛衣', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '简约的白衬衫、纯色T恤', lineScore: 1, curveScore: 1, volumeScore: 0 },
      { text: '休闲的卫衣、牛仔裤', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 4,
    question: '您希望给别人留下什么印象？',
    options: [
      { text: '成熟、可靠、有领导力', lineScore: 1, curveScore: 0, volumeScore: 2 },
      { text: '温暖、亲切、好相处', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '时尚、高级、有品位', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '随性、慵懒、有魅力', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 5,
    question: '您更喜欢哪种颜色的衣服？',
    options: [
      { text: '黑色、深灰、军绿', lineScore: 2, curveScore: 0, volumeScore: 1 },
      { text: '白色、浅蓝、米色', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '黑白灰，无色彩系', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '酒红、墨绿、深棕', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 6,
    question: '您的身材属于哪种类型？',
    options: [
      { text: '高大、魁梧、有存在感', lineScore: 1, curveScore: 0, volumeScore: 2 },
      { text: '中等、精瘦、少年感', lineScore: 1, curveScore: 1, volumeScore: 0 },
      { text: '高大但偏瘦，肩不太宽', lineScore: 1, curveScore: 1, volumeScore: 1 },
      { text: '中等偏壮（肩宽或胯宽）', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 7,
    question: '您平时喜欢什么风格的装修/环境？',
    options: [
      { text: '工业风、暗黑系', lineScore: 2, curveScore: 0, volumeScore: 1 },
      { text: '北欧风、简约白', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '极简主义、断舍离', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '复古文艺、混搭', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 8,
    question: '您更喜欢哪种明星风格？',
    options: [
      { text: '胡军、吴京式硬汉', lineScore: 2, curveScore: 0, volumeScore: 2 },
      { text: '张国荣、林志颖式暖男', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '王鹤棣、丁真式清冷', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '黄晓明、沈腾式雅痞', lineScore: 0, curveScore: 1, volumeScore: 2 },
    ],
  },
  {
    id: 9,
    question: '您觉得自己的气质更接近？',
    options: [
      { text: '大哥/领导', lineScore: 2, curveScore: 0, volumeScore: 2 },
      { text: '学长/暖男', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '清冷男神/氛围感', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '幽默有魅力的大叔', lineScore: 0, curveScore: 1, volumeScore: 1 },
    ],
  },
  {
    id: 10,
    question: '如果去约会，您会穿什么？',
    options: [
      { text: '皮夹克+牛仔裤，帅气逼人', lineScore: 2, curveScore: 0, volumeScore: 1 },
      { text: '白衬衫+针织衫，温暖干净', lineScore: 0, curveScore: 2, volumeScore: 0 },
      { text: '黑色高领+直筒裤，简约高级', lineScore: 2, curveScore: 0, volumeScore: 0 },
      { text: '西装外套，成熟有魅力', lineScore: 0, curveScore: 1, volumeScore: 2 },
    ],
  },
];

/**
 * 计算风格象限
 * 规则：直线 > 曲线 → 直线型；反之曲线型
 * 量感 ≥ 3 → 大量感；反之小量感
 */
export function calculateQuadrant(
  lineScore: number,
  curveScore: number,
  volumeScore: number
): StyleQuadrantResult {
  const isLine = lineScore > curveScore;
  const isLarge = volumeScore >= 3;

  if (isLine && isLarge) return QUIZ_STYLE_QUADRANTS[0]; // 老钱松弛
  if (!isLine && !isLarge) return QUIZ_STYLE_QUADRANTS[1]; // 日系复古
  if (isLine && !isLarge) return QUIZ_STYLE_QUADRANTS[2]; // 都市极简
  return QUIZ_STYLE_QUADRANTS[3]; // 慵懒有型
}
