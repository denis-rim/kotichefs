import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Menu from "../HomePage/Menu";
import Container from "../Container/Container";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Menu />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
