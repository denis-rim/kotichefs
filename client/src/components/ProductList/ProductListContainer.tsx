import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllProducts } from "../../store/actions/ProductActionCreators";
import { Outlet } from "react-router-dom";

function ProductListContainer() {
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch]);
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <h2 className="sr-only">Chefs Products</h2>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:px-6 lg:px-8">
          Dine at the Chef’s Table
        </h2>

        <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default ProductListContainer;
