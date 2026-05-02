export type ToolCategory = 'style' | 'fortune' | 'outfit' | 'color' | 'makeup' | 'hair' | 'lipstick' | 'image-diagnosis';

export interface MarketTool {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  price: number;
  originalPrice: number;
  category: ToolCategory;
  features: string[];
  isHot?: boolean;
  isNew?: boolean;
  color: string;
  coverImage?: string;
}

export interface CartItem {
  tool: MarketTool;
  quantity: number;
}

export interface UserBalance {
  coins: number;
  spent: number;
}

export interface AnalysisResult {
  toolId: string;
  type: 'style' | 'palm-reading' | 'seasonal-outfit' | 'personal-color' | 'hair-analysis' | 'lipstick-analysis' | 'image-diagnosis';
  data: StyleResult | PalmReadingResult | SeasonalOutfitResult | PersonalColorResult | HairAnalysisResult | LipstickAnalysisResult | ImageDiagnosisResult;
  timestamp: number;
}

export interface StyleResult {
  quadrant: string;
  faceShape: string;
  suitableStyles: string[];
  avoidStyles: string[];
  suitableColors: string[];
  avoidColors: string[];
  celebrities: string[];
}

export interface PalmAnalysisPoint {
  name: string;
  classicalTitle: string;
  finding: string;
  interpretation: string;
  fortune: '大吉' | '吉' | '中吉' | '小吉' | '平';
}

export interface PalmReadingResult {
  overallFortune: string;
  overallRating: string;
  summary: string;
  points: PalmAnalysisPoint[];
  ancientWisdom: string;
}

export interface SeasonalLook {
  season: string;
  seasonEn: string;
  heroOutfit: string;
  extensions: string[];
  colorPalette: string[];
  avoid: string[];
  tip: string;
}

export interface SeasonalOutfitResult {
  bodyType: string;
  proportionTip: string;
  seasons: SeasonalLook[];
  overallSummary: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  category: 'best' | 'good' | 'avoid';
}

export interface PersonalColorResult {
  toneType: string;
  toneTypeEn: string;
  seasonType: string;
  seasonTypeEn: string;
  description: string;
  bestColors: ColorSwatch[];
  goodColors: ColorSwatch[];
  avoidColors: ColorSwatch[];
  colorDirection: string;
  stylingTips: string[];
}

export interface HairstyleRecommendation {
  name: string;
  matchScore: number;
  description: string;
  occasion: string;
}

export interface HairAnalysisResult {
  faceShape: string;
  faceShapeEn: string;
  faceDescription: string;
  hairstyles: HairstyleRecommendation[];
  careAdvice: string[];
  overallAdvice: string;
}

export type LipstickBrand = 'Dior' | 'YSL' | 'Armani' | 'Chanel';

export interface LipstickShade {
  name: string;
  nameEn: string;
  shadeCode: string;
  hex: string;
  finish: 'matte' | 'satin' | 'glossy' | 'velvet';
  matchScore: number;
  sceneTags: string[];
  description: string;
}

export interface LipstickAnalysisResult {
  skinTone: string;
  skinToneEn: string;
  undertone: string;
  undertoneEn: string;
  brand: LipstickBrand;
  recommendedShades: LipstickShade[];
  summaryAdvice: string;
}

export interface OutfitExample {
  occasion: string;
  description: string;
  items: string[];
}

export interface ImageDiagnosisResult {
  seasonType: string;
  seasonTypeEn: string;
  toneType: string;
  toneTypeEn: string;
  brightness: string;
  brightnessEn: string;
  contrast: string;
  contrastEn: string;
  colorPalette: ColorSwatch[];
  outfitExamples: OutfitExample[];
  makeupGuide: string[];
  hairAdvice: string[];
  accessoryAdvice: string[];
  overallSummary: string;
}

export interface QuizOption {
  text: string;
  lineScore: number;
  curveScore: number;
  volumeScore: number;
  skinScore?: number;
  bodyScore?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface StyleQuadrant {
  id: string;
  name: string;
  line: '直线型' | '曲线型';
  volume: '大量感' | '小量感';
  desc: string;
  color: string;
  traits: string[];
  celebrities: string[];
  suitableStyles: string[];
  suitableColors: string[];
  avoidColors: string[];
  avoidStyles: string[];
  recommendedItems: string[];
  bodyTypeMatch?: {
    type: string;
    features: string;
    recommend: {
      top: string[];
      bottom: string[];
    };
    avoid: string[];
  };
  faceShapeMatch?: {
    recommend: string[];
    avoid: string[];
  };
}
