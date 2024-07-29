import express from "express";
import {
  addorder,
  getOrder,
  getOrderByUserId,
  updateStatusById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/addorder", addorder);

router.get("/getOrderByUserId/:userId", getOrderByUserId);

router.get("/getOrder", getOrder);

router.patch("/updateStatusById/:cartId", updateStatusById);

export default router;
