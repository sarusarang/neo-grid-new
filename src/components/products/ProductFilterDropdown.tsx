import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Loader2, SlidersHorizontal } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
  description?: string
}

interface ProductFilterDropdownProps {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
  icon?: ReactNode
  disabled?: boolean
  loading?: boolean
  placeholder?: string
}

export default function ProductFilterDropdown({
  label,
  value,
  options,
  onChange,
  icon,
  disabled,
  loading,
  placeholder = "Select option",
}: ProductFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const selectedOption = options.find(option => option.value === value)
  const isDisabled = Boolean(disabled || loading)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
    }
  }, [isOpen])

  return (
    <div ref={wrapperRef} className="relative min-w-0">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setIsOpen(open => !open)}
        className={`group flex min-h-14 w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-all ${
          isOpen
            ? "border-[#fcc42c] bg-[#04444c]/45 shadow-lg shadow-[#fcc42c]/5"
            : "border-white/10 bg-white/5 hover:border-[#fcc42c]/45 hover:bg-white/8"
        } ${isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fcc42c]/12 text-[#fcc42c] ring-1 ring-[#fcc42c]/15">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon || <SlidersHorizontal className="h-4 w-4" />}
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">
              {label}
            </span>
            <span className="block truncate text-sm font-black text-white">
              {loading ? "Loading..." : selectedOption?.label || placeholder}
            </span>
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#fcc42c] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && !isDisabled && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-white/10 bg-[#041f24] shadow-2xl shadow-black/40"
          >
            <div className="max-h-72 overflow-y-auto p-1.5 scrollbar-hide">
              {options.map(option => {
                const isSelected = option.value === value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "bg-[#fcc42c] text-[#011a1e]"
                        : "text-gray-200 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black">{option.label}</span>
                      {option.description && (
                        <span className={`block truncate text-[11px] font-semibold ${
                          isSelected ? "text-[#011a1e]/65" : "text-gray-500"
                        }`}>
                          {option.description}
                        </span>
                      )}
                    </span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 stroke-[3]" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
