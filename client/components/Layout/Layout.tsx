import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>;
};

export default Layout;
