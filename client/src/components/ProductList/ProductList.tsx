import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllProducts } from "../../store/actions/ProductActionCreators";
import ProductCard from "../ProductCard/ProductCard";
import { Link, Outlet } from "react-router-dom";
import { ProductModel } from "../../services/api/handlers/product";

function ProductList() {
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch]);

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
