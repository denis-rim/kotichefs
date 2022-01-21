import { UserModel } from "../../models/UserModel";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserModel | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserLoadingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
