import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModelPublic } from "../../models/UserModel";
import {
  currentUserData,
  loginUser,
  registerUser,
} from "../actions/UserActionCreators";

interface UserState {
  user: UserModelPublic | null;
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
    [currentUserData.fulfilled.type]: (
      state,
      action: PayloadAction<UserModelPublic>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    [currentUserData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [currentUserData.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    [loginUser.fulfilled.type]: (
      state,
      action: PayloadAction<UserModelPublic>
    ) => {
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
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<UserModelPublic>
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
