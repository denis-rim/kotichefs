import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchPromotedChefs,
  fetchChefs,
} from "../../services/api/handlers/chef";

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

export const getChefs = createAsyncThunk(
  "chefs/fetchChefs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchChefs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
