import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAllProductsAction } from "../store/actions/ProductActionCreators";

import ProductCard from "../components/ProductCard/ProductCard";
import Spinner from "../components/Spinner/Spinner";
import Pagination from "../components/shared/Pagination/Pagination";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products, pagination, isLoading } = useAppSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    function fetchProducts() {
      dispatch(getAllProductsAction(1));
    }

    void fetchProducts();
  }, []);

  const handlePageClick = (event: { selected: number }) => {
    dispatch(getAllProductsAction(event.selected + 1));
  };

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <>
      <h2 className="sr-only">Chefs Products</h2>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:px-6 lg:px-8">
        <Link to="/products">Dine at the Chef’s Table</Link>
      </h2>

      <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <Spinner />
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      <Pagination
        pagesCount={pagination.pagesCount}
        onPageChange={handlePageClick}
      />
      <Outlet />
    </>
  );
}

export default ProductsPage;
