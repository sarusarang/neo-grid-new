export interface ProductImage {
  id?: number;
  image: string;
  created_at?: string;
  updated_at?: string;
  product?: number;
}

export interface ProductDepartmentDetail {
  id: number;
  name: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface ProductFamilyDetail {
  id: number;
  name: string;
  department: ProductDepartmentDetail;
}

export interface Product {
  id: number;
  family: ProductFamilyDetail;
  name: string;
  model_type?: string;
  model_number?: string;
  price: string | number;
  discount_percentage: string | number;
  discount_price: string | number;
  description: string;
  additional_info?: string;
  technical_spec?: string;
  warrenty_info?: string;
  new_arrival: boolean;
  is_available: boolean;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface Family {
  name: string;
  image: string | null;
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

export interface ProductFilterCategoryData {
  departments: string[];
  families: string[];
}

export interface ProductFilterCategoryParams {
  department?: string;
  family?: string;
}

export interface ProductFilterCategoryResponse {
  status: number;
  message: string;
  data: ProductFilterCategoryData;
}

export interface ProductsParams {
  department?: string;
  family?: string;
  min_price?: string | number;
  max_price?: string | number;
  page?: string | number;
}

export interface ProductsMeta {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
}

export interface ProductsResponse {
  status: number;
  message: string;
  data: Product[];
  banner: ProductDepartmentDetail | null;
  meta: ProductsMeta;
}

export interface ProductDetailResponse {
  status: number;
  message: string;
  data: Product;
}

export interface ProductSliderResponse {
  status?: number;
  message: string;
  data: Product[];
}
