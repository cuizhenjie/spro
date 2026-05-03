import { NextRequest, NextResponse } from "next/server";
import { stepfunEditImage, isStepfunConfigured } from "@/lib/stepfun-api";

const SPRING_PROMPT = `Korean streetwear lookbook photo of the same person, Spring Seoul Streetwear Guide. Ivory white outfit: cropped ivory blazer jacket + white fitted tee + high-waist light blue jeans + white derby shoes + cream mini shoulder bag. Clean fit, Seoul select shop aesthetic, bright and airy feel, slight warm tone. Keep the person's original face, facial structure, age, body proportions completely unchanged. Portrait orientation, white background.`;

const SUMMER_PROMPT = `Korean streetwear lookbook photo of the same person, Summer Seoul Streetwear Guide. Cool monochrome outfit: cropped charcoal blazer + white rib tank top + high-waist black shorts + silver mini bag + white-grey sneakers. Cold urban street style, slightly exposed shoulder or sleeveless top for subtle sexiness. Keep the person's original face, facial structure, age, body proportions completely unchanged. Portrait orientation, white background.`;

const AUTUMN_PROMPT = `Korean streetwear lookbook photo of the same person, Autumn Seoul Streetwear Guide. Dark rich outfit: short brown leather jacket + white fitted top + dark indigo high-waist jeans + burgundy loafers + burgundy mini bag. Dark academia meets Seoul street, warm brown-black color story. Keep the person's original face, facial structure, age, body proportions completely unchanged. Portrait orientation, white background.`;

const WINTER_PROMPT = `Korean streetwear lookbook photo of the same person, Winter Seoul Streetwear Guide. Bold structured outfit: oversized charcoal wool coat + white slim knit top + black mini skirt + sheer black tights + black knee boots + cobalt blue mini bag. High contrast cold urban look, powerful silhouette. Keep the person's original face, facial structure, age, body proportions completely unchanged. Portrait orientation, white background.`;

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "photoUrl required" }, { status: 400 });
    }

    if (!isStepfunConfigured()) {
      return NextResponse.json({
        spring: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
        summer: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
        autumn: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
        winter: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600",
        mock: true,
      });
    }

    const [spring, summer, autumn, winter] = await Promise.all([
      stepfunEditImage(SPRING_PROMPT, photoUrl),
      stepfunEditImage(SUMMER_PROMPT, photoUrl),
      stepfunEditImage(AUTUMN_PROMPT, photoUrl),
      stepfunEditImage(WINTER_PROMPT, photoUrl),
    ]);

    return NextResponse.json({ spring, summer, autumn, winter });
  } catch (e) {
    console.error("style-guide error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
