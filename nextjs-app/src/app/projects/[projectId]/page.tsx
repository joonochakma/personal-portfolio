export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { webiny } from '../../lib/webiny';
import { LIST_PROJECTS } from '../../lib/queries';
import { Project } from '../../lib/types';
import { fetchProjects, hasImage } from '../../lib/project-utils';
import PhoneFrameMedia from '../../phone-frame-media';
import ProjectViewTracker from './project-view-tracker';

interface ImageGalleryProps {
  images: string[];
  title: string;
  useMobileFrame?: boolean;
  videoUrl?: string;
  imageUrl?: string;
}

function ImageGallery({
  images,
  title,
  useMobileFrame,
  videoUrl,
  imageUrl,
}: ImageGalleryProps) {
  // Explicit mobile frame overlay driven by the CMS `useMobileFrame` flag.
  if (useMobileFrame) {
    // Prefer video in the frame; fall back to the primary image.
    if (videoUrl) {
      return (
        <PhoneFrameMedia
          mediaType="video"
          src={videoUrl}
          alt={title}
          className="animate-fade-up animate-duration-[2000ms]"
        />
      );
    }
    if (hasImage(imageUrl)) {
      return (
        <PhoneFrameMedia
          mediaType="image"
          src={imageUrl as string}
          alt={title}
          className="animate-fade-up animate-duration-[2000ms]"
        />
      );
    }
  }

  const validImages = (images ?? []).filter(hasImage);
  if (validImages.length === 0) return null;

  if (validImages.length === 1) {
    return (
      <Image
        src={validImages[0]}
        alt={title}
        width={700}
        height={900}
        priority
        className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms]"
      />
    );
  }

  return null;
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
  const hasMultipleImages = values.images && values.images.length > 1;
  // Use the explicit CMS flag when present; otherwise fall back to the
  // legacy behaviour of showing the phone frame whenever a video exists.
  const useMobileFrame =
    values.useMobileFrame ?? !!values.videoUrl;

  return (
    <main>
      <ProjectViewTracker
        projectId={project.id}
        slug={values.slug}
        title={values.title}
      />
      <div className="px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24">
        <h1 className="animate-fade-down text-4xl font-bold font-Inter mb-8 text-wrap text-left">
          {values.title}
        </h1>

        <div
          className={`flex flex-col gap-12 ${
            hasMultipleImages ? 'lg:flex-col' : 'lg:flex-row lg:items-start'
          }`}
        >
          {hasMultipleImages ? (
            <div className="space-y-16">
              {/* GitHub & Live buttons with gradients */}
              <div className="animate-fade-down flex flex-row gap-6">
                {values.github && (
                  <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                    </div>
                    <a
                      href={values.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
                    >
                      GitHub Repo
                    </a>
                  </div>
                )}
                {values.live && (
                  <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                    </div>
                    <a
                      href={values.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
                    >
                      Live View
                    </a>
                  </div>
                )}
              </div>

              {/* Images & descriptions */}
              {(values.images || []).map((image, index) => {
                const isEven = index % 2 === 0;
                const descriptions = values.descriptions || [
                  values.description,
                ];
                const description = descriptions[index] || descriptions[0];
                const isVideoFile = image.endsWith('.mp4');

                return (
                  <div
                    key={index}
                    className={`flex flex-col gap-8 items-start ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="animate-fade-down font-extralight font-Inter text-wrap">
                        {description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 lg:w-[500px] self-start">
                      {isVideoFile ? (
                        <video
                          src={image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms] w-full sticky top-24"
                        />
                      ) : (
                        <Image
                          src={image}
                          alt={`${values.title} - Image ${index + 1}`}
                          width={500}
                          height={400}
                          priority={index === 0}
                          className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms] sticky top-24"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Single image/video layout
            <>
              <div className="flex-1">
                <p className="animate-fade-down font-extralight font-Inter text-wrap">
                  {values.description}
                </p>

                <div className="animate-fade-down flex flex-row gap-6 mt-6">
                  {values.github && (
                    <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                      <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                      </div>
                      <a
                        href={values.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-Inter text-center relative z-10 flex items-center dark:bg-black bg-white px-6 py-1.5 rounded-md text-sm transition-colors duration-500 group-hover:bg-transparent"
                      >
                        GitHub Repo
                      </a>
                    </div>
                  )}
                  {values.live && (
                    <div className="animate-fade-down group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
                      <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[300%] group-hover:h-[300%] group-hover:scale-100 transition-all duration-700 ease-out" />
                      </div>
                      <a
                        href={values.live}
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

              <div className="flex-shrink-0 mt-8">
                <ImageGallery
                  images={
                    values.images || [values.imageUrl].filter(Boolean)
                  }
                  title={values.title}
                  useMobileFrame={useMobileFrame}
                  videoUrl={values.videoUrl}
                  imageUrl={values.imageUrl}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
