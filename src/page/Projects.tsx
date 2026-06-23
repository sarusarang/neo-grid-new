import { useState, useMemo, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { MapPin, Calendar, X, Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface Project {
  id: number
  title: string
  category: string
  capacity: string
  location: string
  year: string
  panels: string
  inverter: string
  battery?: string
  co2Offset: string
  desc: string
  img: string
  highlights: string[]
}

interface GalleryItem {
  id: number
  title: string
  category: string
  location: string
  img: string
  desc: string
}


// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Malappuram Green Hills Villa",
    category: "Residential",
    capacity: "15 kW",
    location: "Manjeri, Kerala",
    year: "2025",
    panels: "36x 450W Mono PERC",
    inverter: "15kW Hybrid Smart Inverter",
    battery: "30kWh Lithium Battery Storage",
    co2Offset: "12 Tons/yr",
    img: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=800",
    desc: "A premium off-grid home solar installation designed to match the modern architecture of the villa while providing complete energy independence.",
    highlights: ["24/7 Smart Battery Backup", "Zero Dependency on Grid", "App-Based Live Tracking", "Net Zero Footprint"]
  },
  {
    id: 2,
    title: "Apex Manufacturing Plant",
    category: "Industrial",
    capacity: "250 kW",
    location: "Industrial Area, Malappuram",
    year: "2024",
    panels: "550x 455W Bifacial Mono",
    inverter: "2x 125kW String Inverters",
    co2Offset: "185 Tons/yr",
    img: "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=800",
    desc: "Large-scale grid-tied solar system to power heavy machinery during peak hours, significantly reducing grid energy cost and boosting green manufacturing credentials.",
    highlights: ["Bifacial Solar Technology", "High Voltage Safety Systems", "Zero Export Controller", "ROI achieved in 3.2 years"]
  },
  {
    id: 3,
    title: "St. Mary's Academy Rooftop",
    category: "Commercial",
    capacity: "80 kW",
    location: "Perinthalmanna, Kerala",
    year: "2025",
    panels: "160x 500W Bifacial",
    inverter: "80kW Grid-Tie Inverter",
    co2Offset: "64 Tons/yr",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    desc: "Educational institute rooftop installation with net-metering support, generating surplus power sold back to the grid during holidays and weekends.",
    highlights: ["Net-Metering Approval", "Structural Safety Certifications", "Online Monitoring Console", "Student Educational Dashboard"]
  },
  {
    id: 4,
    title: "Horizon Commercial Complex",
    category: "Commercial",
    capacity: "120 kW",
    location: "Kozhikode, Kerala",
    year: "2024",
    panels: "240x 500W Mono-crystalline",
    inverter: "120kW Smart Inverter",
    co2Offset: "96 Tons/yr",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=800",
    desc: "Sleek elevated rooftop structure designed to allow parking underneath, generating clean power for retail outlets while providing shade for cars.",
    highlights: ["Car-Port Structure Design", "Optimized Parking Layouts", "LED Underlighting Integration", "Zero Maintenance Structure"]
  },
  {
    id: 5,
    title: "Kattuppara Agri-Farm Solar Pump",
    category: "Agricultural",
    capacity: "20 kW",
    location: "Wandoor, Kerala",
    year: "2025",
    panels: "40x 500W Mono-crystalline",
    inverter: "20kW VFD Solar Pump Inverter",
    co2Offset: "16 Tons/yr",
    img: "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=800",
    desc: "Solar powered microgrid supporting automatic drip irrigation systems and solar water pumping across 15 acres of diverse crop cultivation.",
    highlights: ["Variable Frequency Drive", "Automatic Pump Protection", "Off-grid Battery Backup", "Remotely Monitored Flows"]
  },
  {
    id: 6,
    title: "Eco-Resort Off-Grid Microgrid",
    category: "Residential",
    capacity: "45 kW",
    location: "Wayanad, Kerala",
    year: "2024",
    panels: "90x 500W PERC",
    inverter: "45kW Hybrid Inverter Cluster",
    battery: "120kWh LFP Battery Bank",
    co2Offset: "36 Tons/yr",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    desc: "Hybrid solar system with battery backup and silent diesel generator integration ensuring 24/7 power to luxury eco-villas in dense rain forest terrain.",
    highlights: ["Smart Genset Controller", "Extreme Weather Protection", "LFP High Capacity Batteries", "Cloud Diagnostics Ready"]
  }
]

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    title: "Monjeri Residential Array",
    category: "Residential",
    location: "Manjeri, Kerala",
    img: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=800",
    desc: "A premium 15kW off-grid solar residential system installed on a modern contemporary villa. Showcases custom mounting frames engineered to match the roof slope."
  },
  {
    id: 2,
    title: "Apex Factory Roof Installation",
    category: "Industrial",
    location: "Industrial Area, Malappuram",
    img: "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=800",
    desc: "Completed 250kW grid-tied commercial rooftop installation powering a high-demand injection molding manufacturing unit."
  },
  {
    id: 3,
    title: "Eco-Villas Off-Grid Panels",
    category: "Residential",
    location: "Wayanad, Kerala",
    img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800",
    desc: "45kW solar microgrid integrated seamlessly with nature-inspired architecture for full power independence in challenging weather conditions."
  },
  {
    id: 4,
    title: "Academy Net-Metered Setup",
    category: "Commercial",
    location: "Perinthalmanna, Kerala",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    desc: "Rooftop distribution layout spanning over 80kW, utilizing premium high-yield bifacial panels to catch light reflected from the white roof membrane."
  },
  {
    id: 5,
    title: "Smart Commercial Solar Carport",
    category: "Commercial",
    location: "Kozhikode, Kerala",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=800",
    desc: "Elevated structure design functioning as both a premium shade canopy for executive cars and a high-yield 120kW clean power generator."
  },
  {
    id: 6,
    title: "High-Capacity LFP Battery Racks",
    category: "Equipment",
    location: "NeoGrid Lab, Kerala",
    img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=800",
    desc: "Close-up of custom-built 120kWh Lithium Iron Phosphate (LFP) battery storage racks, monitored via active smart battery management systems (BMS)."
  },
  {
    id: 7,
    title: "Smart Hybrid Inverter System",
    category: "Equipment",
    location: "Wayanad Eco-Resort",
    img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
    desc: "Sleek wall installation of dual 15kW Hybrid Smart Inverters in a clean parallel config, ensuring auto-switching between solar, battery, grid, and generator."
  },
  {
    id: 8,
    title: "Agricultural Micro-Irrigation Pump",
    category: "Agricultural",
    location: "Wandoor, Kerala",
    img: "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=800",
    desc: "Solar powered high-torque variable frequency drive pumping station supporting automatic drip irrigation system for 15 acres of farming land."
  },
  {
    id: 9,
    title: "Quality Inspection and Testing",
    category: "Installation",
    location: "Apex Plant Site",
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    desc: "NeoGrid engineering team performing testing and panel string current measurements to verify peak generation performance before grid sync."
  },
  {
    id: 10,
    title: "High-Efficiency Solar Cell Tech",
    category: "Equipment",
    location: "Monjeri Site",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    desc: "Detailed close-up showing the gridlines of a high-efficiency mono-crystalline solar cell designed to maximize ambient and diffuse light conversion."
  },
  {
    id: 11,
    title: "Rural Agri Solar Station",
    category: "Agricultural",
    location: "Nilambur, Kerala",
    img: "https://images.unsplash.com/photo-1548613053-220f4a80fb4f?auto=format&fit=crop&q=80&w=800",
    desc: "20kW ground mount tracking system designed specifically to withstand regional wind profiles and heavy seasonal monsoons in rural farm fields."
  },
  {
    id: 12,
    title: "Malappuram Residential Setup",
    category: "Residential",
    location: "Malappuram, Kerala",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    desc: "Sleek elevated rooftop structure maximizing footprint usage on a modern flat-roof villa while creating functional shaded workspace underneath."
  }
]

// ─── COUNTER COMPONENT ────────────────────────────────────────────────────────

function animate(from: number, to: number, options: { duration: number; ease: string; onUpdate: (v: number) => void }) {
  let startTime: number | null = null
  let rafId: number

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / (options.duration * 1000), 1)

    // Ease out quad
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

function StatCounter({ from, to, suffix, className }: { from: number; to: number; suffix: string; className?: string }) {
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

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"projects" | "gallery">("projects")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<number>(0)

  // Categories list
  const categories = useMemo(() => {
    const items = activeTab === "projects" ? PROJECTS : GALLERY_IMAGES
    const cats = new Set(items.map(item => item.category))
    return ["All", ...Array.from(cats)]
  }, [activeTab])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.capacity.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Filtered gallery images
  const filteredGalleryImages = useMemo(() => {
    return GALLERY_IMAGES.filter(img => {
      const matchesCategory = selectedCategory === "All" || img.category === selectedCategory
      const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Count items per category helper
  const getCategoryCount = (category: string) => {
    const items = activeTab === "projects" ? PROJECTS : GALLERY_IMAGES
    if (category === "All") return items.length
    return items.filter(item => item.category === category).length
  }

  // Handle Tab Change
  const handleTabChange = (tab: "projects" | "gallery") => {
    setActiveTab(tab)
    setSelectedCategory("All")
    setSearchQuery("")
  }

  // Navigation handlers for Gallery Lightbox
  const handlePrevImage = () => {
    if (selectedGalleryIndex === null || filteredGalleryImages.length === 0) return
    setDirection(-1)
    setSelectedGalleryIndex((prev) => (prev !== null ? (prev - 1 + filteredGalleryImages.length) % filteredGalleryImages.length : null))
  }

  const handleNextImage = () => {
    if (selectedGalleryIndex === null || filteredGalleryImages.length === 0) return
    setDirection(1)
    setSelectedGalleryIndex((prev) => (prev !== null ? (prev + 1) % filteredGalleryImages.length : null))
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return
      if (e.key === "Escape") setSelectedGalleryIndex(null)
      if (e.key === "ArrowLeft") handlePrevImage()
      if (e.key === "ArrowRight") handleNextImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedGalleryIndex, filteredGalleryImages])


  return (
    <div className="bg-[#011a1e] text-white min-h-screen font-sans selection:bg-[#fcc42c] selection:text-[#011a1e]">

      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-40 overflow-hidden">
        {/* Background image banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
            alt="Solar Panels Banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e]/30 via-[#011a1e]/10 to-[#011a1e]/10" />
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
            Project <span className="text-[#fcc42c]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Explore how we're transforming homes, farms, and businesses across Kerala with premium, high-efficiency solar networks.
          </motion.p>
        </div>
      </section>

      {/* ── STATS COUNTER BAND ─────────────────────────────────────── */}
      <section className="bg-[#04444c]/30 border-y border-white/5 py-10 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <StatCounter from={0} to={530} suffix=" kW+" className="text-3xl md:text-4xl font-black text-[#fcc42c] mb-1" />
              <p className="text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wider">Total Capacity</p>
            </div>
            <div>
              <StatCounter from={0} to={180} suffix="+" className="text-3xl md:text-4xl font-black text-[#fcc42c] mb-1" />
              <p className="text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wider">Happy Clients</p>
            </div>
            <div>
              <StatCounter from={0} to={99} suffix="%" className="text-3xl md:text-4xl font-black text-[#fcc42c] mb-1" />
              <p className="text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wider">On-Time Delivery</p>
            </div>
            <div>
              <StatCounter from={0} to={400} suffix=" Tons" className="text-3xl md:text-4xl font-black text-[#fcc42c] mb-1" />
              <p className="text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wider">CO2 Saved / Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS SELECTOR & FILTERS ────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12 relative z-20">
            <div className="bg-white/5 border border-white/10 rounded-full p-1.5 flex gap-1 relative backdrop-blur-md">
              <button
                onClick={() => handleTabChange("projects")}
                className={`relative px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  activeTab === "projects" ? "text-[#011a1e]" : "text-gray-300 hover:text-white"
                }`}
              >
                {activeTab === "projects" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#fcc42c] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Projects</span>
              </button>
              <button
                onClick={() => handleTabChange("gallery")}
                className={`relative px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  activeTab === "gallery" ? "text-[#011a1e]" : "text-gray-300 hover:text-white"
                }`}
              >
                {activeTab === "gallery" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#fcc42c] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Photo Gallery</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat
                      ? "bg-[#fcc42c] text-[#011a1e] shadow-lg shadow-[#fcc42c]/20"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat ? "bg-[#011a1e]/10 text-[#011a1e]" : "bg-white/10 text-gray-400"}`}>
                      {getCategoryCount(cat)}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={activeTab === "projects" ? "Search projects, location..." : "Search photos, tech, location..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 pl-11 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#fcc42c] focus:bg-white/10 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>

          </div>

          {/* ── PROJECTS GRID ─────────────────────────────────────────── */}
          {activeTab === "projects" && (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#fcc42c]/40 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-[#04444c]/20"
                  >
                    {/* Photo area */}
                    <div className="relative h-60 md:h-64 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e] via-[#011a1e]/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Category & Capacity Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#04444c]/80 backdrop-blur-md text-[#fcc42c] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full border border-white/10">
                          {project.category}
                        </span>
                        <span className="bg-[#fcc42c] text-[#011a1e] text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-md">
                          {project.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Info area */}
                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#fcc42c]" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#fcc42c] transition-colors mb-3 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6">
                        {project.desc}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-bold group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#fcc42c]" /> {project.year}
                        </span>
                        <span className="flex items-center gap-1 text-[#fcc42c] group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── PHOTO GALLERY GRID ───────────────────────────────────── */}
          {activeTab === "gallery" && (
            <AnimatePresence mode="wait">
              <motion.div
                key="gallery-grid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
              >
                {filteredGalleryImages.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => {
                      setDirection(0)
                      setSelectedGalleryIndex(idx)
                    }}
                    className={`group cursor-pointer rounded-3xl overflow-hidden relative break-inside-avoid mb-5 border border-white/10 hover:border-[#fcc42c]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#04444c]/30 ${
                      idx === 0 || idx === 4 || idx === 8 ? "aspect-[4/3]" :
                      idx === 1 || idx === 6 ? "aspect-[3/4]" :
                      idx === 2 || idx === 7 ? "aspect-[4/3]" :
                      idx === 3 || idx === 9 ? "aspect-[3/4]" :
                      "aspect-[4/3]"
                    }`}
                  >
                    {/* Full-bleed image */}
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Permanent bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e]/90 via-[#011a1e]/30 to-transparent" />

                    {/* Category badge top-left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#fcc42c] text-[#011a1e] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>

                    {/* View icon top-right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white rotate-[-45deg]" />
                      </div>
                    </div>

                    {/* Bottom info — always visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h4 className="text-white font-extrabold text-lg leading-snug mb-1 group-hover:text-[#fcc42c] transition-colors duration-300">
                        {item.title}
                      </h4>

                      {/* Location — slides up on hover */}
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5 text-gray-300 text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#fcc42c] shrink-0" />
                          <span className="font-medium">{item.location}</span>
                        </div>
                      </div>

                      {/* Description — slides up further on hover */}
                      <div className="overflow-hidden">
                        <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Hover glow ring effect */}
                    <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 group-hover:ring-[#fcc42c]/30 transition-all duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {((activeTab === "projects" && filteredProjects.length === 0) ||
            (activeTab === "gallery" && filteredGalleryImages.length === 0)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl"
            >
              <p className="text-gray-400 text-lg mb-2">No items found matching your filters.</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="text-[#fcc42c] font-extrabold text-sm hover:underline"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── DETAIL MODAL (LIGHTBOX) ────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#011a1e]/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#022a30] border border-white/10 rounded-3xl max-w-7xl w-full overflow-hidden shadow-2xl relative my-auto flex flex-col md:flex-row h-[90vh] md:h-[580px]"
            >

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#011a1e]/80 border border-white/10 text-white hover:bg-white hover:text-[#011a1e] transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Column */}
              <div className="w-full md:w-1/2 relative h-[35%] md:h-full shrink-0 overflow-hidden bg-[#011a1e]">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

                {/* Floating Specs */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#fcc42c] text-xs font-black uppercase tracking-widest mb-1">{selectedProject.category}</p>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="w-4 h-4 text-[#fcc42c]" /> {selectedProject.location}
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col h-[65%] md:h-full overflow-y-auto">
                <span className="inline-flex items-center gap-1.5 bg-[#fcc42c]/10 text-[#fcc42c] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full self-start mb-6 border border-[#fcc42c]/20">
                  System Size: {selectedProject.capacity}
                </span>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {selectedProject.desc}
                </p>

                {/* Technical Specs List */}
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3.5 border-b border-white/5 pb-2">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Solar Panels</p>
                    <p className="text-xs md:text-sm text-white font-bold">{selectedProject.panels}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Inverter System</p>
                    <p className="text-xs md:text-sm text-white font-bold">{selectedProject.inverter}</p>
                  </div>
                  {selectedProject.battery && (
                    <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                      <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Battery Storage</p>
                      <p className="text-xs md:text-sm text-white font-bold">{selectedProject.battery}</p>
                    </div>
                  )}
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">CO2 Offset</p>
                    <p className="text-xs md:text-sm text-[#fcc42c] font-black">{selectedProject.co2Offset}</p>
                  </div>
                </div>

                {/* Highlights checklist */}
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3.5 border-b border-white/5 pb-2">Key Highlights</h4>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {selectedProject.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fcc42c]" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Consultation CTA */}
                <div className="mt-auto">
                  <button
                    onClick={() => { setSelectedProject(null); }}
                    className="w-full bg-[#fcc42c] hover:bg-white text-[#011a1e] font-black py-3.5 rounded-xl transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Inquire About Similar Setup <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GALLERY MODAL (LIGHTBOX SLIDER) ─────────────────────────── */}
      <AnimatePresence>
        {selectedGalleryIndex !== null && filteredGalleryImages[selectedGalleryIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#011a1e]/95 backdrop-blur-xl p-4 md:p-10 select-none"
          >
            {/* Close button top right */}
            <button
              onClick={() => setSelectedGalleryIndex(null)}
              className="absolute top-6 right-6 z-[160] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-[#011a1e] hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[160] p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#fcc42c] hover:text-[#011a1e] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer hidden sm:flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[160] p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#fcc42c] hover:text-[#011a1e] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer hidden sm:flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content Area */}
            <div className="max-w-5xl w-full flex flex-col items-center gap-6 relative">
              {/* Image Frame with sliding animations */}
              <div className="relative w-full aspect-video sm:h-[60vh] max-h-[550px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={selectedGalleryIndex}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 300 : dir < 0 ? -300 : 0,
                        opacity: 0,
                        scale: 0.95
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        scale: 1
                      },
                      exit: (dir: number) => ({
                        x: dir < 0 ? 300 : dir > 0 ? -300 : 0,
                        opacity: 0,
                        scale: 0.95
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 350, damping: 35 },
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.25 }
                    }}
                    src={filteredGalleryImages[selectedGalleryIndex].img}
                    alt={filteredGalleryImages[selectedGalleryIndex].title}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Mobile tap targets on the sides of the image itself */}
                <div className="absolute inset-0 flex justify-between pointer-events-none sm:hidden">
                  <div
                    onClick={handlePrevImage}
                    className="w-1/3 h-full pointer-events-auto cursor-pointer"
                  />
                  <div
                    onClick={handleNextImage}
                    className="w-1/3 h-full pointer-events-auto cursor-pointer"
                  />
                </div>
              </div>

              {/* Bottom text info card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="w-full bg-[#022a30]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 text-center sm:text-left relative shadow-xl max-w-4xl"
              >
                {/* Index marker */}
                <div className="absolute top-5 right-5 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {selectedGalleryIndex + 1} / {filteredGalleryImages.length}
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                  <span className="bg-[#fcc42c]/10 border border-[#fcc42c]/30 text-[#fcc42c] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    {filteredGalleryImages[selectedGalleryIndex].category}
                  </span>
                  {filteredGalleryImages[selectedGalleryIndex].location && (
                    <span className="bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#fcc42c]" />
                      {filteredGalleryImages[selectedGalleryIndex].location}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
                  {filteredGalleryImages[selectedGalleryIndex].title}
                </h3>

                <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-3xl">
                  {filteredGalleryImages[selectedGalleryIndex].desc}
                </p>

                {/* Mobile visible navigation helper/buttons */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5 sm:hidden">
                  <button
                    onClick={handlePrevImage}
                    className="flex items-center gap-1.5 text-xs text-[#fcc42c] font-black uppercase tracking-wider cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    Swipe or Tap Sides to Navigate
                  </span>
                  <button
                    onClick={handleNextImage}
                    className="flex items-center gap-1.5 text-xs text-[#fcc42c] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA BOTTOM SECTION ─────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#04444c] rounded-full blur-[120px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="bg-[#022a30] border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Have a Specific Project in Mind?</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-8">
              Whether it's a cozy home rooftop or a massive industrial plant, we custom design every grid system to maximize energy yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919846131500" className="bg-[#fcc42c] text-[#011a1e] hover:bg-white font-black px-8 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wider">
                Call +91 98461 31500
              </a>
              <Link to="/service" className="border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wider">
                Get Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
