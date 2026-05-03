import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const MAKEUP_PROMPT = `A Korean female fashion model with professional makeup. Same person as in the reference photo, same face and features. Beautiful editorial makeup with defined eyebrows, subtle eyeshadow, rosy blush, natural lip color. Clean white background, professional beauty photography, fashion magazine editorial style, portrait orientation.`;

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
