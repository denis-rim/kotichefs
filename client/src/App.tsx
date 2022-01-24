import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./routes/home";

const LoginPage = React.lazy(() => import("./routes/login"));
const RegisterPage = React.lazy(() => import("./routes/register"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </React.Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
