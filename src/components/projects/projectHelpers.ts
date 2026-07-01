import type { GalleryItem, Project } from "@/service/project/types"

export const FALLBACK_PROJECT_IMAGE = "/1920-1080 service-01.jpg.jpeg"

export const getProjectImages = (project: Project) => {
  const images = project.images
    .map((item) => item.image)
    .filter((image): image is string => Boolean(image))

  return images.length > 0 ? images : [FALLBACK_PROJECT_IMAGE]
}

export const getProjectCoverImage = (project: Project) => getProjectImages(project)[0] ?? FALLBACK_PROJECT_IMAGE

export const getProjectCategory = (project: Project) => project.category?.trim() || "Uncategorized"

export const getProjectCategories = (projects: Project[]) => {
  const categories = new Set(
    projects
      .map((project) => project.category?.trim())
      .filter((category): category is string => Boolean(category))
  )

  return ["All", ...Array.from(categories)]
}

export const formatProjectDate = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently added"
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(parsedDate)
}

export const filterProjects = (projects: Project[], searchQuery: string, selectedCategory = "All") => {
  const query = searchQuery.trim().toLowerCase()

  const categoryFilteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => getProjectCategory(project) === selectedCategory)

  if (!query) return categoryFilteredProjects

  return categoryFilteredProjects.filter((project) =>
    [project.title, project.description, project.location].some((value) =>
      value.toLowerCase().includes(query)
    )
  )
}

export const filterGalleryItems = (items: GalleryItem[], searchQuery: string) => {
  const query = searchQuery.trim().toLowerCase()

  if (!query) return items

  return items.filter((item) =>
    [item.title, item.description].some((value) => value.toLowerCase().includes(query))
  )
}
