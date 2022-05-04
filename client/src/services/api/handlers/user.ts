import { api } from "../apiClient";
import { UserModel } from "../../../models/UserModel";

export function me() {
  return api.get<null, { data: UserModel }>("/user/me");
}

export function updateUser(data: UserModel) {
  return api.put<null, { data: UserModel }>("/user/me", data);
}
