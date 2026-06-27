import type { Product } from "../../service/product/types"


// utility functions for product
export const stripHtml = (html = "") => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()



// resolve media url
export const resolveMediaUrl = (url?: string | null) => {


  if (!url) return ""
  if (/^(https?:|data:|blob:)/i.test(url)) return url
  if (!url.startsWith("/")) return url


  const apiBase = import.meta.env.VITE_API_BASE_URL || ""

  try {
    return `${new URL(apiBase).origin}${url}`
  } catch {
    return url
  }
}



// convert product data to number
export const toNumber = (value?: string | number | null) => {
  const parsed = Number(value ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}



// format price
export const formatPrice = (value?: string | number | null) => `Rs.${toNumber(value)?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`


// get product image
export const getProductImage = (product: Product) => resolveMediaUrl(product?.images?.[0]?.image)


// get selling price
export const getSellingPrice = (product: Product) => {
  const discountPrice = toNumber(product?.discount_price)
  return discountPrice > 0 ? discountPrice : toNumber(product?.price)
}



// get discount percentage
export const getDiscountPercent = (product: Product) => {

  const explicitDiscount = toNumber(product?.discount_percentage)
  if (explicitDiscount > 0) return Math.round(explicitDiscount)

  const price = toNumber(product?.price)
  const sellingPrice = getSellingPrice(product)
  if (price <= 0 || sellingPrice >= price) return 0

  return Math.round(((price - sellingPrice) / price) * 100)

}
