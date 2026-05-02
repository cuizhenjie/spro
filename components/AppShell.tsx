'use client';

import { usePathname } from 'next/navigation';
import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoSidebar = pathname === '/' || pathname === '/profile';

  return (
    <>
      <TopNav />
      {isNoSidebar ? (
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
