import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"



// SERVICES ARRAY
const SERVICES = [
  {
    num: "01",
    title: "Professional Solar Installation",
    desc: "Rooftop and ground-mounted solar systems for homes, offices, and institutions.",
    bullets: ["Rooftop Setup", "Ground-Mounted Systems"],
    color: "#04444c",       // Deep teal
    textColor: "#ffffff",
    accentColor: "#fcc42c",
    images: [
      "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=600&h=360",
    ],
  },
  {
    num: "02",
    title: "Solar System Maintenance",
    desc: "Regular checkups and quick fixes to keep your solar system running at peak performance.",
    bullets: ["Regular Checkups", "On-Site Support"],
    color: "#fcc42c",       // Gold
    textColor: "#011a1e",
    accentColor: "#04444c",
    images: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600&h=360",
    ],
  },
  {
    num: "03",
    title: "Solar Consultation",
    desc: "Expert guidance to design the ideal solar system tailored to your energy needs and budget.",
    bullets: ["Energy Audit", "Custom Design"],
    color: "#078291",       // Teal-cyan
    textColor: "#ffffff",
    accentColor: "#fcc42c",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=600&h=360",
    ],
  },
  {
    num: "04",
    title: "Battery & Storage Solutions",
    desc: "Intelligent battery systems that store surplus solar energy for use anytime, day or night.",
    bullets: ["Home Battery Packs", "Grid Backup Systems"],
    color: "#022a30",       // Very dark teal
    textColor: "#ffffff",
    accentColor: "#fcc42c",
    images: [
      "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600&h=360",
      "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?auto=format&fit=crop&q=80&w=600&h=360",
    ],
  },
]




export default function ServicesSection() {


  // First service open by default
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleEnter = (index: number) => setActiveIndex(index)


  return (

    <section className="bg-[#e8f3f4] border-b border-gray-100/5">

      {/* Section Header — contained */}
      <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-16">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-2 h-2 rounded-full bg-[#04444c]" />

              <span className="text-[#04444c] text-sm font-bold uppercase tracking-widest">
                Our Solar Dedicated Services
              </span>

            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight max-w-md">
              Efficient and affordable<br />solar solutions.
            </h2>

          </div>

          <button className="self-start md:self-end flex items-center gap-3 bg-[#04444c] text-white px-6 py-3.5 rounded-full font-bold hover:bg-[#078291] transition-all group">
            Get More Info
            <span className="w-8 h-8 rounded-full bg-[#fcc42c] flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-[#011a1e]" />
            </span>
          </button>

        </div>

      </div>



      {/* Full-width Service Rows */}
      <div className="w-full">

        {SERVICES.map((service, index) => (

          <div
            key={service.num}
            onMouseEnter={() => handleEnter(index)}
          >

            {/* Service Row — full width, colored */}
            <motion.div
              animate={{ backgroundColor: activeIndex === index ? service.color : "#e8f3f4" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full px-4 md:px-12 lg:px-20 py-8 md:py-10 cursor-pointer"
            >

              <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">

                {/* Number */}
                <div className="col-span-2 md:col-span-1">

                  <motion.span
                    animate={{ color: activeIndex === index ? service.accentColor : "#d1d5db" }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-5xl font-black leading-none"
                  >
                    {service.num}
                  </motion.span>

                </div>

                {/* Title & Desc */}
                <div className="col-span-10 md:col-span-4">

                  <motion.h3
                    animate={{ color: activeIndex === index ? service.textColor : "#111827" }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl font-black mb-2"
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    animate={{ color: activeIndex === index ? `${service.textColor}99` : "#6b7280" }}
                    transition={{ duration: 0.3 }}
                    className="text-sm leading-relaxed"
                  >
                    {service.desc}
                  </motion.p>

                </div>

                {/* Bullets */}
                <div className="hidden md:flex col-span-4 flex-col gap-2">

                  {service.bullets.map((b) => (

                    <div key={b} className="flex items-center gap-2">

                      <motion.span
                        animate={{ color: activeIndex === index ? service.accentColor : "#04444c" }}
                        transition={{ duration: 0.3 }}
                        className="text-base font-bold"
                      >
                        ✦
                      </motion.span>

                      <motion.span
                        animate={{ color: activeIndex === index ? service.textColor : "#374151" }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium"
                      >
                        {b}
                      </motion.span>

                    </div>

                  ))}

                </div>


                {/* CTA */}
                <div className="hidden md:flex col-span-3 justify-end">

                  <motion.button
                    animate={{
                      backgroundColor: activeIndex === index ? service.accentColor : "transparent",
                      color: activeIndex === index ? service.color : "#374151",
                      borderColor: activeIndex === index ? service.accentColor : "#d1d5db",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border"
                  >
                    Contact Now!

                    <ArrowUpRight className="w-4 h-4" />

                  </motion.button>

                </div>

              </div>

            </motion.div>


            {/* Full-width Animated Image Strip */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key={`strip-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden w-full"
                  style={{ backgroundColor: service.color }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                    className="flex gap-3 px-4 md:px-12 lg:px-20 pb-8 overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {service.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
                        className="shrink-0 w-48 md:w-64 lg:w-72 h-36 md:h-44 lg:h-52 rounded-2xl overflow-hidden shadow-xl"
                      >
                        <img
                          src={img}
                          alt={`${service.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
