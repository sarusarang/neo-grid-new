import { CommonApi } from "@/lib/CommonApi";
import type { HomeSlidersResponse } from "./types";

export const GetHomeSlidersApi = async (): Promise<HomeSlidersResponse> => {
  return await CommonApi("GET", "/ui/home/slider/");
};
