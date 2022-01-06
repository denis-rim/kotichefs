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
  passwordResetCode: string;
  address: string;
  verificationString: string;
  salt: string;
  photo_url: string;
  role: UserRole;
  orders: string[];
  menu: string[];
  cuisine: Cuisine[];
  promoted: boolean;
  about: string;
  phone: string;
  rating: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
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
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetCode: {
      type: String,
    },
    verificationString: {
      type: String,
      default: "",
    },
    salt: {
      type: String,
      default: "",
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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: (_, returnedObject: Partial<UserDocument>) => {
    delete returnedObject.password;
    delete returnedObject.verificationString;
    delete returnedObject.salt;
    delete returnedObject.__v;
    return returnedObject;
  },
});

export const User = model<UserDocument>("User", UserSchema);
