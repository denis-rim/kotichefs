import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "../HomePage/Menu";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Menu />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
