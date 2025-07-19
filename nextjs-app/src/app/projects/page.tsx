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
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="animate-fade-down text-4xl sm:text-5xl font-Inter font-semibold tracking-tight text-pretty">
              Projects
            </h2>

            <div className="animate-fade-up mt-8 space-y-10">
              {posts.map((post) => (
                <AnimatedPost key={post.id}>
                  <article className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Image */}
                    <Link href={post.href} className="lg:w-64 flex-shrink-0">
                      <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={300}
                          height={300}
                          loading="lazy"
                          className="rounded-2xl object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                        <time dateTime={post.datetime}>{post.date}</time>
                        {post.category.map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-Inter font-semibold mb-2 ">
                          <Link
                            href={post.href}
                            className="hover:text-gray-700 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm font-extralight font-Inter line-clamp-4 ">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </AnimatedPost>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
