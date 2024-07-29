import express from "express";
import multer from "multer";

import {
  addProduct,
  deleteProductById,
  getProduct,
  getProductById,
  getproByCatId,
  getproByVendorId,
  updateProductById,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "image_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type,only images allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/addproduct", upload.single("proImage"), addProduct);

router.delete("/deleteProductById/:proId", deleteProductById);

router.get("/getproduct", getProduct);

router.get("/getproductById/:proId", getProductById);

router.get("/getproByCatId/:catId", getproByCatId);

router.get("/getproByVendorId/:venId", getproByVendorId);

router.put(
  "/updateproductById/:proId",
  upload.single("proImage"),
  updateProductById
);
export default router;
