import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  subtotal: {
    type: Number, // subtotal is price*quantity =total price
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  itemStatus: {
    type: String,
    default: "pending",
  },
});

const cartModel = new mongoose.model("Cart", cartschema);
export default cartModel;
