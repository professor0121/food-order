import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum:["pending","completed","cancelled"],
    default: "pending",
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
