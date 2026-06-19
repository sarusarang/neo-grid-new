import { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CATEGORIES } from "../../data/products"

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Service", href: "/service" },
  { name: "Products", href: "/products", hasMegaMenu: true },
  { name: "Project Gallery", href: "/projects" },
  { name: "Contact Us", href: "/contact" },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [scrolled, setScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(80)

  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Update header height on scroll so dropdown always sits exactly below
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

  // Delayed close — gives 120ms grace when moving mouse between nav item and dropdown
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const openMenu = useCallback(() => {
    cancelClose()
    setMegaMenuOpen(true)
    setActiveCategory(CATEGORIES[0].id)
  }, [cancelClose])

  const activeSection = CATEGORIES.find(s => s.id === activeCategory)

  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#011a1e]/90 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/neo grid logo-01.png" alt="NeoGrid" className="h-10 object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => {
                    if (item.hasMegaMenu) {
                      openMenu()
                    } else {
                      scheduleClose()
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasMegaMenu) scheduleClose()
                  }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-bold transition-colors tracking-wide uppercase ${
                      megaMenuOpen && item.hasMegaMenu
                        ? "text-[#fcc42c]"
                        : "text-gray-300 hover:text-[#fcc42c]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex">
              <Link
                to="/contact"
                className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-white/10 border border-white/20 hover:border-[#fcc42c]/50 transition-colors"
              >
                <div className="absolute inset-0 w-0 bg-[#fcc42c] transition-all duration-[250ms] ease-out group-hover:w-full" />
                <span className="relative text-sm font-bold text-white group-hover:text-[#011a1e] transition-colors">
                  Get a Quote
                </span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MEGA MENU — fixed, dynamically positioned below real header height ── */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            key="megamenu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ top: headerHeight, zIndex: 49 }}
            className="fixed left-0 w-full bg-white shadow-2xl border-t-2 border-[#04444c]"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="container mx-auto px-4 lg:px-8 flex" style={{ minHeight: 340 }}>

              {/* Left sidebar — categories */}
              <div className="w-56 border-r border-gray-100 py-8 pr-4 flex flex-col gap-1 shrink-0">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-3">
                  Categories
                </p>
                {CATEGORIES.map((section) => (
                  <button
                    key={section.id}
                    onMouseEnter={() => setActiveCategory(section.id)}
                    className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-left text-sm font-bold transition-all duration-150 group ${
                      activeCategory === section.id
                        ? "bg-[#04444c] text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#04444c]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={activeCategory === section.id ? "text-[#fcc42c]" : "text-[#04444c] group-hover:text-[#04444c]"}>
                        {section.icon}
                      </span>
                      {section.name}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-opacity ${activeCategory === section.id ? "opacity-100 text-[#fcc42c]" : "opacity-0 group-hover:opacity-60"}`} />
                  </button>
                ))}
              </div>

              {/* Right panel — products */}
              <div className="flex-1 py-8 pl-8">
                <AnimatePresence mode="wait">
                  {activeSection && (
                    <motion.div
                      key={activeSection.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                        {activeSection.name}
                      </p>
                      <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                        {activeSection.products.map((product, i) => (
                          <motion.div key={product.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <Link
                              to={`/product/${product.id}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="group flex flex-col items-center text-center gap-3"
                            >
                              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 relative">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.badge && (
                                  <span className="absolute top-2 left-2 text-[10px] font-black bg-[#fcc42c] text-[#011a1e] px-2 py-0.5 rounded-full">
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[13px] font-bold text-gray-800 group-hover:text-[#04444c] transition-colors leading-tight">
                                {product.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                        {/* View All tile */}
                        <Link
                          to={`/products?category=${activeCategory}`}
                          onClick={() => setMegaMenuOpen(false)}
                          className="flex flex-col items-center justify-center gap-2 group"
                        >
                          <div className="w-full aspect-[4/3] rounded-xl bg-[#04444c]/5 border-2 border-dashed border-[#04444c]/20 flex items-center justify-center group-hover:bg-[#04444c]/10 transition-colors">
                            <ChevronRight className="w-7 h-7 text-[#04444c] group-hover:translate-x-1 transition-transform" />
                          </div>
                          <span className="text-[13px] font-bold text-[#04444c]">View All</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-[#011a1e]/95 backdrop-blur-3xl z-40 pt-24"
          >
            <div className="container mx-auto px-6 flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={item.href} className="text-3xl font-black text-white hover:text-[#fcc42c] transition-colors block" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
                <Link to="/contact" className="block w-full bg-[#fcc42c] text-[#011a1e] py-4 rounded-xl text-center font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
