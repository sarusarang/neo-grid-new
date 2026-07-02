import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, User } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { useProductNavigation } from "../../service/product/useAuth"
import type { Department } from "../../service/product/types"
import { NAV_ITEMS } from "./header/constants"
import UserDropdown from "./header/UserDropdown"
import MegaMenu from "./header/MegaMenu"
import MobileMenu from "./header/MobileMenu"

export default function Header() {
  const { user, logout, openAuthModal } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(80)

  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const {
    data: navResponse,
    isLoading: navLoading,
    isError: navError,
  } = useProductNavigation()
  const departments: Department[] = navResponse?.data ?? []

  // Set default active category when departments first load
  useEffect(() => {
    if (departments.length > 0 && !activeCategory) {
      setActiveCategory(departments[0]?.name ?? "")
    }
  }, [departments, activeCategory])

  // Track scroll position and header height
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 50)
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height)
      }
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const openMenu = useCallback(() => {
    cancelClose()
    setMegaMenuOpen(true)
    if (departments.length > 0 && !activeCategory) {
      setActiveCategory(departments[0]?.name ?? "")
    }
  }, [cancelClose, departments, activeCategory])

  return (
    <>
      {/* ── HEADER BAR ──────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#011a1e]/70 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? 66 : 72 }}
          >
            {/* Logo */}
            <Link to="/" className="shrink-0" aria-label="NeoGrid home">
              <img src="/neo grid logo-01.png" alt="NeoGrid" className="h-10 object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => {
                    if ("hasMegaMenu" in item && item.hasMegaMenu) openMenu()
                    else scheduleClose()
                  }}
                  onMouseLeave={() => {
                    if ("hasMegaMenu" in item && item.hasMegaMenu) scheduleClose()
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMegaMenuOpen(false)}
                    className={`text-sm font-bold tracking-wide uppercase transition-colors ${
                      megaMenuOpen && "hasMegaMenu" in item && item.hasMegaMenu
                        ? "text-[#fcc42c]"
                        : "text-gray-300 hover:text-[#fcc42c]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <UserDropdown onOpenAuth={() => openAuthModal("login")} />
              <Link
                to="/contact"
                className="group relative px-5 py-2 rounded-full overflow-hidden bg-white/10 border border-white/20 hover:border-[#fcc42c]/50 transition-colors text-sm font-bold"
              >
                <div className="absolute inset-0 w-0 bg-[#fcc42c] transition-all duration-200 ease-out group-hover:w-full" />
                <span className="relative text-white group-hover:text-[#011a1e] transition-colors">
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Mobile right actions */}
            <div className="lg:hidden flex items-center gap-2">
              {user ? (
                <button
                  onClick={() => navigate("/my-orders")}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black text-xs"
                  aria-label="My orders"
                >
                  {user.name?.charAt(0)?.toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300"
                  aria-label="Sign in"
                >
                  <User className="w-4 h-4" />
                </button>
              )}
              <button
                className="text-white p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MEGA MENU ────────────────────────────────────────────────────────── */}
      <MegaMenu
        isOpen={megaMenuOpen}
        departments={departments}
        isLoading={navLoading}
        isError={navError}
        activeCategory={activeCategory}
        headerHeight={headerHeight}
        onHover={setActiveCategory}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onClose={() => setMegaMenuOpen(false)}
      />

      {/* ── MOBILE MENU ──────────────────────────────────────────────────────── */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        departments={departments}
        isLoading={navLoading}
        isError={navError}
        user={user}
        itemCount={itemCount}
        onOpenAuth={(tab) => openAuthModal(tab)}
        onLogout={logout}
      />
    </>
  )
}
