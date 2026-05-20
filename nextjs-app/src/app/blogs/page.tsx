
// const QUERY = gql`
//   query {
//     listBlogs {
//       __typename
//       data {
//         __typename
//         id
//         values {
//           __typename
//           title
//           description
//           imageUrl
//           slug
//           href
//           publishedDate
//           datetime
//           category
//           github
//           live
//           blogId
//           data {
//             heading
//             content
//          }
//         }
//       }
//     }
//   }
// `;



export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { gql } from 'graphql-request';
import { webiny } from '../lib/webiny';

const QUERY = gql`
  query {
    listBlogs {
      data {
        id
        values {
          title
          description
          imageUrl
          slug
          href
          publishedDate
          datetime
          category
          github
          live
          blogId
        }
      }
    }
  }
`;

async function getPosts() {
  const data: any = await webiny.request(QUERY);
  return data.listBlogs.data;
}

export default async function BlogsPage() {
  const posts = await getPosts();
  console.log('Fetched posts:', posts); // Debug log to verify data fetching

  return (
    <main className="min-h-full flex flex-col items-center justify-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black gap-12 font-Inter">
      <section className="w-full">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="animate-fade-down text-4xl font-semibold tracking-tight sm:text-5xl">
            From recent blogs
          </h2>

          <p className="animate-fade mt-2 text-lg text-gray-400">
            Experiments, builds, and lessons from my homelab journey.
          </p>

          <div className="mt-16 space-y-20">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                {/* Image */}
                {post.values.imageUrl && (
                  <div className="animate-fade-up relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                    <Image
                      src={post.values.imageUrl}
                      alt={post.values.title}
                      fill
                      className="rounded-2xl object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="animate-fade">
                  {/* Meta */}
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.values.datetime}
                      className="text-gray-400"
                    >
                      {post.values.publishedDate}
                    </time>

                    {post.values.category?.map(
                      (cat: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300"
                        >
                          {cat}
                        </span>
                      )
                    )}
                  </div>

                  {/* Title */}
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold group-hover:text-gray-300">
                      <Link href={`/blogs/${post.values.slug}`}>
                        {post.values.title}
                      </Link>
                    </h3>

                    <p className="mt-5 text-sm text-gray-400">
                      {post.values.description}
                    </p>
                  </div>

                  {/* Optional Links */}
                  <div className="mt-4 flex gap-4">
                    {post.values.github && (
                      <a
                        href={post.values.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline"
                      >
                        GitHub
                      </a>
                    )}

                    {post.values.live && (
                      <a
                        href={post.values.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-400 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}