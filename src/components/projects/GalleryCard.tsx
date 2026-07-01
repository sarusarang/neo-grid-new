import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import type { GalleryItem } from "@/service/project/types"
import { formatProjectDate } from "./projectHelpers"

interface GalleryCardProps {
  index: number
  item: GalleryItem
  onSelect: (index: number) => void
}

const aspectClasses = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[5/4]"]

export default function GalleryCard({ index, item, onSelect }: GalleryCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      onClick={() => onSelect(index)}
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-[#022a30] text-left shadow-xl transition-all duration-500 hover:border-[#fcc42c]/50 hover:shadow-2xl hover:shadow-[#04444c]/30 ${
        aspectClasses[index % aspectClasses.length]
      }`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e]/95 via-[#011a1e]/30 to-transparent" />

      <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowRight className="h-4 w-4 rotate-[-45deg] text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#fcc42c] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#011a1e]">
          <Calendar className="h-3 w-3" />
          {formatProjectDate(item.created_at)}
        </div>
        <h4 className="mb-2 text-lg font-extrabold leading-snug text-white transition-colors group-hover:text-[#fcc42c]">
          {item.title}
        </h4>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-300">{item.description}</p>
      </div>
    </motion.button>
  )
}
