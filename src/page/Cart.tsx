import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Truck, Shield, Zap, Sparkles } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { CartLoader, CartError } from "../components/loaders/CartStates"
import { CartHeader, CartItemRow, CartSummary, EmptyCart, UnauthCartState } from "../components/cart"





export default function Cart() {


  // Cart context
  const { items, itemCount, subtotal, originalAmount, totalDiscount, shippingCharge, cartResponse, removeFromCart, updateQty, clearCart, isLoading, isError, refetchCart } = useCart()


  // Auth context
  const { user, openAuthModal } = useAuth()



  // Cart values
  const totalProducts = cartResponse?.total_products ?? itemCount
  const rawOriginalAmount = cartResponse?.orginal_amount ?? cartResponse?.original_amount ?? originalAmount
  const rawTotalDiscount = cartResponse?.total_discount ?? totalDiscount
  const rawShippingCharge = cartResponse?.shipping_charge ?? shippingCharge
  const rawTotalAmount = cartResponse?.total_amount ?? subtotal


  // Total savings
  const totalSavings = (rawOriginalAmount > rawTotalAmount ? rawOriginalAmount - rawTotalAmount : 0) + rawTotalDiscount



  return (



    <main className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">


      <CartHeader user={user} itemCount={itemCount} />


      <div className="container mx-auto px-4 py-4 pb-10 sm:pb-20">

        {!user ? (

          <UnauthCartState onLogin={() => openAuthModal("login")} />

        ) : isLoading ? (

          <CartLoader />

        ) : isError ? (

          <CartError onRetry={refetchCart} />

        ) : items.length === 0 ? (

          <EmptyCart />

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ── ITEMS LIST ── */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm"><span className="text-white font-bold">{itemCount}</span> item{itemCount !== 1 ? "s" : ""} in your cart</p>
                <button onClick={() => clearCart()} title="Delete complete cart" className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full hover:bg-red-500/10 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" /> Clear complete cart
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {items?.length > 0 && items?.map((item, i) => (
                  <CartItemRow key={item.id} item={item} index={i}
                    onRemove={() => removeFromCart(item?.id)}
                    onUpdateQty={q => updateQty(item?.id, q)} />
                ))}
              </AnimatePresence>


              {totalSavings > 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 px-4 py-3 bg-green-500/8 border border-green-500/20 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-green-400" /></div>
                  <p className="text-sm text-green-400">You're saving <span className="font-black">₹{totalSavings?.toLocaleString("en-IN")}</span> on this order!</p>
                </motion.div>
              )}


              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: "Free Delivery", sub: "On all orders" },
                  { icon: Shield, label: "Secure Payment", sub: "SSL encrypted" },
                  { icon: Zap, label: "Fast Dispatch", sub: "Within 24 hours" },
                ].map(b => (
                  <div key={b.label} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white/3 border border-white/8 text-center">
                    <div className="w-9 h-9 rounded-xl bg-[#fcc42c]/10 border border-[#fcc42c]/20 flex items-center justify-center"><b.icon className="w-4 h-4 text-[#fcc42c]" /></div>
                    <div><p className="text-xs font-bold text-white">{b.label}</p><p className="text-[11px] text-gray-500">{b.sub}</p></div>
                  </div>
                ))}
              </div>

              <Link to="/products" className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/3 border border-white/8 text-gray-400 text-sm hover:text-white hover:bg-white/6 hover:border-white/15 transition-all">
                <Zap className="w-4 h-4 text-[#fcc42c]" /> Continue Shopping
              </Link>

            </div>


            {/* ── ORDER SUMMARY ── */}
            <div className="lg:col-span-2">
              <CartSummary
                totalProducts={totalProducts}
                rawOriginalAmount={rawOriginalAmount}
                rawTotalDiscount={rawTotalDiscount}
                rawShippingCharge={rawShippingCharge}
                rawTotalAmount={rawTotalAmount}
              />
            </div>

          </div>

        )}

      </div>

    </main>

  )

}
