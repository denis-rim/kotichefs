import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductResponse } from "../../services/api/handlers/product";

import {
  getAllProductsAction,
  getChefProductsAction,
} from "../actions/ProductActionCreators";

interface ProductState {
  products: ProductResponse["products"];
  pagination: ProductResponse["pagination"];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  pagination: {
    count: 0,
    pagesCount: 0,
  },
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
      state.products = [];
      state.pagination = {
        count: 0,
        pagesCount: 0,
      };
      state.isLoading = true;
    },
    [getAllProductsAction.fulfilled.type]: (
      state,
      action: PayloadAction<ProductResponse>
    ) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    },
    [getAllProductsAction.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
    // Fetch Chef products
    [getChefProductsAction.pending.type]: (state) => {
      state.products = [];
      state.pagination = {
        count: 0,
        pagesCount: 0,
      };
      state.isLoading = true;
    },
    [getChefProductsAction.fulfilled.type]: (
      state,
      action: PayloadAction<ProductResponse>
    ) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    },
    [getChefProductsAction.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
