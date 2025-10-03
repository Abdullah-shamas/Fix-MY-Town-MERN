import Issue from "../models/Issue.js";
import User from "../models/User.js";


export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("user", "name email role");
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = status || issue.status;
    await issue.save();

    res.json({ message: "Issue status updated", issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body; // "admin", "ngo", "user"
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
