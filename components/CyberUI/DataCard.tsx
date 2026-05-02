'use client';

import { Check } from 'lucide-react';

interface DataTagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function DataTag({ children, icon }: DataTagProps) {
  return (
    <span className="inline-flex items-center gap-1 border border-[#ff5500]/50 bg-[#ff5500]/10 text-[#ff5500] font-mono text-[12px] px-sm py-xs">
      {icon && <span className="text-[12px]">{icon}</span>}
      <span className="material-symbols-outlined text-[12px]">sell</span>
      {children}
    </span>
  );
}

interface DataBoxProps {
  label: string;
  value: string;
  verified?: boolean;
  unit?: string;
  accentColor?: 'orange' | 'pink' | 'green';
}

const accentMap = {
  orange: { border: 'border-[#ff5500]/30', bg: 'bg-[#ff5500]/10', text: 'text-[#ff5500]', label: 'text-[#ff5500]/60' },
  pink: { border: 'border-primary/30', bg: 'bg-primary/10', text: 'text-primary', label: 'text-primary/60' },
  green: { border: 'border-secondary/30', bg: 'bg-secondary/10', text: 'text-secondary', label: 'text-secondary/60' },
};

export function DataBox({ label, value, verified, unit, accentColor = 'orange' }: DataBoxProps) {
  const c = accentMap[accentColor];
  return (
    <div>
      <label className="font-mono text-[11px] text-on-surface-variant block mb-xs uppercase tracking-widest">
        {label}
      </label>
      <div className={`flex items-center justify-between border ${c.border} ${c.bg} p-sm`}>
        <span className="font-mono text-[13px] text-on-surface">{value}</span>
        <div className="flex items-center gap-2">
          {unit && <span className={`font-mono text-[12px] ${c.text}`}>{unit}</span>}
          {verified && (
            <span className={`${c.text}`}>
              <Check className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface DataTextareaProps {
  label: string;
  value: string;
  accentColor?: 'orange' | 'pink' | 'green';
  rows?: number;
}

export function DataTextarea({ label, value, accentColor = 'orange', rows = 3 }: DataTextareaProps) {
  const c = accentMap[accentColor];
  return (
    <div>
      <label className="font-mono text-[11px] text-on-surface-variant block mb-xs uppercase tracking-widest">
        {label}
      </label>
      <textarea
        readOnly
        rows={rows}
        value={value}
        className={`w-full border ${c.border} ${c.bg} p-sm font-mono text-[13px] text-on-surface resize-none focus:outline-none`}
      />
    </div>
  );
}
