import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "./routes/home-page";
import AllChefsPage from "./routes/all-chefs-page";
import ChefPage from "./routes/chef-page";
import ProductsPage from "./routes/products-page";
import ProductPage from "./routes/product-page";

import Layout from "./components/Layout/Layout";

const LoginPage = React.lazy(() => import("./routes/login-page"));
const RegisterPage = React.lazy(() => import("./routes/register-page"));
const CreatePage = React.lazy(() => import("./routes/create-page"));
const NotFoundPage = React.lazy(() => import("./routes/404"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />

              {/*Auth routes */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Product routes */}
              <Route path="products">
                <Route index element={<ProductsPage />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>

              {/* Chef public routes */}
              <Route path="chefs">
                <Route index element={<AllChefsPage />} />
                <Route path=":chefId" element={<ChefPage />} />
              </Route>

              {/* Chefs private routes */}
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
