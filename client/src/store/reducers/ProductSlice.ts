import { ProductModel } from "../../services/api/handlers/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./ActionCreators";

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
    [fetchAllProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAllProducts.fulfilled.type]: (
      state,
      action: PayloadAction<ProductModel[]>
    ) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [fetchAllProducts.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default productSlice.reducer;
