import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./routes/home";
import Layout from "./components/Layout/Layout";
import AllChefs from "./routes/all-chefs";

const LoginPage = React.lazy(() => import("./routes/login"));
const RegisterPage = React.lazy(() => import("./routes/register"));
const ProductPage = React.lazy(() => import("./routes/product"));
const ProductsPage = React.lazy(() => import("./routes/products"));
const CreatePage = React.lazy(() => import("./routes/create"));
const NotFoundPage = React.lazy(() => import("./routes/404"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

               {/*Auth routes */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Product routes */}
              <Route path="products">
                <Route index element={<ProductsPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              <Route path='chefs' element={<AllChefs/>} />

              {/* Chefs routes */}
              <Route path="create" element={<CreatePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
