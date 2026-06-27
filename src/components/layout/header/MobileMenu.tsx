import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, ImageOff, Loader2, LogOut, Package, ShoppingCart, User, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import type { Department } from "../../../service/product/types"
import { NAV_ITEMS } from "./constants"
import { getCategoryIcon } from "./helpers"
import { buildProductFilterUrl } from "./MegaMenu"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  departments: Department[]
  isLoading: boolean
  isError: boolean
  user: { name?: string; email?: string } | null
  itemCount: number
  onOpenAuth: (tab: "login" | "register") => void
  onLogout: () => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  departments,
  isLoading,
  isError,
  user,
  itemCount,
  onOpenAuth,
  onLogout,
}: MobileMenuProps) {
  const [openDepartment, setOpenDepartment] = useState("")
  const activeDepartmentName = openDepartment || departments[0]?.name || ""
  const activeDepartment = departments.find((dept) => dept?.name === activeDepartmentName) ?? departments[0]

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

          <div className="px-4 py-5 flex flex-col gap-2">
            {NAV_ITEMS.map((item, index) => {
              const isProductNav = "hasMegaMenu" in item && item.hasMegaMenu

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {!isProductNav ? (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between py-3 px-4 rounded-lg text-lg font-bold text-white hover:text-[#fcc42c] hover:bg-white/5 transition-all"
                      onClick={onClose}
                    >
                      {item.name}
                      <ChevronRight className="w-4 h-4 opacity-30" />
                    </Link>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden">
                      <Link
                        to="/products"
                        className="flex items-center justify-between py-3 px-4 text-lg font-bold text-white hover:text-[#fcc42c] transition-all"
                        onClick={onClose}
                      >
                        {item.name}
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </Link>

                      {isLoading && departments.length === 0 ? (
                        <div className="px-3 pb-3">
                          <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#fcc42c]/20 bg-[#fcc42c]/10 px-3 py-2 text-xs font-black text-[#fcc42c]">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Loading categories
                          </div>
                          <div className="flex gap-2 overflow-hidden pb-3">
                            {[...Array(2)].map((_, skeletonIndex) => (
                              <span
                                key={skeletonIndex}
                                className="h-10 w-40 shrink-0 rounded-lg border border-white/10 bg-white/8 animate-pulse"
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {[...Array(3)].map((_, skeletonIndex) => (
                              <div
                                key={skeletonIndex}
                                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2.5"
                              >
                                <span className="h-12 w-14 rounded-lg bg-white/10 animate-pulse" />
                                <span className="flex-1">
                                  <span className="block h-3.5 w-3/4 rounded bg-white/10 animate-pulse" />
                                  <span className="mt-2 block h-2.5 w-20 rounded bg-white/8 animate-pulse" />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : isError && departments.length === 0 ? (
                        <div className="px-3 pb-3">
                          <Link
                            to="/products"
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-lg border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-3 text-sm font-bold text-[#fcc42c]"
                          >
                            <Package className="w-4 h-4" />
                            Browse products
                            <ChevronRight className="ml-auto w-4 h-4" />
                          </Link>
                        </div>
                      ) : departments.length > 0 && (
                        <div className="px-3 pb-3">
                          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
                            {departments.map((dept) => {
                              const isActive = dept?.name === activeDepartment?.name

                              return (
                                <button
                                  key={dept?.name}
                                  onClick={() => setOpenDepartment(dept?.name ?? "")}
                                  className={`shrink-0 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black transition-all ${
                                    isActive
                                      ? "border-[#fcc42c] bg-[#fcc42c] text-[#011a1e]"
                                      : "border-white/10 bg-white/5 text-gray-300"
                                  }`}
                                >
                                  <span className={isActive ? "text-[#011a1e]" : "text-[#fcc42c]"}>
                                    {getCategoryIcon(dept?.name ?? "")}
                                  </span>
                                  {dept?.name}
                                </button>
                              )
                            })}
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {(activeDepartment?.family ?? []).length === 0 ? (
                              <Link
                                to={buildProductFilterUrl(activeDepartment?.name)}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-lg border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-3 text-sm font-bold text-[#fcc42c]"
                              >
                                <Package className="w-4 h-4" />
                                Browse {activeDepartment?.name ?? "products"}
                              </Link>
                            ) : (
                              activeDepartment?.family?.map((family) => (
                                <Link
                                  key={`${activeDepartment?.name}-${family?.name}`}
                                  to={buildProductFilterUrl(activeDepartment?.name, family?.name)}
                                  onClick={onClose}
                                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition-all hover:border-[#fcc42c] hover:bg-white/10"
                                >
                                  <span className="w-14 h-12 shrink-0 rounded-lg bg-white/8 overflow-hidden flex items-center justify-center">
                                    {family?.image ? (
                                      <img
                                        src={family.image}
                                        alt={family?.name ?? "Product subcategory"}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <ImageOff className="w-5 h-5 text-[#fcc42c]/80" />
                                    )}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-black leading-tight truncate">
                                      {family?.name}
                                    </span>
                                    <span className="text-[11px] font-bold text-gray-400">
                                      View products
                                    </span>
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-[#fcc42c]" />
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="mx-5 h-px bg-white/10 shrink-0" />

          <div className="px-4 py-5 flex flex-col gap-3 mt-auto">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
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
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  onClick={onClose}
                >
                  <Package className="w-4 h-4 text-[#fcc42c]" />
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
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
                  onClick={() => {
                    onLogout()
                    onClose()
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-bold text-sm hover:bg-red-500/15 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  id="mobile-signin-btn"
                  onClick={() => {
                    onOpenAuth("login")
                    onClose()
                  }}
                  className="w-full py-3.5 bg-[#fcc42c] text-[#011a1e] rounded-lg font-black text-base flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
                <button
                  id="mobile-register-btn"
                  onClick={() => {
                    onOpenAuth("register")
                    onClose()
                  }}
                  className="w-full py-3 bg-white/5 border border-white/15 text-white rounded-lg font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Create Account
                </button>
              </>
            )}

            <Link
              to="/contact"
              className="w-full py-3 bg-[#04444c]/30 border border-[#04444c]/40 text-white rounded-lg font-bold text-sm text-center hover:bg-[#04444c]/50 transition-all"
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
