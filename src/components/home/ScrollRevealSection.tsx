import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"




export default function ScrollRevealSection() {


  const containerRef = useRef<HTMLDivElement>(null)


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })


  // Width shrinks from 100% to 80% as user scrolls down
  const width = useTransform(scrollYProgress, [0, 0.5], ["100%", "85%"])
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", "32px"])



  return (


    <section ref={containerRef} className="py-10 sm:py-16 bg-gray-50 flex justify-center items-center overflow-hidden min-h-[70vh]">


      <motion.div
        style={{ width, borderRadius }}
        className="relative h-[80vh] overflow-hidden shadow-2xl shadow-[#04444c]/20"
      >

        <img
          src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=2000"
          alt="Solar Ecosystem"
          loading="lazy"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#04444c]/90 via-[#04444c]/40 to-transparent flex flex-col items-center justify-end text-center p-8 pb-20">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-16 h-1 bg-[#fcc42c] mx-auto rounded-full" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Power the Future by Transforming <span className="text-[#fcc42c]">Your Backup to Lithium.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl font-light"
          >
            Transform Your Inverter Experience with Fast-Charging Lithium Technology
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
