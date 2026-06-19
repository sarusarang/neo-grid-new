import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Sun, Zap, Battery, Shield, Cpu, Wrench, ArrowRight, CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

// Simple local animate function
function animate(from: number, to: number, options: { duration: number, ease: string, onUpdate: (v: number) => void }) {
  let startTime: number | null = null;
  let rafId: number;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / (options.duration * 1000), 1);

    // Ease out quad
    const easeProgress = progress * (2 - progress);

    const current = from + (to - from) * easeProgress;
    options.onUpdate(current);

    if (progress < 1) {
      rafId = window.requestAnimationFrame(step);
    }
  };

  rafId = window.requestAnimationFrame(step);

  return { stop: () => window.cancelAnimationFrame(rafId) };
}

function Counter({ from, to, suffix, className }: { from: number; to: number; suffix: string; className?: string }) {
  const nodeRef = useRef<HTMLParagraphElement>(null)
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

  return <p ref={nodeRef} className={className}>{from}{suffix}</p>
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Sun className="w-8 h-8" />,
    title: "Solar Panel Installation",
    desc: "Professional rooftop and ground-mounted solar array installation for residential, commercial, and industrial properties.",
    points: ["Rooftop & Ground Mount", "Structural Analysis", "Grid-Tie & Off-Grid", "Permit Handling"],
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    color: "#04444c",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Inverter Solutions",
    desc: "From string to hybrid micro-inverters, we supply and install the right inverter system for maximum energy yield.",
    points: ["Hybrid Inverters", "String Inverters", "Micro-Inverters", "Smart Monitoring"],
    img: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800",
    color: "#078291",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Battery Storage",
    desc: "Cutting-edge lithium battery storage systems to store excess solar energy and power your home through the night.",
    points: ["Lithium Iron Phosphate", "Scalable Capacity", "Smart BMS", "Emergency Backup"],
    img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=800",
    color: "#022a30",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "AMC & Maintenance",
    desc: "Annual Maintenance Contracts to ensure your solar system operates at peak efficiency year after year.",
    points: ["Regular Inspections", "Panel Cleaning", "Performance Reports", "24/7 Support"],
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
    color: "#04444c",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Smart Monitoring",
    desc: "Real-time energy monitoring and analytics via our cloud platform and mobile app so you always know your output.",
    points: ["Live Dashboard", "Mobile App", "Alerts & Reports", "Remote Diagnostics"],
    img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    color: "#078291",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Solar Consultancy",
    desc: "End-to-end solar consultancy including site assessment, energy audits, financial modeling, and subsidy guidance.",
    points: ["Site Assessment", "Energy Audit", "Subsidy Guidance", "ROI Analysis"],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    color: "#022a30",
  },
]

const PROCESS = [
  { step: "01", title: "Site Visit", desc: "We assess your roof, load, and grid connection to recommend the perfect system." },
  { step: "02", title: "Custom Design", desc: "Our engineers design a system optimized for your specific orientation and energy goals." },
  { step: "03", title: "Permits & Approvals", desc: "We handle all DISCOM approvals, net-metering applications, and subsidy paperwork." },
  { step: "04", title: "Installation", desc: "Certified teams complete the full installation in as little as one working day." },
  { step: "05", title: "Commissioning", desc: "System is tested, app configured, and you're handed over with full training." },
  { step: "06", title: "Ongoing Support", desc: "Annual AMC visits and 24/7 remote monitoring keep your system at 100%." },
]

const INDUSTRIES = [
  { name: "Residential Homes", img: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=400" },
  { name: "Commercial Buildings", img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=400" },
  { name: "Agricultural Farms", img: "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=400" },
  { name: "Industrial Plants", img: "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=400" },
  { name: "Educational Institutes", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400" },
  { name: "Healthcare Facilities", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400" },
]

const WHY_US = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 25, suffix: "yr", label: "Performance Warranty" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Service() {
  return (
    <div className="bg-[#011a1e] text-white min-h-screen">

      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
            alt="Solar"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#011a1e]/30 via-[#011a1e]/10 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#fcc42c]" />
              <span className="text-[#fcc42c] text-xs font-black uppercase tracking-widest">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
              Complete Solar<br />
              <span className="text-[#fcc42c]">Energy Solutions</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              From consultation to installation and lifetime support — NeoGrid delivers every aspect of your solar journey under one roof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+919846131500" className="inline-flex items-center gap-3 bg-[#fcc42c] text-[#011a1e] px-8 py-4 rounded-full font-black text-lg hover:bg-white transition-colors">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <Link to="#services" className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHY US STATS ──────────────────────────────────────── */}
      <section className="py-14 bg-[#04444c]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Counter
                  from={0}
                  to={item.value}
                  suffix={item.suffix}
                  className="text-4xl md:text-5xl font-black text-[#fcc42c] mb-2"
                />
                <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICE CARDS GRID ────────────────────────────────── */}
      <section id="services" className="py-20 bg-[#011a1e]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              What We <span className="text-[#fcc42c]">Offer</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Six specialized services designed to take you from zero to full solar independence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#fcc42c]/40 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e] to-transparent" />
                  <div className="absolute bottom-4 left-4 p-3 rounded-xl text-white" style={{ backgroundColor: service.color }}>
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-extrabold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="flex flex-col gap-2 mt-auto">
                    {service.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#fcc42c] shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to="#" className="mt-6 flex items-center gap-2 text-[#fcc42c] font-bold text-sm hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS STEPS ─────────────────────────────────────── */}
      <section className="py-20 bg-[#022a30]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              How We <span className="text-[#fcc42c]">Work</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">A transparent, hassle-free process from your first call to your first solar bill saving.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-black text-[#fcc42c] group-hover:text-white transition-colors leading-none">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#04444c] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#fcc42c]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. INDUSTRIES WE SERVE ───────────────────────────────── */}
      <section className="py-20 bg-[#011a1e]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Industries We <span className="text-[#fcc42c]">Serve</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">We tailor every solution to the unique energy demands of your sector.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
              >
                <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-extrabold text-base md:text-lg leading-tight">{ind.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA CONTACT BAND ──────────────────────────────────── */}
      <section className="py-20 bg-[#04444c] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#fcc42c]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              >
                Ready to Switch to<br />
                <span className="text-[#fcc42c]">Solar Power?</span>
              </motion.h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Get a free site assessment and custom quote. Our experts will design the perfect system for your property within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#fcc42c]" />
                  Mullampara, Manjeri, Malappuram, Kerala
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#fcc42c]" />
                  +91 98461 31500
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#fcc42c]" />
                  info@neogrid.in
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full lg:w-96">
                <h3 className="text-xl font-extrabold text-white mb-6">Get a Free Quote</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#fcc42c] text-sm" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#fcc42c] text-sm" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#fcc42c] text-sm" />
                  <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-[#fcc42c] text-sm">
                    <option value="">Select Service</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                  <button className="w-full bg-[#fcc42c] text-[#011a1e] font-black py-4 rounded-xl hover:bg-white transition-colors text-sm flex items-center justify-center gap-2">
                    Request Free Consultation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
