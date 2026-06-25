import React from "react"
import { AlertCircle } from "lucide-react"

interface FormInputFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  icon: React.ElementType
  error?: string
  rightSlot?: React.ReactNode
  compact?: boolean
  registerProps: any
}

export default function FormInputField({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  error,
  rightSlot,
  compact,
  registerProps,
}: FormInputFieldProps) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label htmlFor={id} className="text-xs font-semibold text-gray-300">
        {label}
      </label>

      <div
        className={`relative flex items-center rounded-xl border transition-all duration-200 ${
          error
            ? "border-red-500/70 bg-red-500/5"
            : "border-white/10 bg-white/5 focus-within:border-[#fcc42c]/60 focus-within:bg-white/8"
        }`}
      >
        <Icon className="absolute left-3 w-4 h-4 text-gray-500 shrink-0" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...registerProps}
          className={`w-full bg-transparent text-white placeholder-gray-600 text-sm outline-none rounded-xl pl-9 pr-9 ${
            compact ? "py-2.5" : "py-3"
          }`}
        />
        {rightSlot && <div className="absolute right-3">{rightSlot}</div>}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle className="w-3 h-3 shrink-0" /> {error}
        </p>
      )}
    </div>
  )
}
