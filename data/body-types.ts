/**
 * 体型、腿型、脸型完整数据
 * 来源：Obsidian 穿搭知识库 / 体型脸型与发型完全指南.md
 */

export interface BodyType {
  id: string;
  name: string;
  description: string;
  features: string[];
  recommended: {
    tops: string[];
    bottoms: string[];
    avoid: string[];
  };
  stylingTips: string[];
}

export interface LegType {
  id: string;
  name: string;
  description: string;
  recommendedPants: string[];
  avoidPants: string[];
}

export interface FaceShape {
  id: string;
  name: string;
  features: string[];
  recommendedHairstyles: string[];
  avoidHairstyles: string[];
  hairProducts: { name: string; priceRange: string }[];
}

export interface FaceShapeWithHaircuts extends FaceShape {
  haircuts: { name: string; style: string; suitableFor: string }[];
}

/* ─── 五大体型 ─── */
export const BODY_TYPES: BodyType[] = [
  {
    id: "inverted-triangle",
    name: "倒三角体型（V形）",
    description: "肩宽 > 腰宽，上半身壮实",
    features: ["肩部宽阔", "腰部相对纤细", "下身偏瘦"],
    recommended: {
      tops: ["直筒T恤", "V领上衣", "深色上衣（收缩感）", "避免垫肩设计"],
      bottoms: ["直筒裤", "微锥裤", "浅色/亮色裤装", "增加下身量感的款式"],
      avoid: ["紧身上衣", "横条纹上衣", "泡泡袖", "任何凸显肩宽的设计"]
    },
    stylingTips: [
      "用下身浅色/亮色平衡上下视觉",
      "V领可以让肩部显得不那么宽",
      "避免任何加宽肩部的装饰"
    ]
  },
  {
    id: "rectangle",
    name: "矩形体型（H形）",
    description: "肩宽 ≈ 腰宽 ≈ 臀宽",
    features: ["身材平直", "曲线不明显", "肩腰臀比例接近"],
    recommended: {
      tops: ["叠穿款式", "落肩款", "有口袋设计上衣", "腰部有装饰的款式"],
      bottoms: ["百搭所有裤型", "微喇裤", "高腰裤"],
      avoid: ["紧身款式", "过于宽松的直筒款", "没有任何线条设计的款式"]
    },
    stylingTips: [
      "通过叠穿制造腰部曲线错觉",
      "选择有明显结构感的设计",
      "用腰带或层次感制造腰线"
    ]
  },
  {
    id: "triangle",
    name: "三角体型（A形）",
    description: "臀宽 > 肩宽，下半身壮实",
    features: ["肩部偏窄", "臀部较宽", "大腿偏粗"],
    recommended: {
      tops: ["横条纹上衣", "亮色上衣", "有设计感的上衣", "垫肩/泡泡袖设计"],
      bottoms: ["深色直筒裤", "深色牛仔裤", "高腰裤（显腰细）"],
      avoid: ["浅色裤装", "紧身裤", "任何加宽臀部的设计"]
    },
    stylingTips: [
      "用上身亮色/设计感吸引视线",
      "下身深色有收缩效果",
      "避免一切紧贴腿部的裤型"
    ]
  },
  {
    id: "oval",
    name: "椭圆形体型（O形）",
    description: "腰腹明显，四肢相对细",
    features: ["腰部圆润", "腹部偏大", "四肢相对纤细"],
    recommended: {
      tops: ["深色V领", "直筒版型", "不扎腰的上衣", "垂坠感面料"],
      bottoms: ["中高腰深色裤", "直筒裤", "微宽裤"],
      avoid: ["亮色上衣", "紧身款", "扎腰设计", "横条纹", "高饱和色"]
    },
    stylingTips: [
      "深色有显瘦效果",
      "V领拉长脖颈线条",
      "避免一切紧贴腹部的款式",
      "选择有垂坠感的面料"
    ]
  },
  {
    id: "tall-slim",
    name: "高瘦体型",
    description: "身高较高但偏瘦",
    features: ["身高高", "体型偏瘦", "肩部可能显窄"],
    recommended: {
      tops: ["横条纹", "叠穿", "落肩款", "有体积感的面料"],
      bottoms: ["直筒或微宽裤", "卷边裤脚"],
      avoid: ["紧身款", "竖条纹", "全黑穿搭", "过于单薄的面料"]
    },
    stylingTips: [
      "横条纹增加横向视觉宽度",
      "叠穿增加体积感",
      "避免全身深色显得更瘦",
      "选择有质感的面料增加分量"
    ]
  }
];

/* ─── 腿型分析 ─── */
export const LEG_TYPES: LegType[] = [
  {
    id: "o-leg",
    name: "O型腿",
    description: "膝盖外翻，小腿外弧，双脚并拢时膝盖不能并拢",
    recommendedPants: ["直筒裤", "阔腿裤", "微喇裤", "宽腿牛仔裤"],
    avoidPants: ["紧身裤", "束脚裤", "小脚裤", "任何紧贴小腿的款式"]
  },
  {
    id: "x-leg",
    name: "X型腿",
    description: "膝盖内扣，双脚并拢时膝盖能并拢但脚踝不能",
    recommendedPants: ["直筒裤", "微喇叭裤", "宽腿西裤"],
    avoidPants: ["紧身裤", "小脚裤", "过于修身的裤型"]
  },
  {
    id: "muscle-leg",
    name: "肌肉腿",
    description: "小腿粗壮，运动后更明显",
    recommendedPants: ["直筒裤", "宽松休闲裤", "锥形裤", "工装裤"],
    avoidPants: ["紧身裤", "九分裤", "紧贴小腿的运动裤"]
  },
  {
    id: "slim-leg",
    name: "细腿型",
    description: "腿部偏细，显得单薄",
    recommendedPants: ["微锥裤", "束脚裤", "锥形牛仔裤", "有体积感的裤型"],
    avoidPants: ["过于宽松的阔腿裤", "超级紧身裤"]
  }
];

/* ─── 六种脸型 × 发型匹配 ─── */
export const FACE_SHAPES: FaceShape[] = [
  {
    id: "round",
    name: "圆脸",
    features: ["额头窄", "下巴圆润", "脸颊弧度饱满", "脸长≈脸宽"],
    recommendedHairstyles: ["前刺", "飞机头", "短寸", "侧分纹理", "眉上刘海"],
    avoidHairstyles: ["齐刘海", "贴头皮发型", "过于蓬松的卷发", "正中分"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "发泥", priceRange: "30-60元" },
      { name: "定型喷雾", priceRange: "20-40元" }
    ]
  },
  {
    id: "square",
    name: "方脸",
    features: ["下颌角分明", "脸部棱角硬朗", "下巴较短", "额头偏宽"],
    recommendedHairstyles: ["三七分", "四六分", "碎盖刘海", "短刘海", "有弧度的侧分"],
    avoidHairstyles: ["寸头", "极短发型", "死板的大背头", "方方正正的平头"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "发泥", priceRange: "30-60元" },
      { name: "定型喷雾", priceRange: "20-40元" }
    ]
  },
  {
    id: "long",
    name: "长脸",
    features: ["额头偏高", "脸型瘦长", "下巴较长", "脸长明显大于脸宽"],
    recommendedHairstyles: ["齐刘海", "短寸", "侧分", "带刘海的造型", "空气感刘海"],
    avoidHairstyles: ["大背头", "高耸发型", "中分", "所有让脸更长的发型"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "蓬松粉", priceRange: "30-60元" },
      { name: "发泥", priceRange: "30-60元" }
    ]
  },
  {
    id: "diamond",
    name: "菱形脸",
    features: ["颧骨宽", "额头偏窄", "下巴尖", "太阳穴凹陷"],
    recommendedHairstyles: ["碎盖", "韩式纹理", "有刘海造型", "侧分长刘海"],
    avoidHairstyles: ["紧贴头皮的发型", "暴露颧骨的发型", "极短寸头"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "发泥", priceRange: "30-60元" },
      { name: "蓬松喷雾", priceRange: "25-50元" }
    ]
  },
  {
    id: "heart",
    name: "心形脸",
    features: ["额头宽", "颧骨适中", "下巴尖", "上宽下窄"],
    recommendedHairstyles: ["中分", "三七分", "自然下垂刘海", "纹理感短发"],
    avoidHairstyles: ["蓬松感过强的发型", "顶部过于高耸的发型", "齐眉刘海"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "发泥", priceRange: "30-60元" },
      { name: "定型喷雾", priceRange: "20-40元" }
    ]
  },
  {
    id: "oval",
    name: "椭圆脸",
    features: ["标准比例", "额头宽度适中", "颧骨宽度 < 额头", "下巴圆润"],
    recommendedHairstyles: ["几乎所有发型", "寸头", "背头", "侧分", "刘海", "纹理卷发"],
    avoidHairstyles: ["无特别禁忌", "避免过于极端的设计"],
    hairProducts: [
      { name: "发蜡", priceRange: "20-50元" },
      { name: "发泥", priceRange: "30-60元" },
      { name: "定型喷雾", priceRange: "20-40元" }
    ]
  }
];

/* ─── 发型 × 穿搭风格联动 ─── */
export const HAIR_STYLE_MAPPING = [
  {
    hairstyle: "侧分/背头",
    suitableFor: "通勤正装",
    reason: "干练正式感，与衬衫/西裤风格统一",
    matchingStyle: ["corpo", "老钱松弛"]
  },
  {
    hairstyle: "短碎/前刺",
    suitableFor: "休闲日常",
    reason: "自然不刻意，适合T恤/牛仔裤等休闲搭配",
    matchingStyle: ["运动休闲", "日系复古"]
  },
  {
    hairstyle: "寸头/短寸",
    suitableFor: "运动风格",
    reason: "干净利落，与运动服/球鞋风格统一",
    matchingStyle: ["运动休闲", "工装硬朗"]
  },
  {
    hairstyle: "中分/微卷",
    suitableFor: "文艺复古",
    reason: "氛围感强，适合复古单品和层次感穿搭",
    matchingStyle: ["日系复古", "老钱松弛"]
  }
];
