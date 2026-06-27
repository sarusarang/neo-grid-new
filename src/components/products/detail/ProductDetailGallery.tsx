import { useState, useRef, useCallback } from "react"
import { ImageOff, ZoomIn } from "lucide-react"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"
import type { Product } from "../../../service/product/types"
import { getProductImage, resolveMediaUrl } from "../productUtils"



// props interface
interface ProductDetailGalleryProps {
  product: Product
}


/** Converts a lens cursor position into a CSS transform-origin string */
function calcOrigin(x: number, y: number, w: number, h: number) {
  return `${(x / w) * 100}% ${(y / h) * 100}%`
}



export default function ProductDetailGallery({ product }: ProductDetailGalleryProps) {


  // image states
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)



  // hover zoom state (desktop only)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState("50% 50%")
  const imgWrapRef = useRef<HTMLDivElement>(null)


  // image variable
  const images = product?.images?.filter((img) => img?.image) ?? []
  const currentSrc = resolveMediaUrl(images[activeIdx]?.image) || getProductImage(product)


  // slides
  const slides = images?.length > 0
    ? images?.map((img) => ({ src: resolveMediaUrl(img?.image) }))
    : [{ src: currentSrc }]



  // handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgWrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setOrigin(calcOrigin(x, y, rect.width, rect.height))
  }, [])


  // open lightbox function
  const openLightbox = (idx: number) => {
    setLightboxIdx(idx)
    setLightboxOpen(true)
  }



  return (


    <div className="flex flex-col gap-3 sm:gap-4">


      {/* ── MAIN IMAGE ── */}
      <div
        ref={imgWrapRef}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => { setZoomed(false); setOrigin("50% 50%") }}
        onMouseMove={handleMouseMove}
        onClick={() => openLightbox(activeIdx)}
        className="group relative flex aspect-square cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#011518] shadow-2xl sm:aspect-4/3"
        title="Click to view full size"
      >

        {currentSrc ? (

          <>

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

            {/* Zoom hint badge — shows on hover before magnifier activates */}
            <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-bold text-gray-300 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5 text-[#fcc42c]" />
              <span className="hidden sm:inline">Hover to zoom · </span>Click to expand
            </div>

          </>

        ) : (

          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="h-10 w-10" />
            <span className="text-sm font-bold">Image coming soon</span>
          </div>

        )}


        {/* New arrival badge */}
        {product.new_arrival && (
          <span className="absolute left-3 top-3 rounded-full bg-[#fcc42c] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#011a1e] shadow-lg sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
            New arrival
          </span>
        )}

      </div>


      {/* ── THUMBNAIL STRIP ── */}
      {images?.length > 1 && (

        <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-2.5" style={{ scrollbarWidth: "none" }}>

          {images?.map((img, idx) => {

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


      {/* ── LIGHTBOX (fullscreen pinch-zoom, mobile + desktop click) ── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIdx}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 4, zoomInMultiplier: 2, doubleTapDelay: 300, doubleClickDelay: 300 }}
        carousel={{ finite: images.length <= 1 }}
        animation={{ fade: 250, swipe: 300 }}
        styles={{
          container: {
            backgroundColor: "rgba(1,26,30,0.97)",
          },
          root: {
            "--yarl__color_backdrop": "rgba(1,26,30,0.97)",
          } as any,
        }}
        on={{
          view: ({ index }) => { setActiveIdx(index); setLightboxIdx(index) },
        }}
      />


    </div>

  )


}
