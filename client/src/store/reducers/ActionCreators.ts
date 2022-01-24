import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/api/handlers/auth";
import { CreateUserInput, LoginUserInput } from "../../services/validation";
import axios from "axios";
import { UserModelPublic } from "../../models/UserModel";
import { NavigateFunction } from "react-router-dom";

// export const me = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.userFetching());
//     const { data } = await axios.get<UserModel>(
//       "http://localhost:5000/api/user/me1",
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(userSlice.actions.userFetchingSuccess(data));
//   } catch (err) {
//     console.log(err);
//     // @ts-ignore
//     dispatch(userSlice.actions.setUserLoadingError(err.message));
//   }
// };

// Login user action creator
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { body, navigate }: { body: LoginUserInput; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(body);
      navigate("/");
      return response.data;
    } catch (err: any) {
      console.warn(err);

      // If email or password is incorrect we reject with error message
      if (err.response.status === 401) {
        return rejectWithValue(err.response.data);
      }
      // If any other error we reject with generic error message
      return rejectWithValue("Something went wrong...");
    }
  }
);

// Register user action creator
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { body, navigate }: { body: CreateUserInput; navigate: NavigateFunction },
    { rejectWithValue }
  ) => {
    try {
      const response = await register(body);
      navigate("/");
      return response.data;
    } catch (err: any) {
      console.warn(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Me action creator
export const me = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<UserModelPublic>(
        "http://localhost:5000/api/user/me",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      console.warn(err);
      return rejectWithValue("Failed to load user");
    }
  }
);
