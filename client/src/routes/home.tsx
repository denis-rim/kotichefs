import React from 'react'
import MeetChefs from "../components/HomePage/MeetChefs";
import SEO from "../components/Layout/SEO";
import ProductList from "../components/ProductList/ProductList";

function Home() {
  return (
    <>
      <SEO title="kotiChefs | Home" />
      <MeetChefs />
      <ProductList />
    </>
  );
}

export default Home;
