import { api } from "../apiClient";
import { ProductModel } from "../../../models/ProductModel";

interface PublicChefProductsResponse {
  data: {
    pagination: { count: number; pageCount: number };
    products: ProductModel[];
  };
}

interface ProductResponse {
  pagination: { count: number; pagesCount: number };
  products: ProductModel[];
}

export function fetchProducts(page: number) {
  return api.get<null, { data: ProductResponse }>(`/products?page=${page}`);
}

export function fetchProduct(id: string) {
  return api.get<null, { data: ProductModel }>(`/products/${id}`);
}

export function fetchChefProducts(id: string, page: number) {
  return api.get<null, PublicChefProductsResponse>(
    `products/chef/?userId=${id}&page=${page}`
  );
}
