import express from "express";
import multer from "multer";

import {
  addCategory,
  deleteCategoryById,
  getcatByVendorId,
  getCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");

    // location for storing files
  },
  filename: function (req, file, cb) {
    // const date = new Date.toIosString.split(T)[0];
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

router.post("/addcategory", upload.single("catImage"), addCategory);

router.get("/getCategory", getCategory);

router.delete("/deleteCategoryById/:catId", deleteCategoryById);

router.get("/getcatByVendorId/:venId", getcatByVendorId);

export default router;
