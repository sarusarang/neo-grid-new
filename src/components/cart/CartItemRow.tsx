import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus } from "lucide-react"
import type { CartItem } from "../../context/CartContext"


// Types
interface CartItemRowProps {
  item: CartItem
  index: number
  onRemove: () => void
  onUpdateQty: (qty: number) => Promise<void>
}




export function CartItemRow({ item, index, onRemove, onUpdateQty }: CartItemRowProps) {


  // State
  const [updating, setUpdating] = useState(false)
  const savingsPct = item.originalPrice > item.price ? Math.round((1 - item.price / item.originalPrice) * 100) : 0


  // Handle quantity
  const handleQty = async (newQty: number) => {
    try {
      setUpdating(true)
      await onUpdateQty(newQty)
    } finally {
      setUpdating(false)
    }
  }




  return (


    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ delay: index * 0.07 }}
      className={`group relative flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-white/8 bg-linear-to-r from-white/3 to-transparent hover:from-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden ${updating ? "opacity-60 pointer-events-none" : ""}`}>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-[#fcc42c]/3 to-transparent pointer-events-none rounded-2xl" />


      {/* Image - 1st product image */}
      <Link to={`/product/${item?.productId}`} className="shrink-0 relative">

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10">

          <img src={item?.image} alt={item?.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/96x96/012229/fcc42c?text=%E2%98%80" }} />

        </div>

        {savingsPct > 0 && <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">-{savingsPct}%</div>}

      </Link>



      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">

        <div className="flex items-start justify-between gap-2">

          <div className="min-w-0">

            <Link to={`/product/${item?.productId}`} className="text-white font-bold text-sm sm:text-base leading-snug hover:text-[#fcc42c] transition-colors line-clamp-2 block">{item?.name}</Link>


            {/* Model Type and Model Number */}
            {(item?.modelType || item?.modelNumber) && (
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                {[item?.modelType, item?.modelNumber].filter(Boolean).join(" / ")}
              </p>
            )}

            {/* Category badge */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {item?.category && <span className="text-[10px] uppercase tracking-wider text-[#fcc42c] bg-[#fcc42c]/10 px-2 py-0.5 rounded-full border border-[#fcc42c]/20 font-bold">{item?.category}</span>}
            </div>

          </div>

          <button onClick={onRemove} title="Delete item" className="shrink-0 w-8 h-8 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">

          {/* Quantity Selector UI */}
          <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-1">

            <button onClick={() => handleQty(item?.quantity - 1)} disabled={updating}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
              <Minus className="w-3 h-3" />
            </button>

            <span className="w-8 text-center text-white font-black text-sm">{item?.quantity}</span>

            <button onClick={() => handleQty(item?.quantity + 1)} disabled={updating}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 cursor-pointer">
              <Plus className="w-3 h-3" />
            </button>

          </div>


          <div className="text-right">

            <p className="text-white font-black text-base sm:text-lg leading-none">₹{(item?.price * item?.quantity).toLocaleString("en-IN")}</p>

            {item?.originalPrice > item?.price && (
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <span className="text-gray-600 text-xs line-through">₹{(item?.originalPrice * item?.quantity).toLocaleString("en-IN")}</span>
                <span className="text-green-400 text-[11px] font-bold">Save ₹{((item?.originalPrice - item?.price) * item?.quantity).toLocaleString("en-IN")}</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </motion.div>

  )

}
