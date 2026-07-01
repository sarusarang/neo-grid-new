import { useQuery } from "@tanstack/react-query"
import { GetProjectGalleryApi, GetProjectsApi } from "./projectApi"
import type { GalleryResponse, ProjectsResponse } from "./types"

export const projectQueryKeys = {
  projects: ["project", "projects"],
  gallery: ["project", "gallery"],
} as const

export const useProjects = () => {
  return useQuery<ProjectsResponse>({
    queryKey: projectQueryKeys.projects,
    queryFn: async () => {
      return await GetProjectsApi()
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useProjectGallery = () => {
  return useQuery<GalleryResponse>({
    queryKey: projectQueryKeys.gallery,
    queryFn: async () => {
      return await GetProjectGalleryApi()
    },
    staleTime: 5 * 60 * 1000,
  })
}
