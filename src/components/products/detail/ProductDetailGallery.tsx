import { useCallback, useRef, useState } from "react"
import { ImageOff } from "lucide-react"
import type { Product } from "../../../service/product/types"
import { getProductImage, resolveMediaUrl } from "../productUtils"


interface ProductDetailGalleryProps {
  product: Product
}


function calcOrigin(x: number, y: number, w: number, h: number) {
  return `${(x / w) * 100}% ${(y / h) * 100}%`
}


export default function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState("50% 50%")
  const imgWrapRef = useRef<HTMLDivElement>(null)

  const images = product?.images?.filter((img) => img?.image) ?? []
  const currentSrc = resolveMediaUrl(images[activeIdx]?.image) || getProductImage(product)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgWrapRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setOrigin(calcOrigin(x, y, rect.width, rect.height))
  }, [])

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div
        ref={imgWrapRef}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => {
          setZoomed(false)
          setOrigin("50% 50%")
        }}
        onMouseMove={handleMouseMove}
        className="relative flex aspect-square cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#011518] shadow-2xl sm:aspect-4/3"
      >
        {currentSrc ? (
          <img
            key={currentSrc}
            src={currentSrc}
            alt={product.name}
            loading="lazy"
            style={{
              transformOrigin: origin,
              transform: zoomed ? "scale(2.2)" : "scale(1)",
              transition: zoomed ? "transform 0.1s ease-out" : "transform 0.25s ease",
            }}
            className="h-full w-full object-contain p-3 drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)] will-change-transform sm:p-5"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="h-10 w-10" />
            <span className="text-sm font-bold">Image coming soon</span>
          </div>
        )}

        {product.new_arrival && (
          <span className="absolute left-3 top-3 rounded-full bg-[#fcc42c] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#011a1e] shadow-lg sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
            New arrival
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-2.5" style={{ scrollbarWidth: "none" }}>
          {images.map((img, idx) => {
            const thumbSrc = resolveMediaUrl(img.image)
            const isActive = activeIdx === idx

            return (
              <button
                key={img?.id ?? img?.image}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[#011518] p-1 transition-all duration-200 sm:h-20 sm:w-20 sm:rounded-2xl sm:p-1.5 ${isActive
                  ? "border-[#fcc42c] shadow-[0_0_12px_rgba(252,196,44,0.35)]"
                  : "border-white/10 hover:border-white/30 hover:shadow-md"
                  }`}
              >
                <img
                  src={thumbSrc}
                  loading="lazy"
                  alt={`${product.name} view ${idx + 1}`}
                  className="h-full w-full object-contain"
                />

                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-[#fcc42c]/5 sm:rounded-2xl" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
