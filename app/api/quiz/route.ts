import { NextRequest, NextResponse } from 'next/server';
import { QUIZ_STYLE_QUADRANTS } from '@/data/quiz-data';

export async function POST(req: NextRequest) {
  try {
    const { lineScore, curveScore, volumeScore } = await req.json();

    if (
      typeof lineScore !== 'number' ||
      typeof curveScore !== 'number' ||
      typeof volumeScore !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid scores' }, { status: 400 });
    }

    const isLine = lineScore > curveScore;
    const isLarge = volumeScore >= 3;

    let quadrant;
    if (isLine && isLarge) quadrant = QUIZ_STYLE_QUADRANTS[0];
    else if (!isLine && !isLarge) quadrant = QUIZ_STYLE_QUADRANTS[1];
    else if (isLine && !isLarge) quadrant = QUIZ_STYLE_QUADRANTS[2];
    else quadrant = QUIZ_STYLE_QUADRANTS[3];

    return NextResponse.json({
      quadrant,
      scores: { lineScore, curveScore, volumeScore },
      allQuadrants: QUIZ_STYLE_QUADRANTS,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
