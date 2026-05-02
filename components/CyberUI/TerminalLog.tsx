'use client';
interface LogEntry { text: string; opacity?: string; bold?: boolean; }
interface TerminalLogProps { entries: LogEntry[]; color?: string; }
export function TerminalLog({ entries, color = 'text-primary' }: TerminalLogProps) {
  return (
    <div className="bg-surface-container-highest p-sm border border-outline-variant font-mono-data text-mono-data h-32 overflow-hidden flex flex-col justify-end mb-lg relative">
      {entries.map((e, i) => (
        <div key={i} className={`${color} ${e.opacity ?? 'opacity-70'} ${e.bold ? 'font-bold' : ''}`}> {e.text}</div>
      ))}
    </div>
  );
}
