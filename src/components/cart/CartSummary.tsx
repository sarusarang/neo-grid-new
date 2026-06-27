import { motion } from "framer-motion"
import { BadgePercent, Tag, CreditCard, ArrowRight, Shield } from "lucide-react"



// Types
interface CartSummaryProps {
  totalProducts: number
  rawOriginalAmount: number
  rawTotalDiscount: number
  rawShippingCharge: number
  rawTotalAmount: number
}



export function CartSummary({ totalProducts, rawOriginalAmount, rawTotalDiscount, rawShippingCharge, rawTotalAmount, }: CartSummaryProps) {


  return (


    <div className="sticky top-24">


      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/10 overflow-hidden relative"
        style={{ background: "linear-gradient(145deg, #012a32 0%, #011a1e 100%)" }}>


        <div className="absolute top-0 right-0 w-40 h-40 bg-[#fcc42c]/5 rounded-full blur-2xl pointer-events-none" />


        <div className="relative p-5">

          <div className="flex items-center gap-2 mb-5">
            <BadgePercent className="w-4 h-4 text-[#fcc42c]" />
            <h2 className="text-base font-black text-white">Order Summary</h2>
          </div>


          {/* EXACT BACKEND API FIELDS ONLY */}
          <div className="flex flex-col gap-3.5 text-sm">

            <div className="flex justify-between text-gray-400">
              <span>Total Products</span>
              <span className="text-white font-bold">{totalProducts}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Original Amount</span>
              <span className="text-white font-semibold">₹{Number(rawOriginalAmount).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-green-400">
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Total Discount</span>
              <span className="font-semibold">-₹{Number(rawTotalDiscount).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Shipping Charge</span>
              <span className="text-white font-semibold">
                {rawShippingCharge === 0 ? <span className="text-green-400 font-bold">FREE</span> : `₹${Number(rawShippingCharge).toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="h-px bg-white/10 my-1" />

            <div className="flex justify-between text-white items-end">

              <div>
                <span className="font-black text-base">Total Amount</span>
                <p className="text-[11px] text-gray-500">Final Payable Value</p>
              </div>

              <motion.span key={rawTotalAmount} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-black text-2xl text-[#fcc42c]">
                ₹{Number(rawTotalAmount).toLocaleString("en-IN")}
              </motion.span>

            </div>

          </div>


          {/* CTA */}
          <div className="mt-6 flex flex-col gap-2.5">
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="group w-full py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-xl font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#fcc42c]/20 cursor-pointer">
              <CreditCard className="w-4 h-4" />
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>


        <div className="border-t border-white/8 px-5 py-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <p className="text-[11px] text-gray-500">Secured · UPI · Cards · Net Banking</p>
        </div>

      </motion.div>

    </div>

  )

}
