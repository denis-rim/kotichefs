import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChefs, getPromotedChefs } from "../actions/ChefActionCreators";
import { PublicChef } from "../../models/UserModel";

interface ChefSlice {
  promotedChefs: PublicChef[];
  chefs: PublicChef[];
  isLoading: boolean;
  error: null | string;
}

const initialState: ChefSlice = {
  promotedChefs: [],
  chefs: [],
  isLoading: false,
  error: null,
};

export const chefSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {},
  extraReducers: {
    [getPromotedChefs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPromotedChefs.fulfilled.type]: (
      state,
      action: PayloadAction<PublicChef[]>
    ) => {
      state.promotedChefs = action.payload;
      state.isLoading = false;
    },
    [getPromotedChefs.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    [getChefs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getChefs.fulfilled.type]: (state, action: PayloadAction<PublicChef[]>) => {
      state.chefs = action.payload;
      state.isLoading = false;
    },
    [getChefs.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default chefSlice.reducer;
