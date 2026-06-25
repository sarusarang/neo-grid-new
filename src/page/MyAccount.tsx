import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, Package, MapPin, LogOut, ChevronRight, Plus, Pencil, Trash2,
  CheckCircle2, Clock, Truck, XCircle, AlertCircle, Star, RotateCcw,
  Phone, Calendar, Receipt, Home, Building2, ChevronDown, X, Check,
  Sparkles, ArrowRight, ShoppingBag, Copy
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Address {
  id: string; label: string; name: string; phone: string
  line1: string; line2?: string; city: string; state: string
  pincode: string; isDefault: boolean
}

// ─── ORDER DATA ───────────────────────────────────────────────────────────────
const STATUS = {
  delivered:  { label: "Delivered", icon: CheckCircle2, color: "text-emerald-400",  bg: "bg-emerald-500/10",  border: "border-emerald-500/20" },
  processing: { label: "Processing",icon: Clock,        color: "text-[#fcc42c]",  bg: "bg-[#fcc42c]/10", border: "border-[#fcc42c]/20" },
  shipped:    { label: "Shipped",    icon: Truck,        color: "text-blue-400",   bg: "bg-blue-500/10",  border: "border-blue-500/20"  },
  cancelled:  { label: "Cancelled",  icon: XCircle,      color: "text-rose-400",    bg: "bg-rose-500/10",   border: "border-rose-500/20"   },
  confirmed:  { label: "Confirmed",  icon: AlertCircle,  color: "text-violet-400", bg: "bg-violet-500/10",border: "border-violet-500/20" },
} as const
type OrderStatus = keyof typeof STATUS
const ORDER_STEPS = ["confirmed","processing","shipped","delivered"] as const

interface OrderProduct { name:string; image:string; qty:number; price:number; size?:string }
interface Order { id:string; date:string; status:OrderStatus; products:OrderProduct[]; total:number; paymentMethod:string; address:string; tracking?:string; deliveredOn?:string; estimatedDelivery?:string }

const ORDERS: Order[] = [
  { id:"NG-2026-00128", date:"June 18, 2026", status:"delivered", deliveredOn:"June 21, 2026",
    products:[{ name:"Monocrystalline Solar Panel", image:"/solar-panel.png", qty:4, price:18500, size:"550W" },{ name:"Mounting Structure Kit", image:"/solar-panel.png", qty:1, price:3200 }],
    total:77200, paymentMethod:"UPI", tracking:"DTDC9284761KL", address:"MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala" },
  { id:"NG-2026-00115", date:"May 30, 2026", status:"shipped", estimatedDelivery:"June 28, 2026",
    products:[{ name:"Hybrid Solar Inverter", image:"/solar-panel.png", qty:1, price:42000, size:"5kW" },{ name:"Smart Energy Monitor", image:"/solar-panel.png", qty:1, price:4800 }],
    total:46800, paymentMethod:"Net Banking", tracking:"BLUEDART8821KL", address:"MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala" },
  { id:"NG-2026-00097", date:"April 12, 2026", status:"delivered", deliveredOn:"April 16, 2026",
    products:[{ name:"Lithium Battery Storage 10kWh", image:"/solar-panel.png", qty:2, price:65000, size:"10kWh" }],
    total:130000, paymentMethod:"Credit Card", address:"MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala" },
  { id:"NG-2026-00082", date:"March 5, 2026", status:"processing", estimatedDelivery:"July 2, 2026",
    products:[{ name:"Bifacial Solar Panel", image:"/solar-panel.png", qty:6, price:22000, size:"620W" }],
    total:132000, paymentMethod:"EMI – HDFC 12 months", address:"MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala" },
  { id:"NG-2026-00061", date:"January 14, 2026", status:"cancelled",
    products:[{ name:"MPPT Charge Controller", image:"/solar-panel.png", qty:2, price:8500, size:"60A" }],
    total:17000, paymentMethod:"UPI", address:"MM 11/505-C, Mullampara, Manjeri, Malappuram, Kerala" },
]

const fallbackImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).src = "https://placehold.co/64x64/012229/fcc42c?text=%E2%98%80"
}

// ─── SEED ADDRESSES ───────────────────────────────────────────────────────────
const SEED_ADDRESSES: Address[] = [
  { id:"addr-1", label:"Home", name:"Demo User", phone:"+91 98461 31500", line1:"MM 11/505-C, Mullampara", city:"Manjeri", state:"Kerala", pincode:"676121", isDefault:true },
  { id:"addr-2", label:"Office", name:"Demo User", phone:"+91 98461 31500", line1:"4th Floor, Tech Park, MG Road", city:"Kozhikode", state:"Kerala", pincode:"673001", isDefault:false },
]

// ─── STEP TRACKER ─────────────────────────────────────────────────────────────
function StepTracker({ status }: { status: OrderStatus }) {
  const idx = ORDER_STEPS.indexOf(status as typeof ORDER_STEPS[number])
  if (idx === -1 || status === "cancelled") return null
  return (
    <div className="bg-white/2 border border-white/5 rounded-2xl p-4 sm:p-5">
      <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-[#fcc42c]" /> Shipment Progress
      </p>
      <div className="relative flex items-center justify-between">
        {ORDER_STEPS.map((step, i) => {
          const done = i <= idx; const active = i === idx
          return (
            <div key={step} className={`flex items-center relative ${i < ORDER_STEPS.length - 1 ? "flex-1" : ""}`}>
              <div className="flex flex-col items-center z-10">
                <motion.div 
                  animate={{ scale: active ? [1, 1.1, 1] : 1 }} 
                  transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    done 
                      ? "bg-[#fcc42c] border-[#fcc42c] shadow-lg shadow-[#fcc42c]/20 text-[#011a1e]" 
                      : "bg-[#011a1e] border-white/10 text-gray-500"
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  )}
                  {active && (
                    <motion.div 
                      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity }} 
                      className="absolute inset-0 rounded-full border-2 border-[#fcc42c]" 
                    />
                  )}
                </motion.div>
                <p className={`text-[10px] sm:text-xs font-bold mt-2 capitalize whitespace-nowrap ${
                  active ? "text-[#fcc42c]" : done ? "text-white" : "text-gray-500"
                }`}>
                  {step}
                </p>
              </div>
              
              {/* Connecting line */}
              {i < ORDER_STEPS.length - 1 && (
                <div className="absolute left-8 right-0 top-4 h-[2px] bg-white/5 -translate-y-1/2 z-0">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: done && i < idx ? "100%" : "0%" }} 
                    transition={{ duration: 0.5, delay: i * 0.1 }} 
                    className="h-full bg-[#fcc42c]" 
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── ORDER CARD ───────────────────────────────────────────────────────────────
function OrderCard({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS[order.status]; const Icon = cfg.icon
  const [copied, setCopied] = useState(false)

  const copyTracking = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (order.tracking) {
      navigator.clipboard.writeText(order.tracking)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        expanded 
          ? "border-white/10 bg-white/3 shadow-xl" 
          : "border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/3"
      }`}
    >
      {/* Header section (Always visible) */}
      <div 
        onClick={() => setExpanded(v => !v)}
        className="p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#fcc42c]/10 border border-[#fcc42c]/20 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-[#fcc42c]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm tracking-wide sm:text-base">{order.id}</span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/>{order.date}</span>
            </div>
            {/* Show first product preview inline when collapsed */}
            {!expanded && (
              <p className="text-xs text-gray-500 mt-1 max-w-[250px] sm:max-w-md truncate">
                {order.products[0].name} {order.products.length > 1 && `+ ${order.products.length - 1} more item(s)`}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 border-t border-white/5 pt-3 md:border-none md:pt-0">
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Amount</p>
            <span className="text-white font-black text-sm sm:text-base">₹{order.total.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black ${cfg.bg} ${cfg.border} ${cfg.color}`}>
              <Icon className="w-3.5 h-3.5"/>{cfg.label}
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors shrink-0">
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180 text-white" : ""}`}/>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-black/10 border-t border-white/5"
          >
            <div className="p-4 sm:p-5 flex flex-col gap-5">
              {/* Tracker */}
              <StepTracker status={order.status}/>

              {/* Status dates alerts */}
              {order.estimatedDelivery && order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="flex items-center gap-2.5 text-xs text-blue-300 bg-blue-500/10 border border-blue-500/15 rounded-xl px-4 py-3">
                  <Truck className="w-4 h-4 shrink-0 text-blue-400"/>
                  <span>Expected Delivery: <strong className="text-white">{order.estimatedDelivery}</strong></span>
                </div>
              )}
              {order.deliveredOn && order.status === "delivered" && (
                <div className="flex items-center gap-2.5 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/15 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400"/>
                  <span>Successfully delivered on <strong className="text-white">{order.deliveredOn}</strong></span>
                </div>
              )}

              {/* Product items list */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Order Items</p>
                {order.products.map((p, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={fallbackImg}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate hover:text-[#fcc42c] transition-colors">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{p.size && `${p.size} · `}Qty: {p.qty}</p>
                    </div>
                    <p className="text-white font-black text-sm shrink-0">₹{(p.price * p.qty).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>

              {/* Delivery and payment information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-white/2 border border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" /> Delivery Address
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">{order.address}</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="p-3.5 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between gap-3 flex-1">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Receipt className="w-3.5 h-3.5 text-gray-500" /> Payment
                      </p>
                      <p className="text-xs text-white font-semibold">{order.paymentMethod}</p>
                    </div>
                    <span className="text-white font-black text-sm">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>

                  {order.tracking && (
                    <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-0.5">Tracking Number</p>
                        <p className="text-blue-300 font-mono font-bold text-xs">{order.tracking}</p>
                      </div>
                      <button 
                        onClick={copyTracking}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 hover:text-white transition-all text-xs font-semibold flex items-center gap-1 shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2.5 pt-1.5 border-t border-white/5">
                {order.status === "delivered" && (
                  <>
                    <button className="flex items-center gap-1.5 px-4.5 py-2 bg-[#fcc42c] hover:brightness-110 text-[#011a1e] rounded-xl text-xs font-bold transition-all shadow-md">
                      <Star className="w-3.5 h-3.5 stroke-[3]"/> Review Items
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
                      <RotateCcw className="w-3.5 h-3.5"/> Buy Again
                    </button>
                  </>
                )}
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
                  <Phone className="w-3.5 h-3.5"/> Help Center
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── ADDRESS FORM ─────────────────────────────────────────────────────────────
function AddressForm({ initial, onSave, onCancel }: { initial?: Address; onSave:(a:Address)=>void; onCancel:()=>void }) {
  const [form, setForm] = useState<Omit<Address,"id"|"isDefault">>({
    label: initial?.label || "Home",
    name: initial?.name || "",
    phone: initial?.phone || "",
    line1: initial?.line1 || "",
    line2: initial?.line2 || "",
    city: initial?.city || "",
    state: initial?.state || "",
    pincode: initial?.pincode || "",
  })
  const [errors, setErrors] = useState<Record<string,string>>({})

  const field = (key: keyof typeof form, label: string, placeholder: string, req=true) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-400 tracking-wide">{label}{req && <span className="text-red-400 ml-0.5">*</span>}</label>
      <input
        value={form[key]}
        onChange={e=>{ setForm(p=>({...p,[key]:e.target.value})); if(errors[key]) setErrors(p=>({...p,[key]:""})) }}
        placeholder={placeholder}
        className={`w-full bg-white/2 border rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all ${
          errors[key] 
            ? "border-rose-500/50 bg-rose-500/2 focus:border-rose-500" 
            : "border-white/10 focus:border-[#fcc42c]/50 focus:bg-white/3"
        }`}
      />
      {errors[key] && <p className="text-[11px] text-rose-400 font-medium">{errors[key]}</p>}
    </div>
  )

  const handleSave = () => {
    const errs: Record<string,string> = {}
    if(!form.name.trim()) errs.name="Full name is required"
    if(!form.phone.trim()) errs.phone="Phone number is required"
    if(!form.line1.trim()) errs.line1="Address line 1 is required"
    if(!form.city.trim()) errs.city="City is required"
    if(!form.state.trim()) errs.state="State is required"
    if(!form.pincode.trim()) errs.pincode="Pincode is required"
    else if(!/^\d{6}$/.test(form.pincode)) errs.pincode="Must be exactly 6 digits"
    if(Object.keys(errs).length){ setErrors(errs); return }
    onSave({ ...form, id: initial?.id || `addr-${Date.now()}`, isDefault: initial?.isDefault || false })
  }

  const labels = ["Home","Office","Other"]
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-md p-4 sm:p-5 flex flex-col gap-5 shadow-2xl"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#fcc42c]" />
          <h3 className="text-white font-black text-base">{initial ? "Edit Address" : "Add New Address"}</h3>
        </div>
        <button onClick={onCancel} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:bg-white/10"><X className="w-4 h-4"/></button>
      </div>

      {/* Label pills */}
      <div>
        <p className="text-xs font-bold text-gray-400 mb-2 tracking-wide">Select Address Label</p>
        <div className="flex gap-2 flex-wrap">
          {labels.map(l=>(
            <button 
              type="button"
              key={l} 
              onClick={()=>setForm(p=>({...p,label:l}))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black border transition-all ${
                form.label===l 
                  ? "bg-[#fcc42c] text-[#011a1e] border-[#fcc42c] shadow-lg shadow-[#fcc42c]/10" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {l==="Home" ? <Home className="w-3.5 h-3.5"/> : l==="Office" ? <Building2 className="w-3.5 h-3.5"/> : <MapPin className="w-3.5 h-3.5"/>}
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("name","Full Name","e.g. John Doe")}
        {field("phone","Phone Number","e.g. +91 98765 43210")}
      </div>
      {field("line1","Address Line 1","House/Flat no., Building Name, Street")}
      {field("line2","Address Line 2 (Optional)","Landmark, Locality, Area",false)}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {field("city","City","City")}
        {field("state","State","State")}
        {field("pincode","PIN Code","6-digit PIN")}
      </div>

      <div className="flex gap-3 pt-3 border-t border-white/5">
        <button 
          onClick={handleSave}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-[#fcc42c] text-[#011a1e] rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-[#fcc42c]/10"
        >
          <Check className="w-4.5 h-4.5 stroke-[3]"/> Save Address
        </button>
        <button 
          onClick={onCancel} 
          className="flex-1 sm:flex-initial px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 hover:text-white transition-all text-center"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  )
}

// ─── ADDRESSES TAB ────────────────────────────────────────────────────────────
function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(SEED_ADDRESSES)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string|null>(null)

  const handleSave = (addr: Address) => {
    setAddresses(prev => editId
      ? prev.map(a => a.id===editId ? addr : a)
      : [...prev, addr]
    )
    setShowForm(false); setEditId(null)
  }
  const setDefault = (id: string) => setAddresses(prev => prev.map(a=>({...a, isDefault:a.id===id})))
  const remove = (id: string) => setAddresses(prev => prev.filter(a=>a.id!==id))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-wide">Saved Addresses</h2>
          <p className="text-xs text-gray-500 mt-0.5">{addresses.length} delivery location{addresses.length!==1?"s":""} configured</p>
        </div>
        {!showForm && !editId && (
          <button 
            onClick={()=>setShowForm(true)}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-[#fcc42c] text-[#011a1e] rounded-xl text-xs font-black hover:brightness-110 transition-all shadow-md shadow-[#fcc42c]/10"
          >
            <Plus className="w-4 h-4 stroke-[3]"/> Add Address
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {(showForm && !editId) && (
          <AddressForm key="new" onSave={handleSave} onCancel={()=>setShowForm(false)}/>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {addresses.map(addr => (
            <div key={addr.id} className="contents">
              {editId===addr.id ? (
                <div className="col-span-1 sm:col-span-2">
                  <AddressForm key={`edit-${addr.id}`} initial={addr} onSave={handleSave} onCancel={()=>setEditId(null)}/>
                </div>
              ) : (
                <motion.div 
                  layout 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, x: -20 }}
                  className={`relative p-4.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full bg-white/2 ${
                    addr.isDefault 
                      ? "border-[#fcc42c]/40 bg-[#fcc42c]/2 shadow-lg shadow-[#fcc42c]/3" 
                      : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        addr.label==="Home" 
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-400" 
                          : addr.label==="Office" 
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                            : "bg-[#fcc42c]/10 border-[#fcc42c]/20 text-[#fcc42c]"
                      }`}>
                        {addr.label==="Home" ? <Home className="w-4 h-4"/> : addr.label==="Office" ? <Building2 className="w-4 h-4"/> : <MapPin className="w-4 h-4"/>}
                      </div>

                      <div className="flex items-center gap-2">
                        {addr.isDefault && (
                          <span className="flex items-center gap-1 text-[9px] font-black text-[#011a1e] bg-[#fcc42c] px-2 py-0.5 rounded-full uppercase tracking-wide">
                            <Check className="w-2.5 h-2.5 stroke-[3]"/> Default
                          </span>
                        )}
                        <span className="text-white font-bold text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">{addr.label}</span>
                      </div>
                    </div>

                    <p className="text-white font-bold text-sm mb-1">{addr.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} – {addr.pincode}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
                    <p className="text-gray-500 text-xs flex items-center gap-1"><Phone className="w-3.5 h-3.5"/>{addr.phone}</p>
                    <div className="flex items-center gap-1">
                      {!addr.isDefault && (
                        <button 
                          onClick={()=>setDefault(addr.id)}
                          title="Set as Default"
                          className="text-[10px] text-gray-400 hover:text-[#fcc42c] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all font-bold"
                        >
                          Set Default
                        </button>
                      )}
                      <button 
                        onClick={()=>setEditId(addr.id)}
                        title="Edit Address"
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5"/>
                      </button>
                      {!addr.isDefault && (
                        <button 
                          onClick={()=>remove(addr.id)}
                          title="Delete Address"
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {addresses.length===0 && !showForm && (
        <div className="flex flex-col items-center gap-4 py-16 text-center bg-white/2 border border-white/5 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <MapPin className="w-7 h-7 text-gray-500"/>
          </div>
          <div>
            <p className="text-white font-bold text-sm">No Saved Addresses</p>
            <p className="text-gray-500 text-xs mt-1">Please add a delivery address to complete your checkout faster.</p>
          </div>
          <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#fcc42c] text-[#011a1e] rounded-xl font-black text-xs hover:brightness-110 transition-all shadow-md shadow-[#fcc42c]/10">
            <Plus className="w-4 h-4 stroke-[3]"/> Add Delivery Address
          </button>
        </div>
      )}
    </div>
  )
}

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const [filter, setFilter] = useState<OrderStatus|"all">("all")
  const filtered = filter==="all" ? ORDERS : ORDERS.filter(o=>o.status===filter)
  const counts: Record<string,number> = { all:ORDERS.length }
  Object.keys(STATUS).forEach(s=>{ counts[s]=ORDERS.filter(o=>o.status===s).length })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-white tracking-wide">Order History</h2>
        <p className="text-xs text-gray-500 mt-0.5">{ORDERS.length} orders total in your account</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {(["all","processing","shipped","delivered","cancelled"] as const).map(f=>(
          <button 
            key={f} 
            onClick={()=>setFilter(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-all whitespace-nowrap shrink-0 ${
              filter===f 
                ? "bg-[#fcc42c] text-[#011a1e] border-[#fcc42c] shadow-lg shadow-[#fcc42c]/10" 
                : "bg-white/2 border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5"
            }`}
          >
            {f==="all" ? "All Orders" : f.charAt(0).toUpperCase()+f.slice(1)}
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${filter===f ? "bg-[#011a1e]/15 text-[#011a1e]" : "bg-white/5 text-gray-500"}`}>{counts[f]||0}</span>
          </button>
        ))}
      </div>

      {filtered.length===0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center bg-white/2 border border-white/5 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-gray-500"/>
          </div>
          <div>
            <p className="text-white font-bold text-sm">No Orders Found</p>
            <p className="text-gray-500 text-xs mt-1">There are no orders matching the selected status.</p>
          </div>
          <Link to="/products" className="flex items-center gap-1.5 px-5 py-2.5 bg-[#fcc42c] text-[#011a1e] rounded-xl text-xs font-black hover:brightness-110 transition-all">
            Shop Products <ArrowRight className="w-4 h-4 stroke-[3]"/>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((o,i)=><OrderCard key={o.id} order={o} index={i}/>)}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab({ user, logout }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; logout:()=>void }) {
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)
  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000) }
  const totalSpent = ORDERS.reduce((s,o)=>s+o.total,0)
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-white tracking-wide">Personal Details</h2>
        <p className="text-xs text-gray-500 mt-0.5">Manage your profile info and security settings</p>
      </div>

      {/* Profile Overview Card & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Avatar Card */}
        <div className="md:col-span-1 p-5 rounded-2xl border border-white/5 bg-white/2 flex flex-col items-center justify-center text-center gap-3">
          <div className="relative">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black text-2xl sm:text-3xl shadow-xl shadow-[#fcc42c]/10">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#011a1e]"/>
          </div>
          <div>
            <h3 className="text-white font-black text-base">{user.name}</h3>
            <p className="text-gray-500 text-xs mt-0.5 capitalize">{user.provider} provider</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-3.5">
          {[
            { label:"Total Orders", value:ORDERS.length, icon:Package, color:"text-[#fcc42c]", bg:"bg-[#fcc42c]/5", border:"border-[#fcc42c]/10" },
            { label:"Delivered",    value:ORDERS.filter(o=>o.status==="delivered").length, icon:CheckCircle2, color:"text-emerald-400", bg:"bg-emerald-500/5", border:"border-emerald-500/10" },
            { label:"In Progress",   value:ORDERS.filter(o=>["shipped","processing","confirmed"].includes(o.status)).length, icon:Truck, color:"text-blue-400", bg:"bg-blue-500/5", border:"border-blue-500/10" },
            { label:"Spent Value",   value:`₹${(totalSpent/1000).toFixed(0)}k`, icon:Sparkles, color:"text-purple-400", bg:"bg-purple-500/5", border:"border-purple-500/10" },
          ].map(s=>(
            <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg} flex items-center gap-4`}>
              <div className={`w-10 h-10 rounded-xl bg-white/3 flex items-center justify-center shrink-0 ${s.color}`}>
                <s.icon className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-white font-black text-lg tracking-wide">{s.value}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/2 flex flex-col gap-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
          <User className="w-5 h-5 text-[#fcc42c]" />
          <h3 className="text-white font-black text-sm uppercase tracking-wider">Profile Information</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 tracking-wide">Full Name</label>
            <input 
              value={name} 
              onChange={e=>setName(e.target.value)}
              className="w-full bg-white/2 border border-white/10 focus:border-[#fcc42c]/50 focus:bg-white/3 rounded-xl px-3.5 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 tracking-wide">Email Address</label>
            <input 
              value={user.email} 
              readOnly
              className="w-full bg-white/3 border border-white/5 rounded-xl px-3.5 py-3 text-sm text-gray-500 cursor-not-allowed outline-none font-medium"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className={`self-start flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
            saved 
              ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-emerald-500/5" 
              : "bg-[#fcc42c] text-[#011a1e] hover:brightness-110 shadow-[#fcc42c]/5"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4.5 h-4.5 stroke-[3]"/>
              <span>Changes Saved!</span>
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="p-4 sm:p-5 rounded-2xl border border-rose-500/10 bg-rose-500/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-rose-400 font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Account Actions
          </h3>
          <p className="text-gray-500 text-xs mt-1">If you want to sign out of this browser session, use the button below.</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl font-bold text-xs hover:bg-rose-500/20 transition-all uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4"/> Sign Out Session
        </button>
      </div>
    </div>
  )
}

// ─── TABS CONFIG ──────────────────────────────────────────────────────────────
const TABS = [
  { id:"orders",    label:"My Orders",  icon:Package,  shortLabel:"Orders" },
  { id:"addresses", label:"Addresses",  icon:MapPin,   shortLabel:"Addresses" },
  { id:"profile",   label:"Profile",    icon:User,     shortLabel:"Profile" },
] as const
type TabId = typeof TABS[number]["id"]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function MyAccount() {
  const { user, logout } = useAuth()
  const { tab: tabParam } = useParams<{ tab?: string }>()
  const [activeTab, setActiveTab] = useState<TabId>((tabParam as TabId) || "orders")

  if (!user) return <Navigate to="/" replace />

  return (
    <main className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* ── BREADCRUMB & HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/5 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">
              <Link to="/" className="hover:text-[#fcc42c] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-600"/>
              <span className="text-gray-300">My Account</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide flex items-center gap-2">
              My Account Settings
              <Sparkles className="w-5 h-5 text-[#fcc42c] animate-pulse" />
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white/2 border border-white/5 px-3 py-1.5 rounded-xl self-start md:self-auto">
            <span className="text-xs text-gray-400">Signed in as: <strong className="text-white font-semibold">{user.name}</strong></span>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black text-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── LAYOUT GRID ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* ── NAVIGATION TABS (SIDEBAR ON DESKTOP) ────────────────────────── */}
          <aside className="lg:col-span-1">
            
            {/* Mobile / Tablet Horizontal tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
              {TABS.map(t => {
                const active = activeTab === t.id
                return (
                  <button 
                    key={t.id} 
                    onClick={() => setActiveTab(t.id)}
                    className="relative flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs font-black whitespace-nowrap shrink-0 border border-white/5 transition-all bg-white/2"
                  >
                    {active && (
                      <motion.div 
                        layoutId="activeTabMobileBackground" 
                        className="absolute inset-0 bg-[#fcc42c] rounded-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <t.icon className={`w-4.5 h-4.5 z-10 ${active ? "text-[#011a1e]" : "text-gray-400"}`} />
                    <span className={`z-10 ${active ? "text-[#011a1e]" : "text-gray-400"}`}>{t.shortLabel}</span>
                  </button>
                )
              })}
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs font-black whitespace-nowrap shrink-0 border border-rose-500/10 bg-rose-500/5 text-rose-400"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Desktop Vertical Tab list */}
            <div className="hidden lg:flex flex-col gap-1.5 p-3 rounded-2xl border border-white/5 bg-gradient-to-b from-white/3 to-transparent backdrop-blur-md sticky top-24">
              <div className="px-2.5 py-2 mb-2 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fcc42c] to-[#f59e0b] flex items-center justify-center text-[#011a1e] font-black text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#011a1e]"/>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-xs truncate">{user.name}</p>
                  <p className="text-gray-500 text-[10px] truncate capitalize">{user.provider} Account</p>
                </div>
              </div>

              <div className="h-px bg-white/5 mb-1.5" />

              {TABS.map(t => {
                const active = activeTab === t.id
                return (
                  <button 
                    key={t.id} 
                    onClick={() => setActiveTab(t.id)}
                    className="relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-black text-left transition-all group"
                  >
                    {active && (
                      <motion.div 
                        layoutId="activeTabDesktopBackground" 
                        className="absolute inset-0 bg-[#fcc42c] rounded-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <t.icon className={`w-4.5 h-4.5 z-10 shrink-0 transition-colors ${active ? "text-[#011a1e]" : "text-gray-400 group-hover:text-white"}`} />
                    <span className={`z-10 transition-colors uppercase tracking-wider ${active ? "text-[#011a1e]" : "text-gray-400 group-hover:text-white"}`}>
                      {t.label}
                    </span>
                    {active && <ChevronRight className="w-4 h-4 z-10 ml-auto text-[#011a1e] stroke-[2.5]" />}
                  </button>
                )
              })}

              <div className="h-px bg-white/5 my-1.5" />

              <button 
                onClick={logout}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-black text-left text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all uppercase tracking-wider"
              >
                <LogOut className="w-4.5 h-4.5 shrink-0" />
                <span>Log Out</span>
              </button>
            </div>

          </aside>

          {/* ── CONTENT AREA (DYNAMIC ACCORDING TO TAB) ───────────────────── */}
          <div className="lg:col-span-3 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white/2 border border-white/5 rounded-3xl p-5 sm:p-6 backdrop-blur-md"
              >
                {activeTab === "orders"    && <OrdersTab/>}
                {activeTab === "addresses" && <AddressesTab/>}
                {activeTab === "profile"   && <ProfileTab user={user} logout={logout}/>}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </main>
  )
}
