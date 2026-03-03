'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  return (
    <>
      {children}
      {!isHome && <Footer />}
    </>
  );
}