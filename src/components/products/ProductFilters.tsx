import type { ReactNode } from "react"
import { Grid, RotateCcw, SlidersHorizontal, TrendingUp } from "lucide-react"
import ProductFilterDropdown from "./ProductFilterDropdown"
import type { FilterOption } from "./ProductFilterDropdown"

interface ProductFiltersProps {
  selectedDepartment: string
  selectedFamily: string
  priceRange: string
  departmentOptions: FilterOption[]
  familyOptions: FilterOption[]
  activeIcon: ReactNode
  filtersLoading: boolean
  filtersError: boolean
  hasActiveFilters: boolean
  onDepartmentChange: (department: string) => void
  onFamilyChange: (family: string) => void
  onPriceRangeChange: (range: string) => void
  onReset: () => void
  onRetry: () => void
}

const priceOptions: FilterOption[] = [
  { value: "all", label: "All prices", description: "No price limit" },
  { value: "under-15000", label: "Under Rs.15,000", description: "Budget-friendly products" },
  { value: "15000-50000", label: "Rs.15,000 - Rs.50,000", description: "Mid-range products" },
  { value: "above-50000", label: "Above Rs.50,000", description: "Premium products" },
]

export default function ProductFilters({
  selectedDepartment,
  selectedFamily,
  priceRange,
  departmentOptions,
  familyOptions,
  activeIcon,
  filtersLoading,
  filtersError,
  hasActiveFilters,
  onDepartmentChange,
  onFamilyChange,
  onPriceRangeChange,
  onReset,
  onRetry,
}: ProductFiltersProps) {
  return (
    <section className="border-b border-white/5 bg-[#011a1e]/40 py-6 sm:py-8">
      <div className="container mx-auto flex flex-col gap-4 px-4 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        {filtersError && (
          <div className="rounded-lg border border-[#fcc42c]/30 bg-[#fcc42c]/10 p-4 text-sm font-bold text-[#fcc42c] xl:hidden">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>Filter options could not be loaded.</span>
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#011a1e]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300">
            <SlidersHorizontal className="h-4 w-4 text-[#fcc42c]" />
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
                Filters
              </span>
              <span className="block text-sm font-black text-white">Product Finder</span>
            </span>
          </div>

          <ProductFilterDropdown
            label="Department"
            value={selectedDepartment || "all"}
            options={departmentOptions}
            onChange={onDepartmentChange}
            icon={activeIcon}
            disabled={filtersError}
            loading={filtersLoading && departmentOptions.length <= 1}
            placeholder="Choose department"
          />

          <ProductFilterDropdown
            label="Family"
            value={selectedFamily || "all"}
            options={familyOptions}
            onChange={onFamilyChange}
            icon={<Grid className="h-4 w-4" />}
            disabled={filtersError || familyOptions.length <= 1}
            loading={filtersLoading && familyOptions.length <= 1}
            placeholder="Choose family"
          />

          <ProductFilterDropdown
            label="Price"
            value={priceRange}
            options={priceOptions}
            onChange={onPriceRangeChange}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4 xl:border-t-0 xl:pt-0">
          {filtersError && (
            <button
              onClick={onRetry}
              className="hidden items-center justify-center gap-1.5 rounded-lg border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#fcc42c] transition-colors hover:bg-[#fcc42c] hover:text-[#011a1e] xl:flex"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry filters
            </button>
          )}

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
