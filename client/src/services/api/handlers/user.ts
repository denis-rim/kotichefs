import { api } from "../apiClient";
import { UserModelPrivate } from "../../../models/UserModel";

export function me() {
  return api.get<null, { data: UserModelPrivate }>("/user/me");
}
