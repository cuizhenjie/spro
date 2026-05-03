import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const PERSONAL_COLOR_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人色彩分析报告」资讯图表。

请先分析人物肤色基调（冷调/暖调/中性）、瞳色、发色、面部对比度与整体气质，再将分析结果可视化输出为最终海报。

分析维度：
① 肤色基调判定：冷调（血管偏蓝紫）/ 暖调（血管偏绿）/ 中性
② 季节型分类：春（暖亮）、夏（冷柔）、秋（暖深）、冬（冷深）
③ 最佳色彩推荐（需含HEX色号）：最适合的5个颜色 + 推荐色 + 避用色
④ 色彩方向指导：适合的色调、明度、饱和度；需要避免的颜色类型

请通过色卡、色圈、穿搭示意图方式呈现，配色需精致且有时尚感。

整体风格采用清新高级手帐风报告感，画面以米白色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。

全中文版本，文字精简，以视觉色卡呈现为主，只使用简洁标签，不要长段落说明。版面像专业色彩顾问制作的专属分析报告，图片比例为竖版海报（4:5），高解析度。`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await stepfunEditImage(PERSONAL_COLOR_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("personal-color error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
