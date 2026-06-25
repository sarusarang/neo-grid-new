import { useQuery } from "@tanstack/react-query";
import { GetProductNavigationApi } from "./authApi";
import type { ProductNavigationResponse } from "./types";

// React Query hook for product navigation API
export const useProductNavigation = () => {
    return useQuery<ProductNavigationResponse>({
        queryKey: ["product-navigation"],
        queryFn: async () => {
            return await GetProductNavigationApi();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};
