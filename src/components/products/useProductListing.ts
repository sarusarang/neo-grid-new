import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { FilterOption } from "./ProductFilterDropdown"
import { getProductImage, resolveMediaUrl, stripHtml } from "./productUtils"
import { useProductFilterCategory, useProducts } from "../../service/product/useAuth"

export const FALLBACK_HERO_IMAGE = "/1920-1080 service-01.jpg.jpeg"

const dedupe = (items: string[] = []) => Array.from(new Set(items.filter(Boolean)))

const getPriceRangeKey = (minPrice: string, maxPrice: string) => {
  if (!minPrice && !maxPrice) return "all"
  if (!minPrice && maxPrice === "15000") return "under-15000"
  if (minPrice === "15000" && maxPrice === "50000") return "15000-50000"
  if (minPrice === "50000" && !maxPrice) return "above-50000"
  return "all"
}

const getPriceParams = (range: string) => {
  if (range === "under-15000") return { min_price: null, max_price: "15000" }
  if (range === "15000-50000") return { min_price: "15000", max_price: "50000" }
  if (range === "above-50000") return { min_price: "50000", max_price: null }
  return { min_price: null, max_price: null }
}

export function useProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedDepartment = searchParams.get("department") || ""
  const selectedFamily = searchParams.get("family") || ""
  const minPrice = searchParams.get("min_price") || ""
  const maxPrice = searchParams.get("max_price") || ""
  const currentPage = Math.max(1, Number(searchParams.get("page") || 1) || 1)
  const priceRange = getPriceRangeKey(minPrice, maxPrice)

  const filtersQuery = useProductFilterCategory({
    department: selectedDepartment || undefined,
    family: selectedFamily || undefined,
  })

  const productsQuery = useProducts({
    department: selectedDepartment || undefined,
    family: selectedFamily || undefined,
    min_price: minPrice || undefined,
    max_price: maxPrice || undefined,
    page: currentPage,
  })

  const products = productsQuery.data?.data ?? []
  const banner = productsQuery.data?.banner ?? null
  const meta = productsQuery.data?.meta

  const departments = useMemo(() => {
    const values = dedupe(filtersQuery.data?.data?.departments ?? [])
    return selectedDepartment && !values.includes(selectedDepartment)
      ? [selectedDepartment, ...values]
      : values
  }, [filtersQuery.data?.data?.departments, selectedDepartment])

  const families = useMemo(() => {
    const values = dedupe(filtersQuery.data?.data?.families ?? [])
    return selectedFamily && !values.includes(selectedFamily)
      ? [selectedFamily, ...values]
      : values
  }, [filtersQuery.data?.data?.families, selectedFamily])

  const departmentOptions = useMemo<FilterOption[]>(() => [
    { value: "all", label: "All departments", description: "Show every main category" },
    ...departments.map(department => ({
      value: department,
      label: department,
      description: "Main category",
    })),
  ], [departments])

  const familyOptions = useMemo<FilterOption[]>(() => [
    { value: "all", label: "All families", description: "Show every subcategory" },
    ...families.map(family => ({
      value: family,
      label: family,
      description: "Subcategory",
    })),
  ], [families])

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

  const handleFamilyChange = (family: string) => {
    updateParams({ family }, true)
  }

  const handlePriceRangeChange = (range: string) => {
    updateParams(getPriceParams(range), true)
  }

  const handlePageChange = (page: number) => {
    updateParams({ page: String(Math.max(1, page)) }, false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  const heroProduct = products[0]
  const heroTitle = banner?.name || selectedDepartment || "All Products"
  const bannerDescription = stripHtml(banner?.description || "")
  const heroDescription =
    bannerDescription ||
    (selectedFamily
      ? `${heroTitle} / ${selectedFamily}`
      : selectedDepartment
        ? `Explore products from ${heroTitle}.`
        : "Browse NeoGrid products by department, family, and price.")
  const heroImage = resolveMediaUrl(banner?.image) || (heroProduct ? getProductImage(heroProduct) : "") || FALLBACK_HERO_IMAGE
  const resultCount = meta?.count ?? products.length
  const hasActiveFilters = Boolean(selectedDepartment || selectedFamily || minPrice || maxPrice)

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
