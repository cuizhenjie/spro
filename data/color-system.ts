/**
 * 色彩体系完整数据
 * 来源：Obsidian 穿搭知识库 / 男士配色完全指南.md
 */

export interface ColorFormula {
  id: string;
  name: string;
  colors: string[];
  effect: string;
  suitable: string[];
}

export interface SkinTone {
  id: string;
  name: string;
  description: string;
  recommendedColors: string[];
  avoidColors: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  dominant: string[];
  accent: string[];
  highlight: string[];
  mood: string;
}

/* ─── 安全配色公式 ─── */
export const COLOR_FORMULAS: ColorFormula[] = [
  {
    id: "monochrome-neutral",
    name: "黑白灰永不出错",
    colors: ["#000000", "#FFFFFF", "#808080"],
    effect: "永不出错，简约高级",
    suitable: ["商务", "休闲", "日常"]
  },
  {
    id: "navy-white",
    name: "深蓝 + 白",
    colors: ["#1B3A6B", "#F5F5F5"],
    effect: "清爽干净，春夏感",
    suitable: ["春夏日常", "约会", "通勤"]
  },
  {
    id: "khaki-navy",
    name: "卡其 + 深蓝",
    colors: ["#C3B091", "#1B3A6B"],
    effect: "商务休闲两相宜",
    suitable: ["通勤", "约会", "轻商务"]
  },
  {
    id: "black-military",
    name: "黑 + 军绿",
    colors: ["#000000", "#556B2F"],
    effect: "酷感街头，个性十足",
    suitable: ["休闲", "户外", "街头"]
  },
  {
    id: "all-black",
    name: "全黑显瘦",
    colors: ["#000000", "#1A1A1A", "#333333"],
    effect: "显瘦高级，神秘感",
    suitable: ["任何场景", "正式", "夜场"]
  },
  {
    id: "monochrome-progression",
    name: "同色系递进",
    colors: ["#4A5568", "#718096", "#A0AEC0"],
    effect: "层次丰富，质感强",
    suitable: ["进阶穿搭", "商务", "约会"]
  }
];

/* ─── 肤色适配表 ─── */
export const SKIN_TONES: SkinTone[] = [
  {
    id: "fair",
    name: "白皙肤色",
    description: "肤色偏白，易晒红",
    recommendedColors: ["几乎所有颜色都适合", "黑色", "白色", "浅蓝", "浅灰", "军绿", "驼色", "酒红"],
    avoidColors: ["荧光色", "高饱和亮色", "过浅的粉色"]
  },
  {
    id: "warm-yellow",
    name: "偏黄肤色",
    description: "肤色偏暖黄调",
    recommendedColors: ["深蓝", "深灰", "白色", "黑色", "酒红", "墨绿", "深棕"],
    avoidColors: ["土黄色", "军绿色", "卡其色（显更黄）", "过浅的荧光色"]
  },
  {
    id: "dark",
    name: "偏黑肤色",
    description: "肤色偏深小麦色",
    recommendedColors: ["白色", "浅蓝", "浅灰", "浅粉", "亮色（提亮肤色）", "金属色"],
    avoidColors: ["深棕色", "墨绿色", "土黄色（显暗沉）", "与肤色过于接近的颜色"]
  },
  {
    id: "neutral",
    name: "中性肤色",
    description: "肤色偏中性，冷暖调不明显",
    recommendedColors: ["几乎所有颜色", "黑", "白", "灰", "蓝", "绿", "驼色", "焦糖色"],
    avoidColors: ["无特别禁忌", "避免过于极端的高饱和色"]
  }
];

/* ─── 男士进阶配色盘（按色系） ─── */
export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "urban-monochrome",
    name: "都市无彩色",
    dominant: ["#1A1A1A", "#333333", "#666666"],
    accent: ["#FFFFFF", "#F5F5F5"],
    highlight: ["#C0C0C0"],
    mood: "克制、精致、都市感"
  },
  {
    id: "military-street",
    name: "军装街潮",
    dominant: ["#2F4F4F", "#556B2F", "#4A5D23"],
    accent: ["#1A1A1A", "#8B7355"],
    highlight: ["#C3B091"],
    mood: "硬朗、户外、工装感"
  },
  {
    id: "warm-earth",
    name: "暖调大地",
    dominant: ["#C3B091", "#8B7355", "#6B4423"],
    accent: ["#F5F5F5", "#D2B48C"],
    highlight: ["#D2691E"],
    mood: "温暖、质感、秋冬感"
  },
  {
    id: "cool-blue",
    name: "冷调蓝调",
    dominant: ["#1B3A6B", "#2C3E50", "#34495E"],
    accent: ["#85C1E9", "#AED6F1"],
    highlight: ["#FFFFFF"],
    mood: "清爽、智性、干净"
  },
  {
    id: "autumn-warm",
    name: "秋冬暖调",
    dominant: ["#8B4513", "#A0522D", "#6B4423"],
    accent: ["#D2691E", "#CD853F"],
    highlight: ["#F5DEB3"],
    mood: "复古、温暖、质感"
  },
  {
    id: "spring-light",
    name: "春夏清新",
    dominant: ["#F0F8FF", "#E6E6FA", "#FFEFD5"],
    accent: ["#98D8C8", "#77DD77"],
    highlight: ["#FFD700"],
    mood: "清爽、明亮、活力"
  }
];

/* ─── 配色禁忌 ─── */
export const COLOR_TABOOS = [
  { combo: "红+绿", reason: "高饱和撞色，过时俗气" },
  { combo: "黄+紫", reason: "对比度过强，不协调" },
  { combo: "超过5种颜色", reason: "视觉混乱，没有重点" },
  { combo: "上下全亮色", reason: "没有主次，轻浮感" },
  { combo: "袜子与整体色调割裂", reason: "破坏整体性，显得不讲究" },
  { combo: "荧光色大面积使用", reason: "过于张扬，难以驾驭" }
];

/* ─── 入门5色系 ─── */
export const STARTER_COLORS = [
  { color: "#000000", name: "黑色", items: ["T恤", "裤子", "外套"], difficulty: 1 },
  { color: "#FFFFFF", name: "白色", items: ["T恤", "衬衫", "内搭"], difficulty: 2 },
  { color: "#1B3A6B", name: "深蓝", items: ["牛仔裤", "衬衫", "外套"], difficulty: 2 },
  { color: "#C3B091", name: "卡其", items: ["裤子", "衬衫", "风衣"], difficulty: 2 },
  { color: "#808080", name: "灰色", items: ["卫衣", "裤子", "外套"], difficulty: 1 }
];
