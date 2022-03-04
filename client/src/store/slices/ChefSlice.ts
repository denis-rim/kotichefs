import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPromotedChefs } from "../actions/ChefActionCreators";
import {PublicChef} from "../../models/UserModel";

interface ChefSlice {
  promotedChefs: PublicChef[];
  chefs: PublicChef[];
  isLoading: boolean;
  error: string;
}

const initialState: ChefSlice = {
  promotedChefs: [],
  chefs: [],
  isLoading: false,
  error: "",
};

export const chefSlice = createSlice({
  name: "chef",
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
  },
});

export default chefSlice.reducer;
