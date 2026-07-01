import { motion } from "framer-motion"
import { ArrowRight, Calendar, Images, MapPin } from "lucide-react"
import type { Project } from "@/service/project/types"
import { formatProjectDate, getProjectCoverImage } from "./projectHelpers"

interface ProjectCardProps {
  onSelect: (project: Project) => void
  project: Project
}

export default function ProjectCard({ onSelect, project }: ProjectCardProps) {
  const imageCount = project.images.length

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(project)}
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left transition-all duration-500 hover:border-[#fcc42c]/45 hover:bg-white/8 hover:shadow-2xl hover:shadow-[#04444c]/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#022a30]">
        <img
          src={getProjectCoverImage(project)}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e]/90 via-[#011a1e]/15 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#011a1e]/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#fcc42c] backdrop-blur-md">
          <Images className="h-3 w-3" />
          {imageCount || 1} {imageCount === 1 ? "Photo" : "Photos"}
        </div>
      </div>

      <div className="flex min-h-64 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-start gap-2 text-xs font-medium leading-relaxed text-gray-400">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#fcc42c]" />
          <span>{project.location}</span>
        </div>

        <h3 className="mb-3 text-xl font-extrabold leading-snug text-white transition-colors group-hover:text-[#fcc42c]">
          {project.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400">{project.description}</p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-4 text-xs font-bold text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#fcc42c]" />
            {formatProjectDate(project.created_at)}
          </span>
          <span className="inline-flex items-center gap-1 text-[#fcc42c] transition-all group-hover:gap-2">
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  )
}
