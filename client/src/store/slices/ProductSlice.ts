import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductModel } from "../../models/ProductModel";

import {
  getAllProductsAction,
  getChefProductsAction,
} from "../actions/ProductActionCreators";

interface ProductState {
  products: ProductModel[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    // Fetch all products
    [getAllProductsAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllProductsAction.fulfilled.type]: (
      state,
      action: PayloadAction<ProductModel[]>
    ) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getAllProductsAction.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    // Fetch Chef products
    [getChefProductsAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getChefProductsAction.fulfilled.type]: (
      state,
      action: PayloadAction<ProductModel[]>
    ) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getChefProductsAction.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
