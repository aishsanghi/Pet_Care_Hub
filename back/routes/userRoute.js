import express from "express";
import {
  deleteUserById,
  forgotpassword,
  getUser,
  getUserById,
  loginUser,
  registerUser,
  update,
} from "../controllers/userControler.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/getusers", getUser);

router.post("/login", loginUser);

router.get("/getuserbyid/:userId", getUserById);

router.put("/updateuser/:userId", update);

router.delete("/deleteUser/:userId", deleteUserById);

router.post("/forgotpassword", forgotpassword);

export default router;
