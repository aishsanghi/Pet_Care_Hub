import express from "express";
import {
  addContact,
  deleteContactById,
  getContact,
  getContactById,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/addcontact", addContact);

router.get("/getcontact", getContact);

router.get("/getcontactbyid/:contactId", getContactById);

router.delete("/deleteContactById/:contactId", deleteContactById);
export default router;
