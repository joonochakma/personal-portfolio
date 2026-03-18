'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';
import Header from './header';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {!isHome && <Header />}

      {children}

      {!isHome && <Footer />}
    </>
  );
}
