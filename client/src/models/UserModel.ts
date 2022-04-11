export enum UserRole {
  User = "user",
  Chef = "chef",
  Admin = "admin",
}

export enum Cuisine {
  Finnish = "finnish",
  Italian = "italian",
  Mexican = "mexican",
  Chinese = "chinese",
  Japanese = "japanese",
  Indian = "indian",
  Korean = "korean",
  Thai = "thai",
  Vietnamese = "vietnamese",
  American = "american",
  Russian = "russian",
}

export interface UserModel {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  city: string;
  salt: string;
  photo_url: string;
  role: UserRole;
  orders: string[];
  products: string[];
  cuisine: Cuisine[];
  promoted: boolean;
  about: string;
  phone: string;
  rating: number;
  verified: boolean;
  isAdmin: boolean;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Pick<
  UserModel,
  "_id" | "username" | "fullName" | "city" | "photo_url" | "role"
>;

export interface PublicChefModel extends UserModel {
  products: string[];
  promoted: boolean;
  rating: number;
}
