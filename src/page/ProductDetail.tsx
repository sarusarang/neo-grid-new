import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  Check,
  ChevronRight,
  Minus,
  Plus,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Wrench,
  Calculator,
  Calendar,
  Zap,
  Percent
} from "lucide-react"
import { findProductById } from "../data/products"


export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()


  // Find product and category from shared data
  const { product: foundProduct, category: foundCategory } = findProductById(productId || "")

  // Handle product not found state
  if (!foundProduct || !foundCategory) {
    return (
      <div className="bg-[#011a1e] text-white min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <Sparkles className="w-16 h-16 text-[#fcc42c] mb-6 animate-pulse" />
        <h2 className="text-3xl font-black mb-4">Product Not Found</h2>
        <p className="text-gray-400 max-w-md mb-8">
          The requested product ID does not exist in our catalog database. Feel free to browse all solar solutions.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#fcc42c] text-[#011a1e] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    )
  }

  const product = foundProduct
  const category = foundCategory

  // State controls
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "")
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "")
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "warranty">("specs")
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0)
  const [addedToCart, setAddedToCart] = useState<boolean>(false)

  // Generate dynamic product pricing details based on active capacity selection
  const priceDetails = product.sizePrices[selectedSize] || { price: product.price, originalPrice: product.originalPrice }
  const { price, originalPrice } = priceDetails
  const percentDiscount = Math.round(((originalPrice - price) / originalPrice) * 100)

  // Recalculate dynamic monthly EMI
  const monthlyEmi = Math.round(price / 12)

  // Estimate solar government subsidy savings
  const isSolarPanel = category.id === "panels"
  const estimatedSubsidy = isSolarPanel ? Math.round(price * 0.45) : 0

  // Secondary media gallery thumbnails (mix of product stock and install mockups)
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=600"
  ]

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec") {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    } else {
      setQuantity(prev => prev + 1)
    }
  }

  const handleInquireClick = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="bg-[#011a1e] text-white min-h-screen font-sans selection:bg-[#fcc42c] selection:text-[#011a1e] pt-28 pb-20">
      
      {/* ─── BREADCRUMBS ROW ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-white transition-colors">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${category.id}`} className="hover:text-white transition-colors">{category.name}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
        <span className="text-[#fcc42c]">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-6">
        
        {/* ─── TWO-COLUMN MAIN DISPLAY GRID ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Gallery & Mock Visual Overlays */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Main Image Showcase Block */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-b from-[#011518] to-[#011a1e] border border-white/10 flex items-center justify-center p-8 shadow-2xl">
              <motion.img
                key={activeGalleryIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[activeGalleryIndex]}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              />

              {/* Top Free installation sticker overlay (emulating Atomberg fans layout) */}
              {product.badge && (
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#fcc42c] text-[#011a1e] text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg border border-black/10">
                  <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{product.badge}</span>
                </div>
              )}

              {/* Floating APP / Remote graphic overlays representing smart features */}
              {product.hasSmartApp && (
                <div className="absolute bottom-6 right-6 bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
                  <Smartphone className="w-7 h-7 text-[#fcc42c]" />
                  <div className="text-left">
                    <p className="text-[9px] text-gray-400 uppercase font-black leading-none mb-1">Smart System</p>
                    <p className="text-xs text-white font-bold leading-none">IoT App Synced</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-gallery Thumbnail Carousel */}
            <div className="flex items-center gap-3 overflow-x-auto py-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`w-24 aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border-2 transition-all p-2 ${
                    activeGalleryIndex === idx
                      ? "border-[#fcc42c] scale-105 shadow-md shadow-[#fcc42c]/5"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Product view" className="w-full h-full object-contain filter drop-shadow" />
                </button>
              ))}
            </div>

            {/* Value Callouts Section */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                <Truck className="w-5 h-5 text-[#fcc42c] mb-2" />
                <p className="text-[10px] text-gray-400 font-extrabold uppercase mb-1">Shipping</p>
                <p className="text-xs text-white font-bold">Free Delivery</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                <Wrench className="w-5 h-5 text-[#fcc42c] mb-2" />
                <p className="text-[10px] text-gray-400 font-extrabold uppercase mb-1">Deployment</p>
                <p className="Standard text-xs text-white font-bold">Free Setup</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-[#fcc42c] mb-2" />
                <p className="text-[10px] text-gray-400 font-extrabold uppercase mb-1">Warranty</p>
                <p className="text-xs text-white font-bold">Certified Protection</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Configurator, Offers, & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Category tag */}
            <span className="text-[#fcc42c] font-black text-xs uppercase tracking-widest mb-2">
              {category.name}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 text-[#fcc42c] bg-[#fcc42c]/10 px-3 py-1 rounded-full border border-[#fcc42c]/20">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-extrabold">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500 font-semibold">{product.reviews} customer reviews</span>
            </div>

            {/* Dynamic pricing calculation display */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 w-full mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-white">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-[#fcc42c] text-[#011a1e] text-xs font-black uppercase tracking-wider py-1 px-2.5 rounded-md">
                  {percentDiscount}% off
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2 font-medium">Inclusive of all local taxes and setup duties</p>
            </div>

            {/* Color swatches selection */}
            {product.colors.length > 0 && (
              <div className="mb-6 w-full">
                <h5 className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-3">
                  Color / Frame Option: <span className="text-white font-semibold capitalize">{selectedColor}</span>
                </h5>
                <div className="flex items-center gap-3">
                  {product.colors.map(col => {
                    const isSelected = selectedColor === col.name
                    return (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        style={{ backgroundColor: col.hex }}
                        className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                          isSelected ? "border-[#fcc42c] scale-110 shadow-lg" : "border-white/20 hover:border-white/50"
                        }`}
                        title={col.name}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check className={`w-4 h-4 ${
                              col.hex === "#ffffff" || col.hex === "#f8fafc" ? "text-black" : "text-white"
                            } stroke-[4]`} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Size / Capacity variations pills selection */}
            <div className="mb-8 w-full">
              <h5 className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-3">
                Select Sweep Size / capacity rating:
              </h5>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => {
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                        isSelected
                          ? "bg-[#04444c] border-[#fcc42c] text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity select & purchase inquiry CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full mb-8">
              
              {/* Quantity controller increment/decrement */}
              <div className="flex items-center justify-between border border-white/10 bg-white/5 rounded-xl px-4 py-3 shrink-0">
                <button
                  onClick={() => handleQuantityChange("dec")}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-extrabold text-white">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("inc")}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Inquiry Action */}
              <button
                onClick={handleInquireClick}
                className="flex-1 bg-[#fcc42c] hover:bg-white text-[#011a1e] font-black uppercase text-sm tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#fcc42c] hover:border-white"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" /> Inquiry Submitted!
                  </>
                ) : (
                  <>
                    Request Free Consultation <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Coupons & promotional offers panel */}
            <div className="w-full bg-[#04444c]/20 border border-white/5 rounded-3xl p-6 mb-8">
              <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-[#fcc42c] flex items-center gap-2">
                <Percent className="w-4 h-4" /> Coupons & Offers
              </h4>
              <div className="flex flex-col gap-4">
                
                {/* Offer Card 1: Bank Discount */}
                <div className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0 text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-white leading-tight">Instant Bank Discount</h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Get ₹1,500 off on ICICI and Axis Bank Credit Cards. Minimum purchase ₹10,000.
                    </p>
                  </div>
                </div>

                {/* Offer Card 2: No-Cost EMI */}
                <div className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 text-emerald-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-white leading-tight">No Cost EMI Plan</h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Avaible EMI from <strong className="text-emerald-400">₹{monthlyEmi.toLocaleString("en-IN")}/month</strong> for 12 months with no interest charge.
                    </p>
                  </div>
                </div>

                {/* Offer Card 3: Government Solar Subsidy (Conditional) */}
                {isSolarPanel && (
                  <div className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/15 flex items-center justify-center shrink-0 text-yellow-400">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase text-white leading-tight">PM-Surya Ghar Subsidy</h5>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Save up to <strong className="text-yellow-400">₹{estimatedSubsidy.toLocaleString("en-IN")}</strong> through the direct national grid solar subsidy program.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Bullet point checklist details */}
            <div className="flex flex-col gap-3.5 mb-8">
              <h5 className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-1">Why choose this system:</h5>
              {product.features.map((feat, index) => (
                <div key={index} className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed">
                  <Check className="w-4 h-4 text-[#fcc42c] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ─── TECHNICAL SPECIFICATIONS & TABS SECTION ────────────────── */}
        <section className="mt-20 border-t border-white/10 pt-16">
          <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
            
            {/* Spec Tab */}
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider transition-all border-b-2 shrink-0 ${
                activeTab === "specs"
                  ? "border-[#fcc42c] text-white"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              Technical Specifications
            </button>

            {/* Details Tab */}
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider transition-all border-b-2 shrink-0 ${
                activeTab === "features"
                  ? "border-[#fcc42c] text-white"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              Description & Highlights
            </button>

            {/* Warranty Tab */}
            <button
              onClick={() => setActiveTab("warranty")}
              className={`pb-4 px-6 font-extrabold text-sm uppercase tracking-wider transition-all border-b-2 shrink-0 ${
                activeTab === "warranty"
                  ? "border-[#fcc42c] text-white"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              Warranty & Service SLA
            </button>
          </div>

          <div className="py-4">
            <AnimatePresence mode="wait">
              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
                >
                  <h4 className="text-lg font-black mb-6">Product Specifications Sheet</h4>
                  
                  {/* Glassmorphism Specs Grid Table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {Object.entries(product.technicalSpecs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-white/5 gap-4"
                      >
                        <span className="text-gray-400 font-medium">{key}</span>
                        <span className="text-white font-extrabold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6"
                >
                  <h4 className="text-lg font-black">Detailed Description</h4>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
                    {product.description} Built to military and global ISO certifications, NeoGrid's components are structured using top-tier structural aluminum and high-transmittance glass substrates, ensuring your grid investment continues delivering clean, reliable solar power for up to 30 years without decay.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="border border-white/10 rounded-2xl p-5 bg-white/5">
                      <h5 className="font-extrabold mb-3 text-[#fcc42c]">High Mechanical Resilience</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Constructed to withstand harsh weather, including high wind speeds up to 2400 Pa and heavy snowfall heaps up to 5400 Pa. Zero degradation under seasonal thermal stress cycles.
                      </p>
                    </div>
                    <div className="border border-white/10 rounded-2xl p-5 bg-white/5">
                      <h5 className="font-extrabold mb-3 text-[#fcc42c]">Peak System Safeguards</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Incorporates double electrical safety shields, ground-fault leakage detectors, and smart automatic disconnect micro-controllers to prevent surges or thermal expansion issues.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "warranty" && (
                <motion.div
                  key="warranty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
                >
                  <h4 className="text-lg font-black mb-4">Warranty & AMC Coverage</h4>
                  <p className="text-[#fcc42c] font-bold text-sm mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> {product.warranty}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-4xl mb-6">
                    Every system deployed by NeoGrid comes with a comprehensive product coverage SLA. Our team handles periodic cleaning audits, voltage testing, performance analysis diagnostics, and rapid remote fault detections under our standard Annual Maintenance Contracts (AMC).
                  </p>
                  
                  <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-gray-400 leading-relaxed">
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>24/7 dedicated telephone support dispatch hotline: +91 98461 31500</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Sub-48hr physical technician deployment response during fault detection</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Complimentary remote monitoring app interface customization</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── RELATED PRODUCTS GRID ──────────────────────────────────── */}
        <section className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">Related Solutions</h3>
            <Link
              to={`/products?category=${category.id}`}
              className="text-[#fcc42c] font-black text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1.5"
            >
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(rel => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="group bg-white/5 border border-white/10 hover:border-[#fcc42c]/40 transition-all duration-500 rounded-3xl p-6 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-black/25 rounded-2xl p-4 flex items-center justify-center mb-4 overflow-hidden relative">
                    <img src={rel.image} alt={rel.name} className="h-4/5 object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-white text-base leading-snug group-hover:text-[#fcc42c] transition-colors mb-2">
                    {rel.name}
                  </h4>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <span className="text-sm font-bold text-gray-400">★ {rel.rating}</span>
                    <span className="text-[#fcc42c] text-sm font-black">₹{rel.price.toLocaleString("en-IN")}</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>

      </div>
    </div>
  )
}
