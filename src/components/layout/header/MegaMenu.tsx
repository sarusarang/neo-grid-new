import { Link } from "react-router-dom"
import { ArrowRight, ChevronRight, ImageOff, Loader2, PackageSearch } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import type { Department, Family } from "../../../service/product/types"
import { getCategoryIcon } from "./helpers"

export function buildProductFilterUrl(department?: string, family?: string) {
  const params = new URLSearchParams()

  if (department) params.set("department", department)
  if (family) params.set("family", family)

  const query = params.toString()
  return `/products${query ? `?${query}` : ""}`
}

interface SidebarProps {
  departments: Department[]
  activeCategory: string
  onHover: (name: string) => void
}

function MegaMenuSidebar({ departments, activeCategory, onHover }: SidebarProps) {
  return (
    <div className="w-64 shrink-0 border-r border-gray-100 py-5 pr-3 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
      <p className="text-[9px] font-black text-[#04444c]/50 uppercase tracking-[0.18em] mb-2 pl-3">
        Main Categories
      </p>

      {departments.map((dept) => {
        const isActive = activeCategory === dept?.name
        const subcategoryCount = dept?.family?.length ?? 0

        return (
          <button
            key={dept?.name}
            onMouseEnter={() => onHover(dept?.name ?? "")}
            className={`relative flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left transition-all duration-150 group ${
              isActive
                ? "bg-[#04444c] text-white shadow-lg shadow-[#04444c]/20"
                : "text-gray-600 hover:bg-[#04444c]/6 hover:text-[#04444c]"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#fcc42c] rounded-full" />
            )}

            <span className="flex items-center gap-2.5 min-w-0">
              <span
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? "bg-[#fcc42c]/20" : "bg-[#04444c]/8 group-hover:bg-[#04444c]/12"
                }`}
              >
                <span className={isActive ? "text-[#fcc42c]" : "text-[#04444c]"}>
                  {getCategoryIcon(dept?.name ?? "")}
                </span>
              </span>

              <span className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold leading-tight truncate">{dept?.name}</span>
                <span className={`text-[10px] ${isActive ? "text-[#fcc42c]/80" : "text-gray-400"}`}>
                  {subcategoryCount} subcategor{subcategoryCount === 1 ? "y" : "ies"}
                </span>
              </span>
            </span>

            <ChevronRight
              className={`w-3.5 h-3.5 shrink-0 transition-all duration-150 ${
                isActive
                  ? "opacity-100 text-[#fcc42c]"
                  : "opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

interface FamilyTileProps {
  departmentName: string
  family: Family
  index: number
  onClose: () => void
}

function FamilyTile({ departmentName, family, index, onClose }: FamilyTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.16 }}
    >
      <Link
        to={buildProductFilterUrl(departmentName, family?.name)}
        onClick={onClose}
        className="group block h-full rounded-lg border border-[#04444c]/12 bg-white overflow-hidden shadow-sm shadow-[#04444c]/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#fcc42c] hover:shadow-xl hover:shadow-[#04444c]/10"
      >
        <div className="relative aspect-[4/3] bg-[#f3faf9] overflow-hidden">
          {family?.image ? (
            <img
              src={family.image}
              alt={family?.name ?? "Product subcategory"}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#04444c]/8 text-[#04444c]">
              <span className="w-11 h-11 rounded-lg bg-white/80 border border-[#04444c]/10 flex items-center justify-center shadow-sm">
                <ImageOff className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#04444c]/70">
                Image coming soon
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#011a1e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-3.5">
          <p className="text-[13px] font-black text-[#04444c] leading-snug line-clamp-2 group-hover:text-[#011a1e]">
            {family?.name}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#04444c]/65 group-hover:text-[#fcc42c]">
            View filtered products
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function EmptyDepartmentFallback({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center py-10 px-6">
      <div className="max-w-sm rounded-lg border border-[#fcc42c]/35 bg-[#fff9df] p-6 text-center shadow-lg shadow-[#04444c]/8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-[#04444c] flex items-center justify-center">
          <PackageSearch className="w-7 h-7 text-[#fcc42c]" />
        </div>
        <p className="text-sm font-black text-[#04444c] mb-1">Subcategories coming soon</p>
        <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
          We could not find subcategories for <span className="font-bold">{name}</span> right now.
        </p>
        <Link
          to={buildProductFilterUrl(name)}
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-black text-[#011a1e] bg-[#fcc42c] px-4 py-2.5 rounded-lg hover:bg-[#ffd85c] transition-colors"
        >
          Browse this category
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

function MegaMenuLoadingPanel() {
  return (
    <div className="container mx-auto px-4 lg:px-8 flex" style={{ maxHeight: "62vh" }}>
      <div className="w-64 shrink-0 border-r border-gray-100 py-5 pr-3">
        <div className="flex items-center gap-2 pl-3 mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#04444c]/60">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#fcc42c]" />
          Loading categories
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg bg-[#04444c]/6 px-3 py-3">
              <span className="h-8 w-8 rounded-lg bg-[#04444c]/10 animate-pulse" />
              <span className="min-w-0 flex-1">
                <span className="block h-3 w-28 rounded bg-[#04444c]/10 animate-pulse" />
                <span className="mt-2 block h-2 w-16 rounded bg-[#04444c]/8 animate-pulse" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 py-5 pl-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="h-2.5 w-28 rounded bg-[#04444c]/10 animate-pulse mb-3" />
            <div className="h-6 w-52 rounded bg-[#04444c]/12 animate-pulse" />
          </div>
          <div className="h-9 w-24 rounded-lg bg-[#fcc42c]/30 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-[#04444c]/10 bg-white">
              <div className="aspect-[4/3] bg-[#04444c]/8 animate-pulse" />
              <div className="p-3.5">
                <div className="h-3.5 w-4/5 rounded bg-[#04444c]/12 animate-pulse" />
                <div className="mt-3 h-2.5 w-28 rounded bg-[#fcc42c]/30 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MegaMenuErrorPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-6 rounded-lg border border-[#fcc42c]/35 bg-[#fff9df] p-5 shadow-lg shadow-[#04444c]/8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#04444c] text-[#fcc42c]">
            <PackageSearch className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black text-[#04444c]">Categories are loading slowly</p>
            <p className="text-xs font-semibold text-gray-600">
              You can still open the full products page while we refresh the menu.
            </p>
          </div>
        </div>

        <Link
          to="/products"
          onClick={onClose}
          className="shrink-0 rounded-lg bg-[#fcc42c] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#011a1e] hover:bg-[#ffd85c]"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}

interface PanelProps {
  department: Department | undefined
  onClose: () => void
}

function MegaMenuPanel({ department, onClose }: PanelProps) {
  if (!department) return null

  const families = department?.family ?? []

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
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-[#04444c]/55 uppercase tracking-[0.18em] mb-1">
                Subcategories
              </p>
              <h3 className="text-xl font-black text-[#04444c] leading-tight">{department.name}</h3>
            </div>

            <Link
              to={buildProductFilterUrl(department?.name)}
              onClick={onClose}
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#04444c]/12 bg-[#04444c]/5 px-3.5 py-2 text-xs font-black text-[#04444c] hover:border-[#fcc42c] hover:bg-[#fcc42c] hover:text-[#011a1e] transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {families.length === 0 ? (
            <EmptyDepartmentFallback name={department?.name ?? "this category"} onClose={onClose} />
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {families.map((family, index) => (
                <FamilyTile
                  key={`${department?.name}-${family?.name}`}
                  departmentName={department?.name ?? ""}
                  family={family}
                  index={index}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export interface MegaMenuProps {
  isOpen: boolean
  departments: Department[]
  isLoading: boolean
  isError: boolean
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
  isLoading,
  isError,
  activeCategory,
  headerHeight,
  onHover,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  const activeDepartment = departments.find((d) => d?.name === activeCategory) ?? departments[0]

  return (
    <AnimatePresence>
      {isOpen && (departments.length > 0 || isLoading || isError) && (
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
          {isLoading && departments.length === 0 ? (
            <MegaMenuLoadingPanel />
          ) : isError && departments.length === 0 ? (
            <MegaMenuErrorPanel onClose={onClose} />
          ) : (
            <div className="container mx-auto px-4 lg:px-8 flex" style={{ maxHeight: "62vh" }}>
              <MegaMenuSidebar
                departments={departments}
                activeCategory={activeDepartment?.name ?? ""}
                onHover={onHover}
              />
              <MegaMenuPanel department={activeDepartment} onClose={onClose} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
