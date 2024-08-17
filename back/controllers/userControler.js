import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  const { name, number, email, password, role } = req.body;
  try {
    const newUser = new userModel({
      name,
      number,
      email,
      password,
      role,
    });
    await newUser.save();
    // response sending

    res.status(201).json({
      message: "Succesfully Registered",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (req, res) => {
  // const { name, number, email, password, role } = req.body;
  try {
    const userGet = await userModel.find();
    res.status(200).json({
      message: "records fetched",
      userGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });

    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({
        message: "user undefined",
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

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const checkmail = await userModel.findOne({ email: email });
    if (!checkmail) {
      return res.status(400).json({
        message: "user not existed",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP expiration time (5 minutes from now)
    const otpExpiration = Date.now() + 5 * 60 * 1000;

    // Save OTP and its expiration to the user's record
    checkmail.resetOtp = otp;
    checkmail.resetOtpExpires = otpExpiration;
    checkmail.save();

    // Create a Nodemailer transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asanghi04@gmail.com",
        pass: "unyn gqqy ddkr eoda",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "asanghi04@gmail.com",
      to: checkmail.email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`,
      // text: "I m Sorry",
    };

    // Send the email with the OTP
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(400).send({
          Status: "Error",
          message: "Failed to send OTP. Please try again later.",
        });
      } else {
        return res.status(200).send({
          Status: "Success",
          message: "OTP sent successfully.",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "userid undefined",
      });
    }
    res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const update = async (req, res) => {
  const { name, number, email, password, role } = req.body;
  const { userId } = req.params;
  try {
    let updateData = { name, number, email, password, role };
    const updateuser = await userModel.findByIdAndUpdate(
      userId,

      /// uses in update to set the updated data
      { $set: updateData },
      // yaani page mai upadted show hoga ab
      { new: true }
    );

    if (!updateuser) {
      return res.status(400).json({
        message: "Updated user not find",
      });
    }

    res.status(200).json({
      message: "User Updated",
      updateuser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  const { name, number, email, password, role } = req.body;
  const { userId } = req.params;

  try {
    let deleteData = { name, number, email, password, role };
    const deleteUser = await userModel.findByIdAndDelete(userId);

    if (!deleteUser) {
      res.status(400).json({
        message: "User Not find",
      });
    }
    res.status(200).json({
      message: "User Deleted Successfully",
      deleteUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};
