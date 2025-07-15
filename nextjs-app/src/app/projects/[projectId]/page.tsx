import Image from 'next/image';
import { notFound } from 'next/navigation';
import { posts } from '../../lib/posts';
import Header from '../../header';

export default function ProjectDetails({
  params,
}: {
  params: { projectId: string };
}) {
  const project = posts.find((post) => post.slug === params.projectId);

  if (!project) return notFound();

  return (
    <main>
      <Header />
      <div className="px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24">
        <h1 className=" animate-fade-down text-4xl font-bold font-Inter mb-8 text-wrap text-left">
          {project.title}
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          <div className="flex-1">
            <p className="animate-fade-down font-extralight font-Inter text-wrap">
              {project.description}
            </p>

            <div className="animate-fade-down flex flex-row gap-6 mt-6">
              {project.github && (
                <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                  <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
                  >
                    GitHub Repo
                  </a>
                </div>
              )}

              {project.live && (
                <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                  <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                  </div>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
                  >
                    Live View
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={700}
              height={900}
              className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
