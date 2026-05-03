import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";
import { BODY_TYPES } from "@/data/body-types";
import { COLOR_PALETTES, SKIN_TONES } from "@/data/color-system";
import { STYLE_QUADRANTS } from "@/data/style-system";

const BODY_CONTEXT = BODY_TYPES.map(b =>
  `【${b.name}】${b.description}；上衣推荐：${b.recommended.tops.join('、')}；下装推荐：${b.recommended.bottoms.join('、')}；避用：${b.recommended.avoid.join('、')}。`
).join("\n");

const COLOR_CONTEXT = `【肤色适配】${SKIN_TONES.map(s => `${s.name}(${s.description})：推荐${s.recommendedColors.slice(0,5).join('、')}，避用${s.avoidColors.slice(0,3).join('、')}`).join('；')}。
【五大色盘】${COLOR_PALETTES.map(p => `${p.name}(${p.mood})：主色${p.dominant.join('/')}，点缀${p.accent.join('/')}，高光${p.highlight.join('/')}`).join('；')}。`;

const STYLE_CONTEXT = `【风格四象限】${STYLE_QUADRANTS.map(q =>
  `${q.name}(${q.nameEn})：关键词${q.keywords.join('、')}，核心单品${q.coreItems.slice(0,3).join('、')}，适合场景${q.suitableScenes.slice(0,3).join('、')}，避用${q.avoidItems.slice(0,3).join('、')}。`
).join("\n")}`;

const STYLE_ANALYZER_PROMPT = `你是一位专业形象顾问 + 色彩分析师 + 穿搭造型师。基于用户上传的人像照片，生成一份完整的个人形象诊断报告。

【体型数据】
${BODY_CONTEXT}

【色彩数据】
${COLOR_CONTEXT}

【风格数据】
${STYLE_CONTEXT}

【分析维度】（按以下框架输出）
1. 体型判定：判断用户属于哪种体型（倒三角/矩形/三角/椭圆/高瘦）
2. 色彩诊断：判断肤色基调（白皙/偏黄/偏黑/中性），确定季节型（春/夏/秋/冬），推荐最适合的色系、避用颜色
3. 风格定位：根据气质、五官量感、身材比例，从上述四种风格象限中匹配最适合的风格路线
4. 体型扬长避短：基于体型数据，推荐最适合的单品版型和需要避免的款式

【穿搭推荐】
- Top 3 最佳搭配方案（每套含：单品组合、风格标签、适合场景）
- 不同场合穿搭建议（通勤/约会/休闲/正式）
- 避雷指南（不适合的版型、颜色、元素）

【延伸建议】
- 妆容重点推荐（与肤色季节型匹配）
- 配饰搭配方向（与风格象限匹配）
- 发型配合建议（与脸型、体积感匹配）

【视觉风格】
高端杂志编辑风，极简信息海报，留白充足，层次清晰，配色高级。
全中文输出，文字精简，以视觉排版为主。图片比例竖版海报（4:5），高解析度。`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await stepfunEditImage(STYLE_ANALYZER_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("style-analyzer error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
