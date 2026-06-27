import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BadgeCheck, Check, PackageCheck, ShieldCheck, ShoppingCart, Plus, Minus } from "lucide-react"
import type { Product } from "../../../service/product/types"
import { useCart } from "../../../context/CartContext"
import { useAuth } from "../../../context/AuthContext"
import { formatPrice, getDiscountPercent, getProductImage, getSellingPrice, toNumber } from "../productUtils"

interface ProductDetailSummaryProps {
  product: Product
}

export default function ProductDetailSummary({ product }: ProductDetailSummaryProps) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user, openAuthModal } = useAuth()

  const [quantity, setQuantity] = useState<number>(1)
  const [added, setAdded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // calculations
  const sellingPrice = getSellingPrice(product)
  const originalPrice = toNumber(product?.price)
  const discountPercent = getDiscountPercent(product)
  const department = product?.family?.department?.name
  const family = product?.family?.name
  const description = product?.description?.trim()

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // functions
  const addProductToCart = async (): Promise<boolean> => {
    if (!user) {
      openAuthModal("login")
      return false
    }

    try {
      setIsSubmitting(true)
      await addToCart({
        productId: product.id,
        name: product.name,
        image: getProductImage(product),
        price: sellingPrice,
        originalPrice: originalPrice || sellingPrice,
        category: department,
        size: product.model_number,
        quantity: quantity,
      })
      setAdded(true)
      window.setTimeout(() => setAdded(false), 2500)
      return true
    } catch {
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // checkout now function
  const checkoutNow = async () => {
    if (!user) {
      openAuthModal("login")
      return
    }
    const success = await addProductToCart()
    if (success) {
      navigate("/cart")
    }
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
        {product?.name}
      </h1>

      {(product?.model_type || product?.model_number) && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-500 sm:mb-6">
          {[product?.model_type, product?.model_number].filter(Boolean).join(" / ")}
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
            {product?.is_available ? "Available" : "Unavailable"}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#fcc42c]" />
            NeoGrid catalog verified
          </span>
        </div>
      </div>

      {description && (
        <div className="mb-6">
          <h3 className="mb-3 text-xl font-semibold text-white">
            About This Product
          </h3>
          <p className="line-clamp-5 text-sm leading-7 text-gray-400 text-justify">
            {description.replace(/<[^>]*>/g, "").trim()}
          </p>
        </div>
      )}

      {/* ── MODERN MOBILE RESPONSIVE QUANTITY SELECTOR ────────────────────────── */}
      <div className="mb-6 rounded-xl border border-white/10 bg-linear-to-r from-white/5 to-transparent p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">Quantity</span>
            <p className="text-[11px] text-gray-500">Select quantity before adding to cart</p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center rounded-lg border border-white/15 bg-[#011a1e] p-1">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1 || isSubmitting}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (!isNaN(val) && val >= 1) setQuantity(val)
                }}
                className="w-12 text-center text-base font-black text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={isSubmitting}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-xs font-bold text-gray-400 sm:hidden">
              Total: {formatPrice(sellingPrice * quantity)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={addProductToCart}
          disabled={!product?.is_available || isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:border-[#fcc42c] hover:bg-[#fcc42c] hover:text-[#011a1e] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? "Added to Cart" : isSubmitting ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={checkoutNow}
          disabled={!product?.is_available || isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#011a1e] transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
