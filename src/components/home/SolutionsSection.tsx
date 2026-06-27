import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"




const SOLUTIONS = [
  {
    id: 1,
    title: "Li-On Smart Power Backup",
    badge: "Power Backup",
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600",
    description: "Advanced lithium inverter ensuring reliable backup, faster charging, and superior performance.",
    buttonText: "Shop Now!",
    link: "/products?category=inverters"
  },
  {
    id: 2,
    title: "Li-On Hybrid Inverter /UPS",
    badge: "Inverter / UPS",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600",
    description: "Experience uninterrupted power through efficient and intelligent Li-On Hybrid Inverter/UPS.",
    buttonText: "Shop Now!",
    link: "/products?category=inverters"
  },
  {
    id: 3,
    title: "Lithium Battery Pack",
    badge: "Battery Packs",
    image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=600",
    description: "Next-generation Lithium Battery Pack providing safe, compact, and sustainable energy storage.",
    buttonText: "Shop Now!",
    link: "/products?category=batteries"
  },
  {
    id: 4,
    title: "Solar System",
    badge: "Solar Ready",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
    description: "Switch to smarter energy with the high-performance NeoGrid Solar System today.",
    buttonText: "Install Now!",
    link: "/products?category=panels"
  },
  {
    id: 5,
    title: "Li-On Smart Power Backup Pro",
    badge: "Power Backup",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600",
    description: "High-capacity smart lithium backup system designed for heavy residential load and commercial safety.",
    buttonText: "Shop Now!",
    link: "/products?category=inverters"
  },
  {
    id: 6,
    title: "Li-On Hybrid Inverter /UPS Max",
    badge: "Inverter / UPS",
    image: "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=600",
    description: "Advanced hybrid power system with dual channel MPPT tracking and real-time app diagnostics.",
    buttonText: "Shop Now!",
    link: "/products?category=inverters"
  }
]




export default function SolutionsSection() {


  const [showAll, setShowAll] = useState(false)


  const visibleSolutions = showAll ? SOLUTIONS : SOLUTIONS.slice(0, 3)


  return (


    <section className="py-5 sm:py-10 bg-[#011a1e] relative overflow-hidden border-b border-white/10">

      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#04444c] rounded-full blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#fcc42c] rounded-full blur-[160px] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header section with view all */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">

          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Which Solution <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fcc42c] to-yellow-300">Do You Need</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 mt-3 text-lg font-light max-w-xl"
            >
              Explore our tailormade clean energy architectures engineered for resilience and efficiency.
            </motion.p>

          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >

            <Link
              to="/products"
              className="text-xs font-bold text-[#fcc42c] hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 border-b border-[#fcc42c]/20 hover:border-white pb-1.5"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>

        </div>


        {/* Responsive grid of cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >

          <AnimatePresence mode="popLayout">

            {visibleSolutions.map((solution, index) => (

              <motion.div
                layout
                key={solution.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative bg-[#022a30]/45 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 hover:border-[#fcc42c]/50 hover:bg-[#022a30]/70 transition-all duration-500 shadow-2xl shadow-black/30 group flex flex-col h-full hover:-translate-y-2"
              >

                {/* Floating Badge */}
                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-[#fcc42c]/30 text-[#fcc42c] text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full z-10 shadow-md">
                  {solution.badge}
                </div>

                {/* Image Showcase Panel */}
                <div className="w-full aspect-4/3 bg-white/5 rounded-2xl overflow-hidden mb-6 flex items-center justify-center relative border border-white/5 group-hover:border-[#fcc42c]/20 transition-all duration-500">

                  <img
                    src={solution.image}
                    alt={solution.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />

                  <div className="absolute inset-0 bg-radial-gradient from-[#04444c]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                </div>

                {/* Details Content */}
                <div className="flex flex-col flex-1">

                  <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-[#fcc42c] transition-colors duration-300 line-clamp-2">
                    {solution.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 flex-1 line-clamp-3">
                    {solution.description}
                  </p>

                  {/* Call To Action Button with sliding background animation */}
                  <Link
                    to={solution.link}
                    className="group relative w-full py-3.5 rounded-xl overflow-hidden bg-white/10 border border-white/20 hover:border-[#fcc42c]/50 transition-colors flex items-center justify-center gap-2 mt-auto"
                  >

                    <div className="absolute inset-0 w-0 bg-[#fcc42c] transition-all duration-250ms ease-out group-hover:w-full" />

                    <span className="relative z-10 text-xs font-black text-white group-hover:text-[#011a1e] transition-colors uppercase tracking-widest">
                      {solution.buttonText}
                    </span>

                  </Link>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </motion.div>


        {/* View More / View Less Toggle Button */}
        <motion.div
          layout
          className="flex justify-center mt-5 sm:mt-14"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 rounded-full bg-transparent border-2 border-[#fcc42c] text-[#fcc42c] hover:bg-[#fcc42c] hover:text-[#011a1e] font-extrabold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#fcc42c]/5 hover:shadow-[#fcc42c]/20 flex items-center gap-2 cursor-pointer"
          >
            {showAll ? (
              <>
                View Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
