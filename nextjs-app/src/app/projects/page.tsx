export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { webiny } from '../lib/webiny';
import { LIST_PROJECTS } from '../lib/queries';
import { Project } from '../lib/types';
import AnimatedPost from '../animated-post';

async function getProjects(): Promise<Project[]> {
  const data: { listProjects: { data: Project[] } } =
    await webiny.request(LIST_PROJECTS);
  return data.listProjects.data;
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <main>
      <section className="py-16 sm:py-24 scroll-smooth">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h2 className="animate-fade-down text-4xl sm:text-5xl font-Inter font-semibold tracking-tight text-pretty mb-8">
            Projects
          </h2>

          <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <AnimatedPost key={project.id}>
                <Link href={project.values.href}>
                  <article className="flex flex-col gap-2 hover:opacity-80 transition-opacity border border-[#3a3c40] rounded-lg p-3">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={project.values.imageUrl}
                        alt={project.values.title}
                        fill
                        className="rounded-lg object-cover shadow-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-Inter font-semibold mb-2">
                        {project.values.title}
                      </h3>
                      <p className="text-sm font-extralight font-Inter line-clamp-2 mb-2">
                        {project.values.description}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {project.values.category.map((tag, index) => (
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
