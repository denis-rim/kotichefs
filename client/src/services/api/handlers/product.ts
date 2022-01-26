import { api } from "../apiClient";

export interface ProductModel {
  _id: string;
  user: string;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
  rating: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

interface ProductResponse {
  pagination: { count: number; pagesCount: number };
  products: ProductModel[];
}

export function fetchProducts(page: number) {
  return api.get<null, { data: ProductResponse }>(`/products?page=${page}`);
}
