import express from "express";
import { getAllIssues, updateIssueStatus, updateUserRole } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all issues (admin & ngo)
router.get("/issues", authMiddleware, roleMiddleware("admin", "ngo"), getAllIssues);

// Update issue status (admin only)
router.put("/issues/:id/status", authMiddleware, roleMiddleware("admin"), updateIssueStatus);

// Update user role (admin only)
router.put("/users/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRole);

export default router;
