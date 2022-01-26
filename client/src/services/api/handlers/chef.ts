import { api } from "../apiClient";

export interface ChefModel {
  _id: string;
  fullName: string;
  photo_url: string;
  cuisine: string[];
  about: string;
}

export function fetchPromotedChefs() {
  return api.get<null, { data: ChefModel }>("/chefs/promoted");
}
