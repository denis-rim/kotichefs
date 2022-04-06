import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchChefProducts,
} from "../../services/api/handlers/product";

// Fetch all products action creator
export const getAllProductsAction = createAsyncThunk(
  "products/fetchProducts",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchProducts(page);
      return response.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue(err);
    }
  }
);

// Fetch all chef products action creator
export const getChefProductsAction = createAsyncThunk(
  "products/fetchChefProducts",
  async (
    { chefId, page }: { chefId: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchChefProducts(chefId, page);
      return response.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue(err);
    }
  }
);
