'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

interface ClientToolLinkProps {
  href: string;
  toolId: string;
  children: React.ReactNode;
  className?: string;
}

export default function ClientToolLink({ href, toolId, children, className }: ClientToolLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Set active tool before navigating
    sessionStorage.setItem('spro_active_tool', toolId);
    router.push(href);
    e.preventDefault();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
