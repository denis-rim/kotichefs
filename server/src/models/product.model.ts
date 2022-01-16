import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductInput extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  _id: string;
  rating: number;
  reviews: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1",
    },
    ingredients: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
