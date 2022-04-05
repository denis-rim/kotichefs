import { PublicChefModel } from "../../../models/UserModel";

import { api } from "../apiClient";

export function fetchPromotedChefs() {
  return api.get<null, { data: PublicChefModel[] }>("/chefs/promoted");
}

export function fetchChefs() {
  return api.get<null, { data: PublicChefModel[] }>("/chefs");
}

export function fetchChefById(id: string) {
  return api.get<null, { data: PublicChefModel }>(`/chefs/${id}`);
}
