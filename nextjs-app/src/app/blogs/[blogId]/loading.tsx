export default function BlogPostLoading() {
  return (
    <main className="min-h-full flex flex-col items-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black font-Inter">
      <div className="mx-auto max-w-2xl lg:max-w-4xl w-full">
        {/* Title skeleton */}
        <div className="h-9 w-2/3 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-5 w-1/3 bg-gray-800/30 rounded mt-4 animate-pulse" />

        {/* Hero image skeleton */}
        <div className="mt-8 w-full aspect-video bg-gray-800/40 rounded-2xl animate-pulse" />

        {/* Content skeleton */}
        <div className="mt-10 space-y-4">
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800/30 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-gray-800/50 rounded mt-6 animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-800/30 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
