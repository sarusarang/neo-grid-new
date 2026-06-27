import { PackageSearch, RotateCcw } from "lucide-react"
import { getCategoryIcon } from "../layout/header/helpers"



// Product Category Strip Component
interface ProductCategoryStripProps {
  departments: string[]
  selectedDepartment: string
  selectedFamily: string
  isLoading: boolean
  isError: boolean
  onDepartmentChange: (department: string) => void
  onReset: () => void
  onRetry: () => void
}


export default function ProductCategoryStrip({ departments, selectedDepartment, selectedFamily, isLoading, isError, onDepartmentChange, onReset, onRetry, }: ProductCategoryStripProps) {


  return (


    <section className="sticky top-14 z-30 border-y border-white/10 bg-[#011a1e]/90 py-4 backdrop-blur-xl">


      <div className="container mx-auto px-4 lg:px-8">

        {isError ? (

          <div className="flex flex-col gap-3 rounded-lg border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-4 py-3 text-sm font-bold text-[#fcc42c] sm:flex-row sm:items-center sm:justify-between">

            <span className="inline-flex items-center gap-2">
              <PackageSearch className="h-4 w-4" />
              Category filters could not be loaded.
            </span>

            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#011a1e]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>

          </div>

        ) : (

          <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-hide">

            <button
              onClick={onReset}
              className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-sm font-black transition-all duration-200 ${!selectedDepartment && !selectedFamily
                ? "border-[#fcc42c] bg-[#fcc42c] text-[#011a1e]"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-[#fcc42c]/60 hover:text-white"
                }`}
            >
              All Products
            </button>

            {isLoading && departments?.length === 0 ? (

              [...Array(3)].map((_, index) => (
                <span
                  key={index}
                  className="h-12 w-44 shrink-0 animate-pulse rounded-lg border border-white/10 bg-white/8"
                />
              ))

            ) : (

              departments.map(department => {

                const isActive = selectedDepartment === department

                return (

                  <button
                    key={department}
                    onClick={() => onDepartmentChange(department)}
                    className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-sm font-black transition-all duration-200 ${isActive
                      ? "border-[#fcc42c] bg-[#04444c] text-white shadow-lg shadow-[#fcc42c]/5"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-[#fcc42c]/60 hover:text-white"
                      }`}
                  >

                    <span className={isActive ? "text-[#fcc42c]" : "text-gray-400"}>{getCategoryIcon(department)}</span>
                    <span>{department}</span>

                  </button>
                )

              })

            )}

          </div>

        )}

      </div>

    </section>

  )

}
