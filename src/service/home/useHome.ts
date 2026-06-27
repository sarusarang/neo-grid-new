import { useQuery } from "@tanstack/react-query";
import { GetHomeSlidersApi } from "./homeApi";
import type { HomeSlidersResponse } from "./types";

export const useHomeSliders = () => {
  return useQuery<HomeSlidersResponse>({
    queryKey: ["home-sliders"],
    queryFn: async () => {
      return await GetHomeSlidersApi();
    },
    staleTime: 5 * 60 * 1000,
  });
};
