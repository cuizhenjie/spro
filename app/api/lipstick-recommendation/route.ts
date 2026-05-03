import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const LIPSTICK_RECOMMENDATION_PROMPT = `你是一个专业美妆顾问 + 人脸分析系统 + 信息设计系统。
基于用户上传自拍与指定口红品牌，分析用户特征并生成一张具有"分析 + 推荐 + 场景指导"的高端信息结构图海报。

【分析维度】
- 肤色：冷 / 暖 / 中性（+ 明度）
- 气质：清冷 / 温柔 / 明艳 / 干净 / 成熟
- 唇部特征：薄 / 厚 / 唇色基础
- 妆容状态：素颜 / 日常 / 精致

【推荐策略】
从指定品牌中筛选3-5个最适合色号，每个包含：色号名称、色系、上脸效果、推荐场景。

【视觉结构】
左上：用户照片 + 肤色分析结论
中部：色号效果矩阵（同一人脸不同唇色，并排展示）
底部：总结建议

整体风格：高端美妆编辑视觉、极简信息图、干净理性克制`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await stepfunEditImage(LIPSTICK_RECOMMENDATION_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("lipstick-recommendation error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
