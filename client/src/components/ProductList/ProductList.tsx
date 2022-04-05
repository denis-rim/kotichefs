import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { ProductModel } from "../../models/ProductModel";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllProductsAction } from "../../store/actions/ProductActionCreators";

import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";

function ProductList() {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(
    (state) => state.productReducer
  );

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    dispatch(getAllProductsAction(page));
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
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
