import { PublicChef } from "../../../models/UserModel";
import { api } from "../apiClient";

export function fetchPromotedChefs() {
  return api.get<null, { data: PublicChef[] }>("/chefs/promoted");
}

export function fetchChefs() {
  return api.get<null, { data: PublicChef[] }>("/chefs");
}
