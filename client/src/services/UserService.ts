import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserModelPublic } from "../models/UserModel";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    me: build.query<UserModelPublic, void>({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["User"],
    }),
    login: build.mutation<UserModelPublic, "">({
      query: (inputData) => ({
        url: "/user/login",
        method: "POST",
        data: inputData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
