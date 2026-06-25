import { Link } from "react-router-dom"
import { X, ChevronRight, ShoppingCart, User, LogOut, Package } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_ITEMS } from "./constants"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: { name?: string; email?: string } | null
  itemCount: number
  onOpenAuth: (tab: "login" | "register") => void
  onLogout: () => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  user,
  itemCount,
  onOpenAuth,
  onLogout,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-[#011a1e] z-40 flex flex-col overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* ── Top bar ─────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10 shrink-0">
            <img src="/neo grid logo-01.png" alt="NeoGrid" className="h-8 object-contain" />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Nav links ───────────────────────────────────────────────────── */}
          <div className="px-4 py-5 flex flex-col gap-0.5">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-3 px-4 rounded-xl text-lg font-bold text-white hover:text-[#fcc42c] hover:bg-white/5 transition-all"
                  onClick={onClose}
                >
                  {item.name}
                  <ChevronRight className="w-4 h-4 opacity-30" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mx-5 h-px bg-white/10 shrink-0" />

          {/* ── User section ────────────────────────────────────────────────── */}
          <div className="px-4 py-5 flex flex-col gap-3 mt-auto">
            {user ? (
              <>
                {/* User card */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black shrink-0">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold truncate">{user.name}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/my-orders"
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  onClick={onClose}
                >
                  <Package className="w-4 h-4 text-[#fcc42c]" />
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  onClick={onClose}
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-[#fcc42c]" />
                    My Cart
                  </span>
                  {itemCount > 0 && (
                    <span className="bg-[#fcc42c] text-[#011a1e] text-xs font-black px-2 py-0.5 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => { onLogout(); onClose() }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-bold text-sm hover:bg-red-500/15 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  id="mobile-signin-btn"
                  onClick={() => { onOpenAuth("login"); onClose() }}
                  className="w-full py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-xl font-black text-base flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
                <button
                  id="mobile-register-btn"
                  onClick={() => { onOpenAuth("register"); onClose() }}
                  className="w-full py-3 bg-white/5 border border-white/15 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Create Account
                </button>
              </>
            )}

            <Link
              to="/contact"
              className="w-full py-3 bg-[#04444c]/30 border border-[#04444c]/40 text-white rounded-xl font-bold text-sm text-center hover:bg-[#04444c]/50 transition-all"
              onClick={onClose}
            >
              Get a Quote
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
