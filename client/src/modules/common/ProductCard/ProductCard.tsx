import React from "react";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../models/ProductModel";
import Rating from "../../../components/shared/Rating";

export default function ProductCard({ product }: { product: ProductModel }) {
  return (
    <div key={product._id} className="group relative p-4 sm:p-6">
      <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/products/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <Rating rating={product.rating} withReview={true} />
        <p className="mt-4 text-base font-medium text-gray-900">
          {product.price} EUR
        </p>
      </div>
    </div>
  );
}
