'use client';

import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';

interface ClientToolLinkProps {
  href: string;
  toolId: string;
  children: React.ReactNode;
  className?: string;
}

export default function ClientToolLink({ href, toolId, children, className }: ClientToolLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
      return;
    }
    sessionStorage.setItem('spro_active_tool', toolId);
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
