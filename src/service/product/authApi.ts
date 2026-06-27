import { CommonApi } from "@/lib/CommonApi";
import type {
    ProductDetailResponse,
    ProductFilterCategoryParams,
    ProductFilterCategoryResponse,
    ProductNavigationResponse,
    ProductsParams,
    ProductsResponse,
} from "./types";

// Get product navigation for navbar
export const GetProductNavigationApi = async (): Promise<ProductNavigationResponse> => {
    return await CommonApi("GET", `/navigations/product-navigation/`);
};

// Get dynamic product filter categories
export const GetProductFilterCategoryApi = async (
    params: ProductFilterCategoryParams = {}
): Promise<ProductFilterCategoryResponse> => {
    const query = new URLSearchParams();

    if (params.department) query.set("department", params.department);
    if (params.family) query.set("family", params.family);

    const queryString = query.toString();
    return await CommonApi(
        "GET",
        `/navigations/product-filter-category/${queryString ? `?${queryString}` : ""}`
    );
};

// Get products with backend filters and pagination
export const GetProductsApi = async (
    params: ProductsParams = {}
): Promise<ProductsResponse> => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value) !== "") {
            query.set(key, String(value));
        }
    });

    const queryString = query.toString();
    return await CommonApi("GET", `/products/${queryString ? `?${queryString}` : ""}`);
};

// Get single product detail
export const GetProductDetailApi = async (
    id: string | number
): Promise<ProductDetailResponse> => {
    return await CommonApi("GET", `/products/${id}/`);
};
