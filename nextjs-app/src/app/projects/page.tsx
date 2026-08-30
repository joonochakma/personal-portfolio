export const dynamic = 'force-dynamic';

import { webiny } from '../lib/webiny';
import { LIST_PROJECTS } from '../lib/queries';
import { Project } from '../lib/types';
import { fetchProjects } from '../lib/project-utils';
import AnimatedPost from '../animated-post';
import ProjectCard from '../project-card';

async function getProjects(): Promise<Project[]> {
  return fetchProjects(() => webiny.request(LIST_PROJECTS));
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

          {projects.length === 0 ? (
            <p className="font-extralight font-Inter text-gray-400">
              No projects to show yet. Check back soon.
            </p>
          ) : (
            <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <AnimatedPost key={project.id}>
                  <ProjectCard project={project} />
                </AnimatedPost>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
