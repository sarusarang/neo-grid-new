import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Zap } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#011a1e] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-[#fcc42c] selection:text-[#011a1e]">
      {/* — Background glows — */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#04444c]/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#fcc42c]/6 rounded-full blur-[120px]" />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      {/* — Content card — */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img
            src="/neo grid logo-01.png"
            alt="NeoGrid"
            className="h-10 sm:h-12 object-contain mx-auto"
          />
        </motion.div>

        {/* Animated 404 number */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 18 }}
            className="text-[130px] sm:text-[180px] font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #fcc42c 0%, #f59e0b 40%, #04444c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </motion.div>

          {/* Floating solar zap icon */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-[#fcc42c]/25 to-[#fcc42c]/5 border border-[#fcc42c]/30 flex items-center justify-center shadow-xl shadow-[#fcc42c]/10"
          >
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#fcc42c]" />
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back to the light.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#fcc42c]/60 to-transparent rounded-full" />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 flex-1 py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-xl font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-[#fcc42c]/20 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 flex-1 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Browse Products
          </Link>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#fcc42c]/20 pointer-events-none"
            style={{
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 mt-12 text-[11px] text-gray-600 uppercase tracking-[0.18em] font-bold"
      >
        NeoGrid · Powering the Future
      </motion.p>
    </main>
  )
}
