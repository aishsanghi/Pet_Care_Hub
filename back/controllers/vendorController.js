import vendorModel from "../models/vendorModel.js";

export const addvendor = async (req, res) => {
  const {
    name,
    businessName,
    number,
    email,
    password,
    address,
    registrationNum,
    role,
  } = req.body;
  try {
    console.log(
      name,
      businessName,
      number,
      email,
      password,
      address,
      registrationNum,
      role
    );
    const newvendor = new vendorModel({
      name,
      businessName,
      number,
      email,
      password,
      address,
      registrationNum,
      role,
    });
    await newvendor.save();
    res.status(201).json({
      message: "vendor Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginVendor = async (req, res) => {
  const { registrationNum, password } = req.body;
  try {
    const existingUser = await vendorModel.findOne({
      registrationNum: registrationNum,
    });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({
        message: "vendor undefined",
      });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({
        message: " invalid password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      loggedUser: existingUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getvendor = async (req, res) => {
  try {
    const vendorGet = await vendorModel.find();
    res.status(200).json({
      message: "records fetched",
      vendorGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getvendorById = async (req, res) => {
  const { venId } = req.params;
  try {
    const vendorId = await vendorModel.findById(venId);
    if (!vendorId) {
      return res.status(400).json({
        message: "vendor Not Found",
      });
    }
    return res.status(200).json({
      message: "vendor Found",
      vendorId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletevendorById = async (req, res) => {
  const { venId } = req.params;
  try {
    const deletevendor = await vendorModel.findByIdAndDelete(venId);
    if (!deletevendor) {
      res.status(400).json({
        message: "vendor Not Found",
      });
    }
    res.status(200).json({
      message: "vendor Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateById = async (req, res) => {
  const {
    name,
    businessName,
    number,
    email,
    password,
    address,
    registrationNum,
    role,
  } = req.body;
  const { venId } = req.params;
  try {
    let updatedata = {
      name,
      businessName,
      number,
      email,
      password,
      address,
      registrationNum,
      role,
    };
    let updatevendor = await vendorModel.findByIdAndUpdate(
      venId,
      { $set: updatedata },
      { new: true }
    );

    if (!updatevendor) {
      return res.status(400).json({
        message: "Data Not Found",
      });
    }
    res.status(200).json({
      message: "vendor Updated",
      updatevendor,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const changestatus = async (req, res) => {
  const { venId } = req.params;
  const { loginStatus } = req.body;
  try {
    console.log("id", venId, "ststus", loginStatus);

    let statusLogin = await vendorModel.findOneAndUpdate(
      { _id: venId },
      { loginStatus: loginStatus },
      { new: true }
    );
    if (!statusLogin) {
      return res.status(400).json({
        message: "Vendor Not Found",
      });
    }
    res.status(200).json({
      message: "Status Updated",
      statusLogin,
    });
  } catch (error) {
    console.log(error.message);
  }
};
