export default function ContactLoading() {
  return (
    <main className="min-h-full flex flex-col items-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black font-Inter">
      <div className="mx-auto max-w-2xl w-full space-y-8">
        {/* Title skeleton */}
        <div className="h-10 w-48 bg-gray-800/50 rounded-lg animate-pulse" />
        <div className="h-5 w-80 bg-gray-800/30 rounded animate-pulse" />

        {/* Form fields skeleton */}
        <div className="space-y-6 mt-10">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-800/30 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-800/40 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-800/30 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-800/40 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-800/30 rounded animate-pulse" />
            <div className="h-32 w-full bg-gray-800/40 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-gray-800/50 rounded-lg animate-pulse" />
        </div>
      </div>
    </main>
  );
}
