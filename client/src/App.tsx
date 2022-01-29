import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./routes/home";
import ProductDetail from "./components/ProductList/ProductDetail";
import Layout from "./components/Layout/Layout";

const LoginPage = React.lazy(() => import("./routes/login"));
const RegisterPage = React.lazy(() => import("./routes/register"));
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
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/products">
                <Route index element={<ProductsPage />} />
                <Route path=":productId" element={<ProductDetail />} />
              </Route>

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
