// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g., SA1, A1, UM1, U1
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["SUPERADMIN","ADMIN","UNITMANAGER","USER"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "AdminGroup" }],
  unitGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "UnitGroup" }],
  lastLoginTimezone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
