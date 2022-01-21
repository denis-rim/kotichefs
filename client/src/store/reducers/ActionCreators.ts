import axios from "axios";
import { AppDispatch } from "../store";
import { userSlice } from "./UserSlice";
import { UserModel } from "../../models/UserModel";

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
  } catch (err) {
    console.log(err);
    // @ts-ignore
    dispatch(userSlice.actions.usersFetchingError(err.message));
  }
};

export const loginUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetchingError(null));

    dispatch(userSlice.actions.setLoading(true));

    const response = await axios.post(
      "http://localhost:5000/api/sessions",
      {
        email: "user.mazurchuk@gmail.com",
        password: "secret",
      },
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.setUser(response.data));
    dispatch(userSlice.actions.setLoading(false));
  } catch (err) {
    console.log(err);
    // @ts-ignore
    dispatch(userSlice.actions.usersFetchingError(err.message));
  }
};

export const me = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get<UserModel>(
      "http://localhost:5000/api/user/me",
      {
        withCredentials: true,
      }
    );
    console.log(data);
  } catch (err) {
    console.log(err);
    // @ts-ignore
    dispatch(userSlice.actions.usersFetchingError(err.message));
  }
};
