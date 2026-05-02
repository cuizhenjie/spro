import { NextRequest, NextResponse } from "next/server";

const STEPFUN_API = "https://api.stepfun.com/v1/images/generations";
const STEPFUN_KEY = process.env.STEPFUN_API_KEY || "";

const MAKEUP_PROMPT = `Professional makeup analysis report infographic. Clean, minimalist design with cream/off-white background, paper texture. Layout shows the person's portrait photo with professional makeup analysis overlay. Shows face with detailed makeup breakdown: foundation type, eyebrow shape, eyeshadow colors, blush placement, lip color. Before/after makeup comparison side by side. Clean Chinese typography labels. High-end beauty magazine editorial quality, professional makeup artist report aesthetic. Portrait orientation (4:5), high resolution.`;

async function generateImage(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(STEPFUN_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "step-image-edit-2",
        prompt,
        n: 1,
        width: 768,
        height: 1024,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Stepfun error:", err);
      return null;
    }
    const data = await res.json();
    return data.data?.[0]?.url || null;
  } catch (e) {
    console.error("Stepfun fetch error:", e);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({ error: "image required" }, { status: 400 });
    }

    // Mock response while key is being configured
    if (!STEPFUN_KEY || STEPFUN_KEY === "your_stepfun_key_here") {
      return NextResponse.json({
        reportImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const reportImage = await generateImage(MAKEUP_PROMPT, STEPFUN_KEY);

    return NextResponse.json({ reportImage });
  } catch (e) {
    console.error("makeup-analysis error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
