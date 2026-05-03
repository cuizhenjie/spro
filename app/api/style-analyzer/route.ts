import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const STYLE_ANALYZER_PROMPT = `你是一位专业形象顾问 + 色彩分析师 + 穿搭造型师。基于用户上传的人像照片，生成一份完整的个人形象诊断报告。

【分析维度】
1. 色彩诊断：判断所属季节型（春/夏/秋/冬），推荐最适合的色系、避免的颜色
2. 风格定位：根据气质、五官、身材比例，确定适合的穿搭风格路线
3. 身材分析：身材类型、比例特点、扬长避短策略

【穿搭推荐】
- Top 3 最佳搭配方案（每套含：单品组合、风格标签、适合场景）
- 不同场合穿搭建议（通勤/约会/休闲/正式）
- 避雷指南（不适合的版型、颜色、元素）

【延伸建议】
- 妆容重点推荐
- 配饰搭配方向
- 发型配合建议

【视觉风格】
高端杂志编辑风，极简信息海报，留白充足，层次清晰，配色高级`;

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
