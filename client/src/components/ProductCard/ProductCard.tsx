import React from "react";
import { Link } from "react-router-dom";

import { ProductModel } from "../../services/api/handlers/product";

import Rating from "../shared/Rating";

function ProductCard({ product }: { product: ProductModel }) {
  return (
    <ProductCardComponent product={product}>
      <Rating rating={product.rating} withNumOfReview={true} />
    </ProductCardComponent>
  );
}

function ProductCardComponent({
  product,
  children,
}: {
  product: ProductModel;
  children: React.ReactNode;
}) {
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
        {children}
        <p className="mt-4 text-base font-medium text-gray-900">
          {product.price} EUR
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
