import { useState } from "react"
import { Grid, List } from "lucide-react"
import { getCategoryIcon } from "../components/layout/header/helpers"
import ProductCard from "../components/products/ProductCard"
import ProductCategoryStrip from "../components/products/ProductCategoryStrip"
import ProductFilters from "../components/products/ProductFilters"
import ProductHero from "../components/products/ProductHero"
import {
  ProductGridSkeleton,
  ProductsEmptyState,
  ProductsErrorState,
} from "../components/products/ProductListStates"
import ProductPagination from "../components/products/ProductPagination"
import { useProductListing } from "../components/products/useProductListing"




export default function Products() {


  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid")
  const listing = useProductListing()


  // Product Listing
  const {
    selectedDepartment,
    selectedFamily,
    priceRange,
    products,
    meta,
    departments,
    departmentOptions,
    familyOptions,
    filtersQuery,
    productsQuery,
    hero,
    hasActiveFilters,
    handleDepartmentChange,
    handleFamilyChange,
    handlePriceRangeChange,
    handlePageChange,
    resetFilters,
  } = listing


  return (


    <div className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">


      <ProductHero
        title={hero?.title}
        description={hero?.description}
        image={hero?.image}
        label={hero?.label}
        resultCount={hero?.resultCount}
        isLoading={productsQuery?.isLoading}
        isError={productsQuery?.isError}
        onRetry={() => productsQuery?.refetch()}
      />


      <ProductCategoryStrip
        departments={departments}
        selectedDepartment={selectedDepartment}
        selectedFamily={selectedFamily}
        isLoading={filtersQuery?.isLoading}
        isError={filtersQuery?.isError}
        onDepartmentChange={handleDepartmentChange}
        onReset={resetFilters}
        onRetry={() => filtersQuery?.refetch()}
      />


      <ProductFilters
        selectedDepartment={selectedDepartment}
        selectedFamily={selectedFamily}
        priceRange={priceRange}
        departmentOptions={departmentOptions}
        familyOptions={familyOptions}
        activeIcon={getCategoryIcon(selectedDepartment || hero.title)}
        filtersLoading={filtersQuery?.isLoading}
        filtersError={filtersQuery?.isError}
        hasActiveFilters={hasActiveFilters}
        onDepartmentChange={handleDepartmentChange}
        onFamilyChange={handleFamilyChange}
        onPriceRangeChange={handlePriceRangeChange}
        onReset={resetFilters}
        onRetry={() => filtersQuery?.refetch()}
      />


      <section className="py-10 sm:py-14">

        <div className="container mx-auto px-4 lg:px-8">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fcc42c]">
                {productsQuery.isLoading
                  ? "Loading products"
                  : `${hero.resultCount} result${hero.resultCount === 1 ? "" : "s"}`}
              </p>

              <h2 className="text-2xl font-black text-white sm:text-3xl">{hero.title}</h2>

            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">

              {(selectedDepartment || selectedFamily) && (

                <div className="hidden flex-wrap gap-2 md:flex">

                  {selectedDepartment && (
                    <span className="rounded-full border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-1 text-xs font-bold text-[#fcc42c]">
                      {selectedDepartment}
                    </span>
                  )}

                  {selectedFamily && (
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                      {selectedFamily}
                    </span>
                  )}

                </div>

              )}


              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">

                <button
                  onClick={() => setLayoutMode("grid")}
                  className={`rounded-lg p-2 transition-colors ${layoutMode === "grid" ? "bg-[#04444c] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  title="Grid layout"
                >
                  <Grid className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setLayoutMode("list")}
                  className={`rounded-lg p-2 transition-colors ${layoutMode === "list" ? "bg-[#04444c] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  title="List layout"
                >
                  <List className="h-4 w-4" />
                </button>

              </div>

            </div>

          </div>


          {productsQuery?.isLoading ? (

            <ProductGridSkeleton layoutMode={layoutMode} />

          ) : productsQuery?.isError ? (

            <ProductsErrorState onRetry={() => productsQuery.refetch()} />

          ) : products?.length === 0 ? (

            <ProductsEmptyState onReset={resetFilters} />

          ) : (

            <>

              <div
                className={
                  layoutMode === "grid"
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-5"
                }
              >
                {products.map(product => (
                  <ProductCard key={product.id} product={product} layoutMode={layoutMode} />
                ))}
              </div>

              {meta && <ProductPagination meta={meta} onPageChange={handlePageChange} />}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
