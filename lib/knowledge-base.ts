/**
 * Obsidian Knowledge Base integration for spro AI tools.
 * Reads and searches markdown files in the local Obsidian vault.
 */

import fs from "fs";
import path from "path";

// Path to Obsidian vault
const OBSIDIAN_VAULT = path.join(
  process.env.HOME || "/Users/cuizhenjie",
  "dev/workspace/docs/Obsidian"
);

// Knowledge domains
const KNOWLEDGE_PATHS = {
  faceShape: "Projects/穿搭知识库/02-体型与脸型/体型脸型与发型完全指南.md",
  outfitFormula: "Projects/穿搭知识库/05-场景穿搭/通勤与约会公式.md",
  colorGuide: "Projects/穿搭知识库/03-配色体系/男士配色完全指南.md",
  detailTips: "Projects/穿搭知识库/06-细节技巧/穿搭细节与配饰进阶.md",
  browKnowledge: "Projects/穿搭知识库/09-避坑自检/穿搭避坑与自检清单.md",
};

function readMarkdown(filePath: string): string {
  try {
    const full = path.join(OBSIDIAN_VAULT, filePath);
    if (fs.existsSync(full)) {
      return fs.readFileSync(full, "utf-8");
    }
  } catch (e) {
    console.error(`[KnowledgeBase] Failed to read: ${filePath}`, e);
  }
  return "";
}

/** Extract face shape info from the face-shape guide */
function extractFaceShapeInfo(markdown: string): string[] {
  const lines = markdown.split("\n");
  const results: string[] = [];
  let inFaceSection = false;

  for (const line of lines) {
    if (line.includes("## 三、脸型与发型") || line.includes("### 六种脸型")) {
      inFaceSection = true;
    }
    if (inFaceSection && line.startsWith("## ") && !line.includes("脸型")) {
      break;
    }
    if (inFaceSection && line.trim()) {
      results.push(line.trim());
    }
  }
  return results.slice(0, 30); // Limit to 30 lines
}

/** Search for brow-related content across all markdown files */
export function searchBrowKnowledge(): {
  faceShapes: string[];
  styleTips: string[];
  avoidTips: string[];
  colorTips: string[];
} {
  const faceShapeMd = readMarkdown(KNOWLEDGE_PATHS.faceShape);
  const avoidMd = readMarkdown(KNOWLEDGE_PATHS.browKnowledge);
  const colorMd = readMarkdown(KNOWLEDGE_PATHS.colorGuide);

  const faceShapes = extractFaceShapeInfo(faceShapeMd);

  // Extract avoid tips (lines with "- 避免" or "- 不宜")
  const avoidLines: string[] = [];
  for (const md of [avoidMd, faceShapeMd]) {
    const lines = md.split("\n");
    for (const line of lines) {
      if (
        (line.includes("- 避免") || line.includes("- 不宜") || line.includes("- 避")) &&
        line.trim().length > 10 &&
        line.trim().length < 200
      ) {
        avoidLines.push(line.replace(/\*\*/g, "").replace(/\|/g, "").trim());
      }
    }
  }

  // Extract color tips
  const colorLines: string[] = [];
  for (const line of colorMd.split("\n")) {
    if (
      (line.includes("眉") || line.includes("色") || line.includes("棕")) &&
      line.trim().length > 10 &&
      line.trim().length < 200 &&
      (line.includes("-") || line.includes("|"))
    ) {
      colorLines.push(line.replace(/\*\*/g, "").replace(/\|/g, "").trim());
    }
  }

  return {
    faceShapes,
    styleTips: avoidLines.slice(0, 10),
    avoidTips: avoidLines.slice(0, 8),
    colorTips: colorLines.slice(0, 6),
  };
}

/** Get all knowledge base content for a specific tool type */
export function getKnowledgeForTool(
  tool: string
): {
  raw: string;
  faceShapes: string[];
  styleTips: string[];
  avoidTips: string[];
  colorTips: string[];
} {
  switch (tool) {
    case "eyebrow-analysis":
    case "makeup-analysis":
    case "hair-analysis":
    case "personal-color":
    case "style-analyzer": {
      const kb = searchBrowKnowledge();
      return {
        raw: Object.values(KNOWLEDGE_PATHS)
          .map((p) => readMarkdown(p))
          .join("\n\n"),
        ...kb,
      };
    }
    default:
      return {
        raw: "",
        faceShapes: [],
        styleTips: [],
        avoidTips: [],
        colorTips: [],
      };
  }
}

/** Simple keyword extraction for face shape */
export function detectFaceShapeFromAnalysis(
  analysisText: string
): string | null {
  const faceShapes = [
    "圆脸",
    "方脸",
    "长脸",
    "菱形脸",
    "心形脸",
    "椭圆脸",
    "鹅蛋脸",
  ];
  const text = analysisText.toLowerCase();
  for (const shape of faceShapes) {
    if (text.includes(shape.toLowerCase())) {
      return shape;
    }
  }
  return null;
}
