// models/Invoice.js
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, required: true },
  financialYear: { type: String, required: true }, // e.g., "2022-2023"
  invoiceDate: { type: Date, required: true },
  amount: { type: Number, required: true, min: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

invoiceSchema.index({ invoiceNumber: 1, financialYear: 1 }, { unique: true });

export default mongoose.model("Invoice", invoiceSchema);
