import Image from 'next/image';
import Header from '../header';

const posts = [
  {
    id: 1,
    title: 'Weather Prediction Stack Application',
    href: '/projects/weatherStack',
    description:
      'A full-stack weather website with a React frontend and a Machine Learning backend for weather prediction, built with FastAPI, Docker and AWS Fargate ',
    imageUrl: '/DCA.png',
    date: 'Aug 28, 2024',
    datetime: '2020-03-16',
    category: ['Machine Learning', 'Full Stack Application'],
    github: 'https://github.com/joonochakma/weather-prediction-stack',
  },
];

export default function Projects() {
  return (
    <main>
      <Header />
      <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="animate-fade-down text-4xl font-Inter tracking-tight text-pretty  sm:text-5xl">
              Projects
            </h2>
            <div className="animate-fade-down mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0 ">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={300}
                        height={400}
                        className="rounded-2xl object-cover shadow-lg "
                      />

                      <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                    </div>
                  </a>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime}>{post.date}</time>
                      {post.category.map((tag, index) => (
                        <a
                          key={index}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg/6 font-Inter  group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm/6 font-extralight font-Inter">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <div className="text-sm/6">
                          <p className="font-semibold text-gray-900">
                            <a>
                              <span className="absolute inset-0" />
                              {}
                            </a>
                          </p>
                          <p className="text-gray-600">{}</p>
                        </div>
                      </div>
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
