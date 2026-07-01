import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react"
import { Link } from "react-router-dom"
import type { Project } from "@/service/project/types"
import { formatProjectDate, getProjectImages } from "./projectHelpers"

interface ProjectDetailModalProps {
  activeImageIndex: number
  onClose: () => void
  onImageChange: (index: number) => void
  project: Project | null
}

export default function ProjectDetailModal({
  activeImageIndex,
  onClose,
  onImageChange,
  project,
}: ProjectDetailModalProps) {
  if (!project) return null

  const projectImages = getProjectImages(project)
  const activeImage = projectImages[activeImageIndex] ?? projectImages[0]
  const hasMultipleImages = projectImages.length > 1

  const showPreviousImage = () => {
    onImageChange((activeImageIndex - 1 + projectImages.length) % projectImages.length)
  }

  const showNextImage = () => {
    onImageChange((activeImageIndex + 1) % projectImages.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#011a1e]/92 p-3 backdrop-blur-md sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.94, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 18 }}
        className="relative my-auto h-[86dvh] min-h-[560px] w-full max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[#011a1e] shadow-2xl max-sm:min-h-[78dvh]"
      >
        <button
          type="button"
          aria-label="Close project details"
          onClick={onClose}
          className="absolute right-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#011a1e]/85 text-white shadow-lg transition-colors hover:bg-white hover:text-[#011a1e] sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            src={activeImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e] via-[#011a1e]/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#011a1e] via-[#011a1e]/90 to-transparent px-4 pb-4 pt-28 sm:px-7 sm:pb-7 sm:pt-36 lg:px-10 lg:pb-9">
          <div className="max-h-[66dvh] overflow-y-auto pr-1 scrollbar-hide">
            <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#04444c]/80 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#fcc42c]">
              <Images className="h-3 w-3" />
              {projectImages.length} {projectImages.length === 1 ? "Photo" : "Photos"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-300">
              <Calendar className="h-4 w-4 text-[#fcc42c]" />
              {formatProjectDate(project.created_at)}
            </span>
            </div>

            <h2 className="mb-3 max-w-4xl text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>
            <div className="mb-4 flex items-start gap-2 text-sm font-medium leading-relaxed text-gray-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#fcc42c]" />
              <span>{project.location}</span>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
              {project.description}
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              {hasMultipleImages && (
                <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide sm:max-w-md">
                  {projectImages.map((image, index) => (
                    <button
                      type="button"
                      key={`${image}-${index}`}
                      onClick={() => onImageChange(index)}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-colors sm:h-20 sm:w-28 ${
                        activeImageIndex === index ? "border-[#fcc42c]" : "border-white/20 hover:border-white/45"
                      }`}
                    >
                      <img src={image} alt={`${project.title} ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#fcc42c] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white sm:w-auto"
              >
                Inquire About Similar Setup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="Previous project image"
              onClick={showPreviousImage}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-[#fcc42c] hover:text-[#011a1e] sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next project image"
              onClick={showNextImage}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition-colors hover:bg-[#fcc42c] hover:text-[#011a1e] sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
