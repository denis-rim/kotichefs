import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
  );
}

export default Container;
