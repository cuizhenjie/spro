import type { MarketTool } from "@/types/marketplace";

export interface Product {
  id: string;
  name: string;
  author: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  features: string[];
  category: string;
  sales: number;
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod_neo_tokyo_trench",
    name: "NEO_TOKYO_TRENCH",
    author: "K4RMA",
    rarity: "EPIC",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "东京赛博朋克风裁剪风衣，哑光面料+全息反光内衬，适合高对比度街头穿搭场景。限定配色，暗纹提花工艺。",
    features: ["4XL大廓形", "哑光面料+全息内衬", "限定配色", "暗纹提花"],
    category: "outfit",
    sales: 234,
    rating: 4.8,
  },
  {
    id: "prod_wasteland_visor",
    name: "WASTELAND_VISOR",
    author: "NUL_SEC",
    rarity: "RARE",
    price: 420,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
    description: "废土风视野护目镜，磨砂镜片+金属框架，可调节镜腿，适配绝大多数脸型。防蓝光镀膜，适合机能潮流穿搭。",
    features: ["磨砂镜片", "金属框架", "防蓝光镀膜", "可调节镜腿"],
    category: "accessory",
    sales: 189,
    rating: 4.6,
  },
  {
    id: "prod_haptic_gauntlets",
    name: "HAPTIC_GAUNTLETS",
    author: "V0ID",
    rarity: "LEGENDARY",
    price: 1200,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "触觉反馈手套，质感仿生皮革+传感器阵列，兼容主流智能设备。潮流机能两用，支持手势操控。",
    features: ["仿生皮革", "传感器阵列", "手势操控", "潮流机能两用"],
    category: "accessory",
    sales: 67,
    rating: 4.9,
  },
  {
    id: "prod_corpo_suit",
    name: "CORPO_SUIT_PRO",
    author: "SYNC_SYSTEM",
    rarity: "EPIC",
    price: 980,
    originalPrice: 1400,
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80",
    description: "企业机能西装，弹力面料+隐形透气孔，正式与机能兼备。适合都市精英风格，可商务可街头。",
    features: ["弹力面料", "隐形透气孔", "抗皱工艺", "一衣多穿"],
    category: "outfit",
    sales: 412,
    rating: 4.7,
  },
  {
    id: "prod_neon_runner",
    name: "NEON_RUNNER_V3",
    author: "GRID_DROP",
    rarity: "RARE",
    price: 580,
    originalPrice: 800,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "霓虹跑鞋，EVA缓震中底+全掌气垫，鞋面霓虹渐变涂层。夜间跑步神器，街头通勤两相宜。",
    features: ["EVA缓震中底", "全掌气垫", "霓虹渐变涂层", "夜间反光"],
    category: "shoes",
    sales: 678,
    rating: 4.5,
  },
  {
    id: "prod_style_pack_y2k",
    name: "Y2K_STYLE_PACK",
    author: "RETRO_SYNTH",
    rarity: "COMMON",
    price: 180,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Y2K风格数据包，包含200+精选单品参考图+穿搭模板，适合电商卖家快速搭建千禧风商品页面。",
    features: ["200+单品图", "穿搭模板", "PSD源文件", "商业授权"],
    category: "digital",
    sales: 1024,
    rating: 4.4,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
