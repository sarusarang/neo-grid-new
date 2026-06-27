import { Loader2, PackageSearch, RotateCcw, ServerCrash, ShieldCheck } from "lucide-react"


// Props for ProductHero component
interface ProductHeroProps {
  title: string
  description: string
  image: string
  label: string
  resultCount: number
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}


export default function ProductHero({ title, description, image, label, resultCount, isLoading, isError, onRetry, }: ProductHeroProps) {


  // Error UI
  if (isError) {
    return (
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div className="absolute inset-0 z-0 bg-[#011a1e]" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-6 sm:p-8">
            <ServerCrash className="mb-4 h-10 w-10 text-red-300" />
            <h1 className="mb-2 text-3xl font-black text-white sm:text-4xl">Category banner could not load</h1>
            <p className="mb-5 max-w-xl text-sm leading-7 text-gray-300">
              The product service did not return the category banner. You can retry the backend request.
            </p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] hover:bg-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }



  // Loading UI
  if (isLoading) {
    return (
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div className="absolute inset-0 z-0 bg-[#011a1e]" />
        <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-8 px-4 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fcc42c]/20 bg-[#fcc42c]/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#fcc42c]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading banner
            </div>
            <div className="mb-4 h-12 w-4/5 animate-pulse rounded-lg bg-white/10 sm:h-16" />
            <div className="mb-3 h-4 w-full max-w-xl animate-pulse rounded bg-white/8" />
            <div className="mb-8 h-4 w-3/4 max-w-lg animate-pulse rounded bg-white/8" />
            <div className="flex flex-wrap gap-3">
              <div className="h-16 w-52 animate-pulse rounded-lg border border-white/10 bg-white/5" />
              <div className="h-16 w-52 animate-pulse rounded-lg border border-white/10 bg-white/5" />
            </div>
          </div>

          <div className="h-[260px] animate-pulse rounded-lg border border-white/10 bg-white/5 sm:h-[340px] lg:col-span-6" />
        </div>
      </section>
    )
  }



  return (


    <section className="relative hidden sm:block overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">

      <div className="absolute inset-0 z-0">
        <img src={image} alt={title} loading="lazy" className="h-full w-full scale-105 object-cover opacity-60" />
        <div className="absolute inset-0 bg-linear-to-b from-[#011a1e] via-[#011a1e]/20 to-[#011a1e]" />
      </div>


      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-8 px-4 lg:grid-cols-12 lg:gap-12 lg:px-8">

        <div className="lg:col-span-6">

          <span className="mb-5 inline-flex rounded-full border border-white/5 bg-[#04444c] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#fcc42c] shadow-lg shadow-black/30">
            {label}
          </span>

          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mb-7 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">{description}</p>

          <div className="flex flex-wrap gap-3">

            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 pr-5 backdrop-blur-md">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fcc42c] bg-[#011a1e] text-[#fcc42c]">
                <PackageSearch className="h-5 w-5" />
              </div>

              <div>
                <h5 className="text-sm font-extrabold leading-tight text-white">{resultCount} Products</h5>
                <p className="text-xs text-gray-400">Backend filtered result</p>
              </div>

            </div>

            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 pr-5 backdrop-blur-md">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fcc42c] bg-[#011a1e] text-[#fcc42c]">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h5 className="text-sm font-extrabold leading-tight text-white">NeoGrid Assured</h5>
                <p className="text-xs text-gray-400">Verified catalog data</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}
