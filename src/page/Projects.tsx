import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import GalleryCard from "@/components/projects/GalleryCard"
import GalleryLightbox from "@/components/projects/GalleryLightbox"
import ProjectCard from "@/components/projects/ProjectCard"
import ProjectDetailModal from "@/components/projects/ProjectDetailModal"
import { ProjectEmptyState, ProjectErrorState, ProjectGridSkeleton } from "@/components/projects/ProjectPageStates"
import ProjectStatsBand from "@/components/projects/ProjectStatsBand"
import ProjectToolbar from "@/components/projects/ProjectToolbar"
import {
  FALLBACK_PROJECT_IMAGE,
  filterGalleryItems,
  filterProjects,
  getProjectCategories,
  getProjectCoverImage,
} from "@/components/projects/projectHelpers"
import { useProjectGallery, useProjects } from "@/service/project/useProject"
import type { Project } from "@/service/project/types"

type ProjectTab = "projects" | "gallery"

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("projects")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState(0)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const projectsQuery = useProjects()
  const galleryQuery = useProjectGallery()

  const projects = useMemo(() => projectsQuery.data?.data ?? [], [projectsQuery.data?.data])
  const galleryItems = useMemo(() => galleryQuery.data?.data ?? [], [galleryQuery.data?.data])

  const projectCategories = useMemo(() => getProjectCategories(projects), [projects])
  const categoryFilters = useMemo(
    () =>
      projectCategories.map((category) => ({
        name: category,
        count:
          category === "All"
            ? projects.length
            : projects.filter((project) => project.category?.trim() === category).length,
      })),
    [projectCategories, projects]
  )
  const filteredProjects = useMemo(
    () => filterProjects(projects, searchQuery, selectedCategory),
    [projects, searchQuery, selectedCategory]
  )
  const filteredGalleryItems = useMemo(() => filterGalleryItems(galleryItems, searchQuery), [galleryItems, searchQuery])

  const isLoading = projectsQuery.isLoading || galleryQuery.isLoading
  const isError = projectsQuery.isError || galleryQuery.isError
  const isFetching = (projectsQuery.isFetching || galleryQuery.isFetching) && !isLoading
  const isModalOpen = Boolean(selectedProject) || selectedGalleryIndex !== null

  const heroImage = useMemo(() => {
    if (projects[0]) return getProjectCoverImage(projects[0])
    if (galleryItems[0]?.image) return galleryItems[0].image
    return FALLBACK_PROJECT_IMAGE
  }, [galleryItems, projects])

  const handleTabChange = (tab: ProjectTab) => {
    setActiveTab(tab)
    setSelectedCategory("All")
    setSearchQuery("")
    setSelectedGalleryIndex(null)
    setSelectedProject(null)
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setActiveProjectImageIndex(0)
  }

  const handleGallerySelect = (index: number) => {
    setDirection(0)
    setSelectedGalleryIndex(index)
  }

  const handlePreviousGalleryImage = useCallback(() => {
    if (selectedGalleryIndex === null || filteredGalleryItems.length === 0) return
    setDirection(-1)
    setSelectedGalleryIndex((selectedGalleryIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length)
  }, [filteredGalleryItems.length, selectedGalleryIndex])

  const handleNextGalleryImage = useCallback(() => {
    if (selectedGalleryIndex === null || filteredGalleryItems.length === 0) return
    setDirection(1)
    setSelectedGalleryIndex((selectedGalleryIndex + 1) % filteredGalleryItems.length)
  }, [filteredGalleryItems.length, selectedGalleryIndex])

  const handleRetry = () => {
    void projectsQuery.refetch()
    void galleryQuery.refetch()
  }

  useEffect(() => {
    if (selectedGalleryIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedGalleryIndex(null)
      if (event.key === "ArrowLeft") handlePreviousGalleryImage()
      if (event.key === "ArrowRight") handleNextGalleryImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNextGalleryImage, handlePreviousGalleryImage, selectedGalleryIndex])

  useEffect(() => {
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isModalOpen])

  return (
    <div className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-44">
        <div className="absolute inset-0">
          <img src={heroImage} loading="lazy" alt="Project and gallery banner" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a1e] via-[#011a1e]/50 to-[#011a1e]/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl"
          >
            Project & <span className="text-[#fcc42c]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg"
          >
            Explore our completed project work and field gallery from the latest published updates.
          </motion.p>
        </div>
      </section>

      <ProjectStatsBand />

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <ProjectToolbar
            activeTab={activeTab}
            categories={categoryFilters}
            isFetching={isFetching}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />

          {isLoading && <ProjectGridSkeleton variant={activeTab} />}

          {!isLoading && isError && <ProjectErrorState onRetry={handleRetry} />}

          {!isLoading && !isError && activeTab === "projects" && (
            <>
              {filteredProjects.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} onSelect={handleProjectSelect} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <ProjectEmptyState
                  activeTab={activeTab}
                  hasSearch={Boolean(searchQuery.trim())}
                  onReset={() => setSearchQuery("")}
                />
              )}
            </>
          )}

          {!isLoading && !isError && activeTab === "gallery" && (
            <>
              {filteredGalleryItems.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filteredGalleryItems.map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} onSelect={handleGallerySelect} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <ProjectEmptyState
                  activeTab={activeTab}
                  hasSearch={Boolean(searchQuery.trim())}
                  onReset={() => setSearchQuery("")}
                />
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        <ProjectDetailModal
          project={selectedProject}
          activeImageIndex={activeProjectImageIndex}
          onClose={() => setSelectedProject(null)}
          onImageChange={setActiveProjectImageIndex}
        />
      </AnimatePresence>

      <AnimatePresence>
        <GalleryLightbox
          direction={direction}
          items={filteredGalleryItems}
          onClose={() => setSelectedGalleryIndex(null)}
          onNext={handleNextGalleryImage}
          onPrevious={handlePreviousGalleryImage}
          selectedIndex={selectedGalleryIndex}
        />
      </AnimatePresence>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-[#022a30] p-6 text-center sm:p-10 lg:p-12">
            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Have a Specific Project in Mind?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Share your site details with our team and we will help plan the right solar setup for your space.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="tel:+919846131500"
                className="inline-flex items-center justify-center rounded-lg bg-[#fcc42c] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#011a1e] transition-colors hover:bg-white"
              >
                Call +91 98461 31500
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              >
                Get Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
