// controllers/authController.js
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidTimezone } from "../utils/timeZone.js";


export const login = async (req, res) => {
  try {
    const { email, password, timezone } = req.body;

    if (!isValidTimezone(timezone)) {
      return res.status(400).json({ message: "Invalid timezone value" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });

    user.lastLoginTimezone = timezone;
    await user.save();

    res.json({
      token,
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};
