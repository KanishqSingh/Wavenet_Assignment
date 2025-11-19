// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should be { id, role, iat, exp } from token creation
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const allowRoles = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Auth required" });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};
