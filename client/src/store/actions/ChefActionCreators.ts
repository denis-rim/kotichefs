import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchPromotedChefs,
  fetchChefs,
  fetchChefById,
} from "../../services/api/handlers/chef";

// Get promoted chefs
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

// Get all chefs
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

// Get chef public info action creator
export const getChefPublicInfo = createAsyncThunk(
  "chefs/fetchChefPublicInfo",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchChefById(id);
      return response.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue("Failed to load user");
    }
  }
);
