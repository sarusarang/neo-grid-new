export interface ProductImage {
  image: string;
}

export interface Product {
  id: number;
  name: string;
  model_type?: string;
  model_number?: string;
  price: number;
  discount_percentage: number;
  discount_price: number;
  description: string;
  additional_info?: string;
  technical_spec?: string;
  new_arrival: boolean;
  is_available: boolean;
  images: ProductImage[];
}

export interface Family {
  name: string;
  products: Product[];
}

export interface Department {
  name: string;
  family: Family[];
}

export interface ProductNavigationResponse {
  status: number;
  message: string;
  data: Department[];
}
