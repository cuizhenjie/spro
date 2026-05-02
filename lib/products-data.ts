import type { MarketTool } from "@/types/marketplace";

export interface Product {
  id: string;
  name: string;
  nameZh: string;
  author: string;
  authorLabel: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  features: string[];
  category: string;
  categoryLabel: string;
  sales: number;
  rating: number;
}

export const PRODUCTS: Product[] = [
  // ── 穿搭商品（实体/单品） ──
  {
    id: "prod_neo_tokyo_trench",
    name: "NEO TOKYO TRENCH",
    nameZh: "新东京廓形风衣",
    author: "K4RMA",
    authorLabel: "K4RMA Studio",
    rarity: "EPIC",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "Oversize大廓形裁剪风衣，哑光尼龙面料拼接全息反光内衬。暗纹提花工艺，限定「新东京灰」配色，可正反两面穿着。适合高对比度街头穿搭，搭配工装靴或厚底老爹鞋效果最佳。",
    features: ["Oversize大廓形版型", "哑光尼龙+全息反光内衬", "限定「新东京灰」配色", "暗纹提花工艺", "正反两面可穿"],
    category: "outfit",
    categoryLabel: "外套",
    sales: 234,
    rating: 4.8,
  },
  {
    id: "prod_corpo_suit",
    name: "CORPO SUIT PRO",
    nameZh: "都市机能西装",
    author: "SYNC_SYSTEM",
    authorLabel: "SYNC System",
    rarity: "EPIC",
    price: 980,
    originalPrice: 1400,
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80",
    description: "弹力抗皱面料，隐形透气孔设计。修身剪裁不束缚活动，正式与机能兼备的都市精英西装。可商务可街头，内搭高领打底或T恤均可，一双乐福鞋完成全天候造型。",
    features: ["弹力抗皱面料", "隐形透气孔设计", "修身剪裁", "商务×街头两用", "免熨烫工艺"],
    category: "outfit",
    categoryLabel: "外套",
    sales: 412,
    rating: 4.7,
  },
  {
    id: "prod_neon_runner",
    name: "NEON RUNNER V3",
    nameZh: "霓虹跑鞋 V3",
    author: "GRID_DROP",
    authorLabel: "GRID DROP",
    rarity: "RARE",
    price: 580,
    originalPrice: 800,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "EVA缓震中底搭配全掌气垫，鞋面采用霓虹渐变涂层工艺。夜间反光条设计，跑步通勤两相宜。鞋身轻量化处理，单只仅280g，长时间穿着无负重感。",
    features: ["EVA缓震中底", "全掌气垫", "霓虹渐变涂层", "夜间反光条", "轻量280g"],
    category: "shoes",
    categoryLabel: "鞋履",
    sales: 678,
    rating: 4.5,
  },
  {
    id: "prod_wasteland_visor",
    name: "WASTELAND VISOR",
    nameZh: "废土机能护目镜",
    author: "NUL_SEC",
    authorLabel: "NUL_SEC Lab",
    rarity: "RARE",
    price: 420,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
    description: "磨砂防刮镜片+航空级金属框架，可调节镜腿适配绝大多数脸型。内置防蓝光镀膜，户外强光下依然清晰。机能潮流穿搭必备配件，搭配面罩或单独佩戴均有未来感。",
    features: ["磨砂防刮镜片", "航空级金属框架", "防蓝光镀膜", "可调节镜腿", "UV400防护"],
    category: "accessory",
    categoryLabel: "配饰",
    sales: 189,
    rating: 4.6,
  },

  // ── AI 穿搭虚拟服务 ──
  {
    id: "prod_seasonal_outfit_pack",
    name: "SEASONAL OUTFIT PACK",
    nameZh: "四季穿搭方案·定制版",
    author: "AI_STYLIST",
    authorLabel: "AI Stylist Pro",
    rarity: "LEGENDARY",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    description: "上传一张正面/全身照，AI根据您的五官、身材、肤色生成四季定制穿搭方案。春夏秋冬四套完整Lookbook，每套含主推造型+5套延展搭配，附单品清单和购买链接。韩系潮牌首尔街拍风格，保留本人真实辨识度。",
    features: ["四季独立造型方案", "每季6套完整Lookbook", "单品清单+购买链接", "保留本人五官特征", "配色公式+避雷指南"],
    category: "virtual",
    categoryLabel: "AI 穿搭服务",
    sales: 1024,
    rating: 4.9,
  },
  {
    id: "prod_personal_color_report",
    name: "PERSONAL COLOR REPORT",
    nameZh: "个人色彩诊断报告",
    author: "COLOR_LAB",
    authorLabel: "Color Lab",
    rarity: "EPIC",
    price: 299,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    description: "AI分析您的肤色冷暖、明暗对比度，精准判定四季色彩类型。输出专业色彩报告：推荐色/慎用色对比展示、专属色盘、妆容/发色/穿搭配色建议。清新手帐风排版，可直接保存分享到社交媒体。",
    features: ["四季色彩类型精准判定", "推荐色/慎用色对比展示", "专属调色盘", "妆容+发色+穿搭配色指南", "手帐风海报可直接分享"],
    category: "virtual",
    categoryLabel: "AI 穿搭服务",
    sales: 856,
    rating: 4.8,
  },
  {
    id: "prod_y2k_style_pack",
    name: "Y2K STYLE PACK",
    nameZh: "Y2K千禧风穿搭数据包",
    author: "RETRO_SYNTH",
    authorLabel: "Retro Synth",
    rarity: "COMMON",
    price: 180,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Y2K千禧风格穿搭素材数据包，包含200+精选单品参考图、30套完整穿搭模板、PSD源文件。涵盖低腰牛仔裤、蝴蝶元素、金属色系等千禧风核心元素，适合电商卖家快速搭建Y2K风格商品页面。含商业授权。",
    features: ["200+精选单品参考图", "30套完整穿搭模板", "PSD源文件可编辑", "千禧风核心元素全覆盖", "商业授权"],
    category: "digital",
    categoryLabel: "数字素材",
    sales: 1532,
    rating: 4.4,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
