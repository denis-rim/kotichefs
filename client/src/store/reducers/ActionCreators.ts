import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/api/handlers/auth";
import { me } from "../../services/api/handlers/user";
import { CreateUserInput, LoginUserInput } from "../../services/validation";
import { NavigateFunction } from "react-router-dom";
import { fetchProducts } from "../../services/api/handlers/product";

// Login user action creator
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { body, navigate }: { body: LoginUserInput; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(body);
      navigate("/");
      return response.data;
    } catch (err: any) {
      console.warn(err);

      // If email or password is incorrect we reject with error message
      if (err.response.status === 401) {
        return rejectWithValue(err.response.data);
      }
      // If any other error we reject with generic error message
      return rejectWithValue("Something went wrong...");
    }
  }
);

// Register user action creator
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { body, navigate }: { body: CreateUserInput; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await register(body);
      navigate("/");
      return response.data;
    } catch (err: any) {
      console.warn(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Me action creator
export const currentUserData = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await me();
      return response.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue("Failed to load user");
    }
  }
);

// Fetch products action creator
export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchProducts(page);
      return response.data.products;
    } catch (err) {
      console.warn(err);
      return rejectWithValue(err);
    }
  }
);
