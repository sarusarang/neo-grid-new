import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PRODUCTS = [
  {
    id: 1,
    name: "NeoGrid Mono 400W",
    category: "Solar Panel",
    image: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=400",
    specs: "22% Efficiency",
  },
  {
    id: 2,
    name: "Hybrid Smart Inverter X1",
    category: "Inverter",
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=400",
    specs: "10kW Output",
  },
  {
    id: 3,
    name: "PowerWall 10kWh",
    category: "Battery Storage",
    image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=400",
    specs: "10 Year Warranty",
  },
  {
    id: 4,
    name: "NeoGrid Poly 350W",
    category: "Solar Panel",
    image: "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=400",
    specs: "High Durability",
  },
  {
    id: 5,
    name: "String Inverter Pro",
    category: "Inverter",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=400",
    specs: "Wifi Enabled",
  },
]

export default function ProductSlider() {
  const sliderContainer = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (sliderContainer.current) {
      sliderContainer.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }

  const scrollRight = () => {
    if (sliderContainer.current) {
      sliderContainer.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }

  return (
    <section className="py-20 bg-[#011a1e] overflow-hidden relative border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#04444c]/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6"
            >
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fcc42c] to-yellow-200">Excellence</span>
            </motion.h2>
            <p className="text-gray-400 text-xl font-light">
              Explore our premium lineup of high-efficiency solar hardware. Built to outlast and outperform.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="pl-4 lg:pl-8 relative z-10">
        <div 
          ref={sliderContainer}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pr-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              className="snap-start shrink-0 min-w-[320px] md:min-w-[400px] bg-white/5 backdrop-blur-xl rounded-[2rem] p-4 group transition-all duration-500 hover:bg-white/10 border border-white/10 hover:border-[#fcc42c]/50 relative overflow-hidden"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 relative bg-black/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e] via-[#011a1e]/20 to-transparent opacity-60" />
                
                {/* Floating Spec Badge */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-white tracking-wide">{product.specs}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-4 pb-4 text-left">
                <p className="text-[#fcc42c] mb-2 font-bold uppercase tracking-widest text-xs">{product.category}</p>
                <h3 className="text-2xl font-bold text-white mb-6">{product.name}</h3>
                
                <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] group-hover:border-[#fcc42c] transition-all duration-300 flex justify-between items-center px-6">
                  View Details
                  <svg className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
