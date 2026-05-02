import { StyleQuadrant } from '@/types/marketplace';

// ============================================================
// OUTFIT FORMULAS - 穿搭公式数据
// 来源: Obsidian 穿搭知识库
// ============================================================

// -------------------- 场景穿搭公式 --------------------
export interface OutfitFormula {
  id: string;
  scene: '通勤' | '约会' | '休闲' | '正式';
  name: string;
  description: string;
  items: {
    layer: string;
    item: string;
    color: string;
    alternative?: string;
  }[];
  colorTip?: string;
  plusItems?: string[];
}

export const OUTFIT_FORMULAS: OutfitFormula[] = [
  // 通勤公式
  {
    id: 'commute-1',
    scene: '通勤',
    name: '经典白T组合',
    description: '清爽学院风，适合学生和上班族日常穿着',
    items: [
      { layer: '上衣', item: '纯色T恤', color: '白色', alternative: '浅灰、黑' },
      { layer: '裤装', item: '直筒牛仔裤', color: '水洗蓝', alternative: '深蓝、黑' },
      { layer: '鞋子', item: '简约板鞋', color: '白色', alternative: '黑、灰' },
      { layer: '包袋', item: '简约双肩包', color: '深色', alternative: '帆布单肩包' },
    ],
    colorTip: '白 + 水洗蓝 + 白 = 清爽学院风',
  },
  {
    id: 'commute-2',
    scene: '通勤',
    name: '衬衫通勤组合',
    description: '条纹衬衫卷袖，正式感与休闲感并存',
    items: [
      { layer: '上衣', item: '条纹衬衫（卷袖）', color: '蓝白条纹', alternative: '白、浅蓝' },
      { layer: '裤装', item: '垂感西裤', color: '卡其', alternative: '黑、灰' },
      { layer: '鞋子', item: '皮质休闲鞋', color: '棕色', alternative: '黑' },
      { layer: '配件', item: '简约皮带', color: '棕色', alternative: '黑' },
    ],
    colorTip: '蓝白条纹 + 卡其 + 棕 = 休闲通勤风',
  },
  {
    id: 'commute-3',
    scene: '通勤',
    name: '卫衣慵懒风',
    description: '慵懒氛围、拉长腿部比例，轻熟气质',
    items: [
      { layer: '上衣', item: '半开襟华夫格卫衣', color: '深色' },
      { layer: '裤装', item: '条纹阔腿西裤', color: '深色' },
      { layer: '鞋子', item: '疯马皮勃肯鞋', color: '棕色' },
    ],
    plusItems: ['搭配时塞入部分衣角，拉长比例'],
  },
  {
    id: 'commute-4',
    scene: '通勤',
    name: '夹克通勤风',
    description: '舒适垂顺、不拘束，低调高级',
    items: [
      { layer: '上衣', item: '莫代尔夹克', color: '深色' },
      { layer: '内搭', item: '格纹衬衫', color: '卡其/灰' },
      { layer: '裤装', item: '黑色西裤', color: '黑色' },
      { layer: '鞋子', item: '休闲鞋', color: '深色' },
    ],
  },
  // 约会公式
  {
    id: 'date-1',
    scene: '约会',
    name: '针织开衫组合',
    description: '干净、有亲和力，带一点小精致',
    items: [
      { layer: '外套', item: '针织开衫', color: '黑色', alternative: '深蓝、灰色' },
      { layer: '内搭', item: '纯色T恤', color: '白色', alternative: '浅灰' },
      { layer: '裤装', item: '垂感西裤', color: '深灰', alternative: '黑、卡其' },
      { layer: '鞋子', item: '复古跑鞋', color: '米白', alternative: '灰、深蓝' },
    ],
    plusItems: ['打理一下发型', '喷一点淡香水'],
  },
  {
    id: 'date-2',
    scene: '约会',
    name: '牛仔夹克组合',
    description: '帅气不羁，带一点休闲精致感',
    items: [
      { layer: '外套', item: '牛仔夹克', color: '深蓝', alternative: '黑、水洗蓝' },
      { layer: '内搭', item: '白衬衫（只扣一颗）', color: '白色', alternative: '浅蓝条纹' },
      { layer: '裤装', item: '直筒牛仔裤', color: '深蓝', alternative: '黑' },
      { layer: '鞋子', item: '帆布鞋', color: '低帮白', alternative: '黑' },
    ],
    plusItems: ['简约金属手链或一块手表'],
  },
];

// -------------------- 套装合集 --------------------
export interface OutfitSuit {
  id: string;
  season: '春夏' | '秋冬' | '通用';
  style: string;
  name: string;
  keywords: string[];
  suitableScene: string[];
  items: {
    name: string;
    price?: string;
    note?: string;
  }[];
}

export const OUTFIT_SUITS: OutfitSuit[] = [
  // 秋冬套装
  {
    id: 'suit-winter-1',
    season: '秋冬',
    style: '工装羽绒风',
    name: '工装羽绒风',
    keywords: ['工装', '户外', '保暖'],
    suitableScene: ['日常', '户外', '通勤'],
    items: [
      { name: '工装羽绒服', price: '¥1299' },
      { name: '速干T恤', price: '¥119' },
      { name: '露营工装裤', price: '¥212' },
      { name: 'Kappa老爹鞋', price: '¥349' },
    ],
  },
  {
    id: 'suit-winter-2',
    season: '秋冬',
    style: '京造羽绒风',
    name: '京造羽绒风',
    keywords: ['简约', '实用', '性价比'],
    suitableScene: ['日常', '通勤'],
    items: [
      { name: '京东京造羽绒服', price: '¥349' },
      { name: '连帽卫衣', price: '¥169' },
      { name: '工装裤', price: '¥140' },
      { name: 'Kappa老爹鞋', price: '¥349' },
    ],
  },
  {
    id: 'suit-winter-3',
    season: '秋冬',
    style: '羽绒内胆叠穿',
    name: '羽绒内胆叠穿',
    keywords: ['叠穿', '层次感', '保暖'],
    suitableScene: ['日常', '通勤', '约会'],
    items: [
      { name: '羽绒服内胆', price: '¥229' },
      { name: '格子衬衫', price: '¥200' },
      { name: '保暖内搭', price: '¥55' },
      { name: '露营工装裤', price: '¥212' },
      { name: '黑色碎冰鞋', price: '¥170' },
    ],
  },
  // 夏季套装
  {
    id: 'suit-summer-1',
    season: '春夏',
    style: '老钱松弛风',
    name: '老钱松弛风',
    keywords: ['松弛', '质感', '克制'],
    suitableScene: ['约会', '日常', '休闲'],
    items: [
      { name: '亨利领针织衫', price: '¥166', note: '半开襟，莱赛尔混纺亚麻，不闷热' },
      { name: '微锥亚麻裤', price: '¥359', note: '垂感利落' },
    ],
  },
  {
    id: 'suit-summer-2',
    season: '春夏',
    style: '日系复古风',
    name: '日系复古风',
    keywords: ['干净', '层次', '文艺'],
    suitableScene: ['日常', '休闲'],
    items: [
      { name: '水墨花卉T恤', price: '¥148', note: '240克索罗娜凉感面料' },
      { name: '弯刀裤', price: '¥239' },
    ],
  },
  {
    id: 'suit-summer-3',
    season: '春夏',
    style: '运动休闲风',
    name: '运动休闲风',
    keywords: ['功能', '舒适', '活力'],
    suitableScene: ['运动', '日常', '户外'],
    items: [
      { name: '骑行夹克', price: '¥229', note: '反光条+网布拼色' },
      { name: '短裤', price: '¥139', note: '隐藏拉链网布透气' },
    ],
  },
  {
    id: 'suit-summer-4',
    season: '春夏',
    style: '黑科技纸纱衬衫',
    name: '黑科技纸纱衬衫',
    keywords: ['轻薄', '透气', '高级'],
    suitableScene: ['通勤', '约会', '正式'],
    items: [
      { name: '纸纱衬衫', price: '¥263', note: '透气性是棉麻3倍，整件不到240g' },
      { name: '老钱风西裤', price: '¥166', note: '活动价质感高级' },
    ],
  },
  {
    id: 'suit-summer-5',
    season: '春夏',
    style: '美式复古工装风',
    name: '美式复古工装风',
    keywords: ['工装', '粗犷', '复古'],
    suitableScene: ['日常', '户外', '休闲'],
    items: [
      { name: '工装夹克', price: '¥148', note: '棉籽壳原胚白面料，灯芯绒领' },
      { name: '工装裤', price: '¥139' },
    ],
  },
  {
    id: 'suit-summer-6',
    season: '春夏',
    style: '解构卫衣风',
    name: '解构卫衣风',
    keywords: ['设计感', '解构', '个性'],
    suitableScene: ['日常', '街头', '聚会'],
    items: [
      { name: '解构开衫卫衣', price: '¥136' },
      { name: '条纹亨利领T恤', price: '¥108' },
      { name: '美式弯刀裤', price: '¥122' },
      { name: '改良足球鞋', price: '¥384' },
    ],
  },
  {
    id: 'suit-summer-7',
    season: '春夏',
    style: '皮衣风格',
    name: '皮衣风格',
    keywords: ['帅气', '硬朗', '型男'],
    suitableScene: ['约会', '聚会', '日常'],
    items: [
      { name: '斜拉链PU皮外套', price: '¥178' },
      { name: '重磅内搭打底衫', price: '¥95' },
      { name: '水洗蓝伐木牛仔裤', price: '¥136' },
      { name: '包头博肯半拖鞋', price: '¥120' },
    ],
  },
  {
    id: 'suit-summer-8',
    season: '春夏',
    style: '哈灵顿夹克风',
    name: '哈灵顿夹克风',
    keywords: ['复古', '利落', '雅痞'],
    suitableScene: ['通勤', '约会', '日常'],
    items: [
      { name: '亚麻哈灵顿夹克', price: '¥334' },
      { name: '双头拉链衬衫', price: '¥248' },
      { name: '黑色直筒牛仔裤', price: '¥123' },
    ],
  },
  // 通勤套装
  {
    id: 'suit-commute-1',
    season: '通用',
    style: '云雾格夹克高智感',
    name: '云雾格夹克高智感',
    keywords: ['智性', '克制', '高智感'],
    suitableScene: ['通勤', '创意工作', '面试'],
    items: [
      { name: '深色格纹夹克' },
      { name: '条纹阔腿西裤' },
      { name: '疯马皮勃肯鞋' },
    ],
  },
  {
    id: 'suit-commute-2',
    season: '通用',
    style: '条纹衬衫经典通勤',
    name: '条纹衬衫经典通勤',
    keywords: ['安全感', '抗皱', '经典'],
    suitableScene: ['通勤', '上班', '正式'],
    items: [
      { name: 'TR混纺条纹衬衫' },
      { name: '牛仔裤' },
      { name: '黑T' },
    ],
  },
];

// -------------------- 四季穿搭 --------------------
export interface SeasonalGuide {
  season: '春季' | '夏季' | '秋季' | '冬季' | '春秋';
  seasonTemp: string;
  core诉求: string;
  layering?: {
    layer: string;
    item: string;
    note?: string;
  }[];
  recommendedItems: {
    category: string;
    items: {
      name: string;
      color?: string;
      material?: string;
      price?: string;
      note?: string;
      temp?: string;
    }[];
  }[];
  avoidItems: {
    wrong: string;
    right: string;
  }[];
}

export const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    season: '夏季',
    seasonTemp: '6-8月，炎热',
    core诉求: '清爽、利落、不闷热，避免单调感',
    recommendedItems: [
      {
        category: '上衣',
        items: [
          { name: '纯色圆领/亨利领T恤', color: '白/灰/浅蓝', material: '纯棉、竹纤维' },
        ],
      },
      {
        category: '裤装',
        items: [
          { name: '百慕大短裤（膝盖上3-5cm）', color: '黑/卡其/深蓝', material: '棉麻、速干' },
        ],
      },
      {
        category: '鞋子',
        items: [
          { name: '帆布鞋/凉鞋/洞洞鞋', color: '白/黑/棕' },
        ],
      },
      {
        category: '袜子',
        items: [
          { name: '船袜（不露出）', color: '与裤子同色' },
        ],
      },
    ],
    avoidItems: [
      { wrong: '紧身五分裤', right: '百慕大短裤，宽度协调' },
      { wrong: '过长堆褶', right: '长度到膝盖上3-5cm' },
      { wrong: '运动短裤配皮鞋', right: '风格统一，运动装配运动鞋' },
    ],
  },
  {
    season: '冬季',
    seasonTemp: '11-2月，寒冷',
    core诉求: '保暖且不臃肿，利用颜色对比和层次搭配实现显瘦效果',
    layering: [
      { layer: '最内层', item: '发热内搭/薄羊绒衫', note: '保暖且不臃肿' },
      { layer: '中间层', item: '毛衣/卫衣/马甲', note: '增加层次' },
      { layer: '最外层', item: '羽绒服/大衣/棉服', note: '防风保暖主力' },
    ],
    recommendedItems: [
      {
        category: '外套',
        items: [
          { name: '黑色羽绒服', price: '300-800元', note: '百搭保暖主力' },
        ],
      },
      {
        category: '内搭',
        items: [
          { name: '灰色高领毛衣', price: '100-300元', note: '内搭显瘦神器' },
          { name: '高领毛衣', note: '保暖且显脖子修长，适合5-15°C' },
          { name: '圆领毛衣', note: '经典百搭，适合10-18°C' },
          { name: '卫衣', note: '休闲保暖，适合8-20°C' },
          { name: '衬衫+毛衣', note: '英伦叠穿经典，适合5-15°C' },
        ],
      },
      {
        category: '裤装',
        items: [
          { name: '深色直筒裤', price: '100-250元', note: '遮肉显腿长' },
        ],
      },
      {
        category: '鞋子',
        items: [
          { name: '黑色工装靴', price: '200-500元', note: '保暖且百搭' },
        ],
      },
    ],
    avoidItems: [
      { wrong: '外深内深（显沉闷）', right: '外深内浅（适合微胖）：黑色外套+白色内搭' },
      { wrong: '层层叠加臃肿', right: '外套厚，内搭薄' },
    ],
  },
  {
    season: '春秋',
    seasonTemp: '3-5月 / 9-10月，温差大',
    core诉求: '灵活应对温差，核心是叠穿',
    layering: [
      { layer: '内层', item: '纯色高领/白T恤', note: '高领只露出一圈领口' },
      { layer: '中层', item: '格子衬衫/针织开衫', note: '敞开穿，露出内搭' },
      { layer: '外层', item: '工装夹克/牛仔夹克', note: '袖子随意卷起' },
    ],
    recommendedItems: [
      {
        category: '外套',
        items: [
          { name: '工装夹克', temp: '15-20°C', color: '军绿、深蓝、卡其' },
          { name: '牛仔夹克', temp: '15-22°C', color: '深蓝、水洗蓝' },
          { name: '风衣', temp: '10-18°C', color: '卡其、深蓝' },
          { name: '针织开衫', temp: '15-22°C', color: '黑、灰、深蓝' },
          { name: '哈灵顿夹克', temp: '12-20°C', color: '军绿、深蓝' },
        ],
      },
      {
        category: '内搭',
        items: [
          { name: '亨利领T恤', note: '半开设计，圆脸方脸适用' },
          { name: '白T恤', note: '纯色正肩，克重220g以上' },
          { name: '条纹T恤', note: '蓝白/黑白条纹，休闲日常' },
          { name: 'Polo衫', note: '翻领设计，通勤轻商务' },
          { name: '针织开衫', note: '薄款，春秋内搭' },
          { name: '背心', note: '外穿或内搭，运动夏季' },
          { name: '高领打底', note: '秋冬保暖内层，叠穿' },
        ],
      },
    ],
    avoidItems: [
      { wrong: '只穿一件外套应付温差', right: '洋葱式叠穿，方便增减' },
      { wrong: '内搭太厚显臃肿', right: '内搭轻薄，外套厚实' },
    ],
  },
];

// -------------------- 配色体系 --------------------
export interface ColorFormula {
  id: string;
  name: string;
  colors: string[];
  effect: string;
  suitableScene: string[];
}

export const COLOR_FORMULAS: ColorFormula[] = [
  { id: 'cf-1', name: '黑白灰永不出错', colors: ['黑', '白', '灰'], effect: '经典安全', suitableScene: ['商务', '休闲', '日常'] },
  { id: 'cf-2', name: '深蓝+白清爽干净', colors: ['深蓝', '白'], effect: '清爽干净', suitableScene: ['春夏日常', '约会'] },
  { id: 'cf-3', name: '卡其+深蓝商务休闲', colors: ['卡其', '深蓝'], effect: '商务休闲', suitableScene: ['通勤', '约会'] },
  { id: 'cf-4', name: '黑+军绿酷感街头', colors: ['黑', '军绿'], effect: '酷感街头', suitableScene: ['休闲', '户外'] },
  { id: 'cf-5', name: '全黑显瘦高级', colors: ['黑'], effect: '显瘦高级', suitableScene: ['任何场景'] },
  { id: 'cf-6', name: '同色系递进层次', colors: ['深蓝+浅蓝+白'], effect: '层次丰富', suitableScene: ['进阶穿搭'] },
  { id: 'cf-7', name: '蓝色系递进', colors: ['深蓝', '浅蓝', '白'], effect: '清爽递进', suitableScene: ['春夏'] },
  { id: 'cf-8', name: '灰色系递进', colors: ['深灰', '浅灰', '白'], effect: '高级灰阶', suitableScene: ['秋冬', '通勤'] },
  { id: 'cf-9', name: '大地色系递进', colors: ['卡其', '棕', '米白'], effect: '温暖自然', suitableScene: ['秋冬', '休闲'] },
];

export interface SkinToneColor {
  skinTone: string;
  suitableColors: string[];
  avoidColors: string[];
}

export const SKIN_TONE_COLORS: SkinToneColor[] = [
  {
    skinTone: '白皙',
    suitableColors: ['几乎都适合', '黑', '白', '灰', '浅蓝', '浅粉'],
    avoidColors: ['荧光色'],
  },
  {
    skinTone: '偏黄',
    suitableColors: ['深蓝', '深灰', '白', '黑'],
    avoidColors: ['土黄', '军绿', '卡其（显更黄）'],
  },
  {
    skinTone: '偏黑',
    suitableColors: ['白', '浅蓝', '浅灰'],
    avoidColors: ['深棕', '墨绿（显暗沉）'],
  },
];

// -------------------- 避坑清单 --------------------
export interface ChecklistItem {
  category: string;
  items: {
    check: string;
    standard?: string;
  }[];
}

export const PRE_FLIGHT_CHECKLIST: ChecklistItem[] = [
  {
    category: '颜色检查',
    items: [
      { check: '全身颜色是否超过3种', standard: '不超过3种为安全区' },
      { check: '是否有两种高饱和度颜色冲突', standard: '红+绿、黄+紫为禁忌' },
    ],
  },
  {
    category: '整洁度检查',
    items: [
      { check: '衣服是否有明显的褶皱' },
      { check: '衣服是否有污渍或褪色' },
      { check: '鞋子是否干净、鞋带是否整齐' },
    ],
  },
  {
    category: '尺寸检查',
    items: [
      { check: '裤子是否太长堆积在脚踝处', standard: '裤脚刚好盖住鞋面1/3' },
      { check: '上衣是否太长显得五五分', standard: '上衣不超过臀部下沿' },
      { check: '肩线是否对齐肩膀' },
    ],
  },
  {
    category: '细节检查',
    items: [
      { check: '发型是否油腻或扁塌', standard: '清爽有型' },
      { check: '袜子颜色是否与整体风格冲突', standard: '与裤子或鞋子同色系' },
      { check: '配饰是否超过2件', standard: '不超过2件' },
    ],
  },
];

export interface StyleMistake {
  title: string;
  wrong: string;
  right: string;
}

export const STYLE_MISTAKES: StyleMistake[] = [
  {
    title: '误区一：盲目追爆款',
    wrong: '看到网红同款就买，不考虑是否适合自己',
    right: '先明确风格定位，爆款≠适合，基础款才是永恒',
  },
  {
    title: '误区二：忽视场合',
    wrong: '穿篮球鞋去面试，穿西装去爬山',
    right: '通勤→简约通勤风 / 约会→干净亲和风 / 运动→运动功能风',
  },
  {
    title: '误区三：尺码不合身',
    wrong: '衣服太紧显局促，太松显邋遢',
    right: 'T恤肩线对齐、微宽松；裤子站立时裤脚刚好到鞋面',
  },
  {
    title: '误区四：颜色搭配混乱',
    wrong: '全身超过5种颜色，撞色翻车',
    right: '新手从3种颜色开始，进阶同色系递进，避免高饱和度撞色',
  },
  {
    title: '误区五：只买上衣不注重下装',
    wrong: '买了10件T恤，只有2条裤子',
    right: '裤装决定风格——想正式换西裤，想休闲换牛仔裤，先把裤子配齐',
  },
  {
    title: '误区六：配饰堆砌',
    wrong: '帽子+项链+手表+手链+耳钉+包=过于复杂',
    right: '配饰不超过2件，选一个视觉焦点即可',
  },
];

export interface QuickFix {
  problem: string;
  solution: string;
}

export const QUICK_FIXES: QuickFix[] = [
  { problem: '衣服太长', solution: '塞衣角（半塞法）' },
  { problem: '裤子太长', solution: '窄边卷裤脚' },
  { problem: '全身太素', solution: '加一条银色项链或换亮色袜子' },
  { problem: '全身太花', solution: '脱掉一件，换成纯色基础款' },
  { problem: '发型扁塌', solution: '用发泥搓揉发根，增加蓬松感' },
  { problem: '鞋子脏了', solution: '湿巾快速擦拭，鞋带重新系紧' },
];

// -------------------- 体型脸型匹配 --------------------
export interface BodyType {
  type: string;
  features: string;
  focus: string;
  recommend: {
    top: string[];
    bottom: string[];
  };
  avoid: string[];
}

export const BODY_TYPES: BodyType[] = [
  {
    type: '倒三角体型（V形）',
    features: '肩宽>腰宽，上半身壮实',
    focus: '平衡上下身比例',
    recommend: { top: ['直筒T恤', 'V领', '避免垫肩'], bottom: ['直筒裤', '微锥裤，增加下身量感'] },
    avoid: ['紧身上衣凸显肩腰差'],
  },
  {
    type: '矩形体型（H形）',
    features: '肩宽≈腰宽≈臀宽',
    focus: '制造腰线，增加层次感',
    recommend: { top: ['叠穿', '落肩款', '有口袋设计'], bottom: ['任何版型均可'] },
    avoid: ['紧身款暴露身材平淡'],
  },
  {
    type: '三角体型（A形）',
    features: '臀宽>肩宽，下半身壮实',
    focus: '增加上半身视觉量感',
    recommend: { top: ['横条纹', '亮色', '有设计感'], bottom: ['深色直筒裤', '深色牛仔裤'] },
    avoid: ['浅色裤装', '紧身裤'],
  },
  {
    type: '椭圆形体型（O形）',
    features: '腰腹明显，四肢相对细',
    focus: '遮住腰腹，拉长比例',
    recommend: { top: ['深色V领', '直筒版型', '不扎腰'], bottom: ['中高腰深色裤'] },
    avoid: ['亮色上衣', '紧身款', '扎腰'],
  },
  {
    type: '高瘦体型',
    features: '身高较高但偏瘦',
    focus: '增加视觉宽度',
    recommend: { top: ['横条纹', '叠穿', '落肩款'], bottom: ['直筒或微宽裤'] },
    avoid: ['紧身款', '竖条纹', '全黑'],
  },
];

export interface FaceShape {
  type: string;
  features: string;
  recommendHairstyle: string[];
  avoidHairstyle: string[];
}

export const FACE_SHAPES: FaceShape[] = [
  { type: '圆脸', features: '额头窄、下巴圆润', recommendHairstyle: ['前刺/飞机头', '短寸', '侧分纹理'], avoidHairstyle: ['齐刘海', '贴头皮'] },
  { type: '方脸', features: '下颌角分明、硬朗', recommendHairstyle: ['三七分/四六分', '碎盖刘海', '短刘海'], avoidHairstyle: ['寸头', '极短发型'] },
  { type: '长脸', features: '额头偏高、脸型瘦长', recommendHairstyle: ['齐刘海', '短寸', '侧分'], avoidHairstyle: ['大背头', '高发型'] },
  { type: '菱形脸', features: '颧骨宽、额头下巴窄', recommendHairstyle: ['碎盖', '韩式纹理'], avoidHairstyle: ['紧贴头皮的发型'] },
  { type: '心形脸', features: '额头宽、下巴尖', recommendHairstyle: ['中分', '三七分'], avoidHairstyle: ['蓬松感太强的发型'] },
  { type: '椭圆脸', features: '标准比例', recommendHairstyle: ['几乎所有发型都适合'], avoidHairstyle: ['无特别禁忌'] },
];

// -------------------- 穿搭底层原则 --------------------
export const STYLE_PRINCIPLES = {
  fourPrinciples: [
    {
      name: '比例优先原则',
      desc: '永远记住上短下长，通过塞衣角、选择合适衣长、利用腰带制造腰线优化身材比例',
    },
    {
      name: '干净度原则',
      desc: '穿搭的基础是整洁：衣服平整无褶皱、鞋子干净不发黄、发型清爽不油腻',
    },
    {
      name: '风格一致性原则',
      desc: '全身单品风格必须统一，避免混搭（如运动风=运动T恤+运动裤+跑鞋）',
    },
    {
      name: '颜色克制原则',
      desc: '新手安全区：全身颜色不超过3种；推荐配色：黑白灰为主，低饱和度彩色为辅',
    },
  ],
  threeSteps: [
    {
      step: '第一步：做减法',
      action: '扔掉过紧、过花、过时的三类单品',
      avoid: ['紧身裤', '紧身T恤', '大logo', '亮片', 'POLO衫立领', '精神小伙风格'],
    },
    {
      step: '第二步：建基础',
      action: '优先购买5种重点颜色清单',
      coreColors: ['黑色', '白色', '深蓝', '卡其', '灰色'],
    },
    {
      step: '第三步：加细节',
      action: '提升精致度的三个方向',
      details: ['鞋子升级：从帆布鞋升级为皮质休闲鞋或复古跑鞋', '配饰点缀：戴一块简约手表或一条银色项链', '发型打理：定期修剪，保持清爽造型'],
    },
  ],
  fourStyleQuadrants: [
    {
      name: '老钱松弛',
      keywords: '克制、质感、不费力',
      items: '针织衫+亚麻裤+勃肯鞋',
    },
    {
      name: '日系复古',
      keywords: '干净、层次、文艺',
      items: '条纹衫+直筒裤+帆布鞋',
    },
    {
      name: '运动休闲',
      keywords: '功能、舒适、活力',
      items: '夹克+束脚裤+跑鞋',
    },
    {
      name: '工装硬朗',
      keywords: '口袋、厚重、耐磨',
      items: '工装外套+工装裤+工装靴',
    },
  ],
};

// -------------------- 叠穿技巧 --------------------
export const LAYERING_TECHNIQUES = {
  threeLayer: [
    { layer: '内层', item: '纯色高领/白T恤', note: '高领只露出一圈领口' },
    { layer: '中层', item: '格子衬衫/针织开衫', note: '敞开穿，露出内搭' },
    { layer: '外层', item: '工装夹克/牛仔夹克', note: '袖子随意卷起' },
  ],
  shirtTucking: [
    { method: '全塞', effect: '正式感，适合衬衫', desc: '全部塞入裤腰，系上皮带' },
    { method: '半塞', effect: '随性自然，适合T恤', desc: '只塞前面中间部分' },
    { method: '侧塞', effect: '造型感，适合拍照', desc: '塞一侧，另一侧自然垂落' },
  ],
  cuffRolling: [
    { method: '自然折叠法', desc: '不要整齐地卷两层，而是随意卷1-2次，露出前臂线条', steps: ['先将袖口向外翻折一圈（约5cm）', '再随意翻折一圈，不要压得太整齐', '调整到前臂最粗的地方停止', '手指轻轻拉松袖口，让它自然垂落'] },
    { method: '窄边卷法', desc: '翻折2-3cm，适合正式场合', steps: ['裤脚向上翻折约2-3cm', '再翻一层，同样宽度', '调整至脚踝最细处上方'] },
    { method: '宽边卷法', desc: '翻折5-7cm，适合工装裤、牛仔裤', note: '正式场合不用' },
  ],
};

// -------------------- 配饰搭配 --------------------
export const ACCESSORY_RULES = {
  coreRule: '全身配饰不超过2件，颜色与鞋子或皮带呼应',
  watch: [
    { style: '简约', item: '白色表盘+黑色皮带', scene: '日常、通勤' },
    { style: '运动', item: '黑色表盘+硅胶表带', scene: '休闲、运动' },
    { style: '商务', item: '金属表带+皮质表带', scene: '正式场合' },
  ],
  bracelet: [
    { material: '银色金属链', style: '简约硬朗', note: '单独佩戴，不叠戴' },
    { material: '皮质编织', style: '休闲复古', note: '配合帆布表带手表' },
    { material: '绳结手链', style: '户外运动', note: '配合手环或单独佩戴' },
  ],
  hat: [
    { type: '棒球帽', style: '休闲运动', scene: '日常、校园', suitableFace: '圆脸、方脸' },
    { type: '弯檐帽', style: '休闲日常', scene: '逛街、通勤', suitableFace: '所有脸型' },
    { type: '针织冷帽', style: '时尚保暖', scene: '秋冬、街头', suitableFace: '长脸' },
    { type: '渔夫帽', style: '潮流个性', scene: '旅行、户外', suitableFace: '圆脸' },
  ],
  bag: [
    { scene: '通勤', type: '双肩包/邮差包', material: '尼龙、帆布' },
    { scene: '约会', type: '小号斜挎包', material: '皮质' },
    { scene: '运动', type: '抽绳包', material: '尼龙' },
    { scene: '休闲', type: '帆布托特包', material: '帆布' },
  ],
  sock: [
    { rule: '颜色与裤子同色系，或与鞋子呼应' },
    { rule: '休闲鞋配船袜（不露出），靴子配中筒袜' },
    { rule: '白袜子+黑鞋+黑裤为禁忌（迈克尔·杰克逊除外）' },
  ],
};

// -------------------- 衣橱最小配置 --------------------
export const MINIMUM_WARDROBE = {
  summary: '总计约800-1500元，即可覆盖80%日常场景',
  categories: [
    { name: '上衣', quantity: 3, items: ['黑T', '白T', '灰卫衣'] },
    { name: '裤子', quantity: 2, items: ['深色牛仔裤', '黑西裤'] },
    { name: '鞋子', quantity: 1, items: ['白色板鞋'] },
    { name: '外套', quantity: 1, items: ['黑色夹克/卫衣'] },
  ],
  essentialItems: {
    top: [
      { name: '纯色正肩T恤', color: '黑色、白色、灰色', spec: '克重220g以上，纯棉或棉混纺，螺纹加固领口' },
      { name: '基础款长袖衬衫', color: '白色、浅蓝、细条纹', spec: '牛津纺（休闲）或抗皱棉（通勤）' },
    ],
    bottom: [
      { name: '直筒牛仔裤', color: '水洗蓝、黑色', spec: '膝盖处不过分堆褶，裤长盖住鞋面1/3' },
      { name: '垂感西裤/休闲裤', color: '黑色、灰色、卡其', spec: '有垂坠感，透气不闷热' },
    ],
    shoes: [
      { name: '简约板鞋', color: '白色、黑色', spec: '低帮，简约logo' },
      { name: '复古跑鞋', color: '米白、灰色、深蓝', spec: '休闲、运动两用' },
    ],
    outerwear: [
      { name: '工装夹克', temp: '15-20°C', color: '军绿、深蓝、卡其' },
      { name: '牛仔夹克', temp: '15-22°C', color: '深蓝、水洗蓝' },
      { name: '黑色羽绒服', temp: '冬季', color: '黑色', spec: '直筒或微收，不选oversize' },
    ],
  },
};
