import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { FilterOption } from "./ProductFilterDropdown"
import { getProductImage, resolveMediaUrl, stripHtml } from "./productUtils"
import { useProductFilterCategory, useProducts } from "../../service/product/useAuth"


// fallback hero image
export const FALLBACK_HERO_IMAGE = "/1920-1080 service-01.jpg.jpeg"



// dedupe items
const dedupe = (items: string[] = []) => Array.from(new Set(items.filter(Boolean)))



// get price range key
const getPriceRangeKey = (minPrice: string, maxPrice: string) => {
  if (!minPrice && !maxPrice) return "all"
  if (!minPrice && maxPrice === "15000") return "under-15000"
  if (minPrice === "15000" && maxPrice === "50000") return "15000-50000"
  if (minPrice === "50000" && !maxPrice) return "above-50000"
  return "all"
}



// get price params
const getPriceParams = (range: string) => {
  if (range === "under-15000") return { min_price: null, max_price: "15000" }
  if (range === "15000-50000") return { min_price: "15000", max_price: "50000" }
  if (range === "above-50000") return { min_price: "50000", max_price: null }
  return { min_price: null, max_price: null }
}




export function useProductListing() {


  // query params
  const [searchParams, setSearchParams] = useSearchParams()


  // selected department
  const selectedDepartment = searchParams.get("department") || ""


  // selected family
  const selectedFamily = searchParams.get("family") || ""


  // min price
  const minPrice = searchParams.get("min_price") || ""


  // max price
  const maxPrice = searchParams.get("max_price") || ""

  
  // current page
  const currentPage = Math.max(1, Number(searchParams.get("page") || 1) || 1)


  // price range
  const priceRange = getPriceRangeKey(minPrice, maxPrice)


  // filters query
  const filtersQuery = useProductFilterCategory({
    department: selectedDepartment || undefined,
    family: selectedFamily || undefined,
  })


  // products query
  const productsQuery = useProducts({
    department: selectedDepartment || undefined,
    family: selectedFamily || undefined,
    min_price: minPrice || undefined,
    max_price: maxPrice || undefined,
    page: currentPage,
  })


  // products data
  const products = productsQuery?.data?.data ?? []
  const banner = productsQuery?.data?.banner ?? null
  const meta = productsQuery?.data?.meta



  // departments
  const departments = useMemo(() => {
    const values = dedupe(filtersQuery?.data?.data?.departments ?? [])
    return selectedDepartment && !values.includes(selectedDepartment)
      ? [selectedDepartment, ...values]
      : values
  }, [filtersQuery?.data?.data?.departments, selectedDepartment])


  // families
  const families = useMemo(() => {
    const values = dedupe(filtersQuery?.data?.data?.families ?? [])
    return selectedFamily && !values.includes(selectedFamily)
      ? [selectedFamily, ...values]
      : values
  }, [filtersQuery?.data?.data?.families, selectedFamily])


  // department options
  const departmentOptions = useMemo<FilterOption[]>(() => [
    { value: "all", label: "All departments", description: "Show every main category" },
    ...departments.map(department => ({
      value: department,
      label: department,
      description: "Main category",
    })),
  ], [departments])


  // family options
  const familyOptions = useMemo<FilterOption[]>(() => [
    { value: "all", label: "All families", description: "Show every subcategory" },
    ...families.map(family => ({
      value: family,
      label: family,
      description: "Subcategory",
    })),
  ], [families])



  // update params
  const updateParams = (updates: Record<string, string | null>, resetPage = true) => {
    const next = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })

    if (resetPage) next.set("page", "1")
    setSearchParams(next)
  }


  // handle department change
  const handleDepartmentChange = (department: string) => {
    const next = new URLSearchParams(searchParams)
    next.delete("family")

    if (!department || department === "all") {
      next.delete("department")
    } else {
      next.set("department", department)
    }

    next.set("page", "1")
    setSearchParams(next)
  }


  // handle family change
  const handleFamilyChange = (family: string) => {
    updateParams({ family }, true)
  }


  // handle price range change
  const handlePriceRangeChange = (range: string) => {
    updateParams(getPriceParams(range), true)
  }


  // handle page change
  const handlePageChange = (page: number) => {
    updateParams({ page: String(Math.max(1, page)) }, false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  // reset filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams())
  }


  // hero product
  const heroProduct = products[0]


  // hero title
  const heroTitle = banner?.name || selectedDepartment || "All Products"


  // banner description
  const bannerDescription = stripHtml(banner?.description || "")


  // hero description
  const heroDescription =
    bannerDescription ||
    (selectedFamily
      ? `${heroTitle} / ${selectedFamily}`
      : selectedDepartment
        ? `Explore products from ${heroTitle}.`
        : "Browse NeoGrid products by department, family, and price.")


  // hero image
  const heroImage = resolveMediaUrl(banner?.image) || (heroProduct ? getProductImage(heroProduct) : "") || FALLBACK_HERO_IMAGE


  // result count
  const resultCount = meta?.count ?? products.length


  // has active filters
  const hasActiveFilters = Boolean(selectedDepartment || selectedFamily || minPrice || maxPrice)

  // return
  return {
    selectedDepartment,
    selectedFamily,
    priceRange,
    minPrice,
    maxPrice,
    products,
    banner,
    meta,
    departments,
    families,
    departmentOptions,
    familyOptions,
    filtersQuery,
    productsQuery,
    hero: {
      title: heroTitle,
      description: heroDescription,
      image: heroImage,
      label: selectedFamily ? "Selected Subcategory" : selectedDepartment ? "Selected Department" : "Product Range",
      resultCount,
      hasBanner: Boolean(banner),
    },
    hasActiveFilters,
    handleDepartmentChange,
    handleFamilyChange,
    handlePriceRangeChange,
    handlePageChange,
    resetFilters,
  }
}
