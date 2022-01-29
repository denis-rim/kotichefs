import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { ProductModel } from "../../services/api/handlers/product";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProductCard({ product }: { product: ProductModel }) {
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
          <a href={`/products/${product._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">3 reviews</p>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">
          {product.price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
