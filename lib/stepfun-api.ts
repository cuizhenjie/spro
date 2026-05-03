/**
 * Shared StepFun API utility — image editing with user photo reference.
 *
 * Uses the `/v1/images/edits` multipart endpoint so the uploaded photo is
 * sent alongside the prompt to `step-image-edit-2`.
 */

const STEPFUN_API_BASE = "https://api.stepfun.com/v1";
const STEPFUN_KEY = process.env.STEPFUN_API_KEY || "";

/** Convert a data-URL (data:image/jpeg;base64,...) to a Node Buffer. */
function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; mime: string } {
  const [meta, b64] = dataUrl.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] || "image/jpeg";
  return { buffer: Buffer.from(b64, "base64"), mime };
}

/**
 * Call StepFun image-edit endpoint with a reference photo + prompt.
 * Returns the generated image URL (or data-URL), or null on failure.
 */
export async function stepfunEditImage(
  prompt: string,
  imageDataUrl: string
): Promise<string | null> {
  if (!STEPFUN_KEY || STEPFUN_KEY === "your_stepfun_key_here") return null;

  const { buffer, mime } = dataUrlToBuffer(imageDataUrl);

  const fd = new FormData();
  fd.append("model", "step-image-edit-2");
  fd.append("image", new Blob([new Uint8Array(buffer)], { type: mime }), "input.jpg");
  fd.append("prompt", prompt);
  fd.append("response_format", "url");
  fd.append("cfg_scale", "1.0");
  fd.append("steps", "8");
  fd.append("seed", String(Math.floor(Math.random() * 100000)));
  fd.append("text_mode", "true");

  try {
    const res = await fetch(`${STEPFUN_API_BASE}/images/edits`, {
      method: "POST",
      headers: { Authorization: `Bearer ${STEPFUN_KEY}` },
      body: fd,
    });
    if (!res.ok) {
      console.error("Stepfun edit error:", await res.text());
      return null;
    }
    const data = await res.json();
    const item = data.data?.[0];
    if (item?.url) return item.url;
    if (item?.b64_json) return `data:image/png;base64,${item.b64_json}`;
    return null;
  } catch (e) {
    console.error("Stepfun fetch error:", e);
    return null;
  }
}

export function isStepfunConfigured(): boolean {
  return !!STEPFUN_KEY && STEPFUN_KEY !== "your_stepfun_key_here";
}
