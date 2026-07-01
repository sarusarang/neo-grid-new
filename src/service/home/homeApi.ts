import { CommonApi } from "@/lib/CommonApi";
import type { HomeSlidersResponse, ProductDepartmentsResponse } from "./types";

export const GetHomeSlidersApi = async (): Promise<HomeSlidersResponse> => {
  return await CommonApi("GET", "/ui/home/slider/");
};

export const GetProductDepartmentsApi = async (): Promise<ProductDepartmentsResponse> => {
  return await CommonApi("GET", "/ui/product/department/");
};
