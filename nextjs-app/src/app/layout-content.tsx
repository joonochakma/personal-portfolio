'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Footer from './footer';
import Header from './header';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [pathname]);

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
