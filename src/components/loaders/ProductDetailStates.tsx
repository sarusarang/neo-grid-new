import { Link } from "react-router-dom"
import { ArrowLeft, Loader2, RotateCcw, SearchX, ServerCrash } from "lucide-react"




// Product skeleton UI for loading state
export function ProductDetailSkeleton() {

  return (

    <div className="min-h-screen bg-[#011a1e] pt-28 pb-16 text-white">

      <div className="container mx-auto px-4 lg:px-8">

        <div className="mb-8 h-4 w-80 max-w-full animate-pulse rounded bg-white/8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          <div className="lg:col-span-6">

            <div className="aspect-4/3 animate-pulse rounded-lg border border-white/10 bg-white/8" />

            <div className="mt-4 flex gap-3">
              {[...Array(3)].map((_, index) => (
                <span key={index} className="h-20 w-24 animate-pulse rounded-lg bg-white/8" />
              ))}
            </div>

          </div>

          <div className="lg:col-span-6">

            <div className="mb-4 h-7 w-56 animate-pulse rounded-full bg-[#fcc42c]/15" />

            <div className="mb-3 h-12 w-4/5 animate-pulse rounded-lg bg-white/10" />

            <div className="mb-6 h-3 w-48 animate-pulse rounded bg-white/8" />

            <div className="mb-6 h-28 animate-pulse rounded-lg border border-white/10 bg-white/5" />

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-white/8" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-white/8" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-white/8" />
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#fcc42c]/20 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#fcc42c]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading product
            </div>

          </div>

        </div>

      </div>

    </div>

  )

}


// Error UI for product detail
export function ProductDetailError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#011a1e] px-4 pt-28 pb-16 text-center text-white">
      <ServerCrash className="mb-5 h-14 w-14 text-red-300" />
      <h1 className="mb-3 text-3xl font-black">Product could not be loaded</h1>
      <p className="mb-6 max-w-md text-sm leading-7 text-gray-400">
        The product detail service did not respond correctly. Please retry the request.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#011a1e] hover:bg-white"
        >
          <RotateCcw className="h-4 w-4" />
          Retry
        </button>
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-wider text-white hover:border-[#fcc42c]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    </div>
  )
}



// Not found UI for product detail
export function ProductDetailNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#011a1e] px-4 pt-28 pb-16 text-center text-white">
      <SearchX className="mb-5 h-14 w-14 text-[#fcc42c]" />
      <h1 className="mb-3 text-3xl font-black">Product Not Found</h1>
      <p className="mb-6 max-w-md text-sm leading-7 text-gray-400">
        The requested product does not exist in the backend catalog.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#011a1e] hover:bg-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
    </div>
  )
}
