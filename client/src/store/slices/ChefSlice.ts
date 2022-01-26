import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChefModel } from "../../services/api/handlers/chef";
import { getPromotedChefs } from "../actions/ChefActionCreators";

interface ChefSlice {
  promotedChefs: ChefModel[];
  chefs: ChefModel[];
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
    // [fetchChefs.pending]: (state) => {
    //     state.isLoading = true;
    // },
    // [fetchChefs.fulfilled]: (state, action) => {
    //     state.chefs = action.payload;
    //     state.isLoading = false;
    // },
    // [fetchChefs.rejected]: (state, action) => {
    //     state.error = action.error.message;
    //     state.isLoading = false;
    // },
    [getPromotedChefs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getPromotedChefs.fulfilled.type]: (
      state,
      action: PayloadAction<ChefModel[]>
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
