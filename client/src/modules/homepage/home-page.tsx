import React from "react";
import MeetChefs from "../../components/HomePage/MeetChefs";
import SEO from "../../components/Layout/SEO";
import ProductList from "../common/ProductCard/ProductList";

function HomePage() {
  return (
    <>
      <SEO title="kotiChefs | HomePage" />
      <MeetChefs />
      <ProductList />
    </>
  );
}

export default HomePage;
