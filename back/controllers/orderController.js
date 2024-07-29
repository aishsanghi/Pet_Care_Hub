import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

export const addorder = async (req, res) => {
  const { user, cartArray, total, altNum, deliveryAdd } = req.body;
  try {
    const neworder = new orderModel({
      user,
      cartArray,
      total,
      altNum,
      deliveryAdd,
    });
    await neworder.save();

    // Update the status of each cart item to "ordered"
    await cartModel.updateMany(
      { _id: { $in: cartArray } },
      { $set: { status: "ordered" } }
    );

    res.status(201).json({
      message: "Object added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const order = await orderModel.find({ user: userId }).populate({
      path: "cartArray",
      populate: { path: "product" },
    });

    if (!order) {
      return res.status(400).json({
        message: "user Not Found",
      });
    }
    return res.status(200).json({
      message: "User Found",
      order,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrder = async (req, res) => {
  try {
    const orderGet = await orderModel
      .find()
      .populate({
        path: "cartArray",
        populate: { path: "product" },
      })
      .populate("user");
    res.status(200).json({
      message: "records fetched",
      orderGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatusById = async (req, res) => {
  const { itemStatus } = req.body;
  const cartId = req.params.cartId;
  console.log("ID", cartId);

  try {
    const updated = await cartModel.findOneAndUpdate(
      { _id: cartId },
      { itemStatus: itemStatus },
      { new: true }
    );
    if (!updated) {
      return res.status(400).json({
        message: "Status Not Found",
      });
    }
    return res.status(200).json({
      message: "Status updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};
