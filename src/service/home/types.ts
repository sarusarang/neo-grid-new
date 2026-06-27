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
