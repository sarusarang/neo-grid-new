import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCartApi, AddToCartApi, UpdateCartItemApi, DeleteCartItemApi, ClearCartApi } from "./cartApi";
import type { CartResponse, AddToCartPayload, UpdateCartPayload } from "./types";
import { toast } from "sonner";


// Query key constant
export const CART_QUERY_KEY = ["cart"];



// Hook to fetch user cart
export const useGetCart = (options?: { enabled?: boolean }) => {

    return useQuery<CartResponse>({

        queryKey: CART_QUERY_KEY,

        queryFn: async () => {
            return await GetCartApi();
        },

        staleTime: 1 * 60 * 1000, // 1 minute
        ...options,

    });

};



// Hook to add item to cart
export const useAddToCart = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (payload: AddToCartPayload) => {
            return await AddToCartApi(payload);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Item added to cart successfully!");
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to add item to cart.");
        },

    });

};



// Hook to update cart item quantity
export const useUpdateCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (payload: UpdateCartPayload) => {

            return await UpdateCartItemApi(payload);

        },

        onSuccess: (data) => {
            toast.success(data?.message || "Cart updated successfully!");
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to update quantity.");
        },

    });

};



// Hook to delete single item from cart
export const useDeleteCartItem = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (itemId: number | string) => {
            return await DeleteCartItemApi(itemId);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Item removed from cart!");
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to remove item from cart.");
        },

    });

};



// Hook to clear complete cart
export const useClearCart = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async () => {
            return await ClearCartApi();
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Cart cleared successfully!");
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to clear cart.");
        },

    });

};
