import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const MAKEUP_PROMPT = `请根据我上传的真人正面照片，制作一张高质感「个人妆容分析报告」资讯图表。

请先根据人物五官比例、肤色基调、脸型、气质量感，进行专业妆容分析，再将分析结果可视化输出为最终海报。

分析维度（每个维度需包含：推荐 + 避用说明）：
① 底妆：粉底类型（光泽肌/奶油肌/哑光肌）+ 色调选择 + 避用
② 眉毛：眉形推荐 + 颜色 + 描画方向 + 避用眉形
③ 眼妆：眼影色系 + 眼线风格 + 睫毛重点 + 眼妆避用雷区
④ 腮红：颜色推荐 + 位置打法 + 避用
⑤ 修容：重点区域 + 颜色选择 + 避用
⑥ 唇妆：色系推荐 + 质地选择 + 适合唇形 + 避用色号

另需展示：最适合妆容风格标签（如"韩系清透轻熟妆"/"泰式混血妆"/"日杂氛围妆"）+ 整体风格描述 + 妆容对比参考图（最适合/普通/不建议三档并排对比）

整体风格采用清新高级手帐风报告感，画面以米白色、奶油白、浅杏色为主，加入纸张纹理、拼贴感、胶带、拍立得边框、小卡片、手写感标题、柔和阴影与高级留白，整体干净、时尚、专业、有质感，适合社群分享。

全中文版本，文字精简，以视觉呈现为主，只使用简洁标签和要点，不要长段落说明。版面需像专业化妆师制作的专属妆容分析报告，图片比例为竖版海报（4:5），高解析度。`;

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

    const reportImage = await stepfunEditImage(MAKEUP_PROMPT, photoUrl);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("makeup-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
