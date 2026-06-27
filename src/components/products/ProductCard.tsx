import { Link } from "react-router-dom"
import { ArrowRight, BadgeCheck, ImageOff, PackageCheck, Sparkles } from "lucide-react"
import type { Product } from "../../service/product/types"
import {
  formatPrice,
  getDiscountPercent,
  getProductImage,
  getSellingPrice,
  stripHtml,
  toNumber,
} from "./productUtils"

interface ProductCardProps {
  product: Product
  layoutMode: "grid" | "list"
}

export default function ProductCard({ product, layoutMode }: ProductCardProps) {
  const image = getProductImage(product)
  const sellingPrice = getSellingPrice(product)
  const originalPrice = toNumber(product.price)
  const discountPercent = getDiscountPercent(product)
  const description = stripHtml(product.description)
  const familyName = product.family?.name
  const departmentName = product.family?.department?.name

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ product }}
      className={`group relative flex overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#fcc42c]/45 hover:bg-white/[0.07] ${
        layoutMode === "grid" ? "flex-col" : "flex-col md:flex-row"
      }`}
    >
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-[#011518] ${
          layoutMode === "grid" ? "aspect-[4/3] w-full p-3" : "aspect-[4/3] w-full p-3 md:w-80"
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs font-bold">Image coming soon</span>
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.new_arrival && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fcc42c] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#011a1e] shadow-md">
              <Sparkles className="h-3.5 w-3.5" />
              New
            </span>
          )}
          {!product.is_available && (
            <span className="inline-flex rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
              Out of stock
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
            {discountPercent}% off
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {departmentName && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fcc42c]/25 bg-[#fcc42c]/10 px-2.5 py-1 text-[11px] font-black text-[#fcc42c]">
              <PackageCheck className="h-3.5 w-3.5" />
              {departmentName}
            </span>
          )}
          {familyName && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-gray-300">
              {familyName}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-extrabold leading-snug text-white transition-colors group-hover:text-[#fcc42c]">
          {product.name}
        </h3>

        {(product.model_type || product.model_number) && (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
            {[product.model_type, product.model_number].filter(Boolean).join(" / ")}
          </p>
        )}

        <div className="mb-4 flex flex-wrap items-baseline gap-3">
          <span className="text-2xl font-black text-white">{formatPrice(sellingPrice)}</span>
          {originalPrice > sellingPrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {description && (
          <p className="mb-6 line-clamp-3 text-xs leading-relaxed text-gray-400">{description}</p>
        )}

        <div className="mt-auto flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
            {product.is_available ? "Available" : "Unavailable"}
          </span>

          <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 group-hover:border-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] sm:w-auto">
            View Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
