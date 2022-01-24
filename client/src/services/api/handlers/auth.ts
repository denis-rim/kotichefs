import { api } from "../apiClient";
import { CreateUserInput, LoginUserInput } from "../../validation";
import { UserModelPublic } from "../../../models/UserModel";

export const register = (body: CreateUserInput) => {
  return api.post<CreateUserInput, { data: UserModelPublic }>(
    "/user/register",
    body
  );
};

export const login = (body: LoginUserInput) => {
  return api.post<LoginUserInput, { data: UserModelPublic }>("/sessions", body);
};

export const logout = () => {
  return api.delete("/sessions/sessions").then(() => {
    localStorage.removeItem("persist:root");
  });
};
