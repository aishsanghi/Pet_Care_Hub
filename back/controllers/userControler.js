import userModel from "../models/userModel.js";

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
