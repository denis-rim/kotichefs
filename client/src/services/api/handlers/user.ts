import { api } from "../apiClient";
import { PrivateUser } from "../../../models/UserModel";

export function me() {
  return api.get<null, { data: PrivateUser }>("/user/me");
}
