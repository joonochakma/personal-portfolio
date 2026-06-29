export default function BlogsLoading() {
  return (
    <main className="min-h-full flex flex-col items-center justify-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black gap-12 font-Inter">
      <section className="w-full">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {/* Title skeleton */}
          <div className="h-10 w-72 bg-gray-800/50 rounded-lg animate-pulse" />
          <div className="h-5 w-96 bg-gray-800/30 rounded mt-3 animate-pulse" />

          <div className="mt-16 space-y-20">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                {/* Image skeleton */}
                <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 bg-gray-800/40 rounded-2xl animate-pulse" />

                {/* Content skeleton */}
                <div className="flex-1 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-x-4">
                    <div className="h-4 w-24 bg-gray-800/30 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-800/40 rounded-full animate-pulse" />
                  </div>
                  {/* Title */}
                  <div className="h-6 w-3/4 bg-gray-800/50 rounded animate-pulse" />
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-800/30 rounded animate-pulse" />
                  </div>
                  {/* Links */}
                  <div className="flex gap-4 mt-4">
                    <div className="h-4 w-16 bg-gray-800/30 rounded animate-pulse" />
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
