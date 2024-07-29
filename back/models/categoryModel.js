import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  detail: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
});

const categoryModel = new mongoose.model("Category", categorySchema);
export default categoryModel;
