export enum UserRole {
  User = "user",
  Chef = "chef",
  Admin = "admin",
}

interface UserBaseEntry {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  city: string;
  photo_url: string;
  role: UserRole;
  about: string;
  phone: string;
  verified: boolean;
  isAdmin: boolean;
  orders: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Pick<
  UserBaseEntry,
  "_id" | "username" | "fullName" | "city" | "photo_url" | "role"
>;

export type PrivateUser = Omit<
  UserBaseEntry,
  "products" | "promoted" | "rating"
>;

export interface PublicChef extends UserBaseEntry {
  products: string[];
  cuisine: string[];
  promoted: boolean;
  rating: number;
}

export interface PrivateChef extends UserBaseEntry {
  promoted: boolean;
  rating: number;
}
