import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const OUTFIT_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人穿搭分析报告」资讯图表。请先根据人物真实五官、脸型、身形比例、肩型、头肩比、骨架感、腰线位置、整体量感、肤色与气质氛围，进行专业穿搭分析，再将分析结果直接可视化输出为最终海报。

请保留人物原本五官、脸型、肤色、身形比例与真实辨识度，不要AI换脸，不要网红脸，不要过度磨皮，不要失真，保持自然真实且高级的效果，像"高级版真实本人"。

请分析并展示：最适合的穿搭风格方向（韩系温柔风、小香风、法式慵懒风、轻熟知性风、清冷高级感、学院风等）、最适合的上衣版型、裙装方向、裤装版型、外套方向、领口类型，以及最适合的颜色搭配与材质感。

请重点说明哪些风格最提气质、显高级、显瘦显高、显贵气，哪些容易显土、显廉价、显胖、显矮或压气场。请通过左右或并排对比方式，清楚展示不同穿搭风格套用在本人身上的效果，明确区分「最适合 / 普通 / 不建议」，让人一眼看出最适合的穿搭方向。专属配色盘需精致高级，像专业形象顾问的搭配方案。

整体风格采用清新高级手绘手帐风＋专业形象顾问报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。不要淘宝详情页风，不要廉价模板感，不要AI网红海报感，不要过度花哨或高饱和设计。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签，不要长段落说明。版面需像专业穿搭顾问制作的专属穿搭分析报告，图片比例为竖版海报（4:5 或 A4），高解析度。`;

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

    const reportImage = await stepfunEditImage(OUTFIT_ANALYSIS_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("outfit-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
