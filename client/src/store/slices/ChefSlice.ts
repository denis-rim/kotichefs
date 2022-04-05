import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getChefs,
  getPromotedChefs,
  getChefPublicInfo,
} from "../actions/ChefActionCreators";
import { PublicChefModel } from "../../models/UserModel";

interface ChefSlice {
  promotedChefs: PublicChefModel[];
  chefs: PublicChefModel[];
  currentChef: PublicChefModel | null;
  isLoading: boolean;
  error: null | string;
}

const initialState: ChefSlice = {
  promotedChefs: [],
  chefs: [],
  currentChef: null,
  isLoading: false,
  error: null,
};

export const chefSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {},
  extraReducers: {
    // Get promoted chefs
    [getPromotedChefs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPromotedChefs.fulfilled.type]: (
      state,
      action: PayloadAction<PublicChefModel[]>
    ) => {
      state.promotedChefs = action.payload;
      state.isLoading = false;
    },
    [getPromotedChefs.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    // Get all chefs
    [getChefs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getChefs.fulfilled.type]: (
      state,
      action: PayloadAction<PublicChefModel[]>
    ) => {
      state.chefs = action.payload;
      state.isLoading = false;
    },
    [getChefs.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    // Get chef info
    [getChefPublicInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getChefPublicInfo.fulfilled.type]: (
      state,
      action: PayloadAction<PublicChefModel>
    ) => {
      state.currentChef = action.payload;
      state.isLoading = false;
    },
    [getChefPublicInfo.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default chefSlice.reducer;
