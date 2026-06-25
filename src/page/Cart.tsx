import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag,
  Tag, Shield, Truck, RotateCcw, ChevronRight, Zap, Sparkles,
  CreditCard, BadgePercent
} from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const GST_RATE = 0.18

// ── EMPTY STATE ─────────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center gap-6 px-4">
      <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }} className="relative">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#04444c]/40 to-[#011a1e] border border-white/10 flex items-center justify-center shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-gray-600"/>
        </div>
        <motion.div animate={{ rotate:360 }} transition={{ duration:4, repeat:Infinity, ease:"linear" }} className="absolute inset-0">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fcc42c] rounded-full shadow-lg shadow-[#fcc42c]/40"/>
        </motion.div>
      </motion.div>
      <div className="max-w-xs">
        <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm leading-relaxed">Explore our premium solar products and power your home with clean, renewable energy.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/products" className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-full font-bold hover:brightness-110 transition-all">
          Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
        </Link>
        <Link to="/" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 text-gray-300 rounded-full font-semibold text-sm hover:bg-white/10 transition-all">Go Home</Link>
      </div>
    </motion.div>
  )
}

// ── CART ITEM ───────────────────────────────────────────────────────────────────
function CartItem({ item, index, onRemove, onUpdateQty }: {
  item: ReturnType<typeof useCart>["items"][number]; index:number
  onRemove:()=>void; onUpdateQty:(q:number)=>void
}) {
  const savingsPct = item.originalPrice > item.price ? Math.round((1 - item.price/item.originalPrice)*100) : 0
  return (
    <motion.div layout initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, x:-60, scale:0.95, transition:{ duration:0.25 } }}
      transition={{ delay: index*0.07 }}
      className="group relative flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-white/8 bg-gradient-to-r from-white/3 to-transparent hover:from-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#fcc42c]/3 to-transparent pointer-events-none rounded-2xl"/>
      {/* Image */}
      <Link to={`/product/${item.productId}`} className="shrink-0 relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e=>{ (e.target as HTMLImageElement).src="https://placehold.co/96x96/012229/fcc42c?text=%E2%98%80" }}/>
        </div>
        {savingsPct>0 && <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">-{savingsPct}%</div>}
      </Link>
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/product/${item.productId}`} className="text-white font-bold text-sm sm:text-base leading-snug hover:text-[#fcc42c] transition-colors line-clamp-2 block">{item.name}</Link>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {item.category && <span className="text-[10px] uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">{item.category}</span>}
              {item.size && <span className="text-[10px] text-[#fcc42c] bg-[#fcc42c]/10 px-2 py-0.5 rounded-full border border-[#fcc42c]/20 font-semibold">{item.size}</span>}
            </div>
          </div>
          <button onClick={onRemove} className="shrink-0 w-7 h-7 rounded-full text-gray-600 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all">
            <Trash2 className="w-3.5 h-3.5"/>
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-1">
            <button onClick={()=>onUpdateQty(item.quantity-1)} disabled={item.quantity<=1}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <Minus className="w-3 h-3"/>
            </button>
            <span className="w-8 text-center text-white font-black text-sm">{item.quantity}</span>
            <button onClick={()=>onUpdateQty(item.quantity+1)} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Plus className="w-3 h-3"/>
            </button>
          </div>
          <div className="text-right">
            <p className="text-white font-black text-base sm:text-lg leading-none">₹{(item.price*item.quantity).toLocaleString("en-IN")}</p>
            {item.originalPrice>item.price && (
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <span className="text-gray-600 text-xs line-through">₹{(item.originalPrice*item.quantity).toLocaleString("en-IN")}</span>
                <span className="text-green-400 text-[11px] font-bold">Save ₹{((item.originalPrice-item.price)*item.quantity).toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── MAIN ────────────────────────────────────────────────────────────────────────
export default function Cart() {
  const { items, itemCount, subtotal, removeFromCart, updateQty, clearCart } = useCart()
  const { user } = useAuth()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  const gst = subtotal * GST_RATE
  const discount = promoApplied ? Math.round(subtotal*0.05) : 0
  const total = subtotal + gst - discount
  const totalSavings = items.reduce((s,i)=>s+(i.originalPrice-i.price)*i.quantity, 0)

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase()==="NEOGRID10") { setPromoApplied(true); setPromoError("") }
    else { setPromoError("Invalid promo code"); setPromoApplied(false) }
  }

  return (
    <main className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">

      {/* ── PREMIUM HERO HEADER ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Layered BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#04444c]/40 via-[#011a1e] to-[#011a1e] pointer-events-none"/>
        <div className="absolute top-10 right-0 w-80 h-80 bg-[#fcc42c]/7 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-[#04444c]/20 rounded-full blur-3xl pointer-events-none"/>
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize:"28px 28px" }}/>

        <div className="relative container mx-auto px-4 pt-28 pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-[#fcc42c] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3"/><span className="text-gray-300">Shopping Cart</span>
          </div>

          {/* Hero content row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Animated cart icon */}
              <motion.div animate={{ y:[0,-4,0] }} transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#fcc42c]/25 to-[#fcc42c]/5 border border-[#fcc42c]/30 flex items-center justify-center shadow-xl shadow-[#fcc42c]/10">
                <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-[#fcc42c]"/>
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">Shopping Cart</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {itemCount>0 ? <><span className="text-[#fcc42c] font-bold">{itemCount}</span> item{itemCount!==1?"s":""} · Ready to checkout</> : "Your cart awaits"}
                </p>
              </div>
            </div>

            {/* Mini stats row */}
            {items.length>0 && (
              <div className="flex items-center gap-3 shrink-0">
                {[
                  { icon:ShoppingCart, label:"Items", val:itemCount },
                  { icon:Tag, label:"Savings", val:`₹${totalSavings.toLocaleString("en-IN")}` },
                ].map(s=>(
                  <div key={s.label} className="flex flex-col items-center justify-center px-4 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[80px]">
                    <p className="text-[#fcc42c] font-black text-lg leading-none">{s.val}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 pb-20">
        {items.length===0 ? <EmptyCart/> : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ── ITEMS ── */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm"><span className="text-white font-bold">{itemCount}</span> items in your cart</p>
                <button onClick={clearCart} className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full hover:bg-red-500/10">
                  <Trash2 className="w-3.5 h-3.5"/> Clear all
                </button>
              </div>
              <AnimatePresence mode="popLayout">
                {items.map((item,i)=>(
                  <CartItem key={item.id} item={item} index={i}
                    onRemove={()=>removeFromCart(item.id)}
                    onUpdateQty={q=>updateQty(item.id,q)}/>
                ))}
              </AnimatePresence>
              {totalSavings>0 && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                  className="flex items-center gap-3 px-4 py-3 bg-green-500/8 border border-green-500/20 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-green-400"/></div>
                  <p className="text-sm text-green-400">You're saving <span className="font-black">₹{totalSavings.toLocaleString("en-IN")}</span> on this order!</p>
                </motion.div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon:Truck,    label:"Free Delivery", sub:"On all orders" },
                  { icon:Shield,   label:"Secure Payment", sub:"SSL encrypted" },
                  { icon:RotateCcw,label:"Easy Returns",   sub:"30-day policy" },
                ].map(b=>(
                  <div key={b.label} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white/3 border border-white/8 text-center">
                    <div className="w-9 h-9 rounded-xl bg-[#fcc42c]/10 border border-[#fcc42c]/20 flex items-center justify-center"><b.icon className="w-4 h-4 text-[#fcc42c]"/></div>
                    <div><p className="text-xs font-bold text-white">{b.label}</p><p className="text-[11px] text-gray-500">{b.sub}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/products" className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/3 border border-white/8 text-gray-400 text-sm hover:text-white hover:bg-white/6 hover:border-white/15 transition-all">
                <Zap className="w-4 h-4 text-[#fcc42c]"/> Continue Shopping
              </Link>
            </div>

            {/* ── SUMMARY ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.2}}
                  className="rounded-2xl border border-white/10 overflow-hidden relative"
                  style={{ background:"linear-gradient(145deg, #012a32 0%, #011a1e 100%)" }}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#fcc42c]/5 rounded-full blur-2xl pointer-events-none"/>
                  <div className="relative p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <BadgePercent className="w-4 h-4 text-[#fcc42c]"/>
                      <h2 className="text-base font-black text-white">Order Summary</h2>
                    </div>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal ({itemCount} item{itemCount!==1?"s":""})</span>
                        <span className="text-white font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      {totalSavings>0 && (
                        <div className="flex justify-between text-green-400">
                          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5"/> Discount</span>
                          <span className="font-semibold">-₹{totalSavings.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {promoApplied && (
                        <div className="flex justify-between text-[#fcc42c]">
                          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5"/> Promo (5%)</span>
                          <span className="font-semibold">-₹{discount.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-400">
                        <span>GST (18%)</span>
                        <span className="text-white font-semibold">₹{Math.round(gst).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Delivery</span><span className="text-green-400 font-bold">FREE</span>
                      </div>
                      <div className="h-px bg-white/10 my-1"/>
                      <div className="flex justify-between text-white items-end">
                        <div>
                          <span className="font-black text-base">Total</span>
                          <p className="text-[11px] text-gray-500">Incl. all taxes</p>
                        </div>
                        <motion.span key={total} initial={{scale:1.1}} animate={{scale:1}} className="font-black text-2xl text-[#fcc42c]">
                          ₹{Math.round(total).toLocaleString("en-IN")}
                        </motion.span>
                      </div>
                    </div>
                    {/* Promo */}
                    <div className="mt-4 flex gap-2">
                      <input type="text" placeholder="Promo code: NEOGRID10"
                        value={promoCode} onChange={e=>{ setPromoCode(e.target.value); setPromoError("") }}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#fcc42c]/40 transition-colors"/>
                      <button onClick={handlePromo}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${promoApplied ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-[#fcc42c]/10 border border-[#fcc42c]/20 text-[#fcc42c] hover:bg-[#fcc42c]/20"}`}>
                        {promoApplied ? "✓" : "Apply"}
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-400 mt-1.5">{promoError}</p>}
                    {promoApplied && <p className="text-xs text-green-400 mt-1.5">5% promo applied!</p>}
                    {/* CTAs */}
                    <div className="mt-5 flex flex-col gap-2.5">
                      <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.99}}
                        className="group w-full py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-xl font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#fcc42c]/20">
                        <CreditCard className="w-4 h-4"/>
                        {user ? "Proceed to Checkout" : "Sign In to Checkout"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                      </motion.button>
                      {!user && <p className="text-center text-[11px] text-gray-500">Or <Link to="/" className="text-[#fcc42c] hover:underline">create an account</Link> for faster checkout</p>}
                    </div>
                  </div>
                  <div className="border-t border-white/8 px-5 py-3 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-gray-500"/>
                    <p className="text-[11px] text-gray-500">Secured · UPI · Cards · Net Banking · EMI</p>
                  </div>
                </motion.div>
                {/* Tip */}
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
                  className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#04444c]/30 to-[#04444c]/10 border border-[#04444c]/40">
                  <div className="flex items-center gap-2 mb-1.5"><Zap className="w-3.5 h-3.5 text-[#fcc42c]"/><p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Solar Savings Estimate</p></div>
                  <p className="text-sm text-gray-300 leading-relaxed">This setup could save you up to <span className="text-[#fcc42c] font-black">₹2,400/month</span> and pay for itself in under 4 years. ☀️</p>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
