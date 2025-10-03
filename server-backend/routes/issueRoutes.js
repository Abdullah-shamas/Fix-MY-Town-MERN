import express from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getMyIssues
} from "../controllers/issueController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Issue
router.post("/", authMiddleware, createIssue);

// Get all issues (Public/NGO)
router.get("/", getIssues);

// Get logged-in user's issues
router.get("/my", authMiddleware, getMyIssues);

// Get single issue by ID
router.get("/:id", getIssueById);

// Update issue
router.put("/:id", authMiddleware, updateIssue);

// Delete issue
router.delete("/:id", authMiddleware, deleteIssue);

export default router;
