import { motion } from "framer-motion"
import { ShieldCheck, CloudLightning, Wrench, CircleGauge } from "lucide-react"



// FEATURES ARRAY
const FEATURES = [
  {
    title: "ZERO MAINTENANCE",
    desc: "Enjoy hassle-free operation without worrying about repairs, upkeep, or maintenance.",
    icon: <Wrench className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "FAST CHARGING",
    desc: "Advanced fast charging ensures quick power restoration for uninterrupted performance.",
    icon: <CloudLightning className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "10 YEAR DESIGN LIFE",
    desc: "Delivers consistent performance and durability for an extended ten-year design life.",
    icon: <ShieldCheck className="w-8 h-8 text-[#011a1e]" />
  },
  {
    title: "CONSTANT VOLTAGE – NO LOAD FLUCTUATION",
    desc: "Ensures uninterrupted performance through constant voltage and fluctuation-free power delivery.",
    icon: <CircleGauge className="w-8 h-8 text-[#011a1e]" />
  }
]



export default function FeaturesGridSection() {


  return (


    <section className="py-14 bg-[#011a1e] relative overflow-hidden">


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
                More than an inverter, LI-ON is a next-generation lithium backup system built from the ground up to deliver reliable, efficient, and uninterrupted energy in a compact design.
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
                className="bg-linear-to-br from-[#04444c] to-[#022a30] p-8 rounded-3xl border border-white/5 hover:border-[#fcc42c]/50 transition-colors group"
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
