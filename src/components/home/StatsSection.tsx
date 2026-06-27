import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { label: "Units Delivered", value: 75, suffix: " K+" },
  { label: "Trusted Customers", value: 20, suffix: " k+" },
  { label: "Solar Unit Installation", value: 10, suffix: " MW" },
]

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const nodeRef = useRef<HTMLHeadingElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView || !nodeRef.current) return
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${Math.round(value)}${suffix}`
        }
      },
    })
    return () => controls.stop()
  }, [from, to, inView, suffix])

  return <h3 ref={nodeRef} className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter" />
}

// Simple local animate function
function animate(from: number, to: number, options: { duration: number; ease: string; onUpdate: (v: number) => void }) {
  let startTime: number | null = null
  let rafId: number

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / (options.duration * 1000), 1)
    const easeProgress = progress * (2 - progress)
    const current = from + (to - from) * easeProgress
    options.onUpdate(current)
    if (progress < 1) {
      rafId = window.requestAnimationFrame(step)
    }
  }

  rafId = window.requestAnimationFrame(step)
  return { stop: () => window.cancelAnimationFrame(rafId) }
}

export default function StatsSection() {
  return (
    <section className="relative py-3 sm:py-10 bg-[#022a30] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#04444c] rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* 3-col on all sizes: compact on mobile, spaced on md+ */}
        <div className="grid grid-cols-3 md:gap-8 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-4 md:py-0"
            >
              <Counter from={0} to={stat.value} suffix={stat.suffix} />
              <p className="text-[#fcc42c] font-medium tracking-widest uppercase text-[10px] sm:text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
