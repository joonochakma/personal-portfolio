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

  // Pages where header/footer + spacing should be disabled
  const noHeaderFooter = pathname === '/' || pathname === '/splash';

  return (
    <>
      {!noHeaderFooter && <Header />}

      <main className={noHeaderFooter ? '' : 'mt-36'}>{children}</main>

      {!noHeaderFooter && <Footer />}
    </>
  );
}
