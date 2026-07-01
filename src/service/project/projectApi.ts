import { CommonApi } from "@/lib/CommonApi"
import type { GalleryResponse, ProjectsResponse } from "./types"

export const GetProjectsApi = async (): Promise<ProjectsResponse> => {
  return await CommonApi("GET", "/project/projects/")
}

export const GetProjectGalleryApi = async (): Promise<GalleryResponse> => {
  return await CommonApi("GET", "/project/gallery/")
}
