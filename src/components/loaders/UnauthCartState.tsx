import { motion } from "framer-motion"
import { Lock, ArrowRight } from "lucide-react"



export function UnauthCartState({ onLogin }: { onLogin: () => void }) {

  return (

    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}

      className="flex flex-col items-center justify-center py-20 text-center gap-6 px-4">

      <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-[#fcc42c]/20 to-[#04444c]/40 border border-[#fcc42c]/30 flex items-center justify-center shadow-2xl">
        <Lock className="w-10 h-10 text-[#fcc42c]" />
      </div>

      <div className="max-w-md">
        <h2 className="text-3xl font-black text-white mb-2">Please Sign In to view your cart</h2>
        <p className="text-gray-400 text-sm leading-relaxed">Your shopping cart items are synchronized securely with your user account.</p>
      </div>

      <button onClick={onLogin} className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#fcc42c] text-[#011a1e] rounded-full font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#fcc42c]/20 cursor-pointer">
        Sign In / Register <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

    </motion.div>

  )

}
