import { useQuery } from "@tanstack/react-query";
import { GetHomeSlidersApi, GetProductDepartmentsApi } from "./homeApi";
import type { HomeSlidersResponse, ProductDepartmentsResponse } from "./types";

export const useHomeSliders = () => {
  return useQuery<HomeSlidersResponse>({
    queryKey: ["home-sliders"],
    queryFn: async () => {
      return await GetHomeSlidersApi();
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductDepartments = () => {
  return useQuery<ProductDepartmentsResponse>({
    queryKey: ["product-departments"],
    queryFn: async () => {
      return await GetProductDepartmentsApi();
    },
    staleTime: 10 * 60 * 1000,
  });
};
