import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const ACCESSORY_ANALYSIS_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「眼镜选配指南」信息海报。

100%保留人物原有五官、脸型与面部比例，不做任何改动，仅在照片上叠加眼镜进行试戴对比。

分析步骤：
① 自动识别面部形状（圆脸/方脸/长脸/椭圆脸/心形脸/菱形脸）
② 识别面部关键比例（额宽、颧宽、下颌宽、三庭五眼）
③ 推荐适合的眼镜框型（圆框/方框/半框/全框/飞行员框/复古框等）
④ 展示眼镜试戴并排对比：最适合 / 普通 / 不建议（各2-3款）
⑤ 需含镜框材质建议（金属/板材/混合）、颜色建议、尺寸建议

整体风格极简、现代、美观，以视觉为先，字体简洁，卡片圆润，线条细腻，阴影细腻，带高端编辑质感。背景以白色或浅灰为主，留白充足，干净利落。

全中文版本。图片比例竖版海报（4:5），高解析度。`;

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
