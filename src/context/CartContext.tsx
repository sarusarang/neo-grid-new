import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  originalPrice: number
  quantity: number
  size?: string
  color?: string
  category?: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addToCart: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  isInCart: (productId: string, size?: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "neogrid_cart"

const makeId = (productId: string, size?: string) =>
  `${productId}${size ? `_${size}` : ""}`

// ── DUMMY PRODUCTS for demo cart ────────────────────────────────────────────────
const DUMMY_CART_ITEMS: CartItem[] = [
  {
    id: "mono-panel-550w_550W",
    productId: "mono-panel-550w",
    name: "Monocrystalline Solar Panel",
    image: "/solar-panel.png",
    price: 18500,
    originalPrice: 22000,
    quantity: 4,
    size: "550W",
    category: "panels",
  },
  {
    id: "hybrid-inverter-5kw_5kW",
    productId: "hybrid-inverter-5kw",
    name: "Hybrid Solar Inverter",
    image: "/solar-panel.png",
    price: 42000,
    originalPrice: 48000,
    quantity: 1,
    size: "5kW",
    category: "inverters",
  },
  {
    id: "lithium-battery-10kwh",
    productId: "lithium-battery-10kwh",
    name: "Lithium Battery Storage",
    image: "/solar-panel.png",
    price: 65000,
    originalPrice: 72000,
    quantity: 1,
    category: "batteries",
  },
]

const loadItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as CartItem[]
      // Return stored if it has items, otherwise seed with dummy
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  // First time — seed with dummy products
  return DUMMY_CART_ITEMS
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems)

  // Sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      const id = makeId(item.productId, item.size)
      setItems(prev => {
        const existing = prev.find(i => i.id === id)
        if (existing) {
          return prev.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
          )
        }
        return [...prev, { ...item, id, quantity: item.quantity ?? 1 }]
      })
    },
    []
  )

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: qty } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback(
    (productId: string, size?: string) => {
      const id = makeId(productId, size)
      return items.some(i => i.id === id)
    },
    [items]
  )

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addToCart, removeFromCart, updateQty, clearCart, isInCart }}
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
