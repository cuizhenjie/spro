'use client';

import { useState } from 'react';
import { QUIZ_QUESTIONS, STYLE_QUADRANTS, calculateQuadrant } from '@/lib/marketplace-data';
import { StyleQuadrant } from '@/types/marketplace';
import { ChevronRight, RotateCcw, Check, X, Sparkles } from 'lucide-react';

interface StyleQuizProps {
  onComplete: (quadrant: StyleQuadrant) => void;
  onClose: () => void;
}

export default function StyleQuiz({ onComplete, onClose }: StyleQuizProps) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ line: 0, curve: 0, volume: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<StyleQuadrant | null>(null);

  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[current];
  const progress = ((current) / total) * 100;

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;

    setSelected(optionIndex);
    const option = question.options[optionIndex];

    setScores(prev => ({
      line: prev.line + option.lineScore,
      curve: prev.curve + option.curveScore,
      volume: prev.volume + option.volumeScore,
    }));

    setTimeout(() => {
      if (current + 1 >= total) {
        const quadrant = calculateQuadrant(
          scores.line + option.lineScore,
          scores.curve + option.curveScore,
          scores.volume + option.volumeScore,
        );
        setResult(quadrant);
        setFinished(true);
      } else {
        setCurrent(prev => prev + 1);
        setSelected(null);
      }
    }, 400);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScores({ line: 0, curve: 0, volume: 0 });
    setSelected(null);
    setFinished(false);
    setResult(null);
  };

  if (finished && result) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-sm text-secondary mb-4">
            <Sparkles className="w-4 h-4" />
            测试完成
          </div>
          <h3 className="text-2xl font-bold mb-1">您的风格象限</h3>
          <p className="text-on-surface-variant text-sm">基于15道题目的综合分析</p>
        </div>

        <div
          className="glass-card p-6 text-center border-2"
          style={{ borderColor: result.color }}
        >
          <div
            className="w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center text-2xl font-bold"
            style={{ backgroundColor: `${result.color}30`, color: result.color }}
          >
            {result.line === '直线型' ? '◆' : '●'}
          </div>
          <div className="text-2xl font-bold mb-1">{result.name}</div>
          <div className="text-on-surface-variant mb-4">{result.desc}</div>
          <div className="flex flex-wrap justify-center gap-2">
            {result.traits.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: `${result.color}20`, color: result.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-secondary" />
            <span className="font-bold">明星风格参考</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.celebrities.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-secondary" />
            <span className="font-bold">适合的风格</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.suitableStyles.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-tertiary" />
            <span className="font-bold">推荐颜色</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.suitableColors.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-sm">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-primary" />
            <span className="font-bold">避免的颜色</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.avoidColors.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-4 h-4 text-primary" />
            <span className="font-bold">避免的风格</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.avoidStyles.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-tertiary" />
            <span className="font-bold">推荐单品</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.recommendedItems.map((item, i) => (
              <span key={i} className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-4">
          <h4 className="font-bold mb-3">四象限总览</h4>
          <div className="grid grid-cols-2 gap-3">
            {STYLE_QUADRANTS.map((q) => (
              <div
                key={q.id}
                className={`p-3 rounded-xl border-2 transition-all ${
                  q.id === result.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-outline-variant/50 opacity-60'
                }`}
              >
                <div className="w-6 h-6 rounded-full mb-1" style={{ backgroundColor: q.color }} />
                <div className="font-bold text-xs">{q.name}</div>
                <div className="text-[10px] text-on-surface-variant">{q.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 py-3 glass-card rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            重新测试
          </button>
          <button
            onClick={() => onComplete(result)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-secondary to-tertiary text-on-surface font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Check className="w-4 h-4" />
            确认结果
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:text-on-surface text-sm"
        >
          取消
        </button>
        <span className="text-sm text-on-surface-variant">
          {current + 1} / {total}
        </span>
      </div>

      <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center py-2">
        <div className="text-xs text-on-surface-variant mb-2">
          第 {current + 1} 题
        </div>
        <h3 className="text-lg font-bold">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-secondary bg-secondary/10'
                  : selected !== null
                    ? 'border-outline-variant/30 opacity-40'
                    : 'border-outline-variant/50 hover:border-secondary/50 hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{option.text}</span>
                {isSelected && (
                  <ChevronRight className="w-4 h-4 text-secondary flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        <div className="flex justify-center gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i < current
                  ? 'bg-secondary'
                  : i === current
                    ? 'bg-secondary scale-125'
                    : 'bg-[rgba(255,255,255,0.15)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
