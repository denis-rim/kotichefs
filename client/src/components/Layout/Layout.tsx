import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "../HomePage/Menu";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Menu />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
