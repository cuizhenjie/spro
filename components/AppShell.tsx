'use client';

import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <TopNav />
      {isHome ? (
        <div className="pt-[73px]">{children}</div>
      ) : (
        <>
          <Sidebar />
          <div className="min-h-screen pt-[73px] lg:pl-72">{children}</div>
        </>
      )}
    </>
  );
}
