export default function SkillsLoading() {
  return (
    <main className="min-h-full flex flex-col items-center px-6 my-36 dark:bg-black bg-white dark:text-white text-black font-Inter">
      <div className="mx-auto max-w-4xl w-full">
        {/* Title skeleton */}
        <div className="h-10 w-40 bg-gray-800/50 rounded-lg animate-pulse mb-8" />

        {/* Skills grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-800/40 rounded-xl animate-pulse" />
              <div className="h-4 w-20 bg-gray-800/30 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
