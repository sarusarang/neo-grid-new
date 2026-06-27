import { useQuery } from "@tanstack/react-query";
import { GetProductDetailApi, GetProductFilterCategoryApi, GetProductNavigationApi, GetProductSliderApi, GetProductsApi, } from "./authApi";
import type { ProductDetailResponse, ProductFilterCategoryParams, ProductFilterCategoryResponse, ProductNavigationResponse, ProductSliderResponse, ProductsParams, ProductsResponse, } from "./types";




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



// React Query hook for product filter category API
export const useProductFilterCategory = (params: ProductFilterCategoryParams = {}) => {

    return useQuery<ProductFilterCategoryResponse>({

        queryKey: ["product-filter-category", params.department ?? "", params.family ?? ""],

        queryFn: async () => {

            return await GetProductFilterCategoryApi(params);

        },

        staleTime: 10 * 60 * 1000, // 10 minutes

    });

};



// React Query hook for filtered product listing API
export const useProducts = (params: ProductsParams = {}) => {

    return useQuery<ProductsResponse>({

        queryKey: [
            "products",
            params.department ?? "",
            params.family ?? "",
            params.min_price ?? "",
            params.max_price ?? "",
            params.page ?? 1,
        ],  
        
        queryFn: async () => {
        
            return await GetProductsApi(params);
        
        },
        
        staleTime: 2 * 60 * 1000, // 2 minutes
   
    });

};



// React Query hook for product slider API
export const useProductSlider = () => {

    return useQuery<ProductSliderResponse>({

        queryKey: ["product-slider"],

        queryFn: async () => {

            return await GetProductSliderApi();

        },

        staleTime: 5 * 60 * 1000, // 5 minutes

    });

};



// React Query hook for single product detail API
export const useProductDetail = (id?: string | number) => {

    return useQuery<ProductDetailResponse>({

        queryKey: ["product-detail", id ?? ""],

        queryFn: async () => {

            return await GetProductDetailApi(id as string | number);

        },

        enabled: Boolean(id),

        staleTime: 5 * 60 * 1000, // 5 minutes

    });

};
