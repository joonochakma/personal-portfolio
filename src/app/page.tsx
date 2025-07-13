'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Splashscreen from './splashscreen';
import Navbar from './navbar';
import Header from './header';
import Socials from './socials';

export default function Home() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 50); // Delay to trigger fade-in cleanly
      }, 2300);
      return () => clearTimeout(timeout);
    }
    setShowContent(true);
  }, [isLoading]);

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
          <p className="font-extralight font-Inter px-52 py-9">Hey. I'm</p>
          <Navbar />
          <p className="font-extralight font-Inter text-wrap w-full pl-52 pr-52 py-9">
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
