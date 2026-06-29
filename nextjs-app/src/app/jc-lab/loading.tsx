export default function JcLabLoading() {
  return (
    <main className="min-h-full flex flex-col items-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black font-Inter">
      <div className="mx-auto max-w-4xl w-full">
        {/* Title skeleton */}
        <div className="h-10 w-36 bg-gray-800/50 rounded-lg animate-pulse mb-4" />
        <div className="h-5 w-72 bg-gray-800/30 rounded animate-pulse mb-10" />

        {/* Hero image skeleton */}
        <div className="w-full aspect-video bg-gray-800/40 rounded-2xl animate-pulse mb-8" />

        {/* Content skeleton */}
        <div className="space-y-3">
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
