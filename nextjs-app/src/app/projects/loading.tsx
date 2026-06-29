export default function ProjectsLoading() {
  return (
    <main>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Title skeleton */}
          <div className="h-10 w-48 bg-gray-800/50 rounded-lg animate-pulse mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <article
                key={i}
                className="flex flex-col gap-2 border border-[#3a3c40] rounded-lg p-3"
              >
                {/* Image skeleton */}
                <div className="relative w-full h-48 bg-gray-800/40 rounded-lg animate-pulse" />

                <div className="space-y-2 mt-1">
                  {/* Title */}
                  <div className="h-5 w-3/4 bg-gray-800/50 rounded animate-pulse" />
                  {/* Description */}
                  <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-800/30 rounded animate-pulse" />
                  {/* Tags */}
                  <div className="flex gap-2 mt-2">
                    <div className="h-5 w-14 bg-gray-800/40 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-gray-800/40 rounded animate-pulse" />
                    <div className="h-5 w-12 bg-gray-800/40 rounded animate-pulse" />
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
