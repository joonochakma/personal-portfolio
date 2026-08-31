export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { webiny } from '../../lib/webiny';
import { LIST_PROJECTS } from '../../lib/queries';
import { Project } from '../../lib/types';
import { fetchProjects, hasImage } from '../../lib/project-utils';
import PhoneFrameMedia from '../../phone-frame-media';
import ProjectViewTracker from './project-view-tracker';

function isVideoAsset(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)$/i.test(src);
}

/** Renders a single asset (image or video) at full width. */
function AssetMedia({
  src,
  title,
  index,
  useMobileFrame,
  priority,
}: {
  src: string;
  title: string;
  index: number;
  useMobileFrame?: boolean;
  priority?: boolean;
}) {
  const video = isVideoAsset(src);

  // When the mobile frame flag is on, wrap each asset in the phone frame.
  if (useMobileFrame) {
    return (
      <PhoneFrameMedia
        mediaType={video ? 'video' : 'image'}
        src={src}
        alt={`${title} - asset ${index + 1}`}
        className="animate-fade-up animate-duration-[2000ms]"
      />
    );
  }

  if (video) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms] w-full"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={`${title} - asset ${index + 1}`}
      width={1000}
      height={700}
      priority={priority}
      className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms] w-full h-auto"
    />
  );
}

function ProjectLinks({
  github,
  live,
}: {
  github?: string;
  live?: string;
}) {
  if (!github && !live) return null;
  return (
    <div className="animate-fade-down flex flex-row gap-6">
      {github && (
        <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
          >
            GitHub Repo
          </a>
        </div>
      )}
      {live && (
        <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
          >
            Live View
          </a>
        </div>
      )}
    </div>
  );
}

async function getProjects(): Promise<Project[]> {
  return fetchProjects(() => webiny.request(LIST_PROJECTS));
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const projects = await getProjects();
  const project = projects.find((p) => p.values.slug === projectId);

  if (!project) return notFound();

  const { values } = project;

  // Descriptions: render the full `descriptions` list. Fall back to the single
  // `description` when the list is empty.
  const descriptions =
    values.descriptions && values.descriptions.length > 0
      ? values.descriptions
      : values.description
        ? [values.description]
        : [];

  // Assets: collect every image + video, de-duplicated, with no cap. Include
  // videoUrl and imageUrl so a project shows all its media even if `images`
  // is not populated.
  const assets = Array.from(
    new Set(
      [
        ...(values.images ?? []),
        values.videoUrl,
        values.imageUrl,
      ].filter((src): src is string => hasImage(src))
    )
  );

  // Explicit CMS flag; otherwise fall back to legacy videoUrl inference.
  const useMobileFrame = values.useMobileFrame ?? !!values.videoUrl;

  return (
    <main>
      <ProjectViewTracker slug={values.slug} />
      <div className="px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24">
        <h1 className="animate-fade-down text-4xl font-bold font-Inter mb-8 text-wrap text-left">
          {values.title}
        </h1>

        {/* Links */}
        <div className="mb-12">
          <ProjectLinks github={values.github} live={values.live} />
        </div>

        {/* Descriptions — every paragraph in the descriptions list */}
        <div className="space-y-6 mb-16 max-w-3xl">
          {descriptions.map((paragraph, index) => (
            <p
              key={index}
              className="animate-fade-down font-extralight font-Inter text-wrap leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Assets — all images and videos, flowing continuously with no limit */}
        {assets.length > 0 && (
          <div
            className={
              useMobileFrame
                ? 'flex flex-wrap gap-10 justify-center'
                : 'flex flex-col gap-12 items-center'
            }
          >
            {assets.map((src, index) => (
              <div
                key={src}
                className={useMobileFrame ? '' : 'w-full max-w-3xl'}
              >
                <AssetMedia
                  src={src}
                  title={values.title}
                  index={index}
                  useMobileFrame={useMobileFrame}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
