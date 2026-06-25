import { CommonApi } from "@/lib/CommonApi";
import type { ProductNavigationResponse } from "./types";

// Get product navigation for navbar
export const GetProductNavigationApi = async (): Promise<ProductNavigationResponse> => {
    return await CommonApi("GET", `/navigations/product-navigation/`);
};
