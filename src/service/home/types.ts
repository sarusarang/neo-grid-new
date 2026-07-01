export interface HomeSlider {
  id: number;
  image: string;
  title: string;
  title_2: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface HomeSlidersResponse {
  message: string;
  data: HomeSlider[];
}

export interface ProductDepartment {
  id: number;
  name: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
}

export interface ProductDepartmentsResponse {
  message: string;
  data: ProductDepartment[];
}
