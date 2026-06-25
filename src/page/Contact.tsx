import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react"


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit logic
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", email: "", service: "", message: "" })
    }, 5000)
  }

  return (
    <div className="bg-[#011a1e] text-white min-h-screen font-sans selection:bg-[#fcc42c] selection:text-[#011a1e]">

      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-40 overflow-hidden">
        {/* Background image banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"
            alt="Contact Us Banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e]/30 via-[#011a1e]/20 to-[#011a1e]/10" />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#04444c] rounded-full blur-[130px] opacity-40 pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-[#fcc42c]/10 rounded-full blur-[130px] opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none"
          >
            Contact <span className="text-[#fcc42c]">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about switching to solar, subsidies, or pricing? Reach out to our engineers for a custom quote or a free site assessment.
          </motion.p>
        </div>
      </section>

      {/* ── CORE CONTACT SECTION ───────────────────────────────────── */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left side: Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-extrabold text-white mb-4"
                >
                  Our Corporate <span className="text-[#fcc42c]">Office</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-400 text-sm md:text-base leading-relaxed mb-8"
                >
                  NeoGrid is an initiative of SMART ENTERPRISES. Visite our headquarters in Manjeri, Malappuram or talk to our experts over phone or email.
                </motion.p>

                {/* Grid of contact details cards */}
                <div className="flex flex-col gap-5">

                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fcc42c]/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3.5 bg-[#04444c] rounded-xl text-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] transition-all duration-300 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Corporate Address</h4>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                        NeoGrid — SMART ENTERPRISES<br />
                        MM 11/505-C, Mullampara, Manjeri,<br />
                        Malappuram, Kerala – 676121
                      </p>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fcc42c]/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3.5 bg-[#04444c] rounded-xl text-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] transition-all duration-300 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Call Representative</h4>
                      <a href="tel:+919846131500" className="text-gray-300 hover:text-[#fcc42c] text-xs md:text-sm font-bold block transition-colors mt-0.5">
                        +91 98461 31500
                      </a>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fcc42c]/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3.5 bg-[#04444c] rounded-xl text-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] transition-all duration-300 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Support Email</h4>
                      <a href="mailto:info@neogrid.in" className="text-gray-300 hover:text-[#fcc42c] text-xs md:text-sm font-bold block transition-colors mt-0.5">
                        info@neogrid.in
                      </a>
                    </div>
                  </motion.div>

                  {/* Hours */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fcc42c]/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3.5 bg-[#04444c] rounded-xl text-[#fcc42c] group-hover:bg-[#fcc42c] group-hover:text-[#011a1e] transition-all duration-300 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Business Hours</h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        Monday – Saturday: 9:00 AM – 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>

            {/* Right side: Lead Generation Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#fcc42c]/10 rounded-full blur-[100px] pointer-events-none" />

                <h3 className="text-2xl font-extrabold text-white mb-2">Request a Free Feasibility Audit</h3>
                <p className="text-gray-400 text-sm mb-8">Fill out the form below and our engineering team will get back to you with structural estimates within 24 hours.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Select Service</label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-[#011a1e] border border-white/10 rounded-xl px-4 py-3.5 text-gray-300 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all text-sm"
                      >
                        <option value="" className="bg-[#011a1e]">Choose solar solution</option>
                        <option value="Residential Solar" className="bg-[#011a1e]">Residential Solar (Home Roof)</option>
                        <option value="Commercial Solar" className="bg-[#011a1e]">Commercial Solar (Buildings)</option>
                        <option value="Industrial Solar" className="bg-[#011a1e]">Industrial Grid Solar</option>
                        <option value="Solar Water Pumping" className="bg-[#011a1e]">Agricultural Solar Pumps</option>
                        <option value="AMC Contracts" className="bg-[#011a1e]">AMC & Maintenance Solutions</option>
                        <option value="Solar Consultation" className="bg-[#011a1e]">End-to-End Solar Audit</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Project Requirements / Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify your roof size, daily consumption details or any specific questions..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#fcc42c] hover:bg-white text-[#011a1e] font-black py-4 rounded-xl transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#fcc42c]/10 hover:shadow-white/5"
                  >
                    Send Inquiry <ArrowRight className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-[#04444c]/80 border border-[#fcc42c]/20 p-4 rounded-xl text-center text-sm text-white flex items-center justify-center gap-2.5 mt-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#fcc42c] shrink-0" />
                        <span>Thank you! Your inquiry has been sent. Our solar engineers will contact you shortly.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GOOGLE MAP EMBED SECTION ───────────────────────────────── */}
      <section className="py-10 bg-[#011a1e] relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-white/10 h-[320px] md:h-[420px] relative shadow-2xl">
            {/* Custom stylized Google Map showing Manjeri location */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1969476906236!2d76.11306351130768!3d11.121021488998811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63f25d3fa9bc3%3A0xe54e60155a3f3b90!2sMullampara%2C%20Manjeri%2C%20Kerala%20676121!5e0!3m2!1sen!2sin!4v1718530000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(30%) contrast(90%)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Styled overlay to blend the map border */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
