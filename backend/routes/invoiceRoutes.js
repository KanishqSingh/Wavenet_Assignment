import express from "express";
import { createInvoice, deleteInvoice, updateInvoice, getInvoices } from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protect, createInvoice);
router.put("/:number", protect, updateInvoice);
router.post("/delete", protect, deleteInvoice);
router.get("/", protect, getInvoices);
export default router;
