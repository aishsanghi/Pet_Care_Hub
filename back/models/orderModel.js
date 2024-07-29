import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  altNum: {
    type: Number,
  },
  deliveryAdd: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  paymentMode: {
    type: String,
    default: "Cash on Delivery",
  },
  orderDate: {
    type: Date,
    default: Date.now, // Set default value to current date/time when document is created
  },
});

const orderModel = new mongoose.model("Order", orderSchema);
export default orderModel;

// user Id,cartarray,total,alt numb ,deli addres ,status
//add, get all record,get by userid,update staus
