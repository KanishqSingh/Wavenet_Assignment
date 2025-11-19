// controllers/userController.js
import User from "../model/User.js"
import bcrypt from "bcrypt";

const idMap = { SUPERADMIN: "SA", ADMIN: "A", UNITMANAGER: "UM", USER: "U" };

const generateUserId = async (role) => {
  const prefix = idMap[role] || "U";
  const count = await User.countDocuments({ role });
  return prefix + (count + 1);
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // First user bootstrap
    const totalUsers = await User.countDocuments();
    if (totalUsers === 0) {
      const hashed = await bcrypt.hash(password, 10);
      const userId = await generateUserId("SUPERADMIN");
      const superUser = await User.create({ name, email, password: hashed, role: "SUPERADMIN", userId });
      return res.json({ message: "SUPERADMIN created", user: { _id: superUser._id, role: superUser.role, userId: superUser.userId } });
    }

    // Auth required for subsequent creation
    if (!req.user) return res.status(401).json({ message: "Auth required" });

    // Enforce creation rules
    if (req.user.role === "SUPERADMIN" && role !== "ADMIN")
      return res.status(403).json({ message: "SuperAdmin can only create ADMIN users" });

    if (req.user.role === "ADMIN" && role !== "UNITMANAGER")
      return res.status(403).json({ message: "Admin can only create UNITMANAGER users" });

    if (req.user.role === "UNITMANAGER" && role !== "USER")
      return res.status(403).json({ message: "UnitManager can only create USER users" });

    const hashed = await bcrypt.hash(password, 10);
    const userId = await generateUserId(role);

    const user = await User.create({
      name, email, role, password: hashed, userId, createdBy: req.user._id
    });

    res.json({ message: "User created", user: { _id: user._id, name: user.name, role: user.role, userId: user.userId } });
  } catch (err) {
    console.error("Create user error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ data: users, page: Number(page), total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
