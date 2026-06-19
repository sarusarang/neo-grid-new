import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#000f12] text-gray-300 py-10 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 flex flex-col items-start">
            <img src="/neo grid logo-01.png" alt="NeoGrid" className="h-12 object-contain mb-6 brightness-0 invert opacity-90" />
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Empowering homes and businesses with premium, high-efficiency solar energy solutions. Join the grid of the future.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Products</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Monocrystalline Panels</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Hybrid Inverters</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Battery Storage</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Smart Meters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Newsroom</Link></li>
              <li><Link to="#" className="hover:text-[#fcc42c] transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-5 text-sm text-gray-400">
              <li className="leading-relaxed">

                <strong className="text-white block mb-1">Address</strong>
                <span className="block text-[#fcc42c] font-semibold">NeoGrid</span>
                <span className="block text-gray-500 text-xs">An initiative of SMART ENTERPRISES</span>
                MM 11/505-C, Mullampara, Manjeri,<br />Malappuram, Kerala – 676121
              </li>
              <li>
                <strong className="text-white block mb-1">Phone</strong>
                <a href="tel:+919846131500" className="hover:text-[#fcc42c] transition-colors">+91 98461 31500</a>
              </li>
              <li>
                <strong className="text-white block mb-1">Email</strong>
                <a href="mailto:info@neogrid.in" className="hover:text-[#fcc42c] transition-colors">info@neogrid.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} NeoGrid – An initiative of Smart Enterprises. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
