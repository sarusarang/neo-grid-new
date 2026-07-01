export interface ProjectImage {
  id: number
  image: string
  created_at: string
  updated_at: string
  project: number
}

export interface Project {
  id: number
  images: ProjectImage[]
  title: string
  category?: string
  description: string
  location: string
  created_at: string
  updated_at: string
}

export interface ProjectsResponse {
  message: string
  data: Project[]
}

export interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  created_at: string
  updated_at: string
}

export interface GalleryResponse {
  message: string
  data: GalleryItem[]
}
