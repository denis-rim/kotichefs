import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  currentUserData,
  loginUser,
  registerUser,
} from "../actions/UserActionCreators";
import { PublicUser } from "../../models/UserModel";

interface UserState {
  user: PublicUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // Get current user info
    [currentUserData.fulfilled.type]: (
      state,
      action: PayloadAction<PublicUser>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    [currentUserData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [currentUserData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Login user
    [loginUser.fulfilled.type]: (state, action: PayloadAction<PublicUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = "";
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    // Register User
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<PublicUser>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = "";
    },
    [registerUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
