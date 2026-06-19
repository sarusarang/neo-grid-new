import { motion } from "framer-motion"
import { ShieldCheck, Cpu, Smartphone, Leaf } from "lucide-react"

const FEATURES = [
  {
    title: "AI-Powered Optimization",
    desc: "Our smart inverters use machine learning to adapt to weather patterns and maximize your daily yield.",
    icon: <Cpu className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "Military-Grade Durability",
    desc: "Built to withstand category 5 hurricanes, massive hail, and extreme temperature fluctuations.",
    icon: <ShieldCheck className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "Real-Time App Control",
    desc: "Monitor your generation, grid usage, and battery reserves from anywhere in the world.",
    icon: <Smartphone className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "Zero-Carbon Footprint",
    desc: "100% clean energy. Every installation is another step towards a sustainable future for our planet.",
    icon: <Leaf className="w-8 h-8 text-[#011a1e]" />
  }
]

export default function FeaturesGridSection() {
  return (
    <section className="py-20 bg-[#011a1e] relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Technology That <br />
                <span className="text-[#fcc42c]">Works For You</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                NeoGrid isn't just about placing glass on your roof. It's an interconnected hardware ecosystem designed from the ground up to be the most efficient energy generator on the market.
              </p>
              <button className="px-8 py-4 border-2 border-[#fcc42c] text-[#fcc42c] rounded-full font-bold hover:bg-[#fcc42c] hover:text-[#011a1e] transition-all">
                Explore the Tech
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-gradient-to-br from-[#04444c] to-[#022a30] p-8 rounded-3xl border border-white/5 hover:border-[#fcc42c]/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#fcc42c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
