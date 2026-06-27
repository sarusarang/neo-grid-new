import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useAuth } from "./AuthContext"
import {
  useGetCart,
  useAddToCart,
  useUpdateCartItem,
  useDeleteCartItem,
  useClearCart,
} from "../service/cart/useCart"
import type { CartResponse, CartItem as ApiCartItem } from "../service/cart/types"
import { resolveMediaUrl } from "../components/products/productUtils"

export interface CartItem {
  id: string | number
  productId: string | number
  name: string
  image: string
  price: number
  originalPrice: number
  quantity: number
  modelType?: string
  modelNumber?: string
  size?: string
  color?: string
  category?: string
  rawApiItem?: ApiCartItem
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  totalDiscount: number
  originalAmount: number
  shippingCharge: number
  isLoading: boolean
  isError: boolean
  cartResponse: CartResponse | undefined
  addToCart: (item: { productId: string | number; name?: string; image?: string; price?: number; originalPrice?: number; category?: string; size?: string; quantity?: number }) => Promise<void>
  removeFromCart: (id: string | number) => Promise<void>
  updateQty: (id: string | number, qty: number) => Promise<void>
  clearCart: () => Promise<void>
  isInCart: (productId: string | number, size?: string) => boolean
  refetchCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, openAuthModal } = useAuth()

  // React Query hooks
  const { data: cartResponse, isLoading, isError, refetch } = useGetCart({ enabled: Boolean(user) })
  const addToCartMutation = useAddToCart()
  const updateCartItemMutation = useUpdateCartItem()
  const deleteCartItemMutation = useDeleteCartItem()
  const clearCartMutation = useClearCart()

  // Map API cart response to clean UI CartItem array
  const apiItems: ApiCartItem[] = cartResponse?.data?.[0]?.items || []

  const items: CartItem[] = apiItems.map((apiItem) => {
    const p = apiItem.product
    const firstImg = p?.images?.[0]?.image ? resolveMediaUrl(p.images[0].image) : "/solar-panel.png"
    const price = Number(p?.discount_price) > 0 ? Number(p.discount_price) : Number(p?.price || 0)
    const originalPrice = Number(p?.price || price)
    
    // Family / category details
    const categoryName = typeof p?.family === "object" && p?.family !== null
      ? (p.family.department?.name || p.family.name || "")
      : ""

    return {
      id: apiItem.id,
      productId: p?.id || apiItem.id,
      name: p?.name || "Solar Product",
      image: firstImg,
      price,
      originalPrice,
      quantity: apiItem.quantity,
      modelType: p?.model_type || "",
      modelNumber: p?.model_number || "",
      size: p?.model_number || "",
      category: categoryName || p?.model_type || "",
      rawApiItem: apiItem,
    }
  })

  const itemCount = cartResponse?.total_products ?? items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = cartResponse?.total_amount ?? items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalDiscount = cartResponse?.total_discount ?? 0
  const originalAmount = cartResponse?.orginal_amount ?? cartResponse?.original_amount ?? (subtotal + totalDiscount)
  const shippingCharge = cartResponse?.shipping_charge ?? 0

  // Add to cart handler
  const addToCart = useCallback(
    async (item: { productId: string | number; name?: string; image?: string; price?: number; originalPrice?: number; category?: string; size?: string; quantity?: number }) => {
      if (!user) {
        openAuthModal("login")
        return
      }
      await addToCartMutation.mutateAsync({
        product_id: item.productId,
        quantity: item.quantity ?? 1,
      })
    },
    [user, openAuthModal, addToCartMutation]
  )

  // Remove single item handler
  const removeFromCart = useCallback(
    async (id: string | number) => {
      if (!user) {
        openAuthModal("login")
        return
      }
      await deleteCartItemMutation.mutateAsync(id)
    },
    [user, openAuthModal, deleteCartItemMutation]
  )

  // Update quantity handler
  const updateQty = useCallback(
    async (id: string | number, qty: number) => {
      if (!user) {
        openAuthModal("login")
        return
      }
      if (qty < 1) {
        await removeFromCart(id)
        return
      }
      await updateCartItemMutation.mutateAsync({
        item_id: id,
        quantity: qty,
      })
    },
    [user, openAuthModal, updateCartItemMutation, removeFromCart]
  )

  // Clear entire cart handler
  const clearCart = useCallback(async () => {
    if (!user) {
      openAuthModal("login")
      return
    }
    await clearCartMutation.mutateAsync()
  }, [user, openAuthModal, clearCartMutation])

  const isInCart = useCallback(
    (productId: string | number) => {
      return items.some((i) => String(i.productId) === String(productId))
    },
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        totalDiscount,
        originalAmount,
        shippingCharge,
        isLoading,
        isError,
        cartResponse,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,
        refetchCart: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
