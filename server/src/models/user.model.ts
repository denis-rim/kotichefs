import mongoose, { model, Schema } from "mongoose";

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

export enum UserRole {
  Admin = "admin",
  User = "user",
  Chef = "chef",
}

export interface UserDocument extends mongoose.Document {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  confirmHash: string;
  photo_url: string;
  role: UserRole;
  orders: string[];
  menu: string[];
  cuisine: Cuisine[];
  promoted: boolean;
  about: string;
  phone: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type PublicUser = Pick<
  UserDocument,
  | "username"
  | "fullName"
  | "address"
  | "photo_url"
  | "role"
  | "rating"
  | "cuisine"
  | "menu"
>;

// TODO: find another way to do this
export interface SafeUser extends PublicUser {
  password?: string;
  confirmHash?: string;
  __v?: number;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    confirmHash: {
      type: String,
      // required: true,
    },
    photo_url: {
      type: String,
      default:
        "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png",
    },
    address: {
      type: String,
      default: "Helsinki",
    },
    orders: {
      type: [String],
      default: [],
    },
    menu: {
      type: [String],
      default: [],
    },
    cuisine: {
      type: [String],
      default: [],
    },
    promoted: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, returnedObject: SafeUser) => {
    delete returnedObject.password;
    delete returnedObject.confirmHash;
    delete returnedObject.__v;
    return returnedObject;
  },
});

export const UserModel = model<UserDocument>("User", UserSchema);
