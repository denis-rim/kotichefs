import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { ProductModel } from "../../models/ProductModel";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllProductsAction } from "../../store/actions/ProductActionCreators";

import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";

function ProductList() {
  const dispatch = useAppDispatch();
  const { products, pagination, isLoading } = useAppSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(getAllProductsAction(1));
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <>
      <ProductListComponent products={products} />
      <Outlet />
    </>
  );
}

function ProductListComponent({ products }: { products: ProductModel[] }) {
  return (
    <>
      <h2 className="sr-only">Chefs Products</h2>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:px-6 lg:px-8">
        <Link to="/products">Dine at the Chef’s Table</Link>
      </h2>

      <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
