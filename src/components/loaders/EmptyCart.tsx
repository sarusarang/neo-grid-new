import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag, ArrowRight } from "lucide-react"

export function EmptyCart() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center gap-6 px-4">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative">
        <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-[#04444c]/40 to-[#011a1e] border border-white/10 flex items-center justify-center shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-gray-600" />
        </div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fcc42c] rounded-full shadow-lg shadow-[#fcc42c]/40" />
        </motion.div>
      </motion.div>
      <div className="max-w-xs">
        <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm leading-relaxed">Explore our premium solar products and power your home with clean, renewable energy.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/products" className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-full font-bold hover:brightness-110 transition-all">
          Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 text-gray-300 rounded-full font-semibold text-sm hover:bg-white/10 transition-all">Go Home</Link>
      </div>
    </motion.div>
  )
}
