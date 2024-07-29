import express from "express";
import {
  addvendor,
  changestatus,
  deletevendorById,
  getvendor,
  getvendorById,
  loginVendor,
  updateById,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/addvendor", addvendor);

router.post("/loginvendor", loginVendor);

router.get("/getvendor", getvendor);

router.get("/getvendorById/:venId", getvendorById);

router.delete("/deletevendor/:venId", deletevendorById);

router.put("/updatebyid/:venId", updateById);

router.patch("/updateloginstatus/:venId", changestatus);
export default router;
