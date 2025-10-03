import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token nikalna
      token = req.headers.authorization.split(" ")[1];

      // Verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User fetch karna (password hide karke)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
      return; // ✅ Taake neeche ka code na chale
    } catch (error) {
      console.error("Auth error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // Agar token hi nahi mila
  return res.status(401).json({ message: "Not authorized, no token" });
};

export default authMiddleware;
