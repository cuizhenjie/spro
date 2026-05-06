'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, calculateQuadrant } from '@/data/quiz-data';

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [lineScore, setLineScore] = useState(0);
  const [curveScore, setCurveScore] = useState(0);
  const [volumeScore, setVolumeScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[current];
  const total = QUIZ_QUESTIONS.length;
  const progress = (current / total) * 100;

  const handleAnswer = (optIdx: number) => {
    const opt = q.options[optIdx];
    const newLine = lineScore + opt.lineScore;
    const newCurve = curveScore + opt.curveScore;
    const newVolume = volumeScore + opt.volumeScore;
    const newAnswers = [...answers, optIdx];

    if (current < total - 1) {
      setAnswers(newAnswers);
      setLineScore(newLine);
      setCurveScore(newCurve);
      setVolumeScore(newVolume);
      setCurrent(current + 1);
    } else {
      // 最后一题 → 计算结果并跳转
      setAnswers(newAnswers);
      setLineScore(newLine);
      setCurveScore(newCurve);
      setVolumeScore(newVolume);
      const result = calculateQuadrant(newLine, newCurve, newVolume);
      // 存入 sessionStorage，供结果页读取
      try {
        sessionStorage.setItem('quiz_result', JSON.stringify(result));
        sessionStorage.setItem('quiz_scores', JSON.stringify({
          lineScore: newLine,
          curveScore: newCurve,
          volumeScore: newVolume,
        }));
      } catch {}
      setFinished(true);
      // 延迟跳转，让用户看到完成动画
      setTimeout(() => router.push('/result/quiz'), 1200);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setLineScore(0);
    setCurveScore(0);
    setVolumeScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface p-6 md:p-10">
      {/* Header */}
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="mr-1 text-xs">←</span> 返回首页
          </Link>
          <span className="font-mono text-xs text-outline">
            个人风格测试
          </span>
        </div>

        {!finished ? (
          <div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-on-surface-variant mb-2">
                <span>第 {current + 1} / {total} 题</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="cyber-glass border border-outline-variant rounded-xl p-8 mb-6">
              <h2 className="text-xl font-bold mb-6 text-on-surface">
                {q.question}
              </h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-secondary/60 hover:bg-secondary/5 transition-all group"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-zinc-600 text-sm mr-3 text-on-surface-variant group-hover:border-secondary group-hover:text-secondary transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-on-surface">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Score hint */}
            <div className="flex justify-center gap-6 text-xs text-on-surface-variant font-mono">
              <span>直线感 <span className="text-secondary">{lineScore}</span></span>
              <span>曲线感 <span className="text-primary">{curveScore}</span></span>
              <span>量感 <span className="text-orange-400">{volumeScore}</span></span>
            </div>
          </div>
        ) : (
          /* Finished state */
          <div className="text-center py-16">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-secondary">
              分析完成，正在生成报告...
            </h2>
            <p className="text-on-surface-variant text-sm mb-8">
              正在计算您的个人风格象限
            </p>
            <div className="flex justify-center gap-4 font-mono text-xs text-on-surface-variant">
              <span>直线感 <span className="text-secondary">{lineScore}</span></span>
              <span>曲线感 <span className="text-primary">{curveScore}</span></span>
              <span>量感 <span className="text-orange-400">{volumeScore}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
