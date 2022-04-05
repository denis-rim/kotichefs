export interface ProductModel {
  _id: string;
  user: string;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string[];
  rating: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}
