import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    text: "Switching to NeoGrid was the best decision for our home. The sleek design of the panels and the intuitive app make managing our energy incredibly easy. Our bill is literally zero.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Business Owner",
    text: "We deployed a commercial array on our warehouse. The professionalism of the installation team and the sheer output of these smart inverters exceeded all our projections.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Early Adopter",
    text: "The PowerWall integration is flawless. During the last blackout, we didn't even notice the grid went down. True energy independence.",
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#022a30] relative overflow-hidden border-t border-white/5">
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#04444c]/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Trusted by <span className="text-[#fcc42c]">Thousands</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors relative group"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 text-6xl text-[#fcc42c]/20 group-hover:text-[#fcc42c]/40 transition-colors font-serif">
                "
              </div>
              <div className="flex text-[#fcc42c] mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed">"{t.text}"</p>
              <div className="mt-auto">
                <p className="text-white font-bold text-lg">{t.name}</p>
                <p className="text-[#078291] text-sm uppercase tracking-wider font-semibold">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
