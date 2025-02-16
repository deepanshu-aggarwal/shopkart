import mongoose from "mongoose";
import Product from "./productModel.js";
import User from "./userModel.js";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Product,
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: User,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Deliver", "Cancelled"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
