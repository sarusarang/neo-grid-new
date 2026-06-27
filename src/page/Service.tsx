import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Sun, Zap, Battery, Shield, Cpu, Wrench, ArrowRight, CheckCircle, MapPin, Phone, Mail, ShoppingCart, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import ServicesSection from "@/components/common/ServicesSection"



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



// Simple local counter
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

// CTA types for service cards
type ServiceCta = | { type: "buy"; href: string } | { type: "consult"; phone: string } | { type: "contact"; phone: string }


interface Service {
  icon: React.ReactNode
  title: string
  desc: string
  points: string[]
  img: string
  color: string
  cta: ServiceCta
  ctaLabel: string
}


const SERVICES: Service[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Smart Inverter & UPS",
    desc: "Next-generation lithium backup system offering smarter, longer, and safer performance for homes and businesses.",
    points: ["Li-On Inverter & UPS", "HKVA Inverter & UPS", "Hybrid Inverters", "Solar Inverter and UPS"],
    img: "/what we offer-01.jpg.jpeg",
    color: "#04444c",
    cta: { type: "buy", href: "/products" },
    ctaLabel: "Buy Now!",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Battery Storage",
    desc: "Advanced Li-Ion battery systems store excess energy and provide reliable backup power whenever you need it.",
    points: ["Lithium Iron Phosphate", "Scalable Capacity", "Smart BMS", "Emergency Backup"],
    img: "/what we offer-02.jpg.jpeg",
    color: "#078291",
    cta: { type: "buy", href: "/products" },
    ctaLabel: "Buy Now!",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Solar Energy Solutions Consultancy",
    desc: "Comprehensive consultancy for smart lithium inverter, UPS, and energy backup systems designed to deliver reliable, efficient, and uninterrupted power solutions.",
    points: ["Energy Requirement Assessment", "Power Load Evaluation", "Customized Backup Solutions", "Efficiency & Cost Optimization"],
    img: "/what we offer-03.jpg.jpeg",
    color: "#022a30",
    cta: { type: "consult", phone: "+919846131500" },
    ctaLabel: "Get Free Consultation",
  },
  {
    icon: <Sun className="w-8 h-8" />,
    title: "Solar System Installation",
    desc: "Committed to high-performance solar systems for sustainable and uninterrupted energy solutions.",
    points: ["Customized System Design", "High-Efficiency Solar Components", "Professional Installation & Integration", "Reliable Performance & Energy Savings"],
    img: "/what we offer-04.jpg.jpeg",
    color: "#04444c",
    cta: { type: "contact", phone: "+919846131500" },
    ctaLabel: "Contact Now",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Introducing Smart Technology",
    desc: "Advanced technology powers smarter, safer, and more reliable energy backup solutions.",
    points: ["Intelligent Power Management", "Real-Time Performance Monitoring", "Stable Voltage Regulation", "Automatic Backup Switching"],
    img: "/what we offer-05.jpg.jpeg",
    color: "#078291",
    cta: { type: "buy", href: "/products" },
    ctaLabel: "Buy Now!",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Annual Maintenance & Support",
    desc: "Comprehensive maintenance services to keep your Li-Ion inverter, UPS, and solar power systems operating at peak performance year after year.",
    points: ["Regular System Inspections", "Battery Health Monitoring", "Performance & Efficiency Reports", "24/7 Technical Support"],
    img: "/what we offer-06.jpg.jpeg",
    color: "#022a30",
    cta: { type: "contact", phone: "+919876543210" },
    ctaLabel: "Contact Now!",
  },
]




// ── SERVICE CTA BUTTON ────────────────────────────────────────────────────────
// Same sliding-fill animation as the header's "Get a Quote" button
function ServiceCtaButton({ service }: { service: Service }) {

  const { cta, ctaLabel } = service

  const baseClass =
    "group relative mt-6 w-full overflow-hidden rounded-xl border font-bold text-sm px-5 py-3 flex items-center justify-center gap-2 transition-colors"


  if (cta.type === "buy") {
    return (
      <Link
        to={cta.href}
        className={`${baseClass} border-[#fcc42c]/60 bg-[#fcc42c]/10 text-[#fcc42c] hover:border-[#fcc42c]`}
      >
        <div className="absolute inset-0 w-0 bg-[#fcc42c] transition-all duration-250 ease-out group-hover:w-full" />
        <ShoppingCart className="relative w-4 h-4 group-hover:text-[#011a1e] transition-colors" />
        <span className="relative group-hover:text-[#011a1e] transition-colors">{ctaLabel}</span>
      </Link>
    )
  }


  if (cta.type === "consult") {
    return (
      <a
        href={`tel:${cta.phone}`}
        className={`${baseClass} border-white/20 bg-white/5 text-white hover:border-white/40`}
      >
        <div className="absolute inset-0 w-0 bg-white transition-all duration-250 ease-out group-hover:w-full" />
        <MessageCircle className="relative w-4 h-4 group-hover:text-[#011a1e] transition-colors" />
        <span className="relative group-hover:text-[#011a1e] transition-colors">{ctaLabel}</span>
      </a>
    )
  }


  // type === "contact"
  return (
    <a
      href={`tel:${cta.phone}`}
      className={`${baseClass} border-[#04444c] bg-[#04444c]/20 text-white hover:border-[#04444c]`}
    >
      <div className="absolute inset-0 w-0 bg-[#04444c] transition-all duration-250 ease-out group-hover:w-full" />
      <Phone className="relative w-4 h-4 group-hover:text-white transition-colors" />
      <span className="relative group-hover:text-white transition-colors">{ctaLabel}</span>
    </a>
  )

}



// Process data array
const PROCESS: { step: string, title: string, desc: string }[] = [
  { step: "01", title: "Site Visit", desc: "We assess your roof, load, and grid connection to recommend the perfect system." },
  { step: "02", title: "Custom Design", desc: "Our engineers design a system optimized for your specific orientation and energy goals." },
  { step: "03", title: "Permits & Approvals", desc: "We handle all DISCOM approvals, net-metering applications, and subsidy paperwork." },
  { step: "04", title: "Installation", desc: "Certified teams complete the full installation in as little as one working day." },
  { step: "05", title: "Commissioning", desc: "System is tested, app configured, and you're handed over with full training." },
  { step: "06", title: "Ongoing Support", desc: "Annual AMC visits and 24/7 remote monitoring keep your system at 100%." },
]



// Industry data array
const INDUSTRIES: { name: string, img: string }[] = [
  { name: "Residential Homes", img: "/Industries We Serve-01.jpg.jpeg" },
  { name: "Commercial Buildings", img: "/Industries We Serve-02.jpg.jpeg" },
  { name: "Agricultural Farms", img: "/Industries We Serve-03.jpg.jpeg" },
  { name: "Industrial Plants", img: "/Industries We Serve-04.jpg.jpeg" },
  { name: "Educational Institutes", img: "/Industries We Serve-05.jpg.jpeg" },
  { name: "Healthcare Facilities", img: "/Industries We Serve-06.jpg.jpeg" },
]



// Why us data array
const WHY_US: { value: number, suffix: string, label: string }[] = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 25, suffix: "yr", label: "Performance Warranty" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
]



// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Service() {


  return (


    <div className="bg-[#011a1e] text-white min-h-screen">


      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <section className="relative py-40 sm:py-20 md:py-32 overflow-hidden">

        {/* Background image banner */}
        <div className="absolute inset-0 z-0">

          <img
            src="/1920-1080 service-01.jpg.jpeg"
            alt="Solar"
            loading="lazy"
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#011a1e]/30 via-[#011a1e]/20 to-[#011a1e]/10" />

        </div>

        {/* Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#04444c] rounded-full blur-[130px] opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-[#fcc42c]/10 rounded-full blur-[130px] opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >

            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#fcc42c]" />
              <span className="text-[#fcc42c] text-xs font-black uppercase tracking-widest">Our Services</span>
              <div className="h-px w-10 bg-[#fcc42c]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
              Our <span className="text-[#fcc42c]">Services</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Smart solutions delivering reliable power backup and efficient energy management everywhere.
            </p>

          </motion.div>

        </div>

      </section>


      {/* ── 2. WHY US STATS ──────────────────────────────────────── */}
      <section className="py-5 sm:py-10 bg-[#04444c]">

        <div className="container mx-auto px-2 lg:px-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

            {WHY_US.map((item, i) => (

              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-2"
              >

                <Counter
                  from={0}
                  to={item.value}
                  suffix={item.suffix}
                  className="text-3xl md:text-5xl font-black text-[#fcc42c] mb-2"
                />

                <p className="text-white/80 text-xs md:text-sm font-semibold uppercase tracking-wider wrap-break-words">{item.label}</p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>



      {/* ── 3. SERVICE CARDS GRID ────────────────────────────────── */}
      <section id="services" className="py-8 sm:py-14 bg-[#011a1e]">

        <div className="container mx-auto px-4 lg:px-8">

          <div className="text-center mb-8 sm:mb-14">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              What We <span className="text-[#fcc42c]">Offer</span>
            </motion.h2>

            <p className="text-gray-400 text-lg max-w-5xl mx-auto">Unique & highly efficient solutions for  Smart Power Backup and Reliable Solar energy</p>

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
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#011a1e] to-transparent" />

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
                  <ServiceCtaButton service={service} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Services Section */}
      <ServicesSection />



      {/* ── 4. PROCESS STEPS ─────────────────────────────────────── */}
      <section className="py-8 sm:py-14 bg-[#022a30]">

        <div className="container mx-auto px-4 lg:px-8">

          <div className="text-center mb-8 sm:mb-16">
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
      <section className="py-8 sm:py-14 bg-[#011a1e]">

        <div className="container mx-auto px-4 lg:px-8">

          <div className="text-center mb-8 sm:mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer"
              >
                <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-extrabold text-base md:text-lg leading-tight">{ind.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ── 6. CTA CONTACT BAND ──────────────────────────────────── */}
      <section className="py-8 sm:py-20 bg-[#04444c] relative overflow-hidden">

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
