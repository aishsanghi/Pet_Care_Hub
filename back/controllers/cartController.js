import cartModel from "../models/cartModel.js";

export const addcart = async (req, res) => {
  const {
    product,
    user,
    price,
    quantity,
    subtotal,
    status,
    vendorId,
    itemStatus,
  } = req.body;
  try {
    const newcart = new cartModel({
      product,
      user,
      price,
      quantity,
      subtotal,
      status,
      vendorId,
      itemStatus,
    });
    await newcart.save();
    res.status(201).json({
      message: "Object added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteObjectById = async (req, res) => {
  const { proId } = req.params;
  try {
    const deleteObject = await cartModel.findByIdAndDelete(proId);
    if (!deleteObject) {
      res.status(400).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartModel.find({ user: userId }).populate("product");
    if (!cart) {
      return res.status(400).json({
        message: "user Not Found",
      });
    }
    return res.status(200).json({
      message: "User Found",
      cart,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateQuantityById = async (req, res) => {
  const { quantity, price } = req.body;
  const { cartId } = req.params;
  try {
    const subtotal = price * quantity;
    const updated = await cartModel.findOneAndUpdate(
      { _id: cartId },
      { quantity: quantity, subtotal: subtotal },
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        message: "Data Not Found",
      });
    }
    return res.status(200).json({
      message: "Quantity updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};
