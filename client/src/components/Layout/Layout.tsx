import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import Header from "./Header";

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
      {/*{location.pathname === "/" ? <Header /> : null}*/}
      <Header />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
    </>
  );
};

export default Layout;
