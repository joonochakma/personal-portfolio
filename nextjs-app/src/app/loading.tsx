export default function RootLoading() {
  return (
    <div className="min-h-screen px-6 sm:px-12 md:px-20 lg:px-32 xl:px-52 py-16 dark:bg-black bg-white">
      {/* Page title skeleton */}
      <div className="h-10 w-64 bg-gray-800/50 rounded-lg animate-pulse mb-6" />
      <div className="h-5 w-96 bg-gray-800/30 rounded animate-pulse mb-12" />

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 border border-gray-800/30 rounded-lg p-4"
          >
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-800/40 rounded-lg animate-pulse" />
            {/* Text lines */}
            <div className="h-5 w-3/4 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-800/30 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-800/30 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
