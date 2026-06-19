import { useState, useEffect, useRef } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Grid,
  List,
  SlidersHorizontal,
  CheckCircle,
  Star,
  ArrowRight,
  TrendingUp,
  X,
  ShieldCheck,
  Check,
  RotateCcw,
  Smartphone
} from "lucide-react"
import { CATEGORIES } from "../data/products"
import type { CategoryData, ProductItem } from "../data/products"

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategoryId = searchParams.get("category") || "panels"
  const searchProductName = searchParams.get("product") || ""

  const [activeCategory, setActiveCategory] = useState<CategoryData>(
    CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0]
  )

  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({})
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid")
  const [compareList, setCompareList] = useState<ProductItem[]>([])
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  // Filters state
  const [filterPrice, setFilterPrice] = useState<string>("all")
  const [filterRating, setFilterRating] = useState<string>("all")

  // Refs for scrolling to highlighted product
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Update active category state when searchParams changes
  useEffect(() => {
    const found = CATEGORIES.find(c => c.id === activeCategoryId)
    if (found) {
      setActiveCategory(found)
      // Reset filter options
      setFilterPrice("all")
      setFilterRating("all")
    }
  }, [activeCategoryId])

  // Scroll to search product if it exists
  useEffect(() => {
    if (searchProductName && activeCategory) {
      const matchedProd = activeCategory.products.find(
        p => p.name.toLowerCase() === searchProductName.toLowerCase()
      )
      if (matchedProd) {
        setTimeout(() => {
          const el = productRefs.current[matchedProd.id]
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
            el.classList.add("ring-4", "ring-[#fcc42c]", "shadow-2xl")
            setTimeout(() => {
              el.classList.remove("ring-4", "ring-[#fcc42c]")
            }, 3000)
          }
        }, 500)
      }
    }
  }, [searchProductName, activeCategory])

  const handleCategoryChange = (id: string) => {
    setSearchParams({ category: id })
  }

  // Get current active color for a product
  const getProductColor = (prod: ProductItem) => {
    return selectedColors[prod.id] || prod.colors[0]?.name || ""
  }

  // Get current active size/capacity for a product
  const getProductSize = (prod: ProductItem) => {
    return selectedSpecs[prod.id] || prod.sizes[0] || ""
  }

  // Get dynamic pricing based on capacity selection
  const getProductPriceDetails = (prod: ProductItem) => {
    const activeSize = getProductSize(prod)
    if (prod.sizePrices[activeSize]) {
      return prod.sizePrices[activeSize]
    }
    return { price: prod.price, originalPrice: prod.originalPrice }
  }

  // Toggle product in comparison list
  const toggleCompare = (prod: ProductItem) => {
    const index = compareList.findIndex(item => item.id === prod.id)
    if (index >= 0) {
      const updated = [...compareList]
      updated.splice(index, 1)
      setCompareList(updated)
      if (updated.length === 0) setIsCompareDrawerOpen(false)
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 products at a time.")
        return
      }
      const updated = [...compareList, prod]
      setCompareList(updated)
      setIsCompareDrawerOpen(true)
    }
  }

  // Apply filters
  const filteredProducts = activeCategory.products.filter(prod => {
    const { price } = getProductPriceDetails(prod)

    // Price Filter
    if (filterPrice !== "all") {
      if (filterPrice === "under-15k" && price >= 15000) return false
      if (filterPrice === "15k-50k" && (price < 15000 || price > 50000)) return false
      if (filterPrice === "above-50k" && price <= 50000) return false
    }

    // Rating Filter
    if (filterRating !== "all") {
      const minRating = parseFloat(filterRating)
      if (prod.rating < minRating) return false
    }

    return true
  })

  // Hero featured product details
  const heroFeaturedProduct = activeCategory.products[0]

  return (
    <div className="bg-[#011a1e] text-white min-h-screen font-sans selection:bg-[#fcc42c] selection:text-[#011a1e]">
      
      {/* ─── 1. HERO BANNER SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={activeCategory.heroImage}
            alt={activeCategory.name}
            className="w-full h-full object-cover opacity-15 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011a1e] via-[#011a1e]/60 to-[#011a1e]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="bg-[#04444c] text-[#fcc42c] font-black uppercase text-xs tracking-widest px-4 py-2 rounded-full mb-6 border border-white/5 shadow-lg shadow-black/30">
              {activeCategory.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white mb-4">
              {activeCategory.name}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {activeCategory.description}
            </p>

            {/* Featured stats in circles */}
            <div className="flex flex-wrap gap-8">
              {activeCategory.heroStats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 pr-6 border border-white/10 hover:border-[#fcc42c]/40 transition-colors">
                  <div className="w-12 h-12 rounded-full border-2 border-[#fcc42c] flex items-center justify-center shrink-0 text-[#fcc42c] font-extrabold text-base bg-[#011a1e]">
                    {idx === 0 ? <TrendingUp className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white leading-tight">{stat.label}</h5>
                    <p className="text-gray-400 text-xs">{stat.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Banner Card */}
          <div className="lg:col-span-6 relative w-full h-[320px] md:h-[400px] flex items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 shadow-2xl backdrop-blur-lg">
            <div className="absolute top-6 left-6 bg-[#fcc42c]/90 text-[#011a1e] font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
              {activeCategory.tagline.split(" | ")[0]}
            </div>
            
            {/* Product image showcase */}
            <div className="relative w-3/4 h-3/4 flex items-center justify-center">
              <img
                src={heroFeaturedProduct?.image}
                alt={heroFeaturedProduct?.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(4,68,76,0.5)] hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating App Mock/Remote indicator overlay to emulate fans design */}
              {heroFeaturedProduct?.hasSmartApp && (
                <div className="absolute bottom-[-10px] right-[-10px] bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
                  <Smartphone className="w-8 h-8 text-[#fcc42c]" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-black leading-none mb-1">Smart Control</p>
                    <p className="text-xs text-white font-bold leading-none">IoT App Supported</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tagline band */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-[#fcc42c] font-black text-lg md:text-xl uppercase tracking-widest drop-shadow">
                {activeCategory.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CATEGORY TABS / THUMBNAILS BAR ─────────────────────────── */}
      <section className="sticky top-16 z-30 bg-[#011a1e]/80 backdrop-blur-xl border-y border-white/10 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
            {CATEGORIES.map(category => {
              const isActive = activeCategory.id === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl shrink-0 transition-all duration-300 border font-bold text-sm ${
                    isActive
                      ? "bg-[#04444c]/30 text-white border-[#fcc42c] shadow-lg shadow-[#fcc42c]/5"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-[#fcc42c]" : "text-gray-400"}>
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. FILTERS & LAYOUT CONTROLS ───────────────────────────────── */}
      <section className="py-8 border-b border-white/5 bg-[#011a1e]/40">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          {/* Left: Dropdowns filter list */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-semibold">
              <SlidersHorizontal className="w-4 h-4 text-[#fcc42c]" />
              <span>Filters</span>
            </div>

            {/* Price Filter */}
            <select
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 focus:outline-none focus:border-[#fcc42c] cursor-pointer"
            >
              <option value="all" className="bg-[#011a1e]">Price: All</option>
              <option value="under-15k" className="bg-[#011a1e]">Under ₹15,000</option>
              <option value="15k-50k" className="bg-[#011a1e]">₹15,000 - ₹50,000</option>
              <option value="above-50k" className="bg-[#011a1e]">Above ₹50,000</option>
            </select>

            {/* Rating Filter */}
            <select
              value={filterRating}
              onChange={e => setFilterRating(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 focus:outline-none focus:border-[#fcc42c] cursor-pointer"
            >
              <option value="all" className="bg-[#011a1e]">Rating: All</option>
              <option value="4.8" className="bg-[#011a1e]">4.8 ★ & above</option>
              <option value="4.7" className="bg-[#011a1e]">4.7 ★ & above</option>
              <option value="4.6" className="bg-[#011a1e]">4.6 ★ & above</option>
            </select>

            {/* Reset Filter Button */}
            {(filterPrice !== "all" || filterRating !== "all") && (
              <button
                onClick={() => {
                  setFilterPrice("all")
                  setFilterRating("all")
                }}
                className="flex items-center gap-1.5 text-[#fcc42c] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider pl-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>

          {/* Right: Compare count status & layout modes */}
          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
            {/* Compare checkbox indicator */}
            <button
              onClick={() => compareList.length > 0 && setIsCompareDrawerOpen(!isCompareDrawerOpen)}
              className={`flex items-center gap-3 text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg ${
                compareList.length > 0 ? "hover:bg-white/5 cursor-pointer" : "opacity-40 cursor-default"
              }`}
            >
              <div className={`w-4.5 h-4.5 rounded border border-white/30 flex items-center justify-center transition-all ${
                compareList.length > 0 ? "border-[#fcc42c] bg-[#fcc42c]/20" : ""
              }`}>
                {compareList.length > 0 && <Check className="w-3 h-3 text-[#fcc42c] stroke-[4]" />}
              </div>
              <span className={compareList.length > 0 ? "text-[#fcc42c]" : "text-gray-500"}>
                Compare ({compareList.length})
              </span>
            </button>

            {/* Grid vs List layouts toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "grid" ? "bg-[#04444c] text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Grid Layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "list" ? "bg-[#04444c] text-white" : "text-gray-400 hover:text-white"
                }`}
                title="List Layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. PRODUCTS LIST GRID SECTION ────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10"
              >
                <SlidersHorizontal className="w-12 h-12 text-[#fcc42c] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No matching products found</h3>
                <p className="text-gray-400 text-sm">Try resetting your active filter selections.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  layoutMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {filteredProducts.map(product => {
                  const { price, originalPrice } = getProductPriceDetails(product)
                  const percentDiscount = Math.round(((originalPrice - price) / originalPrice) * 100)
                  const isCompared = compareList.some(item => item.id === product.id)
                  
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      ref={el => { productRefs.current[product.id] = el }}
                      transition={{ duration: 0.4 }}
                      className={`group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#fcc42c]/40 transition-all duration-500 flex ${
                        layoutMode === "grid" ? "flex-col" : "flex-col md:flex-row items-center p-6 gap-8"
                      }`}
                    >
                      {/* Product Image Area */}
                      <div className={`relative bg-[#011518] overflow-hidden flex items-center justify-center shrink-0 ${
                        layoutMode === "grid" ? "w-full aspect-[4/3] p-8" : "w-full md:w-80 aspect-[4/3] rounded-2xl p-6"
                      }`}>
                        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                          />
                        </Link>

                        {/* Free installation sticker badge */}
                        {product.badge && (
                          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#fcc42c] text-[#011a1e] text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-full shadow-md">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {product.badge}
                          </div>
                        )}

                        {/* Compare checkbox overlay */}
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            onClick={() => toggleCompare(product)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-xs font-bold transition-all ${
                              isCompared
                                ? "bg-[#fcc42c] text-[#011a1e] border-[#fcc42c]"
                                : "bg-black/60 text-white hover:bg-black/80"
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                              isCompared ? "border-[#011a1e]" : "border-white/40"
                            }`}>
                              {isCompared && <Check className="w-2.5 h-2.5 text-[#011a1e] stroke-[4]" />}
                            </span>
                            Compare
                          </button>
                        </div>
                      </div>

                      {/* Product Info Block */}
                      <div className="p-7 flex flex-col flex-1 w-full">
                        
                        {/* Rating row */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 text-[#fcc42c]">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold text-white">{product.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                        </div>

                        {/* Title */}
                        <Link to={`/product/${product.id}`} className="block hover:underline decoration-[#fcc42c]">
                          <h3 className="text-xl font-extrabold text-white mb-2 leading-snug group-hover:text-[#fcc42c] transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Pricing details */}
                        <div className="mb-4">
                          <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-black text-white">
                              ₹{price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-[#fcc42c] font-black uppercase">
                              {percentDiscount}% off
                            </span>
                          </div>
                          <p className="text-emerald-400/90 text-xs font-semibold mt-1">
                            {product.emi}
                          </p>
                        </div>

                        {/* Interactive specification select options */}
                        <div className="mb-5">
                          <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-2">
                            Select Capacity/Rating:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map(size => {
                              const isSelected = getProductSize(product) === size
                              return (
                                <button
                                  key={size}
                                  onClick={() => setSelectedSpecs(prev => ({ ...prev, [product.id]: size }))}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                    isSelected
                                      ? "bg-[#04444c] border-[#fcc42c] text-white"
                                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                  }`}
                                >
                                  {size}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Color swatches */}
                        {product.colors.length > 0 && (
                          <div className="mb-5">
                            <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-2">
                              Color/Finish: <span className="text-white font-medium capitalize">{getProductColor(product)}</span>
                            </p>
                            <div className="flex items-center gap-2">
                              {product.colors.map(col => {
                                const isSelected = getProductColor(product) === col.name
                                return (
                                  <button
                                    key={col.name}
                                    onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: col.name }))}
                                    style={{ backgroundColor: col.hex }}
                                    className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                                      isSelected ? "border-[#fcc42c] scale-110 shadow-lg" : "border-white/20 hover:border-white/50"
                                    }`}
                                    title={col.name}
                                  >
                                    {isSelected && (
                                      <span className="absolute inset-0 flex items-center justify-center">
                                        <Check className={`w-3.5 h-3.5 ${
                                          col.hex === "#ffffff" || col.hex === "#f8fafc" ? "text-black" : "text-white"
                                        } stroke-[3]`} />
                                      </span>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                          {product.description}
                        </p>

                        {/* Bottom spec label and call to action */}
                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider italic">
                            ★ {product.specLabel}
                          </span>
                          
                          <Link
                            to={`/product/${product.id}`}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-[#fcc42c] text-white hover:text-[#011a1e] font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-[#fcc42c]"
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ─── 5. BOTTOM PERSISTENT COMPARISON BAR/DRAWER ────────────────── */}
      <AnimatePresence>
        {isCompareDrawerOpen && compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#011a1e] border-t-2 border-[#04444c] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] py-4 px-6"
          >
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* Left Side: Thumbnail previews */}
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Comparing ({compareList.length} of 3)
                </p>
                <div className="flex items-center gap-3">
                  {compareList.map(prod => (
                    <div key={prod.id} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                      <img src={prod.image} alt={prod.name} className="w-8 h-8 object-contain shrink-0" />
                      <span className="text-xs font-bold text-white max-w-[120px] truncate">{prod.name}</span>
                      <button
                        onClick={() => toggleCompare(prod)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Action buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase text-gray-400 hover:text-white transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#fcc42c] text-[#011a1e] font-black text-xs uppercase tracking-widest hover:bg-white transition-colors shadow-lg shadow-[#fcc42c]/10"
                >
                  Compare Now
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 6. COMPARISON SIDE-BY-SIDE DIALOG OVERLAY ────────────────── */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-[#011a1e] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-10 scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-black mb-8 pr-12">Product Specifications Comparison</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch border-b border-white/10 pb-8">
                {/* Column header descriptions */}
                <div className="hidden md:flex flex-col justify-end text-gray-500 font-bold text-xs uppercase tracking-wider">
                  Specifications
                </div>

                {/* Compared Products Columns */}
                {compareList.map(prod => {
                  const { price } = getProductPriceDetails(prod)
                  return (
                    <div key={prod.id} className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-5 relative">
                      <button
                        onClick={() => toggleCompare(prod)}
                        className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="h-32 flex items-center justify-center mb-4 bg-black/20 rounded-xl p-4">
                        <img src={prod.image} alt={prod.name} className="h-full object-contain" />
                      </div>
                      <h4 className="font-extrabold text-base leading-snug mb-2">{prod.name}</h4>
                      <p className="text-[#fcc42c] font-black text-lg">₹{price.toLocaleString("en-IN")}</p>
                      <p className="text-gray-400 text-xs mt-1 italic">{getProductSize(prod)} Selected</p>
                    </div>
                  )
                })}
              </div>

              {/* Specific features comparison rows */}
              <div className="py-6 flex flex-col gap-6">
                
                {/* Specs: Rating */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-center py-2 border-b border-white/5">
                  <div className="text-gray-400 text-xs font-black uppercase tracking-wider">User Rating</div>
                  {compareList.map(prod => (
                    <div key={prod.id} className="flex items-center gap-1.5 text-sm font-semibold">
                      <Star className="w-4 h-4 text-[#fcc42c] fill-current" />
                      {prod.rating} ★ <span className="text-gray-500 text-xs">({prod.reviews} reviews)</span>
                    </div>
                  ))}
                </div>

                {/* Specs: Spec Label */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-center py-2 border-b border-white/5">
                  <div className="text-gray-400 text-xs font-black uppercase tracking-wider">Key Specification</div>
                  {compareList.map(prod => (
                    <div key={prod.id} className="text-sm font-semibold text-white">
                      {prod.specLabel}
                    </div>
                  ))}
                </div>

                {/* Specs: Features List */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b border-white/5">
                  <div className="text-gray-400 text-xs font-black uppercase tracking-wider">Key Features</div>
                  {compareList.map(prod => (
                    <div key={prod.id} className="flex flex-col gap-1">
                      {prod.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Specs: Warranty */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-b border-white/5">
                  <div className="text-gray-400 text-xs font-black uppercase tracking-wider">Warranty</div>
                  {compareList.map(prod => (
                    <div key={prod.id} className="text-xs leading-relaxed text-gray-300">
                      {prod.warranty}
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-colors"
                >
                  Close Comparison
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
