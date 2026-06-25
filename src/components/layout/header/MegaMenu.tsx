import { Link } from "react-router-dom"
import { ChevronRight, ArrowRight, Sparkles, PackageSearch, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Department, Product } from "../../../service/product/types"
import { getCategoryIcon, getProductImage } from "./helpers"




// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
interface SidebarProps {
  departments: Department[]
  activeCategory: string
  onHover: (name: string) => void
}


function MegaMenuSidebar({ departments, activeCategory, onHover }: SidebarProps) {

  return (

    <div className="w-52 shrink-0 border-r border-gray-100 py-5 pr-3 flex flex-col gap-0.5 overflow-y-auto scrollbar-hide">

      <p className="text-[9px] font-black text-[#04444c]/50 uppercase tracking-[0.18em] mb-2 pl-3">
        Categories
      </p>

      {departments.map((dept) => {

        const isActive = activeCategory === dept?.name
        const totalProducts = dept?.family?.reduce((n, f) => n + (f?.products?.length ?? 0), 0) ?? 0

        return (

          <button
            key={dept?.name}
            onMouseEnter={() => onHover(dept?.name ?? "")}
            className={`relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${isActive
              ? "bg-[#04444c] text-white shadow-lg shadow-[#04444c]/25"
              : "text-gray-600 hover:bg-[#04444c]/6 hover:text-[#04444c]"
              }`}
          >

            {/* Active left accent bar */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#fcc42c] rounded-full" />
            )}

            <span className="flex items-center gap-2.5 min-w-0">

              <span
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? "bg-[#fcc42c]/20" : "bg-[#04444c]/8 group-hover:bg-[#04444c]/12"
                  }`}
              >

                <span className={isActive ? "text-[#fcc42c]" : "text-[#04444c]"}>
                  {getCategoryIcon(dept?.name ?? "")}
                </span>

              </span>

              <span className="flex flex-col min-w-0">

                <span className="text-[13px] font-bold leading-tight truncate">{dept?.name}</span>

                <span className={`text-[10px] tabular-nums ${isActive ? "text-[#fcc42c]/70" : "text-gray-400"}`}>
                  {totalProducts} product{totalProducts !== 1 ? "s" : ""}
                </span>

              </span>

            </span>

            <ChevronRight
              className={`w-3.5 h-3.5 shrink-0 transition-all duration-150 ${isActive
                ? "opacity-100 text-[#fcc42c]"
                : "opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0"
                }`}
            />

          </button>

        )

      })}

    </div>

  )

}




// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product
  index: number
  onClose: () => void
}


function ProductCard({ product, index, onClose }: ProductCardProps) {


  const image = getProductImage(product)
  const hasDiscount = (product?.discount_percentage ?? 0) > 0
  const discountedPrice = product?.discount_price ?? 0
  const originalPrice = product?.price ?? 0


  return (


    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.18 }}
    >

      <Link
        to={`/product/${product?.id}`}
        onClick={onClose}
        className="group relative flex flex-col rounded-xl overflow-hidden border-2 bg-white border-[#04444c]/20 hover:shadow-xl hover:shadow-[#04444c]/10 transition-all duration-200"
        style={{ boxShadow: "0 1px 4px rgba(4,68,76,0.07)" }}
      >

        {/* ── Image area ─────────────────────────────────────── */}
        <div className="relative bg-linear-to-br from-[#f0fafa] via-[#f5fffe] to-[#eaf6f0] overflow-hidden"
          style={{ aspectRatio: "4/3" }}
        >

          {image ? (

            <img
              src={image}
              alt={product?.name ?? "Product"}
              loading="lazy"
              className="w-full h-full object-contain group-hover:scale-[1.06] transition-transform duration-300"
            />

          ) : (

            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 opacity-40">
              <PackageSearch className="w-7 h-7 text-[#04444c]" />
              <span className="text-[10px] font-semibold text-[#04444c]">No image</span>
            </div>

          )}


          {/* Teal gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-[#04444c]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />


          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">

            {product?.new_arrival && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-black bg-[#fcc42c] text-[#011a1e] px-1.5 py-0.5 rounded-full shadow-sm shadow-[#fcc42c]/40">
                <Sparkles className="w-2.5 h-2.5" />New
              </span>
            )}

          </div>


          {hasDiscount && (
            <span className="absolute top-2 right-2 text-[9px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full shadow-sm">
              -{product?.discount_percentage}%
            </span>
          )}


        </div>


        {/* ── Info area ──────────────────────────────────────── */}
        <div className="p-2.5">

          <p className="text-[12px] font-bold text-gray-800 group-hover:text-[#04444c] transition-colors leading-tight line-clamp-2 mb-1">
            {product?.name}
          </p>

          {hasDiscount ? (

            <div className="flex items-baseline gap-1.5">

              <span className="text-[12px] font-black text-[#04444c]">
                ₹{discountedPrice.toLocaleString("en-IN")}
              </span>

              <span className="text-[10px] text-gray-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>

            </div>

          ) : originalPrice > 0 ? (

            <span className="text-[12px] font-bold text-gray-500">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>

          ) : null}

        </div>

      </Link>

    </motion.div>

  )

}




// ─────────────────────────────────────────────────────────────────────────────
// EMPTY — FAMILY LEVEL
// ─────────────────────────────────────────────────────────────────────────────
function EmptyFamilyFallback({ name }: { name: string }) {

  return (

    <div className="flex items-center gap-3 p-3 rounded-xl bg-linear-to-r from-[#04444c]/5 to-transparent border border-[#04444c]/10">

      <div className="shrink-0 w-8 h-8 rounded-lg bg-[#04444c]/8 flex items-center justify-center">
        <PackageSearch className="w-4 h-4 text-[#04444c]/50" />
      </div>

      <div>
        <p className="text-xs font-semibold text-[#04444c]">Coming soon</p>
        <p className="text-[11px] text-gray-400 leading-snug">
          Products for <span className="font-medium text-gray-500">{name}</span> are being added.
        </p>
      </div>

    </div>

  )

}




// ─────────────────────────────────────────────────────────────────────────────
// EMPTY — DEPARTMENT LEVEL (entire category empty)
// ─────────────────────────────────────────────────────────────────────────────
function EmptyDepartmentFallback({ name, onClose }: { name: string; onClose: () => void }) {

  return (

    <div className="flex-1 flex items-center justify-center py-10 px-6">

      <div className="text-center max-w-[260px]">

        {/* Illustration box */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-linear-to-br from-[#04444c] to-[#04444c]/70 flex items-center justify-center shadow-lg shadow-[#04444c]/20">
          <Zap className="w-9 h-9 text-[#fcc42c]" />
        </div>

        <p className="text-sm font-black text-[#04444c] mb-1">Coming Soon</p>

        <p className="text-[13px] text-gray-500 mb-1 font-semibold">{name}</p>

        <p className="text-[11px] text-gray-400 mb-5 leading-relaxed">
          We're stocking this category. Check back soon or browse our current range.
        </p>

        <Link
          to="/products"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#04444c] px-4 py-2.5 rounded-xl hover:bg-[#04444c]/90 transition-colors shadow-md shadow-[#04444c]/20"
        >
          Browse all products
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>

    </div>

  )

}




// ─────────────────────────────────────────────────────────────────────────────
// PANEL
// ─────────────────────────────────────────────────────────────────────────────
interface PanelProps {
  department: Department | undefined
  onClose: () => void
}

function MegaMenuPanel({ department, onClose }: PanelProps) {
  if (!department) return null

  const hasAnyProducts = department?.family?.some((f) => (f?.products?.length ?? 0) > 0) ?? false

  return (
    <div className="flex-1 py-5 pl-6 overflow-y-auto scrollbar-hide flex flex-col min-h-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={department?.name}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.14 }}
          className="flex flex-col gap-5 flex-1"
        >
          {/* Department-level empty */}
          {!hasAnyProducts && (
            <EmptyDepartmentFallback name={department?.name ?? "this category"} onClose={onClose} />
          )}

          {/* Family sections */}
          {hasAnyProducts && department?.family?.map((family) => (
            <div key={family?.name}>
              {/* Family header */}
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[9px] font-black text-[#04444c] uppercase tracking-[0.16em]">
                  {family?.name}
                </p>
                {(family?.products?.length ?? 0) > 0 && (
                  <span className="text-[9px] font-black text-[#04444c] bg-[#04444c]/10 px-1.5 py-0.5 rounded-full">
                    {family?.products?.length}
                  </span>
                )}
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {(family?.products?.length ?? 0) === 0 ? (
                <EmptyFamilyFallback name={family?.name ?? "this section"} />
              ) : (
                <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                  {family?.products?.map((product, i) => (
                    <ProductCard key={product?.id} product={product} index={i} onClose={onClose} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* View all footer */}
          {hasAnyProducts && (
            <div className="mt-auto pt-3 border-t border-gray-100">
              <Link
                to={`/products?category=${encodeURIComponent(department?.name ?? "")}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#04444c] group"
              >
                View all {department?.name}
                <span className="w-5 h-5 rounded-full bg-[#04444c]/10 group-hover:bg-[#04444c] flex items-center justify-center transition-colors duration-150">
                  <ArrowRight className="w-3 h-3 text-[#04444c] group-hover:text-white transition-colors duration-150" />
                </span>
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MEGA MENU WRAPPER (desktop only — hidden on mobile)
// ─────────────────────────────────────────────────────────────────────────────

export interface MegaMenuProps {
  isOpen: boolean
  departments: Department[]
  activeCategory: string
  headerHeight: number
  onHover: (name: string) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClose: () => void
}

export default function MegaMenu({
  isOpen,
  departments,
  activeCategory,
  headerHeight,
  onHover,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  const activeDepartment = departments.find((d) => d?.name === activeCategory)

  return (
    <AnimatePresence>
      {isOpen && departments.length > 0 && (
        <motion.div
          key="megamenu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ top: headerHeight, zIndex: 49 }}
          className="hidden lg:block fixed left-0 w-full bg-white shadow-2xl shadow-black/12 border-t-2 border-[#04444c]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="container mx-auto px-4 lg:px-8 flex"
            style={{ maxHeight: "62vh" }}
          >
            <MegaMenuSidebar
              departments={departments}
              activeCategory={activeCategory}
              onHover={onHover}
            />
            <MegaMenuPanel department={activeDepartment} onClose={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
