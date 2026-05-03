import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const HAIR_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人发型分析报告」资讯图表。请先根据人物真实脸型、头型、发际线、额头比例、头肩比、下颌线、面部重心、五官量感与整体气质，进行专业发型分析，再将分析结果直接可视化输出为最终海报。

请保留人物原本五官、脸型与真实辨识度，不要AI换脸，不要网红脸，不要过度磨皮，不要失真，保持自然真实且高级的效果，像"高级版真实本人"。

请分析并展示：最适合的发长（短发 / 锁骨发 / 中长发 / 长发）、层次感（高层次 / 低层次）、刘海类型（八字刘海 / 法式刘海 / 空气刘海 / 无刘海）、卷度（直发 / 微卷 / 大卷）、绑发方向以及最适合的发色方向。请重点说明哪些发型最修饰脸型、显脸小、提气质，哪些容易显脸大、显老、压气质。

请通过左右或并排对比方式，清楚展示不同发型套用在本人身上的效果，明确区分「最适合 / 普通 / 不建议」，让人一眼看出最适合的发型方向。推荐发色需以专业色卡形式呈现，精致、高级、有时尚感。

整体风格采用清新高级手绘手帐风＋专业发型顾问报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。不要淘宝详情页风，不要廉价模板感，不要AI网红海报感，不要过度花哨或高饱和设计。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签，不要长段落说明。版面需像专业发型顾问制作的专属发型分析报告，图片比例为竖版海报（4:5 或 A4），高解析度。`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await stepfunEditImage(HAIR_ANALYSIS_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("hair-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
