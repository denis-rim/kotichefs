import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";

const Layout = ({
  title = "kotiChefs All The Food Experiences. All In One Place.",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  return (
    <>
      <SEO title={title} />
      {location.pathname === "/" ? <Header /> : null}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </>
  );
};

export default Layout;
