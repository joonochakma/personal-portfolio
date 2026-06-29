export default function ProjectDetailLoading() {
  return (
    <main className="min-h-full flex flex-col items-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black font-Inter">
      <div className="mx-auto max-w-3xl w-full">
        {/* Title skeleton */}
        <div className="h-9 w-2/3 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-5 w-1/2 bg-gray-800/30 rounded mt-3 animate-pulse" />

        {/* Image skeleton */}
        <div className="mt-8 w-full aspect-video bg-gray-800/40 rounded-2xl animate-pulse" />

        {/* Tags skeleton */}
        <div className="flex gap-2 mt-6">
          <div className="h-6 w-16 bg-gray-800/40 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-800/40 rounded animate-pulse" />
          <div className="h-6 w-14 bg-gray-800/40 rounded animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800/30 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
