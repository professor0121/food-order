import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tiffin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tiffin",
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  },
  { timestamps: true } 
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
