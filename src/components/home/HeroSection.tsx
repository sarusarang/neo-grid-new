import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"




const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000",
    title: "Power Your Life.",
    subtitle: "Own Your Energy.",
    description: "Deploy state-of-the-art solar arrays and smart battery storage systems."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000",
    title: "High Efficiency.",
    subtitle: "Zero Compromise.",
    description: "Our monocrystalline panels capture more sunlight, even on cloudy days."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=2000",
    title: "Smart Storage.",
    subtitle: "Always Ready.",
    description: "Store your excess solar power for nighttime or grid outages."
  }
]




export default function HeroSection() {


  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])


  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)


  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[800px] overflow-hidden bg-[#011a1e] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={SLIDES[currentSlide].image} 
            alt="Solar"
            className="w-full h-full object-cover"
          />
          {/* Clean dark gradient overlay without yellow */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
                {SLIDES[currentSlide].title}<br/>
                <span className="text-[#fcc42c]">
                  {SLIDES[currentSlide].subtitle}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed mb-10">
                {SLIDES[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold text-lg transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-transparent border border-white text-white hover:bg-white/10 rounded-full font-bold text-lg transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:flex hidden items-center gap-6 z-20">
        <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-[#fcc42c] w-8" : "bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>


    </section>
  )
}
