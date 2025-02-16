import mongoose, { Schema } from "mongoose";
import Category from "./categoryModel.js";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/07/12/18/38/package-1512783_1280.png",
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);
export default Product;
