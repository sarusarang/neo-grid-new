import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw, ServerCrash } from "lucide-react"
import { useHomeSliders } from "../../service/home/useHome"


function HeroSliderLoader() {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] w-full items-center overflow-hidden bg-[#011a1e] sm:h-screen sm:min-h-[640px] sm:max-h-[820px]">
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(115deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_42%,rgba(252,196,44,0.08))]" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 h-4 w-32 animate-pulse rounded-full bg-[#fcc42c]/30" />
          <div className="mb-4 h-12 w-11/12 animate-pulse rounded bg-white/12 sm:h-16 md:h-20" />
          <div className="mb-6 h-12 w-8/12 animate-pulse rounded bg-[#fcc42c]/25 sm:h-16 md:h-20" />
          <div className="mb-3 h-4 w-full max-w-xl animate-pulse rounded bg-white/12" />
          <div className="mb-9 h-4 w-5/6 max-w-lg animate-pulse rounded bg-white/10" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-12 w-full animate-pulse rounded-full bg-white/20 sm:w-40" />
            <div className="h-12 w-full animate-pulse rounded-full border border-white/15 bg-white/8 sm:w-40" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 sm:flex">
        <span className="h-3 w-10 animate-pulse rounded-full bg-[#fcc42c]/40" />
        <span className="h-3 w-3 animate-pulse rounded-full bg-white/30" />
        <span className="h-3 w-3 animate-pulse rounded-full bg-white/30" />
      </div>
    </section>
  )
}


function HeroSliderState({
  isError,
  onRetry,
}: {
  isError?: boolean
  onRetry: () => void
}) {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] w-full items-center overflow-hidden bg-[#011a1e] sm:h-screen sm:min-h-[640px] sm:max-h-[820px]">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(4,68,76,0.9),rgba(1,26,30,0.96)_54%,rgba(252,196,44,0.08))]" />
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          {isError && <ServerCrash className="mb-5 h-12 w-12 text-[#fcc42c]" />}

          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#fcc42c]">
            NeoGrid Power
          </p>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Smarter Energy Starts Here
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {isError
              ? "The home slider could not be loaded right now. You can retry or continue browsing products."
              : "Explore reliable inverter, UPS, and clean energy products built for everyday power confidence."}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {isError && (
              <button
                onClick={onRetry}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fcc42c] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#011a1e] transition-colors hover:bg-white"
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </button>
            )}

            <Link
              to="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#011a1e]"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}




export default function HeroSection() {


  const [currentSlide, setCurrentSlide] = useState(0)
  const { data: sliderResponse, isLoading, isError, refetch } = useHomeSliders()
  const slides = sliderResponse?.data ?? []
  const slideIndex = slides.length > 0 ? currentSlide % slides.length : 0
  const activeSlide = slides[slideIndex]

  // Auto-slide
  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [slides.length])


  const nextSlide = () => {
    if (slides.length <= 1) return
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (slides.length <= 1) return
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (isLoading) return <HeroSliderLoader />

  if (isError || slides.length === 0) {
    return <HeroSliderState isError={isError} onRetry={() => refetch()} />
  }


  return (
    <section className="relative flex h-[90vh] min-h-[640px] w-full items-center overflow-hidden bg-[#011a1e] sm:h-screen sm:min-h-[640px] sm:max-h-[820px]">
      <AnimatePresence mode="wait">
        {activeSlide && (
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={activeSlide.image} 
              alt={activeSlide.title}
              className="w-full h-full object-cover"
            />
            {/* Clean dark gradient overlay without yellow */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            {activeSlide && (
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:mb-6 md:text-7xl">
                  {activeSlide.title}<br/>
                  <span className="text-[#fcc42c]">
                    {activeSlide.title_2}
                  </span>
                </h1>
                <p className="mb-8 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:mb-10 md:text-xl">
                  {activeSlide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-bold text-black transition-colors hover:bg-gray-100 sm:text-lg">
                    Get Started
                  </Link>
                  <Link to="/service" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-transparent px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10 sm:text-lg">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      {slides.length > 1 && (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:flex hidden items-center gap-6 z-20">
        <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button 
              key={slide.id} 
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === slideIndex ? "bg-[#fcc42c] w-8" : "bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      )}


    </section>
  )
}
