import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/api/handlers/product";

// Fetch all products action creator
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
