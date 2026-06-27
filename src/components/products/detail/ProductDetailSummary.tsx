import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  BadgeCheck,
  Check,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react"
import type { Product } from "../../../service/product/types"
import { useCart } from "../../../context/CartContext"
import {
  formatPrice,
  getDiscountPercent,
  getProductImage,
  getSellingPrice,
  toNumber,
} from "../productUtils"

interface ProductDetailSummaryProps {
  product: Product
}

export default function ProductDetailSummary({ product }: ProductDetailSummaryProps) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const sellingPrice = getSellingPrice(product)
  const originalPrice = toNumber(product.price)
  const discountPercent = getDiscountPercent(product)
  const department = product.family?.department?.name
  const family = product.family?.name
  const description = product.description?.trim()

  const addProductToCart = () => {
    addToCart({
      productId: String(product.id),
      name: product.name,
      image: getProductImage(product),
      price: sellingPrice,
      originalPrice: originalPrice || sellingPrice,
      category: department,
      size: product.model_number,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }

  const checkoutNow = () => {
    addProductToCart()
    navigate("/cart")
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
        {department && (
          <Link
            to={`/products?department=${encodeURIComponent(department)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#fcc42c]/25 bg-[#fcc42c]/10 px-3 py-1.5 text-xs font-black text-[#fcc42c] transition-colors hover:bg-[#fcc42c] hover:text-[#011a1e]"
          >
            <PackageCheck className="h-3.5 w-3.5" />
            {department}
          </Link>
        )}
        {family && (
          <Link
            to={`/products?${new URLSearchParams({ ...(department ? { department } : {}), family }).toString()}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-300 transition-colors hover:border-[#fcc42c]/40 hover:text-white"
          >
            {family}
          </Link>
        )}
      </div>

      <h1 className="mb-3 text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {(product.model_type || product.model_number) && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-500 sm:mb-6">
          {[product.model_type, product.model_number].filter(Boolean).join(" / ")}
        </p>
      )}

      <div className="mb-5 rounded-lg border border-white/10 bg-white/5 p-4 sm:mb-6 sm:p-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl font-black text-white sm:text-3xl">{formatPrice(sellingPrice)}</span>
          {originalPrice > sellingPrice && (
            <span className="text-base text-gray-500 line-through">{formatPrice(originalPrice)}</span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
              {discountPercent}% off
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            {product.is_available ? "Available" : "Unavailable"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#fcc42c]" />
            NeoGrid catalog verified
          </span>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-black uppercase tracking-wider text-white">
          Description
        </h2>
        {description ? (
          <div className="relative max-h-56 overflow-hidden text-sm leading-7 text-gray-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-10 after:bg-gradient-to-t after:from-[#011a1e] after:to-transparent">
            <div
              className="whitespace-pre-line [&_h1]:mb-2 [&_h1]:text-lg [&_h1]:font-black [&_h1]:text-white [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-black [&_h2]:text-white [&_h3]:mb-2 [&_h3]:font-black [&_h3]:text-white [&_li]:mb-1.5 [&_li]:pl-1 [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-3 [&_strong]:text-white [&_ul]:ml-5 [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        ) : (
          <p className="text-sm leading-7 text-gray-400">Description will be updated soon.</p>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={addProductToCart}
          disabled={!product.is_available}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:border-[#fcc42c] hover:bg-[#fcc42c] hover:text-[#011a1e] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? "Added" : "Add to Cart"}
        </button>
        <button
          onClick={checkoutNow}
          disabled={!product.is_available}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
