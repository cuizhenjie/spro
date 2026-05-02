'use client';

import React, { useState } from 'react';
import { Search, FolderOpen, Eye, Clock, Coins, X } from 'lucide-react';
import Image from 'next/image';

interface HistoryItem {
  id: string;
  tool: string;
  type: 'outfit' | 'skin' | 'hair';
  date: string;
  thumb: string;
  coins: number;
  match: number;
  tags: string[];
}

const MOCK_HISTORY: HistoryItem[] = [
  { id: '8824', tool: 'URBAN TACTICAL', type: 'outfit', date: '2042.11.04', thumb: '/images/hero_bg.png', coins: 30, match: 92, tags: ['TECHWEAR', 'GORPCORE'] },
  { id: '8823', tool: 'SYNTH_WAVE_01', type: 'skin', date: '2042.11.02', thumb: '/images/hero_bg.png', coins: 20, match: 88, tags: ['Y2K', 'NEON'] },
  { id: '8820', tool: 'VOID_WALKER', type: 'hair', date: '2042.10.28', thumb: '/images/hero_bg.png', coins: 50, match: 98, tags: ['MINIMAL', 'AVANT_GARDE'] },
  { id: '8818', tool: 'NEON_DRIFT', type: 'outfit', date: '2042.10.25', thumb: '/images/hero_bg.png', coins: 30, match: 85, tags: ['CYBERPUNK', 'STREET'] },
  { id: '8815', tool: 'CHROME_SKIN', type: 'skin', date: '2042.10.20', thumb: '/images/hero_bg.png', coins: 20, match: 91, tags: ['FUTURISM', 'METALLIC'] },
  { id: '8812', tool: 'PIXEL_CURL', type: 'hair', date: '2042.10.18', thumb: '/images/hero_bg.png', coins: 40, match: 79, tags: ['RETRO', 'PIXEL'] },
];

const TYPE_LABELS: Record<string, string> = {
  outfit: '穿搭分析',
  skin: '肤色检测',
  hair: '发型推荐',
};

const TYPE_COLORS: Record<string, string> = {
  outfit: 'text-primary',
  skin: 'text-secondary',
  hair: 'text-tertiary',
};

type FilterType = 'all' | 'outfit' | 'skin' | 'hair';

export default function HistoryPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_HISTORY.filter(g => {
    const matchType = filter === 'all' || g.type === filter;
    const matchSearch = search === '' ||
      g.tool.toLowerCase().includes(search.toLowerCase()) ||
      g.id.includes(search) ||
      g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <main className="pt-24 pb-24 px-4 lg:pr-8 max-w-container-max mx-auto relative z-10">
      {/* Header Section */}
      <div className="mb-12 border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-h1 text-h1 text-primary drop-shadow-[0_0_15px_rgba(255,45,120,0.4)] uppercase">
              The Vault
            </h1>
            <p className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2 mt-2">
              <FolderOpen className="w-4 h-4" />
              ARCHIVED SCANS &amp; NEURAL FASHION REPORTS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-surface-container text-primary font-mono-data text-mono-data border border-primary/30">
              {filtered.length} RECORDS
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-container text-secondary font-mono-data text-mono-data border border-secondary/30">
              <Coins className="w-3.5 h-3.5" />
              {MOCK_HISTORY.reduce((s, i) => s + i.coins, 0)} CY SPENT
            </span>
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 border-b border-white/20 focus-within:border-secondary focus-within:shadow-[0_2px_10px_rgba(0,255,204,0.3)] transition-all">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="FILTER BY STYLE (E.G. Y2K, TECHWEAR)..."
            className="w-full bg-transparent border-none font-mono-data text-mono-data text-on-surface placeholder:text-gray-500 pl-7 py-2 focus:ring-0 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-secondary transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'outfit', 'skin', 'hair'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 font-label-caps text-label-caps transition-all ${
                filter === f
                  ? 'text-secondary border-b-2 border-secondary bg-secondary/5'
                  : 'text-gray-500 hover:text-secondary border-b-2 border-transparent hover:border-secondary/30'
              }`}
            >
              {f === 'all' ? 'ALL' : TYPE_LABELS[f].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Gallery */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <FolderOpen className="w-16 h-16 mx-auto text-primary/30 mb-4" />
          <p className="font-h2 text-h2 text-on-surface-variant uppercase">Vault Empty</p>
          <p className="font-mono-data text-mono-data text-on-surface-variant/50 mt-2">
            NO MATCHING RECORDS FOUND
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="cyber-glass p-4 relative group hover:border-secondary/50 transition-colors"
            >
              {/* ID Badge */}
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <span className="px-2 py-1 bg-surface-container text-primary font-mono-data text-[10px] border border-primary/30">
                  [ID: {item.id}]
                </span>
              </div>

              {/* Thumbnail */}
              <div className="aspect-square mb-4 overflow-hidden relative border border-white/10">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay pointer-events-none" />
                <Image
                  src={item.thumb}
                  alt={item.tool}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Row */}
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="font-mono-data text-[10px] text-gray-400 mb-1">
                    SCAN_DATE: {item.date}
                  </div>
                  <div className="font-h3 text-[20px] text-on-surface">{item.tool}</div>
                </div>
                <div className="text-right">
                  <div className="font-label-caps text-label-caps text-secondary">MATCH</div>
                  <div className="font-mono-data text-lg text-secondary drop-shadow-[0_0_5px_rgba(0,255,204,0.8)]">
                    {item.match}%
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span key={tag} className={`px-2 py-1 bg-surface-container-high font-mono-data text-[10px] ${TYPE_COLORS[item.type]}`}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta Row */}
              <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/5">
                <span className="flex items-center gap-1 font-mono-data text-mono-data text-on-surface-variant/50">
                  <Clock className="w-3 h-3" />
                  {item.coins} CY
                </span>
                <span className={`font-label-caps text-[10px] ${TYPE_COLORS[item.type]} uppercase`}>
                  {TYPE_LABELS[item.type]}
                </span>
              </div>

              {/* View Report Button */}
              <button className="w-full py-2 border border-secondary text-secondary font-label-caps text-label-caps hover:shadow-[0_0_15px_rgba(0,255,204,0.5)] hover:bg-secondary/10 transition-all flex justify-center items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                VIEW REPORT
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
