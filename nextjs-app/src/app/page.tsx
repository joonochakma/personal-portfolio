'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Splashscreen from './splash-screen';
import Navbar from './navbar';
import Header from './header';
import Socials from './socials';
import { posts } from './lib/posts';
import AnimatedPost from './animated-post';

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
            I’m a passionate software developer based in Melbourne, Australia,
            and a recent graduate of Swinburne University of Technology with a
            Bachelor of Computer Science. My journey into software development
            is driven by curiosity and a genuine passion for technology, with a
            strong focus on continuously learning and improving my skills. When
            I’m not coding, you can find me capturing moments through
            photography or creating melodies through music. Welcome to my
            portfolio, where I showcase my projects and the creative solutions
            I’ve developed along the way.
          </p>

          <Socials />

          {/* Spacer */}
          <div className="h-[50vh]" />

          {/* Projects Section */}
          <section className="px-12 sm:px-20 md:px-28 lg:px-40 xl:px-52 py-16">
            <div className="mb-10 text-center">
              <AnimatedPost>
                <h2 className=" text-5xl font-Inter font-semibold mb-4">
                  Projects
                </h2>

                <p className="text-xl font-extralight font-Inter mb-5">
                  Check out my latest work from AI work, to mobile apps to
                  websites
                </p>
              </AnimatedPost>
              <Link
                href="/projects"
                className="text-lg font-Inter hover:underline inline-block"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 max-w-4xl mx-auto">
              {posts.slice(0, 6).map((post) => (
                <AnimatedPost key={post.id}>
                  <Link href={post.href}>
                    <article className="flex flex-col gap-2 hover:opacity-80 transition-opacity border border-[#3a3c40] rounded-lg p-3">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="rounded-lg object-cover shadow-md"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-Inter font-semibold mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm font-extralight font-Inter line-clamp-2 mb-2">
                          {post.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {post.category.map((tag, index) => (
                            <span
                              key={index}
                              className="rounded bg-[#272729] px-2 py-1 font-medium text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedPost>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
