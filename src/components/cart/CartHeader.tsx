import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart, ChevronRight } from "lucide-react"



// Types
interface CartHeaderProps {
  user: any
  itemCount: number
}


export function CartHeader({ user, itemCount }: CartHeaderProps) {


  return (


    <div className="relative overflow-hidden">


      {/* Grid dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />


      <div className="relative container mx-auto px-4 pt-20 pb-5 sm:pb-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#fcc42c] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" /><span className="text-gray-300">Shopping Cart</span>
        </div>

        {/* Hero content row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">

          <div className="flex items-center gap-4">

            {/* Animated cart icon */}
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-[#fcc42c]/25 to-[#fcc42c]/5 border border-[#fcc42c]/30 flex items-center justify-center shadow-xl shadow-[#fcc42c]/10">
              <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-[#fcc42c]" />
            </motion.div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">Shopping Cart</h1>
              <p className="text-gray-400 text-sm mt-1">
                {user ? (
                  itemCount > 0 ? <><span className="text-[#fcc42c] font-bold">{itemCount}</span> item{itemCount !== 1 ? "s" : ""}</> : "Your cart awaits"
                ) : "Synchronized online catalog"}
              </p>
            </div>

          </div>


        </div>

      </div>

    </div>

  )

}
