'use client';

import TopNav from '@/components/TopNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <div className="pt-[73px]">{children}</div>
    </>
  );
}
