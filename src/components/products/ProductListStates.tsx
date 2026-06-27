import { RotateCcw, SearchX, ServerCrash } from "lucide-react"

interface ProductGridSkeletonProps {
  layoutMode: "grid" | "list"
}

export function ProductGridSkeleton({ layoutMode }: ProductGridSkeletonProps) {
  return (
    <div
      className={
        layoutMode === "grid"
          ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col gap-5"
      }
    >
      {[...Array(layoutMode === "grid" ? 6 : 4)].map((_, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-lg border border-white/10 bg-white/5 ${
            layoutMode === "grid" ? "" : "md:flex"
          }`}
        >
          <div
            className={`bg-white/8 animate-pulse ${
              layoutMode === "grid" ? "aspect-[4/3] w-full" : "aspect-[4/3] w-full md:w-80"
            }`}
          />
          <div className="flex-1 p-5 sm:p-6">
            <div className="mb-4 flex gap-2">
              <span className="h-6 w-28 rounded-full bg-white/10 animate-pulse" />
              <span className="h-6 w-24 rounded-full bg-white/8 animate-pulse" />
            </div>
            <div className="mb-3 h-6 w-3/4 rounded bg-white/12 animate-pulse" />
            <div className="mb-5 h-3 w-36 rounded bg-white/8 animate-pulse" />
            <div className="mb-3 h-8 w-32 rounded bg-[#fcc42c]/20 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-white/8 animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-white/8 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-white/8 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-5 py-12 text-center">
      <ServerCrash className="mx-auto mb-4 h-12 w-12 text-red-300" />
      <h3 className="mb-2 text-xl font-black text-white">Products could not be loaded</h3>
      <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-gray-400">
        The product service did not respond correctly. Try refreshing the list.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] hover:bg-white"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Retry
      </button>
    </div>
  )
}

export function ProductsEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-lg border border-dashed border-[#fcc42c]/35 bg-[#fcc42c]/8 px-5 py-16 text-center">
      <SearchX className="mx-auto mb-4 h-12 w-12 text-[#fcc42c]" />
      <h3 className="mb-2 text-xl font-bold text-white">No matching products found</h3>
      <p className="mb-5 text-sm text-gray-400">Try changing or resetting the active filters.</p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e]"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset filters
      </button>
    </div>
  )
}
