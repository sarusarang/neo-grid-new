import type { ProductsMeta } from "../../service/product/types"



// Props for ProductPagination component
interface ProductPaginationProps {
  meta: ProductsMeta
  onPageChange: (page: number) => void
}



export default function ProductPagination({ meta, onPageChange }: ProductPaginationProps) {


  // if no meta or total pages is 1, return null
  if (!meta || meta?.total_pages <= 1) return null


  // Get current page from meta
  const currentPage = meta?.current_page || 1


  // Get total pages from meta
  const totalPages = meta?.total_pages


  // Get visible pages (3 pages: current + previous + next)
  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)?.filter(page => Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages)



  return (


    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-3 sm:flex-row">

      <p className="text-xs font-bold text-gray-400">
        Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!meta?.previous}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-300 transition-colors hover:border-[#fcc42c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>


        {visiblePages?.map((page, index) => {

          const previousPage = visiblePages[index - 1]
          const showGap = previousPage && page - previousPage > 1


          return (

            <span key={page} className="flex items-center gap-2">

              {showGap && <span className="text-xs font-bold text-gray-500">...</span>}

              <button
                onClick={() => onPageChange(page)}
                className={`h-9 min-w-9 rounded-lg px-3 text-xs font-black transition-colors ${page === currentPage
                  ? "bg-[#fcc42c] text-[#011a1e]"
                  : "border border-white/10 bg-white/5 text-gray-300 hover:border-[#fcc42c] hover:text-white"
                  }`}
              >
                {page}

              </button>

            </span>

          )

        })}


        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!meta?.next}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-300 transition-colors hover:border-[#fcc42c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>

  )

}
