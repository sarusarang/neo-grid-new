import { useState } from "react"
import type { ComponentType } from "react"
import { ImageOff } from "lucide-react"
import InnerImageZoomModule from "react-inner-image-zoom"
import type { InnerImageZoomProps } from "react-inner-image-zoom"
import "react-inner-image-zoom/lib/styles.min.css"
import type { Product } from "../../../service/product/types"
import { getProductImage, resolveMediaUrl } from "../productUtils"

interface ProductDetailGalleryProps {
  product: Product
}

const InnerImageZoom = (
  (InnerImageZoomModule as unknown as { default?: ComponentType<InnerImageZoomProps> }).default ??
  InnerImageZoomModule
) as ComponentType<InnerImageZoomProps>

export default function ProductDetailGallery({ product }: ProductDetailGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const images = product.images?.filter(image => image.image) ?? []
  const currentImage = resolveMediaUrl(images[activeImage]?.image) || getProductImage(product)

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#011518] p-2 shadow-2xl sm:aspect-[4/3] sm:p-4">
        {currentImage ? (
          <InnerImageZoom
            key={currentImage}
            src={currentImage}
            zoomSrc={currentImage}
            zoomType="hover"
            moveType="pan"
            zoomPreload
            fullscreenOnMobile
            mobileBreakpoint={768}
            className="product-image-zoom !block !h-full !w-full rounded-md"
            imgAttributes={{
              alt: product.name,
              loading: "lazy",
              className: "!h-full !w-full object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]",
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="h-10 w-10" />
            <span className="text-sm font-bold">Image coming soon</span>
          </div>
        )}

        {product.new_arrival && (
          <span className="absolute left-3 top-3 rounded-full bg-[#fcc42c] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#011a1e] sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
            New arrival
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:gap-3">
          {images.map((image, index) => {
            const imageUrl = resolveMediaUrl(image.image)

            return (
              <button
                key={image.id ?? image.image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border bg-white/5 p-1.5 transition-colors sm:h-20 sm:w-24 sm:p-2 ${
                  activeImage === index ? "border-[#fcc42c]" : "border-white/10 hover:border-white/30"
                }`}
              >
                <img src={imageUrl} loading="lazy" alt={`${product.name} ${index + 1}`} className="h-full w-full object-contain" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
