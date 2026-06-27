import { CommonApi } from "@/lib/CommonApi";
import type { CartResponse, AddToCartPayload, UpdateCartPayload } from "./types";



// Get user cart
export const GetCartApi = async (): Promise<CartResponse> => {

    return await CommonApi("GET", `/user/cart/`);

};



// Add item to cart
export const AddToCartApi = async (data: AddToCartPayload): Promise<any> => {

    return await CommonApi("POST", `/user/cart/add/`, data);

};



// Update cart item quantity: user/cart/update/id/ = PATCH (quantity as query param / body)
export const UpdateCartItemApi = async (data: UpdateCartPayload): Promise<any> => {

    const { item_id, quantity } = data;

    return await CommonApi("PATCH", `/user/cart/update/${item_id}/?quantity=${quantity}`, { quantity });

};


// Delete single cart item: user/cart/delete/id/ = DELETE
export const DeleteCartItemApi = async (itemId: number | string): Promise<any> => {

    return await CommonApi("DELETE", `/user/cart/delete/${itemId}/`);

};


// Delete complete cart: user/cart/delete/ = DELETE
export const ClearCartApi = async (): Promise<any> => {

    return await CommonApi("DELETE", `/user/cart/delete/`);

};
