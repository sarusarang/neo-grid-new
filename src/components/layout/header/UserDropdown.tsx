import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, LogOut, Package, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../../context/AuthContext"
import { useCart } from "../../../context/CartContext"

interface UserDropdownProps {
  onOpenAuth: () => void
}


export default function UserDropdown({ onOpenAuth }: UserDropdownProps) {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const show = () => { clearTimeout(closeTimer.current); setOpen(true) }
  const scheduleHide = () => { closeTimer.current = setTimeout(() => setOpen(false), 150) }

  // ── Guest: just a plain button → opens auth modal ──────────────────────────
  if (!user) {
    return (
      <button
        id="header-signin-btn"
        onClick={onOpenAuth}
        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#fcc42c]/40 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
        aria-label="Sign in"
      >
        <User className="w-4 h-4" />
      </button>
    )
  }

  // ── Authenticated: avatar + hover dropdown ─────────────────────────────────
  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={scheduleHide}
    >
      {/* Avatar trigger */}
      <button
        id="header-user-avatar-btn"
        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black text-sm hover:brightness-110 transition-all duration-200"
        aria-label="Account menu"
      >
        {user.name?.charAt(0)?.toUpperCase() ?? "U"}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-[60]"
            style={{ background: "linear-gradient(145deg, #012a32 0%, #011a1e 100%)" }}
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fcc42c] to-[#f59e0b] flex items-center justify-center shrink-0">
                  <span className="text-[#011a1e] font-black text-xs">
                    {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm truncate">{user?.name}</p>
                  <p className="text-gray-400 text-[11px] truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="py-1.5">
              <button
                id="dropdown-my-account"
                onClick={() => { navigate("/my-account"); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Package className="w-4 h-4 text-[#fcc42c]" />
                My Account
              </button>
              <button
                id="dropdown-cart"
                onClick={() => { navigate("/cart"); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <ShoppingCart className="w-4 h-4 text-[#fcc42c]" />
                <span>My Cart</span>
                {itemCount > 0 && (
                  <span className="ml-auto bg-[#fcc42c] text-[#011a1e] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            <div className="border-t border-white/10 py-1.5">
              <button
                id="dropdown-signout"
                onClick={() => { logout(); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
