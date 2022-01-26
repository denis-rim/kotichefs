import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";

export async function createProduct(
  input: DocumentDefinition<Omit<ProductInput, "createdAt | updatedAt">>
) {
  return ProductModel.create(input);
}

export async function getAllProducts(
  query: FilterQuery<ProductDocument>,
  skip: number,
  limit: number
) {
  return ProductModel.find(query).limit(limit).skip(skip);
}

export async function getAllProductsCount(query: FilterQuery<ProductDocument>) {
  return ProductModel.estimatedDocumentCount(query);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options).populate("user", {
    _id: 1,
    username: 1,
    photo_url: 1,
    rating: 1,
  });
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
