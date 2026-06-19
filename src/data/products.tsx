import { Sun, Zap, Battery, Cpu, Wind, Wrench } from "lucide-react"

// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

export interface ColorOption {
  name: string
  hex: string
}

export interface SpecItem {
  label: string
  sublabel: string
}

export interface ProductItem {
  id: string
  name: string
  rating: number
  reviews: number
  price: number
  originalPrice: number
  emi: string
  colors: ColorOption[]
  sizes: string[]
  sizePrices: Record<string, { price: number; originalPrice: number }>
  image: string
  badge?: string
  specLabel: string
  description: string
  hasSmartApp?: boolean
  features: string[]
  warranty: string
  technicalSpecs: Record<string, string>
}

export interface CategoryData {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  tagline: string
  heroBadge: string
  heroStats: SpecItem[]
  heroImage: string
  products: ProductItem[]
}

// ─── SHARED PRODUCT DATA ──────────────────────────────────────────────────────

export const CATEGORIES: CategoryData[] = [
  {
    id: "panels",
    name: "Solar Panels",
    icon: <Sun className="w-5 h-5" />,
    tagline: "High Efficiency | Bifacial | Weatherproof",
    heroBadge: "Bifacial Pro Series",
    description:
      "Our wide range of high-efficiency monocrystalline, polycrystalline, and bifacial solar panels delivers maximum solar energy yield, weather resistance, and smart tracking compatibility for every application.",
    heroImage:
      "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "22.8% Efficiency", sublabel: "Best in class cell tech" },
      { label: "Bifacial Yield", sublabel: "Up to 30% rear power gain" },
    ],
    products: [
      {
        id: "mono-400",
        name: "Mono 400W Solar Panel",
        rating: 4.8,
        reviews: 124,
        price: 12499,
        originalPrice: 18500,
        emi: "₹1,041/month (12 months No Cost EMI)",
        colors: [
          { name: "Anodized Black", hex: "#111111" },
          { name: "Silver Frame", hex: "#b4b4b4" },
        ],
        sizes: ["380W", "400W", "420W"],
        sizePrices: {
          "380W": { price: 11999, originalPrice: 17500 },
          "400W": { price: 12499, originalPrice: 18500 },
          "420W": { price: 13499, originalPrice: 19999 },
        },
        image:
          "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "Cell Efficiency: 21.8%",
        description:
          "Monocrystalline panels optimized for low-light performance and high spatial energy yield. Designed with advanced passivated emitter rear cell (PERC) technology for superior longevity.",
        features: [
          "Advanced monocrystalline cell construction",
          "Excellent performance under cloudy and low-light conditions",
          "Heavy snow load (5400 Pa) and wind load (2400 Pa) certification",
          "IP68 waterproof rating junction box for all-weather durability",
        ],
        warranty:
          "10-Year Product Material Warranty, 25-Year Linear Power Output Warranty",
        technicalSpecs: {
          "Nominal Power": "400W (size dependent)",
          "Cell Type": "Monocrystalline PERC (156mm)",
          "Module Efficiency": "21.8%",
          "Open Circuit Voltage (Voc)": "49.2 V",
          "Short Circuit Current (Isc)": "10.3 A",
          "Maximum System Voltage": "1500V DC",
          Dimensions: "2008 x 1002 x 35 mm",
          Weight: "22.5 kg",
          "Frame Material": "Anodized Aluminum Alloy",
          Glass: "3.2mm High Transmission Tempered Glass",
          "Junction Box": "IP68 Rated, 3 bypass diodes",
        },
      },
      {
        id: "poly-350",
        name: "Poly 350W Solar Panel",
        rating: 4.6,
        reviews: 89,
        price: 9999,
        originalPrice: 15000,
        emi: "₹833/month (12 months No Cost EMI)",
        colors: [{ name: "Standard Blue", hex: "#1c3d5a" }],
        sizes: ["330W", "350W"],
        sizePrices: {
          "330W": { price: 9499, originalPrice: 14000 },
          "350W": { price: 9999, originalPrice: 15000 },
        },
        image:
          "https://images.unsplash.com/photo-1592833159057-69de41dbec84?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Cell Efficiency: 19.5%",
        description:
          "High-grade cost-effective multi-crystalline modules designed for large commercial deployments, offering long term durability and reliable energy production.",
        features: [
          "Robust multi-crystalline silicon material",
          "Reinforced anodized aluminum frame for high structural resilience",
          "Tempered self-cleaning anti-reflective glass",
          "Guaranteed positive power tolerance of 0 to +5W",
        ],
        warranty: "10-Year Product Warranty, 25-Year Output Warranty",
        technicalSpecs: {
          "Nominal Power": "350W (size dependent)",
          "Cell Type": "Polycrystalline (156mm)",
          "Module Efficiency": "19.5%",
          "Open Circuit Voltage (Voc)": "46.8 V",
          "Short Circuit Current (Isc)": "9.4 A",
          "Maximum System Voltage": "1000V DC",
          Dimensions: "1956 x 992 x 40 mm",
          Weight: "21.8 kg",
          "Frame Material": "Anodized Aluminum Alloy",
          Glass: "3.2mm Tempered Glass",
          "Junction Box": "IP67 Rated, 3 bypass diodes",
        },
      },
      {
        id: "bifacial-450",
        name: "Bifacial 450W Solar Panel",
        rating: 4.9,
        reviews: 145,
        price: 16999,
        originalPrice: 25000,
        emi: "₹1,416/month (12 months No Cost EMI)",
        colors: [
          { name: "Midnight Black Frame", hex: "#000000" },
          { name: "Transparent Glass", hex: "#e2e8f0" },
        ],
        sizes: ["440W", "450W", "480W"],
        sizePrices: {
          "440W": { price: 16499, originalPrice: 24000 },
          "450W": { price: 16999, originalPrice: 25000 },
          "480W": { price: 18499, originalPrice: 27500 },
        },
        image:
          "https://images.unsplash.com/photo-1615553879069-f8c0f99acf61?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "Rear-Side Gain: Up to 30%",
        description:
          "Dual-glass design capturing reflective light from both surfaces for up to 30% yield boost. Ideal for ground-mount systems or reflective flat rooftops.",
        features: [
          "Dual-sided active power generation cells",
          "High rear-side power gain of up to 30% depending on albedo",
          "Extremely reliable double-glass frame-free structure",
          "Excellent resistance to Potential Induced Degradation (PID)",
        ],
        warranty: "12-Year Product Warranty, 30-Year Performance Warranty",
        technicalSpecs: {
          "Nominal Power": "450W (size dependent)",
          "Cell Type": "Monocrystalline N-Type Bifacial",
          "Module Efficiency": "22.5%",
          "Open Circuit Voltage (Voc)": "50.4 V",
          "Short Circuit Current (Isc)": "11.1 A",
          "Bifaciality Factor": "75% ± 5%",
          "Maximum System Voltage": "1500V DC",
          Dimensions: "2187 x 1102 x 30 mm",
          Weight: "26.3 kg",
          "Glass Structure": "2.0mm Front & Rear Semi-tempered Glass",
          "Junction Box": "IP68 Rated, 3 bypass diodes",
        },
      },
    ],
  },
  {
    id: "inverters",
    name: "Smart Inverters",
    icon: <Zap className="w-5 h-5" />,
    tagline: "Smart Grid | High Yield | Hybrid Integration",
    heroBadge: "Hybrid X1 Next-Gen",
    description:
      "Convert, regulate, and direct your solar energy with our highly efficient solar string, hybrid, and micro-inverters, complete with real-time IoT mobile cloud synchronization.",
    heroImage:
      "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "98.4% Efficiency", sublabel: "Minimal conversion loss" },
      { label: "IoT Smart App", sublabel: "Real-time remote diagnostics" },
    ],
    products: [
      {
        id: "hybrid-x1",
        name: "Hybrid X1 10kW Inverter",
        rating: 4.8,
        reviews: 76,
        price: 45999,
        originalPrice: 68000,
        emi: "₹3,833/month (12 months No Cost EMI)",
        colors: [
          { name: "Titanium Silver", hex: "#cfd2d6" },
          { name: "Midnight Teal", hex: "#04444c" },
        ],
        sizes: ["8kW", "10kW", "12kW"],
        sizePrices: {
          "8kW": { price: 39999, originalPrice: 59000 },
          "10kW": { price: 45999, originalPrice: 68000 },
          "12kW": { price: 52999, originalPrice: 77000 },
        },
        image:
          "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "MPPT Trackers: Dual Independent",
        hasSmartApp: true,
        description:
          "Seamless grid-tie and battery storage management with UPS-grade load switching capacity. Monitor generation and storage state through our cloud dashboard.",
        features: [
          "Dual maximum power point tracking (MPPT) inputs",
          "Seamless backup power transition in under 10ms",
          "Advanced temperature regulation and heat dissipation",
          "Fully integrated smart APP configuration console",
        ],
        warranty: "5-Year Extendable Warranty",
        technicalSpecs: {
          "Nominal AC Output": "10 kW (size dependent)",
          "Max. Input DC Power": "15 kW",
          "Max. DC Voltage": "1000 V",
          "MPPT Voltage Range": "180V - 950V",
          "Grid Integration": "Three-phase synchronization",
          "Conversion Efficiency": "98.4% peak",
          "Enclosure Rating": "IP65 Waterproof",
          Dimensions: "480 x 420 x 180 mm",
          Weight: "24 kg",
          Cooling: "Natural fanless convection",
          Communication: "Wi-Fi, Ethernet, RS485",
        },
      },
      {
        id: "string-pro",
        name: "String Pro 5kW Inverter",
        rating: 4.7,
        reviews: 48,
        price: 24999,
        originalPrice: 38000,
        emi: "₹2,083/month (12 months No Cost EMI)",
        colors: [{ name: "Clean White", hex: "#f8fafc" }],
        sizes: ["3kW", "5kW"],
        sizePrices: {
          "3kW": { price: 19999, originalPrice: 30000 },
          "5kW": { price: 24999, originalPrice: 38000 },
        },
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "THD: < 3% Ultra Clean Power",
        hasSmartApp: true,
        description:
          "High-yield string inverter perfect for medium residential solar grids, delivering clean power and high conversion metrics.",
        features: [
          "Highly efficient string conversion controller",
          "Positive grid synchronization with under 3% Total Harmonic Distortion",
          "Wide MPPT voltage sweep for early morning start",
          "Direct Wi-Fi telemetry reporting to smart app",
        ],
        warranty: "5-Year Standard Warranty",
        technicalSpecs: {
          "Nominal AC Output": "5 kW (size dependent)",
          "Max. Input DC Power": "7.5 kW",
          "Max. DC Voltage": "600 V",
          "MPPT Voltage Range": "120V - 550V",
          "Grid Integration": "Single-phase grid sync",
          "Conversion Efficiency": "97.8%",
          "Enclosure Rating": "IP65",
          Dimensions: "390 x 320 x 140 mm",
          Weight: "12.5 kg",
          Cooling: "Natural passive cooling",
          Communication: "Wi-Fi, RS485",
        },
      },
      {
        id: "micro-inv",
        name: "Micro Inverter GridLink",
        rating: 4.9,
        reviews: 62,
        price: 12499,
        originalPrice: 19000,
        emi: "₹1,041/month (12 months No Cost EMI)",
        colors: [{ name: "Anodized Black", hex: "#111111" }],
        sizes: ["600W", "800W", "1200W"],
        sizePrices: {
          "600W": { price: 9999, originalPrice: 15000 },
          "800W": { price: 12499, originalPrice: 19000 },
          "1200W": { price: 15999, originalPrice: 24000 },
        },
        image:
          "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Panel Level MPPT Optimization",
        description:
          "Maximize output of individual solar panels while reducing shading losses completely. Fits directly onto module racking.",
        features: [
          "Panel-level MPPT tracking to negate group shade drop",
          "Low-voltage DC loop for premium residential fire safety",
          "Independent panel output telemetry logging",
          "Ultra-durable casing with deep cooling fins",
        ],
        warranty: "10-Year Replacement Warranty",
        technicalSpecs: {
          "Nominal AC Output": "800 W (size dependent)",
          "Recommended Module Power": "Up to 540W per input",
          "Number of MPPT Inputs": "2 channels",
          "Max. DC Input Voltage": "60 V",
          "MPPT Range": "16V - 50V",
          "Grid Integration": "Single-phase daisy chain compatible",
          "Peak Efficiency": "96.7%",
          "Enclosure Rating": "IP67 Waterproof",
          Dimensions: "260 x 180 x 38 mm",
          Weight: "3.5 kg",
          Communication: "Built-in Sub-1G RF telemetry",
        },
      },
    ],
  },
  {
    id: "batteries",
    name: "Battery Storage",
    icon: <Battery className="w-5 h-5" />,
    tagline: "Lithium LFP | High Cycle Life | Safe Storage",
    heroBadge: "PowerWall Pro LFP",
    description:
      "Store excess solar energy generated during the day and secure full backup protection during grid blackouts with our premium, high-density Lithium Iron Phosphate battery modules.",
    heroImage:
      "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "6,000+ Cycles", sublabel: "Up to 15 years lifetime" },
      { label: "95% DoD", sublabel: "High depth of discharge rate" },
    ],
    products: [
      {
        id: "powerwall",
        name: "PowerWall 10kWh Battery",
        rating: 4.9,
        reviews: 95,
        price: 124999,
        originalPrice: 185000,
        emi: "₹10,416/month (12 months No Cost EMI)",
        colors: [
          { name: "Frost White", hex: "#ffffff" },
          { name: "Slate Grey", hex: "#4b5563" },
        ],
        sizes: ["5kWh", "10kWh", "15kWh"],
        sizePrices: {
          "5kWh": { price: 74999, originalPrice: 110000 },
          "10kWh": { price: 124999, originalPrice: 185000 },
          "15kWh": { price: 174999, originalPrice: 260000 },
        },
        image:
          "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "Cell Chemistry: LiFePO4 (LFP)",
        description:
          "Premium wall-mounted backup storage system with a modular scale-up framework. Equipped with smart battery management for long lifecycle security.",
        features: [
          "Extremely safe Lithium Iron Phosphate chemistry",
          "Advanced cloud-synced battery management system",
          "Plug-and-play modular expansion system",
          "Robust thermal liquid cooling system",
        ],
        warranty: "10-Year Full Performance Warranty",
        technicalSpecs: {
          "Usable Energy Capacity": "10 kWh (size dependent)",
          "Nominal DC Voltage": "51.2 V",
          "Max. Charge Current": "100 A",
          "Max. Discharge Current": "100 A",
          "Cell Chemistry": "Lithium Iron Phosphate (LiFePO4)",
          "Depth of Discharge (DoD)": "95%",
          "Round Trip Efficiency": "92%",
          "Enclosure Rating": "IP65 Rated, indoor/outdoor mounting",
          Dimensions: "900 x 600 x 160 mm",
          Weight: "94 kg",
          "Communication Interface": "CAN, RS485, Wi-Fi",
        },
      },
      {
        id: "stackpack",
        name: "StackPack Modular 5kWh",
        rating: 4.8,
        reviews: 51,
        price: 62499,
        originalPrice: 95000,
        emi: "₹5,208/month (12 months No Cost EMI)",
        colors: [{ name: "Anodized Black", hex: "#111111" }],
        sizes: ["2.5kWh", "5kWh"],
        sizePrices: {
          "2.5kWh": { price: 36999, originalPrice: 55000 },
          "5kWh": { price: 62499, originalPrice: 95000 },
        },
        image:
          "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Expandable: Up to 40kWh Stack",
        description:
          "Scalable stackable module system that fits perfectly in space-constrained layouts. Lock-in structure bypasses all wiring requirements.",
        features: [
          "Zero cable layout stack-and-lock configuration",
          "Automated individual cell voltage balancing system",
          "High density space-saving layout footprint",
          "Real-time visual LED battery percentage bar",
        ],
        warranty: "7-Year Standard Warranty",
        technicalSpecs: {
          "Usable Capacity": "5 kWh (size dependent)",
          "Nominal DC Voltage": "51.2 V",
          "Stack Scale Limit": "Up to 8 modules (40 kWh)",
          "Charge/Discharge Current": "50 A per module",
          "DoD Rate": "90%",
          "Cell Class": "LFP Grade A cells",
          Dimensions: "420 x 480 x 220 mm (per module)",
          Weight: "42 kg",
          "Enclosure Class": "IP54 protection rating",
          "Safety Controls": "Integrated circuit breaker per pack",
        },
      },
    ],
  },
  {
    id: "meters",
    name: "Smart Meters",
    icon: <Cpu className="w-5 h-5" />,
    tagline: "IoT Enabled | Multi-Phase | High Accuracy",
    heroBadge: "Smart Node IoT Pro",
    description:
      "Monitor and manage grid interaction, energy import/export, and load usage in real-time with class-1 accuracy smart meters.",
    heroImage:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "Class 1.0 Accuracy", sublabel: "Billing grade precision" },
      { label: "Wi-Fi & GSM IoT", sublabel: "Always online diagnostics" },
    ],
    products: [
      {
        id: "smart-node",
        name: "Smart Node Pro Meter",
        rating: 4.7,
        reviews: 38,
        price: 4999,
        originalPrice: 8500,
        emi: "₹416/month (12 months No Cost EMI)",
        colors: [{ name: "Classic Grey", hex: "#9ca3af" }],
        sizes: ["1-Phase", "3-Phase"],
        sizePrices: {
          "1-Phase": { price: 3499, originalPrice: 6000 },
          "3-Phase": { price: 4999, originalPrice: 8500 },
        },
        image:
          "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Billing Compliance: CEA Approved",
        hasSmartApp: true,
        description:
          "IoT smart node allowing dual tracking of solar generation and utility grid feeds. Features detailed app telemetry metrics.",
        features: [
          "Precise bi-directional utility export tracking",
          "Built-in GSM sim slot & WiFi wireless transmitters",
          "Custom energy-overload protection automatic alerts",
          "Class-1 billing compliance approval certifications",
        ],
        warranty: "2-Year Replacement Warranty",
        technicalSpecs: {
          "Phase Configuration": "Three-phase (size dependent)",
          "Measurement Accuracy": "Class 1.0",
          "Voltage Rating": "230V / 400V AC",
          "Current Range": "5(80)A",
          Frequency: "50 Hz",
          "Communication Type": "Wi-Fi, Cellular GSM, Modbus RTU",
          "Mounting Configuration": "35mm Din-Rail installation",
          Display: "Backlit LCD, 8 digits",
          Dimensions: "126 x 89 x 74 mm",
          Weight: "0.85 kg",
        },
      },
      {
        id: "gridsense",
        name: "GridSense Smart Meter",
        rating: 4.6,
        reviews: 29,
        price: 6499,
        originalPrice: 11000,
        emi: "₹541/month (12 months No Cost EMI)",
        colors: [{ name: "Dark Graphite", hex: "#374151" }],
        sizes: ["Standard", "IoT Pro"],
        sizePrices: {
          Standard: { price: 4999, originalPrice: 8000 },
          "IoT Pro": { price: 6499, originalPrice: 11000 },
        },
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Response Rate: <1s Realtime",
        hasSmartApp: true,
        description:
          "Intelligent analytics-driven meter delivering precise power-factor and active load metrics directly to home automation hubs.",
        features: [
          "Sub-second power output capture response",
          "Cloud dashboard telemetry database graphing",
          "Built-in transient surge suppression circuit",
          "RS485 Modbus controller telemetry output",
        ],
        warranty: "3-Year Pro Warranty",
        technicalSpecs: {
          "Accuracy Rating": "Class 1.0",
          "Sampling Interval": "500 milliseconds",
          "Nominal Voltage": "220V AC",
          "Max. Current Rating": "60 A",
          "Telemetry Protocol": "MQTT, Modbus RTU",
          "Encryption System": "TLS 1.2 IoT safe handshake",
          "Mounting Type": "Wall-mounted plate option",
          "Enclosure protection": "IP51 Dust Protected",
          Dimensions: "160 x 112 x 58 mm",
          Weight: "0.72 kg",
        },
      },
    ],
  },
  {
    id: "wind",
    name: "Wind & Hybrid",
    icon: <Wind className="w-5 h-5" />,
    tagline: "Aerodynamic | Low Start Wind | High Yield",
    heroBadge: "MicroWind Turbine v3",
    description:
      "Harness power in all seasons and hours by adding wind turbines to solar setups for a stable, around-the-clock off-grid power supply.",
    heroImage:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "1.8 m/s Cut-in", sublabel: "Charges in light breeze" },
      { label: "Carbon Fiber Blades", sublabel: "Low vibration, high safety" },
    ],
    products: [
      {
        id: "microwind",
        name: "MicroWind 1kW Turbine",
        rating: 4.8,
        reviews: 43,
        price: 49999,
        originalPrice: 75000,
        emi: "₹4,166/month (12 months No Cost EMI)",
        colors: [{ name: "Arctic White", hex: "#ffffff" }],
        sizes: ["500W", "1kW", "2kW"],
        sizePrices: {
          "500W": { price: 29999, originalPrice: 45000 },
          "1kW": { price: 49999, originalPrice: 75000 },
          "2kW": { price: 89999, originalPrice: 135000 },
        },
        image:
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600",
        badge: "Free Installation",
        specLabel: "Body Tech: Aluminum Alloy",
        description:
          "Highly robust marine-grade wind generator designed to hybridize home systems, operating silently even in variable wind gusts.",
        features: [
          "Low startup speed requirements of 1.8 m/s",
          "Dynamic Neodymium permanent magnet alternator",
          "Advanced carbon fiber composite turbine blades",
          "Yaw-stabilized auto tail-vane positioning system",
        ],
        warranty: "3-Year Turbine Warranty",
        technicalSpecs: {
          "Rated Output Capacity": "1 kW (size dependent)",
          "Start-up Wind Velocity": "1.8 m/s",
          "Rated Wind Velocity": "11.0 m/s",
          "Survival Wind Velocity": "50.0 m/s",
          "Rotor Diameter": "1.65 meters",
          "Number of Blades": "3 blades",
          "Blade Material": "Carbon Fiber reinforced composites",
          "Generator Type": "3-phase AC Neodymium permanent magnet",
          Weight: "18.5 kg",
          "Tower Height Support": "6m to 12m poles supported",
        },
      },
      {
        id: "hybrid-ctrl",
        name: "Hybrid MPPT Controller",
        rating: 4.7,
        reviews: 19,
        price: 14999,
        originalPrice: 24000,
        emi: "₹1,250/month (12 months No Cost EMI)",
        colors: [{ name: "Industrial Yellow", hex: "#eab308" }],
        sizes: ["12V/24V", "48V Pro"],
        sizePrices: {
          "12V/24V": { price: 11999, originalPrice: 19000 },
          "48V Pro": { price: 14999, originalPrice: 24000 },
        },
        image:
          "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Rating: Wind 800W + Solar 600W",
        description:
          "Dual charge controller coordinating solar panels and wind energy into one battery bank with optimal load balancing.",
        features: [
          "Dual MPPT wind and solar charging profiles",
          "Dynamic pulse-width-modulation (PWM) wind dump-load",
          "Protective reverse current and short-circuit triggers",
          "Backlit configuration LCD for tracking voltage",
        ],
        warranty: "2-Year Standard Warranty",
        technicalSpecs: {
          "System Voltage Support": "48V DC (size dependent)",
          "Max. Solar Panel Rating": "600 W",
          "Max. Wind Turbine Rating": "800 W",
          "Charging Technology": "Solar MPPT + Wind PWM Boost",
          "Dump Load Resistance": "Included, steel external core",
          "No-load Energy Drain": "< 50 mA",
          "Enclosure protection": "IP41 Casing",
          Dimensions: "220 x 160 x 85 mm",
          Weight: "2.8 kg",
        },
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: <Wrench className="w-5 h-5" />,
    tagline: "TUV Certified | Anti-Corrosive | Premium",
    heroBadge: "Ultra-Guard DC Shield",
    description:
      "Complete your system configuration with top-grade, anti-corrosive structural hardware and ultra-shield copper cabling kits.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    heroStats: [
      { label: "Anodized AI6005", sublabel: "Zero rust for 25 years" },
      { label: "XLPE Cables", sublabel: "High temperature DC shielding" },
    ],
    products: [
      {
        id: "mounts",
        name: "NeoGrid Panel Mounts",
        rating: 4.9,
        reviews: 82,
        price: 2499,
        originalPrice: 4000,
        emi: "₹208/month (12 months No Cost EMI)",
        colors: [{ name: "Silver Metal", hex: "#9ca3af" }],
        sizes: ["Single Panel", "Dual Panel", "4-Panel Kit"],
        sizePrices: {
          "Single Panel": { price: 1499, originalPrice: 2500 },
          "Dual Panel": { price: 2499, originalPrice: 4000 },
          "4-Panel Kit": { price: 4499, originalPrice: 7000 },
        },
        image:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Material: Aluminum 6005-T5",
        description:
          "Heavy-duty rust-proof brackets and rails to secure your rooftop solar panels safely against storm force winds.",
        features: [
          "High strength structural anodized aluminum extrusion",
          "Marine grade stainless steel A2-70 fastenings",
          "Tile, tin sheet, and concrete bracket variants",
          "Interlocking splice connector bars pre-included",
        ],
        warranty: "15-Year Structural Warranty",
        technicalSpecs: {
          "Alloy Designation": "Al6005-T5 Aluminum Profile",
          "Anodizing Class": "Clear anodized coating (15 microns)",
          "Fastener Materials": "SUS304 Stainless Steel bolts & locknuts",
          "Ultimate Wind Velocity": "Up to 60 m/s structural resistance",
          "Tilt Angle Limit": "Adjustable 10° to 45°",
          "Module Orientation": "Portrait or Landscape layout support",
          "Standards Conformity": "AS/NZS 1170, TUV Certified",
        },
      },
      {
        id: "cable-kit",
        name: "DC XLPE Cable Kit",
        rating: 4.8,
        reviews: 77,
        price: 1899,
        originalPrice: 3000,
        emi: "₹158/month (12 months No Cost EMI)",
        colors: [{ name: "Red / Black Pair", hex: "#dc2626" }],
        sizes: ["10m", "20m", "50m"],
        sizePrices: {
          "10m": { price: 1199, originalPrice: 1800 },
          "20m": { price: 1899, originalPrice: 3000 },
          "50m": { price: 3999, originalPrice: 6200 },
        },
        image:
          "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=600",
        badge: "Free Shipping",
        specLabel: "Size: 4 sq mm Tinned Copper",
        description:
          "Double insulated solar DC cables for efficient power transmission with minimal resistance and high environmental defense.",
        features: [
          "Cross-linked XLPE outer protective insulation layer",
          "Tinned copper high-flex conductor core",
          "Ozone and ultraviolet radiation shielding",
          "Flame retardant cross-linked material",
        ],
        warranty: "5-Year Guarantee",
        technicalSpecs: {
          "Cross-Section Area": "4.0 sq mm conductors",
          "Conductor Core": "Tinned Copper (Class 5 fine strand)",
          "Voltage Rating": "AC: 1.0kV / DC: 1.5kV system rating",
          "Insulation Polymer": "Halogen-free crosslinked polyolefin (XLPO)",
          "Operating Temp Range": "-40°C to +90°C",
          "Short Circuit Limit Temp": "+250°C for 5 seconds",
          "UV Defense Level": "EN 50618 Weathering tested",
          Colors: "Red / Black insulation bundle",
        },
      },
    ],
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** Find a product and its parent category by product ID */
export function findProductById(productId: string): {
  product: ProductItem | null
  category: CategoryData | null
} {
  for (const cat of CATEGORIES) {
    const prod = cat.products.find((p) => p.id === productId)
    if (prod) return { product: prod, category: cat }
  }
  return { product: null, category: null }
}
