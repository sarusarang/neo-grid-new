import { AnimatePresence, motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryItem } from "@/service/project/types"
import { formatProjectDate } from "./projectHelpers"

interface GalleryLightboxProps {
  direction: number
  items: GalleryItem[]
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  selectedIndex: number | null
}

export default function GalleryLightbox({
  direction,
  items,
  onClose,
  onNext,
  onPrevious,
  selectedIndex,
}: GalleryLightboxProps) {
  if (selectedIndex === null || !items[selectedIndex]) return null

  const selectedItem = items[selectedIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-[#011a1e]/95 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute right-4 top-4 z-[160] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#011a1e] sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous gallery image"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 z-[160] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-lg transition-all duration-300 hover:bg-[#fcc42c] hover:text-[#011a1e] sm:flex lg:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next gallery image"
            onClick={onNext}
            className="absolute right-4 top-1/2 z-[160] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-lg transition-all duration-300 hover:bg-[#fcc42c] hover:text-[#011a1e] sm:flex lg:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="flex w-full max-w-5xl flex-col items-center gap-4 sm:gap-6">
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-2xl sm:aspect-video sm:max-h-[62vh]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={selectedItem.id}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 220 : dir < 0 ? -220 : 0,
                  opacity: 0,
                  scale: 0.96,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  x: dir < 0 ? 220 : dir > 0 ? -220 : 0,
                  opacity: 0,
                  scale: 0.96,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 350, damping: 35 },
                opacity: { duration: 0.22 },
                scale: { duration: 0.22 },
              }}
              src={selectedItem.image}
              alt={selectedItem.title}
              className="h-full w-full object-contain"
            />
          </AnimatePresence>
        </div>

        <div className="w-full max-w-4xl rounded-lg border border-white/10 bg-[#022a30]/85 p-5 shadow-xl backdrop-blur-md sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#fcc42c]">
              <Calendar className="h-3 w-3" />
              {formatProjectDate(selectedItem.created_at)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {selectedIndex + 1} / {items.length}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-black leading-tight text-white sm:text-2xl">{selectedItem.title}</h3>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-300">{selectedItem.description}</p>

          {items.length > 1 && (
            <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 sm:hidden">
              <button
                type="button"
                onClick={onPrevious}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#fcc42c]"
                aria-label="Previous gallery image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#fcc42c]"
                aria-label="Next gallery image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
