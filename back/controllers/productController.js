import productModel from "../models/productModel.js";
import fs from "fs";

export const addProduct = async (req, res) => {
  const { category, title, detail, price, stock, vendorId } = req.body;
  const imageUrl = req.file.path;

  try {
    const newProduct = new productModel({
      imageUrl,
      category,
      title,
      detail,
      price,
      stock,
      vendorId,
    });
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  const { proId } = req.params;
  try {
    const deleteProduct = await productModel.findByIdAndDelete(proId);
    if (!deleteProduct) {
      res.status(400).json({
        message: "Product not found",
      });
    }
    if (deleteProduct.imageUrl) fs.unlinkSync(deleteProduct.imageUrl); // taaki folder mai se bhi delete ho jaye image

    res.status(200).json({
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const productGet = await productModel
      .find()
      .populate("category")
      .populate("vendorId");
    res.status(200).json({
      message: "records fetched",
      productGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProductById = async (req, res) => {
  const { category, title, detail, price, stock } = req.body;
  const { proId } = req.params;
  try {
    // let oldData = { category, title, detail, price, stock };
    // const productUpdate = await productModel.findByIdAndUpdate(       // ismai find krke update kiya hai jisse image update hoke delete ho rhi
    //   proId,
    //   { $set: oldData },
    //   { new: true }
    // );

    let oldData = await productModel.findById(proId);
    if (!oldData) {
      return res.status(400).json({
        message: "Data Not Found",
      });
    }

    // Handle image update and delete if necessary
    if (req.file) {
      const imageUrl = req.file.path;

      // Delete old image if exists
      if (oldData.imageUrl) {
        fs.unlinkSync(oldData.imageUrl);
      }

      oldData.imageUrl = imageUrl;
    }

    oldData.category = category;
    oldData.title = title;
    oldData.detail = detail;
    oldData.price = price;
    oldData.stock = stock;

    await oldData.save();

    return res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  const { proId } = req.params;
  try {
    const product = await productModel.findById(proId);
    if (!product) {
      return res.status(400).json({
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getproByCatId = async (req, res) => {
  const { catId } = req.params;
  try {
    const product = await productModel.find({ category: catId });
    if (!product) {
      return res.status(400).json({
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getproByVendorId = async (req, res) => {
  const { venId } = req.params;
  try {
    const product = await productModel
      .find({ vendorId: venId })
      .populate("vendorId");
    if (!product) {
      return res.status(400).json({
        message: "product Not Found",
      });
    }
    return res.status(200).json({
      message: "product Found",
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};
