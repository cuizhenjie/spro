import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { BODY_TYPES } from "@/data/body-types";
import { COLOR_PALETTES, COLOR_FORMULAS } from "@/data/color-system";

const BODY_TYPE_CONTEXT = BODY_TYPES.map(b =>
  `【${b.name}】特征：${b.features.join('、')}；上衣推荐：${b.recommended.tops.join('、')}；下装推荐：${b.recommended.bottoms.join('、')}；避用：${b.recommended.avoid.join('、')}。`
).join("\n");

const COLOR_CONTEXT = `【安全配色公式】${COLOR_FORMULAS.map(f => `${f.name}(${f.colors.join('+')})：${f.effect}，适合${f.suitable.join('、')}`).join('；')}。
【五大色盘】${COLOR_PALETTES.map(p => `${p.name}：主色${p.dominant.join('/')}，点缀${p.accent.join('/')}，高光${p.highlight.join('/')}，风格${p.mood}`).join('；')}。`;

/* 四季穿搭 — 春季：暖亮轻盈 */
const SPRING_PROMPT = `Korean streetwear lookbook photo of the same person, Spring Seoul Streetwear Guide.
春季型人：适合暖亮、干净、清新的色彩与风格。
参考色彩：${COLOR_PALETTES.find(p => p.id === 'spring-light')?.dominant.join('/') || '浅黄/浅绿/浅蓝/暖白'} + 主色点缀。
请生成一套完整的春季穿搭：短款浅色夹克 + 白色内搭 + 高腰浅蓝牛仔 + 德训鞋，配色象牙白+嫩绿+晴空蓝，清爽明亮轻盈。
Keep the person's original face, facial structure, age, body proportions completely unchanged.
Portrait orientation, white background.`;

/* 四季穿搭 — 夏季：冷柔都市 */
const SUMMER_PROMPT = `Korean streetwear lookbook photo of the same person, Summer Seoul Streetwear Guide.
夏季型人：适合冷柔、清爽、有都市感的色彩与风格。
参考色彩：${COLOR_PALETTES.find(p => p.id === 'cool-blue')?.dominant.join('/') || '深蓝/灰蓝/冷白'} + 点缀色。
请生成一套完整的夏季穿搭：短款炭灰夹克 + rib背心 + 高腰黑短裤 + 银色小包，冷感都市风格，不失透气。
Keep the person's original face, facial structure, age, body proportions completely unchanged.
Portrait orientation, white background.`;

/* 四季穿搭 — 秋季：暖深质感 */
const AUTUMN_PROMPT = `Korean streetwear lookbook photo of the same person, Autumn Seoul Streetwear Guide.
秋季型人：适合暖深、有复古质感的色彩与风格。
参考色彩：${COLOR_PALETTES.find(p => p.id === 'warm-earth')?.dominant.join('/') || '棕色/焦糖/深绿'} + 主色。
请生成一套完整的秋季穿搭：短款棕色皮衣 + 白色内搭 + 深色高腰牛仔 + 乐福鞋，暖深复古有气场。
Keep the person's original face, facial structure, age, body proportions completely unchanged.
Portrait orientation, white background.`;

/* 四季穿搭 — 冬季：冷深高对比 */
const WINTER_PROMPT = `Korean streetwear lookbook photo of the same person, Winter Seoul Streetwear Guide.
冬季型人：适合冷深、高对比、锋利有气场的色彩与风格。
参考色彩：纯白/炭黑/钴蓝/深墨蓝，高对比冷色调。
请生成一套完整的冬季穿搭：结构感墨蓝长大衣 + 白色针织 + 黑色短裙 + 黑色长靴 + 钴蓝小包，冷感锋利气场全开。
Keep the person's original face, facial structure, age, body proportions completely unchanged.
Portrait orientation, white background.`;

/* 体型参考提示（非直接生成内容，供AI理解如何根据体型调整） */
const BODY_TIP = `\n【重要】穿搭时需考虑自身体型特点：${BODY_TYPES.map(b => `${b.name}(${b.description})`).join('；')}。`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        spring: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
        summer: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
        autumn: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
        winter: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const [spring, summer, autumn, winter] = await Promise.all([
      stepfunEditImage(SPRING_PROMPT + BODY_TIP, photoUrl),
      stepfunEditImage(SUMMER_PROMPT + BODY_TIP, photoUrl),
      stepfunEditImage(AUTUMN_PROMPT + BODY_TIP, photoUrl),
      stepfunEditImage(WINTER_PROMPT + BODY_TIP, photoUrl),
    ]);

    return NextResponse.json({ spring, summer, autumn, winter });
  } catch (e) {
    console.error("style-guide error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
