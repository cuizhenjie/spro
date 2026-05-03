import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const PERSONAL_COLOR_PROMPT = `A Korean female fashion model portrait photo. Same person as in the reference photo, same face and features. Wearing elegant pastel colored clothing. Clean white background, professional fashion photography, editorial magazine style, portrait orientation.`;

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
