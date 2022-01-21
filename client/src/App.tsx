import React from "react";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { loginUser, me } from "./store/reducers/ActionCreators";

function App() {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  console.log(user);
  console.log(isLoading);
  console.log(error);
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
      <button onClick={() => dispatch(loginUser())}>Login</button>
    </div>
  );
}

export default App;
