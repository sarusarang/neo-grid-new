import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  BatteryCharging,
  ChevronDown,
  ChevronUp,
  PackageSearch,
  RotateCcw,
} from "lucide-react"
import { useProductDepartments } from "../../service/home/useHome"
import type { ProductDepartment } from "../../service/home/types"
import { resolveMediaUrl, stripHtml } from "../products/productUtils"


const FALLBACK_VISIBLE_COUNT = 3


const getDepartmentDescription = (department: ProductDepartment) => {
  const description = stripHtml(department.description)

  if (description) return description

  return `Explore reliable ${department.name.toLowerCase()} products built for smarter backup and everyday energy needs.`
}


const getDepartmentLink = (department: ProductDepartment) =>
  `/products?department=${encodeURIComponent(department.name)}`


function SolutionCard({ department, index }: { department: ProductDepartment; index: number }) {
  const imageUrl = resolveMediaUrl(department.image)
  const description = getDepartmentDescription(department)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#022a30]/70 shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:border-[#fcc42c]/60 hover:bg-[#02363d]"
    >
      <Link to={getDepartmentLink(department)} className="flex h-full flex-col">
        <div className="relative aspect-4/3 w-full overflow-hidden border-b border-white/10 bg-white/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={department.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(4,68,76,0.95),rgba(1,26,30,0.98))]">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-[#fcc42c]/25 bg-[#fcc42c]/10 text-[#fcc42c] shadow-lg shadow-black/20 sm:h-24 sm:w-24">
                <BatteryCharging className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full border border-[#fcc42c]/30 bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#fcc42c] backdrop-blur-md">
            {department.slug}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4">
            {/* <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#fcc42c]/80">
              {department.slug}
            </p> */}

            <h3 className="text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-[#fcc42c] sm:text-2xl">
              {department.name}
            </h3>
          </div>

          <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">
            {description}
          </p>

          <span className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors duration-300 group-hover:border-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e]">
            View Products
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}


function SolutionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
        >
          <div className="aspect-[4/3] animate-pulse bg-white/10" />

          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-3 w-24 animate-pulse rounded bg-[#fcc42c]/20" />
            <div className="h-7 w-3/4 animate-pulse rounded bg-white/12" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-white/8" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-white/8" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-white/8" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}


function SolutionsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-[#fcc42c]/25 bg-[#fcc42c]/10 px-5 py-10 text-center">
      <PackageSearch className="mx-auto mb-4 h-11 w-11 text-[#fcc42c]" />
      <h3 className="mb-2 text-xl font-black text-white">Solutions could not be loaded</h3>
      <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-gray-400">
        The department list did not respond correctly. Try refreshing the section.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#011a1e] transition-colors hover:bg-white"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Retry
      </button>
    </div>
  )
}


function SolutionsEmpty() {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/5 px-5 py-10 text-center">
      <BatteryCharging className="mx-auto mb-4 h-11 w-11 text-[#fcc42c]" />
      <h3 className="mb-2 text-xl font-black text-white">No solutions available</h3>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-400">
        Product departments will appear here once they are active.
      </p>
    </div>
  )
}


export default function SolutionsSection() {
  const [showAll, setShowAll] = useState(false)
  const departmentsQuery = useProductDepartments()
  const departments = departmentsQuery.data?.data?.filter(department => department.is_active) ?? []
  const visibleDepartments = showAll ? departments : departments.slice(0, FALLBACK_VISIBLE_COUNT)
  const canToggle = departments.length > FALLBACK_VISIBLE_COUNT

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#011a1e] py-8 sm:py-12 lg:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_42%,rgba(252,196,44,0.04))] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
            >
              Which Solution{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fcc42c] to-yellow-300">
                Do You Need
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
            >
              Explore our tailormade clean energy architectures engineered for resilience and efficiency.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-b border-[#fcc42c]/30 pb-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#fcc42c] transition-colors hover:border-white hover:text-white"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {departmentsQuery.isLoading ? (
          <SolutionsSkeleton />
        ) : departmentsQuery.isError ? (
          <SolutionsError onRetry={() => departmentsQuery.refetch()} />
        ) : departments.length === 0 ? (
          <SolutionsEmpty />
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleDepartments.map((department, index) => (
                  <SolutionCard key={department.id} department={department} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {canToggle && (
              <motion.div layout className="mt-8 flex justify-center sm:mt-12">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-[#fcc42c] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#fcc42c] shadow-lg shadow-[#fcc42c]/5 transition-all duration-300 hover:bg-[#fcc42c] hover:text-[#011a1e] hover:shadow-[#fcc42c]/20"
                >
                  {showAll ? (
                    <>
                      View Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
