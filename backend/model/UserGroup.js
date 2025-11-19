import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: String,
    roleType: { type: String, enum: ["ADMIN", "UNITMANAGER"] },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("UserGroup", groupSchema);
