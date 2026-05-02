'use client';
interface HUDBracketsProps { children: React.ReactNode; className?: string; }
export function HUDBrackets({ children, className = '' }: HUDBracketsProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary m-xs" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary m-xs" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary m-xs" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary m-xs" />
      {children}
    </div>
  );
}
