import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const ACCESSORY_ANALYSIS_PROMPT = `"眼镜选配指南"。以上传的肖像（100%跟随面部）为主体，制作一张干净、现代的信息海报。风格应极简、美观且以视觉为先，字体简洁，卡片圆润，线条细腻，阴影细腻，并带有高端编辑风格。标题："眼镜指南"。自动分析面部形状和比例，然后生成合适和不合适的眼镜推荐。展示并排眼镜试戴，使用同一面孔。`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await stepfunEditImage(ACCESSORY_ANALYSIS_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("accessory-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
