import { gql } from 'graphql-request';
import { webiny } from '../../lib/webiny';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getBlog(slug: string) {
  const res: any = await webiny.request(`
    query {
      listBlogs {
        data {
          id
          values {
            title
            slug
            imageUrl
            description
            publishedDate
            category
            github
            live
            data {
              heading
              content
            }
          }
        }
      }
    }
  `);

  const posts = res.listBlogs.data;

  return posts.find(
    (p: any) => p.values.slug === slug
  );
}

export default async function BlogDetail({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlog(params.blogId);

  if (!blog) return notFound();

  const { values } = blog;

  return (
    <main className="animate-fade px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24 dark:bg-black bg-white dark:text-white text-black font-Inter">

      <h1 className="animate-fade-down text-4xl font-bold mb-4">
        {values.title}
      </h1>

      <p className="animate-fade-down text-gray-400 mb-6">
        {values.publishedDate}
      </p>

      {values.imageUrl && (
        <div className="mb-10">
          <Image
            src={values.imageUrl}
            alt={values.title}
            width={300}
            height={200}
            className="animate-fade-up rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-10">
        {values.category?.map((cat: string, idx: number) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="space-y-10">
        {values.data?.map((section: any, idx: number) => (
          <section key={idx}>
            <h2 className="text-2xl font-semibold mb-2">
              {section.heading}
            </h2>
            <p className="">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 flex gap-4">
        {values.github && (
          <a href={values.github} className="text-blue-400 hover:underline">
            GitHub
          </a>
        )}

        {values.live && (
          <a href={values.live} className="text-green-400 hover:underline">
            Live Demo
          </a>
        )}
      </div>
    </main>
  );
}