import express from "express";
import {
  addcart,
  deleteObjectById,
  getCartByUserId,
  updateQuantityById,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/addtocart", addcart);

router.delete("/deleteObjectById/:proId", deleteObjectById);

router.get("/getcartByUserId/:userId", getCartByUserId);

router.patch("/updateQuantityById/:cartId", updateQuantityById); // patch se ek he cheez mai change hoga

export default router;
