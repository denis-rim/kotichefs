import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ProductDocument } from "./product.model";

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
  User = "user",
  Chef = "chef",
  Admin = "admin",
}

export interface UserDocument extends mongoose.Document {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  passwordHash: string;
  passwordResetCode: string;
  city: string;
  verificationString: string;
  salt: string;
  photo_url: string;
  role: UserRole;
  orders: string[];
  products: ProductDocument["_id"][];
  cuisine: Cuisine[];
  promoted: boolean;
  about: string;
  phone: string;
  rating: number;
  verified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  validatePassword(candidatePassword: string): Promise<boolean>;
}

export type PublicUser = Pick<
  UserDocument,
  | "id"
  | "username"
  | "fullName"
  | "city"
  | "photo_url"
  | "role"
  | "rating"
  | "cuisine"
  | "products"
>;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    role: {
      type: String,
      default: UserRole.User,
      enum: ["admin", "user", "chef"],
    },
    passwordHash: { type: String, required: true },
    passwordResetCode: { type: String },
    verificationString: { type: String },
    salt: { type: String, required: true },
    photo_url: {
      type: String,
      default:
        "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image-300x300.png",
    },
    city: { type: String, required: true, default: "Helsinki" },
    orders: { type: [String], default: [] },
    products: { type: [String], default: [] },
    cuisine: { type: [String], default: [] },
    promoted: { type: Boolean, default: false },
    about: { type: String, default: "" },
    phone: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt
    .compare(candidatePassword, user.passwordHash)
    .catch((_e: unknown) => false);
};

userSchema.set("toJSON", {
  transform: (_, returnedObject: Partial<UserDocument>) => {
    delete returnedObject.passwordHash;
    delete returnedObject.verificationString;
    delete returnedObject.salt;
    delete returnedObject.__v;
    return returnedObject;
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
