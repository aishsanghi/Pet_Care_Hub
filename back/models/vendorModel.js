import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  registrationNum: {
    type: String,
    required: true,
  },
  loginStatus: {
    type: String,
    default: "inactive",
  },
  role: {
    type: String,
    default: "vendor",
  },
});

const vendorModel = new mongoose.model("Vendor", vendorSchema);
export default vendorModel;
