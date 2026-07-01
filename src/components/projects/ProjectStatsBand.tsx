import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"

function animateNumber(from: number, to: number, duration: number, onUpdate: (value: number) => void) {
  let startTime: number | null = null
  let rafId = 0

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
    const easedProgress = progress * (2 - progress)
    onUpdate(from + (to - from) * easedProgress)

    if (progress < 1) {
      rafId = window.requestAnimationFrame(step)
    }
  }

  rafId = window.requestAnimationFrame(step)

  return () => window.cancelAnimationFrame(rafId)
}

interface StatCounterProps {
  className?: string
  label: string
  suffix?: string
  value: number
}

function StatCounter({ className, label, suffix = "", value }: StatCounterProps) {
  const nodeRef = useRef<HTMLParagraphElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView || !nodeRef.current) return

    return animateNumber(0, value, 2, (nextValue) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${Math.round(nextValue)}${suffix}`
      }
    })
  }, [inView, suffix, value])

  return (
    <div>
      <p ref={nodeRef} className={className}>
        0{suffix}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 md:text-sm">{label}</p>
    </div>
  )
}

export default function ProjectStatsBand() {
  const stats = [
    { label: "Total Capacity", value: 530, suffix: " kW+" },
    { label: "Happy Clients", value: 180, suffix: "+" },
    { label: "On-Time Delivery", value: 99, suffix: "%" },
    { label: "CO2 Saved / Year", value: 400, suffix: " Tons" },
  ]

  return (
    <section className="border-y border-white/5 bg-[#04444c]/30 py-10 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              label={stat.label}
              suffix={stat.suffix}
              value={stat.value}
              className="mb-1 text-3xl font-black text-[#fcc42c] md:text-4xl"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
