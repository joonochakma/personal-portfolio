'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogs } from '../../lib/blogs';
import AnimatedPost from '../../animated-post';

interface BlogPageProps {
  params: { blogId: string };
}

export default async function BlogDetail({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.blogId);

  if (!blog) return notFound();

  return (
    <main className="animate-fade px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24 dark:bg-black bg-white dark:text-white text-black  font-Inter">
      <h1 className="animate-fade-down text-3xl font-bold mb-8">{blog.date}</h1>
      {/* Blog Title */}
      <h1 className="animate-fade-down text-4xl font-bold mb-8">
        {blog.title}
      </h1>

      {/* Blog Sections */}
      {blog.data.map((section, idx) => (
        <section key={idx} className="mb-16 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <p className="dark:text-gray-300">{section.content}</p>
        </section>
      ))}

      {/* Optional Buttons */}
      <div className="mt-8 flex gap-4">
        {blog.github && (
          <a
            href={blog.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            GitHub Repo
          </a>
        )}
        {blog.live && (
          <a
            href={blog.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Live Demo
          </a>
        )}
        {/* Blog Main Image */}
        <AnimatedPost>
          {blog.imageUrl && (
            <div className="w-full flex justify-center mb-12">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </AnimatedPost>
      </div>
    </main>
  );
}
