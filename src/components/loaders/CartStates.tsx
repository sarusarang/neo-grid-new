import { Loader2, AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export function CartLoader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-16 text-center text-white">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-[#fcc42c]/20 to-[#04444c]/30 border border-[#fcc42c]/30 flex items-center justify-center shadow-xl shadow-[#fcc42c]/10">
          <Loader2 className="h-10 w-10 animate-spin text-[#fcc42c]" />
        </div>
      </div>
      <h3 className="text-xl font-black text-white">Loading your cart...</h3>
      <p className="mt-2 max-w-xs text-xs text-gray-400">
        Fetching your latest selected solar products and live pricing options.
      </p>
    </div>
  )
}

interface CartErrorProps {
  message?: string
  onRetry?: () => void
}

export function CartError({ message = "Unable to fetch cart details.", onRetry }: CartErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-16 text-center text-white px-4">
      <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-5 shadow-xl shadow-red-500/5">
        <AlertTriangle className="h-12 w-12 text-red-400" />
      </div>
      <h3 className="text-2xl font-black text-white">Cart Load Failed</h3>
      <p className="mt-2 max-w-md text-sm text-gray-400 leading-relaxed">
        {message} Please verify your network connection or try reloading your cart.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fcc42c] px-6 py-3 text-sm font-black text-[#011a1e] hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#fcc42c]/10"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        )}
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Products
        </Link>
      </div>
    </div>
  )
}
