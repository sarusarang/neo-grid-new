export interface CartProductImage {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  product: number;
}

export interface CartProduct {
  id: number;
  images: CartProductImage[];
  name: string;
  model_type: string;
  model_number: string;
  price: string;
  discount_percentage: string;
  discount_price: string;
  description: string;
  additional_info: string;
  technical_spec: string;
  warrenty_info: string;
  new_arrival: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  family: number | null | any;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  price_at_addition: string;
  created_at: string;
  updated_at: string;
  cart: number;
}

export interface CartGroup {
  id: number;
  user: number;
  items: CartItem[];
  total_value: number | null;
  created_at: string;
  updated_at: string;
}

export interface CartResponse {
  message: string;
  data: CartGroup[];
  total_products: number;
  total_amount: number;
  total_discount: number;
  shipping_charge: number;
  orginal_amount: number;
  original_amount?: number;
}

export interface AddToCartPayload {
  product_id: number | string;
  quantity: number;
}

export interface UpdateCartPayload {
  item_id: number | string;
  quantity: number;
}
