import { motion } from "framer-motion"




const STEPS: { num: string, title: string, desc: string }[] = [
  {
    num: "01",
    title: "Power Needs Assessment",
    desc: "We evaluate your energy requirements and recommend the ideal NeoGrid Lithium Inverter, UPS, and Battery Pack configuration for your home or business.",
  },
  {
    num: "02",
    title: "Seamless Installation",
    desc: "Our certified technicians professionally install and configure your power backup system, ensuring maximum performance, safety, and efficiency.",
  },
  {
    num: "03",
    title: "Smart Solar Integration",
    desc: "Take your energy independence further by integrating NeoGrid Solar Systems with your Lithium Inverter and Battery Pack, generating clean energy and reducing electricity costs.",
  },
]



export default function HowItWorksSection() {

  return (

    <section className="py-10 sm:py-14 bg-[#011a1e] relative overflow-hidden">


      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fcc42c]/5 rounded-full blur-[150px] pointer-events-none" />


      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center mb-8 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            The NeoGrid <span className="text-[#fcc42c]">Power Journey</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            NeoGrid specializes in advanced Lithium Inverters and UPS systems, delivering reliable, efficient, and uninterrupted power solutions. Complementing our backup solutions, we also provide smart solar systems to help customers maximize energy savings and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-[#04444c] to-transparent z-0" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-[#04444c] to-[#011a1e] border border-[#fcc42c]/20 shadow-[0_0_30px_rgba(4,68,76,0.5)] flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="text-3xl font-black text-[#fcc42c]">{step.num}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
