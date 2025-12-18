'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Splashscreen from './splash-screen';
import Navbar from './navbar';
import Header from './header';
import Socials from './socials';

export default function Home() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const [showContent, setShowContent] = useState(false);

  // Prevent duplicate sends
  const pageViewSent = useRef(false);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 50);
      }, 2300);
      return () => clearTimeout(timeout);
    }
    setShowContent(true);
  }, [isLoading]);

  // PAGE VIEW TRACKING (fires once, after content shows)
  useEffect(() => {
    if (!showContent || pageViewSent.current) return;

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      console.warn('NEXT_PUBLIC_API_ENDPOINT not set');
      return;
    }

    pageViewSent.current = true;

    fetch(`${apiEndpoint}/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        ts: Date.now(),
      }),
    })
      .then((res) => {
        console.log('Page view sent:', res.status);
      })
      .catch((err) => {
        console.error('Failed to send page view:', err);
      });
  }, [showContent, pathname]);

  return (
    <main>
      {isLoading && isHome ? (
        <Splashscreen />
      ) : (
        <div
          className={`transition-opacity duration-2000 ease-in ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Header />

          <p className="font-extralight font-Inter px-6 sm:px-12 md:px-20 lg:px-32 xl:px-52 py-9 text-xl">
            Hey. I'm
          </p>

          <Navbar />

          <p className="font-extralight font-Inter px-6 sm:px-12 md:px-20 lg:px-32 xl:px-52 py-9 text-base leading-relaxed">
            I'm a passionate software developer based in Melbourne, Australia.
            Currently, I am honing my skills and expanding my knowledge at
            Swinburne University of Technology. My journey into the world of
            software development is fueled by a deep curiosity and a love for
            technology. When I'm not coding, you can find me capturing moments
            through photography or creating melodies with my music. Welcome to
            my portfolio, where I showcase my projects and the creative
            solutions I've developed along the way.
          </p>

          <Socials />
        </div>
      )}
    </main>
  );
}
