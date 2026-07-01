import { ImageOff, RotateCcw, ServerCrash } from "lucide-react"

interface ProjectGridSkeletonProps {
  variant: "projects" | "gallery"
}

export function ProjectGridSkeleton({ variant }: ProjectGridSkeletonProps) {
  const count = variant === "projects" ? 6 : 8

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <div className="aspect-[4/3] animate-pulse bg-white/10" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-white/15" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-white/10" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProjectErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-5 py-14 text-center">
      <ServerCrash className="mx-auto mb-4 h-11 w-11 text-red-300" />
      <h3 className="mb-2 text-xl font-black text-white">Projects could not be loaded</h3>
      <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-gray-400">
        The project service did not respond correctly. Please refresh the request.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Retry
      </button>
    </div>
  )
}

interface ProjectEmptyStateProps {
  activeTab: "projects" | "gallery"
  hasSearch: boolean
  onReset: () => void
}

export function ProjectEmptyState({ activeTab, hasSearch, onReset }: ProjectEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-[#fcc42c]/35 bg-[#fcc42c]/8 px-5 py-16 text-center">
      <ImageOff className="mx-auto mb-4 h-11 w-11 text-[#fcc42c]" />
      <h3 className="mb-2 text-xl font-bold text-white">
        No {activeTab === "projects" ? "projects" : "gallery items"} found
      </h3>
      <p className="mb-5 text-sm text-gray-400">
        {hasSearch ? "Try changing or clearing the search term." : "New items will appear here once they are published."}
      </p>
      {hasSearch && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear search
        </button>
      )}
    </div>
  )
}
