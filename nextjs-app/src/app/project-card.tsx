import Image from 'next/image';
import Link from 'next/link';
import { Project } from './lib/types';
import { isExternalHref, hasImage } from './lib/project-utils';

function CardBody({ project }: { project: Project }) {
  const { values } = project;

  return (
    <article className="flex flex-col gap-2 hover:opacity-80 transition-opacity border border-[#3a3c40] rounded-lg p-3 h-full">
      <div className="relative w-full h-48 overflow-hidden rounded-lg bg-[#1a1a1c]">
        {hasImage(values.imageUrl) ? (
          <Image
            src={values.imageUrl}
            alt={values.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 font-Inter">
            No image
          </div>
        )}
      </div>
      <div>
        <h3 className="text-base font-Inter font-semibold mb-2">
          {values.title}
        </h3>
        <p className="text-sm font-extralight font-Inter line-clamp-2 mb-2">
          {values.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {(values.category ?? []).map((tag, index) => (
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
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const { href } = project.values;

  // External href: open in a new tab with a plain anchor.
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <CardBody project={project} />
      </a>
    );
  }

  // Internal href (or fallback to slug-based detail route).
  const internalHref = href || `/projects/${project.values.slug}`;
  return (
    <Link href={internalHref}>
      <CardBody project={project} />
    </Link>
  );
}
