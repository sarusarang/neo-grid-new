import { Link } from "react-router-dom"
import { Phone, Mail, MapPin } from "lucide-react"

// ── FOOTER DATA ───────────────────────────────────────────────────────────────

const FOOTER_PRODUCTS = [
  { label: "Li-On Inverter & UPS", href: "/products" },
  { label: "Li-On HKVA", href: "/products" },
  { label: "Li-On Hybrid", href: "/products" },
  { label: "Solar Power", href: "/products" },
  { label: "Battery Pack", href: "/products" },
  { label: "Home Inverter & UPS", href: "/products" },
]

const FOOTER_SERVICES = [
  { label: "Solar System Installation", href: "/service" },
  { label: "Product Installation", href: "/service" },
  { label: "AMC Request", href: "/contact" },
  { label: "General Service Request", href: "/contact" },
  { label: "Complaint Registration", href: "/contact" },
  { label: "Warranty Registration", href: "/contact" },
  { label: "Business Enquiry", href: "/contact" },
]

const FOOTER_POLICIES = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Refund & Return Policy", href: "#" },
  { label: "Shipment Policy", href: "#" },
]

// ── SHARED LINK LIST ──────────────────────────────────────────────────────────

function FooterLinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-black uppercase tracking-widest text-xs mb-5 pb-2 border-b border-white/10">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-sm text-gray-400 hover:text-[#fcc42c] transition-colors hover:translate-x-0.5 inline-block transition-transform duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#000f12] text-gray-300 border-t border-white/10">
      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column — spans 2 cols on lg */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <img
              src="/neo grid logo-01.png"
              alt="NeoGrid"
              className="h-11 object-contain mb-5 brightness-0 invert opacity-90"
            />
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Empowering homes and businesses with premium, high-efficiency power backup and solar energy solutions.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-3 text-xs text-gray-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#fcc42c] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  MM 11/505-C, Mullampara,<br />Manjeri, Malappuram,<br />Kerala – 676121
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fcc42c] shrink-0" />
                <a href="tel:+919846131500" className="hover:text-[#fcc42c] transition-colors">
                  +91 98461 31500
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#fcc42c] shrink-0" />
                <a href="mailto:info@neogrid.in" className="hover:text-[#fcc42c] transition-colors">
                  info@neogrid.in
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <FooterLinkList title="Products" links={FOOTER_PRODUCTS} />

          {/* Services */}
          <FooterLinkList title="Services" links={FOOTER_SERVICES} />

          {/* Policies */}
          <FooterLinkList title="Policies" links={FOOTER_POLICIES} />

          {/* Quick links / CTA */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-5 pb-2 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 mb-6">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Service", href: "/service" },
                { label: "Projects & Gallery", href: "/projects" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-[#fcc42c] transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden bg-[#04444c]/40 border border-[#04444c] text-sm font-bold text-white hover:border-[#fcc42c]/50 transition-colors"
            >
              <div className="absolute inset-0 w-0 bg-[#fcc42c] transition-all duration-[250ms] ease-out group-hover:w-full" />
              <span className="relative group-hover:text-[#011a1e] transition-colors">Get a Quote</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/8 bg-black/30">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-500 font-semibold">NeoGrid</span>{" "}
            – An initiative of Smart Enterprises. All rights reserved.
          </p>
          <p className="text-gray-700">
            Designed by{" "}
            <a
              href="https://extechnology.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fcc42c] hover:underline font-semibold"
            >
              Ex Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
