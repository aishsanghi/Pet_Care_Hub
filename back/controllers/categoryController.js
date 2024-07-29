import categoryModel from "../models/categoryModel.js";
import fs from "fs";

export const addCategory = async (req, res) => {
  const { title, detail, vendorId } = req.body;
  const imageUrl = req.file.path;
  try {
    const newCategory = new categoryModel({
      imageUrl,
      title,
      detail,
      vendorId,
    });
    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategory = async (req, res) => {
  try {
    const categoryGet = await categoryModel.find().populate("vendorId");
    res.status(200).json({
      message: "records fetched",
      categoryGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategoryById = async (req, res) => {
  const { catId } = req.params;
  try {
    const deleteCategory = await categoryModel.findByIdAndDelete(catId);
    if (!deleteCategory) {
      res.status(400).json({
        message: "Category not found",
      });
    }
    if (deleteCategory.imageUrl) {
      fs.unlinkSync(deleteCategory.imageUrl);
    }
    res.status(200).json({
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getcatByVendorId = async (req, res) => {
  const { venId } = req.params;
  console.log(`Received vendorId: ${venId}`);
  try {
    const category = await categoryModel.find({ vendorId: venId });
    if (!category) {
      return res.status(400).json({
        message: "Category Not Found",
      });
    }
    return res.status(200).json({
      message: "Category Found",
      category,
    });
  } catch (error) {
    console.log(error.message);
  }
};
