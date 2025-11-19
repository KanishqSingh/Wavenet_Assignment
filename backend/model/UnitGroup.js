// AdminGroup
import mongoose from "mongoose";

// UnitGroup
const unitGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unitManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
export default mongoose.model("UnitGroup", unitGroupSchema);
