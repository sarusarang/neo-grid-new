import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  Building2,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Search,
  X,
} from "lucide-react"

const STORES = [
  {
    id: 1,
    name: "NeoGrid Smart Enterprises",
    type: "Head Office",
    city: "Manjeri",
    district: "Malappuram",
    state: "Kerala",
    pincode: "676121",
    landmark: "Mullampara",
    address: "MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala 676121",
    phone: "+91 98461 31500",
    email: "info@neogrid.in",
    hours: "Mon - Sat, 9:00 AM - 6:00 PM",
    mapQuery: "NeoGrid Smart Enterprises Mullampara Manjeri Malappuram Kerala 676121",
    tags: ["Solar consultation", "Inverters", "Batteries", "Service"],
    areas: ["Manjeri", "Mullampara", "Malappuram", "Pandikkad", "Kondotty"],
    note: "Best branch for solar project planning, product enquiries, and service support.",
    featured: true,
  },
  {
    id: 2,
    name: "NeoGrid Kozhikode Showroom",
    type: "Showroom",
    city: "Kozhikode",
    district: "Kozhikode",
    state: "Kerala",
    pincode: "673001",
    landmark: "SM Street Road",
    address: "NeoGrid Showroom, SM Street Road, Kozhikode, Kerala 673001",
    phone: "+91 90000 00001",
    email: "kozhikode@neogrid.in",
    hours: "Mon - Sat, 9:00 AM - 7:00 PM",
    mapQuery: "SM Street Road Kozhikode Kerala 673001",
    tags: ["Solar panels", "Consultation", "Installation"],
    areas: ["Kozhikode", "Calicut", "Feroke", "Ramanattukara", "Balussery"],
    note: "Visit for product demos, solar package guidance, and installation bookings.",
    featured: false,
  },
  {
    id: 3,
    name: "NeoGrid Tirur Service Centre",
    type: "Service Centre",
    city: "Tirur",
    district: "Malappuram",
    state: "Kerala",
    pincode: "676101",
    landmark: "Tirur town",
    address: "NeoGrid Service Centre, Tirur, Malappuram, Kerala 676101",
    phone: "+91 90000 00002",
    email: "tirur@neogrid.in",
    hours: "Mon - Sat, 8:30 AM - 5:30 PM",
    mapQuery: "Tirur Malappuram Kerala 676101",
    tags: ["Repairs", "AMC", "Battery replacement"],
    areas: ["Tirur", "Tanur", "Kottakkal", "Valanchery", "Ponnani"],
    note: "Recommended for maintenance visits, warranty checks, and battery replacement.",
    featured: false,
  },
  {
    id: 4,
    name: "NeoGrid Perinthalmanna Outlet",
    type: "Outlet",
    city: "Perinthalmanna",
    district: "Malappuram",
    state: "Kerala",
    pincode: "679322",
    landmark: "Calicut Road",
    address: "NeoGrid Outlet, Calicut Road, Perinthalmanna, Malappuram, Kerala 679322",
    phone: "+91 90000 00003",
    email: "perinthalmanna@neogrid.in",
    hours: "Mon - Sat, 9:00 AM - 6:30 PM",
    mapQuery: "Calicut Road Perinthalmanna Malappuram Kerala 679322",
    tags: ["Solar panels", "UPS", "Inverters"],
    areas: ["Perinthalmanna", "Angadipuram", "Mankada", "Melattur", "Cherpulassery"],
    note: "A convenient outlet for backup power, inverter, and solar accessory enquiries.",
    featured: false,
  },
]

const POPULAR_SEARCHES = ["Manjeri", "Malappuram", "Kozhikode", "Tirur", "Perinthalmanna"]

type Store = (typeof STORES)[number]

function getSearchText(store: Store) {
  return [
    store.name,
    store.type,
    store.city,
    store.district,
    store.state,
    store.pincode,
    store.landmark,
    store.address,
    ...store.tags,
    ...store.areas,
  ]
    .join(" ")
    .toLowerCase()
}

function getMapUrl(store: Store) {
  return `https://www.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`
}

function getDirectionsUrl(store: Store) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`
}

function StoreResultCard({
  store,
  selected,
  onSelect,
  index,
}: {
  store: Store
  selected: boolean
  onSelect: () => void
  index: number
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.24, delay: index * 0.04 }}
      onClick={onSelect}
      className={`w-full rounded-lg border p-4 text-left transition-all ${
        selected
          ? "border-[#fcc42c] bg-[#fcc42c]/10 shadow-lg shadow-[#fcc42c]/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
            selected ? "border-[#fcc42c]/40 bg-[#fcc42c] text-[#011a1e]" : "border-white/10 bg-[#022a30] text-[#fcc42c]"
          }`}
        >
          <Building2 className="h-4 w-4" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black leading-tight text-white">{store.name}</span>
            {store.featured && (
              <span className="rounded bg-[#fcc42c] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#011a1e]">
                Main
              </span>
            )}
          </span>

          <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-gray-400">
            <MapPin className="h-3.5 w-3.5 text-[#fcc42c]" />
            {store.city}, {store.district}
          </span>

          <span className="mt-3 flex flex-wrap gap-1.5">
            {store.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-300"
              >
                {tag}
              </span>
            ))}
          </span>
        </span>

        <ArrowUpRight className={`mt-1 h-4 w-4 shrink-0 ${selected ? "text-[#fcc42c]" : "text-gray-500"}`} />
      </div>
    </motion.button>
  )
}

function StoreDetails({ store }: { store: Store | null }) {
  if (!store) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-white/10 bg-white/5 p-6 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#022a30]">
          <MapPin className="h-5 w-5 text-gray-500" />
        </div>
        <h2 className="mt-4 text-xl font-black text-white">No matching store</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Try another city, area, landmark, or pincode to find the closest NeoGrid location.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.article
      key={store.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden rounded-lg border border-white/10 bg-[#041f24] shadow-2xl shadow-black/20"
    >
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#fcc42c] px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-[#011a1e]">
            {store.type}
          </span>
          <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-300">
            {store.pincode}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">{store.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">{store.note}</p>

        <div className="mt-5 grid gap-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#fcc42c]" />
            <span className="leading-relaxed">{store.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 shrink-0 text-[#fcc42c]" />
            <span>{store.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-[#fcc42c]" />
            <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="font-bold hover:text-[#fcc42c]">
              {store.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-[#fcc42c]" />
            <a href={`mailto:${store.email}`} className="font-bold hover:text-[#fcc42c]">
              {store.email}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={getDirectionsUrl(store)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-5 py-3 text-sm font-black text-[#011a1e] transition hover:brightness-110"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
          <a
            href={`tel:${store.phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Call Store
          </a>
        </div>
      </div>

      <div className="h-[280px] bg-[#011a1e] sm:h-[360px] lg:h-[420px]">
        <iframe
          title={`${store.name} map`}
          src={getMapUrl(store)}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "invert(90%) hue-rotate(180deg) brightness(0.82) saturate(0.85)",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.article>
  )
}

export default function StoreLocator() {
  const [query, setQuery] = useState("")
  const [selectedStoreId, setSelectedStoreId] = useState(STORES[0].id)

  const searchTerm = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!searchTerm) return STORES
    return STORES.filter((store) => getSearchText(store).includes(searchTerm))
  }, [searchTerm])

  useEffect(() => {
    if (results.length === 0) return
    if (!results.some((store) => store.id === selectedStoreId)) {
      setSelectedStoreId(results[0].id)
    }
  }, [results, selectedStoreId])

  const selectedStore = results.find((store) => store.id === selectedStoreId) ?? results[0] ?? null
  const hasQuery = searchTerm.length > 0

  return (
    <div className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">
      <section className="relative overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-12">
        <div className="absolute inset-0">
          <img
            src="/1920-1080 contact-01.jpg.jpeg"
            alt="NeoGrid store locator"
            loading="eager"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#011a1e]/55 via-[#011a1e]/55 to-[#011a1e]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-4xl border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[#fcc42c]">
              <MapPin className="h-3.5 w-3.5" />
              Store Locator
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Find a NeoGrid store near you.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
              Enter a city, area, landmark, or pincode and we will show the matching showroom or service centre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-7 max-w-3xl"
          >
            <div className="flex flex-col gap-3 rounded-xl border border-white/15 bg-[#011a1e]/80 p-2 shadow-2xl shadow-black/20 backdrop-blur-md sm:flex-row">
              <label className="relative min-h-14 flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#fcc42c]" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Manjeri, Tirur, 676121..."
                  className="h-14 w-full rounded-lg border border-transparent bg-white/5 pl-12 pr-11 text-base font-semibold text-white outline-none transition placeholder:text-gray-500 focus:border-[#fcc42c]/70 focus:bg-white/10"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear location search"
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <button
                type="button"
                onClick={() => {
                  if (results[0]) setSelectedStoreId(results[0].id)
                }}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-5 text-sm font-black text-[#011a1e] transition hover:brightness-110 sm:w-36"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Popular store searches">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gray-300 transition hover:border-[#fcc42c]/50 hover:text-[#fcc42c]"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-5 flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#fcc42c]">
                {hasQuery ? "Search Results" : "Available Locations"}
              </p>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`${results.length}-${query}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-1 text-xl font-black text-white"
                >
                  {hasQuery
                    ? results.length > 0
                      ? `${results.length} store${results.length === 1 ? "" : "s"} found for "${query}"`
                      : `No stores found for "${query}"`
                    : `Showing all ${STORES.length} NeoGrid locations`}
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="text-sm text-gray-400">
              {selectedStore ? `${selectedStore.city}, ${selectedStore.state}` : "Try a nearby town or district"}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <div className="order-2 grid gap-3 lg:order-1">
              <AnimatePresence mode="popLayout">
                {results.length > 0 ? (
                  results.map((store, index) => (
                    <StoreResultCard
                      key={store.id}
                      store={store}
                      index={index}
                      selected={selectedStore?.id === store.id}
                      onSelect={() => setSelectedStoreId(store.id)}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-5"
                  >
                    <p className="font-black text-white">Nothing matched that location.</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      Search for Manjeri, Malappuram, Kozhikode, Tirur, Perinthalmanna, or a pincode.
                    </p>
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#fcc42c] px-4 py-3 text-sm font-black text-[#011a1e]"
                    >
                      <X className="h-4 w-4" />
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="order-1 lg:sticky lg:top-24 lg:order-2">
              <StoreDetails store={selectedStore} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
