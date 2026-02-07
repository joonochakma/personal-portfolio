'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { posts } from '../../lib/posts';
import Header from '../../header';
import PhoneFrameMedia from '../../phone-frame-media';

interface ImageGalleryProps {
  images: string[];
  title: string;
  isVideo?: boolean;
  videoUrl?: string;
}

function ImageGallery({ images, title, isVideo, videoUrl }: ImageGalleryProps) {
  if (isVideo && videoUrl) {
    return (
      <PhoneFrameMedia
        mediaType="video"
        src={videoUrl}
        alt={title}
        className="animate-fade-up animate-duration-[2000ms]"
      />
    );
  }

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        width={700}
        height={900}
        priority={true}
        className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms]"
      />
    );
  }

  return null; // Multiple images handled in main component
}

export default function ProjectDetails({
  params,
}: {
  params: { projectId: string };
}) {
  const project = posts.find((post) => post.slug === params.projectId);

  if (!project) return notFound();

  const isVideo = !!project.videoUrl;
  const hasMultipleImages = project.images && project.images.length > 1;

  return (
    <main>
      <Header />
      <div className="px-6 sm:px-10 md:px-16 lg:px-32 xl:px-52 py-16 sm:py-24">
        <h1 className="animate-fade-down text-4xl font-bold font-Inter mb-8 text-wrap text-left">
          {project.title}
        </h1>

        <div className={`flex flex-col gap-12 ${
          hasMultipleImages ? 'lg:flex-col' : 'lg:flex-row lg:items-start'
        }`}>
          {hasMultipleImages ? (
            // Multiple images layout with alternating text-image pairs
            <div className="space-y-16">
              {/* Buttons */}
              <div className="animate-fade-down flex flex-row gap-6">
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
              
              {/* Map through images and descriptions with alternating layout */}
              {(() => {
                const descriptions = project.descriptions || [project.description];
                
                return (
                  <>
                    {project.images.map((image, index) => {
                      const isEven = index % 2 === 0;
                      const description = descriptions[index] || descriptions[0];
                      const isVideo = image.endsWith('.mp4');
                      
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
                          <div className="flex-shrink-0 lg:w-[500px]">
                            {isVideo ? (
                              <video
                                src={image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms] w-full"
                              />
                            ) : (
                              <Image
                                src={image}
                                alt={`${project.title} - Image ${index + 1}`}
                                width={500}
                                height={400}
                                priority={index === 0}
                                className="rounded-lg shadow-lg animate-fade-up animate-duration-[2000ms]"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })()
              }
            </div>
          ) : (
            // Single image/video layout
            <>
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

              <div className={hasMultipleImages ? 'w-full mt-8' : 'flex-shrink-0'}>
                <ImageGallery
                  images={project.images || [project.imageUrl].filter(Boolean)}
                  title={project.title}
                  isVideo={isVideo}
                  videoUrl={project.videoUrl}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
