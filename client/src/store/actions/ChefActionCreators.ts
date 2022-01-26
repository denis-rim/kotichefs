import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPromotedChefs } from "../../services/api/handlers/chef";

// Fetch promoted chefs
export const getPromotedChefs = createAsyncThunk(
  "chefs/fetchPromotedChefs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPromotedChefs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
