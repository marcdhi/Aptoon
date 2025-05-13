export function ComicSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-gray-200 rounded-[2px]">
        <div className="h-full w-full flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-gray-300" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-8-6a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
        </div>
      </div>

      {/* Metadata Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Tags Skeleton */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
} 