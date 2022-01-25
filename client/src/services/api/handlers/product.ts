import { api } from "../apiClient";

export interface ProductModel {
  id: string;
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

export function fetchProducts() {
  console.log("fetchProducts");
  return api.get<null, { data: ProductModel[] }>("/products");
}
