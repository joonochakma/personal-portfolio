'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../header';
import { posts } from '../lib/posts';
import AnimatedPost from '../animated-post';

export default function Projects() {
  return (
    <main>
      <Header />
      <section className="py-16 sm:py-24 scroll-smooth">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h2 className="animate-fade-down text-4xl sm:text-5xl font-Inter font-semibold tracking-tight text-pretty mb-8">
            Projects
          </h2>

          <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
        </div>
      </section>
    </main>
  );
}
