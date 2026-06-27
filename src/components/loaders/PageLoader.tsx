import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-6 bg-[#011a1e]">
      <motion.img
        src="/neo grid logo-01.png"
        alt="NeoGrid"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-10 object-contain"
      />

      {/* Thin progress bar */}
      <div className="w-32 h-0.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full bg-[#fcc42c] rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
