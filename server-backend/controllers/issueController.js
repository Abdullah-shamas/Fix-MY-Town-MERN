import Issue from "../models/Issue.js";

// @desc Create new issue
export const createIssue = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const issue = await Issue.create({
      title,
      description,
      category,
      user: req.user.id, // ✅ Fixed
    });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all issues (public/NGO)
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("user", "name email");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate("user", "name email");
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update issue
export const updateIssue = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });
    if (issue.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    issue.title = title || issue.title;
    issue.description = description || issue.description;
    issue.category = category || issue.category;
    issue.status = status || issue.status;

    const updatedIssue = await issue.save();
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete issue
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (issue.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await issue.deleteOne();
    res.json({ message: "Issue removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get logged-in user's issues
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
