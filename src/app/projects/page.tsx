'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../header';
import { posts } from '../lib/posts';

export default function Projects() {
  return (
    <main>
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="animate-fade-down text-4xl font-Inter tracking-tight text-pretty sm:text-5xl">
              Projects
            </h2>
            <div className="animate-fade-down mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <Link href={post.href} className="block">
                    <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={300}
                        height={400}
                        className="rounded-2xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                    </div>
                  </Link>

                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime}>{post.date}</time>
                      {post.category.map((tag, index) => (
                        <span
                          key={index}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg/6 font-Inter group-hover:text-gray-600">
                        <Link href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 text-sm/6 font-extralight font-Inter">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
