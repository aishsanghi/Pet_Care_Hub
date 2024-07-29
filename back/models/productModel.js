import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: {
    type: String,
  },
  detail: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
});

const productModel = new mongoose.model("Product", productSchema);
export default productModel;
