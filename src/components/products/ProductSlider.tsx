import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, ImageOff, PackageCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProductSlider } from "../../service/product/useAuth"
import type { Product } from "../../service/product/types"
import { formatPrice, getDiscountPercent, getProductImage, getSellingPrice, stripHtml, toNumber } from "./productUtils"


interface ProductSliderProps {
  title?: string
  accentTitle?: string
  subtitle?: string
  excludeProductId?: number
  className?: string
}


const getItemsPerView = () => {
  if (typeof window === "undefined") return 1
  if (window.innerWidth >= 1280) return 4
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}


function ProductSliderSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="min-h-[430px] shrink-0 basis-full animate-pulse rounded-lg border border-white/10 bg-white/[0.04] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"
        >
          <div className="aspect-4/3 rounded-t-lg bg-white/8" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-28 rounded-full bg-[#fcc42c]/15" />
            <div className="h-6 w-4/5 rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/8" />
            <div className="h-8 w-32 rounded bg-white/10" />
            <div className="h-11 rounded-lg bg-white/8" />
          </div>
        </div>
      ))}
    </div>
  )
}


function ProductSliderCard({ product }: { product: Product }) {
  const image = getProductImage(product)
  const sellingPrice = getSellingPrice(product)
  const originalPrice = toNumber(product?.price)
  const discountPercent = getDiscountPercent(product)
  const description = stripHtml(product?.description)
  const familyName = product?.family?.name
  const departmentName = product?.family?.department?.name

  return (
    <Link
      to={`/product/${product?.id}`}
      state={{ product }}
      className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#fcc42c]/50 hover:bg-white/[0.085]"
    >
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-[#021114] p-4">
        {image ? (
          <img
            src={image}
            alt={product?.name}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.48)] transition-transform duration-500 group-hover:scale-[1.04]"
            draggable="false"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs font-bold">Image coming soon</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#011a1e] to-transparent" />

        <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
          {product?.new_arrival && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fcc42c] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#011a1e]">
              <Sparkles className="h-3 w-3" />
              New
            </span>
          )}

          {!product?.is_available && (
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
              Out of stock
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
            {discountPercent}% off
          </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {departmentName && (
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#fcc42c]/25 bg-[#fcc42c]/10 px-2.5 py-1 text-[10px] font-black text-[#fcc42c]">
              <PackageCheck className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{departmentName}</span>
            </span>
          )}

          {familyName && (
            <span className="max-w-full truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-gray-300">
              {familyName}
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-extrabold leading-snug text-white transition-colors group-hover:text-[#fcc42c]">
          {product?.name}
        </h3>

        {(product?.model_type || product?.model_number) && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">
            {[product?.model_type, product?.model_number].filter(Boolean).join(" / ")}
          </p>
        )}

        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-black text-white">{formatPrice(sellingPrice)}</span>

          {originalPrice > sellingPrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {description && (
          <p className="mb-5 line-clamp-2 text-xs leading-6 text-gray-400">{description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="truncate">{product?.is_available ? "Available" : "Unavailable"}</span>
          </span>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 group-hover:border-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e]">
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}


export default function ProductSlider({
  title = "Engineered for",
  accentTitle = "Excellence",
  subtitle = "Explore our premium lineup of high-efficiency power products. Built to outlast and outperform.",
  excludeProductId,
  className,
}: ProductSliderProps) {
  const sliderContainer = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView)
  const [isPaused, setIsPaused] = useState(false)
  const productSliderQuery = useProductSlider()

  const products = useMemo(() => {
    const apiProducts = productSliderQuery?.data?.data ?? []
    return apiProducts.filter(product => product?.id !== excludeProductId)
  }, [excludeProductId, productSliderQuery?.data?.data])

  const maxIndex = Math.max(0, products.length - itemsPerView)
  const canSlide = products.length > itemsPerView

  const goToSlide = useCallback((nextIndex: number) => {
    const container = sliderContainer.current
    if (!container || products.length === 0) return

    const normalizedIndex = nextIndex > maxIndex ? 0 : nextIndex < 0 ? maxIndex : nextIndex
    const target = container.children.item(normalizedIndex) as HTMLElement | null

    if (target) {
      container.scrollTo({ left: target.offsetLeft, behavior: "smooth" })
    }

    setActiveIndex(normalizedIndex)
  }, [maxIndex, products.length])

  useEffect(() => {
    const updateItemsPerView = () => setItemsPerView(getItemsPerView())

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)

    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  useEffect(() => {
    if (activeIndex > maxIndex) {
      goToSlide(maxIndex)
    }
  }, [activeIndex, goToSlide, maxIndex])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!canSlide || isPaused || reduceMotion) return

    const timer = window.setInterval(() => {
      goToSlide(activeIndex + 1)
    }, 3800)

    return () => window.clearInterval(timer)
  }, [activeIndex, canSlide, goToSlide, isPaused])

  if (productSliderQuery?.isError && products.length === 0) return null

  return (
    <section className={cn("overflow-hidden bg-[#011a1e] py-10 text-white sm:py-14 lg:py-16", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fcc42c] to-yellow-200">
                {accentTitle}
              </span>
            </motion.h2>

            {subtitle && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToSlide(activeIndex - 1)}
              disabled={!canSlide}
              aria-label="Previous products"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-[#fcc42c]/60 hover:bg-[#fcc42c] hover:text-[#011a1e] disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => goToSlide(activeIndex + 1)}
              disabled={!canSlide}
              aria-label="Next products"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-[#fcc42c]/60 hover:bg-[#fcc42c] hover:text-[#011a1e] disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {productSliderQuery?.isLoading ? (
          <ProductSliderSkeleton />
        ) : products.length > 0 ? (
          <>
            <div
              ref={sliderContainer}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
            >
              {products.map(product => (
                <motion.div
                  key={product?.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4 }}
                  className="min-w-0 shrink-0 snap-start basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"
                >
                  <ProductSliderCard product={product} />
                </motion.div>
              ))}
            </div>

            {canSlide && (
              <div className="mt-5 flex justify-center gap-2">
                {[...Array(maxIndex + 1)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to product slide ${index + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeIndex === index ? "w-8 bg-[#fcc42c]" : "w-2 bg-white/25 hover:bg-white/45"
                    )}
                  />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  )
}
