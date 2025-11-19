import express from "express";
import { createUser, deleteUser, getUsers, updateUserRole } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", createUser);
router.put("/:id", protect, updateUserRole);
router.delete("/:id", protect, deleteUser);
router.get("/", protect, getUsers);
export default router;
